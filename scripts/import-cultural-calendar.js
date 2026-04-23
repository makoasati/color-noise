require('dotenv').config({ path: '.env.local' })

const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

const csvPath = process.argv[2] || 'c:/Users/asati/Downloads/chicago_cultural_calendar_v2_2026.csv'

const CATEGORY_MAP = {
  Seen: 'art',
  Heard: 'music',
  Savored: 'food',
  Around: 'nightlife',
  art: 'art',
  music: 'music',
  food: 'food',
  nightlife: 'nightlife',
}

function parseCSV(text) {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        cell += '"'
        i += 1
      } else if (char === '"') {
        inQuotes = false
      } else {
        cell += char
      }
      continue
    }

    if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n') {
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else if (char !== '\r') {
      cell += char
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell)
    rows.push(row)
  }

  return rows
}

function clean(value) {
  const trimmed = String(value || '').trim()
  return trimmed.length > 0 ? trimmed : null
}

function normalizeDate(value) {
  const date = clean(value)
  if (!date) return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date

  const monthNumbers = {
    jan: '01',
    january: '01',
    feb: '02',
    february: '02',
    mar: '03',
    march: '03',
    apr: '04',
    april: '04',
    may: '05',
    jun: '06',
    june: '06',
    jul: '07',
    july: '07',
    aug: '08',
    august: '08',
    sep: '09',
    sept: '09',
    september: '09',
    oct: '10',
    october: '10',
    nov: '11',
    november: '11',
    dec: '12',
    december: '12',
  }
  const match = date.match(/^(\d{4})-([A-Za-z]+)-(\d{1,2})$/)
  if (match) {
    const [, year, monthName, day] = match
    const month = monthNumbers[monthName.toLowerCase()]
    if (month) return `${year}-${month}-${String(Number(day)).padStart(2, '0')}`
  }

  throw new Error(`Unsupported date format "${date}"`)
}

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ')
}

function matchKey(event) {
  return [event.title, event.date, event.venue].map(normalize).join('|')
}

function sourceName(row) {
  return clean(row.Venue) || clean(row.venue) || 'Event Website'
}

function isGeneratedBadEvent(row) {
  const title = clean(row['Event Name']) || clean(row.title) || ''
  return /^CIVL Fest 2026: Venue Show \d+$/i.test(title)
    || /^Local Maker\/Trinket Pop-up Event \d+$/i.test(title)
}

function toEvent(row) {
  const rawCategory = clean(row.Category) || clean(row.category)
  const category = CATEGORY_MAP[rawCategory]
  if (!category) {
    throw new Error(`Unsupported category "${rawCategory}" for "${clean(row['Event Name']) || clean(row.title)}"`)
  }

  const title = clean(row['Event Name']) || clean(row.title)
  const date = normalizeDate(row['Date Start'] || row.date)
  const primary_source_url = clean(row.Website) || clean(row.primary_source_url)
  if (!title || !date || !primary_source_url) {
    throw new Error(`Missing required event fields: ${JSON.stringify(row)}`)
  }

  return {
    title,
    date,
    time: null,
    end_date: normalizeDate(row['Date End'] || row.end_date),
    venue: clean(row.Venue) || clean(row.venue),
    neighborhood: clean(row.Neighborhood) || clean(row.neighborhood),
    category,
    description: null,
    primary_source_url,
    primary_source_name: sourceName(row),
    additional_sources: [],
    image_url: null,
    status: 'approved',
  }
}

async function fetchExistingEvents(supabase) {
  const all = []
  const pageSize = 1000
  for (let from = 0; ; from += pageSize) {
    const to = from + pageSize - 1
    const { data, error } = await supabase
      .from('events')
      .select('id,title,date,venue,primary_source_url')
      .range(from, to)

    if (error) throw error
    all.push(...(data || []))
    if (!data || data.length < pageSize) break
  }
  return all
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')

  const csv = fs.readFileSync(csvPath, 'utf8')
  const [headers, ...dataRows] = parseCSV(csv)
  const rows = dataRows
    .filter(row => row.some(cell => clean(cell)))
    .map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])))
    .filter(row => !isGeneratedBadEvent(row))

  const importedByKey = new Map()
  for (const row of rows) {
    const event = toEvent(row)
    importedByKey.set(matchKey(event), event)
  }
  const imported = [...importedByKey.values()]

  const supabase = createClient(url, key, { auth: { persistSession: false } })
  const existing = await fetchExistingEvents(supabase)

  const byMatchKey = new Map()
  for (const event of existing || []) {
    const key = matchKey(event)
    if (!byMatchKey.has(key)) byMatchKey.set(key, [])
    byMatchKey.get(key).push(event)
  }

  let inserted = 0
  let updated = 0
  let matchedRows = 0
  const errors = []

  for (const event of imported) {
    const uniqueMatches = byMatchKey.get(matchKey(event)) || []

    if (uniqueMatches.length > 0) {
      matchedRows += 1
      for (const match of uniqueMatches) {
        const { error } = await supabase
          .from('events')
          .update({ ...event, updated_at: new Date().toISOString() })
          .eq('id', match.id)

        if (error) errors.push({ title: event.title, operation: 'update', error: error.message })
        else updated += 1
      }
    } else {
      const { data, error } = await supabase
        .from('events')
        .insert({ ...event, first_seen_at: new Date().toISOString() })
        .select('id,title,date,venue,primary_source_url')
        .single()

      if (error) {
        errors.push({ title: event.title, operation: 'insert', error: error.message })
      } else {
        inserted += 1
        byMatchKey.set(matchKey(data), [data])
      }
    }
  }

  console.log(JSON.stringify({
    csvRows: rows.length,
    uniqueImportedRows: imported.length,
    matchedImportedRows: matchedRows,
    updatedExistingRows: updated,
    insertedRows: inserted,
    errors,
  }, null, 2))

  if (errors.length > 0) process.exitCode = 1
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
