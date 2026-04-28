'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const EVENT_CATS = {
  music:     { color: '#E73B2F', label: 'Heard' },
  art:       { color: '#4A6CF7', label: 'Seen' },
  food:      { color: '#D8A23A', label: 'Savored' },
  nightlife: { color: '#C95C2B', label: 'Around' },
}
const CATEGORY_ORDER = {
  music: 0,
  art: 1,
  food: 2,
  nightlife: 3,
}
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAY_NAMES = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

function buildGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDow = (firstDay.getDay() + 6) % 7
  const days = []
  for (let i = startDow - 1; i >= 0; i--) days.push({ date: new Date(year, month, -i), overflow: true })
  for (let d = 1; d <= lastDay.getDate(); d++) days.push({ date: new Date(year, month, d), overflow: false })
  const rem = (7 - (days.length % 7)) % 7
  for (let i = 1; i <= rem; i++) days.push({ date: new Date(year, month + 1, i), overflow: true })
  return days
}

function toISODate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatFullDate(dateStr) {
  const d = parseLocalDate(dateStr)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return `${days[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

function formatShortDate(dateStr) {
  const d = parseLocalDate(dateStr)
  return `${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`
}

function formatMobileDate(dateStr) {
  const d = parseLocalDate(dateStr)
  const shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${shortDays[d.getDay()]}, ${shortMonths[d.getMonth()]} ${d.getDate()}`
}

function compareEvents(a, b) {
  const categoryDiff = (CATEGORY_ORDER[a.category] ?? 99) - (CATEGORY_ORDER[b.category] ?? 99)
  if (categoryDiff !== 0) return categoryDiff
  const timeA = (a.time || '').toLowerCase()
  const timeB = (b.time || '').toLowerCase()
  if (timeA !== timeB) return timeA.localeCompare(timeB)
  return (a.title || '').localeCompare(b.title || '')
}

function partitionEventsForDate(dateStr, events) {
  const sameDay = []
  const ongoing = []

  for (const ev of events) {
    if (ev.date === dateStr) sameDay.push(ev)
    else ongoing.push(ev)
  }

  sameDay.sort(compareEvents)
  ongoing.sort(compareEvents)

  return { sameDay, ongoing, ordered: [...sameDay, ...ongoing] }
}

function pillBg(hex) {
  return hex + '1f'
}

function CategoryFilters({ activeCategories, onChange }) {
  const items = [
    { key: 'all', label: 'All', color: null },
    ...Object.entries(EVENT_CATS).map(([k, v]) => ({ key: k, label: v.label, color: v.color })),
  ]

  return (
    <div className="cn-cat-filters" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
      {items.map(({ key, label, color }) => {
        const isActive = key === 'all' ? activeCategories.length === 0 : activeCategories.includes(key)
        return (
          <button
            key={key}
            className="cn-cat-filter-item"
            onClick={() => onChange(key)}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#F5F1E8'
              e.currentTarget.style.color = '#111'
              e.currentTarget.style.borderColor = '#F5F1E8'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = isActive ? '#F5F1E8' : 'transparent'
              e.currentTarget.style.color = isActive ? '#111' : '#8A8A8A'
              e.currentTarget.style.borderColor = isActive ? '#F5F1E8' : '#333'
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: color ? 6 : 0,
              fontFamily: "'Archivo Narrow', sans-serif",
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              fontWeight: 600,
              padding: '5px 12px',
              cursor: 'pointer',
              border: `1px solid ${isActive ? '#F5F1E8' : '#333'}`,
              background: isActive ? '#F5F1E8' : 'transparent',
              color: isActive ? '#111' : '#8A8A8A',
              transition: 'all 0.12s',
            }}
          >
            {color && <span style={{ width: 7, height: 7, background: color, display: 'inline-block', flexShrink: 0 }} />}
            {label}
          </button>
        )
      })}
    </div>
  )
}

function EventPill({ event, onClick, compact = false }) {
  const cat = EVENT_CATS[event.category] || { color: '#8A8A8A' }

  return (
    <button
      onClick={onClick}
      title={event.title}
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        background: pillBg(cat.color),
        color: cat.color,
        fontFamily: "'Archivo Narrow', sans-serif",
        fontSize: compact ? 8 : 9,
        fontWeight: 600,
        padding: compact ? '2px 4px' : '3px 6px',
        marginBottom: 2,
        border: 'none',
        cursor: 'pointer',
        borderRadius: 3,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        lineHeight: 1.5,
      }}
    >
      {event.title}
    </button>
  )
}

