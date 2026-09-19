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
  const [fileName, setFileName] = useState("College_Applicants_And_Inquiries_Q3.csv");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-white rounded-3xl border-4 border-black shadow-[10px_10px_0px_#000000] p-6 sm:p-7 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]">
              <Upload className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-black uppercase tracking-tight">
                Upload Student List
              </h3>
              <p className="text-xs font-bold text-black/70">
                Import CSV, XLSX student inquiry records
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

        {/* Dropzone */}
        <div className="my-5 p-6 rounded-2xl border-3 border-dashed border-black bg-[#ffe600]/20 text-center cursor-pointer shadow-[4px_4px_0px_#000000]">
          <FileSpreadsheet className="w-10 h-10 text-black mx-auto mb-2 animate-bounce stroke-[2]" />
          <div className="font-black text-black text-sm">
            {fileName}
          </div>
          <p className="text-xs font-bold text-black/70 mt-1">
            450 valid student phone numbers detected with names, target courses & PCM scores
          </p>
          <span className="inline-block mt-3 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
            Auto Mapping: Phone, Name, Target Course
          </span>
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
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#d6ff38] hover:bg-[#bbf01b] border-3 border-black shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] inline-flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{isUploaded ? "Importing..." : "Confirm & Import 450 Leads"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
