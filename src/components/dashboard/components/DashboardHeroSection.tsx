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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[#FAF3E4] border border-black/[0.06] text-[#1A1A1A] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#8C5300] fill-[#FFD9A0]" />
          <span>AUTONOMOUS ADMISSIONS OPERATIONS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#16856B] animate-pulse ml-1" />
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1A1A1A] leading-[1.12]">
          Let AI Handle the Calls.<br />
          <span className="text-black/55 font-medium">Your Team Handles What Matters.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-black/60 max-w-2xl mx-auto leading-relaxed">
          Create and orchestrate autonomous voice agents for {currentOrg.name}. Ingest official college prospectuses,
          match merit scholarships on call, and answer inquiries across India&apos;s languages with zero hold times.
        </p>

        {/* Front-Page Style Pill CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onExploreCapabilities}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider border border-black/[0.06] shadow-sm transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Compass className="w-4 h-4 text-black/50" />
            <span>EXPLORE CAPABILITIES</span>
          </button>

          <button
            onClick={onCreateAgent}
            className="bg-[#111111] hover:bg-[#222222] active:scale-95 text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <span>CREATE YOUR AI AGENT</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5] text-[#C1F2D5]" />
          </button>

          <button
            onClick={onDispatchGoal}
            className="px-5 py-2.5 rounded-full bg-[#FAF3E4] hover:bg-[#F3EBDA] text-[#1A1A1A] text-xs font-bold uppercase tracking-wider border border-black/[0.06] shadow-xs transition-all cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 text-[#8C5300]" />
            <span>DELEGATE OUTBOUND GOAL</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PERSPECTIVE FEATURE PILLS (Matches PDF Page 1-2 Cards)                 */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-8">
        {/* Pill 1: Smart Handoff */}
        <div className="bg-white border border-black/[0.06] rounded-[22px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#2C4875]" />
              Smart Handoff
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest bg-[#BCD0F5] text-[#2C4875] px-2 py-0.5 rounded-full">
              Warm Route
            </span>
          </div>
          <p className="text-[11px] text-black/55 leading-tight">
            Live transfer with auto-generated student counseling dossier
          </p>
        </div>

        {/* Pill 2: Compliance Vault */}
        <div className="bg-white border border-black/[0.06] rounded-[22px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16856B]" />
              Compliance Vault
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest bg-[#C1F2D5] text-[#16856B] px-2 py-0.5 rounded-full">
              FERPA
            </span>
          </div>
          <p className="text-[11px] text-black/55 leading-tight">
            Higher-ed grade enterprise student data privacy &amp; zero PII training
          </p>
        </div>

        {/* Pill 3: Merit & Aid Engine */}
        <div className="bg-white border border-black/[0.06] rounded-[22px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#8C5300]" />
              Merit &amp; Aid
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest bg-[#FFD9A0] text-[#8C5300] px-2 py-0.5 rounded-full">
              Instant
            </span>
          </div>
          <p className="text-[11px] text-black/55 leading-tight">
            Real-time tuition grant &amp; fee waiver calculation on live calls
          </p>
        </div>

        {/* Pill 4: Sub-140ms Latency */}
        <div className="bg-white border border-black/[0.06] rounded-[22px] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#4A2574]" />
              Sub-140ms Turn
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest bg-[#D9C2FA] text-[#4A2574] px-2 py-0.5 rounded-full">
              Bulbul V3
            </span>
          </div>
          <p className="text-[11px] text-black/55 leading-tight">
            WebSocket full-duplex speech synthesis across 11 native Indic dialects
          </p>
        </div>
      </div>

      {/* University Social Proof Tag (Matches PDF Page 2) */}
      <div className="text-center">
        <p className="text-xs font-semibold text-black/60 flex items-center justify-center gap-2">
          <span>Rated 4.9/5 by 120+ Universities &amp; Colleges</span>
          <span className="inline-flex text-[#8C5300] gap-0.5 text-xs">
            {"★".repeat(5)}
          </span>
        </p>
      </div>
    </section>
  );
}
