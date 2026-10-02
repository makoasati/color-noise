// Swap dead Instagram embeds for live ones from the same event's post set.
//
// Usage: node scripts/replace-broken-embeds.js [--dry-run]
//
// fetch-embed-meta.js records a shortcode as null when Instagram serves the
// "unavailable" card — deleted, private, or geo-blocked. A null has two
// consequences: embeds.js throws for any embed without a credit fallback, and
// any that does have one renders a dead card. §7 is explicit that a dead link
// is worse than no link, so these get replaced rather than papered over.
//
// Replacements come from the same event in research/events.json, skipping any
// shortcode already used anywhere in the package and anything already known
// broken. Re-run fetch-embed-meta.js afterwards: the replacements are unproven
// until harvested, and a second pass may surface more.

const fs = require('fs')
const path = require('path')

const DRY = process.argv.includes('--dry-run')
const DIR = 'content/summer-2026'
const META_PATH = path.join(DIR, 'embed-meta.json')

// embed-meta.json is keyed by platform — { instagram: {...}, facebook: {...} }.
// Only Instagram shortcodes are swappable here; Facebook embeds are full URLs.
const metaFile = JSON.parse(fs.readFileSync(META_PATH, 'utf8'))
const meta = metaFile.instagram || metaFile
const events = new Map(require('./../research/events.json').map(e => [e.ref, e]))

const parts = fs.readdirSync(DIR).filter(f => /^part\d+\.js$/.test(f))
  .sort((a, b) => parseInt(a.slice(4), 10) - parseInt(b.slice(4), 10))

// Everything currently referenced, so a replacement is never a duplicate.
const inUse = new Set()
for (const f of parts) {
  const s = fs.readFileSync(path.join(DIR, f), 'utf8')
  for (const m of s.matchAll(/E\.instagram\('([^']+)'/g)) inUse.add(m[1])
}

const isBroken = sc => Object.prototype.hasOwnProperty.call(meta, sc) && meta[sc] === null

function candidates(ref) {
  const ev = events.get(ref)
  if (!ev || !ev.posts || !ev.posts.items) return []
  const out = []
  for (const p of ev.posts.items) {
    const m = String(p.url).match(/instagram\.com\/(?:p|reel)\/([\w-]+)/)
    if (!m) continue
    const sc = m[1]
    if (inUse.has(sc) || isBroken(sc)) continue
    out.push({ sc, post: p, weight: (p.description || '').length })
  }
  out.sort((a, b) => b.weight - a.weight)
  return out
}

let swapped = 0, unfixable = 0
const log = []

for (const f of parts) {
  const full = path.join(DIR, f)
  let src = fs.readFileSync(full, 'utf8')
  let changed = false

  // Per-article slices, so a replacement comes from the right event.
  const re = /(\r?\n\s*ref: ')([^']+)(',[\s\S]*?)(?=\r?\n\s*ref: '|$)/g
  const slices = []
  let m
  while ((m = re.exec(src))) slices.push({ ref: m[2], text: m[0], start: m.index })

  for (const sl of slices) {
    const used = [...sl.text.matchAll(/E\.instagram\('([^']+)'/g)].map(x => x[1])
    const dead = used.filter(isBroken)
    if (!dead.length) continue

    let next = sl.text
    const pool = candidates(sl.ref)
    for (const sc of dead) {
      const pick = pool.shift()
      if (!pick) {
        unfixable++
        log.push(`KEEP  ${sl.ref}  ${sc} — no live replacement left in the post set`)
        continue
      }
      inUse.add(pick.sc)
      next = next.replace(`E.instagram('${sc}'`, `E.instagram('${pick.sc}'`)
      // Any hand-written caption referred to the old post; make it neutral and
      // let the harvested handle and caption carry the attribution.
      const when = pick.post.at ? String(pick.post.at).slice(0, 10) : null
      next = next.replace(
        new RegExp(`(E\\.instagram\\('${pick.sc}', \\{[^}]*?caption: ')[^']*(')`),
        `$1${when ? 'Posted ' + when : 'Attendee footage'}$2`
      )
      swapped++
      log.push(`swap  ${sl.ref}  ${sc} -> ${pick.sc}  (@${pick.post.username || '?'})`)
    }
    if (next !== sl.text) { src = src.replace(sl.text, next); changed = true }
  }

  if (changed && !DRY) fs.writeFileSync(full, src)
}

for (const l of log) console.log(l)
console.log(`\n${swapped} swapped · ${unfixable} with no replacement available`)
if (DRY) console.log('DRY RUN — nothing written')
else console.log('Next: node scripts/fetch-embed-meta.js to prove the replacements render')
