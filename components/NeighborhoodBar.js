'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { STYLES } from '@/lib/styles'

function NeighborhoodPill({ neighborhood, active, cat }) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  const base = active ? STYLES.neighborhoodPillActive : STYLES.neighborhoodPill
  const hover = !active && hovered ? { background: '#1E1E1E', color: '#F5F1E8', border: '1px solid #555' } : {}

  const handleClick = () => {
    if (active) {
      router.push(cat && cat !== 'all' ? `/?cat=${cat}` : '/')
    } else {
      router.push(cat && cat !== 'all'
        ? `/?cat=${cat}&neighborhood=${neighborhood.slug}`
        : `/?neighborhood=${neighborhood.slug}`
      )
    }
  }

  return (
    <button
      style={{ ...base, ...hover, border: 'none', outline: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {neighborhood.name}
    </button>
  )
}

export default function NeighborhoodBar({ neighborhoods, activeNeighborhood, cat }) {
  if (!neighborhoods?.length) return null

  return (
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
          active={activeNeighborhood === n.slug}
          cat={cat}
        />
      ))}
    </div>
  )
}
