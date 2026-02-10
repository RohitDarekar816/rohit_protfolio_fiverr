import { Hero } from '@/components/Hero';
import { Stats } from '@/components/Stats';
import { Services } from '@/components/Services';
import { Skills } from '@/components/Skills';
import { Reviews } from '@/components/Reviews';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TerminalSection } from '@/components/TerminalSection';
import { CostCalculator } from '@/components/CostCalculator';
import { ChatWidget } from '@/components/ChatWidget';
import { ScrollProgress } from '@/components/ScrollProgress';
import { InfrastructureExplorer } from '@/components/InfrastructureExplorer';
import { GitHubHeatmap } from '@/components/GitHubHeatmap';
import { BuyMeACoffee } from '@/components/BuyMeACoffee';
import { BlogList } from '@/components/BlogList';

export default function FreelancePage() {
  return (
    <main className="min-h-screen bg-black text-white dark">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <TerminalSection />
      <InfrastructureExplorer />
      <GitHubHeatmap />
      <Stats />
      <About />
      <Services />
      <CostCalculator />
      <Skills />
      <Reviews />
      <BlogList />
      <Contact />
      <Footer />
      <ChatWidget />
      <BuyMeACoffee />
    </main>
  );
}
