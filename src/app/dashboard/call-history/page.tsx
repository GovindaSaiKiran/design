"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  History,
  PhoneCall,
  Search,
  Filter,
  Download,
  Play,
  Pause,
  Clock,
  User,
  Radio,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  PhoneForwarded,
  PhoneMissed,
  PhoneIncoming,
  PhoneOutgoing,
  Eye,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Volume2,
  Share2,
  Copy,
  Check,
  Calendar,
  Layers,
  Database,
  Bot,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  BookOpen,
  X,
  SlidersHorizontal,
  Headphones,
  RotateCcw,
  Mail,
  MapPin,
  Phone,
  Tag,
  Tags,
  ListChecks,
  FileText,
  ShieldCheck,
  Building,
  Printer,
  FileDown,
} from "lucide-react";
import CallDrawer from "@/components/dashboard/views/CallDrawer";
import ExportReportModal from "@/components/dashboard/modals/ExportReportModal";
import { RecentCallRecord } from "@/types/dashboard";
import { soundSynth } from "@/lib/audio-synth";

// Knowledge domain definition
interface KnowledgeDomainConfig {
  id: "all" | "admissions" | "fees" | "hostels" | "technical";
  name: string;
  shortLabel: string;
  emoji: string;
  badgeColor: string;
  pillColor: string;
}

const KNOWLEDGE_DOMAINS: KnowledgeDomainConfig[] = [
  {
    id: "all",
    name: "All Knowledge Domains",
    shortLabel: "All Topics",
    emoji: "🌐",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    pillColor: "bg-slate-900 text-white",
  },
  {
    id: "admissions",
    name: "Admissions & Eligibility",
    shortLabel: "Admissions",
    emoji: "🎓",
    badgeColor: "bg-orange-100 text-orange-900 border-orange-300",
    pillColor: "bg-[#FF6B08] text-white",
  },
  {
    id: "fees",
    name: "Fees, Installments & Aid",
    shortLabel: "Fees & Aid",
    emoji: "💳",
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    pillColor: "bg-emerald-600 text-white",
  },
  {
    id: "hostels",
    name: "Hostels & Campus Facilities",
    shortLabel: "Hostels & Living",
    emoji: "🏢",
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    pillColor: "bg-blue-600 text-white",
  },
  {
    id: "technical",
    name: "Technical & Verification",
    shortLabel: "Technical & Portal",
    emoji: "🛠️",
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    pillColor: "bg-purple-600 text-white",
  },
];

interface TranscriptTurn {
  id: number;
  speaker: "agent" | "caller";
  speakerName: string;
  time: string;
  text: string;
  sentiment?: "positive" | "neutral" | "urgent";
  groundedDocCitation?: string;
}

export interface ExtractedContactEntity {
  label: string;
  value: string;
  verified?: boolean;
}

export interface ExtractedEmailEntity {
  label: string;
  value: string;
  verified?: boolean;
}

export interface ExtractedAddressEntity {
  label: string;
  street: string;
  cityStatePincode: string;
}

export interface ExtractedEntitiesData {
  phoneNumbers: ExtractedContactEntity[];
  emails: ExtractedEmailEntity[];
  addresses: ExtractedAddressEntity[];
  keyPoints: string[];
  topics: string[];
}

interface ComprehensiveCallLog {
  id: string;
  contactName: string;
  contactPhone: string;
  direction: "inbound" | "outbound";
  agentName: string;
  agentRole: string;
  agentAvatar: string;
  language: string;
  duration: string;
  durationSeconds: number;
  timestamp: string;
  relativeTime: string;
  status: "completed" | "transferred" | "missed";
  sentiment: "positive" | "neutral" | "urgent";
  sentimentScore: number;
  outcome: string;
  qualification: "High Intent" | "Qualified" | "Follow-up Needed" | "Escalated";
  knowledgeDomain: "admissions" | "fees" | "hostels" | "technical";
  knowledgeDomainLabel: string;
  groundedDocTitle: string;
  intent: string;
  summary: string;
  extractedParameters: Record<string, string>;
  extractedEntities: ExtractedEntitiesData;
  transcript: TranscriptTurn[];
  audioWaveLevels: number[];
  whatsappSummarySent: boolean;
}

