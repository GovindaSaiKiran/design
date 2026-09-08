"use client";

import React, { useState } from "react";
import Hero from "@/components/aeline/Hero";
import LogoMarquee from "@/components/aeline/LogoMarquee";
import AboutSection from "@/components/aeline/AboutSection";
import ServicesSection from "@/components/aeline/ServicesSection";
import InnovationShowcase from "@/components/aeline/InnovationShowcase";
import PricingSection from "@/components/aeline/PricingSection";
import TestimonialsSection from "@/components/aeline/TestimonialsSection";
import BlogSection from "@/components/aeline/BlogSection";
import FinalCTA from "@/components/aeline/FinalCTA";
import Footer from "@/components/aeline/Footer";
import LiveVoiceSimulatorModal from "@/components/aeline/LiveVoiceSimulatorModal";
import InstitutionalDemoModal from "@/components/aeline/InstitutionalDemoModal";

export default function EduVoicePage() {
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Collegiate Growth Plan");

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setDemoOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#ffffff] text-slate-900 selection:bg-[#cdfb56] selection:text-black">
      {/* 1. Hero Section with Framed Sky, Fluffy Clouds & 3D Admissions Perspective Cards */}
      <Hero
        onOpenDemo={() => setDemoOpen(true)}
        onOpenSimulator={() => setSimulatorOpen(true)}
      />

      {/* 2. University Partner Logo Marquee */}
      <LogoMarquee />

      {/* 3. About Us / Meet Maya with Inline Stickers & Bento Grid */}
      <AboutSection />

      {/* 4. Core Capabilities (24/7 Telephony, Institutional RAG, Smart Human Handoff) */}
      <ServicesSection />

      {/* 5. Interactive Admissions ROI & Telephony Yield Calculator */}
      <InnovationShowcase />

      {/* 6. Institutional Campus Plans Built for Every Higher Ed Institution */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* 7. University Dean & Admissions Director Testimonials */}
      <TestimonialsSection />

      {/* 8. Higher Education Admissions Research & Whitepapers */}
      <BlogSection />

      {/* 9. Final CTA with Campus Pilot Registration */}
      <FinalCTA onOpenDemo={() => setDemoOpen(true)} />

      {/* 10. Global Higher Ed Compliance Footer */}
      <Footer />

      {/* Interactive Modals */}
      <LiveVoiceSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
      />
      <InstitutionalDemoModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
        defaultPlan={selectedPlan}
      />
    </main>
  );
}
