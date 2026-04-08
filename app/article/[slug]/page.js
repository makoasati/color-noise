import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import Masthead from '@/components/Masthead'
import PublicNav from '@/components/PublicNav'
import Footer from '@/components/Footer'
import { DARK_ZONE, LIGHT_ZONE, NOISE_OVERLAY, STYLES, CATEGORY_COLOR, CATEGORY_LABELS } from '@/lib/styles'
import { legacyBodyToHtml } from '@/lib/utils'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('articles')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  if (!data) return { title: 'Not Found — Color&Noise' }
  return {
    title: `${data.title} — Color&Noise`,
    description: data.excerpt,
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!article) notFound()

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

          <Link href="/" style={STYLES.articleBack}>← All articles</Link>

          {article.cover_image && (
            <img
              src={article.cover_image}
              alt=""
              style={{ width: '100%', maxHeight: 420, objectFit: 'cover', display: 'block', borderRadius: 4, marginBottom: 28 }}
            />
          )}

          <div style={{ ...STYLES.cardCategory(article.category), display: 'flex', alignItems: 'center', gap: 6 }}>
            {CATEGORY_LABELS[article.category]}
            <span style={{ display: 'inline-block', width: 8, height: 8, background: catColor, flexShrink: 0 }} />
            {article.neighborhood && <span style={{ color: catColor }}>{article.neighborhood}</span>}
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

        </div>
      </div>

      <Footer />

    </div>
  )
}
