import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

const SYSTEM_PROMPT = `Extract all upcoming events from this Chicago events page. Return ONLY a valid JSON array. Each event object should have: title (string), date (string, YYYY-MM-DD), time (string or null), end_date (string or null for multi-day events), venue (string or null), neighborhood (string or null), category (one of: music, art, food, nightlife), description (string or null, max 200 chars), url (string, full URL to the event page). Only include events happening today or in the future. If you cannot determine the date, skip that event. Return valid JSON only, no markdown, no backticks, no explanation.`

function trimHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40000)
}

function isSimilarTitle(t1, t2) {
  const a = t1.toLowerCase().trim()
  const b = t2.toLowerCase().trim()
  if (a.includes(b) || b.includes(a)) return true
  const words1 = a.split(/\s+/)
  const words2 = b.split(/\s+/)
  for (let i = 0; i <= words1.length - 3; i++) {
    const phrase = words1.slice(i, i + 3).join(' ')
    if (b.includes(phrase)) return true
  }
  return false
}

// Find the first complete JSON array in a string, ignoring surrounding text/fences
function extractJsonArray(text) {
  const start = text.indexOf('[')
  if (start === -1) return null
  let depth = 0
  let inString = false
  let escape = false
  for (let i = start; i < text.length; i++) {
    const ch = text[i]
    if (escape)          { escape = false; continue }
    if (ch === '\\' && inString) { escape = true; continue }
    if (ch === '"')      { inString = !inString; continue }
    if (inString)        continue
    if (ch === '[')      depth++
    else if (ch === ']') { depth--; if (depth === 0) return text.slice(start, i + 1) }
  }
  return null
}

function isAuthenticated(request) {
  // Check Authorization header (used by Vercel cron runner)
  const authHeader = request.headers.get('authorization')
  if (authHeader === `Bearer ${process.env.CRON_SECRET}`) return true

  // Check query param (used for manual testing)
  const { searchParams } = new URL(request.url)
  if (searchParams.get('secret') === process.env.CRON_SECRET) return true

  return false
}

