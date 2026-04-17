import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/events?start=2026-04-01&end=2026-04-30&category=music
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const start = searchParams.get('start')
  const end = searchParams.get('end')
  const category = searchParams.get('category')

  if (!start || !end) {
    return NextResponse.json({ error: 'start and end query params required' }, { status: 400 })
  }

  const supabase = await createClient()

  let query = supabase
    .from('events')
    .select('id, title, date, time, end_date, venue, neighborhood, category, description, primary_source_url, primary_source_name, additional_sources, image_url, status')
    .eq('status', 'approved')
    .gte('date', start)
    .lte('date', end)
    .order('date', { ascending: true })

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query
  if (error) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }

  return NextResponse.json({ events: data || [] })
}
