"use client";

import React from "react";
import { LiveCallItem, RecentCallRecord } from "@/types/dashboard";
import LiveCallsFeed from "../components/LiveCallsFeed";
import RecentCallsTable from "../components/RecentCallsTable";
import { PhoneCall, Radio, Download, Sparkles } from "lucide-react";

interface CallsViewProps {
  liveCalls: LiveCallItem[];
  recentCalls: RecentCallRecord[];
  onViewLiveCall: (call: LiveCallItem) => void;
  onSelectRecentCall: (call: RecentCallRecord) => void;
  onExportReport: () => void;
}

export default function CallsView({
  liveCalls,
  recentCalls,
  onViewLiveCall,
  onSelectRecentCall,
  onExportReport,
}: CallsViewProps) {
  return (
    <div className="space-y-6 pb-12 select-none font-sans animate-in fade-in duration-300 text-[#1A1A1A]">
      {/* 1. Header Card */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9C2FA]/40 border border-[#D9C2FA] text-xs font-semibold text-[#5B21B6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acoustic Monitoring & Verbatim Archives</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Live Calls & Telephony Transcripts
            </h1>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed">
              Real-time acoustic stream monitoring, dual-channel audio waveform visualizers, sentiment analysis, and verbatim Indic language transcripts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#C1F2D5] text-xs font-semibold text-[#16856B]">
              <span className="w-2 h-2 rounded-full bg-[#16856B] animate-pulse" />
              <span>{liveCalls.length} Active SIP Sessions</span>
            </div>
            <button
              onClick={onExportReport}
              className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Export Call Transcripts</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Stream Panel */}
      <LiveCallsFeed
        liveCalls={liveCalls}
        onViewCall={onViewLiveCall}
      />

      {/* Comprehensive Call History */}
      <RecentCallsTable
        calls={recentCalls}
        onSelectCall={onSelectRecentCall}
      />
    </div>
  );
}
