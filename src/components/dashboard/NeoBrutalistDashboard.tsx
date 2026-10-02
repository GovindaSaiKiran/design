"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Bot,
  PhoneCall,
  Sparkles,
  Settings,
  Search,
  ChevronDown,
  Bell,
  Rocket,
  UserPlus,
  ArrowUpRight,
  Activity,
  ArrowLeft,
  CheckCircle2,
  Radio,
  Volume2,
  Play,
  Pause,
  X,
  Building2,
  Zap,
  Download,
  Filter,
  Users,
  Plus,
  PhoneForwarded,
  Share2,
  FileSpreadsheet,
  Headphones,
  Check,
} from "lucide-react";
import {
  mockOrganizations,
  mockAgents,
  mockLiveCalls,
  mockRecentCalls,
  mockNotifications,
  mockTelephonyNumbers,
} from "@/data/mock/dashboardData";
import { LiveCallItem, DashboardAgent } from "@/types/dashboard";

// Modals
import CreateAgentModal from "./modals/CreateAgentModal";
import LiveCallModal from "./modals/LiveCallModal";
import ExportReportModal from "./modals/ExportReportModal";

export type NeoTab = "overview" | "agents" | "calls" | "leads" | "telemetry" | "trunks";

interface CandidateLead {
  id: string;
  name: string;
  phone: string;
  program: string;
  score: string;
  category: "interested" | "call_later" | "not_interested" | "inbound";
  language: string;
  agent: string;
  summary: string;
  timestamp: string;
  sentiment: "Positive" | "Neutral" | "Follow-up";
}

const initialLeads: CandidateLead[] = [
  {
    id: "lead-01",
    name: "Rahul Verma",
    phone: "+91 98401 22340",
    program: "B.Tech CSE (AI & Robotics)",
    score: "94.2% PCM",
    category: "interested",
    language: "Hindi",
    agent: "Maya",
    summary: "Pre-approved for 35% Chancellor Merit Scholarship. Inquired about AC hostel rooms.",
    timestamp: "10m ago",
    sentiment: "Positive",
  },
  {
    id: "lead-02",
    name: "Priya Rao",
    phone: "+91 94402 11980",
    program: "B.Tech Data Science & Cyber",
    score: "JEE Rank 4,120",
    category: "interested",
    language: "Telugu",
    agent: "Neha",
    summary: "Confirmed campus counseling visit for Saturday. Parent requested placement records.",
    timestamp: "24m ago",
    sentiment: "Positive",
  },
  {
    id: "lead-03",
    name: "Suresh Kumar",
    phone: "+91 98840 55120",
    program: "B.Tech Electronics & VLSI",
    score: "88.6% State CET",
    category: "call_later",
    language: "Tamil",
    agent: "Ananya",
    summary: "Requested callback after 6:00 PM when father returns from office. Fee installment queries.",
    timestamp: "45m ago",
    sentiment: "Neutral",
  },
  {
    id: "lead-04",
    name: "Tanvi Kulkarni",
    phone: "+91 97654 33210",
    program: "Integrated M.Tech AI & Cloud",
    score: "92.0% PCM",
    category: "inbound",
    language: "Kannada",
    agent: "Ishita",
    summary: "Direct inbound call. Downloaded brochure. Verified hostel allotment and bus transit routes.",
    timestamp: "1h ago",
    sentiment: "Positive",
  },
  {
    id: "lead-05",
    name: "Aditya Mukherjee",
    phone: "+91 98310 99420",
    program: "B.Tech Mechanical (EV Tech)",
    score: "79.4% PCM",
    category: "not_interested",
    language: "Bengali",
    agent: "Maya",
    summary: "Opted for state government college due to domicile quota. Marked inactive.",
    timestamp: "2h ago",
    sentiment: "Follow-up",
  },
];

