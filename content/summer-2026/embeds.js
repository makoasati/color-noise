// Social post embeds for article bodies.
//
// WHY IFRAMES AND NOT THE OFFICIAL EMBED CODES:
// app/article/[slug]/page.js renders the body with dangerouslySetInnerHTML.
// Scripts injected that way never execute, so Instagram's blockquote +
// embed.js and X's widgets.js approach cannot work here. Every platform
// below is therefore addressed through its script-free iframe endpoint,
// each verified to return real post content on 2026-09-30.
//
// LIMITS, STATED PLAINLY:
//  - An embed is not a hosted image. If the creator deletes the post or
//    flips the account private, the article loses that visual. Never put
//    information the article depends on inside an embed.
//  - Embeds cannot fill `cover_image`. That field needs a real hosted URL,
//    so covers must still come from Commons, Choose Chicago or DVIDS.
//  - Instagram's /embed/ endpoint is undocumented and has been restricted
//    before. Assume it will break eventually and keep the permalink in the
//    caption so the credit survives the iframe.
//  - X/Twitter has no script-free iframe. Link those, do not embed them.

const ALLOWED_HOSTS = [
  'www.instagram.com',
  'www.tiktok.com',
  'www.youtube.com',
  'www.facebook.com',
]

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Every embed carries a visible credit line with a live permalink, so the
// attribution outlives the iframe even if the platform stops serving it.
function figure({ platform, src, height, title, caption, credit, permalink, responsive }) {
  const host = new URL(src).host
  if (!ALLOWED_HOSTS.includes(host)) throw new Error(`Embed host not allowed: ${host}`)
  if (!caption) throw new Error(`Embed missing caption: ${src}`)
  if (!credit)  throw new Error(`Embed missing credit: ${src}`)

  const frame = responsive
    ? `<div style="position:relative;width:100%;padding-bottom:56.25%"><iframe src="${esc(src)}" title="${esc(title)}" loading="lazy" frameborder="0" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%"></iframe></div>`
    : `<iframe src="${esc(src)}" title="${esc(title)}" loading="lazy" frameborder="0" scrolling="no" allowfullscreen style="width:100%;max-width:560px;height:${height}px;border:none;display:block;margin:0 auto"></iframe>`

  return `<figure class="cn-embed" data-platform="${platform}">${frame}<figcaption>${esc(caption)} — <a href="${esc(permalink)}" rel="nofollow noopener" target="_blank">${esc(credit)}</a></figcaption></figure>`
}

// instagram.com/p/SHORTCODE/
function instagram(shortcode, { caption, credit }) {
  return figure({
    platform: 'instagram',
    src: `https://www.instagram.com/p/${shortcode}/embed/`,
    permalink: `https://www.instagram.com/p/${shortcode}/`,
    height: 820,
    title: `Instagram post ${shortcode}`,
    caption, credit,
  })
}

// tiktok.com/@user/video/ID
function tiktok(videoId, { caption, credit, permalink }) {
  return figure({
    platform: 'tiktok',
    src: `https://www.tiktok.com/embed/v2/${videoId}`,
    permalink: permalink || `https://www.tiktok.com/video/${videoId}`,
    height: 760,
    title: `TikTok video ${videoId}`,
    caption, credit,
  })
}

// youtube.com/watch?v=ID
function youtube(videoId, { caption, credit }) {
  return figure({
    platform: 'youtube',
    src: `https://www.youtube.com/embed/${videoId}`,
    permalink: `https://www.youtube.com/watch?v=${videoId}`,
    title: `YouTube video ${videoId}`,
    caption, credit,
    responsive: true,
  })
}

// Full permalink to a public Facebook video
function facebookVideo(url, { caption, credit }) {
  return figure({
    platform: 'facebook',
    src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`,
    permalink: url,
    height: 620,
    title: 'Facebook video',
    caption, credit,
  })
}

// An account feed has no single-post permalink to embed. Render it as a
// credited link-out rather than faking an embed.
function accountLink(handle, url, platform) {
  return `<a href="${esc(url)}" rel="nofollow noopener" target="_blank">${esc(handle)} on ${esc(platform)}</a>`
}

module.exports = { instagram, tiktok, youtube, facebookVideo, accountLink, ALLOWED_HOSTS }
