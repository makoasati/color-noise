'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CATEGORY_COLOR, CATEGORY_LABELS } from '@/lib/styles'

function CategoryBadge({ category, neighborhood }) {
  const color = CATEGORY_COLOR[category] || '#8A8A8A'
  const labelStyle = {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: 700,
    lineHeight: 1,
  }
  return (
    <div style={{
      position: 'absolute',
      top: 8,
      left: 8,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'rgba(0,0,0,0.72)',
      padding: '4px 8px',
      backdropFilter: 'blur(2px)',
    }}>
      <span style={{ ...labelStyle, color }}>{CATEGORY_LABELS[category]}</span>
      <span style={{ display: 'inline-block', width: 7, height: 7, background: color, flexShrink: 0 }} />
      {neighborhood && <span style={{ ...labelStyle, color }}>{neighborhood}</span>}
    </div>
  )
}

function ArticleImage({ src }) {
  return (
    <div style={{ position: 'relative', width: '100%', paddingTop: '66.67%', background: '#4A6CF7', overflow: 'hidden' }}>
      {src && (
        <img
          src={src}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
    </div>
  )
}

export function ArticleHero({ article }) {
  const [hovered, setHovered] = useState(false)
  const catColor = CATEGORY_COLOR[article.category] || '#8A8A8A'

  return (
    <Link href={`/article/${article.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 48 }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '66.67%', background: '#4A6CF7', overflow: 'hidden' }}>
          {article.cover_image && (
            <img
              src={article.cover_image}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
          <CategoryBadge category={article.category} neighborhood={article.neighborhood} />
        </div>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(26px, 4vw, 42px)',
          lineHeight: 1.05,
          letterSpacing: '-0.3px',
          color: hovered ? catColor : '#F5F1E8',
          marginTop: 16,
          transition: 'color 0.15s',
          textTransform: 'uppercase',
        }}>
          {article.title}
        </div>
      </div>
    </Link>
  )
}

export default function ArticleCard({ article }) {
  const [hovered, setHovered] = useState(false)
  const catColor = CATEGORY_COLOR[article.category] || '#8A8A8A'

  return (
    <Link href={`/article/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <ArticleImage src={article.cover_image} />
          <CategoryBadge category={article.category} neighborhood={article.neighborhood} />
        </div>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: 18,
          lineHeight: 1.2,
          letterSpacing: '-0.2px',
          color: hovered ? catColor : '#F5F1E8',
          marginTop: 10,
          transition: 'color 0.15s',
          textTransform: 'uppercase',
        }}>
          {article.title}
        </div>
      </div>
    </Link>
  )
}
