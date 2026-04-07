import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Masthead from '@/components/Masthead'
import DashboardNav from '@/components/DashboardNav'
import { DARK_ZONE, LIGHT_ZONE, NOISE_OVERLAY } from '@/lib/styles'

export const metadata = { title: 'Dashboard — Color&Noise' }

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, role')
    .eq('id', user.id)
    .single()

  const role = profile?.role || 'writer'
  const username = profile?.username || user.email?.split('@')[0] || 'editor'

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#111111', color: '#F5F1E8', minHeight: '100vh' }}>

      {/* ── Dark header ── */}
      <div style={DARK_ZONE}>
        <div style={NOISE_OVERLAY} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <Masthead />
          <DashboardNav role={role} username={username} />
        </div>
      </div>

      {/* ── Light content zone ── */}
      <div style={LIGHT_ZONE}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 48px' }}>
          {children}
        </div>
      </div>

      {/* ── Dark footer ── */}
      <div style={DARK_ZONE}>
        <div style={NOISE_OVERLAY} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <footer style={{ padding: '40px 0', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', color: '#8A8A8A', lineHeight: 2.2 }}>
              Color&amp;Noise · Chicago<br />
              Sight, sound, scene
            </div>
          </footer>
        </div>
      </div>

    </div>
  )
}
