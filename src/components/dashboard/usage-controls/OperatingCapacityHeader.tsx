"use client";

import React from "react";
import {
  Clock,
  Zap,
  TrendingUp,
  Calendar,
  AlertCircle,
  Plus,
  ShieldCheck,
  Info,
  Sparkles,
  ArrowUpRight,
  Flame,
} from "lucide-react";
import { WorkspaceCapacity } from "@/types/usageControls";

interface OperatingCapacityHeaderProps {
  capacity: WorkspaceCapacity;
  onOpenTopUp: () => void;
}

export default function OperatingCapacityHeader({
  capacity,
  onOpenTopUp,
}: OperatingCapacityHeaderProps) {
  const formatHoursMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const mins = Math.round(totalMinutes % 60);
    return `${hours}h ${mins}m`;
  };

  const currencySymbol = capacity.currency === "INR" ? "₹" : "$";

  return (
    <div className="space-y-4">
      {/* Primary Capacity Card */}
      <div className="bg-white rounded-3xl border border-[#E9E1D4] p-6 sm:p-7 shadow-xs space-y-6">
        {/* Top summary row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E9E1D4]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
                Operating Capacity &amp; Allowance
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]">
                {capacity.planName} · {capacity.planTierBadge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#283A50] mt-1 flex items-center gap-2.5">
              <span>Remaining Calling Time:</span>
              <span className="font-mono text-[#2E8066]">
                {capacity.remainingMinutes.toLocaleString()} min
              </span>
              <span className="text-sm font-sans font-medium text-[#707684]">
                ({formatHoursMinutes(capacity.remainingMinutes)})
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <button
              onClick={onOpenTopUp}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#283A50] hover:bg-black text-white transition-all cursor-pointer shadow-xs hover:scale-[1.02]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Top Up Minutes</span>
            </button>
          </div>
        </div>

        {/* Multi-Segment Capacity Visualizer Bar */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[#283A50]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E8066]" />
                <span className="font-bold">Remaining:</span> {capacity.remainingMinutes.toLocaleString()} min ({capacity.percentRemaining}%)
              </span>
              <span className="flex items-center gap-1.5 text-[#707684]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E9E1D4]" />
                <span className="font-bold">Consumed:</span> {capacity.usedMinutes.toLocaleString()} min ({formatHoursMinutes(capacity.usedMinutes)})
              </span>
            </div>
            <span className="text-[#707684] text-[11px]">
              Total Included: <span className="font-bold text-[#283A50]">{capacity.includedMinutes.toLocaleString()} min</span> ({formatHoursMinutes(capacity.includedMinutes)})
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3.5 rounded-full bg-[#FAF5E9] border border-[#E9E1D4] overflow-hidden flex p-0.5">
            <div
              style={{ width: `${100 - capacity.percentRemaining}%` }}
              className="h-full bg-slate-300 rounded-l-full transition-all duration-500"
              title={`Used: ${capacity.usedMinutes} mins`}
            />
            <div
              style={{ width: `${capacity.percentRemaining}%` }}
              className="h-full bg-[#2E8066] rounded-r-full transition-all duration-500 shadow-2xs"
              title={`Remaining: ${capacity.remainingMinutes} mins`}
            />
          </div>
        </div>

        {/* 4 Restrained Operational Dimension Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
          {/* Dimension 1: Reset Cycle */}
          <div className="p-3.5 rounded-2xl bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-1">
            <div className="flex items-center justify-between text-[#707684]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Cycle Renewal</span>
              <Calendar className="w-3.5 h-3.5 text-[#283A50]" />
            </div>
            <div className="text-sm font-bold text-[#283A50]">
              {capacity.billingPeriodEnd}
            </div>
            <div className="text-[10px] text-[#2E8066] font-medium">
              Resets in {capacity.daysRemainingInPeriod} days
            </div>
          </div>

          {/* Dimension 2: Current Burn Rate */}
          <div className="p-3.5 rounded-2xl bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-1">
            <div className="flex items-center justify-between text-[#707684]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Burn Pace</span>
              <Flame className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-sm font-bold font-mono text-[#283A50]">
              {capacity.averageBurnRatePerDay} min/day
            </div>
            <div className="text-[10px] text-[#707684]">
              7-day trailing average
            </div>
          </div>

          {/* Dimension 3: Estimated Exhaustion Runway */}
          <div className="p-3.5 rounded-2xl bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-1">
            <div className="flex items-center justify-between text-[#707684]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Runway Health</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E8066]" />
            </div>
            <div className="text-sm font-bold text-[#2E8066] flex items-center gap-1.5">
              <span>~{capacity.estimatedExhaustionDays} days</span>
            </div>
            <div className="text-[10px] text-[#707684]">
              Exceeds 21-day cycle window
            </div>
          </div>

          {/* Dimension 4: Additional Usage Rate */}
          <div className="p-3.5 rounded-2xl bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-1">
            <div className="flex items-center justify-between text-[#707684]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Overage Rate</span>
              <Zap className="w-3.5 h-3.5 text-[#C4A5E8]" />
            </div>
            <div className="text-sm font-bold font-mono text-[#283A50]">
              {currencySymbol}{capacity.overageRatePerMinute.toFixed(2)}/min
            </div>
            <div className="text-[10px] text-[#707684]">
              Applied only after allowance
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Capacity Clarification Alert */}
      <div className="p-4 rounded-2xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-start gap-3 text-xs text-[#283A50]">
        <Info className="w-4 h-4 text-[#283A50] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Understanding Your Operating Allowance:</span> Included minutes represent dedicated monthly voice transit and neural AI inference. If your workspace exhausts included allowance, calling continues uninterrupted at <span className="font-semibold">{currencySymbol}{capacity.overageRatePerMinute.toFixed(2)}/min</span> unless a hard spending ceiling is enforced in guardrails below. Monetary balances and prepaid top-up packs never expire across billing cycles.
        </div>
      </div>
    </div>
  );
}
