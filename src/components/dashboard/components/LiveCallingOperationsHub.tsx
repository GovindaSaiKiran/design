"use client";

import React, { useState, useEffect } from "react";
import {
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Bot,
  User,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  GraduationCap,
  Volume2,
  Activity,
  ArrowRight,
  Headphones,
  UserCheck,
  Radio,
  Zap,
  BarChart3
} from "lucide-react";
import { StudentLeadItem, mockStudentLeads } from "./LeadSegmentationHub";

interface LiveCallingOperationsHubProps {
  onOpenLiveCallModal?: (lead?: StudentLeadItem) => void;
  onFilterCategory?: (category: string) => void;
  onFilterCourse?: (course: string) => void;
}

export default function LiveCallingOperationsHub({
  onOpenLiveCallModal,
  onFilterCategory,
  onFilterCourse
}: LiveCallingOperationsHubProps) {
  const [activeCallSeconds, setActiveCallSeconds] = useState(222); // 3m 42s
  const [activeTab, setActiveTab] = useState<"inbound" | "outbound">("inbound");

  // Timer simulation for live active call
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCallSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const interestedCount = 428;
  const callbackCount = 194;
  const notInterestedCount = 132;
  const connectedCount = 1073;
  const totalDialed = 1240;

  // Course distribution data
  const courseDemand = [
    { name: "B.Tech Computer Science & AI", count: 168, pct: 39, color: "bg-emerald-500", key: "computer science" },
    { name: "MBA FinTech & Analytics", count: 114, pct: 27, color: "bg-blue-500", key: "fintech" },
    { name: "B.Tech Electronics & VLSI", count: 84, pct: 20, color: "bg-indigo-500", key: "electronics" },
    { name: "B.Des Product & UX Design", count: 62, pct: 14, color: "bg-amber-500", key: "design" }
  ];

  const currentActiveLead = mockStudentLeads[0];

  return (
    <div className="w-full space-y-6 select-none">
      {/* Top Grid: Live Ongoing Call Monitor (Left) + Visual Lead Conversion Funnel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ========================================================================= */}
        {/* 1. LEFT (5 COLS): LIVE ACTIVE CALL TELEMETRY & AUDIO WAVE MONITOR         */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 bg-black text-white rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0px_#d6ff38] flex flex-col justify-between relative overflow-hidden border-3 border-black">
          <div>
            {/* Header: Live Status Badge + Mode Switcher */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                  <span className="w-2 h-2 rounded-full bg-black inline-block animate-pulse" />
                  LIVE HELPLINE ACTIVE
                </span>
              </div>

              <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-700 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("inbound")}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    activeTab === "inbound" ? "bg-[#d6ff38] text-black border border-black shadow-xs" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Inbound (Line 1)
                </button>
                <button
                  onClick={() => setActiveTab("outbound")}
                  className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    activeTab === "outbound" ? "bg-[#d6ff38] text-black border border-black shadow-xs" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  Outbound Dialer
                </button>
              </div>
            </div>

            {/* Active Caller Card */}
            <div className="bg-neutral-950 border-2 border-white/20 rounded-xl p-4 mb-4 shadow-[3px_3px_0px_#d6ff38]">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center font-black text-base shrink-0 shadow-[2px_2px_0px_#ffffff]">
                    <PhoneCall className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-white tracking-tight">
                      {currentActiveLead.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-[#d6ff38]">
                      {currentActiveLead.phone}
                    </span>
                  </div>
                </div>

                {/* Call Duration Pill */}
                <div className="text-right">
                  <span className="inline-block bg-[#d6ff38] text-black border border-black px-3 py-1 rounded-lg text-xs font-mono font-black shadow-[2px_2px_0px_#ffffff]">
                    {formatSeconds(activeCallSeconds)}
                  </span>
                </div>
              </div>

              {/* Course Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-black border border-black text-xs font-extrabold mt-1">
                <GraduationCap className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{currentActiveLead.course}</span>
              </div>
            </div>

            {/* Live Audio Animated Waveform Visualizer */}
            <div className="bg-neutral-950 border-2 border-neutral-800 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between text-xs font-bold text-neutral-300 mb-2">
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#d6ff38] stroke-[2.5]" />
                  <span>Maya AI Voice Stream</span>
                </div>
                <span className="text-xs text-[#d6ff38] font-black font-mono">
                  382ms Latency • HD Audio
                </span>
              </div>

              {/* Pulsing Audio Frequency Bars */}
              <div className="flex items-end justify-between gap-1 h-12 px-1">
                {[40, 75, 95, 60, 30, 85, 100, 70, 45, 90, 80, 55, 35, 65, 95, 80, 50, 70, 90, 60, 40].map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${Math.max(20, (val * ((idx % 3) + 1)) % 100)}%` }}
                    className="flex-1 bg-[#d6ff38] border-t border-black rounded-t animate-pulse opacity-95 transition-all duration-300"
                  />
                ))}
              </div>
            </div>

            {/* Live Synchronized Transcript Snippet */}
            <div className="bg-neutral-900 border-2 border-neutral-700 rounded-xl p-3.5 text-xs text-neutral-200">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#d6ff38] mb-1 uppercase tracking-wider">
                <Bot className="w-4 h-4 stroke-[2.5]" />
                <span>Maya (Speaking right now):</span>
              </div>
              <p className="font-medium text-white leading-relaxed text-xs">
                &ldquo;Rahul, for 94% in CBSE, your 35% Chancellor Merit Scholarship is pre-approved for B.Tech CSE. Would you like me to book your campus visit pass for this Saturday?&rdquo;
              </p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="pt-4 border-t-2 border-neutral-800 flex items-center justify-between gap-3">
            <button
              onClick={() => onOpenLiveCallModal?.(currentActiveLead)}
              className="flex-1 py-2.5 rounded-xl bg-[#d6ff38] hover:bg-[#cbf72e] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#ffffff] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4 stroke-[2.5]" />
              <span>Listen Live / Inspect</span>
            </button>

            <button
              onClick={() => onOpenLiveCallModal?.(currentActiveLead)}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#fcffe0] text-black font-black text-xs border-2 border-black shadow-[3px_3px_0px_#d6ff38] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Transfer to Dean</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. RIGHT (7 COLS): VISUAL ADMISSIONS CALLING FUNNEL & TODAY'S YIELD       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 shadow-[6px_6px_0px_#000000] border-3 border-black flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b-2 border-black">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-full bg-[#d6ff38] border-2 border-black inline-block" />
                  <h3 className="text-xl font-black text-black tracking-tight uppercase">
                    Today&apos;s AI Calling Conversion Funnel
                  </h3>
                </div>
                <p className="text-xs font-bold text-black/70">
                  Real-time yield from <strong className="text-black bg-[#d6ff38] px-1 py-0.2 border border-black">{totalDialed.toLocaleString()} Total Contacts Dialed</strong> by Maya, Priya & Vikram
                </p>
              </div>

              <span className="text-xs font-black text-black bg-[#d6ff38] px-3 py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] self-start sm:self-auto">
                86.5% CONNECTION RATE
              </span>
            </div>

            {/* Visual Interactive Funnel Bars */}
            <div className="space-y-3.5 mb-6">
              {/* Stage 1: Dialed & Connected */}
              <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-black shadow-[3px_3px_0px_#000000]">
                <div className="flex items-center justify-between text-xs font-black mb-1.5">
                  <span className="text-black flex items-center gap-2">
                    <PhoneOutgoing className="w-4 h-4 text-black stroke-[2.5]" />
                    Total Connected & Answered
                  </span>
                  <span className="text-black font-mono font-black text-sm">
                    {connectedCount} / {totalDialed} calls (86.5%)
                  </span>
                </div>
                <div className="w-full h-3 bg-white border-2 border-black rounded-full overflow-hidden">
                  <div style={{ width: "86.5%" }} className="h-full bg-black rounded-full" />
                </div>
              </div>

              {/* Stage 2: Interested Students */}
              <div
                onClick={() => onFilterCategory?.("interested")}
                className="p-3.5 rounded-xl bg-[#f4ffb8] hover:bg-[#eaff99] border-2 border-black shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000] cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-black mb-1.5">
                  <span className="text-black flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                    ⭐ Interested in Institute & Target Courses
                  </span>
                  <span className="text-black font-mono font-black text-sm">
                    {interestedCount} Students (39.8% Yield)
                  </span>
                </div>
                <div className="w-full h-3 bg-white border-2 border-black rounded-full overflow-hidden mb-1.5">
                  <div style={{ width: "39.8%" }} className="h-full bg-[#d6ff38] border-r-2 border-black rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-black">
                  <span>Campus tours scheduled • Token fee offers sent</span>
                  <span className="font-black underline group-hover:text-black flex items-center gap-1">
                    View List <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>
              </div>

              {/* Stage 3: Call Later / Callbacks */}
              <div
                onClick={() => onFilterCategory?.("call_later")}
                className="p-3.5 rounded-xl bg-amber-100 hover:bg-amber-200 border-2 border-black shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000] cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-black mb-1.5">
                  <span className="text-black flex items-center gap-2">
                    <Clock className="w-4 h-4 stroke-[3]" />
                    ⏰ Callbacks & Follow-ups Scheduled
                  </span>
                  <span className="text-black font-mono font-black text-sm">
                    {callbackCount} Students (18.1%)
                  </span>
                </div>
                <div className="w-full h-3 bg-white border-2 border-black rounded-full overflow-hidden mb-1.5">
                  <div style={{ width: "18.1%" }} className="h-full bg-amber-400 border-r-2 border-black rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-black">
                  <span>Parents at office • Queued for auto-dialer retry</span>
                  <span className="font-black underline group-hover:text-black flex items-center gap-1">
                    View Callbacks <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>
              </div>

              {/* Stage 4: Not Interested */}
              <div
                onClick={() => onFilterCategory?.("not_interested")}
                className="p-3 rounded-xl bg-rose-100 hover:bg-rose-200 border-2 border-black shadow-[3px_3px_0px_#000000] cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-xs font-black text-black">
                  <XCircle className="w-4 h-4 stroke-[3]" />
                  <span>🚫 Not Interested / Opt-Out List</span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-xs font-black text-black font-mono">
                    {notInterestedCount} (12.3%)
                  </span>
                  <span className="text-xs font-black underline">View Reasons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Demand Breakdown */}
          <div className="pt-4 border-t-2 border-black">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 stroke-[2.5]" />
                Interested Students by Academic Program
              </span>
              <span className="text-xs font-bold text-black/60">Click any program to filter leads</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {courseDemand.map((cd) => (
                <div
                  key={cd.key}
                  onClick={() => onFilterCourse?.(cd.key)}
                  className="p-3 rounded-xl bg-white hover:bg-[#fcffe0] border-2 border-black shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000000] cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d6ff38] border border-black inline-block" />
                    <span className="text-sm font-black text-black font-mono">{cd.count}</span>
                  </div>
                  <div className="text-xs font-black text-black truncate" title={cd.name}>
                    {cd.name.split(" ")[0]} {cd.name.split(" ")[1]}
                  </div>
                  <div className="text-[11px] text-black/70 font-bold">{cd.pct}% of leads</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
