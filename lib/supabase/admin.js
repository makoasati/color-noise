import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Server-side admin client that bypasses Row Level Security.
// Only use in trusted server contexts (cron jobs, admin API routes).
// Requires SUPABASE_SERVICE_ROLE_KEY to be set in environment variables.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createSupabaseClient(url, key, {
    auth: { persistSession: false },
  })
}
