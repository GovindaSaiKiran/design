"use client";

import React, { useState, useEffect } from "react";
import Hero from "@/components/aeline/Hero";
import LogoMarquee from "@/components/aeline/LogoMarquee";
import IndicVoiceSection from "@/components/aeline/IndicVoiceSection";
import WorkAgentsShowcase from "@/components/aeline/WorkAgentsShowcase";
import AboutSection from "@/components/aeline/AboutSection";
import ServicesSection from "@/components/aeline/ServicesSection";
import PricingSection from "@/components/aeline/PricingSection";
import TestimonialsSection from "@/components/aeline/TestimonialsSection";
import BlogSection from "@/components/aeline/BlogSection";
import FinalCTA from "@/components/aeline/FinalCTA";
import Footer from "@/components/aeline/Footer";
import LiveVoiceSimulatorModal from "@/components/aeline/LiveVoiceSimulatorModal";
import InstitutionalDemoModal from "@/components/aeline/InstitutionalDemoModal";
import AuthOnboardingModal, { AuthMode } from "@/components/aeline/AuthOnboardingModal";

export default function EduVoicePage() {
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const [selectedPlan, setSelectedPlan] = useState("Collegiate Growth Plan");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const auth = params.get("auth");
      if (auth === "signup" || auth === "register") {
        setAuthMode("signup");
        setAuthModalOpen(true);
      } else if (auth === "login" || auth === "signin") {
        setAuthMode("login");
        setAuthModalOpen(true);
      }
    }
  }, []);

  const handleOpenLogin = () => {
    setAuthMode("login");
    setAuthModalOpen(true);
  };

  const handleOpenSignUp = () => {
    setAuthMode("signup");
    setAuthModalOpen(true);
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setDemoOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#ffffff] text-[#1A1A1A] selection:bg-[#FFD9A0]/60 selection:text-black">
      {/* 1. Hero Section with Framed Sky, Fluffy Clouds & 3D Admissions Perspective Cards */}
      <Hero
        onOpenDemo={() => setDemoOpen(true)}
        onOpenSimulator={() => setSimulatorOpen(true)}
        onOpenLogin={handleOpenLogin}
        onOpenGetStarted={handleOpenSignUp}
        onOpenSignUp={handleOpenSignUp}
      />

      {/* 2. Swaram Capabilities Marquee Strip */}
      <LogoMarquee />

      {/* 3. Indic Text to Speech Playground (Natural Voices Across India's Languages) */}
      <IndicVoiceSection
        onOpenDemo={() => setDemoOpen(true)}
        onOpenSimulator={() => setSimulatorOpen(true)}
      />

      {/* 4. Work Agents: Goal Handoff, 3D Voice Discs, Big Numbers & Connectors */}
      <WorkAgentsShowcase onOpenDemo={() => setDemoOpen(true)} />

      {/* 5. About Us / Meet Maya with Arched Cards Fan */}
      <AboutSection
        onOpenDemo={() => setDemoOpen(true)}
        onOpenSimulator={() => setSimulatorOpen(true)}
      />

      {/* Core Capabilities */}
      <ServicesSection onOpenDemo={() => setDemoOpen(true)} />

      {/* 6. Institutional Campus Plans Built for Every Higher Ed Institution */}
      <PricingSection onSelectPlan={handleSelectPlan} />

      {/* 7. University Dean & Admissions Director Testimonials */}
      <TestimonialsSection />

      {/* 8. Higher Education Admissions Research & Whitepapers */}
      <BlogSection />

      {/* 9. Final CTA with Campus Pilot Registration */}
      <FinalCTA onOpenDemo={handleOpenSignUp} />

      {/* 10. Global Higher Ed Compliance Footer */}
      <Footer onOpenLogin={handleOpenLogin} onOpenSignUp={handleOpenSignUp} />

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
      <AuthOnboardingModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </main>
  );
}
