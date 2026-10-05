import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'
import Masthead from '@/components/Masthead'
import PublicNav from '@/components/PublicNav'
import NeighborhoodBar from '@/components/NeighborhoodBar'
import ArticleCard, { ArticleHero } from '@/components/ArticleCard'
import { NOISE_OVERLAY, DARK_ZONE } from '@/lib/styles'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const revalidate = 60

export const metadata = {
  title: 'Color&Noise',
  description: 'Sight, sound, scene. The visual and sonic life of Chicago.',
}

export default async function HomePage({ searchParams }) {
  const params = await searchParams

  // Parse comma-separated multi-select filters
  const cats = (params?.cat || '').split(',').map(s => s.trim()).filter(s => s && s !== 'all' && ['review', 'news', 'spotlight', 'food'].includes(s))
  const neighborhoodSlugs = (params?.neighborhood || '').split(',').map(s => s.trim()).filter(Boolean)

  const supabase = await createClient()

  const [{ data: neighborhoodsData }, { data: articleNeighborhoodData }] = await Promise.all([
    supabase.from('neighborhoods').select('id, name, slug').order('name', { ascending: true }),
    supabase.from('articles').select('neighborhood').eq('status', 'published').not('neighborhood', 'is', null),
  ])
  const tableNeighborhoods = neighborhoodsData || []
  const tableSlugSet = new Set([
    ...tableNeighborhoods.map(n => n.slug),
    ...tableNeighborhoods.map(n => slugify(n.name)),
  ])

  const extraNames = new Map()
  for (const row of (articleNeighborhoodData || [])) {
    const name = row.neighborhood?.trim()
    if (!name) continue
    const slug = slugify(name)
    if (!tableSlugSet.has(slug) && !extraNames.has(slug)) {
      extraNames.set(slug, name)
    }
  }
  const extraNeighborhoods = Array.from(extraNames.entries()).map(([slug, name]) => ({ id: slug, name, slug }))
  const neighborhoods = [...tableNeighborhoods, ...extraNeighborhoods]
    .sort((a, b) => a.name.localeCompare(b.name))

  // Resolve each selected neighborhood slug to its real display name for SQL filtering
  const activeNeighborhoodNames = []
  for (const slug of neighborhoodSlugs) {
    const match = neighborhoods.find(n => n.slug === slug) || neighborhoods.find(n => slugify(n.name) === slug)
    let name = match?.name || null
    if (!name) {
      const found = (articleNeighborhoodData || []).find(a => a.neighborhood && slugify(a.neighborhood) === slug)
      if (found) name = found.neighborhood?.trim() || null
    }
    if (name) activeNeighborhoodNames.push(name)
  }

  // Build article query
  let query = supabase
    .from('articles')
    .select('id, slug, title, category, author_name, date, venue, neighborhood, excerpt, cover_image, featured')
    .eq('status', 'published')
    // 74 of the published articles share an event date with another, and a sort
    // on `date` alone leaves those ties in whatever order Postgres returns them
    // — which can differ between requests and reshuffle the feed (and the hero).
    // Newest-written first within a day keeps it stable.
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })

  if (cats.length > 0) {
    query = query.in('category', cats)
  }
  if (activeNeighborhoodNames.length > 0) {
    query = query.in('neighborhood', activeNeighborhoodNames)
  }

  const { data: articlesData } = await query
  const articles = articlesData || []

  // Hero only on fully unfiltered view. It is the newest article by event date,
  // not the newest flagged `featured` — the feed reads strictly newest-first, so
  // the hero has to be the top of that order rather than jump the queue.
  const featured = cats.length === 0 && neighborhoodSlugs.length === 0 ? articles[0] || null : null
  const gridArticles = featured ? articles.slice(1) : articles

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#111111', color: '#F5F1E8', minHeight: '100vh' }}>

      {/* ── Dark header ── */}
      <div style={DARK_ZONE}>
        <div style={NOISE_OVERLAY} />
        <div className="cn-page-padded" style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <Masthead />
          <PublicNav activeCategories={cats} activeNeighborhoods={neighborhoodSlugs} />
          <NeighborhoodBar neighborhoods={neighborhoods} activeNeighborhoods={neighborhoodSlugs} cats={cats} />
        </div>
      </div>

      {/* ── Neighborhood filter indicator ── */}
      {activeNeighborhoodNames.length > 0 && (
        <div style={{ background: '#1A1A1A', borderBottom: '1px solid #2A2A2A' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8A8A' }}>
              Showing:
            </span>
            <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', color: '#F5F1E8', fontWeight: 700 }}>
              {activeNeighborhoodNames.join(', ')}
            </span>
            <Link
              href={cats.length > 0 ? `/?cat=${cats.join(',')}` : '/'}
              style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, color: '#E73B2F', textDecoration: 'none', fontWeight: 700, marginLeft: 4 }}
            >
              ✕ Clear
            </Link>
          </div>
        </div>
      )}

      {/* ── Article feed ── */}
      <div className="cn-article-feed" style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px 80px' }}>
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

      <Footer />

    </div>
  )
}
