"use client";

import React, { useState } from "react";
import { X, Upload, FileSpreadsheet, Check, Sparkles, AlertCircle } from "lucide-react";

interface UploadContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactsUploaded?: (count: number) => void;
}

export default function UploadContactsModal({
  isOpen,
  onClose,
  onContactsUploaded,
}: UploadContactsModalProps) {
  const [fileName, setFileName] = useState("JoSAA_High_Percentile_Applicants_2026.csv");
  const [isUploaded, setIsUploaded] = useState(false);

  if (!isOpen) return null;

  const handleUpload = () => {
    setIsUploaded(true);
    setTimeout(() => {
      onContactsUploaded?.(450);
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
              <Upload className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#8ac926]">CANDIDATE INGESTION</div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                Import Candidate Register
              </h3>
              <p className="text-xs text-slate-500">
                Import CSV / Excel applicant files with Indic phoneme tags
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

        {/* Dropzone */}
        <div className="my-6 p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#cdfb56] bg-[#f7fee7]/20 hover:bg-[#f7fee7]/40 text-center cursor-pointer transition-all">
          <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto mb-2.5 stroke-[1.5]" />
          <div className="font-bold text-slate-900 text-sm font-mono">
            {fileName}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            450 valid Indian phone numbers detected with PCM Board scores, target branches & parent contacts
          </p>
          <span className="inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-bold bg-[#cdfb56]/40 text-slate-950 border border-[#cdfb56]">
            Auto-Mapped: Phone (+91), Candidate Name, PCM %, Language Preference
          </span>
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
            className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-[#cdfb56] hover:bg-[#bef03f] border border-[#bceb42] shadow-xs inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>{isUploaded ? "Importing..." : "Confirm & Import 450 Leads"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
