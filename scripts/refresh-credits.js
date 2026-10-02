// Keep the visible cover credit in sync with whatever cover the article
// currently has. Run after any cover change. Removes the credit line entirely
// if an article no longer has a cover.
const fs = require('fs')

const OPEN = '<p class="cn-cover-credit">'

let updated = 0, added = 0, removed = 0

for (const f of fs.readdirSync('content/summer-2026').filter(x => /^part\d+\.js$/.test(x))) {
  const p = 'content/summer-2026/' + f
  let s = fs.readFileSync(p, 'utf8')

  // Walk records in order.
  let cursor = 0
  while (true) {
    const ri = s.indexOf("ref: '", cursor)
    if (ri === -1) break
    const nextRi = s.indexOf("ref: '", ri + 6)
    const end = nextRi === -1 ? s.length : nextRi
    let seg = s.slice(ri, end)
    const original = seg

    // Current credit for this record, if any.
    let credit = null
    const cm = seg.match(/cover_credit: (?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')/)
    if (cm) credit = (cm[1] !== undefined ? cm[1] : cm[2]).replace(/\\"/g, '"').replace(/\\'/g, "'")

    const hasCover = /cover_image: (?:"[^"]+"|'[^']+')/.test(seg)

    // Strip any existing credit line.
    const existing = seg.indexOf(OPEN)
    if (existing !== -1) {
      const close = seg.indexOf('</p>', existing)
      if (close !== -1) {
        const before = seg.slice(0, existing).replace(/\n$/, '')
        seg = before + seg.slice(close + 4)
        if (hasCover && credit) updated++
        else removed++
      }
    }

    // Append a fresh one at the end of the body.
    if (hasCover && credit) {
      const bs = seg.indexOf('body: `')
      const be = seg.indexOf('`,', bs)
      if (bs !== -1 && be !== -1) {
        if (existing === -1) added++
        const line = '\n' + OPEN + 'Cover image: ' + credit + '</p>'
        seg = seg.slice(0, be) + line + seg.slice(be)
      }
    }

    if (seg !== original) s = s.slice(0, ri) + seg + s.slice(end)
    cursor = ri + seg.length
  }

  fs.writeFileSync(p, s)
}

console.log('credit lines — refreshed:', updated, '| added:', added, '| removed:', removed)
