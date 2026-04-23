require('dotenv').config({ path: '.env.local' })

const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

const csvPath = process.argv[2]
if (!csvPath) throw new Error('Usage: node scripts/diagnose-calendar-import.js <csv-path>')

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
    } else if (char === '"') {
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
  return [
    event.title || event['Event Name'],
    event.date || normalizeDate(event['Date Start'] || event.date),
    event.venue || event.Venue,
  ].map(normalize).join('|')
}

function isGeneratedBadEvent(row) {
  const title = clean(row['Event Name']) || clean(row.title) || ''
  return /^CIVL Fest 2026: Venue Show \d+$/i.test(title)
    || /^Local Maker\/Trinket Pop-up Event \d+$/i.test(title)
}

async function fetchExistingEvents(supabase) {
  const all = []
  const pageSize = 1000
  for (let from = 0; ; from += pageSize) {
    const to = from + pageSize - 1
    const { data, error } = await supabase
      .from('events')
      .select('id,title,date,venue,primary_source_url,created_at')
      .range(from, to)

    if (error) throw error
    all.push(...(data || []))
    if (!data || data.length < pageSize) break
  }
  return all
}

async function main() {
  const csv = fs.readFileSync(csvPath, 'utf8')
  const [headers, ...dataRows] = parseCSV(csv)
  const rows = dataRows
    .filter(row => row.some(cell => clean(cell)))
    .map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])))
    .filter(row => !isGeneratedBadEvent(row))

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })
  const data = await fetchExistingEvents(supabase)

  const dbKeys = new Map()
  for (const event of data || []) {
    const key = matchKey(event)
    if (!dbKeys.has(key)) dbKeys.set(key, [])
    dbKeys.get(key).push(event)
  }

  const missing = []
  const duplicates = []
  for (const row of rows) {
    const key = matchKey(row)
    const matches = dbKeys.get(key) || []
    if (matches.length === 0) {
      missing.push(row)
    } else if (matches.length > 1) {
      duplicates.push({ row, matches })
    }
  }

  console.log(JSON.stringify({
    csvRows: rows.length,
    dbRows: data.length,
    missingCount: missing.length,
    duplicateKeyCount: duplicates.length,
    missing: missing.map(row => ({
      title: row['Event Name'] || row.title,
      date: row['Date Start'] || row.date,
      venue: row.Venue || row.venue,
      website: row.Website || row.primary_source_url,
    })),
    duplicates: duplicates.slice(0, 20).map(item => ({
      title: item.row['Event Name'] || item.row.title,
      date: item.row['Date Start'] || item.row.date,
      venue: item.row.Venue || item.row.venue,
      dbCount: item.matches.length,
      ids: item.matches.map(match => match.id),
    })),
  }, null, 2))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
