import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardEvents from '@/components/DashboardEvents'
import DashboardEventSources from '@/components/DashboardEventSources'

export const metadata = { title: 'Events — Dashboard — Color&Noise' }

export default async function DashboardEventsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  return (
    <div>
      <DashboardEvents />
      <DashboardEventSources />
    </div>
  )
}