const ALL_CALL_HISTORY_LOGS: ComprehensiveCallLog[] = [
  {
    id: "LOG-9041",
    contactName: "Rahul Sharma",
    contactPhone: "+91 98112 40982",
    direction: "inbound",
    agentName: "Maya",
    agentRole: "Admissions Concierge AI",
    agentAvatar: "M",
    language: "Hindi + English",
    duration: "2m 42s",
    durationSeconds: 162,
    timestamp: "Today, 12:15 PM",
    relativeTime: "14 mins ago",
    status: "completed",
    sentiment: "positive",
    sentimentScore: 98,
    outcome: "Campus Tour Confirmed",
    qualification: "High Intent",
    knowledgeDomain: "admissions",
    knowledgeDomainLabel: "Admissions & Eligibility",
    groundedDocTitle: "2026_Admissions_Prospectus_v3.pdf",
    intent: "B.Tech CSE Artificial Intelligence Cutoff & 25% Merit Waiver",
    summary: "Candidate verified 94.2% CBSE 12th PCM score. Confirmed eligibility for Chancellor 25% Merit Waiver. Scheduled VIP campus tour for Saturday 11:00 AM.",
    extractedParameters: {
      "Target Course": "B.Tech CSE (AI/ML)",
      "Board Score": "94.2% (CBSE PCM)",
      "Scholarship Tier": "25% Chancellor Waiver",
      "Saturday Visit": "Confirmed (11:00 AM)",
      "Admissions Counselor": "Mr. Vikram Malhotra",
    },
    extractedEntities: {
      phoneNumbers: [
        { label: "Primary Caller Mobile", value: "+91 98112 40982", verified: true },
        { label: "WhatsApp Direct", value: "+91 98112 40982", verified: true },
        { label: "Father / Guardian Contact", value: "+91 98110 55219", verified: false },
      ],
      emails: [
        { label: "Applicant Email", value: "rahul.sharma2026@gmail.com", verified: true },
        { label: "Father / Billing Email", value: "rk.sharma@consultancy.in", verified: false },
      ],
      addresses: [
        {
          label: "Permanent Residence",
          street: "House #42, Pocket B, Sector 15, Rohini",
          cityStatePincode: "New Delhi, Delhi - 110085",
        },
      ],
      keyPoints: [
        "Candidate scored 94.2% in CBSE 12th Board Examinations in PCM (Physics, Chemistry, Maths).",
        "Requested direct merit seat reservation into B.Tech CSE with Artificial Intelligence & Machine Learning specialization.",
        "Exemption granted from entrance examination under Section 14 of the 2026 Prospectus.",
        "Awarded 25% Chancellor Merit Scholarship on full tuition fee.",
        "Scheduled VIP in-person campus laboratory tour for this Saturday at 11:00 AM with his father.",
        "Confirmed receipt of digital visitor pass and brochure sent via automated WhatsApp gateway.",
      ],
      topics: [
        "B.Tech CSE Admissions",
        "AI & Machine Learning Specialization",
        "CBSE 12th PCM 94.2% Cutoff",
        "25% Chancellor Merit Scholarship",
        "VIP Weekend Campus Tour",
      ],
    },
    audioWaveLevels: [40, 75, 95, 60, 85, 70, 90, 65, 80, 50, 70, 85],
    whatsappSummarySent: true,
    transcript: [
      {
        id: 1,
        speaker: "agent",
        speakerName: "Maya (AI)",
        time: "00:03",
        text: "Namaste and good morning! I am Maya from Apex Global Admissions. How can I assist you with your campus application today?",
        sentiment: "neutral",
      },
      {
        id: 2,
        speaker: "caller",
        speakerName: "Rahul Sharma",
        time: "00:11",
        text: "Hi Maya! I wanted to check if I can get direct admission into B.Tech Computer Science with AI specialization. I scored 94.2% in CBSE PCM.",
        sentiment: "positive",
      },
      {
        id: 3,
        speaker: "agent",
        speakerName: "Maya (AI)",
        time: "00:24",
        text: "Congratulations on a phenomenal 94.2% score, Rahul! Under Section 14 of our 2026 prospectus, any score above 92% grants direct seat reservation with a 25% Chancellor Merit Scholarship, waiving mandatory entrance exams.",
        sentiment: "positive",
        groundedDocCitation: "2026_Admissions_Prospectus_v3.pdf (Chunk #14: B.Tech CSE AI/ML Cutoff)",
      },
      {
        id: 4,
        speaker: "caller",
        speakerName: "Rahul Sharma",
        time: "00:41",
        text: "That is fantastic! Can my father and I visit the campus this Saturday to see the AI Labs and meet the faculty?",
        sentiment: "positive",
      },
      {
        id: 5,
        speaker: "agent",
        speakerName: "Maya (AI)",
        time: "00:58",
        text: "Absolutely! I have locked in your VIP Campus Pass for Saturday at 11:00 AM. Senior Counselor Mr. Vikram Malhotra will personally host you in the Admissions Lounge. I've also sent the digital pass and brochure to your WhatsApp.",
        sentiment: "positive",
        groundedDocCitation: "Admissions Office SOP: Weekend VIP Campus Tour Scheduling",
      },
      {
        id: 6,
        speaker: "caller",
        speakerName: "Rahul Sharma",
        time: "01:18",
        text: "Received the WhatsApp message just now. Thank you so much Maya, see you on Saturday!",
        sentiment: "positive",
      },
    ],
  },
  {
    id: "LOG-9040",
    contactName: "Rohit Malani",
    contactPhone: "+91 98201 77412",
    direction: "inbound",
    agentName: "Priya",
    agentRole: "Tuition & Financial Desk AI",
    agentAvatar: "P",
    language: "Hindi + English",
    duration: "3m 15s",
    durationSeconds: 195,
    timestamp: "Today, 11:48 AM",
    relativeTime: "42 mins ago",
    status: "completed",
    sentiment: "positive",
    sentimentScore: 96,
    outcome: "Installment Plan Dispatched",
    qualification: "High Intent",
    knowledgeDomain: "fees",
    knowledgeDomainLabel: "Fees, Installments & Aid",
    groundedDocTitle: "Tuition_Fee_Installments_Scholarship_2026.pdf",
    intent: "Semester 1 Fee Installment Schedule & Caution Deposit Refund Policy",
    summary: "Explained 3-part flexible installment schedule (40%-30%-30%). Confirmed ₹15,000 caution deposit is 100% refundable upon graduation. Dispatched Razorpay link.",
    extractedParameters: {
      "Semester 1 Tuition": "₹2,45,000",
      "Installment Scheme": "3-Part (₹98K + ₹73.5K + ₹73.5K)",
      "Caution Deposit": "₹15,000 (100% Refundable)",
      "Payment Gateway": "Razorpay SmartCollect Dispatched",
    },
    extractedEntities: {
      phoneNumbers: [
        { label: "Primary Caller Mobile", value: "+91 98201 77412", verified: true },
        { label: "WhatsApp Contact", value: "+91 98201 77412", verified: true },
        { label: "Parent Office Phone", value: "+91 22 2568 9901", verified: false },
      ],
      emails: [
        { label: "Student Email", value: "rohit.malani@outlook.com", verified: true },
        { label: "Parent Billing Email", value: "finance@malanigroup.in", verified: true },
      ],
      addresses: [
        {
          label: "Communication Address",
          street: "Flat 804, Runwal Pinnacle, LBS Marg, Mulund West",
          cityStatePincode: "Mumbai, Maharashtra - 400080",
        },
      ],
      keyPoints: [
        "Semester 1 total tuition fee is ₹2,45,000.",
        "Candidate requested permission to pay via multiple installments instead of upfront lump-sum.",
        "Approved 3-part zero-interest plan: ₹98,000 token + ₹73,500 at 30 days + ₹73,500 at 60 days.",
        "Confirmed ₹15,000 caution deposit is 100% refundable upon graduation or institutional clearance.",
        "Dispatched custom Razorpay SmartCollect payment link directly to applicant WhatsApp.",
      ],
      topics: [
        "Tuition Fee Installments",
        "3-Part Payment Schedule",
        "₹15,000 Caution Deposit Refund",
        "Razorpay SmartCollect Gateway",
        "Financial Clearance",
      ],
    },
    audioWaveLevels: [35, 60, 85, 90, 75, 80, 60, 70, 95, 65, 50, 40],
    whatsappSummarySent: true,
    transcript: [
      {
        id: 1,
        speaker: "agent",
        speakerName: "Priya (AI)",
        time: "00:02",
        text: "Hello Rohit! I am Priya from the Student Accounts & Financial Aid office. How can I assist with your fee schedule today?",
        sentiment: "neutral",
      },
      {
        id: 2,
        speaker: "caller",
        speakerName: "Rohit Malani",
        time: "00:15",
        text: "Hi Priya, my semester tuition is ₹2.45 Lakhs. Is it possible to pay this in 2 or 3 installments rather than paying the full lump sum right now?",
        sentiment: "neutral",
      },
      {
        id: 3,
        speaker: "agent",
        speakerName: "Priya (AI)",
        time: "00:32",
        text: "Yes, definitely! Our approved 2026 policy allows you to split Semester 1 into 3 zero-interest installments: an initial token of ₹98,000, followed by ₹73,500 at 30 days and ₹73,500 at 60 days.",
        sentiment: "positive",
        groundedDocCitation: "Tuition_Fee_Installments_Scholarship_2026.pdf (Chunk #08: 3-Stage Installment Plan)",
      },
      {
        id: 4,
        speaker: "caller",
        speakerName: "Rohit Malani",
        time: "00:54",
        text: "And what about the ₹15,000 caution deposit mentioned in the letter? When is that refundable?",
        sentiment: "neutral",
      },
      {
        id: 5,
        speaker: "agent",
        speakerName: "Priya (AI)",
        time: "01:08",
        text: "The caution deposit is 100% refundable directly to your bank account upon program completion or clearance. I have generated your customized 3-part schedule and dispatched the secure Razorpay payment link directly to your WhatsApp.",
        sentiment: "positive",
        groundedDocCitation: "Tuition Policy Section 4: Refundable Security Deposits",
      },
    ],
  },
  {
    id: "LOG-9039",
    contactName: "Siddharth Verma",
    contactPhone: "+91 94401 55620",
    direction: "outbound",
    agentName: "Arjun",
    agentRole: "Hostel & Logistics Advisor AI",
    agentAvatar: "A",
    language: "Telugu + English",
    duration: "2m 05s",
    durationSeconds: 125,
    timestamp: "Today, 10:30 AM",
    relativeTime: "1h 55m ago",
    status: "completed",
    sentiment: "positive",
    sentimentScore: 92,
    outcome: "Block C Twin AC Room Reserved",
    qualification: "Qualified",
    knowledgeDomain: "hostels",
    knowledgeDomainLabel: "Hostels & Campus Facilities",
    groundedDocTitle: "Campus_Hostel_Boarding_Inventory_2026.pdf",
    intent: "AC Twin Room Availability, Mess Menu & Biometric Security Hours",
    summary: "Selected Block C Twin AC with multi-cuisine dining package. Confirmed biometric campus entry operates 24/7 with 10:00 PM hostel check-in. Provisional token placed.",
    extractedParameters: {
      "Hostel Room": "Block C Twin Sharing (AC)",
      "Mess Package": "4-Meal North & South Indian Buffet",
      "Laundry Allocation": "10kg / month included",
      "Annual Fee": "₹1,85,000 all-inclusive",
    },
    extractedEntities: {
      phoneNumbers: [
        { label: "Primary Caller Mobile", value: "+91 94401 55620", verified: true },
        { label: "WhatsApp Direct", value: "+91 94401 55620", verified: true },
        { label: "Mother / Local Guardian", value: "+91 94402 33119", verified: false },
      ],
      emails: [
        { label: "Candidate Email", value: "siddharth.verma@gmail.com", verified: true },
        { label: "Guardian Email", value: "sv.verma@hyderabadtech.org", verified: false },
      ],
      addresses: [
        {
          label: "Home Residence",
          street: "Plot 112, Road No. 10, Singada Kunta, Banjara Hills",
          cityStatePincode: "Hyderabad, Telangana - 500034",
        },
      ],
      keyPoints: [
        "Freshmen engineering student requiring air-conditioned hostel accommodation.",
        "Selected Block C Twin Sharing AC room with attached washroom.",
        "Subscribed to 4-meal buffet dining package (North & South Indian cuisines).",
        "Confirmed inclusive amenities: 10kg monthly laundry and 24/7 high-speed fiber Wi-Fi.",
        "Noted campus safety protocol: 24/7 biometric security access with 10:00 PM nightly hostel check-in.",
        "Placed 48-hour provisional hold on Room C-304; shared hostel visual tour to WhatsApp.",
      ],
      topics: [
        "Hostel Room Allotment",
        "Block C Twin AC Room",
        "4-Meal Buffet Dining",
        "Biometric Security & Curfew",
        "Provisional Room Hold C-304",
      ],
    },
    audioWaveLevels: [50, 80, 70, 85, 90, 65, 75, 80, 60, 85, 70, 55],
    whatsappSummarySent: true,
    transcript: [
      {
        id: 1,
        speaker: "agent",
        speakerName: "Arjun (AI)",
        time: "00:03",
        text: "Hello Siddharth! This is Arjun following up from the campus boarding desk regarding your hostel room allotment request.",
        sentiment: "neutral",
      },
      {
        id: 2,
        speaker: "caller",
        speakerName: "Siddharth Verma",
        time: "00:14",
        text: "Hi Arjun! Yes, I was checking if first-year engineering students can get an AC Twin Sharing room in Block C, and how the dining works.",
        sentiment: "positive",
      },
      {
        id: 3,
        speaker: "agent",
        speakerName: "Arjun (AI)",
        time: "00:29",
        text: "Block C currently has 14 Twin-Sharing AC rooms remaining for engineering freshmen. Each package includes 4-meal buffet dining with both North and South Indian kitchens, plus 10kg monthly complimentary laundry.",
        sentiment: "positive",
        groundedDocCitation: "Campus_Hostel_Boarding_Inventory_2026.pdf (Chunk #03: AC Twin Occupancy)",
      },
      {
        id: 4,
        speaker: "caller",
        speakerName: "Siddharth Verma",
        time: "00:46",
        text: "That sounds great! Can you hold an AC Twin room token for me while my parents review the brochure?",
        sentiment: "positive",
      },
      {
        id: 5,
        speaker: "agent",
        speakerName: "Arjun (AI)",
        time: "01:02",
        text: "Done! I have placed a 48-hour provisional hold on Room C-304 and shared the complete hostel photo gallery and menu schedule to your WhatsApp.",
        sentiment: "positive",
      },
    ],
  },
  {
    id: "LOG-9038",
    contactName: "Ananya Sharma",
    contactPhone: "+91 97184 10293",
    direction: "inbound",
    agentName: "Maya",
    agentRole: "Verification & Portal Helpdesk AI",
    agentAvatar: "M",
    language: "Hindi + English",
    duration: "1m 45s",
    durationSeconds: 105,
    timestamp: "Today, 09:12 AM",
    relativeTime: "3h 10m ago",
    status: "completed",
    sentiment: "positive",
    sentimentScore: 94,
    outcome: "DigiLocker Marksheet Verified",
    qualification: "Qualified",
    knowledgeDomain: "technical",
    knowledgeDomainLabel: "Technical & Verification",
    groundedDocTitle: "Portal_Doc_Verification_Manual_v2.pdf",
    intent: "DigiLocker CBSE API Sync Timeout & Manual PDF Digitally Signed Upload",
    summary: "Guided candidate on CBSE DigiLocker fetch timeout. Approved manual digitally signed 12th marksheet PDF upload. Verified Admit Card generation status.",
    extractedParameters: {
      "Candidate ID": "APX-8821",
      "Document Type": "12th CBSE Board Sheet",
      "Sync Resolution": "Instant Re-trigger Success",
      "Status": "Green Verified for Admit Card",
    },
    extractedEntities: {
      phoneNumbers: [
        { label: "Primary Caller Mobile", value: "+91 97184 10293", verified: true },
        { label: "WhatsApp Direct", value: "+91 97184 10293", verified: true },
        { label: "Alternate Contact", value: "+91 97180 44921", verified: false },
      ],
      emails: [
        { label: "Applicant Email", value: "ananya.sharma.apx@gmail.com", verified: true },
      ],
      addresses: [
        {
          label: "Residential Address",
          street: "Tower 4, Apt 12B, ATS Greens Village, Sector 93A",
          cityStatePincode: "Noida, Uttar Pradesh - 201304",
        },
      ],
      keyPoints: [
        "Applicant Candidate ID: APX-8821 applying for National Entrance Test.",
        "Experienced DigiLocker API OAuth server timeout error (HTTP 404) while fetching CBSE 12th marksheet.",
        "Advised candidate on Section 19 fallback protocol to directly upload digitally signed PDF.",
        "Upload submitted and verified live during call; cryptographic checksum validated green.",
        "Entrance test admit card successfully unlocked and link dispatched to registered WhatsApp.",
      ],
      topics: [
        "DigiLocker CBSE Sync Error",
        "Candidate ID APX-8821",
        "Manual Marksheet Upload Fallback",
        "Digital Signature Verification",
        "Admit Card Generation",
      ],
    },
    audioWaveLevels: [45, 70, 85, 90, 60, 75, 80, 65, 80, 55, 65, 75],
    whatsappSummarySent: true,
    transcript: [
      {
        id: 1,
        speaker: "agent",
        speakerName: "Maya (AI)",
        time: "00:02",
        text: "Hello Ananya! I am Maya with the Applicant Portal Helpdesk. I see you called regarding candidate ID APX-8821.",
        sentiment: "neutral",
      },
      {
        id: 2,
        speaker: "caller",
        speakerName: "Ananya Sharma",
        time: "00:12",
        text: "Yes Maya, when I click DigiLocker verification for my 12th marksheet, it keeps saying error 404 timeout. Can I upload my original PDF instead?",
        sentiment: "urgent",
      },
      {
        id: 3,
        speaker: "agent",
        speakerName: "Maya (AI)",
        time: "00:27",
        text: "Don't worry Ananya! Under Section 19 of our portal verification protocol, if DigiLocker experiences a server timeout, you can directly upload your original digitally signed 12th PDF to bypass the lock.",
        sentiment: "positive",
        groundedDocCitation: "Portal_Doc_Verification_Manual_v2.pdf (Chunk #19: OAuth Marksheet Validation Fallback)",
      },
      {
        id: 4,
        speaker: "caller",
        speakerName: "Ananya Sharma",
        time: "00:44",
        text: "I just uploaded the PDF on the portal right now while on the phone with you. Can you see it?",
        sentiment: "positive",
      },
      {
        id: 5,
        speaker: "agent",
        speakerName: "Maya (AI)",
        time: "00:58",
        text: "Yes, received! The digital signature checksum is verified green. Your entrance test admit card is now unlocked and available for download. I've also sent the direct download link to your WhatsApp.",
        sentiment: "positive",
      },
    ],
  },
  {
    id: "LOG-9037",
    contactName: "Sneha Rao",
    contactPhone: "+91 98765 43210",
    direction: "outbound",
    agentName: "Maya",
    agentRole: "Admissions Concierge AI",
    agentAvatar: "M",
    language: "Telugu + English",
    duration: "1m 58s",
    durationSeconds: 118,
    timestamp: "Yesterday, 04:30 PM",
    relativeTime: "Yesterday",
    status: "completed",
    sentiment: "positive",
    sentimentScore: 90,
    outcome: "Scholarship Form Dispatched",
    qualification: "Qualified",
    knowledgeDomain: "admissions",
    knowledgeDomainLabel: "Admissions & Eligibility",
    groundedDocTitle: "2026_Admissions_Prospectus_v3.pdf",
    intent: "Biotechnology Entrance Cutoff & 25% Merit Scholarship Evaluation",
    summary: "Verified 91.8% PCB score. Confirmed eligibility for Biotechnology seat with 25% merit waiver. Scheduled Sunday morning video counseling call.",
    extractedParameters: {
      "Target Program": "B.Tech Biotechnology",
      "PCB Marks": "91.8%",
      "Waiver": "25% Chancellor Merit Tier",
      "Counseling Session": "Sunday 10:30 AM",
    },
    extractedEntities: {
      phoneNumbers: [
        { label: "Primary Caller Mobile", value: "+91 98765 43210", verified: true },
        { label: "WhatsApp Direct", value: "+91 98765 43210", verified: true },
        { label: "Parent Mobile", value: "+91 98760 11992", verified: false },
      ],
      emails: [
        { label: "Candidate Email", value: "sneha.rao.biotech@gmail.com", verified: true },
        { label: "Parent Email", value: "dr.rao.pathology@apollo.com", verified: false },
      ],
      addresses: [
        {
          label: "Permanent Residence",
          street: "Villa 28, Prestige Silver Springs, East Coast Road",
          cityStatePincode: "Chennai, Tamil Nadu - 600119",
        },
      ],
      keyPoints: [
        "Candidate scored 91.8% in PCB 12th Board examinations.",
        "Inquired if biology score qualifies for B.Tech Biotechnology research honors.",
        "Confirmed eligibility for 25% Chancellor Merit Scholarship tier.",
        "Granted access to Genomics Innovation Lab and faculty research mentorship.",
        "Scheduled 1-on-1 virtual counseling session for Sunday 10:30 AM; dispatched application via WhatsApp.",
      ],
      topics: [
        "B.Tech Biotechnology Admissions",
        "PCB 91.8% Score Eligibility",
        "25% Chancellor Merit Tier",
        "Genomics Innovation Lab",
        "Sunday Video Counseling",
      ],
    },
    audioWaveLevels: [40, 65, 80, 75, 90, 60, 70, 85, 60, 50, 45, 60],
    whatsappSummarySent: true,
    transcript: [
      {
        id: 1,
        speaker: "agent",
        speakerName: "Maya (AI)",
        time: "00:03",
        text: "Hello Sneha! This is Maya with Apex Global Admissions following up on your Biotechnology inquiry.",
        sentiment: "neutral",
      },
      {
        id: 2,
        speaker: "caller",
        speakerName: "Sneha Rao",
        time: "00:15",
        text: "Hi Maya! I wanted to understand if my 91.8% in PCB qualifies for the research scholarship in the biotech department.",
        sentiment: "positive",
      },
      {
        id: 3,
        speaker: "agent",
        speakerName: "Maya (AI)",
        time: "00:30",
        text: "Yes Sneha! Any PCB score above 90% qualifies for our 25% Merit Scholarship and entry into the Genomics Innovation Lab. I've sent the application form to your WhatsApp.",
        sentiment: "positive",
        groundedDocCitation: "2026_Admissions_Prospectus_v3.pdf (Chunk #07: Biotechnology Honors Criteria)",
      },
    ],
  },
  {
    id: "LOG-9036",
    contactName: "Vikram Sethi",
    contactPhone: "+91 98450 11234",
    direction: "inbound",
    agentName: "Priya",
    agentRole: "Tuition & Financial Desk AI",
    agentAvatar: "P",
    language: "English",
    duration: "2m 10s",
    durationSeconds: 130,
    timestamp: "Yesterday, 02:15 PM",
    relativeTime: "Yesterday",
    status: "transferred",
    sentiment: "neutral",
    sentimentScore: 78,
    outcome: "Transferred to Finance Desk",
    qualification: "Escalated",
    knowledgeDomain: "fees",
    knowledgeDomainLabel: "Fees, Installments & Aid",
    groundedDocTitle: "Tuition_Fee_Installments_Scholarship_2026.pdf",
    intent: "Education Loan Bank Letter in Specific State Bank of India Format",
    summary: "Caller required formal SBI format tuition certificate signed by Registrar with stamp. AI generated preliminary sheet and escalated to Finance Desk Officer.",
    extractedParameters: {
      "Bank Authority": "State Bank of India Format",
      "Loan Amount": "₹4.20 Lakhs",
      "Action Taken": "Warm Transfer to Finance Officer",
      "Ticket Ref": "FIN-LOAN-882",
    },
    extractedEntities: {
      phoneNumbers: [
        { label: "Primary Caller Mobile", value: "+91 98450 11234", verified: true },
        { label: "WhatsApp Direct", value: "+91 98450 11234", verified: true },
        { label: "Alternate Phone", value: "+91 98455 77621", verified: false },
      ],
      emails: [
        { label: "Applicant Email", value: "vikram.sethi@gmail.com", verified: true },
        { label: "SBI Loan Officer Email", value: "sbi.rmvbranch.blr@sbi.co.in", verified: false },
      ],
      addresses: [
        {
          label: "Resident Address",
          street: "#45, 4th Cross, 8th Main, RMV Extension 2nd Stage",
          cityStatePincode: "Bangalore, Karnataka - 560094",
        },
      ],
      keyPoints: [
        "Applied for ₹4.20 Lakhs education loan through State Bank of India.",
        "SBI loan processing officer specifically mandates tuition breakdown on official Registrar letterhead with physical embossed stamp.",
        "AI generated instant preliminary fee schedule PDF for candidate review.",
        "Initiated warm human transfer to Senior Finance Officer Mr. Rajesh with pre-populated Ticket #FIN-LOAN-882.",
        "All candidate documents and branch officer contact details passed to officer console.",
      ],
      topics: [
        "SBI Education Loan Certificate",
        "Registrar Embossed Stamp Requirement",
        "₹4.20 Lakhs Loan Estimation",
        "Ticket #FIN-LOAN-882",
        "Warm Finance Officer Transfer",
      ],
    },
    audioWaveLevels: [30, 50, 75, 80, 60, 70, 65, 80, 55, 45, 60, 50],
    whatsappSummarySent: true,
    transcript: [
      {
        id: 1,
        speaker: "agent",
        speakerName: "Priya (AI)",
        time: "00:02",
        text: "Hello Vikram! I am Priya from Student Accounts. How can I assist with your financing inquiries?",
        sentiment: "neutral",
      },
      {
        id: 2,
        speaker: "caller",
        speakerName: "Vikram Sethi",
        time: "00:14",
        text: "Hi Priya, my SBI bank branch needs an education loan estimate certificate specifically on official registrar letterhead with seal. Can you issue that format?",
        sentiment: "neutral",
      },
      {
        id: 3,
        speaker: "agent",
        speakerName: "Priya (AI)",
        time: "00:32",
        text: "I can immediately generate the preliminary fee breakdown PDF for you. Because SBI requires an embossed physical Registrar seal, let me connect you directly with Senior Finance Officer Mr. Rajesh on this line.",
        sentiment: "neutral",
        groundedDocCitation: "Tuition_Fee_Installments_Scholarship_2026.pdf (Chunk #12: Bank Loan Certification)",
      },
      {
        id: 4,
        speaker: "caller",
        speakerName: "Vikram Sethi",
        time: "00:52",
        text: "That would be very helpful, please transfer me.",
        sentiment: "positive",
      },
      {
        id: 5,
        speaker: "agent",
        speakerName: "Priya (AI)",
        time: "01:05",
        text: "Connecting you now with Mr. Rajesh. All your candidate details and loan requirements have been forwarded to his terminal. Please hold for one second.",
        sentiment: "positive",
      },
    ],
  },
];

