"use client";

import React, { useState } from "react";
import { CampaignData } from "@/types/dashboard";
import { Send, Pause, Play, Download, ExternalLink, Users, PhoneOff, AlertTriangle, CheckCircle2, Plus } from "lucide-react";

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
    <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-[6px_6px_0px_#000000] hover:shadow-[8px_8px_0px_#000000] hover:-translate-y-0.5 transition-all flex flex-col justify-between select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38] border border-black shadow-[2px_2px_0px_#000000] -rotate-1">
              OUTBOUND BATCH
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 ${
                isPaused
                  ? "bg-[#ffe600] text-black"
                  : "bg-[#d6ff38] text-black"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full border border-black ${
                  isPaused ? "bg-black" : "bg-black animate-pulse"
                }`}
              />
              {isPaused ? "PAUSED" : "DIALING"}
            </span>
          </div>

          <button
            onClick={onNewCampaign}
            className="text-[10px] font-black uppercase tracking-wider text-black bg-white hover:bg-[#ffe600] px-2.5 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3 stroke-[3]" />
            New
          </button>
        </div>

        <h3 className="text-lg font-black text-black tracking-tight uppercase">
          {campaign.title}
        </h3>
        <p className="text-xs font-bold text-black/70 mt-0.5">
          Target: <span className="text-black font-black">{campaign.targetAudience}</span>
        </p>
      </div>

      {/* Main Numbers & Progress Section */}
      <div className="my-4">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-black">
              {campaign.progressPercent}%
            </span>
            <span className="text-xs text-black/70 font-bold">
              ({campaign.completedCount.toLocaleString()} / {campaign.totalContacts.toLocaleString()} calls)
            </span>
          </div>
          <span className="text-[11px] font-mono font-black bg-black text-[#00f0ff] px-2.5 py-0.5 rounded-md border-2 border-black shadow-[2px_2px_0px_#000000]">
            {campaign.estTimeRemaining} left
          </span>
        </div>

        {/* Multi-segmented Progress Bar */}
        <div className="w-full h-4 rounded-full bg-slate-200 overflow-hidden flex border-2 border-black shadow-[2px_2px_0px_#000000]">
          {/* Completed Segment (Electric Lime) */}
          <div
            style={{ width: `${completedPct}%` }}
            className="h-full bg-[#d6ff38] border-r-2 border-black transition-all duration-500"
            title={`Completed: ${campaign.completedCount}`}
          />
          {/* No Answer Segment (Sunny Yellow) */}
          <div
            style={{ width: `${noAnswerPct}%` }}
            className="h-full bg-[#ffe600] border-r-2 border-black transition-all duration-500"
            title={`No Answer: ${campaign.noAnswerCount}`}
          />
          {/* Failed Segment (Coral Red) */}
          <div
            style={{ width: `${failedPct}%` }}
            className="h-full bg-[#ff8080] border-r-2 border-black transition-all duration-500"
            title={`Failed: ${campaign.failedCount}`}
          />
          {/* Remaining in queue */}
          <div
            style={{ width: `${Math.max(0, remainingPct)}%` }}
            className="h-full bg-transparent"
          />
        </div>

        {/* Sub-breakdown Stats */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t-2 border-black text-center">
          <div className="p-2.5 rounded-xl bg-[#d6ff38] border-2 border-black shadow-[2px_2px_0px_#000000]">
            <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase text-black mb-0.5">
              <CheckCircle2 className="w-3 h-3 stroke-[3]" />
              <span>Done</span>
            </div>
            <div className="text-base font-black text-black font-mono">
              {campaign.completedCount}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#ffe600] border-2 border-black shadow-[2px_2px_0px_#000000]">
            <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase text-black mb-0.5">
              <PhoneOff className="w-3 h-3 stroke-[3]" />
              <span>No Ans</span>
            </div>
            <div className="text-base font-black text-black font-mono">
              {campaign.noAnswerCount}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-[#ff8080] border-2 border-black shadow-[2px_2px_0px_#000000]">
            <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase text-black mb-0.5">
              <AlertTriangle className="w-3 h-3 stroke-[3]" />
              <span>Retry</span>
            </div>
            <div className="text-base font-black text-black font-mono">
              {campaign.failedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t-2 border-black">
        <button
          onClick={() => onViewCampaign?.(campaign)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#00f0ff] hover:bg-[#38bdf8] text-black text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Inspect</span>
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all inline-flex items-center gap-1.5 cursor-pointer bg-white text-black hover:bg-[#ffe600]"
        >
          {isPaused ? (
            <>
              <Play className="w-3.5 h-3.5 fill-current text-black" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 stroke-[3] text-black" />
              <span>Pause</span>
            </>
          )}
        </button>

        <button
          onClick={onExportResults}
          className="p-2 rounded-xl bg-[#d6ff38] text-black border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] hover:bg-[#bbf01b] transition-all cursor-pointer"
          title="Export CSV Results"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
