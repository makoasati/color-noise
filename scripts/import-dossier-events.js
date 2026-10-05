// Color&Noise — import the research dossier into the events calendar
//
// Reads research/events.json (generated from the dossier by build-event-files.js)
// and inserts each datable event into the `events` table.
//
// Usage
//   node scripts/import-dossier-events.js                 dry run — prints the plan, writes nothing
//   node scripts/import-dossier-events.js --commit        insert
//   node scripts/import-dossier-events.js --refs=D97,D98  only these refs
//   node scripts/import-dossier-events.js --max-span=30   skip rows longer than 30 days
//   node scripts/import-dossier-events.js --status=pending
//
// Non-destructive by design: it never deletes or updates, and it skips any event
// the calendar already has. Re-running it is safe.
//
// Dossier dates are prose ("Fri Jul 24 and Sat Jul 25, 2026", "Every Sunday,
// year-round"), so the date parser is the bulk of this file. Anything it cannot
// place on a calendar is skipped and reported rather than guessed at.

try { require('dotenv').config({ path: '.env.local' }) } catch {}

const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

const COMMIT = process.argv.includes('--commit')
const arg = name => {
  const hit = process.argv.find(a => a.startsWith(`--${name}=`))
  return hit ? hit.slice(name.length + 3) : null
}
const ONLY_REFS = arg('refs') ? new Set(arg('refs').split(',').map(s => s.trim().toUpperCase())) : null
const MAX_SPAN = arg('max-span') ? Number(arg('max-span')) : Infinity
const STATUS = arg('status') || 'approved'

const VALID_CATEGORIES = new Set(['music', 'art', 'food', 'nightlife'])

// ── date parsing ─────────────────────────────────────────────────────────────

const MONTHS = {
  jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3, apr: 4, april: 4,
  may: 5, jun: 6, june: 6, jul: 7, july: 7, aug: 8, august: 8,
  sep: 9, sept: 9, september: 9, oct: 10, october: 10,
  nov: 11, november: 11, dec: 12, december: 12,
}
const MONTH_RE = Object.keys(MONTHS).sort((a, b) => b.length - a.length).join('|')

