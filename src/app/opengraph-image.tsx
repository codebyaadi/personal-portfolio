import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { personal } from '@/constants';

export const alt = `${personal.name} — ${personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Token hexes approximating the site's dark OKLCH palette (globals.css),
// since satori needs plain colors rather than oklch()/CSS variables.
const bg = '#131316';
const bgGlow = '#10353b';
const text = '#f5f6f7';
const muted = '#a9adb3';
const faint = '#8b9096';
const border = 'rgba(255,255,255,0.12)';
const accent = '#5fd4d6';

const fontsDir = path.join(process.cwd(), 'src', 'app', 'fonts');
const loadFont = (file: string) => readFile(path.join(fontsDir, file));

export default async function OpenGraphImage() {
  const [regular, semibold, extrabold] = await Promise.all([
    loadFont('Sora-Regular.ttf'),
    loadFont('Sora-SemiBold.ttf'),
    loadFont('Sora-ExtraBold.ttf'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: `radial-gradient(1100px 560px at 12% -8%, ${bgGlow} 0%, ${bg} 55%)`,
          color: text,
          fontFamily: 'Sora',
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', fontSize: 30, fontWeight: 800 }}>
          aadi<span style={{ color: accent }}>.</span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 3,
              color: accent,
            }}
          >
            <span
              style={{
                display: 'flex',
                width: 10,
                height: 10,
                borderRadius: 999,
                background: accent,
              }}
            />
            {personal.tagline.toUpperCase()}
          </div>

          <div
            style={{
              display: 'flex',
              marginTop: 20,
              fontSize: 96,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            {personal.name}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 14,
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.05,
              textTransform: 'uppercase',
              letterSpacing: -1,
            }}
          >
            <span style={{ display: 'flex' }}>Software</span>
            <span style={{ display: 'flex', color: faint }}>
              Engineer, full-stack
            </span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${border}`,
            paddingTop: 28,
            fontSize: 26,
            color: muted,
          }}
        >
          <span style={{ display: 'flex' }}>codebyaadi.com</span>
          <span style={{ display: 'flex' }}>@codebyaadi</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Sora', data: regular, weight: 400, style: 'normal' },
        { name: 'Sora', data: semibold, weight: 600, style: 'normal' },
        { name: 'Sora', data: extrabold, weight: 800, style: 'normal' },
      ],
    }
  );
}
