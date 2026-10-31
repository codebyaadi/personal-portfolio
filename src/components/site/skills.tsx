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

/** One glyph per category, in `skillGroups` order — monochrome throughout. */
const categoryIcon: Record<string, typeof Code2> = {
  Languages: Code2,
  Frontend: LayoutPanelTop,
  Backend: Server,
  Data: Database,
  'Cloud & Infra': Cloud,
  AI: Sparkles,
};

export function Skills() {
  return (
    <Section
      id='skills'
      index='02'
      title={['Skills &', 'Tooling']}
      kicker='What I reach for, grouped by where it lives'
    >
      <div
        className='border-border bg-surface/30 rounded-[2rem] border p-2 sm:p-3'
        data-reveal
      >
        <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
          {skillGroups.map((group, i) => {
            const Icon = categoryIcon[group.category] ?? Code2;
            return (
              <div
                key={group.category}
                data-reveal
                style={cssVars({ '--reveal-delay': `${i * 50}ms` })}
                className='group bg-background border-border hover:border-accent/50 hover:-translate-y-0.5 rounded-[1.4rem] border p-6 transition-[transform,border-color] duration-200'
              >
                <div className='bg-surface-2 text-foreground grid size-10 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-105'>
                  <Icon className='size-5' strokeWidth={2} />
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
                        className='border-border text-muted inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium'
                      >
                        {icon ? (
                          <BrandIcon icon={icon} className='size-3.5' />
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
      </div>
    </Section>
  );
}
