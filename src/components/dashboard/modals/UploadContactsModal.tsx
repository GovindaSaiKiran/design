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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-black/15 shadow-2xl p-6 sm:p-8 overflow-hidden text-neutral-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-black/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-md">
              <Upload className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 font-serif">~ 𑁍 Candidate Ingestion 𑁍 ~</div>
              <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
                Import Candidate Register
              </h3>
              <p className="text-xs text-neutral-500">
                Import CSV / Excel applicant files with Indic phoneme tags
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

        {/* Dropzone */}
        <div className="my-6 p-6 rounded-2xl border-2 border-dashed border-black/20 bg-[#fbfbfd] hover:bg-neutral-100/70 text-center cursor-pointer transition-all">
          <FileSpreadsheet className="w-10 h-10 text-neutral-400 mx-auto mb-2.5 stroke-[1.5]" />
          <div className="font-semibold text-neutral-900 text-sm font-mono">
            {fileName}
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            450 valid Indian phone numbers detected with PCM Board scores, target branches & parent contacts
          </p>
          <span className="inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            Auto-Mapped: Phone (+91), Candidate Name, PCM %, Language Preference
          </span>
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
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 shadow-md inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>{isUploaded ? "Importing..." : "Confirm & Import 450 Leads"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
