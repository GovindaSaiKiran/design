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

const mockReportsList: ReportItem[] = [
  {
    id: "rep-01",
    name: "Daily Call Logs & Conversational Telemetry",
    category: "Operations",
    dateRange: "Sep 17, 2026 (Today)",
    format: "CSV",
    size: "1.4 MB",
    generatedAt: "10:45 AM",
    recordsCount: 248,
  },
  {
    id: "rep-02",
    name: "B.Tech Merit Scholarship & PCM Qualification Audit",
    category: "Admissions",
    dateRange: "Sep 10 - Sep 17, 2026",
    format: "XLSX",
    size: "3.2 MB",
    generatedAt: "09:15 AM",
    recordsCount: 1240,
  },
  {
    id: "rep-03",
    name: "Counselor Handoff & Complex Query Escalation Dossier",
    category: "Student Affairs",
    dateRange: "Sep 01 - Sep 17, 2026",
    format: "PDF",
    size: "820 KB",
    generatedAt: "Yesterday",
    recordsCount: 28,
  },
  {
    id: "rep-04",
    name: "Telephony Carrier SIP Bandwidth & Minute Consumption",
    category: "Billing",
    dateRange: "Aug 17 - Sep 17, 2026",
    format: "CSV",
    size: "2.1 MB",
    generatedAt: "Sep 15, 2026",
    recordsCount: 6800,
  },
  {
    id: "rep-05",
    name: "Outbound Campaign Yield & Intent Conversion",
    category: "Campaigns",
    dateRange: "Sep 12 - Sep 16, 2026",
    format: "XLSX",
    size: "1.8 MB",
    generatedAt: "Sep 16, 2026",
    recordsCount: 842,
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>(mockReportsList);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (rep: ReportItem) => {
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
              Audit Exports Ready
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
          metric="248 calls"
          metricLabel="CSV Format • 1.4 MB"
          status="Generated today"
          statusType="ready"
          actionLabel="Download CSV →"
          onClick={() => handleDownload(reports[0])}
        />

        <WorkspaceCard
          name="Admissions Triage"
          icon={FileText}
          description="Applicants filtered by 12th PCM marks, course choices, and merit grants."
          metric="1,240 applicants"
          metricLabel="Excel XLSX • 3.2 MB"
          status="Audit ready"
          statusType="ready"
          actionLabel="Download Excel →"
          onClick={() => handleDownload(reports[1])}
        />

        <WorkspaceCard
          name="Staff Escalation Log"
          icon={Clock}
          description="Transfers directed to admissions counselors with complete verbatim context."
          metric="28 handoffs"
          metricLabel="PDF Executive Brief • 820 KB"
          status="Verified"
          statusType="ready"
          actionLabel="Download PDF →"
          onClick={() => handleDownload(reports[2])}
        />

        <WorkspaceCard
          name="Carrier SIP Billing"
          icon={Calendar}
          description="Total talk time, minutes consumed, and concurrent channel telemetry."
          metric="6,800 mins"
          metricLabel="68% of 10,000 min allowance"
          status="Monthly cycle"
          statusType="neutral"
          actionLabel="Download statement →"
          onClick={() => handleDownload(reports[3])}
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
              {reports.map((rep) => (
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
              ))}
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
