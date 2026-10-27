"use client";

import React from "react";
import { CampaignData } from "@/types/dashboard";
import CampaignProgress from "../components/CampaignProgress";
import {
  Plus,
  Sparkles,
  CheckCircle2,
  Clock,
  CircleDot,
} from "lucide-react";

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
  const totalContactsAcross = campaigns.reduce((acc, c) => acc + c.totalContacts, 0);
  const totalCompletedAcross = campaigns.reduce((acc, c) => acc + c.completedCount, 0);
  const aggregatePct = totalContactsAcross > 0 ? Math.round((totalCompletedAcross / totalContactsAcross) * 100) : 0;

  const goalDelegationSteps = [
    { title: "Query Contact Registry", desc: "Filter and validate target recipient phone numbers and attributes", status: "completed" },
    { title: "Ground Knowledge Base", desc: "Embed service guides, pricing matrices, and FAQ manuals into RAG index", status: "completed" },
    { title: "Synthesize Neural Voice", desc: "Dispatch real-time interactive phone calls across Indic languages and English", status: campaigns.length > 0 ? "in-progress" : "queued" },
    { title: "Dispatch WhatsApp Collateral", desc: "Instant confirmation passes and brochures delivered upon call completion", status: "queued" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans select-none text-[#1A1A1A]">
      {/* 1. Header & Autonomous Outreach Goal */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9C2FA]/40 border border-[#D9C2FA] text-xs font-semibold text-[#5B21B6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Work Agents • Autonomous Outreach Orchestration</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Set the outcome. Delegate the process.
            </h1>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-sans">
              Describe the outreach goal and connect contact registers with the enterprise knowledge base. Work Agents execute the calling pipeline autonomously and return qualified conversation results.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FAF3E4] border border-black/[0.06] text-xs text-black/70">
              <span className="w-2 h-2 rounded-full bg-[#16856B] animate-pulse" />
              <span className="font-semibold text-[#1A1A1A]">{campaigns.length} Batches</span>
              <span className="text-black/20">•</span>
              <span className="font-semibold text-[#1A1A1A]">{aggregatePct}% Overall Progress</span>
            </div>

            <button
              onClick={onStartCampaign}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Launch Outreach Goal</span>
            </button>
          </div>
        </div>

        {/* Work Agents Step-by-Step Goal Plan */}
        <div className="mt-6 pt-6 border-t border-black/[0.06]">
          <div className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#5B21B6]" />
            <span>Active Goal Execution Pipeline: Autonomous Telephony Cadence</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {goalDelegationSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-[20px] border transition-all ${
                  step.status === "completed"
                    ? "bg-[#C1F2D5]/30 border-[#C1F2D5] text-[#1A1A1A]"
                    : step.status === "in-progress"
                    ? "bg-[#FFD9A0]/30 border-[#FFD9A0] text-[#1A1A1A] ring-1 ring-[#FFD9A0]/60"
                    : "bg-[#FAF3E4]/50 border-black/[0.06] text-black/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-black/5 text-black/60">
                    Step 0{idx + 1}
                  </span>
                  {step.status === "completed" && (
                    <span className="w-4 h-4 rounded-full bg-[#16856B] text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  )}
                  {step.status === "in-progress" && (
                    <span className="w-4 h-4 rounded-full bg-[#FFD9A0] text-[#7A4B00] flex items-center justify-center text-[10px] font-bold animate-pulse">
                      ●
                    </span>
                  )}
                  {step.status === "queued" && (
                    <span className="w-4 h-4 rounded-full bg-black/10 text-black/40 flex items-center justify-center text-[10px]">
                      ○
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-[#1A1A1A] mb-1">{step.title}</div>
                <p className="text-[11px] text-black/60 leading-snug">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Campaigns Grid */}
      {campaigns.length === 0 ? (
        <div className="bg-white rounded-[26px] border border-black/[0.06] p-12 text-center shadow-2xs space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF3E4] border border-black/[0.06] flex items-center justify-center mx-auto text-black/40">
            <Sparkles className="w-7 h-7 text-[#5B21B6]" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-[#1A1A1A]">No active campaigns scheduled</h3>
            <p className="text-xs text-black/55 leading-relaxed">
              Launch your first outbound voice campaign to automate customer outreach, qualification surveys, or reminder calls.
            </p>
          </div>
          <button
            onClick={onStartCampaign}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Launch Outreach Campaign</span>
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
}