// =========================================================================
// EXPORT GENERATION UTILITIES (TOPIC-WISE & CLIENT-WISE)
// =========================================================================

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateClientWiseCsv(calls: ComprehensiveCallLog[]): string {
  const headers = [
    "Client ID",
    "Client Name",
    "Primary Phone",
    "WhatsApp Contact",
    "Alternate Contacts",
    "Email Addresses",
    "Residential / Postal Address",
    "City State Pincode",
    "Knowledge Domain",
    "Extracted Discussion Topics",
    "Key Points Extracted from Caller Speech",
    "Data Vault Parameters",
    "Call Outcome",
    "AI Agent",
    "Call Duration",
    "Call Timestamp",
    "Knowledge Doc Source",
  ];

  const escapeCsv = (str: string) => `"${(str || "").replace(/"/g, '""')}"`;

  const rows = calls.map((c) => {
    const phones = c.extractedEntities.phoneNumbers
      .map((p) => `${p.label}: ${p.value}${p.verified ? " (Verified)" : ""}`)
      .join("; ");
    const primaryPhone = c.extractedEntities.phoneNumbers[0]?.value || c.contactPhone;
    const whatsapp =
      c.extractedEntities.phoneNumbers.find((p) => p.label.toLowerCase().includes("whatsapp"))?.value || primaryPhone;
    const alternate = c.extractedEntities.phoneNumbers
      .slice(1)
      .map((p) => `${p.label}: ${p.value}`)
      .join("; ");
    const emails = c.extractedEntities.emails.map((e) => `${e.label}: ${e.value}`).join("; ");
    const addresses = c.extractedEntities.addresses.map((a) => a.street).join("; ");
    const cityState = c.extractedEntities.addresses.map((a) => a.cityStatePincode).join("; ");
    const topics = c.extractedEntities.topics.join("; ");
    const keyPoints = c.extractedEntities.keyPoints.map((k, i) => `${i + 1}. ${k}`).join(" | ");
    const vaultParams = Object.entries(c.extractedParameters)
      .map(([k, v]) => `${k}: ${v}`)
      .join(" | ");

    return [
      escapeCsv(c.id),
      escapeCsv(c.contactName),
      escapeCsv(primaryPhone),
      escapeCsv(whatsapp),
      escapeCsv(alternate),
      escapeCsv(emails),
      escapeCsv(addresses),
      escapeCsv(cityState),
      escapeCsv(c.knowledgeDomainLabel),
      escapeCsv(topics),
      escapeCsv(keyPoints),
      escapeCsv(vaultParams),
      escapeCsv(c.outcome),
      escapeCsv(c.agentName),
      escapeCsv(c.duration),
      escapeCsv(c.timestamp),
      escapeCsv(c.groundedDocTitle),
    ].join(",");
  });

  return [headers.map(escapeCsv).join(","), ...rows].join("\r\n");
}

function generateClientWiseDoc(calls: ComprehensiveCallLog[], topicTitle: string): string {
  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let doc = `================================================================================\n`;
  doc += `SWARAM AI — TOPIC INTELLIGENCE & EXTRACTED ENTITIES DOSSIER\n`;
  doc += `TOPIC / KNOWLEDGE DOMAIN: ${topicTitle.toUpperCase()}\n`;
  doc += `GENERATED ON: ${dateStr}\n`;
  doc += `TOTAL CLIENT PROFILES: ${calls.length}\n`;
  doc += `GROUNDING: 100% Vector RAG Grounded & Speech Stream Verified\n`;
  doc += `================================================================================\n\n`;

  calls.forEach((c, idx) => {
    doc += `--------------------------------------------------------------------------------\n`;
    doc += `CLIENT PROFILE #${idx + 1}: ${c.contactName.toUpperCase()} (${c.id})\n`;
    doc += `--------------------------------------------------------------------------------\n`;
    doc += `• Knowledge Domain: ${c.knowledgeDomainLabel}\n`;
    doc += `• Direction: ${c.direction.toUpperCase()} | Duration: ${c.duration} | Timestamp: ${c.timestamp}\n`;
    doc += `• Assigned AI Agent: ${c.agentName} (${c.agentRole})\n`;
    doc += `• Call Outcome: ${c.outcome} (${c.qualification})\n`;
    doc += `• Knowledge Source Document: ${c.groundedDocTitle}\n\n`;

    doc += `[EXTRACTED CONTACT PHONE NUMBERS]\n`;
    c.extractedEntities.phoneNumbers.forEach((p) => {
      doc += `  - ${p.label}: ${p.value} ${p.verified ? "[VERIFIED]" : ""}\n`;
    });
    doc += `\n`;

    doc += `[EXTRACTED EMAIL ADDRESSES]\n`;
    c.extractedEntities.emails.forEach((e) => {
      doc += `  - ${e.label}: ${e.value} ${e.verified ? "[VERIFIED]" : ""}\n`;
    });
    doc += `\n`;

    doc += `[RESIDENTIAL & POSTAL ADDRESSES]\n`;
    c.extractedEntities.addresses.forEach((a) => {
      doc += `  - ${a.label}:\n    ${a.street}\n    ${a.cityStatePincode}\n`;
    });
    doc += `\n`;

    doc += `[DISCUSSION TOPICS & INTENT TAGS]\n`;
    c.extractedEntities.topics.forEach((t) => {
      doc += `  # ${t}\n`;
    });
    doc += `\n`;

    doc += `[KEY POINTS EXTRACTED FROM CALLER SPEECH]\n`;
    c.extractedEntities.keyPoints.forEach((kp, kIdx) => {
      doc += `  ${kIdx + 1}. ${kp}\n`;
    });
    doc += `\n`;

    doc += `[INSTITUTIONAL DATA VAULT PARAMETERS]\n`;
    Object.entries(c.extractedParameters).forEach(([k, v]) => {
      doc += `  • ${k}: ${v}\n`;
    });
    doc += `\n\n`;
  });

  doc += `================================================================================\n`;
  doc += `END OF CLIENT DOSSIER — SWARAM AI AUTONOMOUS TELEPHONY PLATFORM\n`;
  doc += `================================================================================\n`;

  return doc;
}

