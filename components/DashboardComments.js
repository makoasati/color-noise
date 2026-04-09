'use client'
import { useState, useEffect } from 'react'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit',
  })
}

const btnBase = {
  fontFamily: "'Archivo Narrow', sans-serif",
  fontSize: 10,
  textTransform: 'uppercase',
  letterSpacing: '1px',
  padding: '5px 10px',
  cursor: 'pointer',
  background: 'transparent',
  fontWeight: 500,
  flexShrink: 0,
}

export default function DashboardComments() {
  const [comments, setComments] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    fetch('/api/comments')
      .then(r => r.json())
      .then(data => { setComments(data.comments || []); setLoading(false) })
      .catch(() => { setError('Failed to load comments.'); setLoading(false) })
  }, [])

  const handleToggle = async (id, currentStatus) => {
    const status = currentStatus === 'visible' ? 'hidden' : 'visible'
    const res = await fetch(`/api/comments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) setComments(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comment permanently?')) return
    const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' })
    if (res.ok) setComments(prev => prev.filter(c => c.id !== id))
  }

  const visible = comments.filter(c => c.status === 'visible').length
  const hidden  = comments.length - visible

  return (
    <div style={{ marginTop: 56 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 26, color: '#111111' }}>
          Comments {!loading && `(${comments.length})`}
        </div>
        {!loading && hidden > 0 && (
          <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#8A8A8A' }}>
            {hidden} hidden
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 12, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Loading…
        </div>
      ) : error ? (
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#E73B2F' }}>{error}</div>
      ) : comments.length === 0 ? (
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#8A8A8A' }}>No comments yet.</div>
      ) : (
        <div style={{ border: '1px solid #CCC5B8' }}>
          {comments.map((comment, i) => (
            <div
              key={comment.id}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                padding: '14px 16px',
                borderBottom: i < comments.length - 1 ? '1px solid #E8E4DC' : 'none',
                background: comment.status === 'hidden' ? '#FAF8F4' : '#FFFFFF',
                opacity: comment.status === 'hidden' ? 0.7 : 1,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Meta line */}
                <div style={{
                  fontFamily: "'Archivo Narrow', sans-serif",
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: '#8A8A8A',
                  marginBottom: 4,
                  display: 'flex',
                  gap: 8,
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}>
                  <span style={{ color: '#111111', fontWeight: 700 }}>{comment.author_name}</span>
                  <span>·</span>
                  <span>{comment.articles?.title || '—'}</span>
                  <span>·</span>
                  <span>{formatDate(comment.created_at)}</span>
                  {comment.parent_id && <span style={{ color: '#C95C2B' }}>Reply</span>}
                  {comment.status === 'hidden' && (
                    <span style={{ color: '#E73B2F', fontWeight: 700 }}>Hidden</span>
                  )}
                </div>
                {/* Preview */}
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: '#333333',
                  lineHeight: 1.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {comment.body.length > 120 ? comment.body.slice(0, 120) + '…' : comment.body}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingTop: 2 }}>
                <button
                  onClick={() => handleToggle(comment.id, comment.status)}
                  style={{ ...btnBase, color: '#8A8A8A', border: '1px solid #CCC5B8' }}
                >
                  {comment.status === 'visible' ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => handleDelete(comment.id)}
                  style={{ ...btnBase, color: '#E73B2F', border: '1px solid #E73B2F' }}
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
