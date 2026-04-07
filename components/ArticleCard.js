'use client'
import { useState } from 'react'
import Link from 'next/link'
import { STYLES, CATEGORY_COLOR, CATEGORY_LABELS } from '@/lib/styles'

function CategoryLabel({ category, neighborhood }) {
  const color = CATEGORY_COLOR[category] || '#8A8A8A'
  return (
    <div style={{ ...STYLES.cardCategory(category), display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ display: 'inline-block', width: 8, height: 8, background: color, flexShrink: 0 }} />
      {CATEGORY_LABELS[category]}
      {neighborhood ? ` — ${neighborhood}` : ''}
    </div>
  )
}

export default function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false)
  const catColor = CATEGORY_COLOR[article.category] || '#8A8A8A'

  return (
    <Link
      href={`/article/${article.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        style={{
          ...STYLES.card,
          paddingLeft: hovered ? 18 : 20,
          borderLeft: hovered ? `6px solid ${catColor}` : '4px solid transparent',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {article.cover_image && (
          <img
            src={article.cover_image}
            alt=""
            style={{
              width: '100%',
              maxHeight: 220,
              objectFit: 'cover',
              display: 'block',
              marginBottom: 18,
              borderRadius: 3,
            }}
          />
        )}
        <CategoryLabel category={article.category} neighborhood={article.neighborhood} />
        <div style={{ ...STYLES.cardTitle, color: hovered ? catColor : '#111111' }}>
          {article.title}
        </div>
        <div style={STYLES.cardMeta}>
          {article.author_name} · {article.date}
          {article.venue ? ` · ${article.venue}` : ''}
        </div>
        <div style={STYLES.cardExcerpt}>{article.excerpt}</div>
      </div>
    </Link>
  )
}
