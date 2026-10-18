"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Database,
  Search,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Phone,
  Mail,
  Calendar,
  FileText,
  ShieldCheck,
  ExternalLink,
  Lock,
  Eye,
  Check,
  X,
  Share2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import CallDrawer from "@/components/dashboard/views/CallDrawer";
import { RecentCallRecord } from "@/types/dashboard";
import { mockRecentCalls } from "@/data/mock/dashboardData";
import { soundSynth } from "@/lib/audio-synth";

interface ExtractedRecord {
  id: string;
  callId: string;
  contactName: string;
  fieldName: "Phone Number" | "Email Address" | "Callback Request" | "Target Program" | "Board Score" | "Hostel Requirement";
  extractedValue: string;
  sourceSnippet: string;
  confidence: number;
  validationState: "Verified" | "Pending" | "Review Needed";
  extractedAt: string;
  promotionalConsent: boolean; // Must be false unless explicitly given
  agentName: string;
}

const mockVaultRecords: ExtractedRecord[] = [
  {
    id: "rec-001",
    callId: "call-001",
    contactName: "Rahul Sharma",
    fieldName: "Phone Number",
    extractedValue: "+91 98401 22345",
    sourceSnippet: "Calling from registered mobile number. Verified caller ID on carrier trunk TRK-01.",
    confidence: 100,
    validationState: "Verified",
    extractedAt: "Today, 11:20 AM",
    promotionalConsent: false,
    agentName: "Maya (Admissions)",
  },
  {
    id: "rec-002",
    callId: "call-001",
    contactName: "Rahul Sharma",
    fieldName: "Target Program",
    extractedValue: "B.Tech Computer Science (AI/ML)",
    sourceSnippet: "Yes, this is Rahul. I had registered regarding B.Tech CSE admissions.",
    confidence: 98,
    validationState: "Verified",
    extractedAt: "Today, 11:20 AM",
    promotionalConsent: false,
    agentName: "Maya (Admissions)",
  },
  {
    id: "rec-003",
    callId: "call-001",
    contactName: "Rahul Sharma",
    fieldName: "Board Score",
    extractedValue: "94.2% (CBSE PCM)",
    sourceSnippet: "I see you scored 94.2% in your 12th board exams... Yes, CBSE with PCM.",
    confidence: 99,
    validationState: "Verified",
    extractedAt: "Today, 11:21 AM",
    promotionalConsent: false,
    agentName: "Maya (Admissions)",
  },
  {
    id: "rec-004",
    callId: "call-002",
    contactName: "Ananya Iyer",
    fieldName: "Email Address",
    extractedValue: "ananya.iyer@outlook.com",
    sourceSnippet: "Please email the scholarship breakdown to ananya.iyer@outlook.com as well.",
    confidence: 96,
    validationState: "Verified",
    extractedAt: "Today, 10:46 AM",
    promotionalConsent: false,
    agentName: "Priya (Finance)",
  },
  {
    id: "rec-005",
    callId: "call-005",
    contactName: "Devansh Patil",
    fieldName: "Callback Request",
    extractedValue: "Today, 06:30 PM (Evening Window)",
    sourceSnippet: "Candidate requested follow-up today between 6:00 PM and 7:00 PM.",
    confidence: 94,
    validationState: "Pending",
    extractedAt: "Today, 09:15 AM",
    promotionalConsent: false,
    agentName: "Arjun (Outreach)",
  },
  {
    id: "rec-006",
    callId: "call-004",
    contactName: "Meera Krishnan",
    fieldName: "Target Program",
    extractedValue: "B.Tech Electronics & Comm. (Sports Quota)",
    sourceSnippet: "National level badminton player requesting sports waiver evaluation.",
    confidence: 88,
    validationState: "Review Needed",
    extractedAt: "Yesterday, 04:32 PM",
    promotionalConsent: false,
    agentName: "Maya (Admissions)",
  },
];

