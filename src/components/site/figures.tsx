import type { ReactNode } from 'react';
import { cn, cssVars } from '@/lib/utils';

/**
 * Architecture figures — one drawing per project, in place of a screenshot.
 * Each shows how the thing actually works; the numbered balloons match the
 * numbered highlights in the project copy, and every label comes from
 * constants/projects.ts. Packets travel the solid edges (SMIL), and the
 * edges draw themselves in when the figure scrolls into view (CSS).
 */
export function ProjectFigure({ slug, n }: { slug: string; n: number }) {
  switch (slug) {
    case 'upzy':
      return <UpzyFigure n={n} />;
    case 'lookfar':
      return <LookfarFigure n={n} />;
    case 'avni':
      return <AvniFigure n={n} />;
    case 'keel':
      return <KeelFigure n={n} />;
    default:
      return null;
  }
}

/* --- Primitives ---------------------------------------------------------- */

function Fig({
  id,
  n,
  title,
  alt,
  height,
  children,
}: {
  id: string;
  n: number;
  title: string;
  alt: string;
  height: number;
  children: ReactNode;
}) {
  return (
    <figure className='border-border-strong bg-background sheet-grid border shadow-[10px_10px_0_0_var(--border)]'>
      <figcaption className='label border-border-strong bg-background flex items-center justify-between gap-4 border-b px-4 py-2.5'>
        <span>
          <span className='text-accent-text'>Fig. {n}</span>
          <span className='mx-2 opacity-50'>—</span>
          {title}
        </span>
        <span className='hidden sm:inline'>Not to scale</span>
        <span className='sm:hidden'>Pan →</span>
      </figcaption>
      <div className='overflow-x-auto'>
        <div className='min-w-[33rem] p-4 sm:p-6'>
          <svg
            viewBox={`0 0 640 ${height}`}
            className='fig'
            role='img'
            aria-label={alt}
          >
            <defs>
              <marker
                id={`${id}-arrow`}
                markerWidth='8'
                markerHeight='8'
                refX='7'
                refY='4'
                orient='auto'
              >
                <path d='M0 0.5 L8 4 L0 7.5 z' className='fig-arrow' />
              </marker>
            </defs>
            {children}
          </svg>
        </div>
      </div>
    </figure>
  );
}

