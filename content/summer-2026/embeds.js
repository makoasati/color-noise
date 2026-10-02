// Social post embeds for article bodies.
//
// WHY IFRAMES AND NOT THE OFFICIAL EMBED CODES:
// app/article/[slug]/page.js renders the body with dangerouslySetInnerHTML.
// Scripts injected that way never execute, so Instagram's blockquote +
// embed.js and X's widgets.js approach cannot work here. Every platform
// below is therefore addressed through its script-free iframe endpoint,
// each verified to return real post content on 2026-09-30.
//
// HOW THE FRAME IS SIZED (rewritten 2026-10-02):
// The old version gave every Instagram embed a flat height:820px with
// scrolling="no", which cut the post off partway down the like/comment row.
// Instagram's embed document does not post its height to the parent — the
// embed bundle on static.cdninstagram.com carries no MEASURE message — so a
// parent page cannot measure it at runtime. What the document does expose is
// the media aspect, inline on its own frame element:
//
//   <div class="Content EmbedFrame" style="padding-bottom: 125%">
//
// scripts/fetch-embed-meta.js harvests that number into embed-meta.json, and
// the iframe is then sized in pure CSS as
//
//   padding-bottom: calc(<ratio>% + <chrome>px)
//
// on a positioned wrapper. Percentage padding resolves against the wrapper's
// own width, so the frame is exact at every column width, with no JavaScript
// and nothing clipped. Narrowing the media column is the only lever on
// overall height, which is why app/globals.css gives it 300px.
//
// WHERE THE SIDE RAIL TEXT COMES FROM:
// /embed/ shows media only. /embed/captioned/ also carries the creator's
// caption, the like count and the comment count, so fetch-embed-meta.js reads
// those and embed-meta.json keeps them next to the ratio. They render beside
// the frame rather than inside it: a caption of unknown length would put the
// iframe back to an unmeasurable height, which is the bug this replaced.
//
// WHERE THE CREDIT COMES FROM:
// The account that posted, read off the embed rather than typed in. Instagram
// names it in the embed document, Facebook at the end of the reel's og:title,
// and fetch-embed-meta.js records both. A hand-written `credit` is only a
// fallback for a post the platform no longer serves, where there is no
// account left to read.
//
// LIMITS, STATED PLAINLY:
//  - An embed is not a hosted image. If the creator deletes the post or
//    flips the account private, the article loses that visual. Never put
//    information the article depends on inside an embed.
//  - Embeds cannot fill `cover_image`. That field needs a real hosted URL,
//    so covers must still come from Commons, Choose Chicago or DVIDS.
//  - Instagram's /embed/ endpoint is undocumented and has been restricted
//    before. Assume it will break eventually and keep the permalink in the
//    credit line so the attribution survives the iframe.
//  - X/Twitter has no script-free iframe. Link those, do not embed them.

const META = require('./embed-meta.json')

const ALLOWED_HOSTS = [
  'www.instagram.com',
  'www.tiktok.com',
  'www.youtube.com',
  'www.facebook.com',
]

// Instagram's own furniture around the media, measured rather than guessed.
// Five embeds (single image, carousel, reel, with and without a caption) were
// mirrored to localhost on 2026-10-02 and laid out at 298, 360 and 500 CSS
// pixels wide. Every one came back the same, and it does not vary with
// column width: header 54 + "View more on Instagram" 44 + the
// like/comment/share row 40 + the social-proof line 22 + the comment footer
// 44 = 204. Four pixels are added for sub-pixel rounding, so the slack reads
// as a thin band of white inside a white card rather than a clipped row.
//
// To re-measure after Instagram changes its embed: mirror
// instagram.com/p/<shortcode>/embed/ to a local file, lay it out at a known
// width, and take .Embed height minus .Content.EmbedFrame height.
const IG_CHROME = 208

// Aspect fallback for a shortcode missing from embed-meta.json. 133.33% is
// the tallest frame Instagram serves (3:4), so an unmeasured embed is given
// too much room rather than too little.
const IG_FALLBACK_RATIO = 133.33

// A null entry in embed-meta.json means Instagram served its "unavailable"
// card for that shortcode: the post is gone, private, or geo-blocked. That
// card has no media and no chrome, so it gets a short flat box rather than a
// tall empty frame. Replace the embed — this only keeps the page from looking
// broken while you do.
const IG_BROKEN_HEIGHT = 240

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Nothing should render with a guessed credit. Either the harvest has the
// account or the call passes a fallback, and the message says which.
function missingAccount(what, id, example) {
  return new Error(
    `No account harvested for ${what} ${id}, and no credit fallback given. ` +
    `Run npm run embeds, or pass credit: ${example}.`
  )
}

// An aspect box: percentage padding resolves against the wrapper's own width,
// so this holds at any column width. The px term is the platform's fixed
// chrome above and below the media.
function aspectBox(ratioPercent, chromePx) {
  return `padding-bottom:calc(${ratioPercent}% + ${chromePx}px)`
}

