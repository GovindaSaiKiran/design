"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  GraduationCap,
  Award,
  Home,
  UserCheck,
  Scale,
  Plus,
  ChevronUp,
  ChevronDown,
  Activity,
  Sparkles,
  CheckCircle2,
  Clock,
  Radio,
  Zap,
  Volume2,
  Play,
  Pause,
  ArrowRight,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { StudentLeadItem, mockStudentLeads } from "./LeadSegmentationHub";

interface AdmissionsDynamicsCanvasProps {
  onOpenLiveCallModal?: (lead?: StudentLeadItem) => void;
  onAddMilestone?: () => void;
}

export default function AdmissionsDynamicsCanvas({
  onOpenLiveCallModal,
  onAddMilestone
}: AdmissionsDynamicsCanvasProps) {
  const [activeLeadIndex, setActiveLeadIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const interestedLeads = mockStudentLeads.filter((l) => l.category === "interested");
  const currentLead = interestedLeads[activeLeadIndex] || interestedLeads[0];

  const callbacks = mockStudentLeads.filter((l) => l.category === "call_later");

  return (
    <div className="relative w-full overflow-x-auto pb-6 select-none scrollbar-none">
      {/* Main Horizontal Dynamics Graph Flow */}
      <div className="min-w-[1140px] relative pt-2 pb-6">
        {/* Continuous Horizontal Baseline Axis Line */}
        <div className="absolute top-[28px] left-8 right-16 h-[2px] bg-slate-300/80 z-0" />

        {/* Top Right Floating Action Button (+) */}
        <div className="absolute top-1 right-8 z-20">
          <button
            onClick={onAddMilestone}
            className="w-11 h-11 rounded-full bg-slate-950 hover:bg-slate-800 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer group"
            title="Deploy New Voice Agent / Inbound Helpline"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6 relative z-10">
          {/* ========================================================================= */}
          {/* LEFT PEEK (Active Telephony SIP Trunks Monitor)                           */}
          {/* ========================================================================= */}
          <div className="col-span-1 relative flex flex-col justify-end pb-8">
            <div className="w-14 h-28 rounded-r-3xl bg-white/90 border border-black/5 shadow-sm p-2 flex flex-col justify-between overflow-hidden">
              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 self-end">
                <Radio className="w-2.5 h-2.5 text-emerald-600 animate-pulse" />
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-sky-900 opacity-90" />
                <PhoneCall className="w-4 h-4 text-cyan-400 relative z-10 animate-bounce" />
              </div>
              <div className="text-[9px] font-extrabold text-slate-500 text-center uppercase tracking-tighter">
                3 Lines
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STAGE 1 (Aug - Peak Admissions Inquiry & Inbound Helpline)                */}
          {/* ========================================================================= */}
          <div className="col-span-5 relative pl-4">
            {/* Top Milestone Badge */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 border-2 border-white text-white flex items-center justify-center shadow-md relative z-10 shrink-0 hover:scale-110 transition-transform">
                <PhoneIncoming className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Aug Intake
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  I Week • 342 Inbound Calls Answered
                </span>
              </div>
            </div>

            {/* Stage 1 SVG Branching Bezier Curves */}
            <svg
              className="absolute top-[28px] left-[20px] w-[340px] h-[520px] pointer-events-none z-0"
              fill="none"
            >
              <path
                d="M 20 0 Q 20 50, 70 65 L 100 65"
                stroke={hoveredNode === "card-1" ? "#6366f1" : "#cbd5e1"}
                strokeWidth={hoveredNode === "card-1" ? "3" : "2"}
                className="transition-all duration-300"
                fill="none"
              />
              <path
                d="M 20 0 Q 20 130, 80 155 L 100 155"
                stroke={hoveredNode === "card-1" ? "#6366f1" : "#cbd5e1"}
                strokeWidth={hoveredNode === "card-1" ? "3" : "2"}
                className="transition-all duration-300"
                fill="none"
              />
              <path
                d="M 20 0 Q 20 340, 80 375 L 100 375"
                stroke={hoveredNode === "card-2" ? "#6366f1" : "#cbd5e1"}
                strokeWidth={hoveredNode === "card-2" ? "3" : "2"}
                className="transition-all duration-300"
                fill="none"
              />
            </svg>

            {/* Left Vertical Stepper Controls */}
            <div className="absolute left-[8px] top-[240px] z-10 flex flex-col gap-1 bg-white/90 border border-black/5 rounded-full p-1 shadow-xs">
              <button
                onClick={() => setActiveLeadIndex((prev) => (prev > 0 ? prev - 1 : interestedLeads.length - 1))}
                className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => setActiveLeadIndex((prev) => (prev < interestedLeads.length - 1 ? prev + 1 : 0))}
                className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* II Week Label */}
            <div className="absolute left-[34px] top-[300px] text-[11px] font-bold text-slate-400">
              II Week
            </div>

            {/* Stage 1 Content Nodes Stack */}
            <div className="space-y-6 pl-16">
              {/* 1. Branching Action Pill: Inbound Helplines Active */}
              <div
                onMouseEnter={() => setHoveredNode("pill-1")}
                onMouseLeave={() => setHoveredNode(null)}
                className="inline-flex items-center gap-3 bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center shrink-0">
                  <PhoneIncoming className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-semibold tracking-wide">
                  Inbound Helpline Queue
                </span>
                <span className="text-[11px] font-black text-cyan-300">
                  0s Hold Time
                </span>
              </div>

              {/* 2. Interactive Interested Student Showcase & Latency Card */}
              <div
                onMouseEnter={() => setHoveredNode("card-1")}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] max-w-sm transition-all duration-200 hover:shadow-xl group"
              >
                {/* Header with Switcher Tabs */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-slate-950 tracking-tight">
                      Interested Lead Spotlight
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">
                    {activeLeadIndex + 1} / {interestedLeads.length}
                  </span>
                </div>

                {/* Lead Profile Mini Card */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-200 overflow-hidden relative shrink-0">
                      <Image
                        src="/images/woman-portrait.jpg"
                        alt={currentLead.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-950">
                        {currentLead.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[150px]">
                        {currentLead.course}
                      </div>
                    </div>
                  </div>

                  {/* Play Audio Call Trigger */}
                  <button
                    onClick={() => onOpenLiveCallModal?.(currentLead)}
                    className="w-8 h-8 rounded-full bg-slate-900 hover:bg-indigo-600 text-white flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                    title="Listen to AI call recording"
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </button>
                </div>

                {/* Dual-Wave Spline Chart (Positive Sentiment vs Maya Latency) */}
                <div className="relative h-18 w-full mb-3 flex items-center justify-center">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 240 60">
                    <defs>
                      <linearGradient id="limeWaveGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15" />
                      </linearGradient>
                      <linearGradient id="slateWaveGrad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.08" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 0 45 Q 40 30, 80 40 T 160 35 T 240 45 L 240 60 L 0 60 Z"
                      fill="url(#slateWaveGrad2)"
                    />
                    <path
                      d="M 0 35 Q 40 10, 80 25 T 160 15 T 240 28 L 240 60 L 0 60 Z"
                      fill="url(#limeWaveGrad2)"
                    />
                    <path
                      d="M 0 35 Q 40 10, 80 25 T 160 15 T 240 28"
                      stroke="#6366f1"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>

                  <div className="absolute top-2 right-6 bg-slate-950 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                    94% CSAT • 382ms
                  </div>
                </div>

                {/* Bottom stats */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="text-xs text-slate-600 font-medium">
                    Merit: <span className="font-bold text-slate-900">{currentLead.meritScore?.split("•")[0]}</span>
                  </div>
                  <button
                    onClick={() => onOpenLiveCallModal?.(currentLead)}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Transcript</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 3. Student Inquiry Intent & Course Matching Card */}
              <div
                onMouseEnter={() => setHoveredNode("card-2")}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] max-w-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-950 tracking-tight">
                    Inquiry Topics Resolved
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-black/5 flex items-center justify-center text-slate-500">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs text-slate-800">
                    <span className="font-semibold">B.Tech Tuition Slabs (₹7.98L)</span>
                    <span className="text-emerald-700 font-bold text-[10px]">100% Ingested</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs text-slate-800">
                    <span className="font-semibold">Twin-Sharing AC Hostel (₹1.85L)</span>
                    <span className="text-emerald-700 font-bold text-[10px]">Verified</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs text-slate-800">
                    <span className="font-semibold">Merit Slabs (35% Waiver)</span>
                    <span className="text-emerald-700 font-bold text-[10px]">Auto-Calculated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STAGE 2 (Sep - Outbound Merit Follow-Up & Call Later Scheduling)          */}
          {/* ========================================================================= */}
          <div className="col-span-6 relative pl-4">
            {/* Top Milestone Cyan Badge */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-white text-white flex items-center justify-center shadow-md relative z-10 shrink-0 hover:scale-110 transition-transform">
                <PhoneOutgoing className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Sep Counseling
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-black bg-cyan-100 text-cyan-800 border border-cyan-200">
                    Active Outbound Dialer
                  </span>
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  I Week • 842 Mass Calls Dialed Today
                </span>
              </div>
            </div>

            {/* Stage 2 SVG Branching Bezier Curves */}
            <svg
              className="absolute top-[28px] left-[20px] w-[340px] h-[520px] pointer-events-none z-0"
              fill="none"
            >
              <path
                d="M 20 0 Q 20 50, 70 65 L 100 65"
                stroke={hoveredNode === "card-3" ? "#06b6d4" : "#cbd5e1"}
                strokeWidth={hoveredNode === "card-3" ? "3" : "2"}
                className="transition-all duration-300"
                fill="none"
              />
              <path
                d="M 20 0 Q 20 145, 80 170 L 100 170"
                stroke={hoveredNode === "card-3" ? "#06b6d4" : "#cbd5e1"}
                strokeWidth={hoveredNode === "card-3" ? "3" : "2"}
                className="transition-all duration-300"
                fill="none"
              />
              <path
                d="M 20 0 Q 20 340, 80 375 L 100 375"
                stroke={hoveredNode === "card-4" ? "#06b6d4" : "#cbd5e1"}
                strokeWidth={hoveredNode === "card-4" ? "3" : "2"}
                className="transition-all duration-300"
                fill="none"
              />
            </svg>

            {/* Vertical Stepper Controls */}
            <div className="absolute left-[8px] top-[240px] z-10 flex flex-col gap-1 bg-white/90 border border-black/5 rounded-full p-1 shadow-xs">
              <button className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                <ChevronUp className="w-3 h-3" />
              </button>
              <button className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors">
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Stage 2 Content Nodes Stack */}
            <div className="space-y-6 pl-16">
              {/* Branching Pills Stack: Scheduled Callbacks & Token Fees */}
              <div className="flex flex-wrap gap-2.5 items-center">
                <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-semibold">
                    194 Callbacks Queued
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 bg-emerald-800 text-white px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer">
                  <Award className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-xs font-semibold">
                    428 Token Offers Sent
                  </span>
                </div>
              </div>

              {/* 2. Scheduled Callbacks Queue Spotlight Card */}
              <div
                onMouseEnter={() => setHoveredNode("card-3")}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] max-w-sm transition-all duration-200 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-bold text-slate-950 tracking-tight">
                      Upcoming Scheduled Callbacks
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Auto-Dial
                  </span>
                </div>

                <div className="space-y-2.5 mb-4">
                  {callbacks.slice(0, 2).map((cb) => (
                    <div
                      key={cb.id}
                      onClick={() => onOpenLiveCallModal?.(cb)}
                      className="p-3 bg-slate-50 hover:bg-amber-50/50 border border-slate-200/80 rounded-2xl flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">{cb.name}</div>
                        <div className="text-[10px] text-slate-500">{cb.course}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                          {cb.callbackTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">AI Dialer Auto-Retries</span>
                  <span className="font-bold text-emerald-600">3 retries max</span>
                </div>
              </div>

              {/* 3. Maya Voice Acoustic Cadence Telemetry Card */}
              <div
                onMouseEnter={() => setHoveredNode("card-4")}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-white rounded-[28px] p-5 sm:p-6 border border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] max-w-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-950 tracking-tight">
                    Maya Voice Acoustic Cadence
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-50 border border-black/5 flex items-center justify-center text-slate-500">
                    <Volume2 className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                </div>

                {/* Animated Voice Speech Waveform Line */}
                <div className="relative h-14 w-full flex items-center justify-center overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 240 50" fill="none">
                    <path
                      d="M 0 35 L 30 35 L 35 30 L 40 40 L 45 10 L 52 48 L 58 35 L 90 35 L 95 30 L 100 40 L 105 8 L 112 48 L 118 35 L 150 35 L 155 30 L 160 40 L 165 10 L 172 48 L 178 35 L 240 35"
                      stroke="#e2e8f0"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 0 35 L 30 35 L 35 30 L 40 40 L 45 10 L 52 48 L 58 35 L 90 35 L 95 30 L 100 40 L 105 8 L 112 48 L 118 35 L 150 35 L 155 30 L 160 40 L 165 10 L 172 48 L 178 35 L 240 35"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-ecg-line"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>Natural Latency: 382ms</span>
                  <span className="text-emerald-600 font-bold">Zero Cross-Talk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
