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
  const readyCount = mockKnowledgeBase.filter((d) => d.status === "ready").length;
  const processingCount = mockKnowledgeBase.filter((d) => d.status === "processing").length;
  const failedCount = mockKnowledgeBase.filter((d) => d.status === "failed").length;
  const totalDocs = mockKnowledgeBase.length;

  return (
    <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06]">
              Knowledge Graph Health
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold tracking-wider bg-[#C1F2D5] text-[#16856B]">
              RAG Engine Ready
            </span>
          </div>

          <button
            onClick={onUploadDoc}
            className="text-xs font-semibold text-[#1A1A1A] bg-white hover:bg-[#FAF3E4] px-3.5 py-1.5 rounded-full border border-black/[0.08] transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-black/60" />
            <span>Upload Doc</span>
          </button>
        </div>

        <div className="flex items-baseline justify-between mt-3">
          <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight font-sans">
            Knowledge Base Corpus
          </h3>
          <span className="text-xs font-semibold text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
            {totalDocs} Active Sources
          </span>
        </div>
        <p className="text-xs text-black/55 mt-1">
          Grounded semantic search with instant citation retrieval
        </p>
      </div>

      {/* 3 Status Counters with Warm Pastel Surfaces */}
      <div className="grid grid-cols-3 gap-3 my-5">
        <div className="bg-[#FAF3E4]/40 p-4 rounded-2xl border border-black/[0.05] hover:border-black/[0.12] hover:-translate-y-0.5 transition-all text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-black/50 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16856B]" />
            <span>Indexed</span>
          </div>
          <div className="text-2xl font-bold text-[#1A1A1A] font-sans">
            {readyCount}
          </div>
        </div>

        <div className="bg-[#FAF3E4]/40 p-4 rounded-2xl border border-black/[0.05] hover:border-black/[0.12] hover:-translate-y-0.5 transition-all text-center relative overflow-hidden">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-black/50 mb-1">
            <RefreshCw className={`w-3.5 h-3.5 text-[#9A5B00] ${processingCount > 0 ? "animate-spin" : ""}`} />
            <span>Processing</span>
          </div>
          <div className="text-2xl font-bold text-[#1A1A1A] font-sans">
            {processingCount}
          </div>
        </div>

        <div className="bg-[#FAF3E4]/40 p-4 rounded-2xl border border-black/[0.05] hover:border-black/[0.12] hover:-translate-y-0.5 transition-all text-center">
          <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-black/50 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-[#A81D47]" />
            <span>Failed</span>
          </div>
          <div className="text-2xl font-bold text-[#1A1A1A] font-sans">
            {failedCount}
          </div>
        </div>
      </div>

      {/* Document Highlight or Empty State */}
      {totalDocs === 0 ? (
        <div className="bg-[#FAF3E4]/30 p-5 rounded-2xl border border-black/[0.06] text-center mb-5 space-y-1.5">
          <BookOpen className="w-6 h-6 text-black/40 mx-auto" />
          <p className="text-xs font-semibold text-[#1A1A1A]">No knowledge sources uploaded</p>
          <p className="text-[11px] text-black/50 max-w-xs mx-auto">
            Upload PDF, DOCX, or FAQs to ground your AI agents with verified knowledge.
          </p>
        </div>
      ) : (
        <div className="bg-[#FAF3E4]/30 p-4 rounded-2xl border border-black/[0.05] mb-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-[#1A1A1A] flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-black/45 shrink-0" />
              <span className="truncate">{mockKnowledgeBase[0]?.title || "Knowledge Document"}</span>
            </span>
            <span className="text-[10.5px] font-bold text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full shrink-0 ml-2">
              Indexed
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/[0.06] overflow-hidden">
            <div className="h-full bg-[#C1F2D5] rounded-full w-full transition-all" />
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={onManageKnowledge}
        className="w-full py-3 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
      >
        <Layers className="w-4 h-4" />
        <span>Manage Knowledge Vector Store</span>
      </button>
    </div>
  );
}
