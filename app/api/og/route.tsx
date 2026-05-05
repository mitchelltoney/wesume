import { ImageResponse } from 'next/og'
import { siteData } from '@/lib/data'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '80px',
        background: '#0c0c0c',
        fontFamily: 'serif',
      }}
    >
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '18px',
            color: '#a3e635',
            margin: 0,
            letterSpacing: '0.05em',
          }}
        >
          {siteData.location}
        </p>
        <h1
          style={{
            fontSize: '88px',
            fontWeight: 900,
            color: '#f0ece4',
            margin: 0,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {siteData.name}
        </h1>
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '20px',
            color: 'rgba(240,236,228,0.45)',
            margin: 0,
          }}
        >
          {siteData.tagline}
        </p>
      </div>
    </div>,
    { width: 1200, height: 630 }
  )
}
