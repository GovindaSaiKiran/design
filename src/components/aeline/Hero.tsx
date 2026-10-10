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
}

export default function Hero({ onOpenDemo, onOpenSimulator }: HeroProps) {
  return (
    <section className="w-full p-2 sm:p-4 lg:p-6 bg-[#ffffff]">
      {/* Framed Rounded Hero Canvas matching uploaded screenshot */}
      <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] border border-slate-200/80 shadow-[0_10px_40px_rgba(0,0,0,0.03)] bg-white flex flex-col justify-between overflow-hidden">
        
        {/* Global Navigation Header */}
        <div className="relative z-30">
          <Navbar
            onOpenDemo={onOpenDemo}
            onOpenSimulator={onOpenSimulator}
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
            className="text-black font-bold text-4xl sm:text-5xl md:text-6xl lg:text-[72px] xl:text-[76px] leading-[1.08] sm:leading-[1.06] tracking-[-0.03em] mb-6 max-w-4xl mx-auto text-center"
          >
            Let AI Handle the Calls.<br />
            Your Team Handles What<br className="hidden sm:inline" /> Matters.
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
            {/* Explore Capabilities Button */}
            <button
              onClick={onOpenSimulator}
              className="bg-white hover:bg-slate-50 active:scale-95 text-[#64748b] hover:text-slate-950 border border-slate-200/90 hover:border-slate-300 px-7 sm:px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_0_32px_8px_rgba(205,251,86,0.45)] hover:scale-[1.02] cursor-pointer flex items-center gap-2 group"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#84cc16] group-hover:scale-115 group-hover:rotate-12 transition-transform duration-300" />
              <span>EXPLORE CAPABILITIES</span>
            </button>

            {/* Create Your AI Agent Button - Glow Appears on Hover */}
            <button
              onClick={onOpenDemo}
              className="relative bg-white hover:bg-slate-50 active:scale-95 text-slate-900 border border-slate-200/90 hover:border-slate-300 px-7 sm:px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_0_40px_12px_rgba(205,251,86,0.75)] hover:scale-[1.02] cursor-pointer flex items-center gap-2 group"
            >
              <span>CREATE YOUR AI AGENT</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#84cc16] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110" />
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
