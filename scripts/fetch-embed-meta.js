// Harvest what the platforms themselves will tell us about every post
// embedded in content/summer-2026, into content/summer-2026/embed-meta.json.
//
// WHY THIS EXISTS:
// Three things the article page cannot work out for itself.
//
// 1. Height. Instagram's /embed/ document does not post its height to the
//    parent window — the embed bundle on static.cdninstagram.com carries no
//    MEASURE message — so a parent page cannot measure a cross-origin embed
//    at runtime. What the document does expose is the media aspect, inline on
//    its own frame element:
//
//      <div class="Content EmbedFrame" style="padding-bottom: 125%">
//
//    That number plus a constant for Instagram's chrome sizes the iframe
//    exactly, in CSS, at any column width. See content/summer-2026/embeds.js.
//    Instagram omits the inline style for a square post, because its own
//    stylesheet already says `.EmbedFrame { padding-bottom: 100% }`.
//
// 2. Who posted it. A credit typed by hand drifts from the post and nothing
//    catches it: of the embeds in this package, one Instagram post was
//    credited to a festival when it belonged to a newsroom, and seven
//    Facebook reels were credited to "unknown". Instagram names the account
//    in the embed document; Facebook puts the page at the end of the reel's
//    og:title. Both are read here, so the credit cannot be wrong.
//
// 3. The post's own words. /embed/ shows media only. /embed/captioned/ adds
//    the creator's caption, the like count and the comment count, which is
//    where the side rail's quoted text comes from. The iframe itself stays on
//    plain /embed/, because a caption of unknown length would put the frame
//    back to an unmeasurable height — the exact bug this replaced.
//
// Captions are stored as a short excerpt with trailing hashtags dropped, and
// always alongside the permalink the rail links out to.
//
// Instagram answers 200 for a post that no longer renders, so status is not
// proof of anything. A post that comes back as the "unavailable" card is
// recorded as null and reported as broken on exit.
//
// Usage: npm run embeds          (refresh the file)
//        npm run embeds:check    (fail if the layout data is stale)

const fs = require('fs')
const path = require('path')

const OUT = path.join(__dirname, '..', 'content', 'summer-2026', 'embed-meta.json')
const CONTENT = path.join(__dirname, '..', 'content', 'summer-2026')
const CHECK = process.argv.includes('--check')

// Instagram serves the full single-page app to a fully-formed Chrome
// user-agent and the lightweight /embed/ document to anything else. Keep this
// string short on purpose: the heavy payload has none of what we need.
const UA = 'Mozilla/5.0 (compatible; ColorNoise embed sizer)'

const CAPTION_MAX = 220

const sleep = ms => new Promise(r => setTimeout(r, ms))

