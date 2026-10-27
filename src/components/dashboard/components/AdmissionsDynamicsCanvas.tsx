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
        <div className="absolute top-[28px] left-8 right-16 h-[2px] bg-black/[0.08] z-0" />

        {/* Top Right Floating Action Button (+) */}
        <div className="absolute top-1 right-8 z-20">
          <button
            onClick={onAddMilestone}
            className="w-11 h-11 rounded-full bg-[#111111] hover:bg-[#222222] text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer group"
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
            <div className="w-14 h-28 rounded-r-3xl bg-white border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-2 flex flex-col justify-between overflow-hidden">
              <div className="w-5 h-5 rounded-full bg-[#FAF3E4] flex items-center justify-center text-black/60 self-end">
                <Radio className="w-2.5 h-2.5 text-[#16856B] animate-pulse" />
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#111111] flex items-center justify-center overflow-hidden relative group cursor-pointer shadow-sm">
                <PhoneCall className="w-4 h-4 text-[#C1F2D5] relative z-10 animate-bounce" />
              </div>
              <div className="text-[9px] font-extrabold text-black/45 text-center uppercase tracking-tighter">
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
              <div className="w-10 h-10 rounded-2xl bg-[#D9C2FA] border-2 border-white text-[#4A2574] flex items-center justify-center shadow-sm relative z-10 shrink-0 hover:scale-110 transition-transform">
                <PhoneIncoming className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#1A1A1A] tracking-tight flex items-center gap-1.5">
                  Aug Intake
                  <span className="w-2 h-2 rounded-full bg-[#16856B] animate-pulse" />
                </span>
                <span className="text-[11px] font-medium text-black/50">
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
                stroke={hoveredNode === "card-1" ? "#111111" : "rgba(0,0,0,0.12)"}
                strokeWidth={hoveredNode === "card-1" ? "2.5" : "1.5"}
                className="transition-all duration-300"
                fill="none"
              />
              <path
                d="M 20 0 Q 20 130, 80 155 L 100 155"
                stroke={hoveredNode === "card-1" ? "#111111" : "rgba(0,0,0,0.12)"}
                strokeWidth={hoveredNode === "card-1" ? "2.5" : "1.5"}
                className="transition-all duration-300"
                fill="none"
              />
              <path
                d="M 20 0 Q 20 340, 80 375 L 100 375"
                stroke={hoveredNode === "card-2" ? "#111111" : "rgba(0,0,0,0.12)"}
                strokeWidth={hoveredNode === "card-2" ? "2.5" : "1.5"}
                className="transition-all duration-300"
                fill="none"
              />
            </svg>

            {/* Left Vertical Stepper Controls */}
            <div className="absolute left-[8px] top-[240px] z-10 flex flex-col gap-1 bg-white border border-black/[0.06] rounded-full p-1 shadow-sm">
              <button
                onClick={() => setActiveLeadIndex((prev) => (prev > 0 ? prev - 1 : interestedLeads.length - 1))}
                className="w-5 h-5 rounded-full hover:bg-[#FAF3E4] flex items-center justify-center text-black/60 transition-colors cursor-pointer"
              >
                <ChevronUp className="w-3 h-3" />
              </button>
              <button
                onClick={() => setActiveLeadIndex((prev) => (prev < interestedLeads.length - 1 ? prev + 1 : 0))}
                className="w-5 h-5 rounded-full hover:bg-[#FAF3E4] flex items-center justify-center text-black/60 transition-colors cursor-pointer"
              >
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* II Week Label */}
            <div className="absolute left-[34px] top-[300px] text-[11px] font-bold text-black/40">
              II Week
            </div>

            {/* Stage 1 Content Nodes Stack */}
            <div className="space-y-6 pl-16">
              {/* 1. Branching Action Pill: Inbound Helplines Active */}
              <div
                onMouseEnter={() => setHoveredNode("pill-1")}
                onMouseLeave={() => setHoveredNode(null)}
                className="inline-flex items-center gap-3 bg-[#111111] text-white px-4 py-2.5 rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#D9C2FA] text-[#4A2574] flex items-center justify-center shrink-0">
                  <PhoneIncoming className="w-3 h-3" />
                </div>
                <span className="text-xs font-semibold tracking-wide">
                  Inbound Helpline Queue
                </span>
                <span className="text-[11px] font-bold text-[#C1F2D5] bg-white/10 px-2 py-0.5 rounded-full">
                  0s Hold Time
                </span>
              </div>

              {/* 2. Interactive Interested Student Showcase & Latency Card */}
              <div
                onMouseEnter={() => setHoveredNode("card-1")}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-white rounded-[26px] p-5 sm:p-6 border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)] max-w-sm transition-all duration-200 hover:shadow-lg group"
              >
                {/* Header with Switcher Tabs */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16856B]" />
                    <span className="text-sm font-bold text-[#1A1A1A] tracking-tight">
                      Interested Lead Spotlight
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-black/45 bg-[#FAF3E4] px-2 py-0.5 rounded-full">
                    {activeLeadIndex + 1} / {interestedLeads.length}
                  </span>
                </div>

                {/* Lead Profile Mini Card */}
                <div className="bg-[#FAF3E4] border border-black/[0.04] rounded-2xl p-3 mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.04] overflow-hidden relative shrink-0">
                      <Image
                        src="/images/woman-portrait.jpg"
                        alt={currentLead.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1A1A1A]">
                        {currentLead.name}
                      </div>
                      <div className="text-[10px] text-black/55 truncate max-w-[150px]">
                        {currentLead.course}
                      </div>
                    </div>
                  </div>

                  {/* Play Audio Call Trigger */}
                  <button
                    onClick={() => onOpenLiveCallModal?.(currentLead)}
                    className="w-8 h-8 rounded-full bg-[#111111] hover:bg-[#222222] text-white flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
                    title="Listen to AI call recording"
                  >
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </button>
                </div>

                {/* Dual-Wave Spline Chart (Positive Sentiment vs Maya Latency) */}
                <div className="relative h-18 w-full mb-3 flex items-center justify-center">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 240 60">
                    <defs>
                      <linearGradient id="mintWaveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16856B" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#C1F2D5" stopOpacity="0.05" />
                      </linearGradient>
                      <linearGradient id="creamWaveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D9C2FA" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#FAF3E4" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M 0 45 Q 40 30, 80 40 T 160 35 T 240 45 L 240 60 L 0 60 Z"
                      fill="url(#creamWaveGrad)"
                    />
                    <path
                      d="M 0 35 Q 40 10, 80 25 T 160 15 T 240 28 L 240 60 L 0 60 Z"
                      fill="url(#mintWaveGrad)"
                    />
                    <path
                      d="M 0 35 Q 40 10, 80 25 T 160 15 T 240 28"
                      stroke="#16856B"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>

                  <div className="absolute top-2 right-6 bg-[#111111] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                    94% CSAT • 382ms
                  </div>
                </div>

                {/* Bottom stats */}
                <div className="flex items-center justify-between pt-2 border-t border-black/[0.04]">
                  <div className="text-xs text-black/60 font-medium">
                    Merit: <span className="font-bold text-[#1A1A1A]">{currentLead.meritScore?.split("•")[0]}</span>
                  </div>
                  <button
                    onClick={() => onOpenLiveCallModal?.(currentLead)}
                    className="text-xs font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer"
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
                className="bg-white rounded-[26px] p-5 sm:p-6 border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)] max-w-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-[#1A1A1A] tracking-tight">
                    Inquiry Topics Resolved
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#FAF3E4] border border-black/[0.04] flex items-center justify-center text-black/60">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF3E4] text-xs text-[#1A1A1A]">
                    <span className="font-semibold">Enterprise SLA Tier (99.99%)</span>
                    <span className="text-[#16856B] bg-[#C1F2D5] font-bold text-[10px] px-2 py-0.5 rounded-full">100% Ingested</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF3E4] text-xs text-[#1A1A1A]">
                    <span className="font-semibold">Multi-Region SIP Peering (120ms)</span>
                    <span className="text-[#16856B] bg-[#C1F2D5] font-bold text-[10px] px-2 py-0.5 rounded-full">Verified</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF3E4] text-xs text-[#1A1A1A]">
                    <span className="font-semibold">Volume Discounts (Net-30)</span>
                    <span className="text-[#16856B] bg-[#C1F2D5] font-bold text-[10px] px-2 py-0.5 rounded-full">Auto-Calculated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* STAGE 2 (Sep - Outbound Merit Follow-Up & Call Later Scheduling)          */}
          {/* ========================================================================= */}
          <div className="col-span-6 relative pl-4">
            {/* Top Milestone Badge */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#BCD0F5] border-2 border-white text-[#2C4875] flex items-center justify-center shadow-sm relative z-10 shrink-0 hover:scale-110 transition-transform">
                <PhoneOutgoing className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#1A1A1A] tracking-tight flex items-center gap-1.5">
                  Sep Counseling
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#BCD0F5] text-[#2C4875]">
                    Active Outbound Dialer
                  </span>
                </span>
                <span className="text-[11px] font-medium text-black/50">
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
                stroke={hoveredNode === "card-3" ? "#111111" : "rgba(0,0,0,0.12)"}
                strokeWidth={hoveredNode === "card-3" ? "2.5" : "1.5"}
                className="transition-all duration-300"
                fill="none"
              />
              <path
                d="M 20 0 Q 20 145, 80 170 L 100 170"
                stroke={hoveredNode === "card-3" ? "#111111" : "rgba(0,0,0,0.12)"}
                strokeWidth={hoveredNode === "card-3" ? "2.5" : "1.5"}
                className="transition-all duration-300"
                fill="none"
              />
              <path
                d="M 20 0 Q 20 340, 80 375 L 100 375"
                stroke={hoveredNode === "card-4" ? "#111111" : "rgba(0,0,0,0.12)"}
                strokeWidth={hoveredNode === "card-4" ? "2.5" : "1.5"}
                className="transition-all duration-300"
                fill="none"
              />
            </svg>

            {/* Vertical Stepper Controls */}
            <div className="absolute left-[8px] top-[240px] z-10 flex flex-col gap-1 bg-white border border-black/[0.06] rounded-full p-1 shadow-sm">
              <button className="w-5 h-5 rounded-full hover:bg-[#FAF3E4] flex items-center justify-center text-black/60 transition-colors">
                <ChevronUp className="w-3 h-3" />
              </button>
              <button className="w-5 h-5 rounded-full hover:bg-[#FAF3E4] flex items-center justify-center text-black/60 transition-colors">
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Stage 2 Content Nodes Stack */}
            <div className="space-y-6 pl-16">
              {/* Branching Pills Stack: Scheduled Callbacks & Token Fees */}
              <div className="flex flex-wrap gap-2.5 items-center">
                <div className="inline-flex items-center gap-2 bg-[#111111] text-white px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer">
                  <Clock className="w-3.5 h-3.5 text-[#FFD9A0]" />
                  <span className="text-xs font-semibold">
                    194 Callbacks Queued
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#C1F2D5] text-[#16856B] px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform cursor-pointer font-bold">
                  <Award className="w-3.5 h-3.5" />
                  <span className="text-xs">
                    428 Token Offers Sent
                  </span>
                </div>
              </div>

              {/* 2. Scheduled Callbacks Queue Spotlight Card */}
              <div
                onMouseEnter={() => setHoveredNode("card-3")}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-white rounded-[26px] p-5 sm:p-6 border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)] max-w-sm transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8C5300]" />
                    <span className="text-sm font-bold text-[#1A1A1A] tracking-tight">
                      Upcoming Scheduled Callbacks
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#8C5300] bg-[#FFD9A0] px-2.5 py-0.5 rounded-full">
                    Auto-Dial
                  </span>
                </div>

                <div className="space-y-2.5 mb-4">
                  {callbacks.slice(0, 2).map((cb) => (
                    <div
                      key={cb.id}
                      onClick={() => onOpenLiveCallModal?.(cb)}
                      className="p-3 bg-[#FAF3E4] hover:bg-[#F3EBDA] border border-black/[0.04] rounded-2xl flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-[#1A1A1A]">{cb.name}</div>
                        <div className="text-[10px] text-black/55">{cb.course}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-bold text-[#8C5300] bg-[#FFD9A0] px-2 py-0.5 rounded-full">
                          {cb.callbackTime}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-xs">
                  <span className="text-black/50">AI Dialer Auto-Retries</span>
                  <span className="font-bold text-[#16856B]">3 retries max</span>
                </div>
              </div>

              {/* 3. Maya Voice Acoustic Cadence Telemetry Card */}
              <div
                onMouseEnter={() => setHoveredNode("card-4")}
                onMouseLeave={() => setHoveredNode(null)}
                className="bg-white rounded-[26px] p-5 sm:p-6 border border-black/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.03)] max-w-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#1A1A1A] tracking-tight">
                    Maya Voice Acoustic Cadence
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#FAF3E4] border border-black/[0.04] flex items-center justify-center text-black/60">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Animated Voice Speech Waveform Line */}
                <div className="relative h-14 w-full flex items-center justify-center overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 240 50" fill="none">
                    <path
                      d="M 0 35 L 30 35 L 35 30 L 40 40 L 45 10 L 52 48 L 58 35 L 90 35 L 95 30 L 100 40 L 105 8 L 112 48 L 118 35 L 150 35 L 155 30 L 160 40 L 165 10 L 172 48 L 178 35 L 240 35"
                      stroke="#FAF3E4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M 0 35 L 30 35 L 35 30 L 40 40 L 45 10 L 52 48 L 58 35 L 90 35 L 95 30 L 100 40 L 105 8 L 112 48 L 118 35 L 150 35 L 155 30 L 160 40 L 165 10 L 172 48 L 178 35 L 240 35"
                      stroke="#16856B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-ecg-line"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[11px] text-black/50 pt-1 border-t border-black/[0.04]">
                  <span>Natural Latency: 382ms</span>
                  <span className="text-[#16856B] font-bold">Zero Cross-Talk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
