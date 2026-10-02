// Collect raw social-media mentions for each event in the summer-2026 dossier.
//
// Usage: node scripts/scrape-social.js [--only=D1,D42] [--platform=bluesky,reddit]
//                                      [--dry-run] [--limit=50] [--since=2026-05-01]
//
// Writes one JSONL file per event to research/social-raw/D<N>.jsonl — append-only,
// deduped on platform+id, so re-running top-ups rather than clobbers. Nothing is
// interpreted or scored here: this is the raw-collection pass. Read
// docs/social-scrape.md before you expect Instagram or X to work.
//
// Queries are derived from the dossier itself (research/chicago-summer-2026-events.md):
// the "### N." heading gives the event name, the bullet line below it gives venue and
// dates, and any @handle or #hashtag anywhere in the section is picked up as a term.
//
// Platform reality, in one line each (the long version is in the doc):
//   bluesky   no auth at all, open search          — works out of the box
//   reddit    free OAuth app, 100 req/min          — needs REDDIT_CLIENT_ID/SECRET
//   youtube   free quota, video search + comments  — needs YOUTUBE_API_KEY
//   mastodon  public hashtag timelines only        — works, but low signal
//   oembed    resolves specific IG/X/YT post URLs  — works, but only for URLs we already have
// Instagram, X and Threads have no free public search. That is a platform decision,
// not a missing feature here.

try { require('dotenv').config({ path: '.env.local' }) } catch {}

const fs = require('fs')
const path = require('path')

const DOSSIER = 'research/chicago-summer-2026-events.md'
const OUTDIR = 'research/social-raw'

const DRY = process.argv.includes('--dry-run')
const arg = (name, dflt) => {
  const hit = process.argv.find(a => a.startsWith(`--${name}=`))
  return hit ? hit.slice(name.length + 3) : dflt
}
const ONLY = arg('only', '').split(',').filter(Boolean)
const PLATFORMS = arg('platform', 'bluesky,reddit,youtube,mastodon,oembed').split(',').filter(Boolean)
const LIMIT = parseInt(arg('limit', '50'), 10)
const SINCE = arg('since', '2026-04-01')

const UA = 'color-noise-research/1.0 (Chicago summer 2026 coursework; contact via repo)'

// ── helpers ───────────────────────────────────────────────────────────────────

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function getJSON(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { 'User-Agent': UA, Accept: 'application/json', ...(opts.headers || {}) },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`${res.status} ${res.statusText} ${body.slice(0, 180)}`)
  }
  return res.json()
}

