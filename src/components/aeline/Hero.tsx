"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import HeroCardsArc from "./HeroCardsArc";
import {
  ArrowUpRight,
  PhoneCall,
  Sparkles,
  Zap,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Headphones,
  Radio,
  Play,
  Volume2,
} from "lucide-react";

interface HeroProps {
  onOpenDemo?: () => void;
  onOpenSimulator?: () => void;
}

export default function Hero({ onOpenDemo, onOpenSimulator }: HeroProps) {
  const [isPlayingSample, setIsPlayingSample] = useState(false);

  const toggleSample = () => {
    setIsPlayingSample(!isPlayingSample);
  };

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

        {/* Left Floating Live Telephony Preview Card (Fills left empty blue space on desktop) */}
        <div className="hidden xl:flex absolute left-5 2xl:left-12 top-44 2xl:top-48 z-20 w-72 flex-col gap-2.5 bg-white/85 dark:bg-[#0b2b48]/80 backdrop-blur-xl border border-white/60 shadow-[0_20px_45px_rgba(0,0,0,0.18)] rounded-2xl p-4 text-slate-900 pointer-events-auto hover:scale-[1.03] transition-all duration-300 animate-float select-none">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                Live Inbound Call
              </span>
            </div>
            <span className="bg-[#cdfb56] text-slate-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-black/10">
              Maya • Hindi
            </span>
          </div>

          {/* Interactive Soundwave Bar */}
          <div
            onClick={toggleSample}
            className="bg-slate-900/5 dark:bg-black/20 hover:bg-slate-900/10 rounded-xl p-2.5 flex items-center justify-between gap-2 border border-black/5 cursor-pointer transition-colors"
            title="Click to simulate live voice waveform"
          >
            <div className="flex items-center gap-1 h-5 shrink-0">
              <span className={`w-1 bg-[#197ee8] rounded-full transition-all duration-300 ${isPlayingSample ? "animate-[pulse_0.6s_infinite_100ms] h-4" : "h-2"}`} />
              <span className={`w-1 bg-[#197ee8] rounded-full transition-all duration-300 ${isPlayingSample ? "animate-[pulse_0.6s_infinite_300ms] h-5" : "h-4"}`} />
              <span className={`w-1 bg-[#cdfb56] rounded-full transition-all duration-300 ${isPlayingSample ? "animate-[pulse_0.6s_infinite_200ms] h-5" : "h-3"}`} />
              <span className={`w-1 bg-[#197ee8] rounded-full transition-all duration-300 ${isPlayingSample ? "animate-[pulse_0.6s_infinite_400ms] h-3" : "h-2"}`} />
              <span className={`w-1 bg-[#197ee8] rounded-full transition-all duration-300 ${isPlayingSample ? "animate-[pulse_0.6s_infinite_250ms] h-4" : "h-3"}`} />
            </div>
            <div className="text-[11px] font-medium text-slate-700 italic truncate flex-1 pl-1">
              "B.Tech CSE me scholarship cutoff kya hai?"
            </div>
            <div className="w-5 h-5 rounded-full bg-[#197ee8] text-white flex items-center justify-center shrink-0">
              <Volume2 className="w-3 h-3" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 pt-0.5">
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <CheckCircle2 className="w-3 h-3" />
              Pre-Approved (35% Waiver)
            </span>
            <span className="font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold">
              138ms Latency
            </span>
          </div>
        </div>

        {/* Right Floating Autonomous Fleet QoS Card (Fills right empty blue space on desktop) */}
        <div
          className="hidden xl:flex absolute right-5 2xl:right-12 top-44 2xl:top-48 z-20 w-72 flex-col gap-2.5 bg-white/85 dark:bg-[#0b2b48]/80 backdrop-blur-xl border border-white/60 shadow-[0_20px_45px_rgba(0,0,0,0.18)] rounded-2xl p-4 text-slate-900 pointer-events-auto hover:scale-[1.03] transition-all duration-300 animate-float select-none"
          style={{ animationDelay: "2s" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Campus Fleet Telemetry</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
              99.98% High QoS
            </span>
          </div>

          {/* Real-Time Metrics Strip */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-slate-900/5 dark:bg-black/20 rounded-xl p-2 border border-black/5">
              <div className="text-lg font-black font-mono text-slate-900 leading-tight">412</div>
              <div className="text-[10px] text-slate-500 font-medium">Calls Resolved Today</div>
            </div>
            <div className="bg-slate-900/5 dark:bg-black/20 rounded-xl p-2 border border-black/5">
              <div className="text-lg font-black font-mono text-slate-900 leading-tight">14 / 20</div>
              <div className="text-[10px] text-slate-500 font-medium">SIP Trunks Online</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-medium text-slate-600 pt-0.5">
            <span>Zero Queue Hold Time</span>
            <span className="text-blue-700 font-bold font-mono">10+ Indic Dialects</span>
          </div>
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