// Nearly two hundred posts is several hundred requests. Space them out and
// retry, so one throttled response is not recorded as a dead post.
async function get(url) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'user-agent': UA } })
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`)
      return await res.text()
    } catch (e) {
      if (attempt >= 3) throw e
      await sleep(attempt * 2000)
    }
  }
}

function entities(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#0*(\d+);/g, (m, d) => String.fromCodePoint(+d))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

function decode(s) {
  return entities(s.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
}

// A caption that ends in a run of hashtags is ending in metadata, not prose.
// Drop that run, then cut to an excerpt on a word boundary.
function excerpt(text) {
  let s = text.replace(/(\s*#[^\s#]+)+\s*$/, '').trim()
  if (s.length <= CAPTION_MAX) return s
  s = s.slice(0, CAPTION_MAX)
  const cut = s.lastIndexOf(' ')
  return (cut > 80 ? s.slice(0, cut) : s).replace(/[\s,;:.-]+$/, '') + '…'
}

// Embeds are read out of the content files rather than listed here, so a new
// one cannot be added without this script noticing it. Any credit written by
// hand comes along too, so the harvested account can be checked against what
// the article claims the post is.
const CREDIT = /credit:\s*(?:'([^']*)'|"((?:[^"\\]|\\.)*)")/

function creditFrom(args) {
  const m = args.match(CREDIT)
  if (!m) return ''
  return m[1] !== undefined ? m[1] : JSON.parse(`"${m[2]}"`)
}

function embedsFromContent() {
  const instagram = new Map()
  const facebook = new Map()
  for (const f of fs.readdirSync(CONTENT)) {
    if (!f.endsWith('.js')) continue
    const src = fs.readFileSync(path.join(CONTENT, f), 'utf8')
    // Calls are written both ways in these files — one line for the short
    // ones, several for anything carrying a comment — so the argument object
    // is matched by "no braces inside" rather than by where its closing
    // brace sits. An earlier version required a newline before `})` and
    // silently skipped 119 single-line calls, which then rendered at the
    // fallback aspect with a hand-written credit.
    for (const m of src.matchAll(/E\.instagram\(\s*'([^']+)'\s*,\s*\{([^{}]*)\}\s*\)/g)) {
      if (!instagram.has(m[1])) instagram.set(m[1], { credit: creditFrom(m[2]), file: f })
    }
    for (const m of src.matchAll(/E\.facebookVideo\(\s*'([^']+)'\s*,\s*\{([^{}]*)\}\s*\)/g)) {
      if (!facebook.has(m[1])) facebook.set(m[1], { credit: creditFrom(m[2]), file: f })
    }
  }
  return { instagram, facebook }
}

// A credit naming an account the post was not posted by is a factual error in
// the article, and the kind that survives for years because the embed still
// renders. Report it; fixing it is an editorial call, not this script's.
function creditMismatch(credit, account) {
  if (!credit || !account) return null
  const named = [...credit.matchAll(/@([A-Za-z0-9._]+)/g)].map(m => m[1].toLowerCase())
  if (named.length) {
    return named.includes(account.replace(/^@/, '').toLowerCase())
      ? null
      : `credit names ${named.map(h => '@' + h).join(', ')} but the post is ${account}`
  }
  const squash = s => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  return squash(credit).includes(squash(account))
    ? null
    : `credit "${credit}" does not name the posting account ${account}`
}

// Newsrooms this package may not lean on (2). Deriving the credit from the
// embed is what surfaced these: a handle like @blockclubchi or @cbschicago
// does not resemble the outlet name closely enough for the seed script's
// prose check to catch, so the posts sat in the package credited to
// festivals or to nobody. Listed explicitly, and reported every run until
// the embeds are replaced with primary-source posts.
const NEWSROOM_ACCOUNTS = [
  'blockclubchi',
  'cbschicago',
  'secret.chicago',
  'baichwalabc7',
]

async function harvestInstagram(shortcode) {
  const plain = await get(`https://www.instagram.com/p/${shortcode}/embed/`)

  if (plain.includes('EmbedBrokenMedia')) {
    return { ok: false, reason: 'EmbedBrokenMedia — post deleted, private, or geo-blocked' }
  }

  // The frame element is the media. Instagram writes padding-bottom inline
  // only when the aspect is not square, so a frame with no inline style is a
  // 1:1 post rather than a failure.
  const frame = plain.match(/class="Content EmbedFrame"[^>]*>/)
  if (!frame) return { ok: false, reason: 'no media frame in payload' }
  const inline = frame[0].match(/padding-bottom:\s*([0-9.]+)%/)

  const meta = { ratio: inline ? Math.round(parseFloat(inline[1]) * 100) / 100 : 100 }

  const handle = plain.match(/class="UsernameText">([^<]+)</)
  if (handle) meta.handle = decode(handle[1])

  // The caption, the like count and the comment count only exist on the
  // captioned variant. A failure here is not fatal: the rail falls back to
  // our own caption and the credit.
  try {
    const captioned = await get(`https://www.instagram.com/p/${shortcode}/embed/captioned/`)

    const block = captioned.match(/<div class="Caption">([\s\S]*?)<div class="CaptionComments">/)
    if (block) {
      const text = decode(block[1].replace(/<a class="CaptionUsername"[\s\S]*?<\/a>/, ''))
      if (text) meta.caption = excerpt(text)
    }
    const comments = captioned.match(/class="CaptionCommentsExpand"[^>]*>([^<]+)</)
    if (comments) meta.commentsLabel = decode(comments[1])

    const likes = captioned.match(/data-log-event="likeCountClick"[^>]*>([^<]+)</)
    if (likes) meta.likes = decode(likes[1])
  } catch (e) {
    console.log(`    (caption fetch failed for ${shortcode}: ${e.message})`)
  }

  return { ok: true, meta }
}

// Facebook puts the posting page last in the reel's og:title, after the
// poster's own words: "Day / night 📹: Daniel Tirado | North Coast Music
// Festival". Checked against the 46 credits this package had already written
// by hand — 36 matched exactly, and all ten differences were corrections.
async function harvestFacebook(url) {
  const html = await get(url)
  const og = html.match(/<meta property="og:title" content="([^"]*)"/)
  if (!og) return { ok: false, reason: 'no og:title — reel removed or not public' }
  const page = entities(og[1]).split('|').pop().trim()
  if (!page) return { ok: false, reason: 'og:title carries no page name' }
  return { ok: true, meta: { page } }
}

