// Assign a verified, freely-licensed Wikimedia Commons cover to each article.
//
// Usage: node scripts/assign-covers.js [--dry-run]
//
// Method: Commons full-text search per article, then a HARD keyword gate on the
// filename. A file is only accepted if its title actually contains one of the
// subject words. If nothing matches, the article keeps an empty cover rather
// than getting a random image from a neighbourhood category — an earlier
// category-first-file version produced things like a Cabrini Green photo on a
// Puerto Rican Fest piece, which is worse than no picture at all.
//
// Licences accepted: CC0, CC BY, CC BY-SA, public domain. Nothing else.

const fs = require('fs')
const https = require('https')

const DRY = process.argv.includes('--dry-run')
const FREE = /^(CC0|CC BY|CC BY-SA|Public domain|PD)/i

// ref -> [search query, [required filename keywords]]
const Q = {
  D1:  ['Tate McRae Lollapalooza 2026', ['lollapalooza']],
  D2:  ['Douglass Park Chicago', ['douglass', 'douglas park']],
  D3:  ['Grant Park Chicago skyline lakefront', ['grant park']],
  D4:  ['SeatGeek Stadium Bridgeview', ['seatgeek', 'toyota park', 'bridgeview']],
  D5:  ['Union Park Chicago', ['union park']],
  D6:  ['SeatGeek Stadium Bridgeview', ['seatgeek', 'toyota park', 'bridgeview']],
  D7:  ['Northerly Island Chicago', ['northerly']],
  D8:  ['Morton Salt Chicago Elston', ['morton salt', 'salt shed']],
  D9:  ['Union Park Chicago', ['union park']],
  D10: ['United Center Chicago', ['united center']],
  D11: ['Jackson Park Chicago', ['jackson park']],
  D12: ['Morton Salt Chicago Elston', ['morton salt', 'salt shed']],
  D13: ['Millennium Park Chicago Pritzker Pavilion', ['millennium', 'pritzker']],
  D14: ['Chicago Avenue West Town', ['chicago avenue', 'west town']],
  D15: ['Bronzeville Chicago King Drive', ['bronzeville', 'king drive']],
  D16: ['Bronzeville Chicago', ['bronzeville']],
  D17: ['Englewood Chicago Halsted', ['englewood']],
  D18: ['Chicago Blues Festival', ['blues festival', 'blues fest']],
  D19: ['Chicago Gospel Music Festival', ['gospel']],
  D20: ['Chicago Jazz Festival', ['jazz festival', 'jazz fest']],
  D21: ['Chicago SummerDance Grant Park', ['summerdance']],
  D22: ['Grant Park Music Festival Pritzker Pavilion', ['grant park music', 'pritzker']],
  D23: ['Jay Pritzker Pavilion Millennium Park', ['pritzker', 'millennium']],
  D24: ['Jay Pritzker Pavilion Millennium Park', ['pritzker', 'millennium']],
  D25: ['Division Street Chicago', ['division']],
  D26: ['Andersonville Chicago Clark Street', ['andersonville']],
  D27: ['Wicker Park Chicago Milwaukee Avenue', ['wicker park', 'milwaukee ave']],
  D28: ['Lincoln Square Chicago', ['lincoln square']],
  D29: ['Logan Square Chicago', ['logan square']],
  D30: ['Lincoln Avenue Chicago Lincoln Park', ['lincoln ave', 'lincoln park']],
  D31: ['Edgewater Chicago Broadway', ['edgewater']],
  D32: ['Roscoe Village Chicago', ['roscoe']],
  D33: ['Rogers Park Chicago Glenwood', ['rogers park', 'glenwood']],
  D34: ['Lakeview Chicago Belmont', ['lakeview', 'belmont']],
  D35: ['Armitage Avenue Chicago Lincoln Park', ['armitage', 'lincoln park']],
  D36: ['Lincoln Square Chicago', ['lincoln square']],
  D37: ['Chicago Pride Parade', ['pride']],
  D38: ['Chicago Pride Fest Halsted', ['pride']],
  D39: ['Northalsted Market Days Chicago Halsted', ['market days', 'halsted', 'northalsted']],
  D40: ['DuSable Museum Chicago', ['dusable']],
  D41: ['Paseo Boricua Puerto Rican flag Humboldt Park Chicago', ['paseo', 'boricua', 'puerto rican']],
  D42: ['Pilsen Chicago Cermak', ['pilsen', 'cermak']],
  D43: ['Little Village Chicago 26th Street arch', ['little village', '26th']],
  D44: ['Grant Park Chicago Butler Field', ['grant park', 'butler']],
  D45: ['Bud Billiken Parade Chicago', ['billiken']],
  D46: ['Washington Park Chicago', ['washington park']],
  D47: ['Chinatown Chicago Wentworth', ['chinatown']],
  D48: ['Midwest Buddhist Temple Chicago', ['buddhist temple', 'midwest buddhist']],
  D49: ['Bronzeville Chicago King Drive', ['bronzeville', 'king drive']],
  D50: ['Hyde Park Chicago 53rd Street', ['hyde park', '53rd']],
  D51: ['Taste of Chicago', ['taste of chicago']],
  D52: ['Randolph Street Chicago West Loop', ['randolph']],
  D53: ['Lincoln Avenue Chicago North Center', ['lincoln ave', 'north center']],
  D54: ['Belmont Avenue Chicago Roscoe Village', ['belmont', 'roscoe']],
  D55: ['Pilsen Chicago Blue Island Avenue', ['pilsen', 'blue island']],
  D56: ['Italian beef sandwich', ['italian beef']],
  D57: ['Southport Avenue Chicago Lakeview', ['southport', 'lakeview']],
  D58: ['Grant Park Chicago Hutchinson Field', ['grant park', 'hutchinson']],
  D59: ['Greektown Chicago Halsted', ['greektown']],
  D62: ['Division Street Wicker Park Chicago', ['division', 'wicker park']],
  D63: ['Old Town Triangle Chicago', ['old town']],
  D64: ['Hyde Park Chicago 57th Street', ['hyde park', '57th']],
  D66: ['Chicago Air and Water Show Thunderbirds', ['air', 'thunderbird', 'water show']],
  'D65-GC':  ['Grant Park Chicago Butler Field', ['grant park', 'butler']],
  'D65-RAW': ['Ravenswood Chicago industrial corridor', ['ravenswood']],
  'D65-PR':  ['Printing House Row Dearborn Chicago', ['printing house', 'dearborn', 'printers row']],
  DX1: ['Little Village Chicago 26th Street arch', ['little village', '26th']],
}

