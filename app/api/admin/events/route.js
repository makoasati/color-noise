import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()
  return profile?.role === 'admin' ? user : null
}

// GET /api/admin/events — list all events (admin only)
export async function GET(request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const status   = searchParams.get('status')
  const source   = searchParams.get('source')
  const search   = searchParams.get('q')?.trim()
  const page     = Math.max(1, Number(searchParams.get('page')) || 1)
  const limit    = Math.min(100, Math.max(1, Number(searchParams.get('limit')) || 20))
  const from     = (page - 1) * limit
  const to       = from + limit - 1

  const db = createAdminClient()
  let query = db
    .from('events')
    .select('*', { count: 'exact' })
    .order('date', { ascending: false })
    .order('title', { ascending: true })
    .range(from, to)

  if (category && category !== 'all') query = query.eq('category', category)
  if (status   && status   !== 'all') query = query.eq('status', status)
  if (source)                         query = query.eq('primary_source_name', source)
  if (search) {
    const normalized = search.replace(/[%,()]/g, ' ').replace(/\s+/g, ' ').trim()
    const categoryLabels = {
      heard: 'music',
      music: 'music',
      seen: 'art',
      art: 'art',
      savored: 'food',
      food: 'food',
      around: 'nightlife',
      nightlife: 'nightlife',
    }
    const filters = [
      `title.ilike.%${normalized}%`,
      `venue.ilike.%${normalized}%`,
      `neighborhood.ilike.%${normalized}%`,
      `description.ilike.%${normalized}%`,
      `primary_source_name.ilike.%${normalized}%`,
      `primary_source_url.ilike.%${normalized}%`,
      `time.ilike.%${normalized}%`,
      `status.ilike.%${normalized}%`,
    ]
    const categoryMatch = categoryLabels[normalized.toLowerCase()]
    if (categoryMatch) filters.push(`category.eq.${categoryMatch}`)
    if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
      filters.push(`date.eq.${normalized}`, `end_date.eq.${normalized}`)
    }
    query = query.or(filters.join(','))
  }

  const { data, error, count } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ events: data || [], count: count || 0, page, limit })
}

// POST /api/admin/events — manually add an event (admin only)
export async function POST(request) {
  const user = await requireAdmin()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { title, date, time, end_date, venue, neighborhood, category, description, primary_source_url, primary_source_name, image_url, status: evStatus } = body

  if (!title || !date || !category) {
    return NextResponse.json({ error: 'title, date, and category are required.' }, { status: 400 })
  }

  const db = createAdminClient()
  const { data, error } = await db.from('events').insert({
    title: String(title).slice(0, 300),
    date,
    time: time || null,
    end_date: end_date || null,
    venue: venue || null,
    neighborhood: neighborhood || null,
    category,
    description: description ? String(description).slice(0, 300) : null,
    primary_source_url: primary_source_url || 'https://www.colornoise.co/calendar',
    primary_source_name: primary_source_name || 'Manual Entry',
    image_url: image_url || null,
    additional_sources: [],
    status: evStatus || 'approved',
    first_seen_at: new Date().toISOString(),
  }).select().single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ event: data }, { status: 201 })
}
