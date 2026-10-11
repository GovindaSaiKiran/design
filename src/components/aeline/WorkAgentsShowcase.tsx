"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Send,
  Play,
  Square,
  Sparkles,
  CheckCircle2,
  Layers,
  Bot,
  Volume2,
  Database,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Check,
  GraduationCap,
  Building2,
  FileText,
  BookOpen,
  User,
  UserCheck,
  Phone,
  BarChart2,
  MessageSquare,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";
import SwaramMultiAgentShowcase from "./SwaramMultiAgentShowcase";

interface WorkAgentsShowcaseProps {
  onOpenDemo?: () => void;
}

interface VoiceDiscItem {
  id: string;
  name: string;
  tone: string;
  toneTag: string;
  tonePill: string;
  timbre: string;
  cadence: string;
  inflection: string;
  acousticProfile: string;
  sampleText: string;
  pitch: number;
  rate: number;
  auraClass: string;
  plaqueClass: string;
  themeColor: "blue" | "orange" | "emerald" | "rose";
  plaqueBgClass: string;
  auraGlowClass: string;
  coreGlowClass: string;
  rimStreakClass: string;
  cardBottomGlowClass: string;
  waveBarColor: string;
  playRingColor: string;
  tagColor: string;
}

export default function WorkAgentsShowcase({ onOpenDemo }: WorkAgentsShowcaseProps) {
  const [activeVoice, setActiveVoice] = useState<string>("Ritu");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const voiceDiscs: VoiceDiscItem[] = [
    {
      id: "ritu",
      name: "Ritu",
      tone: "Expressive & Empathetic",
      toneTag: "Empathetic Tone",
      tonePill: "Empathetic",
      timbre: "Rich & Warm Timbre",
      cadence: "Fluid Conversational Pace",
      inflection: "High Emotional Depth",
      acousticProfile: "Balanced Pitch • Rich Harmonics",
      sampleText:
        "Hello! I am Ritu. My voice delivers an expressive and empathetic tone with natural warmth, intuitive pacing, and emotional resonance.",
      pitch: 1.05,
      rate: 0.96,
      auraClass: "from-[#f8faff] via-[#eef4ff] to-[#dfeaff]",
      plaqueClass: "bg-gradient-to-r from-[#4f46e5] to-[#3730a3] text-white",
      themeColor: "blue",
      plaqueBgClass:
        "bg-gradient-to-b from-[#0b172e] via-[#071022] to-[#030611] border border-blue-400/25 shadow-[0_14px_35px_-8px_rgba(37,99,235,0.45)] text-white",
      auraGlowClass:
        "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-400 via-blue-600 to-transparent",
      coreGlowClass:
        "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-200 via-blue-400 to-blue-600",
      rimStreakClass:
        "bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_12px_#60a5fa]",
      cardBottomGlowClass: "bg-blue-500/25",
      waveBarColor: "bg-blue-500",
      playRingColor: "border-blue-400",
      tagColor: "text-blue-300",
    },
    {
      id: "neha",
      name: "Neha",
      tone: "Warm & Encouraging",
      toneTag: "Warm Tone",
      tonePill: "Encouraging",
      timbre: "Bright & Cheerful Timbre",
      cadence: "Upbeat & Friendly Pace",
      inflection: "Uplifting Positivity",
      acousticProfile: "Higher Melodic • Crisp Overtones",
      sampleText:
        "Hi there! I am Neha. My voice features a bright, encouraging, and cheerful tone designed to create instant comfort and genuine rapport.",
      pitch: 1.2,
      rate: 1.04,
      auraClass: "from-[#fffaf5] via-[#fff1e6] to-[#fed7aa]/50",
      plaqueClass: "bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white",
      themeColor: "orange",
      plaqueBgClass:
        "bg-gradient-to-b from-[#2b1406] via-[#1a0c04] to-[#0d0502] border border-orange-400/25 shadow-[0_14px_35px_-8px_rgba(234,88,12,0.45)] text-white",
      auraGlowClass:
        "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-400 via-orange-500 to-transparent",
      coreGlowClass:
        "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-orange-400 to-orange-600",
      rimStreakClass:
        "bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_12px_#fb923c]",
      cardBottomGlowClass: "bg-orange-500/25",
      waveBarColor: "bg-orange-500",
      playRingColor: "border-orange-400",
      tagColor: "text-orange-300",
    },
    {
      id: "ishita",
      name: "Ishita",
      tone: "Articulate & Professional",
      toneTag: "Articulate Tone",
      tonePill: "Articulate",
      timbre: "Crisp & Precision Timbre",
      cadence: "Measured & Steady Cadence",
      inflection: "Executive Composure",
      acousticProfile: "Calibrated Mid • Clear Articulation",
      sampleText:
        "Greetings. I am Ishita. My voice delivers crisp articulation, executive composure, and crystal-clear acoustic clarity for professional discussions.",
      pitch: 0.95,
      rate: 0.98,
      auraClass: "from-[#f6fdf8] via-[#ecfdf5] to-[#a7f3d0]/50",
      plaqueClass: "bg-gradient-to-r from-[#10b981] to-[#059669] text-white",
      themeColor: "emerald",
      plaqueBgClass:
        "bg-gradient-to-b from-[#06241a] via-[#041811] to-[#020d09] border border-emerald-400/25 shadow-[0_14px_35px_-8px_rgba(16,185,129,0.45)] text-white",
      auraGlowClass:
        "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-400 via-emerald-600 to-transparent",
      coreGlowClass:
        "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-200 via-emerald-400 to-teal-600",
      rimStreakClass:
        "bg-gradient-to-r from-transparent via-emerald-300 to-transparent shadow-[0_0_12px_#34d399]",
      cardBottomGlowClass: "bg-emerald-500/25",
      waveBarColor: "bg-emerald-500",
      playRingColor: "border-emerald-400",
      tagColor: "text-emerald-300",
    },
    {
      id: "suhani",
      name: "Suhani",
      tone: "Polite & Persuasive",
      toneTag: "Persuasive Tone",
      tonePill: "Persuasive",
      timbre: "Smooth & Diplomatic Timbre",
      cadence: "Melodic & Convincing Pace",
      inflection: "Gentle Persuasion",
      acousticProfile: "Soft Resonant • Dynamic Contour",
      sampleText:
        "Hello! I am Suhani. My voice blends gentle diplomacy with a persuasive, melodic cadence to communicate with grace, tact, and confidence.",
      pitch: 1.15,
      rate: 1.0,
      auraClass: "from-[#fff5f8] via-[#fff1f2] to-[#fecdd3]/50",
      plaqueClass: "bg-gradient-to-r from-[#f43f5e] to-[#e11d48] text-white",
      themeColor: "rose",
      plaqueBgClass:
        "bg-gradient-to-b from-[#2a0817] via-[#1a050f] to-[#0d0208] border border-rose-400/25 shadow-[0_14px_35px_-8px_rgba(244,63,94,0.45)] text-white",
      auraGlowClass:
        "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-400 via-rose-600 to-transparent",
      coreGlowClass:
        "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-200 via-rose-400 to-pink-600",
      rimStreakClass:
        "bg-gradient-to-r from-transparent via-rose-300 to-transparent shadow-[0_0_12px_#fb7185]",
      cardBottomGlowClass: "bg-rose-500/25",
      waveBarColor: "bg-rose-500",
      playRingColor: "border-rose-400",
      tagColor: "text-rose-300",
    },
  ];

  const enterpriseConnectors = [
    {
      name: "Google Drive",
      type: "Collegiate Docs",
      status: "Synced",
      rotation: "rotate-[-4deg] hover:rotate-0 hover:-translate-y-3",
      stackedEdge: "shadow-[0_1px_0_#bbf7d0,0_2px_0_#bbf7d0,0_3px_0_#86efac,0_4px_0_#86efac,0_5px_0_#4ade80,0_6px_0_#22c55e,0_16px_32px_-6px_rgba(22,101,52,0.18)] hover:shadow-[0_1px_0_#bbf7d0,0_3px_0_#86efac,0_5px_0_#4ade80,0_8px_0_#22c55e,0_24px_40px_-8px_rgba(22,101,52,0.25)]",
      logo2D: "/images/connectors/google-drive.png",
      logo3D: "/images/connectors/google-drive-3d.png",
    },
    {
      name: "Microsoft Excel",
      type: "Applicant Rosters",
      status: "Live Sync",
      rotation: "rotate-[-3deg] hover:rotate-0 hover:-translate-y-3",
      stackedEdge: "shadow-[0_1px_0_#bbf7d0,0_2px_0_#bbf7d0,0_3px_0_#86efac,0_4px_0_#86efac,0_5px_0_#4ade80,0_6px_0_#16a34a,0_16px_32px_-6px_rgba(22,101,52,0.18)] hover:shadow-[0_1px_0_#bbf7d0,0_3px_0_#86efac,0_5px_0_#4ade80,0_8px_0_#16a34a,0_24px_40px_-8px_rgba(22,101,52,0.25)]",
      logo2D: "/images/connectors/excel.png",
      logo3D: "/images/connectors/excel-3d.png",
    },
    {
      name: "Notion",
      type: "Admissions SOPs",
      status: "Synced",
      rotation: "rotate-[-1.5deg] hover:rotate-0 hover:-translate-y-3",
      stackedEdge: "shadow-[0_1px_0_#f1f5f9,0_2px_0_#e2e8f0,0_3px_0_#cbd5e1,0_4px_0_#cbd5e1,0_5px_0_#94a3b8,0_6px_0_#64748b,0_16px_32px_-6px_rgba(15,23,42,0.14)] hover:shadow-[0_1px_0_#f1f5f9,0_3px_0_#cbd5e1,0_5px_0_#94a3b8,0_8px_0_#64748b,0_24px_40px_-8px_rgba(15,23,42,0.22)]",
      logo2D: "/images/connectors/notion.png",
      logo3D: "/images/connectors/notion-3d.png",
    },
    {
      name: "Slack",
      type: "Counselor Desk",
      status: "Active",
      rotation: "rotate-[2.5deg] hover:rotate-0 hover:-translate-y-3",
      stackedEdge: "shadow-[0_1px_0_#f3e8ff,0_2px_0_#f3e8ff,0_3px_0_#e9d5ff,0_4px_0_#e9d5ff,0_5px_0_#d8b4fe,0_6px_0_#c084fc,0_16px_32px_-6px_rgba(107,33,168,0.18)] hover:shadow-[0_1px_0_#f3e8ff,0_3px_0_#e9d5ff,0_5px_0_#d8b4fe,0_8px_0_#c084fc,0_24px_40px_-8px_rgba(107,33,168,0.25)]",
      logo2D: "/images/connectors/slack.png",
      logo3D: "/images/connectors/slack-3d.png",
    },
    {
      name: "GitHub",
      type: "Campus SIS & API",
      status: "Connected",
      rotation: "rotate-[3.5deg] hover:rotate-0 hover:-translate-y-3",
      stackedEdge: "shadow-[0_1px_0_#f1f5f9,0_2px_0_#e2e8f0,0_3px_0_#cbd5e1,0_4px_0_#cbd5e1,0_5px_0_#94a3b8,0_6px_0_#64748b,0_16px_32px_-6px_rgba(15,23,42,0.14)] hover:shadow-[0_1px_0_#f1f5f9,0_3px_0_#cbd5e1,0_5px_0_#94a3b8,0_8px_0_#64748b,0_24px_40px_-8px_rgba(15,23,42,0.22)]",
      logo2D: "/images/connectors/github.png",
      logo3D: "/images/connectors/github-3d.png",
    },
  ];

  const handlePlayVoice = (disc: VoiceDiscItem) => {
    setActiveVoice(disc.name);
    setIsPlaying(true);
    soundSynth.playCallChime();

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(disc.sampleText);
      utterance.pitch = disc.pitch;
      utterance.rate = disc.rate;

      const allVoices = window.speechSynthesis.getVoices();
      const matched =
        allVoices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Natural") ||
              v.name.includes("Google") ||
              v.name.includes("Neural") ||
              v.name.includes("Female") ||
              v.name.includes("Samantha") ||
              v.name.includes("Jenny"))
        ) || allVoices.find((v) => v.lang.startsWith("en"));

      if (matched) {
        utterance.voice = matched;
      }

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 3000);
    }
  };

  const handleStopVoice = () => {
    setIsPlaying(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <section
      id="work-agents"
      className="w-full bg-[#fbfcfe] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative select-none scroll-mt-24 border-t border-slate-200/70 overflow-hidden"
    >
      {/* Subtle ambient gradient lighting */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-6 w-80 h-80 bg-sky-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 relative z-10">

        {/* ========================================================================= */}
        {/* 1. SWARAM MULTI-AGENT ARCHITECTURE SHOWCASE (OFFICIAL BLUEPRINT)          */}
        {/* ========================================================================= */}
        <div className="space-y-8 sm:space-y-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5 pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe] text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#2563eb] fill-[#2563eb]" />
              <span>AUTONOMOUS MULTI-AGENT ECOSYSTEM</span>
            </div>

            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#0f172a] leading-[1.14]">
              How Swaram Orchestrates <br className="hidden sm:inline" />
              <span className="font-serif italic text-slate-600">Autonomous Multi-Agent AI</span>
            </h2>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-2xl mx-auto font-sans">
              Eliminate fragmented chatbots. Swaram unifies campus knowledge ingestion, real-time yield analytics, dialect-tuned Indic voice synthesis, and ERP execution into a single coordinated agent architecture.
            </p>
          </div>

          <SwaramMultiAgentShowcase onOpenDemo={onOpenDemo} />
        </div>

        {/* ========================================================================= */}
        {/* 3. "TRY ALL OUR VOICES" — AI VOICE AGENTS LINEUP                          */}
        {/* ========================================================================= */}
        <div id="try-voices" className="space-y-8 pt-8 scroll-mt-24">
          <div className="text-center space-y-2">
            <div className="inline-block px-3.5 py-1 rounded-full bg-white text-neutral-800 text-xs font-semibold border border-black/10 shadow-2xs">
              Vocal Timbres &amp; Tone Varieties
            </div>
            <h3 className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900">
              Distinct Voice Tones for Every Conversation
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl mx-auto">
              Every voice agent is tuned with a distinct acoustic timbre, emotional inflection, and natural conversational cadence. Click any persona card to audition their tone.
            </p>
          </div>

          {/* Voice Agents Lineup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {voiceDiscs.map((disc) => {
              const isSelected = activeVoice === disc.name && isPlaying;
              return (
                <div
                  key={disc.id}
                  onClick={() => (isSelected ? handleStopVoice() : handlePlayVoice(disc))}
                  className={`relative rounded-[32px] p-6 flex flex-col justify-between group cursor-pointer border border-white/80 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-300 min-h-[390px] overflow-hidden select-none bg-gradient-to-b ${disc.auraClass}`}
                >
                  {/* Subtle glossy glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-white/55 pointer-events-none rounded-[32px]" />

                  {/* Ambient Outer Card Bottom Glow Halo (Matches Voice Color) */}
                  <div className="absolute inset-x-0 -bottom-8 h-28 pointer-events-none overflow-hidden rounded-b-[32px] opacity-65 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-20 rounded-full blur-2xl transition-all duration-700 ${isSelected ? "opacity-100 scale-125" : "animate-liquid-aura opacity-75"
                        } ${disc.cardBottomGlowClass}`}
                    />
                  </div>

                  {/* Top Row: Voice Tone Badge & Tone Pill */}
                  <div className="flex items-center justify-between z-10 relative">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md shadow-xs border border-white flex items-center justify-center shrink-0">
                        <Volume2 className="w-4.5 h-4.5 text-slate-800" />
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          Voice Tone
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${disc.waveBarColor} animate-pulse`} />
                          <span className="text-xs font-semibold text-slate-700">
                            {disc.toneTag}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-slate-900 border border-black/5 shadow-2xs font-mono tracking-tight">
                      {disc.tonePill}
                    </span>
                  </div>

                  {/* Center Area: Interactive Floating Play Button with Equalizer Waveforms */}
                  <div className="my-auto py-5 flex flex-col items-center justify-center z-10 relative text-center">
                    <div
                      className={`w-18 h-18 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 relative ${isSelected
                        ? "bg-slate-900 text-white scale-110 shadow-2xl ring-4 ring-white"
                        : "bg-white/95 backdrop-blur-md text-slate-900 border border-white hover:scale-110 hover:shadow-xl group-hover:bg-white"
                        }`}
                    >
                      {isSelected ? (
                        <Square className="w-6 h-6 fill-current text-white" />
                      ) : (
                        <Play className="w-6 h-6 fill-current text-slate-900 ml-0.5" />
                      )}
                      {/* Animated radar rings when playing */}
                      {isSelected && (
                        <span className={`absolute inset-0 rounded-full border-2 ${disc.playRingColor} animate-ping opacity-75 pointer-events-none`} />
                      )}
                    </div>

                    {/* Animated Soundwave Equalizer */}
                    <div className="flex items-center gap-1 mt-4 h-6">
                      {[35, 75, 100, 60, 90, 45, 80, 50].map((height, i) => (
                        <span
                          key={i}
                          className={`w-1 rounded-full transition-all duration-300 ${isSelected
                            ? `${disc.waveBarColor} animate-pulse`
                            : "bg-slate-400/40 group-hover:bg-slate-500/60"
                            }`}
                          style={{
                            height: isSelected ? `${height}%` : "30%",
                            animationDelay: `${i * 120}ms`,
                          }}
                        />
                      ))}
                    </div>

                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-600 mt-2.5 font-mono">
                      {isSelected ? `Speaking in ${disc.name}'s Tone...` : "Click to Audition Tone"}
                    </span>
                    <span className="text-[11px] text-slate-500 mt-0.5 font-medium">
                      {disc.timbre}
                    </span>
                  </div>

                  {/* Bottom Dark Capsule Plaque with Image 1 Liquid Aurora Animation */}
                  <div
                    className={`mt-auto rounded-2xl p-4 transition-all duration-500 z-10 relative overflow-hidden backdrop-blur-md ${disc.plaqueBgClass}`}
                  >
                    {/* Fluid Ambient Aurora Glow (Image 1 Style Animation) */}
                    <div className="absolute inset-x-0 bottom-0 h-22 pointer-events-none overflow-hidden rounded-b-2xl">
                      {/* Deep diffuse bloom */}
                      <div
                        className={`absolute -bottom-7 left-1/2 -translate-x-1/2 w-52 h-22 rounded-full blur-xl transition-all duration-700 ${isSelected
                          ? "opacity-100 scale-125 animate-voice-active-glow"
                          : "opacity-85 animate-liquid-aura group-hover:opacity-100 group-hover:scale-110"
                          } ${disc.auraGlowClass}`}
                      />

                      {/* Concentrated bright core beam (just like the blue light in Image 1) */}
                      <div
                        className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-36 h-12 rounded-full blur-md transition-all duration-500 ${isSelected
                          ? "opacity-100 scale-135"
                          : "opacity-90 animate-liquid-core group-hover:opacity-100"
                          } ${disc.coreGlowClass}`}
                      />

                      {/* Specular bottom rim streak */}
                      <div
                        className={`absolute bottom-0 inset-x-3 h-[1.5px] rounded-full animate-specular-sweep ${disc.rimStreakClass}`}
                      />
                    </div>

                    {/* Plaque Content (Voice Persona, Tone, Cadence) */}
                    <div className="flex items-center justify-between gap-2 relative z-10">
                      <div className="min-w-0">
                        <div className={`text-[10px] uppercase tracking-wider font-bold font-mono ${disc.tagColor}`}>
                          Voice Persona
                        </div>
                        <h4 className="font-bold text-lg tracking-tight leading-tight mt-0.5 truncate text-white drop-shadow-xs">
                          {disc.name}
                        </h4>
                        <div className="text-xs text-white/80 font-medium mt-0.5 truncate">
                          {disc.tone}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-[10px] uppercase tracking-wider font-bold font-mono ${disc.tagColor}`}>
                          Cadence
                        </div>
                        <div className="text-sm font-bold mt-0.5 tracking-tight text-white drop-shadow-xs">
                          {disc.cadence}
                        </div>
                        <div className="text-[10px] text-white/75 font-mono mt-0.5">
                          {disc.inflection}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. PERFORMANCE & UNIT ECONOMICS (LabAcademy-Inspired Visual Showcase)     */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] relative overflow-hidden select-none">
          {/* Decorative fluid doodle line in background behind heading (Image 2 style) */}
          <svg
            className="absolute top-4 right-10 sm:right-24 w-64 sm:w-96 h-48 sm:h-64 pointer-events-none opacity-40 text-[#c8f292]"
            viewBox="0 0 350 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 180 C80 60, 200 -20, 260 80 C320 180, 210 220, 160 160 C110 100, 230 20, 340 120"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>

          {/* Section Header: Left Badge + Context, Right/Center Bold Heading */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10 sm:mb-12 relative z-10">
            {/* Left Column: Dark green asterisk badge & descriptive paragraph */}
            <div className="lg:col-span-5 space-y-3">
              <div className="w-8 h-8 rounded-full bg-[#1e4a38] text-[#d2f397] flex items-center justify-center font-serif text-base font-bold shadow-2xs">
                ✦
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed max-w-sm">
                At enterprise scale, Swaram AI delivers ultra-low latency voice synthesis across Indian languages, empowering seamless inbound and outbound conversational operations.
              </p>
            </div>

            {/* Right Column: Giant modern display heading (Image 2 style) */}
            <div className="lg:col-span-7 lg:pl-6">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal text-slate-900 tracking-tight leading-[1.08] font-serif">
                Scale &amp; Unit <br />
                <span className="font-sans font-extrabold tracking-tight">Economics</span>
              </h2>
            </div>
          </div>

          {/* 3 Bold Pastel Visual Cards (Directly Replicating Image 2 Language) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {/* Card 1: Fresh Meadow Lime (Image 2 Left Card) */}
            <div
              onClick={() => onOpenDemo?.()}
              className="bg-[#d2f397] rounded-[32px] p-6 sm:p-7 flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              {/* Top Row: Arrow Button on Left & Nested Photo on Right */}
              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5 text-slate-900" />
                </div>

                <div className="w-36 h-40 sm:w-44 sm:h-44 rounded-[24px] overflow-hidden shadow-sm border border-white/90 bg-white p-1 flex items-center justify-center relative shrink-0">
                  <Image
                    src="/images/stats/throughput-stream.gif"
                    alt="Throughput Stream Animation - 2.4M+ Characters Streamed Daily"
                    fill
                    unoptimized
                    className="object-cover rounded-[20px] group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Bottom Info: Pill Tag + Big Value + Subtitle */}
              <div className="mt-auto">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border border-black/20 text-slate-900 bg-black/5 mb-2.5">
                  Throughput
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-none">
                  2.4M+
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight mt-1">
                  Characters Streamed Daily
                </div>
                <p className="text-[11px] sm:text-xs text-slate-800/80 font-medium mt-1 leading-snug max-w-[210px]">
                  Real-time synthesis across 11 native Indic languages with 99.98% carrier uptime.
                </p>
              </div>
            </div>

            {/* Card 2: Warm Pastel Coral / Orange (Image 2 Middle Card) */}
            <div
              onClick={() => onOpenDemo?.()}
              className="bg-[#fca166] rounded-[32px] p-6 sm:p-7 flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              {/* Top Row: Arrow Button on Left & Nested Photo on Right */}
              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5 text-slate-900" />
                </div>

                <div className="w-36 h-40 sm:w-44 sm:h-44 rounded-[24px] overflow-hidden shadow-sm border border-white/90 bg-white p-1.5 flex items-center justify-center relative shrink-0">
                  <Image
                    src="/images/stats/indian-languages-cloud-tight.png"
                    alt="11 Supported Indian Languages Cloud - Hindi, Telugu, Tamil, Bengali, Kannada, Marathi, Gujarati, Punjabi"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Bottom Info: Pill Tag + Big Value + Subtitle */}
              <div className="mt-auto">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border border-black/20 text-slate-900 bg-black/5 mb-2.5">
                  Native Dialects
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-none">
                  11 +
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight mt-1">
                  Indian Languages
                </div>
                <p className="text-[11px] sm:text-xs text-slate-800/80 font-medium mt-1 leading-snug max-w-[210px]">
                  Hindi, Telugu, Kannada, Tamil, Bengali, Marathi, Punjabi, Gujarati, etc.
                </p>
              </div>
            </div>

            {/* Card 3: Soft Powder Blue / Periwinkle (Image 2 Right Card) */}
            <div
              onClick={() => onOpenDemo?.()}
              className="bg-[#b0d2f8] rounded-[32px] p-6 sm:p-7 flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              {/* Top Row: Arrow Button on Left & Nested Photo on Right */}
              <div className="flex items-start justify-between gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shrink-0">
                  <ArrowUpRight className="w-5 h-5 text-slate-900" />
                </div>

                <div className="w-36 h-40 sm:w-44 sm:h-44 rounded-[24px] overflow-hidden shadow-sm border border-white/90 bg-white p-1.5 flex items-center justify-center relative shrink-0">
                  <Image
                    src="/images/stats/unit-economics-money.png"
                    alt="Unit Economics - Indian Rupee ₹30 per 10,000 Characters"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Bottom Info: Pill Tag + Big Value + Subtitle */}
              <div className="mt-auto">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border border-black/20 text-slate-900 bg-black/5 mb-2.5">
                  Unit Economics
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-none">
                  ₹ 30
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight mt-1">
                  Cost / 10,000 Characters
                </div>
                <p className="text-[11px] sm:text-xs text-slate-800/80 font-medium mt-1 leading-snug max-w-[210px]">
                  High efficiency speech synthesis designed for collegiate admissions scale.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Slider Indicator (Direct from Image 2) */}
          <div className="flex justify-center mt-10 sm:mt-12 relative z-10">
            <div className="w-48 sm:w-56 h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
              <div className="w-16 sm:w-20 h-full bg-[#1e4a38] rounded-full mx-auto" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. ENTERPRISE APP CONNECTORS (3D Voxel Showcase Card)                     */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-300 hover:shadow-[0_28px_60px_-12px_rgba(0,0,0,0.1)] relative group select-none">
          {/* Top Subtle Gloss Accent Highlight */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-emerald-500/0 z-20 pointer-events-none" />

          {/* 3D Voxel Artwork Banner Frame (Clickable for live demo preview) */}
          <div
            onClick={() => onOpenDemo?.()}
            className="relative cursor-pointer overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#fafbfc] to-white flex items-center justify-center p-2 sm:p-5 lg:p-8"
            title="Click to preview enterprise campus integrations"
          >
            <Image
              src="/images/connectors/connectors-showcase-3d.png"
              alt="Swaram AI Connectors & Campus ERPs - Google Drive, Notion, Slack, Microsoft Excel, GitHub"
              width={1024}
              height={365}
              priority
              className="w-full h-auto object-contain max-h-[480px] drop-shadow-xs transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>

          {/* Bottom Interactive Feature Bar: Active Grounding Chips & Demo Trigger */}
          <div className="border-t border-slate-200/80 bg-white/95 px-6 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 mr-1">
                Active Grounding:
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200/80 text-slate-700 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Google Drive (148 Docs)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200/80 text-slate-700 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Notion SOPs (42 Pages)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200/80 text-slate-700 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Slack Desks (12 Channels)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200/80 text-slate-700 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Microsoft Excel (36 Rosters)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-50 border border-slate-200/80 text-slate-700 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                GitHub SIS Webhooks
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono hidden md:inline">
                Live bi-directional sync • Zero code setup
              </span>
              <button
                onClick={() => onOpenDemo?.()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-2xs hover:shadow-md transition-all cursor-pointer group/btn"
              >
                <span>Preview All Integrations</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