function CalendarCell({ day, eventsForDay, today, onEventClick, onDayClick, compact = false }) {
  const dateStr = toISODate(day.date)
  const isToday = dateStr === today
  const isPast = !day.overflow && day.date < new Date(today)
  const dateNum = day.date.getDate()
  const { ordered, sameDay } = partitionEventsForDate(dateStr, eventsForDay)
  const visible = ordered.slice(0, 3)
  const overflow = ordered.length - 3

  return (
    <div
      onClick={() => { if (!day.overflow) onDayClick(ordered) }}
      role={day.overflow ? undefined : 'button'}
      tabIndex={day.overflow ? -1 : 0}
      onKeyDown={(e) => {
        if (day.overflow) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onDayClick(ordered)
        }
      }}
      style={{
        minHeight: compact ? 80 : 110,
        padding: compact ? 6 : 8,
        background: day.overflow ? '#1a1a1a' : '#F5F1E8',
        borderRadius: 2,
        borderLeft: isToday && !day.overflow ? '3px solid #E73B2F' : undefined,
        opacity: isPast ? 0.5 : 1,
        position: 'relative',
        overflow: 'hidden',
        cursor: day.overflow ? 'default' : 'pointer',
      }}
    >
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: compact ? 12 : 13,
          fontWeight: isToday ? 700 : 400,
          color: day.overflow ? '#555' : isToday ? '#E73B2F' : '#111',
          marginBottom: 5,
          lineHeight: 1,
        }}
      >
        {dateNum}
      </div>
      {!day.overflow && ordered.length > 0 && sameDay.length === 0 && (
        <div
          style={{
            fontFamily: "'Archivo Narrow', sans-serif",
            fontSize: compact ? 8 : 9,
            color: '#8A8A8A',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: 4,
          }}
        >
          Ongoing
        </div>
      )}
      {visible.map(ev => (
        <div key={ev.id} onClick={e => e.stopPropagation()}>
          <EventPill event={ev} compact={compact} onClick={() => onEventClick(ev)} />
        </div>
      ))}
      {overflow > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onDayClick(ordered)
          }}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Archivo Narrow', sans-serif",
            fontSize: compact ? 8 : 9,
            color: '#8A8A8A',
            padding: compact ? '2px 4px' : '2px 6px',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          +{overflow} more
        </button>
      )}
    </div>
  )
}

function EventModal({ event, onClose }) {
  const cat = EVENT_CATS[event.category] || { color: '#8A8A8A', label: event.category }
  const additionalSources = event.additional_sources || []

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{ padding: '28px 28px 24px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: cat.color + '26',
            color: cat.color,
            fontFamily: "'Archivo Narrow', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '4px 10px',
            borderRadius: 2,
            marginBottom: 14,
          }}
        >
          <span style={{ width: 6, height: 6, background: cat.color, borderRadius: '50%', display: 'inline-block' }} />
          {cat.label}
        </div>

        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: 20,
            color: '#111',
            lineHeight: 1.2,
            margin: '0 0 10px',
          }}
        >
          {event.title}
        </h2>

        <div
          style={{
            fontFamily: "'Archivo Narrow', sans-serif",
            fontSize: 13,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#8A8A8A',
            marginBottom: 10,
          }}
        >
          {formatFullDate(event.date)}{event.time ? ` · ${event.time}` : ''}
          {event.end_date && event.end_date !== event.date ? ` - ${formatFullDate(event.end_date)}` : ''}
        </div>

        {event.venue && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#333', marginBottom: 6 }}>{event.venue}</div>}

        {event.neighborhood && (
          <div style={{ marginBottom: 12 }}>
            <Link
              href={`/?neighborhood=${encodeURIComponent(event.neighborhood.toLowerCase().replace(/\s+/g, '-'))}`}
              style={{
                fontFamily: "'Archivo Narrow', sans-serif",
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: 600,
                padding: '3px 8px',
                border: '1px solid #333',
                color: '#8A8A8A',
                textDecoration: 'none',
                display: 'inline-block',
                lineHeight: 1.4,
              }}
              onClick={onClose}
            >
              {event.neighborhood}
            </Link>
          </div>
        )}

        {event.description && (
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: '#555',
              lineHeight: 1.6,
              margin: '0 0 18px',
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {event.description}
          </p>
        )}

        <a
          href={event.primary_source_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            background: cat.color,
            color: '#fff',
            fontFamily: "'Archivo Narrow', sans-serif",
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: 700,
            padding: '12px 20px',
            textDecoration: 'none',
            marginBottom: additionalSources.length > 0 ? 12 : 0,
          }}
        >
          View on {event.primary_source_name} -&gt;
        </a>

        {additionalSources.length > 0 && (
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#8A8A8A' }}>
            Also listed on:{' '}
            {additionalSources.map((src, i) => (
              <span key={i}>
                {i > 0 && ', '}
                <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ color: '#8A8A8A', textDecoration: 'underline' }}>
                  {src.name}
                </a>
              </span>
            ))}
          </div>
        )}
      </div>
    </ModalOverlay>
  )
}

