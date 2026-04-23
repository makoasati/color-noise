'use client'
import { useState, useEffect } from 'react'
import { STYLES } from '@/lib/styles'

const CATEGORY_HINTS = {
  music: 'Heard',
  art: 'Seen',
  food: 'Savored',
  nightlife: 'Around',
}

function formatTimestamp(ts) {
  if (!ts) return 'Never'
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

export default function DashboardEventSources() {
  const [sources,   setSources]   = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [showAdd,   setShowAdd]   = useState(false)
  const [scraping,  setScraping]  = useState(false)
  const [scrapeMsg, setScrapeMsg] = useState(null)

  // New source form state
  const [newForm, setNewForm] = useState({ name: '', url: '', category_hint: 'music' })
  const [adding,  setAdding]  = useState(false)
  const [addErr,  setAddErr]  = useState(null)

  useEffect(() => { loadSources() }, [])

  async function loadSources() {
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/event-sources')
      const data = await res.json()
      if (!res.ok) { setError(data.error); setLoading(false); return }
      setSources(data.sources || [])
    } catch {
      setError('Failed to load sources.')
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (id, currentActive) => {
    const res = await fetch(`/api/admin/event-sources/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !currentActive }),
    })
    if (res.ok) {
      setSources(prev => prev.map(s => s.id === id ? { ...s, active: !currentActive } : s))
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this source?')) return
    const res = await fetch(`/api/admin/event-sources/${id}`, { method: 'DELETE' })
    if (res.ok) setSources(prev => prev.filter(s => s.id !== id))
  }

  const handleScrapeNow = async () => {
    setScraping(true)
    setScrapeMsg(null)
    try {
      const secret = prompt('Enter CRON_SECRET to trigger scrape:')
      if (!secret) { setScraping(false); return }
      const res  = await fetch(`/api/cron/scrape-events?secret=${encodeURIComponent(secret)}`)
      const data = await res.json()
      if (res.ok) {
        setScrapeMsg(`Done! ${data.results?.map(r => `${r.source}: ${r.status === 'ok' ? `${r.inserted} new` : r.status}`).join(', ')}`)
        await loadSources() // Refresh last_scraped_at
      } else {
        setScrapeMsg(`Error: ${data.error || 'Scrape failed.'}`)
      }
    } catch (e) {
      setScrapeMsg(`Error: ${e.message}`)
    } finally {
      setScraping(false)
    }
  }

  const handleAddSource = async (e) => {
    e.preventDefault()
    setAdding(true)
    setAddErr(null)
    try {
      const res  = await fetch('/api/admin/event-sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newForm),
      })
      const data = await res.json()
      if (!res.ok) { setAddErr(data.error || 'Failed to add source.'); setAdding(false); return }
      setSources(prev => [...prev, data.source])
      setNewForm({ name: '', url: '', category_hint: 'music' })
      setShowAdd(false)
    } catch {
      setAddErr('Failed to add source.')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div style={{ marginTop: 56 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 26, color: '#111' }}>
          Event Sources
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleScrapeNow}
            disabled={scraping}
            style={{
              ...STYLES.cmsCancelBtn,
              color: '#2D4DFF',
              borderColor: '#2D4DFF',
              opacity: scraping ? 0.6 : 1,
            }}
          >
            {scraping ? 'Scraping…' : 'Scrape Now'}
          </button>
          <button onClick={() => setShowAdd(s => !s)} style={STYLES.cmsBtn}>
            {showAdd ? 'Cancel' : '+ Add Source'}
          </button>
        </div>
      </div>

      {scrapeMsg && (
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: scrapeMsg.startsWith('Error') ? '#E73B2F' : '#2D4DFF',
          background: '#F5F1E8',
          padding: '10px 14px',
          marginBottom: 16,
          border: '1px solid #CCC5B8',
        }}>
          {scrapeMsg}
        </div>
      )}

      {showAdd && (
        <form onSubmit={handleAddSource} style={{ ...STYLES.cmsForm, marginBottom: 24 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16, color: '#111', marginBottom: 12 }}>
            Add New Source
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={STYLES.cmsLabel}>Name *</label>
              <input
                required
                style={STYLES.cmsInput}
                value={newForm.name}
                onChange={e => setNewForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Chicago Reader"
              />
            </div>
            <div>
              <label style={STYLES.cmsLabel}>Category Hint *</label>
              <select
                style={STYLES.cmsSelect}
                value={newForm.category_hint}
                onChange={e => setNewForm(f => ({ ...f, category_hint: e.target.value }))}
              >
                {Object.entries(CATEGORY_HINTS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <label style={STYLES.cmsLabel}>URL *</label>
          <input
            required
            type="url"
            style={STYLES.cmsInput}
            value={newForm.url}
            onChange={e => setNewForm(f => ({ ...f, url: e.target.value }))}
            placeholder="https://…"
          />
          {addErr && <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: '#E73B2F', marginTop: 10 }}>{addErr}</div>}
          <div style={STYLES.cmsActions}>
            <button type="submit" disabled={adding} style={{ ...STYLES.cmsSaveBtn, opacity: adding ? 0.6 : 1 }}>
              {adding ? 'Adding…' : 'Add Source'}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 12, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '2px' }}>Loading…</div>
      ) : error ? (
        <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: '#E73B2F' }}>{error}</div>
      ) : (
        <div style={{ border: '1px solid #CCC5B8' }}>
          {sources.map((src, i) => (
            <div
              key={src.id}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'center',
                padding: '14px 16px',
                borderBottom: i < sources.length - 1 ? '1px solid #E8E4DC' : 'none',
                background: src.active ? '#FFFFFF' : '#FAF8F4',
                opacity: src.active ? 1 : 0.65,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#111',
                  marginBottom: 3,
                }}>
                  {src.name}
                  <span style={{
                    marginLeft: 10,
                    fontFamily: "'Archivo Narrow', sans-serif",
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: '#8A8A8A',
                    fontWeight: 600,
                  }}>
                    {CATEGORY_HINTS[src.category_hint] || src.category_hint}
                  </span>
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: '#8A8A8A',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {src.url}
                </div>
                <div style={{
                  fontFamily: "'Archivo Narrow', sans-serif",
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#8A8A8A',
                  marginTop: 3,
                }}>
                  Last scraped: {formatTimestamp(src.last_scraped_at)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                <button
                  onClick={() => handleToggle(src.id, src.active)}
                  style={{
                    fontFamily: "'Archivo Narrow', sans-serif",
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    padding: '5px 12px',
                    cursor: 'pointer',
                    background: src.active ? '#2D4DFF' : 'transparent',
                    color: src.active ? '#fff' : '#8A8A8A',
                    border: `1px solid ${src.active ? '#2D4DFF' : '#CCC5B8'}`,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {src.active ? 'Active' : 'Inactive'}
                </button>
                <button
                  onClick={() => handleDelete(src.id)}
                  style={{
                    fontFamily: "'Archivo Narrow', sans-serif",
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    background: 'transparent',
                    color: '#E73B2F',
                    border: '1px solid #E73B2F',
                    fontWeight: 500,
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
