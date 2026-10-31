import { Section } from '@/components/site/section';
import { BrandIcon, techIcons } from '@/components/icons';
import { skillGroups } from '@/constants';
import { cssVars } from '@/lib/utils';

export function Skills() {
  return (
    <Section
      id='skills'
      index='02'
      title='Skills & Tooling'
      kicker='What I reach for, grouped by where it lives'
    >
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {skillGroups.map((group, i) => (
          <div
            key={group.category}
            data-reveal
            style={cssVars({ '--reveal-delay': `${i * 60}ms` })}
            className='group border-border bg-surface/40 hover:border-accent/60 rounded-2xl border p-6 transition-colors'
          >
            <h3 className='font-display text-lg font-semibold tracking-tight'>
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
                      <BrandIcon icon={icon} className='text-faint size-3.5' />
                    ) : null}
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
