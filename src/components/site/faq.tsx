import { Section } from '@/components/site/section';
import { faqs } from '@/constants';
import { cssVars } from '@/lib/utils';

export function Faq() {
  return (
    <Section
      id='faq'
      index='05'
      title='Quick answers'
      kicker='The questions people usually open with'
    >
      <dl className='divide-border border-border divide-y border-y'>
        {faqs.map((item, i) => (
          <div
            key={item.q}
            className='grid gap-2 py-6 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10'
            data-reveal
            style={cssVars({ '--reveal-delay': `${i * 50}ms` })}
          >
            <dt className='font-display text-lg font-medium'>{item.q}</dt>
            <dd className='text-muted leading-relaxed'>{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
