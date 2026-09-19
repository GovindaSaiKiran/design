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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl border-4 border-black shadow-[12px_12px_0px_#000000] p-6 sm:p-7 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]">
              <Database className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-black text-black uppercase">
                Upload Knowledge Document
              </h3>
              <p className="text-xs font-bold text-black/70">
                Vector embeddings for college AI grounding
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-black hover:text-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Dropzone & Category */}
        <div className="my-5 space-y-4 text-xs font-bold text-black">
          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Document Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0px_#000000] font-bold text-black focus:outline-none focus:bg-[#fcffe0]"
            >
              <option value="Academic & Course Info">Academic & Course Info</option>
              <option value="Fees & Scholarships">Fees, TFW & Merit Scholarships</option>
              <option value="Campus & Hostel">Campus Infrastructure & Hostel Rules</option>
              <option value="Admissions Policy">Admissions Policy, Cutoffs & Lateral Entry</option>
            </select>
          </div>

          <div className="p-6 rounded-2xl border-3 border-dashed border-black bg-[#fcffe0] text-center hover:bg-[#d6ff38]/30 transition-colors cursor-pointer shadow-[3px_3px_0px_#000000]">
            <FileText className="w-10 h-10 text-black mx-auto mb-2 stroke-[2.5]" />
            <div className="font-black text-black text-sm">
              {docName}
            </div>
            <p className="text-xs font-bold text-black/70 mt-1">
              PDF (3.4 MB) • 120 vector chunks will be generated
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              Chunks will ground all active AI voice callers
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-3 border-black">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-neutral-100 border-2 border-black shadow-[2px_2px_0px_#000000] cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#d6ff38] hover:bg-black hover:text-[#d6ff38] border-3 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 inline-flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isProcessing ? "Vectorizing..." : "Index & Embed"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
