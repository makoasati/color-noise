'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import CoverImageField from './CoverImageField'
import { slugify, legacyBodyToHtml } from '@/lib/utils'
import { STYLES, CATEGORIES, CATEGORY_LABELS } from '@/lib/styles'

const RichTextEditor = dynamic(() => import('./RichTextEditor'), { ssr: false })

export default function ArticleEditor({ article, userId, authorName }) {
  const router = useRouter()
  const isEdit = !!article

  const [form, setForm] = useState({
    title:         article?.title || '',
    category:      article?.category || 'review',
    author_name:   article?.author_name || authorName || '',
    date:          article?.date || new Date().toISOString().slice(0, 10),
    venue:         article?.venue || '',
    neighborhood:  article?.neighborhood || '',
    excerpt:       article?.excerpt || '',
    body:          article ? legacyBodyToHtml(article.body || '') : '',
    cover_image:   article?.cover_image || '',
    featured:      article?.featured || false,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleSave = async (status) => {
    if (!form.title.trim() || !form.excerpt.trim()) {
      setError('Title and excerpt are required.')
      return
    }
    setSaving(true)
    setError(null)

    const supabase = createClient()
    const payload = {
      title:        form.title,
      category:     form.category,
      author_name:  form.author_name,
      date:         form.date,
      venue:        form.venue || null,
      neighborhood: form.neighborhood || null,
      excerpt:      form.excerpt,
      body:         form.body,
      cover_image:  form.cover_image || null,
      featured:     form.featured,
      status,
      updated_at:   new Date().toISOString(),
    }

    let err
    if (isEdit) {
      const { error: e } = await supabase.from('articles').update(payload).eq('id', article.id)
      err = e
    } else {
      const baseSlug = slugify(form.title)
      const slug = baseSlug ? `${baseSlug}-${Date.now().toString(36)}` : Date.now().toString(36)
      const { error: e } = await supabase.from('articles').insert({ ...payload, slug, author_id: userId })
      err = e
    }

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const setField = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  return (
    <div style={{ padding: '28px 0' }}>
      <div style={STYLES.cmsForm}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 22, color: '#E73B2F', marginBottom: 20 }}>
          {isEdit ? 'Edit Article' : 'New Article'}
        </div>

        <CoverImageField
          value={form.cover_image}
          onChange={(val) => setForm(f => ({ ...f, cover_image: val }))}
        />

        <label style={STYLES.cmsLabel}>Title</label>
        <input style={STYLES.cmsInput} value={form.title} onChange={setField('title')} placeholder="Article title" />

        <label style={STYLES.cmsLabel}>Category</label>
        <select style={STYLES.cmsSelect} value={form.category} onChange={setField('category')}>
          {CATEGORIES.map(c => <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 20, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={form.featured}
            onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
            style={{ width: 16, height: 16, accentColor: '#E73B2F', cursor: 'pointer' }}
          />
          <span style={{ ...STYLES.cmsLabel, margin: 0 }}>Feature on homepage</span>
        </label>

        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={STYLES.cmsLabel}>Author</label>
            <input style={STYLES.cmsInput} value={form.author_name} onChange={setField('author_name')} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={STYLES.cmsLabel}>Date</label>
            <input style={STYLES.cmsInput} type="date" value={form.date} onChange={setField('date')} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={STYLES.cmsLabel}>Venue (optional)</label>
            <input style={STYLES.cmsInput} value={form.venue} onChange={setField('venue')} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={STYLES.cmsLabel}>Neighborhood</label>
            <input style={STYLES.cmsInput} value={form.neighborhood} onChange={setField('neighborhood')} />
          </div>
        </div>

        <label style={STYLES.cmsLabel}>Excerpt / Lede</label>
        <textarea
          style={{ ...STYLES.cmsTextarea, minHeight: 80 }}
          value={form.excerpt}
          onChange={setField('excerpt')}
        />
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#8A8A8A', marginTop: 4 }}>
          Short preview text shown on the homepage
        </div>

        <label style={{ ...STYLES.cmsLabel, marginTop: 28 }}>Body</label>
        <RichTextEditor
          key={article?.id || 'new'}
          value={form.body}
          onChange={(html) => setForm(f => ({ ...f, body: html }))}
        />

        {error && (
          <div style={{ color: '#E73B2F', fontFamily: "'DM Sans', sans-serif", fontSize: 14, marginTop: 16 }}>
            {error}
          </div>
        )}

        <div style={STYLES.cmsActions}>
          <button
            style={{ ...STYLES.cmsSaveBtn, opacity: saving ? 0.6 : 1, cursor: saving ? 'wait' : 'pointer' }}
            onClick={() => handleSave('published')}
            disabled={saving}
          >
            {saving ? 'Saving…' : 'Publish'}
          </button>
          <button
            style={{ ...STYLES.cmsCancelBtn, opacity: saving ? 0.6 : 1, cursor: saving ? 'wait' : 'pointer' }}
            onClick={() => handleSave('draft')}
            disabled={saving}
          >
            Save Draft
          </button>
          <button
            style={STYLES.cmsCancelBtn}
            onClick={() => router.push('/dashboard')}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
