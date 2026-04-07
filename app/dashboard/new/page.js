import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ArticleEditor from '@/components/ArticleEditor'

export const metadata = { title: 'New Article — Color&Noise' }

export default async function NewArticlePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  return (
    <ArticleEditor
      userId={user.id}
      authorName={profile?.username || ''}
    />
  )
}
