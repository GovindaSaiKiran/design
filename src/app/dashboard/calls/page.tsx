"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Search,
  Filter,
  Download,
  Play,
  Pause,
  Clock,
  User,
  Radio,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  PhoneForwarded,
  PhoneMissed,
  ArrowUpRight,
  Eye,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import ExportReportModal from "@/components/dashboard/modals/ExportReportModal";
import { LiveCallItem, CallOutcome } from "@/types/dashboard";

interface CallRow {
  id: string;
  name: string;
  phone: string;
  intent: string;
  agent: string;
  language: string;
  duration: string;
  status: "live" | "completed" | "transferred" | "missed";
  sentiment: "positive" | "neutral" | "urgent";
  timestamp: string;
  outcome: CallOutcome;
  qualification: string;
  transcriptSnippet: string;
}

const mockCallsData: CallRow[] = [
  {
    id: "call-01",
    name: "Rahul Verma",
    phone: "+91 98401 22340",
    intent: "B.Tech CSE AI Specialization & Merit Scholarships",
    agent: "Maya (Admissions)",
    language: "English + Hindi",
    duration: "02:42",
    status: "live",
    sentiment: "positive",
    timestamp: "Just now (Live)",
    outcome: "Interested",
    qualification: "PCM 94.2% • High Intent",
    transcriptSnippet: "Inquired about 50% Chancellor Merit Scholarship and reserved campus counseling session.",
  },
  {
    id: "call-02",
    name: "Priya Sharma",
    phone: "+91 94402 11980",
    intent: "Girls' Hostel Allotment & Campus Security",
    agent: "Neha (Support)",
    language: "English + Telugu",
    duration: "01:18",
    status: "live",
    sentiment: "neutral",
    timestamp: "1 min ago (Live)",
    outcome: "Completed",
    qualification: "Hostel Needed • Verified",
    transcriptSnippet: "Asked about 2-sharing AC rooms, dining plans, and biometric campus curfew timings.",
  },
  {
    id: "call-03",
    name: "Ananya Kumar",
    phone: "+91 98840 55120",
    intent: "Sports Quota Fee Concessions (ECE Branch)",
    agent: "Maya (Admissions)",
    language: "English + Hindi",
    duration: "03:10",
    status: "live",
    sentiment: "positive",
    timestamp: "2 min ago (Live)",
    outcome: "Interested",
    qualification: "State Gold Medalist • High Intent",
    transcriptSnippet: "Reviewing eligibility for additional 25% sports quota concession on college fees.",
  },
  {
    id: "call-04",
    name: "Vikram Malhotra",
    phone: "+91 98401 77120",
    intent: "B.Tech Robotics & Autonomous Systems Eligibility",
    agent: "Maya (Admissions)",
    language: "English + Hindi",
    duration: "02:43",
    status: "completed",
    sentiment: "positive",
    timestamp: "12 min ago",
    outcome: "Interested",
    qualification: "PCM 91.5% • Qualified",
    transcriptSnippet: "Confirmed counseling visit for this Saturday at 10:30 AM with parents.",
  },
  {
    id: "call-05",
    name: "Anita Roy",
    phone: "+91 98765 11980",
    intent: "Lateral Entry 2nd-Year Diploma Seat Conversion",
    agent: "Neha (Support)",
    language: "English + Telugu",
    duration: "01:21",
    status: "transferred",
    sentiment: "urgent",
    timestamp: "18 min ago",
    outcome: "Human Handoff",
    qualification: "Diploma 88% • Escalated",
    transcriptSnippet: "Transferred to Senior Admissions Dean for lateral diploma credit evaluation.",
  },
  {
    id: "call-06",
    name: "Ramesh Chandran",
    phone: "+91 90032 44510",
    intent: "Entrance Exam Scorecard Verification Reminder",
    agent: "Vikram (EdTech)",
    language: "English",
    duration: "00:45",
    status: "missed",
    sentiment: "neutral",
    timestamp: "34 min ago",
    outcome: "No Answer",
    qualification: "Unreachable • Queued Retry",
    transcriptSnippet: "Automated retry scheduled for 3:00 PM today.",
  },
  {
    id: "call-07",
    name: "Deepika Sen",
    phone: "+91 91760 88231",
    intent: "100% Chancellor Scholarship Online Submission",
    agent: "Maya (Admissions)",
    language: "English + Hindi",
    duration: "03:15",
    status: "completed",
    sentiment: "positive",
    timestamp: "45 min ago",
    outcome: "Completed",
    qualification: "PCM 96.8% • Top Scholar",
    transcriptSnippet: "Guided through document upload checklist on the online collegiate portal.",
  },
  {
    id: "call-08",
    name: "Gaurav Joshi",
    phone: "+91 98840 33219",
    intent: "Campus Bus Route & Transport Subsidy",
    agent: "Neha (Support)",
    language: "English + Telugu",
    duration: "01:54",
    status: "completed",
    sentiment: "neutral",
    timestamp: "1 hour ago",
    outcome: "Callback Requested",
    qualification: "Enrolled Student • Follow-up",
    transcriptSnippet: "Requested callback at 5:30 PM regarding pickup timings from Secunderabad.",
  },
];

