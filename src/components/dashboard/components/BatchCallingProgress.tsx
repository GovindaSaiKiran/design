"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  PhoneOutgoing,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  XCircle,
  Upload,
  Sparkles,
  Users,
  Activity,
  Bot
} from "lucide-react";
import { CampaignData } from "@/types/dashboard";

interface BatchCallingProgressProps {
  campaign: CampaignData;
  onUploadNewBatch?: () => void;
  onStartNewCampaign?: () => void;
}

export default function BatchCallingProgress({
  campaign,
  onUploadNewBatch,
  onStartNewCampaign
}: BatchCallingProgressProps) {
  const [isRunning, setIsRunning] = useState(true);

  const completedPct = Math.round((campaign.completedCount / campaign.totalContacts) * 100);
  const remainingCount = campaign.totalContacts - campaign.completedCount;

  return (
    <div className="w-full bg-white/80 backdrop-blur-2xl rounded-3xl p-7 border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:border-black/20 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-black/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping" />
            <h3 className="text-lg font-semibold text-neutral-900 tracking-tight">
              Active Outbound Batch Telephony
            </h3>
          </div>
          <p className="text-xs text-neutral-500">
            <strong className="bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded-md border border-black/5 font-semibold mr-1.5">{campaign.title}</strong>
            Target Segment: <span className="text-neutral-800 font-medium">{campaign.targetAudience}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              isRunning
                ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-700" />
                <span>Pause Batch</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current text-emerald-700" />
                <span>Resume Dialing</span>
              </>
            )}
          </button>

          <button
            onClick={onUploadNewBatch}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Next List</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Breakdown */}
      <div className="mb-7">
        <div className="flex items-center justify-between text-xs font-medium mb-2.5">
          <span className="text-neutral-700">
            Calling Progress: <span className="font-semibold text-neutral-900">{campaign.completedCount.toLocaleString()}</span> / {campaign.totalContacts.toLocaleString()} Contacts Dialed
          </span>
          <span className="text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200 text-xs font-semibold">
            {completedPct}% Completed
          </span>
        </div>

        {/* Multi-Segment Color Progress Bar */}
        <div className="w-full h-3 bg-neutral-100 border border-black/5 rounded-full overflow-hidden flex p-0.5">
          <div
            style={{ width: `${completedPct * 0.65}%` }}
            className="h-full bg-emerald-500 rounded-l-full transition-all duration-500"
            title="Interested Students"
          />
          <div
            style={{ width: `${completedPct * 0.23}%` }}
            className="h-full bg-amber-400 transition-all duration-500"
            title="Callbacks Scheduled"
          />
          <div
            style={{ width: `${completedPct * 0.12}%` }}
            className="h-full bg-rose-400 rounded-r-full transition-all duration-500"
            title="Not Interested / Opt-Out"
          />
        </div>

        {/* Progress Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-600 mt-4 pt-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span>Interested & Enrolling (428)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span>Callbacks Scheduled (194)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
            <span>Not Interested (132)</span>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-700 font-mono text-xs font-medium">
            <span>Remaining in Queue: {remainingCount}</span>
          </div>
        </div>
      </div>

      {/* Concurrent AI Agents Telephony Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-neutral-50/80 p-4 rounded-2xl border border-black/5 hover:border-black/15 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center font-semibold shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-900">Maya AI (Line 1)</div>
            <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              On Call: B.Tech CSE Lead
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-neutral-50/80 p-4 rounded-2xl border border-black/5 hover:border-black/15 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center font-semibold shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-900">Priya AI (Line 2)</div>
            <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              On Call: MBA FinTech Inquiry
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-neutral-50/80 p-4 rounded-2xl border border-black/5 hover:border-black/15 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 border border-amber-200 flex items-center justify-center font-semibold shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-neutral-900">Vikram AI (Line 3)</div>
            <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Dialing Next Number in Queue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
