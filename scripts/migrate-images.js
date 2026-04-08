// Migrate base64 cover images to Supabase Storage
// Usage: node scripts/migrate-images.js
// Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

try { require('dotenv').config({ path: '.env.local' }) } catch {}

const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function migrate() {
  console.log('\n🖼  Migrating base64 cover images to Supabase Storage\n')

  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, cover_image')
    .not('cover_image', 'is', null)

  if (error) { console.error(error); process.exit(1) }

  const base64Articles = articles.filter(a => a.cover_image?.startsWith('data:'))
  console.log(`Found ${base64Articles.length} articles with base64 cover images\n`)

  for (const article of base64Articles) {
    process.stdout.write(`  ${article.title.slice(0, 50)}… `)

    // Parse base64 data URL
    const match = article.cover_image.match(/^data:([^;]+);base64,(.+)$/)
    if (!match) { console.log('✗ invalid data URL'); continue }

    const [, mimeType, b64] = match
    const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg'
    const buffer = Buffer.from(b64, 'base64')
    const path = `covers/migrated-${article.id}.${ext}`

    // Upload to storage
    const { error: uploadErr } = await supabase.storage
      .from('article-images')
      .upload(path, buffer, { contentType: mimeType, upsert: true })

    if (uploadErr) { console.log(`✗ upload: ${uploadErr.message}`); continue }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('article-images')
      .getPublicUrl(path)

    // Update article record
    const { error: updateErr } = await supabase
      .from('articles')
      .update({ cover_image: publicUrl })
      .eq('id', article.id)

    if (updateErr) { console.log(`✗ update: ${updateErr.message}`); continue }

    console.log('✓')
  }

  console.log('\n✅ Migration complete\n')
}

migrate().catch(err => { console.error(err); process.exit(1) })
