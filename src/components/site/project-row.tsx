import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import { BrandIcon, techIcons } from '@/components/icons';
import { ProjectCover } from '@/components/site/project-cover';
import type { Project } from '@/constants/projects';
import { cn } from '@/lib/utils';

export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const flipped = index % 2 === 1;
  const primary =
    project.links.find((l) => l.label === 'Live')?.href ??
    project.links[0]?.href;

  return (
    <article
      data-reveal
      className='grid items-center gap-8 md:grid-cols-12 md:gap-6'
    >
      <a
        href={primary}
        target='_blank'
        rel='noopener noreferrer'
        data-cursor
        aria-label={`${project.name} — open project`}
        className={cn(
          'group border-border bg-surface/40 relative col-span-12 block overflow-hidden rounded-2xl border md:col-span-7',
          flipped && 'md:order-2 md:col-start-6'
        )}
      >
        <div className='aspect-[16/10] overflow-hidden'>
          {project.image ? (
            <div className='parallax-img size-full'>
              <Image
                src={project.image}
                alt={`${project.name} — ${project.tagline}`}
                width={1120}
                height={700}
                sizes='(min-width: 768px) 58vw, 100vw'
                loading='lazy'
                className='size-full scale-[1.06] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110'
              />
            </div>
          ) : (
            <div className='size-full transition-transform duration-700 ease-out group-hover:scale-[1.03]'>
              <ProjectCover
                name={project.name}
                category={project.category}
                index={index}
              />
            </div>
          )}
        </div>
        <div className='group-hover:ring-accent/40 pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent transition' />
        <span className='bg-background/80 text-foreground pointer-events-none absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wide opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100'>
          Open <ArrowUpRight className='size-3' />
        </span>
      </a>

      <div
        className={cn(
          'col-span-12 md:col-span-5',
          flipped ? 'md:order-1 md:col-start-1' : 'md:col-start-8'
        )}
      >
        <div className='flex items-baseline gap-4'>
          <span className='font-display text-border-strong text-4xl font-semibold tabular-nums sm:text-5xl'>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className='text-faint font-mono text-xs tracking-wide uppercase'>
            {project.category} · {project.year}
          </span>
        </div>

        <h3 className='mt-3 text-2xl font-semibold tracking-tight sm:text-4xl'>
          {project.name}
        </h3>
        <p className='text-muted mt-1 font-serif text-lg italic'>
          {project.tagline}
        </p>

        <p className='text-muted mt-4 leading-relaxed'>{project.description}</p>

        <ul className='mt-5 space-y-2'>
          {project.highlights.map((point) => (
            <li key={point} className='text-muted flex gap-3 text-sm'>
              <span
                className='bg-accent mt-[0.55rem] size-1 shrink-0 rounded-full'
                aria-hidden
              />
              {point}
            </li>
          ))}
        </ul>

        <ul className='mt-5 flex flex-wrap gap-1.5'>
          {project.stack.map((tech) => (
            <li
              key={tech}
              className='border-border text-faint inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[11px]'
            >
              {techIcons[tech] ? (
                <BrandIcon icon={techIcons[tech]} className='size-3' />
              ) : null}
              {tech}
            </li>
          ))}
        </ul>

        <div className='mt-6 flex flex-wrap gap-3'>
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className='group/link border-border-strong hover:border-accent hover:text-accent inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors'
            >
              {link.label === 'Source' ? (
                <Github className='size-3.5' aria-hidden />
              ) : (
                <ArrowUpRight
                  className='size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5'
                  aria-hidden
                />
              )}
              {link.label === 'Source' ? 'Source' : 'Live demo'}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
