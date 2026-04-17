import { createClient } from '@/lib/supabase/server'
import Masthead from '@/components/Masthead'
import PublicNav from '@/components/PublicNav'
import NeighborhoodBar from '@/components/NeighborhoodBar'
import CalendarView from '@/components/CalendarView'
import Footer from '@/components/Footer'
import { DARK_ZONE, NOISE_OVERLAY, LIGHT_ZONE } from '@/lib/styles'

export const metadata = {
  title: 'Calendar — Color&Noise',
  description: 'Chicago events — music, art, food, and nightlife',
}

export const revalidate = 300 // Re-render at most every 5 minutes

export default async function CalendarPage() {
  const now   = new Date()
  const year  = now.getFullYear()
  const month = now.getMonth() // 0-indexed

  // Pre-load current month events server-side for fast initial render
  const supabase = await createClient()
  const start = `${year}-${String(month + 1).padStart(2, '0')}-01`
  const lastDay = new Date(year, month + 1, 0).getDate()
  const end = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`

  const { data: events } = await supabase
    .from('events')
    .select('id, title, date, time, end_date, venue, neighborhood, category, description, primary_source_url, primary_source_name, additional_sources, image_url, status')
    .eq('status', 'approved')
    .gte('date', start)
    .lte('date', end)
    .order('date', { ascending: true })

  // Fetch neighborhoods for the bar
  const { data: neighborhoods } = await supabase
    .from('neighborhoods')
    .select('id, name, slug')
    .order('name', { ascending: true })

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#111111', color: '#F5F1E8', minHeight: '100vh' }}>

      {/* ── Dark header ── */}
      <div style={DARK_ZONE}>
        <div style={NOISE_OVERLAY} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <Masthead />
          <PublicNav activeCategory="calendar" activeNeighborhood={null} />
          <NeighborhoodBar neighborhoods={neighborhoods || []} activeNeighborhood={null} cat="calendar" />
        </div>
      </div>

      {/* ── Light calendar area ── */}
      <div style={LIGHT_ZONE}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px 64px' }}>

          {/* Page header */}
          <div style={{ marginBottom: 32 }}>
            <h1 style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(26px, 4vw, 36px)',
              color: '#111',
              margin: 0,
              letterSpacing: '-0.3px',
            }}>
              Chicago Events Calendar
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: '#8A8A8A',
              marginTop: 8,
              marginBottom: 0,
            }}>
              Music, art, food, and nightlife — updated daily.
            </p>
          </div>

          <CalendarView
            initialEvents={events || []}
            initialYear={year}
            initialMonth={month}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}
