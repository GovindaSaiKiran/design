"use client";

import React from "react";
import { CampaignData } from "@/types/dashboard";
import CampaignProgress from "../components/CampaignProgress";
import { Send, Plus, Users, Calendar, CheckCircle2, PhoneOff, AlertTriangle } from "lucide-react";

interface CampaignsViewProps {
  campaigns: CampaignData[];
  onStartCampaign: () => void;
  onExportResults: () => void;
}

export default function CampaignsView({
  campaigns,
  onStartCampaign,
  onExportResults,
}: CampaignsViewProps) {
  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Neo-Brutalist Campaigns Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md bg-black text-[#d6ff38] border-2 border-black shadow-[2px_2px_0px_#000000] -rotate-1">
              🚀 HIGH-THROUGHPUT OUTBOUND
            </span>
            <span className="px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              {campaigns.length} BATCHES RUNNING
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
            Outbound Calling Campaigns
          </h1>
          <p className="text-xs font-bold text-black/70 mt-1 max-w-xl">
            Schedule high-throughput batch outreach, entrance exam notifications, merit scholarship qualification, and fee payment verification.
          </p>
        </div>

        <button
          onClick={onStartCampaign}
          className="px-5 py-3 rounded-xl bg-[#d6ff38] hover:bg-[#bbf01b] text-black text-xs font-black uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Launch New Batch</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <CampaignProgress
            key={camp.id}
            campaign={camp}
            onNewCampaign={onStartCampaign}
            onExportResults={onExportResults}
          />
        ))}
      </div>
    </div>
  );
}