function DayModal({ date, events, onClose }) {
  const [expanded, setExpanded] = useState(null)
  const { sameDay, ongoing } = partitionEventsForDate(date, events)

  const renderEvents = (items, heading = null) => (
    items.length > 0 && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {heading && (
          <div
            style={{
              fontFamily: "'Archivo Narrow', sans-serif",
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#8A8A8A',
              margin: '8px 0 8px',
            }}
          >
            {heading}
          </div>
        )}
        {items.map(ev => {
          const cat = EVENT_CATS[ev.category] || { color: '#8A8A8A', label: ev.category }
          const isExp = expanded === ev.id
          return (
            <div key={ev.id} style={{ border: '1px solid #E8E4DC', background: '#fff' }}>
              <button
                onClick={() => setExpanded(isExp ? null : ev.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer', padding: '10px 14px' }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: '#111', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {ev.title}
                </span>
                {ev.time && <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>{ev.time}</span>}
              </button>
              {isExp && (
                <div style={{ padding: '0 14px 14px', borderTop: '1px solid #F0EDE6' }}>
                  {ev.date !== date && ev.end_date && (
                    <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 8, marginBottom: 4 }}>
                      Runs {formatShortDate(ev.date)} - {formatShortDate(ev.end_date)}
                    </div>
                  )}
                  {ev.venue && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#555', marginTop: 8, marginBottom: 4 }}>{ev.venue}</div>}
                  {ev.description && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#777', lineHeight: 1.5, marginBottom: 10 }}>{ev.description}</div>}
                  <a
                    href={ev.primary_source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.5px', color: cat.color, textDecoration: 'none', fontWeight: 700 }}
                  >
                    View on {ev.primary_source_name} -&gt;
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  )

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{ padding: '24px 24px 20px' }}>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20, color: '#111', margin: '0 0 20px' }}>
          {formatShortDate(date)}
        </h2>
        {renderEvents(sameDay)}
        {renderEvents(ongoing, 'Ongoing')}
      </div>
    </ModalOverlay>
  )
}

function ModalOverlay({ children, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 8px 40px rgba(0,0,0,0.25)', width: '100%', maxWidth: 420, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 14, right: 14, background: 'transparent', border: 'none', fontSize: 18, color: '#8A8A8A', cursor: 'pointer', lineHeight: 1, padding: '2px 6px', zIndex: 1 }}
          onMouseEnter={e => { e.currentTarget.style.color = '#E73B2F' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#8A8A8A' }}
        >
          x
        </button>
        {children}
      </div>
    </div>
  )
}

function SubmitEventModal({ onClose }) {
  const [form, setForm] = useState({
    title: '',
    date: '',
    time: '',
    venue: '',
    neighborhood: '',
    category: 'music',
    description: '',
    source_url: '',
    website: '',
    loadedAt: Date.now(),
  })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/events/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Submission failed.')
        setSubmitting(false)
        return
      }
      setDone(true)
    } catch {
      setError('Submission failed. Please try again.')
      setSubmitting(false)
    }
  }

  const labelStyle = {
    fontFamily: "'Archivo Narrow', sans-serif",
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#8A8A8A',
    display: 'block',
    marginBottom: 5,
    marginTop: 16,
  }
  const inputStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    background: '#F5F1E8',
    border: '1px solid #CCC5B8',
    color: '#111',
    padding: '9px 11px',
    width: '100%',
    boxSizing: 'border-box',
  }

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{ padding: '28px 28px 24px' }}>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 20, color: '#111', margin: '0 0 6px' }}>
          Submit an Event
        </h2>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#8A8A8A', marginBottom: 18 }}>
          Events are reviewed before appearing on the calendar.
        </div>

        {done ? (
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#333', background: '#F5F1E8', padding: '18px 20px', borderRadius: 4, lineHeight: 1.6 }}>
            Thanks! Your event will be reviewed and added shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="text" name="website" value={form.website} onChange={e => set('website', e.target.value)} style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <label style={labelStyle}>Event Title *</label>
            <input required style={inputStyle} value={form.title} onChange={e => set('title', e.target.value)} maxLength={300} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Date *</label>
                <input type="date" required style={inputStyle} value={form.date} onChange={e => set('date', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Time</label>
                <input style={inputStyle} value={form.time} onChange={e => set('time', e.target.value)} placeholder="e.g. 8:00 PM" />
              </div>
            </div>

            <label style={labelStyle}>Venue</label>
            <input style={inputStyle} value={form.venue} onChange={e => set('venue', e.target.value)} />

            <label style={labelStyle}>Neighborhood</label>
            <input style={inputStyle} value={form.neighborhood} onChange={e => set('neighborhood', e.target.value)} placeholder="e.g. Logan Square" />

            <label style={labelStyle}>Category *</label>
            <select required style={{ ...inputStyle, fontFamily: "'Archivo Narrow', sans-serif" }} value={form.category} onChange={e => set('category', e.target.value)}>
              {Object.entries(EVENT_CATS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>

            <label style={labelStyle}>Description</label>
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: 'vertical', lineHeight: 1.5 }}
              value={form.description}
              onChange={e => set('description', e.target.value)}
              maxLength={500}
              placeholder="Short description (optional)"
            />

            <label style={labelStyle}>Source URL</label>
            <input type="url" style={inputStyle} value={form.source_url} onChange={e => set('source_url', e.target.value)} placeholder="https://..." />

            {error && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#E73B2F', marginTop: 12 }}>{error}</div>}

            <button
              type="submit"
              disabled={submitting}
              style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, padding: '12px 28px', background: '#E73B2F', color: '#fff', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.6 : 1, marginTop: 20, width: '100%' }}
            >
              {submitting ? 'Submitting...' : 'Submit Event'}
            </button>
          </form>
        )}
      </div>
    </ModalOverlay>
  )
}

