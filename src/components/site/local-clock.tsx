'use client';

import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'Asia/Kolkata',
});

/** Live local time in India — a small "I'm a real person" touch in the footer. */
export function LocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>
      {time ? `${time} IST — India` : 'India'}
    </span>
  );
}