// Every collector returns records in this shape. Keep it stable — the analysis
// pass downstream depends on it.
// Mastodon wraps hashtags and mentions in <a><span>, so stripping tags naively
// yields "# RiotFest2026" and "https://www. example.com". Rejoin both.
function detag(html) {
  const NL = String.fromCharCode(10)
  return String(html || '')
    .replace(/<br\s*\/?>/gi, NL)
    .replace(/<\/p>/gi, NL + NL)
    .replace(/<[^>]+>/g, ' ')
    .replace(/([#@])\s+(?=[\w])/g, '$1')
    .replace(/(https?:\/\/[^\s]*?)\s+(?=[\w./-])/g, '$1')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, NL + NL)
    .trim()
}

function record({ platform, id, url, author, created_at, text, metrics, query, extra }) {
  return {
    platform,
    id: String(id),
    url: url || null,
    author: author || null,
    created_at: created_at || null,
    text: (text || '').trim(),
    metrics: metrics || {},
    query: query || null,
    extra: extra || {},
    collected_at: new Date().toISOString(),
  }
}

// ── dossier parsing ───────────────────────────────────────────────────────────

// Section bodies keyed by dossier number, matching harvest-covers.js's regex so
// the two scripts never disagree about what event "42" is.
function parseDossier() {
  const lines = fs.readFileSync(DOSSIER, 'utf8').split('\n')
  const events = {}
  let num = null
  for (const line of lines) {
    const h = line.match(/^###\s+(\d+)\.\s*(.+)$/)
    if (h) {
      num = h[1]
      events[num] = { ref: `D${num}`, num: Number(num), title: cleanTitle(h[2]), lines: [] }
      continue
    }
    if (!num) continue
    if (/^###?\s/.test(line) || /^#\s/.test(line)) { num = null; continue }
    events[num].lines.push(line)
  }
  for (const e of Object.values(events)) Object.assign(e, derive(e))
  return events
}

function cleanTitle(raw) {
  return raw
    .replace(/\*\*/g, '')
    .replace(/\s+—\s+\*[^*]+\*.*$/, '')   // "— *September*" season tags
    .replace(/\s+—\s+.*$/, '')            // trailing editorial dashes
    .replace(/\s*\([^)]*\)\s*$/, '')
    // Compound headings ("El Grito Chicago + 26th Street ... Parade") describe two
    // events; search the first, which is the one the entry is really about.
    .replace(/\s+[+&]\s+.*$/, '')
    .trim()
}

// Venue, neighbourhood and the handles/hashtags the dossier already found.
function derive(e) {
  const body = e.lines.join('\n')
  const first = e.lines.find(l => l.trim().startsWith('- **')) || ''

  // "- **Jul 30 – Aug 2, 2026** (Thu–Sun) · Grant Park, Loop/South Loop · `music`"
  const parts = first.split('·').map(s => s.replace(/\*\*/g, '').trim())
  const venue = parts[1] ? parts[1].replace(/`/g, '').trim() : null
  const category = (body.match(/`(music|art|food|nightlife)`/) || [])[1] || null

  const handles = [...new Set((body.match(/@[A-Za-z0-9._]{3,30}/g) || [])
    .map(h => h.slice(1))
    .filter(h => !/^(c3presents|gmail|example)$/i.test(h)))]
  const hashtags = [...new Set(body.match(/#[A-Za-z0-9_]{3,40}/g) || [])]

  // Specific post permalinks already verified in the dossier — these are the only
  // Instagram and X items we can legitimately resolve (see docs/social-scrape.md).
  // The dossier writes most links bare ("instagram.com/p/ABC/"), so the scheme is
  // optional here and normalised back on afterwards.
  const permalinks = [...new Set((body.match(
    /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/(?:p|reel)\/[\w-]+|(?:x|twitter)\.com\/[\w]+\/status\/\d+|tiktok\.com\/@[\w.]+\/video\/\d+|youtube\.com\/watch\?v=[\w-]+)\/?/g
  ) || []).map(u => (u.startsWith('http') ? u : 'https://' + u)))]

  return { venue, category, handles, hashtags, permalinks }
}

// A venue field can be a clean place name ("Grant Park, Loop/South Loop") or a
// two-mile parade route. Only the former is useful as a search term, so pull the
// shortest segment that looks like a place and reject anything street-addressy.
function locality(venue) {
  if (!venue) return null
  const segs = venue.split(',').map(s => s.trim()).filter(Boolean)
  for (const seg of segs) {
    if (seg.length > 26) continue
    if (/\d|→|between|from |^at /i.test(seg)) continue
    return seg
  }
  return null
}

// Search terms, most specific first. Short or generic titles get a locality
// appended so we don't search Bluesky for the bare word "Neighbors".
function queriesFor(e) {
  const t = e.title
  const out = []
  if (!/chicago/i.test(t)) out.push(`${t} Chicago`)
  const loc = locality(e.venue)
  if (loc && !new RegExp(loc, 'i').test(t) && (t.length < 20 || /chicago/i.test(t))) {
    out.push(`${t} ${loc}`)
  }
  out.push(`${t} 2026`)
  for (const h of e.hashtags.slice(0, 3)) out.push(h)
  return [...new Set(out)].filter(q => q.length <= 70)
}

// ── collectors ────────────────────────────────────────────────────────────────

// Bluesky: genuinely open. No key, no app, no approval.
async function bluesky(e, q) {
  const url = 'https://public.api.bsky.app/xrpc/app.bsky.feed.searchPosts'
    + `?q=${encodeURIComponent(q)}&limit=${Math.min(LIMIT, 100)}&since=${SINCE}T00:00:00Z`
  const data = await getJSON(url)
  return (data.posts || []).map(p => record({
    platform: 'bluesky',
    id: p.uri,
    url: `https://bsky.app/profile/${p.author?.handle}/post/${String(p.uri).split('/').pop()}`,
    author: p.author?.handle,
    created_at: p.record?.createdAt,
    text: p.record?.text,
    metrics: { likes: p.likeCount, reposts: p.repostCount, replies: p.replyCount },
    query: q,
  }))
}

let redditToken = null
async function redditAuth() {
  if (redditToken) return redditToken
  const id = process.env.REDDIT_CLIENT_ID
  const secret = process.env.REDDIT_CLIENT_SECRET
  if (!id || !secret) throw new Error('set REDDIT_CLIENT_ID and REDDIT_CLIENT_SECRET in .env.local')
  const res = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': UA,
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) throw new Error(`reddit auth ${res.status}`)
  redditToken = (await res.json()).access_token
  return redditToken
}

