// Fill the seven remaining covers that Commons can serve with a genuinely
// relevant, freely-licensed image. String-indexed patching, no regex — an
// earlier heredoc version lost its backslashes and silently matched nothing.
const fs = require('fs')
const https = require('https')

const FREE = /^(CC0|CC BY|CC BY-SA|Public domain|PD)/i

function api(p) {
  const q = new URLSearchParams({ ...p, format: 'json' }).toString()
  return new Promise((res, rej) => https.get({
    host: 'commons.wikimedia.org', path: '/w/api.php?' + q,
    headers: { 'User-Agent': 'ColorNoise-editorial/1.0 (masatian@uchicago.edu)' },
  }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)) } catch (e) { rej(e) } }) }).on('error', rej))
}

async function find(query, must) {
  const s = await api({ action: 'query', list: 'search', srsearch: query + ' filetype:bitmap', srnamespace: '6', srlimit: '40' })
  const hits = ((s.query || {}).search) || []
  for (let i = 0; i < hits.length; i += 20) {
    const batch = hits.slice(i, i + 20)
    const info = await api({
      action: 'query', titles: batch.map(h => h.title).join('|'),
      prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '1600',
    })
    const pages = (info.query || {}).pages || {}
    for (const h of batch) {
      const pg = Object.values(pages).find(x => x.title === h.title)
      if (!pg) continue
      const ii = (pg.imageinfo || [])[0]
      if (!ii) continue
      const t = pg.title.replace(/^File:/, '')
      if (!/\.(jpe?g|png)$/i.test(t)) continue
      const md = ii.extmetadata || {}
      const lic = ((md.LicenseShortName || {}).value || '').trim()
      if (!FREE.test(lic)) continue
      if (!must.some(w => t.toLowerCase().includes(w))) continue
      const au = ((md.Artist || {}).value || '').replace(/<[^>]+>/g, '').trim().slice(0, 60)
      return {
        url: (ii.thumburl || ii.url).split('?')[0].replace('//thumb.wikimedia.org/', '//upload.wikimedia.org/'),
        credit: (au || 'Unknown') + ' / Wikimedia Commons (' + lic + ')',
        alt: t.replace(/\.(jpe?g|png)$/i, '').replace(/[_-]+/g, ' ').slice(0, 110),
      }
    }
  }
  return null
}

const C = {
  D3:  ['Buckingham Fountain Chicago', ['buckingham', 'grant park']],
  D14: ['Ukrainian Village Chicago Chicago Avenue', ['chicago avenue', 'ukrainian', 'west town']],
  D19: ['Jay Pritzker Pavilion', ['pritzker']],
  D41: ['Humboldt Park Chicago boathouse', ['humboldt']],
  D53: ['Lincoln Avenue Chicago', ['lincoln avenue', 'lincoln ave']],
  D55: ['Pilsen Chicago 18th Street mural', ['pilsen', '18th']],
  'D65-RAW': ['Ravenswood Chicago', ['ravenswood']],
}

// Replace the first `cover_image: ''` that appears after `ref: '<ref>',`.
function patch(src, ref, hit) {
  const anchor = "ref: '" + ref + "',"
  const i = src.indexOf(anchor)
  if (i === -1) return null
  const target = "cover_image: ''"
  const j = src.indexOf(target, i)
  if (j === -1) return null
  // Guard: must belong to this record, not a later one.
  const nextRef = src.indexOf("ref: '", i + anchor.length)
  if (nextRef !== -1 && j > nextRef) return null
  const replacement =
    'cover_image: ' + JSON.stringify(hit.url) +
    ',\n  cover_credit: ' + JSON.stringify(hit.credit) +
    ',\n  cover_alt: ' + JSON.stringify(hit.alt)
  return src.slice(0, j) + replacement + src.slice(j + target.length)
}

;(async () => {
  const found = {}
  for (const [k, [q, m]] of Object.entries(C)) {
    const r = await find(q, m)
    if (r) { found[k] = r; console.log('ok   ' + k.padEnd(9) + r.alt.slice(0, 50)) }
    else console.log('none ' + k)
  }

  let written = 0
  for (const f of fs.readdirSync('content/summer-2026').filter(x => /^part\d+\.js$/.test(x))) {
    const p = 'content/summer-2026/' + f
    let s = fs.readFileSync(p, 'utf8')
    for (const [ref, hit] of Object.entries(found)) {
      const out = patch(s, ref, hit)
      if (out) { s = out; written++ }
    }
    fs.writeFileSync(p, s)
  }
  console.log('patched ' + written)
})()
