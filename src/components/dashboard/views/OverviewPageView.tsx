"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Users,
  Radio,
  Clock,
  UserCheck,
  ArrowUpRight,
  Sparkles,
  Upload,
  BookOpen,
  Send,
  AlertTriangle,
  Play,
  FileText,
  Pause,
  Bot,
  ChevronRight,
  CheckCircle2,
  PhoneForwarded,
  BarChart3,
  FileSpreadsheet,
  Activity,
  Layers,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  PhoneIncoming,
  Headphones,
} from "lucide-react";
import { LiveCallItem } from "@/types/dashboard";
import WorkspaceCard from "../WorkspaceCard";

// Modals
import LiveCallModal from "../modals/LiveCallModal";
import StartCampaignModal from "../modals/StartCampaignModal";
import UploadContactsModal from "../modals/UploadContactsModal";
import UploadKnowledgeModal from "../modals/UploadKnowledgeModal";
import CreateAgentModal from "../modals/CreateAgentModal";

// Real mock live calls matching the collegiate specification
const liveConversationsData: LiveCallItem[] = [
  {
    id: "live-call-01",
    callerName: "Rahul Sharma",
    callerNumber: "+91 98401 22340",
    agentId: "agent-admissions",
    agentName: "Maya (Admissions)",
    direction: "inbound",
    durationSeconds: 162,
    durationFormatted: "02:42",
    currentSentiment: "positive",
    intent: "B.Tech CSE (AI & Robotics) Eligibility & 50% Chancellor Scholarship",
    latestSnippet: "Inquired about B.Tech CSE (AI & Robotics) cutoff ranks, eligibility, and reserved campus counseling session.",
    audioWaveLevels: [40, 75, 95, 60, 85, 50, 90, 70, 45, 80, 60, 40],
    startedAt: "10:48 AM",
    latencyMs: 142,
    transcript: [
      { speaker: "caller", text: "Hello, I wanted to enquire about the admission requirements for B.Tech CSE.", time: "00:05" },
      { speaker: "agent", text: "Welcome to Apex Engineering College. Our B.Tech Computer Science admissions are open. What was your score in PCM?", time: "00:15" },
      { speaker: "caller", text: "I scored 94.2% in PCM and have a state CET rank of 4,120.", time: "00:30" },
      { speaker: "agent", text: "With 94.2%, you qualify for our 50% Chancellor Merit Scholarship for CSE (AI & Robotics). Would you like to schedule a campus counseling session?", time: "00:48" },
    ],
  },
  {
    id: "live-call-02",
    callerName: "Priya Sharma",
    callerNumber: "+91 94402 11980",
    agentId: "agent-support",
    agentName: "Neha (Support)",
    direction: "inbound",
    durationSeconds: 78,
    durationFormatted: "01:18",
    currentSentiment: "neutral",
    intent: "Girls' Hostel AC Room Occupancy & Biometric Curfew",
    latestSnippet: "Asking about 2-sharing AC room fees, meal plan options, and biometric campus curfew timings.",
    audioWaveLevels: [30, 60, 80, 45, 70, 85, 40, 65, 50, 75, 40],
    startedAt: "10:49 AM",
    latencyMs: 138,
    transcript: [
      { speaker: "caller", text: "Can you provide details on the girls' hostel rooms and curfew timings?", time: "00:04" },
      { speaker: "agent", text: "Certainly. Apex offers 2-sharing and 3-sharing air-conditioned rooms with biometric access, 24/7 security, and attached dining. Curfew is 8:30 PM.", time: "00:18" },
    ],
  },
  {
    id: "live-call-03",
    callerName: "Ananya Kumar",
    callerNumber: "+91 98840 55120",
    agentId: "agent-admissions",
    agentName: "Maya (Admissions)",
    direction: "outbound",
    durationSeconds: 190,
    durationFormatted: "03:10",
    currentSentiment: "positive",
    intent: "State Sports Quota Fee Concessions (ECE Branch)",
    latestSnippet: "Reviewing eligibility for state athletics gold medalist 25% sports quota fee waiver on college fees.",
    audioWaveLevels: [45, 90, 70, 85, 60, 95, 80, 50, 70, 90, 65, 40],
    startedAt: "10:47 AM",
    latencyMs: 145,
    transcript: [
      { speaker: "agent", text: "Hello Ananya, this is Priya following up from Apex Engineering College regarding your scholarship evaluation.", time: "00:04" },
      { speaker: "caller", text: "Hi! I wanted to check if state-level athletics awards qualify for extra tuition concessions.", time: "00:20" },
      { speaker: "agent", text: "Yes! State gold and silver medalists receive an additional 25% sports quota concession on college fees.", time: "00:36" },
    ],
  },
];