async function main() {
  const used = embedsFromContent()
  const next = { instagram: {}, facebook: {} }
  const broken = []
  const mismatched = []
  const newsrooms = []
  const note = (list, id, file, msg) => list.push(`${id} (${file}) — ${msg}`)

  console.log(`\nInstagram — ${used.instagram.size} posts`)
  for (const [id, ref] of used.instagram) {
    let r
    try { r = await harvestInstagram(id) } catch (e) { r = { ok: false, reason: e.message } }
    if (r.ok) {
      next.instagram[id] = r.meta
      console.log(`  ${id}  ${r.meta.ratio}%  ${r.meta.commentsLabel || 'no comment count'}`)
      const bad = creditMismatch(ref.credit, r.meta.handle && `@${r.meta.handle}`)
      if (bad) note(mismatched, id, ref.file, bad)
      if (r.meta.handle && NEWSROOM_ACCOUNTS.includes(r.meta.handle.toLowerCase())) {
        note(newsrooms, id, ref.file, `posted by @${r.meta.handle}`)
      }
    } else {
      // null records "the platform will not render this one". embeds.js reads
      // it and gives the post a short flat box rather than a tall empty
      // frame, so a dead embed degrades to a small card instead of a hole.
      next.instagram[id] = null
      note(broken, id, ref.file, r.reason)
      console.log(`  ${id}  BROKEN: ${r.reason}`)
    }
    await sleep(250)
  }

  console.log(`\nFacebook — ${used.facebook.size} videos`)
  for (const [url, ref] of used.facebook) {
    const short = url.replace(/^https:\/\/www\.facebook\.com\//, '')
    let r
    try { r = await harvestFacebook(url) } catch (e) { r = { ok: false, reason: e.message } }
    if (r.ok) {
      next.facebook[url] = r.meta
      console.log(`  ${short}  ${r.meta.page}`)
      const bad = creditMismatch(ref.credit, r.meta.page)
      if (bad) note(mismatched, short, ref.file, bad)
    } else {
      next.facebook[url] = null
      note(broken, short, ref.file, r.reason)
      console.log(`  ${short}  BROKEN: ${r.reason}`)
    }
    await sleep(250)
  }

  const sortKeys = o => Object.fromEntries(Object.keys(o).sort().map(k => [k, o[k]]))
  const body = JSON.stringify(
    { instagram: sortKeys(next.instagram), facebook: sortKeys(next.facebook) }, null, 2) + '\n'

  if (CHECK) {
    // Like and comment counts drift every day, so comparing them would make
    // --check fail forever and mean nothing. What --check is for is the data
    // the page depends on: the aspect that sizes the frame, the account, and
    // the quoted caption. Drift in the counts is not a failure.
    const onDisk = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {}
    const stable = o => o && { ratio: o.ratio, handle: o.handle, caption: o.caption, page: o.page }
    const stale = []
    for (const platform of ['instagram', 'facebook']) {
      const was = onDisk[platform] || {}
      for (const id of Object.keys(next[platform])) {
        if (JSON.stringify(stable(next[platform][id])) !== JSON.stringify(stable(was[id]))) {
          stale.push(`${platform} ${id}`)
        }
      }
      for (const id of Object.keys(was)) {
        if (!(id in next[platform])) stale.push(`${platform} ${id} (no longer used in content)`)
      }
    }
    if (stale.length) {
      console.error('\nembed-meta.json is stale — run npm run embeds')
      for (const id of stale) console.error(`  ${id}`)
      process.exit(1)
    }
    console.log('\nembed-meta.json is current (counts not compared — they drift)')
  } else {
    fs.writeFileSync(OUT, body)
    console.log(`\nWrote ${OUT}`)
  }

  if (mismatched.length) {
    console.error('\nCredits that do not match the posting account:')
    for (const m of mismatched) console.error(`  ${m}`)
  }
  if (broken.length) {
    console.error('\nEmbeds that no longer render — replace or drop them:')
    for (const b of broken) console.error(`  ${b}`)
  }
  if (newsrooms.length) {
    console.error('\nEmbeds posted by newsrooms this package may not lean on (2):')
    for (const n of newsrooms) console.error(`  ${n}`)
  }
  if (broken.length || mismatched.length || newsrooms.length) process.exit(2)
}

main()
