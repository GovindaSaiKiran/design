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
  ShieldCheck,
  FileCheck,
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

const initialReportsList: ReportItem[] = [
  {
    id: "rep-01",
    name: "Daily_Telephony_Call_Logs_Oct18_2026.csv",
    category: "Telephony Logs",
    dateRange: "Oct 18, 2026",
    format: "CSV",
    size: "48 KB",
    generatedAt: "10 mins ago",
    recordsCount: 24,
  },
  {
    id: "rep-02",
    name: "BTech_Admissions_Counseling_Triage.xlsx",
    category: "Admissions Triage",
    dateRange: "Oct 10 - Oct 18, 2026",
    format: "XLSX",
    size: "1.2 MB",
    generatedAt: "2 hrs ago",
    recordsCount: 142,
  },
  {
    id: "rep-03",
    name: "Structured_Data_Vault_Extraction_Audit.csv",
    category: "Compliance & Vault",
    dateRange: "Oct 01 - Oct 18, 2026",
    format: "CSV",
    size: "64 KB",
    generatedAt: "Yesterday",
    recordsCount: 38,
  },
  {
    id: "rep-04",
    name: "Carrier_CDR_Minutes_Statement_Oct2026.pdf",
    category: "Carrier Billing",
    dateRange: "Current Cycle",
    format: "PDF",
    size: "240 KB",
    generatedAt: "3 days ago",
    recordsCount: 86,
  },
];

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>(initialReportsList);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (rep?: ReportItem) => {
    if (!rep) return;
    setDownloadSuccess(rep.name);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A]">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-black/50 hover:text-[#1A1A1A] transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] bg-[#FFD9A0] px-3 py-0.5 rounded-full">
              Analytics &amp; Reports
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Reports &amp; Compliance Audit Logs
          </h1>

          <p className="text-sm text-black/60 mt-1 max-w-2xl leading-relaxed">
            Institutional compliance archives, daily telecalling summaries, carrier CDR records, and structured CSV/Excel exports.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setExportModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Generate Custom Report</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {downloadSuccess && (
        <div className="bg-[#C1F2D5]/50 border border-[#16856B]/20 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-[#16856B] shadow-2xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#16856B] shrink-0" />
          <span>Export initialized for <strong>{downloadSuccess}</strong>. The file download has started.</span>
        </div>
      )}

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Daily Call Logs"
          icon={FileSpreadsheet}
          description="Complete records of call duration, caller IDs, audio latency, and outcomes."
          metric="24 calls"
          metricLabel="Ready for download"
          status="Generated"
          statusType="ready"
          actionLabel="Generate CSV →"
          onClick={() => setExportModalOpen(true)}
        />

        <WorkspaceCard
          name="Admissions Triage"
          icon={FileText}
          description="Applicants filtered by qualifications, course choices, and intent."
          metric="142 applicants"
          metricLabel="Cutoff scores verified"
          status="Indexed"
          statusType="ready"
          actionLabel="Generate Excel →"
          onClick={() => setExportModalOpen(true)}
        />

        <WorkspaceCard
          name="Staff Escalation Log"
          icon={Clock}
          description="Transfers directed to admissions counselors with full verbatim context."
          metric="2 handoffs"
          metricLabel="Resolved successfully"
          status="Clean"
          statusType="ready"
          actionLabel="Generate PDF →"
          onClick={() => setExportModalOpen(true)}
        />

        <WorkspaceCard
          name="Carrier SIP Billing"
          icon={Calendar}
          description="Talk time, minute consumption, and concurrent channel telemetry."
          metric="2.2 mins used"
          metricLabel="14.0 mins available"
          status="Active Cycle"
          statusType="neutral"
          actionLabel="Generate statement →"
          onClick={() => setExportModalOpen(true)}
        />
      </div>

      {/* Reports Archive Table */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] overflow-hidden shadow-2xs">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-[#1A1A1A]">
              Generated Reports Archive
            </span>
            <span className="text-xs text-black/50">
              ({reports.length} ready)
            </span>
          </div>
          <span className="text-xs text-black/50 hidden sm:inline">
            Retained for 90 days under Institutional Compliance Rules
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px]">
                <th className="py-3.5 px-6">Report Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date Range</th>
                <th className="py-3.5 px-4">Format</th>
                <th className="py-3.5 px-4">Size</th>
                <th className="py-3.5 px-4">Records</th>
                <th className="py-3.5 px-6 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {reports.map((rep) => (
                <tr
                  key={rep.id}
                  className="hover:bg-[#FBF7ED]/50 transition-colors group text-[#1A1A1A]"
                >
                  {/* Name */}
                  <td className="py-4 px-6 font-semibold">
                    <div className="flex items-center gap-2.5">
                      <FileSpreadsheet className="w-4 h-4 text-black/40" />
                      <span>{rep.name}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A1A1A] bg-[#FBF7ED] px-3 py-1 rounded-full border border-black/[0.06]">
                      {rep.category}
                    </span>
                  </td>

                  {/* Date Range */}
                  <td className="py-4 px-4 whitespace-nowrap text-black/50 font-medium">
                    {rep.dateRange}
                  </td>

                  {/* Format */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#BCD0F5]/50 text-blue-950 border border-[#A8C3F0]/60">
                      {rep.format}
                    </span>
                  </td>

                  {/* Size */}
                  <td className="py-4 px-4 text-black/50">
                    {rep.size}
                  </td>

                  {/* Records */}
                  <td className="py-4 px-4 font-bold text-[#1A1A1A]">
                    {rep.recordsCount.toLocaleString()}
                  </td>

                  {/* Download Action */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleDownload(rep)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] shadow-2xs transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-black/50" />
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
