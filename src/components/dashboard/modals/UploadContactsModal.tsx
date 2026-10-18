"use client";

import React, { useState } from "react";
import { X, Upload, FileSpreadsheet, Check } from "lucide-react";

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
            <div className="w-10 h-10 rounded-2xl bg-[#FFD9A0] text-[#1A1A1A] flex items-center justify-center shrink-0 shadow-xs">
              <Upload className="w-4 h-4 text-[#1A1A1A]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">CONTACT LIST</span>
              <h3 className="text-sm font-bold text-[#1A1A1A]">
                Import Contacts List
              </h3>
              <p className="text-xs text-black/55">
                Upload CSV or Excel file with telephone numbers and lead fields
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

        {/* Dropzone */}
        <div className="my-5 p-6 rounded-2xl border-2 border-dashed border-black/10 hover:border-black/30 bg-[#FBF7ED] text-center cursor-pointer transition-all">
          <FileSpreadsheet className="w-8 h-8 text-[#1A1A1A] mx-auto mb-2 opacity-80" />
          <div className="font-semibold text-[#1A1A1A] text-xs">
            {fileName}
          </div>
          <p className="text-xs text-black/55 mt-1">
            450 valid phone numbers detected with board scores and parent contacts
          </p>
          <span className="inline-block mt-3 px-3 py-1 rounded-full text-[11px] font-medium bg-[#BCD0F5]/50 text-blue-950 border border-[#A8C3F0]/60">
            Auto-Mapped: Phone (+91), Candidate Name, Target Course, Language
          </span>
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
            <span>{isUploaded ? "Importing..." : "Confirm & Import 450 Leads"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
