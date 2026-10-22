"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  FileSpreadsheet,
  FileText,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { CallIntelligenceRecord } from "@/types/callIntelligence";
import {
  downloadBulkTranscriptsPdf,
  downloadBulkKeyPointsExcel,
  downloadBulkKeyPointsPdf,
} from "@/lib/utils/callIntelligenceExport";

interface BulkExportModalProps {
  selectedCalls: CallIntelligenceRecord[];
  isOpen: boolean;
  onClose: () => void;
  scopeTitle?: string;
  initialMode?: "transcripts_pdf" | "keypoints_excel" | "keypoints_pdf";
}

export default function BulkExportModal({
  selectedCalls,
  isOpen,
  onClose,
  scopeTitle = "Selected Calls",
  initialMode = "transcripts_pdf",
}: BulkExportModalProps) {
  const [exportMode, setExportMode] = useState<"transcripts_pdf" | "keypoints_excel" | "keypoints_pdf">(initialMode);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successFeedback, setSuccessFeedback] = useState<string | null>(null);
  const [showCallList, setShowCallList] = useState(false);

  useEffect(() => {
    if (initialMode) {
      setExportMode(initialMode);
    }
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const totalSelected = selectedCalls.length;
  const eligibleTranscripts = selectedCalls.filter(
    (c) => c.transcriptStatus !== "unavailable" && c.transcript.length > 0
  ).length;
  const unavailableTranscripts = totalSelected - eligibleTranscripts;

  const handleExecuteExport = () => {
    setIsProcessing(true);
    setSuccessFeedback(null);

    setTimeout(() => {
      try {
        if (exportMode === "transcripts_pdf") {
          downloadBulkTranscriptsPdf(selectedCalls, scopeTitle);
          setSuccessFeedback(`Single combined transcript PDF prepared for ${eligibleTranscripts} calls.`);
        } else if (exportMode === "keypoints_excel") {
          downloadBulkKeyPointsExcel(selectedCalls, scopeTitle);
          setSuccessFeedback(`Combined Excel workbook exported for ${totalSelected} calls.`);
        } else if (exportMode === "keypoints_pdf") {
          downloadBulkKeyPointsPdf(selectedCalls, scopeTitle);
          setSuccessFeedback(`Combined Key Points PDF Dossier generated for ${totalSelected} calls.`);
        }
      } catch (err) {
        console.error("Export error:", err);
      } finally {
        setIsProcessing(false);
      }
    }, 400);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-white rounded-3xl border border-[#E9E1D4] shadow-2xl overflow-hidden flex flex-col text-[#283A50] animate-in zoom-in-95 duration-200 my-auto"
      >
        {/* Header */}
        <div className="p-6 bg-[#FAF5E9] border-b border-[#E9E1D4] flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#2E8066] uppercase tracking-wider bg-[#EAF5F0] border border-[#B8E2D4] px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              Call Intelligence Export
            </span>
            <h3 className="text-xl font-extrabold text-[#283A50] tracking-tight">
              Export {scopeTitle}
            </h3>
            <p className="text-xs text-[#707684] mt-1">
              {totalSelected} calls included in this export window
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-[#E9E1D4] hover:bg-black/5 text-[#707684] flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Eligibility Metrics */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#FAF5E9]/60 border border-[#E9E1D4]">
            <div className="bg-white p-3 rounded-xl border border-[#E9E1D4]">
              <div className="text-[10.5px] font-bold text-[#707684] uppercase">Total Calls</div>
              <div className="text-lg font-mono font-bold text-[#283A50] mt-0.5">{totalSelected}</div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#E9E1D4]">
              <div className="text-[10.5px] font-bold text-[#707684] uppercase">Available Transcripts</div>
              <div className="text-lg font-mono font-bold text-[#2E8066] mt-0.5">
                {eligibleTranscripts} <span className="text-xs font-normal text-[#707684]">({unavailableTranscripts} pending)</span>
              </div>
            </div>
          </div>

          {/* Toggle Call Preview List */}
          <div className="border border-[#E9E1D4] rounded-2xl overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setShowCallList(!showCallList)}
              className="w-full p-3 px-4 flex items-center justify-between text-xs font-bold text-[#283A50] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <span>Inspect Included Calls &amp; Extracted Data ({totalSelected})</span>
              {showCallList ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showCallList && (
              <div className="max-h-48 overflow-y-auto divide-y divide-[#E9E1D4]/60 border-t border-[#E9E1D4] p-2 bg-[#FAF8F5]/40 text-xs">
                {selectedCalls.map((c) => (
                  <div key={c.id} className="p-2 space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span>{c.contactName} ({c.id})</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FAF5E9] text-[#283A50]">
                        {c.callingPurpose}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#707684] line-clamp-1">{c.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export Options Radio Selection */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-[#707684] uppercase tracking-wider">
              Choose Export Format
            </div>

            {/* Option 1: Transcripts Single Combined PDF */}
            <label
              onClick={() => setExportMode("transcripts_pdf")}
              className={`flex items-start gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                exportMode === "transcripts_pdf"
                  ? "bg-[#FAF8F5] border-[#283A50] ring-2 ring-[#283A50]/10"
                  : "bg-white border-[#E9E1D4] hover:border-[#283A50]/30"
              }`}
            >
              <input
                type="radio"
                name="bulkExport"
                checked={exportMode === "transcripts_pdf"}
                onChange={() => setExportMode("transcripts_pdf")}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-[#283A50]" />
                  <span className="text-sm font-bold text-[#283A50]">
                    Download Transcripts (One Combined PDF)
                  </span>
                </div>
                <p className="text-xs text-[#707684] mt-1 leading-relaxed">
                  Generates a single, professionally formatted PDF document containing Cover Page, Summary Index, and verbatim dialogue with speaker labels and timestamps.
                </p>
                {unavailableTranscripts > 0 && (
                  <p className="text-[11px] text-amber-700 mt-1 font-medium">
                    • Note: {unavailableTranscripts} calls without transcripts will be noted in the Honest Audit table.
                  </p>
                )}
              </div>
            </label>

            {/* Option 2: Combined Excel Key Points */}
            <label
              onClick={() => setExportMode("keypoints_excel")}
              className={`flex items-start gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                exportMode === "keypoints_excel"
                  ? "bg-[#FAF8F5] border-[#283A50] ring-2 ring-[#283A50]/10"
                  : "bg-white border-[#E9E1D4] hover:border-[#283A50]/30"
              }`}
            >
              <input
                type="radio"
                name="bulkExport"
                checked={exportMode === "keypoints_excel"}
                onChange={() => setExportMode("keypoints_excel")}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-bold text-[#283A50]">
                    Export Key Points (Combined Excel / CSV)
                  </span>
                </div>
                <p className="text-xs text-[#707684] mt-1 leading-relaxed">
                  Generates a spreadsheet workbook with labelled columns (Call ID, Purpose, Campaign, Extracted Field, Extracted Value, Follow-up date/time, and Notes).
                </p>
              </div>
            </label>

            {/* Option 3: Combined PDF Key Points Report */}
            <label
              onClick={() => setExportMode("keypoints_pdf")}
              className={`flex items-start gap-3.5 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                exportMode === "keypoints_pdf"
                  ? "bg-[#FAF8F5] border-[#283A50] ring-2 ring-[#283A50]/10"
                  : "bg-white border-[#E9E1D4] hover:border-[#283A50]/30"
              }`}
            >
              <input
                type="radio"
                name="bulkExport"
                checked={exportMode === "keypoints_pdf"}
                onChange={() => setExportMode("keypoints_pdf")}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-[#283A50]">
                    Export Key Points (Combined PDF Dossier)
                  </span>
                </div>
                <p className="text-xs text-[#707684] mt-1 leading-relaxed">
                  Creates a structured PDF report with batch execution metrics, a call directory, and full purpose-specific extracted fields per call.
                </p>
              </div>
            </label>
          </div>

          {/* Success Feedback message */}
          {successFeedback && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2.5 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successFeedback}</span>
            </div>
          )}
        </div>

        {/* Footer with direct download button */}
        <div className="p-4 px-6 bg-[#FAF5E9] border-t border-[#E9E1D4] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[#707684] hover:text-[#283A50] transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isProcessing || totalSelected === 0}
            onClick={handleExecuteExport}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#283A50] hover:bg-[#1C2B3C] text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? (
              <span>Preparing document...</span>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>
                  {exportMode === "transcripts_pdf"
                    ? "Download Combined Transcripts (PDF)"
                    : exportMode === "keypoints_excel"
                    ? "Download Key Points Excel"
                    : "Download Key Points PDF"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
