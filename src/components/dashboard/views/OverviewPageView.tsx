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
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  SlidersHorizontal,
  ChevronRight,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Plus,
  ArrowUpDown,
  Headphones,
  Flame,
} from "lucide-react";
import TestCallModal from "../modals/TestCallModal";
import TopUpCreditsModal from "../modals/TopUpCreditsModal";
import CreateAgentModal from "../modals/CreateAgentModal";
import StartCampaignModal from "../modals/StartCampaignModal";
import CallDrawer from "./CallDrawer";
import { RecentCallRecord, CallOutcome } from "@/types/dashboard";
import { soundSynth } from "@/lib/audio-synth";
import BuildAIEmployeeBanner from "../components/BuildAIEmployeeBanner";

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
  extractedTags?: string[];
}

export default function OverviewPageView() {
  const router = useRouter();
  const [selectedCallForDrawer, setSelectedCallForDrawer] = useState<RecentCallRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Timeframe and Filtering
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

  // Context & Quotas
  const [workspaceName, setWorkspaceName] = useState("Apex Institute of Technology");
  const [availableMinutes, setAvailableMinutes] = useState(14.0);

  // Seed telephony calls
  const initialCalls: CallRecord[] = [
    {
      id: "call_01",
      phoneNumber: "+91 98401 22345",
      callerName: "Rahul Sharma",
      agentName: "Maya (Admissions)",
      direction: "inbound",
      durationSeconds: 144,
      timestamp: "10 mins ago",
      status: "completed",
      sentiment: "positive",
      outcome: "B.Tech CSE Fee & Campus Tour Confirmed",
      latencyMs: 136,
      extractedTags: ["Admissions", "High Intent"],
    },
    {
      id: "call_02",
      phoneNumber: "+91 94401 88319",
      callerName: "Ananya Iyer",
      agentName: "Priya (Tuition & Aid)",
      direction: "inbound",
      durationSeconds: 108,
      timestamp: "28 mins ago",
      status: "completed",
      sentiment: "positive",
      outcome: "Merit Scholarship Criteria & WhatsApp Brochure",
      latencyMs: 142,
      extractedTags: ["Scholarship", "WhatsApp Sent"],
    },
    {
      id: "call_03",
      phoneNumber: "+91 99880 44120",
      callerName: "Vikramaditya Rao",
      agentName: "Arjun (Outreach)",
      direction: "outbound",
      durationSeconds: 75,
      timestamp: "45 mins ago",
      status: "completed",
      sentiment: "neutral",
      outcome: "Entrance Registration Verified for Sunday Slot",
      latencyMs: 148,
      extractedTags: ["Outreach", "Sunday Slot"],
    },
    {
      id: "call_04",
      phoneNumber: "+91 98210 55678",
      callerName: "Meera Krishnan",
      agentName: "Maya (Admissions)",
      direction: "inbound",
      durationSeconds: 185,
      timestamp: "1 hr ago",
      status: "completed",
      sentiment: "positive",
      outcome: "Sports Quota Inquiry Escalated to Senior Desk",
      latencyMs: 140,
      extractedTags: ["Sports Quota", "Escalated"],
    },
    {
      id: "call_05",
      phoneNumber: "+91 97123 45678",
      callerName: "Kavita Rao",
      agentName: "Maya (Admissions)",
      direction: "inbound",
      durationSeconds: 94,
      timestamp: "2 hrs ago",
      status: "completed",
      sentiment: "positive",
      outcome: "Campus Hostel Accommodation & Mess Fee",
      latencyMs: 132,
      extractedTags: ["Hostel", "AC Shared"],
    },
    {
      id: "call_06",
      phoneNumber: "+91 99120 77881",
      callerName: "Nitin Varma",
      agentName: "Arjun (Outreach)",
      direction: "outbound",
      durationSeconds: 120,
      timestamp: "3 hrs ago",
      status: "completed",
      sentiment: "positive",
      outcome: "Direct PRI SIP Trunk Connectivity Confirmed",
      latencyMs: 138,
      extractedTags: ["SIP Trunk", "SLA Confirmed"],
    },
  ];

  const [callsList, setCallsList] = useState<CallRecord[]>(initialCalls);

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
    { hour: "10:00", inbound: 7, outbound: 3, total: 10 },
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
    try { soundSynth.playCallChime(); } catch {}

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
      extractedTags: ["Inbound", "Verified"],
    };

    const updated = [newCall, ...callsList];
    setCallsList(updated);
    setLastInspectedId(newCall.id);

    try {
      localStorage.setItem("swaram_calls", JSON.stringify(updated));
    } catch {}

    try {
      soundSynth.speak(
        `Inbound carrier session established from ${pick.name}. Maya admissions agent routed at ${newCall.latencyMs} millisecond latency.`,
        { rate: 1.05 }
      );
    } catch {}
  };

  const openCallInDrawer = (call: CallRecord) => {
    try { soundSynth.play("click"); } catch {}
    const record: RecentCallRecord = {
      id: call.id,
      contactNumber: call.phoneNumber,
      contactName: call.callerName,
      agentName: call.agentName,
      direction: call.direction,
      duration: `${Math.floor(call.durationSeconds / 60)}m ${call.durationSeconds % 60}s`,
      durationSeconds: call.durationSeconds,
      outcome: (call.status === "completed" ? "Completed" : "Interested") as CallOutcome,
      timestamp: call.timestamp,
      timeAgo: call.timestamp,
      summary: call.outcome,
      sentimentScore: call.sentiment === "positive" ? 94 : 82,
      qualification: "Qualified",
      transcriptSnippet: `Candidate ${call.callerName} inquired about ${call.outcome} through ${call.agentName}.`,
      audioRecordingUrl: "https://actions.google.com/sounds/v1/speech/female_affirmation.ogg",
    };
    setSelectedCallForDrawer(record);
    setDrawerOpen(true);
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
    <div className="space-y-6 sm:space-y-7 font-sans text-[#1A1A1A] max-w-[1480px] mx-auto select-none">
      {/* ========================================================================= */}
      {/* 1. TOP CARRIER STATUS & QUICK ACTIONS CONSOLE                             */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[28px] border border-black/[0.06] p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.035)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          {/* Carrier Status Strip */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EF] text-[#16856B] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#16856B] animate-pulse" />
              <span>TRUNK GATEWAY: SIP/2.0 READY</span>
            </span>
            <span className="text-black/20 text-xs">•</span>
            <span className="text-xs font-semibold text-black/60">
              TRK-91-AIRTEL-PRI
            </span>
            <span className="text-black/20 text-xs">•</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF3E4] text-[#1A1A1A]">
              {workspaceName}
            </span>
          </div>

          <h2 className="text-xl sm:text-[22px] font-bold text-[#1A1A1A] tracking-tight mt-1.5">
            Voice Dispatch &amp; Telephony Operations
          </h2>
          <p className="text-xs text-black/55 mt-0.5">
            Real-time SIP stream concurrency, multi-agent voice workforce routing, and neural acoustic latency telemetry.
          </p>
        </div>

        {/* Operational Actions */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-center">
          {/* Stepped Timeframe Selector Pills */}
          <div className="flex bg-[#FBF7ED] border border-black/[0.06] rounded-full p-1 text-xs">
            <button
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setTimeframe("today");
              }}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                timeframe === "today"
                  ? "bg-[#111111] text-white shadow-2xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setTimeframe("7d");
              }}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                timeframe === "7d"
                  ? "bg-[#111111] text-white shadow-2xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              7D
            </button>
            <button
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setTimeframe("30d");
              }}
              className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                timeframe === "30d"
                  ? "bg-[#111111] text-white shadow-2xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              30D
            </button>
          </div>

          {/* Simulate Inbound Call Button */}
          <button
            onClick={handleSimulateInboundCall}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#FAF3E4] border border-black/[0.08] text-xs font-semibold text-[#1A1A1A] shadow-2xs transition-all cursor-pointer"
            title="Simulate inbound carrier call"
          >
            <PhoneIncoming className="w-3.5 h-3.5 text-[#16856B]" />
            <span>Simulate Inbound</span>
          </button>

          {/* Test Voice Agent Button */}
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setTestCallOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Test Voice Agent</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP METRIC CARDS (Solid pastel cards matching visual reference)       */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* CARD 1: Lavender #C9A7F5 - Available Minutes */}
        <div
          onClick={() => setTopUpOpen(true)}
          className="pastel-stat-card bg-[#C9A7F5] flex flex-col justify-between min-h-[175px] cursor-pointer hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-[#1A1A1A] flex items-center justify-center shadow-2xs">
                <Clock className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="font-semibold text-xs sm:text-[13px] text-[#1A1A1A]">
                Minutes Quota
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/70 text-[11px] font-bold text-[#3B0764]">
              100m ALLOCATED
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-[40px] sm:text-[44px] font-bold tracking-tight text-[#1A1A1A] leading-none">
                {availableMinutes.toFixed(1)}
              </span>
              <span className="text-xs text-black/65 font-medium">min remaining</span>
            </div>

            {/* Stepped Progress Bar */}
            <div className="w-full bg-white/40 h-2 rounded-full mt-2.5 overflow-hidden flex">
              <div className="bg-[#111111] h-full w-[14%]" />
              <div className="bg-transparent h-full w-[86%]" />
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px]">
              <span className="text-black/60 font-medium">Free Tier Active</span>
              <span className="font-bold text-[#1A1A1A] group-hover:underline">
                + Top Up &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* CARD 2: Coral / Peach #FFA98B - Traffic Volume */}
        <div
          onClick={() => router.push("/dashboard/calls")}
          className="pastel-stat-card bg-[#FFA98B] flex flex-col justify-between min-h-[175px] cursor-pointer hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-[#1A1A1A] flex items-center justify-center shadow-2xs">
                <Phone className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="font-semibold text-xs sm:text-[13px] text-[#1A1A1A]">
                Traffic Volume
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/70 text-[11px] font-bold text-[#7C2D12]">
              LIVE TRUNKS
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-[40px] sm:text-[44px] font-bold tracking-tight text-[#1A1A1A] leading-none">
                {totalCalls}
              </span>
              <span className="text-xs text-black/65 font-medium">calls handled</span>
            </div>

            <div className="flex items-center gap-3 mt-2 text-xs font-semibold text-[#1A1A1A]">
              <span className="flex items-center gap-1">
                <PhoneIncoming className="w-3 h-3 text-[#16856B]" /> {inboundCallsCount} Inbound
              </span>
              <span className="text-black/30">&bull;</span>
              <span className="flex items-center gap-1">
                <PhoneOutgoing className="w-3 h-3 text-[#1E3A8A]" /> {outboundCallsCount} Outbound
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px]">
              <span className="text-black/60 font-medium">{minutesUsedToday} min consumed</span>
              <span className="px-2 py-0.5 rounded-full bg-white/80 font-bold text-[#16856B]">
                100% RESOLVED
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3: Soft Periwinkle Blue #A8C3F0 - Turnaround Latency */}
        <div
          onClick={() => router.push("/dashboard/analytics")}
          className="pastel-stat-card bg-[#A8C3F0] flex flex-col justify-between min-h-[175px] cursor-pointer hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-[#1A1A1A] flex items-center justify-center shadow-2xs">
                <Zap className="w-4 h-4 stroke-[2] fill-current" />
              </div>
              <span className="font-semibold text-xs sm:text-[13px] text-[#1A1A1A]">
                Turnaround Latency
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/70 text-[11px] font-bold text-[#1E3A8A]">
              &lt;200MS SLA
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-[40px] sm:text-[44px] font-bold tracking-tight text-[#1A1A1A] leading-none">
                {avgLatency}
              </span>
              <span className="text-xs text-black/65 font-medium">ms turnaround</span>
            </div>

            <p className="text-[11px] text-black/65 mt-2 font-medium">
              STT: 42ms &bull; AI: 68ms &bull; TTS: 26ms
            </p>

            <div className="flex items-center justify-between pt-2 text-[11px]">
              <span className="font-bold text-[#16856B] flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[2.5]" /> 99.99% Carrier SLA
              </span>
              <span className="text-black/55 font-medium">Opus HD 16kHz</span>
            </div>
          </div>
        </div>

        {/* CARD 4: Soft Mint Green #C1F2D5 - Active Voice Agents */}
        <div
          onClick={() => router.push("/dashboard/agents")}
          className="pastel-stat-card bg-[#C1F2D5] flex flex-col justify-between min-h-[175px] cursor-pointer hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-[#1A1A1A] flex items-center justify-center shadow-2xs">
                <Bot className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="font-semibold text-xs sm:text-[13px] text-[#1A1A1A]">
                AI Workforce
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/80 text-[11px] font-bold text-[#065F46]">
              3 CHANNELS ONLINE
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-[40px] sm:text-[44px] font-bold tracking-tight text-[#1A1A1A] leading-none">
                3
              </span>
              <span className="text-xs text-black/65 font-medium">voice agents</span>
            </div>

            <p className="text-[11px] font-semibold text-[#1A1A1A] mt-2 truncate">
              Maya (Admissions) &bull; Priya &bull; Arjun
            </p>

            <div className="flex items-center justify-between pt-2 text-[11px]">
              <span className="text-black/60 font-medium">Hindi + English + Telugu</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCreateAgentOpen(true);
                }}
                className="font-bold text-[#1A1A1A] group-hover:underline cursor-pointer"
              >
                + Add Agent
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CENTRAL CONCURRENCY & ACTIVE AGENT WORKFORCE RACK                      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Hourly SIP Concurrency Distribution (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-[28px] border border-black/[0.06] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.035)] flex flex-col justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16856B]" />
                <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">
                  Hourly Telephony Concurrency Distribution
                </h3>
              </div>
              <p className="text-xs text-black/55 mt-0.5">
                Active carrier sessions and channel concurrency across standard institutional business hours.
              </p>
            </div>

            {/* Stepped Filter Pills */}
            <div className="flex items-center gap-1 bg-[#FBF7ED] border border-black/[0.06] rounded-full p-1 text-xs font-semibold">
              <button
                onClick={() => setSelectedTrafficTab("all")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  selectedTrafficTab === "all"
                    ? "bg-[#111111] text-white shadow-2xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                ALL
              </button>
              <button
                onClick={() => setSelectedTrafficTab("inbound")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  selectedTrafficTab === "inbound"
                    ? "bg-[#111111] text-white shadow-2xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                INBOUND
              </button>
              <button
                onClick={() => setSelectedTrafficTab("outbound")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  selectedTrafficTab === "outbound"
                    ? "bg-[#111111] text-white shadow-2xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                OUTBOUND
              </button>
            </div>
          </div>

          {/* Stepped Telephony Meter Chart */}
          <div className="relative pt-6 pb-2 bg-[#FAF7F0]/60 rounded-2xl p-4 border border-black/[0.04]">
            {/* Guidelines */}
            <div className="absolute inset-x-4 inset-y-6 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-black/15 w-full flex justify-end">
                <span className="text-[10px] font-semibold text-black/40 -mt-2.5">15 CALLS</span>
              </div>
              <div className="border-b border-dashed border-black/15 w-full flex justify-end">
                <span className="text-[10px] font-semibold text-black/40 -mt-2.5">10 CALLS</span>
              </div>
              <div className="border-b border-dashed border-black/15 w-full flex justify-end">
                <span className="text-[10px] font-semibold text-black/40 -mt-2.5">5 CALLS</span>
              </div>
              <div className="border-b border-black/10 w-full" />
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
                      <div className="absolute -top-12 z-20 px-2.5 py-1 bg-[#111111] text-white text-[11px] rounded-xl shadow-lg whitespace-nowrap animate-in fade-in duration-75">
                        <span className="font-bold">{slot.hour}: </span>
                        <span>{slot.total} calls</span>
                        <div className="text-white/70 text-[10px]">
                          {slot.inbound} in &bull; {slot.outbound} out
                        </div>
                      </div>
                    )}

                    {/* Stacked Pastel Bar */}
                    <div
                      style={{ height: `${heightPercentage}%` }}
                      className={`w-full max-w-[34px] rounded-t-xl transition-all duration-150 overflow-hidden flex flex-col justify-end shadow-xs ${
                        isHovered ? "scale-105" : ""
                      }`}
                    >
                      {/* Inbound Portion (Lavender) */}
                      <div
                        style={{
                          height: `${(slot.inbound / (slot.total || 1)) * 100}%`,
                        }}
                        className="w-full bg-[#C9A7F5]"
                      />
                      {/* Outbound Portion (Coral) */}
                      <div
                        style={{
                          height: `${(slot.outbound / (slot.total || 1)) * 100}%`,
                        }}
                        className="w-full bg-[#FFA98B]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis Labels */}
            <div className="flex justify-between text-[11px] font-semibold text-black/50 mt-3 px-2">
              {hourlySlots.map((slot) => (
                <span key={slot.hour}>{slot.hour}</span>
              ))}
            </div>
          </div>

          {/* Graph Legend and Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-black/70 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9A7F5]" />
                <span>Inbound Calls (Admissions &amp; Support)</span>
              </span>
              <span className="flex items-center gap-1.5 text-black/70 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFA98B]" />
                <span>Outbound Campaign Dialing</span>
              </span>
            </div>

            <Link
              href="/dashboard/calls"
              className="text-[#1A1A1A] font-bold hover:underline flex items-center gap-1 group text-xs"
            >
              <span>View Verbatim Audio Transcripts</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Active Voice Agent Channels (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-[28px] border border-black/[0.06] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.035)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16856B]" />
                <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">
                  Voice Agent Workforce
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F5EF] text-[#16856B] font-bold text-[11px]">
                3 Channels Live
              </span>
            </div>

            {/* Agent List */}
            <div className="space-y-3 pt-3">
              {/* Agent 1: Maya */}
              <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.04] space-y-2 hover:bg-[#FAF3E4] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-[#C9A7F5] text-[#3B0764] font-bold text-xs flex items-center justify-center">
                        M
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#16856B] ring-2 ring-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#1A1A1A]">Maya (Admissions)</h4>
                      <p className="text-[11px] text-black/50">Hindi + English &bull; 136ms SLA</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      setTestCallOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-black hover:text-white border border-black/[0.08] text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    Test Call
                  </button>
                </div>
              </div>

              {/* Agent 2: Priya */}
              <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.04] space-y-2 hover:bg-[#FAF3E4] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-[#FFA98B] text-[#7C2D12] font-bold text-xs flex items-center justify-center">
                        P
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#16856B] ring-2 ring-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#1A1A1A]">Priya (Tuition &amp; Aid)</h4>
                      <p className="text-[11px] text-black/50">Telugu + English &bull; 142ms SLA</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      setTestCallOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-black hover:text-white border border-black/[0.08] text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    Test Call
                  </button>
                </div>
              </div>

              {/* Agent 3: Arjun */}
              <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.04] space-y-2 hover:bg-[#FAF3E4] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-[#A8C3F0] text-[#1E3A8A] font-bold text-xs flex items-center justify-center">
                        A
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#16856B] ring-2 ring-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#1A1A1A]">Arjun (Outreach)</h4>
                      <p className="text-[11px] text-black/50">Campaign Lead &bull; 148ms SLA</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      setTestCallOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-black hover:text-white border border-black/[0.08] text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    Test Call
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setCreateAgentOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white hover:bg-[#FAF3E4] border border-dashed border-black/20 text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Deploy New Voice Employee</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BUILD YOUR AI EMPLOYEE BANNER (PASTEL STYLE)                           */}
      {/* ========================================================================= */}
      <div>
        <BuildAIEmployeeBanner
          onOpenCreateModal={() => {
            setCreateAgentOpen(true);
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 5. REAL-TIME TELEPHONY CALL ACTIVITY & EXTRACTED OUTCOMES LEDGER          */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-[28px] border border-black/[0.06] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.035)] space-y-4">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16856B]" />
              <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">
                Real-Time Telephony Call Activity &amp; Extracted Outcomes Ledger
              </h3>
            </div>
            <p className="text-xs text-black/55 mt-0.5">
              Live call records, speaker turn durations, carrier latencies, and candidate qualification details.
            </p>
          </div>

          {/* Filter and Search controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search Input */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-xs">
              <Search className="w-3.5 h-3.5 text-black/40" />
              <input
                type="text"
                placeholder="Filter caller, number, outcome..."
                value={searchCallQuery}
                onChange={(e) => setSearchCallQuery(e.target.value)}
                className="bg-transparent outline-none text-xs text-[#1A1A1A] placeholder:text-black/40 w-36 sm:w-48"
              />
            </div>

            {/* Direction Filter Pills */}
            <div className="flex bg-[#FBF7ED] border border-black/[0.06] rounded-full p-1 text-xs font-semibold">
              <button
                onClick={() => setCallFilter("all")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  callFilter === "all"
                    ? "bg-[#111111] text-white shadow-2xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCallFilter("inbound")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  callFilter === "inbound"
                    ? "bg-[#111111] text-white shadow-2xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                Inbound
              </button>
              <button
                onClick={() => setCallFilter("outbound")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  callFilter === "outbound"
                    ? "bg-[#111111] text-white shadow-2xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                Outbound
              </button>
            </div>
          </div>
        </div>

        {/* Call Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-black/[0.06] text-black/45 uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-2.5 px-3">Caller &amp; Number</th>
                <th className="py-2.5 px-3">Agent &amp; Time</th>
                <th className="py-2.5 px-3">Direction</th>
                <th className="py-2.5 px-3">Duration &amp; Latency</th>
                <th className="py-2.5 px-3">Extracted Outcome / Intent</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-black/40 text-xs">
                    No calls match the search query.
                  </td>
                </tr>
              ) : (
                filteredCalls.map((call) => {
                  const isHighlighted = lastInspectedId === call.id;

                  return (
                    <tr
                      key={call.id}
                      onClick={() => openCallInDrawer(call)}
                      className={`hover:bg-[#FAF7F0] transition-colors cursor-pointer ${
                        isHighlighted ? "bg-[#FAF3E4]" : ""
                      }`}
                    >
                      {/* Caller & Number */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-[#FAF3E4] border border-black/[0.06] flex items-center justify-center font-bold text-[11px] text-[#1A1A1A]">
                            {call.callerName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-[#1A1A1A]">{call.callerName}</div>
                            <div className="text-[11px] text-black/45">{call.phoneNumber}</div>
                          </div>
                        </div>
                      </td>

                      {/* Agent & Time */}
                      <td className="py-3 px-3">
                        <div className="font-medium text-[#1A1A1A]">{call.agentName}</div>
                        <div className="text-[11px] text-black/45">{call.timestamp}</div>
                      </td>

                      {/* Direction Badge */}
                      <td className="py-3 px-3">
                        {call.direction === "inbound" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#E8F5EF] text-[#16856B]">
                            <PhoneIncoming className="w-3 h-3" /> INBOUND
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#BCD0F5] text-[#1E3A8A]">
                            <PhoneOutgoing className="w-3 h-3" /> OUTBOUND
                          </span>
                        )}
                      </td>

                      {/* Duration & Latency */}
                      <td className="py-3 px-3">
                        <div className="font-semibold text-[#1A1A1A]">
                          {Math.floor(call.durationSeconds / 60)}m {call.durationSeconds % 60}s
                        </div>
                        <div className="text-[11px] text-black/45">{call.latencyMs} ms turnaround</div>
                      </td>

                      {/* Extracted Outcome / Intent */}
                      <td className="py-3 px-3">
                        <div className="font-medium text-[#1A1A1A] max-w-xs sm:max-w-sm truncate">
                          {call.outcome}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-semibold bg-[#F7EEDA] text-[#78350F] uppercase">
                            {call.sentiment}
                          </span>
                          {call.extractedTags?.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/[0.04] text-black/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#16856B]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openCallInDrawer(call);
                          }}
                          className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FAF3E4] text-[#1A1A1A] text-[11px] font-semibold border border-black/[0.08] shadow-2xs transition-colors cursor-pointer"
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
      {/* 6. TELEPHONY SIP CARRIER INFRASTRUCTURE & ACOUSTICS DIAGNOSTIC STRIP      */}
      {/* ========================================================================= */}
      <div className="pastel-column-panel p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/[0.06]">
          <div>
            <h3 className="font-bold text-sm text-[#1A1A1A]">
              Telephony SIP Carrier Infrastructure
            </h3>
            <p className="text-xs text-black/60">
              Direct PRI carrier trunk interconnects, Opus HD speech codecs, and voice activity barge-in telemetry.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#C1F2D5] text-[#065F46] font-semibold text-xs self-start sm:self-center">
            99.99% Carrier SLA Verified
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
          <div className="pastel-card p-3.5 space-y-0.5">
            <span className="text-[11px] font-semibold text-black/45 uppercase tracking-wider block">
              Audio Codec
            </span>
            <span className="text-sm font-bold text-[#1A1A1A] block">
              Opus HD (16 kHz)
            </span>
            <span className="text-xs text-black/60">Wideband High Fidelity</span>
          </div>

          <div className="pastel-card p-3.5 space-y-0.5">
            <span className="text-[11px] font-semibold text-black/45 uppercase tracking-wider block">
              Network Jitter
            </span>
            <span className="text-sm font-bold text-[#1A1A1A] block">
              1.2 ms
            </span>
            <span className="text-xs text-[#16856B]">Optimal Transmission</span>
          </div>

          <div className="pastel-card p-3.5 space-y-0.5">
            <span className="text-[11px] font-semibold text-black/45 uppercase tracking-wider block">
              Packet Loss
            </span>
            <span className="text-sm font-bold text-[#1A1A1A] block">
              0.00%
            </span>
            <span className="text-xs text-[#16856B]">Zero Dropped Frames</span>
          </div>

          <div className="pastel-card p-3.5 space-y-0.5">
            <span className="text-[11px] font-semibold text-black/45 uppercase tracking-wider block">
              VAD Barge-In
            </span>
            <span className="text-sm font-bold text-[#1A1A1A] block">
              0.85s
            </span>
            <span className="text-xs text-black/60">Instant Interruption</span>
          </div>
        </div>
      </div>

      {/* Call Drawer */}
      <CallDrawer
        call={selectedCallForDrawer}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

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
