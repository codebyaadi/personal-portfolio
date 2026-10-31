import {
  Cloud,
  Code2,
  Database,
  LayoutPanelTop,
  Server,
  Sparkles,
} from 'lucide-react';
import { Section } from '@/components/site/section';
import { BrandIcon, techIcons } from '@/components/icons';
import { skillGroups } from '@/constants';
import { cssVars } from '@/lib/utils';

/** One glyph and one tile hue per category, in `skillGroups` order. */
const categoryStyle: Record<string, { icon: typeof Code2; tile: string }> = {
  Languages: { icon: Code2, tile: 'var(--tile-1)' },
  Frontend: { icon: LayoutPanelTop, tile: 'var(--tile-2)' },
  Backend: { icon: Server, tile: 'var(--tile-3)' },
  Data: { icon: Database, tile: 'var(--tile-4)' },
  'Cloud & Infra': { icon: Cloud, tile: 'var(--tile-5)' },
  AI: { icon: Sparkles, tile: 'var(--tile-6)' },
};

export function Skills() {
  return (
    <Section
      id='skills'
      index='02'
      title={['Skills &', 'Tooling']}
      kicker='What I reach for, grouped by where it lives'
    >
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {skillGroups.map((group, i) => {
          const style = categoryStyle[group.category];
          const Icon = style?.icon ?? Code2;
          return (
            <div
              key={group.category}
              data-reveal
              style={cssVars({ '--reveal-delay': `${i * 60}ms` })}
              className='group border-border bg-surface/40 hover:border-accent/60 rounded-2xl border p-6 transition-colors'
            >
              <div
                className='grid size-10 place-items-center rounded-xl'
                style={{ background: style?.tile, color: 'var(--bg)' }}
              >
                <Icon className='size-5' strokeWidth={2.25} />
              </div>
              <h3 className='font-display mt-4 text-lg font-semibold tracking-tight'>
                {group.category}
              </h3>
              <ul className='mt-4 flex flex-wrap gap-2'>
                {group.items.map((item) => {
                  const icon = techIcons[item];
                  return (
                    <li
                      key={item}
                      className='border-border bg-surface-2/60 text-muted inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium'
                    >
                      {icon ? (
                        <BrandIcon
                          icon={icon}
                          className='text-faint size-3.5'
                        />
                      ) : null}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
