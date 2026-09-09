import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/site/section';
import { BrandIcon, techIcons } from '@/components/icons';
import { work } from '@/constants';

const github = [
  { label: 'Public repositories', value: '24' },
  { label: 'On GitHub since', value: '2022' },
  { label: 'Primary languages', value: 'TypeScript · Go · Python · Java' },
  {
    label: 'Recent focus',
    value: 'Distributed systems · AI tooling · secure-by-default',
  },
];

export function Experience() {
  return (
    <Section
      id='experience'
      index='04'
      title='Experience'
      kicker='What I ship at work, and what I ship on my own'
    >
      <div className='grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20'>
        <ol className='border-border relative space-y-12 border-l pl-8'>
          {work.map((job) => (
            <li key={job.company} className='relative' data-reveal>
              <span
                className='border-accent bg-background absolute top-2 -left-[37px] size-3 rounded-full border-2'
                aria-hidden
              />
              <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
                <h3 className='font-display text-xl font-medium'>
                  {job.title}
                  <span className='text-muted'> — {job.company}</span>
                </h3>
                <span className='text-faint font-mono text-xs tabular-nums'>
                  {job.start} — {job.end ?? 'Present'}
                </span>
              </div>
              <p className='text-faint mt-1 font-mono text-xs'>
                {job.location}
              </p>
              <p className='text-muted mt-3 leading-relaxed'>{job.summary}</p>
              <ul className='mt-4 flex flex-wrap gap-1.5'>
                {job.stack.map((tech) => (
                  <li
                    key={tech}
                    className='border-border text-faint inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px]'
                  >
                    {techIcons[tech] ? (
                      <BrandIcon icon={techIcons[tech]} className='size-2.5' />
                    ) : null}
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <aside
          className='border-border bg-surface/40 h-fit rounded-2xl border p-7'
          data-reveal
        >
          <h3 className='text-faint font-mono text-[11px] tracking-widest uppercase'>
            Open source
          </h3>
          <a
            href='https://github.com/codebyaadi'
            target='_blank'
            rel='noopener noreferrer'
            className='font-display hover:text-accent mt-3 inline-flex items-center gap-1.5 text-lg font-medium transition-colors'
          >
            github.com/codebyaadi
            <ArrowUpRight className='size-4' aria-hidden />
          </a>
          <dl className='divide-border border-border mt-5 divide-y border-y'>
            {github.map(({ label, value }) => (
              <div
                key={label}
                className='flex items-baseline justify-between gap-4 py-2.5'
              >
                <dt className='text-muted text-sm'>{label}</dt>
                <dd className='text-foreground text-right font-mono text-xs'>
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <p className='text-muted mt-4 text-sm'>
            Most of what I learn on gets built in the open — a monitoring
            platform, a SaaS backbone, a high-performance Go backend, and small
            published packages.
          </p>
        </aside>
      </div>
    </Section>
  );
}
