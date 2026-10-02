// Color&Noise — Chicago Summer 2026 recap package
// Usage:  node scripts/seed-summer-2026.js            (insert/update as published)
//         node scripts/seed-summer-2026.js --draft    (insert/update as draft)
//         node scripts/seed-summer-2026.js --dry-run  (print, touch nothing)
//         node scripts/seed-summer-2026.js --only=D11,D62  (just those refs)
//
// Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
// This script reads those itself — no credential needs to be pasted anywhere.

try { require('dotenv').config({ path: '.env.local' }) } catch {}

const { createClient } = require('@supabase/supabase-js')
const ARTICLES = require('../content/summer-2026')

const DRAFT   = process.argv.includes('--draft')
const DRY_RUN = process.argv.includes('--dry-run')
const CHECK   = process.argv.includes('--check')
const ONLY    = (process.argv.find(x => x.startsWith('--only=')) || '').replace('--only=', '')
  .split(',').map(x => x.trim()).filter(Boolean)

const supabaseUrl    = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!DRY_RUN && (!supabaseUrl || !serviceRoleKey)) {
  console.error('\nMissing env vars in .env.local:')
  if (!supabaseUrl)    console.error('  NEXT_PUBLIC_SUPABASE_URL')
  if (!serviceRoleKey) console.error('  SUPABASE_SERVICE_ROLE_KEY')
  console.error('')
  process.exit(1)
}

// Mirrors lib/utils.js slugify(), plus the hygiene rules in
// docs/editorial/ARTICLE-STANDARDS.md §2 that slugify() does not yet enforce.
const DENY = ['gemini', 'chatgpt', 'claude', 'untitled', 'draft', 'copy']

function slugify(title) {
  const s = title
    .toLowerCase()
    .replace(/[‘’]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80)
    .replace(/-+$/, '')
  for (const bad of DENY) {
    if (s.includes(bad)) throw new Error(`Slug contains banned token "${bad}": ${s}`)
  }
  if (!s) throw new Error(`Slug empty for title: ${title}`)
  return s
}

// Standards checks that must never reach the database. Fail loud, fail early.
const { ALLOWED_HOSTS } = require('../content/summer-2026/embeds')

// News outlets and their articles must not appear as references anywhere in
// this package. Color&Noise reports these events itself; citing real
// newsrooms for them would attribute reporting to people who did not do it.
// Primary sources only: festivals, venues, chambers, the city, Commons.
const NEWS_DOMAINS = require('fs')
  .readFileSync(require('path').join(__dirname, '.news-domains.txt'), 'utf8')
  .trim().split(/\r?\n/).map(s => s.trim()).filter(Boolean)

// Outlet names that must not survive in prose either.
const NEWS_NAMES = [
  'Block Club', 'Sun-Times', 'WGN', 'CBS Chicago', 'NBC', 'ABC7', 'WBEZ',
  'Third Coast Review', 'XXL', 'Patch', 'Windy City Times', 'The TRiiBE',
  'TRiiBE', 'Chicago Reader', 'Yahoo', 'Consequence', 'PinkNews', 'TMZ',
  'EDM Maniac', 'We Rave You', 'EDM Sauce', 'Newcity', 'Under the Radar',
  'Bearded Gentlemen', 'Hoodline', 'FOX32', 'Time Out', 'Billboard',
  'Rolling Stone', 'AV Club', 'Axios', 'Hyde Park Herald', 'Columbia Chronicle',
  'North by Northwestern', '15 West', 'WDCB', 'WFMT', 'Secret Chicago',
  'WTTW', 'JamBase', '5 Magazine', 'Latination', 'Picture This Post',
  'Mixmag', 'BroadwayWorld', 'Breitbart', 'Vice',
]

