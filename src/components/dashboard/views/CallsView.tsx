"use client";

import React from "react";
import { LiveCallItem, RecentCallRecord } from "@/types/dashboard";
import LiveCallsFeed from "../components/LiveCallsFeed";
import RecentCallsTable from "../components/RecentCallsTable";
import { PhoneCall, Radio, Filter, Download, Sparkles } from "lucide-react";

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
    <div className="space-y-10 pb-12 select-none font-sans animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. SARVAM EDITORIAL HERO & ACOUSTIC LOGS HEADER                           */}
      {/* ========================================================================= */}
      <div className="liquid-glass-card p-8 sm:p-10 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-black/10 text-xs font-semibold text-neutral-800">
              <span className="text-amber-600 font-serif">~ 𑁍 ~</span>
              <span>Acoustic Monitoring & Verbatim Archives</span>
            </div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight leading-tight">
              Live Calls & Telephony Transcripts
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              Real-time acoustic stream monitoring, dual-channel audio waveform visualizers, sentiment analysis, and verbatim Indic language transcripts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 liquid-glass-subtle px-4 py-2.5 rounded-2xl border border-black/10 text-xs font-semibold text-neutral-800 shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{liveCalls.length} Active SIP Sessions</span>
            </div>
            <button
              onClick={onExportReport}
              className="px-6 py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4 stroke-[2.2]" />
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
