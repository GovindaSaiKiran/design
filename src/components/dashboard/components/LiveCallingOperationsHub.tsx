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
        <div className="lg:col-span-5 bg-slate-950 text-white rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between relative overflow-hidden border border-slate-800">
          <div>
            {/* Header: Live Status Badge + Mode Switcher */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse" />
                  LIVE HELPLINE ACTIVE
                </span>
              </div>

              <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/60 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab("inbound")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "inbound" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Inbound (Line 1)
                </button>
                <button
                  onClick={() => setActiveTab("outbound")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "outbound" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Outbound Dialer
                </button>
              </div>
            </div>

            {/* Active Caller Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-4 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold text-base shrink-0 shadow-md shadow-indigo-600/20">
                    <PhoneCall className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {currentActiveLead.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {currentActiveLead.phone}
                    </span>
                  </div>
                </div>

                {/* Call Duration Pill */}
                <div className="text-right">
                  <span className="inline-block bg-indigo-950 text-indigo-300 border border-indigo-800 px-3 py-1 rounded-lg text-xs font-mono font-bold shadow-xs">
                    {formatSeconds(activeCallSeconds)}
                  </span>
                </div>
              </div>

              {/* Course Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium mt-1">
                <GraduationCap className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{currentActiveLead.course}</span>
              </div>
            </div>

            {/* Live Audio Animated Waveform Visualizer */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
                  <span>Maya AI Voice Stream</span>
                </div>
                <span className="text-xs text-cyan-400 font-bold font-mono">
                  382ms Latency • HD Audio
                </span>
              </div>

              {/* Pulsing Audio Frequency Bars */}
              <div className="flex items-end justify-between gap-1 h-12 px-1">
                {[40, 75, 95, 60, 30, 85, 100, 70, 45, 90, 80, 55, 35, 65, 95, 80, 50, 70, 90, 60, 40].map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${Math.max(20, (val * ((idx % 3) + 1)) % 100)}%` }}
                    className="flex-1 bg-cyan-400 rounded-t animate-pulse opacity-95 transition-all duration-300"
                  />
                ))}
              </div>
            </div>

            {/* Live Synchronized Transcript Snippet */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 mb-1 uppercase tracking-wider">
                <Bot className="w-4 h-4 stroke-[2.5]" />
                <span>Maya (Speaking right now):</span>
              </div>
              <p className="font-medium text-white leading-relaxed text-xs">
                &ldquo;Rahul, for 94% in CBSE, your 35% Chancellor Merit Scholarship is pre-approved for B.Tech CSE. Would you like me to book your campus visit pass for this Saturday?&rdquo;
              </p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => onOpenLiveCallModal?.(currentActiveLead)}
              className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4 stroke-[2.5]" />
              <span>Listen Live / Inspect</span>
            </button>

            <button
              onClick={() => onOpenLiveCallModal?.(currentActiveLead)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Transfer to Dean</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. RIGHT (7 COLS): VISUAL ADMISSIONS CALLING FUNNEL & TODAY'S YIELD       */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-200/90 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                    Today&apos;s AI Calling Conversion Funnel
                  </h3>
                </div>
                <p className="text-xs font-medium text-slate-500">
                  Real-time yield from <strong className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">{totalDialed.toLocaleString()} Total Contacts Dialed</strong> by Maya, Priya & Vikram
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shadow-xs self-start sm:self-auto">
                86.5% CONNECTION RATE
              </span>
            </div>

            {/* Visual Interactive Funnel Bars */}
            <div className="space-y-3.5 mb-6">
              {/* Stage 1: Dialed & Connected */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-800 flex items-center gap-2 font-bold">
                    <PhoneOutgoing className="w-4 h-4 text-slate-600 stroke-[2.5]" />
                    Total Connected & Answered
                  </span>
                  <span className="text-slate-900 font-mono font-bold text-sm">
                    {connectedCount} / {totalDialed} calls (86.5%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div style={{ width: "86.5%" }} className="h-full bg-slate-800 rounded-full" />
                </div>
              </div>

              {/* Stage 2: Interested Students */}
              <div
                onClick={() => onFilterCategory?.("interested")}
                className="p-3.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/70 border border-emerald-200/80 shadow-xs hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-emerald-900 flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    Interested in Institute & Target Courses
                  </span>
                  <span className="text-emerald-900 font-mono font-bold text-sm">
                    {interestedCount} Students (39.8% Yield)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-emerald-200/50 rounded-full overflow-hidden mb-1.5">
                  <div style={{ width: "39.8%" }} className="h-full bg-emerald-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-emerald-700">
                  <span>Campus tours scheduled • Token fee offers sent</span>
                  <span className="font-bold underline group-hover:text-emerald-900 flex items-center gap-1">
                    View List <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </div>
              </div>

              {/* Stage 3: Call Later / Callbacks */}
              <div
                onClick={() => onFilterCategory?.("call_later")}
                className="p-3.5 rounded-xl bg-amber-50/80 hover:bg-amber-100/70 border border-amber-200/80 shadow-xs hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-amber-900 flex items-center gap-2 font-bold">
                    <Clock className="w-4 h-4 text-amber-600 stroke-[2.5]" />
                    Callbacks & Follow-ups Scheduled
                  </span>
                  <span className="text-amber-900 font-mono font-bold text-sm">
                    {callbackCount} Students (18.1%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-amber-200/50 rounded-full overflow-hidden mb-1.5">
                  <div style={{ width: "18.1%" }} className="h-full bg-amber-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-amber-700">
                  <span>Parents at office • Queued for auto-dialer retry</span>
                  <span className="font-bold underline group-hover:text-amber-900 flex items-center gap-1">
                    View Callbacks <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </div>
              </div>

              {/* Stage 4: Not Interested */}
              <div
                onClick={() => onFilterCategory?.("not_interested")}
                className="p-3 rounded-xl bg-rose-50/80 hover:bg-rose-100/70 border border-rose-200/80 shadow-xs cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-rose-900">
                  <XCircle className="w-4 h-4 text-rose-600 stroke-[2.5]" />
                  <span>Not Interested / Opt-Out List</span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-xs font-bold text-rose-900 font-mono">
                    {notInterestedCount} (12.3%)
                  </span>
                  <span className="text-xs font-semibold underline text-rose-700">View Reasons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Demand Breakdown */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-indigo-600 stroke-[2.5]" />
                Interested Students by Academic Program
              </span>
              <span className="text-xs font-medium text-slate-400">Click any program to filter leads</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {courseDemand.map((cd) => (
                <div
                  key={cd.key}
                  onClick={() => onFilterCourse?.(cd.key)}
                  className="p-3 rounded-xl bg-slate-50/80 hover:bg-indigo-50/60 border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
                    <span className="text-sm font-bold text-slate-900 font-mono">{cd.count}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 truncate" title={cd.name}>
                    {cd.name.split(" ")[0]} {cd.name.split(" ")[1]}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">{cd.pct}% of leads</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
