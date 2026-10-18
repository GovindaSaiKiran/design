"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarClock,
  Search,
  PhoneCall,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  ExternalLink,
  ShieldCheck,
  Plus,
  Play,
  RotateCcw,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import CallDrawer from "@/components/dashboard/views/CallDrawer";
import { RecentCallRecord } from "@/types/dashboard";
import { mockRecentCalls } from "@/data/mock/dashboardData";
import { soundSynth } from "@/lib/audio-synth";

interface CallbackItem {
  id: string;
  contactName: string;
  phone: string;
  scheduledWindow: string;
  priority: "Urgent" | "High" | "Normal";
  status: "Pending" | "Completed" | "Rescheduled";
  inquirySummary: string;
  assignedAgent: string;
  sourceCallId: string;
  createdAt: string;
}

const initialCallbacks: CallbackItem[] = [
  {
    id: "cb-001",
    contactName: "Devansh Patil",
    phone: "+91 97110 33499",
    scheduledWindow: "Today, 06:30 PM (Evening Window)",
    priority: "High",
    status: "Pending",
    inquirySummary: "Candidate was in lecture during morning outbound call. Requested evening callback regarding MBA GD/PI dates.",
    assignedAgent: "Arjun (Outreach)",
    sourceCallId: "call-005",
    createdAt: "Today, 09:15 AM",
  },
  {
    id: "cb-002",
    contactName: "Kavita Deshmukh",
    phone: "+91 98230 11944",
    scheduledWindow: "Today, 05:00 PM - 06:00 PM",
    priority: "Normal",
    status: "Pending",
    inquirySummary: "Parent requested callback after office hours to review AC hostel fee installment schedule.",
    assignedAgent: "Maya (Admissions)",
    sourceCallId: "call-002",
    createdAt: "Today, 10:45 AM",
  },
  {
    id: "cb-003",
    contactName: "Meera Krishnan",
    phone: "+91 98210 55678",
    scheduledWindow: "Yesterday, 05:30 PM",
    priority: "Urgent",
    status: "Completed",
    inquirySummary: "National badminton sports quota waiver review. Senior Counselor Mr. Sharma completed warm follow-up.",
    assignedAgent: "Counselor Desk (Handoff)",
    sourceCallId: "call-004",
    createdAt: "Yesterday, 04:30 PM",
  },
];

