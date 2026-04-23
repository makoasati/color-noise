import { createClient } from '@/lib/supabase/server'
import Masthead from '@/components/Masthead'
import PublicNav from '@/components/PublicNav'
import CalendarView from '@/components/CalendarView'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Calendar — Color&Noise',
  description: 'Chicago events — music, art, food, and nightlife',
}

export const revalidate = 300

export default async function CalendarPage() {
  const now   = new Date()
  const year  = now.getFullYear()
  const month = now.getMonth()

  const supabase = await createClient()
  const start   = `${year}-${String(month + 1).padStart(2, '0')}-01`
  const lastDay = new Date(year, month + 1, 0).getDate()
  const end     = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`

  const { data: events } = await supabase
    .from('events')
    .select('id, title, date, time, end_date, venue, neighborhood, category, description, primary_source_url, primary_source_name, additional_sources, image_url, status')
    .eq('status', 'approved')
    .gte('date', start)
    .lte('date', end)
    .order('date', { ascending: true })

  return (
    <div style={{
      background: '#111111',
      minHeight: '100vh',
      color: '#F5F1E8',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>
        <Masthead />
        <PublicNav activeCategory="calendar" activeNeighborhood={null} />

        <div style={{ paddingTop: 36, marginBottom: 24 }}>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: 28,
            color: '#F5F1E8',
            margin: 0,
            letterSpacing: '-0.3px',
          }}>
            Chicago Events Calendar
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: '#8A8A8A',
            marginTop: 6,
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

      <Footer />
    </div>
  )
}
