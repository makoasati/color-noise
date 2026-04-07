import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DashboardArticleList from '@/components/DashboardArticleList'
import { STYLES } from '@/lib/styles'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin'

  let query = supabase
    .from('articles')
    .select('id, title, category, author_name, date, status, slug')
    .order('created_at', { ascending: false })

  if (!isAdmin) {
    query = query.eq('author_id', user.id)
  }

  const { data: articles = [] } = await query

  return (
    <div style={{ paddingTop: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 26, color: '#111111' }}>
          {isAdmin ? 'All Articles' : 'My Articles'}
        </div>
        <Link href="/dashboard/new" style={STYLES.cmsBtn}>+ New Article</Link>
      </div>

      <DashboardArticleList articles={articles} />
    </div>
  )
}
