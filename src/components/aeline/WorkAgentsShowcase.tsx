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

interface PresetGoal {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
  agentName: string;
  dataSummary: string;
  contextSummary: string;
  callSummary: string;
}

export default function WorkAgentsShowcase({ onOpenDemo }: WorkAgentsShowcaseProps) {
  const presets: PresetGoal[] = [
    {
      id: "scholarship",
      label: "Merit Scholarship Grant",
      icon: GraduationCap,
      prompt:
        "Draft the September admissions qualification batch and verify 35% merit scholarships for 85%+ PCM scorers in Hindi and Telugu",
      agentName: "Admissions Copilot",
      dataSummary: "1,240 student records",
      contextSummary: "Scholarship rules & FAQs",
      callSummary: "Hindi & Telugu • 10:00 AM – 6:00 PM",
    },
    {
      id: "seat",
      label: "B.Tech Seat Confirmation",
      icon: BarChart2,
      prompt:
        "Execute round 2 seat confirmation follow-ups in Kannada and Tamil for top 500 ranked candidates",
      agentName: "Enrollment Desk Copilot",
      dataSummary: "500 ranked candidates",
      contextSummary: "JoSAA Cutoffs & Seat Matrix",
      callSummary: "Kannada & Tamil • 9:30 AM – 5:30 PM",
    },
    {
      id: "hostel",
      label: "Hostel Allotment Sync",
      icon: Building2,
      prompt:
        "Verify residential hostel allotment preferences and auto-sync student records to campus ERP",
      agentName: "Hostel Sync Agent",
      dataSummary: "850 applicant files",
      contextSummary: "Hostel Rules & Room Allocations",
      callSummary: "English, Hindi & Telugu • 10:00 AM – 7:00 PM",
    },
  ];

  const [selectedPreset, setSelectedPreset] = useState<PresetGoal>(presets[0]);
  const [goalInput, setGoalInput] = useState<string>(presets[0].prompt);
  const [activeStep, setActiveStep] = useState<number>(4);
  const [isGoalDelegated, setIsGoalDelegated] = useState<boolean>(false);

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

  const handleDelegateGoal = () => {
    setIsGoalDelegated(true);
    soundSynth.playCallChime();
    setActiveStep(1);
    setTimeout(() => {
      setActiveStep(2);
      soundSynth.playPop();
    }, 1000);
    setTimeout(() => {
      setActiveStep(3);
      soundSynth.playPop();
    }, 2000);
    setTimeout(() => {
      setActiveStep(4);
      soundSynth.playCallChime();
    }, 3200);
    setTimeout(() => {
      setActiveStep(5);
      setIsGoalDelegated(false);
      soundSynth.playSuccess();
    }, 4500);
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
        {/* 1. TWO-COLUMN HERO & WORKFLOW PREPARATION STAGE                            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Outcome & Goal Delegation */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff6ff] text-[#2563eb] border border-[#dbeafe] text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#2563eb] fill-[#2563eb]" />
              <span>AUTONOMOUS AI AGENTS</span>
            </div>

            {/* Typography Heading */}
            <div className="space-y-1">
              <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#0f172a] leading-[1.12]">
                Set the outcome.
              </h2>
              <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#475569] leading-[1.12]">
                Delegate the process.
              </h2>
            </div>

            {/* Description Subtitle */}
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-sans max-w-xl">
              Describe the admissions or counseling goal and connect your campus documents. VoicePilot orchestrates autonomous voice agents, verifies scholarships, and updates student dossiers in real-time.
            </p>

            {/* Quick Goals Pill Buttons */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="text-xs font-semibold text-[#334155] mr-1">Quick Goals:</span>
              {presets.map((p) => {
                const IconComponent = p.icon;
                const isSelected = selectedPreset.id === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedPreset(p);
                      setGoalInput(p.prompt);
                      setActiveStep(4);
                    }}
                    className={`text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer border flex items-center gap-1.5 active:scale-95 ${
                      isSelected
                        ? "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd] font-medium shadow-2xs"
                        : "bg-white hover:bg-slate-50 text-[#475569] border-[#e2e8f0]"
                    }`}
                  >
                    <IconComponent
                      className={`w-3.5 h-3.5 ${
                        isSelected ? "text-[#1d4ed8]" : "text-[#64748b]"
                      }`}
                    />
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Input Card Container */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e2e8f0] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)] space-y-4 hover:border-blue-200 transition-all">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <FileText className="w-5 h-5 text-[#2563eb]" />
                </div>
                <textarea
                  rows={3}
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="w-full text-sm sm:text-[15px] font-medium text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none resize-none bg-transparent leading-relaxed"
                  placeholder="Describe the admissions goal or task you want to delegate..."
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#f1f5f9]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1f5f9] text-[#334155] text-xs font-medium border border-[#e2e8f0]">
                  <Bot className="w-3.5 h-3.5 text-[#4f46e5]" />
                  <span>{selectedPreset.agentName}</span>
                  <span className="text-[10px] text-[#64748b]">• Multi-Agent</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#94a3b8] font-mono">
                    {goalInput.length}/2000
                  </span>
                  <button
                    type="button"
                    onClick={handleDelegateGoal}
                    disabled={isGoalDelegated}
                    className="w-11 h-11 rounded-full bg-[#1e293b] hover:bg-[#0f172a] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 disabled:opacity-75"
                    title="Delegate Goal"
                  >
                    <Send className="w-4 h-4 -rotate-12 translate-x-0.5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: VoicePilot Workflow Card */}
          <div className="lg:col-span-6">
            <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border border-[#e2e8f0] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] relative overflow-hidden">
              
              {/* Card Header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-[#f1f5f9]">
                <div className="w-11 h-11 rounded-2xl bg-[#eff6ff] text-[#2563eb] flex items-center justify-center shrink-0 shadow-2xs">
                  <Layers className="w-5 h-5 text-[#2563eb]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#0f172a] text-base sm:text-lg tracking-tight">
                    VoicePilot is preparing your workflow
                  </h3>
                  <p className="text-xs text-[#64748b] mt-0.5">
                    Analyzing your request and campus data...
                  </p>
                </div>
              </div>

              {/* Stepper Timeline with Continuous Dotted Line */}
              <div className="relative space-y-3 pt-5">
                {/* Vertical Line */}
                <div className="absolute left-[15px] top-6 bottom-8 w-[2px] border-l-2 border-dotted border-[#cbd5e1] z-0" />

                {/* Step 1: Reading your data */}
                <div className="relative z-10 flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-2xs transition-colors duration-300 ${
                      activeStep >= 1
                        ? "bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]"
                        : "border-2 border-[#cbd5e1] bg-white text-[#94a3b8]"
                    }`}
                  >
                    {activeStep >= 1 ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between p-2.5 sm:p-3 rounded-2xl hover:bg-[#f8fafc] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#10b981] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0f172a] text-xs sm:text-sm">
                          Reading your data
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#64748b]">
                          {selectedPreset.dataSummary}
                        </p>
                      </div>
                    </div>
                    {activeStep >= 1 && (
                      <Check className="w-4 h-4 text-[#10b981] stroke-[2.5]" />
                    )}
                  </div>
                </div>

                {/* Step 2: Generating context */}
                <div className="relative z-10 flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-2xs transition-colors duration-300 ${
                      activeStep >= 2
                        ? "bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]"
                        : "border-2 border-[#cbd5e1] bg-white text-[#94a3b8]"
                    }`}
                  >
                    {activeStep >= 2 ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between p-2.5 sm:p-3 rounded-2xl hover:bg-[#f8fafc] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#10b981] flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0f172a] text-xs sm:text-sm">
                          Generating context
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#64748b]">
                          {selectedPreset.contextSummary}
                        </p>
                      </div>
                    </div>
                    {activeStep >= 2 && (
                      <Check className="w-4 h-4 text-[#10b981] stroke-[2.5]" />
                    )}
                  </div>
                </div>

                {/* Step 3: Selecting the right agent */}
                <div className="relative z-10 flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-2xs transition-colors duration-300 ${
                      activeStep >= 3
                        ? "bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]"
                        : "border-2 border-[#cbd5e1] bg-white text-[#94a3b8]"
                    }`}
                  >
                    {activeStep >= 3 ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between p-2.5 sm:p-3 rounded-2xl hover:bg-[#f8fafc] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#10b981] flex items-center justify-center shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0f172a] text-xs sm:text-sm">
                          Selecting the right agent
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#64748b]">
                          {selectedPreset.agentName}
                        </p>
                      </div>
                    </div>
                    {activeStep >= 3 && (
                      <Check className="w-4 h-4 text-[#10b981] stroke-[2.5]" />
                    )}
                  </div>
                </div>

                {/* Step 4: Preparing the calling workflow (Active / Processing) */}
                <div className="relative z-10 flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 relative transition-all duration-300 ${
                      activeStep === 4
                        ? "bg-[#eff6ff] border-2 border-dashed border-[#2563eb]"
                        : activeStep > 4
                        ? "bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]"
                        : "border-2 border-[#cbd5e1] bg-white text-[#94a3b8]"
                    }`}
                  >
                    {activeStep === 4 ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb] animate-pulse" />
                    ) : activeStep > 4 ? (
                      <Check className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
                    )}
                  </div>
                  <div
                    className={`flex-1 flex items-center justify-between p-3 rounded-2xl transition-all ${
                      activeStep === 4
                        ? "bg-[#f0f7ff] border border-[#bfdbfe] shadow-xs"
                        : "hover:bg-[#f8fafc]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-colors ${
                          activeStep === 4
                            ? "bg-[#2563eb] text-white"
                            : "bg-[#ecfdf5] text-[#10b981]"
                        }`}
                      >
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0f172a] text-xs sm:text-sm">
                          Preparing the calling workflow
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#2563eb] font-medium">
                          {selectedPreset.callSummary}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 5: Ready for your approval (Pending / Completed) */}
                <div className="relative z-10 flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors duration-300 ${
                      activeStep >= 5
                        ? "bg-[#dcfce7] text-[#16a34a] border border-[#bbf7d0]"
                        : "border-2 border-[#cbd5e1] bg-white"
                    }`}
                  >
                    {activeStep >= 5 ? <Check className="w-4 h-4 stroke-[2.5]" /> : null}
                  </div>
                  <div
                    className={`flex-1 flex items-center justify-between p-2.5 sm:p-3 rounded-2xl transition-all ${
                      activeStep >= 5
                        ? "bg-[#ecfdf5] border border-[#bbf7d0]"
                        : "opacity-75"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          activeStep >= 5
                            ? "bg-[#10b981] text-white"
                            : "bg-[#f1f5f9] text-[#64748b]"
                        }`}
                      >
                        <Send className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#1e293b] text-xs sm:text-sm">
                          Ready for your approval
                        </h4>
                        <p className="text-[11px] sm:text-xs text-[#94a3b8]">
                          Review and make changes before start
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 2. 4 VIBRANT 3D INFOGRAPHIC CARDS (FROM TEMPLATE)                         */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          
          {/* Card 1: Sky Blue / Idea Up / Understands your goal */}
          <div
            onClick={() => {
              soundSynth.playPop();
              setGoalInput(
                "Draft the September admissions qualification batch and verify 35% merit scholarships for 85%+ PCM scorers in Hindi and Telugu"
              );
              window.scrollTo({
                top: document.getElementById("work-agents")?.offsetTop || 0,
                behavior: "smooth",
              });
            }}
            className="bg-gradient-to-b from-[#18a0fb] to-[#0488fa] rounded-[32px] p-6 sm:p-7 min-h-[290px] flex flex-col justify-between relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(24,160,251,0.45)] hover:shadow-[0_26px_50px_-8px_rgba(24,160,251,0.65)] hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group select-none"
          >
            {/* Top Text */}
            <div className="space-y-1 z-10">
              <h3 className="font-bold text-white text-xl sm:text-2xl tracking-tight leading-tight">
                Understands your goal
              </h3>
              <p className="text-white/90 text-xs sm:text-[13px] font-medium leading-relaxed">
                Give instructions in plain language.
              </p>
            </div>

            {/* Center 3D Graphic: Translucent Lightbulb with Upward Arrow */}
            <div className="my-auto py-2 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 160 170" className="w-28 h-32 sm:w-32 sm:h-36 drop-shadow-[0_14px_22px_rgba(0,100,220,0.32)]">
                <defs>
                  <radialGradient id="bulb1Grad" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="25%" stopColor="#d5f4ff" />
                    <stop offset="65%" stopColor="#8ee0ff" />
                    <stop offset="100%" stopColor="#4bc4fc" />
                  </radialGradient>
                  <linearGradient id="arrow1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                  <linearGradient id="base1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7ad7ff" />
                    <stop offset="50%" stopColor="#e2f7ff" />
                    <stop offset="100%" stopColor="#41bdf9" />
                  </linearGradient>
                </defs>
                {/* Lightbulb glass body */}
                <path
                  d="M 80,12 C 108,12 130,34 130,62 C 130,79 121,93 108,105 C 104,109 101,114 101,120 L 59,120 C 59,114 56,109 52,105 C 39,93 30,79 30,62 C 30,34 52,12 80,12 Z"
                  fill="url(#bulb1Grad)"
                />
                {/* Specular highlight */}
                <ellipse cx="56" cy="38" rx="15" ry="9" transform="rotate(-38 56 38)" fill="#ffffff" opacity="0.75" />
                {/* Up Arrow Inside Bulb */}
                <path
                  d="M 80,38 L 99,60 L 88,60 L 88,84 L 72,84 L 72,60 L 61,60 Z"
                  fill="url(#arrow1Grad)"
                />
                {/* Screw Base */}
                <rect x="62" y="123" width="36" height="7" rx="3.5" fill="url(#base1Grad)" />
                <rect x="65" y="132" width="30" height="7" rx="3.5" fill="url(#base1Grad)" />
                <path d="M 70,141 C 70,141 70,148 80,148 C 90,148 90,141 90,141 Z" fill="#0369a1" opacity="0.85" />
              </svg>
            </div>

            {/* Bottom Left Number */}
            <div className="z-10 pt-2 flex items-center justify-between">
              <span className="text-white/80 font-mono text-sm sm:text-base font-bold tracking-wider">
                01 /
              </span>
              <span className="text-[11px] text-white/70 font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                Plain Intent →
              </span>
            </div>
          </div>

          {/* Card 2: Amber Gold / Super / Builds the complete workflow */}
          <div
            onClick={() => {
              soundSynth.playPop();
              handleDelegateGoal();
            }}
            className="bg-gradient-to-b from-[#fbbd05] to-[#f59e0b] rounded-[32px] p-6 sm:p-7 min-h-[290px] flex flex-col justify-between relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(251,189,5,0.45)] hover:shadow-[0_26px_50px_-8px_rgba(251,189,5,0.65)] hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group select-none"
          >
            {/* Top Text */}
            <div className="space-y-1 z-10">
              <h3 className="font-bold text-white text-xl sm:text-2xl tracking-tight leading-tight">
                Builds the complete workflow
              </h3>
              <p className="text-white/90 text-xs sm:text-[13px] font-medium leading-relaxed">
                Finds data, context and configures calls.
              </p>
            </div>

            {/* Center 3D Graphic: Golden Trophy with Star */}
            <div className="my-auto py-2 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 160 170" className="w-28 h-32 sm:w-32 sm:h-36 drop-shadow-[0_14px_22px_rgba(180,110,0,0.32)]">
                <defs>
                  <radialGradient id="trophyBodyGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#fff8b5" />
                    <stop offset="30%" stopColor="#ffd229" />
                    <stop offset="75%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </radialGradient>
                  <linearGradient id="trophyHandleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffe266" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                  <linearGradient id="starReliefGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
                {/* Left Curved Handle */}
                <path
                  d="M 50,42 C 22,42 16,64 18,82 C 20,100 38,106 54,102"
                  fill="none"
                  stroke="url(#trophyHandleGrad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                {/* Right Curved Handle */}
                <path
                  d="M 110,42 C 138,42 144,64 142,82 C 140,100 122,106 106,102"
                  fill="none"
                  stroke="url(#trophyHandleGrad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                {/* Trophy Cup Body */}
                <path
                  d="M 44,28 L 116,28 C 116,28 118,78 80,92 C 42,78 44,28 44,28 Z"
                  fill="url(#trophyBodyGrad)"
                />
                {/* Top Rim */}
                <ellipse cx="80" cy="28" rx="36" ry="6" fill="#fff694" />
                {/* Specular Highlight */}
                <path
                  d="M 52,36 C 52,52 56,72 68,78"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  opacity="0.65"
                  fill="none"
                />
                {/* 3D Star on Cup */}
                <path
                  d="M 80,45 L 83.8,55.5 L 94.8,56.1 L 86,63.2 L 89.3,73.7 L 80,67.6 L 70.7,73.7 L 74,63.2 L 65.2,56.1 L 76.2,55.5 Z"
                  fill="url(#starReliefGrad)"
                />
                {/* Stem */}
                <rect x="74" y="92" width="12" height="26" rx="2" fill="url(#trophyBodyGrad)" />
                {/* Pedestal Base */}
                <ellipse cx="80" cy="118" rx="22" ry="5" fill="#ffd53e" />
                <path d="M 58,118 L 102,118 L 106,138 L 54,138 Z" fill="url(#trophyBodyGrad)" />
                <rect x="50" y="138" width="60" height="9" rx="3.5" fill="#d97706" />
              </svg>
            </div>

            {/* Bottom Left Number */}
            <div className="z-10 pt-2 flex items-center justify-between">
              <span className="text-white/80 font-mono text-sm sm:text-base font-bold tracking-wider">
                02 /
              </span>
              <span className="text-[11px] text-white/70 font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                Auto Pipeline →
              </span>
            </div>
          </div>

          {/* Card 3: Indigo / Periwinkle / Head / Selects the right agent */}
          <div
            onClick={() => {
              soundSynth.playCallChime();
              const nextIndex =
                (presets.findIndex((p) => p.id === selectedPreset.id) + 1) %
                presets.length;
              setSelectedPreset(presets[nextIndex]);
              setGoalInput(presets[nextIndex].prompt);
            }}
            className="bg-gradient-to-b from-[#5c72ea] to-[#4353d4] rounded-[32px] p-6 sm:p-7 min-h-[290px] flex flex-col justify-between relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(92,114,234,0.45)] hover:shadow-[0_26px_50px_-8px_rgba(92,114,234,0.65)] hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group select-none"
          >
            {/* Top Text */}
            <div className="space-y-1 z-10">
              <h3 className="font-bold text-white text-xl sm:text-2xl tracking-tight leading-tight">
                Selects the right agent
              </h3>
              <p className="text-white/90 text-xs sm:text-[13px] font-medium leading-relaxed">
                Best fit based on your goal and data.
              </p>
            </div>

            {/* Center 3D Graphic: Rising 3-Bar Chart with Upward Diagonal Arrow */}
            <div className="my-auto py-2 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 160 170" className="w-28 h-32 sm:w-32 sm:h-36 drop-shadow-[0_14px_22px_rgba(40,40,160,0.32)]">
                <defs>
                  <linearGradient id="bar1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bac8ff" />
                    <stop offset="50%" stopColor="#91a6fc" />
                    <stop offset="100%" stopColor="#6880f6" />
                  </linearGradient>
                  <linearGradient id="bar2Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a7baff" />
                    <stop offset="50%" stopColor="#7e96fc" />
                    <stop offset="100%" stopColor="#5670f4" />
                  </linearGradient>
                  <linearGradient id="bar3Grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#96abff" />
                    <stop offset="50%" stopColor="#6f88fb" />
                    <stop offset="100%" stopColor="#4561f2" />
                  </linearGradient>
                  <linearGradient id="chartArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4055db" />
                    <stop offset="100%" stopColor="#2535aa" />
                  </linearGradient>
                </defs>
                {/* Floating 3D Diagonal Arrow */}
                <path
                  d="M 44,88 L 80,52 L 73,45 L 104,43 L 102,74 L 95,67 L 58,102 Z"
                  fill="url(#chartArrowGrad)"
                />
                {/* Bar 1 (Short) */}
                <rect x="42" y="104" width="24" height="42" rx="7" fill="url(#bar1Grad)" />
                <rect x="43" y="105" width="22" height="5" rx="2.5" fill="#dbe3ff" opacity="0.8" />
                {/* Bar 2 (Medium) */}
                <rect x="73" y="80" width="24" height="66" rx="7" fill="url(#bar2Grad)" />
                <rect x="74" y="81" width="22" height="5" rx="2.5" fill="#cfdbff" opacity="0.8" />
                {/* Bar 3 (Tall) */}
                <rect x="104" y="52" width="24" height="94" rx="7" fill="url(#bar3Grad)" />
                <rect x="105" y="53" width="22" height="5" rx="2.5" fill="#c3d2ff" opacity="0.8" />
              </svg>
            </div>

            {/* Bottom Left Number */}
            <div className="z-10 pt-2 flex items-center justify-between">
              <span className="text-white/80 font-mono text-sm sm:text-base font-bold tracking-wider">
                03 /
              </span>
              <span className="text-[11px] text-white/70 font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                Smart Persona →
              </span>
            </div>
          </div>

          {/* Card 4: Coral Orange / Idea Top / You stay in control */}
          <div
            onClick={() => {
              soundSynth.playCallChime();
              onOpenDemo?.();
            }}
            className="bg-gradient-to-b from-[#ff6b35] to-[#f95738] rounded-[32px] p-6 sm:p-7 min-h-[290px] flex flex-col justify-between relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(255,107,53,0.45)] hover:shadow-[0_26px_50px_-8px_rgba(255,107,53,0.65)] hover:scale-[1.03] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group select-none"
          >
            {/* Top Text */}
            <div className="space-y-1 z-10">
              <h3 className="font-bold text-white text-xl sm:text-2xl tracking-tight leading-tight">
                You stay in control
              </h3>
              <p className="text-white/90 text-xs sm:text-[13px] font-medium leading-relaxed">
                Review, edit and approve before execution.
              </p>
            </div>

            {/* Center 3D Graphic: Warm Peach Lightbulb with Royal Crown */}
            <div className="my-auto py-2 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 160 170" className="w-28 h-32 sm:w-32 sm:h-36 drop-shadow-[0_14px_22px_rgba(200,50,0,0.32)]">
                <defs>
                  <radialGradient id="bulb4Grad" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="25%" stopColor="#ffe7dc" />
                    <stop offset="65%" stopColor="#ffb393" />
                    <stop offset="100%" stopColor="#ff865b" />
                  </radialGradient>
                  <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e63c02" />
                    <stop offset="100%" stopColor="#c72e00" />
                  </linearGradient>
                  <linearGradient id="base4Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffa580" />
                    <stop offset="50%" stopColor="#fff2eb" />
                    <stop offset="100%" stopColor="#ff7c4f" />
                  </linearGradient>
                </defs>
                {/* Lightbulb glass body */}
                <path
                  d="M 80,12 C 108,12 130,34 130,62 C 130,79 121,93 108,105 C 104,109 101,114 101,120 L 59,120 C 59,114 56,109 52,105 C 39,93 30,79 30,62 C 30,34 52,12 80,12 Z"
                  fill="url(#bulb4Grad)"
                />
                {/* Specular highlight */}
                <ellipse cx="56" cy="38" rx="15" ry="9" transform="rotate(-38 56 38)" fill="#ffffff" opacity="0.8" />
                {/* Royal 3D Crown Inside Bulb */}
                <path
                  d="M 58,80 L 56,61 L 67,68 L 80,54 L 93,68 L 104,61 L 102,80 Z"
                  fill="url(#crownGrad)"
                />
                <circle cx="56" cy="59" r="3" fill="url(#crownGrad)" />
                <circle cx="80" cy="52" r="3" fill="url(#crownGrad)" />
                <circle cx="104" cy="59" r="3" fill="url(#crownGrad)" />
                <rect x="58" y="80" width="44" height="4.5" rx="1.5" fill="#b02600" />
                {/* Screw Base */}
                <rect x="62" y="123" width="36" height="7" rx="3.5" fill="url(#base4Grad)" />
                <rect x="65" y="132" width="30" height="7" rx="3.5" fill="url(#base4Grad)" />
                <path d="M 70,141 C 70,141 70,148 80,148 C 90,148 90,141 90,141 Z" fill="#c72e00" opacity="0.85" />
              </svg>
            </div>

            {/* Bottom Left Number */}
            <div className="z-10 pt-2 flex items-center justify-between">
              <span className="text-white/80 font-mono text-sm sm:text-base font-bold tracking-wider">
                04 /
              </span>
              <span className="text-[11px] text-white/70 font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                Dean Control →
              </span>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. "TRY ALL OUR VOICES" — AI VOICE AGENTS LINEUP                          */}
        {/* ========================================================================= */}
        <div className="space-y-8 pt-8">
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
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-20 rounded-full blur-2xl transition-all duration-700 ${
                        isSelected ? "opacity-100 scale-125" : "animate-liquid-aura opacity-75"
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
                      className={`w-18 h-18 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 relative ${
                        isSelected
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
                          className={`w-1 rounded-full transition-all duration-300 ${
                            isSelected
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
                        className={`absolute -bottom-7 left-1/2 -translate-x-1/2 w-52 h-22 rounded-full blur-xl transition-all duration-700 ${
                          isSelected
                            ? "opacity-100 scale-125 animate-voice-active-glow"
                            : "opacity-85 animate-liquid-aura group-hover:opacity-100 group-hover:scale-110"
                        } ${disc.auraGlowClass}`}
                      />

                      {/* Concentrated bright core beam (just like the blue light in Image 1) */}
                      <div
                        className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-36 h-12 rounded-full blur-md transition-all duration-500 ${
                          isSelected
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
                At collegiate scale, VoicePilot AI delivers ultra-low latency voice synthesis across Indian languages, empowering seamless inbound and outbound admissions counseling.
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

            {/* Card 2: Warm Pastel Coral / Orange (Image 2 Middle Card - Inverted layout) */}
            <div
              onClick={() => onOpenDemo?.()}
              className="bg-[#fca166] rounded-[32px] p-6 sm:p-7 flex flex-col justify-between min-h-[320px] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer group relative overflow-hidden"
            >
              {/* Top Row: Pill Tag + Titles on Left, Nested Photo on Right */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex-1 min-w-[130px]">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border border-black/20 text-slate-900 bg-black/5 mb-2.5">
                    Native Dialects
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-none">
                    11
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight mt-1">
                    Indian Languages
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-900/80 font-medium mt-1 leading-snug">
                    Hindi, Telugu, Kannada, Tamil, Bengali, Marathi, Punjabi, Gujarati, etc.
                  </p>
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

              {/* Bottom: Arrow Button on Bottom-Left (matches Card 2 in Image 2) */}
              <div className="w-11 h-11 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:rotate-45 transition-all duration-300 shrink-0 mt-2">
                <ArrowUpRight className="w-5 h-5 text-slate-900" />
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
              alt="VoicePilot AI Connectors & Campus ERPs - Google Drive, Notion, Slack, Microsoft Excel, GitHub"
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
