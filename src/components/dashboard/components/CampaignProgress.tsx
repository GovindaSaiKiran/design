"use client";

import React, { useState } from "react";
import { CampaignData } from "@/types/dashboard";
import { Send, Pause, Play, Download, ExternalLink, Users, PhoneOff, AlertTriangle, CheckCircle2, Plus, Clock, ArrowUpRight } from "lucide-react";

interface CampaignProgressProps {
  campaign: CampaignData;
  onViewCampaign?: (campaign: CampaignData) => void;
  onNewCampaign?: () => void;
  onExportResults?: () => void;
}

export default function CampaignProgress({
  campaign,
  onViewCampaign,
  onNewCampaign,
  onExportResults,
}: CampaignProgressProps) {
  const [isPaused, setIsPaused] = useState(campaign.status === "paused");

  const completedPct = (campaign.completedCount / campaign.totalContacts) * 100;
  const noAnswerPct = (campaign.noAnswerCount / campaign.totalContacts) * 100;
  const failedPct = (campaign.failedCount / campaign.totalContacts) * 100;
  const remainingPct = 100 - (completedPct + noAnswerPct + failedPct);

  return (
    <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between group relative">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06]">
              Outbound Batch
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-wide flex items-center gap-1.5 ${
                isPaused
                  ? "bg-[#FFD9A0] text-[#9A5B00]"
                  : "bg-[#C1F2D5] text-[#16856B]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isPaused ? "bg-[#9A5B00]" : "bg-[#16856B] animate-pulse"
                }`}
              />
              {isPaused ? "PAUSED" : "DIALING"}
            </span>
          </div>

          <span className="text-[11px] font-medium text-black/50 bg-[#FAF3E4]/70 px-2.5 py-0.5 rounded-full border border-black/[0.06]">
            {campaign.estTimeRemaining} left
          </span>
        </div>

        <h3 className="text-lg font-bold text-[#1A1A1A] tracking-tight font-sans">
          {campaign.title}
        </h3>
        <p className="text-xs text-black/55 mt-1">
          Target: <span className="text-[#1A1A1A] font-semibold">{campaign.targetAudience}</span>
        </p>
      </div>

      {/* Main Numbers & Progress Section */}
      <div className="my-5">
        <div className="flex items-baseline justify-between mb-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#1A1A1A] tracking-tight font-sans">
              {campaign.progressPercent}%
            </span>
            <span className="text-xs text-black/55 font-medium">
              ({campaign.completedCount.toLocaleString()} / {campaign.totalContacts.toLocaleString()})
            </span>
          </div>
          <span className="text-xs text-black/45 font-medium">
            Progress
          </span>
        </div>

        {/* Multi-segmented Apple Style Progress Bar */}
        <div className="w-full h-3 rounded-full bg-[#FAF3E4] border border-black/[0.05] overflow-hidden flex p-0.5">
          {/* Completed Segment (Mint) */}
          <div
            style={{ width: `${completedPct}%` }}
            className="h-full bg-[#C1F2D5] rounded-l-full transition-all duration-500"
            title={`Completed: ${campaign.completedCount}`}
          />
          {/* No Answer Segment (Peach) */}
          <div
            style={{ width: `${noAnswerPct}%` }}
            className="h-full bg-[#FFD9A0] transition-all duration-500"
            title={`No Answer: ${campaign.noAnswerCount}`}
          />
          {/* Failed Segment (Rose) */}
          <div
            style={{ width: `${failedPct}%` }}
            className="h-full bg-[#FFC0D3] rounded-r-full transition-all duration-500"
            title={`Failed: ${campaign.failedCount}`}
          />
          {/* Remaining in queue */}
          <div
            style={{ width: `${Math.max(0, remainingPct)}%` }}
            className="h-full bg-transparent"
          />
        </div>

        {/* Sub-breakdown Stats Cards with Pastel Surfaces */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 text-center">
          <div className="p-3 rounded-2xl bg-[#FAF3E4]/40 border border-black/[0.05] hover:border-black/[0.12] transition-colors">
            <div className="flex items-center justify-center gap-1 text-[10.5px] font-semibold text-black/50 mb-1">
              <CheckCircle2 className="w-3 h-3 text-[#16856B]" />
              <span>Done</span>
            </div>
            <div className="text-base font-bold text-[#1A1A1A] font-sans">
              {campaign.completedCount}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF3E4]/40 border border-black/[0.05] hover:border-black/[0.12] transition-colors">
            <div className="flex items-center justify-center gap-1 text-[10.5px] font-semibold text-black/50 mb-1">
              <PhoneOff className="w-3 h-3 text-[#9A5B00]" />
              <span>No Ans</span>
            </div>
            <div className="text-base font-bold text-[#1A1A1A] font-sans">
              {campaign.noAnswerCount}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF3E4]/40 border border-black/[0.05] hover:border-black/[0.12] transition-colors">
            <div className="flex items-center justify-center gap-1 text-[10.5px] font-semibold text-black/50 mb-1">
              <AlertTriangle className="w-3 h-3 text-[#A81D47]" />
              <span>Retry</span>
            </div>
            <div className="text-base font-bold text-[#1A1A1A] font-sans">
              {campaign.failedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 border-t border-black/[0.05]">
        <button
          onClick={() => onViewCampaign?.(campaign)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <span>Inspect Batch</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-4 py-2.5 rounded-full text-xs font-semibold border border-black/[0.08] hover:bg-[#FAF3E4] transition-all inline-flex items-center gap-1.5 cursor-pointer bg-white text-[#1A1A1A] active:scale-95 shadow-2xs"
        >
          {isPaused ? (
            <>
              <Play className="w-3.5 h-3.5 fill-current text-[#1A1A1A]" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 text-[#1A1A1A]" />
              <span>Pause</span>
            </>
          )}
        </button>

        <button
          onClick={onExportResults}
          className="p-2.5 rounded-full bg-white hover:bg-[#FAF3E4] border border-black/[0.08] text-black/60 hover:text-black transition-colors cursor-pointer active:scale-95 shadow-2xs"
          title="Export CSV Results"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
