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
    <div className="w-full bg-white rounded-2xl p-5 sm:p-6 border-3 border-black shadow-[6px_6px_0px_#000000] select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-3 h-3 rounded-full bg-[#d6ff38] border-2 border-black inline-block animate-ping" />
            <h3 className="text-base sm:text-lg font-black text-black tracking-tight uppercase">
              Active Outbound Batch Calling Campaign
            </h3>
          </div>
          <p className="text-xs text-black/70">
            <strong className="bg-[#d6ff38] text-black px-2 py-0.5 rounded border border-black font-black mr-1.5">{campaign.title}</strong>
            Target Audience: <span className="text-black font-black">{campaign.targetAudience}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] flex items-center gap-1.5 cursor-pointer ${
              isRunning
                ? "bg-[#ffe600] text-black"
                : "bg-[#d6ff38] text-black"
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
            className="px-4 py-2 rounded-xl bg-[#00f0ff] hover:bg-[#38bdf8] text-black text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4 stroke-[3]" />
            <span>Upload Next List</span>
          </button>
        </div>
      </div>

      {/* Progress Bar & Breakdown */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-black font-black">
            Calling Progress: {campaign.completedCount.toLocaleString()} / {campaign.totalContacts.toLocaleString()} Contacts Dialed
          </span>
          <span className="text-black bg-[#d6ff38] px-3 py-0.5 rounded-md border-2 border-black font-black shadow-[2px_2px_0px_#000000]">
            {completedPct}% COMPLETED
          </span>
        </div>

        {/* Multi-Segment Color Progress Bar */}
        <div className="w-full h-4 bg-slate-200 border-2 border-black rounded-full overflow-hidden flex shadow-[2px_2px_0px_#000000]">
          {/* Interested / Completed */}
          <div
            style={{ width: `${completedPct * 0.65}%` }}
            className="h-full bg-[#d6ff38] border-r-2 border-black transition-all duration-500"
            title="Interested Students"
          />
          {/* Call Later */}
          <div
            style={{ width: `${completedPct * 0.23}%` }}
            className="h-full bg-[#ffe600] border-r-2 border-black transition-all duration-500"
            title="Call Later Scheduled"
          />
          {/* Not Interested */}
          <div
            style={{ width: `${completedPct * 0.12}%` }}
            className="h-full bg-[#ff8080] border-r-2 border-black transition-all duration-500"
            title="Not Interested / Opt-Out"
          />
        </div>

        {/* Progress Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-black mt-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#d6ff38] border border-black inline-block" />
            <span>Interested & Enrolling (428)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ffe600] border border-black inline-block" />
            <span>Callbacks Scheduled (194)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff8080] border border-black inline-block" />
            <span>Not Interested (132)</span>
          </div>
          <div className="flex items-center gap-1.5 text-black font-mono text-[11px] font-black">
            <span>Remaining: {remainingCount}</span>
          </div>
        </div>
      </div>

      {/* Concurrent AI Agents Telephony Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="flex items-center gap-3 bg-[#f8fafc] p-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div className="w-10 h-10 rounded-xl bg-[#c084fc] border-2 border-black flex items-center justify-center font-black text-black shrink-0 shadow-[2px_2px_0px_#000000]">
            <Bot className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-black text-black">Maya AI (Line 1)</div>
            <div className="text-[11px] text-black font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#d6ff38] border border-black animate-pulse" />
              On Call: B.Tech CSE Lead
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#f8fafc] p-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div className="w-10 h-10 rounded-xl bg-[#00f0ff] border-2 border-black flex items-center justify-center font-black text-black shrink-0 shadow-[2px_2px_0px_#000000]">
            <Bot className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-black text-black">Priya AI (Line 2)</div>
            <div className="text-[11px] text-black font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#d6ff38] border border-black animate-pulse" />
              On Call: MBA FinTech Inquiry
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#f8fafc] p-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000]">
          <div className="w-10 h-10 rounded-xl bg-[#ffe600] border-2 border-black flex items-center justify-center font-black text-black shrink-0 shadow-[2px_2px_0px_#000000]">
            <Bot className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xs font-black text-black">Vikram AI (Line 3)</div>
            <div className="text-[11px] text-black font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] border border-black" />
              Dialing Next Number in Queue
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
