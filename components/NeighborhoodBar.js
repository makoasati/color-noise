'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { STYLES } from '@/lib/styles'

function NeighborhoodPill({ neighborhood, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  const base = active ? STYLES.neighborhoodPillActive : STYLES.neighborhoodPill
  const hover = !active && hovered ? { background: '#1E1E1E', color: '#F5F1E8', border: '1px solid #555' } : {}

  return (
    <button
      style={{ ...base, ...hover, outline: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {neighborhood.name}
    </button>
  )
}

export default function NeighborhoodBar({ neighborhoods, activeNeighborhoods = [], cats = [] }) {
  const router = useRouter()

  if (!neighborhoods?.length) return null

  function handleClick(slug) {
    const next = activeNeighborhoods.includes(slug)
      ? activeNeighborhoods.filter(s => s !== slug)
      : [...activeNeighborhoods, slug]

    const catParam = cats.length ? `cat=${cats.join(',')}&` : ''

    if (next.length === 0) {
      router.push(cats.length ? `/?cat=${cats.join(',')}` : '/')
    } else {
      router.push(`/?${catParam}neighborhood=${next.join(',')}`)
    }
  }

  return (
    <div className="cn-neighborhood-wrapper">
      <div style={{
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        padding: '10px 0 12px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        {neighborhoods.map(n => (
          <NeighborhoodPill
            key={n.slug}
            neighborhood={n}
            active={activeNeighborhoods.includes(n.slug)}
            onClick={() => handleClick(n.slug)}
          />
        ))}
      </div>
    </div>
  )
}
