"use client";

import React from "react";
import { CampaignData } from "@/types/dashboard";
import CampaignProgress from "../components/CampaignProgress";
import {
  Send,
  Plus,
  Users,
  Calendar,
  CheckCircle2,
  PhoneOff,
  AlertTriangle,
  Sparkles,
  Megaphone,
  Check,
  RotateCw,
  Layers,
  ArrowRight,
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
    { title: "Query Candidate Registry", desc: "Select 1,240 applicants scoring 85%+ in 12th PCM / Board exams", status: "completed" },
    { title: "Calculate Merit Scholarship Tier", desc: "Dynamically assign 35% - 50% tuition waiver grants per candidate profile", status: "completed" },
    { title: "Synthesize Bulbul V3 Neural Voice", desc: "Dispatch real-time interactive phone calls in Hindi, Telugu, and English", status: "in-progress" },
    { title: "Dispatch WhatsApp Confirmation Passes", desc: "Instant counseling slot QR code passes delivered to parents upon call completion", status: "queued" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. SARVAM WORK AGENTS HERO: SET THE OUTCOME. DELEGATE THE PROCESS         */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-xs font-semibold text-neutral-800">
              <span className="text-amber-600 font-serif">~ 𑁍 ~</span>
              <span>Work Agents • Autonomous Outreach Orchestration</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight leading-tight">
              Set the outcome. Delegate the process.
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              Describe the admissions goal and connect candidate registers with the institutional knowledge base. Work Agents execute the calling pipeline autonomously and return qualified student enrollment results.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 liquid-glass-subtle px-4 py-2.5 rounded-2xl border border-black/10 text-xs text-neutral-600 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-neutral-900">{campaigns.length} Batches</span>
              <span className="text-neutral-400">•</span>
              <span className="font-semibold text-neutral-900">{aggregatePct}% Overall Progress</span>
            </div>
            <button
              onClick={onStartCampaign}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Launch Outreach Goal</span>
            </button>
          </div>
        </div>

        {/* Work Agents Step-by-Step Goal Plan (Directly from Sarvam Template 2 Pg 2) */}
        <div className="mt-8 pt-6 border-t border-black/10">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Active Goal Execution Pipeline: September High-Rank Engineering Outreach</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {goalDelegationSteps.map((step, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all ${
                  step.status === "completed"
                    ? "bg-emerald-50/50 border-emerald-200/80 text-emerald-950 backdrop-blur-sm"
                    : step.status === "in-progress"
                    ? "bg-amber-50/60 border-amber-300 text-amber-950 ring-1 ring-amber-400/30 backdrop-blur-sm"
                    : "liquid-glass-subtle border-black/10 text-neutral-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-md bg-black/5">
                    Step 0{idx + 1}
                  </span>
                  {step.status === "completed" && (
                    <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px]">
                      ✓
                    </span>
                  )}
                  {step.status === "in-progress" && (
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] animate-spin">
                      ⟳
                    </span>
                  )}
                  {step.status === "queued" && (
                    <span className="w-4 h-4 rounded-full bg-neutral-300 text-white flex items-center justify-center text-[10px]">
                      ○
                    </span>
                  )}
                </div>
                <div className="font-semibold text-xs text-neutral-900 mb-1">{step.title}</div>
                <p className="text-[11px] text-neutral-500 leading-snug">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CAMPAIGNS GRID (GENEROUS SPACING & CLEAN WHITE CARDS)                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
