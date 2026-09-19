"use client";

import React, { useState } from "react";
import { X, Download, FileSpreadsheet, Check, Calendar, Filter } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-white rounded-2xl border-4 border-black shadow-[10px_10px_0px_#000000] p-6 sm:p-7 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
              <Download className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-base font-black text-black uppercase">
                Export Telephony Audit
              </h3>
              <p className="text-xs font-bold text-black/70">
                Download call logs, recordings index & outcomes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#fcffe0] text-black border-2 border-black flex items-center justify-center transition-all shadow-[2px_2px_0px_#000000] active:translate-x-0.5 cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Form */}
        <div className="my-5 space-y-4 text-xs">
          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5">
              Date Range
            </label>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-black font-bold shadow-[3px_3px_0px_#000000] focus:outline-none"
            >
              <option value="Today (128 Calls)">Today (128 Calls)</option>
              <option value="Past 7 Days (842 Calls)">Past 7 Days (842 Calls)</option>
              <option value="Past 30 Days (3,450 Calls)">Past 30 Days (3,450 Calls)</option>
              <option value="All Time Complete Archive">All Time Complete Archive</option>
            </select>
          </div>

          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(["csv", "xlsx", "pdf"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={`py-2 rounded-xl text-xs font-black uppercase border-2 border-black transition-all cursor-pointer ${
                    format === f
                      ? "bg-[#d6ff38] text-black shadow-[3px_3px_0px_#000000] -translate-y-0.5"
                      : "bg-white text-black shadow-[2px_2px_0px_#000000] hover:bg-[#fcffe0]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#fcffe0] border-2 border-black shadow-[3px_3px_0px_#000000] text-black">
            <span className="font-black block mb-0.5 uppercase text-[11px]">Includes In Export:</span>
            <span className="text-xs font-medium">
              Caller phone, Agent name, Call Duration, Outcome classification, Sentiment scores, Qualification status, and Hand-off annotations.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-black">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-black text-black bg-white hover:bg-neutral-100 border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl text-xs font-black text-black bg-[#d6ff38] hover:bg-[#cbf72e] border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{downloaded ? "Report Generated!" : "Download Report"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
