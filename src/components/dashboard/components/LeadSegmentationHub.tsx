"use client";

import React, { useState } from "react";
import {
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  PhoneIncoming,
  Download,
  Play,
  PhoneCall,
  GraduationCap,
  Globe,
} from "lucide-react";
import InteractiveAudioPlayerModal from "./InteractiveAudioPlayerModal";

export interface StudentLeadItem {
  id: string;
  name: string;
  phone: string;
  course: string;
  category: "interested" | "call_later" | "not_interested" | "inbound_inquiry";
  meritScore?: string;
  callbackTime?: string;
  disqualifiedReason?: string;
  agentName: string;
  callDuration: string;
  timestamp: string;
  timeAgo: string;
  summary: string;
  transcriptSnippet: string;
  actionTaken: string;
  lang?: string;
}

export const mockStudentLeads: StudentLeadItem[] = [];

interface LeadSegmentationHubProps {
  activeCategory?: "all" | "interested" | "call_later" | "not_interested" | "inbound";
  onCategoryChange?: (category: "all" | "interested" | "call_later" | "not_interested" | "inbound") => void;
  onInspectCall?: (lead: StudentLeadItem) => void;
  onOpenExportModal?: () => void;
}

export default function LeadSegmentationHub({
  activeCategory,
  onCategoryChange,
  onInspectCall,
  onOpenExportModal
}: LeadSegmentationHubProps) {
  const [activeTab, setActiveTab] = useState<"all" | "interested" | "call_later" | "not_interested" | "inbound">(
    activeCategory || "interested"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedLeadForAudio, setSelectedLeadForAudio] = useState<StudentLeadItem | null>(null);
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Sync with parent activeCategory prop
  React.useEffect(() => {
    if (activeCategory) {
      setActiveTab(activeCategory);
    }
  }, [activeCategory]);

  const handleTabClick = (tab: "all" | "interested" | "call_later" | "not_interested" | "inbound") => {
    setActiveTab(tab);
    onCategoryChange?.(tab);
  };

  // Filtered Leads
  const filteredLeads = mockStudentLeads.filter((lead) => {
    if (activeTab === "interested" && lead.category !== "interested") return false;
    if (activeTab === "call_later" && lead.category !== "call_later") return false;
    if (activeTab === "not_interested" && lead.category !== "not_interested") return false;
    if (activeTab === "inbound" && lead.category !== "inbound_inquiry") return false;

    if (selectedCourse !== "all" && !lead.course.toLowerCase().includes(selectedCourse.toLowerCase())) {
      return false;
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.course.toLowerCase().includes(q) ||
        lead.summary.toLowerCase().includes(q) ||
        (lead.lang && lead.lang.toLowerCase().includes(q))
      );
    }

    return true;
  });

  const handleOpenAudio = (lead: StudentLeadItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInspectCall) {
      onInspectCall(lead);
    } else {
      setSelectedLeadForAudio(lead);
      setAudioModalOpen(true);
    }
  };

  const handleQuickDownloadCSV = () => {
    const headers = ["ID", "Candidate Name", "Phone", "Target Program", "Category", "Merit / Score", "Language", "Voice Agent", "Duration", "AI Summary", "Action Taken"];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.course}"`,
      l.category,
      `"${l.meritScore || l.callbackTime || l.disqualifiedReason || ''}"`,
      `"${l.lang || 'Indic'}"`,
      `"${l.agentName}"`,
      l.callDuration,
      `"${l.summary.replace(/"/g, '""')}"`,
      `"${l.actionTaken.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `swaram_${activeTab}_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="w-full bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 font-sans select-none shadow-2xs text-[#1A1A1A]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg sm:text-xl font-bold text-[#1A1A1A] tracking-tight">
              Lead Intelligence & Call Registry
            </h2>
            <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-[#FAF3E4] text-black/70 border border-black/[0.06]">
              {filteredLeads.length} Records
            </span>
          </div>
          <p className="text-xs text-black/50 font-normal">
            Live telemetry, sentiment analysis, and call recordings from active AI campaigns.
          </p>
        </div>

        {/* Quick Filter Reset */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-black/40 font-medium">Segment:</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold capitalize bg-[#111111] text-white shadow-2xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C1F2D5] animate-pulse" />
            {activeTab === "all" ? "All Contacts" : activeTab.replace("_", " ")}
          </span>
          {activeTab !== "all" && (
            <button
              onClick={() => handleTabClick("all")}
              className="text-xs text-black/60 hover:text-black font-semibold cursor-pointer ml-1.5 transition-colors"
            >
              Reset to All
            </button>
          )}
        </div>
      </div>

      {/* Download Toast Notification */}
      {downloadSuccess && (
        <div className="mb-5 p-4 bg-[#C1F2D5] border border-[#16856B]/20 rounded-[20px] shadow-2xs flex items-center justify-between text-xs font-semibold text-[#16856B] animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#16856B]" />
            <span>Exported {filteredLeads.length} contact records successfully!</span>
          </div>
          <span className="text-[11px] font-mono bg-white/60 text-[#16856B] px-2.5 py-0.5 rounded-full">CSV Saved</span>
        </div>
      )}

      {/* Unified Search, Channel Filter & Export Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contact name, phone, or query..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF3E4]/60 hover:bg-white border border-black/[0.06] rounded-full text-xs font-medium text-[#1A1A1A] placeholder:text-black/40 focus:bg-white focus:border-black/20 focus:outline-none transition-all shadow-2xs"
          />
        </div>

        {/* Filter & Export */}
        <div className="flex items-center gap-3 shrink-0">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3.5 py-2.5 bg-[#FAF3E4] border border-black/[0.06] rounded-full text-xs font-semibold text-black/70 focus:outline-none cursor-pointer transition-all shadow-2xs"
          >
            <option value="all">All Campaign Channels</option>
            <option value="outbound">Outbound Voice Calls</option>
            <option value="inbound">Inbound Helpline</option>
            <option value="sms">SMS Follow-up</option>
          </select>

          <button
            onClick={handleQuickDownloadCSV}
            className="px-4 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            title="Download this filtered list as CSV"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="overflow-x-auto border border-black/[0.06] rounded-[20px] shadow-2xs bg-white mt-4">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-[#FAF3E4]/70 text-black/50 font-semibold border-b border-black/[0.06] uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3.5 px-4">Candidate Prospect</th>
              <th className="py-3.5 px-4">Program & Dialect</th>
              <th className="py-3.5 px-4">
                {activeTab === "interested" ? "Merit / Score" : activeTab === "call_later" ? "Callback Scheduled" : activeTab === "not_interested" ? "Opt-Out Reason" : "Intent Status"}
              </th>
              <th className="py-3.5 px-4">AI Synthesis & Transcript</th>
              <th className="py-3.5 px-4">Duration</th>
              <th className="py-3.5 px-4">Action Taken</th>
              <th className="py-3.5 px-4 text-right">Indic Audio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.04] bg-white font-medium text-black/80">
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onInspectCall?.(lead)}
                className="hover:bg-[#FAF3E4]/40 transition-all duration-150 cursor-pointer group"
              >
                {/* Student */}
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-[#1A1A1A] group-hover:text-black transition-colors text-xs sm:text-sm flex items-center gap-1.5">
                    {lead.name}
                  </div>
                  <div className="text-[11px] font-mono text-black/50 flex items-center gap-1 font-medium mt-0.5">
                    <PhoneCall className="w-3 h-3 text-black/40" />
                    {lead.phone}
                  </div>
                </td>

                {/* Course & Dialect */}
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06]">
                    <GraduationCap className="w-3.5 h-3.5 text-black/40" />
                    {lead.course}
                  </span>
                  {lead.lang && (
                    <div className="text-[10px] font-medium text-black/50 flex items-center gap-1 mt-1">
                      <Globe className="w-3 h-3 text-[#4A72B2]" />
                      <span>{lead.lang}</span>
                    </div>
                  )}
                </td>

                {/* Status / Detail Column */}
                <td className="py-3.5 px-4">
                  {lead.category === "interested" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#C1F2D5] text-[#16856B]">
                      <CheckCircle2 className="w-3 h-3 text-[#16856B]" />
                      {lead.meritScore}
                    </span>
                  )}
                  {lead.category === "call_later" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFD9A0] text-[#7A4B00]">
                      <Clock className="w-3 h-3 text-[#7A4B00]" />
                      {lead.callbackTime}
                    </span>
                  )}
                  {lead.category === "not_interested" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#BCD0F5] text-[#1B365D]">
                      <XCircle className="w-3 h-3 text-[#1B365D]" />
                      {lead.disqualifiedReason}
                    </span>
                  )}
                  {lead.category === "inbound_inquiry" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D9C2FA] text-[#5B21B6]">
                      <PhoneIncoming className="w-3 h-3 text-[#5B21B6]" />
                      Inbound Query
                    </span>
                  )}
                </td>

                {/* Summary */}
                <td className="py-3.5 px-4 min-w-[250px] whitespace-normal">
                  <p className="line-clamp-2 text-xs text-black/70 font-normal leading-relaxed group-hover:text-black transition-colors">
                    {lead.summary}
                  </p>
                </td>

                {/* Duration & Time */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="font-mono font-semibold text-[#1A1A1A] text-xs">
                    {lead.callDuration}
                  </div>
                  <div className="text-[10px] text-black/40 font-medium">
                    {lead.timeAgo} ({lead.agentName.split(" ")[0]})
                  </div>
                </td>

                {/* Action Taken */}
                <td className="py-3.5 px-4 max-w-[190px]">
                  <span className="text-[11px] font-medium text-black/70 bg-[#FAF3E4] px-2.5 py-1 rounded-full border border-black/[0.06] block truncate">
                    {lead.actionTaken}
                  </span>
                </td>

                {/* Audio Button */}
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={(e) => handleOpenAudio(lead, e)}
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF3E4] hover:bg-[#111111] hover:text-white text-[#1A1A1A] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all active:scale-95"
                    title="Play Indic AI audio recording & transcript"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Play</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF3E4] flex items-center justify-center mx-auto mb-3 text-black/40">
              <PhoneCall className="w-6 h-6 stroke-[1.5]" />
            </div>
            <p className="font-bold text-sm text-[#1A1A1A]">No contact call records yet</p>
            <p className="text-xs text-black/50 mt-1 max-w-sm mx-auto">
              Once AI voice agents initiate outbound calls or receive inbound helpline calls, real-time audio transcripts and outcomes will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Audio Player Modal */}
      <InteractiveAudioPlayerModal
        lead={selectedLeadForAudio}
        isOpen={audioModalOpen}
        onClose={() => {
          setAudioModalOpen(false);
          setSelectedLeadForAudio(null);
        }}
      />
    </div>
  );
}