export async function GET(request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()

  // Pick 2 active sources with oldest last_scraped_at
  const { data: sources, error: sourcesError } = await supabase
    .from('event_sources')
    .select('*')
    .eq('active', true)
    .order('last_scraped_at', { ascending: true, nullsFirst: true })
    .limit(2)

  if (sourcesError) {
    console.error('Failed to fetch event sources:', sourcesError)
    return NextResponse.json({ error: 'Failed to fetch sources' }, { status: 500 })
  }

  if (!sources || sources.length === 0) {
    return NextResponse.json({ message: 'No active sources to scrape' })
  }

  const results = []

  for (const source of sources) {
    try {
      console.log(`Scraping: ${source.name} (${source.url})`)

      // 1. Fetch HTML with 5s timeout
      let html
      try {
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 5000)
        const response = await fetch(source.url, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; ColorNoisBot/1.0)',
            'Accept': 'text/html,application/xhtml+xml',
          },
        })
        clearTimeout(timeout)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        html = await response.text()
      } catch (fetchErr) {
        console.error(`Failed to fetch ${source.name}:`, fetchErr.message)
        results.push({ source: source.name, status: 'fetch_error', error: fetchErr.message })
        continue
      }

      // 2. Trim HTML to reduce tokens
      const trimmedHtml = trimHtml(html)

      // 3. Send to Claude Haiku for extraction
      let extractedEvents
      try {
        const aiResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 4096,
            system: SYSTEM_PROMPT,
            messages: [{ role: 'user', content: trimmedHtml }],
          }),
          signal: AbortSignal.timeout(20000),
        })

        if (!aiResponse.ok) {
          const errBody = await aiResponse.text()
          throw new Error(`Anthropic API error ${aiResponse.status}: ${errBody}`)
        }

        const aiData = await aiResponse.json()
        const rawText = aiData.content?.[0]?.text || ''

        // 4. Extract the JSON array from the response, tolerating extra text / code fences
        const jsonText = extractJsonArray(rawText)
        if (!jsonText) throw new Error('No JSON array found in AI response')

        extractedEvents = JSON.parse(jsonText)
        if (!Array.isArray(extractedEvents)) throw new Error('Response is not an array')
      } catch (aiErr) {
        console.error(`AI extraction failed for ${source.name}:`, aiErr.message)
        results.push({ source: source.name, status: 'ai_error', error: aiErr.message })
        // Still update last_scraped_at so we don't retry immediately
        await supabase
          .from('event_sources')
          .update({ last_scraped_at: new Date().toISOString() })
          .eq('id', source.id)
        continue
      }

      // 5. Deduplicate and insert
      const today = new Date().toISOString().split('T')[0]
      let inserted = 0
      let merged = 0
      let skipped = 0

      for (const ev of extractedEvents) {
        // Validate required fields
        if (!ev.title || !ev.date) { skipped++; continue }
        if (ev.date < today) { skipped++; continue }
        // Validate date format
        if (!/^\d{4}-\d{2}-\d{2}$/.test(ev.date)) { skipped++; continue }

        // Check for duplicates: same date + same venue + similar title
        let existingEvent = null
        if (ev.venue) {
          const { data: candidates } = await supabase
            .from('events')
            .select('id, title, additional_sources')
            .eq('date', ev.date)
            .ilike('venue', ev.venue)

          existingEvent = candidates?.find(c => isSimilarTitle(c.title, ev.title)) || null
        }

        if (!existingEvent && ev.venue) {
          // Broader search by title similarity without venue constraint
          const { data: titleCandidates } = await supabase
            .from('events')
            .select('id, title, additional_sources')
            .eq('date', ev.date)

          existingEvent = titleCandidates?.find(c => isSimilarTitle(c.title, ev.title)) || null
        }

        if (existingEvent) {
          // Add this source to additional_sources if not already present
          const currentSources = existingEvent.additional_sources || []
          const alreadyListed = currentSources.some(
            s => s.url === ev.url || s.name === source.name
          )
          if (!alreadyListed && ev.url) {
            await supabase
              .from('events')
              .update({
                additional_sources: [
                  ...currentSources,
                  { url: ev.url, name: source.name },
                ],
              })
              .eq('id', existingEvent.id)
            merged++
          } else {
            skipped++
          }
        } else {
          // Insert new event
          const { error: insertError } = await supabase.from('events').insert({
            title: String(ev.title).slice(0, 300),
            date: ev.date,
            time: ev.time ? String(ev.time).slice(0, 50) : null,
            end_date: ev.end_date || null,
            venue: ev.venue ? String(ev.venue).slice(0, 200) : null,
            neighborhood: ev.neighborhood ? String(ev.neighborhood).slice(0, 100) : null,
            category: ['music', 'art', 'food', 'nightlife'].includes(ev.category)
              ? ev.category
              : source.category_hint,
            description: ev.description ? String(ev.description).slice(0, 300) : null,
            primary_source_url: ev.url || source.url,
            primary_source_name: source.name,
            additional_sources: [],
            status: 'approved',
            first_seen_at: new Date().toISOString(),
          })

          if (insertError) {
            console.error(`Insert failed for "${ev.title}":`, insertError.message)
          } else {
            inserted++
          }
        }
      }

      // 6. Cleanup events more than 7 days past their date
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - 7)
      const cutoffStr = cutoff.toISOString().split('T')[0]
      const { error: cleanupError } = await supabase
        .from('events')
        .delete()
        .lt('date', cutoffStr)

      if (cleanupError) {
        console.error('Cleanup error:', cleanupError.message)
      }

      // 7. Update last_scraped_at
      await supabase
        .from('event_sources')
        .update({ last_scraped_at: new Date().toISOString() })
        .eq('id', source.id)

      results.push({
        source: source.name,
        status: 'ok',
        extracted: extractedEvents.length,
        inserted,
        merged,
        skipped,
      })

      console.log(`${source.name}: ${inserted} new, ${merged} merged, ${skipped} skipped`)
    } catch (err) {
      console.error(`Unexpected error for ${source.name}:`, err)
      results.push({ source: source.name, status: 'error', error: err.message })
    }
  }

  return NextResponse.json({ ok: true, results })
}