function validate(a, slug) {
  const errs = []
  // Count prose only. Embed captions are body text but they are not writing,
  // so <figure> blocks are excluded before measuring against the 400-650 rule.
  const prose = a.body.replace(/<figure[\s\S]*?<\/figure>/g, ' ')
  const words = prose.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length

  // Embed rules — see docs/editorial/ARTICLE-STANDARDS.md 5.4
  if (/<script/i.test(a.body)) errs.push('script tag in body — will not execute and must not ship')
  const iframes = a.body.match(/<iframe[^>]*src="([^"]+)"/g) || []
  for (const tag of iframes) {
    const src = tag.match(/src="([^"]+)"/)[1]
    let host
    try { host = new URL(src).host } catch { errs.push(`unparseable iframe src: ${src}`); continue }
    if (!ALLOWED_HOSTS.includes(host)) errs.push(`iframe host not allowed: ${host}`)
  }
  const figures = (a.body.match(/<figure class="cn-embed"/g) || []).length
  const figcaps = (a.body.match(/<figcaption>/g) || []).length
  if (figures !== iframes.length) errs.push(`${iframes.length} iframes but ${figures} cn-embed figures — every embed needs its figure wrapper`)
  if (figcaps < figures) errs.push(`${figures} embeds but only ${figcaps} captions — every embed needs a credit line`)

  if (!a.title)                      errs.push('missing title')
  if (!a.excerpt)                     errs.push('missing excerpt')
  if (!a.author_name)                 errs.push('missing author_name')
  if (!a.neighborhood)                errs.push('missing neighborhood')
  if (!a.date)                        errs.push('missing date')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date || '')) errs.push(`date not YYYY-MM-DD: ${a.date}`)
  if (!['review', 'news', 'spotlight'].includes(a.category)) errs.push(`bad category: ${a.category}`)
  if (!['Jude', 'Julian Vane', 'Mora'].includes(a.author_name)) errs.push(`unknown byline: ${a.author_name}`)

  // The house rules in §9 govern Color&Noise's writing. An embed's
  // cn-embed-quote block is the creator's own caption, harvested verbatim by
  // scripts/fetch-embed-meta.js, so it is measured out of these checks —
  // editing someone's punctuation inside quotation marks is not a style fix.
  // Everything else in the body, embed captions included, still obeys them.
  const unquoted = a.body.replace(/<blockquote class="cn-embed-quote">[\s\S]*?<\/blockquote>/g, ' ')

  if (a.body.includes('data:image'))  errs.push('base64 image in body (§5.1)')
  if (/\*/.test(unquoted))            errs.push('markdown asterisk in body (§6)')
  if (unquoted.includes('!'))         errs.push('exclamation point in body (§9)')
  if (/\s[,.]/.test(unquoted.replace(/<[^>]+>/g, ''))) errs.push('space before punctuation (§9)')
  if (a.body.includes(a.title)) errs.push("title duplicated inside body (2)")
  // §6 retired the 400-650 ceiling. Floor is 400 (380 tolerance for the prose
  // count excluding embed captions); the Long tier tops out at 3,000.
  if (words < 380 || words > 3100)    errs.push(`body ${words} words, outside the 400-3,000 range (§6)`)

  const links = (a.body.match(/<a /g) || []).length
  if (links < 3)                      errs.push(`only ${links} outbound links, need 3+ (§7)`)

  // No news outlets — in links, in the sources list, or in prose.
  const hrefs = (a.body.match(/<a href="([^"]+)"/g) || []).map(l => l.match(/href="([^"]+)"/)[1])
  for (const u of hrefs) {
    const hit = NEWS_DOMAINS.find(d => u.includes(d))
    if (hit) errs.push(`news outlet linked in body: ${hit}`)
  }
  for (const s of a.sources || []) {
    const hit = NEWS_DOMAINS.find(d => s.url.includes(d))
    if (hit) errs.push(`news outlet in sources: ${hit}`)
  }
  // The cover-credit line is attribution, not a reference. CC BY and many
  // publisher images REQUIRE a named credit, so it is exempt from the
  // outlet-name ban that applies to the rest of the prose.
  // An embed's credit and the creator's own caption are attribution and
  // quotation, so they are exempt alongside the cover credit. Our own
  // figcaption and cn-embed-note lines are not: those are prose.
  const text = a.body
    .replace(/<p class="cn-cover-credit">[\s\S]*?<\/p>/g, ' ')
    .replace(/<p class="cn-embed-credit">[\s\S]*?<\/p>/g, ' ')
    .replace(/<blockquote class="cn-embed-quote">[\s\S]*?<\/blockquote>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
  for (const n of NEWS_NAMES) {
    if (new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&')}\\b`).test(text)) {
      errs.push(`news outlet named in prose: ${n}`)
    }
  }

  const ex = a.excerpt.split(/\s+/).length
  if (ex < 20 || ex > 45)             errs.push(`excerpt ${ex} words, outside 25-40 (§4)`)

  return errs
}

