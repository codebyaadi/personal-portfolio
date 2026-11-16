import Image from 'next/image';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { personal, stats, work } from '@/constants';
import { cssVars } from '@/lib/utils';
import { HeroLens } from './hero-lens';
import { LocalClock } from './local-clock';

/**
 * The cover sheet. It renders twice: once as the surface, and once more in
 * the opposite ink as the "construction drawing" underneath, which is only
 * visible through the lens (see HeroLens). Same markup, so the two layers
 * register exactly.
 */
export function Hero() {
  return (
    <section id='home' aria-labelledby='home-heading'>
      <HeroLens>
        <HeroSheet />
        <div className='lens-under sheet-alt' aria-hidden inert>
          <HeroSheet under />
        </div>
      </HeroLens>
      <Marquee />
    </section>
  );
}

const zonesX = ['1', '2', '3', '4', '5', '6', '7', '8'];
const zonesY = ['A', 'B', 'C', 'D', 'E'];

function HeroSheet({ under = false }: { under?: boolean }) {
  const current = work[0];
  const Name = under ? 'div' : 'h1';

  return (
    <div className='hero-sheet sheet-grid bg-background'>
      {/* Sheet border with zone marks */}
      <div className='border-border-strong pointer-events-none absolute inset-x-3 top-[4.25rem] bottom-3 border sm:inset-x-5 sm:bottom-5'>
        <div className='zones zones-x hidden md:flex'>
          {zonesX.map((z) => (
            <span key={z}>{z}</span>
          ))}
        </div>
        <div className='zones zones-y hidden md:flex'>
          {zonesY.map((z) => (
            <span key={z}>{z}</span>
          ))}
        </div>
      </div>

      <div className='relative mx-auto flex w-full max-w-[90rem] flex-1 flex-col px-7 pt-9 pb-9 sm:px-12 sm:pb-12 md:pt-14 md:pl-[4.5rem]'>
        {/* Annotation strip */}
        <div className='label animate-fade-rise flex flex-wrap items-center gap-x-8 gap-y-2'>
          <span>
            <span className='text-accent-text'>Sheet 01</span>
            <span className='mx-2 opacity-50'>/</span>
            {under ? 'Construction lines' : 'Cover'}
          </span>
          <span className='hidden sm:inline'>
            Dwg no. <span className='text-muted'>AR—2026—B</span>
          </span>
          <span className='text-foreground ml-auto inline-flex items-center gap-2'>
            <span
              className='border-accent inline-block size-2.5 rounded-full border-[1.5px]'
              aria-hidden
            />
            <span className='hidden [@media(hover:hover)]:inline'>
              X-ray lens — move to inspect, hold to widen
            </span>
            <span className='[@media(hover:hover)]:hidden'>
              X-ray lens — on autopilot
            </span>
          </span>
        </div>

        {/* Name + portrait */}
        <div className='relative mt-8 sm:mt-10'>
          <Name
            id={under ? undefined : 'home-heading'}
            className='display hero-name text-[clamp(4.25rem,22vw,9rem)] lg:text-[clamp(9rem,15.5vw,16rem)]'
          >
            <span className='line-mask'>
              <span className='relative' style={cssVars({ '--delay': '80ms' })}>
                Aditya
                <Guides />
              </span>
            </span>
            <span className='line-mask'>
              <span
                className='relative'
                style={cssVars({ '--delay': '180ms' })}
              >
                Rajbhar<span className='text-accent'>.</span>
                <Guides />
              </span>
            </span>
          </Name>

          <figure
            className='animate-fade-rise mt-9 w-[min(100%,15rem)] lg:absolute lg:top-1 lg:right-0 lg:mt-0 lg:w-[clamp(12rem,15vw,15.5rem)]'
            style={cssVars({ '--delay': '320ms' })}
          >
            <div className='border-border-strong duotone aspect-square border'>
              <Image
                src={personal.avatarUrl}
                alt={under ? '' : `Portrait of ${personal.name}`}
                fill
                priority={!under}
                sizes='(min-width: 1024px) 15vw, 240px'
                className='object-cover object-[50%_30%]'
              />
            </div>
            <figcaption className='mt-2.5'>
              <span className='dim'>
                {under ? 'Section A—A' : 'Fig. 0 — The engineer'}
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Pitch + title block */}
        <div className='mt-12 grid items-end gap-10 lg:mt-auto lg:grid-cols-12 lg:pt-12'>
          <div
            className='animate-fade-rise lg:col-span-6'
            style={cssVars({ '--delay': '420ms' })}
          >
            <p className='max-w-[38rem] text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.25] font-medium tracking-tight'>
              I build software that{' '}
              <span className='aside text-accent-text text-[1.14em]'>
                holds up under load
              </span>{' '}
              — considered interfaces, honest APIs, and systems that scale{' '}
              <span className='aside text-[1.14em]'>without drama.</span>
            </p>
            <div className='mt-8 flex flex-wrap gap-4'>
              <a href='#projects' className='btn btn-primary'>
                See the systems
                <ArrowDown className='size-3.5' aria-hidden />
              </a>
              <a href='#contact' className='btn'>
                Get in touch
                <ArrowUpRight className='size-3.5' aria-hidden />
              </a>
            </div>
          </div>

          {/* Title block, as on the corner of every engineering drawing */}
          <dl
            className='animate-fade-rise border-border-strong bg-background grid grid-cols-6 border text-sm lg:col-span-5 lg:col-start-8'
            style={cssVars({ '--delay': '520ms' })}
          >
            <Cell label='Drawn by' className='col-span-3'>
              {personal.name}
            </Cell>
            <Cell label='Role' className='col-span-3 border-l'>
              {personal.role}
            </Cell>
            <Cell label='Currently' className='col-span-3 border-t'>
              {current.company}
            </Cell>
            <Cell label='Local time' className='col-span-3 border-t border-l'>
              <LocalClock />
            </Cell>
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`border-border-strong col-span-2 border-t px-3 py-2.5 ${i > 0 ? 'border-l' : ''}`}
              >
                <dd className='display text-[clamp(2rem,3.4vw,3rem)]'>
                  {s.value}
                </dd>
                <dt className='label mt-1 text-[0.5625rem] sm:text-[0.625rem]'>
                  {s.label}
                </dt>
              </div>
            ))}
            <div className='border-border-strong bg-accent text-accent-contrast col-span-6 flex items-center justify-between gap-4 border-t px-3 py-2.5 font-mono text-[0.6875rem] font-semibold tracking-[0.12em] uppercase'>
              <span className='inline-flex items-center gap-2'>
                <span
                  className='dot'
                  style={cssVars({ '--dot': 'var(--accent-contrast)' })}
                  aria-hidden
                />
                {personal.availability}
              </span>
              <span>Scale 1:1</span>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

