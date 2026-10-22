"use client";

import React from "react";
import {
  Layers,
  GraduationCap,
  CreditCard,
  Briefcase,
  Calendar,
  MessageSquare,
  HelpCircle,
  FileSpreadsheet,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { PurposeCampaignGroup } from "@/types/callIntelligence";

interface PurposeGroupCardsProps {
  groups: PurposeCampaignGroup[];
  selectedGroupId: string | null;
  onSelectGroup: (groupId: string | null) => void;
  onExportGroupKeyPoints?: (group: PurposeCampaignGroup) => void;
  onExportGroupTranscripts?: (group: PurposeCampaignGroup) => void;
}

export default function PurposeGroupCards({
  groups,
  selectedGroupId,
  onSelectGroup,
  onExportGroupKeyPoints,
  onExportGroupTranscripts,
}: PurposeGroupCardsProps) {
  // Aggregate stats across all groups
  const totalCalls = groups.reduce((acc, g) => acc + g.totalContacts, 0);
  const totalCompleted = groups.reduce((acc, g) => acc + g.completed, 0);
  const totalInProgress = groups.reduce((acc, g) => acc + g.inProgress, 0);
  const totalQueued = groups.reduce((acc, g) => acc + g.queued, 0);
  const totalFailed = groups.reduce((acc, g) => acc + g.failed, 0);
  const overallProgress = totalCalls > 0 ? Math.round((totalCompleted / totalCalls) * 100) : 0;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "admissions":
        return <GraduationCap className="w-4 h-4 text-orange-600" />;
      case "fees":
        return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case "sales":
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      case "appointment":
        return <Calendar className="w-4 h-4 text-purple-600" />;
      case "feedback":
        return <MessageSquare className="w-4 h-4 text-rose-600" />;
      default:
        return <HelpCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-3">
      {/* Group Navigation Bar / Title */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#707684] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#283A50]" />
            <span>Call Intelligence by Purpose &amp; Campaign</span>
          </span>
          <span className="text-xs bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] px-2 py-0.5 rounded-full font-semibold">
            {groups.length} Purpose Groups
          </span>
        </div>

        {/* View All Toggle */}
        <button
          type="button"
          onClick={() => onSelectGroup(null)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            selectedGroupId === null
              ? "bg-[#283A50] text-white shadow-xs"
              : "bg-white text-[#707684] hover:text-[#283A50] border border-[#E9E1D4] hover:border-[#283A50]/30"
          }`}
        >
          <span>All Purpose Groups ({totalCalls})</span>
        </button>
      </div>

      {/* Grid of Purpose Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {groups.map((group) => {
          const isSelected = selectedGroupId === group.id;
          return (
            <div
              key={group.id}
              onClick={() => onSelectGroup(isSelected ? null : group.id)}
              className={`relative text-left p-4 rounded-2xl border transition-all cursor-pointer bg-white flex flex-col justify-between ${
                isSelected
                  ? "border-[#283A50] ring-2 ring-[#283A50]/10 shadow-md bg-[#FAF8F5]"
                  : "border-[#E9E1D4] hover:border-[#283A50]/40 hover:shadow-xs"
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center shrink-0">
                      {getCategoryIcon(group.category)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#283A50] leading-tight line-clamp-1">
                        {group.title}
                      </h3>
                      <p className="text-[11px] text-[#707684] line-clamp-1">
                        Campaign: <span className="font-medium text-[#283A50]">{group.campaignName}</span>
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#283A50] text-white shrink-0">
                      Active
                    </span>
                  )}
                </div>

                {/* Progress Bar */}
                <div className="mt-3.5">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-[#707684] font-medium">Campaign Progress</span>
                    <span className="font-mono font-bold text-[#283A50]">{group.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-[#FAF5E9] border border-[#E9E1D4] rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#2E8066] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, group.progressPercent))}%` }}
                    />
                  </div>
                </div>

                {/* Status Badges Matrix */}
                <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-[#E9E1D4]/60 text-center">
                  <div className="bg-[#FAF5E9] p-1.5 rounded-lg border border-[#E9E1D4]/60">
                    <div className="text-[10px] text-[#707684] font-semibold">Total</div>
                    <div className="text-xs font-mono font-bold text-[#283A50]">{group.totalContacts}</div>
                  </div>

                  <div className="bg-amber-50/70 p-1.5 rounded-lg border border-amber-200/60">
                    <div className="text-[10px] text-amber-800 font-semibold">Queued</div>
                    <div className="text-xs font-mono font-bold text-amber-900">{group.queued}</div>
                  </div>

                  <div className="bg-indigo-50/70 p-1.5 rounded-lg border border-indigo-200/60">
                    <div className="text-[10px] text-indigo-800 font-semibold">Active</div>
                    <div className="text-xs font-mono font-bold text-indigo-900">{group.inProgress}</div>
                  </div>

                  <div className="bg-emerald-50/70 p-1.5 rounded-lg border border-emerald-200/60">
                    <div className="text-[10px] text-emerald-800 font-semibold">Done</div>
                    <div className="text-xs font-mono font-bold text-emerald-900">{group.completed}</div>
                  </div>
                </div>

                {/* Sub row with failed & remaining */}
                <div className="flex items-center justify-between text-[11px] text-[#707684] mt-2 px-1">
                  <span>
                    Failed/Skipped: <strong className="text-rose-700 font-mono">{group.failed + group.skipped}</strong>
                  </span>
                  <span>
                    Remaining: <strong className="text-[#283A50] font-mono">{group.remaining}</strong>
                  </span>
                </div>
              </div>

              {/* Card Footer Quick Actions */}
              <div className="mt-3 pt-2.5 border-t border-[#E9E1D4]/80 flex items-center justify-between gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExportGroupKeyPoints?.(group);
                  }}
                  className="inline-flex items-center gap-1 font-semibold text-[#283A50] hover:text-[#2E8066] transition-colors py-0.5 px-1.5 rounded hover:bg-[#FAF5E9]"
                  title="Export Key Points Excel & PDF for this purpose group"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#2E8066]" />
                  <span>Key Points</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExportGroupTranscripts?.(group);
                  }}
                  className="inline-flex items-center gap-1 font-semibold text-[#283A50] hover:text-[#283A50]/70 transition-colors py-0.5 px-1.5 rounded hover:bg-[#FAF5E9]"
                  title="Download combined transcript PDF for this purpose group"
                >
                  <FileText className="w-3.5 h-3.5 text-[#283A50]" />
                  <span>Transcripts (PDF)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
