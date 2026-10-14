"use client";

import React, { useState } from "react";
import { X, Download, Check } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportReportModal({ isOpen, onClose }: ExportReportModalProps) {
  const [format, setFormat] = useState<"csv" | "xlsx" | "pdf">("csv");
  const [range, setRange] = useState("Past 7 Days (842 Calls)");
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    try {
      soundSynth.play("click");
    } catch {}
    onClose();
  };

  const handleDownload = () => {
    try {
      soundSynth.play("confirm");
    } catch {}
    setDownloaded(true);
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 select-none cursor-default"
    >
      <div className="relative w-full max-w-md bg-[#09090B] rounded-[2px] border border-[#27272A] shadow-2xl p-6 overflow-hidden text-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[2px] bg-white text-black border border-white flex items-center justify-center shrink-0">
              <Download className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A1AA]">
                TELEMETRY ARCHIVE // EXPORT
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight uppercase">
                Export Telephony Records
              </h3>
              <p className="text-[11px] text-[#A1A1AA] font-mono">
                Download conversation logs, verbatim transcripts & WER scores
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-1.5 rounded-[2px] bg-[#121215] border border-[#27272A] hover:border-white text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 pointer-events-none" />
          </button>
        </div>

        {/* Form */}
        <div className="my-5 space-y-4 text-xs font-mono">
          <div>
            <label className="block font-bold text-[#A1A1AA] mb-1.5 text-xs uppercase tracking-wider">
              Date Range &amp; Call Dataset
            </label>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full px-3.5 py-2 rounded-[2px] bg-[#121215] border border-[#27272A] text-white font-mono focus:border-white focus:outline-none transition-all cursor-pointer shadow-2xs"
            >
              <option value="Today (128 Calls • 340K Chars)">Today (128 Calls • 340K Chars)</option>
              <option value="Past 7 Days (842 Calls • 2.4M Chars)">Past 7 Days (842 Calls • 2.4M Chars)</option>
              <option value="Past 30 Days (3,450 Calls • 9.8M Chars)">Past 30 Days (3,450 Calls • 9.8M Chars)</option>
              <option value="All Time Complete Archive">All Time Complete Archive</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#A1A1AA] mb-2 text-xs uppercase tracking-wider">
              Dataset Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["csv", "xlsx", "pdf"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    soundSynth.play("click");
                    setFormat(f);
                  }}
                  className={`py-2 rounded-[2px] text-xs uppercase font-bold transition-all cursor-pointer border ${
                    format === f
                      ? "bg-white text-black border-white shadow-2xs"
                      : "bg-[#121215] text-[#A1A1AA] hover:text-white border-[#27272A] hover:border-white"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-[2px] bg-[#121215] border border-[#27272A] text-white shadow-2xs">
            <span className="font-bold block mb-1 text-xs text-white uppercase tracking-wider">Included In Dataset:</span>
            <span className="text-[11px] text-[#A1A1AA] leading-relaxed">
              Caller phone (+91), Indic dialect locale, Voice persona, First-byte latency (ms), PCM Score triage, and sentiment classification.
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
            onClick={handleDownload}
            className="px-5 py-2 rounded-[2px] text-xs font-mono font-bold text-black bg-white hover:bg-zinc-200 border border-white shadow-2xs inline-flex items-center gap-2 cursor-pointer transition-all uppercase active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{downloaded ? "Dataset Ready" : "Download Archive"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
