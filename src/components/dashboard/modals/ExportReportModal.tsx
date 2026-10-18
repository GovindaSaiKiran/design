"use client";

import React, { useState } from "react";
import { X, Download, Check } from "lucide-react";

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportReportModal({ isOpen, onClose }: ExportReportModalProps) {
  const [format, setFormat] = useState<"csv" | "xlsx" | "pdf">("csv");
  const [range, setRange] = useState("Today (24 Calls)");
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => {
      onClose();
    }, 900);
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
            <div className="w-10 h-10 rounded-2xl bg-[#A8C3F0]/40 text-[#1A1A1A] shadow-xs flex items-center justify-center shrink-0">
              <Download className="w-4 h-4 text-[#1A1A1A]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">DATA EXPORT</span>
              <h3 className="text-sm font-bold text-[#1A1A1A]">
                Export Telephony Records
              </h3>
              <p className="text-xs text-black/55">
                Download conversation logs, verbatim transcripts &amp; telemetry
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

        {/* Options */}
        <div className="my-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
              Export Date Range:
            </label>
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="w-full text-xs px-4 py-2.5 bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:border-black/30 transition-all cursor-pointer font-medium"
            >
              <option value="Today (24 Calls)">Today (24 Calls)</option>
              <option value="Past 7 Days (142 Calls)">Past 7 Days (142 Calls)</option>
              <option value="Past 30 Days (580 Calls)">Past 30 Days (580 Calls)</option>
              <option value="Current Billing Cycle">Current Billing Cycle</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
              File Format:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "csv", label: "CSV Ledger" },
                { id: "xlsx", label: "Excel Sheet" },
                { id: "pdf", label: "PDF Report" },
              ].map((f) => (
                <button
                  type="button"
                  key={f.id}
                  onClick={() => setFormat(f.id as any)}
                  className={`py-2 px-3 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
                    format === f.id
                      ? "bg-[#111111] text-white border-[#111111] shadow-xs"
                      : "bg-[#FBF7ED] text-black/60 hover:text-[#1A1A1A] border-black/[0.06] hover:bg-[#FAF3E4]"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
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
            onClick={handleDownload}
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#111111] hover:bg-black shadow-sm inline-flex items-center gap-2 cursor-pointer transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{downloaded ? "Generating..." : "Download Report"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
