"use client";

import React from "react";
import Navbar from "./Navbar";
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
  onOpenLogin?: () => void;
  onOpenGetStarted?: () => void;
  onOpenSignUp?: () => void;
}

export default function Hero({
  onOpenDemo,
  onOpenSimulator,
  onOpenLogin,
  onOpenGetStarted,
  onOpenSignUp,
}: HeroProps) {
  const handleSignUpClick = onOpenSignUp || onOpenGetStarted;

  return (
    <section className="w-full p-2 sm:p-4 lg:p-6 bg-[#ffffff]">
      {/* Framed Rounded Hero Canvas matching uploaded screenshot */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] border border-slate-200/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white flex flex-col justify-between overflow-hidden">
        
        {/* Global Navigation Header */}
        <div className="relative z-30">
          <Navbar
            onOpenDemo={onOpenDemo}
            onOpenSimulator={onOpenSimulator}
            onOpenLogin={onOpenLogin}
            onOpenGetStarted={handleSignUpClick}
            onOpenSignUp={handleSignUpClick}
          />
        </div>

        {/* Hero Central Content */}
        <div className="relative z-20 w-full max-w-4xl mx-auto px-4 pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 text-center flex flex-col items-center">
          
          {/* Top Announcement Pill */}
          <button
            onClick={onOpenSimulator}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-[#e5e7eb] shadow-xs text-xs font-semibold tracking-wide mb-6 sm:mb-8 group cursor-pointer transition-all hover:scale-[1.01] active:scale-95"
          >
            <span className="font-bold text-[#84cc16] uppercase text-[11px] sm:text-xs tracking-wider">
              BULBUL V3
            </span>
            <span className="text-[#9ca3af] text-xs sm:text-[13px] font-normal">
              Autonomous Indic Voice Telephony & Counseling
            </span>
          </button>

          {/* Main Headline */}
          <h1
            style={{ color: "#000000" }}
            className="font-display text-black font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[76px] leading-[1.08] sm:leading-[1.06] tracking-[-0.03em] mb-6 max-w-4xl mx-auto text-center"
          >
            Let AI Handle the Calls.<br />
            Your Team Handles <span className="font-serif-editorial italic font-normal text-slate-900">What Matters.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{ color: "#475569" }}
            className="text-slate-600 text-sm sm:text-base lg:text-[17px] max-w-2xl mx-auto font-normal leading-relaxed mb-8 sm:mb-9 px-4 text-center"
          >
            Create voice agents for your business, institution, hospital, or service team.<br className="hidden sm:inline" />
            Give them the context, choose their voice, schedule their calls, and let them<br className="hidden sm:inline" />
            handle conversations at scale.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-8 sm:mb-9">
            {/* Sign Up / Get Started Primary Button */}
            <button
              onClick={handleSignUpClick}
              className="relative bg-[#cdfb56] hover:bg-[#bef03f] active:scale-95 text-slate-950 border border-[#bef03f] px-7 sm:px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(205,251,86,0.4)] hover:shadow-[0_0_36px_10px_rgba(205,251,86,0.65)] hover:scale-[1.02] cursor-pointer flex items-center gap-2 group"
            >
              <span>SIGN UP FOR FREE</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-950 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110" />
            </button>

            {/* Explore Capabilities / Voice Simulator Button */}
            <button
              onClick={onOpenSimulator}
              className="bg-white hover:bg-slate-50 active:scale-95 text-[#64748b] hover:text-slate-950 border border-slate-200/90 hover:border-slate-300 px-7 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:scale-[1.02] cursor-pointer flex items-center gap-2 group"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#0284c7] group-hover:scale-115 group-hover:rotate-12 transition-transform duration-300" />
              <span>TEST MAYA VOICE</span>
            </button>

            {/* Schedule Campus Pilot Button */}
            <button
              onClick={onOpenDemo}
              className="bg-slate-950 hover:bg-slate-900 active:scale-95 text-white border border-slate-950 px-6 sm:px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:scale-[1.02] cursor-pointer flex items-center gap-1.5 group"
            >
              <span>SCHEDULE DEMO</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#cdfb56] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Trust & Key Capability Micro-Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-slate-500 text-[11px] sm:text-xs font-medium shadow-xs hover:border-slate-300 transition-colors">
              <Zap className="w-3.5 h-3.5 text-[#84cc16]" />
              <span>Sub-140ms Latency</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-slate-500 text-[11px] sm:text-xs font-medium shadow-xs hover:border-slate-300 transition-colors">
              <Globe className="w-3.5 h-3.5 text-[#84cc16]" />
              <span>Hindi, Telugu, Tamil, Kannada + 10 Dialects</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-slate-500 text-[11px] sm:text-xs font-medium shadow-xs hover:border-slate-300 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-[#84cc16]" />
              <span>FERPA & DPDP Grounded</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-slate-500 text-[11px] sm:text-xs font-medium shadow-xs hover:border-slate-300 transition-colors">
              <Activity className="w-3.5 h-3.5 text-[#84cc16]" />
              <span>Zero Human Queue Wait</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
