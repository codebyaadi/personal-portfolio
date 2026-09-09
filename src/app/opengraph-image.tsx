import { ImageResponse } from 'next/og';
import { personal } from '@/constants';

export const alt = `${personal.name} — ${personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px',
        background:
          'radial-gradient(1000px 500px at 20% 0%, #10353b 0%, #17181c 55%)',
        color: '#f5f6f7',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 26,
          letterSpacing: 2,
          color: '#5fd4d6',
        }}
      >
        {personal.tagline.toUpperCase()}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -3 }}>
          {personal.name}
        </div>
        <div style={{ fontSize: 34, color: '#a9adb3', maxWidth: 780 }}>
          {personal.headline}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 24,
          color: '#8b9096',
        }}
      >
        <span>codebyaadi.com</span>
        <span>@codebyaadi</span>
      </div>
    </div>,
    size
  );
}