export default function OverviewPageView() {
  const [selectedCall, setSelectedCall] = useState<LiveCallItem | null>(null);
  const [liveCallModalOpen, setLiveCallModalOpen] = useState(false);
  const [startCampaignModalOpen, setStartCampaignModalOpen] = useState(false);
  const [uploadContactsModalOpen, setUploadContactsModalOpen] = useState(false);
  const [uploadKnowledgeModalOpen, setUploadKnowledgeModalOpen] = useState(false);
  const [createAgentModalOpen, setCreateAgentModalOpen] = useState(false);

  const handleOpenCall = (call: LiveCallItem) => {
    setSelectedCall(call);
    setLiveCallModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      {/* ======================================================================= */}
      {/* 1. WORKSPACE HEADER                                                     */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              APEX ENGINEERING COLLEGE • WORKSPACE
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-900 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Autonomous Engine Online
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Operations & Voice Workspace
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Manage AI voice agents, outbound outreach, knowledge vectors, and institutional student communications.
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs transition-all cursor-pointer group"
            title="Return to VoicePilot AI Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
            <span>Landing Page</span>
          </Link>

          <button
            onClick={() => setStartCampaignModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-slate-500" />
            <span>Start Calling</span>
          </button>

          <Link
            href="/dashboard/delegate"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#cdfb56]" />
            <span>Delegate an Outcome</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. COMPACT ACTIVITY METRICS (Meaningful Operational Indicators)        */}
      {/* ======================================================================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Real-Time Activity Snapshot
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Updated just now
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Calls Today */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-4 shadow-xs flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Calls Today
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#f7fee7] border border-[#d9f99d] flex items-center justify-center text-slate-900 shrink-0">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
                248
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                184 answered (74%) • 64 missed
              </span>
            </div>
          </div>

          {/* Contacts Reached */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-4 shadow-xs flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Contacts Reached
              </span>
              <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
                412
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Verified applicants & parents
              </span>
            </div>
          </div>

          {/* Active Calls */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-4 shadow-xs flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Active Calls
              </span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                <Radio className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 flex items-baseline gap-2 font-sans">
                <span>3</span>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                  Live now
                </span>
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Sub-140ms first-byte stream
              </span>
            </div>
          </div>

          {/* Staff Handoffs */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-4 shadow-xs flex flex-col justify-between transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Staff Handoffs
              </span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                <PhoneForwarded className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
                12
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                4.8% escalation (Target &lt; 6%)
              </span>
            </div>
          </div>

          {/* Average Call Duration */}
          <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-4 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">
                Avg Call Duration
              </span>
              <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">
                3m 11s
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                14s faster vs human desk
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 3. AUTONOMOUS WORK CARD                                                 */}
      {/* ======================================================================= */}
      <div className="relative rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs overflow-hidden">
        {/* Subtle accent highlight band on top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#cdfb56] via-emerald-400 to-[#8ac926]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                ACTIVE AUTONOMOUS WORKFORCE DISPATCH
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Goal in Progress
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              September Follow-up & Merit Scholarship Verification
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Maya AI & Neha AI are autonomously calling 1,240 applicants with PCM &gt; 90% to confirm campus counseling attendance, calculate tuition waivers, and answer hostel queries.
            </p>

            {/* Live Progress Bar */}
            <div className="space-y-1.5 pt-2 max-w-lg">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700">Goal Progress (842 / 1,240 Contacts Processed)</span>
                <span className="font-mono text-slate-900 font-bold">68%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                <div
                  className="h-full bg-slate-900 rounded-full transition-all duration-500"
                  style={{ width: "68%" }}
                />
              </div>
            </div>
          </div>

          {/* Key Outcome Yields & Quick Route */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:min-w-[240px]">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Outcomes Generated
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Counseling Booked:</span>
                <strong className="text-slate-900 font-bold font-mono">182</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Counselor Transfers:</span>
                <strong className="text-slate-900 font-bold font-mono">12</strong>
              </div>
            </div>

            <Link
              href="/dashboard/delegate"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs hover:shadow transition-all text-center"
            >
              <span>Delegate New Outcome</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#cdfb56]" />
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 4. WORKSPACE / FOLDER CARDS (The 8 Major Workspaces)                    */}
      {/* ======================================================================= */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Workspace Modules & Folders
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select a folder to enter its dedicated operational workspace
            </p>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            8 Workspaces Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: CALLS */}
          <WorkspaceCard
            name="Calls"
            href="/dashboard/calls"
            icon={PhoneCall}
            description="Conversations handled by your AI agents with verbatim transcripts & audio."
            metric="248 today"
            metricLabel="184 answered • 64 missed"
            status="3 live"
            statusType="live"
            actionLabel="View calls →"
          />

          {/* Card 2: CAMPAIGNS */}
          <WorkspaceCard
            name="Campaigns"
            href="/dashboard/campaigns"
            icon={Send}
            description="Autonomous batch calling & outreach workflows for admissions & fees."
            metric="2 running"
            metricLabel="1,240 contacts in queue"
            status="68% progress"
            statusType="running"
            actionLabel="View campaigns →"
          />

          {/* Card 3: CONTACTS */}
          <WorkspaceCard
            name="Contacts"
            href="/dashboard/contacts"
            icon={Users}
            description="Applicant directories, PCM qualification scoring & conversation history."
            metric="1,840 verified"
            metricLabel="412 reached today"
            status="Directory active"
            statusType="ready"
            actionLabel="View contacts →"
          />

          {/* Card 4: AI AGENTS */}
          <WorkspaceCard
            name="AI Agents"
            href="/dashboard/agents"
            icon={Bot}
            description="Autonomous multilingual voice personas and prompt instructions."
            metric="3 active"
            metricLabel="Maya (Hindi), Neha (Telugu), Vikram (Eng)"
            status="99.4% accuracy"
            statusType="ready"
            actionLabel="Manage agents →"
          />

          {/* Card 5: KNOWLEDGE */}
          <WorkspaceCard
            name="Knowledge"
            href="/dashboard/knowledge"
            icon={BookOpen}
            description="Institutional brochures, cutoff matrices & zero-hallucination RAG."
            metric="8 indexed docs"
            metricLabel="140 vector embedding chunks"
            status="Vectorized"
            statusType="ready"
            actionLabel="Explore knowledge →"
          />

          {/* Card 6: ANALYTICS */}
          <WorkspaceCard
            name="Analytics"
            href="/dashboard/analytics"
            icon={BarChart3}
            description="Latency benchmarks, caller sentiments & candidate qualification yield."
            metric="142ms latency"
            metricLabel="Sub-150ms first-byte stream"
            status="92.4% positive"
            statusType="ready"
            actionLabel="Open analytics →"
          />

          {/* Card 7: REPORTS */}
          <WorkspaceCard
            name="Reports"
            href="/dashboard/reports"
            icon={FileSpreadsheet}
            description="Export daily call summaries, transcripts & audit-ready CSV/Excel logs."
            metric="Daily call report"
            metricLabel="Transcripts & telemetry ready"
            status="CSV / Excel export"
            statusType="ready"
            actionLabel="Export reports →"
          />

          {/* Card 8: PHONE NUMBERS */}
          <WorkspaceCard
            name="Phone Numbers"
            href="/dashboard/phone-numbers"
            icon={Radio}
            description="Inbound DID numbers, SIP trunking & regional carrier routes."
            metric="+91 40 4590 1199"
            metricLabel="30 concurrent SIP channels"
            status="Telephony live"
            statusType="live"
            actionLabel="Manage telephony →"
          />
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 5. RECENT ACTIVITY & ATTENTION DOCKET                                   */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT (7 cols): LIVE CONVERSATIONS STREAM */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="font-bold text-sm text-slate-900">
                  Live Conversations & Recent Sessions
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Active audio streams currently handled by autonomous AI voice agents
              </p>
            </div>

            <Link
              href="/dashboard/calls"
              className="text-xs font-semibold text-slate-600 hover:text-slate-950 flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Live Call Items */}
          <div className="space-y-3">
            {liveConversationsData.map((call) => (
              <div
                key={call.id}
                onClick={() => handleOpenCall(call)}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50/70 hover:border-slate-300 transition-all cursor-pointer space-y-2 group shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {call.callerName ? call.callerName.charAt(0) : "C"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-slate-950">
                          {call.callerName}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {call.callerNumber}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        Assigned: <strong className="text-slate-800 font-semibold">{call.agentName}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {/* Audio Waveform Animation Indicator with light green */}
                    <div className="hidden sm:flex items-center gap-0.5 h-4">
                      <span className="w-0.5 h-2 bg-emerald-500 rounded-full animate-audio-bar-1" />
                      <span className="w-0.5 h-3.5 bg-emerald-500 rounded-full animate-audio-bar-2" />
                      <span className="w-0.5 h-2.5 bg-emerald-500 rounded-full animate-audio-bar-3" />
                      <span className="w-0.5 h-4 bg-emerald-500 rounded-full animate-audio-bar-4" />
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-700">
                      {call.durationFormatted}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Stream
                    </span>
                  </div>
                </div>

                {/* Latest snippet */}
                <div className="text-[11px] text-slate-700 bg-slate-50 border border-slate-200/70 rounded-lg px-2.5 py-1.5 font-normal flex items-center justify-between">
                  <span className="truncate">"{call.latestSnippet}"</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight ml-2 shrink-0 group-hover:text-slate-950">
                    Inspect Call →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT (5 cols): ATTENTION / REQUIRED ACTIONS DOCKET */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Action Required & Docket
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Items requiring institutional staff action or review
              </p>
            </div>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
              3 items
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Attention Item 1: 12 conversations need staff follow-up */}
            <div className="p-3 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                  <PhoneForwarded className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    12 conversations need staff follow-up.
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Transferred or callback requested by parents
                  </span>
                </div>
              </div>
              <Link
                href="/dashboard/calls"
                className="text-[11px] font-semibold text-slate-800 hover:text-slate-950 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 bg-white transition-colors shrink-0 shadow-2xs"
              >
                Review
              </Link>
            </div>

            {/* Attention Item 2: 1 knowledge document is processing */}
            <div className="p-3 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Hostel Rules & Curfews processing.
                  </span>
                  <span className="text-[11px] text-slate-500">
                    84% vectorized • 210 chunks
                  </span>
                </div>
              </div>
              <Link
                href="/dashboard/knowledge"
                className="text-[11px] font-semibold text-slate-800 hover:text-slate-950 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 bg-white transition-colors shrink-0 shadow-2xs"
              >
                Check
              </Link>
            </div>

            {/* Attention Item 3: September Student Follow-up */}
            <div className="p-3 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#f7fee7] border border-[#d9f99d] text-slate-900 flex items-center justify-center shrink-0">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Admissions campaign at 68% milestone.
                  </span>
                  <span className="text-[11px] text-slate-500">
                    842 / 1,240 applicants reached
                  </span>
                </div>
              </div>
              <Link
                href="/dashboard/campaigns"
                className="text-[11px] font-semibold text-slate-800 hover:text-slate-950 hover:bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 bg-white transition-colors shrink-0 shadow-2xs"
              >
                Inspect
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <LiveCallModal
        isOpen={liveCallModalOpen}
        onClose={() => setLiveCallModalOpen(false)}
        call={selectedCall}
      />
      <StartCampaignModal
        isOpen={startCampaignModalOpen}
        onClose={() => setStartCampaignModalOpen(false)}
      />
      <UploadContactsModal
        isOpen={uploadContactsModalOpen}
        onClose={() => setUploadContactsModalOpen(false)}
      />
      <UploadKnowledgeModal
        isOpen={uploadKnowledgeModalOpen}
        onClose={() => setUploadKnowledgeModalOpen(false)}
      />
      <CreateAgentModal
        isOpen={createAgentModalOpen}
        onClose={() => setCreateAgentModalOpen(false)}
      />
    </div>
  );
}
