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
    <div className="w-full bg-white rounded-2xl p-5 sm:p-7 border-3 border-black shadow-[6px_6px_0px_#000000] select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-[#d6ff38] border-2 border-black inline-block animate-pulse" />
            <h3 className="text-base sm:text-lg font-black text-black tracking-tight uppercase">
              Active Outbound Batch Calling Campaign
            </h3>
          </div>
          <p className="text-xs font-bold text-black/80">
            <strong className="bg-[#d6ff38] px-1 py-0.2 border border-black">{campaign.title}</strong> — Target: {campaign.targetAudience}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer ${
              isRunning
                ? "bg-amber-300 hover:bg-amber-400 text-black"
                : "bg-[#d6ff38] hover:bg-[#cbf72e] text-black"
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 stroke-[3]" />
                <span>Pause Batch</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current stroke-[3]" />
                <span>Resume Calling</span>
              </>
            )}
          </button>

          <button
            onClick={onUploadNewBatch}
            className="px-4 py-2 rounded-xl bg-[#d6ff38] hover:bg-[#cbf72e] text-black text-xs font-black border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4 stroke-[3]" />
            <span>Upload Next List</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Breakdown */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-black mb-2">
          <span className="text-black uppercase">
            Calling Progress: {campaign.completedCount.toLocaleString()} / {campaign.totalContacts.toLocaleString()} Contacts Dialed
          </span>
          <span className="text-black bg-[#d6ff38] px-3 py-0.5 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000]">
            {completedPct}% COMPLETED
          </span>
        </div>

        {/* Multi-Segment Color Progress Bar */}
        <div className="w-full h-4 bg-white border-2 border-black rounded-full overflow-hidden flex shadow-inner">
          {/* Interested / Completed */}
          <div
            style={{ width: `${completedPct * 0.65}%` }}
            className="h-full bg-[#d6ff38] border-r-2 border-black transition-all duration-500"
            title="Interested Students"
          />
          {/* Call Later */}
          <div
            style={{ width: `${completedPct * 0.23}%` }}
            className="h-full bg-amber-300 border-r-2 border-black transition-all duration-500"
            title="Call Later Scheduled"
          />
          {/* Not Interested */}
          <div
            style={{ width: `${completedPct * 0.12}%` }}
            className="h-full bg-neutral-300 transition-all duration-500"
            title="Not Interested / Opt-Out"
          />
        </div>

        {/* Progress Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-black text-black mt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#d6ff38] border border-black inline-block" />
            <span>Interested & Enrolling (428)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-300 border border-black inline-block" />
            <span>Callbacks Scheduled (194)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-neutral-300 border border-black inline-block" />
            <span>Not Interested (132)</span>
          </div>
          <div className="flex items-center gap-1.5 text-black/70 font-mono">
            <span>Remaining: {remainingCount}</span>
          </div>
        </div>
      </div>

      {/* Concurrent AI Agents Telephony Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="flex items-center gap-3 bg-[#fcffe0] p-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div className="w-9 h-9 rounded-lg bg-black text-[#d6ff38] border-2 border-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000000]">
            <Bot className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-black text-black">Maya AI (Line 1)</div>
            <div className="text-[11px] text-black font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#d6ff38] border border-black animate-ping" />
              On Call: B.Tech CSE Lead
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#fcffe0] p-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div className="w-9 h-9 rounded-lg bg-black text-[#d6ff38] border-2 border-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000000]">
            <Bot className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-black text-black">Priya AI (Line 2)</div>
            <div className="text-[11px] text-black font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#d6ff38] border border-black animate-ping" />
              On Call: MBA FinTech Inquiry
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#fcffe0] p-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div className="w-9 h-9 rounded-lg bg-black text-[#d6ff38] border-2 border-black flex items-center justify-center font-black text-xs shadow-[2px_2px_0px_#000000]">
            <Bot className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-black text-black">Vikram AI (Line 3)</div>
            <div className="text-[11px] text-black font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400 border border-black" />
              Dialing Next Number in Queue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
