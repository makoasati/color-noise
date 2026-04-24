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

function getDateParts(value) {
  const iso = String(value || '')
  const [year, month, day] = iso.split('-').map(Number)
  return { year, month, day }
}

function toDate(value) {
  const { year, month, day } = getDateParts(value)
  return new Date(year, (month || 1) - 1, day || 1)
}

function toIsoDate(value) {
  return value.toISOString().slice(0, 10)
}

function addDays(value, days) {
  const date = toDate(value)
  date.setDate(date.getDate() + days)
  return toIsoDate(date)
}

function getEventEndDate(event) {
  return event.end_date || event.date
}

function getEventDurationDays(event) {
  const start = toDate(event.date)
  const end = toDate(getEventEndDate(event))
  return Math.max(1, Math.round((end - start) / 86400000) + 1)
}

function isMultiDayEvent(event) {
  return Boolean(event.end_date) && event.end_date > event.date
}

function venuesAreSimilar(a, b) {
  const left = normalizeVenue(a)
  const right = normalizeVenue(b)
  if (!left || !right) return false
  return left === right || left.includes(right) || right.includes(left)
}

function getMeaningfulTokens(title, venue) {
  const venueTokens = new Set(normalizeVenue(venue).split(' ').filter(Boolean))
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
  const overlap = leftTokens.filter(token => rightTokens.has(token))
  return overlap.length >= 2
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

function isCoveredBy(ongoing, event) {
  if (!isMultiDayEvent(ongoing)) return false
  return ongoing.date <= event.date && getEventEndDate(ongoing) >= event.date
}

function isRedundantAgainstOngoing(event, ongoing) {
  if (!ongoing || !event || ongoing.id === event.id) return false
  if (event.category !== ongoing.category) return false
  if (!venuesAreSimilar(event.venue, ongoing.venue)) return false
  if (!isCoveredBy(ongoing, event)) return false
  if (isMultiDayEvent(event)) return false
  return titlesAreSimilar(event, ongoing)
    || isLikelyGeneratedOccurrence(event)
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

function compareCanonicalEvents(a, b) {
  const durationDiff = getEventDurationDays(b) - getEventDurationDays(a)
  if (durationDiff !== 0) return durationDiff
  const createdA = String(a.created_at || '')
  const createdB = String(b.created_at || '')
  if (createdA !== createdB) return createdA.localeCompare(createdB)
  return String(a.id || '').localeCompare(String(b.id || ''))
}

export function dedupeEvents(events) {
  const sorted = [...(events || [])].sort(compareCanonicalEvents)
  const selected = []
  const seenExact = new Set()

  for (const event of sorted) {
    const exactKey = getExactKey(event)
    if (seenExact.has(exactKey)) continue

    const redundant = selected.some(existing => (
      isRedundantAgainstOngoing(event, existing)
      || isRedundantAgainstOngoing(existing, event)
    ))

    if (redundant) continue

    seenExact.add(exactKey)
    selected.push(event)
  }

  return selected.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date)
    return compareCanonicalEvents(a, b)
  })
}

export function shouldSkipOccurrenceEvent(event, existingEvents) {
  return (existingEvents || []).some(existing => isRedundantAgainstOngoing(event, existing))
}

export function findContinuingSeriesEvent(event, existingEvents) {
  if (!isDatedOccurrenceTitle(event.title)) return null

  const previousDate = addDays(event.date, -1)
  return (existingEvents || []).find(existing => (
    getSeriesKey(existing) === getSeriesKey(event)
    && getEventEndDate(existing) === previousDate
  )) || null
}

export function getRedundantEventIds(events) {
  const sorted = [...(events || [])].sort(compareCanonicalEvents)
  const kept = []
  const deleteIds = []
  const seenExact = new Set()

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

  return deleteIds
}

export {
  getEventDurationDays,
  getEventEndDate,
  getSeriesKey,
  isDatedOccurrenceTitle,
  isLikelyGeneratedOccurrence,
  isMultiDayEvent,
  stripOccurrenceDateSuffix,
  titlesAreSimilar,
  venuesAreSimilar,
}
