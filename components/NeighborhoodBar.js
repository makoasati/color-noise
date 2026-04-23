'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { STYLES } from '@/lib/styles'

function NeighborhoodPill({ neighborhood, active, onActivate, onDeactivate }) {
  const [hovered, setHovered] = useState(false)
  const base = active ? STYLES.neighborhoodPillActive : STYLES.neighborhoodPill
  const hover = !active && hovered ? { background: '#1E1E1E', color: '#F5F1E8', border: '1px solid #555' } : {}

  return (
    <button
      style={{ ...base, ...hover, outline: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={active ? onDeactivate : onActivate}
    >
      {neighborhood.name}
    </button>
  )
}

export default function NeighborhoodBar({ neighborhoods, activeNeighborhood, cat }) {
  const router = useRouter()

  if (!neighborhoods?.length) return null

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
            active={activeNeighborhood === n.slug}
            onActivate={() => router.push(
              cat && cat !== 'all' ? `/?cat=${cat}&neighborhood=${n.slug}` : `/?neighborhood=${n.slug}`
            )}
            onDeactivate={() => router.push(
              cat && cat !== 'all' ? `/?cat=${cat}` : '/'
            )}
          />
        ))}
      </div>
    </div>
  )
}
