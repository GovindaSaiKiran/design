"use client";

import React from "react";
import { KnowledgeDocument } from "@/types/dashboard";
import { BookOpen, Upload, FileText, CheckCircle2, RefreshCw, AlertCircle, Database, Search } from "lucide-react";
import KnowledgeBaseStatus from "../components/KnowledgeBaseStatus";

interface KnowledgeViewProps {
  documents: KnowledgeDocument[];
  onUploadDoc: () => void;
}

export default function KnowledgeView({
  documents,
  onUploadDoc,
}: KnowledgeViewProps) {
  return (
    <div className="space-y-6 pb-12">
      {/* Neo-Brutalist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38]">
              Retrieval Augmented Generation (RAG)
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              24 Active Documents
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
            Institutional Knowledge Base
          </h1>
          <p className="text-xs font-bold text-black/70 mt-1 max-w-xl">
            Upload course brochures, fee structures, hostel rules, and academic calendars to ground all AI voice agents in verified college facts.
          </p>
        </div>

        <button
          onClick={onUploadDoc}
          className="px-5 py-3 rounded-xl bg-[#d6ff38] hover:bg-black hover:text-[#d6ff38] text-black border-3 border-black text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Upload className="w-4 h-4 stroke-[3]" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Status Bar */}
      <KnowledgeBaseStatus
        onManageKnowledge={() => {}}
        onUploadDoc={onUploadDoc}
      />

      {/* Document Vector Table */}
      <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <h3 className="text-base font-black text-black uppercase tracking-tight mb-4 pb-3 border-b-2 border-black">
          Vectorized Document Repository
        </h3>

        <div className="divide-y-2 divide-black/10">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#d6ff38]/20 rounded-xl px-3 transition-colors border border-transparent hover:border-black"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center shrink-0 mt-0.5 shadow-[2px_2px_0px_#000000]">
                  <FileText className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-black text-black text-sm">
                    {doc.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-black/70 mt-0.5">
                    <span>Category: <strong className="text-black">{doc.category}</strong></span>
                    <span>• {doc.fileSize}</span>
                    <span>• {doc.vectorChunks} chunks</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
                <span className="text-black/60 font-mono font-bold text-xs">{doc.lastUpdated}</span>
                {doc.status === "ready" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" /> Ready
                  </span>
                )}
                {doc.status === "processing" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#fef08a] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <RefreshCw className="w-3.5 h-3.5 stroke-[2.5] animate-spin" /> Processing
                  </span>
                )}
                {doc.status === "failed" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-rose-200 text-rose-900 border-2 border-black shadow-[2px_2px_0px_#000000]">
                    <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" /> Failed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
