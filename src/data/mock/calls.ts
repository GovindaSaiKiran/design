import { CallLog } from "@/types";

export const mockCalls: CallLog[] = [
  {
    id: "CALL-8921",
    callerNumber: "+91 98401 22340",
    callerName: "Rahul Verma",
    timestamp: "2026-09-08T18:42:00Z",
    timeFormatted: "18:42 Today",
    duration: "3m 04s",
    status: "completed",
    sentiment: "positive",
    courseInquired: "B.Tech Computer Science & Engineering",
    qualificationScore: 92,
    intent: "Fee Structure & NRI Quota Eligibility",
    transcriptPreview: "Rahul asked about 4-year tuition installments, merit scholarships for 94% board score, and hostel booking deadlines.",
    summary: "High-intent lead. Eligible for Tier-1 Merit Scholarship. Requested PDF brochure via WhatsApp and scheduled campus tour for Saturday.",
  },
  {
    id: "CALL-8920",
    callerNumber: "+91 81290 44512",
    callerName: "Ananya Deshmukh",
    timestamp: "2026-09-08T18:15:00Z",
    timeFormatted: "18:15 Today",
    duration: "2m 18s",
    status: "completed",
    sentiment: "high_interest",
    courseInquired: "MBA in FinTech & Business Analytics",
    qualificationScore: 88,
    intent: "CAT/GMAT Cutoffs & Placement Records",
    transcriptPreview: "Discussed median placement package (14.2 LPA), top recruiters in banking, and application round-2 deadlines.",
    summary: "Candidate holds 89 percentile in CAT. Maya answered all placement questions and sent application link directly to SMS.",
  },
  {
    id: "CALL-8919",
    callerNumber: "+91 94451 90871",
    callerName: "Dr. K. S. Murthy (Parent)",
    timestamp: "2026-09-08T17:50:00Z",
    timeFormatted: "17:50 Today",
    duration: "4m 12s",
    status: "escalated",
    sentiment: "needs_attention",
    courseInquired: "MBBS / Integrated Biomedical Sciences",
    qualificationScore: 95,
    intent: "Special Scholarship Appeal & Dean Review",
    transcriptPreview: "Parent requested special fee waiver consideration under state sports quota.",
    summary: "Escalated to Senior Admission Director Mr. Sharma with complete conversation brief and transcript context.",
    handoffReason: "Custom fee waiver request exceeding standard policy matrix",
  },
  {
    id: "CALL-8918",
    callerNumber: "+91 70123 88129",
    callerName: "Siddharth Nambiar",
    timestamp: "2026-09-08T17:22:00Z",
    timeFormatted: "17:22 Today",
    duration: "1m 45s",
    status: "completed",
    sentiment: "positive",
    courseInquired: "B.Des (User Experience & Interaction)",
    qualificationScore: 84,
    intent: "Portfolio Requirements & DAT Test Dates",
    transcriptPreview: "Clarified design aptitude test syllabus, online portfolio submission guidelines, and sample paper download.",
    summary: "Lead captured with verified email. Sent portfolio submission checklist.",
  },
  {
    id: "CALL-8917",
    callerNumber: "+91 98840 55102",
    callerName: "Tanya Sen",
    timestamp: "2026-09-08T16:58:00Z",
    timeFormatted: "16:58 Today",
    duration: "2m 50s",
    status: "completed",
    sentiment: "positive",
    courseInquired: "B.Sc Artificial Intelligence & Data Science",
    qualificationScore: 90,
    intent: "Hostel Facilities & AC Room Availability",
    transcriptPreview: "Answered questions on campus security, twin-sharing AC room pricing, and laptop hardware specifications.",
    summary: "Prospective outstation student. Downloaded hostel guide and marked for counselor campus tour.",
  }
];

export const simulatedMissedCalls = [
  { time: "21:32 Yesterday", phone: "+91 97110 •••••", course: "B.Tech CSE", status: "Missed (Pre-AI)", lostValue: "Est. $18,000 Tuition" },
  { time: "22:14 Yesterday", phone: "+91 98402 •••••", course: "MBA FinTech", status: "Missed (Pre-AI)", lostValue: "Est. $24,000 Tuition" },
  { time: "23:02 Yesterday", phone: "+91 80561 •••••", course: "B.Des Product", status: "Missed (Pre-AI)", lostValue: "Est. $16,500 Tuition" },
  { time: "01:47 Midnight", phone: "+91 94452 •••••", course: "B.Sc Biotech", status: "Missed (Pre-AI)", lostValue: "Est. $14,000 Tuition" },
  { time: "06:13 Morning", phone: "+91 70192 •••••", course: "B.Tech AI/ML", status: "Missed (Pre-AI)", lostValue: "Est. $18,000 Tuition" }
];

export const sampleTranscriptDialogue = [
  {
    id: 1,
    speaker: "MAYA",
    timestamp: "00:02",
    text: "Hello and welcome to Apex Institute of Technology Admissions! I am Maya, your AI admission counselor. How can I help you today?",
    intent: "Greeting & Intent Detection",
    sentiment: "neutral"
  },
  {
    id: 2,
    speaker: "RAHUL",
    timestamp: "00:09",
    text: "Hi Maya, I got 94% in my 12th CBSE boards. I want to know about B.Tech CSE fees and if I am eligible for any merit scholarship.",
    intent: "Fee Inquiry + Scholarship Eligibility",
    sentiment: "high_interest"
  },
  {
    id: 3,
    speaker: "MAYA",
    timestamp: "00:16",
    text: "Congratulations on your 94% score, Rahul! For B.Tech CSE, the annual tuition is $9,500. With 94% in CBSE, you qualify for our Chancellor's Merit Scholarship, which gives a 35% tuition waiver for all four years.",
    intent: "Grounding: Fee Matrix & Scholarship Policy 2026",
    sentiment: "positive"
  },
  {
    id: 4,
    speaker: "RAHUL",
    timestamp: "00:26",
    text: "That's wonderful! Is hostel accommodation included, or is that separate?",
    intent: "Hostel & Facilities Inquiry",
    sentiment: "positive"
  },
  {
    id: 5,
    speaker: "MAYA",
    timestamp: "00:32",
    text: "Hostel accommodation is separate. AC twin-sharing is $2,200 per year including meal plans and high-speed campus WiFi. Would you like me to WhatsApp you the detailed brochure and fee breakdown?",
    intent: "Proactive Lead Enrichment",
    sentiment: "positive"
  },
  {
    id: 6,
    speaker: "RAHUL",
    timestamp: "00:41",
    text: "Yes, please send it to this number! And can I visit the campus this Saturday?",
    intent: "Campus Visit Booking Request",
    sentiment: "very_high"
  },
  {
    id: 7,
    speaker: "MAYA",
    timestamp: "00:48",
    text: "I have booked your VIP Campus Tour for this Saturday, September 13th at 11:00 AM. Counselor Mr. Vikram will greet you at the Admissions Welcome Pavilion. The confirmation and pass are on their way to your phone!",
    intent: "Action Executed: Tour Booked & Lead Qualified",
    sentiment: "positive"
  }
];
