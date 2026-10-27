"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Bot,
  Clock,
  ArrowUpDown,
  ExternalLink,
  Info,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  PhoneCall,
  Search,
} from "lucide-react";
import { AgentUsageMetric } from "@/types/usageControls";

interface AgentEfficiencyTableProps {
  agents: AgentUsageMetric[];
  currency?: string;
}

type SortField = "consumption" | "efficiency" | "cost" | "resolution";
type SortOrder = "asc" | "desc";

export default function AgentEfficiencyTable({
  agents,
  currency = "INR",
}: AgentEfficiencyTableProps) {
  const [sortField, setSortField] = useState<SortField>("consumption");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const sortedAgents = useMemo(() => {
    let filtered = agents.filter((ag) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        ag.agentName.toLowerCase().includes(q) ||
        ag.department.toLowerCase().includes(q) ||
        ag.operationalContext.toLowerCase().includes(q)
      );
    });

    return [...filtered].sort((a, b) => {
      let comparison = 0;
      if (sortField === "consumption") {
        comparison = a.minutesConsumed - b.minutesConsumed;
      } else if (sortField === "efficiency") {
        comparison = a.avgDurationSeconds - b.avgDurationSeconds;
      } else if (sortField === "cost") {
        comparison = a.costPerCompletedCall - b.costPerCompletedCall;
      } else if (sortField === "resolution") {
        comparison = a.resolutionRatePercent - b.resolutionRatePercent;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [agents, sortField, sortOrder, searchQuery]);

  const currencySymbol = currency === "INR" ? "₹" : "$";

  return (
    <div className="bg-white rounded-3xl border border-[#E9E1D4] overflow-hidden shadow-xs space-y-0">
      {/* Table Header & Search */}
      <div className="p-5 sm:p-6 border-b border-[#E9E1D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[#283A50] flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#C4A5E8]" />
            Agent Efficiency &amp; Capacity Allocation
          </h3>
          <p className="text-xs text-[#707684] mt-0.5">
            Identify which AI agents consume calling allowances and analyze duration against resolution yield.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter agents by name, role..."
              className="w-full pl-9 pr-3.5 py-1.5 bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-xl text-xs text-[#283A50] placeholder:text-slate-400 focus:outline-hidden focus:border-[#283A50] focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Sorting Controls Bar */}
      <div className="px-5 py-2.5 bg-[#FAF5E9]/40 border-b border-[#E9E1D4] flex items-center gap-2 flex-wrap text-xs text-[#707684]">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#707684]">Sort by:</span>
        <button
          onClick={() => handleSort("consumption")}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
            sortField === "consumption"
              ? "bg-[#283A50] text-white border-[#283A50]"
              : "bg-white text-[#707684] border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <span>Consumption (Minutes)</span>
          {sortField === "consumption" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSort("efficiency")}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
            sortField === "efficiency"
              ? "bg-[#283A50] text-white border-[#283A50]"
              : "bg-white text-[#707684] border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <span>Duration per Call</span>
          {sortField === "efficiency" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSort("cost")}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
            sortField === "cost"
              ? "bg-[#283A50] text-white border-[#283A50]"
              : "bg-white text-[#707684] border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <span>Cost per Call</span>
          {sortField === "cost" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSort("resolution")}
          className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1 ${
            sortField === "resolution"
              ? "bg-[#283A50] text-white border-[#283A50]"
              : "bg-white text-[#707684] border-[#E9E1D4] hover:bg-[#FAF5E9]"
          }`}
        >
          <span>Resolution Yield</span>
          {sortField === "resolution" && (sortOrder === "asc" ? "↑" : "↓")}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#E9E1D4] bg-[#FAF5E9]/50 text-[11px] font-bold uppercase tracking-wider text-[#707684]">
              <th className="py-3 px-5">AI Agent &amp; Operational Role</th>
              <th className="py-3 px-5">Minutes Consumed</th>
              <th className="py-3 px-5">Calls Handled</th>
              <th className="py-3 px-5">Avg Call Duration</th>
              <th className="py-3 px-5">Cost / Completed Call</th>
              <th className="py-3 px-5">Resolution Rate</th>
              <th className="py-3 px-5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9E1D4]">
            {sortedAgents.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-[#707684]">
                  <Bot className="w-8 h-8 text-[#707684]/50 mx-auto mb-2" />
                  <p className="font-semibold text-sm text-[#283A50]">No agent metrics recorded yet</p>
                  <p className="text-xs text-[#707684] mt-0.5">Voice usage data will appear here once agents handle live or outbound calls.</p>
                </td>
              </tr>
            ) : (
              sortedAgents.map((ag) => {
              return (
                <tr
                  key={ag.agentId}
                  className="hover:bg-[#FAF5E9]/30 transition-colors group"
                >
                  {/* Agent Name & Operational Context */}
                  <td className="py-4 px-5 max-w-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-2xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50] shrink-0 font-bold mt-0.5">
                        <Bot className="w-4 h-4 text-[#C4A5E8]" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#283A50] flex items-center gap-1.5">
                          <span>{ag.agentName}</span>
                          <span className="text-[10px] font-normal text-[#707684]">
                            ({ag.department})
                          </span>
                        </div>
                        <p className="text-[11px] text-[#707684] mt-1 leading-relaxed">
                          {ag.operationalContext}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Minutes Consumed */}
                  <td className="py-4 px-5">
                    <div className="font-mono font-bold text-sm text-[#283A50]">
                      {ag.minutesConsumed.toLocaleString()} min
                    </div>
                    <div className="text-[10px] text-[#707684] mt-0.5">
                      {ag.percentOfTotalUsage}% of total workspace burn
                    </div>
                    {/* Tiny visual progress bar */}
                    <div className="w-24 h-1.5 rounded-full bg-[#E9E1D4] mt-1.5 overflow-hidden">
                      <div
                        style={{ width: `${ag.percentOfTotalUsage}%` }}
                        className="h-full bg-[#283A50] rounded-full"
                      />
                    </div>
                  </td>

                  {/* Calls Handled */}
                  <td className="py-4 px-5 font-mono">
                    <div className="font-bold text-xs text-[#283A50]">
                      {ag.callsHandled.toLocaleString()} calls
                    </div>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-semibold mt-1 border ${
                        ag.direction === "inbound"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-blue-50 text-blue-800 border-blue-200"
                      }`}
                    >
                      {ag.direction === "inbound" ? "Inbound Desk" : "Outbound Campaigns"}
                    </span>
                  </td>

                  {/* Avg Call Duration */}
                  <td className="py-4 px-5">
                    <div className="font-mono font-bold text-xs text-[#283A50] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#707684]" />
                      <span>{ag.avgDurationFormatted}</span>
                    </div>
                    <div className="text-[10px] text-[#707684] mt-0.5">
                      {ag.avgDurationSeconds} seconds avg
                    </div>
                  </td>

                  {/* Cost per Completed Call */}
                  <td className="py-4 px-5">
                    <div className="font-mono font-bold text-xs text-[#283A50]">
                      {currencySymbol}{ag.costPerCompletedCall.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-[#707684]">
                      Transit + AI inference
                    </div>
                  </td>

                  {/* Resolution Yield */}
                  <td className="py-4 px-5">
                    <div className="font-mono font-bold text-xs text-[#2E8066] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8066]" />
                      <span>{ag.resolutionRatePercent}%</span>
                    </div>
                    <div className="text-[10px] text-[#707684]">
                      Zero hallucination SLA
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/dashboard/agents?id=${ag.agentId}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#FAF5E9] hover:bg-[#FAF5E9]/80 border border-[#E9E1D4] text-[#283A50] transition-colors cursor-pointer"
                        title="View Agent Prompts & Architecture"
                      >
                        <span>Agent Details</span>
                        <ExternalLink className="w-3 h-3 text-[#707684]" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
          </tbody>
        </table>
      </div>

      {/* Analytical Footnote */}
      <div className="p-4 bg-[#FAF5E9]/50 border-t border-[#E9E1D4] text-[11px] text-[#707684] flex items-start gap-2.5">
        <Info className="w-4 h-4 text-[#283A50] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-bold text-[#283A50]">Operational Context Note:</span> Call duration alone does not measure agent inefficiency. Deep counseling and admission enrollment calls (e.g. Maya) require multi-turn qualification and board verification, directly resulting in higher resolution yields. Outreach agents (e.g. Arjun) are tuned for rapid qualification and appointment confirmations.
        </p>
      </div>
    </div>
  );
}
