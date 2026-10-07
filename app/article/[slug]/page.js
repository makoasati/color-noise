import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Masthead from '@/components/Masthead'
import PublicNav from '@/components/PublicNav'
import Footer from '@/components/Footer'
import CommentsSection from '@/components/CommentsSection'
import { DARK_ZONE, LIGHT_ZONE, NOISE_OVERLAY, STYLES, CATEGORY_COLOR, CATEGORY_LABELS } from '@/lib/styles'
import { legacyBodyToHtml, slugify } from '@/lib/utils'

export const revalidate = 60

export async function generateMetadata({ params }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (!data) return { title: 'Not Found | Color&Noise' }
  return {
    title: `${data.title} | Color&Noise`,
    description: data.excerpt,
  }
}

export default async function ArticlePage({ params, searchParams }) {
  const { slug } = await params
  const { preview } = await searchParams
  const supabase = await createClient()

  // ?preview lets the author/admin see an unpublished draft exactly as readers will
  let query = supabase.from('articles').select('*').eq('slug', slug)
  if (!preview) query = query.eq('status', 'published')
  const { data: article } = await query.single()

  if (!article) notFound()

  // Edit button: only for the article's author or an admin (same rule as the edit page)
  let canEdit = false
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    if (article.author_id === user.id) canEdit = true
    else {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
      canEdit = profile?.role === 'admin'
    }
  }

  if (article.status !== 'published' && !canEdit) notFound()

  const htmlBody = legacyBodyToHtml(article.body || article.excerpt)
  const catColor = CATEGORY_COLOR[article.category] || '#8A8A8A'

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#111111', color: '#F5F1E8', minHeight: '100vh' }}>

      {/* ── Dark header ── */}
      <div style={DARK_ZONE}>
        <div style={NOISE_OVERLAY} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <Masthead />
          <PublicNav activeCategory={null} />
        </div>
      </div>

      {/* ── Light reading zone ── */}
      <div style={LIGHT_ZONE}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 64px' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <Link href="/" style={STYLES.articleBack}>← All articles</Link>
            {canEdit && (
              <Link
                href={`/dashboard/edit/${article.id}`}
                style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, padding: '8px 16px', background: '#E73B2F', color: '#fff', textDecoration: 'none', flexShrink: 0 }}
              >
                Edit
              </Link>
            )}
          </div>

          {article.cover_image && (
            <img
              src={article.cover_image}
              alt={article.title}
              style={{ width: '100%', maxHeight: 420, objectFit: 'cover', display: 'block', borderRadius: 4, marginBottom: 28 }}
            />
          )}

          <div style={{ ...STYLES.cardCategory(article.category), display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {CATEGORY_LABELS[article.category]}
            <span style={{ display: 'inline-block', width: 8, height: 8, background: catColor, flexShrink: 0 }} />
            {article.neighborhood && (
              <Link
                href={`/?neighborhood=${slugify(article.neighborhood)}`}
                style={{ color: catColor, textDecoration: 'none', borderBottom: `1px solid ${catColor}` }}
              >
                {article.neighborhood}
              </Link>
            )}
          </div>

          <h1 style={STYLES.articleTitle}>{article.title}</h1>

          <div style={STYLES.articleMeta}>
            {article.author_name} · {article.date}
            {article.venue ? ` · ${article.venue}` : ''}
          </div>

          <div
            className="cn-article-body"
            style={{ maxWidth: 640 }}
            dangerouslySetInnerHTML={{ __html: htmlBody }}
          />

          <CommentsSection articleId={article.id} />

        </div>
      </div>

      <Footer />

    </div>
  )
}
