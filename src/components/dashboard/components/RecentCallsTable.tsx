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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <CheckCircle2 className="w-3 h-3 stroke-[3]" />
            Interested
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <CheckCircle2 className="w-3 h-3 stroke-[3]" />
            Completed
          </span>
        );
      case "Human Handoff":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#ffe600] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <PhoneForwarded className="w-3 h-3 stroke-[3]" />
            Human Handoff
          </span>
        );
      case "Callback Requested":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#c084fc] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <Clock className="w-3 h-3 stroke-[3]" />
            Callback
          </span>
        );
      case "No Answer":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#ff8080] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            <PhoneOff className="w-3 h-3 stroke-[3]" />
            No Answer
          </span>
        );
    }
  };

  return (
    <div className="bg-white border-3 border-black rounded-2xl p-4 sm:p-5 shadow-[6px_6px_0px_#000000] select-none">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38] border border-black shadow-[2px_2px_0px_#000000] -rotate-1">
              AUDIT LOGS & TELEPHONY TRANSCRIPTS
            </span>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              {filteredCalls.length} RECORDS
            </span>
          </div>
          <h2 className="text-xl font-black text-black tracking-tight uppercase">
            Comprehensive Call History
          </h2>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-black" />
            <input
              type="text"
              placeholder="Search phone, student, intent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-xl text-xs font-bold bg-white border-2 border-black shadow-[3px_3px_0px_#000000] focus:shadow-[4px_4px_0px_#000000] focus:outline-none w-48 sm:w-60 placeholder:text-black/50 text-black"
            />
          </div>

          {/* Outcome Filter */}
          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-black bg-white border-2 border-black shadow-[3px_3px_0px_#000000] focus:outline-none cursor-pointer text-black uppercase"
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
            className="px-3 py-2 rounded-xl text-xs font-black bg-white border-2 border-black shadow-[3px_3px_0px_#000000] focus:outline-none cursor-pointer text-black uppercase"
          >
            <option value="all">All Directions</option>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border-3 border-black rounded-xl shadow-[4px_4px_0px_#000000]">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-black text-white text-[11px] font-black uppercase tracking-wider border-b-2 border-black">
              <th className="py-3 px-3.5">Direction</th>
              <th className="py-3 px-3.5">Student / Caller</th>
              <th className="py-3 px-3.5">Assigned Agent</th>
              <th className="py-3 px-3.5">Duration</th>
              <th className="py-3 px-3.5">Outcome</th>
              <th className="py-3 px-3.5">Intent / Transcript Summary</th>
              <th className="py-3 px-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black bg-white font-semibold">
            {filteredCalls.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-black/60 font-black">
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
                  <td className="py-3 px-3.5 font-bold">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000000] ${
                        call.direction === "inbound"
                          ? "bg-[#00f0ff] text-black"
                          : "bg-[#ffe600] text-black"
                      }`}
                    >
                      {call.direction === "inbound" ? (
                        <PhoneIncoming className="w-3 h-3 stroke-[3]" />
                      ) : (
                        <PhoneOutgoing className="w-3 h-3 stroke-[3]" />
                      )}
                      {call.direction}
                    </span>
                  </td>

                  <td className="py-3 px-3.5">
                    <div className="font-black text-black group-hover:underline">
                      {call.contactName || "Direct Caller"}
                    </div>
                    <div className="font-mono text-[11px] font-bold text-black/60">
                      {call.contactNumber}
                    </div>
                  </td>

                  <td className="py-3 px-3.5 font-black text-black">
                    {call.agentName}
                  </td>

                  <td className="py-3 px-3.5 font-mono font-black text-black">
                    {call.duration}
                  </td>

                  <td className="py-3 px-3.5">
                    {renderOutcomeBadge(call.outcome)}
                  </td>

                  <td className="py-3 px-3.5 max-w-xs">
                    <p className="font-black text-black truncate text-xs">
                      {call.summary}
                    </p>
                    <p className="text-[11px] text-black/70 truncate italic mt-0.5 font-medium">
                      &ldquo;{call.transcriptSnippet}&rdquo;
                    </p>
                  </td>

                  <td className="py-3 px-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCall?.(call);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#d6ff38] hover:bg-[#bbf01b] text-black border-2 border-black font-black text-xs uppercase tracking-wider shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] transition-all inline-flex items-center gap-1 cursor-pointer"
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
