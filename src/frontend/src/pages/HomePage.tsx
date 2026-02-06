import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import GeneratorSection from '@/components/GeneratorSection';
import GallerySection from '@/components/GallerySection';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<'generator' | 'gallery'>('generator');

  return (
    <div className="flex min-h-screen flex-col">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1">
        <HeroSection />
        {activeSection === 'generator' ? <GeneratorSection /> : <GallerySection />}
      </main>
      <Footer />
    </div>
  );
}
