import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ArticleEditor from '@/components/ArticleEditor'

export const metadata = { title: 'Edit Article — Color&Noise' }

export default async function EditArticlePage({ params }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: profile }, { data: article }] = await Promise.all([
    supabase.from('profiles').select('username, role').eq('id', user.id).single(),
    supabase.from('articles').select('*').eq('id', id).single(),
  ])

  if (!article) notFound()

  // Writers can only edit their own articles
  if (profile?.role !== 'admin' && article.author_id !== user.id) {
    redirect('/dashboard')
  }

  return (
    <ArticleEditor
      article={article}
      userId={user.id}
      authorName={profile?.username || ''}
    />
  )
}