// Reddit's own search. r/chicago is the main room; the others catch the rest.
const SUBS = ['chicago', 'chicagomusic', 'AskChicago', 'chicagofood', 'Lollapalooza', 'riotfest']
async function reddit(e, q) {
  const token = await redditAuth()
  const out = []
  for (const sub of SUBS) {
    const url = `https://oauth.reddit.com/r/${sub}/search`
      + `?q=${encodeURIComponent(q)}&restrict_sr=1&sort=relevance&t=year&limit=25`
    let data
    try {
      data = await getJSON(url, { headers: { Authorization: `Bearer ${token}` } })
    } catch (err) {
      if (/^40[34]/.test(err.message)) continue    // private or banned sub
      throw err
    }
    for (const c of (data.data?.children || [])) {
      const d = c.data
      out.push(record({
        platform: 'reddit',
        id: d.id,
        url: `https://reddit.com${d.permalink}`,
        author: d.author,
        created_at: new Date(d.created_utc * 1000).toISOString(),
        text: [d.title, d.selftext].filter(Boolean).join('\n\n'),
        metrics: { score: d.score, comments: d.num_comments, ratio: d.upvote_ratio },
        query: q,
        extra: { subreddit: d.subreddit, is_self: d.is_self, flair: d.link_flair_text },
      }))
    }
    await sleep(700)   // stay well under 100 req/min
  }
  return out
}

// YouTube: the richest eyewitness source here. Recap vlogs plus their comment
// threads are first-person accounts, and the quota is free.
async function youtube(e, q) {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) throw new Error('set YOUTUBE_API_KEY in .env.local')
  const search = await getJSON('https://www.googleapis.com/youtube/v3/search'
    + `?part=snippet&type=video&maxResults=10&order=relevance`
    + `&publishedAfter=${SINCE}T00:00:00Z`
    + `&q=${encodeURIComponent(q)}&key=${key}`)

  const out = []
  for (const item of (search.items || [])) {
    const vid = item.id?.videoId
    if (!vid) continue
    out.push(record({
      platform: 'youtube',
      id: vid,
      url: `https://www.youtube.com/watch?v=${vid}`,
      author: item.snippet?.channelTitle,
      created_at: item.snippet?.publishedAt,
      text: [item.snippet?.title, item.snippet?.description].filter(Boolean).join('\n\n'),
      query: q,
      extra: { kind: 'video' },
    }))

    // Comments are where the eyewitness sentiment actually lives.
    try {
      const comments = await getJSON('https://www.googleapis.com/youtube/v3/commentThreads'
        + `?part=snippet&videoId=${vid}&maxResults=50&order=relevance&key=${key}`)
      for (const c of (comments.items || [])) {
        const s = c.snippet?.topLevelComment?.snippet
        if (!s) continue
        out.push(record({
          platform: 'youtube',
          id: c.id,
          url: `https://www.youtube.com/watch?v=${vid}&lc=${c.id}`,
          author: s.authorDisplayName,
          created_at: s.publishedAt,
          text: s.textOriginal,
          metrics: { likes: s.likeCount },
          query: q,
          extra: { kind: 'comment', on_video: vid, on_video_title: item.snippet?.title },
        }))
      }
    } catch (err) {
      // Comments disabled on that video, or quota hit. Keep the video record.
      if (!/40[034]/.test(err.message)) throw err
    }
    await sleep(200)
  }
  return out
}

const MASTO = ['mastodon.social', 'mstdn.social']

// Mastodon's /api/v2/search with type=statuses silently returns [] unless you send
// a token (verified: accounts come back, statuses don't). The public hashtag
// timeline needs no auth, so that's what we use. Expect low signal and some
// unrelated spam on broad tags — this is a top-up source, not a primary one.
async function mastodon(e, q) {
  const tags = [...new Set([
    ...e.hashtags.map(h => h.slice(1)),
    q.replace(/[^A-Za-z0-9]/g, '').toLowerCase(),
  ])].filter(t => t.length >= 4 && t.length <= 40)

  const out = []
  for (const host of MASTO) {
    for (const tag of tags.slice(0, 4)) {
      try {
        const arr = await getJSON(`https://${host}/api/v1/timelines/tag/${encodeURIComponent(tag)}?limit=40`)
        for (const st of (Array.isArray(arr) ? arr : [])) {
          out.push(record({
            platform: 'mastodon',
            id: `${host}:${st.id}`,
            url: st.url,
            author: st.account?.acct,
            created_at: st.created_at,
            text: detag(st.content),
            metrics: { boosts: st.reblogs_count, favourites: st.favourites_count },
            query: `#${tag}`,
            extra: { instance: host },
          }))
        }
      } catch (err) {
        // 404 just means nobody on that instance has used the tag.
      }
      await sleep(400)
    }
  }
  return out
}

