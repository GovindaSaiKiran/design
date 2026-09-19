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
    <div className="w-full mb-6 select-none font-sans">
      {/* Sleek Subtitle Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            {currentOrg.name}
          </h2>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-300">
            Verified Campus
          </span>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Click any card below to filter the student lead registry in real time
        </p>
      </div>

      {/* 4 Authentic Neo-Brutalist 1-Click Interactive Filter Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Interested Leads (Electric Lime) */}
        <div
          onClick={() => onFilterCategory?.("interested")}
          className={`rounded-2xl p-4.5 transition-all duration-150 cursor-pointer border-2.5 border-black bg-[#d6ff38] ${
            activeCategory === "interested"
              ? "shadow-[7px_7px_0px_#000000] -translate-y-1.5 ring-3 ring-black"
              : "shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black inline-block animate-ping" />
              Interested Leads
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider bg-black text-[#d6ff38] px-2.5 py-0.5 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#ffffff] flex items-center gap-1">
              <TrendingUp className="w-3 h-3 stroke-[3]" /> 51% Yield
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1">
            <div className="text-3xl sm:text-4xl font-black text-black font-mono tracking-tight">
              428
            </div>
            <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 rounded-md">
              +38 today
            </span>
          </div>

          <p className="text-xs text-black/90 font-bold line-clamp-1">
            Campus visits booked, counseling & token fees
          </p>

          <div className="w-full bg-black/20 rounded-full h-2 mt-3 overflow-hidden border border-black/40">
            <div className="bg-black h-full rounded-full" style={{ width: "68%" }} />
          </div>
        </div>

        {/* Card 2: Call Later / Follow-Up (Solar Yellow) */}
        <div
          onClick={() => onFilterCategory?.("call_later")}
          className={`rounded-2xl p-4.5 transition-all duration-150 cursor-pointer border-2.5 border-black bg-[#ffe600] ${
            activeCategory === "call_later"
              ? "shadow-[7px_7px_0px_#000000] -translate-y-1.5 ring-3 ring-black"
              : "shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black inline-block animate-ping" />
              Call Later / Queue
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider bg-black text-[#ffe600] px-2.5 py-0.5 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#ffffff] flex items-center gap-1">
              <Clock className="w-3 h-3 stroke-[3]" /> 23% Queue
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1">
            <div className="text-3xl sm:text-4xl font-black text-black font-mono tracking-tight">
              194
            </div>
            <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 rounded-md">
              Avg 4.2h
            </span>
          </div>

          <p className="text-xs text-black/90 font-bold line-clamp-1">
            Parents at office / scheduled callbacks queued
          </p>

          <div className="w-full bg-black/20 rounded-full h-2 mt-3 overflow-hidden border border-black/40">
            <div className="bg-black h-full rounded-full" style={{ width: "38%" }} />
          </div>
        </div>

        {/* Card 3: Not Interested (Cyber Cyan) */}
        <div
          onClick={() => onFilterCategory?.("not_interested")}
          className={`rounded-2xl p-4.5 transition-all duration-150 cursor-pointer border-2.5 border-black bg-[#00f0ff] ${
            activeCategory === "not_interested"
              ? "shadow-[7px_7px_0px_#000000] -translate-y-1.5 ring-3 ring-black"
              : "shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black inline-block animate-ping" />
              Not Interested
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider bg-black text-[#00f0ff] px-2.5 py-0.5 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#ffffff] flex items-center gap-1">
              <XCircle className="w-3 h-3 stroke-[3]" /> 16% Opted
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1">
            <div className="text-3xl sm:text-4xl font-black text-black font-mono tracking-tight">
              132
            </div>
            <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 rounded-md">
              Low Intent
            </span>
          </div>

          <p className="text-xs text-black/90 font-bold line-clamp-1">
            Admitted elsewhere / location constraints
          </p>

          <div className="w-full bg-black/20 rounded-full h-2 mt-3 overflow-hidden border border-black/40">
            <div className="bg-black h-full rounded-full" style={{ width: "22%" }} />
          </div>
        </div>

        {/* Card 4: Inbound Helpline (Pastel Lilac) */}
        <div
          onClick={() => onFilterCategory?.("inbound")}
          className={`rounded-2xl p-4.5 transition-all duration-150 cursor-pointer border-2.5 border-black bg-[#c084fc] ${
            activeCategory === "inbound"
              ? "shadow-[7px_7px_0px_#000000] -translate-y-1.5 ring-3 ring-black"
              : "shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000000]"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-black inline-block animate-ping" />
              Inbound Helpline
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider bg-black text-[#c084fc] px-2.5 py-0.5 rounded-lg border border-black shadow-[1.5px_1.5px_0px_#ffffff] flex items-center gap-1">
              <Zap className="w-3 h-3 stroke-[3]" /> 0s Hold
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-1">
            <div className="text-3xl sm:text-4xl font-black text-black font-mono tracking-tight">
              342
            </div>
            <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 rounded-md">
              100% AI
            </span>
          </div>

          <p className="text-xs text-black/90 font-bold line-clamp-1">
            Instant admission counseling & helpline resolution
          </p>

          <div className="w-full bg-black/20 rounded-full h-2 mt-3 overflow-hidden border border-black/40">
            <div className="bg-black h-full rounded-full" style={{ width: "55%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
