'use client'
import { useState, useEffect } from 'react'

const MAX_BODY = 2000
const PAGE_SIZE = 20

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function buildTree(flat) {
  const map = new Map()
  const roots = []
  flat.forEach(c => map.set(c.id, { ...c, replies: [] }))
  flat.forEach(c => {
    if (c.parent_id && map.has(c.parent_id)) {
      map.get(c.parent_id).replies.push(map.get(c.id))
    } else if (map.has(c.id)) {
      roots.push(map.get(c.id))
    }
  })
  // Top-level: newest first. Replies within threads: oldest first.
  roots.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  function sortReplies(comments) {
    comments.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    comments.forEach(c => { if (c.replies?.length) sortReplies(c.replies) })
  }
  roots.forEach(r => { if (r.replies?.length) sortReplies(r.replies) })
  return roots
}

// ── Shared styles ─────────────────────────────────────────────────────────────

const labelStyle = {
  fontFamily: "'Archivo Narrow', sans-serif",
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '2px',
  color: '#8A8A8A',
  display: 'block',
  marginBottom: 6,
}

// ── CommentForm ───────────────────────────────────────────────────────────────

function CommentForm({ onSubmit, submitting, error, onCancel, compact, loadedAt }) {
  const [name, setName]   = useState('')
  const [body, setBody]   = useState('')
  const [hp,   setHp]     = useState('')   // honeypot

  const inputBase = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: compact ? 13 : 14,
    background: '#F5F1E8',
    border: '1px solid #CCC5B8',
    color: '#111111',
    padding: compact ? '8px 10px' : '10px 12px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
  }

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit({ name, body, honeypot: hp, loadedAt }) }}
      style={{ marginBottom: compact ? 0 : 32 }}
    >
      {/* Honeypot — hidden via CSS, not display:none, so bots see it */}
      <div
        style={{ position: 'absolute', opacity: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}
        aria-hidden="true"
      >
        <input
          type="text"
          name="website"
          value={hp}
          onChange={e => setHp(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={labelStyle}>Name</label>
        <input
          style={inputBase}
          value={name}
          onChange={e => setName(e.target.value.slice(0, 50))}
          placeholder="Your name"
          required
        />
      </div>

      <div style={{ marginBottom: 4 }}>
        <label style={labelStyle}>Comment</label>
        <textarea
          style={{ ...inputBase, minHeight: compact ? 80 : 100, resize: 'vertical', lineHeight: 1.6 }}
          value={body}
          onChange={e => setBody(e.target.value.slice(0, MAX_BODY))}
          placeholder="Share your thoughts…"
          required
        />
        <div style={{
          fontFamily: "'Archivo Narrow', sans-serif",
          fontSize: 11,
          color: body.length > MAX_BODY * 0.9 ? '#E73B2F' : '#8A8A8A',
          textAlign: 'right',
          marginTop: 3,
        }}>
          {MAX_BODY - body.length} / {MAX_BODY}
        </div>
      </div>

      {error && (
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#E73B2F', marginTop: 8, marginBottom: 4 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            fontFamily: "'Archivo Narrow', sans-serif",
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontWeight: 700,
            padding: compact ? '9px 18px' : '11px 22px',
            background: '#E73B2F',
            color: '#FFFFFF',
            border: 'none',
            cursor: submitting ? 'wait' : 'pointer',
            opacity: submitting ? 0.65 : 1,
          }}
        >
          {submitting ? 'Posting…' : 'Post Comment'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              fontFamily: "'Archivo Narrow', sans-serif",
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: '#8A8A8A',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

// ── ReplyButton ───────────────────────────────────────────────────────────────

function ReplyButton({ active, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Archivo Narrow', sans-serif",
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        color: active || hovered ? '#E73B2F' : '#8A8A8A',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: 'color 0.12s',
      }}
    >
      {active ? 'Cancel' : 'Reply'}
    </button>
  )
}

// ── CommentNode ───────────────────────────────────────────────────────────────
// depth 0 = top-level, depth 1 = reply, depth 2 = reply-to-reply (max indent, no Reply button)

function CommentNode({ comment, depth, replyTo, onReply, onSubmitReply, replySubmitting, replyError, replyFormKey, loadedAt }) {
  const isReplying = replyTo === comment.id
  const canReply   = depth < 2

  return (
    <div style={{
      marginLeft: depth > 0 ? 24 : 0,
      borderLeft: depth > 0 ? '2px solid #CCC5B8' : 'none',
      paddingLeft: depth > 0 ? 16 : 0,
    }}>
      {/* Comment body */}
      <div style={{ padding: '14px 0 8px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Archivo Narrow', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#111111',
          }}>
            {comment.author_name}
          </span>
          <span style={{
            fontFamily: "'Archivo Narrow', sans-serif",
            fontSize: 11,
            color: '#8A8A8A',
          }}>
            {timeAgo(comment.created_at)}
          </span>
        </div>

        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 15,
          lineHeight: 1.7,
          color: '#333333',
          margin: '0 0 8px',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}>
          {comment.body}
        </p>

        {canReply && (
          <ReplyButton
            active={isReplying}
            onClick={() => onReply(isReplying ? null : comment.id)}
          />
        )}
      </div>

      {/* Inline reply form */}
      {isReplying && (
        <div style={{ marginBottom: 8 }}>
          <CommentForm
            key={replyFormKey}
            compact
            onSubmit={onSubmitReply}
            submitting={replySubmitting}
            error={replyError}
            onCancel={() => onReply(null)}
            loadedAt={loadedAt}
          />
        </div>
      )}

      {/* Nested replies */}
      {comment.replies?.map(reply => (
        <CommentNode
          key={reply.id}
          comment={reply}
          depth={depth + 1}
          replyTo={replyTo}
          onReply={onReply}
          onSubmitReply={onSubmitReply}
          replySubmitting={replySubmitting}
          replyError={replyError}
          replyFormKey={replyFormKey}
          loadedAt={loadedAt}
        />
      ))}
    </div>
  )
}

// ── CommentsSection (default export) ─────────────────────────────────────────

export default function CommentsSection({ articleId }) {
  const [flatComments,    setFlatComments]    = useState([])
  const [loading,         setLoading]         = useState(true)
  const [fetchError,      setFetchError]      = useState(null)
  const [visible,         setVisible]         = useState(PAGE_SIZE)
  const [replyTo,         setReplyTo]         = useState(null)
  const [mainFormKey,     setMainFormKey]     = useState(0)
  const [replyFormKey,    setReplyFormKey]    = useState(0)
  const [submitting,      setSubmitting]      = useState(false)
  const [replySubmitting, setReplySubmitting] = useState(false)
  const [formError,       setFormError]       = useState(null)
  const [replyError,      setReplyError]      = useState(null)
  const [loadedAt]                            = useState(() => Date.now())

  useEffect(() => {
    fetch(`/api/comments/${articleId}`)
      .then(r => r.json())
      .then(data => { setFlatComments(data.comments || []); setLoading(false) })
      .catch(() => { setFetchError('Could not load comments.'); setLoading(false) })
  }, [articleId])

  const postComment = ({ parentId, name, body, honeypot }) =>
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        article_id:  articleId,
        parent_id:   parentId || null,
        author_name: name,
        body,
        website:     honeypot,
        loadedAt,
      }),
    })

  const handleSubmit = async ({ name, body, honeypot }) => {
    setSubmitting(true)
    setFormError(null)
    const res  = await postComment({ parentId: null, name, body, honeypot })
    const data = await res.json()
    if (!res.ok) { setFormError(data.error || 'Failed to post comment.'); setSubmitting(false); return }
    setFlatComments(prev => [data.comment, ...prev])
    setMainFormKey(k => k + 1)  // resets form
    setSubmitting(false)
  }

  const handleReplySubmit = async ({ name, body, honeypot }) => {
    setReplySubmitting(true)
    setReplyError(null)
    const res  = await postComment({ parentId: replyTo, name, body, honeypot })
    const data = await res.json()
    if (!res.ok) { setReplyError(data.error || 'Failed to post reply.'); setReplySubmitting(false); return }
    setFlatComments(prev => [...prev, data.comment])
    setReplyFormKey(k => k + 1)
    setReplyTo(null)
    setReplySubmitting(false)
  }

  const handleReply = (commentId) => {
    setReplyTo(commentId)
    setReplyError(null)
    if (commentId !== replyTo) setReplyFormKey(k => k + 1)
  }

  const tree            = buildTree(flatComments)
  const topLevelTotal   = tree.length
  const visibleComments = tree.slice(0, visible)

  return (
    <div style={{ maxWidth: 640, marginTop: 64, paddingBottom: 64 }}>

      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <span style={{
          fontFamily: "'Archivo Narrow', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '3px',
          color: '#111111',
          whiteSpace: 'nowrap',
        }}>
          Comments{topLevelTotal > 0 ? ` (${topLevelTotal})` : ''}
        </span>
        <div style={{ flex: 1, height: 1, background: '#CCC5B8' }} />
      </div>

      {/* Comment submission form */}
      <CommentForm
        key={mainFormKey}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={formError}
        loadedAt={loadedAt}
      />

      {/* Comment list */}
      {loading ? (
        <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 12, color: '#8A8A8A', textTransform: 'uppercase', letterSpacing: '2px' }}>
          Loading comments…
        </div>
      ) : fetchError ? (
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#E73B2F' }}>{fetchError}</div>
      ) : topLevelTotal === 0 ? (
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#8A8A8A', lineHeight: 1.7 }}>
          No comments yet. Be the first.
        </div>
      ) : (
        <>
          {visibleComments.map(comment => (
            <div key={comment.id} style={{ borderTop: '1px solid #CCC5B8' }}>
              <CommentNode
                comment={comment}
                depth={0}
                replyTo={replyTo}
                onReply={handleReply}
                onSubmitReply={handleReplySubmit}
                replySubmitting={replySubmitting}
                replyError={replyError}
                replyFormKey={replyFormKey}
                loadedAt={loadedAt}
              />
            </div>
          ))}

          {topLevelTotal > visible && (
            <button
              onClick={() => setVisible(v => v + PAGE_SIZE)}
              style={{
                marginTop: 20,
                fontFamily: "'Archivo Narrow', sans-serif",
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: '#8A8A8A',
                background: 'transparent',
                border: '1px solid #CCC5B8',
                padding: '10px 20px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Load more ({topLevelTotal - visible} remaining)
            </button>
          )}
        </>
      )}
    </div>
  )
}
