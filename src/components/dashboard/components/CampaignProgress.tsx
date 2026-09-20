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
    <div className="liquid-glass-card p-7 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-black/5">
              Outbound Batch
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border flex items-center gap-1.5 ${
                isPaused
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isPaused ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
                }`}
              />
              {isPaused ? "PAUSED" : "DIALING"}
            </span>
          </div>

          <span className="text-[11px] font-mono text-neutral-500 bg-neutral-100/80 px-2.5 py-0.5 rounded-lg border border-black/5">
            {campaign.estTimeRemaining} left
          </span>
        </div>

        <h3 className="text-lg font-semibold text-neutral-900 tracking-tight group-hover:text-blue-600 transition-colors">
          {campaign.title}
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          Target: <span className="text-neutral-800 font-medium">{campaign.targetAudience}</span>
        </p>
      </div>

      {/* Main Numbers & Progress Section */}
      <div className="my-5">
        <div className="flex items-baseline justify-between mb-2.5">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold font-mono text-neutral-900 tracking-tight">
              {campaign.progressPercent}%
            </span>
            <span className="text-xs text-neutral-500 font-medium">
              ({campaign.completedCount.toLocaleString()} / {campaign.totalContacts.toLocaleString()})
            </span>
          </div>
          <span className="text-xs text-neutral-400 font-medium">
            Progress
          </span>
        </div>

        {/* Multi-segmented Apple Style Progress Bar */}
        <div className="w-full h-3 rounded-full bg-neutral-100 border border-black/5 overflow-hidden flex p-0.5">
          {/* Completed Segment (Emerald) */}
          <div
            style={{ width: `${completedPct}%` }}
            className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
            title={`Completed: ${campaign.completedCount}`}
          />
          {/* No Answer Segment (Amber) */}
          <div
            style={{ width: `${noAnswerPct}%` }}
            className="h-full bg-amber-400 transition-all duration-500"
            title={`No Answer: ${campaign.noAnswerCount}`}
          />
          {/* Failed Segment (Rose) */}
          <div
            style={{ width: `${failedPct}%` }}
            className="h-full bg-rose-400 rounded-r-full transition-all duration-500"
            title={`Failed: ${campaign.failedCount}`}
          />
          {/* Remaining in queue */}
          <div
            style={{ width: `${Math.max(0, remainingPct)}%` }}
            className="h-full bg-transparent"
          />
        </div>

        {/* Sub-breakdown Stats Cards with Thin Black Borders */}
        <div className="grid grid-cols-3 gap-2.5 mt-4 text-center">
          <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5 hover:border-black/15 transition-colors">
            <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-neutral-500 mb-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Done</span>
            </div>
            <div className="text-base font-semibold text-neutral-900 font-mono">
              {campaign.completedCount}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5 hover:border-black/15 transition-colors">
            <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-neutral-500 mb-1">
              <PhoneOff className="w-3 h-3 text-amber-600" />
              <span>No Ans</span>
            </div>
            <div className="text-base font-semibold text-neutral-900 font-mono">
              {campaign.noAnswerCount}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5 hover:border-black/15 transition-colors">
            <div className="flex items-center justify-center gap-1 text-[10px] font-semibold text-neutral-500 mb-1">
              <AlertTriangle className="w-3 h-3 text-rose-600" />
              <span>Retry</span>
            </div>
            <div className="text-base font-semibold text-neutral-900 font-mono">
              {campaign.failedCount}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-4 border-t border-black/10">
        <button
          onClick={() => onViewCampaign?.(campaign)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
        >
          <span>Inspect Batch</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-black/10 hover:border-black/30 transition-all inline-flex items-center gap-1.5 cursor-pointer bg-white text-neutral-800 hover:bg-neutral-50 active:scale-95"
        >
          {isPaused ? (
            <>
              <Play className="w-3.5 h-3.5 fill-current text-neutral-800" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 text-neutral-800" />
              <span>Pause</span>
            </>
          )}
        </button>

        <button
          onClick={onExportResults}
          className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-black/5 text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer active:scale-95"
          title="Export CSV Results"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