// Every embed carries a visible credit line with a live permalink, so the
// attribution outlives the iframe even if the platform stops serving it.
//
// Layout: the iframe takes one grid column and the reading matter — our
// caption, the post's own words, its like and comment counts, the credit —
// takes the next. `layout: 'wide'` drops the second column for landscape
// video, where a side rail would squeeze the frame.
function figure({
  platform, src, title, permalink, frame, layout = 'side',
  caption, credit, note, quote, stats,
}) {
  const host = new URL(src).host
  if (!ALLOWED_HOSTS.includes(host)) throw new Error(`Embed host not allowed: ${host}`)
  if (!caption) throw new Error(`Embed missing caption: ${src}`)
  if (!credit)  throw new Error(`Embed missing credit: ${src}`)

  const media =
    `<div class="cn-embed-media" style="${frame}">` +
      `<iframe src="${esc(src)}" title="${esc(title)}" loading="lazy" frameborder="0" scrolling="no" allowfullscreen></iframe>` +
    `</div>`

  const side =
    `<div class="cn-embed-side">` +
      `<figcaption>${esc(caption)}</figcaption>` +
      (note ? `<p class="cn-embed-note">${esc(note)}</p>` : '') +
      (quote
        ? `<blockquote class="cn-embed-quote">` +
            `<span class="cn-embed-label">From the post</span>` +
            esc(quote) +
          `</blockquote>`
        : '') +
      (stats
        ? `<p class="cn-embed-stats"><a href="${esc(permalink)}" rel="nofollow noopener" target="_blank">${esc(stats)}</a></p>`
        : '') +
      `<p class="cn-embed-credit"><a href="${esc(permalink)}" rel="nofollow noopener" target="_blank">${esc(credit)}</a></p>` +
    `</div>`

  return `<figure class="cn-embed" data-platform="${platform}" data-layout="${layout}">${media}${side}</figure>`
}

// instagram.com/p/SHORTCODE/
//
// The credit is the account that posted, taken from the embed itself rather
// than typed in, so it cannot drift from the post or carry a name the post
// does not belong to. Pass `credit` only as a fallback for a shortcode
// Instagram will no longer serve, where there is no handle left to read.
//
// `note` is a line of our own, for when the post needs placing. `quote:
// false` suppresses the harvested caption for a post whose words should not
// be reproduced here.
function instagram(shortcode, { caption, credit, note, quote = true } = {}) {
  const meta = Object.prototype.hasOwnProperty.call(META.instagram, shortcode)
    ? META.instagram[shortcode]
    : { ratio: IG_FALLBACK_RATIO }
  const handle = meta && meta.handle ? `@${meta.handle}` : null
  if (!handle && !credit) throw missingAccount('Instagram post', shortcode, "'@account'")

  // Likes and comment count come straight off the embed, so they are current
  // as of the last harvest rather than invented. Either may be absent.
  const counts = meta ? [meta.likes, meta.commentsLabel].filter(Boolean) : []

  return figure({
    platform: 'instagram',
    src: `https://www.instagram.com/p/${shortcode}/embed/`,
    permalink: `https://www.instagram.com/p/${shortcode}/`,
    title: `Instagram post ${shortcode}`,
    frame: meta === null
      ? `padding-bottom:${IG_BROKEN_HEIGHT}px`
      : aspectBox(meta.ratio || IG_FALLBACK_RATIO, IG_CHROME),
    caption, note,
    credit: handle || credit,
    quote: quote && meta ? meta.caption : undefined,
    stats: counts.length ? counts.join(' · ') : undefined,
  })
}

// tiktok.com/@user/video/ID — a fixed 9:16 player plus TikTok's own caption
// and action rail, which it does not let us measure.
function tiktok(videoId, { caption, credit, permalink, note } = {}) {
  return figure({
    platform: 'tiktok',
    src: `https://www.tiktok.com/embed/v2/${videoId}`,
    permalink: permalink || `https://www.tiktok.com/video/${videoId}`,
    title: `TikTok video ${videoId}`,
    frame: aspectBox(177.78, 180),
    caption, credit, note,
  })
}

// youtube.com/watch?v=ID
function youtube(videoId, { caption, credit, note } = {}) {
  return figure({
    platform: 'youtube',
    src: `https://www.youtube.com/embed/${videoId}`,
    permalink: `https://www.youtube.com/watch?v=${videoId}`,
    title: `YouTube video ${videoId}`,
    frame: aspectBox(56.25, 0),
    layout: 'wide',
    caption, credit, note,
  })
}

// Full permalink to a public Facebook video. Pass `portrait: true` for a
// reel: the plugin letterboxes rather than resizes, so the box has to be told.
function facebookVideo(url, { caption, credit, note, portrait } = {}) {
  const meta = META.facebook[url]
  const page = meta && meta.page ? meta.page : null
  if (!page && !credit) throw missingAccount('Facebook video', url, "'Page Name'")

  return figure({
    platform: 'facebook',
    src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`,
    permalink: url,
    title: 'Facebook video',
    frame: portrait ? aspectBox(177.78, 0) : aspectBox(56.25, 0),
    layout: portrait ? 'side' : 'wide',
    caption, note,
    credit: page || credit,
  })
}

// An account feed has no single-post permalink to embed. Render it as a
// credited link-out rather than faking an embed.
function accountLink(handle, url, platform) {
  return `<a href="${esc(url)}" rel="nofollow noopener" target="_blank">${esc(handle)} on ${esc(platform)}</a>`
}

module.exports = {
  instagram, tiktok, youtube, facebookVideo, accountLink,
  ALLOWED_HOSTS, IG_CHROME, IG_BROKEN_HEIGHT,
}
