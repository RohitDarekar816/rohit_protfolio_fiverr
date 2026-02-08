import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Services } from '@/components/Services';
import { Skills } from '@/components/Skills';
import { Reviews } from '@/components/Reviews';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-slate-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Skills />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
