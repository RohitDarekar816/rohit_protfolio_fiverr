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
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
