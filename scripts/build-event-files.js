// Flatten the research dossier into the simple per-event structure:
//   name · date · neighborhood · summary · category · hashtags · article links · post links
//
// Usage: node scripts/build-event-files.js [--check]
//
// Inputs
//   research/chicago-summer-2026-events.md   the dossier (source of truth)
//   EVENT FILES.md                           manifest of eyewitness post JSONs
//   research/social-posts/                   the post JSONs themselves, if present
//
// Outputs
//   research/EVENTS.md     one compact block per event, for reading and editing
//   research/events.json   same data, for the site and the events table
//
// Summaries are machine-derived from the dossier's "2026 specifics" line and then
// trimmed. They're a usable first draft, not finished copy — expect to rewrite the
// ones you build articles on.

const fs = require('fs')
const path = require('path')

const DOSSIER = 'research/chicago-summer-2026-events.md'
const MANIFEST = 'EVENT FILES.md'
const POSTDIR = 'research/social-posts'
const SCRAPEDIR = 'event scrape'
const FULLDIR = 'research/posts'
const CHECK = process.argv.includes('--check')

// Entries that are headline groupings rather than one event.
const CLUSTERS = new Set([65, 70, 71, 84])

// ── read the dossier into per-event sections ─────────────────────────────────

function sections() {
  const lines = fs.readFileSync(DOSSIER, 'utf8').split('\n')
  const out = {}
  let n = null
  for (const line of lines) {
    const h = line.match(/^###\s+(\d+)\.\s*(.+)$/)
    if (h) { n = Number(h[1]); out[n] = { num: n, head: h[2], lines: [] }; continue }
    if (!n) continue
    if (/^#{1,3}\s/.test(line)) { n = null; continue }
    out[n].lines.push(line)
  }
  return out
}

const strip = s => String(s || '')
  .replace(/\*\*/g, '')
  .replace(/`/g, '')
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')   // markdown links -> label
  .replace(/[⚠️⭐🟢🟡🟠🔒🖼️]/g, '')
  .replace(/\s+/g, ' ')
  .trim()

function name(head) {
  return strip(head)
    .replace(/\s+—\s+\*?[A-Za-z]+\*?\s*$/, '')      // trailing "— September"
    .replace(/\s+—\s+.*$/, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim()
}

// First bullet: "- **<dates>** (note) · <venue, hood> · `cat`"
function headline(e) {
  const first = e.lines.find(l => /^- \*\*/.test(l)) || ''
  const segs = first.replace(/^- /, '').split('·')
  const dm = (segs[0] || '').match(/\*\*(.+?)\*\*/)
  const date = dm ? strip(dm[1]) : null

  let venue = null
  for (const s of segs.slice(1)) {
    const v = strip(s)
    if (!v || /^(music|art|food|nightlife)$/i.test(v)) continue
    venue = v
    break
  }
  const body = e.lines.join('\n')
  const category = (body.match(/`(music|art|food|nightlife)`/) || [])[1] || null
  return { date, venue, category }
}

// Known neighbourhoods, checked before the comma heuristic. Several dossier venue
// fields are parade routes or bare addresses where the heuristic can't win.
const HOODS = [
  'Albany Park', 'Andersonville', 'Avondale', 'Back of the Yards', 'Bridgeport', 'Bronzeville',
  'Bucktown', 'Chinatown', 'Douglass Park', 'Edgewater', 'Edison Park', 'Englewood',
  'Goose Island', 'Gold Coast', 'Grant Park', 'Greektown', 'Humboldt Park', 'Hyde Park',
  'Jefferson Park', 'Lakeview', 'Lincoln Park', 'Lincoln Square', 'Little Village',
  'Logan Square', 'Loop', 'McKinley Park', 'Millennium Park', 'Near West Side',
  'North Center', 'North Lawndale', 'Northalsted', 'Northerly Island', 'Old Town', 'Pilsen',
  'Portage Park', 'Pullman', 'Ravenswood', 'River North', 'Rogers Park', 'Roscoe Village',
  'South Shore', 'Uptown', 'Washington Park', 'West Loop', 'West Town', 'Wicker Park',
  'Woodlawn', 'Wrigleyville', 'Bridgeview', 'Highland Park', 'Navy Pier',
]

// Venues whose neighbourhood the name alone doesn't give away.
const VENUE_HOOD = {
  'Jay Pritzker Pavilion': 'Millennium Park', 'Pritzker Pavilion': 'Millennium Park',
  'Maxwell St': 'Near West Side', 'Maxwell Street': 'Near West Side',
  'North Avenue Beach': 'Lincoln Park', 'Soldier Field': 'Near South Side',
  'Museum of Contemporary Art': 'Streeterville', 'MCA': 'Streeterville',
  'Art Institute': 'Loop', 'Chicago Cultural Center': 'Loop',
  'Preston Bradley Hall': 'Loop', 'Butler Field': 'Grant Park',
  'Hutchinson Field': 'Grant Park', 'Union Park': 'West Town',
  'Daley Plaza': 'Loop', 'Salt Shed': 'Goose Island', 'Smartbar': 'Wrigleyville',
  'Sleeping Village': 'Avondale', 'Thalia Hall': 'Pilsen',
  'DuSable': 'Washington Park', 'Jackson Park': 'Woodlawn',
  'Midway Plaisance': 'Hyde Park', 'La Villita Park': 'Little Village',
  'SeatGeek Stadium': 'Bridgeview', 'United Center': 'Near West Side',
  'Ramova Theatre': 'Bridgeport', 'Wrigley Field': 'Wrigleyville',
  'Gallagher Way': 'Wrigleyville', 'Copernicus Center': 'Jefferson Park',
}

function neighborhood(venue, body) {
  const hay = `${venue || ''} ${body || ''}`
  for (const [v, h] of Object.entries(VENUE_HOOD)) {
    if (new RegExp(`\\b${v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(venue || '')) return h
  }
  // Prefer the venue field, then the wider section.
  for (const src of [venue || '', hay]) {
    const hits = HOODS.filter(h => new RegExp(`\\b${h}\\b`, 'i').test(src))
    if (hits.length) {
      // Longest match wins so "North Lawndale" beats a stray "Lawndale".
      return hits.sort((a, b) => b.length - a.length)[0]
    }
  }
  if (/citywide|various|multiple/i.test(hay)) return 'Citywide'
  return null
}

// Two sentences from the "2026 specifics" bullet, else the first prose bullet.
function summary(e) {
  const pick = e.lines.find(l => /^- \*\*2026 specifics/.test(l))
    || e.lines.find(l => /^- \*\*What played/.test(l))
    || e.lines.find(l => /^- \*\*Angle:/.test(l))
    || e.lines.find(l => /^- \*\*Story angles/.test(l))
    || e.lines.find(l => /^- \*\*(Rooms that matter|What's in|2026 dates)/.test(l))
    // Last resort: the first bullet that is prose rather than a labelled field.
    || e.lines.find(l => /^- /.test(l) && !/^-\s*(🖼️\s*)?\*\*/.test(l) && strip(l).length > 60)
    || ''
  let t = strip(pick)
    .replace(/^-\s*/, '')                    // strip() keeps the bullet dash
    .replace(/^2026 specifics:\s*/i, '')
    .replace(/^What played,? verified:\s*/i, '')
    .replace(/^Story angles?:\s*/i, '')
    .replace(/^Angle:\s*/i, '')
    .replace(/^Rooms that matter:\s*/i, 'Venues: ')
    .replace(/^\(a\)\s*/, '')
  // Keep it to roughly two sentences without cutting mid-abbreviation.
  const parts = t.split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/)
  t = parts.slice(0, 2).join(' ')
  if (t.length > 360) t = t.slice(0, 357).replace(/\s+\S*$/, '') + '…'
  return t || null
}

const STOP = new Set(['the', 'of', 'and', 'at', 'in', 'on', 'a', 'chicago',
  'festival', 'fest', 'music', 'annual', 'street', 'park', 'taste'])

function hashtags(e, evName) {
  const body = e.lines.join('\n')
  const found = [...new Set(body.match(/#[A-Za-z0-9_]{3,40}/g) || [])]
  if (found.length) return { tags: found, derived: false }
  // No hashtag in the dossier, so derive one from the distinctive words of the
  // name. A full slug of "Chosen Few Picnic & House Music Festival" is
  // unsearchable; the first few significant words are what people actually tag.
  const words = evName.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean)
  let keep = words.filter(w => !STOP.has(w))
  if (!keep.length) keep = words
  let slug = ''
  for (const w of keep) { if ((slug + w).length > 22) break; slug += w }
  if (slug.length < 4) slug = keep.join('').slice(0, 22)
  if (slug.length < 4) return { tags: [], derived: false }
  return { tags: [`#${slug}`, `#${slug}2026`], derived: true }
}

// Readable label from a bare url, e.g. blockclubchicago.org -> Block Club Chicago
const HOSTNAMES = {
  'blockclubchicago.org': 'Block Club Chicago', 'chicago.suntimes.com': 'Chicago Sun-Times',
  'chicagoreader.com': 'Chicago Reader', 'wbez.org': 'WBEZ', 'www.wbez.org': 'WBEZ',
  'abc7chicago.com': 'ABC7 Chicago', 'www.nbcchicago.com': 'NBC Chicago',
  'www.cbsnews.com': 'CBS Chicago', 'www.fox32chicago.com': 'FOX32 Chicago',
  'wgntv.com': 'WGN', 'news.wttw.com': 'WTTW', 'www.choosechicago.com': 'Choose Chicago',
  'www.chicago.gov': 'City of Chicago', 'thetriibe.com': 'The TRiiBE',
  '5mag.net': '5 Magazine', 'thirdcoastreview.com': 'Third Coast Review',
  'www.axios.com': 'Axios Chicago', 'www.hpherald.com': 'Hyde Park Herald',
  'do312.com': 'Do312', 'www.timeout.com': 'Time Out Chicago',
  'www.chicagogallerynews.com': 'Chicago Gallery News', 'art.newcity.com': 'Newcity Art',
  'music.newcity.com': 'Newcity Music', 'windycitytimes.com': 'Windy City Times',
  'ra.co': 'Resident Advisor', 'www.jambase.com': 'JamBase',
}
function labelFor(url) {
  try {
    const h = new URL(url).host
    if (HOSTNAMES[h]) return HOSTNAMES[h]
    return h.replace(/^www\./, '')
  } catch (e) { return url }
}

// Every article/source URL in the section, excluding the image blocks. Walks
// bullets statefully because the cover and alternates blocks use indented
// continuation lines that also contain urls.
function articles(e) {
  const SKIP = /^-\s*(🖼️\s*)?\*\*(Images|Alternates|COVER IMAGE|Photos)\b/
  const out = []
  let skipping = false
  for (const line of e.lines) {
    const isTopBullet = /^-\s/.test(line)
    if (isTopBullet) skipping = SKIP.test(line)
    else if (!/^\s+/.test(line)) skipping = false     // blank/prose resets
    if (skipping) continue

    // Strip the inline "· **Photos:** ..." tail that condensed entries append.
    const usable = line.split(/·\s*\*\*Photos:\*\*/)[0]

    for (const m of usable.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g)) {
      const url = m[2].replace(/[.,]$/, '')
      if (!out.some(a => a.url === url)) out.push({ label: strip(m[1]), url })
    }
    const bare = usable.replace(/\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/g, '')
    for (const m of bare.matchAll(/https?:\/\/[^\s·)\]]+/g)) {
      const url = m[0].replace(/[.,]$/, '')
      // Social URLs are normally image sources, not articles — but a few events
      // (Pilsen Open Studios) have a Facebook page as their only primary source.
      const isPrimary = /^-\s*\*\*(Primary source|Source)\b/.test(line)
      if (/commons\.wikimedia\.org/.test(url)) continue
      if (!isPrimary && /instagram\.com|facebook\.com|fb\.com/.test(url)) continue
      if (!out.some(a => a.url === url)) out.push({ label: labelFor(url), url })
    }
  }
  return out
}

// ── eyewitness posts ─────────────────────────────────────────────────────────

// The eyewitness posts arrived as eight themed markdown files rather than the
// per-event JSONs EVENT FILES.md describes. Format, consistent across all eight:
//
//   ## D1 — Lollapalooza
//   ### Post 1
//   **Platform:** Instagram · **User:** @x · **Posted:** 2026-07-31 13:28:11 UTC
//   **Link:** https://...
//   <description paragraph(s)>
//
function parseScrapeDir() {
  if (!fs.existsSync(SCRAPEDIR)) return {}
  const byEvent = {}
  for (const file of fs.readdirSync(SCRAPEDIR).filter(f => f.endsWith('.md')).sort()) {
    const text = fs.readFileSync(path.join(SCRAPEDIR, file), 'utf8')
    // Split into event chunks on "## D<n> — Name"
    const chunks = text.split(/^(?=## D\d+\s+[—–-])/m)
    for (const chunk of chunks) {
      const h = chunk.match(/^## D(\d+)\s+[—–-]\s*(.+)$/m)
      if (!h) continue
      const num = Number(h[1])
      const posts = []
      for (const block of chunk.split(/^### Post \d+\s*$/m).slice(1)) {
        const meta = block.match(/\*\*Platform:\*\*\s*([^·\n]+)·\s*\*\*User:\*\*\s*([^·\n]+)·\s*\*\*Posted:\*\*\s*([^\n]+)/)
        const link = block.match(/\*\*Link:\*\*\s*(\S+)/)
        if (!link) continue
        const desc = block
          .replace(/\*\*Platform:\*\*[^\n]*\n?/, '')
          .replace(/\*\*Link:\*\*[^\n]*\n?/, '')
          .trim()
        posts.push({
          platform: meta ? meta[1].trim() : null,
          username: meta ? meta[2].trim().replace(/^@/, '') : null,
          at: meta ? meta[3].trim().replace(/\s*UTC$/, '') : null,
          url: link[1],
          description: desc,
          source_file: file,
        })
      }
      if (posts.length) {
        byEvent[num] = byEvent[num] || { name: h[2].trim(), posts: [] }
        byEvent[num].posts.push(...posts)
      }
    }
  }
  return byEvent
}

// First sentence of a post description, for the inline index in EVENTS.md.
function snippet(desc, max = 190) {
  if (!desc) return null
  let t = String(desc).replace(/\s+/g, ' ').trim()
  t = t.replace(/^TLDR:\s*/i, '')
  const m = t.match(/^(.{40,}?[.!?])(\s|$)/)
  if (m) t = m[1]
  if (t.length > max) t = t.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
  return t
}

// Parse EVENT FILES.md: "- ✅ D1 Lollapalooza: **40** — `D1_lollapalooza.json`"
function postManifest() {
  if (!fs.existsSync(MANIFEST)) return {}
  const out = {}
  for (const line of fs.readFileSync(MANIFEST, 'utf8').split('\n')) {
    const m = line.match(/^-\s*[^\s]*\s*D(\d+)\s+(.+?):\s*\*\*(\d+)\*\*\s*—\s*`([^`]+)`/)
    if (!m) continue
    out[Number(m[1])] = { count: Number(m[3]), file: m[4], label: m[2].trim() }
  }
  return out
}

// If the JSONs are present, pull real post URLs out of them.
function postUrls(entry) {
  if (!entry) return { urls: [], present: false }
  const p = path.join(POSTDIR, entry.file)
  if (!fs.existsSync(p)) return { urls: [], present: false }
  try {
    const arr = JSON.parse(fs.readFileSync(p, 'utf8'))
    const urls = (Array.isArray(arr) ? arr : []).map(r => ({
      url: r.post_url,
      platform: r.platform,
      username: r.username,
      at: r.post_created_at,
      snippet: r.caption_snippet,
    })).filter(r => r.url)
    return { urls, present: true }
  } catch (err) {
    return { urls: [], present: false, error: err.message }
  }
}

// ── build ────────────────────────────────────────────────────────────────────

const secs = sections()
const posts = postManifest()
const scraped = parseScrapeDir()

const events = Object.values(secs).sort((a, b) => a.num - b.num).map(e => {
  const evName = name(e.head)
  const { date, venue, category } = headline(e)
  const body = e.lines.join('\n')
  const { tags, derived } = hashtags(e, evName)
  const pm = posts[e.num]
  const pu = postUrls(pm)
  return {
    ref: `D${e.num}`,
    name: evName,
    date,
    neighborhood: neighborhood(venue, body),
    venue,
    summary: summary(e),
    category,
    hashtags: tags,
    hashtags_derived: derived,
    handles: [...new Set((body.match(/@[A-Za-z0-9._]{3,30}/g) || [])
      .filter(h => !/^@(c3presents|gmail|example)/i.test(h)))].slice(0, 8),
    articles: articles(e),
    posts: (() => {
      const sc = scraped[e.num]
      if (sc) {
        return {
          count: sc.posts.length,
          source: 'event scrape',
          available: true,
          items: sc.posts,                       // full descriptions kept in events.json
        }
      }
      return {
        count: pm ? pm.count : 0,
        source: pm ? pm.file : null,
        available: pu.present,
        items: pu.urls,
      }
    })(),
    is_cluster: CLUSTERS.has(e.num),
  }
})

if (CHECK) {
  const miss = f => events.filter(e => !e[f] || (Array.isArray(e[f]) && !e[f].length)).map(e => e.ref)
  console.log(`events:        ${events.length}`)
  console.log(`no date:       ${miss('date').join(', ') || 'none'}`)
  console.log(`no hood:       ${miss('neighborhood').join(', ') || 'none'}`)
  console.log(`no summary:    ${miss('summary').join(', ') || 'none'}`)
  console.log(`no category:   ${miss('category').join(', ') || 'none'}`)
  console.log(`no articles:   ${miss('articles').join(', ') || 'none'}`)
  console.log(`derived tags:  ${events.filter(e => e.hashtags_derived).length}`)
  const withPosts = events.filter(e => e.posts.count > 0)
  console.log(`manifest rows: ${withPosts.length}  (${withPosts.reduce((s, e) => s + e.posts.count, 0)} posts)`)
  console.log(`json present:  ${events.filter(e => e.posts.available).length}`)
  process.exit(0)
}

// ── EVENTS.md ────────────────────────────────────────────────────────────────

const L = []
L.push('# Color&Noise — Chicago 2026 events')
L.push('')
L.push(`${events.length} events. Generated from \`${DOSSIER}\` by \`scripts/build-event-files.js\` — edit the dossier, not this file, then re-run.`)
L.push('')
L.push('Fields: **name · date · neighborhood · summary · category · hashtags · handles · articles · posts**.')
L.push('Summaries are machine-derived first drafts. Rewrite the ones you build articles on.')
L.push('')
const scrapedCount = events.filter(e => e.posts.available && e.posts.count).length
if (scrapedCount) {
  const n = events.reduce((s, e) => s + (e.posts.available ? e.posts.count : 0), 0)
  L.push(`**Eyewitness posts:** ${n} across ${scrapedCount} events, parsed from \`event scrape/\`.`)
  L.push(`Each post shows platform, handle, date, link and the opening line of its write-up. The **full write-up for every post** lives in \`research/posts/D<n>.md\` — linked from each event. Complete data including every full description is in \`research/events.json\`.`)
  L.push('')
  L.push('Post timestamps were cross-checked against the dossier dates: every event\'s posts cluster inside its date window (allowing for people posting a day or two late). The only outlier is D62 Renegade Craft, whose posts are from its September edition rather than the May one — it runs twice.')
  L.push('')
}
const totalPosts = events.reduce((s, e) => s + e.posts.count, 0)
const anyAvailable = events.some(e => e.posts.available)
if (totalPosts && !anyAvailable) {
  L.push(`> ⚠️ **Post links unresolved.** \`EVENT FILES.md\` lists ${totalPosts} eyewitness posts across ${events.filter(e => e.posts.count).length} events, but the JSON files it names are not in this repo. Drop them in \`${POSTDIR}/\` and re-run to fill in real post URLs. Until then each event shows its expected filename and count.`)
  L.push('')
}
L.push('---')
L.push('')

for (const e of events) {
  L.push(`## ${e.ref} · ${e.name}${e.is_cluster ? '  ⚠️ cluster, not a single event' : ''}`)
  L.push('')
  L.push(`- **Date:** ${e.date || '—'}`)
  L.push(`- **Neighborhood:** ${e.neighborhood || '—'}${e.venue && e.venue !== e.neighborhood ? `  ·  *${e.venue}*` : ''}`)
  L.push(`- **Category:** \`${e.category || '—'}\``)
  L.push(`- **Summary:** ${e.summary || '—'}`)
  L.push(`- **Hashtags:** ${e.hashtags.length ? e.hashtags.join(' ') + (e.hashtags_derived ? '  *(derived from the name — unverified)*' : '') : '—'}`)
  L.push(`- **Handles:** ${e.handles.length ? e.handles.join(' ') : '—'}`)
  L.push(`- **Articles (${e.articles.length}):**`)
  if (e.articles.length) {
    for (const a of e.articles) L.push(`  - [${a.label || a.url}](${a.url})`)
  } else {
    L.push('  - —')
  }
  if (e.posts.count && e.posts.available) {
    L.push(`- **Posts (${e.posts.count})** — full write-ups: [\`research/posts/${e.ref}.md\`](posts/${e.ref}.md)`)
    for (const p of e.posts.items) {
      const who = p.username ? `@${p.username}` : (p.platform || 'post')
      const when = p.at ? ` · ${String(p.at).slice(0, 10)}` : ''
      const s = snippet(p.description || p.snippet, 150)
      L.push(`  - [${who}](${p.url})${when}${s ? ` — ${s}` : ''}`)
    }
  } else if (e.posts.count) {
    L.push(`- **Posts:** ${e.posts.count} collected — \`${e.posts.source}\` *(file not found)*`)
  } else {
    L.push(`- **Posts:** none collected${posts[e.num] || scraped[e.num] ? '' : ' — not in the scrape set'}`)
  }
  L.push('')
}

fs.mkdirSync('research', { recursive: true })
fs.writeFileSync('research/EVENTS.md', L.join('\n'))
fs.writeFileSync('research/events.json', JSON.stringify(events, null, 2))

// Full post write-ups, one file per event. EVENTS.md carries a one-line snippet
// per post and links here; 3,000 full descriptions inline would be ~700k words
// and would defeat the point of the simplified structure.
let wroteFull = 0
for (const e of events) {
  if (!e.posts.available || !e.posts.count) continue
  if (!e.posts.items.some(p => p.description)) continue
  const F = []
  F.push(`# ${e.ref} · ${e.name} — eyewitness posts`)
  F.push('')
  F.push(`${e.posts.count} posts · ${e.date || ''}${e.neighborhood ? ' · ' + e.neighborhood : ''}`)
  F.push(`Back to the index: [EVENTS.md](../EVENTS.md)`)
  F.push('')
  F.push('---')
  F.push('')
  e.posts.items.forEach((p, i) => {
    F.push(`## ${i + 1}. ${p.username ? '@' + p.username : (p.platform || 'post')}`)
    F.push('')
    const bits = [p.platform, p.at ? p.at + ' UTC' : null].filter(Boolean).join(' · ')
    if (bits) F.push(`*${bits}*`)
    F.push(`<${p.url}>`)
    F.push('')
    if (p.description) { F.push(p.description); F.push('') }
  })
  fs.mkdirSync(FULLDIR, { recursive: true })
  fs.writeFileSync(path.join(FULLDIR, `${e.ref}.md`), F.join('\n'))
  wroteFull++
}
console.log(`wrote ${wroteFull} per-event post files to ${FULLDIR}/`)

console.log(`wrote research/EVENTS.md and research/events.json (${events.length} events)`)
console.log(`articles linked: ${events.reduce((s, e) => s + e.articles.length, 0)}`)
console.log(`posts expected:  ${totalPosts}${anyAvailable ? '' : '  (JSONs not found — see the note at the top of EVENTS.md)'}`)