function api(params) {
  const q = new URLSearchParams({ ...params, format: 'json' }).toString()
  return new Promise((res, rej) => https.get({
    host: 'commons.wikimedia.org', path: '/w/api.php?' + q,
    headers: { 'User-Agent': 'ColorNoise-editorial/1.0 (masatian@uchicago.edu)' },
  }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)) } catch (e) { rej(e) } }) }).on('error', rej))
}

async function find(query, must) {
  const s = await api({ action: 'query', list: 'search', srsearch: query + ' filetype:bitmap', srnamespace: '6', srlimit: '30' })
  const hits = ((s.query || {}).search) || []
  if (!hits.length) return null
  for (let i = 0; i < hits.length; i += 15) {
    const batch = hits.slice(i, i + 15)
    const info = await api({
      action: 'query', titles: batch.map(h => h.title).join('|'),
      prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '1600',
    })
    const pages = (info.query || {}).pages || {}
    // Preserve search relevance order.
    for (const h of batch) {
      const page = Object.values(pages).find(p => p.title === h.title)
      if (!page) continue
      const ii = (page.imageinfo || [])[0]
      if (!ii) continue
      const t = page.title.replace(/^File:/, '')
      if (!/\.(jpg|jpeg|png)$/i.test(t)) continue
      const md = ii.extmetadata || {}
      const lic = ((md.LicenseShortName || {}).value || '').trim()
      if (!FREE.test(lic)) continue
      const low = t.toLowerCase()
      if (!must.some(w => low.includes(w.toLowerCase()))) continue
      const author = ((md.Artist || {}).value || '').replace(/<[^>]+>/g, '').trim().slice(0, 60)
      return {
        title: t,
        url: (ii.thumburl || ii.url).split('?')[0].replace('//thumb.wikimedia.org/', '//upload.wikimedia.org/'),
        credit: `${author || 'Unknown'} / Wikimedia Commons (${lic})`,
        alt: t.replace(/\.(jpg|jpeg|png)$/i, '').replace(/[_-]+/g, ' '),
      }
    }
  }
  return null
}

;(async () => {
  const arts = require('../content/summer-2026')
  const need = arts.filter(a => !a.cover_image)
  console.log(`${need.length} articles need a cover\n`)

  const found = {}
  let none = []
  for (const a of need) {
    const spec = Q[a.ref]
    if (!spec) { none.push(a.ref + ' (unmapped)'); continue }
    let hit = null
    try { hit = await find(spec[0], spec[1]) } catch (e) { console.log(`err   ${a.ref}  ${e.message}`) }
    if (!hit) { none.push(a.ref); continue }
    found[a.ref] = hit
    console.log(`ok    ${a.ref.padEnd(8)} ${hit.title.slice(0, 56)}`)
  }

  console.log(`\nmatched ${Object.keys(found).length} / ${need.length}`)
  if (none.length) console.log(`no confident match (left blank): ${none.join(', ')}`)
  if (DRY) return

  let written = 0
  for (const f of fs.readdirSync('content/summer-2026').filter(x => /^part\d+\.js$/.test(x))) {
    const p = 'content/summer-2026/' + f
    let s = fs.readFileSync(p, 'utf8')
    for (const [ref, hit] of Object.entries(found)) {
      const re = new RegExp(`(ref: '${ref.replace(/-/g, '\\-')}',[\\s\\S]{0,1600}?)cover_image: ''`)
      if (re.test(s)) {
        s = s.replace(re, (m, head) =>
          `${head}cover_image: ${JSON.stringify(hit.url)},\n  cover_credit: ${JSON.stringify(hit.credit)},\n  cover_alt: ${JSON.stringify(hit.alt)}`)
        written++
      }
    }
    fs.writeFileSync(p, s)
  }
  console.log(`patched ${written} records`)
})()
