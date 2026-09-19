"use client";

import React, { useState } from "react";
import { X, FileText, Upload, Check, Sparkles, Database } from "lucide-react";

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
  const [docName, setDocName] = useState("Apex_BTech_Syllabus_and_Fee_Structure_2026.pdf");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-white rounded-3xl border-4 border-black shadow-[10px_10px_0px_#000000] p-6 sm:p-7 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#00f0ff] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]">
              <Database className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-black uppercase tracking-tight">
                Upload Knowledge Base
              </h3>
              <p className="text-xs font-bold text-black/70">
                Vector embeddings for AI factual grounding
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-[#ff8080] text-black border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Dropzone & Category */}
        <div className="my-5 space-y-4 text-xs">
          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-xs">
              Document Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black font-black text-black shadow-[3px_3px_0px_#000000] focus:outline-none focus:bg-[#d6ff38]/10 transition-all cursor-pointer"
            >
              <option value="Academic & Course Info">Academic & Course Info (B.Tech, MBA)</option>
              <option value="Fees & Scholarships">Fees, TFW & Merit Scholarships</option>
              <option value="Campus & Hostel">Campus Infrastructure & Hostel Rules</option>
              <option value="Admissions Policy">Admissions Policy, Cutoffs & Lateral Entry</option>
            </select>
          </div>

          <div className="p-6 rounded-2xl border-3 border-dashed border-black bg-[#00f0ff]/15 text-center cursor-pointer shadow-[4px_4px_0px_#000000] hover:bg-[#00f0ff]/25 transition-all">
            <FileText className="w-10 h-10 text-black mx-auto mb-2 stroke-[2] animate-bounce" />
            <div className="font-black text-black text-sm break-all">
              {docName}
            </div>
            <p className="text-xs font-bold text-black/70 mt-1">
              PDF (3.4 MB) • 120 vector chunks will be automatically generated
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              Instant ground truth for all active AI voice agents
            </span>
          </div>

          <div className="p-3 bg-[#ffe600]/30 border-2 border-black rounded-xl text-[11px] font-bold text-black flex items-start gap-2 shadow-[2px_2px_0px_#000000]">
            <Sparkles className="w-4 h-4 text-black shrink-0 mt-0.5" />
            <span>
              <strong>Zero Hallucination Guarantee:</strong> Voice agents cite this syllabus directly when answering tuition fees and quota queries.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-black">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-slate-100 border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={isProcessing}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#d6ff38] hover:bg-[#bbf01b] border-3 border-black shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] inline-flex items-center gap-1.5 cursor-pointer transition-all disabled:opacity-50"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isProcessing ? "Indexing Vector Chunks..." : "Index & Embed Document"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
