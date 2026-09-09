import { Section } from '@/components/site/section';
import { personal } from '@/constants';
import { cssVars } from '@/lib/utils';

export function About() {
  return (
    <Section
      id='about'
      index='01'
      title='About'
      kicker='Full-stack developer & AI enthusiast, based in India'
    >
      <div className='grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20'>
        <div>
          <p
            className='font-serif text-2xl leading-snug text-balance sm:text-4xl'
            data-reveal
          >
            I care about the details that make software feel considered — fast
            loads, honest interfaces, and code the next person can actually
            read.
          </p>

          <div
            className='text-muted mt-10 space-y-5 text-base leading-relaxed sm:text-lg'
            data-reveal
            style={cssVars({ '--reveal-delay': '80ms' })}
          >
            {personal.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>

        <dl
          className='border-border bg-border grid h-fit grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-1'
          data-reveal
          style={cssVars({ '--reveal-delay': '160ms' })}
        >
          {personal.glance.map(({ label, value }) => (
            <div key={label} className='bg-background p-5'>
              <dt className='text-faint font-mono text-[11px] tracking-widest uppercase'>
                {label}
              </dt>
              <dd className='text-foreground mt-1.5 text-sm'>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
