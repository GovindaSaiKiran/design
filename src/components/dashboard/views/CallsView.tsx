"use client";

import React from "react";
import { LiveCallItem, RecentCallRecord } from "@/types/dashboard";
import LiveCallsFeed from "../components/LiveCallsFeed";
import RecentCallsTable from "../components/RecentCallsTable";
import { PhoneCall, Radio, Filter, Download } from "lucide-react";

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
    <div className="space-y-6 pb-12">
      {/* Neo-Brutalist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38]">
              Telephony Logs & Transcripts
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              {liveCalls.length} Active Sessions
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
            Conversations & Audio Archives
          </h1>
          <p className="text-xs font-bold text-black/70 mt-1 max-w-xl">
            Live acoustic monitoring, conversation transcripts, and automated student qualification intelligence.
          </p>
        </div>

        <button
          onClick={onExportReport}
          className="px-5 py-3 rounded-xl bg-[#d6ff38] hover:bg-black hover:text-[#d6ff38] text-black border-3 border-black text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Export All Transcripts</span>
        </button>
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
