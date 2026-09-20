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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-black/15 shadow-2xl p-6 sm:p-8 overflow-hidden text-neutral-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-black/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-md">
              <Database className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 font-serif">~ 𑁍 Work Agents 𑁍 ~</div>
              <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
                Add Document Context
              </h3>
              <p className="text-xs text-neutral-500">
                Vector embeddings for zero-hallucination voice agents
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dropzone & Category */}
        <div className="my-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1.5 text-xs">
              Document Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#fbfbfd] border border-black/10 font-medium text-neutral-800 focus:border-black focus:outline-none transition-all cursor-pointer"
            >
              <option value="Academic & Course Info">Academic & Course Info (B.Tech, AI & ML, MBA)</option>
              <option value="Fees & Scholarships">Fees, TFW & Merit Scholarships (35% - 100%)</option>
              <option value="Campus & Hostel">Campus Infrastructure & Hostel Regulations</option>
              <option value="Admissions Policy">JoSAA / State CET Cutoffs & Eligibility Matrix</option>
            </select>
          </div>

          <div className="p-6 rounded-2xl border-2 border-dashed border-black/20 bg-[#fbfbfd] hover:bg-neutral-100/70 text-center cursor-pointer transition-all">
            <FileText className="w-10 h-10 text-neutral-400 mx-auto mb-2.5 stroke-[1.5]" />
            <div className="font-semibold text-neutral-900 text-sm break-all font-mono">
              {docName}
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              PDF (4.8 MB) • 140 vector embedding chunks will be indexed
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              Instant grounding for all 6 Bulbul V3 voice personas
            </span>
          </div>

          <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/60 rounded-2xl text-xs text-emerald-950 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong>Zero Hallucination Grounding:</strong> Voice agents cite this document directly when answering tuition fees, cutoff ranks, and hostel questions.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-5 border-t border-black/10">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 border border-black/5 transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={isProcessing}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 shadow-md inline-flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>{isProcessing ? "Indexing Vectors..." : "Index & Embed Context"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
