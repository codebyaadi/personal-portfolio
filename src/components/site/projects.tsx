import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/components/site/section';
import { ProjectRow } from '@/components/site/project-row';
import { moreProjects, projects } from '@/constants';

export function Projects() {
  return (
    <Section
      id='projects'
      index='03'
      title='Selected Projects'
      kicker='Four I would happily walk you through, line by line'
    >
      <div className='space-y-24 sm:space-y-36'>
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className='border-border mt-24 border-t pt-10' data-reveal>
        <h3 className='text-faint font-mono text-xs tracking-widest uppercase'>
          Also shipped
        </h3>
        <ul className='mt-6 grid gap-x-10 sm:grid-cols-2'>
          {moreProjects.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group border-border hover:border-accent flex items-start justify-between gap-4 border-b py-4 transition-colors'
              >
                <span>
                  <span className='text-foreground group-hover:text-accent font-medium'>
                    {item.name}
                  </span>
                  <span className='text-muted mt-0.5 block text-sm'>
                    {item.blurb}
                  </span>
                </span>
                <ArrowUpRight
                  className='text-faint group-hover:text-accent mt-1 size-4 shrink-0 transition-colors'
                  aria-hidden
                />
              </a>
            </li>
          ))}
        </ul>
        <a
          href='https://github.com/codebyaadi'
          target='_blank'
          rel='noopener noreferrer'
          className='text-faint hover:text-foreground mt-6 inline-flex items-center gap-1.5 font-mono text-xs transition-colors'
        >
          Everything else is on GitHub
          <ArrowUpRight className='size-3.5' aria-hidden />
        </a>
      </div>
    </Section>
  );
}
