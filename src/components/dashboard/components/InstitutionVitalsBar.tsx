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
    <div className="w-full mb-5 select-none">
      {/* Top Banner: Institution Details + 3 Big 1-Click Fast Actions */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white border-[1.5px] border-black rounded-xl p-4 sm:p-5 shadow-[3px_3px_0px_#000000] mb-4">
        {/* Left: Institute Details */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-black text-[#d6ff38] border-[1.5px] border-black flex items-center justify-center font-bold text-lg shadow-[2px_2px_0px_#d6ff38] shrink-0">
            <Building2 className="w-6 h-6 stroke-[2]" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <span className="text-lg sm:text-xl font-black text-black tracking-tight uppercase">
                {currentOrg.name}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#d6ff38] text-black border border-black shadow-[1px_1px_0px_#000000]">
                <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                PREMIUM INSTITUTION
              </span>
            </div>
            <p className="text-xs text-neutral-700 font-medium">
              AI Calling Engine handling <strong className="text-black bg-[#d6ff38]/60 px-1 py-0.2 rounded border border-black/20 font-bold">1,240 Outbound Leads</strong> and <strong className="text-black bg-[#d6ff38]/60 px-1 py-0.2 rounded border border-black/20 font-bold">342 Inbound Calls</strong> today.
            </p>
          </div>
        </div>

        {/* Right: 3 Big 1-Click Action Buttons for Immediate Fast Access */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={onUploadContacts}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 text-black text-xs font-bold border-[1.5px] border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ Upload List (CSV)</span>
          </button>

          <button
            onClick={onStartCampaign}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 text-black text-xs font-bold border-[1.5px] border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Start Calling Batch</span>
          </button>

          <button
            onClick={onExportReport}
            className="px-4 py-2 rounded-xl bg-[#d6ff38] hover:bg-[#cbf72e] text-black text-xs font-bold border-[1.5px] border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Export Complete History</span>
          </button>
        </div>
      </div>

      {/* 4 Interactive Live Lead Segmentation Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Interested Students */}
        <div
          onClick={() => onFilterCategory?.("interested")}
          className={`rounded-xl p-4 border-[1.5px] border-black shadow-[2.5px_2.5px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0px_#000000] transition-all cursor-pointer group ${
            activeCategory === "interested" ? "bg-[#d6ff38] ring-2 ring-black" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-black uppercase tracking-wider">
              ⭐ Interested Leads
            </span>
            <div className={`w-7 h-7 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000000] flex items-center justify-center ${
              activeCategory === "interested" ? "bg-black text-[#d6ff38]" : "bg-[#d6ff38] text-black"
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-black font-mono tracking-tight mb-1">
            428 <span className="text-[11px] font-bold bg-white text-black px-1.5 py-0.2 border border-black rounded shadow-[1px_1px_0px_#000000]">51% Yield</span>
          </div>
          <p className="text-xs text-neutral-700 font-medium line-clamp-1">
            Campus visits booked, counseling & token fees
          </p>
        </div>

        {/* Card 2: Call Later / Follow-Up */}
        <div
          onClick={() => onFilterCategory?.("call_later")}
          className={`rounded-xl p-4 border-[1.5px] border-black shadow-[2.5px_2.5px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0px_#000000] transition-all cursor-pointer group ${
            activeCategory === "call_later" ? "bg-[#fef9c3] ring-2 ring-black" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-black uppercase tracking-wider">
              ⏰ Call Later / Follow-Up
            </span>
            <div className={`w-7 h-7 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000000] flex items-center justify-center ${
              activeCategory === "call_later" ? "bg-black text-amber-300" : "bg-amber-200 text-black"
            }`}>
              <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-black font-mono tracking-tight mb-1">
            194 <span className="text-[11px] font-bold bg-white text-black px-1.5 py-0.2 border border-black rounded shadow-[1px_1px_0px_#000000]">23% Queue</span>
          </div>
          <p className="text-xs text-neutral-700 font-medium line-clamp-1">
            Parents at office / scheduled callbacks queued
          </p>
        </div>

        {/* Card 3: Not Interested */}
        <div
          onClick={() => onFilterCategory?.("not_interested")}
          className={`rounded-xl p-4 border-[1.5px] border-black shadow-[2.5px_2.5px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0px_#000000] transition-all cursor-pointer group ${
            activeCategory === "not_interested" ? "bg-rose-100 ring-2 ring-black" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-black uppercase tracking-wider">
              🚫 Not Interested / Opt-Out
            </span>
            <div className={`w-7 h-7 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000000] flex items-center justify-center ${
              activeCategory === "not_interested" ? "bg-black text-rose-300" : "bg-rose-200 text-black"
            }`}>
              <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-black font-mono tracking-tight mb-1">
            132 <span className="text-[11px] font-bold bg-white text-black px-1.5 py-0.2 border border-black rounded shadow-[1px_1px_0px_#000000]">16% Opted</span>
          </div>
          <p className="text-xs text-neutral-700 font-medium line-clamp-1">
            Admitted elsewhere / location constraints
          </p>
        </div>

        {/* Card 4: Inbound Helplines */}
        <div
          onClick={() => onFilterCategory?.("inbound")}
          className={`rounded-xl p-4 border-[1.5px] border-black shadow-[2.5px_2.5px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[3.5px_3.5px_0px_#000000] transition-all cursor-pointer group ${
            activeCategory === "inbound" ? "bg-[#d6ff38] ring-2 ring-black" : "bg-white"
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-black uppercase tracking-wider">
              📞 Inbound Helpline Calls
            </span>
            <div className={`w-7 h-7 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#000000] flex items-center justify-center ${
              activeCategory === "inbound" ? "bg-black text-[#d6ff38]" : "bg-[#d6ff38] text-black"
            }`}>
              <PhoneIncoming className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-black font-mono tracking-tight mb-1">
            342 <span className="text-[11px] font-bold bg-white text-black px-1.5 py-0.2 border border-black rounded shadow-[1px_1px_0px_#000000]">0s Hold</span>
          </div>
          <p className="text-xs text-neutral-700 font-medium line-clamp-1">
            100% resolution & instant counseling by Maya AI
          </p>
        </div>
      </div>
    </div>
  );
}