function MobileListView({ events, activeCategories, onEventClick }) {
  const filtered = events.filter(e => activeCategories.length === 0 || activeCategories.includes(e.category))
  const grouped = {}
  for (const ev of filtered) {
    if (!grouped[ev.date]) grouped[ev.date] = []
    grouped[ev.date].push(ev)
  }
  const sortedDates = Object.keys(grouped).sort()

  if (sortedDates.length === 0) {
    return (
      <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 13, color: '#555', textAlign: 'center', padding: '48px 0', textTransform: 'uppercase', letterSpacing: '2px' }}>
        No events this month.
      </div>
    )
  }

  return (
    <div>
      {sortedDates.map(date => {
        const dayEvents = grouped[date].slice().sort(compareEvents)
        return (
          <div key={date} style={{ marginBottom: 24 }}>
            <div style={{
              fontFamily: "'Archivo Narrow', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#F5F1E8',
              borderBottom: '1px solid #2A2A2A',
              paddingBottom: 8,
              marginBottom: 10,
            }}>
              {formatMobileDate(date)}
            </div>
            {dayEvents.map(ev => {
              const cat = EVENT_CATS[ev.category] || { color: '#8A8A8A' }
              return (
                <button
                  key={ev.id}
                  onClick={() => onEventClick(ev)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    background: '#F5F1E8',
                    border: 'none',
                    borderLeft: `4px solid ${cat.color}`,
                    padding: '10px 12px',
                    marginBottom: 8,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: '#111111',
                    lineHeight: 1.2,
                    marginBottom: ev.time || ev.venue ? 4 : 0,
                  }}>
                    {ev.title}
                  </div>
                  {(ev.time || ev.venue) && (
                    <div style={{
                      fontFamily: "'Archivo Narrow', sans-serif",
                      fontSize: 11,
                      color: '#8A8A8A',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      {ev.time || ''}{ev.time && ev.venue ? ' · ' : ''}{ev.venue || ''}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default function CalendarView({ initialEvents = [], initialYear, initialMonth }) {
  const now = new Date()
  const [year, setYear] = useState(initialYear ?? now.getFullYear())
  const [month, setMonth] = useState(initialMonth ?? now.getMonth())
  const [events, setEvents] = useState(initialEvents)
  const [loading, setLoading] = useState(false)
  const [activeCategories, setActiveCategories] = useState([])
  const [modal, setModal] = useState(null)
  const [showSubmit, setShowSubmit] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(null)

  useEffect(() => {
    const check = () => setViewportWidth(window.innerWidth)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const fetchEvents = useCallback(async (y, m) => {
    setLoading(true)
    try {
      const start = `${y}-${String(m + 1).padStart(2, '0')}-01`
      const lastDate = new Date(y, m + 1, 0).getDate()
      const end = `${y}-${String(m + 1).padStart(2, '0')}-${String(lastDate).padStart(2, '0')}`
      const res = await fetch(`/api/events?start=${start}&end=${end}`)
      if (res.ok) {
        const data = await res.json()
        setEvents(data.events || [])
      }
    } catch (e) {
      console.error('Failed to fetch events', e)
    } finally {
      setLoading(false)
    }
  }, [])

  const changeMonth = (delta) => {
    let ny = year
    let nm = month + delta
    if (nm < 0) { ny -= 1; nm = 11 }
    if (nm > 11) { ny += 1; nm = 0 }
    setYear(ny)
    setMonth(nm)
    fetchEvents(ny, nm)
  }

  const today = toISODate(now)
  const grid = buildGrid(year, month)
  const isListView = viewportWidth !== null && viewportWidth < 768
  const isCompact = viewportWidth !== null && viewportWidth < 768
  const byDate = {}
  const monthStart = new Date(year, month, 1)
  const monthEnd = new Date(year, month + 1, 0)

  for (const ev of events.filter(e => activeCategories.length === 0 || activeCategories.includes(e.category))) {
    const eventStart = parseLocalDate(ev.date)
    const eventEnd = ev.end_date ? parseLocalDate(ev.end_date) : eventStart
    const visibleStart = eventStart > monthStart ? eventStart : monthStart
    const visibleEnd = eventEnd < monthEnd ? eventEnd : monthEnd
    for (let d = visibleStart; d <= visibleEnd; d = addDays(d, 1)) {
      const key = toISODate(d)
      if (!byDate[key]) byDate[key] = []
      byDate[key].push(ev)
    }
  }

  return (
    <div style={{ paddingBottom: 64 }}>
      <CategoryFilters
        activeCategories={activeCategories}
        onChange={key => {
          if (key === 'all') { setActiveCategories([]); return }
          setActiveCategories(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <button
          onClick={() => changeMonth(-1)}
          style={{ background: 'transparent', border: 'none', fontSize: 20, color: '#8A8A8A', cursor: 'pointer', padding: '4px 8px', lineHeight: 1 }}
          onMouseEnter={e => { e.currentTarget.style.color = '#E73B2F' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#8A8A8A' }}
        >
          &lt;-
        </button>
        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 22, color: '#F5F1E8' }}>
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          onClick={() => changeMonth(1)}
          style={{ background: 'transparent', border: 'none', fontSize: 20, color: '#8A8A8A', cursor: 'pointer', padding: '4px 8px', lineHeight: 1 }}
          onMouseEnter={e => { e.currentTarget.style.color = '#E73B2F' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#8A8A8A' }}
        >
          -&gt;
        </button>
        {loading && (
          <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            Loading...
          </span>
        )}
      </div>

      {isListView ? (
        <MobileListView events={events} activeCategories={activeCategories} onEventClick={ev => setModal({ type: 'event', data: ev })} />
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, width: '100%', marginBottom: 3 }}>
            {DAY_NAMES.map(d => (
              <div key={d} style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: isCompact ? 10 : 11, textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8A8A', textAlign: 'center', padding: '6px 0 8px' }}>
                {d}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3, width: '100%' }}>
            {grid.map((day, i) => (
              <CalendarCell
                key={i}
                day={day}
                compact={isCompact}
                eventsForDay={day.overflow ? [] : (byDate[toISODate(day.date)] || [])}
                today={today}
                onEventClick={ev => setModal({ type: 'event', data: ev })}
                onDayClick={evs => setModal({ type: 'day', data: { date: toISODate(day.date), events: evs } })}
              />
            ))}
          </div>
        </>
      )}

      <div style={{ textAlign: 'center', marginTop: 28 }}>
        <button
          onClick={() => setShowSubmit(true)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '2px', color: '#555', textDecoration: 'underline' }}
        >
          Submit an event
        </button>
      </div>

      {modal?.type === 'event' && <EventModal event={modal.data} onClose={() => setModal(null)} />}
      {modal?.type === 'day' && <DayModal date={modal.data.date} events={modal.data.events} onClose={() => setModal(null)} />}
      {showSubmit && <SubmitEventModal onClose={() => setShowSubmit(false)} />}
    </div>
  )
}
