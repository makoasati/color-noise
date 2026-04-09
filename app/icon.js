import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default async function Icon() {
  // Fetch Playfair Display Black Italic from Google Fonts
  let fontData = null
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    ).then(r => r.text())
    const fontUrl = css.match(/src: url\((.+?)\) format\('woff2'\)/)?.[1]
    if (fontUrl) fontData = await fetch(fontUrl).then(r => r.arrayBuffer())
  } catch {}

  return new ImageResponse(
    <div
      style={{
        background: '#111111',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          color: '#E73B2F',
          fontSize: 28,
          fontStyle: 'italic',
          fontWeight: 900,
          fontFamily: fontData ? 'Playfair Display' : 'serif',
          lineHeight: 1,
          marginTop: 3,
        }}
      >
        &
      </span>
    </div>,
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Playfair Display', data: fontData, style: 'italic', weight: 900 }]
        : [],
    }
  )
}
