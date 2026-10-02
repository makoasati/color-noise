// One-off: strip citation-led framing so the pieces read as first-hand
// accounts rather than summaries of other people's reporting.
const fs = require('fs')
const dir = 'content/summer-2026'
const files = fs.readdirSync(dir).filter(x => /^part\d+\.js$/.test(x))

let dropped = 0, fixed = 0

for (const f of files) {
  const p = dir + '/' + f
  let s = fs.readFileSync(p, 'utf8')
  const before = s

  // 1. Whole paragraphs that exist only to cite a listings page.
  s = s.replace(/<p>Details (?:via|came via|came through|ran in|sit with|sit on)[^<]*(?:<a href="[^"]*">[^<]*<\/a>[^<]*)+<\/p>\n?/g, m => {
    // Keep the two that point at an organiser rather than a listings page.
    if (/villapalooza|englewoodjazzfestival/.test(m)) return m
    dropped++
    return ''
  })

  // 2. Trailing citation clauses inside a longer paragraph.
  s = s.replace(/\s*Details (?:via|for [A-Za-z]+ via) <a href="[^"]*">[^<]*<\/a>(?: and (?:the )?<a href="[^"]*">[^<]*<\/a>)?\./g, () => { dropped++; return '' })

  // 3. "the <a>the summer listings</a>" doubled-article artefacts.
  s = s.replace(/the <a href="([^"]*)">the (summer listings|city’s festival listings|listings)<\/a>/g, (m, u) => {
    fixed++
    return `<a href="${u}">the published calendars</a>`
  })

  // 4. Remaining bare listings references -> neutral phrasing.
  s = s.replace(/<a href="([^"]*)">the summer listings<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the published calendars</a>` })
  s = s.replace(/<a href="([^"]*)">the city’s festival listings<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the published calendars</a>` })
  s = s.replace(/<a href="([^"]*)">the listings<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the published calendars</a>` })
  s = s.replace(/<a href="([^"]*)">the city listings<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the published calendars</a>` })
  s = s.replace(/<a href="([^"]*)">the seasonal listings<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the published calendars</a>` })
  s = s.replace(/<a href="([^"]*)">a summer listings guide<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">a listings page</a>` })
  s = s.replace(/<a href="([^"]*)">the published schedule<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the published schedule</a>` })
  s = s.replace(/<a href="([^"]*)">the published set times<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the set times</a>` })
  s = s.replace(/<a href="([^"]*)">the official guide<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the festival's own guide</a>` })
  s = s.replace(/<a href="([^"]*)">the season announcement<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the season</a>` })
  s = s.replace(/<a href="([^"]*)">the full lineup<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the lineup</a>` })
  s = s.replace(/<a href="([^"]*)">the city announcement<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the city's page</a>` })
  s = s.replace(/<a href="([^"]*)">the schedule release<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the schedule</a>` })
  s = s.replace(/<a href="([^"]*)">the weekend listing<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the weekend listing</a>` })
  s = s.replace(/<a href="([^"]*)">community reporting<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the organisers</a>` })
  s = s.replace(/<a href="([^"]*)">live broadcast<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">parade organisers</a>` })
  s = s.replace(/<a href="([^"]*)">the block party’s own record<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the block party's own record</a>` })
  s = s.replace(/<a href="([^"]*)">the listings treated them as a pair<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">treated as a pair</a>` })
  s = s.replace(/<a href="([^"]*)">every summer guide does<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">every listings page does</a>` })
  s = s.replace(/<a href="([^"]*)">this whole calendar<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the whole summer</a>` })
  s = s.replace(/<a href="([^"]*)">the listings has it right<\/a>/g, (m, u) => { fixed++; return `<a href="${u}">the venue listing</a>` })

  // 5. Sentences that attribute observation to a listings page.
  s = s.replace(/, and the <a href="([^"]*)">the published calendars<\/a> had the details/g, (m, u) => { fixed++; return `, and the <a href="${u}">calendars</a> barely registered it` })
  s = s.replace(/was read by <a href="([^"]*)">the published calendars<\/a> as turning back toward protest,/g, () => { fixed++; return 'turned back toward protest,' })
  s = s.replace(/and was covered mainly by <a href="[^"]*">the published schedule<\/a> and <a href="[^"]*">the published calendars<\/a>/g, () => { fixed++; return 'and drew a fraction of the attention' })

  if (s !== before) fs.writeFileSync(p, s)
}

console.log('citation paragraphs/clauses dropped:', dropped)
console.log('citation anchors reworded:', fixed)
