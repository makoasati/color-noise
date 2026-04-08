'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { STYLES } from '@/lib/styles'

const PUBLIC_NAV_TABS = [
  { key: 'all',       label: 'All',    square: null },
  { key: 'news',      label: 'Around', square: '#C95C2B' },
  { key: 'review',    label: 'Heard',  square: '#E73B2F' },
  { key: 'spotlight', label: 'Seen',   square: '#2D4DFF' },
]

function NavTab({ tab, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  const showFull = active || hovered
  return (
    <button
      style={{
        ...STYLES.navItem(active),
        color: active ? '#111111' : hovered ? '#F5F1E8' : '#8A8A8A',
        display: 'flex',
        alignItems: 'center',
        gap: tab.square ? 6 : 0,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {tab.square && (
        <span style={{
          display: 'inline-block',
          width: 8,
          height: 8,
          background: tab.square,
          flexShrink: 0,
          opacity: showFull ? 1 : 0.5,
          transition: 'opacity 0.15s',
        }} />
      )}
      {tab.label}
    </button>
  )
}

export default function PublicNav({ activeCategory, activeNeighborhood }) {
  const router = useRouter()
  const nbhd = activeNeighborhood ? `&neighborhood=${activeNeighborhood}` : ''
  return (
    <nav style={STYLES.nav}>
      {PUBLIC_NAV_TABS.map(tab => (
        <NavTab
          key={tab.key}
          tab={tab}
          active={tab.key === activeCategory}
          onClick={() => {
            if (tab.key === 'all') router.push(activeNeighborhood ? `/?neighborhood=${activeNeighborhood}` : '/')
            else router.push(`/?cat=${tab.key}${nbhd}`)
          }}
        />
      ))}
    </nav>
  )
}
