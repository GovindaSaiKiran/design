"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Zap,
  PhoneIncoming,
  PhoneOutgoing,
  X,
  SlidersHorizontal,
  Bot,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import ExportReportModal from "@/components/dashboard/modals/ExportReportModal";
import TestCallModal from "@/components/dashboard/modals/TestCallModal";
import CallDrawer from "@/components/dashboard/views/CallDrawer";
import { LiveCallItem, RecentCallRecord, CallOutcome } from "@/types/dashboard";
import { mockRecentCalls } from "@/data/mock/dashboardData";

interface CallRow {
  id: string;
  name: string;
  phone: string;
  intent: string;
  agent: string;
  language: string;
  duration: string;
  direction: "inbound" | "outbound";
  status: "live" | "completed" | "transferred" | "missed";
  sentiment: "positive" | "neutral" | "urgent";
  timestamp: string;
  outcome: CallOutcome;
  qualification: string;
  transcriptSnippet: string;
}

// Pre-populate with realistic call sessions from mockRecentCalls
const initialCallsData: CallRow[] = mockRecentCalls.map((c) => ({
  id: c.id,
  name: c.contactName || "Caller",
  phone: c.contactNumber,
  intent: c.summary,
  agent: c.agentName,
  language: "Hindi + English",
  duration: c.duration,
  direction: c.direction,
  status: c.outcome === "Human Handoff" ? "transferred" : "completed",
  sentiment: c.sentimentScore && c.sentimentScore > 90 ? "positive" : c.sentimentScore && c.sentimentScore > 80 ? "neutral" : "urgent",
  timestamp: c.timestamp,
  outcome: c.outcome,
  qualification: c.qualification || "Qualified",
  transcriptSnippet: c.transcriptSnippet,
}));

