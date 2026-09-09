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
      <div className='border-border border-t'>
        {skillGroups.map((group, i) => (
          <div
            key={group.category}
            data-reveal
            style={cssVars({ '--reveal-delay': `${i * 50}ms` })}
            className='border-border grid gap-4 border-b py-8 md:grid-cols-[220px_1fr] md:items-center md:gap-10'
          >
            <h3 className='font-display text-muted text-xl font-medium tracking-tight'>
              {group.category}
            </h3>
            <ul className='flex flex-wrap gap-2.5'>
              {group.items.map((item) => {
                const icon = techIcons[item];
                return (
                  <li
                    key={item}
                    className='group border-border bg-surface/40 text-foreground hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors'
                  >
                    {icon ? (
                      <BrandIcon
                        icon={icon}
                        className='text-faint group-hover:text-accent size-4 transition-colors'
                      />
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
