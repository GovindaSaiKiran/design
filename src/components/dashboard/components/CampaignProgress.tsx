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
    <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-[6px_6px_0px_#000000] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-black text-[#d6ff38]">
              Outbound Batch
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center gap-1.5 ${
                isPaused
                  ? "bg-[#fef08a] text-black"
                  : "bg-[#d6ff38] text-black"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full border border-black ${
                  isPaused ? "bg-black" : "bg-black animate-ping"
                }`}
              />
              {isPaused ? "Paused" : "Dialing"}
            </span>
          </div>

          <button
            onClick={onNewCampaign}
            className="text-[11px] font-black uppercase text-black hover:bg-[#d6ff38] px-2 py-0.5 rounded border border-black transition-colors inline-flex items-center gap-1"
          >
            <Plus className="w-3 h-3 stroke-[3]" />
            New Batch
          </button>
        </div>

        <h3 className="text-lg font-black text-black tracking-tight uppercase">
          {campaign.title}
        </h3>
        <p className="text-xs font-bold text-black/70 mt-0.5">
          Audience: <span className="text-black">{campaign.targetAudience}</span>
        </p>
      </div>

      {/* Main Numbers & Progress Section */}
      <div className="my-4">
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-black">
              {campaign.progressPercent}%
            </span>
            <span className="text-xs text-black/70 font-bold">
              ({campaign.completedCount.toLocaleString()} / {campaign.totalContacts.toLocaleString()} called)
            </span>
          </div>
          <span className="text-[11px] font-mono font-bold bg-[#fcffe0] px-2 py-0.5 rounded border border-black text-black">
            {campaign.estTimeRemaining}
          </span>
        </div>

        {/* Multi-segmented Neo-Brutalist Progress Bar */}
        <div className="w-full h-4 rounded-lg bg-neutral-100 overflow-hidden flex border-2 border-black shadow-[2px_2px_0px_#000000]">
          {/* Completed Segment (Electric Lime) */}
          <div
            style={{ width: `${completedPct}%` }}
            className="h-full bg-[#d6ff38] border-r-2 border-black transition-all duration-500"
            title={`Completed: ${campaign.completedCount}`}
          />
          {/* No Answer Segment (Yellow) */}
          <div
            style={{ width: `${noAnswerPct}%` }}
            className="h-full bg-[#fef08a] border-r-2 border-black transition-all duration-500"
            title={`No Answer: ${campaign.noAnswerCount}`}
          />
          {/* Failed Segment (Rose) */}
          <div
            style={{ width: `${failedPct}%` }}
            className="h-full bg-rose-300 border-r-2 border-black transition-all duration-500"
            title={`Failed: ${campaign.failedCount}`}
          />
          {/* Remaining in queue */}
          <div
            style={{ width: `${Math.max(0, remainingPct)}%` }}
            className="h-full bg-transparent"
          />
        </div>

        {/* Sub-breakdown Stats */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t-2 border-black/10 text-center">
          <div className="p-2 rounded-xl bg-[#fcffe0] border-2 border-black shadow-[2px_2px_0px_#000000]">
            <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase text-black mb-0.5">
              <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
              <span>Done</span>
            </div>
            <div className="text-sm font-black text-black font-mono">
              {campaign.completedCount}
            </div>
          </div>

          <div className="p-2 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000000]">
            <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase text-black mb-0.5">
              <PhoneOff className="w-3 h-3 stroke-[2.5]" />
              <span>No Ans</span>
            </div>
            <div className="text-sm font-black text-black font-mono">
              {campaign.noAnswerCount}
            </div>
          </div>

          <div className="p-2 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000000]">
            <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase text-black mb-0.5">
              <AlertTriangle className="w-3 h-3 stroke-[2.5]" />
              <span>Retry</span>
            </div>
            <div className="text-sm font-black text-black font-mono">
              {campaign.failedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t-2 border-black">
        <button
          onClick={() => onViewCampaign?.(campaign)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#d6ff38] text-black text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 hover:bg-black hover:text-[#d6ff38] transition-all cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Inspect</span>
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-1 cursor-pointer ${
            isPaused
              ? "bg-[#d6ff38] text-black"
              : "bg-white text-black hover:bg-neutral-100"
          }`}
        >
          {isPaused ? (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Pause</span>
            </>
          )}
        </button>

        <button
          onClick={onExportResults}
          className="p-2 rounded-xl bg-white text-black border-2 border-black shadow-[2px_2px_0px_#000000] hover:bg-[#d6ff38] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          title="Export CSV Results"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
