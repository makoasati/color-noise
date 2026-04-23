import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
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

  const adminDb = createAdminClient()
  const { data: initialEvents = [], count: initialEventCount = 0 } = await adminDb
    .from('events')
    .select('id,title,date,time,end_date,venue,neighborhood,category,description,primary_source_url,primary_source_name,status', { count: 'exact' })
    .order('date', { ascending: false })
    .order('title', { ascending: true })
    .range(0, 4)

  return (
    <div>
      <DashboardEvents initialEvents={initialEvents || []} initialCount={initialEventCount || 0} />
      <DashboardEventSources />
    </div>
  )
}
