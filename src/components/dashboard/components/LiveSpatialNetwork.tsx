"use client";

import React, { useState, useEffect } from "react";
import {
  PhoneIncoming,
  PhoneOutgoing,
  Cpu,
  MessagesSquare,
  CheckCircle2,
  PhoneForwarded,
  UserCheck,
  Sparkles,
  Zap,
  Activity,
  Maximize2,
  Volume2,
} from "lucide-react";

interface LiveSpatialNetworkProps {
  onInspectCall?: (callId: string) => void;
}

export default function LiveSpatialNetwork({ onInspectCall }: LiveSpatialNetworkProps) {
  const [filter, setFilter] = useState<"all" | "inbound" | "outbound">("all");
  const [activePulse, setActivePulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse((prev) => (prev + 1) % 4);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[26px] bg-white border border-black/[0.06] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] font-sans select-none">
      {/* Background Subtle Spatial Mesh Grid & Ambient Warm Pastel Glows */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FAF3E4] rounded-full blur-3xl pointer-events-none opacity-70" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C1F2D5]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-[#D9C2FA]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16856B] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16856B]" />
            </span>
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
              Live Neural Communication Stream
            </span>
            <span className="hidden sm:inline text-xs text-black/45 font-medium">
              • 3 Concurrent Sessions
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1A1A1A] tracking-tight mt-1 flex items-center gap-2 font-sans">
            AI Operations Network Core
            <span className="text-xs font-semibold text-[#1A1A1A] px-2.5 py-0.5 bg-[#FAF3E4] border border-black/[0.06] rounded-full">
              Latency: 38ms
            </span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-[#FAF3E4] p-1 rounded-full border border-black/[0.05] text-xs font-semibold">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
              filter === "all"
                ? "bg-[#111111] text-white shadow-xs"
                : "text-black/60 hover:text-black"
            }`}
          >
            All Flows
          </button>
          <button
            onClick={() => setFilter("inbound")}
            className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
              filter === "inbound"
                ? "bg-[#111111] text-white shadow-xs"
                : "text-black/60 hover:text-black"
            }`}
          >
            Inbound Telephony
          </button>
          <button
            onClick={() => setFilter("outbound")}
            className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
              filter === "outbound"
                ? "bg-[#111111] text-white shadow-xs"
                : "text-black/60 hover:text-black"
            }`}
          >
            Outbound Campaigns
          </button>
        </div>
      </div>

      {/* Main Visual Network Canvas */}
      <div className="relative w-full h-[320px] sm:h-[350px] lg:h-[380px] flex items-center justify-center select-none">
        {/* SVG Spatial Connection Lines with animated dash flows */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lineGradInbound" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#16856B" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="lineGradOutbound" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#553C9A" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="lineGradResult1" x1="0%" y1="50%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#16856B" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="lineGradResult2" x1="0%" y1="50%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#9A5B00" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* SVG Animated Connection Arcs */}
          {/* Node 1 (Inbound) -> Center */}
          <path
            d="M 120 90 Q 280 120 50% 50%"
            fill="none"
            stroke="url(#lineGradInbound)"
            strokeWidth="2.5"
            strokeDasharray="6,6"
            className="animate-[dash_20s_linear_infinite]"
          />
          {/* Node 2 (Outbound) -> Center */}
          <path
            d="M 120 280 Q 280 250 50% 50%"
            fill="none"
            stroke="url(#lineGradOutbound)"
            strokeWidth="2.5"
            strokeDasharray="6,6"
          />
          {/* Center -> Result (Completed/High Intent) */}
          <path
            d="M 50% 50% Q calc(100% - 240px) 110 calc(100% - 110px) 80"
            fill="none"
            stroke="url(#lineGradResult1)"
            strokeWidth="2.5"
            strokeDasharray="6,6"
          />
          {/* Center -> Result (Human Handoff) */}
          <path
            d="M 50% 50% Q calc(100% - 220px) 270 calc(100% - 110px) 290"
            fill="none"
            stroke="url(#lineGradResult2)"
            strokeWidth="2.5"
            strokeDasharray="6,6"
          />
        </svg>

        {/* 1. LEFT STAGE: INCOMING & OUTBOUND CHANNELS */}
        <div className="absolute left-3 sm:left-8 top-10 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-[#1A1A1A] transition-transform group-hover:scale-105">
              <PhoneIncoming className="w-5 h-5 text-[#16856B]" />
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10.5px] font-bold text-[#1A1A1A] bg-white px-2.5 py-0.5 rounded-full border border-black/[0.08] shadow-2xs">
              Inbound Call
            </span>
          </div>
        </div>

        <div className="absolute left-3 sm:left-8 bottom-10 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-[#1A1A1A] transition-transform group-hover:scale-105">
              <PhoneOutgoing className="w-5 h-5 text-[#2451B2]" />
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10.5px] font-bold text-[#1A1A1A] bg-white px-2.5 py-0.5 rounded-full border border-black/[0.08] shadow-2xs">
              Outbound Campaign
            </span>
          </div>
        </div>

        {/* 2. CENTER STAGE: AI AGENT ORCHESTRATION CORE */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Multi-layered Pulsing Orbital Rings */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#C1F2D5] animate-ping opacity-30" />
            <div className="absolute -inset-4 rounded-full border border-[#D9C2FA] animate-spin duration-[14000ms]" />
            <div className="absolute -inset-8 rounded-full border border-dashed border-black/[0.08] animate-spin duration-[22000ms]" />
            
            {/* Inner Core Ball */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#111111] shadow-2xl flex flex-col items-center justify-center text-white p-2">
              <Cpu className="w-7 h-7 sm:w-8 sm:h-8 mb-0.5 text-[#C1F2D5]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C1F2D5]">
                AI Brain
              </span>
              <span className="text-[9px] opacity-80 font-mono">
                Priya &amp; Rohan
              </span>
            </div>
          </div>

          <div className="mt-3 px-3.5 py-1 rounded-full bg-[#111111] text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm border border-black/10">
            <Sparkles className="w-3 h-3 text-[#C1F2D5]" />
            <span>Voice Activity: 98.4% Accuracy</span>
          </div>
        </div>

        {/* 3. RIGHT STAGE: OUTCOME & RESULT NODES */}
        <div className="absolute right-3 sm:right-8 top-10 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-[#16856B] transition-transform group-hover:scale-105">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10.5px] font-bold text-[#1A1A1A] bg-white px-2.5 py-0.5 rounded-full border border-black/[0.08] shadow-2xs">
              Student Captured
            </span>
          </div>
        </div>

        <div className="absolute right-3 sm:right-8 bottom-10 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-white border border-black/[0.08] shadow-sm flex items-center justify-center text-[#9A5B00] transition-transform group-hover:scale-105">
              <PhoneForwarded className="w-6 h-6" />
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10.5px] font-bold text-[#1A1A1A] bg-white px-2.5 py-0.5 rounded-full border border-black/[0.08] shadow-2xs">
              Counselor Handoff
            </span>
          </div>
        </div>

        {/* 4. FLOATING SPATIAL DATA CARDS */}
        
        {/* Floating Card 1: Top Center Left */}
        <div
          onClick={() => onInspectCall?.("live-call-101")}
          className="absolute left-[16%] sm:left-[22%] top-3 sm:top-6 bg-white rounded-2xl p-2.5 border border-black/[0.06] shadow-sm animate-drift-a cursor-pointer hover:scale-105 transition-transform max-w-[180px] sm:max-w-[210px] hidden xs:block"
        >
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="text-[11px] font-bold text-[#1A1A1A]">
              +91 98401 22340
            </span>
            <span className="px-2 py-0.5 text-[9.5px] font-bold rounded-full bg-[#C1F2D5] text-[#16856B]">
              High Intent
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-black/55">
            <span className="font-semibold text-[#1A1A1A]">Admissions Agent</span>
            <span className="flex items-center gap-1 text-black/60 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16856B] animate-ping" />
              01:42
            </span>
          </div>
        </div>

        {/* Floating Card 2: Bottom Center Left */}
        <div
          onClick={() => onInspectCall?.("live-call-102")}
          className="absolute left-[18%] sm:left-[24%] bottom-4 sm:bottom-8 bg-white rounded-2xl p-2.5 border border-black/[0.06] shadow-sm animate-drift-b cursor-pointer hover:scale-105 transition-transform max-w-[180px] sm:max-w-[210px] hidden xs:block"
        >
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="text-[11px] font-bold text-[#1A1A1A]">
              +91 98765 43210
            </span>
            <span className="px-2 py-0.5 text-[9.5px] font-bold rounded-full bg-[#BCD0F5]/50 text-[#2451B2]">
              Campus Tour
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-black/55">
            <span className="font-semibold text-[#1A1A1A]">Student Support</span>
            <span className="flex items-center gap-1 text-black/60 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2451B2]" />
              00:38
            </span>
          </div>
        </div>

        {/* Floating Card 3: Top Center Right */}
        <div className="absolute right-[16%] sm:right-[22%] top-3 sm:top-6 bg-white rounded-2xl p-2.5 border border-black/[0.06] shadow-sm animate-drift-b max-w-[180px] sm:max-w-[200px] hidden sm:block">
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="text-[11px] font-bold text-[#1A1A1A]">
              +91 91760 88231
            </span>
            <span className="px-2 py-0.5 text-[9.5px] font-bold rounded-full bg-[#C1F2D5] text-[#16856B]">
              Completed
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-black/55">
            <span className="font-medium text-[#1A1A1A]">Merit Scholarship</span>
            <span className="text-black/60 font-medium">03:15</span>
          </div>
        </div>

        {/* Floating Card 4: Bottom Center Right */}
        <div className="absolute right-[18%] sm:right-[24%] bottom-4 sm:bottom-8 bg-white rounded-2xl p-2.5 border border-black/[0.06] shadow-sm animate-drift-a max-w-[180px] sm:max-w-[200px] hidden sm:block">
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="text-[11px] font-bold text-[#1A1A1A]">
              +91 98765 11980
            </span>
            <span className="px-2 py-0.5 text-[9.5px] font-bold rounded-full bg-[#FFD9A0] text-[#9A5B00]">
              Handoff
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-black/55">
            <span className="font-medium text-[#9A5B00]">Escalated to Dean</span>
            <span className="text-black/60 font-medium">01:21</span>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Bar: Spatial Telemetry Metrics */}
      <div className="relative z-10 pt-3 border-t border-black/[0.05] flex flex-wrap items-center justify-between gap-3 text-xs text-black/60">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-medium">
            <Activity className="w-3.5 h-3.5 text-[#16856B]" />
            <span>Throughput: <strong className="text-[#1A1A1A] font-bold">4.2 req/sec</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 font-medium">
            <Zap className="w-3.5 h-3.5 text-[#9A5B00]" />
            <span>Synthesis: <strong className="text-[#1A1A1A] font-bold">99.8% Grounded</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10.5px] text-black/45">
          <span className="inline-block w-2 h-2 rounded-full bg-[#16856B]" />
          <span>COLLEGE → AI AGENTS → CONVERSATIONS → STUDENT INTELLIGENCE</span>
        </div>
      </div>
    </div>
  );
}
