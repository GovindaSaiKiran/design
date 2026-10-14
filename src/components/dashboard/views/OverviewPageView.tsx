"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  Zap,
  Bot,
  Activity,
  ArrowRight,
  Search,
  Check,
  Play,
  Volume2,
  PhoneIncoming,
  PhoneOutgoing,
  Radio,
  Sliders,
  Terminal,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import TestCallModal from "../modals/TestCallModal";
import TopUpCreditsModal from "../modals/TopUpCreditsModal";
import CreateAgentModal from "../modals/CreateAgentModal";
import StartCampaignModal from "../modals/StartCampaignModal";
import { soundSynth } from "@/lib/audio-synth";

interface CallRecord {
  id: string;
  phoneNumber: string;
  callerName: string;
  agentName: string;
  direction: "inbound" | "outbound";
  durationSeconds: number;
  timestamp: string;
  status: "completed" | "missed" | "in-progress";
  sentiment: "positive" | "neutral" | "needs-followup";
  outcome: string;
  latencyMs: number;
}

export default function OverviewPageView() {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState<"today" | "7d" | "30d">("today");
  const [selectedTrafficTab, setSelectedTrafficTab] = useState<"all" | "inbound" | "outbound">("all");
  const [callFilter, setCallFilter] = useState<"all" | "inbound" | "outbound">("all");
  const [searchCallQuery, setSearchCallQuery] = useState("");
  const [activeHoverBar, setActiveHoverBar] = useState<number | null>(null);
  const [lastInspectedId, setLastInspectedId] = useState<string | null>(null);

  // Modals state
  const [testCallOpen, setTestCallOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [createAgentOpen, setCreateAgentOpen] = useState(false);
  const [startCampaignOpen, setStartCampaignOpen] = useState(false);

  // User and Workspace context
  const [workspaceName, setWorkspaceName] = useState("Apex Institute of Technology");
  const [availableMinutes, setAvailableMinutes] = useState(14.0);

  // Seed telephony call archives
  const initialDemoCalls: CallRecord[] = [
    {
      id: "call_01",
      phoneNumber: "+91 98492 10482",
      callerName: "Rahul Sharma",
      agentName: "Maya (Admissions)",
      direction: "inbound",
      durationSeconds: 142,
      timestamp: "10 mins ago",
      status: "completed",
      sentiment: "positive",
      outcome: "Hostel Fee & Application Confirmed",
      latencyMs: 136,
    },
    {
      id: "call_02",
      phoneNumber: "+91 94401 88319",
      callerName: "Ananya Iyer",
      agentName: "Priya (Tuition & Aid)",
      direction: "inbound",
      durationSeconds: 88,
      timestamp: "35 mins ago",
      status: "completed",
      sentiment: "positive",
      outcome: "Merit Scholarship Criteria Dispatched",
      latencyMs: 142,
    },
    {
      id: "call_03",
      phoneNumber: "+91 99880 23145",
      callerName: "Vikram Malhotra",
      agentName: "Arjun (Helpdesk RAG)",
      direction: "outbound",
      durationSeconds: 65,
      timestamp: "1 hr ago",
      status: "completed",
      sentiment: "neutral",
      outcome: "Entrance Exam Venue Details Shared",
      latencyMs: 148,
    },
  ];

  const [callsList, setCallsList] = useState<CallRecord[]>(initialDemoCalls);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("swaram_user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.workspaceName) setWorkspaceName(u.workspaceName);
      }
      const storedCalls = localStorage.getItem("swaram_calls");
      if (storedCalls) {
        const parsed = JSON.parse(storedCalls);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCallsList(parsed);
        }
      }
    } catch {
      // Retain defaults
    }
  }, []);

  // Telephony Metrics Calculations
  const totalCalls = callsList.length;
  const inboundCallsCount = callsList.filter((c) => c.direction === "inbound").length;
  const outboundCallsCount = callsList.filter((c) => c.direction === "outbound").length;
  const totalDurationSec = callsList.reduce((acc, c) => acc + (c.durationSeconds || 0), 0);
  const minutesUsedToday = (totalDurationSec / 60).toFixed(1);
  const avgLatency = Math.round(
    callsList.reduce((acc, c) => acc + (c.latencyMs || 136), 0) / (callsList.length || 1)
  );

  // Hourly Concurrency Slots for Telephony Traffic Meter
  const hourlySlots = [
    { hour: "08:00", inbound: 3, outbound: 1, total: 4 },
    { hour: "10:00", inbound: 6, outbound: 3, total: 9 },
    { hour: "12:00", inbound: 8, outbound: 4, total: 12 },
    { hour: "14:00", inbound: 5, outbound: 2, total: 7 },
    { hour: "16:00", inbound: 9, outbound: 5, total: 14 },
    { hour: "18:00", inbound: 7, outbound: 3, total: 10 },
    { hour: "20:00", inbound: 4, outbound: 1, total: 5 },
    { hour: "22:00", inbound: 2, outbound: 0, total: 2 },
  ];

  const maxSlotValue = Math.max(...hourlySlots.map((s) => s.total), 15);

  // Simulate an inbound call with tactile audio feedback
  const handleSimulateInboundCall = () => {
    soundSynth.playCallChime();

    const sampleCallers = [
      { name: "Divya Reddy", phone: "+91 98765 43210", inquiry: "B.Tech CSE Admission Cutoff Query" },
      { name: "Kavita Rao", phone: "+91 97123 45678", inquiry: "Campus Hostel Accommodation & Fee" },
      { name: "Siddharth Jain", phone: "+91 98220 11223", inquiry: "Merit Scholarship Form Verification" },
      { name: "Nitin Varma", phone: "+91 99120 77881", inquiry: "Document Verification & Fee Challan" },
    ];
    const pick = sampleCallers[Math.floor(Math.random() * sampleCallers.length)];

    const newCall: CallRecord = {
      id: "call_" + Date.now(),
      phoneNumber: pick.phone,
      callerName: pick.name,
      agentName: "Maya (Admissions)",
      direction: "inbound",
      durationSeconds: Math.floor(Math.random() * 80) + 40,
      timestamp: "Just now",
      status: "completed",
      sentiment: "positive",
      outcome: pick.inquiry,
      latencyMs: 132 + Math.floor(Math.random() * 12),
    };

    const updated = [newCall, ...callsList];
    setCallsList(updated);
    setLastInspectedId(newCall.id);

    try {
      localStorage.setItem("swaram_calls", JSON.stringify(updated));
    } catch {}

    soundSynth.speak(
      `Inbound carrier session established from ${pick.name}. Maya admissions agent routed at ${newCall.latencyMs} millisecond latency.`,
      { rate: 1.05 }
    );
  };

  // Filtered Telephony Call Ledger
  const filteredCalls = callsList.filter((call) => {
    const matchesFilter =
      callFilter === "all" ? true : call.direction === callFilter;
    const matchesSearch =
      call.callerName.toLowerCase().includes(searchCallQuery.toLowerCase()) ||
      call.phoneNumber.includes(searchCallQuery) ||
      call.agentName.toLowerCase().includes(searchCallQuery.toLowerCase()) ||
      call.outcome.toLowerCase().includes(searchCallQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 pb-16 font-sans text-white select-none max-w-[1440px] mx-auto animate-in fade-in duration-150">
      {/* ========================================================================= */}
      {/* 1. 19-INCH TELECOM PATCH-BAY STATUS & CONCURRENCY BANNER                   */}
      {/* ========================================================================= */}
      <div className="bg-[#09090B] border border-[#27272A] rounded-[2px] p-4 sm:p-5 relative overflow-hidden shadow-2xl">
        {/* Subtle Machined Corner Details */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full border border-[#3F3F46] bg-[#18181B]" />
        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full border border-[#3F3F46] bg-[#18181B]" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full border border-[#3F3F46] bg-[#18181B]" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full border border-[#3F3F46] bg-[#18181B]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            {/* Telecom Channel Status Strip */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[1px] bg-[#18181B] border border-[#27272A] text-[11px] font-telemetry font-bold text-white">
                <span className="w-1.5 h-1.5 rounded-[1px] bg-white animate-pulse" />
                <span>TRUNK GATEWAY: SIP/2.0 READY</span>
              </div>
              <span className="text-xs text-[#3F3F46] font-telemetry">|</span>
              <span className="text-xs font-telemetry font-bold text-[#A1A1AA]">
                ID: TRK-91-AIRTEL-PRI
              </span>
              <span className="text-xs text-[#3F3F46] font-telemetry">|</span>
              <span className="text-xs font-telemetry text-white bg-[#121215] px-2 py-0.5 rounded-[1px] border border-[#27272A]">
                {workspaceName}
              </span>
            </div>

            {/* Headline with high-contrast typography */}
            <h1 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight mt-2 flex items-center gap-2">
              <span>Voice Dispatch &amp; Telephony Operations Console</span>
            </h1>
            <p className="text-xs text-[#A1A1AA] mt-0.5 max-w-3xl font-sans">
              Real-time SIP stream concurrency, multi-agent voice workforce routing, and neural acoustic latency telemetry.
            </p>
          </div>

          {/* Master Control Deck Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Stepped Timeframe Selector */}
            <div className="flex bg-[#121215] border border-[#27272A] rounded-[2px] p-0.5 text-xs font-telemetry">
              <button
                onClick={() => setTimeframe("today")}
                className={`px-2.5 py-1 rounded-[1px] transition-all cursor-pointer font-bold ${
                  timeframe === "today"
                    ? "bg-white text-black shadow-2xs"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                Today
              </button>
              <button
                onClick={() => setTimeframe("7d")}
                className={`px-2.5 py-1 rounded-[1px] transition-all cursor-pointer font-bold ${
                  timeframe === "7d"
                    ? "bg-white text-black shadow-2xs"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                7D
              </button>
              <button
                onClick={() => setTimeframe("30d")}
                className={`px-2.5 py-1 rounded-[1px] transition-all cursor-pointer font-bold ${
                  timeframe === "30d"
                    ? "bg-white text-black shadow-2xs"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                30D
              </button>
            </div>

            {/* Split-label Button: Simulate Inbound Call */}
            <button
              onClick={handleSimulateInboundCall}
              className="inline-grid grid-auto-flow-column border border-white rounded-[2px] bg-[#121215] hover:bg-[#18181B] text-xs font-display font-bold text-white transition-all cursor-pointer active:translate-x-[1px] active:translate-y-[1px] overflow-hidden group shadow-2xs"
              title="Trigger simulated inbound carrier call with real Web Audio chime"
            >
              <div className="flex items-center">
                <span className="px-2.5 py-1.5 flex items-center gap-1.5 border-r border-[#27272A]">
                  <PhoneIncoming className="w-3.5 h-3.5 text-white" />
                  <span>Simulate Inbound</span>
                </span>
                <span className="px-2 py-1.5 bg-white text-black font-telemetry font-bold text-[11px]">
                  CH-01
                </span>
              </div>
            </button>

            {/* Inverted Brick Button: Test Voice Agent */}
            <button
              onClick={() => setTestCallOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-white hover:bg-zinc-200 text-black text-xs font-display font-bold border border-white cursor-pointer active:translate-x-[1px] active:translate-y-[1px] transition-all shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5 text-black" />
              <span>Test Voice Agent</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CONTINUOUS MACHINED TELEMETRY METER BAY (4 PRECISE INSTRUMENT READINGS) */}
      {/* ========================================================================= */}
      <div className="bg-[#09090B] border border-[#27272A] rounded-[2px] p-0 overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#27272A]">
          {/* Reading 1: Telephony Minutes Quota */}
          <div className="p-4 bg-[#09090B] flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-telemetry font-bold text-[#A1A1AA] uppercase tracking-wider">
                METER 01 // MINUTES
              </span>
              <span className="text-[10px] font-telemetry font-bold px-1.5 py-0.2 bg-[#18181B] text-white border border-[#27272A] rounded-[1px]">
                ALLOCATED: 100M
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-telemetry text-white tracking-tight">
                  {availableMinutes.toFixed(1)}
                </span>
                <span className="text-xs font-telemetry text-[#A1A1AA]">MIN REMAINING</span>
              </div>

              {/* Stepped Telephony Gauge */}
              <div className="w-full bg-[#18181B] h-2 rounded-[1px] border border-[#27272A] mt-2 overflow-hidden flex">
                <div className="bg-white h-full w-[14%]" />
                <div className="bg-[#121215] h-full w-[86%]" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-sans">
              <span className="text-[#A1A1AA] text-[11px] font-telemetry">Free Tier Active</span>
              <button
                onClick={() => setTopUpOpen(true)}
                className="text-[11px] font-display font-bold text-white hover:underline cursor-pointer"
              >
                + Top Up Credits
              </button>
            </div>
          </div>

          {/* Reading 2: Telephony Traffic Volume */}
          <div className="p-4 bg-[#09090B] flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-telemetry font-bold text-[#A1A1AA] uppercase tracking-wider">
                METER 02 // TRAFFIC
              </span>
              <span className="text-[10px] font-telemetry font-bold px-1.5 py-0.2 bg-[#18181B] text-white border border-[#27272A] rounded-[1px]">
                LIVE TRUNKS
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-telemetry text-white tracking-tight">
                  {totalCalls}
                </span>
                <span className="text-xs font-telemetry text-[#A1A1AA]">CALLS TODAY</span>
              </div>

              <div className="flex items-center gap-3 mt-2 text-xs font-telemetry font-semibold">
                <span className="flex items-center gap-1 text-white">
                  <PhoneIncoming className="w-3 h-3" /> {inboundCallsCount} Inbound
                </span>
                <span className="flex items-center gap-1 text-[#A1A1AA]">
                  <PhoneOutgoing className="w-3 h-3" /> {outboundCallsCount} Outbound
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-telemetry">
              <span className="text-[#A1A1AA] text-[11px]">{minutesUsedToday} min consumed</span>
              <span className="text-[10px] font-bold text-white bg-[#18181B] border border-[#27272A] px-1.5 py-0.2 rounded-[1px]">
                100% RESOLVED
              </span>
            </div>
          </div>

          {/* Reading 3: Acoustic Turnaround & Neural Latency */}
          <div className="p-4 bg-[#09090B] flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-telemetry font-bold text-[#A1A1AA] uppercase tracking-wider">
                METER 03 // ACOUSTICS
              </span>
              <span className="text-[10px] font-telemetry font-bold px-1.5 py-0.2 bg-[#18181B] text-white border border-[#27272A] rounded-[1px]">
                QOS TARGET &lt;300MS
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-telemetry text-white tracking-tight">
                  {avgLatency}
                </span>
                <span className="text-xs font-telemetry text-[#A1A1AA]">MS TURNAROUND</span>
              </div>

              <p className="text-[11px] font-telemetry text-[#A1A1AA] mt-2">
                STT: 42ms • AI: 68ms • TTS: 26ms
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-telemetry">
              <span className="text-white font-bold flex items-center gap-1 text-[11px]">
                <Check className="w-3 h-3" /> SLA Verified
              </span>
              <span className="text-[10px] font-telemetry text-[#A1A1AA]">Opus HD 16kHz</span>
            </div>
          </div>

          {/* Reading 4: Active Voice Agent Channels */}
          <div className="p-4 bg-[#09090B] flex flex-col justify-between space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-telemetry font-bold text-[#A1A1AA] uppercase tracking-wider">
                METER 04 // AGENTS
              </span>
              <span className="text-[10px] font-telemetry font-bold px-1.5 py-0.2 bg-[#18181B] text-white border border-[#27272A] rounded-[1px]">
                DISPATCH READY
              </span>
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-telemetry text-white tracking-tight">
                  3
                </span>
                <span className="text-xs font-telemetry text-[#A1A1AA]">PROVISIONED TRUNKS</span>
              </div>

              <p className="text-[11px] font-sans font-medium text-[#A1A1AA] mt-2 truncate">
                Maya (Admissions) • Priya • Arjun
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-sans">
              <span className="text-[#A1A1AA] text-[11px] font-telemetry">Bilingual (Hindi/Eng)</span>
              <button
                onClick={() => setCreateAgentOpen(true)}
                className="text-[11px] font-display font-bold text-white hover:underline cursor-pointer"
              >
                + Add Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTRAL TELEMETRY SECTION (CONCURRENCY INSPECTOR & AGENT CHANNEL STRIP)  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: Hourly SIP Concurrency Inspector (8 cols) */}
        <div className="lg:col-span-8 bg-[#09090B] border border-[#27272A] rounded-[2px] p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-2xl">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#27272A]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-[1px] bg-white" />
                <h2 className="text-sm font-black font-display text-white tracking-tight uppercase">
                  Hourly Telephony Concurrency Distribution
                </h2>
              </div>
              <p className="text-[11px] text-[#A1A1AA] mt-0.5 font-sans">
                Active carrier sessions and channel concurrency across standard institutional business hours.
              </p>
            </div>

            {/* Stepped Filter Tabs */}
            <div className="flex items-center gap-1 bg-[#121215] border border-[#27272A] rounded-[2px] p-0.5 text-xs font-telemetry">
              <button
                onClick={() => setSelectedTrafficTab("all")}
                className={`px-2.5 py-0.5 rounded-[1px] font-bold transition-all cursor-pointer ${
                  selectedTrafficTab === "all"
                    ? "bg-white text-black"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setSelectedTrafficTab("inbound")}
                className={`px-2.5 py-0.5 rounded-[1px] font-bold transition-all cursor-pointer ${
                  selectedTrafficTab === "inbound"
                    ? "bg-white text-black"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                INBOUND
              </button>
              <button
                onClick={() => setSelectedTrafficTab("outbound")}
                className={`px-2.5 py-0.5 rounded-[1px] font-bold transition-all cursor-pointer ${
                  selectedTrafficTab === "outbound"
                    ? "bg-white text-black"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                OUTBOUND
              </button>
            </div>
          </div>

          {/* Stepped Telephony Meter Chart */}
          <div className="relative pt-4 pb-2 bg-[#040405] border border-[#27272A] rounded-[2px] p-3">
            {/* Y-axis guidelines */}
            <div className="absolute inset-x-3 inset-y-4 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-[#27272A] w-full flex justify-end">
                <span className="text-[9px] font-telemetry text-[#71717A] -mt-2">15 CALLS</span>
              </div>
              <div className="border-b border-dashed border-[#27272A] w-full flex justify-end">
                <span className="text-[9px] font-telemetry text-[#71717A] -mt-2">10 CALLS</span>
              </div>
              <div className="border-b border-dashed border-[#27272A] w-full flex justify-end">
                <span className="text-[9px] font-telemetry text-[#71717A] -mt-2">5 CALLS</span>
              </div>
              <div className="border-b border-[#27272A] w-full" />
            </div>

            {/* Stepped Column Bars */}
            <div className="relative h-44 flex items-end justify-between gap-2 sm:gap-4 px-2">
              {hourlySlots.map((slot, index) => {
                const heightPercentage = Math.min(
                  Math.round((slot.total / maxSlotValue) * 100),
                  100
                );
                const isHovered = activeHoverBar === index;

                return (
                  <div
                    key={slot.hour}
                    onMouseEnter={() => setActiveHoverBar(index)}
                    onMouseLeave={() => setActiveHoverBar(null)}
                    className="flex-1 flex flex-col items-center justify-end h-full relative cursor-pointer"
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="absolute -top-12 z-20 px-2 py-1 bg-white text-black text-[10px] rounded-[1px] border border-white shadow-xl whitespace-nowrap animate-in fade-in duration-75">
                        <span className="font-telemetry font-bold">{slot.hour}: </span>
                        <span className="font-telemetry">{slot.total} calls</span>
                        <div className="text-zinc-600 text-[9px] font-telemetry">
                          {slot.inbound} in / {slot.outbound} out
                        </div>
                      </div>
                    )}

                    {/* Industrial Stepped Bar */}
                    <div
                      style={{ height: `${heightPercentage}%` }}
                      className={`w-full max-w-[32px] rounded-[1px] transition-all duration-150 overflow-hidden flex flex-col justify-end border border-[#3F3F46] ${
                        isHovered ? "ring-2 ring-white" : ""
                      }`}
                    >
                      {/* Inbound Portion */}
                      <div
                        style={{
                          height: `${(slot.inbound / (slot.total || 1)) * 100}%`,
                        }}
                        className="w-full bg-white"
                      />
                      {/* Outbound Portion */}
                      <div
                        style={{
                          height: `${(slot.outbound / (slot.total || 1)) * 100}%`,
                        }}
                        className="w-full bg-[#3F3F46]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis Labels */}
            <div className="flex justify-between text-[10px] font-telemetry font-bold text-[#A1A1AA] mt-3 px-2">
              {hourlySlots.map((slot) => (
                <span key={slot.hour}>{slot.hour}</span>
              ))}
            </div>
          </div>

          {/* Graph Legend and Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex items-center gap-4 text-xs font-telemetry">
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-2.5 h-2.5 rounded-[1px] bg-white border border-white" />
                <span>Inbound Telephony (Attendant)</span>
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2.5 h-2.5 rounded-[1px] bg-[#3F3F46] border border-[#71717A]" />
                <span>Outbound Campaign Dialing</span>
              </span>
            </div>

            <Link
              href="/dashboard/calls"
              className="text-white font-display font-bold hover:underline flex items-center gap-1 group text-xs"
            >
              <span>View Verbatim Audio Transcripts</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Voice Agent Channel Strips (Rack Mount Faceplate, 4 cols) */}
        <div className="lg:col-span-4 bg-[#09090B] border border-[#27272A] rounded-[2px] p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-[#27272A]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-[1px] bg-white" />
                <h2 className="text-sm font-black font-display text-white tracking-tight uppercase">
                  Voice Agent Channel Rack
                </h2>
              </div>
              <button
                onClick={() => setCreateAgentOpen(true)}
                className="text-xs font-display font-bold text-white hover:underline cursor-pointer"
              >
                + New Channel
              </button>
            </div>

            {/* Agent Channel Faceplates */}
            <div className="space-y-2.5 mt-3">
              {/* Channel 01: Maya */}
              <div className="p-3 bg-[#121215] border border-[#27272A] rounded-[2px] transition-all hover:border-white flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-[2px] bg-white text-black flex items-center justify-center font-telemetry font-bold text-xs shrink-0 border border-white">
                    CH-1
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs text-white">Maya</span>
                      <span className="text-[9px] font-telemetry font-bold px-1.5 py-0.2 rounded-[1px] bg-[#18181B] text-white border border-[#27272A]">
                        ONLINE
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A1A1AA] block truncate font-sans">
                      Admissions &amp; Counseling
                    </span>
                    <span className="text-[10px] text-[#71717A] block font-telemetry">
                      Hindi + English • 136ms
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setTestCallOpen(true)}
                  className="px-2.5 py-1 rounded-[2px] bg-white hover:bg-zinc-200 text-black text-[11px] font-display font-bold border border-white transition-colors cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                >
                  Patch Test
                </button>
              </div>

              {/* Channel 02: Priya */}
              <div className="p-3 bg-[#121215] border border-[#27272A] rounded-[2px] transition-all hover:border-white flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-[2px] bg-white text-black flex items-center justify-center font-telemetry font-bold text-xs shrink-0 border border-white">
                    CH-2
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs text-white">Priya</span>
                      <span className="text-[9px] font-telemetry font-bold px-1.5 py-0.2 rounded-[1px] bg-[#18181B] text-white border border-[#27272A]">
                        ONLINE
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A1A1AA] block truncate font-sans">
                      Tuition &amp; Financial Aid
                    </span>
                    <span className="text-[10px] text-[#71717A] block font-telemetry">
                      English + Hinglish • 142ms
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setTestCallOpen(true)}
                  className="px-2.5 py-1 rounded-[2px] bg-white hover:bg-zinc-200 text-black text-[11px] font-display font-bold border border-white transition-colors cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                >
                  Patch Test
                </button>
              </div>

              {/* Channel 03: Arjun */}
              <div className="p-3 bg-[#121215] border border-[#27272A] rounded-[2px] transition-all hover:border-white flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-[2px] bg-white text-black flex items-center justify-center font-telemetry font-bold text-xs shrink-0 border border-white">
                    CH-3
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs text-white">Arjun</span>
                      <span className="text-[9px] font-telemetry font-bold px-1.5 py-0.2 rounded-[1px] bg-[#18181B] text-white border border-[#27272A]">
                        ONLINE
                      </span>
                    </div>
                    <span className="text-[11px] text-[#A1A1AA] block truncate font-sans">
                      Campus Academic RAG
                    </span>
                    <span className="text-[10px] text-[#71717A] block font-telemetry">
                      Multilingual Indic • 148ms
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setTestCallOpen(true)}
                  className="px-2.5 py-1 rounded-[2px] bg-white hover:bg-zinc-200 text-black text-[11px] font-display font-bold border border-white transition-colors cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                >
                  Patch Test
                </button>
              </div>
            </div>
          </div>

          {/* Quick Provisioning Brick Button */}
          <div className="pt-2">
            <button
              onClick={() => setCreateAgentOpen(true)}
              className="w-full py-2 px-3 rounded-[2px] border border-dashed border-[#3F3F46] hover:border-white bg-[#121215] hover:bg-[#18181B] text-white text-xs font-display font-bold transition-all flex items-center justify-center gap-2 cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
            >
              <span>+ Provision Voice Agent</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. REAL-TIME TELEPHONY CALL ACTIVITY & AUDIO TELEMETRY LEDGER (TABLE-FIRST)*/}
      {/* ========================================================================= */}
      <div className="bg-[#09090B] border border-[#27272A] rounded-[2px] p-4 sm:p-5 space-y-3.5 shadow-2xl">
        {/* Table Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#27272A]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-[1px] bg-white" />
              <h2 className="text-sm font-black font-display text-white tracking-tight uppercase">
                Real-Time Telephony Call Activity &amp; Telemetry Ledger
              </h2>
            </div>
            <p className="text-[11px] text-[#A1A1AA] mt-0.5 font-sans">
              Carrier session archives, acoustic roundtrip turnaround, caller intent classification, and resolution sentiment.
            </p>
          </div>

          {/* Search & Direction Filtering */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Telemetry Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter phone, caller, intent..."
                value={searchCallQuery}
                onChange={(e) => setSearchCallQuery(e.target.value)}
                className="pl-8 pr-2.5 py-1 text-xs bg-[#121215] border border-[#27272A] rounded-[2px] focus:outline-none focus:border-white text-white font-sans w-56"
              />
            </div>

            {/* Filter Direction Tabs */}
            <div className="flex bg-[#121215] border border-[#27272A] rounded-[2px] p-0.5 text-xs font-telemetry">
              <button
                onClick={() => setCallFilter("all")}
                className={`px-2 py-0.5 rounded-[1px] font-bold transition-all cursor-pointer ${
                  callFilter === "all"
                    ? "bg-white text-black"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setCallFilter("inbound")}
                className={`px-2 py-0.5 rounded-[1px] font-bold transition-all cursor-pointer ${
                  callFilter === "inbound"
                    ? "bg-white text-black"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                INBOUND
              </button>
              <button
                onClick={() => setCallFilter("outbound")}
                className={`px-2 py-0.5 rounded-[1px] font-bold transition-all cursor-pointer ${
                  callFilter === "outbound"
                    ? "bg-white text-black"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                OUTBOUND
              </button>
            </div>
          </div>
        </div>

        {/* Dense Table View */}
        <div className="overflow-x-auto border border-[#27272A] bg-[#09090B] rounded-[2px]">
          <table className="w-full text-left text-xs text-white">
            <thead className="text-[10px] font-telemetry font-bold uppercase tracking-wider text-[#A1A1AA] bg-[#121215] border-b border-[#27272A]">
              <tr>
                <th className="py-2.5 px-3">CALLER &amp; TRUNK NUMBER</th>
                <th className="py-2.5 px-3">AGENT CHANNEL</th>
                <th className="py-2.5 px-3">DIRECTION</th>
                <th className="py-2.5 px-3">DURATION / LATENCY</th>
                <th className="py-2.5 px-3">RESOLVED OUTCOME / INTENT</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3 text-right">TELEMETRY ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#71717A] font-telemetry">
                    No active telephony records match the query.
                  </td>
                </tr>
              ) : (
                filteredCalls.map((call) => {
                  const isHighlighted = lastInspectedId === call.id;

                  return (
                    <tr
                      key={call.id}
                      className={`transition-colors ${
                        isHighlighted
                          ? "bg-[#18181B] font-medium"
                          : "hover:bg-[#121215]"
                      }`}
                    >
                      {/* Caller & Number */}
                      <td className="py-2.5 px-3">
                        <div className="font-display font-bold text-white">{call.callerName}</div>
                        <div className="text-[11px] font-telemetry text-[#A1A1AA]">
                          {call.phoneNumber}
                        </div>
                      </td>

                      {/* Agent */}
                      <td className="py-2.5 px-3">
                        <div className="font-display font-semibold text-white">{call.agentName}</div>
                        <div className="text-[10px] font-telemetry text-[#71717A]">{call.timestamp}</div>
                      </td>

                      {/* Direction Badge */}
                      <td className="py-2.5 px-3">
                        {call.direction === "inbound" ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[1px] text-[10px] font-telemetry font-bold bg-[#18181B] text-white border border-[#27272A]">
                            <PhoneIncoming className="w-3 h-3" /> INBOUND
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[1px] text-[10px] font-telemetry font-bold bg-[#18181B] text-[#A1A1AA] border border-[#27272A]">
                            <PhoneOutgoing className="w-3 h-3" /> OUTBOUND
                          </span>
                        )}
                      </td>

                      {/* Duration & Latency */}
                      <td className="py-2.5 px-3">
                        <div className="font-telemetry font-bold text-white">
                          {Math.floor(call.durationSeconds / 60)}m{" "}
                          {call.durationSeconds % 60}s
                        </div>
                        <div className="text-[10px] font-telemetry text-[#A1A1AA]">
                          {call.latencyMs} ms turnaround
                        </div>
                      </td>

                      {/* Outcome / Intent */}
                      <td className="py-2.5 px-3">
                        <div className="font-medium text-white max-w-sm truncate font-sans">
                          {call.outcome}
                        </div>
                        <span className="inline-block mt-0.5 text-[9px] font-telemetry font-bold text-white bg-[#18181B] border border-[#27272A] px-1 py-0.2 rounded-[1px] uppercase">
                          {call.sentiment}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-telemetry font-bold text-white">
                          <span className="w-1.5 h-1.5 rounded-[1px] bg-white" /> Completed
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => {
                            setLastInspectedId(call.id);
                            soundSynth.speak(`Call record for ${call.callerName}: ${call.outcome}`, { rate: 1.0 });
                          }}
                          className="px-2.5 py-1 rounded-[2px] bg-white hover:bg-zinc-200 text-black text-[11px] font-display font-bold border border-white transition-colors cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
                        >
                          Inspect Audio
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. CARRIER SIP INFRASTRUCTURE & ACOUSTIC STREAMING DIAGNOSTIC STRIP        */}
      {/* ========================================================================= */}
      <div className="bg-[#09090B] border border-[#27272A] rounded-[2px] p-4 sm:p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#27272A]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-[1px] bg-white" />
              <h3 className="text-sm font-black font-display text-white tracking-tight uppercase">
                Carrier SIP Infrastructure &amp; Acoustic Stream Diagnostics
              </h3>
            </div>
            <p className="text-[11px] text-[#A1A1AA] mt-0.5 font-sans">
              Direct carrier trunk interconnects, Opus HD speech codecs, and voice activity barge-in telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-telemetry">
            <span className="text-white font-bold bg-[#18181B] border border-[#27272A] px-2 py-0.5 rounded-[1px]">
              99.99% CARRIER SLA CONFIRMED
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
          <div className="p-3 bg-[#121215] border border-[#27272A] rounded-[2px]">
            <span className="text-[9px] font-telemetry font-bold text-[#A1A1AA] uppercase tracking-wider block">
              AUDIO CODEC
            </span>
            <span className="text-sm font-black font-telemetry text-white mt-0.5 block">
              Opus HD (16 kHz)
            </span>
            <span className="text-[10px] text-[#71717A] font-sans">Wideband High Fidelity</span>
          </div>

          <div className="p-3 bg-[#121215] border border-[#27272A] rounded-[2px]">
            <span className="text-[9px] font-telemetry font-bold text-[#A1A1AA] uppercase tracking-wider block">
              NETWORK JITTER
            </span>
            <span className="text-sm font-black font-telemetry text-white mt-0.5 block">
              1.2 ms
            </span>
            <span className="text-[10px] text-white font-telemetry">Optimal Transmission</span>
          </div>

          <div className="p-3 bg-[#121215] border border-[#27272A] rounded-[2px]">
            <span className="text-[9px] font-telemetry font-bold text-[#A1A1AA] uppercase tracking-wider block">
              PACKET LOSS
            </span>
            <span className="text-sm font-black font-telemetry text-white mt-0.5 block">
              0.00%
            </span>
            <span className="text-[10px] text-white font-telemetry">Zero Dropped Frames</span>
          </div>

          <div className="p-3 bg-[#121215] border border-[#27272A] rounded-[2px]">
            <span className="text-[9px] font-telemetry font-bold text-[#A1A1AA] uppercase tracking-wider block">
              VAD BARGE-IN
            </span>
            <span className="text-sm font-black font-telemetry text-white mt-0.5 block">
              0.85s
            </span>
            <span className="text-[10px] text-[#A1A1AA] font-sans">Instant Interruption</span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TestCallModal
        isOpen={testCallOpen}
        onClose={() => setTestCallOpen(false)}
      />
      <TopUpCreditsModal
        isOpen={topUpOpen}
        onClose={() => setTopUpOpen(false)}
        currentCredits={availableMinutes}
      />
      <CreateAgentModal
        isOpen={createAgentOpen}
        onClose={() => setCreateAgentOpen(false)}
      />
      <StartCampaignModal
        isOpen={startCampaignOpen}
        onClose={() => setStartCampaignOpen(false)}
      />
    </div>
  );
}
