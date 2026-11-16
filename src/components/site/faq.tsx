import { Plus } from 'lucide-react';
import { faqs } from '@/constants';
import { Section } from './section';

export function Faq() {
  return (
    <Section
      id='faq'
      index='06'
      label='Notes'
      invert
      meta={`${faqs.length} general notes`}
      heading={
        <>
          General{' '}
          <span className='aside text-accent text-[1.06em]'>notes.</span>
        </>
      }
    >
      <div className='border-border-strong border-t'>
        {faqs.map((item, i) => (
          <details
            key={item.q}
            className='group border-border-strong border-b'
            open={i === 0}
            data-reveal
          >
            <summary className='hover:text-accent-text grid cursor-pointer grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-6 transition-colors sm:grid-cols-[3rem_1fr_auto]'>
              <span className='text-faint font-mono text-xs'>
                N{String(i + 1).padStart(2, '0')}
              </span>
              <span className='display text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.05]'>
                {item.q}
              </span>
              <Plus
                className='faq-plus size-5 transition-transform duration-300'
                aria-hidden
              />
            </summary>
            <p className='text-muted max-w-3xl pb-8 pl-[3.5rem] leading-relaxed sm:pl-16'>
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
