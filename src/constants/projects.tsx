import { Github, Globe } from 'lucide-react';

export const projects = [
  {
    title: 'Vitube - Video Streaming Platform',
    href: 'https://vitube-streaming-platform.vercel.app/',
    dates: 'Jan 2024 - Feb 2024',
    active: true,
    description:
      'Vitube is a powerful video streaming platform built with React, Node.js, MongoDB, Nodemailer, and Cloudinary, designed to provide seamless video streaming and sharing.',
    technologies: [
      'Next.js',
      'Typescript',
      'MongoDB',
      'Prisma',
      'TailwindCSS',
      'Shadcn UI',
    ],
    links: [
      {
        type: 'Website',
        href: 'https://vitube-streaming-platform.vercel.app/',
        icon: <Globe size={12} />,
      },
      {
        type: 'Source',
        href: 'https://github.com/codebyaadi/vitube-streaming-platform',
        icon: <Github size={12} />,
      },
    ],
    image:
      'https://res.cloudinary.com/dh2xj1szg/image/upload/v1732034341/vitube-streaming-platform_txkfoc.png',
    video: '',
  },
  {
    title: 'Chatpiece',
    href: 'https://movieboot.netlify.app/',
    dates: 'Jan 2024 - Feb 2024',
    active: true,
    description:
      'This GitHub repository contains a web application built with NextJS and Tailwind CSS, designed to provide users with a social media-like experience for creating posts and commenting on them.',
    technologies: [
      'Next.js',
      'Typescript',
      'MongoDB',
      'Prisma',
      'TailwindCSS',
      'React Query',
    ],
    links: [
      {
        type: 'Source',
        href: 'https://github.com/codebyaadi/chatpiece',
        icon: <Github size={12} />,
      },
    ],
    image:
      'https://res.cloudinary.com/dqcejxdbf/image/upload/v1703744416/chatpiece_mxvgn7.png',
    video: '',
  },
  {
    title: 'Movieboot',
    href: 'https://movieboot.netlify.app/',
    dates: 'Jan 2024 - Feb 2024',
    active: true,
    description:
      'Vitube is a powerful video streaming platform built with React, Node.js, MongoDB, Nodemailer, and Cloudinary, designed to provide seamless video streaming and sharing.',
    technologies: [
      'Next.js',
      'Typescript',
      'MongoDB',
      'Prisma',
      'TailwindCSS',
      'Shadcn UI',
    ],
    links: [
      {
        type: 'Website',
        href: 'https://movieboot.netlify.app/',
        icon: <Globe size={12} />,
      },
      {
        type: 'Source',
        href: 'https://github.com/codebyaadi/movieboot-frontend',
        icon: <Github size={12} />,
      },
    ],
    image:
      'https://res.cloudinary.com/dh2xj1szg/image/upload/v1732034873/movieboot_gpskei.png',
    video: '',
  },
  {
    title: 'Dall▪E Clone',
    href: 'https://dalle-e-clone-rho.vercel.app/',
    dates: 'Jan 2024 - Feb 2024',
    active: true,
    description:
      "DALLE-E-Clone is a web application built using OpenAI's DALL-E API that generates images from textual prompts. This repository contains the code for the web application, allowing users to easily interact with the DALL-E API and generate their own images.",
    technologies: ['ReactJS', 'JavaScript', 'MongoDB', 'OpenAI', 'Express'],
    links: [
      {
        type: 'Website',
        href: 'https://dalle-e-clone-rho.vercel.app/',
        icon: <Globe size={12} />,
      },
      {
        type: 'Source',
        href: 'https://github.com/codebyaadi/dalle-e-clone',
        icon: <Github size={12} />,
      },
    ],
    image:
      'https://res.cloudinary.com/dqcejxdbf/image/upload/v1703744971/Screenshot_2023-12-28_at_11-59-03_DALL-E_2.0_ezbu1k.png',
    video: '',
  },
];
