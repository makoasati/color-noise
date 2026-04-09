import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/comments/[id] — fetch visible comments for an article
export async function GET(request, { params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('comments')
    .select('id, parent_id, author_name, body, created_at')
    .eq('article_id', id)
    .eq('status', 'visible')
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  return NextResponse.json({ comments: data || [] })
}

async function requireAdmin(supabase) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase
    .from('profiles').select('role').eq('id', user.id).single()
  return profile?.role === 'admin' ? user : null
}

// PATCH /api/comments/[id] — hide or unhide a comment (admin only)
export async function PATCH(request, { params }) {
  const { id } = await params
  const supabase = await createClient()

  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  let body
  try { body = await request.json() } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const { status } = body
  if (!['visible', 'hidden'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('comments').update({ status }).eq('id', id)

  if (error) return NextResponse.json({ error: 'Failed to update comment.' }, { status: 500 })
  return NextResponse.json({ success: true })
}

// DELETE /api/comments/[id] — permanently delete a comment (admin only)
export async function DELETE(request, { params }) {
  const { id } = await params
  const supabase = await createClient()

  const admin = await requireAdmin(supabase)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { error } = await supabase.from('comments').delete().eq('id', id)

  if (error) return NextResponse.json({ error: 'Failed to delete comment.' }, { status: 500 })
  return NextResponse.json({ success: true })
}
