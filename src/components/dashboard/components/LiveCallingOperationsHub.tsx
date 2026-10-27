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

  // Solution distribution data
  const courseDemand = [
    { name: "Enterprise SIP Trunking & Peering", count: 168, pct: 39, color: "bg-emerald-500", key: "sip trunking" },
    { name: "AI Inbound Helpline & IVR", count: 114, pct: 27, color: "bg-blue-500", key: "ivr" },
    { name: "Outbound Lead Dialing Cadence", count: 84, pct: 20, color: "bg-indigo-500", key: "outbound" },
    { name: "WhatsApp & Omnichannel Handoff", count: 62, pct: 14, color: "bg-amber-500", key: "whatsapp" }
  ];

  const currentActiveLead = mockStudentLeads[0] || {
    id: "lead-none",
    name: "No Active Caller",
    phone: "--",
    course: "Standby Channel",
    category: "inbound_inquiry" as const,
    agentName: "Voice Engine",
    callDuration: "0s",
    timestamp: "Now",
    timeAgo: "Now",
    summary: "No active calls streaming currently.",
    transcriptSnippet: "Channel in standby mode.",
    actionTaken: "Listening for inbound rings"
  };

  return (
    <div className="w-full space-y-6 select-none font-sans">
      {/* Top Grid: Live Ongoing Call Monitor (Left) + Visual Lead Conversion Funnel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* 1. LEFT (5 COLS): LIVE ACTIVE CALL TELEMETRY & AUDIO WAVE MONITOR */}
        <div className="lg:col-span-5 bg-[#111111] text-white rounded-[26px] p-6 sm:p-7 shadow-xl flex flex-col justify-between relative overflow-hidden border border-black/10">
          <div>
            {/* Header: Live Status Badge + Mode Switcher */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#C1F2D5]/15 text-[#C1F2D5] border border-[#C1F2D5]/30">
                  <span className="w-2 h-2 rounded-full bg-[#C1F2D5] inline-block animate-pulse" />
                  LIVE HELPLINE ACTIVE
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white/10 border border-white/10 p-1 rounded-full">
                <button
                  onClick={() => setActiveTab("inbound")}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "inbound" ? "bg-white text-[#111111] shadow-xs" : "text-white/60 hover:text-white"
                  }`}
                >
                  Inbound
                </button>
                <button
                  onClick={() => setActiveTab("outbound")}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "outbound" ? "bg-white text-[#111111] shadow-xs" : "text-white/60 hover:text-white"
                  }`}
                >
                  Outbound
                </button>
              </div>
            </div>

            {/* Active Caller Card */}
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4 mb-4 shadow-sm">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#C1F2D5] text-[#111111] flex items-center justify-center font-bold text-base shrink-0 shadow-md">
                    <PhoneCall className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white tracking-tight font-sans">
                      {currentActiveLead.name}
                    </h4>
                    <span className="text-xs font-mono font-bold text-[#C1F2D5]">
                      {currentActiveLead.phone}
                    </span>
                  </div>
                </div>

                {/* Call Duration Pill */}
                <div className="text-right">
                  <span className="inline-block bg-white/10 text-white border border-white/10 px-3 py-1 rounded-full text-xs font-mono font-bold shadow-xs">
                    {formatSeconds(activeCallSeconds)}
                  </span>
                </div>
              </div>

              {/* Course Tag */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10 text-xs font-semibold mt-1">
                <GraduationCap className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{currentActiveLead.course}</span>
              </div>
            </div>

            {/* Live Audio Animated Waveform Visualizer */}
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between text-xs font-bold text-white/80 mb-2">
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#C1F2D5] stroke-[2.5]" />
                  <span>Maya AI Voice Stream</span>
                </div>
                <span className="text-xs text-[#C1F2D5] font-bold font-mono">
                  382ms Latency • HD Audio
                </span>
              </div>

              {/* Pulsing Audio Frequency Bars */}
              <div className="flex items-end justify-between gap-1 h-12 px-1">
                {[40, 75, 95, 60, 30, 85, 100, 70, 45, 90, 80, 55, 35, 65, 95, 80, 50, 70, 90, 60, 40].map((val, idx) => (
                  <div
                    key={idx}
                    style={{ height: `${Math.max(20, (val * ((idx % 3) + 1)) % 100)}%` }}
                    className="flex-1 bg-[#C1F2D5] rounded-t animate-pulse opacity-95 transition-all duration-300"
                  />
                ))}
              </div>
            </div>

            {/* Live Synchronized Transcript Snippet */}
            <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4 text-xs text-white/90">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#C1F2D5] mb-1 uppercase tracking-wider">
                <Bot className="w-4 h-4 stroke-[2.5]" />
                <span>Maya (Speaking right now):</span>
              </div>
              <p className="font-medium text-white/90 leading-relaxed text-xs">
                &ldquo;Based on your monthly call profile, our Enterprise Voice tier is provisioned with dedicated SIP trunks and sub-140ms latency. Would you like me to schedule a technical walkthrough for your team?&rdquo;
              </p>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              onClick={() => onOpenLiveCallModal?.(currentActiveLead)}
              className="flex-1 py-2.5 rounded-full bg-[#C1F2D5] hover:bg-[#b0ecd0] text-[#111111] font-bold text-xs shadow-md active:translate-y-px transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Headphones className="w-4 h-4 stroke-[2.5]" />
              <span>Listen Live / Inspect</span>
            </button>

            <button
              onClick={() => onOpenLiveCallModal?.(currentActiveLead)}
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10 active:translate-y-px transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Transfer to Dean</span>
            </button>
          </div>
        </div>

        {/* 2. RIGHT (7 COLS): VISUAL ADMISSIONS CALLING FUNNEL & TODAY'S YIELD */}
        <div className="lg:col-span-7 bg-white rounded-[26px] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.06] flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-black/[0.05]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16856B] inline-block" />
                  <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight font-sans">
                    Today&apos;s AI Calling Conversion Funnel
                  </h3>
                </div>
                <p className="text-xs font-medium text-black/55">
                  Real-time yield from <strong className="text-[#1A1A1A] bg-[#FAF3E4] px-2 py-0.5 rounded-full border border-black/[0.06]">{totalDialed.toLocaleString()} Total Contacts Dialed</strong> by Maya, Priya &amp; Vikram
                </p>
              </div>

              <span className="text-xs font-bold text-[#16856B] bg-[#C1F2D5] px-3.5 py-1.5 rounded-full shadow-2xs self-start sm:self-auto">
                86.5% CONNECTION RATE
              </span>
            </div>

            {/* Visual Interactive Funnel Bars */}
            <div className="space-y-3 mb-6">
              {/* Stage 1: Dialed & Connected */}
              <div className="p-3.5 rounded-2xl bg-[#FAF3E4]/40 border border-black/[0.05] shadow-2xs">
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#1A1A1A] flex items-center gap-2 font-bold">
                    <PhoneOutgoing className="w-4 h-4 text-black/60 stroke-[2.5]" />
                    Total Connected &amp; Answered
                  </span>
                  <span className="text-[#1A1A1A] font-bold text-sm">
                    {connectedCount} / {totalDialed} calls (86.5%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-black/[0.06] rounded-full overflow-hidden">
                  <div style={{ width: "86.5%" }} className="h-full bg-[#111111] rounded-full" />
                </div>
              </div>

              {/* Stage 2: Interested Students */}
              <div
                onClick={() => onFilterCategory?.("interested")}
                className="p-3.5 rounded-2xl bg-[#C1F2D5]/25 hover:bg-[#C1F2D5]/40 border border-[#C1F2D5]/60 shadow-2xs hover:-translate-y-0.5 hover:shadow-xs cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#16856B] flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#16856B] stroke-[2.5]" />
                    Interested in Solutions &amp; Platform Capabilities
                  </span>
                  <span className="text-[#16856B] font-bold text-sm">
                    {interestedCount} Contacts (39.8% Yield)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#C1F2D5]/50 rounded-full overflow-hidden mb-1.5">
                  <div style={{ width: "39.8%" }} className="h-full bg-[#16856B] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-[#16856B]">
                  <span>Product walkthroughs scheduled • SLA terms sent</span>
                  <span className="font-bold underline flex items-center gap-1">
                    View List <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </div>
              </div>

              {/* Stage 3: Call Later / Callbacks */}
              <div
                onClick={() => onFilterCategory?.("call_later")}
                className="p-3.5 rounded-2xl bg-[#FFD9A0]/25 hover:bg-[#FFD9A0]/40 border border-[#FFD9A0]/60 shadow-2xs hover:-translate-y-0.5 hover:shadow-xs cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                  <span className="text-[#9A5B00] flex items-center gap-2 font-bold">
                    <Clock className="w-4 h-4 text-[#9A5B00] stroke-[2.5]" />
                    Callbacks &amp; Follow-ups Scheduled
                  </span>
                  <span className="text-[#9A5B00] font-bold text-sm">
                    {callbackCount} Contacts (18.1%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#FFD9A0]/50 rounded-full overflow-hidden mb-1.5">
                  <div style={{ width: "18.1%" }} className="h-full bg-[#9A5B00] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-[#9A5B00]">
                  <span>Stakeholders in meeting • Queued for auto-dialer retry</span>
                  <span className="font-bold underline flex items-center gap-1">
                    View Callbacks <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </div>
              </div>

              {/* Stage 4: Not Interested */}
              <div
                onClick={() => onFilterCategory?.("not_interested")}
                className="p-3 rounded-2xl bg-[#FFC0D3]/25 hover:bg-[#FFC0D3]/40 border border-[#FFC0D3]/60 shadow-2xs cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#A81D47]">
                  <XCircle className="w-4 h-4 text-[#A81D47] stroke-[2.5]" />
                  <span>Not Interested / Opt-Out List</span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-xs font-bold text-[#A81D47]">
                    {notInterestedCount} (12.3%)
                  </span>
                  <span className="text-xs font-semibold underline text-[#A81D47]">View Reasons</span>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Demand Breakdown */}
          <div className="pt-4 border-t border-black/[0.05]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#553C9A] stroke-[2.5]" />
                Interested Contacts by Solution Category
              </span>
              <span className="text-xs font-medium text-black/45">Click any category to filter leads</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {courseDemand.map((cd) => (
                <div
                  key={cd.key}
                  onClick={() => onFilterCourse?.(cd.key)}
                  className="p-3.5 rounded-2xl bg-[#FAF3E4]/35 hover:bg-white border border-black/[0.05] hover:border-black/[0.12] shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#111111] inline-block" />
                    <span className="text-sm font-bold text-[#1A1A1A] font-sans">{cd.count}</span>
                  </div>
                  <div className="text-xs font-bold text-[#1A1A1A] truncate" title={cd.name}>
                    {cd.name.split(" ")[0]} {cd.name.split(" ")[1]}
                  </div>
                  <div className="text-[11px] text-black/50 font-medium">{cd.pct}% of leads</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
