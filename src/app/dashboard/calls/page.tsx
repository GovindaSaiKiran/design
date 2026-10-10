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
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import ExportReportModal from "@/components/dashboard/modals/ExportReportModal";
import TestCallModal from "@/components/dashboard/modals/TestCallModal";
import CallDrawer from "@/components/dashboard/views/CallDrawer";
import { LiveCallItem, RecentCallRecord, CallOutcome } from "@/types/dashboard";

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

const mockCallsData: CallRow[] = [];

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

  // Sync direction filter from URL query param (e.g. ?direction=inbound or ?direction=outbound)
  useEffect(() => {
    const dir = searchParams.get("direction");
    if (dir === "inbound" || dir === "outbound") {
      setDirectionFilter(dir);
    } else if (dir === "all") {
      setDirectionFilter("all");
    }
  }, [searchParams]);

  const filteredCalls = useMemo(() => {
    return mockCallsData.filter((call) => {
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
  }, [searchQuery, statusFilter, agentFilter, directionFilter]);

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
      sentimentScore: call.sentiment === "positive" ? 92 : call.sentiment === "urgent" ? 45 : 75,
      qualification: "High Intent",
      transcriptSnippet: call.transcriptSnippet,
      audioRecordingUrl: "https://actions.google.com/sounds/v1/ambiences/office.ogg",
    };
    setSelectedCall(record);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 select-none font-sans animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-purple-100">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[11px] font-bold tracking-wider text-purple-700 hover:text-purple-900 uppercase transition-colors"
            >
              SWARAM DASHBOARD
            </Link>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-purple-900 bg-purple-100/70 px-2.5 py-0.5 rounded-full border border-purple-200">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
              Acoustic Call Transcripts & Telemetry
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
            Call History & Recordings
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Review live dual transcripts, inspect audio recordings, extracted lead variables, and WhatsApp dispatch logs.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setExportModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setTestModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#111418] hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 text-[#c8f53c] animate-pulse" />
            <span>Make a Test Call</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Live Inbound"
          icon={Radio}
          description="Active calls streaming with sub-390ms turn-around time."
          metric="0 streaming"
          metricLabel="No active calls"
          status="Idle"
          statusType="neutral"
          actionLabel="View Inbound →"
          onClick={() => setDirectionFilter("inbound")}
        />

        <WorkspaceCard
          name="Handled Today"
          icon={PhoneCall}
          description="Total conversations processed across all active AI employees."
          metric="0 calls"
          metricLabel="0 inbound • 0 outbound"
          status="100% uptime"
          statusType="ready"
          actionLabel="Filter all calls →"
          onClick={() => {
            setDirectionFilter("all");
            setStatusFilter("all");
          }}
        />

        <WorkspaceCard
          name="Outbound Batches"
          icon={PhoneOutgoing}
          description="Autonomous batch campaigns and outreach cadences."
          metric="0 dispatched"
          metricLabel="0 connected"
          status="Standby"
          statusType="neutral"
          actionLabel="View Outbound →"
          onClick={() => setDirectionFilter("outbound")}
        />

        <WorkspaceCard
          name="Average Duration"
          icon={Clock}
          description="Mean length per conversation across all calling workflows."
          metric="0s"
          metricLabel="12+ Indic languages"
          status="Ready"
          statusType="ready"
          actionLabel="View billing →"
          href="/dashboard/billing"
        />
      </div>

      {/* Direction & Status Filter Tabs Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        {/* Top Filter Row: Inbound vs Outbound Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Call Direction:
            </span>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80">
              <button
                onClick={() => setDirectionFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  directionFilter === "all"
                    ? "bg-white text-slate-950 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Calls (0)
              </button>

              <button
                onClick={() => setDirectionFilter("inbound")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  directionFilter === "inbound"
                    ? "bg-[#c8f53c] text-slate-950 shadow-2xs font-black"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <PhoneIncoming className="w-3.5 h-3.5 text-[#537c04]" />
                <span>Inbound Calls (0)</span>
              </button>

              <button
                onClick={() => setDirectionFilter("outbound")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  directionFilter === "outbound"
                    ? "bg-[#111418] text-white shadow-2xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <PhoneOutgoing className="w-3.5 h-3.5 text-slate-400" />
                <span>Outbound Calls (0)</span>
              </button>
            </div>
          </div>

          {directionFilter !== "all" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">
                Filtered by:{" "}
                <span className="font-bold text-slate-900 capitalize">
                  {directionFilter} Calls
                </span>
              </span>
              <button
                onClick={() => setDirectionFilter("all")}
                className="text-xs text-purple-600 hover:text-purple-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          )}
        </div>

        {/* Second Filter Row: Status Tabs + Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {[
              { id: "all", label: "All Statuses", count: 0 },
              { id: "live", label: "Live", count: 0, isLive: false },
              { id: "completed", label: "Completed", count: 0 },
              { id: "transferred", label: "Transferred", count: 0 },
              { id: "missed", label: "Missed", count: 0 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                {tab.isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                placeholder="Search by caller, phone or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:border-slate-900 transition-all placeholder:text-slate-400"
              />
            </div>

            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="text-xs bg-slate-50/70 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:border-slate-900 cursor-pointer font-medium"
            >
              <option value="all">All AI Agents</option>
              <option value="Inbound">Inbound Concierge</option>
              <option value="Outbound">Outbound Dialer</option>
              <option value="Support">Customer Support</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calls Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/70 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Recorded & Live Transcripts
            </span>
            <span className="text-[11px] text-slate-700 font-mono font-bold">
              ({filteredCalls.length} calls)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Click any row to open the Swaram Call Detail Drawer
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/40 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Contact / Phone</th>
                <th className="py-3 px-4">Direction</th>
                <th className="py-3 px-4">Purpose & Inquired Details</th>
                <th className="py-3 px-4">AI Agent</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto shadow-xs border border-slate-200">
                        <PhoneCall className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">
                        No {directionFilter !== "all" ? directionFilter : ""} calls recorded yet
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Once your AI voice agents receive inbound inquiries or dispatch outbound calls, live audio transcripts, sentiment, and call variables will appear here in real-time.
                      </p>
                      <button
                        onClick={() => setTestModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-[#111418] hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                      >
                        <Radio className="w-3.5 h-3.5 text-[#c8f53c]" />
                        <span>Make a Test Call</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCalls.map((call) => (
                  <tr
                    key={call.id}
                    onClick={() => handleInspect(call)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 group-hover:text-black flex items-center gap-1.5">
                        <span>{call.name}</span>
                        {call.status === "live" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {call.phone}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          call.direction === "inbound"
                            ? "bg-[#c8f53c]/30 text-slate-950 border border-[#c8f53c]"
                            : "bg-slate-100 text-slate-800 border border-slate-200"
                        }`}
                      >
                        {call.direction === "inbound" ? (
                          <>
                            <PhoneIncoming className="w-2.5 h-2.5 text-[#537c04]" />
                            <span>Inbound</span>
                          </>
                        ) : (
                          <>
                            <PhoneOutgoing className="w-2.5 h-2.5 text-slate-500" />
                            <span>Outbound</span>
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-medium text-slate-800 truncate">
                        {call.intent}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5">
                        {call.transcriptSnippet}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {call.agent}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {call.language}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-700">
                      {call.duration}
                      <span className="text-[10px] text-slate-400 block font-sans">
                        {call.timestamp}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {call.status === "live" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-900 text-[#c8f53c] px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c8f53c] animate-pulse" />
                          Live Stream
                        </span>
                      ) : call.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
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

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspect(call);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-slate-900 hover:text-white border border-slate-200 hover:border-slate-900 shadow-2xs transition-all cursor-pointer"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect Drawer</span>
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
        <div className="p-12 text-center text-slate-400 font-medium text-xs">
          Loading Swaram Call Logs & Telemetry...
        </div>
      }
    >
      <CallsPageContent />
    </Suspense>
  );
}
