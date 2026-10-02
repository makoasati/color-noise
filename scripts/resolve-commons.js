// Resolve Wikimedia Commons categories named in the dossier into real,
// verified, freely-licensed file URLs with author + licence, for cover_image.
// Usage: node scripts/resolve-commons.js "Category:Navy Pier" ["Category:..." ...]
const https = require('https')

const FREE = /^(CC0|CC BY|CC BY-SA|Public domain|PD)/i

function api(params) {
  const q = new URLSearchParams({ ...params, format: 'json', origin: '*' }).toString()
  return new Promise((res, rej) => {
    https.get({
      host: 'commons.wikimedia.org', path: '/w/api.php?' + q,
      headers: { 'User-Agent': 'ColorNoise-editorial/1.0 (masatian@uchicago.edu)' },
    }, r => { let d = ''; r.on('data', c => d += c); r.on('end', () => { try { res(JSON.parse(d)) } catch (e) { rej(e) } }) }).on('error', rej)
  })
}

async function resolve(category) {
  const list = await api({ action: 'query', list: 'categorymembers', cmtitle: category, cmtype: 'file', cmlimit: '12' })
  const members = ((list.query || {}).categorymembers) || []
  if (!members.length) return { category, files: [], note: 'category empty or missing' }

  const info = await api({
    action: 'query', titles: members.map(m => m.title).join('|'),
    prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '1600',
  })
  const pages = (info.query || {}).pages || {}
  const files = []
  for (const k of Object.keys(pages)) {
    const p = pages[k]
    const ii = (p.imageinfo || [])[0]
    if (!ii) continue
    const m = ii.extmetadata || {}
    const lic = ((m.LicenseShortName || {}).value || '').trim()
    if (!FREE.test(lic)) continue
    const author = ((m.Artist || {}).value || '').replace(/<[^>]+>/g, '').trim()
    files.push({
      title: p.title,
      url: (ii.thumburl || ii.url).split('?')[0].replace('//thumb.wikimedia.org/', '//upload.wikimedia.org/'),
      licence: lic,
      author: author || 'unknown',
      credit: `${author || 'Unknown'} / Wikimedia Commons (${lic})`,
    })
  }
  return { category, files }
}

;(async () => {
  const cats = process.argv.slice(2)
  for (const c of cats) {
    const r = await resolve(c)
    console.log(`\n=== ${r.category}${r.note ? '  [' + r.note + ']' : ''}`)
    for (const f of r.files.slice(0, 3)) {
      console.log(`  ${f.licence.padEnd(12)} ${f.title}`)
      console.log(`    ${f.url}`)
      console.log(`    credit: ${f.credit}`)
    }
    if (!r.files.length && !r.note) console.log('  no freely-licensed files found')
  }
})()
