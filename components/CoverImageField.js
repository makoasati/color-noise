'use client'
import { useState, useRef } from 'react'
import { STYLES } from '@/lib/styles'

export default function CoverImageField({ value, onChange }) {
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (e) => onChange(e.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ marginTop: 20 }}>
      <label style={STYLES.cmsLabel}>Cover Image</label>
      {value ? (
        <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
          <img
            src={value}
            alt="Cover"
            style={{ width: '100%', maxHeight: 260, objectFit: 'cover', display: 'block', borderRadius: 3, border: '1px solid #CCC5B8' }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{ position: 'absolute', top: 10, right: 10, fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.5px', padding: '5px 12px', cursor: 'pointer', background: 'rgba(0,0,0,0.7)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', fontWeight: 600 }}
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
          style={{ border: `2px dashed ${dragging ? '#E73B2F' : '#CCC5B8'}`, padding: '40px 24px', textAlign: 'center', cursor: 'pointer', background: dragging ? '#fff5f4' : '#F5F1E8', transition: 'all 0.15s' }}
        >
          <div style={{ fontSize: 24, color: '#CCC5B8', marginBottom: 8 }}>⊞</div>
          <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 12, textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8A8A' }}>Add cover image</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#CCC5B8', marginTop: 4 }}>Drop here or click to browse · JPG, PNG, WebP</div>
        </div>
      )}
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" style={{ display: 'none' }} onChange={(e) => handleFile(e.target.files[0])} />
    </div>
  )
}