export default function CallsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [agentFilter, setAgentFilter] = useState<string>("all");
  const [selectedCall, setSelectedCall] = useState<LiveCallItem | null>(null);
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const filteredCalls = useMemo(() => {
    return mockCallsData.filter((call) => {
      const matchesSearch =
        call.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.phone.includes(searchQuery) ||
        call.intent.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "live" && call.status === "live") ||
        (statusFilter === "completed" && call.status === "completed") ||
        (statusFilter === "transferred" && call.status === "transferred") ||
        (statusFilter === "missed" && call.status === "missed");

      const matchesAgent =
        agentFilter === "all" || call.agent.toLowerCase().includes(agentFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesAgent;
    });
  }, [searchQuery, statusFilter, agentFilter]);

  const handleInspect = (call: CallRow) => {
    const liveCallObj: LiveCallItem = {
      id: call.id,
      callerNumber: call.phone,
      callerName: call.name,
      agentId: "agent-admissions",
      agentName: call.agent,
      direction: call.status === "missed" ? "outbound" : "inbound",
      durationSeconds: 162,
      durationFormatted: call.duration,
      currentSentiment: call.sentiment === "positive" ? "positive" : call.sentiment === "urgent" ? "urgent" : "neutral",
      intent: call.intent,
      latestSnippet: call.transcriptSnippet,
      audioWaveLevels: [45, 80, 95, 60, 90, 50, 85, 70, 45, 80, 60, 40],
      startedAt: call.timestamp,
      latencyMs: 142,
      transcript: [
        { speaker: "caller", text: `Hello, inquiring regarding ${call.intent}.`, time: "00:04" },
        { speaker: "agent", text: `Welcome to Apex Engineering College. I can provide details and check eligibility.`, time: "00:14" },
        { speaker: "caller", text: call.transcriptSnippet, time: "00:28" },
      ],
    };
    setSelectedCall(liveCallObj);
    setLiveModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[11px] font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase transition-colors"
            >
              WORKSPACES
            </Link>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-950 bg-[#cdfb56]/30 px-2.5 py-0.5 rounded-full border border-[#cdfb56]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926] animate-pulse" />
              Live Telephony Engine
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Calls Workspace
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Real-time conversation logs, audio stream spectrography, qualification tags, and speaker transcripts.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setExportModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#f7fee7] text-slate-800 hover:text-slate-950 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 hover:border-[#cdfb56] shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => handleInspect(mockCallsData[0])}
            className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-lg border border-[#bceb42] shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
            <span>Monitor Live Call</span>
          </button>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Live Inbound"
          icon={Radio}
          description="Active calls streaming with sub-140ms first-byte response time."
          metric="3 streaming"
          metricLabel="All lines answering within 1 ring"
          status="Live now"
          statusType="live"
          actionLabel="Inspect active →"
          onClick={() => handleInspect(mockCallsData[0])}
        />

        <WorkspaceCard
          name="Handled Today"
          icon={PhoneCall}
          description="Total conversations processed across all institutional departments."
          metric="248 calls"
          metricLabel="184 answered • 64 missed"
          status="98.4% uptime"
          statusType="ready"
          actionLabel="Filter answered →"
          onClick={() => setStatusFilter("completed")}
        />

        <WorkspaceCard
          name="Staff Escalations"
          icon={PhoneForwarded}
          description="Warm transfers directed to human admissions deans and counselors."
          metric="12 handoffs"
          metricLabel="4.8% handoff rate (Optimized)"
          status="All resolved"
          statusType="ready"
          actionLabel="View handoffs →"
          onClick={() => setStatusFilter("transferred")}
        />

        <WorkspaceCard
          name="Average Duration"
          icon={Clock}
          description="Mean length per conversation across automated triage workflows."
          metric="3m 11s"
          metricLabel="14s faster vs traditional desk"
          status="High resolution"
          statusType="running"
          actionLabel="View analytics →"
          href="/dashboard/analytics"
        />
      </div>

      {/* ======================================================================= */}
      {/* FILTER & SEARCH BAR                                                     */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Calls", count: mockCallsData.length },
              { id: "live", label: "Live (3)", count: 3, isLive: true },
              { id: "completed", label: "Completed", count: 3 },
              { id: "transferred", label: "Transferred", count: 1 },
              { id: "missed", label: "Missed", count: 1 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? "bg-[#cdfb56] text-slate-950 border border-[#bceb42] shadow-2xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                {tab.isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926] animate-pulse" />
                )}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search & Agent Selector */}
          <div className="flex items-center gap-2 flex-1 md:max-w-md justify-end">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student, phone or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/70 border border-slate-200/90 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#cdfb56] focus:border-[#cdfb56] transition-all placeholder:text-slate-400"
              />
            </div>

            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="text-xs bg-slate-50/70 border border-slate-200/90 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-[#cdfb56] cursor-pointer"
            >
              <option value="all">All Agents</option>
              <option value="Maya">Maya (Admissions)</option>
              <option value="Neha">Neha (Support)</option>
              <option value="Vikram">Vikram (EdTech)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* CALLS DATA TABLE                                                        */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Table Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/70 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recorded & Live Transcripts
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              ({filteredCalls.length} records)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Click any row to inspect audio waveform & transcript
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/40 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Contact / Student</th>
                <th className="py-3 px-4">Purpose & Intent</th>
                <th className="py-3 px-4">AI Agent</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Qualification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No calls match your search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCalls.map((call) => (
                  <tr
                    key={call.id}
                    onClick={() => handleInspect(call)}
                    className="hover:bg-[#f7fee7]/30 transition-colors cursor-pointer group"
                  >
                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 group-hover:text-slate-950 flex items-center gap-1.5">
                        <span>{call.name}</span>
                        {call.status === "live" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926] animate-pulse" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {call.phone}
                      </div>
                    </td>

                    {/* Purpose */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-medium text-slate-800 truncate">
                        {call.intent}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {call.transcriptSnippet}
                      </div>
                    </td>

                    {/* Agent */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {call.agent}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {call.language}
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-700">
                      {call.duration}
                      <span className="text-[10px] text-slate-400 block font-sans">
                        {call.timestamp}
                      </span>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {call.status === "live" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#cdfb56]/40 text-slate-950 px-2 py-0.5 rounded-full border border-[#cdfb56]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926] animate-pulse" />
                          Live Stream
                        </span>
                      ) : call.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#8ac926]" />
                          Completed
                        </span>
                      ) : call.status === "transferred" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                          <PhoneForwarded className="w-2.5 h-2.5 text-amber-600" />
                          Handoff
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">
                          <PhoneMissed className="w-2.5 h-2.5 text-slate-400" />
                          No Answer
                        </span>
                      )}
                    </td>

                    {/* Qualification */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-[11px] font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80">
                        {call.qualification}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspect(call);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-[#cdfb56] text-slate-800 hover:text-slate-950 border border-slate-200 hover:border-[#bceb42] shadow-2xs transition-all cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <LiveCallModal
        isOpen={liveModalOpen}
        onClose={() => setLiveModalOpen(false)}
        call={selectedCall}
      />
      <ExportReportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </div>
  );
}
