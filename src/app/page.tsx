"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PortfolioGallery from "@/components/sections/PortfolioGallery";
import Pricing from "@/components/sections/Pricing";
import TermsOfService from "@/components/sections/TermsOfService";
import CommissionContact from "@/components/sections/CommissionContact";
import About from "@/components/sections/About";
import { Artwork } from "@/lib/data";

export default function Home() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  return (
    <MotionConfig reducedMotion="never">
      <main className="min-h-screen bg-background relative selection:bg-primary/20">
        <Navigation />
        
        <PortfolioGallery onSelectSimilar={(art) => setSelectedArtwork(art)} />
        <Pricing />
        <TermsOfService />
        <CommissionContact selectedArtwork={selectedArtwork} />
        <About />

        <Footer />
      </main>
    </MotionConfig>
  );
}
