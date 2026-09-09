import { Hero } from '@/components/site/hero';
import { Marquee } from '@/components/site/marquee';
import { About } from '@/components/site/about';
import { Skills } from '@/components/site/skills';
import { Projects } from '@/components/site/projects';
import { Experience } from '@/components/site/experience';
import { Contact } from '@/components/site/contact';
import { Footer } from '@/components/site/footer';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
