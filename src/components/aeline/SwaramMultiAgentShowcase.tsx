"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowRight,
  Database,
  BarChart3,
  Code2,
  Cpu,
  Cog,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Bot,
  Zap,
  Globe
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface SwaramMultiAgentShowcaseProps {
  onOpenDemo?: () => void;
}

export default function SwaramMultiAgentShowcase({ onOpenDemo }: SwaramMultiAgentShowcaseProps) {
  const [activeNode, setActiveNode] = useState<number | null>(null);

  const nodes = [
    {
      id: 1,
      title: "Data & Knowledge Ingestion",
      category: "Storage / ERP Sync",
      icon: Database,
      color: "from-slate-600 to-slate-800",
      badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
      description: "Direct real-time ingestion of collegiate syllabi, JoSAA cutoff matrices, fee structures, and campus documents.",
    },
    {
      id: 2,
      title: "Admissions Yield Telemetry",
      category: "Analytics & Scoring",
      icon: BarChart3,
      color: "from-rose-500 to-red-600",
      badgeColor: "bg-red-50 text-red-700 border-red-200",
      description: "Continuous tracking of candidate qualification, objection patterns, and high-intent enrollment signals.",
    },
    {
      id: 3,
      title: "Carrier Telephony Code",
      category: "SIP / WebRTC Pipeline",
      icon: Code2,
      color: "from-amber-500 to-orange-600",
      badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
      description: "Carrier-grade low-latency telephony protocol handling simultaneous multi-lingual calls across 11+ Indian languages.",
    },
    {
      id: 4,
      title: "Cognitive AI Intelligence",
      category: "Multi-Agent Reasoning",
      icon: Sparkles,
      color: "from-amber-400 to-amber-500",
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      description: "Empathy-aware dialect adaptation, context retention across turns, and contextual merit scholarship evaluation.",
    },
    {
      id: 5,
      title: "Autonomous Action Engine",
      category: "Execution & Workflows",
      icon: Cog,
      color: "from-rose-600 to-red-700",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
      description: "Automated student record updates, instant WhatsApp confirmations, and seamless escalation to senior counselors.",
    },
  ];

  return (
    <div
      id="multi-agent-architecture"
      className="bg-white rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-[0_22px_50px_-15px_rgba(0,0,0,0.06)] relative overflow-hidden select-none scroll-mt-24"
    >
      {/* Background Dot Matrix Pattern (Matching Poster Aesthetic) */}
      <div
        className="absolute inset-0 opacity-[0.45] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Top Banner Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10 pb-6 border-b border-slate-100 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-widest font-mono">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-600 inline-block" />
            <span>Intelligence. Integrated.</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Multi-Agent Architecture Blueprint
          </span>
        </div>

        {/* Swaram Official Badge (Replaced Fingent) */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-sans text-xs font-bold shadow-md shadow-red-500/20 tracking-tight">
            <Globe className="w-3.5 h-3.5 text-white/90" />
            <span className="text-sm font-extrabold tracking-wide">swaram</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Poster Display on Left, Interactive Modules & Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        {/* Left Column: High-Res Framed Swaram Poster */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            onClick={() => {
              soundSynth.playPop();
              onOpenDemo?.();
            }}
            className="w-full max-w-[420px] rounded-[28px] overflow-hidden border border-slate-200/90 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] hover:shadow-[0_26px_60px_-10px_rgba(220,38,38,0.18)] hover:scale-[1.015] hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white group relative"
            title="Click to explore interactive Swaram demo"
          >
            <div className="relative aspect-[3/4] w-full bg-[#fdfdfd]">
              <Image
                src="/images/swaram-multi-agent-ai.jpg"
                alt="Swaram Multi-Agent AI - Build multi-agent AI that actually works. Start with the problem. Scale with structure."
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-contain"
              />
            </div>

            {/* Hover Pill Cue */}
            <div className="absolute bottom-3 inset-x-3 bg-slate-900/90 backdrop-blur-md text-white py-2 px-3 rounded-xl flex items-center justify-between text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Explore Swaram Multi-Agent System</span>
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* Direct Caption */}
          <div className="mt-3 text-center">
            <p className="text-[11px] font-mono text-slate-400">
              Official Architecture Blueprint • Swaram AI Multi-Agent Mesh
            </p>
          </div>
        </div>

        {/* Right Column: Architectural Highlights & Interactive Nodes */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold tracking-wide">
              <Zap className="w-3.5 h-3.5 text-red-600 fill-red-600" />
              <span>START WITH THE PROBLEM. SCALE WITH STRUCTURE.</span>
            </div>

            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              Build multi-agent AI <br />
              <span className="text-red-600">that actually works.</span>
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-xl">
              Rather than generic black-box chatbots, Swaram organizes autonomous voice agents into specialized roles: ingest institutional knowledge, run yield telemetry, adapt speech dialects in sub-400ms, and securely execute ERP actions.
            </p>
          </div>

          {/* Interactive Node Breakdown Cards */}
          <div className="space-y-2.5 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Connected Agent Ecosystem Nodes:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {nodes.map((node, index) => {
                const IconComponent = node.icon;
                const isHovered = activeNode === node.id;
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => {
                      setActiveNode(node.id);
                      soundSynth.playPop();
                    }}
                    onMouseLeave={() => setActiveNode(null)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isHovered
                        ? "bg-slate-50 border-red-300 shadow-sm translate-x-1"
                        : "bg-white border-slate-200/80 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div
                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${node.color} text-white flex items-center justify-center shrink-0 shadow-2xs`}
                      >
                        <IconComponent className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-slate-900 truncate">
                          {node.title}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {node.category}
                        </div>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                      {node.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA & Verification Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundSynth.playSuccess();
                  onOpenDemo?.();
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 active:scale-95 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Learn more</span>
                <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-red-600 group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="w-3 h-3 stroke-[3]" />
                </span>
              </button>

              <a
                href="#try-voices"
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors px-3 py-2"
              >
                Audition Voice Agents ↓
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="font-semibold text-slate-700">www.swaram.com</span>
              <span>•</span>
              <span className="text-slate-500">info@swaram.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
