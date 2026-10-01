"use client";

import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import HeroCardsArc from "./HeroCardsArc";
import {
  ArrowUpRight,
  PhoneCall,
  Zap,
  Globe,
  ShieldCheck,
  Activity,
} from "lucide-react";

interface HeroProps {
  onOpenDemo?: () => void;
  onOpenSimulator?: () => void;
}

export default function Hero({ onOpenDemo, onOpenSimulator }: HeroProps) {
  return (
    <section className="w-full p-2 sm:p-4 lg:p-5 bg-[#ffffff]">
      {/* Framed Rounded Hero Canvas */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden bg-gradient-to-b from-[#187ee8] via-[#238ef5] to-[#4daafc] shadow-sm flex flex-col justify-between min-h-[750px] lg:min-h-[840px]">
        {/* Sky and Clouds Background Photo */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/sky-clouds.jpg"
            alt="Blue Sky with Clouds"
            fill
            priority
            className="object-cover object-bottom opacity-90 mix-blend-screen"
          />
          {/* Luminous Radial Ambient Glow behind central content */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_38%,rgba(255,255,255,0.22),transparent_70%)]" />
          {/* Subtle top gradient vignette for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1268c7]/50 via-transparent to-transparent" />
        </div>

        {/* Global Navigation Header */}
        <div className="relative z-30">
          <Navbar
            onOpenDemo={onOpenDemo}
            onOpenSimulator={onOpenSimulator}
          />
        </div>

        {/* Hero Central Content */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 pt-24 sm:pt-28 lg:pt-32 pb-4 text-center flex flex-col items-center">
          
          {/* Top Announcement Pill */}
          <button
            onClick={onOpenSimulator}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/35 shadow-sm text-white text-xs font-semibold tracking-wide mb-5 group cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-[#cdfb56] animate-pulse" />
            <span className="font-bold text-[#cdfb56] uppercase text-[11px] tracking-wider">Bulbul V3</span>
            <span className="text-white/90">Autonomous Indic Voice Telephony & Counseling</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Main Headline */}
          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-[-0.03em] drop-shadow-sm mb-4 max-w-3xl">
            Let AI Handle the Calls.<br className="hidden sm:inline" />
            Your Team Handles What Matters.
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-2xl font-normal leading-relaxed mb-7 px-2 drop-shadow-sm">
            Create voice agents for your business, institution, hospital, or service team. Give them the context, choose their voice, schedule their calls, and let them handle conversations at scale.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            {/* Listen to Maya / Test Simulator Button */}
            <button
              onClick={onOpenSimulator}
              className="bg-[#0b2b48]/55 hover:bg-[#0b2b48]/75 backdrop-blur-md text-white border border-white/20 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#cdfb56]" />
              EXPLORE CAPABILITIES
            </button>

            {/* Book Institutional Demo Button */}
            <button
              onClick={onOpenDemo}
              className="bg-[#cdfb56] hover:bg-[#bef03f] active:scale-95 text-black px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_4px_20px_rgba(205,251,86,0.4)] flex items-center gap-2.5 cursor-pointer group"
            >
              <span>CREATE YOUR AI AGENT</span>
              <span className="w-6 h-6 rounded-full bg-black text-[#cdfb56] flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>

          {/* Trust & Key Capability Micro-Chips (Fills lower blue space) */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-6 pt-1">
            <div className="flex items-center gap-1.5 bg-[#0b2b48]/40 hover:bg-[#0b2b48]/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-white text-[11px] font-medium shadow-sm transition-colors">
              <Zap className="w-3 h-3 text-[#cdfb56]" />
              <span>Sub-140ms Latency</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0b2b48]/40 hover:bg-[#0b2b48]/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-white text-[11px] font-medium shadow-sm transition-colors">
              <Globe className="w-3 h-3 text-[#cdfb56]" />
              <span>Hindi, Telugu, Tamil, Kannada + 10 Dialects</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0b2b48]/40 hover:bg-[#0b2b48]/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-white text-[11px] font-medium shadow-sm transition-colors">
              <ShieldCheck className="w-3 h-3 text-[#cdfb56]" />
              <span>FERPA & DPDP Grounded</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#0b2b48]/40 hover:bg-[#0b2b48]/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-white text-[11px] font-medium shadow-sm transition-colors">
              <Activity className="w-3 h-3 text-[#cdfb56]" />
              <span>Zero Human Queue Wait</span>
            </div>
          </div>
        </div>

        {/* 3D Floating Perspective Cards Arc (Visually anchored into the lower hero region) */}
        <div className="relative z-20 w-full -mt-2 sm:-mt-4 lg:-mt-6">
          <HeroCardsArc />
        </div>
      </div>
    </section>
  );
}
