'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('Invalid credentials. Please try again.')
      setLoading(false)
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div style={{ background: '#111111', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>

      {/* Masthead */}
      <div style={{ marginBottom: 48 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 'clamp(48px, 9.35vw, 82px)', letterSpacing: '0.012em', lineHeight: 0.78, textTransform: 'uppercase', margin: 0, padding: 0, cursor: 'pointer', userSelect: 'none', display: 'inline-block', textAlign: 'left' }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 1000, color: '#4A6CF7', fontSize: 'clamp(41px, 7.95vw, 70px)', letterSpacing: '0' }}>COLOR</span>
            <span style={{ display: 'block', marginTop: '-0.2em' }}>
              <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 1000, fontSize: 'clamp(0px, 3.8vw, 45px)', color: '#E73B2F', lineHeight: 1, marginRight: '-0.25em', zIndex: 2, position: 'relative' }}>&amp;</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 1000, fontStyle: 'italic', color: '#F5F1E8', fontSize: 'clamp(35px, 7.95vw, 60px)', letterSpacing: '0' }}>NOISE</span>
              </span>
            </span>
          </h1>
        </Link>
        <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', color: '#8A8A8A', marginTop: 14 }}>
          Sight · Sound · Scene
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', padding: 36, width: '100%', maxWidth: 380 }}
      >
        <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', color: '#8A8A8A', textAlign: 'center', marginBottom: 28 }}>
          Editor Sign In
        </div>

        <label style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8A8A', display: 'block', marginBottom: 6 }}>
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: '#F5F1E8', border: '1px solid #CCC5B8', color: '#111', padding: '10px 12px', width: '100%', boxSizing: 'border-box', marginBottom: 16 }}
        />

        <label style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8A8A', display: 'block', marginBottom: 6 }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, background: '#F5F1E8', border: '1px solid #CCC5B8', color: '#111', padding: '10px 12px', width: '100%', boxSizing: 'border-box', marginBottom: 24 }}
        />

        {error && (
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#E73B2F', marginBottom: 16 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 12, textTransform: 'uppercase', letterSpacing: '2px', padding: 12, width: '100%', cursor: loading ? 'wait' : 'pointer', background: '#E73B2F', color: '#fff', border: 'none', fontWeight: 700, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

    </div>
  )
}
