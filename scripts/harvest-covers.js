// Replace every cover with an event-specific image harvested from the pages
// that actually cover that event — the festival's own site, its Choose Chicago
// or Do312 listing, or a publisher that ran a photo of it.
//
// Usage: node scripts/harvest-covers.js [--dry-run] [--only=D1,D42]
//
// Candidate URLs come from the dossier itself: every "### N." section's
// Primary source and More links are harvested for that event's ref.
//
// Appraisal, in order — a candidate must pass all of it:
//   1. og:image / twitter:image present
//   2. responds 200 with an image/* content type
//   3. at least 45 KB (filters logos, icons and spacers)
//   4. not on the generic blacklist (site-wide share cards, unrelated stock)
// Anything that fails keeps whatever cover it already had.

const fs = require('fs')
const https = require('https')
const http = require('http')

const DRY = process.argv.includes('--dry-run')
const ONLY = (process.argv.find(a => a.startsWith('--only=')) || '').replace('--only=', '')
  .split(',').filter(Boolean)

const MIN_BYTES = 45000

// Known generic / wrong-subject images seen while appraising. Never accept.
const BLACKLIST = [
  'metro-share_image',                 // Do312 site-wide card
  'Bud-Billiken-Parade-Hidalgo',       // Block Club summer-guide card
  'logo',                              // any logo asset, e.g. ARClogo2024_BLK.svg
  '2021_0916_Millennium_Park_Concert', // Choose Chicago guide-wide card
  'chicago-summer-festivals.jpg', 'taste-of-chicago.png', // generic guide cards
  'default', 'placeholder', 'favicon', 'sprite', 'wordmark', 'icon',
]

// A cover has to be a photograph. Vector marks and animations are never one.
const BAD_EXT = /\.(svg|gif|webp\?|ico)(\?|$)/i

function host(u) { try { return new URL(u).host } catch (e) { return '' } }

function fetch(url, depth) {
  depth = depth || 0
  return new Promise(res => {
    if (depth > 3) return res(null)
    let u
    try { u = new URL(url) } catch (e) { return res(null) }
    const lib = u.protocol === 'http:' ? http : https
    const req = lib.get({
      host: u.host, path: (u.pathname || '/') + (u.search || ''),
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      },
    }, r => {
      if ([301, 302, 303, 307, 308].indexOf(r.statusCode) !== -1 && r.headers.location) {
        r.resume()
        try { return res(fetch(new URL(r.headers.location, url).href, depth + 1)) } catch (e) { return res(null) }
      }
      if (r.statusCode !== 200) { r.resume(); return res(null) }
      let d = ''
      r.on('data', c => { d += c; if (d.length > 700000) { r.destroy(); res(d) } })
      r.on('end', () => res(d))
    })
    req.on('error', () => res(null))
    req.setTimeout(12000, () => { req.destroy(); res(null) })
  })
}

function metaImages(html, base) {
  if (!html) return []
  const out = []
  const pats = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/gi,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/gi,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/gi,
  ]
  for (const p of pats) {
    let m
    while ((m = p.exec(html)) !== null) {
      try { out.push(new URL(m[1], base).href) } catch (e) { /* skip */ }
    }
  }
  return [...new Set(out)]
}

function probe(url) {
  return new Promise(res => {
    let u
    try { u = new URL(url) } catch (e) { return res(null) }
    const req = https.request({
      host: u.host, path: (u.pathname || '/') + (u.search || ''), method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ColorNoise-editorial/1.0)', 'Range': 'bytes=0-0' },
    }, r => {
      const ct = r.headers['content-type'] || ''
      const cr = r.headers['content-range'] || ''
      const total = cr.includes('/') ? parseInt(cr.split('/')[1], 10) : parseInt(r.headers['content-length'] || '0', 10)
      r.resume()
      res({ ok: (r.statusCode === 200 || r.statusCode === 206) && /^image\//.test(ct), type: ct, bytes: total || 0 })
    })
    req.on('error', () => res(null))
    req.setTimeout(12000, () => { req.destroy(); res(null) })
    req.end()
  })
}

// Build ref -> candidate URLs from the dossier.
function candidates() {
  const txt = fs.readFileSync('research/chicago-summer-2026-events.md', 'utf8').split('\n')
  const map = {}
  let num = null
  for (const line of txt) {
    const h = line.match(/^###\s+(\d+)\./)
    if (h) { num = h[1]; map[num] = map[num] || []; continue }
    if (!num) continue
    if (/^- \*\*(Primary source|More|Sources)/.test(line) || /^\s+\d+\./.test(line)) {
      const urls = line.match(/https?:\/\/[^\s·)\]]+/g) || []
      for (const u of urls) map[num].push(u.replace(/[.,]$/, ''))
    }
  }
  return map
}

