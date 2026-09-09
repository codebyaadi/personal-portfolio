import { Hero } from '@/components/site/hero';
import { Marquee } from '@/components/site/marquee';
import { About } from '@/components/site/about';
import { Skills } from '@/components/site/skills';
import { Projects } from '@/components/site/projects';
import { Experience } from '@/components/site/experience';
import { Faq } from '@/components/site/faq';
import { Contact } from '@/components/site/contact';
import { Footer } from '@/components/site/footer';
import { JsonLd } from '@/components/json-ld';
import { homeJsonLd } from '@/lib/structured-data';

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
