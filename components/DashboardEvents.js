'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import ComboInput from './ComboInput'
import { STYLES } from '@/lib/styles'

const EVENT_CATS = {
  music:     { color: '#E73B2F', label: 'Heard' },
  art:       { color: '#4A6CF7', label: 'Seen' },
  food:      { color: '#D8A23A', label: 'Savored' },
  nightlife: { color: '#C95C2B', label: 'Around' },
}
const STATUS_COLORS = { approved: '#2D4DFF', pending: '#C95C2B' }
const PAGE_SIZE = 5

function formatDate(str) {
  if (!str) return '—'
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function EventForm({ event, onSave, onCancel, neighborhoodOptions = [] }) {
  const [form, setForm] = useState({
    title: event?.title || '',
    date: event?.date || '',
    time: event?.time || '',
    end_date: event?.end_date || '',
    venue: event?.venue || '',
    neighborhood: event?.neighborhood || '',
    category: event?.category || 'music',
    description: event?.description || '',
    primary_source_url: event?.primary_source_url || '',
    primary_source_name: event?.primary_source_name || '',
    status: event?.status || 'approved',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState(null)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const url    = event ? `/api/admin/events/${event.id}` : '/api/admin/events'
      const method = event ? 'PATCH' : 'POST'
      const res  = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Save failed.'); setSaving(false); return }
      onSave(data.event)
    } catch {
      setError('Save failed.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={STYLES.cmsForm}>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 18, color: '#111', marginBottom: 16 }}>
        {event ? 'Edit Event' : 'Add Event'}
      </div>

      <label style={STYLES.cmsLabel}>Title *</label>
      <input required style={STYLES.cmsInput} value={form.title} onChange={e => set('title', e.target.value)} maxLength={300} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={STYLES.cmsLabel}>Date *</label>
          <input required type="date" style={STYLES.cmsInput} value={form.date} onChange={e => set('date', e.target.value)} />
        </div>
        <div>
          <label style={STYLES.cmsLabel}>Time</label>
          <input style={STYLES.cmsInput} value={form.time} onChange={e => set('time', e.target.value)} placeholder="e.g. 8:00 PM" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={STYLES.cmsLabel}>Category *</label>
          <select required style={STYLES.cmsSelect} value={form.category} onChange={e => set('category', e.target.value)}>
            {Object.entries(EVENT_CATS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
        <div>
          <label style={STYLES.cmsLabel}>Status</label>
          <select style={STYLES.cmsSelect} value={form.status} onChange={e => set('status', e.target.value)}>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={STYLES.cmsLabel}>Venue</label>
          <input style={STYLES.cmsInput} value={form.venue} onChange={e => set('venue', e.target.value)} />
        </div>
        <div>
          <label style={STYLES.cmsLabel}>Neighborhood</label>
          <ComboInput
            value={form.neighborhood}
            onChange={v => set('neighborhood', v)}
            options={neighborhoodOptions}
            placeholder="e.g. Logan Square"
          />
        </div>
      </div>

      <label style={STYLES.cmsLabel}>End Date (multi-day events)</label>
      <input type="date" style={STYLES.cmsInput} value={form.end_date} onChange={e => set('end_date', e.target.value)} />

      <label style={STYLES.cmsLabel}>Description</label>
      <textarea
        style={{ ...STYLES.cmsInput, minHeight: 80, resize: 'vertical', lineHeight: 1.6 }}
        value={form.description}
        onChange={e => set('description', e.target.value)}
        maxLength={300}
        placeholder="Short description (max 300 chars)"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={STYLES.cmsLabel}>Source URL</label>
          <input type="url" style={STYLES.cmsInput} value={form.primary_source_url} onChange={e => set('primary_source_url', e.target.value)} />
        </div>
        <div>
          <label style={STYLES.cmsLabel}>Source Name</label>
          <input style={STYLES.cmsInput} value={form.primary_source_name} onChange={e => set('primary_source_name', e.target.value)} />
        </div>
      </div>

      {error && <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: '#E73B2F', marginTop: 12 }}>{error}</div>}

      <div style={STYLES.cmsActions}>
        <button type="submit" disabled={saving} style={{ ...STYLES.cmsSaveBtn, opacity: saving ? 0.6 : 1 }}>
          {saving ? 'Saving…' : 'Save Event'}
        </button>
        <button type="button" onClick={onCancel} style={STYLES.cmsCancelBtn}>Cancel</button>
      </div>
    </form>
  )
}

export default function DashboardEvents({ initialEvents = [], initialCount = 0 }) {
  const [events,             setEvents]             = useState(initialEvents)
  const [totalCount,         setTotalCount]         = useState(initialCount)
  const [loading,            setLoading]            = useState(initialEvents.length === 0)
  const [error,              setError]              = useState(null)
  const [editTarget,         setEditTarget]         = useState(null)
  const [catFilter,          setCatFilter]          = useState('all')
  const [statusFilter,       setStatusFilter]       = useState('all')
  const [searchTerm,         setSearchTerm]         = useState('')
  const [page,               setPage]               = useState(1)
  const [neighborhoodOptions, setNeighborhoodOptions] = useState([])
  const skippedInitialLoad = useRef(false)

  useEffect(() => {
    if (!editTarget) return
    if (neighborhoodOptions.length > 0) return
    const supabase = createClient()
    Promise.all([
      supabase.from('neighborhoods').select('name').order('name'),
      supabase.from('articles').select('neighborhood').not('neighborhood', 'is', null),
      supabase.from('events').select('neighborhood').not('neighborhood', 'is', null),
    ]).then(([{ data: nbhd }, { data: arts }, { data: evts }]) => {
      const names = new Set()
      for (const r of nbhd || []) if (r.name)         names.add(r.name.trim())
      for (const r of arts || []) if (r.neighborhood) names.add(r.neighborhood.trim())
      for (const r of evts || []) if (r.neighborhood) names.add(r.neighborhood.trim())
      setNeighborhoodOptions([...names].sort())
    })
  }, [editTarget, neighborhoodOptions.length])

  async function loadEvents(activePage = page) {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.set('page', String(activePage))
      params.set('limit', String(PAGE_SIZE))
      if (catFilter    !== 'all') params.set('category', catFilter)
      if (statusFilter !== 'all') params.set('status', statusFilter)
      if (searchTerm.trim())      params.set('q', searchTerm.trim())
      const res = await fetch(`/api/admin/events?${params}`, { credentials: 'same-origin' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || `Failed to load events (${res.status}).`)
        return
      }
      setEvents(data.events || [])
      setTotalCount(data.count || 0)
    } catch {
      setError('Failed to load events.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!skippedInitialLoad.current && page === 1 && catFilter === 'all' && statusFilter === 'all' && !searchTerm.trim()) {
      skippedInitialLoad.current = true
      return
    }
    const timer = setTimeout(() => { loadEvents(page) }, 250)
    return () => clearTimeout(timer)
  }, [catFilter, statusFilter, searchTerm, page]) // eslint-disable-line

  const handleApprove = async (id) => {
    const res = await fetch(`/api/admin/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved' }),
    })
    if (res.ok) setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'approved' } : e))
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event permanently?')) return
    const res = await fetch(`/api/admin/events/${id}`, { method: 'DELETE' })
    if (res.ok) loadEvents(page)
  }

  const handleSaved = (saved) => {
    setEditTarget(null)
    loadEvents(page)
  }

  const pending = events.filter(e => e.status === 'pending').length
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))
  const startRow = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const endRow = Math.min(page * PAGE_SIZE, totalCount)

  return (
    <div style={{ paddingTop: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 26, color: '#111' }}>
          Events {!loading && `(${totalCount})`}
          {pending > 0 && (
            <span style={{ marginLeft: 12, fontFamily: "'Archivo Narrow', sans-serif", fontSize: 12, color: '#C95C2B', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {pending} pending
            </span>
          )}
        </div>
        <button onClick={() => setEditTarget('new')} style={STYLES.cmsBtn}>+ Add Event</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 1fr) auto auto', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <div style={{ position: 'relative', minWidth: 0 }}>
          <input
            style={{ ...STYLES.cmsInput, paddingRight: searchTerm ? 36 : 12 }}
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setPage(1) }}
            placeholder="Search events"
            aria-label="Search events"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => { setSearchTerm(''); setPage(1) }}
              title="Clear search"
              style={{ position: 'absolute', top: 7, right: 7, width: 24, height: 24, border: 'none', background: 'transparent', color: '#8A8A8A', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}
            >
              x
            </button>
          )}
        </div>
        <select style={{ ...STYLES.cmsSelect, width: 'auto' }} value={catFilter} onChange={e => { setCatFilter(e.target.value); setPage(1) }}>
          <option value="all">All Categories</option>
          {Object.entries(EVENT_CATS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select style={{ ...STYLES.cmsSelect, width: 'auto' }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }}>
          <option value="all">All Statuses</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {editTarget && (
        <EventForm
          event={editTarget === 'new' ? null : editTarget}
          onSave={handleSaved}
          onCancel={() => setEditTarget(null)}
          neighborhoodOptions={neighborhoodOptions}
        />
      )}

      {loading ? (
        <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 12, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '2px' }}>Loading…</div>
      ) : error && events.length === 0 ? (
        <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: '#E73B2F' }}>{error}</div>
      ) : events.length === 0 ? (
        <div style={{ fontFamily: "'DM Sans'", fontSize: 15, color: '#8A8A8A' }}>No events found.</div>
      ) : (
        <>
        {error && (
          <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: '#E73B2F', marginBottom: 12 }}>
            {error}
          </div>
        )}
        <div style={{ border: '1px solid #CCC5B8', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #CCC5B8', background: '#FAF8F4' }}>
                {['Date','Title','Venue','Category','Source','Status','Actions'].map(h => (
                  <th key={h} style={{
                    fontFamily: "'Archivo Narrow', sans-serif",
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: '#8A8A8A',
                    padding: '10px 12px',
                    textAlign: 'left',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((ev, i) => {
                const cat = EVENT_CATS[ev.category]
                return (
                  <tr
                    key={ev.id}
                    style={{
                      borderBottom: i < events.length - 1 ? '1px solid #E8E4DC' : 'none',
                      background: ev.status === 'pending' ? '#FFF8F5' : '#FFFFFF',
                    }}
                  >
                    <td style={{ padding: '11px 12px', whiteSpace: 'nowrap', color: '#555', fontSize: 13 }}>
                      {formatDate(ev.date)}
                    </td>
                    <td style={{ padding: '11px 12px', maxWidth: 240 }}>
                      <div style={{ fontWeight: 500, color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ev.title}
                      </div>
                    </td>
                    <td style={{ padding: '11px 12px', color: '#555', fontSize: 13, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ev.venue || '—'}
                    </td>
                    <td style={{ padding: '11px 12px' }}>
                      <span style={{
                        fontFamily: "'Archivo Narrow', sans-serif",
                        fontSize: 10,
                        textTransform: 'uppercase',
                        letterSpacing: '1.5px',
                        color: cat?.color || '#8A8A8A',
                        fontWeight: 700,
                      }}>
                        {cat?.label || ev.category}
                      </span>
                    </td>
                    <td style={{ padding: '11px 12px', color: '#8A8A8A', fontSize: 12, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {ev.primary_source_name}
                    </td>
                    <td style={{ padding: '11px 12px' }}>
                      <span style={{
                        fontFamily: "'Archivo Narrow', sans-serif",
                        fontSize: 10,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: STATUS_COLORS[ev.status] || '#8A8A8A',
                        fontWeight: 700,
                      }}>
                        {ev.status}
                      </span>
                    </td>
                    <td style={{ padding: '11px 12px' }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'nowrap' }}>
                        {ev.status === 'pending' && (
                          <button
                            onClick={() => handleApprove(ev.id)}
                            style={{
                              fontFamily: "'Archivo Narrow', sans-serif",
                              fontSize: 10,
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              padding: '5px 10px',
                              cursor: 'pointer',
                              background: 'transparent',
                              color: '#2D4DFF',
                              border: '1px solid #2D4DFF',
                              fontWeight: 500,
                              whiteSpace: 'nowrap',
                            }}
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => setEditTarget(ev)}
                          style={{
                            fontFamily: "'Archivo Narrow', sans-serif",
                            fontSize: 10,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            background: 'transparent',
                            color: '#8A8A8A',
                            border: '1px solid #CCC5B8',
                            fontWeight: 500,
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ev.id)}
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
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>
          <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8A8A8A' }}>
            Showing {startRow}-{endRow} of {totalCount}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page <= 1}
              style={{ ...STYLES.cmsCancelBtn, opacity: page <= 1 ? 0.4 : 1, cursor: page <= 1 ? 'default' : 'pointer' }}
            >
              Previous
            </button>
            <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8A8A8A' }}>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              style={{ ...STYLES.cmsCancelBtn, opacity: page >= totalPages ? 0.4 : 1, cursor: page >= totalPages ? 'default' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
        </>
      )}
    </div>
  )
}
