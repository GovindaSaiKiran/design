"use client";

import React, { useState } from "react";
import { X, FileText, Upload, Check, Sparkles, Database, ShieldCheck } from "lucide-react";

interface UploadKnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocUploaded?: (title: string) => void;
}

export default function UploadKnowledgeModal({
  isOpen,
  onClose,
  onDocUploaded,
}: UploadKnowledgeModalProps) {
  const [docName, setDocName] = useState("JoSAA_Cutoffs_Scholarship_Matrix_2026-27.pdf");
  const [category, setCategory] = useState("Academic & Course Info");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onDocUploaded?.(docName);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 overflow-hidden text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center shadow-xs">
              <Database className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8ac926]">KNOWLEDGE BASE</div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Add Document Context
              </h3>
              <p className="text-xs text-slate-500">
                Vector embeddings for zero-hallucination voice agents
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-[#cdfb56] text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dropzone & Category */}
        <div className="my-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5 text-xs">
              Document Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 font-medium text-slate-800 focus:border-[#cdfb56] focus:outline-none transition-all cursor-pointer shadow-2xs"
            >
              <option value="Academic & Course Info">Academic & Course Info (B.Tech, AI & ML, MBA)</option>
              <option value="Fees & Scholarships">Fees, TFW & Merit Scholarships (35% - 100%)</option>
              <option value="Campus & Hostel">Campus Infrastructure & Hostel Regulations</option>
              <option value="Admissions Policy">JoSAA / State CET Cutoffs & Eligibility Matrix</option>
            </select>
          </div>

          <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#cdfb56] bg-[#f7fee7]/20 hover:bg-[#f7fee7]/40 text-center cursor-pointer transition-all">
            <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2.5 stroke-[1.5]" />
            <div className="font-bold text-slate-900 text-sm break-all font-mono">
              {docName}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              PDF (4.8 MB) • 140 vector embedding chunks will be indexed
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#cdfb56]/40 text-slate-950 border border-[#cdfb56]">
              Instant grounding for all autonomous voice personas
            </span>
          </div>

          <div className="p-3.5 bg-[#f7fee7] border border-[#cdfb56]/60 rounded-2xl text-xs text-slate-900 flex items-start gap-2.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#8ac926] shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong>Zero Hallucination Grounding:</strong> Voice agents cite this document directly when answering tuition fees, cutoff ranks, and hostel questions.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-[#f7fee7] border border-slate-200 hover:border-[#cdfb56] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#cdfb56] hover:bg-[#bef03f] border border-[#bceb42] shadow-xs inline-flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>{isProcessing ? "Indexing Vectors..." : "Index & Embed Context"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
