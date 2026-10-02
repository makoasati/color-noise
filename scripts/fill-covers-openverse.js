// Fill remaining blank covers from Openverse (aggregates CC-licensed images
// from Flickr, museums, Commons and others — a far larger pool than Commons
// alone).
//
// Usage: node scripts/fill-covers-openverse.js [--dry-run]
//
// Same discipline as assign-covers.js: a hard keyword gate on the title, and
// no cover at all rather than an irrelevant one. CC0 and public-domain files
// are preferred because they carry no attribution condition; CC BY and CC BY-SA
// are accepted only because the credit is stored and rendered (see §5.5 of
// docs/editorial/ARTICLE-STANDARDS.md and the cover_credit column).

const fs = require('fs')
const https = require('https')

const DRY = process.argv.includes('--dry-run')

// ref -> [query, [required title keywords]]
const Q = {
  D3:  ['Buckingham Fountain Grant Park Chicago', ['grant park', 'buckingham']],
  D14: ['Chicago Avenue West Town Chicago', ['chicago avenue', 'west town', 'ukrainian village']],
  D19: ['Jay Pritzker Pavilion Millennium Park Chicago', ['pritzker', 'millennium']],
  D21: ['Grant Park Chicago Spirit of Music Garden', ['grant park', 'music garden']],
  D35: ['Armitage Avenue Lincoln Park Chicago', ['armitage', 'lincoln park']],
  D38: ['Northalsted Boystown Halsted Chicago', ['halsted', 'boystown', 'northalsted']],
  D39: ['Northalsted Halsted Street Chicago', ['halsted', 'boystown', 'northalsted']],
  D41: ['Humboldt Park Chicago Division Street', ['humboldt', 'division']],
  D43: ['Little Village Chicago 26th Street', ['little village', '26th']],
  D44: ['Grant Park Chicago Butler Field', ['grant park', 'butler']],
  D53: ['Lincoln Avenue North Center Chicago', ['lincoln av', 'north center']],
  D54: ['Belmont Avenue Roscoe Village Chicago', ['belmont', 'roscoe']],
  D55: ['Pilsen Chicago mural 18th Street', ['pilsen', '18th']],
  D58: ['Grant Park Chicago Hutchinson Field', ['grant park', 'hutchinson']],
  DX1: ['Little Village Chicago 26th Street', ['little village', '26th']],
  'D65-GC':  ['Grant Park Chicago tents fair', ['grant park', 'butler']],
  'D65-RAW': ['Ravenswood Chicago Brown Line', ['ravenswood']],
}

function get(url) {
  return new Promise((res, rej) => https.get(url, {
    headers: { 'User-Agent': 'ColorNoise-editorial/1.0 (masatian@uchicago.edu)' },
  }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)) } catch (e) { rej(e) } }) }).on('error', rej))
}

function head(url) {
  return new Promise(res => {
    try {
      const u = new URL(url)
      https.request({ host: u.host, path: u.pathname + u.search, method: 'HEAD',
        headers: { 'User-Agent': 'ColorNoise-editorial/1.0 (masatian@uchicago.edu)' } },
        r => res(r.statusCode)).on('error', () => res(0)).end()
    } catch { res(0) }
  })
}

// CC0/PDM first, then BY, then BY-SA.
const RANK = { cc0: 0, pdm: 0, by: 1, 'by-sa': 2 }

async function find(query, must) {
  const url = 'https://api.openverse.org/v1/images/?q=' + encodeURIComponent(query) +
              '&license=cc0,pdm,by,by-sa&page_size=40&mature=false'
  let j
  try { j = await get(url) } catch { return null }
  const hits = (j.results || [])
    .filter(r => r.url && /\.(jpe?g|png)$/i.test(r.url.split('?')[0]))
    .filter(r => {
      const t = ((r.title || '') + ' ' + (r.foreign_landing_url || '')).toLowerCase()
      return must.some(w => t.includes(w.toLowerCase()))
    })
    .sort((a, b) => (RANK[a.license] ?? 9) - (RANK[b.license] ?? 9))

  for (const r of hits) {
    const code = await head(r.url)
    if (code !== 200) continue
    const lic = `CC ${String(r.license).toUpperCase()}${r.license_version ? ' ' + r.license_version : ''}`
    return {
      url: r.url,
      credit: `${r.creator || 'Unknown'} / ${r.source || 'Openverse'} (${lic})`,
      alt: (r.title || query).replace(/\s+/g, ' ').slice(0, 110),
      lic,
      landing: r.foreign_landing_url || '',
    }
  }
  return null
}

;(async () => {
  const arts = require('../content/summer-2026')
  const blanks = arts.filter(a => !a.cover_image)
  console.log(`${blanks.length} blank covers\n`)

  const found = {}
  const none = []
  for (const a of blanks) {
    const spec = Q[a.ref]
    if (!spec) { none.push(a.ref + ' (unmapped)'); continue }
    const hit = await find(spec[0], spec[1])
    if (!hit) { none.push(a.ref); continue }
    found[a.ref] = hit
    console.log(`ok    ${a.ref.padEnd(9)} ${hit.lic.padEnd(13)} ${hit.alt.slice(0, 46)}`)
  }

  console.log(`\nmatched ${Object.keys(found).length} / ${blanks.length}`)
  if (none.length) console.log(`still blank: ${none.join(', ')}`)
  if (DRY) return

  let written = 0
  for (const f of fs.readdirSync('content/summer-2026').filter(x => /^part\d+\.js$/.test(x))) {
    const p = 'content/summer-2026/' + f
    let s = fs.readFileSync(p, 'utf8')
    for (const [ref, hit] of Object.entries(found)) {
      const re = new RegExp(`(ref: '${ref.replace(/-/g, '\\-')}',[\\s\\S]{0,1600}?)cover_image: ''`)
      if (re.test(s)) {
        s = s.replace(re, (m, headTxt) =>
          `${headTxt}cover_image: ${JSON.stringify(hit.url)},\n  cover_credit: ${JSON.stringify(hit.credit)},\n  cover_alt: ${JSON.stringify(hit.alt)}`)
        written++
      }
    }
    fs.writeFileSync(p, s)
  }
  console.log(`patched ${written} records`)
})()
