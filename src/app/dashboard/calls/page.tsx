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
  Terminal,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import ExportReportModal from "@/components/dashboard/modals/ExportReportModal";
import TestCallModal from "@/components/dashboard/modals/TestCallModal";
import CallDrawer from "@/components/dashboard/views/CallDrawer";
import { LiveCallItem, RecentCallRecord, CallOutcome } from "@/types/dashboard";
import { soundSynth } from "@/lib/audio-synth";

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
    soundSynth.play("click");
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
    <div className="space-y-6 sm:space-y-8 select-none font-sans text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[10px] font-mono font-bold tracking-widest text-[#71717A] hover:text-white uppercase transition-colors"
            >
              SWARAM TELEPHONY
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-white bg-[#18181B] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              TELEMETRY & LOGS
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            Call History & Recordings
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Review acoustic transcripts, inspect waveform audio recordings, extracted lead parameters, and carrier handoffs.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => {
              soundSynth.play("click");
              setExportModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-[#09090B] hover:bg-[#18181B] text-white text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-2 rounded-[2px] border border-[#27272A] hover:border-white transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#A1A1AA]" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => {
              soundSynth.play("confirm");
              setTestModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer shadow-sm"
          >
            <Radio className="w-3.5 h-3.5 text-black" />
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
          onClick={() => {
            soundSynth.play("click");
            setDirectionFilter("inbound");
          }}
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
            soundSynth.play("click");
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
          onClick={() => {
            soundSynth.play("click");
            setDirectionFilter("outbound");
          }}
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
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] p-4 space-y-3">
        {/* Top Filter Row: Inbound vs Outbound Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-[#71717A] uppercase tracking-wider">
              CARRIER DIRECTION:
            </span>
            <div className="flex items-center gap-1.5 p-1 rounded-[2px] bg-[#121215] border border-[#27272A]">
              <button
                onClick={() => {
                  soundSynth.play("click");
                  setDirectionFilter("all");
                }}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  directionFilter === "all"
                    ? "bg-white text-black"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                All (0)
              </button>

              <button
                onClick={() => {
                  soundSynth.play("click");
                  setDirectionFilter("inbound");
                }}
                className={`px-3.5 py-1.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  directionFilter === "inbound"
                    ? "bg-white text-black font-black"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                <PhoneIncoming className="w-3.5 h-3.5" />
                <span>Inbound (0)</span>
              </button>

              <button
                onClick={() => {
                  soundSynth.play("click");
                  setDirectionFilter("outbound");
                }}
                className={`px-3.5 py-1.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  directionFilter === "outbound"
                    ? "bg-white text-black font-bold"
                    : "text-[#A1A1AA] hover:text-white"
                }`}
              >
                <PhoneOutgoing className="w-3.5 h-3.5" />
                <span>Outbound (0)</span>
              </button>
            </div>
          </div>

          {directionFilter !== "all" && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#A1A1AA]">
                Filter:{" "}
                <span className="font-bold text-white uppercase">
                  {directionFilter}
                </span>
              </span>
              <button
                onClick={() => {
                  soundSynth.play("click");
                  setDirectionFilter("all");
                }}
                className="text-xs font-mono text-white hover:underline flex items-center gap-1 cursor-pointer uppercase"
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
                onClick={() => {
                  soundSynth.play("click");
                  setStatusFilter(tab.id);
                }}
                className={`px-3 py-1.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === tab.id
                    ? "bg-white text-black"
                    : "bg-[#121215] text-[#A1A1AA] hover:text-white border border-[#27272A]"
                }`}
              >
                {tab.isLive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Search & Agent Selector */}
          <div className="flex items-center gap-2 flex-1 md:max-w-md justify-end">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search caller, phone or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#000000] border border-[#27272A] rounded-[2px] text-white focus:outline-none focus:border-white transition-all placeholder:text-[#71717A] font-mono"
              />
            </div>

            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="text-xs bg-[#000000] border border-[#27272A] rounded-[2px] px-2.5 py-1.5 text-white focus:outline-none focus:border-white cursor-pointer font-mono"
            >
              <option value="all">ALL PERSONAS</option>
              <option value="Inbound">Inbound Concierge</option>
              <option value="Outbound">Outbound Dialer</option>
              <option value="Support">Customer Support</option>
            </select>
          </div>
        </div>
      </div>

      {/* Calls Data Table */}
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#121215] border-b border-[#27272A]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Acoustic Transcripts & Ledger
            </span>
            <span className="text-[11px] text-[#A1A1AA] font-mono">
              ({filteredCalls.length} records)
            </span>
          </div>
          <span className="text-[10px] text-[#71717A] font-mono uppercase tracking-wider">
            Select row to inspect telemetry & audio
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="bg-[#000000] border-b border-[#27272A] text-[#71717A] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Contact / Phone</th>
                <th className="py-3 px-4">Direction</th>
                <th className="py-3 px-4">Purpose & Inquired Details</th>
                <th className="py-3 px-4">AI Agent</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272A]">
              {filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3 font-sans">
                      <div className="w-12 h-12 rounded-[2px] bg-[#121215] text-white flex items-center justify-center mx-auto border border-[#27272A]">
                        <PhoneCall className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                        No {directionFilter !== "all" ? directionFilter : ""} calls recorded
                      </h3>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        Once your AI voice agents receive inbound inquiries or dispatch outbound calls, live audio transcripts, sentiment, and call variables will appear here in real-time.
                      </p>
                      <button
                        onClick={() => {
                          soundSynth.play("confirm");
                          setTestModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer"
                      >
                        <Radio className="w-3.5 h-3.5 text-black" />
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
                    className="hover:bg-[#121215] transition-colors cursor-pointer group text-white"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white flex items-center gap-1.5 font-sans">
                        <span>{call.name}</span>
                        {call.status === "live" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                      </div>
                      <div className="text-[11px] text-[#71717A] font-mono mt-0.5">
                        {call.phone}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider ${
                          call.direction === "inbound"
                            ? "bg-white text-black"
                            : "bg-[#18181B] text-[#A1A1AA] border border-[#27272A]"
                        }`}
                      >
                        {call.direction === "inbound" ? (
                          <>
                            <PhoneIncoming className="w-2.5 h-2.5" />
                            <span>Inbound</span>
                          </>
                        ) : (
                          <>
                            <PhoneOutgoing className="w-2.5 h-2.5" />
                            <span>Outbound</span>
                          </>
                        )}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs font-sans">
                      <div className="font-medium text-white truncate">
                        {call.intent}
                      </div>
                      <div className="text-[11px] text-[#71717A] truncate mt-0.5 font-mono">
                        {call.transcriptSnippet}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-white bg-[#18181B] px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                        {call.agent}
                      </span>
                      <div className="text-[10px] text-[#71717A] font-mono mt-0.5">
                        {call.language}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap font-mono text-white">
                      {call.duration}
                      <span className="text-[10px] text-[#71717A] block font-mono">
                        {call.timestamp}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {call.status === "live" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-white text-black px-2 py-0.5 rounded-[2px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                          LIVE STREAM
                        </span>
                      ) : call.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#18181B] text-zinc-300 px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                          <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                          COMPLETED
                        </span>
                      ) : call.status === "transferred" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#18181B] text-zinc-300 px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                          <PhoneForwarded className="w-2.5 h-2.5 text-white" />
                          HANDOFF
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-[#18181B] text-[#71717A] px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                          <PhoneMissed className="w-2.5 h-2.5 text-[#71717A]" />
                          NO ANSWER
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInspect(call);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider bg-[#121215] hover:bg-white hover:text-black text-white border border-[#27272A] transition-all cursor-pointer"
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
        <div className="p-12 text-center text-[#71717A] font-mono text-xs">
          LOADING TELEMETRY LEDGER...
        </div>
      }
    >
      <CallsPageContent />
    </Suspense>
  );
}