function Cell({
  label,
  className = '',
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`border-border-strong px-3 py-2.5 ${className}`}>
      <dt className='label text-[0.5625rem] sm:text-[0.625rem]'>{label}</dt>
      <dd className='mt-0.5 leading-snug font-medium'>{children}</dd>
    </div>
  );
}

/** Type-construction guides, only drawn on the sheet under the lens. */
function Guides() {
  return (
    <span className='under-only' aria-hidden>
      <span className='guide' style={{ top: '0.12em' }}>
        <span>cap</span>
      </span>
      <span className='guide' style={{ top: '0.33em' }}>
        <span>x-height</span>
      </span>
      <span className='guide' style={{ top: '0.81em' }}>
        <span>baseline</span>
      </span>
    </span>
  );
}

const beats = [
  'Full-stack product',
  'Distributed systems',
  'AI agents',
  'Voice pipelines',
  'Infrastructure',
];

/** Vermilion ticker of what the work is actually about. */
function Marquee() {
  const row = (hidden: boolean) => (
    <div className='flex shrink-0 items-center' aria-hidden={hidden}>
      {beats.map((b) => (
        <span key={b} className='flex items-center'>
          <span className='aside px-6 text-[clamp(2.25rem,5vw,4.25rem)] leading-none sm:px-9'>
            {b}
          </span>
          <span
            className='spin-slow inline-block text-2xl sm:text-3xl'
            aria-hidden
          >
            ✳
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className='marquee bg-accent text-accent-contrast overflow-hidden py-4 sm:py-5'>
      <div className='marquee-track'>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
