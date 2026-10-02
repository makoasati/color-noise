# Social scraping — what's actually possible

Companion to `scripts/scrape-social.js`. Read this before expecting Instagram or X to work.

```bash
node scripts/scrape-social.js --dry-run --only=D1,D42
```

## Platform reality

Everything below was tested, not assumed.

| Platform | Public search? | Status | Needs |
|---|---|---|---|
| **Mastodon** | Hashtag timelines yes, status search no | ✅ **verified collecting** — 21 records for Riot Fest, 43 for Lollapalooza | nothing |
| **oEmbed** (YouTube, X) | Per-URL only | ✅ **verified collecting** | nothing |
| **Reddit** | Yes, free API | ⚙️ code ready, needs an app | `REDDIT_CLIENT_ID` + `REDDIT_CLIENT_SECRET` |
| **YouTube** | Yes, free quota | ⚙️ code ready, needs a key | `YOUTUBE_API_KEY` |
| **Bluesky** | Yes, fully open, no auth | ⚙️ code ready — **blocked from the agent sandbox only, works from your machine** | nothing |
| **Instagram** | ❌ No | hashtag + location search were removed from the API in 2020 | see below |
| **X / Twitter** | ❌ No | search is paid tier only (~$200/mo Basic) | see below |
| **Threads** | ❌ No | the API publishes and reads *your own* posts; there is no public search | nothing will fix this |
| **TikTok** | Research API only | institutional application required | see below |

### Notes on the three that don't work

**Instagram.** The Graph API reads your own and connected business accounts. Public hashtag and location search was removed in 2020 and has not returned. There is no legitimate free route to "all posts tagged #riotfest2026". What *does* work is **oEmbed on specific post URLs** — which is why the script resolves the Instagram permalinks the dossier already verified. For anything more you'd be looking at a paid third-party scraper (Apify, Bright Data), which violates Instagram's ToS and I'd advise against for coursework.

**X.** The free API tier is post-only — no search endpoint. Recent search starts at the Basic tier. `publish.twitter.com/oembed` still resolves individual tweet URLs without auth, so specific posts are reachable; bulk search is not.

**Threads.** Genuinely nothing to try. Meta's Threads API has no public search surface at all.

**TikTok.** The **Research API** is free and legitimate, but requires an application from an accredited academic institution. If this is for a university course, that's a real path — it's the only sanctioned way to get TikTok data at volume. Application review takes weeks, so it won't help a near-term deadline.

### Why Bluesky is the one to care about

No key, no app, no approval, no rate-limit paperwork, and a genuine full-text search endpoint. It is by far the best free source here. It 403s from the agent's sandbox (verified: raw `curl` gets the same block page, so it's the egress proxy, not the API or the code) — **but it will work when you run it.** Try it first:

```bash
node scripts/scrape-social.js --platform=bluesky --only=D1,D2,D37
```

## Setup

### Reddit — two values, and *not* your login

Reddit's API does **not** want your username and password. Create a script app:

1. Go to https://www.reddit.com/prefs/apps
2. **create another app…** → type **script**
3. Name it anything; redirect URI `http://localhost:8080`
4. You get a **client ID** (under the app name) and a **secret**

Put them in `.env.local`, which is already gitignored:

```bash
REDDIT_CLIENT_ID=your_id_here
REDDIT_CLIENT_SECRET=your_secret_here
```

Write them into the file yourself rather than pasting them into chat — the script reads `.env.local` directly, so the secret never has to appear in a transcript to be usable. Same pattern the existing `seed-summer-2026.js` uses for the Supabase service-role key.

This gives read-only API access under *your* account's rate limit (100 requests/minute, which the script stays well under). It cannot post, vote, or comment.

### YouTube

1. https://console.cloud.google.com → new project
2. Enable **YouTube Data API v3**
3. Credentials → **Create credentials** → API key

```bash
YOUTUBE_API_KEY=your_key_here
```

Default quota is 10,000 units/day. A search costs 100 units and a comment page costs 1, so one full pass over all 86 events will exceed a day's quota — use `--only=` to work through them in batches. **YouTube comments are the richest eyewitness source available for free:** recap vlogs attract hundreds of first-person "I was there" replies.

### Instagram oEmbed (optional)

Needs a Meta app with the oEmbed Read feature. Only worth it if you want the Instagram permalinks resolved; skip otherwise.

```bash
INSTAGRAM_OEMBED_TOKEN=your_app_token
```

## Output

One append-only JSONL per event, deduped on `platform` + `id`, so re-running tops up instead of clobbering:

```
research/social-raw/
  D1.jsonl           Lollapalooza
  D2.jsonl           Riot Fest
  _manifest.json     per-run counts and the queries used
```

Every record has the same shape:

```json
{
  "platform": "mastodon",
  "id": "mastodon.social:115...",
  "url": "https://...",
  "author": "offby1@wandering.shop",
  "created_at": "2026-09-21T...",
  "text": "It got a bit messy at #riotfest2026 ... It's all just a muddy festival ground",
  "metrics": { "boosts": 0, "favourites": 2 },
  "query": "#riotfest2026",
  "extra": { "instance": "mastodon.social" },
  "collected_at": "2026-10-02T..."
}
```

Nothing is scored, filtered or interpreted — this is the raw pass, as asked.

## Queries

Derived from the dossier itself, so the two files can't drift. For each `### N.` section the script reads the title, the venue from the first bullet, and any `@handle`, `#hashtag` or post permalink anywhere in the section.

Three deliberate bits of cleanup, each of which was a bug first:
- **Compound titles are cut at `+` or `&`.** "El Grito Chicago + 26th Street Mexican Independence Day Parade" is two events; searching the whole string returns nothing.
- **Venues are reduced to a locality.** #37's venue field is a two-mile parade route; street addresses and anything with `→`, `between` or a digit is rejected so queries don't become nonsense.
- **"Chicago" isn't appended to titles that already contain it** — "Chicago Pride Parade Chicago" was a real generated query.

Check what a query *will* be before spending quota:

```bash
node scripts/scrape-social.js --dry-run --only=D44,D45
```

## Flags

| Flag | Effect |
|---|---|
| `--only=D1,D42` | Restrict to dossier refs. Matches `content/summer-2026` ref format. |
| `--platform=bluesky,reddit` | Default is all five. |
| `--dry-run` | Print queries and permalink counts. No requests, no writes. |
| `--limit=50` | Per-query cap where the platform supports it. |
| `--since=2026-05-01` | Default `2026-04-01`. |

## Two cautions

**Signal quality varies a lot.** The Mastodon `#lollapalooza` tag pulled Japanese music spam alongside real attendee posts; `#riotfest2026` was almost entirely genuine first-person accounts. Broad tags are noisy, event-specific tags are clean. Expect to filter at the analysis pass.

**These are real people who didn't write for publication.** Public posts are fine to collect and analyse, and for coursework that's unremarkable. But quoting an identifiable hobbyist account by handle in a published article is a different act from quoting a named source who spoke to a journalist — see the ethics notes in `research/chicago-summer-2026-social.md`. For the immigration-enforcement events (#42, #43, #44, #55) treat social handles the same way that file treats faces.
