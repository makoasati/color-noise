require('dotenv').config({ path: '.env.local' })

const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')

const csvPath = process.argv[2]
if (!csvPath) throw new Error('Usage: node scripts/dedupe-calendar-import.js <csv-path>')

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
    jan: '01', january: '01',
    feb: '02', february: '02',
    mar: '03', march: '03',
    apr: '04', april: '04',
    may: '05',
    jun: '06', june: '06',
    jul: '07', july: '07',
    aug: '08', august: '08',
    sep: '09', sept: '09', september: '09',
    oct: '10', october: '10',
    nov: '11', november: '11',
    dec: '12', december: '12',
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

function csvKey(row) {
  return [row['Event Name'], normalizeDate(row['Date Start']), row.Venue].map(normalize).join('|')
}

function dbKey(event) {
  return [event.title, event.date, event.venue].map(normalize).join('|')
}

async function main() {
  const csv = fs.readFileSync(csvPath, 'utf8')
  const [headers, ...dataRows] = parseCSV(csv)
  const rows = dataRows
    .filter(row => row.some(cell => clean(cell)))
    .map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] || ''])))

  const wantedKeys = new Set(rows.map(csvKey))

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  })
  const { data, error } = await supabase
    .from('events')
    .select('id,title,date,venue,created_at')
    .limit(5000)

  if (error) throw error

  const groups = new Map()
  for (const event of data || []) {
    const key = dbKey(event)
    if (!wantedKeys.has(key)) continue
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(event)
  }

  const deleteIds = []
  for (const events of groups.values()) {
    if (events.length <= 1) continue
    events.sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)))
    deleteIds.push(...events.slice(1).map(event => event.id))
  }

  if (deleteIds.length > 0) {
    const { error: deleteError } = await supabase
      .from('events')
      .delete()
      .in('id', deleteIds)
    if (deleteError) throw deleteError
  }

  console.log(JSON.stringify({
    csvRows: rows.length,
    duplicateRowsDeleted: deleteIds.length,
  }, null, 2))
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
