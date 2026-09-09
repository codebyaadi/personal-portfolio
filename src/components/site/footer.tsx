import { ArrowUp } from 'lucide-react';
import { LocalClock } from '@/components/site/local-clock';
import { personal, socials } from '@/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-border border-t'>
      <div className='mx-auto max-w-6xl px-6 py-14'>
        <div className='flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <a
              href='#home'
              className='font-display text-2xl font-semibold tracking-tight'
            >
              aadi<span className='text-accent'>.</span>
            </a>
            <p className='text-muted mt-3 max-w-xs text-sm'>
              Designed &amp; built by {personal.name} with Next.js and Tailwind
              CSS. No templates.
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:items-end'>
            <ul className='flex items-center gap-5'>
              {socials.map(({ name, url, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={name}
                    className='text-faint hover:text-foreground transition-colors'
                  >
                    <Icon className='size-4' />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href='#home'
              className='text-faint hover:text-foreground inline-flex items-center gap-1.5 font-mono text-xs transition-colors'
            >
              Back to top <ArrowUp className='size-3' />
            </a>
          </div>
        </div>

        <div className='border-border text-faint mt-12 flex flex-col gap-2 border-t pt-6 font-mono text-[11px] sm:flex-row sm:items-center sm:justify-between'>
          <span>
            © {year} {personal.name}
          </span>
          <LocalClock />
        </div>
      </div>
    </footer>
  );
}
