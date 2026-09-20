"use client";

import React from "react";
import {
  Building2,
  CheckCircle2,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  XCircle,
  Download,
  Upload,
  Bot,
  Sparkles,
  Zap,
  ArrowUpRight,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";
import { OrganizationInfo } from "@/types/dashboard";

interface InstitutionVitalsBarProps {
  currentOrg: OrganizationInfo;
  activeCategory?: string;
  onUploadContacts?: () => void;
  onExportReport?: () => void;
  onStartCampaign?: () => void;
  onCreateAgent?: () => void;
  onFilterCategory?: (category: string) => void;
}

export default function InstitutionVitalsBar({
  currentOrg,
  activeCategory = "interested",
  onUploadContacts,
  onExportReport,
  onStartCampaign,
  onCreateAgent,
  onFilterCategory
}: InstitutionVitalsBarProps) {
  return (
    <div className="w-full mb-8 select-none font-sans">
      {/* Subtitle Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-sm font-semibold text-neutral-900 tracking-tight font-serif-display">
            {currentOrg.name}
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/80 backdrop-blur-md text-neutral-600 border border-black/10 shadow-xs">
            Verified Indic Telephony Gateway
          </span>
        </div>
        <p className="text-xs text-neutral-500 font-normal">
          Click any segment card to filter candidate admissions transcripts & recordings
        </p>
      </div>

      {/* 4 Sarvam-Inspired Liquid Glass Filter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Interested Leads (Sage / Emerald) */}
        <div
          onClick={() => onFilterCategory?.("interested")}
          className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
            activeCategory === "interested"
              ? "liquid-glass-card ring-2 ring-emerald-500/30 border-emerald-500/40 shadow-xl -translate-y-1"
              : "liquid-glass-card hover:-translate-y-1"
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Interested Enrollees
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 stroke-[2.5]" /> 51% Yield
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="text-3xl sm:text-4xl font-semibold text-neutral-900 font-mono tracking-tight font-serif-display">
              428
            </div>
            <span className="text-[10px] font-semibold bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded-full">
              +38 today
            </span>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-1">
            Campus visits booked, scholarship pre-approvals & token fees
          </p>

          <div className="w-full bg-black/5 rounded-full h-1.5 mt-4 overflow-hidden border border-black/5">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "68%" }} />
          </div>
        </div>

        {/* Card 2: Call Later / Follow-Up (Peach / Amber) */}
        <div
          onClick={() => onFilterCategory?.("call_later")}
          className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
            activeCategory === "call_later"
              ? "liquid-glass-card ring-2 ring-amber-500/30 border-amber-500/40 shadow-xl -translate-y-1"
              : "liquid-glass-card hover:-translate-y-1"
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse" />
              Follow-Up Queue
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
              <Clock className="w-3 h-3 stroke-[2.5]" /> 23% Queue
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="text-3xl sm:text-4xl font-semibold text-neutral-900 font-mono tracking-tight font-serif-display">
              194
            </div>
            <span className="text-[10px] font-semibold bg-amber-100/70 text-amber-800 px-2 py-0.5 rounded-full">
              Avg 4.2h
            </span>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-1">
            Parents at office meetings / evening callbacks requested
          </p>

          <div className="w-full bg-black/5 rounded-full h-1.5 mt-4 overflow-hidden border border-black/5">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: "38%" }} />
          </div>
        </div>

        {/* Card 3: Not Interested / Disqualified (Sky / Cyan) */}
        <div
          onClick={() => onFilterCategory?.("not_interested")}
          className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
            activeCategory === "not_interested"
              ? "liquid-glass-card ring-2 ring-blue-500/30 border-blue-500/40 shadow-xl -translate-y-1"
              : "liquid-glass-card hover:-translate-y-1"
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block animate-pulse" />
              Not Interested / Opt-Out
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
              <XCircle className="w-3 h-3 stroke-[2.5]" /> 16% Opted
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="text-3xl sm:text-4xl font-semibold text-neutral-900 font-mono tracking-tight font-serif-display">
              132
            </div>
            <span className="text-[10px] font-semibold bg-blue-100/70 text-blue-800 px-2 py-0.5 rounded-full">
              JoSAA NIT / NEET
            </span>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-1">
            Admitted into IITs/NITs or shifted to medical track
          </p>

          <div className="w-full bg-black/5 rounded-full h-1.5 mt-4 overflow-hidden border border-black/5">
            <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: "22%" }} />
          </div>
        </div>

        {/* Card 4: Inbound Helpline (Periwinkle / Indigo) */}
        <div
          onClick={() => onFilterCategory?.("inbound")}
          className={`rounded-3xl p-6 transition-all duration-300 cursor-pointer ${
            activeCategory === "inbound"
              ? "liquid-glass-card ring-2 ring-purple-500/30 border-purple-500/40 shadow-xl -translate-y-1"
              : "liquid-glass-card hover:-translate-y-1"
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-semibold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 inline-block animate-pulse" />
              Inbound Helpline
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
              <Zap className="w-3 h-3 stroke-[2.5]" /> 0s Wait
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="text-3xl sm:text-4xl font-semibold text-neutral-900 font-mono tracking-tight font-serif-display">
              342
            </div>
            <span className="text-[10px] font-semibold bg-purple-100/70 text-purple-800 px-2 py-0.5 rounded-full">
              100% Autonomous
            </span>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-1">
            24/7 Prospectus RAG answering & lateral entry inquiries
          </p>

          <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-4 overflow-hidden border border-black/5">
            <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: "55%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
