import { ImageResponse } from 'next/og';
import { loadOgFonts, ogFamily } from './og-fonts';

const blue = '#1432c8';
const cream = '#f4efe1';
const vermilion = '#ff5a36';

/**
 * The site mark at any square size: the wordmark's italic "a" in cream on
 * blueprint blue, with the vermilion full stop. Above ~96px it also gets
 * the drawing sheet's inset border and corner registration ticks; below
 * that it stays a bare letter so it holds up at 16px.
 */
export async function renderBrandIcon(size: number) {
  const fonts = await loadOgFonts({ mono: false });
  const detailed = size >= 96;
  const u = size / 100; // work in percent-of-size units

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: blue,
        color: cream,
        fontFamily: ogFamily.display,
      }}
    >
      {detailed ? (
        <div
          style={{
            position: 'absolute',
            left: 7 * u,
            top: 7 * u,
            right: 7 * u,
            bottom: 7 * u,
            border: `${Math.max(1, 0.6 * u)}px solid rgba(244,239,225,0.45)`,
            display: 'flex',
          }}
        />
      ) : null}

      <div
        style={{
          position: 'absolute',
          left: -3 * u,
          top: -12 * u,
          width: 86 * u,
          height: 94 * u,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 96 * u,
          fontStyle: 'italic',
          lineHeight: 1,
        }}
      >
        a
      </div>
      <div
        style={{
          position: 'absolute',
          left: 65 * u,
          top: 55 * u,
          width: 15 * u,
          height: 15 * u,
          borderRadius: 999,
          background: vermilion,
          display: 'flex',
        }}
      />
    </div>,
    { width: size, height: size, fonts }
  );
}
