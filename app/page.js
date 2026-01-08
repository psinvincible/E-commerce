"use client"

import CallToAction from "@/components/CallToAction";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";

export default function Home() {

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <TrustBadges />
      <FeaturedProducts />
      <CallToAction />
    </main>
  );
}
