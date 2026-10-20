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
  Settings,
} from "lucide-react";
import TestCallModal from "../modals/TestCallModal";
import TopUpCreditsModal from "../modals/TopUpCreditsModal";
import CreateAgentModal from "../modals/CreateAgentModal";
import StartCampaignModal from "../modals/StartCampaignModal";
import CallDrawer from "./CallDrawer";
import { RecentCallRecord, CallOutcome } from "@/types/dashboard";
import { soundSynth } from "@/lib/audio-synth";
import BuildAIEmployeeBanner from "../components/BuildAIEmployeeBanner";
import TelephonyActivityHeatmap from "../components/TelephonyActivityHeatmap";
import { usePalette } from "@/context/PaletteContext";

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
  const { palette } = usePalette();
  const [selectedCallForDrawer, setSelectedCallForDrawer] = useState<RecentCallRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Timeframe and Filtering
  const [timeframe, setTimeframe] = useState<"today" | "7d" | "30d">("today");
  const [callFilter, setCallFilter] = useState<"all" | "inbound" | "outbound">("all");
  const [searchCallQuery, setSearchCallQuery] = useState("");
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
      <div className="relative overflow-hidden bg-white rounded-[28px] border-2 border-black/[0.08] p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.035)] flex flex-col lg:flex-row lg:items-center justify-between gap-4">


        <div>
          {/* Carrier Status Strip */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-2xs"
              style={{ backgroundColor: palette.colors.successBg, color: palette.colors.successText }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: palette.colors.success }} />
              <span>TRUNK GATEWAY: SIP/2.0 READY</span>
            </span>
            <span className="text-black/20 text-xs">•</span>
            <span className="text-xs font-semibold text-black/60">
              TRK-91-AIRTEL-PRI
            </span>
            <span className="text-black/20 text-xs">•</span>
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full border border-black/[0.06]"
              style={{ backgroundColor: palette.colors.surfaceAlt, color: palette.colors.textPrimary }}
            >
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
          <div
            className="flex border-2 border-black/[0.08] rounded-full p-1 text-xs"
            style={{ backgroundColor: palette.colors.surfaceAlt }}
          >
            <button
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setTimeframe("today");
              }}
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                timeframe === "today"
                  ? "shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
              style={timeframe === "today" ? { backgroundColor: palette.colors.accent, color: palette.colors.accentText } : {}}
            >
              Today
            </button>
            <button
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setTimeframe("7d");
              }}
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                timeframe === "7d"
                  ? "shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
              style={timeframe === "7d" ? { backgroundColor: palette.colors.accent, color: palette.colors.accentText } : {}}
            >
              7D
            </button>
            <button
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setTimeframe("30d");
              }}
              className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                timeframe === "30d"
                  ? "shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
              style={timeframe === "30d" ? { backgroundColor: palette.colors.accent, color: palette.colors.accentText } : {}}
            >
              30D
            </button>
          </div>

          {/* Simulate Inbound Call Button */}
          <button
            onClick={handleSimulateInboundCall}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:opacity-90 border-2 border-black/[0.08] text-xs font-bold text-[#1A1A1A] shadow-xs transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            title="Simulate inbound carrier call"
          >
            <PhoneIncoming className="w-3.5 h-3.5" style={{ color: palette.colors.success }} />
            <span>Simulate Inbound</span>
          </button>

          {/* Test Voice Agent Button */}
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setTestCallOpen(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: palette.colors.accent, color: palette.colors.accentText }}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Test Voice Agent</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP METRIC CARDS (Vibrant High-Voltage Cards with Borders & Shapes)   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* CARD 1: Minutes Quota */}
        <div
          onClick={() => setTopUpOpen(true)}
          style={{
            backgroundColor: palette.colors.metricCard1.bg,
            color: palette.colors.metricCard1.text,
            borderColor: palette.colors.metricCard1.border,
            boxShadow: palette.colors.metricCard1.shadow,
          }}
          className="relative overflow-hidden rounded-[26px] border-2 p-5 sm:p-6 flex flex-col justify-between min-h-[185px] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:brightness-[1.02] group select-none"
        >
          {/* Decorative geometric shapes */}
          <div
            className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundColor: palette.colors.metricCard1.shapeFill,
              border: `2px solid ${palette.colors.metricCard1.shapeStroke}`,
            }}
          />
          <div
            className="absolute right-10 -bottom-3 w-16 h-16 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125"
            style={{ backgroundColor: palette.colors.metricCard1.shapeFill }}
          />
          <div
            className="absolute right-3.5 top-3 w-8 h-8 rounded-xl rotate-12 pointer-events-none opacity-40 transition-transform duration-500 group-hover:rotate-45"
            style={{ border: `1.5px solid ${palette.colors.metricCard1.shapeStroke}` }}
          />

          {/* Top Row */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                style={{
                  backgroundColor: palette.colors.metricCard1.iconBg,
                  color: palette.colors.metricCard1.iconColor,
                  borderColor: palette.colors.metricCard1.iconBorder || "rgba(255, 255, 255, 0.7)",
                }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 shrink-0 group-hover:scale-105 transition-transform"
              >
                <Clock className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs sm:text-[13px] tracking-tight whitespace-nowrap" style={{ color: palette.colors.metricCard1.text }}>
                Minutes Quota
              </span>
            </div>
            <span
              style={{
                backgroundColor: palette.colors.metricCard1.badgeBg,
                color: palette.colors.metricCard1.badgeText,
                borderColor: palette.colors.metricCard1.badgeBorder || "transparent",
              }}
              className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider leading-none flex items-center text-center whitespace-nowrap shadow-xs border"
            >
              100m MAX
            </span>
          </div>

          {/* Value & Progress */}
          <div className="relative z-10 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[40px] sm:text-[46px] font-black tracking-tight leading-none" style={{ color: palette.colors.metricCard1.text }}>
                {availableMinutes.toFixed(1)}
              </span>
              <span className="text-xs font-bold opacity-80">min remaining</span>
            </div>

            {/* Stepped Progress Bar */}
            <div className="w-full bg-black/15 h-2 rounded-full mt-3 overflow-hidden flex p-0.5 border border-black/10">
              <div className="bg-current h-full w-[14%] rounded-full opacity-90" />
              <div className="bg-transparent h-full w-[86%]" />
            </div>

            <div className="flex items-center justify-between pt-2.5 text-[11px]">
              <span className="opacity-80 font-bold">Free Tier Active</span>
              <span className="font-black group-hover:underline">
                + Top Up &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* CARD 2: Traffic Volume */}
        <div
          onClick={() => router.push("/dashboard/calls")}
          style={{
            backgroundColor: palette.colors.metricCard2.bg,
            color: palette.colors.metricCard2.text,
            borderColor: palette.colors.metricCard2.border,
            boxShadow: palette.colors.metricCard2.shadow,
          }}
          className="relative overflow-hidden rounded-[26px] border-2 p-5 sm:p-6 flex flex-col justify-between min-h-[185px] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:brightness-[1.02] group select-none"
        >
          {/* Decorative geometric shapes */}
          <div
            className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundColor: palette.colors.metricCard2.shapeFill,
              border: `2px solid ${palette.colors.metricCard2.shapeStroke}`,
            }}
          />
          <div
            className="absolute right-10 -bottom-3 w-16 h-16 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125"
            style={{ backgroundColor: palette.colors.metricCard2.shapeFill }}
          />
          <div
            className="absolute right-3.5 top-3 w-8 h-8 rounded-xl rotate-12 pointer-events-none opacity-40 transition-transform duration-500 group-hover:rotate-45"
            style={{ border: `1.5px solid ${palette.colors.metricCard2.shapeStroke}` }}
          />

          {/* Top Row */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                style={{
                  backgroundColor: palette.colors.metricCard2.iconBg,
                  color: palette.colors.metricCard2.iconColor,
                  borderColor: palette.colors.metricCard2.iconBorder || "rgba(255, 255, 255, 0.7)",
                }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 shrink-0 group-hover:scale-105 transition-transform"
              >
                <Phone className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs sm:text-sm whitespace-nowrap" style={{ color: palette.colors.metricCard2.text }}>
                Traffic Volume
              </span>
            </div>
            <span
              style={{
                backgroundColor: palette.colors.metricCard2.badgeBg,
                color: palette.colors.metricCard2.badgeText,
                borderColor: palette.colors.metricCard2.badgeBorder || "transparent",
              }}
              className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider leading-none flex items-center text-center whitespace-nowrap shadow-xs border"
            >
              LIVE TRUNKS
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[40px] sm:text-[46px] font-black tracking-tight leading-none" style={{ color: palette.colors.metricCard2.text }}>
                {totalCalls}
              </span>
              <span className="text-xs font-bold opacity-80">calls handled</span>
            </div>

            <div className="flex items-center gap-2.5 mt-2.5 text-xs font-bold">
              <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
                <PhoneIncoming className="w-3 h-3" /> {inboundCallsCount} In
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md backdrop-blur-xs">
                <PhoneOutgoing className="w-3 h-3" /> {outboundCallsCount} Out
              </span>
            </div>

            <div className="flex items-center justify-between pt-2.5 text-[11px]">
              <span className="opacity-80 font-bold">{minutesUsedToday} min consumed</span>
              <span
                style={{
                  backgroundColor: palette.colors.metricCard2.badgeBg,
                  color: palette.colors.metricCard2.badgeText,
                }}
                className="px-2 py-0.5 rounded-full font-black text-[10px] border border-white/20"
              >
                100% RESOLVED
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3: AI Workforce */}
        <div
          onClick={() => router.push("/dashboard/agents")}
          style={{
            backgroundColor: palette.colors.metricCard3.bg,
            color: palette.colors.metricCard3.text,
            borderColor: palette.colors.metricCard3.border,
            boxShadow: palette.colors.metricCard3.shadow,
          }}
          className="relative overflow-hidden rounded-[26px] border-2 p-5 sm:p-6 flex flex-col justify-between min-h-[185px] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:brightness-[1.02] group select-none"
        >
          {/* Decorative geometric shapes */}
          <div
            className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundColor: palette.colors.metricCard3.shapeFill,
              border: `2px solid ${palette.colors.metricCard3.shapeStroke}`,
            }}
          />
          <div
            className="absolute right-10 -bottom-3 w-16 h-16 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125"
            style={{ backgroundColor: palette.colors.metricCard3.shapeFill }}
          />
          <div
            className="absolute right-3.5 top-3 w-8 h-8 rounded-xl rotate-12 pointer-events-none opacity-40 transition-transform duration-500 group-hover:rotate-45"
            style={{ border: `1.5px solid ${palette.colors.metricCard3.shapeStroke}` }}
          />

          {/* Top Row */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                style={{
                  backgroundColor: palette.colors.metricCard3.iconBg,
                  color: palette.colors.metricCard3.iconColor,
                  borderColor: palette.colors.metricCard3.iconBorder || "rgba(255, 255, 255, 0.7)",
                }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 shrink-0 group-hover:scale-105 transition-transform"
              >
                <Bot className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs sm:text-sm whitespace-nowrap" style={{ color: palette.colors.metricCard3.text }}>
                AI Workforce
              </span>
            </div>
            <span
              style={{
                backgroundColor: palette.colors.metricCard3.badgeBg,
                color: palette.colors.metricCard3.badgeText,
                borderColor: palette.colors.metricCard3.badgeBorder || "transparent",
              }}
              className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider leading-none flex items-center text-center whitespace-nowrap shadow-xs border"
            >
              3 ONLINE
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[40px] sm:text-[46px] font-black tracking-tight leading-none" style={{ color: palette.colors.metricCard3.text }}>
                3
              </span>
              <span className="text-xs font-bold opacity-80">voice agents</span>
            </div>

            <p className="text-[11px] font-bold mt-2 truncate opacity-90">
              Maya (Admissions) &bull; Priya &bull; Arjun
            </p>

            <div className="flex items-center justify-between pt-2.5 text-[11px]">
              <span className="opacity-80 font-semibold">Hindi + Telugu + English</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCreateAgentOpen(true);
                }}
                className="font-black group-hover:underline cursor-pointer"
              >
                + Add Agent
              </button>
            </div>
          </div>
        </div>

        {/* CARD 4: Workspace Settings */}
        <div
          onClick={() => router.push("/dashboard/settings")}
          style={{
            backgroundColor: palette.colors.metricCard4.bg,
            color: palette.colors.metricCard4.text,
            borderColor: palette.colors.metricCard4.border,
            boxShadow: palette.colors.metricCard4.shadow,
          }}
          className="relative overflow-hidden rounded-[26px] border-2 p-5 sm:p-6 flex flex-col justify-between min-h-[185px] cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:brightness-[1.02] group select-none"
        >
          {/* Decorative geometric shapes */}
          <div
            className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full pointer-events-none transition-transform duration-500 group-hover:scale-110"
            style={{
              backgroundColor: palette.colors.metricCard4.shapeFill,
              border: `2px solid ${palette.colors.metricCard4.shapeStroke}`,
            }}
          />
          <div
            className="absolute right-10 -bottom-3 w-16 h-16 rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-125"
            style={{ backgroundColor: palette.colors.metricCard4.shapeFill }}
          />
          <div
            className="absolute right-3.5 top-3 w-8 h-8 rounded-xl rotate-12 pointer-events-none opacity-40 transition-transform duration-500 group-hover:rotate-45"
            style={{ border: `1.5px solid ${palette.colors.metricCard4.shapeStroke}` }}
          />

          {/* Top Row */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                style={{
                  backgroundColor: palette.colors.metricCard4.iconBg,
                  color: palette.colors.metricCard4.iconColor,
                  borderColor: palette.colors.metricCard4.iconBorder || "rgba(255, 255, 255, 0.7)",
                }}
                className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md border-2 shrink-0 group-hover:rotate-45 transition-transform duration-300"
              >
                <Settings className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xs sm:text-[13px] tracking-tight whitespace-nowrap" style={{ color: palette.colors.metricCard4.text }}>
                Workspace
              </span>
            </div>
            <span
              style={{
                backgroundColor: palette.colors.metricCard4.badgeBg,
                color: palette.colors.metricCard4.badgeText,
                borderColor: palette.colors.metricCard4.badgeBorder || "transparent",
              }}
              className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider leading-none flex items-center text-center whitespace-nowrap shadow-xs border"
            >
              CONFIGURED
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 pt-2">
            <div className="flex items-baseline gap-2">
              <span className="text-[34px] sm:text-[40px] font-black tracking-tight leading-none" style={{ color: palette.colors.metricCard4.text }}>
                Settings
              </span>
            </div>

            <p className="text-[11px] font-bold mt-2 truncate opacity-90">
              SIP Trunks &bull; API Keys &bull; Webhooks
            </p>

            <div className="flex items-center justify-between pt-2.5 text-[11px]">
              <span className="opacity-80 font-semibold">Telecom &amp; Governance</span>
              <span className="font-black flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Configure <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. CENTRAL CONCURRENCY HEATMAP & HOURLY TELEPHONY TRACKS                  */}
      {/* ========================================================================= */}
      <div className="w-full space-y-2">
        <TelephonyActivityHeatmap currentCallsCount={callsList.length} />

        {/* Bottom Link Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 pt-1 text-xs">
          <span className="text-black/50 text-[11px]">
            Carrier trunk telemetry synced with sub-140ms voice latency SLA.
          </span>
          <Link
            href="/dashboard/calls"
            className="text-[#1A1A1A] font-bold hover:underline flex items-center gap-1 group text-xs self-start sm:self-center"
          >
            <span>View Verbatim Audio Transcripts</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
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
      <div className="relative overflow-hidden bg-white rounded-[28px] border-2 border-black/[0.08] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.035)] space-y-4">


        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.colors.success }} />
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
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-black/[0.08] text-xs"
              style={{ backgroundColor: palette.colors.surfaceAlt }}
            >
              <Search className="w-3.5 h-3.5 text-black/40" />
              <input
                type="text"
                placeholder="Filter caller, number, outcome..."
                value={searchCallQuery}
                onChange={(e) => setSearchCallQuery(e.target.value)}
                className="bg-transparent outline-none text-xs text-[#1A1A1A] placeholder:text-black/40 w-48 sm:w-72 md:w-80 font-medium"
              />
            </div>

            {/* Direction Filter Pills */}
            <div
              className="flex border-2 border-black/[0.08] rounded-full p-1 text-xs font-bold"
              style={{ backgroundColor: palette.colors.surfaceAlt }}
            >
              <button
                onClick={() => setCallFilter("all")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  callFilter === "all"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setCallFilter("inbound")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  callFilter === "inbound"
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-black/60 hover:text-black"
                }`}
              >
                Inbound
              </button>
              <button
                onClick={() => setCallFilter("outbound")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                  callFilter === "outbound"
                    ? "bg-[#111111] text-white shadow-xs"
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
                      className={`hover:bg-black/[0.02] transition-colors cursor-pointer ${
                        isHighlighted ? "bg-black/[0.04]" : ""
                      }`}
                    >
                      {/* Caller & Number */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-full border border-black/[0.08] flex items-center justify-center font-bold text-[11px] text-[#1A1A1A] shadow-2xs"
                            style={{ backgroundColor: palette.colors.surfaceAlt }}
                          >
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
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-2xs border"
                            style={{
                              backgroundColor: palette.colors.successBg,
                              color: palette.colors.successText,
                              borderColor: `${palette.colors.success}35`,
                            }}
                          >
                            <PhoneIncoming className="w-3 h-3" /> INBOUND
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-2xs border"
                            style={{
                              backgroundColor: palette.colors.metricCard4.bg,
                              color: palette.colors.metricCard4.text,
                              borderColor: `${palette.colors.metricCard4.border}45`,
                            }}
                          >
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
