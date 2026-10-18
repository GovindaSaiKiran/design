"use client";

import React, { useState } from "react";
import { RecentCallRecord, CallOutcome } from "@/types/dashboard";
import {
  Search,
  PhoneIncoming,
  PhoneOutgoing,
  Play,
  CheckCircle2,
  PhoneForwarded,
  PhoneOff,
  Clock,
  Sparkles,
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#C1F2D5] text-[#16856B]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16856B] stroke-[2.5]" />
            Interested
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#BCD0F5] text-[#1B365D]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#1B365D] stroke-[2.5]" />
            Completed
          </span>
        );
      case "Human Handoff":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFD9A0] text-[#7A4B00]">
            <PhoneForwarded className="w-3.5 h-3.5 text-[#7A4B00] stroke-[2.5]" />
            Human Handoff
          </span>
        );
      case "Callback Requested":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#D9C2FA] text-[#5B21B6]">
            <Clock className="w-3.5 h-3.5 text-[#5B21B6] stroke-[2.5]" />
            Callback
          </span>
        );
      case "No Answer":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#FFC0D3] text-[#9F1239]">
            <PhoneOff className="w-3.5 h-3.5 text-[#9F1239] stroke-[2.5]" />
            No Answer
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs select-none font-sans text-[#1A1A1A]">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#D9C2FA]/40 border border-[#D9C2FA] text-[#5B21B6]">
              Audit Logs & Telephony Transcripts
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF3E4] text-black/70 border border-black/[0.06]">
              {filteredCalls.length} Records
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
            Comprehensive Call History
          </h2>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              placeholder="Search phone, student, intent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3.5 py-2 rounded-full text-xs font-medium bg-[#FAF3E4]/60 hover:bg-white border border-black/[0.06] focus:border-black/20 focus:bg-white focus:outline-none w-48 sm:w-60 placeholder:text-black/40 text-[#1A1A1A] shadow-2xs transition-all"
            />
          </div>

          {/* Outcome Filter */}
          <select
            value={outcomeFilter}
            onChange={(e) => setOutcomeFilter(e.target.value)}
            className="px-3.5 py-2 rounded-full text-xs font-semibold bg-[#FAF3E4] border border-black/[0.06] focus:outline-none cursor-pointer text-black/70 shadow-2xs transition-all"
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
            className="px-3.5 py-2 rounded-full text-xs font-semibold bg-[#FAF3E4] border border-black/[0.06] focus:outline-none cursor-pointer text-black/70 shadow-2xs transition-all"
          >
            <option value="all">All Directions</option>
            <option value="inbound">Inbound</option>
            <option value="outbound">Outbound</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-black/[0.06] rounded-[20px] shadow-2xs bg-white">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#FAF3E4]/70 text-black/50 text-[11px] font-semibold uppercase tracking-wider border-b border-black/[0.06]">
              <th className="py-3.5 px-4">Direction</th>
              <th className="py-3.5 px-4">Student / Caller</th>
              <th className="py-3.5 px-4">Assigned Agent</th>
              <th className="py-3.5 px-4">Duration</th>
              <th className="py-3.5 px-4">Outcome</th>
              <th className="py-3.5 px-4">Intent / Transcript Summary</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04] bg-white font-medium text-black/80">
            {filteredCalls.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-black/40 font-semibold">
                  No call records match your current filter query.
                </td>
              </tr>
            ) : (
              filteredCalls.map((call) => (
                <tr
                  key={call.id}
                  onClick={() => onSelectCall?.(call)}
                  className="hover:bg-[#FAF3E4]/40 transition-all duration-150 cursor-pointer group"
                >
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        call.direction === "inbound"
                          ? "bg-[#D9C2FA]/40 text-[#5B21B6]"
                          : "bg-[#FFD9A0] text-[#7A4B00]"
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

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#1A1A1A] group-hover:text-black transition-colors">
                      {call.contactName || "Direct Caller"}
                    </div>
                    <div className="font-mono text-[11px] text-black/50 font-medium mt-0.5">
                      {call.contactNumber}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-[#1A1A1A]">
                    {call.agentName}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-[#1A1A1A]">
                    {call.duration}
                  </td>

                  <td className="py-3.5 px-4">
                    {renderOutcomeBadge(call.outcome)}
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="font-semibold text-[#1A1A1A] truncate text-xs">
                      {call.summary}
                    </p>
                    <p className="text-[11px] text-black/50 truncate italic mt-0.5 font-normal">
                      &ldquo;{call.transcriptSnippet}&rdquo;
                    </p>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCall?.(call);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#FAF3E4] hover:bg-[#111111] hover:text-white text-[#1A1A1A] font-semibold text-xs border border-black/[0.06] shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
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
