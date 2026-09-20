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

export const mockStudentLeads: StudentLeadItem[] = [
  // 1. INTERESTED ENROLLEES
  {
    id: "lead-01",
    name: "Rahul Verma",
    phone: "+91 98401 55219",
    course: "B.Tech Computer Science (AI & ML)",
    category: "interested",
    meritScore: "94.2% PCM • CBSE",
    agentName: "Ritu (Hindi Admissions)",
    callDuration: "3m 42s",
    timestamp: "2026-09-18 11:24 AM",
    timeAgo: "4 min ago",
    lang: "Hindi + Eng",
    summary: "छात्र ने बी.टेक एआई में प्रवेश एवं चांसलर स्कॉलरशिप के लिए पूछताछ की। 35% स्कॉलरशिप हेतु प्री-अप्रूवल दिया गया। शनिवार 11:00 AM पर कैंपस विजिट बुक किया।",
    transcriptSnippet: "नमस्ते राहुल जी! आपके 12th PCM में 94.2% मार्क्स के आधार पर 35% चांसलर मेरिट स्कॉलरशिप स्वीकृत कर दी गई है।",
    actionTaken: "Pre-Approved 35% Scholarship • Campus Tour Pass Emailed"
  },
  {
    id: "lead-02",
    name: "Sneha Reddy",
    phone: "+91 98401 77120",
    course: "MBA FinTech & Business Analytics",
    category: "interested",
    meritScore: "CAT 88.5 Percentile",
    agentName: "Neha (Telugu Counseling)",
    callDuration: "2m 58s",
    timestamp: "2026-09-18 11:15 AM",
    timeAgo: "12 min ago",
    lang: "Telugu + Eng",
    summary: "విద్యార్థి ఎంబీఏ ఫిన్‌టెక్ ఫీజు మరియు 3-విడతల సున్నా వడ్డీ ఈఎంఐ ప్లాన్ గురించి ఆరా తీశారు. టోకెన్ అడ్మిషన్ ఫీజు చెల్లించడానికి లింక్ పంపబడింది.",
    transcriptSnippet: "నమస్కారం స్నేహ గారు! ఎంబీఏ ఫిన్‌టెక్ 3-విడతల ఫీజు వివరాలు మరియు బ్రోచర్ మీ వాట్సాప్‌కు పంపించాము.",
    actionTaken: "EMI Payment Link Sent • Counseling Slot Booked"
  },
  {
    id: "lead-03",
    name: "Priya Rao",
    phone: "+91 91760 33412",
    course: "B.Tech Electronics & VLSI Design",
    category: "interested",
    meritScore: "KCET Rank 4,210",
    agentName: "Ishita (Kannada Support)",
    callDuration: "3m 12s",
    timestamp: "2026-09-18 10:55 AM",
    timeAgo: "32 min ago",
    lang: "Kannada",
    summary: "ಇಂಜಿನಿಯರಿಂಗ್ ವಿಎಲ್‌ಎಸ್‌ಐ ಸೀಟ್ ಮತ್ತು ಹಾಸ್ಟೆಲ್ ಸಿಂಗಲ್ ಎಸಿ ರೂಮ್ ಲಭ್ಯತೆ ದೃಢಪಡಿಸಲಾಗಿದೆ. ₹10,000 ಟೋಕನ್ ಸೀಟ್ ಕಾಯ್ದಿರಿಸುವಿಕೆ ಪೂರ್ಣಗೊಂಡಿದೆ.",
    transcriptSnippet: "ನಮಸ್ಕಾರ ಪ್ರಿಯಾ! ವಿಎಲ್‌ಎಸ್‌ಐ ಕೋರ್ಸ್ ಸೀಟ್ ಬುಕಿಂಗ್ ದೃಢಪಡಿಸಲಾಗಿದೆ. ಹಾಸ್ಟೆಲ್ ರೂಮ್ ನಂಬರ್ 302 ನಿಗದಿಪಡಿಸಲಾಗಿದೆ.",
    actionTaken: "Token Reservation Completed • Hostel Pass Issued"
  },
  {
    id: "lead-04",
    name: "Tanushree Das",
    phone: "+91 98300 44192",
    course: "B.Des User Experience & Interaction",
    category: "interested",
    meritScore: "UCEED Rank 890",
    agentName: "Suhani (Bengali Advisor)",
    callDuration: "2m 30s",
    timestamp: "2026-09-18 10:42 AM",
    timeAgo: "45 min ago",
    lang: "Bengali",
    summary: "ডিজাইন পোর্টফোলিও রিভিউ এবং স্কলারশিপ স্ল্যাব ব্যাখ্যা করা হয়েছে। আগামীকাল প্রধান অধ্যাপকের সাথে অনলাইন পোর্টফোলিও রাউন্ড নির্ধারিত।",
    transcriptSnippet: "নমস্কার তনুশ্রী! ইউসিড র্যাঙ্ক অনুযায়ী আপনার ২৫% স্কলারশিপ নিশ্চিত হয়েছে। আগামীকাল সকাল ১০টায় পোর্টফোলিও কল হবে।",
    actionTaken: "Design Portfolio Interview Booked • Catalog Sent"
  },

  // 2. CALL LATER / FOLLOW-UP
  {
    id: "lead-05",
    name: "Gaurav Joshi",
    phone: "+91 98840 33219",
    course: "B.Tech Mechanical (Robotics)",
    category: "call_later",
    callbackTime: "Today at 5:30 PM",
    agentName: "Shubh (Hindi Professional)",
    callDuration: "1m 54s",
    timestamp: "2026-09-18 10:11 AM",
    timeAgo: "49 min ago",
    lang: "Hindi",
    summary: "पिताजी यात्रा के दौरान कॉल पर थे। शाम 5:30 बजे कॉलेज बस रूट एवं मेस मेनू पर विस्तृत चर्चा हेतु कॉलबैक मांगा।",
    transcriptSnippet: "मैं अभी मीटिंग में हूँ। कृपया शाम 5:30 बजे कॉल करें ताकि मेरी बेटी भी साथ में बात कर सके।",
    actionTaken: "Callback Queued for 5:30 PM • SMS Reminder Scheduled"
  },
  {
    id: "lead-06",
    name: "Meera Nair",
    phone: "+91 90032 66781",
    course: "M.Tech Data Science & AI",
    category: "call_later",
    callbackTime: "Tomorrow at 11:00 AM",
    agentName: "Ritu (Hindi Admissions)",
    callDuration: "1m 18s",
    timestamp: "2026-09-18 09:15 AM",
    timeAgo: "1h 45m ago",
    lang: "English + Hindi",
    summary: "वर्किंग प्रोफेशनल छात्र। कंपनी एचआर से स्पॉन्सरशिप लेटर कन्फर्म कर कल सुबह 11 बजे दोबारा बात करने का अनुरोध किया।",
    transcriptSnippet: "I need to confirm company tuition sponsorship with our HR team today. Please ring me tomorrow at 11 AM.",
    actionTaken: "Callback Queued for Tomorrow 11 AM • Brochure Emailed"
  },

  // 3. NOT INTERESTED / OPT-OUT
  {
    id: "lead-07",
    name: "Rohan Varma",
    phone: "+91 97890 22345",
    course: "B.Tech Civil Engineering",
    category: "not_interested",
    disqualifiedReason: "Admitted into NIT Trichy (JoSAA Round 2)",
    agentName: "Ritu (Hindi Admissions)",
    callDuration: "1m 02s",
    timestamp: "2026-09-18 09:40 AM",
    timeAgo: "1h 20m ago",
    lang: "English + Hindi",
    summary: "छात्र को जोसा राउंड 2 में एनआईटी त्रिची में सीट आवंटित हो गई है। सादर ऑप-आउट अनुरोध। डू नॉट कॉल लिस्ट अपडेट।",
    transcriptSnippet: "Thank you for calling, but I have already frozen my seat in NIT Trichy in the 2nd JoSAA counseling round.",
    actionTaken: "Marked Opt-Out • Removed from Active Intake Campaign"
  },
  {
    id: "lead-08",
    name: "Pooja Hegde",
    phone: "+91 94441 55678",
    course: "B.Sc Biotechnology",
    category: "not_interested",
    disqualifiedReason: "Secured MBBS Seat via NEET Counseling",
    agentName: "Neha (Telugu Counseling)",
    callDuration: "0m 55s",
    timestamp: "2026-09-18 08:30 AM",
    timeAgo: "2h 30m ago",
    lang: "Telugu + Eng",
    summary: "నీట్ మెడికల్ కౌన్సెలింగ్ ద్వారా ఎంబీబీఎస్ సీటు ఖరారు చేసుకున్నారు. ఈ సంవత్సరం ఇంజనీరింగ్ అడ్మిషన్ అవసరం లేదు.",
    transcriptSnippet: "I am joining MBBS through state medical counseling, so I won't be taking admission for B.Sc.",
    actionTaken: "Archived • Not Interested Logged"
  },

  // 4. INBOUND INQUIRIES & ESCALATIONS
  {
    id: "lead-09",
    name: "Anita Roy",
    phone: "+91 98765 11980",
    course: "Lateral Entry (Direct 2nd Year B.Tech)",
    category: "inbound_inquiry",
    agentName: "Ritu (Hindi Admissions)",
    callDuration: "3m 10s",
    timestamp: "2026-09-18 10:39 AM",
    timeAgo: "21 min ago",
    lang: "Hindi + Eng",
    summary: "3-वर्षीय मैकेनिकल डिप्लोमा (88%) क्रेडिट ट्रांसफर एवं सीधे द्वितीय वर्ष में प्रवेश संबंधी तत्काल पूछताछ। चीफ डीन को ट्रांसफर किया गया।",
    transcriptSnippet: "मैंने 88% के साथ डिप्लोमा पूरा किया है। मुझे डायरेक्ट 2nd-year B.Tech एडमिशन की कटऑफ और प्रक्रिया जाननी है।",
    actionTaken: "Warm Handoff to Dean of Admissions • Dossier Transferred"
  },
  {
    id: "lead-10",
    name: "Deepika Sen",
    phone: "+91 91760 88231",
    course: "B.Tech AI & Robotics",
    category: "inbound_inquiry",
    agentName: "Suhani (Bengali Advisor)",
    callDuration: "2m 45s",
    timestamp: "2026-09-18 10:05 AM",
    timeAgo: "55 min ago",
    lang: "Bengali + Eng",
    summary: "এনআরআই কোটা ফি কাঠামো, সিঙ্গেল এসি হোস্টেল এবং আন্তর্জাতিক এক্সচেঞ্জ প্রোগ্রাম সম্পর্কে অভিভাবকের বিশদ অনুসন্ধান।",
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
    link.setAttribute("download", `apex_indic_${activeTab}_candidates_${Date.now()}.csv`);
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
              Candidate Ingestion & Multilingual Registry
            </h2>
            <span className="px-3 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 text-neutral-700 border border-black/5">
              {filteredLeads.length} Candidates
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-normal">
            Real-time Indic voice interactions synthesized in regional dialects with instant audio playback.
          </p>
        </div>

        {/* Quick Filter Reset */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-neutral-400 font-medium">Segment:</span>
          <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-neutral-900 text-white shadow-xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {activeTab === "all" ? "All Candidates" : activeTab.replace("_", " ")}
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
            <span>Exported {filteredLeads.length} candidate dossiers successfully with Indic voice logs!</span>
          </div>
          <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-md">CSV Saved</span>
        </div>
      )}

      {/* Unified Search, Course Filter & Export Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, phone, dialect, or query..."
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 hover:bg-white border border-black/10 hover:border-black/25 rounded-xl text-xs font-medium text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-black focus:outline-none transition-all"
          />
        </div>

        {/* Program Filter & Single CSV Export Button */}
        <div className="flex items-center gap-3 shrink-0">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3.5 py-2.5 bg-neutral-50 hover:bg-white border border-black/10 hover:border-black/25 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none cursor-pointer transition-all"
          >
            <option value="all">All Academic Programs</option>
            <option value="computer science">B.Tech Computer Science (AI & ML)</option>
            <option value="fintech">MBA FinTech</option>
            <option value="electronics">B.Tech Electronics & VLSI</option>
            <option value="design">B.Des Interaction Design</option>
            <option value="mechanical">B.Tech Mechanical</option>
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
      <div className="overflow-x-auto border border-black/10 rounded-2xl shadow-xs bg-white">
        <table className="w-full text-left text-xs">
          <thead className="bg-neutral-50/90 text-neutral-500 font-semibold border-b border-black/10 uppercase tracking-wider text-[11px]">
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
                <td className="py-4 px-5 max-w-xs">
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
          <div className="text-center py-12 text-neutral-500">
            <p className="font-semibold text-sm">No candidate records found matching this filter.</p>
            <p className="text-xs text-neutral-400 mt-1">Try resetting your search query or choosing another segment card above.</p>
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
