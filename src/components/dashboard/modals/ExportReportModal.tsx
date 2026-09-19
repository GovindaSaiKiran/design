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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-white rounded-3xl border-4 border-black shadow-[10px_10px_0px_#000000] p-6 sm:p-7 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-3 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]">
              <Download className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-black uppercase tracking-tight">
                Export Telephony Audit
              </h3>
              <p className="text-xs font-bold text-black/70">
                Download call logs, audio index & outcomes
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

        {/* Form */}
        <div className="my-5 space-y-4 text-xs">
          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Date Range
            </label>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-black font-bold shadow-[3px_3px_0px_#000000] focus:outline-none transition-all cursor-pointer"
            >
              <option value="Today (128 Calls)">Today (128 Calls)</option>
              <option value="Past 7 Days (842 Calls)">Past 7 Days (842 Calls)</option>
              <option value="Past 30 Days (3,450 Calls)">Past 30 Days (3,450 Calls)</option>
              <option value="All Time Complete Archive">All Time Complete Archive</option>
            </select>
          </div>

          <div>
            <label className="block font-black text-black uppercase tracking-wider mb-1.5 text-[11px]">
              Export Format
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(["csv", "xlsx", "pdf"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={`py-2.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer border-2 border-black shadow-[2px_2px_0px_#000000] ${
                    format === f
                      ? "bg-[#d6ff38] text-black"
                      : "bg-white text-black hover:bg-[#ffe600]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#00f0ff] border-2 border-black text-black shadow-[3px_3px_0px_#000000]">
            <span className="font-black block mb-0.5 uppercase text-[11px]">Included In Export:</span>
            <span className="text-xs font-bold text-black/80">
              Caller phone, Agent name, Call Duration, Outcome classification, Sentiment scores, Qualification status, and Hand-off annotations.
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
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-[#d6ff38] hover:bg-[#bbf01b] border-3 border-black shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] inline-flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{downloaded ? "Report Generated!" : "Download Report"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
