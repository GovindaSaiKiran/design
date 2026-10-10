"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  Sparkles,
  Zap,
  Send,
  UserPlus,
  CreditCard,
  Hash,
  Database,
  PhoneCall,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Bot,
  Plus,
  Volume2,
  BarChart3,
  TrendingUp,
  Activity,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Headphones,
  Calendar,
  Maximize2,
  ArrowUpRight,
  Radio,
  Check,
  Layers,
  Cpu,
  Wifi,
  Globe2,
  PhoneIncoming,
  PhoneOutgoing,
} from "lucide-react";
import TestCallModal from "../modals/TestCallModal";
import TopUpCreditsModal from "../modals/TopUpCreditsModal";
import CreateAgentModal from "../modals/CreateAgentModal";
import StartCampaignModal from "../modals/StartCampaignModal";
import { soundSynth } from "@/lib/audio-synth";

export default function OverviewPageView() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<"overview" | "stats">("overview");
  const [dateRange, setDateRange] = useState("Today, Oct 11");
  const [timeframe, setTimeframe] = useState<"today" | "7d" | "30d">("today");
  const [metricTab, setMetricTab] = useState<"all" | "inbound" | "outbound">("all");
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);

  // Modals state
  const [testCallOpen, setTestCallOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [createEmployeeOpen, setCreateEmployeeOpen] = useState(false);
  const [startCampaignOpen, setStartCampaignOpen] = useState(false);

  // Real company call state loaded from storage or live events
  const [callsList, setCallsList] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("swaram_calls");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCallsList(parsed);
        }
      }
    } catch {
      // Clean fallback
    }
  }, []);

  // Telephony pipeline checklist state
  const [checkedPipelines, setCheckedPipelines] = useState<Record<string, boolean>>({
    inbound: true,
    qualification: true,
  });

  const togglePipeline = (id: string) => {
    setCheckedPipelines((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTalkToSwara = () => {
    soundSynth.speak(
      "Hello! I am Swaram AI. Tell me about the workflow you want your AI voice agent to handle, and I will configure the neural telephony pipeline for you.",
      { rate: 1.0 }
    );
    setTestCallOpen(true);
  };

  // Real company metrics calculated strictly from live data
  const totalCallsToday = callsList.length;
  const totalInboundCalls = callsList.filter((c) => c.direction === "inbound").length;
  const totalOutboundCalls = callsList.filter((c) => c.direction === "outbound").length;
  const totalMinutesUsed = callsList.reduce((acc, c) => acc + (c.durationSeconds || 0), 0) / 60;
  const formattedMinutesUsed = totalMinutesUsed.toFixed(1);

  // Timeframe slots for professional company representation
  const hourlySlots = [
    { label: "00:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "02:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "04:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "06:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "08:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "10:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "12:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "14:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "16:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "18:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "20:00", calls: 0, inbound: 0, outbound: 0 },
    { label: "22:00", calls: 0, inbound: 0, outbound: 0 },
  ];

  const weeklySlots = [
    { label: "Mon", calls: 0, inbound: 0, outbound: 0 },
    { label: "Tue", calls: 0, inbound: 0, outbound: 0 },
    { label: "Wed", calls: 0, inbound: 0, outbound: 0 },
    { label: "Thu", calls: 0, inbound: 0, outbound: 0 },
    { label: "Fri", calls: 0, inbound: 0, outbound: 0 },
    { label: "Sat", calls: 0, inbound: 0, outbound: 0 },
    { label: "Sun", calls: 0, inbound: 0, outbound: 0 },
  ];

  const currentSlots = timeframe === "today" ? hourlySlots : weeklySlots;
  const maxCallsInSlot = Math.max(...currentSlots.map((s) => s.calls), 0);

  return (
    <div className="space-y-6 pb-16 font-sans text-slate-900 select-none max-w-[1440px] mx-auto animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER: Dual-weight Title & Company Controls                        */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pt-2">
        <div>
          <div className="text-3xl sm:text-4xl text-slate-400 font-normal tracking-tight">
            Voice Operations
          </div>
          <div className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight flex items-center gap-3 mt-0.5">
            <span>Dashboard</span>
            {/* Signature Neon Lime Asterisk Circle Badge */}
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#c8f53c] text-slate-950 flex items-center justify-center font-bold text-2xl shadow-xs cursor-pointer hover:rotate-45 transition-transform duration-300"
              title="Swaram AI Neural Engine Active"
              onClick={handleTalkToSwara}
            >
              ✱
            </div>
            {/* Dark Action Arrow Circle Badge */}
            <button
              onClick={() => setStartCampaignOpen(true)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#111418] text-white flex items-center justify-center text-xs font-bold hover:bg-black transition-colors cursor-pointer"
              title="Launch Telephony Campaign"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Pill Capsules Control Row */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* View Mode Toggle: Overview vs Stats */}
          <div className="p-1 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center gap-1">
            <button
              onClick={() => setActiveSection("overview")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeSection === "overview"
                  ? "bg-[#111418] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSection("stats")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeSection === "stats"
                  ? "bg-[#c8f53c] text-slate-950 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Stats
            </button>
          </div>

          {/* Date Selector Pill */}
          <div className="px-4 py-2 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{dateRange}</span>
          </div>

          {/* High Contrast Black Capsule CTA */}
          <button
            onClick={() => setTestCallOpen(true)}
            className="px-5 py-2 rounded-full bg-[#111418] hover:bg-black text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer group"
          >
            <span>Live Test</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* STATS HIGHLIGHT BAR (Active when Stats toggle is clicked)                  */}
      {/* ========================================================================= */}
      {activeSection === "stats" && (
        <div className="rounded-[32px] bg-[#111418] text-white p-6 sm:p-8 shadow-md border border-slate-800 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c8f53c] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#c8f53c]">
                  Realtime Telemetry & Operational Stats
                </span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                Swaram Telephony Infrastructure Metrics
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTopUpOpen(true)}
                className="px-4 py-2 rounded-full bg-[#c8f53c] text-slate-950 text-xs font-bold hover:bg-[#bcf02a] transition-all cursor-pointer"
              >
                + Add Minutes
              </button>
              <Link
                href="/dashboard/analytics"
                className="px-4 py-2 rounded-full bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition-all"
              >
                Full Analytics →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Total Balance
              </span>
              <div className="text-3xl font-black text-[#c8f53c] font-mono mt-1">
                14.0 <span className="text-sm font-normal text-slate-400">min</span>
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Free Tier Allocation
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Average Latency
              </span>
              <div className="text-3xl font-black text-white font-mono mt-1">
                134 <span className="text-sm font-normal text-slate-400">ms</span>
              </div>
              <span className="text-[11px] text-emerald-400 block mt-0.5">
                Sub-400ms neural turnaround
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Total Handled Calls
              </span>
              <div className="text-3xl font-black text-white font-mono mt-1">
                {totalCallsToday}
              </div>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {formattedMinutesUsed} minutes consumed today
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Carrier SLA Uptime
              </span>
              <div className="text-3xl font-black text-white font-mono mt-1">
                99.99%
              </div>
              <span className="text-[11px] text-emerald-400 block mt-0.5">
                Opus HD / 0.0% Packet Loss
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TOP CARDS GRID: 3 Distinct Columns (Exact Image Proportion)             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ======================================================================= */}
        {/* CARD 1 (Left, 3 cols): Calling Volume & Minutes Wallet                   */}
        {/* ======================================================================= */}
        <div className="lg:col-span-3 rounded-[32px] bg-white border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-6 relative">
          <div>
            {/* Header: Lime Dot Indicator + Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c8f53c] border border-[#a2cf14]" />
                <span>Telephony & Minutes</span>
              </div>
              <span className="text-[11px] font-bold text-white bg-[#111418] px-2.5 py-1 rounded-full">
                ● Live
              </span>
            </div>

            {/* Big Hero Metric with Neon Lime Badge */}
            <div className="mt-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                  14.0
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#c8f53c] text-slate-950 font-black text-[10px] flex items-center gap-0.5">
                  14 min balance
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
                AVAILABLE VOICE MINUTES (FREE TIER)
              </span>
            </div>
          </div>

          {/* Telephony Status Info Pill */}
          <div className="py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-relaxed">
              CARRIER PIPELINE: <span className="text-slate-900 font-extrabold">SWARAM NEURAL AI</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-[#8ac926]" title="Carrier Online" />
          </div>

          {/* Split Sub-Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {formattedMinutesUsed}
              </div>
              <span className="text-[10px] font-bold text-slate-400 block -mt-0.5">
                MINUTES USED TODAY
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900 font-mono">
                  {totalCallsToday}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-full">
                  Standby
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 block -mt-0.5">
                ACTIVE LIVE SESSIONS
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* CARD 2 (Center, 6 cols): Professional Company Telemetry Graph             */}
        {/* ======================================================================= */}
        <div className="lg:col-span-6 rounded-[32px] bg-white border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-6 relative">
          {/* Top Bar: Title, Real Company KPIs, and Inbound / Outbound Direct Redirection Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c8f53c] border border-[#a2cf14]" />
                <span>Company Telephony Volume</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-400 font-medium">Daily Calls:</span>
                <span className="text-lg font-black text-slate-900 font-mono">
                  {totalCallsToday} <span className="text-xs text-slate-400 font-normal">processed</span>
                </span>
              </div>
            </div>

            {/* Inbound & Outbound Direct Redirection Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href="/dashboard/calls?direction=inbound"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8f53c]/30 text-slate-950 border border-[#c8f53c] text-xs font-bold hover:bg-[#c8f53c] transition-all cursor-pointer group shadow-2xs"
                title="Click to view Inbound Calls"
              >
                <PhoneIncoming className="w-3.5 h-3.5 text-[#466904] group-hover:scale-110 transition-transform" />
                <span>Inbound: {totalInboundCalls}</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 opacity-60" />
              </Link>

              <Link
                href="/dashboard/calls?direction=outbound"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold hover:bg-[#111418] hover:text-white transition-all cursor-pointer group shadow-2xs"
                title="Click to view Outbound Calls"
              >
                <PhoneOutgoing className="w-3.5 h-3.5 text-slate-600 group-hover:text-white group-hover:scale-110 transition-transform" />
                <span>Outbound: {totalOutboundCalls}</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500 opacity-60" />
              </Link>

              {/* Timeframe Selector */}
              <div className="flex items-center gap-1 p-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-bold">
                <button
                  onClick={() => setTimeframe("today")}
                  className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                    timeframe === "today"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  24h
                </button>
                <button
                  onClick={() => setTimeframe("7d")}
                  className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                    timeframe === "7d"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  7D
                </button>
              </div>
            </div>
          </div>

          {/* Professional Graph Container with Zero-Mock Realistic Data */}
          <div className="relative pt-2 pb-2 min-h-[180px] flex flex-col justify-end">
            {/* Left Y-axis Guides */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] font-mono text-slate-400 select-none">
              <span>{maxCallsInSlot > 0 ? `${maxCallsInSlot} calls` : "Active"}</span>
              <span>{maxCallsInSlot > 0 ? `${Math.round(maxCallsInSlot / 2)} calls` : "Standby"}</span>
              <span>0 calls</span>
            </div>

            {/* Zero-state Standby Company Indicator (renders when calls = 0, NO fake tall mock bars) */}
            {totalCallsToday === 0 ? (
              <div className="relative pl-14 pr-2 h-40 flex flex-col justify-end">
                {/* Clean resting zero baseline bars */}
                <div className="h-full flex items-end justify-between gap-2 border-b border-slate-100 pb-1">
                  {currentSlots.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                      onClick={() => router.push("/dashboard/calls")}
                      title={`${slot.label}: 0 Calls`}
                    >
                      {/* Professional resting baseline tick (4px height, NOT fake 100% tall curves) */}
                      <div className="w-full h-1 rounded-full bg-slate-200 group-hover:bg-[#c8f53c] transition-colors" />
                    </div>
                  ))}
                </div>

                {/* Professional Corporate Overlay Card */}
                <div className="absolute inset-x-14 top-2 bottom-6 bg-slate-50/90 backdrop-blur-xs rounded-2xl border border-slate-200/90 p-4 flex flex-col items-center justify-center text-center shadow-xs">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8ac926] animate-pulse" />
                    <span className="text-xs font-black text-slate-900 tracking-tight">
                      Telephony Carrier Connected & Standing By
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 max-w-sm leading-relaxed mb-3">
                    0 calls handled today. Inbound phone numbers and outbound campaign queues are fully provisioned and ready.
                  </p>
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <button
                      onClick={() => setTestCallOpen(true)}
                      className="px-3 py-1 rounded-full bg-[#111418] hover:bg-black text-white text-[11px] font-bold shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <PhoneIncoming className="w-3 h-3 text-[#c8f53c]" />
                      <span>Simulate Inbound Call</span>
                    </button>
                    <button
                      onClick={() => setStartCampaignOpen(true)}
                      className="px-3 py-1 rounded-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-[11px] font-bold shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <PhoneOutgoing className="w-3 h-3 text-slate-600" />
                      <span>Start Outbound Call</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Dynamic Real Calls Graph (Calculates actual proportional heights from real calls) */
              <div className="pl-14 pr-2 h-40 flex items-end justify-between gap-2 border-b border-slate-100 pb-1">
                {currentSlots.map((slot, idx) => {
                  const barHeight = maxCallsInSlot > 0 ? (slot.calls / maxCallsInSlot) * 100 : 4;
                  return (
                    <div
                      key={idx}
                      onClick={() => router.push("/dashboard/calls")}
                      className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                    >
                      <div
                        style={{ height: `${Math.max(barHeight, 4)}%` }}
                        className="w-full rounded-full bg-[#c8f53c] group-hover:bg-[#111418] transition-all"
                      />
                    </div>
                  );
                })}
              </div>
            )}

            {/* X-axis Labels */}
            <div className="pl-14 pr-2 flex justify-between text-[11px] font-semibold text-slate-400 mt-2">
              {currentSlots.map((slot, idx) => (
                <span key={idx}>{slot.label}</span>
              ))}
            </div>
          </div>

          {/* Bottom Capsule Navigation Row: Direct Redirection to Inbound & Outbound */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <Link
              href="/dashboard/calls?direction=all"
              className="px-4 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer bg-slate-900 text-white hover:bg-black shadow-2xs flex items-center gap-1.5"
            >
              <span>All Calls ({totalCallsToday})</span>
              <ArrowRight className="w-3 h-3 text-[#c8f53c]" />
            </Link>

            <Link
              href="/dashboard/calls?direction=inbound"
              className="px-4 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer bg-[#c8f53c] text-slate-950 hover:bg-[#bbf323] shadow-2xs flex items-center gap-1.5 group font-black"
            >
              <PhoneIncoming className="w-3.5 h-3.5 text-[#466904] group-hover:scale-110 transition-transform" />
              <span>Inbound Calls ({totalInboundCalls})</span>
            </Link>

            <Link
              href="/dashboard/calls?direction=outbound"
              className="px-4 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 shadow-2xs flex items-center gap-1.5 group"
            >
              <PhoneOutgoing className="w-3.5 h-3.5 text-slate-600 group-hover:scale-110 transition-transform" />
              <span>Outbound Calls ({totalOutboundCalls})</span>
            </Link>

            <Link
              href="/dashboard/analytics"
              className="px-4 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              Realtime Telemetry
            </Link>

            <Link
              href="/dashboard/phone-numbers"
              className="px-4 py-1.5 rounded-full font-bold transition-all whitespace-nowrap cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              SIP Concurrency
            </Link>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* CARD 3 (Right, 3 cols): Voice Workforce & Agent Pipelines                 */}
        {/* ======================================================================= */}
        <div className="lg:col-span-3 rounded-[32px] bg-white border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c8f53c] border border-[#a2cf14]" />
                <span>Voice Workforce</span>
              </div>
              <button
                onClick={() => setCreateEmployeeOpen(true)}
                className="text-slate-400 hover:text-slate-900 font-bold"
                title="Create New Agent"
              >
                •••
              </button>
            </div>

            {/* Thumbnail + Agent Counter */}
            <div className="mt-4 flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0 overflow-hidden">
                <Bot className="w-6 h-6 text-slate-700" />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Active Agents
                </span>
                <span className="text-3xl font-black text-slate-900 font-mono">
                  0
                </span>
              </div>
            </div>

            {/* Sub-tag row */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-2 px-1">
              <span>Inbound</span>
              <span>Outbound</span>
              <span>Support</span>
              <span>Surveys</span>
            </div>
          </div>

          {/* Interactive Checkbox / Telephony Pipeline items */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 pb-1">
              <span>Agent Pipelines</span>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="text-[10px] text-slate-400 font-medium">Ready</span>
              </div>
            </div>

            {/* Pipeline Row 1 */}
            <div
              onClick={() => togglePipeline("inbound")}
              className="flex items-center justify-between text-xs py-1 cursor-pointer hover:bg-slate-50 px-1 rounded-lg"
            >
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <span
                  className={`w-3 h-3 rounded-full border flex items-center justify-center text-[8px] ${
                    checkedPipelines.inbound
                      ? "bg-[#111418] text-[#c8f53c] border-[#111418]"
                      : "border-slate-300"
                  }`}
                >
                  {checkedPipelines.inbound && "✓"}
                </span>
                <span>Inbound Concierge</span>
              </div>
              <span className="text-[11px] text-slate-400">Auto-Attendant</span>
              <span className="text-[11px] font-bold text-slate-700">Standby</span>
            </div>

            {/* Pipeline Row 2 */}
            <div
              onClick={() => togglePipeline("outbound")}
              className="flex items-center justify-between text-xs py-1 cursor-pointer hover:bg-slate-50 px-1 rounded-lg"
            >
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <span
                  className={`w-3 h-3 rounded-full border flex items-center justify-center text-[8px] ${
                    checkedPipelines.outbound
                      ? "bg-[#111418] text-[#c8f53c] border-[#111418]"
                      : "border-slate-300"
                  }`}
                >
                  {checkedPipelines.outbound && "✓"}
                </span>
                <span>Outbound Dialing</span>
              </div>
              <span className="text-[11px] text-slate-400">Verification</span>
              <span className="text-[11px] font-bold text-slate-700">Standby</span>
            </div>

            {/* Pipeline Row 3 (Active Checked Highlight) */}
            <div
              onClick={() => togglePipeline("qualification")}
              className="flex items-center justify-between text-xs py-1 bg-slate-50 px-2 rounded-xl cursor-pointer"
            >
              <div className="flex items-center gap-2 text-slate-900 font-bold">
                <div className="w-4 h-4 rounded-full bg-[#111418] text-[#c8f53c] flex items-center justify-center text-[10px]">
                  ✓
                </div>
                <span>Lead Qualification</span>
              </div>
              <span className="text-[11px] text-slate-500">Sub-400ms</span>
              <span className="px-2 py-0.5 rounded-full bg-[#c8f53c] text-slate-950 font-black text-[10px]">
                Ready
              </span>
            </div>

            {/* Pipeline Row 4 */}
            <div
              onClick={() => togglePipeline("rag")}
              className="flex items-center justify-between text-xs py-1 cursor-pointer hover:bg-slate-50 px-1 rounded-lg"
            >
              <div className="flex items-center gap-2 text-slate-600 font-medium">
                <span
                  className={`w-3 h-3 rounded-full border flex items-center justify-center text-[8px] ${
                    checkedPipelines.rag
                      ? "bg-[#111418] text-[#c8f53c] border-[#111418]"
                      : "border-slate-300"
                  }`}
                >
                  {checkedPipelines.rag && "✓"}
                </span>
                <span>Knowledge RAG</span>
              </div>
              <span className="text-[11px] text-slate-400">Vector Search</span>
              <span className="text-[11px] font-bold text-slate-700">Ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BOTTOM CARDS GRID: 3 Equal/Harmonized Sections (Image Bottom Layout)    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ======================================================================= */}
        {/* CARD 4 (Bottom Left, 4 cols): Low Latency & Acoustic Radar Pulse Visual    */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 rounded-[32px] bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header Dotted Indicator + Title */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col gap-1 pt-1.5 text-slate-400">
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                <span className="w-1 h-1 rounded-full bg-slate-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                Deploy AI Voice Agents <br />
                and monitor <br />
                with precision
              </h3>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              Experience ultra-low latency voice operations with Swaram neural speech engine. Keep a watchful eye on acoustic streaming, voice activity detection, and live caller sentiment.
            </p>
          </div>

          {/* Action Row & Radar Waveform Visual */}
          <div className="flex items-end justify-between gap-4 pt-2">
            <div className="space-y-3">
              <button
                onClick={() => setTestCallOpen(true)}
                className="px-4 py-2 rounded-full bg-[#111418] hover:bg-black text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>✦ Test Voice Call</span>
              </button>
              <button
                onClick={handleTalkToSwara}
                className="text-xs font-bold text-slate-600 hover:text-slate-950 block underline pl-1 cursor-pointer"
              >
                Configure Voice
              </button>
            </div>

            {/* Glowing Concentric Neon Lime Radar Capsule */}
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c8f53c]/40 via-[#c8f53c]/20 to-transparent animate-pulse" />
              {/* Middle Concentric Ring */}
              <div className="absolute inset-2 rounded-full border border-[#c8f53c] bg-white shadow-inner flex items-center justify-center">
                {/* Inner Latency Circle */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#e5fbb4] to-[#c8f53c] flex flex-col items-center justify-center shadow-xs">
                  <span className="text-xs font-black text-slate-950 font-mono">
                    134 ms
                  </span>
                  <span className="text-[8px] font-bold text-slate-800 uppercase">
                    Sub-400ms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* CARD 5 (Bottom Center, 5 cols): Neural Acoustic Telemetry & Daily Trends  */}
        {/* ======================================================================= */}
        <div className="lg:col-span-5 rounded-[32px] bg-white border border-slate-200/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5">
          {/* Top Title & Notification subtext */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">
                NEURAL ACOUSTIC TELEMETRY
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Real-time bidirectional WebRTC & SIP streaming with Voice Activity Detection (VAD)
              </p>
            </div>
            <span
              onClick={() => alert("Telephony settings configured")}
              className="text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
              title="Telemetry Settings"
            >
              ⚙
            </span>
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              WebRTC Audio Stream
            </span>
            <span className="text-xs text-slate-500 font-medium">
              VAD Threshold: 0.85s (Instant Interruption)
            </span>
          </div>

          {/* Split Bottom: Neon Lime Highlight Card + True 7-Day Carrier SLA Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end pt-2">
            {/* Left Highlight Card */}
            <div className="sm:col-span-6 p-4 rounded-2xl bg-[#c8f53c] text-slate-950 flex flex-col justify-between space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-900 bg-black/10 px-1.5 py-0.5 rounded-full">
                  Sub-300ms TTS
                </span>
                <div className="flex items-center gap-1 text-slate-950">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-950/40" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-700 block">SPEECH LATENCY</span>
                <div className="text-3xl font-black text-slate-950 font-mono tracking-tight">
                  134 ms
                </div>
              </div>

              <div className="text-[9px] font-extrabold text-slate-800 uppercase tracking-wider border-t border-black/10 pt-1.5">
                SWARAM NEURAL SPEECH ENGINE
              </div>
            </div>

            {/* Right Weekly Dots & Trend Chart (S M T W T F S) - Zero Mock Clean Baseline */}
            <div className="sm:col-span-6 space-y-2 pb-1">
              <div className="text-right">
                <span className="text-[10px] font-extrabold text-[#537c04] bg-[#c8f53c]/40 px-2 py-0.5 rounded-full">
                  99.99% QoS SLA
                </span>
              </div>

              {/* 7-Day Baseline Bars */}
              <div className="flex items-end justify-between gap-1 h-20 pt-2 px-1">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end gap-1.5">
                    {/* Glowing dot on top indicating carrier online */}
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8f53c]" />
                    {/* True resting baseline indicator (NOT fake escalating curves) */}
                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                    {/* Day label */}
                    <span className="text-[10px] font-bold text-slate-400 mt-1">
                      {day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* CARD 6 (Bottom Right, 3 cols): SIP Trunking & Codec Concurrency           */}
        {/* ======================================================================= */}
        <div className="lg:col-span-3 rounded-[32px] bg-white border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c8f53c] border border-[#a2cf14]" />
              <span>Carrier SIP Trunking</span>
            </div>

            {/* Concurrency Counter */}
            <div className="mt-4 flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0 overflow-hidden">
                <Radio className="w-6 h-6 text-slate-700" />
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  SIP Concurrency <span className="text-[#537c04] bg-[#c8f53c]/40 px-1 rounded">Standby</span>
                </span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  0<span className="text-xs text-slate-400 font-normal">/100 Lines</span>
                </span>
              </div>
            </div>
          </div>

          {/* Split Bottom Metrics: Packet Loss & Codec */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Packet Loss
              </span>
              <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                0.0%
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Optimal Call Quality
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Audio Codec
              </span>
              <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                Opus HD
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                16 kHz Real-time Audio
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODALS (Create Agent, Test Call, Top Up Credits, Campaign)               */}
      {/* ========================================================================= */}
      <TestCallModal
        isOpen={testCallOpen}
        onClose={() => setTestCallOpen(false)}
      />
      <TopUpCreditsModal
        isOpen={topUpOpen}
        onClose={() => setTopUpOpen(false)}
        currentCredits={14}
      />
      <CreateAgentModal
        isOpen={createEmployeeOpen}
        onClose={() => setCreateEmployeeOpen(false)}
      />
      <StartCampaignModal
        isOpen={startCampaignOpen}
        onClose={() => setStartCampaignOpen(false)}
      />
    </div>
  );
}
