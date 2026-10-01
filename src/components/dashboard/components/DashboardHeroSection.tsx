"use client";

import React from "react";
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  TrendingUp,
  Star,
  Users,
  Clock,
  Compass,
  CheckCircle2,
} from "lucide-react";
import { OrganizationInfo } from "@/types/dashboard";

interface DashboardHeroSectionProps {
  currentOrg: OrganizationInfo;
  onCreateAgent: () => void;
  onDispatchGoal: () => void;
  onExploreCapabilities?: () => void;
}

export default function DashboardHeroSection({
  currentOrg,
  onCreateAgent,
  onDispatchGoal,
  onExploreCapabilities,
}: DashboardHeroSectionProps) {
  return (
    <section className="w-full mb-10 pt-2 font-sans select-none">
      {/* ========================================================================= */}
      {/* 1. FRONT-PAGE HERO HEADLINE & ACTIONS (Matching PDF Page 1)               */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto text-center space-y-5 mb-10">
        {/* Eyebrow Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-white/90 border border-neutral-200 text-neutral-800 shadow-2xs backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          <span>AUTONOMOUS ADMISSIONS OPERATIONS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
        </div>

        {/* Giant Editorial Serif Headline (Matches Front Page) */}
        <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-900 leading-[1.12]">
          Let AI Handle the Calls.<br />
          <span className="font-serif italic text-neutral-500">Your Team Handles What Matters.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Create and orchestrate autonomous voice agents for {currentOrg.name}. Ingest official college prospectuses,
          match merit scholarships on call, and answer inquiries across India's languages with zero hold times.
        </p>

        {/* Front-Page Style Pill CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onExploreCapabilities}
            className="px-5 py-2.5 rounded-full bg-white/80 hover:bg-white text-neutral-800 text-xs font-bold uppercase tracking-wider border border-neutral-200 hover:border-neutral-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Compass className="w-4 h-4 text-neutral-500" />
            <span>EXPLORE CAPABILITIES</span>
          </button>

          <button
            onClick={onCreateAgent}
            className="bg-[#cdfb56] hover:bg-[#bef03f] active:scale-95 text-black text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded-full shadow-[0_0_24px_rgba(205,251,86,0.4)] hover:shadow-[0_0_30px_rgba(205,251,86,0.6)] transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <span>CREATE YOUR AI AGENT</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          <button
            onClick={onDispatchGoal}
            className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-[#cdfb56]" />
            <span>DELEGATE OUTBOUND GOAL</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PERSPECTIVE FEATURE PILLS (Matches PDF Page 1-2 Cards)                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-8">
        {/* Pill 1: Smart Handoff */}
        <div className="bg-white/90 backdrop-blur-xl border border-neutral-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              Smart Handoff
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
              Warm Route
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-tight">
            Live transfer with auto-generated student counseling dossier
          </p>
        </div>

        {/* Pill 2: Compliance Vault */}
        <div className="bg-white/90 backdrop-blur-xl border border-neutral-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Compliance Vault
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
              FERPA
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-tight">
            Higher-ed grade enterprise student data privacy & zero PII training
          </p>
        </div>

        {/* Pill 3: Merit & Aid Engine */}
        <div className="bg-white/90 backdrop-blur-xl border border-neutral-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              Merit & Aid
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-100">
              Instant
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-tight">
            Real-time tuition grant & fee waiver calculation on live calls
          </p>
        </div>

        {/* Pill 4: Sub-140ms Latency */}
        <div className="bg-white/90 backdrop-blur-xl border border-neutral-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-purple-600" />
              Sub-140ms Turn
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md border border-purple-100">
              Bulbul V3
            </span>
          </div>
          <p className="text-[11px] text-neutral-500 leading-tight">
            WebSocket full-duplex speech synthesis across 11 native Indic dialects
          </p>
        </div>
      </div>

      {/* University Social Proof Tag (Matches PDF Page 2) */}
      <div className="text-center">
        <p className="text-xs font-semibold text-neutral-600 flex items-center justify-center gap-2">
          <span>Rated 4.9/5 by 120+ Universities & Colleges</span>
          <span className="inline-flex text-amber-400 gap-0.5 text-xs">
            {"★".repeat(5)}
          </span>
        </p>
      </div>
    </section>
  );
}
