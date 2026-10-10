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
  Sparkles,
  ExternalLink,
  ChevronDown,
  Globe
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
    <div className="w-full liquid-glass-card rounded-3xl p-6 sm:p-8 font-sans select-none">
      {/* Top Header: Title + Active Filter Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 tracking-tight font-serif-display">
              Lead Intelligence & Call Registry
            </h2>
            <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-700 border border-black/5">
              {filteredLeads.length} Records
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-normal">
            Live telemetry, sentiment analysis, and call recordings from active AI campaigns.
          </p>
        </div>

        {/* Quick Filter Reset */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-neutral-400 font-medium">Segment:</span>
          <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-neutral-900 text-white shadow-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {activeTab === "all" ? "All Contacts" : activeTab.replace("_", " ")}
          </span>
          {activeTab !== "all" && (
            <button
              onClick={() => handleTabClick("all")}
              className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer ml-1.5"
            >
              Reset to All
            </button>
          )}
        </div>
      </div>

      {/* Download Toast Notification */}
      {downloadSuccess && (
        <div className="mb-5 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl shadow-xs flex items-center justify-between text-xs font-semibold text-emerald-900 animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Exported {filteredLeads.length} contact records successfully!</span>
          </div>
          <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">CSV Saved</span>
        </div>
      )}

      {/* Unified Search, Channel Filter & Export Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contact name, phone, or query..."
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 hover:bg-white border border-black/10 hover:border-black/25 rounded-xl text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-black focus:outline-none transition-all"
          />
        </div>

        {/* Filter & Single CSV Export Button */}
        <div className="flex items-center gap-3 shrink-0">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3.5 py-2.5 bg-neutral-50 hover:bg-white border border-black/10 hover:border-black/25 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none cursor-pointer transition-all"
          >
            <option value="all">All Campaign Channels</option>
            <option value="outbound">Outbound Voice Calls</option>
            <option value="inbound">Inbound Helpline</option>
            <option value="sms">SMS Follow-up</option>
          </select>

          <button
            onClick={handleQuickDownloadCSV}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            title="Download this filtered list as CSV"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Leads Table with Clean Modern Borders & Row Highlights */}
      <div className="overflow-x-auto border border-black/10 rounded-2xl shadow-sm liquid-glass-subtle mt-4">
        <table className="w-full text-left text-xs whitespace-nowrap">
          <thead className="bg-white/40 text-neutral-500 font-semibold border-b border-black/10 uppercase tracking-wider text-[11px] backdrop-blur-sm">
            <tr>
              <th className="py-4 px-5">Candidate Prospect</th>
              <th className="py-4 px-5">Program & Dialect</th>
              <th className="py-4 px-5">
                {activeTab === "interested" ? "Merit / Score" : activeTab === "call_later" ? "Callback Scheduled" : activeTab === "not_interested" ? "Opt-Out Reason" : "Intent Status"}
              </th>
              <th className="py-4 px-5">AI Synthesis & Transcript</th>
              <th className="py-4 px-5">Duration</th>
              <th className="py-4 px-5">Action Taken</th>
              <th className="py-4 px-5 text-right">Indic Audio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-transparent">
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onInspectCall?.(lead)}
                className="hover:bg-neutral-50/80 transition-all duration-150 cursor-pointer group"
              >
                {/* Student */}
                <td className="py-4 px-5">
                  <div className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors text-xs sm:text-sm flex items-center gap-1.5">
                    {lead.name}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-1 font-medium mt-0.5">
                    <PhoneCall className="w-3 h-3 text-neutral-400" />
                    {lead.phone}
                  </div>
                </td>

                {/* Course & Dialect */}
                <td className="py-4 px-5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-neutral-100 text-neutral-800 border border-black/5">
                    <GraduationCap className="w-3.5 h-3.5 text-neutral-500" />
                    {lead.course}
                  </span>
                  {lead.lang && (
                    <div className="text-[10px] font-medium text-neutral-500 flex items-center gap-1 mt-1">
                      <Globe className="w-3 h-3 text-blue-500" />
                      <span>{lead.lang}</span>
                    </div>
                  )}
                </td>

                {/* Status / Detail Column */}
                <td className="py-4 px-5">
                  {lead.category === "interested" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {lead.meritScore}
                    </span>
                  )}
                  {lead.category === "call_later" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {lead.callbackTime}
                    </span>
                  )}
                  {lead.category === "not_interested" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                      <XCircle className="w-3 h-3 text-blue-600" />
                      {lead.disqualifiedReason}
                    </span>
                  )}
                  {lead.category === "inbound_inquiry" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                      <PhoneIncoming className="w-3 h-3 text-purple-600" />
                      Inbound Query
                    </span>
                  )}
                </td>

                {/* Summary */}
                <td className="py-4 px-5 min-w-[250px] whitespace-normal">
                  <p className="line-clamp-2 text-xs text-neutral-600 font-normal leading-relaxed group-hover:text-neutral-900 transition-colors">
                    {lead.summary}
                  </p>
                </td>

                {/* Duration & Time */}
                <td className="py-4 px-5 whitespace-nowrap">
                  <div className="font-mono font-semibold text-neutral-900 text-xs">
                    {lead.callDuration}
                  </div>
                  <div className="text-[10px] text-neutral-400 font-medium">
                    {lead.timeAgo} ({lead.agentName.split(" ")[0]})
                  </div>
                </td>

                {/* Action Taken */}
                <td className="py-4 px-5 max-w-[190px]">
                  <span className="text-[11px] font-medium text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md border border-black/5 block truncate">
                    {lead.actionTaken}
                  </span>
                </td>

                {/* Audio Button */}
                <td className="py-4 px-5 text-right">
                  <button
                    onClick={(e) => handleOpenAudio(lead, e)}
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-95"
                    title="Play Indic AI audio recording & transcript"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Play</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
              <PhoneCall className="w-6 h-6 stroke-[1.5]" />
            </div>
            <p className="font-bold text-sm text-slate-800">No contact call records yet</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
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
