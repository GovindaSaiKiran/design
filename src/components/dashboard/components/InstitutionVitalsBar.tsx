"use client";

import React from "react";
import {
  TrendingUp,
  Clock,
  XCircle,
  Zap,
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
  onFilterCategory,
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
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-neutral-200 text-neutral-600 shadow-2xs">
            Verified Workspace Telephony Gateway
          </span>
        </div>
        <p className="text-xs text-neutral-500 font-medium">
          Click any segment card to filter call intelligence and recordings
        </p>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Interested Contacts */}
        <div
          onClick={() => onFilterCategory?.("interested")}
          className={`bg-white/95 backdrop-blur-xl rounded-3xl p-6 transition-all duration-200 cursor-pointer border shadow-2xs hover:shadow-md ${
            activeCategory === "interested"
              ? "border-emerald-500/80 ring-2 ring-emerald-500/20 shadow-md -translate-y-0.5"
              : "border-neutral-200/90 hover:border-neutral-300"
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Interested Contacts
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 stroke-[2.5]" /> 0% Yield
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="text-3xl sm:text-4xl font-normal text-neutral-900 font-serif-display tracking-tight">
              0
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              0 today
            </span>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-1">
            Confirmed interest, qualified leads & scheduled meetings
          </p>

          <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "0%" }} />
          </div>
        </div>

        {/* Card 2: Follow-Up Queue */}
        <div
          onClick={() => onFilterCategory?.("call_later")}
          className={`bg-white/95 backdrop-blur-xl rounded-3xl p-6 transition-all duration-200 cursor-pointer border shadow-2xs hover:shadow-md ${
            activeCategory === "call_later"
              ? "border-amber-500/80 ring-2 ring-amber-500/20 shadow-md -translate-y-0.5"
              : "border-neutral-200/90 hover:border-neutral-300"
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse" />
              Follow-Up Queue
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
              <Clock className="w-3 h-3 stroke-[2.5]" /> 0 In Queue
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="text-3xl sm:text-4xl font-normal text-neutral-900 font-serif-display tracking-tight">
              0
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              0 pending
            </span>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-1">
            Scheduled callbacks and rescheduled contact attempts
          </p>

          <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: "0%" }} />
          </div>
        </div>

        {/* Card 3: Not Interested / DND */}
        <div
          onClick={() => onFilterCategory?.("not_interested")}
          className={`bg-white/95 backdrop-blur-xl rounded-3xl p-6 transition-all duration-200 cursor-pointer border shadow-2xs hover:shadow-md ${
            activeCategory === "not_interested"
              ? "border-blue-500/80 ring-2 ring-blue-500/20 shadow-md -translate-y-0.5"
              : "border-neutral-200/90 hover:border-neutral-300"
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block animate-pulse" />
              Not Interested / DND
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full border border-blue-200 flex items-center gap-1">
              <XCircle className="w-3 h-3 stroke-[2.5]" /> 0 Opted
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="text-3xl sm:text-4xl font-normal text-neutral-900 font-serif-display tracking-tight">
              0
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              0 today
            </span>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-1">
            Opted-out, disqualified, or DND registered contacts
          </p>

          <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: "0%" }} />
          </div>
        </div>

        {/* Card 4: Inbound Helpline */}
        <div
          onClick={() => onFilterCategory?.("inbound")}
          className={`bg-white/95 backdrop-blur-xl rounded-3xl p-6 transition-all duration-200 cursor-pointer border shadow-2xs hover:shadow-md ${
            activeCategory === "inbound"
              ? "border-purple-500/80 ring-2 ring-purple-500/20 shadow-md -translate-y-0.5"
              : "border-neutral-200/90 hover:border-neutral-300"
          }`}
        >
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 inline-block animate-pulse" />
              Inbound Helpline
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
              <Zap className="w-3 h-3 stroke-[2.5]" /> Standby
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <div className="text-3xl sm:text-4xl font-normal text-neutral-900 font-serif-display tracking-tight">
              0
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
              0 calls
            </span>
          </div>

          <p className="text-xs text-neutral-500 line-clamp-1">
            24/7 AI inbound answering & knowledge retrieval
          </p>

          <div className="w-full bg-neutral-100 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: "0%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
