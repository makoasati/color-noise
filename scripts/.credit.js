// CC BY and CC BY-SA require visible attribution. The articles table has no
// cover_credit column, so the credit goes at the foot of the body where it
// renders today, rather than waiting on a migration. CC0 and public-domain
// images carry no such condition but get credited anyway.
const fs = require('fs')

const MARK = 'Cover image:'
let added = 0, already = 0

for (const f of fs.readdirSync('content/summer-2026').filter(x => /^part\d+\.js$/.test(x))) {
  const p = 'content/summer-2026/' + f
  let s = fs.readFileSync(p, 'utf8')

  // Walk each record: find its cover_credit, then append a credit line to the
  // end of that record's body template literal.
  let out = s
  let cursor = 0
  while (true) {
    const ci = out.indexOf('cover_credit: ', cursor)
    if (ci === -1) break
    const q1 = out.indexOf('"', ci)
    const q2 = out.indexOf('"', q1 + 1)
    if (q1 === -1 || q2 === -1) { cursor = ci + 14; continue }
    const credit = out.slice(q1 + 1, q2)

    // Find this record's body closing backtick-quote.
    const bodyStart = out.indexOf('body: `', q2)
    if (bodyStart === -1) { cursor = q2; continue }
    const bodyEnd = out.indexOf('`,', bodyStart)
    if (bodyEnd === -1) { cursor = q2; continue }

    const body = out.slice(bodyStart + 7, bodyEnd)
    if (body.includes(MARK)) { already++; cursor = bodyEnd; continue }

    const line = `\n<p class="cn-cover-credit">${MARK} ${credit}</p>`
    out = out.slice(0, bodyEnd) + line + out.slice(bodyEnd)
    added++
    cursor = bodyEnd + line.length
  }

  if (out !== s) fs.writeFileSync(p, out)
}

console.log('credit lines added:', added, '| already present:', already)
