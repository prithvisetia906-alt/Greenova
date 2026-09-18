'use client';

import { ToastProvider } from '@/components/ui/Toast';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { KitBuilderSection } from '@/components/kit-builder/KitBuilder';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Products } from '@/components/sections/Products';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { HomeFarm } from '@/components/sections/HomeFarm';
import { WhatsInside } from '@/components/sections/WhatsInside';
import { GrowingJourney } from '@/components/sections/GrowingJourney';
import { PlantSelector } from '@/components/sections/PlantSelector';
import { Trust } from '@/components/sections/Trust';
import { BrandStory } from '@/components/sections/BrandStory';
import { PrebookCTA } from '@/components/sections/PrebookCTA';
import { FAQ } from '@/components/sections/FAQ';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <ToastProvider>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        <Hero />
        <KitBuilderSection />
        <HowItWorks />
        <Products />
        <WhyChooseUs />
        <HomeFarm />
        <WhatsInside />
        <GrowingJourney />
        <PlantSelector />
        <Trust />
        <BrandStory />
        <PrebookCTA />
        <FAQ />
      </main>
      <Footer />
    </ToastProvider>
  );
}