import type { SVGProps } from 'react';
import {
  siAmazonwebservices,
  siAntdesign,
  siApachekafka,
  siBun,
  siCloudinary,
  siDocker,
  siDrizzle,
  siExpress,
  siFastapi,
  siFirebase,
  siGit,
  siGithub,
  siGo,
  siGooglecloud,
  siGooglegemini,
  siGraphql,
  siJavascript,
  siLinkedin,
  siMongodb,
  siNestjs,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siOpenai,
  siOpenjdk,
  siPostgresql,
  siPostman,
  siPrisma,
  siPython,
  siReact,
  siReactquery,
  siRedis,
  siShadcnui,
  siSpringboot,
  siSqlalchemy,
  siTailwindcss,
  siTurborepo,
  siTypescript,
  siVercel,
  siX,
  siAndroid,
  type SimpleIcon,
} from 'simple-icons';

/**
 * Renders a Simple Icons glyph as a currentColor SVG. Brand colours are
 * intentionally dropped so tech chips stay monochrome and on-theme.
 */
export function BrandIcon({
  icon,
  title,
  ...props
}: SVGProps<SVGSVGElement> & { icon: SimpleIcon; title?: string }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='currentColor'
      role='img'
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d={icon.path} />
    </svg>
  );
}

const social = (icon: SimpleIcon, label: string) =>
  function SocialIcon(props: SVGProps<SVGSVGElement>) {
    return <BrandIcon icon={icon} title={label} {...props} />;
  };

export const GithubIcon = social(siGithub, 'GitHub');
export const LinkedinIcon = social(siLinkedin, 'LinkedIn');
export const XIcon = social(siX, 'X');

/** Lookup for tech chips, keyed by the label used in constants. */
export const techIcons: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Python: siPython,
  Go: siGo,
  Java: siOpenjdk,
  React: siReact,
  'Next.js': siNextdotjs,
  Android: siAndroid,
  'Tailwind CSS': siTailwindcss,
  'shadcn/ui': siShadcnui,
  'Ant Design': siAntdesign,
  'React Query': siReactquery,
  'Node.js': siNodedotjs,
  NestJS: siNestjs,
  Express: siExpress,
  FastAPI: siFastapi,
  'Spring Boot': siSpringboot,
  GraphQL: siGraphql,
  PostgreSQL: siPostgresql,
  Firestore: siFirebase,
  MongoDB: siMongodb,
  Redis: siRedis,
  Prisma: siPrisma,
  Drizzle: siDrizzle,
  SQLAlchemy: siSqlalchemy,
  'Google Cloud': siGooglecloud,
  AWS: siAmazonwebservices,
  Docker: siDocker,
  Turborepo: siTurborepo,
  Bun: siBun,
  Kafka: siApachekafka,
  Vercel: siVercel,
  Netlify: siNetlify,
  Git: siGit,
  Postman: siPostman,
  'OpenAI API': siOpenai,
  'Google Gemini': siGooglegemini,
  Cloudinary: siCloudinary,
};
