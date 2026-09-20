"use client";

import React from "react";
import { mockKnowledgeBase } from "@/data/mock/dashboardData";
import { BookOpen, CheckCircle2, RefreshCw, AlertCircle, Upload, ArrowUpRight, FileText, Database, Layers } from "lucide-react";

interface KnowledgeBaseStatusProps {
  onManageKnowledge?: () => void;
  onUploadDoc?: () => void;
}

export default function KnowledgeBaseStatus({
  onManageKnowledge,
  onUploadDoc,
}: KnowledgeBaseStatusProps) {
  const readyCount = 21;
  const processingCount = 2;
  const failedCount = 1;
  const totalDocs = 24;

  return (
    <div className="liquid-glass-card p-7 transition-all duration-300 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 border border-black/5 text-neutral-700">
              Knowledge Graph Health
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
              Zero Hallucinations Flagged
            </span>
          </div>

          <button
            onClick={onUploadDoc}
            className="text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-xl border border-black/5 transition-all inline-flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Doc</span>
          </button>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
            Institutional RAG Corpus
          </h3>
          <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {totalDocs} Active Sources
          </span>
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">
          Last synchronized: <strong className="text-neutral-800 font-medium">Today, 10:42 AM</strong>
        </p>
      </div>

      {/* 3 Status Counters with Thin Black Borders */}
      <div className="grid grid-cols-3 gap-3.5 my-5">
        <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10 hover:border-black/30 hover:-translate-y-0.5 transition-all text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-neutral-500 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Indexed</span>
          </div>
          <div className="text-2xl font-semibold text-neutral-900 font-mono">
            {readyCount}
          </div>
        </div>

        <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10 hover:border-black/30 hover:-translate-y-0.5 transition-all text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-neutral-500 mb-1">
            <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
            <span>Processing</span>
          </div>
          <div className="text-2xl font-semibold text-neutral-900 font-mono">
            {processingCount}
          </div>
        </div>

        <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10 hover:border-black/30 hover:-translate-y-0.5 transition-all text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-neutral-500 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Failed</span>
          </div>
          <div className="text-2xl font-semibold text-neutral-900 font-mono">
            {failedCount}
          </div>
        </div>
      </div>

      {/* Processing Animation Highlight */}
      <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10 mb-5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-medium text-neutral-800 flex items-center gap-2 truncate">
            <FileText className="w-4 h-4 text-neutral-500 shrink-0" />
            <span className="truncate">Hostel Rules, Mess Menu & Campus Accommodation.pdf</span>
          </span>
          <span className="text-[11px] font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 shrink-0 ml-2">
            84% Vectorized
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full w-[84%] transition-all" />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onManageKnowledge}
        className="w-full py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
      >
        <Layers className="w-4 h-4" />
        <span>Manage Institutional Knowledge Vector Store</span>
      </button>
    </div>
  );
}