export default function CallbacksPage() {
  const [callbacks, setCallbacks] = useState<CallbackItem[]>(initialCallbacks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCallRecord, setSelectedCallRecord] = useState<RecentCallRecord | null>(null);
  const [callDrawerOpen, setCallDrawerOpen] = useState(false);

  // Live call confirmation modal state (Explicit user confirmation required!)
  const [dialConfirmModalOpen, setDialConfirmModalOpen] = useState(false);
  const [targetCallback, setTargetCallback] = useState<CallbackItem | null>(null);
  const [diallingNotice, setDiallingNotice] = useState<string | null>(null);

  const filteredCallbacks = callbacks.filter((cb) => {
    const matchesSearch =
      cb.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cb.phone.includes(searchQuery) ||
      cb.inquirySummary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || cb.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenSourceCall = (callId: string) => {
    try { soundSynth.play("click"); } catch {}
    const match = mockRecentCalls.find((c) => c.id === callId) || mockRecentCalls[0];
    setSelectedCallRecord(match);
    setCallDrawerOpen(true);
  };

  const handlePromptDial = (cb: CallbackItem) => {
    try { soundSynth.play("click"); } catch {}
    setTargetCallback(cb);
    setDialConfirmModalOpen(true);
  };

  const handleConfirmLiveDial = () => {
    if (!targetCallback) return;
    try { soundSynth.play("confirm"); } catch {}
    setDialConfirmModalOpen(false);
    setDiallingNotice(`Carrier SIP line dispatched to ${targetCallback.contactName} (${targetCallback.phone}). Turnaround latency 136ms.`);

    setCallbacks((prev) =>
      prev.map((c) => (c.id === targetCallback.id ? { ...c, status: "Completed" } : c))
    );

    setTimeout(() => {
      setDiallingNotice(null);
    }, 4500);
  };

  return (
    <div className="space-y-6 select-none font-sans text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold tracking-wider text-black/45 hover:text-black uppercase transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D593F] bg-[#C1F2D5] px-3 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
              Queue Synced
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Callbacks &amp; Follow-up Queue
          </h1>

          <p className="text-xs sm:text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Manage requested caller appointments and automated outreach cadences with explicit live call initiation confirmations.
          </p>
        </div>
      </div>

      {/* Notice Banner */}
      {diallingNotice && (
        <div className="p-4 rounded-[20px] bg-[#C1F2D5]/40 border border-[#16856B]/30 flex items-center gap-3 text-xs text-[#0D593F] font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16856B]" />
          <span>{diallingNotice}</span>
        </div>
      )}

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Pending Requests"
          icon={Clock}
          description="Callers who requested follow-up calls during earlier turns."
          metric={`${callbacks.filter((c) => c.status === "Pending").length} Pending`}
          metricLabel="Next: Devansh Patil (6:30 PM)"
          status="Active Queue"
          statusType="warning"
          actionLabel="Filter pending →"
          onClick={() => setStatusFilter("Pending")}
        />

        <WorkspaceCard
          name="Completed Today"
          icon={CheckCircle2}
          description="Follow-up conversations successfully resolved and archived."
          metric="1 Resolved"
          metricLabel="100% connect rate"
          status="Resolved"
          statusType="ready"
          actionLabel="Filter completed →"
          onClick={() => setStatusFilter("Completed")}
        />

        <WorkspaceCard
          name="Average Latency"
          icon={CalendarClock}
          description="Average time from scheduled callback slot to carrier ring."
          metric="< 2.4s"
          metricLabel="Sub-3s carrier dialling SLA"
          status="Optimal"
          statusType="ready"
          actionLabel="Inspect telemetry →"
          href="/dashboard/analytics"
        />

        <WorkspaceCard
          name="Staff Escalation"
          icon={User}
          description="Handoff queue for requests requiring senior counselor intervention."
          metric="1 Handoff"
          metricLabel="Verified context transmitted"
          status="Staff Assigned"
          statusType="neutral"
          actionLabel="Manage staff →"
          href="/dashboard/team"
        />
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-[26px] bg-white border border-black/[0.06] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {["all", "Pending", "Completed"].map((st) => (
            <button
              key={st}
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setStatusFilter(st);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#111111] text-white shadow-sm"
                  : "bg-[#FBF7ED] text-black/60 hover:text-black border border-black/[0.06]"
              }`}
            >
              {st === "all" ? "All Requests" : st}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-sm">
          <Search className="w-3.5 h-3.5 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by contact name, phone, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-black/40"
          />
        </div>
      </div>

      {/* Callbacks Table */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] shadow-2xs overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xs text-[#1A1A1A]">
              Scheduled Follow-up Cadence
            </h3>
            <span className="text-[11px] font-medium text-black/45">
              ({filteredCallbacks.length} requests in queue)
            </span>
          </div>
          <span className="text-[11px] text-black/50 hidden sm:inline">
            Carrier dialling requires explicit operator confirmation
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Contact &amp; Phone</th>
                <th className="py-3 px-5">Scheduled Window</th>
                <th className="py-3 px-5">Priority</th>
                <th className="py-3 px-5">Inquiry Context</th>
                <th className="py-3 px-5">Assigned Agent / Desk</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {filteredCallbacks.map((cb) => (
                <tr key={cb.id} className="hover:bg-black/[0.015] transition-colors group">
                  <td className="py-4 px-5 font-semibold text-[#1A1A1A]">
                    <div>{cb.contactName}</div>
                    <span className="text-[11px] text-black/45 font-normal">{cb.phone}</span>
                  </td>

                  <td className="py-4 px-5 whitespace-nowrap text-[#1A1A1A] font-medium">
                    {cb.scheduledWindow}
                  </td>

                  <td className="py-4 px-5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                        cb.priority === "Urgent"
                          ? "bg-[#FEE4E2] text-[#B42318]"
                          : cb.priority === "High"
                          ? "bg-[#FFD9A0] text-[#733F00]"
                          : "bg-[#BCD0F5] text-[#1E3A8A]"
                      }`}
                    >
                      {cb.priority}
                    </span>
                  </td>

                  <td className="py-4 px-5 max-w-xs text-black/55">
                    <p className="line-clamp-2">{cb.inquirySummary}</p>
                    <button
                      type="button"
                      onClick={() => handleOpenSourceCall(cb.sourceCallId)}
                      className="text-[10.5px] font-semibold text-[#1A1A1A] hover:underline mt-1 inline-flex items-center gap-1"
                    >
                      <span>View Source Call ({cb.sourceCallId})</span>
                      <ExternalLink className="w-3 h-3 text-black/40" />
                    </button>
                  </td>

                  <td className="py-4 px-5 whitespace-nowrap text-[#1A1A1A] font-medium">
                    {cb.assignedAgent}
                  </td>

                  <td className="py-4 px-5 whitespace-nowrap">
                    {cb.status === "Completed" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0D593F] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-[#16856B]" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#733F00] bg-[#FFD9A0] px-2.5 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" />
                        <span>Pending</span>
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right whitespace-nowrap space-x-2">
                    {cb.status === "Pending" && (
                      <button
                        type="button"
                        onClick={() => handlePromptDial(cb)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#111111] hover:bg-black text-white shadow-xs transition-colors cursor-pointer"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Initiate Call</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleOpenSourceCall(cb.sourceCallId)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-black/[0.06] bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explicit Confirmation Modal Before Initiating Live Calls */}
      {dialConfirmModalOpen && targetCallback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-100">
          <div className="relative w-full max-w-md bg-white rounded-[28px] border border-black/[0.06] shadow-2xl p-6 space-y-4 text-xs text-[#1A1A1A]">
            <div className="w-12 h-12 rounded-full bg-[#FFD9A0] text-[#733F00] flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-[#733F00]" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#1A1A1A]">
                Confirm Live Carrier Call Dispatch?
              </h3>
              <p className="text-xs text-black/55 mt-1 leading-relaxed">
                You are about to initiate an automated outbound carrier call to:
              </p>
            </div>

            <div className="p-4 rounded-[18px] bg-[#FBF7ED] border border-black/[0.06] space-y-2 text-xs text-black/60">
              <div className="flex justify-between">
                <span>Contact Name:</span>
                <strong className="text-[#1A1A1A]">{targetCallback.contactName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Phone Number:</span>
                <strong className="text-[#1A1A1A]">{targetCallback.phone}</strong>
              </div>
              <div className="flex justify-between">
                <span>Assigned Agent:</span>
                <strong className="text-[#1A1A1A]">{targetCallback.assignedAgent}</strong>
              </div>
            </div>

            <p className="text-[11px] text-black/50">
              Standard SIP telephony minutes will be billed. The agent will greet the caller with the context of their previous inquiry.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDialConfirmModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-black/60 hover:text-black border border-black/[0.06] bg-[#FBF7ED] rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLiveDial}
                className="px-5 py-2 text-xs font-semibold bg-[#111111] hover:bg-black text-white rounded-full shadow-sm transition-colors cursor-pointer"
              >
                Confirm &amp; Place Call Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Source Call Transcript Drawer */}
      <CallDrawer
        call={selectedCallRecord}
        isOpen={callDrawerOpen}
        onClose={() => setCallDrawerOpen(false)}
      />
    </div>
  );
}
