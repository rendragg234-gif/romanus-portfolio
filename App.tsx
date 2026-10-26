import { ThemeProvider } from '@/hooks/theme-context';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';
import SkipLink from '@/components/layout/SkipLink';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
import Projects from '@/sections/Projects';
import Certificates from '@/sections/Certificates';
import Contact from '@/sections/Contact';
import { useRevealOnScroll } from '@/hooks/useReveal';

function Portfolio() {
  useRevealOnScroll();

  return (
    <div className="relative min-h-screen bg-bg text-fg">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-[-10%] h-[32rem] w-[32rem] rounded-full bg-glow blur-[110px] animate-slow-pulse" />
        <div className="absolute bottom-[-15%] left-[-15%] h-[34rem] w-[34rem] rounded-full bg-accent-2/12 blur-[120px] animate-slow-pulse" />
      </div>

      <SkipLink />
      <Navbar />

      <main id="konten" className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
