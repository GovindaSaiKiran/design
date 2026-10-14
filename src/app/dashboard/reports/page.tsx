"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileSpreadsheet,
  Download,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Filter,
  Plus,
  Eye,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import ExportReportModal from "@/components/dashboard/modals/ExportReportModal";
import { soundSynth } from "@/lib/audio-synth";

interface ReportItem {
  id: string;
  name: string;
  category: string;
  dateRange: string;
  format: "CSV" | "XLSX" | "PDF";
  size: string;
  generatedAt: string;
  recordsCount: number;
}

const mockReportsList: ReportItem[] = [];

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>(mockReportsList);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (rep?: ReportItem) => {
    if (!rep) return;
    try { soundSynth.play("confirm"); } catch {}
    setDownloadSuccess(rep.name);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 sm:space-y-8 select-none text-white">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#71717A] hover:text-white transition-colors"
            >
              COMPLIANCE AUDIT
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white bg-[#121215] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {reports.length} REPORTS ARCHIVED
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1.5">
            Reports & Compliance Audit Logs
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Institutional audit logs, daily telecalling summaries, carrier CDR records, and CSV/Excel data exports.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => {
              try { soundSynth.play("confirm"); } catch {}
              setExportModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-black" />
            <span>Generate Custom Report</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {downloadSuccess && (
        <div className="bg-[#121215] border border-white/40 p-3.5 rounded-[2px] flex items-center gap-3 text-xs font-mono text-white shadow-lg animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>Export initialized for {downloadSuccess}. The file is downloading now.</span>
        </div>
      )}

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Daily Call Logs"
          icon={FileSpreadsheet}
          description="Complete records of call duration, caller IDs, audio latency, and outcomes."
          metric="0 calls"
          metricLabel="No logs recorded"
          status="Empty"
          statusType="neutral"
          actionLabel="Generate CSV →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setExportModalOpen(true);
          }}
        />

        <WorkspaceCard
          name="Admissions Triage"
          icon={FileText}
          description="Applicants filtered by qualifications, course choices, and intent."
          metric="0 applicants"
          metricLabel="No qualification records"
          status="None"
          statusType="neutral"
          actionLabel="Generate Excel →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setExportModalOpen(true);
          }}
        />

        <WorkspaceCard
          name="Staff Escalation Log"
          icon={Clock}
          description="Transfers directed to admissions counselors with complete verbatim context."
          metric="0 handoffs"
          metricLabel="No transfers recorded"
          status="None"
          statusType="neutral"
          actionLabel="Generate PDF →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setExportModalOpen(true);
          }}
        />

        <WorkspaceCard
          name="Carrier SIP Billing"
          icon={Calendar}
          description="Total talk time, minutes consumed, and concurrent channel telemetry."
          metric="0 mins"
          metricLabel="0% of minute allowance"
          status="Monthly cycle"
          statusType="neutral"
          actionLabel="Generate statement →"
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setExportModalOpen(true);
          }}
        />
      </div>

      {/* ======================================================================= */}
      {/* REPORTS ARCHIVE TABLE                                                   */}
      {/* ======================================================================= */}
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#121215] border-b border-[#27272A]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Generated Reports Archive
            </span>
            <span className="text-[11px] text-[#A1A1AA] font-mono">
              ({reports.length} READY)
            </span>
          </div>
          <span className="text-[11px] text-[#71717A] font-mono hidden sm:inline">
            Retained for 90 days under Institutional Compliance Rules
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#121215]/80 border-b border-[#27272A] text-[#71717A] font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">Report Name</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Date Range</th>
                <th className="py-3 px-4 font-bold">Format</th>
                <th className="py-3 px-4 font-bold">Size</th>
                <th className="py-3 px-4 font-bold">Records</th>
                <th className="py-3 px-4 text-right font-bold">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181B]">
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-[2px] bg-[#121215] text-white flex items-center justify-center mx-auto border border-[#27272A]">
                        <FileSpreadsheet className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-white">No export reports generated yet</h3>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        Generate customized CSV logs, dual audio transcript archives, or minute consumption statements.
                      </p>
                      <button
                        onClick={() => {
                          try { soundSynth.play("confirm"); } catch {}
                          setExportModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-black" />
                        <span>Generate Custom Report</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                reports.map((rep) => (
                  <tr
                    key={rep.id}
                    className="hover:bg-[#121215] transition-colors group"
                  >
                    {/* Name */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-white group-hover:text-white">
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-[#A1A1AA]" />
                        <span>{rep.name}</span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-zinc-300 bg-[#121215] px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                        {rep.category}
                      </span>
                    </td>

                    {/* Date Range */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-zinc-400 font-mono text-[11px]">
                      {rep.dateRange}
                    </td>

                    {/* Format */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase bg-[#18181B] text-white border border-[#27272A]">
                        {rep.format}
                      </span>
                    </td>

                    {/* Size */}
                    <td className="py-3.5 px-4 font-mono text-[#A1A1AA]">
                      {rep.size}
                    </td>

                    {/* Records */}
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      {rep.recordsCount.toLocaleString()}
                    </td>

                    {/* Download Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDownload(rep)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider bg-transparent hover:bg-white text-zinc-300 hover:text-black border border-[#27272A] hover:border-white transition-all cursor-pointer"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <ExportReportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </div>
  );
}
