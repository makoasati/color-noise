import { DARK_ZONE, NOISE_OVERLAY } from '@/lib/styles'

export default function Footer() {
  return (
    <div style={DARK_ZONE}>
      <div style={NOISE_OVERLAY} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        <footer style={{ padding: '40px 0', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Archivo Narrow', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '3px', color: '#8A8A8A', lineHeight: 2.2 }}>
            Color&amp;Noise · Chicago<br />
            Sight · Sound · Scene
          </div>
        </footer>
      </div>
    </div>
  )
}
