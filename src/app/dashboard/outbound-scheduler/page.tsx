"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PhoneOutgoing,
  PhoneCall,
  Calendar,
  Clock,
  Users,
  Bot,
  Sparkles,
  Check,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  Globe,
  Sliders,
  Play,
  Pause,
  Volume2,
  FileSpreadsheet,
  ChevronRight,
  ShieldCheck,
  Radio,
  Search,
  Filter,
  Eye,
  ExternalLink,
  MessageSquare,
  Building,
  RefreshCw,
  Send,
  Zap,
  ArrowRight,
  ArrowUpRight,
  PhoneForwarded,
  Tag,
  Copy,
  SlidersHorizontal,
  Info,
  CalendarClock,
  Layers,
  ChevronDown,
  X,
  FileText,
  BadgeAlert,
  Headphones,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";
import { mockAgents } from "@/data/mock/dashboardData";
import {
  saveUserContact,
  saveUserContactBatch,
  getUserContactsHistory,
  ENTERPRISE_CALL_CENTER_METRICS,
} from "@/lib/contactsHistory";

// =========================================================================
// DATA STRUCTURES FOR OUTBOUND CALLS & SCHEDULER
// =========================================================================

export interface OutboundContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  leadScore: number;
  intent: "High Intent" | "Qualified" | "Follow-up Needed";
  city: string;
  source: string;
}

export interface OutboundCallRecord {
  id: string; // e.g. "OUT-9042"
  contactName: string;
  contactPhone: string;
  courseOrProgram: string;
  city: string;
  agentId: string;
  agentName: string;
  agentAvatar: string;
  agentRole: string;
  topic: string;
  direction: "outbound";
  status: "completed" | "in-progress" | "scheduled" | "callback" | "no-answer";
  duration: string;
  durationSeconds: number;
  scheduledTime?: string;
  timestamp: string;
  timeAgo: string;
  dispatchMode: "Instant Batch" | "Scheduled Time" | "Bulk Cadence Window";
  callingWindow?: string;
  sentimentScore: number;
  outcome: string;
  summary: string;
  relatedCallHistoryId?: string; // Links to /dashboard/call-history?search=LOG-9037
  extractedEntities?: {
    phoneNumbers?: { label: string; value: string; verified?: boolean }[];
    emails?: { label: string; value: string; verified?: boolean }[];
    addresses?: { label: string; street: string; cityStatePincode: string }[];
    keyPoints?: string[];
  };
}

// Pre-configured cohorts (Realistic High-Volume Call Center Scale)
const PRECONFIGURED_COHORTS = [
  {
    id: "cohort-admissions",
    name: "All-India JoSAA & State CET Qualified Applicants 2026",
    count: 4850,
    tag: "High Intent • Avg Score 91.2",
    topic: "admissions",
    description: "Shortlisted candidates with PCM/PCB score > 85% eligible for direct merit seats & Chancellor Scholarships.",
  },
  {
    id: "cohort-user-history",
    name: "Previous Contacts History (User Provided / Memory Synced)",
    count: 6820,
    tag: "User Provided • CRM Synced",
    topic: "admissions",
    description: "All contacts previously provided by the user across Outbound Scheduler, CSV uploads, and manual forms.",
  },
  {
    id: "cohort-entrance",
    name: "National Entrance Test CET Rankers Verification",
    count: 8600,
    tag: "Exam Verified • State Ranks",
    topic: "entrance",
    description: "Registered entrance candidates requiring test center verification, admit card verification, and attendance RSVP.",
  },
  {
    id: "cohort-fees",
    name: "Pending Tuition Fee Installments (Due within 7 Days)",
    count: 1280,
    tag: "Finance Desk • Priority",
    topic: "fees",
    description: "Applicants requesting fee schedule installment breakdowns (40-30-30), SBI loan advisory, and scholarship letters.",
  },
  {
    id: "cohort-hostel",
    name: "Hostel Accommodation & Living Allotment Queue",
    count: 950,
    tag: "Residential Desk",
    topic: "hostels",
    description: "Out-of-state candidates seeking AC room allotment, campus tour passes, and mess schedule advisory.",
  },
  {
    id: "cohort-inbound-leads",
    name: "Digital Inbound Campaign & Inquiry Leads",
    count: 3450,
    tag: "Web Inbound • Omni-Channel",
    topic: "admissions",
    description: "High-intent digital inbound leads generated via website click-to-call, WhatsApp IVR, and social campaigns.",
  },
];

