import { ImageResponse } from 'next/og';
import { personal, work } from '@/constants';
import { loadOgFonts, ogFamily } from '@/lib/og-fonts';

export const alt = `${personal.name} — ${personal.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The site's two inks and paper (globals.css), as plain hexes for satori.
const blueprint = {
  bg: '#1432c8',
  text: '#f4efe1',
  faint: '#a9b3ec',
  line: 'rgba(244,239,225,0.55)',
  grid: 'rgba(244,239,225,0.08)',
  gridMajor: 'rgba(244,239,225,0.16)',
  accent: '#ff5a36',
  accentText: '#ffb09a',
};
const paper: typeof blueprint = {
  bg: '#f1ecdd',
  text: '#1226b0',
  faint: '#5b69c2',
  line: 'rgba(18,38,176,0.6)',
  grid: 'rgba(18,38,176,0.09)',
  gridMajor: 'rgba(18,38,176,0.2)',
  accent: '#f04e23',
  accentText: '#c2330f',
};
const navy = '#091259';

const beats = [
  'Full-stack product',
  'Distributed systems',
  'AI agents',
  'Voice pipelines',
  'Infrastructure',
];

/** Lens position and radius, in card pixels. */
const lens = { x: 596, y: 326, r: 150 };

const label = {
  display: 'flex',
  fontFamily: ogFamily.mono,
  fontSize: 17,
  letterSpacing: 3,
  textTransform: 'uppercase',
} as const;

/**
 * The whole card in one ink. Rendered twice: once as the blueprint, and
 * once on paper, clipped to the lens — the same trick as the site's hero.
 */
function Sheet({ c, under = false }: { c: typeof blueprint; under?: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: size.width,
        height: size.height,
        display: 'flex',
        background: c.bg,
        color: c.text,
      }}
    >
      {/* Drafting grid: one gradient per layer keeps satori happy */}
      {[
        { dir: 'to right', color: c.grid, step: 30 },
        { dir: 'to bottom', color: c.grid, step: 30 },
        { dir: 'to right', color: c.gridMajor, step: 150 },
        { dir: 'to bottom', color: c.gridMajor, step: 150 },
      ].map((g, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: size.width,
            height: size.height,
            display: 'flex',
            backgroundImage: `linear-gradient(${g.dir}, ${g.color} 1px, transparent 1px)`,
            backgroundSize: `${g.step}px ${g.step}px`,
          }}
        />
      ))}
      {/* Sheet border */}
      <div
        style={{
          position: 'absolute',
          left: 26,
          top: 26,
          right: 26,
          bottom: 26,
          display: 'flex',
          border: `1.5px solid ${c.line}`,
        }}
      />

      {/* Annotation strip */}
      <div
        style={{
          ...label,
          position: 'absolute',
          left: 64,
          top: 56,
          right: 64,
          justifyContent: 'space-between',
          color: c.faint,
        }}
      >
        <div style={{ display: 'flex' }}>
          <span style={{ color: c.accentText }}>Sheet 01</span>
          <span style={{ margin: '0 12px', opacity: 0.6 }}>/</span>
          <span>{under ? 'Construction lines' : 'Cover'}</span>
        </div>
        <span>codebyaadi.com</span>
      </div>

      {/* Name */}
      <div
        style={{
          position: 'absolute',
          left: 58,
          top: 96,
          display: 'flex',
          flexDirection: 'column',
          fontFamily: ogFamily.display,
          fontSize: 230,
          lineHeight: 0.88,
          letterSpacing: -8,
        }}
      >
        <span>Aditya</span>
        <div style={{ display: 'flex' }}>
          <span>Rajbhar</span>
          <span style={{ color: c.accent }}>.</span>
        </div>
      </div>

      {/* Type-construction guides, only on the sheet under the lens */}
      {under
        ? [114, 172, 277, 316, 374, 479].map((y) => (
            <div
              key={y}
              style={{
                position: 'absolute',
                left: 0,
                top: y,
                width: size.width,
                height: 0,
                display: 'flex',
                borderTop: `1.5px dashed ${c.accent}`,
              }}
            />
          ))
        : null}

      {/* What the work is about, as a numbered list */}
      <div
        style={{
          position: 'absolute',
          right: 64,
          top: 118,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
      >
        {beats.map((b, i) => (
          <div
            key={b}
            style={{
              ...label,
              fontSize: 16,
              padding: '9px 0',
              width: 292,
              justifyContent: 'space-between',
              borderBottom: `1.5px solid ${c.grid}`,
              color: c.text,
            }}
          >
            <span style={{ color: c.accentText }}>0{i + 1}</span>
            <span>{b}</span>
          </div>
        ))}
      </div>

      {/* Pitch */}
      <div
        style={{
          position: 'absolute',
          left: 64,
          bottom: 48,
          display: 'flex',
          fontFamily: ogFamily.display,
          fontSize: 34,
          letterSpacing: -0.8,
        }}
      >
        <span>Software that&nbsp;</span>
        <span style={{ fontStyle: 'italic', color: c.accentText }}>
          holds up under load.
        </span>
      </div>

      {/* Title block */}
      <div
        style={{
          position: 'absolute',
          right: 64,
          bottom: 62,
          width: 396,
          display: 'flex',
          flexDirection: 'column',
          border: `1.5px solid ${c.line}`,
          background: c.bg,
        }}
      >
        <div style={{ display: 'flex' }}>
          <Cell c={c} label='Role' value={personal.role} />
          <Cell c={c} label='Currently' value={work[0].company} divider />
        </div>
        <div
          style={{
            ...label,
            fontSize: 14,
            letterSpacing: 2,
            justifyContent: 'space-between',
            padding: '11px 16px',
            background: c.accent,
            color: navy,
          }}
        >
          <span>{personal.availability}</span>
          <span>@{personal.username}</span>
        </div>
      </div>
    </div>
  );
}

function Cell({
  c,
  label: name,
  value,
  divider = false,
}: {
  c: typeof blueprint;
  label: string;
  value: string;
  divider?: boolean;
}) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '12px 16px 14px',
        ...(divider ? { borderLeft: `1.5px solid ${c.line}` } : {}),
      }}
    >
      <span style={{ ...label, fontSize: 13, color: c.faint }}>{name}</span>
      <span
        style={{
          marginTop: 5,
          fontFamily: ogFamily.sans,
          fontSize: 20,
          letterSpacing: -0.3,
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default async function OpenGraphImage() {
  const fonts = await loadOgFonts();
  const d = lens.r * 2;

  return new ImageResponse(
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
      }}
    >
      <Sheet c={blueprint} />

      {/* The lens: a circular window onto the paper sheet */}
      <div
        style={{
          position: 'absolute',
          left: lens.x - lens.r,
          top: lens.y - lens.r,
          width: d,
          height: d,
          display: 'flex',
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: -(lens.x - lens.r),
            top: -(lens.y - lens.r),
            width: size.width,
            height: size.height,
            display: 'flex',
          }}
        >
          <Sheet c={paper} under />
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          left: lens.x - lens.r - 3,
          top: lens.y - lens.r - 3,
          width: d + 6,
          height: d + 6,
          display: 'flex',
          borderRadius: 999,
          border: `3px solid ${blueprint.accent}`,
          boxShadow: '0 0 0 9px rgba(255,90,54,0.16)',
        }}
      />
      {/* Crosshair ticks on the rim */}
      {[
        { left: lens.x - 1.5, top: lens.y - lens.r - 16, w: 3, h: 30 },
        { left: lens.x - 1.5, top: lens.y + lens.r - 14, w: 3, h: 30 },
        { left: lens.x - lens.r - 16, top: lens.y - 1.5, w: 30, h: 3 },
        { left: lens.x + lens.r - 14, top: lens.y - 1.5, w: 30, h: 3 },
      ].map((t, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: t.left,
            top: t.top,
            width: t.w,
            height: t.h,
            display: 'flex',
            background: blueprint.accent,
          }}
        />
      ))}
      {/* Coordinate readout */}
      <div
        style={{
          ...label,
          position: 'absolute',
          left: lens.x + 56,
          top: lens.y - lens.r - 4,
          padding: '6px 10px',
          fontSize: 14,
          letterSpacing: 2,
          background: blueprint.accent,
          color: navy,
        }}
      >
        X {String(lens.x).padStart(4, '0')} · Y{' '}
        {String(lens.y).padStart(4, '0')}
      </div>
    </div>,
    { ...size, fonts }
  );
}
