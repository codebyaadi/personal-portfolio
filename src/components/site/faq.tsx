import { Section } from '@/components/site/section';
import { faqs } from '@/constants';

export function Faq() {
  return (
    <Section
      id='faq'
      index='05'
      title={['Quick', 'Answers']}
      kicker='The questions people usually open with'
    >
      <dl className='divide-border border-border divide-y border-y' data-reveal>
        {faqs.map((item) => (
          <div
            key={item.q}
            className='hover:bg-surface/30 -mx-4 grid gap-2 rounded-lg px-4 py-6 transition-colors md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10'
          >
            <dt className='font-display text-lg font-medium'>{item.q}</dt>
            <dd className='text-muted leading-relaxed'>{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
