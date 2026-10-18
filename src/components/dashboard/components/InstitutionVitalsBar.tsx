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
  onFilterCategory,
}: InstitutionVitalsBarProps) {
  return (
    <div className="w-full mb-6 select-none font-sans text-[#1A1A1A]">
      {/* Subtitle Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#16856B] animate-pulse" />
          <h2 className="text-sm font-bold text-[#1A1A1A] tracking-tight">
            {currentOrg.name}
          </h2>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white border border-black/[0.06] text-black/60 shadow-2xs">
            Verified Workspace Telephony Gateway
          </span>
        </div>
        <p className="text-xs text-black/50 font-medium">
          Click any segment card to filter call intelligence and recordings
        </p>
      </div>

      {/* 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Interested Contacts */}
        <div
          onClick={() => onFilterCategory?.("interested")}
          className={`bg-white rounded-[24px] p-5 sm:p-6 transition-all duration-200 cursor-pointer border shadow-2xs hover:shadow-md ${
            activeCategory === "interested"
              ? "border-[#16856B]/60 ring-2 ring-[#C1F2D5] shadow-md -translate-y-0.5"
              : "border-black/[0.06] hover:border-black/15"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16856B] inline-block animate-pulse" />
              Interested Contacts
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#C1F2D5] text-[#16856B] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="w-3 h-3 stroke-[2.5]" /> 0% Yield
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1.5">
            <div className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              0
            </div>
            <span className="text-[10px] font-semibold bg-[#FAF3E4] text-black/70 px-2.5 py-0.5 rounded-full border border-black/[0.06]">
              0 today
            </span>
          </div>

          <p className="text-xs text-black/50 line-clamp-1">
            Confirmed interest, qualified leads & scheduled meetings
          </p>

          <div className="w-full bg-black/5 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-[#16856B] h-full rounded-full transition-all duration-500" style={{ width: "0%" }} />
          </div>
        </div>

        {/* Card 2: Follow-Up Queue */}
        <div
          onClick={() => onFilterCategory?.("call_later")}
          className={`bg-white rounded-[24px] p-5 sm:p-6 transition-all duration-200 cursor-pointer border shadow-2xs hover:shadow-md ${
            activeCategory === "call_later"
              ? "border-[#7A4B00]/40 ring-2 ring-[#FFD9A0] shadow-md -translate-y-0.5"
              : "border-black/[0.06] hover:border-black/15"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7A4B00] inline-block animate-pulse" />
              Follow-Up Queue
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#FFD9A0] text-[#7A4B00] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-3 h-3 stroke-[2.5]" /> 0 In Queue
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1.5">
            <div className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              0
            </div>
            <span className="text-[10px] font-semibold bg-[#FAF3E4] text-black/70 px-2.5 py-0.5 rounded-full border border-black/[0.06]">
              0 pending
            </span>
          </div>

          <p className="text-xs text-black/50 line-clamp-1">
            Scheduled callbacks and rescheduled contact attempts
          </p>

          <div className="w-full bg-black/5 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-[#FFD9A0] h-full rounded-full transition-all duration-500" style={{ width: "0%" }} />
          </div>
        </div>

        {/* Card 3: Not Interested / DND */}
        <div
          onClick={() => onFilterCategory?.("not_interested")}
          className={`bg-white rounded-[24px] p-5 sm:p-6 transition-all duration-200 cursor-pointer border shadow-2xs hover:shadow-md ${
            activeCategory === "not_interested"
              ? "border-[#1B365D]/40 ring-2 ring-[#BCD0F5] shadow-md -translate-y-0.5"
              : "border-black/[0.06] hover:border-black/15"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1B365D] inline-block animate-pulse" />
              Not Interested / DND
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#BCD0F5] text-[#1B365D] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <XCircle className="w-3 h-3 stroke-[2.5]" /> 0 Opted
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1.5">
            <div className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              0
            </div>
            <span className="text-[10px] font-semibold bg-[#FAF3E4] text-black/70 px-2.5 py-0.5 rounded-full border border-black/[0.06]">
              0 today
            </span>
          </div>

          <p className="text-xs text-black/50 line-clamp-1">
            Opted-out, disqualified, or DND registered contacts
          </p>

          <div className="w-full bg-black/5 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-[#BCD0F5] h-full rounded-full transition-all duration-500" style={{ width: "0%" }} />
          </div>
        </div>

        {/* Card 4: Inbound Helpline */}
        <div
          onClick={() => onFilterCategory?.("inbound")}
          className={`bg-white rounded-[24px] p-5 sm:p-6 transition-all duration-200 cursor-pointer border shadow-2xs hover:shadow-md ${
            activeCategory === "inbound"
              ? "border-[#5B21B6]/40 ring-2 ring-[#D9C2FA] shadow-md -translate-y-0.5"
              : "border-black/[0.06] hover:border-black/15"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#5B21B6] inline-block animate-pulse" />
              Inbound Helpline
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#D9C2FA] text-[#5B21B6] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3 stroke-[2.5]" /> Standby
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1.5">
            <div className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] tracking-tight">
              0
            </div>
            <span className="text-[10px] font-semibold bg-[#FAF3E4] text-black/70 px-2.5 py-0.5 rounded-full border border-black/[0.06]">
              0 calls
            </span>
          </div>

          <p className="text-xs text-black/50 line-clamp-1">
            24/7 AI inbound answering & knowledge retrieval
          </p>

          <div className="w-full bg-black/5 rounded-full h-1.5 mt-4 overflow-hidden">
            <div className="bg-[#D9C2FA] h-full rounded-full transition-all duration-500" style={{ width: "0%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
