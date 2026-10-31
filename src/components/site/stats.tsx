import { stats } from '@/constants';

/** Quick proof-of-work strip for the hero — plain numbers, no embellishment. */
export function Stats() {
  return (
    <dl className='flex flex-wrap items-stretch gap-x-8 gap-y-5 sm:gap-x-12'>
      {stats.map(({ value, label }, i) => (
        <div
          key={label}
          className={
            i > 0
              ? 'border-border flex flex-col gap-1 border-l pl-8 sm:pl-12'
              : 'flex flex-col gap-1'
          }
        >
          <dt className='sr-only'>{label}</dt>
          <dd className='font-display text-3xl font-semibold tabular-nums sm:text-4xl'>
            {value}
          </dd>
          <dd className='text-faint font-mono text-[11px] tracking-widest uppercase'>
            {label}
          </dd>
        </div>
      ))}
    </dl>
  );
}
