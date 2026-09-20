"use client";

import React, { useState } from "react";
import { X, Download, FileSpreadsheet, Check, Calendar, Filter, Sparkles } from "lucide-react";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportReportModal({ isOpen, onClose }: ExportReportModalProps) {
  const [format, setFormat] = useState<"csv" | "xlsx" | "pdf">("csv");
  const [range, setRange] = useState("Past 7 Days (842 Calls)");
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-black/15 shadow-2xl p-6 sm:p-8 overflow-hidden text-neutral-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-black/10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-md">
              <Download className="w-6 h-6 stroke-[1.8]" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 font-serif">~ 𑁍 Telemetry Export 𑁍 ~</div>
              <h3 className="font-serif-display text-2xl font-normal text-neutral-900 tracking-tight">
                Export Voice Logs & Data
              </h3>
              <p className="text-xs text-neutral-500">
                Download Indic conversation logs, transcripts & WER scores
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

        {/* Form */}
        <div className="my-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-neutral-700 mb-1.5 text-xs">
              Date Range & Call Dataset
            </label>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#fbfbfd] border border-black/10 text-neutral-800 font-medium focus:border-black focus:outline-none transition-all cursor-pointer"
            >
              <option value="Today (128 Calls • 340K Chars)">Today (128 Calls • 340K Chars)</option>
              <option value="Past 7 Days (842 Calls • 2.4M Chars)">Past 7 Days (842 Calls • 2.4M Chars)</option>
              <option value="Past 30 Days (3,450 Calls • 9.8M Chars)">Past 30 Days (3,450 Calls • 9.8M Chars)</option>
              <option value="All Time Complete Collegiate Archive">All Time Complete Collegiate Archive</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-neutral-700 mb-2 text-xs">
              Dataset Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["csv", "xlsx", "pdf"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={`py-2.5 rounded-xl text-xs uppercase font-semibold transition-all cursor-pointer border ${
                    format === f
                      ? "bg-neutral-900 text-white border-neutral-900 shadow-xs"
                      : "bg-[#fbfbfd] text-neutral-700 hover:bg-neutral-100 border-black/10"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fbfbfd] border border-black/10 text-neutral-700">
            <span className="font-semibold block mb-1 text-xs text-neutral-900">Included In Dataset:</span>
            <span className="text-xs text-neutral-500 leading-relaxed">
              Candidate phone (+91), Indic dialect locale, Bulbul V3 voice persona, First-byte latency (ms), PCM Score triage, and sentiment classification.
            </span>
          </div>
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
            onClick={handleDownload}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 shadow-md inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>{downloaded ? "Dataset Ready!" : "Download Archive"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