const CREDIT_BY_HOST = {
  'cdn.choosechicago.com': 'Courtesy Choose Chicago',
  'www.choosechicago.com': 'Courtesy Choose Chicago',
  'assets0.dostuffmedia.com': 'Via Do312',
  'do312.com': 'Via Do312',
}

function creditFor(imgUrl, pageUrl) {
  const h = host(imgUrl)
  if (CREDIT_BY_HOST[h]) return CREDIT_BY_HOST[h]
  const ph = host(pageUrl).replace(/^www\./, '')
  return 'Via ' + ph
}

;(async () => {
  const arts = require('../content/summer-2026')
  const cands = candidates()
  const targets = arts.filter(a => !ONLY.length || ONLY.includes(a.ref))

  const results = {}
  for (const a of targets) {
    const n = (a.ref.match(/^D(\d+)/) || [])[1]
    const urls = (n && cands[n]) ? cands[n] : []
    // Try event-specific pages first, skipping pure asset/pdf links.
    const pages = urls.filter(u => !/\.(pdf|jpg|jpeg|png|gif)$/i.test(u)).slice(0, 6)
    let chosen = null
    for (const page of pages) {
      const html = await fetch(page)
      const imgs = metaImages(html, page)
      for (const img of imgs) {
        if (BLACKLIST.some(b => img.toLowerCase().includes(b.toLowerCase()))) continue
        if (BAD_EXT.test(img)) continue
        const p = await probe(img)
        if (!p || !p.ok) continue
        if (/svg|gif/i.test(p.type)) continue
        // Unknown size is only acceptable from hosts that have already proved
        // they serve real photographs.
        if (!p.bytes && !/choosechicago|abc7|riotfest|lollapalooza/.test(host(img))) continue
        if (p.bytes && p.bytes < MIN_BYTES) continue
        chosen = { url: img, credit: creditFor(img, page), bytes: p.bytes, from: host(page) }
        break
      }
      if (chosen) break
    }
    if (chosen) {
      results[a.ref] = chosen
      const kb = chosen.bytes ? Math.round(chosen.bytes / 1024) + 'KB' : '?'
      console.log('ok    ' + a.ref.padEnd(9) + kb.padEnd(7) + chosen.from.padEnd(26) + chosen.url.split('/').pop().slice(0, 40))
    } else {
      console.log('keep  ' + a.ref.padEnd(9) + (a.cover_image ? 'existing cover kept' : 'still blank'))
    }
  }

  console.log('\nevent-specific images found: ' + Object.keys(results).length + ' / ' + targets.length)
  if (DRY) return

  // Replace cover_image / cover_credit / cover_alt for the refs we improved.
  let written = 0
  for (const f of fs.readdirSync('content/summer-2026').filter(x => /^part\d+\.js$/.test(x))) {
    const p = 'content/summer-2026/' + f
    let s = fs.readFileSync(p, 'utf8')
    for (const [ref, hit] of Object.entries(results)) {
      const anchor = "ref: '" + ref + "',"
      const i = s.indexOf(anchor)
      if (i === -1) continue
      const nextRef = s.indexOf("ref: '", i + anchor.length)
      const end = nextRef === -1 ? s.length : nextRef
      const seg = s.slice(i, end)
      const art = arts.find(x => x.ref === ref)
      const newCover = 'cover_image: ' + JSON.stringify(hit.url) +
        ',\n  cover_credit: ' + JSON.stringify(hit.credit) +
        ',\n  cover_alt: ' + JSON.stringify(art.title)
      let seg2
      if (/cover_image: ''/.test(seg)) {
        seg2 = seg.replace("cover_image: ''", newCover)
      } else {
        seg2 = seg.replace(/cover_image: "[^"]*",\n  cover_credit: "[^"]*",\n  cover_alt: "[^"]*"/, newCover)
        if (seg2 === seg) seg2 = seg.replace(/cover_image: '[^']*',\n  cover_credit: '[^']*',\n  cover_alt: '[^']*'/, newCover)
      }
      if (seg2 !== seg) { s = s.slice(0, i) + seg2 + s.slice(end); written++ }
    }
    fs.writeFileSync(p, s)
  }
  console.log('patched ' + written)
})()
