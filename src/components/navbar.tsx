'use client';

import { useMotionValue } from 'framer-motion';
import { Dock, DockIcon } from './ui/dock';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { ModeToggle } from './mode-toggle';
import { DATA } from '@/constants';

const mouseX = useMotionValue(0);

export default function Navbar() {
  return (
    <div className='pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex h-full max-h-14 origin-bottom'>
      <div className='fixed inset-x-0 bottom-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background'></div>
      <Dock
        direction='middle'
        className='pointer-events-auto relative z-50 mx-auto flex h-full min-h-full transform-gpu items-center bg-background px-1 py-2 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]'
      >
        {DATA.navbar.map((n) => (
          <DockIcon key={n.href} className='rounded-full' mouseX={mouseX}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={n.href}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'size-12 rounded-full'
                  )}
                >
                  <n.icon className='size-4' />
                </Link>
              </TooltipTrigger>
              <TooltipContent className='font-prompt font-semibold'>
                <p>{n.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation='vertical' className='h-full' />
        {Object.entries(DATA.contact.social).map(([name, social]) => (
          <DockIcon mouseX={mouseX} key={name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={social.url}
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'size-12 rounded-full'
                  )}
                >
                  <social.icon className='size-4' />
                </Link>
              </TooltipTrigger>
              <TooltipContent className='font-prompt font-semibold'>
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation='vertical' className='h-full py-2' />
        <DockIcon mouseX={mouseX}>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent className='font-prompt font-semibold'>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
