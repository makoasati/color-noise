// Color&Noise seed script
// Usage: node scripts/seed.js
// Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY

try { require('dotenv').config({ path: '.env.local' }) } catch {}

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('\nMissing env vars. Add to .env.local:\n  NEXT_PUBLIC_SUPABASE_URL=...\n  SUPABASE_SERVICE_ROLE_KEY=...\n')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().substring(0, 80)
}

function bodyToHtml(text) {
  if (!text || text.startsWith('<')) return text
  return text.split(/\n\n+/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('')
}

const USERS = [
  { email: 'admin@colornoise.local',   password: 'admin123',   username: 'admin',   role: 'admin' },
  { email: 'writer1@colornoise.local', password: 'writer123',  username: 'writer1', role: 'writer' },
]

const SAMPLE_ARTICLES = [
  {
    title: 'Osees Turned the Empty Bottle Inside Out',
    category: 'review',
    author_email: 'admin@colornoise.local',
    author_name: 'M. Kvlashvili',
    date: '2026-03-18',
    venue: 'Empty Bottle',
    neighborhood: 'Ukrainian Village',
    excerpt: "Thee Oh Sees — or whatever John Dwyer is calling them this week — brought a double-drummer assault that literally shook plaster off the ceiling. The pit opened up before the first chord even finished ringing.",
    body: "Thee Oh Sees — or whatever John Dwyer is calling them this week — brought a double-drummer assault that literally shook plaster off the ceiling. The pit opened up before the first chord even finished ringing.\n\nThe setlist leaned heavy on Protean Threat and Face Stabber material, which meant long, krautrock-influenced jams that turned the crowd into one heaving organism. Dwyer's guitar tone was absolutely disgusting in the best way — fuzzed out beyond recognition, feeding back into the monitors until the sound guy just gave up and let it ride.\n\nOpener Friko proved they belong on every bill in this city. Their angular post-punk has gotten tighter since the last time I caught them at Schubas, and the new material hints at something bigger coming.\n\nVerdict: If you missed this one, I genuinely feel sorry for you.",
  },
  {
    title: "Chicago's DIY Print Scene Is Having a Moment",
    category: 'news',
    author_email: 'writer1@colornoise.local',
    author_name: 'R. Santos',
    date: '2026-03-15',
    venue: null,
    neighborhood: 'Pilsen',
    excerpt: "Between Sector 2337's latest residency program and the explosion of risograph zines coming out of Pilsen, Chicago's independent print community is thriving in ways that feel genuinely unprecedented.",
    body: "Between Sector 2337's latest residency program and the explosion of risograph zines coming out of Pilsen, Chicago's independent print community is thriving in ways that feel genuinely unprecedented.\n\nThe catalyst seems to be a combination of cheap rent (by coastal standards), a deep tradition of community organizing through print, and a new generation of artists who see physical media as radical in itself.\n\nSpaces like Spudnik Press, Hoofprint Workshop, and the newly opened Tinta Collective are running at full capacity. Wait lists for press time are months long.\n\nThis isn't a trend. It's an ecosystem.",
  },
  {
    title: 'Venue Spotlight: The Hideout',
    category: 'spotlight',
    author_email: 'admin@colornoise.local',
    author_name: 'M. Kvlashvili',
    date: '2026-03-10',
    venue: 'The Hideout',
    neighborhood: 'Bucktown',
    excerpt: "Tucked behind an industrial stretch off Wabansia, The Hideout has been Chicago's best-kept open secret for three decades. We talked to the people who keep it alive.",
    body: "Tucked behind an industrial stretch off Wabansia, The Hideout has been Chicago's best-kept open secret for three decades. We talked to the people who keep it alive.\n\nThe Hideout doesn't try to be cool. It just is. The wood-paneled walls are covered in decades of stickers and handbills. The sound system is modest but perfectly tuned to the room.\n\nCo-owner Tim Tuten puts it simply: 'We book what we'd want to see. That's it. That's the whole philosophy.'\n\nIn a city where beloved venues close every year, The Hideout endures. Long may it run.",
  },
  {
    title: "Noname's Surprise Set at Radius Was a Masterclass",
    category: 'review',
    author_email: 'writer1@colornoise.local',
    author_name: 'D. Washington',
    date: '2026-03-08',
    venue: 'Radius Chicago',
    neighborhood: 'Pilsen',
    excerpt: "Nobody knew she was coming. That's what made it perfect. Noname walked out to a crowd that had gathered for an entirely different artist and proceeded to deliver forty minutes of the sharpest lyricism Chicago has heard all year.",
    body: "Nobody knew she was coming. That's what made it perfect. Noname walked out to a crowd that had gathered for an entirely different artist and proceeded to deliver forty minutes of the sharpest lyricism Chicago has heard all year.\n\nThe set drew heavily from Sundial and Room 25, weaving between introspective poetry and biting social commentary without ever losing the groove. Her band was locked in — the jazz-inflected arrangements gave every track room to breathe and mutate.\n\nThat's the Noname effect. She makes you pay attention.",
  },
]

async function seed() {
  console.log('\n🌱 Color&Noise seed script\n')

  // 1. Create auth users
  const userMap = {}
  for (const u of USERS) {
    console.log(`Creating user: ${u.email}`)
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
    })
    if (error && !error.message.includes('already registered')) {
      console.error(`  ✗ ${error.message}`)
      continue
    }
    const userId = data?.user?.id
    if (!userId) {
      // User already exists — look them up
      const { data: { users } } = await supabase.auth.admin.listUsers()
      const existing = users.find(x => x.email === u.email)
      if (existing) userMap[u.email] = existing.id
      console.log(`  → already exists`)
      continue
    }
    userMap[u.email] = userId
    console.log(`  ✓ created (${userId})`)

    // 2. Upsert profile with correct role
    const { error: profileErr } = await supabase.from('profiles').upsert({
      id: userId,
      username: u.username,
      role: u.role,
    }, { onConflict: 'id' })
    if (profileErr) console.error(`  ✗ profile: ${profileErr.message}`)
    else console.log(`  ✓ profile (${u.role})`)
  }

  // Fix roles for already-existing users
  for (const u of USERS) {
    const id = userMap[u.email]
    if (!id) continue
    await supabase.from('profiles').upsert({ id, username: u.username, role: u.role }, { onConflict: 'id' })
  }

  console.log('\nInserting sample articles…')
  for (const a of SAMPLE_ARTICLES) {
    const authorId = userMap[a.author_email]
    if (!authorId) { console.log(`  ✗ no user for ${a.author_email}`); continue }

    const slug = `${slugify(a.title)}-${Date.now().toString(36)}`
    const { error } = await supabase.from('articles').insert({
      slug,
      title: a.title,
      category: a.category,
      author_id: authorId,
      author_name: a.author_name,
      date: a.date,
      venue: a.venue,
      neighborhood: a.neighborhood,
      excerpt: a.excerpt,
      body: bodyToHtml(a.body),
      cover_image: null,
      status: 'published',
    })
    if (error) console.error(`  ✗ ${a.title}: ${error.message}`)
    else console.log(`  ✓ ${a.title}`)
  }

  console.log('\n✅ Seed complete!\n')
  console.log('Login credentials:')
  console.log('  admin   → admin@colornoise.local  / admin123')
  console.log('  writer  → writer1@colornoise.local / writer123')
  console.log('\nDashboard: /login → /dashboard\n')
}

seed().catch(err => { console.error(err); process.exit(1) })
