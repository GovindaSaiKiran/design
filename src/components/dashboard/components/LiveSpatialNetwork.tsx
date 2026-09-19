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
    <div className="relative overflow-hidden rounded-3xl glass-lvl-3 border border-blue-100/80 p-6 shadow-xl">
      {/* Background Subtle Spatial Mesh Grid & Ambient Glows */}
      <div className="absolute inset-0 spatial-grid-bg opacity-70 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[340px] bg-cyan-300/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Controls */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-700 bg-cyan-50 border border-cyan-200/80 px-2.5 py-0.5 rounded-full">
              Live Neural Communication Stream
            </span>
            <span className="hidden sm:inline text-xs text-slate-400">
              • 3 Concurrent Sessions
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2 font-sans">
            AI Operations Network Core
            <span className="text-xs font-normal text-slate-500 px-2 py-0.5 bg-slate-100 rounded-md">
              Latency: 38ms
            </span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 text-xs font-medium">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === "all"
                ? "bg-white text-slate-900 shadow-sm font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Flows
          </button>
          <button
            onClick={() => setFilter("inbound")}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === "inbound"
                ? "bg-white text-slate-900 shadow-sm font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Inbound Telephony
          </button>
          <button
            onClick={() => setFilter("outbound")}
            className={`px-3 py-1 rounded-lg transition-all ${
              filter === "outbound"
                ? "bg-white text-slate-900 shadow-sm font-semibold"
                : "text-slate-600 hover:text-slate-900"
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
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="lineGradOutbound" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="lineGradResult1" x1="0%" y1="50%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="lineGradResult2" x1="0%" y1="50%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
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

        {/* ========================================================================= */}
        {/* 1. LEFT STAGE: INCOMING & OUTBOUND CHANNELS */}
        {/* ========================================================================= */}
        <div className="absolute left-3 sm:left-8 top-10 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-sky-300 shadow-md flex items-center justify-center text-sky-600 transition-transform group-hover:scale-110">
              <PhoneIncoming className="w-6 h-6 animate-pulse" />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-sky-400/20 blur-sm -z-10" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200">
              Inbound Call
            </span>
          </div>
        </div>

        <div className="absolute left-3 sm:left-8 bottom-10 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-indigo-300 shadow-md flex items-center justify-center text-indigo-600 transition-transform group-hover:scale-110">
              <PhoneOutgoing className="w-6 h-6" />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-indigo-400/20 blur-sm -z-10" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200">
              Outbound Campaign
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CENTER STAGE: AI AGENT ORCHESTRATION CORE */}
        {/* ========================================================================= */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Multi-layered Pulsing Orbital Rings */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-blue-400/30 animate-ping opacity-30" />
            <div className="absolute -inset-4 rounded-full border border-cyan-400/25 animate-spin duration-[14000ms]" />
            <div className="absolute -inset-8 rounded-full border border-dashed border-indigo-400/20 animate-spin duration-[22000ms]" />
            
            {/* Inner Core Ball */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 shadow-2xl flex flex-col items-center justify-center text-white glow-blue-subtle p-2">
              <Cpu className="w-7 h-7 sm:w-8 sm:h-8 mb-0.5 animate-bounce" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-200">
                AI Brain
              </span>
              <span className="text-[9px] opacity-80 font-mono">
                Priya & Rohan
              </span>
            </div>
          </div>

          <div className="mt-3 px-3 py-1 rounded-full bg-slate-900/90 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-md border border-slate-700">
            <Sparkles className="w-3 h-3 text-[#cdfb56]" />
            <span>Voice Activity: 98.4% Accuracy</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. RIGHT STAGE: OUTCOME & RESULT NODES */}
        {/* ========================================================================= */}
        <div className="absolute right-3 sm:right-8 top-10 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-emerald-300 shadow-md flex items-center justify-center text-emerald-600 transition-transform group-hover:scale-110">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-emerald-400/20 blur-sm -z-10" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200">
              Student Captured
            </span>
          </div>
        </div>

        <div className="absolute right-3 sm:right-8 bottom-10 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-white border-2 border-amber-300 shadow-md flex items-center justify-center text-amber-600 transition-transform group-hover:scale-110">
              <PhoneForwarded className="w-6 h-6" />
            </div>
            <div className="absolute -inset-1 rounded-2xl bg-amber-400/20 blur-sm -z-10" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200">
              Counselor Handoff
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. FLOATING SPATIAL DATA CARDS (College Context) */}
        {/* ========================================================================= */}
        
        {/* Floating Card 1: Top Center Left */}
        <div
          onClick={() => onInspectCall?.("live-call-101")}
          className="absolute left-[16%] sm:left-[22%] top-3 sm:top-6 glass-lvl-3 rounded-xl p-2.5 border border-sky-200/90 shadow-lg animate-drift-a cursor-pointer hover:scale-105 transition-transform max-w-[180px] sm:max-w-[210px] hidden xs:block"
        >
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="font-mono text-[11px] font-bold text-slate-800">
              +91 98401 22340
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-100 text-emerald-800">
              High Intent
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span className="font-semibold text-blue-600">Admissions Agent</span>
            <span className="flex items-center gap-1 font-mono text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              01:42
            </span>
          </div>
        </div>

        {/* Floating Card 2: Bottom Center Left */}
        <div
          onClick={() => onInspectCall?.("live-call-102")}
          className="absolute left-[18%] sm:left-[24%] bottom-4 sm:bottom-8 glass-lvl-3 rounded-xl p-2.5 border border-indigo-200/90 shadow-lg animate-drift-b cursor-pointer hover:scale-105 transition-transform max-w-[180px] sm:max-w-[210px] hidden xs:block"
        >
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="font-mono text-[11px] font-bold text-slate-800">
              +91 98765 43210
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-cyan-100 text-cyan-800">
              Counseling Tour
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span className="font-semibold text-indigo-600">Student Support</span>
            <span className="flex items-center gap-1 font-mono text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              00:38
            </span>
          </div>
        </div>

        {/* Floating Card 3: Top Center Right */}
        <div className="absolute right-[16%] sm:right-[22%] top-3 sm:top-6 glass-lvl-3 rounded-xl p-2.5 border border-emerald-200/90 shadow-lg animate-drift-b max-w-[180px] sm:max-w-[200px] hidden sm:block">
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="font-mono text-[11px] font-bold text-slate-800">
              +91 91760 88231
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-emerald-100 text-emerald-800">
              Completed
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span className="font-medium text-slate-600">Merit Scholarship</span>
            <span className="font-mono text-slate-700">03:15</span>
          </div>
        </div>

        {/* Floating Card 4: Bottom Center Right */}
        <div className="absolute right-[18%] sm:right-[24%] bottom-4 sm:bottom-8 glass-lvl-3 rounded-xl p-2.5 border border-amber-200/90 shadow-lg animate-drift-a max-w-[180px] sm:max-w-[200px] hidden sm:block">
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <span className="font-mono text-[11px] font-bold text-slate-800">
              +91 98765 11980
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-amber-100 text-amber-800">
              Handoff
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span className="font-medium text-amber-700">Escalated to Dean</span>
            <span className="font-mono text-slate-700">01:21</span>
          </div>
        </div>
      </div>

      {/* Bottom Sub-Bar: Spatial Telemetry Metrics */}
      <div className="relative z-10 pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-medium">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Throughput: <strong className="text-slate-900">4.2 req/sec</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Synthesis: <strong className="text-slate-900">99.8% Grounded</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span>COLLEGE → AI AGENTS → CONVERSATIONS → STUDENT INTELLIGENCE</span>
        </div>
      </div>
    </div>
  );
}
