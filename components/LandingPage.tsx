'use client';

import { useCallback, useState } from 'react';
import { LocaleProvider } from '@/lib/i18n';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SiteNav } from '@/components/SiteNav';
import { Hero } from '@/components/sections/Hero';
import { KeyStats } from '@/components/sections/KeyStats';
import { ProblemSection } from '@/components/sections/ProblemSection';
import { ChainOfCustody } from '@/components/sections/ChainOfCustody';
import { UnifiedEcosystem } from '@/components/sections/UnifiedEcosystem';
import { ConsolePreview } from '@/components/sections/ConsolePreview';
import { CommodityPortfolio } from '@/components/sections/CommodityPortfolio';
import { WhyPanora } from '@/components/sections/WhyPanora';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';

function LandingContent() {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setReady(true);
    setShowLoader(false);
  }, []);

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleLoaderComplete} />}
      <ScrollProgress />
      <SiteNav ready={ready} />
      <main>
        <Hero ready={ready} />
        <KeyStats />
        <ProblemSection />
        <ChainOfCustody />
        <UnifiedEcosystem />
        <ConsolePreview />
        <CommodityPortfolio />
        <WhyPanora />
        <FAQ />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}

export function LandingPage() {
  return (
    <LocaleProvider>
      <LandingContent />
    </LocaleProvider>
  );
}
