import { ArrowUpRight } from 'lucide-react';
import { work } from '@/constants';
import { cssVars } from '@/lib/utils';
import { TechChip } from './projects';
import { Section } from './section';

/** "Sep 2026" → UTC month index (year * 12 + month). */
function monthIndex(label: string): number {
  const d = new Date(`1 ${label} UTC`);
  return d.getUTCFullYear() * 12 + d.getUTCMonth();
}

/** Months each role has run, oldest first — drives the dimension line. */
function spans(now: Date) {
  const nowIdx = now.getUTCFullYear() * 12 + now.getUTCMonth();
  return work
    .slice()
    .reverse()
    .map((w) => {
      const end = w.end ? monthIndex(w.end) : nowIdx + 1;
      return {
        company: w.company,
        current: w.end === null,
        months: Math.max(1, end - monthIndex(w.start)),
      };
    });
}

/**
 * Work history as the revision block of the drawing: REV A is the first
 * role, the latest letter is the current one. A dimension line above it
 * measures the whole run in months.
 */
export function Experience() {
  const segments = spans(new Date());
  const total = segments.reduce((n, s) => n + s.months, 0);

  return (
    <Section
      id='experience'
      index='04'
      label='Revisions'
      meta={`${total} months in production`}
      invert
      heading={
        <>
          Revision{' '}
          <span className='aside text-accent text-[1.06em]'>history.</span>
        </>
      }
    >
      {/* Dimension line: one segment per role, width ∝ months */}
      <div className='flex gap-1' data-reveal aria-hidden>
        {segments.map((s) => (
          <div
            key={s.company}
            style={{ flexGrow: s.months }}
            className='basis-28'
          >
            <div
              className={
                s.current
                  ? 'bg-accent h-3'
                  : 'border-border-strong h-3 border bg-[repeating-linear-gradient(45deg,var(--text)_0_1px,transparent_1px_7px)]'
              }
            />
            <span className='dim mt-2'>{s.months} mo</span>
            <p className='label mt-1 truncate text-center'>{s.company}</p>
          </div>
        ))}
      </div>

      <div className='label border-border-strong mt-14 hidden grid-cols-12 gap-x-10 border-b pb-3 lg:grid'>
        <span className='col-span-2'>Rev</span>
        <span className='col-span-2'>Date</span>
        <span className='col-span-8'>Description</span>
      </div>
      <ol className='mt-10 lg:mt-0'>
        {work.map((w, i) => {
          const current = w.end === null;
          const rev = String.fromCharCode(65 + work.length - 1 - i);
          return (
            <li
              key={w.company}
              className='border-border-strong grid gap-x-10 gap-y-4 border-b py-10 first:border-t sm:py-12 lg:grid-cols-12 lg:first:border-t-0'
              data-reveal
            >
              <p
                className={`display text-[clamp(5rem,11vw,9.5rem)] leading-[0.8] lg:col-span-2 ${current ? 'text-accent' : 'outline-text'}`}
                aria-label={`Revision ${rev}`}
              >
                {rev}
              </p>

              <div className='lg:col-span-2'>
                <p className='font-mono text-sm leading-relaxed'>
                  {w.start}
                  <br className='hidden lg:block' />
                  <span className='text-faint'> → </span>
                  {w.end ?? 'Present'}
                </p>
                <p className='label mt-3 inline-flex items-center gap-2'>
                  <span
                    className='dot'
                    style={cssVars({
                      '--dot': current ? 'var(--ok)' : 'var(--text-faint)',
                    })}
                    aria-hidden
                  />
                  {current ? 'Current' : 'Superseded'}
                </p>
              </div>

              <div className='lg:col-span-8'>
                <h3 className='display text-[clamp(2.25rem,4.4vw,3.75rem)]'>
                  {w.title}
                </h3>
                <p className='mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg'>
                  <a
                    href={w.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='link-underline text-accent-text inline-flex items-center gap-1 font-medium'
                  >
                    {w.company}
                    <ArrowUpRight className='size-4' aria-hidden />
                  </a>
                  <span className='label'>{w.location}</span>
                </p>
                <p className='text-muted mt-5 max-w-3xl leading-relaxed'>
                  {w.summary}
                </p>
                <ul className='mt-6 flex flex-wrap gap-1.5' aria-label='Stack'>
                  {w.stack.map((t) => (
                    <TechChip key={t} name={t} />
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