function openPrintPdfReport(calls: ComprehensiveCallLog[], topicTitle: string) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const htmlCards = calls
    .map(
      (c, idx) => `
    <div style="border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px; margin-bottom: 24px; background: #fafafa; page-break-inside: avoid;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #cbd5e1; padding-bottom: 12px; margin-bottom: 14px;">
        <div>
          <span style="font-size: 11px; font-weight: bold; color: #4338ca; text-transform: uppercase;">Client Profile #${idx + 1} • ${c.id}</span>
          <h2 style="font-size: 20px; font-weight: bold; margin: 4px 0; color: #0f172a;">${c.contactName}</h2>
          <div style="font-size: 13px; color: #475569; font-weight: 500;">
            ${c.contactPhone} • Agent: <strong>${c.agentName}</strong> • Duration: <strong>${c.duration}</strong> • <strong>${c.timestamp}</strong>
          </div>
        </div>
        <div style="text-align: right;">
          <span style="display: inline-block; padding: 4px 10px; border-radius: 9999px; font-size: 11px; font-weight: bold; background: #dcfce7; color: #166534;">
            ${c.outcome}
          </span>
          <div style="font-size: 11px; color: #64748b; margin-top: 4px;">${c.knowledgeDomainLabel}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 16px;">
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
          <h4 style="font-size: 11px; font-weight: bold; color: #047857; text-transform: uppercase; margin: 0 0 6px;">📞 Phone Numbers</h4>
          ${c.extractedEntities.phoneNumbers.map((p) => `<div style="font-size: 12px; margin-bottom: 4px;"><strong>${p.label}:</strong> <span style="font-family: monospace;">${p.value}</span></div>`).join("")}
        </div>

        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
          <h4 style="font-size: 11px; font-weight: bold; color: #1d4ed8; text-transform: uppercase; margin: 0 0 6px;">✉️ Email Addresses</h4>
          ${c.extractedEntities.emails.map((e) => `<div style="font-size: 12px; margin-bottom: 4px;"><strong>${e.label}:</strong> <span style="font-family: monospace;">${e.value}</span></div>`).join("")}
        </div>

        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
          <h4 style="font-size: 11px; font-weight: bold; color: #7e22ce; text-transform: uppercase; margin: 0 0 6px;">📍 Residential Address</h4>
          ${c.extractedEntities.addresses.map((a) => `<div style="font-size: 12px; line-height: 1.4;">${a.street}<br/><strong>${a.cityStatePincode}</strong></div>`).join("")}
        </div>
      </div>

      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-bottom: 14px;">
        <h4 style="font-size: 11px; font-weight: bold; color: #b45309; text-transform: uppercase; margin: 0 0 8px;">🏷️ Discussion Topics</h4>
        <div>
          ${c.extractedEntities.topics.map((t) => `<span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 600; background: #fef3c7; color: #92400e; margin: 0 4px 4px 0;"># ${t}</span>`).join("")}
        </div>
      </div>

      <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-bottom: 14px;">
        <h4 style="font-size: 11px; font-weight: bold; color: #4338ca; text-transform: uppercase; margin: 0 0 8px;">📌 Key Points Extracted from Caller Speech</h4>
        <ol style="margin: 0; padding-left: 20px;">
          ${c.extractedEntities.keyPoints.map((kp) => `<li style="font-size: 12.5px; line-height: 1.5; margin-bottom: 4px; color: #1e293b;">${kp}</li>`).join("")}
        </ol>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
        <h4 style="font-size: 11px; font-weight: bold; color: #334155; text-transform: uppercase; margin: 0 0 8px;">🗄️ Institutional CRM Data Vault Parameters</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${Object.entries(c.extractedParameters).map(([k, v]) => `<div style="background: white; border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px 8px; font-size: 11px;"><strong>${k}:</strong> ${v}</div>`).join("")}
        </div>
      </div>
    </div>
  `
    )
    .join("");

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Swaram AI — ${topicTitle} Intelligence Dossier</title>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; padding: 30px; color: #0f172a; line-height: 1.5; }
          .header-box { border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-end; }
          h1 { margin: 0; font-size: 24px; font-weight: 800; }
          .meta { font-size: 12px; color: #64748b; margin-top: 4px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none !important; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; background: #e0e7ff; padding: 12px 18px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 13px; font-weight: 600; color: #3730a3;">Ready to print or save as PDF. Click the button to launch browser print dialog.</span>
          <button onclick="window.print()" style="background: #1e1b4b; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer;">Print / Save as PDF</button>
        </div>
        <div class="header-box">
          <div>
            <h1>Swaram AI Telephony — Client-Wise Topic Intelligence Dossier</h1>
            <div class="meta">Topic: <strong>${topicTitle}</strong> • Total Logged Clients: <strong>${calls.length}</strong> • Date: ${new Date().toLocaleDateString()}</div>
          </div>
          <div style="text-align: right; font-size: 11px; color: #64748b;">
            Platform: Swaram AI Autonomous Operations<br />
            Status: 100% Vector RAG Grounded
          </div>
        </div>
        ${htmlCards}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
}

function CallHistoryPageContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";
  const initialId = searchParams?.get("id") || "";

  const [searchQuery, setSearchQuery] = useState(initialSearch || initialId || "");
  const [selectedDomain, setSelectedDomain] = useState<"all" | "admissions" | "fees" | "hostels" | "technical">("all");
  const [directionFilter, setDirectionFilter] = useState<"all" | "inbound" | "outbound">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [agentFilter, setAgentFilter] = useState<string>("all");

  // Selected Call for Full Transcript Modal & Drawer
  const [selectedCall, setSelectedCall] = useState<ComprehensiveCallLog | null>(null);

  // Auto-open call modal if specific call ID was passed via redirect
  useEffect(() => {
    if (initialId) {
      const match = ALL_CALL_HISTORY_LOGS.find(
        (c) => c.id.toLowerCase() === initialId.toLowerCase()
      );
      if (match) {
        setSelectedCall(match);
      }
    } else if (initialSearch) {
      const match = ALL_CALL_HISTORY_LOGS.find(
        (c) =>
          c.id.toLowerCase() === initialSearch.toLowerCase() ||
          c.contactName.toLowerCase().includes(initialSearch.toLowerCase()) ||
          c.contactPhone.includes(initialSearch)
      );
      if (match) {
        setSelectedCall(match);
      }
    }
  }, [initialId, initialSearch]);
  const [expandedEntitiesCallId, setExpandedEntitiesCallId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [topicExportHubOpen, setTopicExportHubOpen] = useState(false);
  const [selectedExportTopic, setSelectedExportTopic] = useState<string>("all");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState<"1x" | "1.25x" | "1.5x" | "2x">("1x");
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [copiedEntityKey, setCopiedEntityKey] = useState<string | null>(null);
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [activeModalTab, setActiveModalTab] = useState<"transcript" | "entities" | "whatsapp">("transcript");
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);

  // Trigger download helper
  const handleExportTopicClients = (
    topicId: string,
    format: "csv" | "doc" | "pdf",
    customCallsList?: ComprehensiveCallLog[]
  ) => {
    try {
      soundSynth.play("confirm");
    } catch {}

    const callsToExport =
      customCallsList ||
      (topicId === "all"
        ? ALL_CALL_HISTORY_LOGS
        : ALL_CALL_HISTORY_LOGS.filter((c) => c.knowledgeDomain === topicId));

    const domainCfg = KNOWLEDGE_DOMAINS.find((d) => d.id === topicId);
    const topicTitle = domainCfg ? domainCfg.name : topicId.toUpperCase();
    const cleanTopicSlug = (domainCfg ? domainCfg.shortLabel : topicId).toLowerCase().replace(/[^a-z0-9]/g, "-");
    const dateSlug = new Date().toISOString().slice(0, 10);

    if (format === "csv") {
      const csvData = generateClientWiseCsv(callsToExport);
      downloadFile(csvData, `swaram-clients-${cleanTopicSlug}-${dateSlug}.csv`, "text/csv;charset=utf-8;");
      setExportSuccessMessage(`Downloaded ${callsToExport.length} clients to CSV sheet!`);
    } else if (format === "doc") {
      const docData = generateClientWiseDoc(callsToExport, topicTitle);
      downloadFile(
        docData,
        `swaram-clients-${cleanTopicSlug}-${dateSlug}.doc`,
        "application/msword;charset=utf-8;"
      );
      setExportSuccessMessage(`Downloaded ${callsToExport.length} clients to Document dossier!`);
    } else if (format === "pdf") {
      openPrintPdfReport(callsToExport, topicTitle);
      setExportSuccessMessage(`Opened print/PDF report for ${callsToExport.length} clients!`);
    }

    setTimeout(() => {
      setExportSuccessMessage(null);
    }, 4000);
  };

  // Copy helper
  const handleCopyEntity = (text: string, keyIdentifier: string) => {
    try {
      soundSynth.play("confirm");
    } catch {}
    navigator.clipboard.writeText(text);
    setCopiedEntityKey(keyIdentifier);
    setTimeout(() => setCopiedEntityKey(null), 2200);
  };

  // Filter logs
  const filteredLogs = useMemo(() => {
    return ALL_CALL_HISTORY_LOGS.filter((call) => {
      // Domain filter
      if (selectedDomain !== "all" && call.knowledgeDomain !== selectedDomain) {
        return false;
      }
      // Direction filter
      if (directionFilter !== "all" && call.direction !== directionFilter) {
        return false;
      }
      // Status filter
      if (statusFilter !== "all") {
        if (statusFilter === "completed" && call.status !== "completed") return false;
        if (statusFilter === "transferred" && call.status !== "transferred") return false;
        if (statusFilter === "high-intent" && call.qualification !== "High Intent") return false;
      }
      // Agent filter
      if (agentFilter !== "all" && call.agentName !== agentFilter) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = call.contactName.toLowerCase().includes(q);
        const matchesPhone = call.contactPhone.toLowerCase().includes(q);
        const matchesIntent = call.intent.toLowerCase().includes(q);
        const matchesSummary = call.summary.toLowerCase().includes(q);
        const matchesDoc = call.groundedDocTitle.toLowerCase().includes(q);
        const matchesTranscript = call.transcript.some((t) => t.text.toLowerCase().includes(q));
        const matchesTopics = call.extractedEntities.topics.some((tp) => tp.toLowerCase().includes(q));
        const matchesKeyPoints = call.extractedEntities.keyPoints.some((kp) => kp.toLowerCase().includes(q));
        const matchesEmails = call.extractedEntities.emails.some((em) => em.value.toLowerCase().includes(q));
        const matchesAddresses = call.extractedEntities.addresses.some(
          (ad) => ad.street.toLowerCase().includes(q) || ad.cityStatePincode.toLowerCase().includes(q)
        );

        if (
          !matchesName &&
          !matchesPhone &&
          !matchesIntent &&
          !matchesSummary &&
          !matchesDoc &&
          !matchesTranscript &&
          !matchesTopics &&
          !matchesKeyPoints &&
          !matchesEmails &&
          !matchesAddresses
        ) {
          return false;
        }
      }
      return true;
    });
  }, [selectedDomain, directionFilter, statusFilter, agentFilter, searchQuery]);

  const handleOpenCallTranscript = (call: ComprehensiveCallLog, tab: "transcript" | "entities" = "transcript") => {
    try {
      soundSynth.play("click");
    } catch {}
    setSelectedCall(call);
    setIsPlayingAudio(false);
    setTranscriptSearch("");
    setActiveModalTab(tab);
  };

  const handleToggleExpandEntities = (callId: string) => {
    try {
      soundSynth.play("click");
    } catch {}
    setExpandedEntitiesCallId((prev) => (prev === callId ? null : callId));
  };

  const handleCopyTranscript = () => {
    if (!selectedCall) return;
    try {
      soundSynth.play("confirm");
    } catch {}
    const fullText = selectedCall.transcript
      .map((t) => `[${t.time}] ${t.speakerName}: ${t.text}`)
      .join("\n\n");
    navigator.clipboard.writeText(fullText);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  };

  const handleDownloadTranscriptText = () => {
    if (!selectedCall) return;
    try {
      soundSynth.play("confirm");
    } catch {}
    const fullText =
      `SWARAM AI TELEPHONY CONVERSATION TRANSCRIPT\n` +
      `Call ID: ${selectedCall.id}\n` +
      `Contact: ${selectedCall.contactName} (${selectedCall.contactPhone})\n` +
      `AI Agent: ${selectedCall.agentName} (${selectedCall.agentRole})\n` +
      `Timestamp: ${selectedCall.timestamp} (${selectedCall.duration})\n` +
      `Knowledge Grounding: ${selectedCall.groundedDocTitle}\n` +
      `Outcome: ${selectedCall.outcome}\n\n` +
      `==================== EXTRACTED TOPICS & ENTITIES ====================\n\n` +
      `[PHONE NUMBERS]\n` +
      selectedCall.extractedEntities.phoneNumbers.map((p) => `• ${p.label}: ${p.value} ${p.verified ? "(Verified)" : ""}`).join("\n") +
      `\n\n[EMAIL ADDRESSES]\n` +
      selectedCall.extractedEntities.emails.map((e) => `• ${e.label}: ${e.value} ${e.verified ? "(Verified)" : ""}`).join("\n") +
      `\n\n[RESIDENTIAL & POSTAL ADDRESSES]\n` +
      selectedCall.extractedEntities.addresses.map((a) => `• ${a.label}:\n  ${a.street}\n  ${a.cityStatePincode}`).join("\n\n") +
      `\n\n[TOPICS DISCUSSED]\n` +
      selectedCall.extractedEntities.topics.map((t) => `• ${t}`).join("\n") +
      `\n\n[KEY POINTS EXTRACTED FROM USER SPEECH]\n` +
      selectedCall.extractedEntities.keyPoints.map((k) => `• ${k}`).join("\n") +
      `\n\n[INSTITUTIONAL DATA VAULT PARAMETERS]\n` +
      Object.entries(selectedCall.extractedParameters).map(([k, v]) => `• ${k}: ${v}`).join("\n") +
      `\n\n==================== FULL TURN-BY-TURN DIALOGUE ====================\n\n` +
      selectedCall.transcript
        .map(
          (t) =>
            `[${t.time}] ${t.speakerName.toUpperCase()}:\n"${t.text}"\n${
              t.groundedDocCitation ? `   * Citation: ${t.groundedDocCitation}\n` : ""
            }`
        )
        .join("\n");

    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transcript-${selectedCall.id}-${selectedCall.contactName.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Convert for CallDrawer compatibility
  const drawerCompatibleCall: RecentCallRecord | null = useMemo(() => {
    if (!selectedCall) return null;
    return {
      id: selectedCall.id,
      contactNumber: selectedCall.contactPhone,
      contactName: selectedCall.contactName,
      agentName: selectedCall.agentName,
      direction: selectedCall.direction,
      duration: selectedCall.duration,
      durationSeconds: selectedCall.durationSeconds,
      outcome: selectedCall.outcome as any,
      timestamp: selectedCall.timestamp,
      timeAgo: selectedCall.relativeTime,
      summary: selectedCall.summary,
      sentimentScore: selectedCall.sentimentScore,
      qualification: selectedCall.qualification,
      transcriptSnippet: selectedCall.intent,
      knowledgeDomain: selectedCall.knowledgeDomain,
      knowledgeDomainLabel: selectedCall.knowledgeDomainLabel,
      groundedDocTitle: selectedCall.groundedDocTitle,
    };
  }, [selectedCall]);

  const totalCalls = ALL_CALL_HISTORY_LOGS.length;
  const inboundTotal = ALL_CALL_HISTORY_LOGS.filter((c) => c.direction === "inbound").length;
  const outboundTotal = ALL_CALL_HISTORY_LOGS.filter((c) => c.direction === "outbound").length;

  return (
    <div className="space-y-6 pb-20 font-sans text-[#1A1A1A]">
      {/* Toast feedback */}
      {exportSuccessMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#18181B] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top duration-200 border border-white/10">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{exportSuccessMessage}</span>
        </div>
      )}

      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-black/45 hover:text-black transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <Link
              href="/dashboard/calls"
              className="text-xs font-semibold text-black/45 hover:text-black transition-colors"
            >
              Live Calling
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-0.5 rounded-full">
              <History className="w-3.5 h-3.5 text-indigo-600" />
              <span>Call History &amp; Transcripts</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A] mt-2 flex items-center gap-3 flex-wrap">
            <span>Call History &amp; Conversation Transcripts</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              {totalCalls} Logged Sessions
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              <span>100% Vector RAG Grounded</span>
            </span>
          </h1>

          <p className="text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Inspect comprehensive logs of past voice sessions. Every topic features direct download buttons to export extracted entities and key points <strong>client-wise into local CSV sheets, Word documents, or print-ready PDF reports</strong>.
          </p>
        </div>

        {/* Action Buttons: Master Downloads */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
          {/* Master Download: All Topics Key Points */}
          <div className="flex items-center gap-1 bg-[#18181B] text-white p-1 rounded-full shadow-xs">
            <button
              type="button"
              onClick={() => handleExportTopicClients("all", "csv")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
              title="Download Master Client-Wise CSV Sheet of all call history key points"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>All Key Points (.csv)</span>
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={() => handleExportTopicClients("all", "doc")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
              title="Download Master Client-Wise Word Document of all call history key points"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Doc</span>
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={() => handleExportTopicClients("all", "pdf")}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
              title="Print / Save Master PDF Report"
            >
              <Printer className="w-3.5 h-3.5 text-purple-300" />
            </button>
          </div>

          <Link
            href="/dashboard/calls"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#FAF8F3] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.08] transition-all cursor-pointer shadow-2xs hover:scale-102"
          >
            <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>Live Calling →</span>
          </Link>
        </div>
      </div>

      {/* 4 Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-black/50">
            <span>Total Completed Calls</span>
            <PhoneCall className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-[#1A1A1A]">
            {totalCalls} Calls
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-black/50">
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
              {inboundTotal} Inbound
            </span>
            <span>•</span>
            <span className="text-amber-800 bg-amber-50 px-2 py-0.2 rounded-full border border-amber-200">
              {outboundTotal} Outbound
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-black/50">
            <span>Average Call Duration</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">
            2m 24s
          </div>
          <div className="text-xs text-black/50">
            Sub-3min optimal resolution benchmark met
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-black/50">
            <span>RAG Grounding Accuracy</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-900">
            99.2%
          </div>
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Zero hallucination recorded</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-black/50">
            <span>Intent Qualification Rate</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900">
            94.6%
          </div>
          <div className="text-xs text-black/50">
            Only 5.4% human handoff escalation
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* TOPIC-WISE INTELLIGENCE EXPORT HUB (DEDICATED DOWNLOAD BUTTONS PER TOPIC)*/}
      {/* ======================================================================= */}
      <div className="bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/60 rounded-3xl border border-indigo-200/80 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-[#1A1A1A] tracking-tight">
                  Topic-Wise Client Intelligence Export Center
                </h3>
                <span className="text-[10px] font-mono font-bold text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-full">
                  Topic-by-Topic Downloads
                </span>
              </div>
              <p className="text-xs text-black/55 mt-0.5">
                Download extracted contact entities (phone, email, address) and speech key points organized <strong>client-by-client</strong> into local files.
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-indigo-900 bg-white border border-indigo-200 px-3 py-1 rounded-full shadow-2xs self-start sm:self-auto">
            Formats: CSV Sheet • Word Doc • PDF Print
          </div>
        </div>

        {/* 5 Topic Cards with Individual Download Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {KNOWLEDGE_DOMAINS.map((domain) => {
            const count =
              domain.id === "all"
                ? ALL_CALL_HISTORY_LOGS.length
                : ALL_CALL_HISTORY_LOGS.filter((c) => c.knowledgeDomain === domain.id).length;

            return (
              <div
                key={domain.id}
                className="p-3.5 rounded-2xl bg-white border border-black/[0.08] shadow-2xs flex flex-col justify-between gap-3 hover:border-indigo-300 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base">{domain.emoji}</span>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-black/5 text-black/60 font-mono">
                      {count} {count === 1 ? "Client" : "Clients"}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-[#1A1A1A] mt-2 group-hover:text-indigo-900 transition-colors line-clamp-1">
                    {domain.shortLabel}
                  </h4>
                  <p className="text-[10.5px] text-black/50 mt-0.5 line-clamp-1">
                    {domain.name}
                  </p>
                </div>

                {/* 3 Topic-Wise Download Action Buttons */}
                <div className="space-y-1.5 pt-2 border-t border-black/[0.05]">
                  <div className="text-[10px] font-bold uppercase text-black/40 tracking-wider">
                    Export Topic:
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <button
                      type="button"
                      onClick={() => handleExportTopicClients(domain.id, "csv")}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[#FAF8F3] hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-black/[0.06] text-black/70 transition-all cursor-pointer text-center"
                      title={`Export ${domain.shortLabel} clients to CSV Sheet`}
                    >
                      .CSV
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExportTopicClients(domain.id, "doc")}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[#FAF8F3] hover:bg-blue-50 hover:text-blue-800 hover:border-blue-200 border border-black/[0.06] text-black/70 transition-all cursor-pointer text-center"
                      title={`Export ${domain.shortLabel} clients to Word Document`}
                    >
                      .DOC
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExportTopicClients(domain.id, "pdf")}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[#FAF8F3] hover:bg-purple-50 hover:text-purple-800 hover:border-purple-200 border border-black/[0.06] text-black/70 transition-all cursor-pointer text-center"
                      title={`Print / PDF Report for ${domain.shortLabel}`}
                    >
                      PDF
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter and Control Operations Bar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-black/[0.08] p-4 shadow-2xs space-y-3.5">
        {/* Row 1: Knowledge Domain Pills WITH Quick Download Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center gap-1.5 mr-1 text-xs font-bold text-black/55">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Knowledge Domain:</span>
            </div>

            {KNOWLEDGE_DOMAINS.map((domain) => {
              const isSelected = selectedDomain === domain.id;
              const count =
                domain.id === "all"
                  ? ALL_CALL_HISTORY_LOGS.length
                  : ALL_CALL_HISTORY_LOGS.filter((c) => c.knowledgeDomain === domain.id).length;

              return (
                <div key={domain.id} className="inline-flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        soundSynth.play("click");
                      } catch {}
                      setSelectedDomain(domain.id);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-l-full text-xs font-bold transition-all cursor-pointer border-y border-l ${
                      isSelected
                        ? `${domain.pillColor} border-transparent shadow-xs`
                        : "bg-[#FAF8F3] hover:bg-[#F5EFE0] text-black/70 border-black/[0.08]"
                    }`}
                  >
                    <span>{domain.emoji}</span>
                    <span>{domain.shortLabel}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[9.5px] font-extrabold ${
                        isSelected ? "bg-white/25 text-white" : "bg-black/5 text-black/55"
                      }`}
                    >
                      {count}
                    </span>
                  </button>

                  {/* Inline Topic Download Icon Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExportTopicClients(domain.id, "csv");
                    }}
                    className={`px-2 py-1.5 rounded-r-full text-xs font-bold border-y border-r transition-all cursor-pointer ${
                      isSelected
                        ? "bg-black/20 text-white border-transparent hover:bg-black/35"
                        : "bg-[#FAF8F3] hover:bg-indigo-100 text-black/50 hover:text-indigo-900 border-black/[0.08]"
                    }`}
                    title={`1-Click Download: Export ${domain.shortLabel} clients as CSV`}
                  >
                    <Download className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedDomain("all");
                setDirectionFilter("all");
                setStatusFilter("all");
                setAgentFilter("all");
                setSearchQuery("");
              }}
              className="text-xs text-black/50 hover:text-black font-semibold cursor-pointer flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* Row 2: Search Input + Direction + Status + Agent Selectors */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by caller, phone, email, address, key points, topics, or agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#FAF8F3] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all placeholder:text-black/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Slicers: Direction, Status, Agent */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Direction Selector */}
            <div className="flex items-center gap-1 bg-[#FAF8F3] p-1 rounded-full border border-black/[0.06]">
              {[
                { id: "all", label: "All Calls" },
                { id: "inbound", label: "Inbound" },
                { id: "outbound", label: "Outbound" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDirectionFilter(tab.id as any)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    directionFilter === tab.id
                      ? "bg-[#18181B] text-white shadow-2xs"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Status Selector */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs bg-[#FAF8F3] border border-black/[0.06] rounded-full px-3.5 py-1.5 text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="transferred">Human Handoff</option>
              <option value="high-intent">High Intent Leads</option>
            </select>

            {/* Agent Selector */}
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="text-xs bg-[#FAF8F3] border border-black/[0.06] rounded-full px-3.5 py-1.5 text-[#1A1A1A] font-semibold focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer"
            >
              <option value="all">All AI Agents</option>
              <option value="Maya">Maya (Admissions AI)</option>
              <option value="Priya">Priya (Finance AI)</option>
              <option value="Arjun">Arjun (Hostels AI)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Call History & Transcripts Table */}
      <div className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-2xs">
        {/* Table Sub-header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/[0.06] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold text-[#1A1A1A]">
              Historical Conversation Ledger &amp; Speech Transcripts
            </span>
            <span className="text-xs text-black/45 font-medium">
              ({filteredLogs.length} matching records)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleExportTopicClients(selectedDomain, "csv", filteredLogs)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FAF8F3] hover:bg-[#FAF3E4] text-indigo-950 border border-indigo-200 transition-colors cursor-pointer"
              title="Download filtered clients list to CSV"
            >
              <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
              <span>Export Filtered ({filteredLogs.length})</span>
            </button>
            <span className="text-xs text-black/50 hidden lg:inline">
              Click <strong>&quot;Topics &amp; Entities&quot;</strong> to reveal stored phone, email, address, and key points
            </span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF8F3] border-b border-black/[0.06] text-black/50 font-bold text-[11px] uppercase tracking-wider">
                <th className="py-3.5 px-5">Caller Contact &amp; Time</th>
                <th className="py-3.5 px-4">Direction &amp; Duration</th>
                <th className="py-3.5 px-5">Knowledge Domain &amp; Source</th>
                <th className="py-3.5 px-5">Topics &amp; Extracted Entities (Click to View)</th>
                <th className="py-3.5 px-4">AI Agent</th>
                <th className="py-3.5 px-4">Outcome</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.04]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <div className="max-w-md mx-auto space-y-3 font-sans">
                      <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto">
                        <History className="w-6 h-6 text-indigo-600" />
                      </div>
                      <h3 className="text-sm font-bold text-[#1A1A1A]">
                        No call history found matching your filters
                      </h3>
                      <p className="text-xs text-black/55 leading-relaxed">
                        Try resetting the knowledge domain or search query to view all historical voice sessions.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDomain("all");
                          setDirectionFilter("all");
                          setStatusFilter("all");
                          setAgentFilter("all");
                          setSearchQuery("");
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#18181B] text-white cursor-pointer shadow-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset All Filters</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((call) => {
                  const domainCfg = KNOWLEDGE_DOMAINS.find((d) => d.id === call.knowledgeDomain);
                  const isEntitiesExpanded = expandedEntitiesCallId === call.id;
                  const totalEntitiesCount =
                    call.extractedEntities.phoneNumbers.length +
                    call.extractedEntities.emails.length +
                    call.extractedEntities.addresses.length +
                    call.extractedEntities.keyPoints.length +
                    call.extractedEntities.topics.length;

                  return (
                    <React.Fragment key={call.id}>
                      <tr
                        onClick={() => handleOpenCallTranscript(call)}
                        className={`hover:bg-indigo-50/30 transition-colors cursor-pointer group text-[#1A1A1A] ${
                          isEntitiesExpanded ? "bg-indigo-50/20" : ""
                        }`}
                      >
                        {/* Caller Contact & Time */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-xs shadow-2xs shrink-0">
                              {call.contactName.slice(0, 1)}
                            </div>
                            <div>
                              <div className="font-extrabold text-sm text-[#1A1A1A] group-hover:text-indigo-900 transition-colors">
                                {call.contactName}
                              </div>
                              <div className="text-[11px] font-mono text-black/50 mt-0.5">
                                {call.contactPhone}
                              </div>
                              <span className="text-[10px] text-black/45 block mt-0.5">
                                {call.relativeTime} • {call.timestamp}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Direction & Duration */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                                call.direction === "inbound"
                                  ? "bg-blue-100 text-blue-900 border border-blue-200"
                                  : "bg-amber-100 text-amber-900 border border-amber-200"
                              }`}
                            >
                              {call.direction === "inbound" ? (
                                <PhoneIncoming className="w-3 h-3 text-blue-700" />
                              ) : (
                                <PhoneOutgoing className="w-3 h-3 text-amber-700" />
                              )}
                              <span className="capitalize">{call.direction}</span>
                            </span>
                            <div className="text-[11px] font-mono font-bold text-black/75">
                              ⏱ {call.duration}
                            </div>
                          </div>
                        </td>

                        {/* Knowledge Domain & Grounded Source */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${
                                domainCfg?.badgeColor || "bg-amber-100 text-amber-900 border-amber-300"
                              }`}
                            >
                              <span>{domainCfg?.emoji || "📚"}</span>
                              <span>{call.knowledgeDomainLabel}</span>
                            </span>

                            {/* Quick download for this topic */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExportTopicClients(call.knowledgeDomain, "csv");
                              }}
                              className="p-1 rounded-full text-black/40 hover:text-indigo-900 hover:bg-indigo-50 transition-colors"
                              title={`Download all ${call.knowledgeDomainLabel} clients`}
                            >
                              <Download className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="font-mono text-[10.5px] text-indigo-700 font-semibold mt-1 truncate max-w-[200px] flex items-center gap-1">
                            <Database className="w-3 h-3 text-indigo-500 shrink-0" />
                            <span className="truncate">{call.groundedDocTitle}</span>
                          </div>
                        </td>

                        {/* Topic & Extracted Entities TRIGGER BUTTON */}
                        <td className="py-4 px-5 max-w-sm">
                          <div className="font-bold text-[#1A1A1A] line-clamp-1 group-hover:text-indigo-900 transition-colors">
                            {call.intent}
                          </div>

                          {/* Interactive Click-to-View Trigger */}
                          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleExpandEntities(call.id);
                              }}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer border shadow-2xs hover:scale-102 ${
                                isEntitiesExpanded
                                  ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                                  : "bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border-indigo-200"
                              }`}
                              title="Click to view extracted phone numbers, email, address, and key points"
                            >
                              <Tag className="w-3 h-3 text-indigo-600" />
                              <span>Topics &amp; Entities ({totalEntitiesCount})</span>
                              {isEntitiesExpanded ? (
                                <ChevronUp className="w-3 h-3" />
                              ) : (
                                <ChevronDown className="w-3 h-3" />
                              )}
                            </button>

                            <span className="text-[10px] text-black/45">
                              {isEntitiesExpanded ? "Showing stored intelligence" : "Click to reveal"}
                            </span>
                          </div>
                        </td>

                        {/* AI Agent */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-indigo-900 bg-indigo-50 border border-indigo-200">
                            <Bot className="w-3.5 h-3.5 text-indigo-600" />
                            <span>{call.agentName}</span>
                          </span>
                          <div className="text-[10px] text-black/50 mt-1">
                            {call.language}
                          </div>
                        </td>

                        {/* Outcome Badge */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          {call.status === "completed" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>{call.outcome}</span>
                            </span>
                          ) : call.status === "transferred" ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                              <PhoneForwarded className="w-3 h-3 text-amber-700" />
                              <span>{call.outcome}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-black/[0.04] text-black/60">
                              <PhoneMissed className="w-3 h-3 text-black/40" />
                              <span>No Answer</span>
                            </span>
                          )}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {/* Single Client Download Dropdown */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleExportTopicClients(call.knowledgeDomain, "doc", [call]);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-[#FAF8F3] hover:bg-[#FAF3E4] text-black/70 border border-black/[0.08] cursor-pointer transition-all hover:scale-102"
                              title="Download this client's profile & key points (.doc)"
                            >
                              <FileDown className="w-3 h-3 text-indigo-600" />
                              <span className="hidden xl:inline">Dossier</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCallTranscript(call, "entities");
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF8F3] hover:bg-[#FAF3E4] text-indigo-900 border border-indigo-200 cursor-pointer transition-all hover:scale-102"
                              title="View Topics & Extracted Entities in Modal"
                            >
                              <Tags className="w-3 h-3 text-indigo-600" />
                              <span className="hidden xl:inline">Entities</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenCallTranscript(call, "transcript");
                              }}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#18181B] hover:bg-black text-white shadow-xs cursor-pointer transition-all hover:scale-105"
                            >
                              <Headphones className="w-3 h-3" />
                              <span>Inspect</span>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* ======================================================================= */}
                      {/* INLINE COLLAPSIBLE: TOPICS & EXTRACTED ENTITIES ACCORDION ROW           */}
                      {/* (Revealed when user clicks "Topics & Extracted Entities")              */}
                      {/* ======================================================================= */}
                      {isEntitiesExpanded && (
                        <tr className="bg-gradient-to-r from-indigo-50/60 via-white to-purple-50/40 border-y-2 border-indigo-200">
                          <td colSpan={7} className="p-6">
                            <div className="max-w-6xl mx-auto space-y-5 animate-in fade-in slide-in-from-top-2 duration-200">
                              {/* Subheader Banner */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-indigo-100">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                                    <Tag className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-sm font-extrabold text-[#1A1A1A] tracking-tight">
                                        Topics &amp; Extracted Entities for {call.contactName}
                                      </h4>
                                      <span className="text-[10px] font-mono text-indigo-800 bg-indigo-100/80 px-2 py-0.2 rounded-full font-bold">
                                        {call.id}
                                      </span>
                                    </div>
                                    <p className="text-xs text-black/55">
                                      Speech-extracted contact data, addresses, topics, and key takeaways verified against Institutional Data Vault.
                                    </p>
                                  </div>
                                </div>

                                {/* Download Buttons for This Specific Client */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-indigo-200 shadow-2xs">
                                    <span className="text-[10px] font-bold text-indigo-900 px-2 uppercase">
                                      Download Client Dossier:
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleExportTopicClients(call.knowledgeDomain, "csv", [call])}
                                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FAF8F3] hover:bg-emerald-50 hover:text-emerald-800 text-black/70 cursor-pointer border border-black/[0.06] transition-colors"
                                      title="Download this client's row as CSV"
                                    >
                                      .CSV
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleExportTopicClients(call.knowledgeDomain, "doc", [call])}
                                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FAF8F3] hover:bg-blue-50 hover:text-blue-800 text-black/70 cursor-pointer border border-black/[0.06] transition-colors"
                                      title="Download this client's profile as Word Document"
                                    >
                                      .DOC
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleExportTopicClients(call.knowledgeDomain, "pdf", [call])}
                                      className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FAF8F3] hover:bg-purple-50 hover:text-purple-800 text-black/70 cursor-pointer border border-black/[0.06] transition-colors"
                                      title="Print or Save PDF report for this client"
                                    >
                                      PDF
                                    </button>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => handleOpenCallTranscript(call, "entities")}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-indigo-900 border border-indigo-200 hover:bg-indigo-50 cursor-pointer transition-colors shadow-2xs"
                                  >
                                    <ExternalLink className="w-3 h-3 text-indigo-600" />
                                    <span>Expand in Modal</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleToggleExpandEntities(call.id)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-black/5 hover:bg-black/10 text-black/70 cursor-pointer transition-colors"
                                  >
                                    <X className="w-3 h-3" />
                                    <span>Hide</span>
                                  </button>
                                </div>
                              </div>

                              {/* 3-Column Entity Grid */}
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* CARD 1: EXTRACTED PHONE NUMBERS */}
                                <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                                      </div>
                                      <span className="text-xs font-extrabold text-[#1A1A1A]">
                                        Extracted Phone Numbers
                                      </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full">
                                      {call.extractedEntities.phoneNumbers.length} Found
                                    </span>
                                  </div>

                                  <div className="space-y-2">
                                    {call.extractedEntities.phoneNumbers.map((phone, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2.5 rounded-xl bg-[#FAF8F3] border border-black/[0.06] flex items-center justify-between gap-2"
                                      >
                                        <div className="min-w-0">
                                          <span className="text-[10px] font-bold text-black/45 block">
                                            {phone.label}
                                          </span>
                                          <span className="font-mono text-xs font-bold text-[#1A1A1A] block">
                                            {phone.value}
                                          </span>
                                        </div>

                                        <div className="flex items-center gap-1 shrink-0">
                                          {phone.verified && (
                                            <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded">
                                              Verified
                                            </span>
                                          )}
                                          <button
                                            type="button"
                                            onClick={() => handleCopyEntity(phone.value, `phone-${call.id}-${idx}`)}
                                            className="p-1 rounded-md hover:bg-black/5 text-black/45 hover:text-black cursor-pointer transition-colors"
                                            title="Copy phone number"
                                          >
                                            {copiedEntityKey === `phone-${call.id}-${idx}` ? (
                                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                                            ) : (
                                              <Copy className="w-3.5 h-3.5" />
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* CARD 2: EXTRACTED EMAIL ADDRESSES */}
                                <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                                        <Mail className="w-3.5 h-3.5 text-blue-600" />
                                      </div>
                                      <span className="text-xs font-extrabold text-[#1A1A1A]">
                                        Extracted Email Addresses
                                      </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.2 rounded-full">
                                      {call.extractedEntities.emails.length} Found
                                    </span>
                                  </div>

                                  <div className="space-y-2">
                                    {call.extractedEntities.emails.map((email, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2.5 rounded-xl bg-[#FAF8F3] border border-black/[0.06] flex items-center justify-between gap-2"
                                      >
                                        <div className="min-w-0">
                                          <span className="text-[10px] font-bold text-black/45 block">
                                            {email.label}
                                          </span>
                                          <span className="font-mono text-xs font-bold text-[#1A1A1A] truncate block">
                                            {email.value}
                                          </span>
                                        </div>

                                        <div className="flex items-center gap-1 shrink-0">
                                          {email.verified && (
                                            <span className="text-[9px] font-bold text-blue-700 bg-blue-100/80 px-1.5 py-0.2 rounded">
                                              Verified
                                            </span>
                                          )}
                                          <button
                                            type="button"
                                            onClick={() => handleCopyEntity(email.value, `email-${call.id}-${idx}`)}
                                            className="p-1 rounded-md hover:bg-black/5 text-black/45 hover:text-black cursor-pointer transition-colors shrink-0"
                                            title="Copy email address"
                                          >
                                            {copiedEntityKey === `email-${call.id}-${idx}` ? (
                                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                                            ) : (
                                              <Copy className="w-3.5 h-3.5" />
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* CARD 3: EXTRACTED POSTAL & RESIDENTIAL ADDRESSES */}
                                <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                                        <MapPin className="w-3.5 h-3.5 text-purple-600" />
                                      </div>
                                      <span className="text-xs font-extrabold text-[#1A1A1A]">
                                        Extracted Addresses
                                      </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.2 rounded-full">
                                      {call.extractedEntities.addresses.length} Found
                                    </span>
                                  </div>

                                  <div className="space-y-2">
                                    {call.extractedEntities.addresses.map((address, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2.5 rounded-xl bg-[#FAF8F3] border border-black/[0.06] flex items-start justify-between gap-2"
                                      >
                                        <div className="min-w-0">
                                          <span className="text-[10px] font-bold text-black/45 block">
                                            {address.label}
                                          </span>
                                          <p className="text-xs font-semibold text-[#1A1A1A] leading-relaxed mt-0.5">
                                            {address.street}
                                          </p>
                                          <span className="text-[11px] font-mono text-purple-900 font-bold block mt-0.5">
                                            {address.cityStatePincode}
                                          </span>
                                        </div>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleCopyEntity(
                                              `${address.street}, ${address.cityStatePincode}`,
                                              `addr-${call.id}-${idx}`
                                            )
                                          }
                                          className="p-1 rounded-md hover:bg-black/5 text-black/45 hover:text-black cursor-pointer transition-colors shrink-0"
                                          title="Copy complete address"
                                        >
                                          {copiedEntityKey === `addr-${call.id}-${idx}` ? (
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                          ) : (
                                            <Copy className="w-3.5 h-3.5" />
                                          )}
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Row 2: Discussion Topics + Extracted Key Points */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {/* DISCUSSION TOPICS WITH INDIVIDUAL TOPIC DOWNLOAD BUTTONS */}
                                <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                                        <Tag className="w-3.5 h-3.5 text-amber-600" />
                                      </div>
                                      <span className="text-xs font-extrabold text-[#1A1A1A]">
                                        Discussion Topics &amp; Intent Tags
                                      </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.2 rounded-full">
                                      {call.extractedEntities.topics.length} Topics
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 flex-wrap">
                                    {call.extractedEntities.topics.map((topic, idx) => (
                                      <div
                                        key={idx}
                                        className="inline-flex items-center rounded-full text-xs font-bold bg-[#FAF8F3] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.08] shadow-2xs transition-all overflow-hidden"
                                      >
                                        <span className="px-3 py-1.5 flex items-center gap-1">
                                          <span className="text-amber-600">#</span>
                                          <span>{topic}</span>
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => handleExportTopicClients(call.knowledgeDomain, "doc", [call])}
                                          className="p-1.5 px-2 bg-black/[0.03] hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer text-black/50"
                                          title={`Download key points for topic: ${topic}`}
                                        >
                                          <Download className="w-3 h-3" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* KEY POINTS EXTRACTED FROM USER SPEECH */}
                                <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                                        <ListChecks className="w-3.5 h-3.5 text-indigo-600" />
                                      </div>
                                      <span className="text-xs font-extrabold text-[#1A1A1A]">
                                        Key Points Extracted from Caller
                                      </span>
                                    </div>
                                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.2 rounded-full">
                                      {call.extractedEntities.keyPoints.length} Points
                                    </span>
                                  </div>

                                  <div className="space-y-2">
                                    {call.extractedEntities.keyPoints.map((point, idx) => (
                                      <div
                                        key={idx}
                                        className="p-2.5 rounded-xl bg-[#FAF8F3] border border-black/[0.06] flex items-start gap-2.5"
                                      >
                                        <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                          {idx + 1}
                                        </span>
                                        <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed">
                                          {point}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Row 3: Institutional Data Vault Variables */}
                              <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center">
                                      <Database className="w-3.5 h-3.5 text-indigo-600" />
                                    </div>
                                    <span className="text-xs font-extrabold text-[#1A1A1A]">
                                      Institutional CRM &amp; Data Vault Parameters
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                    <span>Live Voice Synced</span>
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                                  {Object.entries(call.extractedParameters).map(([k, v], idx) => (
                                    <div
                                      key={idx}
                                      className="p-3 rounded-xl bg-[#FAF8F3] border border-black/[0.06] space-y-1"
                                    >
                                      <span className="text-[10px] font-bold uppercase text-black/45 block truncate">
                                        {k}
                                      </span>
                                      <span className="font-extrabold text-xs text-[#1A1A1A] block truncate">
                                        {v}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* IMMERSIVE TRANSCRIPT & AUDIO INSPECTION MODAL                          */}
      {/* ======================================================================= */}
      {selectedCall && (
        <div
          onClick={() => setSelectedCall(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 select-none overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white rounded-[32px] border border-black/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col max-h-[92vh] text-[#1A1A1A] my-auto animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#FAF8F3] via-white to-indigo-50/40 border-b border-black/[0.06] flex items-start justify-between gap-4 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                    {selectedCall.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      KNOWLEDGE_DOMAINS.find((d) => d.id === selectedCall.knowledgeDomain)?.badgeColor || ""
                    }`}
                  >
                    <span>{selectedCall.knowledgeDomainLabel}</span>
                  </span>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{selectedCall.outcome}</span>
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-[#1A1A1A] tracking-tight flex items-center gap-2 mt-1">
                  <span>{selectedCall.contactName}</span>
                  <span className="text-xs font-mono font-normal text-black/50">
                    ({selectedCall.contactPhone})
                  </span>
                </h3>

                <div className="flex items-center gap-3 text-xs text-black/60 flex-wrap">
                  <span>Agent: <strong className="text-indigo-900">{selectedCall.agentName}</strong></span>
                  <span>•</span>
                  <span>Duration: <strong className="font-mono text-black">{selectedCall.duration}</strong></span>
                  <span>•</span>
                  <span>Time: <strong>{selectedCall.timestamp}</strong></span>
                  <span>•</span>
                  <span>Source Doc: <strong className="font-mono text-indigo-700">{selectedCall.groundedDocTitle}</strong></span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCall(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-black/50 hover:text-black transition-colors cursor-pointer shrink-0"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Audio Waveform Player Control Bar */}
            <div className="px-6 py-4 bg-[#FAF8F3] border-b border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                    isPlayingAudio
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "bg-[#18181B] hover:bg-black text-white"
                  }`}
                >
                  {isPlayingAudio ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1A1A1A]">
                      {isPlayingAudio ? "Streaming Call Recording..." : "Telephony Voice Recording"}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.2 rounded-full font-bold">
                      Sub-140ms SLA
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-black/50 block">
                    Duration: {selectedCall.duration} • 16-bit PCM Audio
                  </span>
                </div>
              </div>

              {/* Animated Waveform Equalizer */}
              <div className="flex items-center gap-1.5 h-7 px-3 bg-white rounded-xl border border-black/[0.06]">
                {selectedCall.audioWaveLevels.map((lvl, idx) => (
                  <div
                    key={idx}
                    style={{
                      height: isPlayingAudio ? `${Math.max(20, lvl * Math.random() + 10)}%` : `${lvl}%`,
                    }}
                    className={`w-1 rounded-full transition-all duration-300 ${
                      isPlayingAudio
                        ? "bg-gradient-to-t from-indigo-600 to-rose-500 animate-pulse"
                        : "bg-black/20"
                    }`}
                  />
                ))}
              </div>

              {/* Speed Selectors & Export */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-black/[0.06]">
                  {(["1x", "1.25x", "1.5x", "2x"] as const).map((spd) => (
                    <button
                      key={spd}
                      type="button"
                      onClick={() => setAudioSpeed(spd)}
                      className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold cursor-pointer transition-all ${
                        audioSpeed === spd
                          ? "bg-[#18181B] text-white"
                          : "text-black/60 hover:text-black"
                      }`}
                    >
                      {spd}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleDownloadTranscriptText}
                  className="p-2 rounded-full bg-white hover:bg-black/5 border border-black/[0.08] text-black/60 hover:text-black transition-colors cursor-pointer"
                  title="Download transcript text"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex items-center justify-between px-6 py-2.5 bg-white border-b border-black/[0.06] shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveModalTab("transcript")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeModalTab === "transcript"
                      ? "bg-[#18181B] text-white shadow-2xs"
                      : "text-black/60 hover:text-black hover:bg-black/5"
                  }`}
                >
                  Turn-by-Turn Speech Dialogue ({selectedCall.transcript.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalTab("entities")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeModalTab === "entities"
                      ? "bg-[#18181B] text-white shadow-2xs"
                      : "text-indigo-900 bg-indigo-50/60 hover:bg-indigo-100 border border-indigo-200"
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>
                    Topics &amp; Extracted Entities (
                    {selectedCall.extractedEntities.phoneNumbers.length +
                      selectedCall.extractedEntities.emails.length +
                      selectedCall.extractedEntities.addresses.length +
                      selectedCall.extractedEntities.keyPoints.length +
                      selectedCall.extractedEntities.topics.length}
                    )
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModalTab("whatsapp")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeModalTab === "whatsapp"
                      ? "bg-[#18181B] text-white shadow-2xs"
                      : "text-black/60 hover:text-black hover:bg-black/5"
                  }`}
                >
                  WhatsApp Automated Dispatch
                </button>
              </div>

              {/* Actions Right */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleExportTopicClients(selectedCall.knowledgeDomain, "doc", [selectedCall])}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF8F3] hover:bg-[#FAF3E4] text-indigo-950 border border-indigo-200 cursor-pointer transition-all"
                  title="Download complete client dossier"
                >
                  <FileDown className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Export Dossier</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyTranscript}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FAF8F3] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.08] cursor-pointer transition-all"
                >
                  {copiedTranscript ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-black/50" />
                      <span>Copy Dialogue</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Modal Body Viewport */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* TAB 1: FULL DIALOGUE TRANSCRIPT */}
              {activeModalTab === "transcript" && (
                <div className="space-y-4">
                  {/* Search within transcript */}
                  <div className="relative max-w-sm">
                    <Search className="w-3.5 h-3.5 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter words inside transcript..."
                      value={transcriptSearch}
                      onChange={(e) => setTranscriptSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF8F3] border border-black/[0.08] rounded-full focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                  </div>

                  {/* Speech Bubbles */}
                  <div className="space-y-3.5">
                    {selectedCall.transcript
                      .filter((t) =>
                        transcriptSearch
                          ? t.text.toLowerCase().includes(transcriptSearch.toLowerCase())
                          : true
                      )
                      .map((turn) => {
                        const isAgent = turn.speaker === "agent";

                        return (
                          <div
                            key={turn.id}
                            className={`flex gap-3 max-w-3xl ${
                              isAgent ? "mr-auto" : "ml-auto flex-row-reverse"
                            }`}
                          >
                            {/* Avatar */}
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs ${
                                isAgent
                                  ? "bg-gradient-to-br from-indigo-600 to-rose-600 text-white"
                                  : "bg-[#FAF0D7] text-[#78350F] border border-[#FFD9A0]"
                              }`}
                            >
                              {isAgent ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>

                            {/* Bubble Card */}
                            <div
                              className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 shadow-2xs ${
                                isAgent
                                  ? "bg-white border-indigo-200/80 text-[#1A1A1A]"
                                  : "bg-[#FAF8F3] border-black/[0.08] text-[#1A1A1A]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-extrabold text-[11px] text-[#1A1A1A] flex items-center gap-1.5">
                                  <span>{turn.speakerName}</span>
                                  {isAgent && (
                                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-indigo-100 text-indigo-800">
                                      AI Voice
                                    </span>
                                  )}
                                </span>
                                <span className="font-mono text-[10px] text-black/45">
                                  {turn.time}
                                </span>
                              </div>

                              <p className="text-[12.5px] leading-relaxed">
                                {turn.text}
                              </p>

                              {/* Semantic Document Grounding Quote Citation */}
                              {turn.groundedDocCitation && (
                                <div className="mt-2 pt-2 border-t border-indigo-100 flex items-center gap-1.5 text-[11px] font-medium text-indigo-950 bg-indigo-50/70 p-2 rounded-xl">
                                  <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                  <span>Grounded: {turn.groundedDocCitation}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* TAB 2: TOPICS & EXTRACTED ENTITIES */}
              {activeModalTab === "entities" && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  {/* Top explanation with Topic Download Button */}
                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs font-extrabold text-indigo-950 flex items-center gap-1.5">
                        <Database className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Extracted Topics, Contact Entities &amp; Caller Key Points</span>
                      </span>
                      <p className="text-xs text-indigo-900/85 leading-relaxed">
                        Extracted live from speech turns and stored client-wise in the institutional Data Vault.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleExportTopicClients(selectedCall.knowledgeDomain, "csv", [selectedCall])}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50 cursor-pointer transition-colors shadow-2xs"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Client CSV</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleExportTopicClients(selectedCall.knowledgeDomain, "doc", [selectedCall])}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#18181B] text-white hover:bg-black cursor-pointer transition-colors shadow-xs"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Client Doc</span>
                      </button>
                    </div>
                  </div>

                  {/* 3 Contact Entity Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {/* Extracted Phone Numbers */}
                    <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A1A]">
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Phone Numbers</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.2 rounded-full">
                          {selectedCall.extractedEntities.phoneNumbers.length} Found
                        </span>
                      </div>

                      <div className="space-y-2">
                        {selectedCall.extractedEntities.phoneNumbers.map((phone, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-[#FAF8F3] border border-black/[0.06] flex items-center justify-between gap-2"
                          >
                            <div>
                              <span className="text-[10px] font-bold text-black/45 block">
                                {phone.label}
                              </span>
                              <span className="font-mono text-xs font-bold text-[#1A1A1A]">
                                {phone.value}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyEntity(phone.value, `modal-phone-${idx}`)}
                              className="p-1 rounded-md hover:bg-black/5 text-black/45 hover:text-black cursor-pointer transition-colors"
                              title="Copy"
                            >
                              {copiedEntityKey === `modal-phone-${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Extracted Emails */}
                    <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A1A]">
                          <Mail className="w-3.5 h-3.5 text-blue-600" />
                          <span>Email Addresses</span>
                        </div>
                        <span className="text-[10px] font-bold text-blue-800 bg-blue-100/70 px-2 py-0.2 rounded-full">
                          {selectedCall.extractedEntities.emails.length} Found
                        </span>
                      </div>

                      <div className="space-y-2">
                        {selectedCall.extractedEntities.emails.map((email, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-[#FAF8F3] border border-black/[0.06] flex items-center justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-black/45 block">
                                {email.label}
                              </span>
                              <span className="font-mono text-xs font-bold text-[#1A1A1A] truncate block">
                                {email.value}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyEntity(email.value, `modal-email-${idx}`)}
                              className="p-1 rounded-md hover:bg-black/5 text-black/45 hover:text-black cursor-pointer transition-colors shrink-0"
                              title="Copy"
                            >
                              {copiedEntityKey === `modal-email-${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Extracted Addresses */}
                    <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A1A]">
                          <MapPin className="w-3.5 h-3.5 text-purple-600" />
                          <span>Postal / Street Addresses</span>
                        </div>
                        <span className="text-[10px] font-bold text-purple-800 bg-purple-100/70 px-2 py-0.2 rounded-full">
                          {selectedCall.extractedEntities.addresses.length} Found
                        </span>
                      </div>

                      <div className="space-y-2">
                        {selectedCall.extractedEntities.addresses.map((addr, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-[#FAF8F3] border border-black/[0.06] flex items-start justify-between gap-2"
                          >
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-black/45 block">
                                {addr.label}
                              </span>
                              <p className="text-xs font-semibold text-[#1A1A1A] leading-relaxed">
                                {addr.street}
                              </p>
                              <span className="text-[11px] font-mono text-purple-900 font-bold block mt-0.5">
                                {addr.cityStatePincode}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyEntity(
                                  `${addr.street}, ${addr.cityStatePincode}`,
                                  `modal-addr-${idx}`
                                )
                              }
                              className="p-1 rounded-md hover:bg-black/5 text-black/45 hover:text-black cursor-pointer transition-colors shrink-0"
                              title="Copy"
                            >
                              {copiedEntityKey === `modal-addr-${idx}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Discussion Topics */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-black/[0.06] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A1A]">
                        <Tag className="w-3.5 h-3.5 text-amber-600" />
                        <span>Extracted Discussion Topics</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.2 rounded-full">
                        {selectedCall.extractedEntities.topics.length} Tags
                      </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {selectedCall.extractedEntities.topics.map((topic, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-[#1A1A1A] border border-black/[0.08] shadow-2xs flex items-center gap-1.5"
                        >
                          <span className="text-amber-600">#</span>
                          <span>{topic}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Points Extracted From Caller */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-black/[0.06] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#1A1A1A]">
                        <ListChecks className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Key Points &amp; Statements Extracted from Caller</span>
                      </div>
                      <span className="text-[10px] font-bold text-indigo-800 bg-indigo-100/80 px-2 py-0.2 rounded-full">
                        {selectedCall.extractedEntities.keyPoints.length} Points
                      </span>
                    </div>

                    <div className="space-y-2">
                      {selectedCall.extractedEntities.keyPoints.map((point, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white border border-black/[0.06] flex items-start gap-2.5 shadow-2xs"
                        >
                          <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CRM Parameters Grid */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-black/[0.06] space-y-2.5">
                    <span className="text-xs font-extrabold text-[#1A1A1A] block">
                      Data Vault Entity Parameters
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(selectedCall.extractedParameters).map(([key, val], idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white border border-black/[0.06] space-y-1 shadow-2xs"
                        >
                          <span className="text-[10px] font-bold uppercase tracking-wider text-black/45 block">
                            {key}
                          </span>
                          <div className="text-sm font-black text-[#1A1A1A]">
                            {val}
                          </div>
                          <span className="text-[10px] font-mono text-emerald-700 font-bold block pt-0.5">
                            ✓ Verified from audio stream
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: WHATSAPP AUTOMATION */}
              {activeModalTab === "whatsapp" && (
                <div className="space-y-4 animate-in fade-in duration-200 max-w-xl mx-auto">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-950">
                        WhatsApp Post-Call Automation Dispatched
                      </span>
                    </div>
                    <span className="text-[10.5px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                      Delivered &amp; Read
                    </span>
                  </div>

                  {/* Simulated WhatsApp Bubble */}
                  <div className="p-5 rounded-2xl bg-[#EFEAE2] border border-black/[0.08] shadow-sm space-y-3 font-sans">
                    <div className="bg-white p-4 rounded-2xl shadow-xs space-y-2 text-xs text-[#1A1A1A] leading-relaxed">
                      <p className="font-bold text-sm">
                        Hello {selectedCall.contactName}! 👋
                      </p>
                      <p>
                        Thank you for speaking with our AI Counselor <strong>{selectedCall.agentName}</strong> today regarding your inquiry.
                      </p>
                      <div className="p-3 bg-[#FAF8F3] rounded-xl border border-black/[0.06] space-y-1">
                        <span className="text-[10px] font-bold uppercase text-black/50 block">Session Summary:</span>
                        <p className="font-semibold">{selectedCall.summary}</p>
                      </div>
                      <p>
                        📄 Official Brochure &amp; Policy: <strong className="text-indigo-700 underline">{selectedCall.groundedDocTitle}</strong>
                      </p>
                      <p className="text-[11px] text-black/50 pt-1">
                        Dispatched via Swaram AI Automated Post-Call Gateway
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer Actions */}
            <div className="p-4 px-6 bg-[#FAF8F3] border-t border-black/[0.06] flex items-center justify-between shrink-0 flex-wrap gap-2">
              <span className="text-xs text-black/50 font-mono">
                Log Reference: {selectedCall.id} • Grounded in {selectedCall.knowledgeDomainLabel}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleExportTopicClients(selectedCall.knowledgeDomain, "doc", [selectedCall])}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white hover:bg-black/5 text-[#1A1A1A] border border-black/[0.08] cursor-pointer transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span>Download Client Dossier (.doc)</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadTranscriptText}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white hover:bg-black/5 text-[#1A1A1A] border border-black/[0.08] cursor-pointer transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Text Log</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCall(null)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-bold bg-[#18181B] hover:bg-black text-white shadow-xs cursor-pointer transition-all hover:scale-102"
                >
                  <span>Done</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Call Drawer Backup */}
      <CallDrawer
        call={drawerCompatibleCall}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </div>
  );
}

export default function CallHistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-[#64748B] text-xs">
          Loading Call History &amp; Speech Transcripts...
        </div>
      }
    >
      <CallHistoryPageContent />
    </Suspense>
  );
}
