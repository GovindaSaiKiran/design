"use client";

import React, { useState } from "react";
import { X, FileText, Database, Check, ShieldCheck } from "lucide-react";

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
    }, 700);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs animate-in fade-in duration-150 select-none cursor-default"
    >
      <div className="relative w-full max-w-md bg-white rounded-[28px] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 sm:p-7 overflow-hidden text-[#1A1A1A] font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D9C2FA] text-[#1A1A1A] shadow-xs flex items-center justify-center shrink-0">
              <Database className="w-4 h-4 text-[#1A1A1A]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">KNOWLEDGE REPOSITORY</span>
              <h3 className="text-sm font-bold text-[#1A1A1A]">
                Upload Knowledge Document
              </h3>
              <p className="text-xs text-black/55">
                Ingest PDF, spreadsheet or FAQ manual into vector store
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-black/40 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="my-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
              Knowledge Category:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs px-4 py-2.5 bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:border-black/30 transition-all cursor-pointer font-medium"
            >
              <option value="Academic & Course Info">Academic &amp; Course Info</option>
              <option value="Fee Structures & Scholarships">Fee Structures &amp; Scholarships</option>
              <option value="Hostel & Amenities">Hostel &amp; Amenities</option>
              <option value="Placement Statistics">Placement Statistics</option>
              <option value="Admissions Policies">Admissions Policies</option>
            </select>
          </div>

          {/* File Selected Area */}
          <div className="p-5 rounded-2xl border-2 border-dashed border-black/10 bg-[#FBF7ED] text-center">
            <FileText className="w-7 h-7 text-[#1A1A1A] mx-auto mb-1.5 opacity-80" />
            <div className="font-semibold text-xs text-[#1A1A1A]">{docName}</div>
            <p className="text-[11px] text-black/55 mt-0.5">
              PDF Document • 2.4 MB • 24 Pages
            </p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#16856B] bg-[#C1F2D5]/50 px-3 py-1 rounded-full border border-[#16856B]/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16856B]" />
              <span>Chunks: 142 vectors • Strict zero-hallucination policy</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-black/60 hover:text-[#1A1A1A] bg-white border border-black/[0.08] hover:bg-[#FAF3E4] transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#111111] hover:bg-black shadow-sm inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{isProcessing ? "Vectorizing..." : "Confirm & Ingest"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
