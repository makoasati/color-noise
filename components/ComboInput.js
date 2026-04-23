'use client'
import { useState, useRef, useEffect } from 'react'
import { STYLES } from '@/lib/styles'

// Combobox — free-text input with a filtered suggestion dropdown.
// options: string[]
// value / onChange: controlled, same as a plain <input>
export default function ComboInput({ value, onChange, options = [], placeholder, style, inputStyle }) {
  const [open, setOpen]   = useState(false)
  const [active, setActive] = useState(-1) // keyboard-selected index
  const inputRef = useRef(null)
  const listRef  = useRef(null)

  const query    = (value || '').toLowerCase().trim()
  const filtered = query.length === 0
    ? options.slice(0, 10)
    : options.filter(o => o.toLowerCase().includes(query)).slice(0, 10)

  const showList = open && filtered.length > 0

  // Reset active index when filtered list changes
  useEffect(() => { setActive(-1) }, [query])

  const pick = (opt) => {
    onChange(opt)
    setOpen(false)
    setActive(-1)
  }

  const handleKeyDown = (e) => {
    if (!showList) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(a => Math.min(a + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(a => Math.max(a - 1, -1))
    } else if (e.key === 'Enter' && active >= 0) {
      e.preventDefault()
      pick(filtered[active])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div style={{ position: 'relative', ...style }}>
      <input
        ref={inputRef}
        style={{ ...STYLES.cmsInput, ...inputStyle }}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        onChange={e => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={handleKeyDown}
      />
      {showList && (
        <div
          ref={listRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            border: '1px solid #CCC5B8',
            borderTop: 'none',
            zIndex: 200,
            maxHeight: 220,
            overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {filtered.map((opt, i) => (
            <button
              key={opt}
              onMouseDown={() => pick(opt)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: i === active ? '#F5F1E8' : 'transparent',
                border: 'none',
                borderBottom: i < filtered.length - 1 ? '1px solid #F0EDE6' : 'none',
                padding: '9px 12px',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: '#111',
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(-1)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
