import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

async function requireAdmin(supabase) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()
  return profile?.role === 'admin' ? user : null
}

// GET /api/admin/events — list all events (admin only)
export async function GET(request) {
  const supabase = await createClient()
  const user = await requireAdmin(supabase)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const status   = searchParams.get('status')
  const source   = searchParams.get('source')

  let query = supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })
    .limit(500)

  if (category && category !== 'all') query = query.eq('category', category)
  if (status   && status   !== 'all') query = query.eq('status', status)
  if (source)                         query = query.eq('primary_source_name', source)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ events: data || [] })
}

// POST /api/admin/events — manually add an event (admin only)
export async function POST(request) {
  const supabase = await createClient()
  const user = await requireAdmin(supabase)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { title, date, time, end_date, venue, neighborhood, category, description, primary_source_url, primary_source_name, image_url, status: evStatus } = body

  if (!title || !date || !category) {
    return NextResponse.json({ error: 'title, date, and category are required.' }, { status: 400 })
  }

  const { data, error } = await supabase.from('events').insert({
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