function Node({
  x,
  y,
  w,
  h,
  title,
  sub,
  accent,
  ghost,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  accent?: boolean;
  ghost?: boolean;
}) {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        className={
          accent
            ? 'fig-node fig-node-accent'
            : ghost
              ? 'fig-node-ghost'
              : 'fig-node'
        }
      />
      <text
        x={cx}
        y={sub ? y + h / 2 - 2 : y + h / 2 + 4}
        textAnchor='middle'
        className={cn('fig-t', accent && 'fig-on-accent')}
      >
        {title}
      </text>
      {sub ? (
        <text
          x={cx}
          y={y + h / 2 + 12}
          textAnchor='middle'
          className={cn('fig-s', accent && 'fig-on-accent')}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Edge({
  id,
  d,
  dashed,
  flow,
  dur = 2.6,
  begin = 0,
  arrow = true,
}: {
  id: string;
  d: string;
  dashed?: boolean;
  flow?: boolean;
  dur?: number;
  begin?: number;
  arrow?: boolean;
}) {
  return (
    <>
      <path
        d={d}
        pathLength={dashed ? undefined : 1}
        className={cn('fig-edge', dashed && 'fig-edge-dashed')}
        markerEnd={arrow ? `url(#${id}-arrow)` : undefined}
      />
      {flow ? (
        <circle r='3.5' className='fig-pkt'>
          <animateMotion
            dur={`${dur}s`}
            begin={`${begin}s`}
            repeatCount='indefinite'
            path={d}
          />
        </circle>
      ) : null}
    </>
  );
}

function Balloon({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r='10' className='fig-balloon' />
      <text x={x} y={y + 4} textAnchor='middle' className='fig-balloon-t'>
        {n}
      </text>
    </g>
  );
}

function Note({
  x,
  y,
  anchor = 'start',
  children,
}: {
  x: number;
  y: number;
  anchor?: 'start' | 'middle' | 'end';
  children: ReactNode;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className='fig-note'>
      {children}
    </text>
  );
}

/* --- Fig. 1 · Upzy: probe, grade, verify --------------------------------- */

const probes = [
  { name: 'HTTP', y: 20 },
  { name: 'TCP', y: 64 },
  { name: 'DNS', y: 108 },
  { name: 'SSL', y: 152 },
];

function UpzyFigure({ n }: { n: number }) {
  const id = 'fig-upzy';
  return (
    <Fig
      id={id}
      n={n}
      height={320}
      title='Upzy — probe, grade, verify'
      alt='Upzy architecture: a scheduler fires HTTP, TCP, DNS and SSL probes at a pinned address every 60 seconds; a passive scan grades the site A to F and each finding comes with a fix that can be re-verified.'
    >
      <Node x={20} y={70} w={120} h={52} title='scheduler' sub='every 60 s' />
      {probes.map((p, i) => (
        <g key={p.name}>
          <Edge
            id={id}
            d={`M140 96 H175 V${p.y + 17} H210`}
            flow
            dur={1.8}
            begin={i * 0.45}
          />
          <Node x={210} y={p.y} w={80} h={34} title={p.name} />
          <Edge
            id={id}
            d={`M290 ${p.y + 17} H345 V96 H400`}
            flow
            dur={2.2}
            begin={0.9 + i * 0.45}
          />
        </g>
      ))}
      <Node
        x={400}
        y={64}
        w={180}
        h={64}
        title='your-site.com'
        sub='address pinned at connect time'
      />

      <Edge id={id} d='M490 128 V250' dashed />
      <Note x={498} y={192}>
        external surface
      </Note>
      <Node
        x={400}
        y={250}
        w={180}
        h={52}
        title='passive scan'
        sub='certs · headers · DMARC · CVEs'
      />
      <Edge id={id} d='M400 287 H366' />

      {/* A–F grade */}
      <Note x={212} y={244}>
        graded a to f
      </Note>
      <rect
        x={212}
        y={254}
        width={44}
        height={44}
        className='fig-node fig-node-accent'
      />
      <text
        x={234}
        y={288}
        textAnchor='middle'
        className='fig-big fig-on-accent'
      >
        A
      </text>
      {['B', 'C', 'D', 'F'].map((g, i) => (
        <g key={g}>
          <rect
            x={262 + i * 26}
            y={276}
            width={22}
            height={22}
            className='fig-node'
          />
          <text
            x={273 + i * 26}
            y={291}
            textAnchor='middle'
            className='fig-s'
            style={{ fontSize: 10 }}
          >
            {g}
          </text>
        </g>
      ))}

      <Edge id={id} d='M212 276 H174' />
      <Node
        x={20}
        y={250}
        w={150}
        h={52}
        title='finding + exact fix'
        sub='for your stack'
      />
      <Edge id={id} d='M80 250 V126' dashed />
      <Note x={88} y={192}>
        verify fix ↻
      </Note>

      <Balloon x={290} y={20} n={1} />
      <Balloon x={256} y={254} n={2} />
      <Balloon x={580} y={64} n={3} />
    </Fig>
  );
}

/* --- Fig. 2 · Lookfar: the free gate before any model -------------------- */

function LookfarFigure({ n }: { n: number }) {
  const id = 'fig-lookfar';
  return (
    <Fig
      id={id}
      n={n}
      height={330}
      title='Lookfar — no change, no tokens'
      alt='Lookfar pipeline: sources are fetched, normalised, hashed and diffed; with no change the run stops before any model is called. Changes go to a model and a report, and side effects wait in an approvals inbox. A Postgres job queue schedules the fetches.'
    >
      <Node
        x={16}
        y={36}
        w={104}
        h={52}
        title='sources'
        sub='pages · feeds · repos'
      />
      <Edge id={id} d='M120 62 H150' flow dur={1} />
      <Node x={150} y={44} w={70} h={36} title='fetch' />
      <Edge id={id} d='M220 62 H250' flow dur={1} begin={0.5} />
      <Node x={250} y={44} w={92} h={36} title='normalise' />
      <Edge id={id} d='M342 62 H372' flow dur={1} begin={1} />
      <Node x={372} y={44} w={64} h={36} title='hash' />
      <Edge id={id} d='M436 62 H466' flow dur={1} begin={1.5} />

      {/* Diff gate */}
      <polygon points='500,30 534,62 500,94 466,62' className='fig-node' />
      <text x={500} y={66} textAnchor='middle' className='fig-t'>
        diff?
      </text>

      <Edge id={id} d='M534 62 H588' />
      <Note x={561} y={54} anchor='middle'>
        same
      </Note>
      <circle cx={606} cy={62} r={15} className='fig-node' />
      <circle cx={606} cy={62} r={8} className='fig-balloon' />
      <Note x={606} y={96} anchor='middle'>
        stop · 0 tokens
      </Note>

      <Edge id={id} d='M500 94 V150' flow dur={1.6} begin={2} />
      <Note x={508} y={126}>
        changed
      </Note>
      <Node
        x={440}
        y={150}
        w={120}
        h={52}
        title='model'
        sub='only what matters'
      />
      <Edge id={id} d='M500 202 V262' />
      <Node x={440} y={262} w={120} h={44} title='report' />

      <Edge id={id} d='M440 176 H400' />
      <Node
        x={236}
        y={150}
        w={160}
        h={52}
        title='approvals inbox'
        sub='exact payload shown'
        accent
      />
      <Edge id={id} d='M236 176 H194' dashed />
      <Node
        x={70}
        y={150}
        w={120}
        h={52}
        title='act'
        sub='only after a yes'
        ghost
      />

      <Node
        x={16}
        y={262}
        w={250}
        h={52}
        title='postgres job queue'
        sub='FOR UPDATE SKIP LOCKED'
      />
      <Edge id={id} d='M213 262 V84' dashed />
      <Note x={221} y={232}>
        schedules
      </Note>

      <Balloon x={528} y={36} n={1} />
      <Balloon x={396} y={150} n={2} />
      <Balloon x={266} y={262} n={3} />
    </Fig>
  );
}

/* --- Fig. 3 · Avni: the cheapest tier that can answer -------------------- */

const tiers = [
  { name: 'T0 · on-device rules', y: 14, dur: 1.1 },
  { name: 'T1 · fast LLM', y: 62, dur: 1.9 },
  { name: 'T2 · strong LLM', y: 110, dur: 3 },
  { name: 'T3 · background agent jobs', y: 158, dur: 4.6 },
];
const voice = [14, 30, 48, 26, 58, 34, 50, 22, 12];

function AvniFigure({ n }: { n: number }) {
  const id = 'fig-avni';
  return (
    <Fig
      id={id}
      n={n}
      height={312}
      title='Avni — cheapest tier that can answer'
      alt='Avni architecture: speech goes through speech-to-text into a Rust core that routes each request to one of four tiers — on-device rules, a fast LLM, a strong LLM or background agent jobs — then replies through text-to-speech in about one second. Tools and providers plug in over MCP.'
    >
      {voice.map((h, i) => (
        <rect
          key={i}
          x={20 + i * 10}
          y={120 - h / 2}
          width={5}
          height={h}
          rx={2.5}
          className='fig-wave'
          style={cssVars({
            '--dur': `${0.9 + ((i * 3) % 5) / 10}s`,
            '--delay': `-${(i * 7) % 10 / 10}s`,
          })}
        />
      ))}
      <Note x={62} y={170} anchor='middle'>
        speech
      </Note>
      <Edge id={id} d='M110 120 H128' />
      <Node x={128} y={100} w={64} h={40} title='STT' />
      <Edge id={id} d='M192 120 H232' flow dur={1.2} />
      <Node
        x={232}
        y={84}
        w={140}
        h={72}
        title='rust core'
        sub='tiered router'
        accent
      />

      {tiers.map((t, i) => (
        <g key={t.name}>
          <Edge
            id={id}
            d={`M372 120 H406 V${t.y + 17} H440`}
            flow
            dur={t.dur}
            begin={i * 0.3}
          />
          <Node x={440} y={t.y} w={184} h={34} title={t.name} />
        </g>
      ))}
      <Note x={440} y={210}>
        slower + costlier ↓
      </Note>

      <Edge id={id} d='M302 156 V220' flow dur={1.4} begin={0.6} />
      <Node x={270} y={220} w={64} h={40} title='TTS' />
      <Edge id={id} d='M270 240 H196' />
      <text x={56} y={252} className='fig-big'>
        ≈1.0 s
      </text>
      <Note x={56} y={272}>
        p50 · stt done → first reply
      </Note>

      <Node
        x={440}
        y={250}
        w={184}
        h={44}
        title='MCP tools & skills'
        sub='swappable STT · TTS · LLM'
        ghost
      />
      <Edge id={id} d='M440 272 H350 V160' dashed />

      <Balloon x={44} y={222} n={1} />
      <Balloon x={372} y={84} n={2} />
      <Balloon x={624} y={250} n={3} />
    </Fig>
  );
}

/* --- Fig. 4 · Keel: the monorepo you'd otherwise rebuild ----------------- */

const packages = [
  { name: 'packages/db', sub: 'Prisma 8' },
  { name: 'packages/auth', sub: 'Better Auth · orgs' },
  { name: 'packages/email', sub: 'React Email' },
  { name: 'packages/ui', sub: 'shared kit' },
  { name: 'packages/env', sub: 'zod-validated' },
];

function KeelFigure({ n }: { n: number }) {
  const id = 'fig-keel';
  return (
    <Fig
      id={id}
      n={n}
      height={318}
      title='Keel — wired once, ready on day one'
      alt='Keel monorepo: an ElysiaJS API on Bun and a Next.js web app sit on shared packages for the database, auth, email, UI kit and validated environment.'
    >
      <Node x={260} y={14} w={120} h={38} title='keel/' accent />
      <Edge id={id} d='M320 52 V74 H196 V96' />
      <Edge id={id} d='M320 52 V74 H444 V96' />
      <Node
        x={96}
        y={96}
        w={200}
        h={52}
        title='apps/api'
        sub='ElysiaJS on Bun'
      />
      <Node
        x={344}
        y={96}
        w={200}
        h={52}
        title='apps/web'
        sub='Next.js App Router'
      />
      <Edge id={id} d='M196 148 V190' arrow={false} />
      <Edge id={id} d='M444 148 V190' arrow={false} />
      <Edge id={id} d='M70 190 H566' arrow={false} />
      {packages.map((p, i) => {
        const cx = 70 + i * 124;
        return (
          <g key={p.name}>
            <Edge
              id={id}
              d={`M${cx} 190 V226`}
              flow
              dur={1.6}
              begin={i * 0.32}
            />
            <Node
              x={cx - 56}
              y={226}
              w={112}
              h={52}
              title={p.name}
              sub={p.sub}
            />
          </g>
        );
      })}
      <Note x={14} y={308}>
        ✓ typed api · auth · email · ui · env — before the first feature
      </Note>

      <Balloon x={296} y={96} n={1} />
      <Balloon x={250} y={226} n={2} />
      <Balloon x={622} y={226} n={3} />
    </Fig>
  );
}
