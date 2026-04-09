import { NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { createClient } from '@/lib/supabase/server'
import { containsProfanity } from '@/lib/profanity'

function stripHtml(str) {
  return String(str).replace(/<[^>]*>/g, '')
}

function getIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'
  )
}

// GET /api/comments — returns all comments across articles (admin only)
export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { data, error } = await supabase
    .from('comments')
    .select('id, article_id, parent_id, author_name, body, status, created_at, articles(title, slug)')
    .order('created_at', { ascending: false })
    .limit(500)

  if (error) return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  return NextResponse.json({ comments: data || [] })
}

// POST /api/comments — create a new comment (public, rate limited)
export async function POST(request) {
  let body
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // ── Bot protection: honeypot ──────────────────────────────────
  if (body.website) {
    // Silently accept — bots shouldn't know they were blocked
    return NextResponse.json({ comment: { id: 'bot' } })
  }

  // ── Bot protection: minimum time (3s) ────────────────────────
  const loadedAt = Number(body.loadedAt)
  if (!loadedAt || Date.now() - loadedAt < 3000) {
    return NextResponse.json({ error: 'Please take a moment before submitting.' }, { status: 429 })
  }

  // ── Sanitize & validate ───────────────────────────────────────
  const authorName = stripHtml(body.author_name || '').trim()
  const commentBody = stripHtml(body.body || '').trim()
  const articleId   = body.article_id || null
  const parentId    = body.parent_id  || null

  if (!articleId) {
    return NextResponse.json({ error: 'Missing article.' }, { status: 400 })
  }
  if (!authorName || authorName.length < 2) {
    return NextResponse.json({ error: 'Name must be at least 2 characters.' }, { status: 400 })
  }
  if (authorName.length > 50) {
    return NextResponse.json({ error: 'Name is too long.' }, { status: 400 })
  }
  if (!commentBody || commentBody.length < 2) {
    return NextResponse.json({ error: 'Comment is too short.' }, { status: 400 })
  }
  if (commentBody.length > 2000) {
    return NextResponse.json({ error: 'Comment is too long.' }, { status: 400 })
  }
  // Reject all-whitespace or repeated-character spam
  if (/^(.)\1{9,}$/.test(commentBody.replace(/\s/g, ''))) {
    return NextResponse.json({ error: 'Comment appears to be spam.' }, { status: 400 })
  }

  // ── Content filter ────────────────────────────────────────────
  if (containsProfanity(authorName) || containsProfanity(commentBody)) {
    return NextResponse.json(
      { error: "Your comment couldn't be posted. Please review your language." },
      { status: 400 }
    )
  }

  // ── Rate limiting ─────────────────────────────────────────────
  const ip     = getIp(request)
  const ipHash = createHash('sha256').update(ip).digest('hex')
  const supabase = await createClient()

  const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()
  const { count: recentCount } = await supabase
    .from('comments')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', tenMinAgo)

  if ((recentCount ?? 0) >= 3) {
    return NextResponse.json(
      { error: "You're posting too quickly. Please wait a few minutes." },
      { status: 429 }
    )
  }

  const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
  const { count: hourCount } = await supabase
    .from('comments')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', hourAgo)

  if ((hourCount ?? 0) >= 10) {
    return NextResponse.json(
      { error: "You've reached the comment limit for this hour. Try again later." },
      { status: 429 }
    )
  }

  // ── Insert ────────────────────────────────────────────────────
  const { data, error } = await supabase
    .from('comments')
    .insert({
      article_id:  articleId,
      parent_id:   parentId,
      author_name: authorName,
      body:        commentBody,
      ip_hash:     ipHash,
      status:      'visible',
    })
    .select('id, parent_id, author_name, body, status, created_at')
    .single()

  if (error) return NextResponse.json({ error: 'Failed to post comment.' }, { status: 500 })
  return NextResponse.json({ comment: data }, { status: 201 })
}