// oEmbed: the only legitimate route to a specific Instagram or X post without
// paid API access. Resolves permalinks the dossier already verified.
async function oembed(e) {
  const out = []
  for (const link of e.permalinks) {
    let endpoint = null
    if (/instagram\.com/.test(link)) {
      const tok = process.env.INSTAGRAM_OEMBED_TOKEN
      if (!tok) continue    // Instagram oEmbed needs an app token; see the doc
      endpoint = `https://graph.facebook.com/v21.0/instagram_oembed?url=${encodeURIComponent(link)}&access_token=${tok}`
    } else if (/x\.com|twitter\.com/.test(link)) {
      endpoint = `https://publish.twitter.com/oembed?url=${encodeURIComponent(link)}&omit_script=1`
    } else if (/youtube\.com/.test(link)) {
      endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(link)}&format=json`
    } else {
      continue             // TikTok oEmbed is unreliable; collect those by hand
    }
    try {
      const d = await getJSON(endpoint)
      out.push(record({
        platform: 'oembed',
        id: link,
        url: link,
        author: d.author_name || d.author_url || null,
        text: detag(d.html || d.title),
        query: 'dossier permalink',
        extra: { provider: d.provider_name, thumbnail: d.thumbnail_url || null, title: d.title || null },
      }))
    } catch (err) {
      console.log(`      oembed miss  ${link}  ${err.message.slice(0, 60)}`)
    }
    await sleep(300)
  }
  return out
}

const COLLECTORS = { bluesky, reddit, youtube, mastodon }

// ── output ────────────────────────────────────────────────────────────────────

function existingIds(file) {
  if (!fs.existsSync(file)) return new Set()
  return new Set(fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map(l => {
    try { const r = JSON.parse(l); return `${r.platform}:${r.id}` } catch { return null }
  }).filter(Boolean))
}

function append(file, recs) {
  const seen = existingIds(file)
  const fresh = recs.filter(r => {
    const k = `${r.platform}:${r.id}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
  if (fresh.length && !DRY) {
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.appendFileSync(file, fresh.map(r => JSON.stringify(r)).join('\n') + '\n')
  }
  return fresh.length
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  const events = parseDossier()
  const picked = Object.values(events)
    .filter(e => !ONLY.length || ONLY.includes(e.ref))
    .sort((a, b) => a.num - b.num)

  if (!picked.length) {
    console.error(`No events matched. Parsed ${Object.keys(events).length} from ${DOSSIER}.`)
    process.exit(1)
  }

  console.log(`${picked.length} event(s) · platforms: ${PLATFORMS.join(', ')} · since ${SINCE}`)
  if (DRY) console.log('DRY RUN — queries only, nothing written, no requests made\n')

  const manifest = []
  for (const e of picked) {
    const queries = queriesFor(e)
    console.log(`\n${e.ref.padEnd(6)} ${e.title}`)
    console.log(`       venue: ${e.venue || '—'}  ·  queries: ${queries.map(q => `"${q}"`).join('  ')}`)
    if (e.permalinks.length) console.log(`       permalinks in dossier: ${e.permalinks.length}`)
    if (DRY) { manifest.push({ ref: e.ref, title: e.title, queries, permalinks: e.permalinks }); continue }

    const file = path.join(OUTDIR, `${e.ref}.jsonl`)
    const counts = {}
    for (const p of PLATFORMS) {
      let recs = []
      try {
        if (p === 'oembed') recs = await oembed(e)
        else if (COLLECTORS[p]) for (const q of queries) recs = recs.concat(await COLLECTORS[p](e, q))
        else { console.log(`       ${p}: unknown platform, skipped`); continue }
      } catch (err) {
        console.log(`       ${p}: ${err.message.slice(0, 110)}`)
        continue
      }
      const n = append(file, recs)
      counts[p] = n
      console.log(`       ${p.padEnd(9)} ${String(recs.length).padStart(4)} found  ${String(n).padStart(4)} new`)
    }
    manifest.push({ ref: e.ref, title: e.title, queries, counts, file })
  }

  const mf = path.join(OUTDIR, '_manifest.json')
  if (!DRY) {
    fs.mkdirSync(OUTDIR, { recursive: true })
    fs.writeFileSync(mf, JSON.stringify({ run_at: new Date().toISOString(), since: SINCE, platforms: PLATFORMS, events: manifest }, null, 2))
    console.log(`\nwrote ${mf}`)
  }

  const total = manifest.reduce((s, m) => s + Object.values(m.counts || {}).reduce((a, b) => a + b, 0), 0)
  console.log(`\n${total} new record(s) across ${picked.length} event(s)`)
  if (!DRY) console.log(`raw JSONL in ${OUTDIR}/ — one file per event, append-only, deduped on platform+id`)
}

main().catch(err => { console.error(err); process.exit(1) })
