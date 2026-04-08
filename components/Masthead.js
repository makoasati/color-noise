import Link from 'next/link'
import { STYLES } from '@/lib/styles'

export default function Masthead() {
  return (
    <header style={STYLES.header}>
      <h1 style={STYLES.masthead}>
        <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 1000,
            color: '#4A6CF7',
            fontSize: 'clamp(41px, 7.95vw, 70px)',
            letterSpacing: '0',
            display: 'block',
          }}>COLOR</span>
          <span style={{ display: 'block', marginTop: '-0.2em' }}>
            <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                fontWeight: 1000,
                fontSize: 'clamp(0px, 3.8vw, 50px)',
                color: '#E73B2F',
                lineHeight: 1,
                marginRight: '-0.25em',
                zIndex: 2,
                position: 'relative',
              }}>&amp;</span>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 1000,
                fontStyle: 'italic',
                marginLeft: '0.3em',
                color: '#F5F1E8',
                fontSize: 'clamp(35px, 7.95vw, 60px)',
                letterSpacing: '0',
              }}>NOISE</span>
            </span>
          </span>
        </Link>
      </h1>
      <div style={STYLES.tagline}>Sight · Sound · Scene </div>
    </header>
  )
}
