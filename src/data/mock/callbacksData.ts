import { NotificationItem } from "@/types/dashboard";

export interface CallbackItem {
  id: string;
  contactName: string;
  phone: string;
  email?: string;
  city: string;
  course: string;
  
  // 1. Which Agent
  agentId: string;
  agentName: string;
  agentAvatar: string;
  agentRole: string;
  agentBadgeColor: string;
  
  // 2. Which Topic
  topicId: string;
  topicName: string;
  topicCategory: "Admissions" | "Finance & Fees" | "Hostel & Facilities" | "Verification & Portal";
  
  // 3. Same Group / Dataset / Cohort
  datasetBatchId: string;
  datasetBatchTitle: string;
  
  // 4. When Scheduled
  scheduledWindow: string;
  scheduledExactTime: string;
  countdownLabel: string;
  isOverdue?: boolean;
  
  // Reschedule & Manual Scheduling Tracking
  rescheduleCount?: number;
  lastRescheduledBy?: "Agent" | "User" | "System";
  lastRescheduledReason?: string;
  rescheduledAt?: string;
  originalScheduledTime?: string;
  
  // 5. Why Queued
  whyQueued: string;
  queuedTrigger: "Candidate Requested" | "Automated Retry (Busy Line)" | "Post-WhatsApp Followup" | "Special Exception Escalation" | "Doc Verification Sync Issue";
  
  // 6. Any Human Interaction Needed
  humanInteractionNeeded: boolean;
  humanInteractionReason?: string;
  humanAssignee?: string;
  
  priority: "Urgent" | "High" | "Normal";
  status: "Pending" | "Completed" | "Rescheduled" | "Cancelled";
  sourceCallId: string;
  createdAt: string;
  notes?: string;
}

