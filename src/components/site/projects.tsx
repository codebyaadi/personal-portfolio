import { ArrowUpRight, Lock } from 'lucide-react';
import { BrandIcon, techIcons } from '@/components/icons';
import { moreProjects, projects } from '@/constants';
import type { Project } from '@/constants/projects';
import { cn, cssVars } from '@/lib/utils';
import { ProjectFigure } from './figures';
import { Section } from './section';

export function TechChip({ name }: { name: string }) {
  const icon = techIcons[name];
  return (
    <li className='chip'>
      {icon ? <BrandIcon icon={icon} className='size-3' /> : null}
      {name}
    </li>
  );
}

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const live = project.status !== 'In development';
  const isPrivate = !project.links.some((l) => l.label === 'Source');
  const flip = i % 2 === 1;

  return (
    <article className='border-border grid items-start gap-x-14 gap-y-10 border-t py-14 first:border-t-0 first:pt-0 sm:py-20 lg:grid-cols-12'>
      <div
        className={cn('lg:sticky lg:top-24 lg:col-span-7', flip && 'lg:order-2')}
        data-reveal
      >
        <ProjectFigure slug={project.slug} n={i + 1} />
      </div>

      <div className={cn('lg:col-span-5', flip && 'lg:order-1')} data-reveal>
        <div className='label flex flex-wrap items-center gap-x-4 gap-y-2'>
          <span>{project.category}</span>
          <span>{project.year}</span>
          <span className='text-foreground inline-flex items-center gap-2'>
            <span
              className='dot'
              style={cssVars({ '--dot': live ? 'var(--ok)' : 'var(--warn)' })}
              aria-hidden
            />
            {project.status}
          </span>
        </div>

        <h3 className='display mt-4 text-[clamp(4rem,8.5vw,7.5rem)]'>
          {project.name}
        </h3>
        <p className='aside text-accent-text mt-2 text-[clamp(1.5rem,2.3vw,2rem)] leading-[1.1]'>
          {project.tagline}
        </p>
        <p className='text-muted mt-6 leading-relaxed'>
          {project.description}
        </p>

        <ol className='border-border mt-7 border-t'>
          {project.highlights.map((h, idx) => (
            <li
              key={h}
              className='border-border flex gap-3.5 border-b py-3.5 text-sm leading-relaxed'
            >
              <span className='balloon mt-px' aria-hidden>
                {idx + 1}
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ol>

        <p className='label mt-7'>Bill of materials</p>
        <ul className='mt-2.5 flex flex-wrap gap-1.5' aria-label='Stack'>
          {project.stack.map((t) => (
            <TechChip key={t} name={t} />
          ))}
        </ul>

        <div className='mt-9 flex flex-wrap items-center gap-4'>
          {project.links.map((l, idx) => (
            <a
              key={l.label}
              href={l.href}
              target='_blank'
              rel='noopener noreferrer'
              className={cn('btn', idx === 0 && 'btn-primary')}
            >
              {l.label === 'Live' ? 'Visit live' : 'Read source'}
              <ArrowUpRight className='size-3.5' aria-hidden />
            </a>
          ))}
          {isPrivate ? (
            <span className='label inline-flex items-center gap-2 px-2'>
              <Lock className='size-3' aria-hidden />
              Private repo
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section
      id='projects'
      index='03'
      label='Systems'
      meta={`${projects.length} figures · ${moreProjects.length} in the parts list`}
      heading={
        <>
          Drawn, built,
          <br />
          <span className='aside text-accent text-[1.06em]'>
            and still running.
          </span>
        </>
      }
    >
      <div>
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} i={i} />
        ))}
      </div>

      {/* Smaller shipped work */}
      <div className='mt-16 sm:mt-24'>
        <div
          className='label border-border-strong flex items-center justify-between border-b pb-3'
          data-reveal
        >
          <span>Parts list — also shipped</span>
          <span>Qty {moreProjects.length}</span>
        </div>
        <ul>
          {moreProjects.map((p, i) => (
            <li key={p.name} data-reveal>
              <a
                href={p.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group border-border hover:bg-accent hover:text-accent-contrast -mx-3 grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-1 border-b px-3 py-5 transition-colors duration-200 sm:grid-cols-[3rem_minmax(0,17rem)_1fr_auto]'
              >
                <span className='font-mono text-xs opacity-60'>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className='display text-3xl sm:text-4xl'>{p.name}</span>
                <span className='text-muted group-hover:text-accent-contrast col-span-2 col-start-2 text-sm leading-relaxed transition-colors sm:col-span-1 sm:col-start-3'>
                  {p.blurb}
                </span>
                <ArrowUpRight
                  className='col-start-3 row-start-1 size-5 self-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:col-start-4'
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
