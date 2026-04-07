import Link from 'next/link'
import { STYLES } from '@/lib/styles'

export default function Masthead() {
  return (
    <header style={STYLES.header}>
      <Link href="/" style={{ ...STYLES.mastheadWrapper, textDecoration: 'none' }}>
        <div style={STYLES.mastheadLine1}>COLOR</div>
        <div style={STYLES.mastheadLine2Outer}>
          <span style={STYLES.mastheadAmpersand}>&amp;</span>
          <span style={STYLES.mastheadNoise}>Noise</span>
        </div>
      </Link>
      <div style={STYLES.tagline}>Sight, sound, scene</div>
    </header>
  )
}
