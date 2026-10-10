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
    setDownloadSuccess(rep.name);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[11px] font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase transition-colors"
            >
              WORKSPACES
            </Link>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-950 bg-[#cdfb56]/30 px-2.5 py-0.5 rounded-full border border-[#cdfb56]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926]" />
              {reports.length} Reports Ready
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Reports & Audit Logs
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Compliance-ready audit logs, daily call summaries, and CSV/Excel data exports.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setExportModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-lg border border-[#bceb42] shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-950" />
            <span>Generate Custom Report</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {downloadSuccess && (
        <div className="bg-[#f7fee7] border border-[#cdfb56] p-3 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-900 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#8ac926]" />
          <span>Export initiated for {downloadSuccess}. The file is downloading now.</span>
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
          onClick={() => setExportModalOpen(true)}
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
          onClick={() => setExportModalOpen(true)}
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
          onClick={() => setExportModalOpen(true)}
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
          onClick={() => setExportModalOpen(true)}
        />
      </div>

      {/* ======================================================================= */}
      {/* REPORTS ARCHIVE TABLE                                                   */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/70 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Generated Reports Archive
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              ({reports.length} ready)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Retained for 90 days under Institutional Compliance Rules
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/40 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Report Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date Range</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Records</th>
                <th className="py-3 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-lime-50 text-lime-700 flex items-center justify-center mx-auto shadow-xs border border-lime-200">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">No export reports generated yet</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Generate customized CSV logs, dual audio transcript archives, or minute consumption statements.
                      </p>
                      <button
                        onClick={() => setExportModalOpen(true)}
                        className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-xl border border-[#bceb42] shadow-xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-slate-950" />
                        <span>Generate Custom Report</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                reports.map((rep) => (
                <tr
                  key={rep.id}
                  className="hover:bg-[#f7fee7]/30 transition-colors group"
                >
                  {/* Name */}
                  <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-slate-950">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
                      <span>{rep.name}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {rep.category}
                    </span>
                  </td>

                  {/* Date Range */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-slate-600 font-medium">
                    {rep.dateRange}
                  </td>

                  {/* Format */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                        rep.format === "CSV"
                          ? "bg-slate-100 text-slate-800 border-slate-200"
                          : rep.format === "XLSX"
                          ? "bg-[#cdfb56]/40 text-slate-950 border-[#cdfb56]"
                          : "bg-rose-50 text-rose-800 border-rose-200"
                      }`}
                    >
                      {rep.format}
                    </span>
                  </td>

                  {/* Size */}
                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {rep.size}
                  </td>

                  {/* Records */}
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {rep.recordsCount.toLocaleString()}
                  </td>

                  {/* Download Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDownload(rep)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-[#cdfb56] text-slate-800 hover:text-slate-950 border border-slate-200 hover:border-[#bceb42] shadow-2xs transition-all cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              )))}
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
