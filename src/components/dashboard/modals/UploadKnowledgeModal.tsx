"use client";

import React, { useState } from "react";
import { X, FileText, Database, Check, ShieldCheck } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

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

  const handleClose = () => {
    soundSynth.play("click");
    onClose();
  };

  const handleUpload = () => {
    soundSynth.play("confirm");
    setIsProcessing(true);
    setTimeout(() => {
      onDocUploaded?.(docName);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="relative w-full max-w-md bg-[#09090B] rounded-[2px] border border-[#27272A] shadow-2xl p-6 overflow-hidden text-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[2px] bg-white text-black border border-white flex items-center justify-center shrink-0">
              <Database className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A1AA]">
                VECTOR STORE // INGESTION
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                Add Document Context
              </h3>
              <p className="text-[11px] text-[#A1A1AA] font-mono">
                Vector embeddings for zero-hallucination voice agents
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-[2px] bg-[#121215] border border-[#27272A] hover:border-white text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dropzone & Category */}
        <div className="my-5 space-y-4 text-xs font-mono">
          <div>
            <label className="block font-bold text-[#A1A1AA] mb-1.5 text-xs uppercase tracking-wider">
              Document Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 rounded-[2px] bg-[#121215] border border-[#27272A] font-mono text-white focus:border-white focus:outline-none transition-all cursor-pointer shadow-2xs"
            >
              <option value="Academic & Course Info">Academic & Course Info (B.Tech, AI & ML, MBA)</option>
              <option value="Fees & Scholarships">Fees, TFW & Merit Scholarships (35% - 100%)</option>
              <option value="Campus & Hostel">Campus Infrastructure & Hostel Regulations</option>
              <option value="Admissions Policy">JoSAA / State CET Cutoffs & Eligibility Matrix</option>
            </select>
          </div>

          <div className="p-5 rounded-[2px] border border-dashed border-[#27272A] hover:border-white bg-[#121215] text-center cursor-pointer transition-all">
            <FileText className="w-8 h-8 text-white mx-auto mb-2 stroke-[1.5]" />
            <div className="font-bold text-white text-xs break-all font-mono">
              {docName}
            </div>
            <p className="text-[11px] text-[#A1A1AA] mt-1">
              PDF (4.8 MB) • 140 vector embedding chunks will be indexed
            </p>
            <span className="inline-block mt-3 px-2.5 py-1 rounded-[1px] text-[10px] font-mono font-bold bg-[#18181B] text-white border border-[#27272A]">
              Instant grounding for all autonomous voice personas
            </span>
          </div>

          <div className="p-3.5 bg-[#121215] border border-[#27272A] rounded-[2px] text-xs text-white flex items-start gap-2.5 shadow-2xs font-mono">
            <ShieldCheck className="w-4 h-4 text-white shrink-0 mt-0.5" />
            <span className="leading-relaxed text-[11px] text-[#A1A1AA]">
              <strong className="text-white block uppercase tracking-wider mb-0.5">Zero Hallucination Guardrail:</strong> Voice agents cite this document directly when answering tuition fees, cutoff ranks, and hostel questions.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#27272A]">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-[2px] text-xs font-mono font-bold text-[#A1A1AA] hover:text-white bg-transparent border border-[#27272A] hover:border-white transition-all cursor-pointer uppercase"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={isProcessing}
            className="px-5 py-2 rounded-[2px] text-xs font-mono font-bold text-black bg-white hover:bg-zinc-200 border border-white shadow-2xs inline-flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50 uppercase active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{isProcessing ? "Indexing Vectors..." : "Index & Embed Context"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
