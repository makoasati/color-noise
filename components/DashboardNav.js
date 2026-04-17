'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { STYLES } from '@/lib/styles'

function DashboardNavLink({ href, children, active }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={href}
      style={{
        ...STYLES.navItem(active),
        color: active ? '#111111' : hovered ? '#F5F1E8' : '#8A8A8A',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  )
}

export default function DashboardNav({ role, username }) {
  const pathname = usePathname()
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav style={{ ...STYLES.nav, justifyContent: 'flex-start' }}>
      <DashboardNavLink href="/" active={false}>← Site</DashboardNavLink>
      <DashboardNavLink href="/dashboard" active={pathname === '/dashboard'}>Articles</DashboardNavLink>
      <DashboardNavLink href="/dashboard/new" active={pathname === '/dashboard/new'}>+ New</DashboardNavLink>
      <DashboardNavLink href="/dashboard/events" active={pathname === '/dashboard/events'}>Events</DashboardNavLink>
      <button
        style={{
          ...STYLES.navItem(false),
          color: hovered ? '#F5F1E8' : '#8A8A8A',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={handleLogout}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        Sign Out
      </button>
      <span style={{
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        fontFamily: "'Archivo Narrow', sans-serif",
        fontSize: 11,
        color: '#555555',
        padding: '0 20px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      }}>
        {username}{role === 'admin' ? ' · Admin' : ''}
      </span>
    </nav>
  )
}
