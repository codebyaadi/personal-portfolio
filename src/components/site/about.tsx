import { personal } from '@/constants';
import { cssVars } from '@/lib/utils';
import { Section } from './section';

export function About() {
  const [lead, ...rest] = personal.about;

  return (
    <Section
      id='about'
      index='02'
      label='Profile'
      meta='General arrangement'
      invert
      heading={
        <>
          Pixels down
          <br />
          to <span className='aside text-accent text-[1.06em]'>queues.</span>
        </>
      }
    >
      <div className='grid gap-12 lg:grid-cols-12'>
        <div className='lg:col-span-7'>
          <p
            className='display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.12] tracking-[-0.02em]'
            data-reveal
          >
            {lead}
          </p>
          <div className='text-muted mt-9 max-w-2xl space-y-5 text-[1.0625rem] leading-relaxed'>
            {rest.map((p, i) => (
              <p
                key={p}
                data-reveal
                style={cssVars({ '--reveal-delay': `${i * 60}ms` })}
              >
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* "At a glance" as a drawing legend */}
        <aside
          className='lg:col-span-4 lg:col-start-9'
          aria-label='At a glance'
          data-reveal
        >
          <div className='border-border-strong border shadow-[10px_10px_0_0_var(--border)] lg:sticky lg:top-24'>
            <div className='label border-border-strong flex items-center justify-between border-b px-4 py-3'>
              <span>Legend</span>
              <span>Rev B</span>
            </div>
            <dl>
              {personal.glance.map((g, i) => (
                <div
                  key={g.label}
                  className='border-border grid grid-cols-[1.75rem_1fr] gap-x-2 border-b px-4 py-4'
                >
                  <span
                    className='text-accent-text font-mono text-xs leading-5'
                    aria-hidden
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <div>
                    <dt className='label'>{g.label}</dt>
                    <dd className='mt-1.5 leading-snug font-medium'>
                      {g.value}
                    </dd>
                  </div>
                </div>
              ))}
              <div className='bg-accent text-accent-contrast px-4 py-4'>
                <dt className='font-mono text-[0.6875rem] tracking-[0.14em] uppercase opacity-80'>
                  Availability
                </dt>
                <dd className='mt-1.5 leading-snug font-semibold'>
                  {personal.availabilityLong}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </Section>
  );
}
