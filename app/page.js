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
  description: 'Sight, sound, scene — the visual and sonic life of Chicago',
}

export default async function HomePage({ searchParams }) {
  const params = await searchParams
  const cat = params?.cat || 'all'
  const neighborhood = params?.neighborhood || null

  const supabase = await createClient()

  // Fetch neighborhoods table + all distinct neighborhood values on published articles,
  // then merge so the bar always shows every neighborhood that has at least one article.
  const [{ data: neighborhoodsData }, { data: articleNeighborhoodData }] = await Promise.all([
    supabase.from('neighborhoods').select('id, name, slug').order('name', { ascending: true }),
    supabase.from('articles').select('neighborhood').eq('status', 'published').not('neighborhood', 'is', null),
  ])
  const tableNeighborhoods = neighborhoodsData || []
  // Build a set of all slugs already represented in the table (both stored slug AND slugify(name))
  const tableSlugSet = new Set([
    ...tableNeighborhoods.map(n => n.slug),
    ...tableNeighborhoods.map(n => slugify(n.name)),
  ])

  // Add any neighborhoods that exist on articles but aren't in the table at all
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

  // Build article query
  let query = supabase
    .from('articles')
    .select('id, slug, title, category, author_name, date, venue, neighborhood, excerpt, cover_image, featured')
    .eq('status', 'published')
    .order('date', { ascending: false })

  if (cat !== 'all' && ['review', 'news', 'spotlight'].includes(cat)) {
    query = query.eq('category', cat)
  }

  // Match neighborhood by exact slug OR by slugifying the name (handles mismatches like "loop" vs "the-loop")
  let matchedNeighborhood =
    neighborhood
      ? neighborhoods.find(n => n.slug === neighborhood) ||
        neighborhoods.find(n => slugify(n.name) === neighborhood)
      : null

  // If still not found in the neighborhoods table, look up the real name from articles
  // (reuse the articleNeighborhoodData already fetched above)
  let neighborhoodNameForFilter = matchedNeighborhood?.name || null
  if (neighborhood && !neighborhoodNameForFilter) {
    const found = (articleNeighborhoodData || []).find(
      a => a.neighborhood && slugify(a.neighborhood) === neighborhood
    )
    if (found) neighborhoodNameForFilter = found.neighborhood?.trim() || null
  }

  if (neighborhoodNameForFilter) {
    query = query.eq('neighborhood', neighborhoodNameForFilter)
  }

  const { data: articlesData } = await query
  const articles = articlesData || []

  // Hero only on unfiltered view (no category, no neighborhood filter)
  const featured = !cat || cat === 'all' && !neighborhood ? articles.find(a => a.featured) : null
  const gridArticles = featured ? articles.filter(a => a.id !== featured.id) : articles

  // Active neighborhood display name for filter indicator
  const activeNeighborhoodName = neighborhoodNameForFilter || null

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#111111', color: '#F5F1E8', minHeight: '100vh' }}>

      {/* ── Dark header ── */}
      <div style={DARK_ZONE}>
        <div style={NOISE_OVERLAY} />
        <div className="cn-page-padded" style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <Masthead />
          <PublicNav activeCategory={cat} activeNeighborhood={neighborhood} />
          <NeighborhoodBar neighborhoods={neighborhoods} activeNeighborhood={neighborhood} cat={cat} />
        </div>
      </div>

      {/* ── Neighborhood filter indicator ── */}
      {activeNeighborhoodName && (
        <div style={{ background: '#1A1A1A', borderBottom: '1px solid #2A2A2A' }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8A8A' }}>
              Showing:
            </span>
            <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', color: '#F5F1E8', fontWeight: 700 }}>
              {activeNeighborhoodName}
            </span>
            <Link
              href={cat && cat !== 'all' ? `/?cat=${cat}` : '/'}
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
