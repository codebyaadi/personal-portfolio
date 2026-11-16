'use client';

import { useState } from 'react';
import { BrandIcon, techIcons } from '@/components/icons';
import { skillGroups } from '@/constants';
import { cn, cssVars } from '@/lib/utils';
import { Section } from './section';

/** Layers of the exploded view, top of the stack first. */
const LAYER_ORDER = ['Frontend', 'Backend', 'AI', 'Data', 'Cloud & Infra'];
/** The group drawn as a bolt through every plate rather than as a plate. */
const BOLT = 'Languages';

const notes: Record<string, string> = {
  Frontend: 'What people touch',
  Backend: 'Where the rules live',
  AI: 'Agents, tools and retrieval',
  Data: 'What the system remembers',
  'Cloud & Infra': 'What it all stands on',
  Languages: 'Runs through every layer',
};

/**
 * The stack as an exploded isometric section: one hatched plate per layer,
 * with languages as the bolt that runs through all of them. Hovering a
 * plate or picking a row lifts that layer and lists what it's made of.
 */
export function Skills() {
  const layers = LAYER_ORDER.map(
    (name) => skillGroups.find((g) => g.category === name)!
  ).filter(Boolean);
  const bolt = skillGroups.find((g) => g.category === BOLT);
  const rows = bolt ? [...layers, bolt] : layers;
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0);
  const [active, setActive] = useState(0);

  return (
    <Section
      id='skills'
      index='05'
      label='Stack'
      meta={`Exploded view · ${total} parts`}
      heading={
        <>
          The stack,{' '}
          <span className='aside text-accent text-[1.06em]'>
            in section.
          </span>
        </>
      }
    >
      <div className='grid items-center gap-x-10 gap-y-14 lg:grid-cols-12'>
        {/* Exploded isometric view */}
        <div className='lg:col-span-5' aria-hidden>
          <div
            className='iso'
            style={cssVars({ '--n': layers.length })}
            data-reveal
          >
            {layers.map((g, i) => (
              <button
                key={g.category}
                type='button'
                tabIndex={-1}
                data-active={active === i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`iso-plate hatch-${i}`}
                style={{
                  zIndex: layers.length - i,
                  ...cssVars({ '--i': i }),
                }}
              />
            ))}
            {layers.map((g, i) => (
              <span
                key={g.category}
                className={cn(
                  'iso-tag',
                  active === i ? 'text-accent-text' : 'text-faint'
                )}
                style={cssVars({ '--i': i })}
              >
                L{i + 1}
              </span>
            ))}
            <span
              className='iso-bolt'
              data-active={active === layers.length}
            />
          </div>
          <p className='dim mx-auto mt-6 max-w-sm'>Section B—B · isometric</p>
        </div>

        {/* Layer index */}
        <ol className='border-border-strong border-t lg:col-span-7'>
          {rows.map((g, i) => {
            const open = active === i;
            const isBolt = g.category === BOLT;
            return (
              <li key={g.category} className='border-border-strong border-b'>
                <h3>
                  <button
                    type='button'
                    aria-expanded={open}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={cn(
                      'grid w-full grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-3 px-3 py-4 text-left transition-colors duration-200 sm:grid-cols-[3.5rem_1fr_auto]',
                      open
                        ? 'bg-foreground text-background'
                        : 'hover:bg-surface'
                    )}
                  >
                    <span className='font-mono text-xs opacity-70'>
                      {isBolt ? '⌀' : `L${i + 1}`}
                    </span>
                    <span>
                      <span className='display text-[clamp(1.75rem,3.4vw,2.75rem)]'>
                        {g.category}
                      </span>
                      <span className='ml-3 hidden font-mono text-[0.6875rem] tracking-[0.12em] uppercase opacity-70 sm:inline'>
                        {notes[g.category]}
                      </span>
                    </span>
                    <span className='font-mono text-xs opacity-70'>
                      ×{g.items.length}
                    </span>
                  </button>
                </h3>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className='overflow-hidden'>
                    <ul className='flex flex-wrap gap-1.5 px-3 pt-4 pb-5 sm:pl-[4.25rem]'>
                      {g.items.map((item) => {
                        const icon = techIcons[item];
                        return (
                          <li key={item} className='chip text-[0.8rem]'>
                            {icon ? (
                              <BrandIcon icon={icon} className='size-3.5' />
                            ) : null}
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
