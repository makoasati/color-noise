'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { STYLES, CATEGORY_LABELS, CATEGORY_COLOR } from '@/lib/styles'

export default function DashboardArticleList({ articles: initial }) {
  const [articles, setArticles] = useState(initial)

  const handleDelete = async (id) => {
    if (!confirm('Delete this article? This cannot be undone.')) return
    const supabase = createClient()
    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (!error) setArticles(prev => prev.filter(a => a.id !== id))
  }

  const handleToggleStatus = async (article) => {
    const newStatus = article.status === 'published' ? 'draft' : 'published'
    const supabase = createClient()
    const { error } = await supabase
      .from('articles')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', article.id)
    if (!error) {
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, status: newStatus } : a))
    }
  }

  if (articles.length === 0) {
    return (
      <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 14, color: '#8A8A8A', textAlign: 'center', padding: '80px 0', textTransform: 'uppercase', letterSpacing: '2px' }}>
        No articles yet. Create your first one.
      </div>
    )
  }

  return (
    <div>
      {articles.map(a => (
        <div
          key={a.id}
          style={{ display: 'flex', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #CCC5B8', gap: 12 }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 10, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, color: CATEGORY_COLOR[a.category] || '#8A8A8A', marginRight: 10 }}>
              {CATEGORY_LABELS[a.category]}
            </span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#111111', fontWeight: 500 }}>
              {a.title}
            </span>
            <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, color: '#8A8A8A', marginLeft: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {a.date}
            </span>
            {a.author_name && (
              <span style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, color: '#AAAAAA', marginLeft: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {a.author_name}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span
              onClick={() => handleToggleStatus(a)}
              style={{
                fontFamily: "'Archivo Narrow', sans-serif",
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                padding: '3px 8px',
                border: `1px solid ${a.status === 'published' ? '#2D4DFF' : '#CCC5B8'}`,
                color: a.status === 'published' ? '#2D4DFF' : '#8A8A8A',
                cursor: 'pointer',
                userSelect: 'none',
              }}
              title="Click to toggle draft/published"
            >
              {a.status}
            </span>
            <Link
              href={`/dashboard/edit/${a.id}`}
              style={{ ...STYLES.cmsCancelBtn, padding: '4px 14px', fontSize: 11, letterSpacing: '1.5px', textDecoration: 'none', display: 'inline-block' }}
            >
              Edit
            </Link>
            <button
              style={{ ...STYLES.cmsDeleteBtn, marginLeft: 0 }}
              onClick={() => handleDelete(a.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
