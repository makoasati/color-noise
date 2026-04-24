require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\b\d{4}-\d{2}-\d{2}\b/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeVenue(value) {
  return normalizeText(value)
    .replace(/\b(cocktail lounge|lounge|club|theater|theatre|hall|center|centre)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function stripOccurrenceDateSuffix(title) {
  return String(title || '').replace(/\s*-\s*\d{4}-\d{2}-\d{2}\s*$/i, '').trim()
}

function getVenueTokens(venue) {
  return new Set(normalizeVenue(venue).split(' ').filter(Boolean))
}

function getMeaningfulTokens(title, venue) {
  const venueTokens = getVenueTokens(venue)
  const stopwords = new Set([
    'and', 'at', 'day', 'feat', 'featuring', 'for', 'from', 'in', 'live', 'night',
    'nightly', 'of', 'on', 'session', 'set', 'sets', 'the', 'with',
  ])

  return normalizeText(title)
    .split(' ')
    .filter(token => token.length >= 4 && !venueTokens.has(token) && !stopwords.has(token))
}

function titlesAreSimilar(a, b) {
  const left = normalizeText(a.title)
  const right = normalizeText(b.title)
  if (!left || !right) return false
  if (left === right || left.includes(right) || right.includes(left)) return true

  const leftTokens = getMeaningfulTokens(a.title, a.venue)
  const rightTokens = new Set(getMeaningfulTokens(b.title, b.venue))
  return leftTokens.filter(token => rightTokens.has(token)).length >= 2
}

function venuesAreSimilar(a, b) {
  const left = normalizeVenue(a)
  const right = normalizeVenue(b)
  if (!left || !right) return false
  return left === right || left.includes(right) || right.includes(left)
}

function isLikelyGeneratedOccurrence(event) {
  const title = String(event.title || '').toLowerCase()
  return /\bday\s+\d+\b/.test(title)
    || /\bfeature set\b/.test(title)
    || /\blate night\b/.test(title)
    || /\bnightly\b/.test(title)
    || /\bsession\b/.test(title)
    || /\b\d{4}-\d{2}-\d{2}\b/.test(title)
}

function isDatedOccurrenceTitle(title) {
  return /\b\d{4}-\d{2}-\d{2}\b/.test(String(title || ''))
}

function isMultiDayEvent(event) {
  return Boolean(event.end_date) && event.end_date > event.date
}

function getDurationDays(event) {
  const start = new Date(event.date)
  const end = new Date(event.end_date || event.date)
  return Math.max(1, Math.round((end - start) / 86400000) + 1)
}

function isCoveredBy(ongoing, event) {
  return isMultiDayEvent(ongoing)
    && ongoing.date <= event.date
    && ongoing.end_date >= event.date
}

function isRedundantAgainstOngoing(event, ongoing) {
  if (event.id === ongoing.id) return false
  if (event.category !== ongoing.category) return false
  if (!venuesAreSimilar(event.venue, ongoing.venue)) return false
  if (!isCoveredBy(ongoing, event)) return false
  if (isMultiDayEvent(event)) return false
  return titlesAreSimilar(event, ongoing) || isLikelyGeneratedOccurrence(event)
}

function getExactKey(event) {
  return [
    normalizeText(event.title),
    event.date,
    normalizeVenue(event.venue),
    event.category,
  ].join('|')
}

function getSeriesKey(event) {
  return [
    normalizeText(stripOccurrenceDateSuffix(event.title)),
    normalizeVenue(event.venue),
    event.category,
  ].join('|')
}

function addDays(value, days) {
  const date = new Date(value)
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

function compareCanonicalEvents(a, b) {
  const durationDiff = getDurationDays(b) - getDurationDays(a)
  if (durationDiff !== 0) return durationDiff
  const createdA = String(a.created_at || '')
  const createdB = String(b.created_at || '')
  if (createdA !== createdB) return createdA.localeCompare(createdB)
  return String(a.id).localeCompare(String(b.id))
}

async function fetchAllEvents(supabase) {
  const all = []
  const pageSize = 1000
  for (let from = 0; ; from += pageSize) {
    const to = from + pageSize - 1
    const { data, error } = await supabase
      .from('events')
      .select('id,title,date,end_date,venue,category,status,created_at')
      .eq('status', 'approved')
      .range(from, to)

    if (error) throw error
    all.push(...(data || []))
    if (!data || data.length < pageSize) break
  }
  return all
}

async function main() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })

  const events = await fetchAllEvents(supabase)
  const datedSeriesGroups = new Map()

  for (const event of events) {
    if (!isDatedOccurrenceTitle(event.title)) continue
    const key = getSeriesKey(event)
    if (!datedSeriesGroups.has(key)) datedSeriesGroups.set(key, [])
    datedSeriesGroups.get(key).push(event)
  }

  const seriesDeleteIds = []
  let seriesMerged = 0

  for (const seriesEvents of datedSeriesGroups.values()) {
    const sortedSeries = [...seriesEvents].sort((a, b) => a.date.localeCompare(b.date))
    let runStart = 0

    while (runStart < sortedSeries.length) {
      let runEnd = runStart
      while (
        runEnd + 1 < sortedSeries.length
        && addDays(sortedSeries[runEnd].date, 1) === sortedSeries[runEnd + 1].date
      ) {
        runEnd += 1
      }

      if (runEnd > runStart) {
        const run = sortedSeries.slice(runStart, runEnd + 1).sort(compareCanonicalEvents)
        const canonical = run[0]
        const endDate = run[run.length - 1].date
        const deleteIds = run.slice(1).map(event => event.id)

        const { error: updateError } = await supabase
          .from('events')
          .update({
            title: stripOccurrenceDateSuffix(canonical.title),
            end_date: endDate,
          })
          .eq('id', canonical.id)

        if (updateError) throw updateError

        seriesDeleteIds.push(...deleteIds)
        seriesMerged += deleteIds.length
      }

      runStart = runEnd + 1
    }
  }

  if (seriesDeleteIds.length > 0) {
    const { error } = await supabase
      .from('events')
      .delete()
      .in('id', seriesDeleteIds)

    if (error) throw error
  }

  const refreshedEvents = await fetchAllEvents(supabase)
  const sorted = [...refreshedEvents].sort(compareCanonicalEvents)
  const kept = []
  const seenExact = new Set()
  const deleteIds = []

  for (const event of sorted) {
    const exactKey = getExactKey(event)
    if (seenExact.has(exactKey)) {
      deleteIds.push(event.id)
      continue
    }

    const redundant = kept.some(existing => (
      isRedundantAgainstOngoing(event, existing)
      || isRedundantAgainstOngoing(existing, event)
    ))

    if (redundant) {
      deleteIds.push(event.id)
      continue
    }

    seenExact.add(exactKey)
    kept.push(event)
  }

  if (deleteIds.length > 0) {
    const { error } = await supabase
      .from('events')
      .delete()
      .in('id', deleteIds)

    if (error) throw error
  }

  console.log(JSON.stringify({
    approvedRowsScanned: events.length,
    datedSeriesRowsMerged: seriesMerged,
    duplicateRowsDeleted: deleteIds.length,
  }, null, 2))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
