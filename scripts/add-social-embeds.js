// Give every published article its eyewitness social context.
//
// Usage: node scripts/add-social-embeds.js [--dry-run] [--only=D1,D2] [--per=3]
//
// 63 of the 67 summer-2026 articles went live with a cover and nothing else,
// which puts them under the 4-image floor in ARTICLE-STANDARDS §5. §5.4 makes
// embeds the package's primary art strategy, so this inserts verified embeds
// from each event's own post set into the existing bodies.
//
// What this does NOT do: write prose. Embeds illustrate; they do not report
// (§5.4). The eyewitness reporting gets woven into the writing during the
// per-byline rewrites — this pass only closes the image gap.
//
// Selection favours variety of account, substantive descriptions, and the
// platforms embeds.js can actually serve. X is excluded: no script-free iframe.
//
// Placement follows §5.3 — spread through the body, never two adjacent, never
// the last element.

const fs = require('fs')
const path = require('path')
const E = require('./../content/summer-2026/embeds')

const DRY = process.argv.includes('--dry-run')
const arg = (n, d) => {
  const h = process.argv.find(a => a.startsWith(`--${n}=`))
  return h ? h.slice(n.length + 3) : d
}
const ONLY = arg('only', '').split(',').filter(Boolean)
const PER = parseInt(arg('per', '3'), 10)

const PARTS = fs.readdirSync('content/summer-2026')
  .filter(f => /^part\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.slice(4), 10) - parseInt(b.slice(4), 10))

const events = new Map(require('./../research/events.json').map(e => [e.ref, e]))

// ── pick the embeds ──────────────────────────────────────────────────────────

function classify(url) {
  const u = String(url)
  let m
  if ((m = u.match(/instagram\.com\/(?:p|reel)\/([\w-]+)/))) return { kind: 'ig', id: m[1] }
  if (/facebook\.com\/(?:reel|[\w.]+\/videos)\//.test(u)) return { kind: 'fb', id: u }
  if ((m = u.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/))) return { kind: 'tt', id: m[1], permalink: u }
  if ((m = u.match(/youtube\.com\/watch\?v=([\w-]+)/))) return { kind: 'yt', id: m[1] }
  return null
}

function pick(ref) {
  const ev = events.get(ref)
  if (!ev || !ev.posts || !ev.posts.items) return []
  const cands = []
  for (const p of ev.posts.items) {
    const c = classify(p.url)
    if (!c) continue
    cands.push({ ...c, post: p, weight: (p.description || '').length })
  }
  // Longest write-up first — those are the posts with something in them — then
  // one per account so three embeds are not the same person three times.
  cands.sort((a, b) => b.weight - a.weight)
  const out = []
  const seenUser = new Set()
  for (const c of cands) {
    const u = (c.post.username || '').toLowerCase()
    if (u && seenUser.has(u)) continue
    seenUser.add(u)
    out.push(c)
    if (out.length === PER) break
  }
  return out
}

// A caption that says what the reader is about to look at, and a credit that
// survives the iframe breaking.
function render(c) {
  const who = c.post.username || 'via social'
  const handle = /facebook/.test(String(c.post.url)) ? who : '@' + String(who).replace(/^@/, '')
  const plat = c.kind === 'ig' ? 'Instagram' : c.kind === 'fb' ? 'Facebook'
    : c.kind === 'tt' ? 'TikTok' : 'YouTube'
  const when = c.post.at ? String(c.post.at).slice(0, 10) : null
  const caption = when ? `Posted ${when}` : 'Attendee footage'
  const credit = `${handle} via ${plat}`
  if (c.kind === 'ig') return E.instagram(c.id, { caption, credit })
  if (c.kind === 'fb') return E.facebookVideo(c.id, { caption, credit })
  if (c.kind === 'tt') return E.tiktok(c.id, { caption, credit, permalink: c.permalink })
  return E.youtube(c.id, { caption, credit })
}

// ── place them in the body ───────────────────────────────────────────────────

// Insert after closing </p> tags, spread out, never adjacent, and never after
// the final block (which is the cover-credit line).
function insert(body, blocks) {
  const parts = body.split(/(<\/p>)/)
  const stops = []
  for (let i = 0; i < parts.length; i++) if (parts[i] === '</p>') stops.push(i)
  // Drop the cover-credit paragraph and the one before it from consideration.
  const usable = stops.slice(1, Math.max(1, stops.length - 1))
  if (usable.length < blocks.length) return null

  // Distinct stops only. Two embeds resolving to the same paragraph meant the
  // second assignment overwrote the first and an embed vanished silently.
  const taken = new Set()
  const chosen = []
  const step = usable.length / (blocks.length + 1)
  for (let k = 1; k <= blocks.length; k++) {
    let idx = Math.min(usable.length - 1, Math.max(0, Math.round(k * step) - 1))
    let tries = 0
    while (taken.has(usable[idx]) && tries < usable.length) {
      idx = (idx + 1) % usable.length
      tries++
    }
    if (taken.has(usable[idx])) return null      // genuinely no room
    taken.add(usable[idx])
    chosen.push(usable[idx])
  }
  // Insert from the back so earlier indices stay valid.
  const pairs = chosen.map((at, i) => ({ at, html: blocks[i] })).sort((a, b) => b.at - a.at)
  for (const p of pairs) parts[p.at] = '</p>\n\n' + p.html
  return parts.join('')
}

// ── run ──────────────────────────────────────────────────────────────────────

let touched = 0, skipped = 0, failed = 0
const log = []

for (const file of PARTS) {
  const full = path.join('content/summer-2026', file)
  let src = fs.readFileSync(full, 'utf8')
  let changed = false

  // Walk each article's body template literal in this file.
  // Line endings vary: files created here are LF, but anything git has touched
  // comes back CRLF on Windows. Match either or this silently finds nothing.
  const re = /\r?\n\s*ref: '([^']+)',[\s\S]*?\r?\n\s*body: `([\s\S]*?)`,\r?\n/g
  const edits = []
  let m
  while ((m = re.exec(src))) {
    const [whole, ref, body] = m
    if (ONLY.length && !ONLY.includes(ref)) continue
    // In source, part8's embeds are template calls, not literal iframe markup.
    // Check for both or the rewrites pick up a second set.
    if (body.includes('<iframe') || body.includes('${E.')) {
      skipped++; log.push(`skip  ${ref}  already has embeds`); continue
    }
    const picks = pick(ref)
    if (picks.length < PER) { failed++; log.push(`FAIL  ${ref}  only ${picks.length} embeddable post(s)`); continue }
    let blocks
    try { blocks = picks.map(render) } catch (e) { failed++; log.push(`FAIL  ${ref}  ${e.message}`); continue }
    const next = insert(body, blocks)
    if (!next) { failed++; log.push(`FAIL  ${ref}  body too short to place ${PER} embeds`); continue }
    edits.push({ from: whole, to: whole.replace(body, next) })
    touched++
    log.push(`ok    ${ref}  +${picks.length} (${picks.map(p => p.kind).join(',')})`)
  }
  for (const e of edits) { src = src.replace(e.from, e.to); changed = true }
  if (changed && !DRY) fs.writeFileSync(full, src)
}

for (const l of log) console.log(l)
console.log(`\n${touched} article(s) given embeds · ${skipped} already had them · ${failed} failed`)
if (DRY) console.log('DRY RUN — nothing written')