// Initial realistic Outbound Calls History (Strictly outbound direction - Enterprise Call Center Scale)
const INITIAL_OUTBOUND_HISTORY: OutboundCallRecord[] = [
  {
    id: "OUT-BATCH-8820",
    contactName: "JoSAA Qualified Applicants 2026 (Batch #8820)",
    contactPhone: "4,850 Leads (PRI Trunk 01-50)",
    courseOrProgram: "B.Tech Computer Science / AI-ML / Robotics",
    city: "Pan-India",
    agentId: "agent-maya",
    agentName: "Maya",
    agentAvatar: "M",
    agentRole: "Admissions & Counseling AI",
    topic: "Admissions & Campus Tour",
    direction: "outbound",
    status: "in-progress",
    duration: "1h 42m active",
    durationSeconds: 6120,
    timestamp: "Today, 09:30 AM",
    timeAgo: "Calling across 50 lines",
    dispatchMode: "Bulk Cadence Window",
    callingWindow: "10:00 AM - 06:00 PM IST",
    sentimentScore: 94,
    outcome: "3,420 Connected • 940 In Queue • 490 Completed",
    summary: "High-volume AI outbound cadence running across 50 concurrent PRI trunks. Pacing at 100 calls every 3 minutes. 92.4% pickup rate achieved.",
    relatedCallHistoryId: "LOG-9037",
    extractedEntities: {
      phoneNumbers: [{ label: "Target Batch Size", value: "4,850 Contacts", verified: true }],
      keyPoints: [
        "3,420 candidates successfully connected by Maya AI.",
        "1,180 campus tour VIP passes confirmed via automated WhatsApp.",
        "490 merit scholarship waivers verified and dispatched.",
      ],
    },
  },
  {
    id: "OUT-BATCH-8819",
    contactName: "National Entrance Test CET Rankers (Batch #8819)",
    contactPhone: "8,600 Leads (PRI Trunk 51-100)",
    courseOrProgram: "National Entrance Exam Counseling",
    city: "Pan-India",
    agentId: "agent-arjun",
    agentName: "Arjun",
    agentAvatar: "A",
    agentRole: "Outreach & Verification AI",
    topic: "Entrance Exam Verification",
    direction: "outbound",
    status: "completed",
    duration: "3h 15m elapsed",
    durationSeconds: 11700,
    timestamp: "Today, 08:45 AM",
    timeAgo: "Completed",
    dispatchMode: "Bulk Cadence Window",
    callingWindow: "10:00 AM - 06:00 PM IST",
    sentimentScore: 91,
    outcome: "8,600 Reached • 96.4% Pickup Rate",
    summary: "Full cohort verification complete. 7,840 admit cards verified and sent to DigiLocker sync. 760 callbacks automated.",
    relatedCallHistoryId: "LOG-9039",
    extractedEntities: {
      phoneNumbers: [{ label: "Batch Size", value: "8,600 Contacts", verified: true }],
      keyPoints: [
        "8,600 candidates called with zero dropped lines.",
        "96.4% verified attendance for Sunday state entrance counseling.",
      ],
    },
  },
  {
    id: "OUT-9042",
    contactName: "Siddharth Verma",
    contactPhone: "+91 98112 34567",
    courseOrProgram: "B.Tech Computer Science",
    city: "Delhi NCR",
    agentId: "agent-maya",
    agentName: "Maya",
    agentAvatar: "M",
    agentRole: "Admissions & Counseling AI",
    topic: "Admissions & Campus Tour",
    direction: "outbound",
    status: "in-progress",
    duration: "1m 14s",
    durationSeconds: 74,
    timestamp: "Just now",
    timeAgo: "Calling right now",
    dispatchMode: "Instant Batch",
    callingWindow: "10:00 AM - 06:00 PM IST",
    sentimentScore: 92,
    outcome: "Dialing / In-Call",
    summary: "Live candidate discussion regarding 25% Chancellor Merit Scholarship and Saturday VIP tour.",
    relatedCallHistoryId: "LOG-9037",
    extractedEntities: {
      phoneNumbers: [{ label: "Candidate Mobile", value: "+91 98112 34567", verified: true }],
      emails: [{ label: "Candidate Email", value: "siddharth.v@gmail.com", verified: true }],
      keyPoints: [
        "Candidate scored 94.2% in CBSE Class 12 PCM.",
        "Candidate requested Saturday 11 AM tour pass for father.",
      ],
    },
  },
  {
    id: "OUT-9041",
    contactName: "Sneha Rao",
    contactPhone: "+91 98402 99881",
    courseOrProgram: "B.Tech Biotechnology",
    city: "Bengaluru, KA",
    agentId: "agent-maya",
    agentName: "Maya",
    agentAvatar: "M",
    agentRole: "Admissions & Counseling AI",
    topic: "Admissions & Campus Tour",
    direction: "outbound",
    status: "completed",
    duration: "2m 14s",
    durationSeconds: 134,
    timestamp: "Today, 10:15 AM",
    timeAgo: "1h 40m ago",
    dispatchMode: "Bulk Cadence Window",
    callingWindow: "10:00 AM - 06:00 PM IST",
    sentimentScore: 96,
    outcome: "Campus Tour Confirmed",
    summary: "Confirmed 25% merit scholarship eligibility based on 91.8% PCB score. Dispatched VIP pass to WhatsApp.",
    relatedCallHistoryId: "LOG-9037",
    extractedEntities: {
      phoneNumbers: [
        { label: "Primary Caller Mobile", value: "+91 98402 99881", verified: true },
        { label: "WhatsApp Direct", value: "+91 98402 99881", verified: true },
      ],
      emails: [{ label: "Applicant Email", value: "sneha.rao.biotech@gmail.com", verified: true }],
      addresses: [
        {
          label: "Postal Address",
          street: "Flat 402, Prestige Palms, Indiranagar",
          cityStatePincode: "Bengaluru, Karnataka - 560038",
        },
      ],
      keyPoints: [
        "Applicant Sneha Rao scored 91.8% in Class 12 PCB.",
        "Confirmed for Saturday 11:00 AM campus tour with Senior Counselor.",
      ],
    },
  },
  {
    id: "OUT-9039",
    contactName: "Vikramaditya Rao",
    contactPhone: "+91 99880 44120",
    courseOrProgram: "B.Tech Electronics & Comm",
    city: "Hyderabad, TS",
    agentId: "agent-arjun",
    agentName: "Arjun",
    agentAvatar: "A",
    agentRole: "Outreach & Verification AI",
    topic: "Entrance Exam Verification",
    direction: "outbound",
    status: "completed",
    duration: "1m 15s",
    durationSeconds: 75,
    timestamp: "Today, 09:30 AM",
    timeAgo: "2h 25m ago",
    dispatchMode: "Bulk Cadence Window",
    callingWindow: "10:00 AM - 06:00 PM IST",
    sentimentScore: 88,
    outcome: "Registration Verified",
    summary: "Verified registration for state engineering counseling. Confirmed candidate attendance with parents.",
    relatedCallHistoryId: "LOG-9039",
    extractedEntities: {
      phoneNumbers: [{ label: "Verified Mobile", value: "+91 99880 44120", verified: true }],
      emails: [{ label: "Candidate Email", value: "vikram.rao@outlook.com", verified: true }],
      keyPoints: [
        "State entrance rank #4,120 verified.",
        "Counseling slot confirmed for Sunday morning session.",
      ],
    },
  },
  {
    id: "OUT-9037",
    contactName: "Devansh Patil",
    contactPhone: "+91 97110 33499",
    courseOrProgram: "B.Tech Mechanical & Mechatronics",
    city: "Pune, MH",
    agentId: "agent-arjun",
    agentName: "Arjun",
    agentAvatar: "A",
    agentRole: "Outreach & Verification AI",
    topic: "Entrance Exam Verification",
    direction: "outbound",
    status: "callback",
    duration: "45s",
    durationSeconds: 45,
    timestamp: "Today, 08:45 AM",
    timeAgo: "3h 10m ago",
    dispatchMode: "Instant Batch",
    callingWindow: "10:00 AM - 06:00 PM IST",
    sentimentScore: 78,
    outcome: "Callback Requested (6:30 PM)",
    summary: "Candidate was attending university lecture. Requested callback today between 6:00 PM and 7:00 PM.",
    relatedCallHistoryId: "LOG-9037",
    extractedEntities: {
      phoneNumbers: [{ label: "Mobile", value: "+91 97110 33499", verified: true }],
      keyPoints: ["Candidate in college lecture until 5:30 PM.", "Callback requested for 6:30 PM today."],
    },
  },
  {
    id: "OUT-9035",
    contactName: "Meenakshi Sundaram",
    contactPhone: "+91 94441 23450",
    courseOrProgram: "MBA Fintech & Analytics",
    city: "Chennai, TN",
    agentId: "agent-priya",
    agentName: "Priya",
    agentAvatar: "P",
    agentRole: "Student Finance Desk AI",
    topic: "Fee Installments & Aid",
    direction: "outbound",
    status: "completed",
    duration: "2m 40s",
    durationSeconds: 160,
    timestamp: "Yesterday, 04:30 PM",
    timeAgo: "Yesterday",
    dispatchMode: "Bulk Cadence Window",
    callingWindow: "10:00 AM - 06:00 PM IST",
    sentimentScore: 94,
    outcome: "Installment Matrix Dispatched",
    summary: "Explained 3-part flexible installment schedule and SBI education loan interest subvention.",
    relatedCallHistoryId: "LOG-9040",
    extractedEntities: {
      phoneNumbers: [{ label: "Candidate Mobile", value: "+91 94441 23450", verified: true }],
      emails: [{ label: "Candidate Email", value: "meenakshi.s@gmail.com", verified: true }],
      keyPoints: ["Selected 40-30-30 installment schedule.", "Loan certificate dispatched to WhatsApp."],
    },
  },
  {
    id: "OUT-9033",
    contactName: "Rajesh Kulkarni",
    contactPhone: "+91 98205 67890",
    courseOrProgram: "B.Tech Artificial Intelligence",
    city: "Mumbai, MH",
    agentId: "agent-maya",
    agentName: "Maya",
    agentAvatar: "M",
    agentRole: "Admissions & Counseling AI",
    topic: "Admissions & Campus Tour",
    direction: "outbound",
    status: "scheduled",
    duration: "0s",
    durationSeconds: 0,
    scheduledTime: "Tomorrow, 10:30 AM IST",
    timestamp: "Queued for Tomorrow",
    timeAgo: "Scheduled tomorrow",
    dispatchMode: "Scheduled Time",
    callingWindow: "10:00 AM - 06:00 PM IST",
    sentimentScore: 0,
    outcome: "Queued in Telephony Buffer",
    summary: "Scheduled outbound outreach to confirm admission deposit receipt and offer hostel room token.",
    relatedCallHistoryId: "LOG-9038",
  },
  {
    id: "OUT-9030",
    contactName: "Aakash Deep",
    contactPhone: "+91 99100 44556",
    courseOrProgram: "B.Tech Electrical & Robotics",
    city: "Chandigarh",
    agentId: "agent-arjun",
    agentName: "Arjun",
    agentAvatar: "A",
    agentRole: "Outreach & Verification AI",
    topic: "Entrance Exam Verification",
    direction: "outbound",
    status: "no-answer",
    duration: "25s",
    durationSeconds: 25,
    timestamp: "Yesterday, 02:10 PM",
    timeAgo: "Yesterday",
    dispatchMode: "Bulk Cadence Window",
    callingWindow: "10:00 AM - 06:00 PM IST",
    sentimentScore: 50,
    outcome: "No Answer • Auto-Retry #2 Queued",
    summary: "Candidate phone rang with no answer. Telephony carrier queued for automated retry in evening slot.",
  },
];