export const initialCallbacks: CallbackItem[] = [
  {
    id: "cb-001",
    contactName: "Devansh Patil",
    phone: "+91 97110 33499",
    email: "devansh.patil@gmail.com",
    city: "Mumbai, MH",
    course: "MBA Fintech & Analytics",
    agentId: "agent-arjun",
    agentName: "Arjun (Outreach & Ops AI)",
    agentAvatar: "A",
    agentRole: "Outbound Lead Verification & Ops",
    agentBadgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    topicId: "topic-admissions-mba",
    topicName: "MBA GD/PI Schedule & Entrance Cutoffs",
    topicCategory: "Admissions",
    datasetBatchId: "batch-outbound-01",
    datasetBatchTitle: "All-India JoSAA & State CET Qualified Applicants 2026 (Batch OUT-01)",
    scheduledWindow: "Today, 06:30 PM (Evening Slot)",
    scheduledExactTime: "Today at 06:30 PM",
    countdownLabel: "In 45 mins",
    isOverdue: false,
    rescheduleCount: 1,
    lastRescheduledBy: "Agent",
    lastRescheduledReason: "Maya AI: Candidate was attending university lecture during morning cadence; auto-moved to evening slot",
    rescheduledAt: "Today, 09:18 AM",
    originalScheduledTime: "Today at 09:15 AM",
    whyQueued: "Candidate was attending a university lecture during morning outbound cadence; requested evening slot between 6:00 PM and 7:00 PM.",
    queuedTrigger: "Candidate Requested",
    humanInteractionNeeded: false,
    priority: "High",
    status: "Pending",
    sourceCallId: "call-005",
    createdAt: "Today, 09:15 AM",
    notes: "Candidate has 94.2% percentile; confirm attendance for Saturday interview slot.",
  },
  {
    id: "cb-002",
    contactName: "Sneha Reddy",
    phone: "+91 94401 55620",
    email: "sneha.reddy@gmail.com",
    city: "Hyderabad, TS",
    course: "B.Tech Computer Science (AI/ML)",
    agentId: "agent-maya",
    agentName: "Maya (Admissions AI)",
    agentAvatar: "M",
    agentRole: "Senior Admissions Counseling Concierge",
    agentBadgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    topicId: "topic-admissions-waiver",
    topicName: "B.Tech CSE Admissions & 35% Chancellor Waiver",
    topicCategory: "Admissions",
    datasetBatchId: "batch-outbound-01",
    datasetBatchTitle: "All-India JoSAA & State CET Qualified Applicants 2026 (Batch OUT-01)",
    scheduledWindow: "Today, 07:15 PM",
    scheduledExactTime: "Today at 07:15 PM",
    countdownLabel: "In 1h 30m",
    isOverdue: false,
    rescheduleCount: 0,
    originalScheduledTime: "Today at 07:15 PM",
    whyQueued: "Candidate was in coaching class; requested evening callback to confirm seat reservation token payment with parents.",
    queuedTrigger: "Candidate Requested",
    humanInteractionNeeded: false,
    priority: "High",
    status: "Pending",
    sourceCallId: "call-001",
    createdAt: "Today, 10:20 AM",
    notes: "PCM score 95.4% verified against CBSE master database.",
  },
  {
    id: "cb-003",
    contactName: "Meera Krishnan",
    phone: "+91 98210 55678",
    email: "meera.krishnan@outlook.com",
    city: "Bengaluru, KA",
    course: "B.Tech Electronics & Comm",
    agentId: "agent-counselor-desk",
    agentName: "Senior Counselor Desk (Human Handoff)",
    agentAvatar: "H",
    agentRole: "Dean of Admissions & Athletics Director",
    agentBadgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    topicId: "topic-sports-quota",
    topicName: "Sports Quota 25% Fee Concession Appeal",
    topicCategory: "Admissions",
    datasetBatchId: "batch-outbound-01",
    datasetBatchTitle: "All-India JoSAA & State CET Qualified Applicants 2026 (Batch OUT-01)",
    scheduledWindow: "Today, 05:30 PM",
    scheduledExactTime: "Today at 05:30 PM",
    countdownLabel: "Next up (In 15 mins)",
    isOverdue: false,
    rescheduleCount: 0,
    originalScheduledTime: "Today at 05:30 PM",
    whyQueued: "Candidate holds State-level badminton championship medal; requested special 25% sports quota fee concession appeal exceeding standard AI waiver rule.",
    queuedTrigger: "Special Exception Escalation",
    humanInteractionNeeded: true,
    humanInteractionReason: "Athletic director and Dean sign-off required for non-standard 25% sports quota concession.",
    humanAssignee: "Mr. R. Sharma (Athletic Director)",
    priority: "Urgent",
    status: "Pending",
    sourceCallId: "call-004",
    createdAt: "Today, 11:45 AM",
    notes: "Certificate PDF received and uploaded to candidate dossier APX-7741.",
  },
  {
    id: "cb-004",
    contactName: "Kavita Deshmukh",
    phone: "+91 98230 11944",
    email: "kavita.deshmukh@yahoo.com",
    city: "Pune, MH",
    course: "B.Tech Computer Science",
    agentId: "agent-priya",
    agentName: "Priya (Student Finance AI)",
    agentAvatar: "P",
    agentRole: "Scholarship & Fee Specialist",
    agentBadgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    topicId: "topic-fees-installment",
    topicName: "Tuition Fee 3-Part Installment & WhatsApp Matrix",
    topicCategory: "Finance & Fees",
    datasetBatchId: "batch-csv-mba",
    datasetBatchTitle: "Pending Tuition Fee Installments (Batch CSV-MBA)",
    scheduledWindow: "Today, 05:00 PM - 06:00 PM",
    scheduledExactTime: "Today at 05:00 PM",
    countdownLabel: "In 10 mins",
    isOverdue: false,
    rescheduleCount: 1,
    lastRescheduledBy: "User",
    lastRescheduledReason: "Manual Counselor adjustment: Parent requested post-office hours callback to review loan collateral",
    rescheduledAt: "Today, 11:00 AM",
    originalScheduledTime: "Today at 02:00 PM",
    whyQueued: "Parent requested callback after office hours to review 3-part quarterly installment schedule and bank education loan collateral rules.",
    queuedTrigger: "Post-WhatsApp Followup",
    humanInteractionNeeded: false,
    priority: "Normal",
    status: "Pending",
    sourceCallId: "call-002",
    createdAt: "Today, 10:45 AM",
    notes: "WhatsApp installment breakdown dispatched successfully at 10:48 AM.",
  },
  {
    id: "cb-005",
    contactName: "Amitabh Banerjee",
    phone: "+91 98301 44512",
    email: "amitabh.b@gmail.com",
    city: "Kolkata, WB",
    course: "B.Tech Artificial Intelligence",
    agentId: "agent-counselor-desk",
    agentName: "Finance Officer Desk (Human Handoff)",
    agentAvatar: "F",
    agentRole: "Student Accounts & Loan Compliance",
    agentBadgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    topicId: "topic-fees-loan",
    topicName: "SBI Education Loan Sanction Letter Endorsement",
    topicCategory: "Finance & Fees",
    datasetBatchId: "batch-csv-mba",
    datasetBatchTitle: "Pending Tuition Fee Installments (Batch CSV-MBA)",
    scheduledWindow: "Tomorrow, 10:30 AM",
    scheduledExactTime: "Tomorrow at 10:30 AM",
    countdownLabel: "Tomorrow 10:30 AM",
    isOverdue: false,
    rescheduleCount: 0,
    originalScheduledTime: "Tomorrow at 10:30 AM",
    whyQueued: "SBI Loan Officer requested university seal and authorized finance officer countersignature on provisional fee estimation letter.",
    queuedTrigger: "Special Exception Escalation",
    humanInteractionNeeded: true,
    humanInteractionReason: "Physical / digital university seal & finance officer countersignature required on SBI Loan Annexure-IV.",
    humanAssignee: "Finance Officer Mehta",
    priority: "Urgent",
    status: "Pending",
    sourceCallId: "call-002",
    createdAt: "Today, 02:15 PM",
    notes: "Candidate has paid 10% token deposit; needs loan endorsement to disburse tuition balance.",
  },
  {
    id: "cb-006",
    contactName: "Rohan Sen",
    phone: "+91 98201 77412",
    email: "rohan.sen@gmail.com",
    city: "Mumbai, MH",
    course: "B.Tech Mechanical Engg",
    agentId: "agent-maya",
    agentName: "Maya (Admissions AI)",
    agentAvatar: "M",
    agentRole: "Senior Admissions Counseling Concierge",
    agentBadgeColor: "bg-orange-50 text-orange-700 border-orange-200",
    topicId: "topic-hostel-room",
    topicName: "AC Twin Hostel Allotment & Dining Package",
    topicCategory: "Hostel & Facilities",
    datasetBatchId: "batch-hostel-allot",
    datasetBatchTitle: "Hostel Accommodation Allotment Queue (Batch HOSTEL-01)",
    scheduledWindow: "Today, 06:00 PM",
    scheduledExactTime: "Today at 06:00 PM",
    countdownLabel: "In 35 mins",
    isOverdue: false,
    rescheduleCount: 2,
    lastRescheduledBy: "Agent",
    lastRescheduledReason: "Maya AI: Auto-rescheduled after WhatsApp hostel brochure delivered to allow student room selection",
    rescheduledAt: "Today, 11:15 AM",
    originalScheduledTime: "Today at 10:00 AM",
    whyQueued: "Candidate requested automated callback to finalize AC room selection in Block C and confirm vegetarian dining meal plan.",
    queuedTrigger: "Post-WhatsApp Followup",
    humanInteractionNeeded: false,
    priority: "Normal",
    status: "Pending",
    sourceCallId: "call-003",
    createdAt: "Today, 11:10 AM",
    notes: "Hostel brochure delivered on WhatsApp. 12 AC twin rooms remaining in Block C.",
  },
  {
    id: "cb-007",
    contactName: "Siddharth Verma",
    phone: "+91 98112 34567",
    email: "siddharth.v@gmail.com",
    city: "Delhi NCR",
    course: "B.Tech Computer Science",
    agentId: "agent-counselor-desk",
    agentName: "Residential Warden Desk (Human Handoff)",
    agentAvatar: "W",
    agentRole: "Campus Living & Residential Warden",
    agentBadgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    topicId: "topic-hostel-special",
    topicName: "Ground Floor Accessibility Accommodation Request",
    topicCategory: "Hostel & Facilities",
    datasetBatchId: "batch-hostel-allot",
    datasetBatchTitle: "Hostel Accommodation Allotment Queue (Batch HOSTEL-01)",
    scheduledWindow: "Tomorrow, 11:00 AM",
    scheduledExactTime: "Tomorrow at 11:00 AM",
    countdownLabel: "Tomorrow 11:00 AM",
    isOverdue: false,
    rescheduleCount: 1,
    lastRescheduledBy: "User",
    lastRescheduledReason: "Warden Desk Manual: Scheduled for tomorrow 11 AM when Chief Warden is in chamber",
    rescheduledAt: "Today, 01:30 PM",
    originalScheduledTime: "Today at 03:00 PM",
    whyQueued: "Candidate has sports knee ligament recovery requiring ground-floor ramp accessibility; requires Chief Warden room allotment authorization.",
    queuedTrigger: "Special Exception Escalation",
    humanInteractionNeeded: true,
    humanInteractionReason: "Chief Warden manual room allocation override required for medical accessibility ground-floor unit.",
    humanAssignee: "Chief Warden Dr. Swamy",
    priority: "High",
    status: "Pending",
    sourceCallId: "call-001",
    createdAt: "Today, 01:20 PM",
    notes: "Medical prescription verified. Ground floor Block A unit 104 reserved conditionally.",
  },
  {
    id: "cb-008",
    contactName: "Ananya Sharma",
    phone: "+91 97184 10293",
    email: "ananya.sharma@gmail.com",
    city: "Gurugram, HR",
    course: "B.Tech Data Science",
    agentId: "agent-arjun",
    agentName: "Arjun (Outreach & Ops AI)",
    agentAvatar: "A",
    agentRole: "Outbound Lead Verification & Ops",
    agentBadgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    topicId: "topic-verification-portal",
    topicName: "DigiLocker Marksheet Verification Sync Issue",
    topicCategory: "Verification & Portal",
    datasetBatchId: "batch-outbound-02",
    datasetBatchTitle: "National Entrance Test CET Rankers Verification (Batch OUT-02)",
    scheduledWindow: "Today, 05:45 PM",
    scheduledExactTime: "Today at 05:45 PM",
    countdownLabel: "In 25 mins",
    isOverdue: false,
    rescheduleCount: 1,
    lastRescheduledBy: "Agent",
    lastRescheduledReason: "Arjun AI: Auto-rescheduled after DigiLocker OAuth timeout to give candidate time to upload PDF",
    rescheduledAt: "Today, 02:45 PM",
    originalScheduledTime: "Today at 02:40 PM",
    whyQueued: "DigiLocker API OAuth sync timed out during morning registration; candidate manually re-uploaded 12th marksheet PDF and requested automated clearance confirmation.",
    queuedTrigger: "Doc Verification Sync Issue",
    humanInteractionNeeded: false,
    priority: "High",
    status: "Pending",
    sourceCallId: "call-003",
    createdAt: "Today, 02:40 PM",
    notes: "Re-trigger DigiLocker verification webhook upon call initiation.",
  },
  {
    id: "cb-009",
    contactName: "Vikramaditya Rao",
    phone: "+91 99880 44120",
    email: "vikram.rao@outlook.com",
    city: "Hyderabad, TS",
    course: "B.Tech Electronics & Comm",
    agentId: "agent-arjun",
    agentName: "Arjun (Outreach & Ops AI)",
    agentAvatar: "A",
    agentRole: "Outbound Lead Verification & Ops",
    agentBadgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    topicId: "topic-cet-counseling",
    topicName: "State CET Rank Verification & Slot Reschedule",
    topicCategory: "Verification & Portal",
    datasetBatchId: "batch-outbound-02",
    datasetBatchTitle: "National Entrance Test CET Rankers Verification (Batch OUT-02)",
    scheduledWindow: "Yesterday, 04:30 PM",
    scheduledExactTime: "Yesterday at 04:30 PM",
    countdownLabel: "Completed",
    isOverdue: false,
    rescheduleCount: 1,
    lastRescheduledBy: "Agent",
    lastRescheduledReason: "Arjun AI: Moved from Sunday 11 AM to Monday 2 PM per candidate board exam schedule",
    rescheduledAt: "Yesterday, 02:00 PM",
    originalScheduledTime: "Sunday at 11:00 AM",
    whyQueued: "Candidate requested slot change from Sunday 11 AM to Monday 2 PM due to state board practicals.",
    queuedTrigger: "Candidate Requested",
    humanInteractionNeeded: false,
    priority: "Normal",
    status: "Completed",
    sourceCallId: "call-003",
    createdAt: "Yesterday, 02:00 PM",
    notes: "Counseling slot rescheduled to Monday 2:00 PM. Confirmed by Arjun AI.",
  },
];

/**
 * Filter all callbacks that require human interaction and are still pending action
 */
export function getHumanActionCallbacks(list: CallbackItem[] = initialCallbacks): CallbackItem[] {
  return list.filter((cb) => cb.humanInteractionNeeded && cb.status === "Pending");
}

/**
 * Transform a human-action callback into an actionable NotificationItem
 */
export function callbackToNotification(cb: CallbackItem): NotificationItem {
  const isUrgent = cb.priority === "Urgent";
  return {
    id: `notif-cb-${cb.id}`,
    type: "callback",
    title: `Human Action Needed: ${cb.contactName}`,
    message: `${cb.phone} • ${cb.course} — ${cb.humanInteractionReason || cb.whyQueued}`,
    timestamp: cb.scheduledExactTime.includes("Today") ? "Scheduled Today" : "Pending Action",
    read: false,
    severity: isUrgent ? "error" : "warning",
    actionUrl: `/dashboard/callbacks?id=${cb.id}&filter=human`,
    callbackId: cb.id,
    contactName: cb.contactName,
    humanInteractionReason: cb.humanInteractionReason || cb.whyQueued,
  };
}
