"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Search,
  Download,
  Filter,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  User,
  GraduationCap,
  Sparkles,
  ArrowUpDown,
  FileSpreadsheet,
  FileText,
  ExternalLink,
  MessageSquare,
  ChevronRight,
  Play,
  Volume2
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
}

export const mockStudentLeads: StudentLeadItem[] = [
  // 1. INTERESTED LEADS
  {
    id: "lead-01",
    name: "Rahul Sharma",
    phone: "+91 98401 77120",
    course: "B.Tech Computer Science & Engg",
    category: "interested",
    meritScore: "CBSE 94% • High Intent",
    agentName: "Maya (Admissions AI)",
    callDuration: "3m 42s",
    timestamp: "2026-09-18 10:45 AM",
    timeAgo: "15 min ago",
    summary: "Inquired about CSE (AI & Data Science) cutoffs and hostel fees. Qualified for 35% Chancellor Merit Scholarship. Booked campus visit for Saturday.",
    transcriptSnippet: "We want to book a campus visit this Saturday to inspect the robotics innovation lab and hostel rooms.",
    actionTaken: "Campus Visit Confirmed • Brochure Sent via WhatsApp"
  },
  {
    id: "lead-02",
    name: "Ananya Iyer",
    phone: "+91 94450 99812",
    course: "MBA in FinTech & Business Analytics",
    category: "interested",
    meritScore: "CAT 98.2%ile • Qualified",
    agentName: "Maya (Admissions AI)",
    callDuration: "4m 12s",
    timestamp: "2026-09-18 10:20 AM",
    timeAgo: "40 min ago",
    summary: "Detailed discussion on average placement packages (highest ₹44 LPA) and corporate recruiters. Ready to pay seat reservation token fee.",
    transcriptSnippet: "The placement track record for FinTech is excellent. Please send the token payment link to my email.",
    actionTaken: "Fee Link Generated • Counseling Slot Assigned"
  },
  {
    id: "lead-03",
    name: "Swati Deshmukh",
    phone: "+91 91760 88231",
    course: "B.Tech Electronics & VLSI",
    category: "interested",
    meritScore: "State CET Rank 1,420",
    agentName: "Priya (Admissions AI)",
    callDuration: "2m 58s",
    timestamp: "2026-09-18 09:55 AM",
    timeAgo: "1h 05m ago",
    summary: "Inquired regarding semiconductor lab facilities and NVIDIA edge computing center. Very satisfied with fee installment breakdown.",
    transcriptSnippet: "Thank you for explaining the semester fee slabs and scholarship options. We will complete the registration online.",
    actionTaken: "Prospectus Dispatched • Application In-Progress"
  },
  {
    id: "lead-04",
    name: "Arnav Khurana",
    phone: "+91 97110 54321",
    course: "B.Des Product & UX Design",
    category: "interested",
    meritScore: "UCEED Rank 380",
    agentName: "Maya (Admissions AI)",
    callDuration: "3m 15s",
    timestamp: "2026-09-18 09:30 AM",
    timeAgo: "1h 30m ago",
    summary: "Interested in design studio facilities, portfolio submission deadlines, and hostel accommodation. Scheduled one-on-one portfolio review.",
    transcriptSnippet: "I have my design portfolio ready and want to know the last date for submitting for the merit waiver.",
    actionTaken: "Portfolio Review Scheduled • Campus Pass Sent"
  },

  // 2. CALL LATER / FOLLOW-UP NEEDED
  {
    id: "lead-05",
    name: "Gaurav Joshi",
    phone: "+91 98840 33219",
    course: "B.Tech Mechanical (Robotics)",
    category: "call_later",
    callbackTime: "Today at 5:30 PM",
    agentName: "Vikram (Counselor AI)",
    callDuration: "1m 54s",
    timestamp: "2026-09-18 10:11 AM",
    timeAgo: "49 min ago",
    summary: "Father answered call while traveling. Requested callback after 5:30 PM to discuss college transport bus routes and hostel mess charges.",
    transcriptSnippet: "I am in office meetings right now. Please give me a call around 5:30 PM this evening so my daughter can also join.",
    actionTaken: "Callback Queued for 5:30 PM • SMS Reminder Scheduled"
  },
  {
    id: "lead-06",
    name: "Meera Nair",
    phone: "+91 90032 66781",
    course: "M.Tech Data Science & AI",
    category: "call_later",
    callbackTime: "Tomorrow at 11:00 AM",
    agentName: "Priya (Admissions AI)",
    callDuration: "1m 18s",
    timestamp: "2026-09-18 09:15 AM",
    timeAgo: "1h 45m ago",
    summary: "Working professional inquiring about weekend executive classes. Requested call tomorrow morning after checking with company HR for sponsorship.",
    transcriptSnippet: "I need to confirm company tuition sponsorship with our HR team today. Please ring me tomorrow at 11 AM.",
    actionTaken: "Callback Queued for Tomorrow 11 AM • Brochure Emailed"
  },
  {
    id: "lead-07",
    name: "Karthik Raja",
    phone: "+91 98402 11984",
    course: "B.Tech Computer Science",
    category: "call_later",
    callbackTime: "Sep 20 at 04:00 PM",
    agentName: "Maya (Admissions AI)",
    callDuration: "1m 45s",
    timestamp: "2026-09-18 08:50 AM",
    timeAgo: "2h 10m ago",
    summary: "Student is currently appearing for Board improvement exam. Requested follow-up call on Sep 20th after exam concludes.",
    transcriptSnippet: "My final physics improvement exam is on Friday. Can you please call me Saturday afternoon at 4 PM?",
    actionTaken: "Auto-Dialer Queued for Sep 20 • Follow-up Active"
  },

  // 3. NOT INTERESTED / DISQUALIFIED
  {
    id: "lead-08",
    name: "Rohan Varma",
    phone: "+91 97890 22345",
    course: "B.Tech Civil Engineering",
    category: "not_interested",
    disqualifiedReason: "Admitted into State Govt NIT / IIT",
    agentName: "Priya (Admissions AI)",
    callDuration: "1m 02s",
    timestamp: "2026-09-18 09:40 AM",
    timeAgo: "1h 20m ago",
    summary: "Student secured seat in NIT Trichy via JoSAA Round 2 counseling. Polite opt-out. Do not call list updated.",
    transcriptSnippet: "Thank you for calling, but I have already frozen my seat in NIT Trichy in the 2nd counseling round.",
    actionTaken: "Marked Opt-Out • Removed from Active Intake Campaign"
  },
  {
    id: "lead-09",
    name: "Pooja Hegde",
    phone: "+91 94441 55678",
    course: "B.Sc Biotechnology",
    category: "not_interested",
    disqualifiedReason: "Shifted to Medical / NEET Track",
    agentName: "Maya (Admissions AI)",
    callDuration: "0m 55s",
    timestamp: "2026-09-18 08:30 AM",
    timeAgo: "2h 30m ago",
    summary: "Applicant decided to pursue MBBS through NEET counseling. Not taking engineering or biotech degree this academic year.",
    transcriptSnippet: "I am joining MBBS through state medical counseling, so I won't be taking admission for B.Sc.",
    actionTaken: "Archived • Not Interested Logged"
  },
  {
    id: "lead-10",
    name: "Suresh Pillai",
    phone: "+91 91761 99012",
    course: "B.Tech Mechanical",
    category: "not_interested",
    disqualifiedReason: "Location / Relocation Constraints",
    agentName: "Vikram (Counselor AI)",
    callDuration: "1m 20s",
    timestamp: "2026-09-17 04:15 PM",
    timeAgo: "Yesterday",
    summary: "Parents unwilling to send student for outstation hostel. Looking exclusively for local colleges in Delhi NCR.",
    transcriptSnippet: "We are looking for colleges only within Delhi NCR as we don't want our son to stay in a distant hostel.",
    actionTaken: "Flagged Location Disqualified • Status Updated"
  },

  // 4. INBOUND INQUIRIES & ESCALATIONS
  {
    id: "lead-11",
    name: "Anita Roy",
    phone: "+91 98765 11980",
    course: "Lateral Entry (Direct 2nd Year B.Tech)",
    category: "inbound_inquiry",
    agentName: "Maya (Admissions AI)",
    callDuration: "3m 10s",
    timestamp: "2026-09-18 10:39 AM",
    timeAgo: "21 min ago",
    summary: "Inquired about 3-year Mechanical Diploma credit conversion for lateral entry. Transferred with warm dossier to Chief Admissions Dean.",
    transcriptSnippet: "I finished my 3-year Mechanical Diploma with 88% and need urgent guidance on direct 2nd-year B.Tech admission.",
    actionTaken: "Warm Handoff to Dean of Admissions • Dossier Transferred"
  },
  {
    id: "lead-12",
    name: "Deepika Sen",
    phone: "+91 91760 88231",
    course: "B.Tech AI & Robotics",
    category: "inbound_inquiry",
    agentName: "Priya (Admissions AI)",
    callDuration: "2m 45s",
    timestamp: "2026-09-18 10:05 AM",
    timeAgo: "55 min ago",
    summary: "Parent called inquiring about NRI quota fee structure, hostel single AC occupancy, and international exchange programs.",
    transcriptSnippet: "Is there any additional deposit for the single AC hostel room, and can we pay tuition in US Dollars or INR?",
    actionTaken: "NRI Fee Catalog Sent • Callback Scheduled with Dean"
  }
];

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

  // Counts
  const countInterested = mockStudentLeads.filter((l) => l.category === "interested").length;
  const countCallLater = mockStudentLeads.filter((l) => l.category === "call_later").length;
  const countNotInterested = mockStudentLeads.filter((l) => l.category === "not_interested").length;
  const countInbound = mockStudentLeads.filter((l) => l.category === "inbound_inquiry").length;
  const countAll = mockStudentLeads.length;

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
        lead.summary.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const handleOpenAudio = (lead: StudentLeadItem, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLeadForAudio(lead);
    setAudioModalOpen(true);
  };

  const handleQuickDownloadCSV = () => {
    // Confetti celebration
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#d6ff38", "#10b981", "#0284c7"]
      });
    } catch (e) {}

    // Generate CSV string from filtered list
    const headers = ["ID", "Student Name", "Phone", "Target Course", "Category", "Merit / Details", "Agent", "Duration", "Summary", "Action Taken"];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.course}"`,
      l.category,
      `"${l.meritScore || l.callbackTime || l.disqualifiedReason || ''}"`,
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
    link.setAttribute("download", `apex_admissions_${activeTab}_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  return (
    <div className="w-full bg-white rounded-xl p-4 sm:p-6 border-[1.5px] border-black shadow-[3px_3px_0px_#000000] select-none">
      {/* Top Header: Title + Instant Download Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d6ff38] border border-black inline-block animate-pulse" />
            <h2 className="text-lg sm:text-xl font-black text-black tracking-tight uppercase">
              AI Calling & Lead Categorization Hub
            </h2>
          </div>
          <p className="text-xs text-neutral-600 font-medium">
            AI voice agents dialing student lists and answering helpline calls 24/7, categorized by intent with 1-click export.
          </p>
        </div>

        {/* Action Buttons: Instant CSV Download + Complete Export Report */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleQuickDownloadCSV}
            className="px-3.5 py-2 rounded-xl bg-[#d6ff38] hover:bg-[#cbf72e] text-black text-xs font-bold border-[1.5px] border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Download this segmented list as CSV"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Download CSV ({filteredLeads.length})</span>
          </button>

          <button
            onClick={onOpenExportModal}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 text-black text-xs font-bold border-[1.5px] border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Export complete admissions dossier & compliance audit"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 stroke-[2]" />
            <span>Full Export</span>
          </button>
        </div>
      </div>

      {/* Download Toast Notification */}
      {downloadSuccess && (
        <div className="mb-4 p-3 bg-[#fcffe0] border border-black rounded-xl shadow-[2px_2px_0px_#000000] flex items-center justify-between text-xs font-bold text-black animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5] text-black" />
            <span>Exported {filteredLeads.length} student leads to your downloads!</span>
          </div>
          <span className="text-[11px] font-mono bg-[#d6ff38] px-2 py-0.5 border border-black rounded font-bold">CSV Saved</span>
        </div>
      )}

      {/* Main Category Segmentation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {/* Tab 1: Interested */}
        <button
          onClick={() => handleTabClick("interested")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border-[1.5px] border-black ${
            activeTab === "interested"
              ? "bg-[#d6ff38] text-black shadow-[2px_2px_0px_#000000] -translate-y-0.5"
              : "bg-white text-neutral-800 shadow-[1.5px_1.5px_0px_#000000] hover:bg-neutral-50"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-black" />
          <span>⭐ Interested</span>
          <span className="px-1.5 py-0.2 rounded bg-black text-[#d6ff38] text-[10px] font-mono font-bold">
            {countInterested}
          </span>
        </button>

        {/* Tab 2: Call Later */}
        <button
          onClick={() => handleTabClick("call_later")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border-[1.5px] border-black ${
            activeTab === "call_later"
              ? "bg-amber-200 text-black shadow-[2px_2px_0px_#000000] -translate-y-0.5"
              : "bg-white text-neutral-800 shadow-[1.5px_1.5px_0px_#000000] hover:bg-neutral-50"
          }`}
        >
          <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>⏰ Call Later</span>
          <span className="px-1.5 py-0.2 rounded bg-black text-amber-200 text-[10px] font-mono font-bold">
            {countCallLater}
          </span>
        </button>

        {/* Tab 3: Not Interested */}
        <button
          onClick={() => handleTabClick("not_interested")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border-[1.5px] border-black ${
            activeTab === "not_interested"
              ? "bg-rose-200 text-black shadow-[2px_2px_0px_#000000] -translate-y-0.5"
              : "bg-white text-neutral-800 shadow-[1.5px_1.5px_0px_#000000] hover:bg-neutral-50"
          }`}
        >
          <XCircle className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>🚫 Not Interested</span>
          <span className="px-1.5 py-0.2 rounded bg-black text-rose-200 text-[10px] font-mono font-bold">
            {countNotInterested}
          </span>
        </button>

        {/* Tab 4: Inbound Inquiries */}
        <button
          onClick={() => handleTabClick("inbound")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border-[1.5px] border-black ${
            activeTab === "inbound"
              ? "bg-[#d6ff38] text-black shadow-[2px_2px_0px_#000000] -translate-y-0.5"
              : "bg-white text-neutral-800 shadow-[1.5px_1.5px_0px_#000000] hover:bg-neutral-50"
          }`}
        >
          <PhoneIncoming className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>📞 Inbound</span>
          <span className="px-1.5 py-0.2 rounded bg-black text-[#d6ff38] text-[10px] font-mono font-bold">
            {countInbound}
          </span>
        </button>

        {/* Tab 5: All Calls */}
        <button
          onClick={() => handleTabClick("all")}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border-[1.5px] border-black ${
            activeTab === "all"
              ? "bg-black text-[#d6ff38] shadow-[2px_2px_0px_#d6ff38] -translate-y-0.5"
              : "bg-white text-neutral-800 shadow-[1.5px_1.5px_0px_#000000] hover:bg-neutral-50"
          }`}
        >
          <span>Complete History</span>
          <span className="px-1.5 py-0.2 rounded bg-[#d6ff38] text-black text-[10px] font-mono font-bold">
            {countAll}
          </span>
        </button>
      </div>

      {/* Search & Course Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-3.5">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-600 stroke-[2.5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student name, phone number, or intent..."
            className="w-full pl-9 pr-3 py-2 bg-white border-[1.5px] border-black rounded-xl text-xs font-medium text-neutral-900 placeholder-neutral-400 shadow-[2px_2px_0px_#000000] focus:bg-[#fcffe0]/40 focus:outline-none transition-all"
          />
        </div>

        {/* Course Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-neutral-700 uppercase">Program:</span>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 bg-white border-[1.5px] border-black rounded-xl text-xs font-bold text-neutral-900 shadow-[2px_2px_0px_#000000] focus:outline-none cursor-pointer"
          >
            <option value="all">All Academic Programs</option>
            <option value="computer science">B.Tech Computer Science</option>
            <option value="fintech">MBA FinTech</option>
            <option value="electronics">B.Tech Electronics & VLSI</option>
            <option value="design">B.Des Design</option>
            <option value="mechanical">B.Tech Mechanical</option>
          </select>
        </div>
      </div>

      {/* Main Leads Table */}
      <div className="overflow-x-auto border-[1.5px] border-black rounded-xl shadow-[2.5px_2.5px_0px_#000000]">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-50 text-neutral-900 font-bold border-b border-black uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-2.5 px-3.5">Student Prospect</th>
              <th className="py-2.5 px-3.5">Program of Interest</th>
              <th className="py-2.5 px-3.5">
                {activeTab === "interested" ? "Merit / Score" : activeTab === "call_later" ? "Callback Scheduled" : activeTab === "not_interested" ? "Opt-Out Reason" : "Intent Status"}
              </th>
              <th className="py-2.5 px-3.5">AI Summary</th>
              <th className="py-2.5 px-3.5">Duration</th>
              <th className="py-2.5 px-3.5">Action Taken</th>
              <th className="py-2.5 px-3.5 text-right">Voice Call</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white">
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onInspectCall?.(lead)}
                className="hover:bg-[#d6ff38]/10 transition-colors cursor-pointer group"
              >
                {/* Student */}
                <td className="py-3 px-3.5">
                  <div className="font-bold text-neutral-950 group-hover:text-black transition-colors text-xs sm:text-sm">
                    {lead.name}
                  </div>
                  <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-1 font-medium mt-0.5">
                    <PhoneCall className="w-3 h-3 text-neutral-600 stroke-[2]" />
                    {lead.phone}
                  </div>
                </td>

                {/* Course */}
                <td className="py-3 px-3.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-50 text-neutral-800 border border-neutral-300">
                    <GraduationCap className="w-3 h-3 stroke-[2]" />
                    {lead.course}
                  </span>
                </td>

                {/* Status / Detail Column */}
                <td className="py-3 px-3.5">
                  {lead.category === "interested" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#d6ff38] text-black border border-black shadow-[1px_1px_0px_#000000]">
                      <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                      {lead.meritScore}
                    </span>
                  )}
                  {lead.category === "call_later" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-400 shadow-[1px_1px_0px_#000000]">
                      <Clock className="w-3 h-3 stroke-[2.5]" />
                      {lead.callbackTime}
                    </span>
                  )}
                  {lead.category === "not_interested" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 shadow-[1px_1px_0px_#000000]">
                      <XCircle className="w-3 h-3 stroke-[2.5]" />
                      {lead.disqualifiedReason}
                    </span>
                  )}
                  {lead.category === "inbound_inquiry" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#d6ff38] text-black border border-black shadow-[1px_1px_0px_#000000]">
                      <PhoneIncoming className="w-3 h-3 stroke-[2.5]" />
                      Inbound Helpline Query
                    </span>
                  )}
                </td>

                {/* Summary */}
                <td className="py-3 px-3.5 max-w-xs">
                  <p className="line-clamp-2 text-xs text-neutral-700 leading-relaxed font-normal">
                    {lead.summary}
                  </p>
                </td>

                {/* Duration & Time */}
                <td className="py-3 px-3.5 whitespace-nowrap">
                  <div className="font-mono font-bold text-neutral-800 text-xs">
                    {lead.callDuration}
                  </div>
                  <div className="text-[10px] text-neutral-500 font-medium">
                    {lead.timeAgo} ({lead.agentName.split(" ")[0]})
                  </div>
                </td>

                {/* Action Taken */}
                <td className="py-3 px-3.5 max-w-[170px]">
                  <span className="text-[11px] font-medium text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 block truncate">
                    {lead.actionTaken}
                  </span>
                </td>

                {/* Action Button: Play Audio Dialogue */}
                <td className="py-3 px-3.5 text-right">
                  <button
                    onClick={(e) => handleOpenAudio(lead, e)}
                    className="px-3 py-1.5 rounded-lg bg-[#d6ff38] hover:bg-[#cbf72e] text-black text-xs font-bold border border-black shadow-[1.5px_1.5px_0px_#000000] inline-flex items-center gap-1 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 transition-all"
                    title="Play full AI call audio recording & transcript"
                  >
                    <Play className="w-3 h-3 fill-current stroke-[2]" />
                    <span>Play Call</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLeads.length === 0 && (
          <div className="text-center py-10 text-neutral-600">
            <p className="font-bold text-sm">No student leads found matching this filter.</p>
            <p className="text-xs text-neutral-400 mt-1">Try resetting your search query or choosing another category tab.</p>
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
