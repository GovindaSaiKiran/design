"use client";

import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import HeroCardsArc from "./HeroCardsArc";
import { ArrowUpRight, PhoneCall, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenDemo?: () => void;
  onOpenSimulator?: () => void;
}

export default function Hero({ onOpenDemo, onOpenSimulator }: HeroProps) {
  return (
    <section className="w-full p-2 sm:p-4 lg:p-5 bg-[#ffffff]">
      {/* Framed Rounded Hero Canvas */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] overflow-hidden bg-gradient-to-b from-[#197ee8] via-[#248df4] to-[#4baafc] shadow-sm flex flex-col justify-between min-h-[750px] lg:min-h-[840px]">
        {/* Sky and Clouds Background Photo */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/sky-clouds.jpg"
            alt="Blue Sky with Clouds"
            fill
            priority
            className="object-cover object-bottom opacity-90 mix-blend-screen"
          />
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
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 pt-28 sm:pt-32 lg:pt-36 pb-2 text-center flex flex-col items-center">
          {/* Main Headline */}
          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-[-0.03em] drop-shadow-sm mb-5 max-w-3xl">
            Building the future of <br className="hidden sm:inline" />
            admissions with voice AI
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-2xl font-normal leading-relaxed mb-8 px-2">
            Edu-Voice-Ai answers prospective student calls 24/7, resolves inquiries with
            institutional accuracy, and routes high-intent leads to your admissions team.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
            {/* Listen to Maya / Test Simulator Button */}
            <button
              onClick={onOpenSimulator}
              className="bg-[#0b2b48]/55 hover:bg-[#0b2b48]/75 backdrop-blur-md text-white border border-white/20 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#cdfb56]" />
              TEST MAYA VOICE
            </button>

            {/* Book Institutional Demo Button */}
            <button
              onClick={onOpenDemo}
              className="bg-[#cdfb56] hover:bg-[#bef03f] active:scale-95 text-black px-6 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_4px_20px_rgba(205,251,86,0.4)] flex items-center gap-2.5 cursor-pointer group"
            >
              <span>BOOK DEMO</span>
              <span className="w-6 h-6 rounded-full bg-black text-[#cdfb56] flex items-center justify-center transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>

        {/* 3D Floating Perspective Cards Arc */}
        <div className="relative z-20 w-full mt-2">
          <HeroCardsArc />
        </div>
      </div>
    </section>
  );
}
