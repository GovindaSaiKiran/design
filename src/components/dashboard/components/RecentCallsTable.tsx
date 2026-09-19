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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
            Interested
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
            Completed
          </span>
        );
      case "Human Handoff":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#fef08a] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <PhoneForwarded className="w-3 h-3 stroke-[2.5]" />
            Human Handoff
          </span>
        );
      case "Callback Requested":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Clock className="w-3 h-3 stroke-[2.5]" />
            Callback
          </span>
        );
      case "No Answer":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#f1f5f9] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <PhoneOff className="w-3 h-3 stroke-[2.5]" />
            No Answer
          </span>
        );
    }
  };

  return (
    <div className="bg-white border-[1.5px] border-black rounded-xl p-4 sm:p-5 shadow-[3px_3px_0px_#000000]">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-black text-[#d6ff38]">
              Audit Logs & Telephony Transcripts
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#d6ff38] text-black border border-black shadow-[1px_1px_0px_#000000]">
              {filteredCalls.length} Records
            </span>
          </div>
          <h2 className="text-lg font-black text-black uppercase tracking-tight">
            Comprehensive Call History
          </h2>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search phone, student, intent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl text-xs font-medium bg-white border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000000] focus:outline-none focus:bg-[#fcffe0]/40 w-48 sm:w-60 placeholder:text-neutral-400"
            />
          </div>

          {/* Outcome Filter */}
          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000000] focus:outline-none cursor-pointer"
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
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white border-[1.5px] border-black shadow-[1.5px_1.5px_0px_#000000] focus:outline-none cursor-pointer"
          >
            <option value="all">All Directions</option>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border-[1.5px] border-black rounded-xl shadow-[2px_2px_0px_#000000]">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-neutral-50 border-b border-black text-[10px] font-bold text-neutral-800 uppercase tracking-wider">
              <th className="py-2.5 px-3">Direction</th>
              <th className="py-2.5 px-3">Student / Caller</th>
              <th className="py-2.5 px-3">Assigned Agent</th>
              <th className="py-2.5 px-3">Duration</th>
              <th className="py-2.5 px-3">Outcome</th>
              <th className="py-2.5 px-3">Intent / Transcript Summary</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white font-normal">
            {filteredCalls.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-black/60 font-bold">
                  No call records match your current filter query.
                </td>
              </tr>
            ) : (
              filteredCalls.map((call) => (
                <tr
                  key={call.id}
                  onClick={() => onSelectCall?.(call)}
                  className="hover:bg-[#d6ff38]/20 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3 font-bold">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase border-2 border-black ${
                        call.direction === "inbound"
                          ? "bg-[#d6ff38] text-black"
                          : "bg-white text-black"
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

                  <td className="py-3 px-3">
                    <div className="font-black text-black">
                      {call.contactName || "Direct Caller"}
                    </div>
                    <div className="font-mono text-[11px] font-bold text-black/70">
                      {call.contactNumber}
                    </div>
                  </td>

                  <td className="py-3 px-3 font-bold text-black">
                    {call.agentName}
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-black">
                    {call.duration}
                  </td>

                  <td className="py-3 px-3">
                    {renderOutcomeBadge(call.outcome)}
                  </td>

                  <td className="py-3 px-3 max-w-xs">
                    <p className="font-bold text-black truncate text-xs">
                      {call.summary}
                    </p>
                    <p className="text-[11px] text-black/60 truncate italic mt-0.5">
                      &ldquo;{call.transcriptSnippet}&rdquo;
                    </p>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCall?.(call);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#d6ff38] hover:bg-black hover:text-[#d6ff38] text-black border-2 border-black font-black text-xs shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-1"
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