function CallsPageContent() {
  const searchParams = useSearchParams();
  const [directionFilter, setDirectionFilter] = useState<"all" | "inbound" | "outbound">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [agentFilter, setAgentFilter] = useState<string>("all");
  const [selectedCall, setSelectedCall] = useState<RecentCallRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [callsList, setCallsList] = useState<CallRow[]>(initialCallsData);

  // Sync direction filter from URL query param
  useEffect(() => {
    const dir = searchParams.get("direction");
    if (dir === "inbound" || dir === "outbound") {
      setDirectionFilter(dir);
    } else if (dir === "all") {
      setDirectionFilter("all");
    }
  }, [searchParams]);

  const filteredCalls = useMemo(() => {
    return callsList.filter((call) => {
      const matchesDirection =
        directionFilter === "all" || call.direction === directionFilter;

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

      return matchesDirection && matchesSearch && matchesStatus && matchesAgent;
    });
  }, [callsList, searchQuery, statusFilter, agentFilter, directionFilter]);

  const handleInspect = (call?: CallRow) => {
    if (!call) return;
    const record: RecentCallRecord = {
      id: call.id,
      contactNumber: call.phone,
      contactName: call.name,
      agentName: call.agent,
      direction: call.direction,
      duration: call.duration,
      durationSeconds: 162,
      outcome: call.outcome,
      timestamp: call.timestamp,
      timeAgo: call.timestamp,
      summary: call.transcriptSnippet,
      sentimentScore: call.sentiment === "positive" ? 94 : call.sentiment === "urgent" ? 65 : 85,
      qualification: call.qualification,
      transcriptSnippet: call.transcriptSnippet,
      audioRecordingUrl: "https://actions.google.com/sounds/v1/speech/female_affirmation.ogg",
    };
    setSelectedCall(record);
    setDrawerOpen(true);
  };

  const inboundCount = callsList.filter((c) => c.direction === "inbound").length;
  const outboundCount = callsList.filter((c) => c.direction === "outbound").length;

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-black/45 hover:text-black transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] bg-[#BCD0F5] px-3 py-0.5 rounded-full">
              Conversations &amp; Transcripts
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Call Transcripts &amp; Recordings
          </h1>

          <p className="text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Review acoustic transcripts, audio waveform playback, speaker turns, extracted parameters, and verified carrier handoffs.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setExportModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-semibold px-4 py-2.5 rounded-full border border-black/[0.06] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-black/50" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setTestModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
          >
            <Radio className="w-3.5 h-3.5 text-white" />
            <span>Test a Call</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Total Conversations"
          icon={PhoneCall}
          description="Processed across all active AI voice agents today."
          metric={`${callsList.length} calls`}
          metricLabel={`${inboundCount} inbound • ${outboundCount} outbound`}
          status="All Operational"
          statusType="ready"
          actionLabel="View all calls →"
          onClick={() => {
            setDirectionFilter("all");
            setStatusFilter("all");
          }}
        />

        <WorkspaceCard
          name="Inbound Concierge"
          icon={PhoneIncoming}
          description="Direct calls handled with sub-400ms turn-around time."
          metric={`${inboundCount} calls`}
          metricLabel="100% answer rate"
          status="Active Route"
          statusType="ready"
          actionLabel="Filter Inbound →"
          onClick={() => setDirectionFilter("inbound")}
        />

        <WorkspaceCard
          name="Outbound Campaigns"
          icon={PhoneOutgoing}
          description="Autonomous verification and cadence outreach calls."
          metric={`${outboundCount} calls`}
          metricLabel="Zero manual dialing"
          status="Standby"
          statusType="neutral"
          actionLabel="Filter Outbound →"
          onClick={() => setDirectionFilter("outbound")}
        />

        <WorkspaceCard
          name="Average Duration"
          icon={Clock}
          description="Mean length per conversation across all departments."
          metric="2m 14s"
          metricLabel="Hindi, Telugu, English"
          status="Optimal SLA"
          statusType="ready"
          actionLabel="View minutes →"
          href="/dashboard/billing"
        />
      </div>

      {/* Direction & Status Filter Tabs Bar */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-4 space-y-3.5 shadow-2xs">
        {/* Top Filter Row: Inbound vs Outbound Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-black/50">
              Call Direction:
            </span>
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#FBF7ED] border border-black/[0.06]">
              <button
                onClick={() => setDirectionFilter("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  directionFilter === "all"
                    ? "bg-[#111111] text-white shadow-sm"
                    : "text-black/60 hover:text-black"
                }`}
              >
                All ({callsList.length})
              </button>

              <button
                onClick={() => setDirectionFilter("inbound")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  directionFilter === "inbound"
                    ? "bg-[#111111] text-white shadow-sm"
                    : "text-black/60 hover:text-black"
                }`}
              >
                <PhoneIncoming className="w-3.5 h-3.5" />
                <span>Inbound ({inboundCount})</span>
              </button>

              <button
                onClick={() => setDirectionFilter("outbound")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  directionFilter === "outbound"
                    ? "bg-[#111111] text-white shadow-sm"
                    : "text-black/60 hover:text-black"
                }`}
              >
                <PhoneOutgoing className="w-3.5 h-3.5" />
                <span>Outbound ({outboundCount})</span>
              </button>
            </div>
          </div>

          {directionFilter !== "all" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-black/50">
                Filtered by:{" "}
                <strong className="text-[#1A1A1A] capitalize">
                  {directionFilter}
                </strong>
              </span>
              <button
                onClick={() => setDirectionFilter("all")}
                className="text-xs text-[#1A1A1A] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
              >
                <X className="w-3 h-3" />
                <span>Clear filter</span>
              </button>
            </div>
          )}
        </div>

        {/* Second Filter Row: Status Tabs + Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "All Statuses" },
              { id: "completed", label: "Completed" },
              { id: "transferred", label: "Transferred / Escalated" },
              { id: "missed", label: "Missed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-[#111111] text-white shadow-sm"
                    : "bg-[#FBF7ED] text-black/60 hover:text-black border border-black/[0.06]"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search & Agent Selector */}
          <div className="flex items-center gap-2 flex-1 md:max-w-md justify-end">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search caller, phone or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all placeholder:text-black/40"
              />
            </div>

            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full px-4 py-2 text-[#1A1A1A] font-medium focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer"
            >
              <option value="all">All Agents</option>
              <option value="Maya">Maya (Admissions)</option>
              <option value="Priya">Priya (Finance)</option>
              <option value="Arjun">Arjun (Outreach)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calls Data Table */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] overflow-hidden shadow-2xs">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1A1A1A]">
              Conversation History
            </span>
            <span className="text-xs text-black/45 font-medium">
              ({filteredCalls.length} records)
            </span>
          </div>
          <span className="text-xs text-black/50 hidden sm:inline">
            Click any row to inspect audio, transcript &amp; extracted fields
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-5">Contact / Phone</th>
                <th className="py-3 px-5">Direction</th>
                <th className="py-3 px-5">Topic &amp; Inquired Details</th>
                <th className="py-3 px-5">AI Agent</th>
                <th className="py-3 px-5">Duration</th>
                <th className="py-3 px-5">Outcome</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3 font-sans">
                      <div className="w-12 h-12 rounded-full bg-[#BCD0F5] text-[#1E3A8A] flex items-center justify-center mx-auto">
                        <PhoneCall className="w-6 h-6 text-[#1E3A8A]" />
                      </div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">
                        No {directionFilter !== "all" ? directionFilter : ""} calls found
                      </h3>
                      <p className="text-xs text-black/55 leading-relaxed">
                        No calls matched your filter criteria. Try resetting the filters or initiate a test simulation.
                      </p>
                      <button
                        onClick={() => setTestModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-sm"
                      >
                        <Radio className="w-3.5 h-3.5 text-white" />
                        <span>Run Test Call</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCalls.map((call) => (
                  <tr
                    key={call.id}
                    onClick={() => handleInspect(call)}
                    className="hover:bg-black/[0.015] transition-colors cursor-pointer group text-[#1A1A1A]"
                  >
                    <td className="py-4 px-5">
                      <div className="font-semibold text-[#1A1A1A] flex items-center gap-2">
                        <span>{call.name}</span>
                        {call.status === "live" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16856B] animate-pulse" />
                        )}
                      </div>
                      <div className="text-[11px] text-black/50 mt-0.5">
                        {call.phone}
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium ${
                          call.direction === "inbound"
                            ? "bg-[#BCD0F5] text-[#1E3A8A]"
                            : "bg-[#FFD9A0] text-[#733F00]"
                        }`}
                      >
                        {call.direction === "inbound" ? (
                          <>
                            <PhoneIncoming className="w-3 h-3 text-[#1E3A8A]" />
                            <span>Inbound</span>
                          </>
                        ) : (
                          <>
                            <PhoneOutgoing className="w-3 h-3 text-[#733F00]" />
                            <span>Outbound</span>
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-4 px-5 max-w-xs">
                      <div className="font-medium text-[#1A1A1A] truncate">
                        {call.intent}
                      </div>
                      <div className="text-[11px] text-black/50 truncate mt-0.5">
                        {call.transcriptSnippet}
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#1A1A1A] bg-[#FBF7ED] px-3 py-0.5 rounded-full border border-black/[0.06]">
                        <Bot className="w-3 h-3 text-black/50" />
                        <span>{call.agent}</span>
                      </span>
                      <div className="text-[10px] text-black/45 mt-0.5">
                        {call.language}
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap text-[#1A1A1A]">
                      <span className="font-medium">{call.duration}</span>
                      <span className="text-[11px] text-black/45 block mt-0.5">
                        {call.timestamp}
                      </span>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      {call.status === "completed" ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#C1F2D5] text-[#0D593F] px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-[#16856B]" />
                          {call.outcome}
                        </span>
                      ) : call.status === "transferred" ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#FFD9A0] text-[#733F00] px-2.5 py-0.5 rounded-full">
                          <PhoneForwarded className="w-3 h-3 text-[#733F00]" />
                          {call.outcome}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-black/[0.04] text-black/60 px-2.5 py-0.5 rounded-full">
                          <PhoneMissed className="w-3 h-3 text-black/50" />
                          No Answer
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspect(call);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] transition-all cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-black/50" />
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

      {/* Swaram Call Detail Drawer */}
      <CallDrawer
        call={selectedCall}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <ExportReportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />

      <TestCallModal
        isOpen={testModalOpen}
        onClose={() => setTestModalOpen(false)}
      />
    </div>
  );
}

export default function CallsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-[#64748B] text-xs">
          Loading conversation ledger...
        </div>
      }
    >
      <CallsPageContent />
    </Suspense>
  );
}