export default function DataVaultPage() {
  const [records, setRecords] = useState<ExtractedRecord[]>(mockVaultRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [fieldFilter, setFieldFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCallRecord, setSelectedCallRecord] = useState<RecentCallRecord | null>(null);
  const [callDrawerOpen, setCallDrawerOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        r.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.extractedValue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.callId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.agentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesField = fieldFilter === "all" || r.fieldName === fieldFilter;
      const matchesStatus = statusFilter === "all" || r.validationState === statusFilter;

      return matchesSearch && matchesField && matchesStatus;
    });
  }, [records, searchQuery, fieldFilter, statusFilter]);

  const handleOpenSourceCall = (callId: string) => {
    try { soundSynth.play("click"); } catch {}
    const match = mockRecentCalls.find((c) => c.id === callId) || mockRecentCalls[0];
    setSelectedCallRecord(match);
    setCallDrawerOpen(true);
  };

  const handleExportData = () => {
    try { soundSynth.play("confirm"); } catch {}
    setExportNotice("Data Vault encrypted export (CSV) generated. Download initialized.");
    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <div className="space-y-6 select-none font-sans text-[#1A1A1A]">
      {/* ======================================================================= */}
      {/* HEADER                                                                  */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold tracking-wider text-black/45 hover:text-black uppercase transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D593F] bg-[#C1F2D5] px-3 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
              Data Vault Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Data Vault &amp; Structured Extraction
          </h1>

          <p className="text-xs sm:text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Cryptographically audited repository of caller contact parameters, structured fields, and callback requests extracted from voice interactions.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-2 bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] text-xs font-semibold px-4 py-2.5 rounded-full border border-black/[0.06] transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-black/50" />
            <span>Export Encrypted CSV</span>
          </button>
        </div>
      </div>

      {/* Export Notification */}
      {exportNotice && (
        <div className="p-4 rounded-[20px] bg-[#C1F2D5]/40 border border-[#16856B]/30 flex items-center gap-3 text-xs text-[#0D593F] font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16856B]" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* DPDP Compliance & Promotional Calling Warning Banner */}
      <div className="p-4 rounded-[20px] bg-[#FFD9A0]/25 border border-[#FFD9A0]/50 flex items-start gap-3.5">
        <ShieldCheck className="w-5 h-5 text-[#B54708] shrink-0 mt-0.5" />
        <div className="text-xs text-[#1A1A1A] leading-relaxed space-y-1">
          <h4 className="font-bold text-[#733F00]">
            Regulatory Notice: DPDP Compliance &amp; Non-Promotional Restriction
          </h4>
          <p className="text-black/60">
            All extracted phone numbers and emails are securely archived strictly for institutional inquiry fulfillment and scheduled callback execution.
            Under regulatory compliance rules, <strong>extraction does not constitute implicit consent to place unsolicited telemarketing or promotional broadcast calls</strong>.
          </p>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 4 SUMMARY STAT CARDS                                                    */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Extracted Contacts"
          icon={Phone}
          description="Verified phone numbers and caller profiles extracted from conversations."
          metric="24 Verified"
          metricLabel="100% confidence on E.164 trunks"
          status="All Verified"
          statusType="ready"
          actionLabel="Filter phone numbers →"
          onClick={() => setFieldFilter("Phone Number")}
        />

        <WorkspaceCard
          name="Pending Callbacks"
          icon={Clock}
          description="Inbound inquiries with explicit callback times requested by callers."
          metric="1 Pending"
          metricLabel="Next scheduled: Today 6:30 PM"
          status="Follow-up Queue"
          statusType="warning"
          actionLabel="View callback queue →"
          href="/dashboard/callbacks"
        />

        <WorkspaceCard
          name="Qualification Fields"
          icon={Database}
          description="Academic scores, course preferences, and hostel requirements captured."
          metric="68 Fields"
          metricLabel="Direct link to source audio"
          status="Audit Ready"
          statusType="ready"
          actionLabel="Filter qualification →"
          onClick={() => setFieldFilter("Target Program")}
        />

        <WorkspaceCard
          name="Retention Rules"
          icon={Lock}
          description="Automated compliant 90-day retention schedule with audit logging."
          metric="90-Day Policy"
          metricLabel="Compliant with DPDP rules"
          status="Enforced"
          statusType="ready"
          actionLabel="Inspect security policy →"
          href="/dashboard/settings"
        />
      </div>

      {/* ======================================================================= */}
      {/* SEARCH & FILTERS BAR                                                    */}
      {/* ======================================================================= */}
      <div className="p-4 rounded-[26px] bg-white border border-black/[0.06] shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Field Type Selector */}
            <select
              value={fieldFilter}
              onChange={(e) => setFieldFilter(e.target.value)}
              className="text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full px-4 py-2 text-[#1A1A1A] font-medium focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer"
            >
              <option value="all">All Field Types</option>
              <option value="Phone Number">Phone Numbers</option>
              <option value="Email Address">Email Addresses</option>
              <option value="Callback Request">Callback Requests</option>
              <option value="Target Program">Target Program</option>
              <option value="Board Score">Board Score</option>
            </select>

            {/* Validation State Selector */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full px-4 py-2 text-[#1A1A1A] font-medium focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer"
            >
              <option value="all">All Verification States</option>
              <option value="Verified">Verified (Confidence &gt; 95%)</option>
              <option value="Pending">Pending Action</option>
              <option value="Review Needed">Review Needed</option>
            </select>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-3.5 h-3.5 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search contact, value, call ID, or agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-black/10 placeholder:text-black/40"
            />
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* DATA VAULT RECORDS TABLE                                                */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] shadow-2xs overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-black/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-xs text-[#1A1A1A]">
              Extracted Parameters &amp; Verbatim Sources
            </h3>
            <span className="text-[11px] font-medium text-black/45">
              ({filteredRecords.length} records verified)
            </span>
          </div>

          <span className="text-[11px] text-black/50 hidden sm:inline">
            Click Source Call to inspect verbatim transcript and audio recording
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5">Contact Name</th>
                <th className="py-3 px-5">Field Parameter</th>
                <th className="py-3 px-5">Extracted Value</th>
                <th className="py-3 px-5">Confidence</th>
                <th className="py-3 px-5">Validation State</th>
                <th className="py-3 px-5">Source Call &amp; Audio</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-black/45">
                    No records found matching the current search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-black/[0.015] transition-colors group">
                    {/* Contact Name */}
                    <td className="py-4 px-5 font-semibold text-[#1A1A1A]">
                      <div>{r.contactName}</div>
                      <span className="text-[10.5px] text-black/45 font-normal">
                        Captured {r.extractedAt}
                      </span>
                    </td>

                    {/* Field Parameter */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium bg-[#BCD0F5] text-[#1E3A8A]">
                        {r.fieldName}
                      </span>
                    </td>

                    {/* Extracted Value */}
                    <td className="py-4 px-5 max-w-xs">
                      <div className="font-bold text-[#1A1A1A] truncate">
                        {r.extractedValue}
                      </div>
                      <p className="text-[11px] text-black/55 truncate mt-0.5 italic">
                        &quot;{r.sourceSnippet}&quot;
                      </p>
                    </td>

                    {/* Confidence Score */}
                    <td className="py-4 px-5 whitespace-nowrap font-semibold text-[#1A1A1A]">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-black/[0.06] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#16856B] h-full"
                            style={{ width: `${r.confidence}%` }}
                          />
                        </div>
                        <span className="text-[11px]">{r.confidence}%</span>
                      </div>
                    </td>

                    {/* Validation State */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      {r.validationState === "Verified" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0D593F] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
                          <Check className="w-3 h-3 text-[#16856B]" />
                          <span>Verified</span>
                        </span>
                      ) : r.validationState === "Pending" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#733F00] bg-[#FFD9A0] px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>Pending Action</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#B42318] bg-[#FEE4E2] px-2.5 py-0.5 rounded-full">
                          <AlertCircle className="w-3 h-3" />
                          <span>Review Needed</span>
                        </span>
                      )}
                    </td>

                    {/* Source Call Link */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenSourceCall(r.callId)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#1A1A1A] hover:underline cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-black/50" />
                        <span>Source ({r.callId})</span>
                        <ExternalLink className="w-3 h-3 text-black/40" />
                      </button>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleOpenSourceCall(r.callId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] transition-all cursor-pointer"
                      >
                        Inspect Transcript
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transcript & Call Inspection Drawer */}
      <CallDrawer
        call={selectedCallRecord}
        isOpen={callDrawerOpen}
        onClose={() => setCallDrawerOpen(false)}
      />
    </div>
  );
}
