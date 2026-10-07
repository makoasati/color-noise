'use client'
import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getClipboardImage } from '@/components/RichTextEditor'
import { STYLES } from '@/lib/styles'
import { slugify } from '@/lib/utils'

// Saves as covers/<article-slug>-cover.<ext>, then -cover-2, -cover-3… if the name is taken
async function uploadToStorage(file, articleSlug) {
  const supabase = createClient()
  const ext = (file.name && file.name.includes('.') ? file.name.split('.').pop() : file.type.split('/')[1]) || 'png'
  const base = `${articleSlug || 'untitled'}-cover`
  for (let n = 1; n <= 50; n++) {
    const path = `covers/${n === 1 ? base : `${base}-${n}`}.${ext.toLowerCase()}`
    const { error } = await supabase.storage.from('article-images').upload(path, file, { upsert: false })
    if (error) {
      if (String(error.statusCode) === '409' || /already exists/i.test(error.message || '')) continue
      throw error
    }
    return supabase.storage.from('article-images').getPublicUrl(path).data.publicUrl
  }
  throw new Error('No free image name')
}

export default function CoverImageField({ value, onChange, articleTitle = '' }) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) return
    setUploading(true)
    setUploadError(null)
    try {
      const url = await uploadToStorage(file, slugify(articleTitle))
      onChange(url)
    } catch (err) {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  // Paste an image from the clipboard when no cover is set (ignored while typing in a field/editor)
  const handleFileRef = useRef(null)
  handleFileRef.current = handleFile
  const hasValue = !!value
  useEffect(() => {
    if (hasValue) return
    const onPaste = (e) => {
      const el = e.target
      if (el?.closest?.('input, textarea, [contenteditable="true"]')) return
      const file = getClipboardImage(e)
      if (!file) return
      e.preventDefault()
      handleFileRef.current(file)
    }
    document.addEventListener('paste', onPaste)
    return () => document.removeEventListener('paste', onPaste)
  }, [hasValue])

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
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
          style={{ border: `2px dashed ${dragging ? '#E73B2F' : '#CCC5B8'}`, padding: '40px 24px', textAlign: 'center', cursor: uploading ? 'wait' : 'pointer', background: dragging ? '#fff5f4' : '#F5F1E8', transition: 'all 0.15s' }}
        >
          <div style={{ fontSize: 24, color: '#CCC5B8', marginBottom: 8 }}>⊞</div>
          <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 12, textTransform: 'uppercase', letterSpacing: '2px', color: '#8A8A8A' }}>
            {uploading ? 'Uploading…' : 'Add cover image'}
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#CCC5B8', marginTop: 4 }}>Drop, paste (Ctrl+V), or click to browse · JPG, PNG, WebP</div>
        </div>
      )}
      <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" style={{ display: 'none' }} onChange={(e) => handleFile(e.target.files[0])} />
      {uploadError && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#E73B2F', marginTop: 8 }}>{uploadError}</div>}
    </div>
  )
}
