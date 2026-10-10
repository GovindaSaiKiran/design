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
  const readyCount = mockKnowledgeBase.filter((d) => d.status === "Ready").length;
  const processingCount = mockKnowledgeBase.filter((d) => d.status === "Processing").length;
  const failedCount = mockKnowledgeBase.filter((d) => d.status === "Failed").length;
  const totalDocs = mockKnowledgeBase.length;

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
              RAG Engine Ready
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
            Knowledge Base Corpus
          </h3>
          <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            {totalDocs} Active Sources
          </span>
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">
          Grounded semantic search with instant citation retrieval
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
            <RefreshCw className={`w-3.5 h-3.5 text-amber-600 ${processingCount > 0 ? "animate-spin" : ""}`} />
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

      {/* Document Highlight or Empty State */}
      {totalDocs === 0 ? (
        <div className="liquid-glass-subtle p-5 rounded-2xl border border-black/10 text-center mb-5 space-y-1.5">
          <BookOpen className="w-6 h-6 text-neutral-400 mx-auto" />
          <p className="text-xs font-semibold text-neutral-800">No knowledge sources uploaded</p>
          <p className="text-[11px] text-neutral-500 max-w-xs mx-auto">
            Upload PDF, DOCX, or FAQs to ground your AI agents with verified knowledge.
          </p>
        </div>
      ) : (
        <div className="liquid-glass-subtle p-4 rounded-2xl border border-black/10 mb-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-medium text-neutral-800 flex items-center gap-2 truncate">
              <FileText className="w-4 h-4 text-neutral-500 shrink-0" />
              <span className="truncate">{mockKnowledgeBase[0].title}</span>
            </span>
            <span className="text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 shrink-0 ml-2">
              Indexed
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-neutral-200 overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full w-full transition-all" />
          </div>
        </div>
      )}

      {/* Action Button */}
      <button
        onClick={onManageKnowledge}
        className="w-full py-3 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
      >
        <Layers className="w-4 h-4" />
        <span>Manage Knowledge Vector Store</span>
      </button>
    </div>
  );
}