const WEEKDAYS_PLURAL = /\b(mondays|tuesdays|wednesdays|thursdays|fridays|saturdays|sundays)\b,?\s*/gi
const WEEKDAYS = /\b(mon|tue|tues|wed|weds|thu|thur|thurs|fri|sat|sun|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b,?\s*/gi
const TIME_RANGE = /\b(\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s*[-–—]\s*\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/i

const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`
const lastDayOf = (y, m) => new Date(y, m, 0).getDate()

function daysBetween(a, b) {
  const [y1, m1, d1] = a.split('-').map(Number)
  const [y2, m2, d2] = b.split('-').map(Number)
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000) + 1
}

// Returns { dates: [{date, end_date}], time } or { skip: reason }
function parseDossierDate(raw) {
  const original = String(raw || '')
  if (!original.trim()) return { skip: 'no date field' }

  // Anything recurring, open-ended or explicitly unresolved cannot be placed.
  if (/not established/i.test(original)) return { skip: 'dossier says date not established' }
  if (/year-round|ongoing|every sunday|every month|^annual\b/i.test(original)) return { skip: 'recurring / year-round' }
  if (/\bthrough\b/i.test(original)) return { skip: 'open-ended season (no start date)' }

  // Year comes from the whole string: D60 carries it in the label ("2026 dates: ...").
  const yearMatch = original.match(/\b(19|20)\d{2}\b/)
  if (!yearMatch) return { skip: 'no year' }
  const year = Number(yearMatch[0])

  let s = original
    .replace(/[–—]/g, '-')
    .replace(/\b(19|20)\d{2}\b/g, ' ')          // drop the year, we have it
    .replace(/\s+/g, ' ')
    .trim()

  // Pull a time range out before the weekday/label stripping mangles it.
  let time = null
  const timeHit = s.match(TIME_RANGE)
  if (timeHit) {
    time = timeHit[1].replace(/\s*-\s*/, '–').replace(/\s+/g, '')
    s = s.replace(TIME_RANGE, ' ')
  }

  // "Fest:", "El Grito:", "2026 dates:", "Final monthly night:" — keep what follows.
  if (s.includes(':')) s = s.slice(s.lastIndexOf(':') + 1)

  s = s
    .replace(WEEKDAYS_PLURAL, ' ')
    .replace(WEEKDAYS, ' ')
    .replace(/\bexact date\b/gi, ' ')
    .replace(/[,]\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim()

  const M = `(${MONTH_RE})`

  // "Jun 25, 26 and 27" — one month, a list of days, treated as a run.
  let m = s.match(new RegExp(`^${M}\\s+(\\d{1,2})(?:\\s*,\\s*(\\d{1,2}))+\\s+and\\s+(\\d{1,2})$`, 'i'))
  if (m) {
    const mo = MONTHS[m[1].toLowerCase()]
    const days = [...s.matchAll(/\b(\d{1,2})\b/g)].map(x => Number(x[1])).sort((a, b) => a - b)
    return { dates: [{ date: iso(year, mo, days[0]), end_date: iso(year, mo, days[days.length - 1]) }], time }
  }

  // Normalize "A and B" into a range once the list case above is handled.
  s = s.replace(/\s+and\s+/gi, ' - ')

  // "Jul 30 - Aug 2"
  m = s.match(new RegExp(`^${M}\\s+(\\d{1,2})\\s*-\\s*${M}\\s+(\\d{1,2})$`, 'i'))
  if (m) {
    return {
      dates: [{
        date: iso(year, MONTHS[m[1].toLowerCase()], Number(m[2])),
        end_date: iso(year, MONTHS[m[3].toLowerCase()], Number(m[4])),
      }],
      time,
    }
  }

  // "Sept 18 - 20"
  m = s.match(new RegExp(`^${M}\\s+(\\d{1,2})\\s*-\\s*(\\d{1,2})$`, 'i'))
  if (m) {
    const mo = MONTHS[m[1].toLowerCase()]
    return { dates: [{ date: iso(year, mo, Number(m[2])), end_date: iso(year, mo, Number(m[3])) }], time }
  }

  // "June - September" — a season with no day precision.
  m = s.match(new RegExp(`^${M}\\s*-\\s*${M}$`, 'i'))
  if (m) {
    const a = MONTHS[m[1].toLowerCase()]
    const b = MONTHS[m[2].toLowerCase()]
    return { dates: [{ date: iso(year, a, 1), end_date: iso(year, b, lastDayOf(year, b)) }], time, coarse: true }
  }

  // "May 17, Jun 7, Jul 19, ..." — a list of separate single days.
  const pairs = [...s.matchAll(new RegExp(`${M}\\s+(\\d{1,2})`, 'gi'))]
  if (pairs.length > 1) {
    return {
      dates: pairs.map(p => ({ date: iso(year, MONTHS[p[1].toLowerCase()], Number(p[2])), end_date: null })),
      time,
      series: true,
    }
  }

  // "Jul 11"
  if (pairs.length === 1) {
    const [, mon, day] = pairs[0]
    return { dates: [{ date: iso(year, MONTHS[mon.toLowerCase()], Number(day)), end_date: null }], time }
  }

  return { skip: `unparseable date: "${original}"` }
}

// ── duplicate detection against what the calendar already holds ──────────────
// Mirrors lib/event-dedupe.js, which is ESM and can't be required from here.

const normalizeText = v => String(v || '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const normalizeVenue = v => normalizeText(v)
  .replace(/\b(cocktail lounge|lounge|club|theater|theatre|hall|center|centre)\b/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const STOPWORDS = new Set(['and', 'at', 'day', 'feat', 'featuring', 'for', 'from', 'in', 'live',
  'night', 'nightly', 'of', 'on', 'session', 'set', 'sets', 'the', 'with', 'chicago', 'annual',
  'festival', 'fest', 'street', 'park', 'summer', 'series'])

// Venue-season containers. Each one spans a whole summer and exists in the dossier
// only to hold the individual gigs, which are now their own entries (D97–D126).
// Importing them would put a 113-day bar across the calendar and, worse, swallow
// its own concerts as duplicates.
const SKIP_REFS = new Map([
  ['D87', 'venue season container — superseded by D111, D114, D118, D121'],
  ['D88', 'venue season container — superseded by D99, D101, D106, D108'],
  ['D89', 'venue season container — superseded by D100, D103, D104, D109, D113, D116, D119, D123'],
  ['D90', 'venue season container — superseded by D122, D124, D125'],
])

function meaningfulTokens(title, venue) {
  const venueTokens = new Set(normalizeVenue(venue).split(' ').filter(Boolean))
  return normalizeText(title).split(' ')
    .filter(t => t.length >= 4 && !venueTokens.has(t) && !STOPWORDS.has(t))
}

function titlesMatch(a, b) {
  const left = normalizeText(a.title)
  const right = normalizeText(b.title)
  if (!left || !right) return false
  if (left === right) return true
  // Substring only counts when the titles are close in length. "Ravinia Festival"
  // vs "Ravinia Festival Season" is the same event; "Soldier Field" vs "Karol G at
  // Soldier Field" is a season container and one show inside it.
  if (left.includes(right) || right.includes(left)) {
    const ratio = Math.min(left.length, right.length) / Math.max(left.length, right.length)
    if (ratio >= 0.65) return true
  }
  const rightTokens = new Set(meaningfulTokens(b.title, b.venue))
  const overlap = meaningfulTokens(a.title, a.venue).filter(t => rightTokens.has(t))
  return overlap.length >= 2
}

function datesOverlap(a, b) {
  const aEnd = a.end_date || a.date
  const bEnd = b.end_date || b.date
  return a.date <= bEnd && b.date <= aEnd
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  const events = JSON.parse(fs.readFileSync('research/events.json', 'utf8'))

  const planned = []
  const skipped = []

  for (const ev of events) {
    if (ONLY_REFS && !ONLY_REFS.has(ev.ref.toUpperCase())) continue

    if (ev.is_cluster) { skipped.push([ev.ref, ev.name, 'cluster, not a single event']); continue }
    if (SKIP_REFS.has(ev.ref)) { skipped.push([ev.ref, ev.name, SKIP_REFS.get(ev.ref)]); continue }
    if (!VALID_CATEGORIES.has(ev.category)) { skipped.push([ev.ref, ev.name, `category "${ev.category}" not importable`]); continue }
    if (!ev.articles || !ev.articles.length) { skipped.push([ev.ref, ev.name, 'no source url (column is not null)']); continue }

    const parsed = parseDossierDate(ev.date)
    if (parsed.skip) { skipped.push([ev.ref, ev.name, parsed.skip]); continue }

    const [primary, ...rest] = ev.articles

    for (const { date, end_date } of parsed.dates) {
      const span = daysBetween(date, end_date || date)
      if (span > MAX_SPAN) { skipped.push([ev.ref, ev.name, `${span}-day span over --max-span=${MAX_SPAN}`]); continue }

      planned.push({
        ref: ev.ref,
        span,
        coarse: Boolean(parsed.coarse),
        series: Boolean(parsed.series),
        row: {
          title: String(ev.name).slice(0, 300),
          date,
          end_date: end_date || null,
          time: parsed.time ? String(parsed.time).slice(0, 50) : null,
          venue: ev.venue ? String(ev.venue).slice(0, 200) : null,
          neighborhood: ev.neighborhood ? String(ev.neighborhood).slice(0, 100) : null,
          category: ev.category,
          description: ev.summary ? String(ev.summary).slice(0, 600) : null,
          primary_source_url: primary.url,
          primary_source_name: String(primary.label || 'Color&Noise research').slice(0, 200),
          additional_sources: rest.slice(0, 8).map(a => ({ name: a.label, url: a.url })),
          status: STATUS,
          first_seen_at: new Date().toISOString(),
        },
      })
    }
  }

  // What the calendar already has, so we don't double up.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
    process.exit(1)
  }
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const existing = []
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from('events')
      .select('id, title, date, end_date, venue, category')
      .gte('date', '2025-01-01')
      .order('date', { ascending: true })
      .range(from, from + 999)
    if (error) { console.error('Failed to read existing events:', error.message); process.exit(1) }
    existing.push(...(data || []))
    if (!data || data.length < 1000) break
  }
  console.log(`Calendar currently holds ${existing.length} events dated 2025-01-01 or later.\n`)

  const toInsert = []
  const collisions = []
  for (const p of planned) {
    const hit = existing.find(e => datesOverlap(e, p.row) && titlesMatch(e, p.row))
    if (hit) { collisions.push([p.ref, p.row.title, `already in calendar as "${hit.title}" (${hit.date})`]); continue }
    toInsert.push(p)
    existing.push({ ...p.row, id: `planned-${p.ref}` })   // catch collisions within this batch too
  }

  const line = (ref, title, note) => `  ${String(ref).padEnd(5)} ${String(title).slice(0, 52).padEnd(54)} ${note}`

  console.log(`── TO INSERT (${toInsert.length}) ──`)
  for (const p of toInsert) {
    const when = p.row.end_date ? `${p.row.date} → ${p.row.end_date} (${p.span}d)` : p.row.date
    const flags = [p.coarse ? 'month-precision' : null, p.series ? 'one of a series' : null].filter(Boolean).join(', ')
    console.log(line(p.ref, p.row.title, `${p.row.category.padEnd(9)} ${when}${flags ? '  [' + flags + ']' : ''}`))
  }

  if (collisions.length) {
    console.log(`\n── ALREADY PRESENT, SKIPPED (${collisions.length}) ──`)
    for (const c of collisions) console.log(line(c[0], c[1], c[2]))
  }

  if (skipped.length) {
    console.log(`\n── NOT IMPORTABLE (${skipped.length}) ──`)
    for (const s of skipped) console.log(line(s[0], s[1], s[2]))
  }

  const long = toInsert.filter(p => p.span > 14)
  if (long.length) {
    console.log(`\n⚠️  ${long.length} rows span more than 14 days and will show on every day in that window:`)
    for (const p of long) console.log(line(p.ref, p.row.title, `${p.span} days`))
  }

  if (!COMMIT) {
    console.log(`\nDry run. Nothing written. Re-run with --commit to insert ${toInsert.length} rows as status="${STATUS}".`)
    return
  }

  const BATCH = 50
  let inserted = 0
  for (let i = 0; i < toInsert.length; i += BATCH) {
    const batch = toInsert.slice(i, i + BATCH).map(p => p.row)
    const { error } = await supabase.from('events').insert(batch)
    if (error) {
      console.error(`\nInsert failed at index ${i}: ${error.message}`)
      console.error(`${inserted} rows were already inserted. Nothing was deleted or overwritten.`)
      process.exit(1)
    }
    inserted += batch.length
    console.log(`  inserted ${inserted} / ${toInsert.length}`)
  }
  console.log(`\nDone. ${inserted} events inserted as status="${STATUS}".`)
}

main().catch(err => { console.error(err); process.exit(1) })
