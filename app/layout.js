import './globals.css'

export const metadata = {
  title: 'Color&Noise — Chicago',
  description: 'Sight, sound, scene',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:ital,wght@0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&family=Outfit:wght@700;900&family=Playfair+Display:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "'DM Sans', sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