// Topic details for smart AI agent recommendations
const TOPIC_PRESETS = [
  {
    id: "admissions",
    name: "Admissions & Campus Tour",
    recommendedAgentId: "agent-maya",
    recommendedAgentName: "Maya",
    confidence: "99% Match",
    aiRationale:
      "Maya is calibrated specifically for candidate counseling with a 96.2% conversion rate, fluent bilingual code-switching (Hindi + English), and deep RAG vector knowledge of the 2026 Admissions Prospectus.",
    defaultScript:
      "Namaste {CandidateName}! This is {AgentName} calling from Apex Global Institutions regarding your inquiry for {Course}. With your score in board exams, you have been shortlisted for our {Scholarship}. I'd love to invite you and your family for a VIP campus visit this Saturday.",
    defaultObjectives: [
      "Verify board exam marks & eligibility criteria",
      "Explain 25% Chancellor Merit Scholarship tier",
      "Offer weekend VIP Campus Tour slot with Senior Counselor",
      "Send prospectus PDF and registration link directly via WhatsApp",
    ],
  },
  {
    id: "fees",
    name: "Fee Installments & Financial Aid",
    recommendedAgentId: "agent-priya",
    recommendedAgentName: "Priya",
    confidence: "98% Match",
    aiRationale:
      "Priya specializes in student finance, semester fee installment matrices (40%-30%-30%), refundable caution deposits, and dual Telugu/English student advisory.",
    defaultScript:
      "Hello {CandidateName}, this is {AgentName} from the Student Finance Desk at Apex Global. I am reaching out to provide your customized tuition installment schedule for {Course} and discuss the SBI education loan assistance before the deadline.",
    defaultObjectives: [
      "Provide 3-stage flexible installment breakdown",
      "Verify eligibility for corporate & merit fee waivers",
      "Offer formal SBI-format loan estimation certificate",
      "Dispatch Razorpay deposit link and fee schedule to WhatsApp",
    ],
  },
  {
    id: "entrance",
    name: "Entrance Exam Verification & Orientation",
    recommendedAgentId: "agent-arjun",
    recommendedAgentName: "Arjun",
    confidence: "95% Match",
    aiRationale:
      "Arjun has high-throughput conversational pacing optimized for candidate authentication, exam hall admit card verification, and rapid RSVP confirmations.",
    defaultScript:
      "Hello {CandidateName}! This is {AgentName} calling from the Apex Global Operations Desk. I'm calling to verify your registration details for the National Entrance Exam for {Course} and confirm your exam slot.",
    defaultObjectives: [
      "Confirm candidate ID & registered phone number",
      "Verify DigiLocker marksheet sync & admit card generation",
      "Confirm Sunday orientation attendance with candidate",
      "Send exam center location pin and guidelines via WhatsApp",
    ],
  },
  {
    id: "hostels",
    name: "Hostel Allotment & Living Facilities",
    recommendedAgentId: "agent-maya",
    recommendedAgentName: "Maya",
    confidence: "97% Match",
    aiRationale:
      "Maya handles residential room holds (AC Twin vs Non-AC), mess meal schedules, and campus tour bookings with highest caller satisfaction.",
    defaultScript:
      "Namaste {CandidateName}, Maya here from the Student Housing Office at Apex Global. Regarding your residential inquiry for {Course}, we currently have limited AC Twin rooms available on Block C.",
    defaultObjectives: [
      "Explain AC vs Non-AC room amenities and pricing",
      "Confirm 48-hour provisional room reservation hold",
      "Detail four-meal dining mess menu and 24/7 security",
      "Dispatch room photo gallery and housing rules to WhatsApp",
    ],
  },
];

function OutboundSchedulerPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cohortParam = searchParams.get("cohort");

  // Primary Console View: "dispatch" (Wizard & Bulk Scheduler) vs "history" (Outbound calls ledger)
  const [activeTab, setActiveTab] = useState<"dispatch" | "history">("dispatch");

  // Outbound Calls state
  const [outboundHistory, setOutboundHistory] = useState<OutboundCallRecord[]>(INITIAL_OUTBOUND_HISTORY);

  // Selected Outbound Call for Quick Dossier View
  const [selectedOutboundCall, setSelectedOutboundCall] = useState<OutboundCallRecord | null>(null);

  // Filter & Search states for History
  const [historySearch, setHistorySearch] = useState("");
  const [historyStatusFilter, setHistoryStatusFilter] = useState<string>("all");
  const [historyAgentFilter, setHistoryAgentFilter] = useState<string>("all");

  // =========================================================================
  // OUTBOUND DISPATCH & SCHEDULER WIZARD FORM STATE
  // =========================================================================

  // 1. Contacts List State
  const [contactMode, setContactMode] = useState<"cohort" | "csv" | "manual">("cohort");
  const [selectedCohortId, setSelectedCohortId] = useState<string>("cohort-admissions");
  const [csvFileName, setCsvFileName] = useState<string | null>(null);
  const [csvContactsCount, setCsvContactsCount] = useState<number>(0);
  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualCourse, setManualCourse] = useState("B.Tech Computer Science");
  const [manualList, setManualList] = useState<OutboundContact[]>([
    {
      id: "man-1",
      name: "Rohan K. Varma",
      phone: "+91 98401 22345",
      email: "rohan.varma@gmail.com",
      course: "B.Tech Computer Science",
      leadScore: 89,
      intent: "High Intent",
      city: "Hyderabad",
      source: "Manual",
    },
    {
      id: "man-2",
      name: "Pooja Hegde",
      phone: "+91 94401 88319",
      email: "pooja.h@outlook.com",
      course: "B.Tech Biotechnology",
      leadScore: 92,
      intent: "High Intent",
      city: "Bengaluru",
      source: "Manual",
    },
  ]);

  // Deep-link cohort detection from URL query params
  useEffect(() => {
    if (cohortParam) {
      const match = PRECONFIGURED_COHORTS.find(
        (c) => c.id === cohortParam || c.id.toLowerCase().includes(cohortParam.toLowerCase())
      );
      if (match) {
        setSelectedCohortId(match.id);
        setSelectedTopicId(match.topic);
        setContactMode("cohort");
      }
    }
  }, [cohortParam]);

  // 2. Content & Topic State
  const [selectedTopicId, setSelectedTopicId] = useState<string>("admissions");
  const currentTopic = useMemo(
    () => TOPIC_PRESETS.find((t) => t.id === selectedTopicId) || TOPIC_PRESETS[0],
    [selectedTopicId]
  );
  const [openingScript, setOpeningScript] = useState<string>(TOPIC_PRESETS[0].defaultScript);
  const [discussionGoals, setDiscussionGoals] = useState<string[]>(TOPIC_PRESETS[0].defaultObjectives);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Hindi + English (Auto Code-Switching)");

  // Sync script when topic changes
  useEffect(() => {
    setOpeningScript(currentTopic.defaultScript);
    setDiscussionGoals(currentTopic.defaultObjectives);
  }, [currentTopic]);

  // 3. Criteria & Qualification State (Enterprise Call Center Telephony)
  const [minLeadScore, setMinLeadScore] = useState<number>(70);
  const [intentCriteria, setIntentCriteria] = useState<string>("all");
  const [regionCriteria, setRegionCriteria] = useState<string>("all");
  const [concurrencyLines, setConcurrencyLines] = useState<number>(50);
  const [retryPolicy, setRetryPolicy] = useState<"1" | "2" | "3">("2");
  const [retryInterval, setRetryInterval] = useState<string>("2 hours");
  const [voicemailAction, setVoicemailAction] = useState<"hangup" | "drop-message">("hangup");

  // 4. Voice Agent Selection State (with AI Auto-Recommend)
  const [useAiRecommendation, setUseAiRecommendation] = useState<boolean>(true);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("agent-maya");

  // Automatically update recommended agent when AI auto-select is enabled
  useEffect(() => {
    if (useAiRecommendation) {
      setSelectedAgentId(currentTopic.recommendedAgentId);
    }
  }, [useAiRecommendation, currentTopic]);

  // 5. Scheduling & Bulk Scheduling State
  const [dispatchMode, setDispatchMode] = useState<"instant" | "scheduled" | "bulk-window">("bulk-window");
  const [scheduledDate, setScheduledDate] = useState<string>("2026-10-23");
  const [scheduledTime, setScheduledTime] = useState<string>("10:30");
  const [windowStartHour, setWindowStartHour] = useState<string>("10:00 AM");
  const [windowEndHour, setWindowEndHour] = useState<string>("06:00 PM");
  const [batchPacing, setBatchPacing] = useState<string>("100 calls every 3 mins");
  const [dailyCap, setDailyCap] = useState<number>(5000);

  // Audio Playback simulation for agent voices
  const [playingVoiceAgentId, setPlayingVoiceAgentId] = useState<string | null>(null);

  // Toast / Feedback state
  const [successToast, setSuccessToast] = useState<{ title: string; message: string } | null>(null);

  // Calculate effective contacts count
  const effectiveContactsCount = useMemo(() => {
    if (contactMode === "cohort") {
      const cohort = PRECONFIGURED_COHORTS.find((c) => c.id === selectedCohortId);
      return cohort ? cohort.count : 4850;
    }
    if (contactMode === "csv") {
      return csvContactsCount > 0 ? csvContactsCount : 2840;
    }
    return manualList.length;
  }, [contactMode, selectedCohortId, csvContactsCount, manualList]);

  // Insert token helper
  const handleInsertToken = (token: string) => {
    try {
      soundSynth.play("click");
    } catch {}
    setOpeningScript((prev) => `${prev} ${token}`);
  };

  // Play voice sample
  const handleToggleVoicePreview = (agentId: string) => {
    if (playingVoiceAgentId === agentId) {
      setPlayingVoiceAgentId(null);
    } else {
      setPlayingVoiceAgentId(agentId);
      try {
        soundSynth.play("confirm");
      } catch {}
      setTimeout(() => {
        setPlayingVoiceAgentId(null);
      }, 3500);
    }
  };

  // Add Manual Contact
  const handleAddManualContact = () => {
    if (!manualName.trim() || !manualPhone.trim()) return;
    try {
      soundSynth.play("click");
    } catch {}
    const newContact: OutboundContact = {
      id: `man-${Date.now()}`,
      name: manualName.trim(),
      phone: manualPhone.trim(),
      email: manualEmail.trim() || `${manualName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      course: manualCourse,
      leadScore: 85,
      intent: "High Intent",
      city: "Hyderabad",
      source: "Manual",
    };
    setManualList((prev) => [newContact, ...prev]);

    // Store in persistent user contacts history
    saveUserContact({
      name: manualName.trim(),
      phone: manualPhone.trim(),
      email: manualEmail.trim() || `${manualName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      organization: manualCourse,
      category: "High Intent",
      city: "Hyderabad",
      notes: `Entered via Outbound Scheduler for topic: ${currentTopic.name}`,
      assignedAgent: "Maya (Admissions)",
      priorityScore: 88,
      source: "outbound_scheduler",
      lastCallOutcome: "Scheduled in Outbound Queue",
      lastContacted: "Just added",
    });

    setManualName("");
    setManualPhone("");
    setManualEmail("");
  };

  // Simulate CSV File Upload
  const handleSimulateCsvUpload = () => {
    try {
      soundSynth.play("confirm");
    } catch {}
    setCsvFileName("JoSAA_StateCET_Verified_Applicants_PanIndia_2026.csv");
    setCsvContactsCount(2840);
  };

  // Launch Outbound Dispatch or Bulk Scheduling
  const handleLaunchOutboundDispatch = () => {
    try {
      soundSynth.playSuccess();
    } catch {}

    const selectedAgent = mockAgents.find((a) => a.id === selectedAgentId) || mockAgents[0];

    // Create a new outbound record to show in history immediately
    const isSingleManual = contactMode === "manual" && manualList.length === 1;
    const newRecordId = isSingleManual
      ? `OUT-${Math.floor(9043 + Math.random() * 50)}`
      : `OUT-BATCH-${Math.floor(8821 + Math.random() * 50)}`;

    const newRecord: OutboundCallRecord = {
      id: newRecordId,
      contactName:
        contactMode === "manual" && manualList[0]
          ? `${manualList[0].name} (${manualList.length} Contacts)`
          : `${currentTopic.name} Bulk Campaign (${effectiveContactsCount.toLocaleString()} Candidates)`,
      contactPhone:
        contactMode === "manual" && manualList[0]
          ? manualList[0].phone
          : `${effectiveContactsCount.toLocaleString()} Numbers (PRI Trunks 01-${concurrencyLines})`,
      courseOrProgram: "Pan-India Admissions & Counseling",
      city: "Pan-India",
      agentId: selectedAgent.id,
      agentName: selectedAgent.name.split("—")[0].trim(),
      agentAvatar: selectedAgent.name[0] || "M",
      agentRole: selectedAgent.role,
      topic: currentTopic.name,
      direction: "outbound",
      status: dispatchMode === "instant" ? "in-progress" : "scheduled",
      duration: dispatchMode === "instant" ? "0m 25s" : "0s",
      durationSeconds: dispatchMode === "instant" ? 25 : 0,
      timestamp: "Just dispatched",
      timeAgo: dispatchMode === "instant" ? `Dialing across ${concurrencyLines} PRI lines` : "Queued in scheduler",
      dispatchMode:
        dispatchMode === "instant"
          ? "Instant Batch"
          : dispatchMode === "scheduled"
          ? "Scheduled Time"
          : "Bulk Cadence Window",
      callingWindow: `${windowStartHour} - ${windowEndHour} IST`,
      scheduledTime:
        dispatchMode === "scheduled"
          ? `${scheduledDate} at ${scheduledTime} IST`
          : dispatchMode === "bulk-window"
          ? `Daily ${windowStartHour} - ${windowEndHour} (${batchPacing})`
          : undefined,
      sentimentScore: 92,
      outcome:
        dispatchMode === "instant"
          ? `Connected • Dialing Batch across ${concurrencyLines} PRI lines`
          : `Queued in Telephony Buffer (${batchPacing})`,
      summary: `Autonomous outbound cadence launched for ${effectiveContactsCount.toLocaleString()} contacts across ${concurrencyLines} concurrent PRI trunks with ${batchPacing}. Dynamic speech opening: "${openingScript.slice(
        0,
        90
      )}..."`,
      relatedCallHistoryId: "LOG-9037",
      extractedEntities: {
        phoneNumbers: [{ label: "Target Cohort Size", value: `${effectiveContactsCount.toLocaleString()} Numbers`, verified: true }],
        keyPoints: [
          `Topic: ${currentTopic.name}`,
          `Assigned AI Voice Agent: ${selectedAgent.name}`,
          `Calling Pacing: ${batchPacing} across ${concurrencyLines} concurrent PRI lines`,
          `Retry Policy: Up to ${retryPolicy} attempts every ${retryInterval}`,
        ],
      },
    };

    setOutboundHistory((prev) => [newRecord, ...prev]);

    // Save cohort/contacts to persistent user contacts history
    saveUserContactBatch(
      `Outbound Batch: ${currentTopic.name} (${effectiveContactsCount.toLocaleString()} contacts)`,
      contactMode === "manual"
        ? manualList.map((m) => ({
            id: m.id,
            name: m.name,
            phone: m.phone,
            email: m.email,
            category: m.intent as any,
            organization: m.course,
            city: m.city,
            source: "outbound_scheduler" as const,
            addedAt: "Just now",
            assignedAgent: selectedAgent.name,
          }))
        : [
            {
              id: `out-hist-${Date.now()}-1`,
              name: "Siddharth Verma",
              phone: "+91 98112 34567",
              email: "siddharth.v@gmail.com",
              category: "High Intent" as const,
              organization: "B.Tech Computer Science",
              city: "Delhi NCR",
              source: "outbound_scheduler" as const,
              addedAt: "Just now",
              assignedAgent: selectedAgent.name,
            },
            {
              id: `out-hist-${Date.now()}-2`,
              name: "Sneha Rao",
              phone: "+91 98402 99881",
              email: "sneha.rao.biotech@gmail.com",
              category: "High Intent" as const,
              organization: "B.Tech Biotechnology",
              city: "Bengaluru, KA",
              source: "outbound_scheduler" as const,
              addedAt: "Just now",
              assignedAgent: selectedAgent.name,
            },
          ],
      "outbound_cadence",
      selectedAgent.name
    );

    setSuccessToast({
      title:
        dispatchMode === "instant"
          ? "🚀 Outbound Dispatch Successfully Activated!"
          : "📅 Bulk Outbound Calling Cadence Scheduled!",
      message: `${effectiveContactsCount} contacts allocated to ${selectedAgent.name.split("—")[0].trim()} across ${concurrencyLines} concurrent PRI channels.`,
    });

    // Switch to history tab to see the outbound calls ledger immediately
    setTimeout(() => {
      setActiveTab("history");
    }, 700);

    setTimeout(() => {
      setSuccessToast(null);
    }, 6000);
  };

  // Filtered Outbound History (Strictly Outbound)
  const filteredOutboundCalls = useMemo(() => {
    return outboundHistory.filter((call) => {
      // Must be outbound
      if (call.direction !== "outbound") return false;

      // Search match
      if (historySearch.trim()) {
        const query = historySearch.toLowerCase();
        const matchesName = call.contactName.toLowerCase().includes(query);
        const matchesPhone = call.contactPhone.toLowerCase().includes(query);
        const matchesId = call.id.toLowerCase().includes(query);
        const matchesTopic = call.topic.toLowerCase().includes(query);
        const matchesCourse = call.courseOrProgram.toLowerCase().includes(query);
        if (!matchesName && !matchesPhone && !matchesId && !matchesTopic && !matchesCourse) {
          return false;
        }
      }

      // Status filter
      if (historyStatusFilter !== "all" && call.status !== historyStatusFilter) {
        return false;
      }

      // Agent filter
      if (historyAgentFilter !== "all") {
        if (!call.agentName.toLowerCase().includes(historyAgentFilter.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [outboundHistory, historySearch, historyStatusFilter, historyAgentFilter]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16 text-slate-800">
      {/* =========================================================================
          TOP COMMAND HEADER & TELEPHONY STATUS BAR
      ========================================================================= */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              {/* Breadcrumb & Live Engine Indicator */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Link href="/dashboard" className="hover:text-slate-800 transition-colors">
                  Overview
                </Link>
                <span>/</span>
                <span className="text-purple-600 font-semibold">Autonomous Telephony</span>
                <span>/</span>
                <span className="text-slate-700 font-medium">Outbound Calls &amp; Bulk Scheduler</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm shadow-purple-600/20 shrink-0">
                  <PhoneOutgoing className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                    Outbound Calling &amp; Bulk Scheduler
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200/70">
                      <Zap className="w-3 h-3 text-purple-600 fill-purple-600" />
                      Bulk Dialer Engine
                    </span>
                  </h1>
                  <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
                    Configure contact cohorts, dynamic speech content, qualification criteria, and AI-recommended voice agents for scheduled bulk dispatch.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions & Redirects Header */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <Link
                href="/dashboard/calls"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100/80 border border-rose-200/70 text-xs font-semibold transition-colors shadow-xs"
                title="Redirect to Live Calling console to view active streaming outbound/inbound calls"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>Live Call Console</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/dashboard/call-history"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                title="Redirect to full historical calls with speech transcripts"
              >
                <span>Full Call Transcripts</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* Telephony Metrics Strip (Enterprise AI Call Center Telephony) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 mt-3 border-t border-slate-100">
            <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/60">
              <span className="text-[11px] font-medium text-slate-500 block">PRI &amp; SIP Trunks</span>
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                100 Channels Active (Max 500)
              </span>
            </div>

            <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/60">
              <span className="text-[11px] font-medium text-slate-500 block">Total Volume Today</span>
              <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                8,600 Calls (5,180 In • 3,420 Out)
              </span>
            </div>

            <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/60">
              <span className="text-[11px] font-medium text-slate-500 block">Active In-Flight Lines</span>
              <span className="text-sm font-bold text-rose-600 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                38 Live Lines Dialing Now
              </span>
            </div>

            <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200/60">
              <span className="text-[11px] font-medium text-slate-500 block">Scheduled in Pipeline</span>
              <span className="text-sm font-bold text-purple-700 mt-0.5 block">
                6 Batches • 14,650 Queued
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SUCCESS NOTIFICATION TOAST
      ========================================================================= */}
      {successToast && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl p-4 shadow-sm flex items-start justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-950">{successToast.title}</h4>
                <p className="text-xs text-emerald-800 mt-0.5">{successToast.message}</p>
              </div>
            </div>
            <button
              onClick={() => setSuccessToast(null)}
              className="text-emerald-700 hover:text-emerald-900 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          PRIMARY VIEW SWITCHER TABS
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white p-1.5 rounded-xl border border-slate-200/90 shadow-xs inline-flex items-center gap-1">
          <button
            onClick={() => {
              setActiveTab("dispatch");
              try {
                soundSynth.play("click");
              } catch {}
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "dispatch"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Outbound Dispatcher &amp; Bulk Scheduler</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                activeTab === "dispatch" ? "bg-white/20 text-white" : "bg-purple-50 text-purple-700"
              }`}
            >
              New Cadence
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab("history");
              try {
                soundSynth.play("click");
              } catch {}
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "history"
                ? "bg-purple-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <PhoneOutgoing className="w-3.5 h-3.5" />
            <span>Outbound Calls History Only</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeTab === "history" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-800"
              }`}
            >
              {outboundHistory.length} Outbound Logs
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: OUTBOUND DISPATCH & BULK SCHEDULER WIZARD CONSOLE
      ========================================================================= */}
      {activeTab === "dispatch" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
          {/* STEP 1: CONTACTS LIST SELECTION */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    Contacts List &amp; Target Cohort
                    <span className="text-xs font-normal text-slate-500">
                      (Total {effectiveContactsCount} contacts selected)
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Choose from saved high-conversion cohorts, upload a CSV list, or add individual contacts.
                  </p>
                </div>
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setContactMode("cohort")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                    contactMode === "cohort" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Saved Cohorts
                </button>
                <button
                  type="button"
                  onClick={() => setContactMode("csv")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                    contactMode === "csv" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Upload CSV
                </button>
                <button
                  type="button"
                  onClick={() => setContactMode("manual")}
                  className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                    contactMode === "manual" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Manual Entry
                </button>
              </div>
            </div>

            {/* Mode Content: Saved Cohorts */}
            {contactMode === "cohort" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
                {PRECONFIGURED_COHORTS.map((cohort) => {
                  const isSelected = selectedCohortId === cohort.id;
                  return (
                    <div
                      key={cohort.id}
                      onClick={() => {
                        setSelectedCohortId(cohort.id);
                        setSelectedTopicId(cohort.topic);
                        try {
                          soundSynth.play("click");
                        } catch {}
                      }}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? "border-purple-600 bg-purple-50/50 shadow-sm ring-1 ring-purple-600/20"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-slate-900">{cohort.name}</h3>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                              {cohort.count} leads
                            </span>
                          </div>
                          <span className="text-[11px] font-medium text-emerald-700 block mt-0.5">
                            {cohort.tag}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? "border-purple-600 bg-purple-600 text-white" : "border-slate-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">{cohort.description}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Mode Content: Upload CSV */}
            {contactMode === "csv" && (
              <div className="mt-4">
                <div
                  onClick={handleSimulateCsvUpload}
                  className="border-2 border-dashed border-slate-300 hover:border-purple-500 rounded-xl p-8 text-center bg-slate-50/60 hover:bg-purple-50/20 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {csvFileName ? `Uploaded: ${csvFileName}` : "Click to Upload Contacts CSV or Excel Sheet"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Supports columns: <code className="text-purple-700 font-semibold">Name, Phone, Email, Course, LeadScore</code>. Automatic E.164 normalization &amp; TRAI DND filter applied.
                  </p>
                  {csvFileName && (
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-semibold border border-emerald-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{csvContactsCount} Valid Numbers Ready for Outbound Dispatch</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mode Content: Manual Entry */}
            {contactMode === "manual" && (
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Candidate Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={manualName}
                      onChange={(e) => setManualName(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Phone Number (E.164)</label>
                    <input
                      type="text"
                      placeholder="+91 98401 22345"
                      value={manualPhone}
                      onChange={(e) => setManualPhone(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">Course / Program</label>
                    <input
                      type="text"
                      placeholder="B.Tech Computer Science"
                      value={manualCourse}
                      onChange={(e) => setManualCourse(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={handleAddManualContact}
                      className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Contact
                    </button>
                  </div>
                </div>

                {/* Manual Contacts Queue */}
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-3">
                  <span className="text-xs font-semibold text-slate-700 block mb-2">
                    Queued Contacts ({manualList.length})
                  </span>
                  <div className="space-y-1.5">
                    {manualList.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between text-xs bg-white px-3 py-2 rounded-lg border border-slate-200/80"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-900">{c.name}</span>
                          <span className="text-slate-500 font-mono text-[11px]">{c.phone}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-medium">
                            {c.course}
                          </span>
                        </div>
                        <button
                          onClick={() => setManualList((prev) => prev.filter((item) => item.id !== c.id))}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* STEP 2: CONTENT & DYNAMIC SPEECH OBJECTIVE */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Content, Topic &amp; Speech Prompts
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Define the topic, conversational opening, and dynamic placeholder variables for personalized voice delivery.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
              {/* Left 2 Cols: Topic & Speech Template */}
              <div className="lg:col-span-2 space-y-4">
                {/* Topic Selector */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Select Call Topic / Knowledge Domain
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {TOPIC_PRESETS.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          setSelectedTopicId(t.id);
                          try {
                            soundSynth.play("click");
                          } catch {}
                        }}
                        className={`px-3 py-2 rounded-lg text-xs font-bold text-left border transition-all ${
                          selectedTopicId === t.id
                            ? "border-purple-600 bg-purple-50 text-purple-900 shadow-xs ring-1 ring-purple-600/20"
                            : "border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
                        }`}
                      >
                        {t.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speech Script & Dynamic Variables */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Opening Speech Greeting &amp; Dynamic Template
                    </label>
                    <span className="text-[11px] text-slate-400">Click any variable chip to insert</span>
                  </div>

                  {/* Token Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {[
                      "{CandidateName}",
                      "{Course}",
                      "{Scholarship}",
                      "{AgentName}",
                      "{Campus}",
                      "{DueDate}",
                      "{ApplicationNo}",
                    ].map((token) => (
                      <button
                        key={token}
                        type="button"
                        onClick={() => handleInsertToken(token)}
                        className="px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-mono font-semibold border border-purple-200 transition-colors"
                      >
                        + {token}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={4}
                    value={openingScript}
                    onChange={(e) => setOpeningScript(e.target.value)}
                    className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
                  />
                </div>

                {/* Discussion Goals Checklist */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">
                    Key Discussion Objectives
                  </label>
                  <div className="space-y-1.5">
                    {discussionGoals.map((goal, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Col: Live Speech Interpolation Preview */}
              <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                        Speech Preview
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      Sample Candidate: Rahul
                    </span>
                  </div>

                  <div className="mt-4 p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs text-slate-200 leading-relaxed font-sans">
                    {openingScript
                      .replace(/\{CandidateName\}/g, "Rahul")
                      .replace(/\{Course\}/g, "B.Tech Computer Science")
                      .replace(/\{Scholarship\}/g, "25% Chancellor Merit Scholarship")
                      .replace(/\{AgentName\}/g, currentTopic.recommendedAgentName)
                      .replace(/\{Campus\}/g, "Main Apex Campus")
                      .replace(/\{DueDate\}/g, "Friday 5:00 PM")
                      .replace(/\{ApplicationNo\}/g, "APX-9821")}
                  </div>

                  <div className="mt-4 space-y-2 text-[11px] text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>Language Delivery:</span>
                      <span className="text-purple-300 font-medium">Hinglish / English</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>RAG Grounding:</span>
                      <span className="text-emerald-400 font-medium">100% Vector Verified</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>WhatsApp Follow-up:</span>
                      <span className="text-emerald-400 font-medium">Auto Dispatched</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 mt-4">
                  <span className="text-[10px] text-slate-400 block">
                    Telemetry: Voice latency tuned for sub-140ms conversational responsiveness.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: QUALIFICATION CRITERIA & TELEPHONY POLICIES */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Lead Qualification Criteria &amp; Telephony Rules
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Filter contacts by qualification tier and set concurrency, retries, and voicemail drop rules.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {/* Min Lead Score */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <label className="text-xs font-bold text-slate-800 block mb-1">Minimum Lead Score</label>
                <p className="text-[11px] text-slate-500 mb-2">Only dial leads above this engagement score</p>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="50"
                    max="95"
                    step="5"
                    value={minLeadScore}
                    onChange={(e) => setMinLeadScore(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                  <span className="text-sm font-bold text-purple-700 font-mono w-10 text-right">
                    {minLeadScore}+
                  </span>
                </div>
              </div>

              {/* Concurrency Lines */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <label className="text-xs font-bold text-slate-800 block mb-1">Concurrency Trunks</label>
                <p className="text-[11px] text-slate-500 mb-2">Number of parallel lines dialing simultaneously</p>
                <select
                  value={concurrencyLines}
                  onChange={(e) => setConcurrencyLines(Number(e.target.value))}
                  className="w-full text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value={25}>25 Parallel Channels (300 calls/hr)</option>
                  <option value={50}>50 Parallel Channels (600 calls/hr - Standard)</option>
                  <option value={100}>100 Parallel Channels (1,200 calls/hr - High Throughput)</option>
                  <option value={250}>250 Parallel Channels (3,000 calls/hr - Mega Campaign)</option>
                  <option value={500}>500 Parallel Channels (6,000 calls/hr - Peak Infrastructure)</option>
                </select>
              </div>

              {/* Max Retries */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <label className="text-xs font-bold text-slate-800 block mb-1">Retry Policy</label>
                <p className="text-[11px] text-slate-500 mb-2">Retry count if line is busy or unanswered</p>
                <select
                  value={retryPolicy}
                  onChange={(e) => setRetryPolicy(e.target.value as "1" | "2" | "3")}
                  className="w-full text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="1">1 Retry Attempt</option>
                  <option value="2">2 Retry Attempts (Recommended)</option>
                  <option value="3">3 Retry Attempts</option>
                </select>
              </div>

              {/* Voicemail Action */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <label className="text-xs font-bold text-slate-800 block mb-1">Voicemail Handling</label>
                <p className="text-[11px] text-slate-500 mb-2">Action upon detecting voicemail machine</p>
                <select
                  value={voicemailAction}
                  onChange={(e) => setVoicemailAction(e.target.value as "hangup" | "drop-message")}
                  className="w-full text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                >
                  <option value="hangup">Hang Up Immediately</option>
                  <option value="drop-message">Leave Custom AI Audio Note</option>
                </select>
              </div>
            </div>
          </div>

          {/* STEP 4: VOICE AGENTS SELECTION WITH "AI RECOMMENDED AGENT" */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                  4
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    Voice Agent Selection &amp; AI Recommendations
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select a dedicated agent or let the AI algorithm match the highest-converting persona for your topic.
                  </p>
                </div>
              </div>

              {/* AI Auto-Recommend Toggle */}
              <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200/70">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-purple-900">AI Auto-Recommend Agent</span>
                <button
                  type="button"
                  onClick={() => {
                    setUseAiRecommendation(!useAiRecommendation);
                    try {
                      soundSynth.play("click");
                    } catch {}
                  }}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    useAiRecommendation ? "bg-purple-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition duration-200 ease-in-out ${
                      useAiRecommendation ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* AI Recommendation Banner */}
            {useAiRecommendation && (
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50/50 to-purple-50 border border-purple-200/80 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-900">
                      Recommended Match: {currentTopic.recommendedAgentName}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white">
                      {currentTopic.confidence}
                    </span>
                  </div>
                  <p className="text-xs text-purple-800 mt-1 leading-relaxed">
                    {currentTopic.aiRationale}
                  </p>
                </div>
              </div>
            )}

            {/* Agent Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {mockAgents.map((agent) => {
                const isSelected = selectedAgentId === agent.id;
                const isRecommended = agent.id === currentTopic.recommendedAgentId;
                const isPlaying = playingVoiceAgentId === agent.id;

                return (
                  <div
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgentId(agent.id);
                      setUseAiRecommendation(false);
                      try {
                        soundSynth.play("click");
                      } catch {}
                    }}
                    className={`relative p-4 rounded-xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? "border-purple-600 bg-purple-50/40 shadow-sm ring-1 ring-purple-600/30"
                        : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    {isRecommended && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-600 text-white shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        AI Recommended
                      </span>
                    )}

                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
                          {agent.name[0]}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">{agent.name.split("—")[0].trim()}</h3>
                          <span className="text-[11px] text-slate-500 font-medium block">
                            {agent.department}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-purple-600 bg-purple-600 text-white" : "border-slate-300 bg-white"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Language:</span>
                        <span className="font-semibold text-slate-800">{agent.language}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Voice Persona:</span>
                        <span className="font-semibold text-slate-800">{agent.voice.name} ({agent.voice.gender})</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Resolution Accuracy:</span>
                        <span className="font-bold text-emerald-600">{agent.accuracy}%</span>
                      </div>
                    </div>

                    {/* Audio Preview Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleVoicePreview(agent.id);
                      }}
                      className={`mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                        isPlaying
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {isPlaying ? (
                        <>
                          <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                          <span>Playing Voice Sample...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5" />
                          <span>Preview Voice ({agent.voice.name})</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 5: SCHEDULING & BULK TIME-WINDOW CADENCE */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Scheduling &amp; Bulk Cadence Windows
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Launch immediately, schedule for a specific date/time, or set recurring bulk calling hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Option 1: Instant */}
              <div
                onClick={() => setDispatchMode("instant")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  dispatchMode === "instant"
                    ? "border-purple-600 bg-purple-50/50 shadow-sm ring-1 ring-purple-600/30"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900">Instant Dispatch</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Dial the selected contact cohort right now across available telephony trunks.
                </p>
              </div>

              {/* Option 2: Schedule for Later */}
              <div
                onClick={() => setDispatchMode("scheduled")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  dispatchMode === "scheduled"
                    ? "border-purple-600 bg-purple-50/50 shadow-sm ring-1 ring-purple-600/30"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Calendar className="w-4 h-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900">Scheduled Date &amp; Time</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Trigger dispatch at a single specific future date and time (IST).
                </p>
              </div>

              {/* Option 3: Bulk Cadence Window */}
              <div
                onClick={() => setDispatchMode("bulk-window")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  dispatchMode === "bulk-window"
                    ? "border-purple-600 bg-purple-50/50 shadow-sm ring-1 ring-purple-600/30"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <CalendarClock className="w-4 h-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-slate-900">Bulk Calling Window</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Spread calls within TRAI compliant hours (10 AM - 6 PM) with batch pacing to prevent spam flags.
                </p>
              </div>
            </div>

            {/* Sub-form when Scheduled is selected */}
            {dispatchMode === "scheduled" && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Execution Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Execution Time (IST)</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
            )}

            {/* Sub-form when Bulk Window is selected */}
            {dispatchMode === "bulk-window" && (
              <div className="mt-4 p-4 rounded-xl bg-purple-50/40 border border-purple-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Daily Calling Hours Window
                  </label>
                  <div className="flex items-center gap-2 text-xs">
                    <input
                      type="text"
                      value={windowStartHour}
                      onChange={(e) => setWindowStartHour(e.target.value)}
                      className="w-1/2 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-center"
                    />
                    <span>to</span>
                    <input
                      type="text"
                      value={windowEndHour}
                      onChange={(e) => setWindowEndHour(e.target.value)}
                      className="w-1/2 px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-center"
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Adheres strictly to TRAI Do-Not-Disturb timings.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Batch Pacing Cadence
                  </label>
                  <select
                    value={batchPacing}
                    onChange={(e) => setBatchPacing(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
                  >
                    <option value="50 calls every 3 mins">50 calls every 3 mins (Safe Carrier Pacing)</option>
                    <option value="100 calls every 3 mins">100 calls every 3 mins (Standard Enterprise Cadence)</option>
                    <option value="250 calls every 5 mins">250 calls every 5 mins (High Volume Burst)</option>
                    <option value="500 calls every 5 mins">500 calls every 5 mins (Max Telecom Saturation)</option>
                  </select>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Pacing avoids carrier spam filtering &amp; maintains 94%+ pickup rate.
                  </span>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Daily Outbound Cap
                  </label>
                  <input
                    type="number"
                    value={dailyCap}
                    onChange={(e) => setDailyCap(Number(e.target.value))}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                  />
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Max outbound calls permitted per day (e.g. 5,000 to 25,000).
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* LAUNCH BAR / ACTION BUTTON */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Ready for Dispatch: {effectiveContactsCount} Contacts
                </h3>
                <p className="text-xs text-slate-500">
                  Topic: <strong className="text-slate-700">{currentTopic.name}</strong> • Agent:{" "}
                  <strong className="text-purple-700">
                    {mockAgents.find((a) => a.id === selectedAgentId)?.name.split("—")[0].trim() || "Maya"}
                  </strong>{" "}
                  • Mode:{" "}
                  <strong className="text-slate-700">
                    {dispatchMode === "instant"
                      ? "Instant Outbound"
                      : dispatchMode === "scheduled"
                      ? "Scheduled"
                      : "Bulk Cadence Window"}
                  </strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleLaunchOutboundDispatch}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm transition-all shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <PhoneOutgoing className="w-4 h-4" />
                <span>
                  {dispatchMode === "instant"
                    ? `Launch Outbound Calls Now (${effectiveContactsCount})`
                    : "Schedule Bulk Outbound Campaign"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: OUTBOUND CALLS HISTORY ONLY (WITH ONE-CLICK REDIRECTS)
      ========================================================================= */}
      {activeTab === "history" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
          {/* Header & Filter Controls for Outbound History */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PhoneOutgoing className="w-4 h-4 text-purple-600" />
                  Outbound Telephony Ledger
                  <span className="text-xs font-normal text-slate-500">
                    (Filtered strictly for Outbound Direction calls)
                  </span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any call row or action badge to immediately redirect to full speech transcripts, live call console, contact dossier, or voice agents.
                </p>
              </div>

              {/* Status Filter Badges */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {["all", "completed", "in-progress", "scheduled", "callback", "no-answer"].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setHistoryStatusFilter(st);
                      try {
                        soundSynth.play("click");
                      } catch {}
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                      historyStatusFilter === st
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                    }`}
                  >
                    {st === "all" ? "All Outbound" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search outbound by name, phone, or ID..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <span className="text-xs text-slate-500 ml-auto">
                Showing <strong>{filteredOutboundCalls.length}</strong> Outbound Calls
              </span>
            </div>
          </div>

          {/* Outbound Calls Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Call ID &amp; Time</th>
                    <th className="py-3 px-4">Candidate / Contact</th>
                    <th className="py-3 px-4">Voice Agent</th>
                    <th className="py-3 px-4">Dispatch Mode</th>
                    <th className="py-3 px-4">Status &amp; Outcome</th>
                    <th className="py-3 px-4">Key Summary</th>
                    <th className="py-3 px-4 text-right">Redirect Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOutboundCalls.map((call) => {
                    const isDialing = call.status === "in-progress";
                    const isCompleted = call.status === "completed";
                    const isScheduled = call.status === "scheduled";
                    const isCallback = call.status === "callback";

                    return (
                      <tr
                        key={call.id}
                        onClick={() => setSelectedOutboundCall(call)}
                        className="hover:bg-purple-50/30 transition-colors cursor-pointer group"
                      >
                        {/* Call ID & Time */}
                        <td className="py-3.5 px-4 font-mono">
                          <span className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors block">
                            {call.id}
                          </span>
                          <span className="text-[11px] text-slate-400 font-sans block mt-0.5">
                            {call.timestamp}
                          </span>
                        </td>

                        {/* Candidate / Contact */}
                        <td className="py-3.5 px-4">
                          <Link
                            href="/dashboard/contacts"
                            onClick={(e) => e.stopPropagation()}
                            className="font-bold text-slate-900 hover:text-purple-600 transition-colors flex items-center gap-1.5"
                            title="Redirect to Contacts & Dossier"
                          >
                            <span>{call.contactName}</span>
                            <ArrowUpRight className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                            <span className="font-mono">{call.contactPhone}</span>
                            <span>•</span>
                            <span>{call.city}</span>
                          </div>
                        </td>

                        {/* Voice Agent */}
                        <td className="py-3.5 px-4">
                          <Link
                            href="/dashboard/agents"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 font-semibold text-slate-800 hover:text-purple-600 transition-colors"
                            title="Redirect to AI Agents setup"
                          >
                            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                              {call.agentAvatar}
                            </span>
                            <span>{call.agentName}</span>
                          </Link>
                          <span className="text-[10px] text-slate-400 block mt-0.5">
                            {call.topic}
                          </span>
                        </td>

                        {/* Dispatch Mode */}
                        <td className="py-3.5 px-4">
                          <span className="text-[11px] font-semibold text-slate-700 block">
                            {call.dispatchMode}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                            {call.callingWindow || "Priority PRI"}
                          </span>
                        </td>

                        {/* Status & Outcome */}
                        <td className="py-3.5 px-4">
                          {isDialing && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 animate-pulse">
                              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                              Dialing Lines ({call.duration})
                            </span>
                          )}

                          {isCompleted && (
                            <div>
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                Completed ({call.duration})
                              </span>
                              <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
                                {call.outcome}
                              </span>
                            </div>
                          )}

                          {isScheduled && (
                            <div>
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                                <Clock className="w-3 h-3 text-purple-600" />
                                Scheduled
                              </span>
                              <span className="text-[10px] text-slate-500 block mt-0.5 font-mono">
                                {call.scheduledTime}
                              </span>
                            </div>
                          )}

                          {isCallback && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                              <Calendar className="w-3 h-3 text-amber-600" />
                              Callback (6:30 PM)
                            </span>
                          )}

                          {call.status === "no-answer" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                              No Answer • Retrying
                            </span>
                          )}
                        </td>

                        {/* Key Summary */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="text-slate-600 line-clamp-2 leading-relaxed">
                            {call.summary}
                          </p>
                        </td>

                        {/* ONE-CLICK REDIRECTION BUTTONS (User's primary requirement!) */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                            {/* If call is live/in-progress -> Redirect to Live Calling (/dashboard/calls) */}
                            {isDialing && (
                              <Link
                                href="/dashboard/calls"
                                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] transition-colors flex items-center gap-1 shadow-xs"
                                title="Redirect to Live Calling Console"
                              >
                                <Radio className="w-3 h-3 animate-pulse" />
                                <span>Live Console</span>
                              </Link>
                            )}

                            {/* If call is completed -> Redirect to Call History Transcript (/dashboard/call-history?search=LOG-...) */}
                            {isCompleted && (
                              <Link
                                href={`/dashboard/call-history?search=${call.relatedCallHistoryId || call.id}&id=${call.relatedCallHistoryId || call.id}`}
                                className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-[11px] border border-indigo-200 transition-colors flex items-center gap-1"
                                title="Redirect to full transcript and extracted entities in Call History"
                              >
                                <FileText className="w-3 h-3 text-indigo-600" />
                                <span>Transcript</span>
                                <ArrowUpRight className="w-3 h-3 text-indigo-400" />
                              </Link>
                            )}

                            {/* If call is scheduled -> Redirect to Campaigns (/dashboard/campaigns) */}
                            {isScheduled && (
                              <Link
                                href="/dashboard/campaigns"
                                className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-[11px] border border-purple-200 transition-colors flex items-center gap-1"
                                title="Redirect to Campaign Dispatch & Cadence Scheduler"
                              >
                                <Calendar className="w-3 h-3 text-purple-600" />
                                <span>Cadence</span>
                                <ArrowUpRight className="w-3 h-3 text-purple-400" />
                              </Link>
                            )}

                            {/* If call is callback -> Redirect to Callbacks Queue (/dashboard/callbacks) */}
                            {isCallback && (
                              <Link
                                href="/dashboard/callbacks"
                                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-semibold text-[11px] border border-amber-200 transition-colors flex items-center gap-1"
                                title="Redirect to Callbacks Queue"
                              >
                                <span>Callback</span>
                                <ArrowUpRight className="w-3 h-3 text-amber-600" />
                              </Link>
                            )}

                            {/* Quick Dossier Eye Icon */}
                            <button
                              type="button"
                              onClick={() => setSelectedOutboundCall(call)}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                              title="Quick Overview Modal"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          OUTBOUND CALL QUICK DOSSIER MODAL WITH DEEP REDIRECTS
      ========================================================================= */}
      {selectedOutboundCall && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <PhoneOutgoing className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Outbound Call Dossier: {selectedOutboundCall.id}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                      {selectedOutboundCall.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedOutboundCall.timestamp} • {selectedOutboundCall.topic}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedOutboundCall(null)}
                className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Redirect Links Hub */}
            <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200/80">
              <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider block mb-2">
                🔗 Quick Deep-Link Redirections to Respected Sections
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <Link
                  href={`/dashboard/call-history?search=${selectedOutboundCall.relatedCallHistoryId || selectedOutboundCall.id}&id=${selectedOutboundCall.relatedCallHistoryId || selectedOutboundCall.id}`}
                  className="px-2.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-indigo-700 border border-indigo-200 text-xs font-semibold flex items-center justify-between transition-colors shadow-xs"
                >
                  <span>Full Transcript</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/dashboard/calls"
                  className="px-2.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center justify-between transition-colors shadow-xs"
                >
                  <span>Live Console</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/dashboard/contacts"
                  className="px-2.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold flex items-center justify-between transition-colors shadow-xs"
                >
                  <span>Contacts Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/dashboard/agents"
                  className="px-2.5 py-2 rounded-lg bg-white hover:bg-slate-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center justify-between transition-colors shadow-xs"
                >
                  <span>AI Agents Setup</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Candidate & Telephony Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Candidate Details</span>
                <span className="font-bold text-slate-900 block">{selectedOutboundCall.contactName}</span>
                <span className="font-mono text-slate-600 block mt-0.5">{selectedOutboundCall.contactPhone}</span>
                <span className="text-slate-500 block mt-0.5">{selectedOutboundCall.courseOrProgram}</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">Assigned Voice Agent</span>
                <span className="font-bold text-slate-900 block">{selectedOutboundCall.agentName}</span>
                <span className="text-slate-600 block mt-0.5">{selectedOutboundCall.agentRole}</span>
                <span className="text-purple-700 font-semibold block mt-0.5">{selectedOutboundCall.dispatchMode}</span>
              </div>
            </div>

            {/* Summary */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs leading-relaxed text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Conversational Outcome &amp; Summary</span>
              {selectedOutboundCall.summary}
            </div>

            {/* Extracted Key Points if available */}
            {selectedOutboundCall.extractedEntities?.keyPoints && (
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-slate-800 block">Extracted Insights:</span>
                {selectedOutboundCall.extractedEntities.keyPoints.map((kp, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600 bg-white p-2 rounded border border-slate-200">
                    <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span>{kp}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedOutboundCall(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OutboundSchedulerPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-slate-500 text-xs">
          Loading Autonomous Outbound Telephony Scheduler...
        </div>
      }
    >
      <OutboundSchedulerPageContent />
    </Suspense>
  );
}