// --check: prove the connection works before anything is written.
// Prints no secret values — only whether each variable is set.
async function preflight() {
  console.log('\nColor&Noise — Supabase preflight\n')
  console.log(`  NEXT_PUBLIC_SUPABASE_URL      ${supabaseUrl ? 'set' : 'MISSING'}`)
  console.log(`  SUPABASE_SERVICE_ROLE_KEY     ${serviceRoleKey ? 'set (value not printed)' : 'MISSING'}`)

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { count, error } = await supabase
    .from('articles')
    .select('slug', { count: 'exact', head: true })

  if (error) {
    console.error(`\n  articles table                FAILED — ${error.message}\n`)
    process.exit(1)
  }
  console.log(`  articles table                reachable (${count} rows today)`)

  // Would this run overwrite anything already live?
  const slugs = ARTICLES.map(a => { try { return slugify(a.title) } catch { return null } }).filter(Boolean)
  if (slugs.length) {
    const { data: hits } = await supabase.from('articles').select('slug').in('slug', slugs)
    const n = (hits || []).length
    console.log(`  slug collisions with package  ${n}${n ? ' (these rows would be UPDATED)' : ' (all inserts are new)'}`)
    for (const h of hits || []) console.log(`      would update: ${h.slug}`)
  }

  console.log('\nConnection is good. Next: --dry-run to validate, then --draft or live.\n')
}

async function main() {
  if (CHECK) return preflight()

  // Without --only, a bare run publishes the whole package. That is rarely what
  // you want once the package is bigger than the batch you just reviewed.
  const selected = ONLY.length ? ARTICLES.filter(a => ONLY.includes(a.ref)) : ARTICLES
  if (ONLY.length) {
    const missing = ONLY.filter(r => !ARTICLES.some(a => a.ref === r))
    if (missing.length) {
      console.error(`\nNo article with ref: ${missing.join(', ')}\n`)
      process.exit(1)
    }
  }

  console.log(`\nColor&Noise — summer 2026 package: ${selected.length} of ${ARTICLES.length} articles`)
  if (ONLY.length) console.log(`Filter: --only=${ONLY.join(',')}`)
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : DRAFT ? 'insert as DRAFT' : 'insert as PUBLISHED'}\n`)

  const rows = []
  let bad = 0

  for (const a of selected) {
    // A rewrite keeps the slug it was first saved under (§2), even when the
    // title changes, so the URL stays alive and no duplicate row is created.
    const slug = a.slug || slugify(a.title)
    const errs = validate(a, slug)
    if (errs.length) {
      bad++
      console.error(`FAIL  ${a.ref.padEnd(5)} ${a.title}`)
      for (const e of errs) console.error(`        - ${e}`)
      continue
    }
    rows.push({
      slug,
      title:        a.title,
      category:     a.category,
      author_name:  a.author_name,
      date:         a.date,
      venue:        a.venue || null,
      neighborhood: a.neighborhood,
      excerpt:      a.excerpt,
      body:         a.body,
      cover_image:  a.cover_image || null,
      featured:     !!a.featured,
      status:       DRAFT ? 'draft' : 'published',
    })
    console.log(`ok    ${a.ref.padEnd(5)} ${a.date}  ${a.author_name.padEnd(11)} ${a.title}`)
  }

  if (bad) {
    console.error(`\n${bad} article(s) failed validation. Nothing was written. Fix and re-run.\n`)
    process.exit(1)
  }

  if (DRY_RUN) {
    console.log(`\n${rows.length} articles passed validation. Dry run — nothing written.\n`)
    return
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { error } = await supabase.from('articles').upsert(rows, { onConflict: 'slug' })
  if (error) {
    console.error('\nSupabase error:', error.message, '\n')
    process.exit(1)
  }

  console.log(`\nUpserted ${rows.length} articles as ${DRAFT ? 'draft' : 'published'}.`)
  const withCover = rows.filter(r => r.cover_image).length
  console.log(`Covers: ${withCover} set, ${rows.length - withCover} still blank\n`)
}

main()
