"use client";

import React, { useState } from "react";
import { RecentCallRecord, CallOutcome, CallDirection } from "@/types/dashboard";
import {
  Search,
  Filter,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  FileText,
  CheckCircle2,
  PhoneForwarded,
  PhoneOff,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface RecentCallsTableProps {
  calls: RecentCallRecord[];
  onSelectCall?: (call: RecentCallRecord) => void;
  onViewAllCalls?: () => void;
}

export default function RecentCallsTable({
  calls,
  onSelectCall,
  onViewAllCalls,
}: RecentCallsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState<string>("all");
  const [directionFilter, setDirectionFilter] = useState<string>("all");

  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.contactNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (call.contactName && call.contactName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      call.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesOutcome = outcomeFilter === "all" || call.outcome === outcomeFilter;
    const matchesDirection = directionFilter === "all" || call.direction === directionFilter;

    return matchesSearch && matchesOutcome && matchesDirection;
  });

  const renderOutcomeBadge = (outcome: CallOutcome) => {
    switch (outcome) {
      case "Interested":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
            Interested
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-200 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 stroke-[2.5]" />
            Completed
          </span>
        );
      case "Human Handoff":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs">
            <PhoneForwarded className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
            Human Handoff
          </span>
        );
      case "Callback Requested":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-purple-600 stroke-[2.5]" />
            Callback
          </span>
        );
      case "No Answer":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-rose-50 text-rose-800 border border-rose-200 shadow-xs">
            <PhoneOff className="w-3.5 h-3.5 text-rose-600 stroke-[2.5]" />
            No Answer
          </span>
        );
    }
  };

  return (
    <div className="liquid-glass-card p-6 sm:p-8 select-none font-sans">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full bg-indigo-50/80 text-indigo-700 border border-black/10 shadow-xs">
              Audit Logs & Telephony Transcripts
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-black/5">
              {filteredCalls.length} Records
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Comprehensive Call History
          </h2>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search phone, student, intent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3.5 py-2.5 rounded-xl text-xs font-medium bg-white/80 backdrop-blur-md hover:bg-white border border-black/10 hover:border-black/25 focus:border-indigo-500 focus:outline-none w-48 sm:w-60 placeholder:text-slate-400 text-slate-900 shadow-xs transition-all"
            />
          </div>

          {/* Outcome Filter */}
          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/80 backdrop-blur-md hover:bg-white border border-black/10 hover:border-black/25 focus:outline-none cursor-pointer text-slate-700 shadow-xs transition-all"
          >
            <option value="all">All Outcomes</option>
            <option value="Interested">Interested</option>
            <option value="Completed">Completed</option>
            <option value="Human Handoff">Human Handoff</option>
            <option value="Callback Requested">Callback Requested</option>
            <option value="No Answer">No Answer</option>
          </select>

          {/* Direction Filter */}
          <select
            value={directionFilter}
            onChange={(e) => setDirectionFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/80 backdrop-blur-md hover:bg-white border border-black/10 hover:border-black/25 focus:outline-none cursor-pointer text-slate-700 shadow-xs transition-all"
          >
            <option value="all">All Directions</option>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-black/10 rounded-2xl shadow-xs bg-white/40 backdrop-blur-md">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50/80 text-slate-700 text-[11px] font-semibold uppercase tracking-wider border-b border-black/10">
              <th className="py-4 px-5">Direction</th>
              <th className="py-4 px-5">Student / Caller</th>
              <th className="py-4 px-5">Assigned Agent</th>
              <th className="py-4 px-5">Duration</th>
              <th className="py-4 px-5">Outcome</th>
              <th className="py-4 px-5">Intent / Transcript Summary</th>
              <th className="py-4 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-transparent font-medium">
            {filteredCalls.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-500 font-semibold">
                  No call records match your current filter query.
                </td>
              </tr>
            ) : (
              filteredCalls.map((call) => (
                <tr
                  key={call.id}
                  onClick={() => onSelectCall?.(call)}
                  className="hover:bg-white/90 transition-all duration-150 cursor-pointer group"
                >
                  <td className="py-4 px-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold uppercase ${
                        call.direction === "inbound"
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {call.direction === "inbound" ? (
                        <PhoneIncoming className="w-3 h-3 stroke-[2.5]" />
                      ) : (
                        <PhoneOutgoing className="w-3 h-3 stroke-[2.5]" />
                      )}
                      {call.direction}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {call.contactName || "Direct Caller"}
                    </div>
                    <div className="font-mono text-[11px] text-slate-500 font-medium mt-0.5">
                      {call.contactNumber}
                    </div>
                  </td>

                  <td className="py-4 px-5 font-semibold text-slate-900">
                    {call.agentName}
                  </td>

                  <td className="py-4 px-5 font-mono font-bold text-slate-900">
                    {call.duration}
                  </td>

                  <td className="py-4 px-5">
                    {renderOutcomeBadge(call.outcome)}
                  </td>

                  <td className="py-4 px-5 max-w-xs">
                    <p className="font-semibold text-slate-900 truncate text-xs">
                      {call.summary}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate italic mt-0.5 font-normal">
                      &ldquo;{call.transcriptSnippet}&rdquo;
                    </p>
                  </td>

                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCall?.(call);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold text-xs border border-blue-600/30 shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
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
  );
}