export default function NeoBrutalistDashboard() {
  const [activeTab, setActiveTab] = useState<NeoTab>("overview");
  const [activeOrgIndex, setActiveOrgIndex] = useState(0);
  const [leadsList, setLeadsList] = useState<CandidateLead[]>(initialLeads);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [whatsappSentId, setWhatsappSentId] = useState<string | null>(null);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  // Modals state
  const [createAgentOpen, setCreateAgentOpen] = useState(false);
  const [liveCallOpen, setLiveCallOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState<LiveCallItem | null>(null);
  const [agentsList, setAgentsList] = useState<DashboardAgent[]>(mockAgents);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const activeOrg = mockOrganizations[activeOrgIndex] || mockOrganizations[0];

  const filteredLeads = leadsList.filter((lead) => {
    const matchesCategory =
      selectedCategory === "all" || lead.category === selectedCategory;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleOpenLiveCall = (callItem?: LiveCallItem) => {
    if (callItem) {
      setSelectedCall(callItem);
    } else if (mockLiveCalls.length > 0) {
      setSelectedCall(mockLiveCalls[0]);
    }
    setLiveCallOpen(true);
  };

  const handleSendWhatsApp = (leadId: string) => {
    setWhatsappSentId(leadId);
    setTimeout(() => setWhatsappSentId(null), 2500);
  };

  const toggleVoiceSample = (voiceName: string) => {
    if (playingVoice === voiceName) {
      setPlayingVoice(null);
    } else {
      setPlayingVoice(voiceName);
    }
  };

  return (
    <div className="min-h-screen stitch-dot-grid text-slate-900 font-sans antialiased selection:bg-[#cdfb56] selection:text-slate-950 p-3 sm:p-5 lg:p-7">
      <div className="max-w-[1520px] mx-auto space-y-5">
        
        {/* ======================================================================= */}
        {/* 1. TOP MASTER HEADER (GLASSMORPHIC WITH CRISP ACCENTS)                 */}
        {/* ======================================================================= */}
        <header className="bg-white/80 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-3.5">
          
          {/* Top Row: Brand & Campus Workspace (Left) + Actions & Alerts (Right) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
            {/* Brand & Campus Workspace */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-2.5 bg-[#0f172a]/95 backdrop-blur-md text-white px-3.5 py-2 rounded-xl border border-slate-900/20 shadow-xs hover:bg-[#0f172a] hover:-translate-y-0.5 transition-all"
                title="Return to VoicePilot Front Page"
              >
                <div className="w-5 h-5 bg-[#cdfb56] rounded flex items-center justify-center font-black text-slate-950 text-xs">
                  VP
                </div>
                <span className="font-extrabold text-sm tracking-tight text-white uppercase">
                  VoicePilot
                </span>
                <span className="text-[10px] bg-[#cdfb56] text-slate-950 font-black px-1.5 py-0.2 rounded">
                  AI
                </span>
              </Link>

              {/* Campus Organization Selector */}
              <div className="relative">
                <select
                  value={activeOrgIndex}
                  onChange={(e) => setActiveOrgIndex(Number(e.target.value))}
                  className="bg-white/70 backdrop-blur-md text-slate-900 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-900/15 shadow-xs cursor-pointer outline-none hover:bg-white/90 transition-all appearance-none pr-8"
                >
                  {mockOrganizations.map((org, idx) => (
                    <option key={org.id} value={idx}>
                      🏛️ {org.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Live Telemetry Pill */}
              <button
                onClick={() => handleOpenLiveCall()}
                className="flex items-center gap-1.5 bg-[#cdfb56]/90 hover:bg-[#cdfb56] backdrop-blur-md text-slate-950 text-xs font-bold px-3 py-2 rounded-xl border border-[#0f172a]/30 shadow-xs hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                <span>LIVE CALL SESSION</span>
              </button>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5 self-end sm:self-auto">
              {/* Deploy New Agent Button */}
              <button
                onClick={() => setCreateAgentOpen(true)}
                className="bg-[#cdfb56] hover:bg-[#bef03f] backdrop-blur-md text-slate-950 font-bold uppercase text-xs px-3.5 py-2 rounded-xl border border-[#0f172a]/30 shadow-xs hover:-translate-y-0.5 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Deploy Agent</span>
              </button>

              {/* Export Report Button */}
              <button
                onClick={() => setExportOpen(true)}
                className="bg-white/70 hover:bg-white/90 backdrop-blur-md text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl border border-slate-900/15 shadow-xs hover:-translate-y-0.5 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 stroke-[2.2]" />
                <span>Export</span>
              </button>

              {/* Notifications Toggle */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="w-9 h-9 bg-white/70 backdrop-blur-md border border-slate-900/15 rounded-xl shadow-xs flex items-center justify-center text-slate-800 hover:bg-[#cdfb56] transition-colors cursor-pointer"
                  title="Telemetry Notifications"
                >
                  <Bell className="w-4 h-4 stroke-[2]" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-2xl border border-slate-900/15 rounded-2xl shadow-xl p-4 z-50 text-xs space-y-2.5 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2 font-bold uppercase">
                      <span>Acoustic Alerts</span>
                      <span className="bg-[#cdfb56] text-slate-950 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border border-[#0f172a]/30">
                        {mockNotifications.length} New
                      </span>
                    </div>
                    {mockNotifications.slice(0, 4).map((n) => (
                      <div key={n.id} className="p-2.5 border border-slate-200/80 rounded-xl bg-white/60 hover:bg-[#cdfb56]/15 transition-colors">
                        <div className="font-bold text-slate-900">{n.title}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{n.message}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Row: Navigation Tabs Bar */}
          <div className="pt-3 border-t border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <nav className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-[#cdfb56] text-slate-950 border border-[#0f172a] shadow-xs"
                    : "bg-white/60 text-slate-700 hover:bg-white/90 border border-slate-900/10 shadow-xs"
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => setActiveTab("agents")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer ${
                  activeTab === "agents"
                    ? "bg-[#cdfb56] text-slate-950 border border-[#0f172a] shadow-xs"
                    : "bg-white/60 text-slate-700 hover:bg-white/90 border border-slate-900/10 shadow-xs"
                }`}
              >
                AI Fleet ({agentsList.length})
              </button>

              <button
                onClick={() => setActiveTab("calls")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer ${
                  activeTab === "calls"
                    ? "bg-[#cdfb56] text-slate-950 border border-[#0f172a] shadow-xs"
                    : "bg-white/60 text-slate-700 hover:bg-white/90 border border-slate-900/10 shadow-xs"
                }`}
              >
                Call Logs ({mockRecentCalls.length})
              </button>

              <button
                onClick={() => setActiveTab("leads")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer ${
                  activeTab === "leads"
                    ? "bg-[#cdfb56] text-slate-950 border border-[#0f172a] shadow-xs"
                    : "bg-white/60 text-slate-700 hover:bg-white/90 border border-slate-900/10 shadow-xs"
                }`}
              >
                Candidates ({leadsList.length})
              </button>

              <button
                onClick={() => setActiveTab("telemetry")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer ${
                  activeTab === "telemetry"
                    ? "bg-[#cdfb56] text-slate-950 border border-[#0f172a] shadow-xs"
                    : "bg-white/60 text-slate-700 hover:bg-white/90 border border-slate-900/10 shadow-xs"
                }`}
              >
                Telemetry
              </button>
            </nav>

            {/* Right Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 text-xs font-mono font-semibold text-slate-800 bg-white/60 backdrop-blur-md border border-slate-900/10 px-3 py-1.5 rounded-xl shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#cdfb56] border border-[#0f172a] animate-pulse" />
              <span>14 SIP Trunks Active • 99.98% High QoS</span>
            </div>
          </div>
        </header>

        {/* ======================================================================= */}
        {/* 2. REAL-TIME TICKER (DARK GLASSMORPHIC STRIP WITH LIME ACCENTS)         */}
        {/* ======================================================================= */}
        <div className="w-full bg-[#0f172a]/90 backdrop-blur-xl text-[#cdfb56] border border-white/10 rounded-2xl px-4 py-2.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)] flex items-center gap-3 overflow-hidden text-xs font-mono select-none">
          <span className="bg-[#cdfb56] text-slate-950 px-2 py-0.5 rounded font-bold shrink-0 tracking-wider border border-[#0f172a]/30">
            VOICE STREAM
          </span>
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="animate-ticker flex items-center gap-8 text-slate-200">
              <span>🇮🇳 Maya (Hindi) • B.Tech CSE AI Specialization query answered in 382ms</span>
              <span className="text-slate-600">◆</span>
              <span>🇮🇳 Neha (Telugu) • 'హోస్టల్ ఫీజు వివరాలు' PDF pushed to Suresh via WhatsApp</span>
              <span className="text-slate-600">◆</span>
              <span>⚡ WebSocket Full-Duplex • 0 Packet Loss • 140ms First Byte Response</span>
              <span className="text-slate-600">◆</span>
              <span>🇮🇳 Ishita (Kannada) • Pre-approved 35% Chancellor Scholarship for Rahul Verma</span>
              <span className="text-slate-600">◆</span>
              <span>🏆 2.4M Phonemes Synthesized Today • 98.4% Autonomous Yield</span>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 3. VITALS METRICS STRIP (4 GLASSMORPHIC CARDS)                          */}
        {/* ======================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: Inbound Calls Handled */}
          <div className="bg-white/75 hover:bg-white/90 backdrop-blur-xl border border-slate-900/10 hover:border-slate-900/20 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Calls Handled
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#0f172a] text-[#cdfb56] border border-[#0f172a]/30 flex items-center justify-center font-bold">
                <Rocket className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-950">
                842
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="bg-[#cdfb56] text-slate-950 px-2 py-0.5 rounded border border-[#0f172a]/30 font-bold text-[10px]">
                  +18.4% vs last week
                </span>
                <span className="text-slate-500 font-medium">99.2% Resolved</span>
              </div>
            </div>
          </div>

          {/* Card 2: Turn Latency */}
          <div className="bg-white/75 hover:bg-white/90 backdrop-blur-xl border border-slate-900/10 hover:border-slate-900/20 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Turn Latency
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#cdfb56] text-slate-950 border border-[#0f172a]/30 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 fill-current" />
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-950">
                382 ms
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="bg-[#0f172a] text-white px-2 py-0.5 rounded font-bold text-[10px]">
                  -14s vs Human Desk
                </span>
                <span className="bg-[#cdfb56] text-slate-950 px-2 py-0.5 rounded border border-[#0f172a]/30 font-bold text-[10px]">
                  Zero Lag Audio
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Qualified Candidates */}
          <div className="bg-white/75 hover:bg-white/90 backdrop-blur-xl border border-slate-900/10 hover:border-slate-900/20 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Verified Candidates
              </span>
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-900 border border-[#0f172a]/20 flex items-center justify-center font-bold">
                <UserPlus className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-950">
                412
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="bg-[#cdfb56] text-slate-950 px-2 py-0.5 rounded border border-[#0f172a]/30 font-bold text-[10px]">
                  +32 Direct Registrations
                </span>
                <span className="text-slate-500 font-medium">94.8% Match</span>
              </div>
            </div>
          </div>

          {/* Card 4: Active Trunks */}
          <div className="bg-[#0f172a]/90 hover:bg-[#0f172a]/95 backdrop-blur-xl text-white border border-white/10 hover:border-white/20 rounded-2xl p-5 shadow-[0_8px_30px_rgba(15,23,42,0.15)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.25)] hover:-translate-y-0.5 flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active SIP Trunks
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#cdfb56] text-slate-950 border border-[#0f172a]/30 flex items-center justify-center font-bold">
                <PhoneCall className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white flex items-baseline gap-2">
                <span>14</span>
                <span className="text-base text-slate-400 font-normal">/ 20</span>
              </div>
              <div className="mt-2.5 flex items-center justify-between text-xs">
                <span className="bg-[#cdfb56] text-slate-950 px-2 py-0.5 rounded border border-[#0f172a]/30 font-bold text-[10px]">
                  Carrier Grade QoS
                </span>
                <span className="text-emerald-400 font-bold font-mono">0.02% Jitter</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* 4. MAIN DYNAMIC VIEW CONTENT                                            */}
        {/* ======================================================================= */}
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* Left 8 Cols: Candidate Admissions Lead Triage Hub */}
            <div className="lg:col-span-8 bg-white/75 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
              
              {/* Header & Category Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                <div>
                  <h2 className="text-base font-bold tracking-tight text-slate-950">
                    Candidate Lead Triage & Admissions Docket
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Verified applicant transcripts, eligibility criteria & WhatsApp dispatch
                  </p>
                </div>

                {/* Search in Leads */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search candidate name / phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/70 focus:bg-white/95 backdrop-blur-md text-slate-900 text-xs font-semibold pl-8 pr-3 py-2 rounded-xl border border-slate-900/15 shadow-xs outline-none w-56 placeholder:text-slate-400 transition-colors"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {(
                  [
                    { id: "all", label: "All Applicants (412)" },
                    { id: "interested", label: "Interested (248)" },
                    { id: "call_later", label: "Callback (86)" },
                    { id: "inbound", label: "Direct Inbound (36)" },
                    { id: "not_interested", label: "Not Interested (42)" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer backdrop-blur-md ${
                      selectedCategory === tab.id
                        ? "bg-[#cdfb56] text-slate-950 border border-[#0f172a] shadow-xs"
                        : "bg-white/60 text-slate-700 hover:bg-white/90 border border-slate-900/10 shadow-xs"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Leads Cards Grid */}
              <div className="space-y-3 pt-2">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="border border-slate-900/10 rounded-xl p-4 bg-white/70 hover:bg-white/95 backdrop-blur-md shadow-xs hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#0f172a] text-[#cdfb56] border border-[#0f172a]/30 flex items-center justify-center font-bold text-xs">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                            <span>{lead.name}</span>
                            <span className="text-[10px] font-mono text-slate-500 font-medium">
                              {lead.phone}
                            </span>
                          </div>
                          <div className="text-xs font-medium text-slate-600">
                            {lead.program} • <span className="bg-[#cdfb56] text-slate-950 px-1.5 py-0.2 rounded border border-[#0f172a]/30 font-bold text-[10px]">{lead.score}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="bg-slate-100/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded border border-[#0f172a]/20">
                          {lead.language} ({lead.agent})
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">
                          {lead.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Summary Verbatim */}
                    <div className="text-xs text-slate-700 bg-white/60 border border-slate-200/80 rounded-lg p-2.5 font-normal leading-relaxed backdrop-blur-xs">
                      "{lead.summary}"
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 border border-[#0f172a]/30" />
                        <span>Sentiment: {lead.sentiment}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* WhatsApp Push Button */}
                        <button
                          onClick={() => handleSendWhatsApp(lead.id)}
                          className="bg-white/70 hover:bg-white/95 backdrop-blur-md text-slate-800 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-900/15 shadow-xs cursor-pointer transition-all"
                        >
                          {whatsappSentId === lead.id ? "✓ Sent to WhatsApp" : "Send WhatsApp"}
                        </button>

                        {/* Inspect Call Audio */}
                        <button
                          onClick={() => handleOpenLiveCall()}
                          className="bg-[#0f172a] hover:bg-slate-800 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#0f172a] shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current text-[#cdfb56]" />
                          <span>Inspect Call</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: Speech Fleet Auditions & Quick Controls */}
            <div className="lg:col-span-4 space-y-5">
              
              {/* Interactive Speech Audition Box */}
              <div className="bg-white/75 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-slate-950 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                  <div className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-slate-900">
                    <Headphones className="w-4 h-4 stroke-[2.2]" />
                    <span>Indic Speech Playground</span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#cdfb56] text-slate-950 px-2 py-0.5 rounded border border-[#0f172a]/30">
                    Bulbul V3 TTS
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  Instant live audition for regional accents and speech emotion:
                </p>

                {/* Voice Auditions Grid */}
                <div className="space-y-2">
                  {[
                    { name: "Maya", lang: "Hindi", desc: "Expressive • Admissions Lead", sample: "नमस्ते, एपेक्स इंजीनियरिंग कॉलेज में आपका स्वागत है।" },
                    { name: "Neha", lang: "Telugu", desc: "Warm • Counseling Specialist", sample: "నమస్కారం, క్యాంపస్ కౌన్సెలింగ్ వివరాలు మీకు అందిస్తున్నాము." },
                    { name: "Ananya", lang: "Tamil", desc: "Scholarly • Fee Guidance", sample: "வணக்கம், பி.டெக் கம்ப்யூட்டர் சயின்ஸ் சேர்க்கை விவரங்கள்." },
                    { name: "Ishita", lang: "Kannada", desc: "Clear • Campus Operations", sample: "ನಮಸ್ಕಾರ, ಹಾಸ್ಟೆಲ್ ಹಂಚಿಕೆ ಪ್ರಕ್ರಿಯೆ ಆರಂಭವಾಗಿದೆ." },
                  ].map((v) => (
                    <div
                      key={v.name}
                      onClick={() => toggleVoiceSample(v.name)}
                      className={`border border-slate-900/10 rounded-xl p-3 shadow-xs cursor-pointer transition-all space-y-1 backdrop-blur-sm ${
                        playingVoice === v.name ? "bg-[#cdfb56]/20 border-slate-900/40" : "bg-white/60 hover:bg-white/90"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-md bg-[#0f172a] text-[#cdfb56] border border-[#0f172a]/30 flex items-center justify-center font-bold text-xs">
                            {playingVoice === v.name ? (
                              <Pause className="w-3 h-3 fill-current" />
                            ) : (
                              <Play className="w-3 h-3 fill-current ml-0.5" />
                            )}
                          </div>
                          <span className="font-bold text-xs text-slate-950">{v.name}</span>
                          <span className="text-[10px] bg-[#cdfb56] text-slate-950 font-bold px-1.5 py-0.2 rounded border border-[#0f172a]/30">
                            {v.lang}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {playingVoice === v.name ? "Playing..." : "Tap to Audition"}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-700 italic pl-8">
                        "{v.sample}"
                      </div>
                      {playingVoice === v.name && (
                        <div className="pl-8 pt-1 flex items-center gap-1">
                          <span className="w-1.5 h-3 bg-slate-950 animate-pulse rounded-full" />
                          <span className="w-1.5 h-5 bg-[#0f172a] animate-pulse delay-75 rounded-full" />
                          <span className="w-1.5 h-2 bg-slate-950 animate-pulse delay-150 rounded-full" />
                          <span className="w-1.5 h-4 bg-[#0f172a] animate-pulse delay-100 rounded-full" />
                          <span className="text-[10px] font-mono text-slate-700 pl-1">24kHz PCM Native</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fast Telephony Routing Card */}
              <div className="bg-white/75 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-3.5">
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
                    Live Telephony Channels
                  </h3>
                  <button
                    onClick={() => setActiveTab("trunks")}
                    className="text-[10px] font-bold uppercase bg-[#0f172a] hover:bg-slate-800 text-[#cdfb56] px-2 py-0.5 rounded border border-[#0f172a] cursor-pointer shadow-xs"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-2">
                  {mockTelephonyNumbers.slice(0, 3).map((trunk) => (
                    <div
                      key={trunk.id}
                      className="flex items-center justify-between p-2.5 border border-slate-900/10 rounded-xl bg-white/60 hover:bg-[#cdfb56]/15 backdrop-blur-sm transition-colors shadow-xs"
                    >
                      <div>
                        <div className="font-mono font-bold text-xs text-slate-900">
                          {trunk.phoneNumber}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          {trunk.carrier} • {trunk.region}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-[#cdfb56] text-slate-950 text-[9px] font-bold px-1.5 py-0.2 rounded border border-[#0f172a]/30">
                          {trunk.status.toUpperCase()}
                        </span>
                        <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                          {trunk.activeConcurrency} concurrency
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admissions Yield Metric Callout */}
              <div className="bg-[#0f172a]/90 backdrop-blur-xl text-white border border-white/10 rounded-2xl p-5 shadow-[0_8px_30px_rgba(15,23,42,0.15)] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold uppercase">Autonomous Admissions Yield</span>
                  <span className="text-[#cdfb56] font-bold">98.4% Target</span>
                </div>
                <div className="text-2xl font-black font-mono tracking-tight text-white">
                  92.6% Conversion
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Out of 412 verified applicant calls today, 381 received course brochures, fee waivers, or confirmed campus walk-ins without human intervention.
                </p>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: AI FLEET */}
        {activeTab === "agents" && (
          <div className="bg-white/75 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Campus AI Agent Fleet ({agentsList.length})</h2>
                <p className="text-xs text-slate-500">Autonomous Indic voice personas configured for university admissions and counseling</p>
              </div>
              <button
                onClick={() => setCreateAgentOpen(true)}
                className="bg-[#cdfb56] hover:bg-[#bef03f] backdrop-blur-md text-slate-950 font-bold uppercase text-xs px-4 py-2.5 rounded-xl border border-[#0f172a]/30 shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Deploy New Agent</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agentsList.map((agent) => (
                <div
                  key={agent.id}
                  className="border border-slate-900/10 rounded-2xl p-5 bg-white/70 hover:bg-white/95 backdrop-blur-md shadow-xs hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-[#cdfb56] border border-[#0f172a]/30 flex items-center justify-center font-bold text-sm">
                          {agent.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-950">{agent.name}</h4>
                          <span className="text-[11px] text-slate-500 font-medium">{agent.role}</span>
                        </div>
                      </div>
                      <span className="bg-[#cdfb56] text-slate-950 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-[#0f172a]/30">
                        {agent.status}
                      </span>
                    </div>

                    <div className="text-xs bg-white/60 p-2.5 rounded-xl border border-slate-200/80 text-slate-700 backdrop-blur-xs">
                      "{agent.systemPromptPreview}"
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs pt-1 font-medium">
                      <div className="p-2 border border-slate-200/80 rounded-lg bg-white/60 backdrop-blur-xs">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Voice Model</div>
                        <div className="font-bold text-slate-900 mt-0.5">{agent.voice.name}</div>
                      </div>
                      <div className="p-2 border border-slate-200/80 rounded-lg bg-white/60 backdrop-blur-xs">
                        <div className="text-[10px] text-slate-500 uppercase font-bold">Language</div>
                        <div className="font-bold text-slate-900 mt-0.5">{agent.language}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 text-xs">
                    <span className="font-mono text-slate-500">{agent.assignedNumber}</span>
                    <button
                      onClick={() => handleOpenLiveCall()}
                      className="bg-[#0f172a] text-white hover:bg-slate-800 font-bold uppercase text-[11px] px-3 py-1.5 rounded-xl border border-[#0f172a] shadow-xs transition-colors cursor-pointer"
                    >
                      Test Audio
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CALL LOGS */}
        {activeTab === "calls" && (
          <div className="bg-white/75 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Real-Time Call Records & Transcripts</h2>
                <p className="text-xs text-slate-500">Sub-140ms first byte recordings, audio spectrograms and sentiment logs</p>
              </div>
              <button
                onClick={() => setExportOpen(true)}
                className="bg-[#cdfb56] hover:bg-[#bef03f] backdrop-blur-md text-slate-950 font-bold uppercase text-xs px-4 py-2 rounded-xl border border-[#0f172a]/30 shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Download className="w-4 h-4 stroke-[2]" />
                <span>Export Call Data</span>
              </button>
            </div>

            <div className="space-y-3">
              {mockRecentCalls.map((call) => (
                <div
                  key={call.id}
                  onClick={() => handleOpenLiveCall()}
                  className="border border-slate-900/10 rounded-xl p-4 bg-white/70 hover:bg-white/95 backdrop-blur-md shadow-xs hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0f172a] text-[#cdfb56] border border-[#0f172a]/30 flex items-center justify-center font-bold">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-950 flex items-center gap-2">
                        <span>{call.callerName}</span>
                        <span className="font-mono text-xs text-slate-500 font-normal">({call.callerNumber})</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Assisted by <strong className="text-slate-900">{call.agentName}</strong> • {call.language}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono self-end sm:self-auto">
                    <span className="text-slate-500">{call.duration}</span>
                    <span className="bg-[#cdfb56] text-slate-950 text-xs font-bold px-2.5 py-1 rounded-lg border border-[#0f172a]/30 shadow-xs">
                      {call.status.toUpperCase()}
                    </span>
                    <span className="text-slate-400 font-sans">{call.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CANDIDATES DOCKET */}
        {activeTab === "leads" && (
          <div className="bg-white/75 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">Candidate Admissions Docket</h2>
                <p className="text-xs text-slate-500">Real-time candidate transcript logs, scholarship qualifications & parent queries</p>
              </div>
              <button
                onClick={() => setExportOpen(true)}
                className="bg-[#cdfb56] hover:bg-[#bef03f] backdrop-blur-md text-slate-950 font-bold uppercase text-xs px-4 py-2 rounded-xl border border-[#0f172a]/30 shadow-xs hover:-translate-y-0.5 cursor-pointer"
              >
                Export CSV Docket
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-900/15 rounded-xl shadow-xs backdrop-blur-md">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0f172a]/95 text-white font-bold uppercase border-b border-slate-900/20">
                  <tr>
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Program Applied</th>
                    <th className="p-3">Eligibility Score</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Agent</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 bg-white/70 backdrop-blur-sm">
                  {leadsList.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/95 transition-colors">
                      <td className="p-3 font-bold text-slate-900">
                        {lead.name}
                        <div className="font-mono text-[10px] text-slate-500 font-normal">{lead.phone}</div>
                      </td>
                      <td className="p-3 text-slate-700">{lead.program}</td>
                      <td className="p-3">
                        <span className="bg-[#cdfb56] text-slate-950 px-2 py-0.5 rounded border border-[#0f172a]/30 font-bold text-[11px]">
                          {lead.score}
                        </span>
                      </td>
                      <td className="p-3 capitalize font-bold text-slate-800">{lead.category.replace("_", " ")}</td>
                      <td className="p-3 text-slate-700">{lead.agent} ({lead.language})</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleSendWhatsApp(lead.id)}
                          className="bg-white/80 hover:bg-white text-slate-800 text-[10px] font-bold uppercase px-2.5 py-1 rounded border border-slate-900/15 cursor-pointer shadow-xs"
                        >
                          {whatsappSentId === lead.id ? "Sent" : "WhatsApp"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: TELEMETRY */}
        {activeTab === "telemetry" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Language Breakdown */}
            <div className="bg-white/75 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 border-b border-slate-200/80 pb-2">
                Indic Language Synthesis Breakdown
              </h3>
              <div className="space-y-3">
                {[
                  { lang: "Hindi (हिन्दी)", chars: "840K chars", pct: 35 },
                  { lang: "Telugu (తెలుగు)", chars: "480K chars", pct: 20 },
                  { lang: "Kannada (ಕನ್ನಡ)", chars: "360K chars", pct: 15 },
                  { lang: "Bengali (বাংলা)", chars: "290K chars", pct: 12 },
                  { lang: "Tamil (தமிழ்)", chars: "240K chars", pct: 10 },
                  { lang: "Marathi (मराठी)", chars: "190K chars", pct: 8 },
                ].map((item) => (
                  <div key={item.lang} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{item.lang}</span>
                      <span className="font-mono text-slate-500">{item.chars} ({item.pct}%)</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full overflow-hidden bg-white/60 border border-slate-900/15">
                      <div style={{ width: `${item.pct}%` }} className="h-full bg-[#cdfb56] rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benchmarks */}
            <div className="bg-white/75 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-slate-900 border-b border-slate-200/80 pb-2">
                Turn Latency & WER Benchmarks
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 border border-[#0f172a]/30 rounded-xl bg-[#cdfb56] text-slate-950 shadow-xs">
                  <div className="font-bold">VoicePilot Bulbul V3 vs ElevenLabs Flash</div>
                  <div className="text-[11px] mt-1 text-slate-800">77.95% Preference Win in Indian English & Hindi Accents</div>
                </div>
                <div className="p-3 border border-slate-200/80 rounded-xl bg-white/60 backdrop-blur-xs space-y-1.5 text-slate-700">
                  <div className="font-medium flex justify-between">
                    <span>Average ASR Transcribe Latency</span>
                    <span className="font-mono font-bold text-slate-900">142 ms</span>
                  </div>
                  <div className="font-medium flex justify-between">
                    <span>TTS Synthesis Speed</span>
                    <span className="font-mono font-bold text-slate-900">180 ms</span>
                  </div>
                  <div className="font-medium flex justify-between">
                    <span>WebSocket Transport Overhead</span>
                    <span className="font-mono font-bold text-slate-900">42 ms</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200/80 font-bold flex justify-between text-sm text-slate-900">
                    <span>Total End-to-End Latency</span>
                    <span className="font-mono text-slate-950 bg-[#cdfb56] px-1.5 py-0.5 rounded border border-[#0f172a]/30">382 ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* 5. FOOTER NOTICE                                                        */}
        {/* ======================================================================= */}
        <footer className="bg-white/75 backdrop-blur-xl border border-slate-900/10 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#cdfb56] border border-[#0f172a]/30 animate-pulse" />
            <span className="text-slate-900">VoicePilot AI Operations Command Center • Apex Engineering College</span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>FERPA & DPDP Grounding Active</span>
            <span>•</span>
            <span>Sub-140ms Telephony Online</span>
          </div>
        </footer>

      </div>

      {/* ======================================================================= */}
      {/* 6. MODALS                                                               */}
      {/* ======================================================================= */}
      <CreateAgentModal
        isOpen={createAgentOpen}
        onClose={() => setCreateAgentOpen(false)}
        onAgentCreated={(newAgent) => {
          const fullAgent: DashboardAgent = {
            id: `agent-${Date.now()}`,
            name: newAgent.name || "Custom Agent",
            role: newAgent.role || "Admissions Specialist",
            department: newAgent.department || "Admissions",
            status: "active",
            voice: { name: "Ritu", gender: "Female", accent: "Indian English" },
            language: newAgent.language || "Hindi + English",
            callsToday: 0,
            avgDuration: "0m",
            accuracy: 99.2,
            assignedNumber: "+91 40 4590 1144",
            systemPromptPreview: newAgent.systemPromptPreview || "General Admissions",
            activeLiveCount: 0,
          };
          setAgentsList([fullAgent, ...agentsList]);
          setCreateAgentOpen(false);
        }}
      />

      <ExportReportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
      />

      <LiveCallModal
        call={selectedCall}
        isOpen={liveCallOpen}
        onClose={() => {
          setLiveCallOpen(false);
          setSelectedCall(null);
        }}
      />
    </div>
  );
}
