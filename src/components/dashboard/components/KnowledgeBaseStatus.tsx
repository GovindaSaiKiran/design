"use client";

import React from "react";
import { mockKnowledgeBase } from "@/data/mock/dashboardData";
import { BookOpen, CheckCircle2, RefreshCw, AlertCircle, Upload, ArrowUpRight, FileText, Database } from "lucide-react";

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
    <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38]">
              RAG & Grounding
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              Zero Hallucinations Flagged
            </span>
          </div>

          <button
            onClick={onUploadDoc}
            className="text-xs font-black uppercase text-black hover:bg-[#d6ff38] px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000] transition-all inline-flex items-center gap-1 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 stroke-[3]" />
            Upload Doc
          </button>
        </div>

        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-black text-black tracking-tight uppercase">
            KNOWLEDGE BASE
          </h3>
          <span className="text-xl font-black font-mono text-black">
            {totalDocs} <span className="text-xs font-bold text-black/70">Documents</span>
          </span>
        </div>
        <p className="text-xs font-bold text-black/70 mt-0.5">
          Last synchronized: <strong className="text-black">Today, 10:42 AM</strong>
        </p>
      </div>

      {/* 3 Status Counters */}
      <div className="grid grid-cols-3 gap-3 my-4">
        <div className="p-3.5 rounded-xl bg-[#d6ff38] border-2 border-black shadow-[3px_3px_0px_#000000] text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-wider text-black mb-0.5">
            <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Ready</span>
          </div>
          <div className="text-xl font-black text-black font-mono">
            {readyCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#fef08a] border-2 border-black shadow-[3px_3px_0px_#000000] text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-wider text-black mb-0.5">
            <RefreshCw className="w-3.5 h-3.5 stroke-[2.5] animate-spin" />
            <span>Processing</span>
          </div>
          <div className="text-xl font-black text-black font-mono">
            {processingCount}
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-rose-200 border-2 border-black shadow-[3px_3px_0px_#000000] text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-wider text-rose-950 mb-0.5">
            <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Failed</span>
          </div>
          <div className="text-xl font-black text-rose-950 font-mono">
            {failedCount}
          </div>
        </div>
      </div>

      {/* Processing Animation Highlight */}
      <div className="p-3.5 rounded-xl bg-[#fcffe0] border-2 border-black shadow-[3px_3px_0px_#000000] mb-4">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="font-black text-black flex items-center gap-1.5 truncate">
            <FileText className="w-4 h-4 stroke-[2.5] shrink-0" />
            <span className="truncate">Hostel Rules, Mess Menu & Campus Accommodation.pdf</span>
          </span>
          <span className="text-[11px] font-mono font-black text-black bg-[#d6ff38] px-2 py-0.5 rounded border border-black shrink-0 ml-2">
            84% Vectorized
          </span>
        </div>
        <div className="w-full h-3 rounded-md bg-white border-2 border-black overflow-hidden">
          <div className="h-full bg-[#d6ff38] border-r-2 border-black w-[84%] transition-all" />
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onManageKnowledge}
        className="w-full py-3 rounded-xl bg-black hover:bg-[#d6ff38] text-[#d6ff38] hover:text-black border-3 border-black text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
      >
        <Database className="w-4 h-4 stroke-[2.5]" />
        <span>Manage College Knowledge Vector Store</span>
      </button>
    </div>
  );
}
