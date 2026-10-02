// Fill remaining blank covers from each event's own og:image.
//
// Usage: node scripts/fill-covers-ogimage.js [--dry-run]
//
// Rationale: an og:image is published by the site owner expressly so third
// parties render it when the page is shared. It is the organiser's own
// promotional asset, on-topic by definition, and creditable to a named source.
// That makes it the best available option for events with no freely-licensed
// photograph anywhere. Every one is credited visibly at the foot of the body.

const fs = require('fs')
const https = require('https')
const http = require('http')

const DRY = process.argv.includes('--dry-run')

// ref -> [page to read og:image from, credit label]
const SRC = {
  D21: ['https://www.chicago.gov/city/en/depts/dca/supp_info/chicago_summerdance.html', 'City of Chicago / DCASE'],
  D35: ['https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/', 'Choose Chicago'],
  D38: ['https://northalsted.com/', 'Northalsted Business Alliance'],
  D39: ['https://northalsted.com/events/northalsted-market-days-2026/', 'Northalsted Business Alliance'],
  D43: ['https://www.villapalooza.org/', 'Villapalooza'],
  D44: ['https://www.chicago.gov/city/en/depts/mayor/press_room/press_releases/2026/september/mexican-independence-day.html', 'City of Chicago'],
  D54: ['https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/', 'Choose Chicago'],
  D58: ['https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/', 'Choose Chicago'],
  DX1: ['https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/', 'Choose Chicago'],
  'D65-GC': ['https://www.choosechicago.com/articles/festivals-special-events/chicago-festival-event-guide/', 'Choose Chicago'],
}

function fetch(url, depth) {
  depth = depth || 0
  return new Promise(res => {
    if (depth > 3) return res(null)
    let u
    try { u = new URL(url) } catch (e) { return res(null) }
    const lib = u.protocol === 'http:' ? http : https
    lib.get({
      host: u.host, path: u.pathname + u.search,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ColorNoise-editorial/1.0)' },
    }, r => {
      if ([301, 302, 303, 307, 308].indexOf(r.statusCode) !== -1 && r.headers.location) {
        r.resume()
        return res(fetch(new URL(r.headers.location, url).href, depth + 1))
      }
      if (r.statusCode !== 200) { r.resume(); return res(null) }
      let d = ''
      r.on('data', c => { d += c; if (d.length > 900000) r.destroy() })
      r.on('end', () => res(d))
      r.on('close', () => res(d))
    }).on('error', () => res(null))
  })
}

function ogImage(html, base) {
  if (!html) return null
  const pats = [
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
  ]
  for (const p of pats) {
    const m = html.match(p)
    if (m) { try { return new URL(m[1], base).href } catch (e) { return null } }
  }
  return null
}

function alive(url) {
  return new Promise(res => {
    try {
      const u = new URL(url)
      https.request({
        host: u.host, path: u.pathname + u.search, method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ColorNoise-editorial/1.0)' },
      }, r => res(r.statusCode === 200 && /^image\//.test(r.headers['content-type'] || '')))
        .on('error', () => res(false)).end()
    } catch (e) { res(false) }
  })
}

function patch(src, ref, hit) {
  const anchor = "ref: '" + ref + "',"
  const i = src.indexOf(anchor)
  if (i === -1) return null
  const target = "cover_image: ''"
  const j = src.indexOf(target, i)
  if (j === -1) return null
  const nextRef = src.indexOf("ref: '", i + anchor.length)
  if (nextRef !== -1 && j > nextRef) return null
  return src.slice(0, j) +
    'cover_image: ' + JSON.stringify(hit.url) +
    ',\n  cover_credit: ' + JSON.stringify(hit.credit) +
    ',\n  cover_alt: ' + JSON.stringify(hit.alt) +
    src.slice(j + target.length)
}

;(async () => {
  const arts = require('../content/summer-2026')
  const blanks = arts.filter(a => !a.cover_image)
  console.log(blanks.length + ' blank covers\n')

  const found = {}
  for (const a of blanks) {
    const spec = SRC[a.ref]
    if (!spec) { console.log('skip  ' + a.ref + '  unmapped'); continue }
    const html = await fetch(spec[0])
    const img = ogImage(html, spec[0])
    if (!img) { console.log('none  ' + a.ref + '  no og:image at ' + new URL(spec[0]).host); continue }
    const ok = await alive(img)
    if (!ok) { console.log('dead  ' + a.ref + '  ' + img.slice(0, 68)); continue }
    found[a.ref] = { url: img, credit: 'Courtesy ' + spec[1], alt: a.title }
    console.log('ok    ' + a.ref.padEnd(8) + img.slice(0, 72))
  }

  console.log('\nmatched ' + Object.keys(found).length + ' / ' + blanks.length)
  if (DRY) return

  let written = 0
  for (const f of fs.readdirSync('content/summer-2026').filter(x => /^part\d+\.js$/.test(x))) {
    const p = 'content/summer-2026/' + f
    let s = fs.readFileSync(p, 'utf8')
    for (const e of Object.entries(found)) {
      const out = patch(s, e[0], e[1])
      if (out) { s = out; written++ }
    }
    fs.writeFileSync(p, s)
  }
  console.log('patched ' + written)
})()
