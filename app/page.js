import { createClient } from '@/lib/supabase/server'
import Masthead from '@/components/Masthead'
import PublicNav from '@/components/PublicNav'
import ArticleCard, { ArticleHero } from '@/components/ArticleCard'
import { NOISE_OVERLAY, DARK_ZONE } from '@/lib/styles'

export const metadata = {
  title: 'Color&Noise — Chicago',
  description: 'Sight, sound, scene — the visual and sonic life of Chicago',
}

export default async function HomePage({ searchParams }) {
  const params = await searchParams
  const cat = params?.cat || 'all'

  const supabase = await createClient()
  let query = supabase
    .from('articles')
    .select('id, slug, title, category, author_name, date, venue, neighborhood, excerpt, cover_image, featured')
    .eq('status', 'published')
    .order('date', { ascending: false })

  if (cat !== 'all' && ['review', 'news', 'spotlight'].includes(cat)) {
    query = query.eq('category', cat)
  }

  const { data: articlesData } = await query
  const articles = articlesData || []

  // Show hero only on unfiltered view, using the most recent featured article
  const featured = cat === 'all' ? articles.find(a => a.featured) : null
  const gridArticles = featured ? articles.filter(a => a.id !== featured.id) : articles

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#111111', color: '#F5F1E8', minHeight: '100vh' }}>

      {/* ── Dark header ── */}
      <div style={DARK_ZONE}>
        <div style={NOISE_OVERLAY} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <Masthead />
          <PublicNav activeCategory={cat} />
        </div>
      </div>

      {/* ── Article feed ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px 80px' }}>
        {featured && <ArticleHero article={featured} />}

        {gridArticles.length === 0 ? (
          <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 14, color: '#8A8A8A', textAlign: 'center', padding: '80px 0', textTransform: 'uppercase', letterSpacing: '2px' }}>
            No articles found.
          </div>
        ) : (
          <div className="cn-article-grid">
            {gridArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
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
