"use client";

import React, { useState } from "react";
import { X, Upload, FileSpreadsheet, Check } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

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

  const handleClose = () => {
    soundSynth.play("click");
    onClose();
  };

  const handleUpload = () => {
    soundSynth.play("confirm");
    setIsUploaded(true);
    setTimeout(() => {
      onContactsUploaded?.(450);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="relative w-full max-w-md bg-[#09090B] rounded-[2px] border border-[#27272A] shadow-2xl p-6 overflow-hidden text-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[2px] bg-white text-black flex items-center justify-center shrink-0 border border-white">
              <Upload className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A1AA]">
                CANDIDATE INGESTION // CH-IN
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                Import Candidate Register
              </h3>
              <p className="text-[11px] text-[#A1A1AA] font-mono">
                CSV / Excel applicant records with Indic phoneme tags
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

        {/* Dropzone */}
        <div className="my-5 p-5 rounded-[2px] border border-dashed border-[#27272A] hover:border-white bg-[#121215] text-center cursor-pointer transition-all">
          <FileSpreadsheet className="w-8 h-8 text-white mx-auto mb-2 stroke-[1.5]" />
          <div className="font-bold text-white text-xs font-mono">
            {fileName}
          </div>
          <p className="text-[11px] text-[#A1A1AA] mt-1 font-mono">
            450 valid Indian phone numbers detected with PCM Board scores, target branches & parent contacts
          </p>
          <span className="inline-block mt-3 px-2.5 py-1 rounded-[1px] text-[10px] font-mono font-bold bg-[#18181B] text-white border border-[#27272A]">
            Auto-Mapped: Phone (+91), Candidate Name, PCM %, Language Preference
          </span>
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
            className="px-5 py-2 rounded-[2px] text-xs font-mono font-bold text-black bg-white hover:bg-zinc-200 border border-white shadow-2xs inline-flex items-center gap-2 cursor-pointer transition-all active:translate-x-[1px] active:translate-y-[1px] uppercase"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{isUploaded ? "Importing..." : "Confirm & Ingest 450 Leads"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
