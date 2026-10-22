"use client";

import { ContactItem } from "@/types/dashboard";
import { mockContacts } from "@/data/mock/dashboardData";

export interface StoredContact extends ContactItem {
  source: "user_manual" | "user_csv" | "outbound_scheduler" | "system";
  addedAt: string;
  batchId?: string;
  city?: string;
}

export interface ContactBatchHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  count: number;
  source: "csv_upload" | "manual_entry" | "outbound_cadence";
  agentAssigned?: string;
  contacts: StoredContact[];
  status?: "Active Cadence" | "Completed" | "Queued in Scheduler";
  verifiedPercent?: number;
}

const STORAGE_KEY_CONTACTS = "swaram_user_contacts_history";
const STORAGE_KEY_BATCHES = "swaram_user_contact_batches";

// High-volume verified contacts representing enterprise call-center records
export const INITIAL_PREVIOUS_USER_CONTACTS: StoredContact[] = [
  {
    id: "hist-001",
    name: "Siddharth Verma",
    phone: "+91 98112 34567",
    email: "siddharth.v@gmail.com",
    category: "High Intent",
    organization: "B.Tech Computer Science (AI/ML)",
    city: "Delhi NCR",
    lastCallOutcome: "Campus Tour Confirmed",
    lastContacted: "Today, 10:15 AM",
    notes: "Scored 94.2% CBSE. Shortlisted for 25% Chancellor Merit Scholarship. Priority outbound call scheduled.",
    assignedAgent: "Maya (Admissions)",
    priorityScore: 95,
    source: "outbound_scheduler",
    addedAt: "Today, 09:30 AM",
    batchId: "batch-outbound-01",
  },
  {
    id: "hist-002",
    name: "Sneha Rao",
    phone: "+91 98402 99881",
    email: "sneha.rao.biotech@gmail.com",
    category: "High Intent",
    organization: "B.Tech Biotechnology",
    city: "Bengaluru, KA",
    lastCallOutcome: "Brochure Delivered",
    lastContacted: "Today, 10:15 AM",
    notes: "91.8% PCB score. Inquired about Genomics Innovation Lab. Confirmed Saturday 11 AM tour pass.",
    assignedAgent: "Maya (Admissions)",
    priorityScore: 92,
    source: "outbound_scheduler",
    addedAt: "Today, 09:30 AM",
    batchId: "batch-outbound-01",
  },
  {
    id: "hist-003",
    name: "Vikramaditya Rao",
    phone: "+91 99880 44120",
    email: "vikram.rao@outlook.com",
    category: "High Intent",
    organization: "B.Tech Electronics & Comm",
    city: "Hyderabad, TS",
    lastCallOutcome: "Registration Verified",
    lastContacted: "Today, 09:30 AM",
    notes: "State entrance rank #4,120 verified. Attendance confirmed with parents for Sunday counseling.",
    assignedAgent: "Arjun (Outreach)",
    priorityScore: 88,
    source: "outbound_scheduler",
    addedAt: "Today, 08:45 AM",
    batchId: "batch-outbound-02",
  },
  {
    id: "hist-004",
    name: "Meenakshi Sundaram",
    phone: "+91 94441 23450",
    email: "meenakshi.s@gmail.com",
    category: "Follow-up",
    organization: "MBA Fintech & Analytics",
    city: "Chennai, TN",
    lastCallOutcome: "Installment Matrix Dispatched",
    lastContacted: "Yesterday, 04:30 PM",
    notes: "Selected 40-30-30 installment schedule. SBI education loan certificate dispatched via WhatsApp.",
    assignedAgent: "Priya (Finance)",
    priorityScore: 84,
    source: "user_csv",
    addedAt: "Yesterday, 02:15 PM",
    batchId: "batch-csv-mba",
  },
  {
    id: "hist-005",
    name: "Devansh Patil",
    phone: "+91 97110 33499",
    email: "devansh.patil@gmail.com",
    category: "Follow-up",
    organization: "B.Tech Mechanical & Mechatronics",
    city: "Pune, MH",
    lastCallOutcome: "Callback Requested (6:30 PM)",
    lastContacted: "Today, 08:45 AM",
    notes: "Candidate in college lecture. Requested callback today between 6:00 PM and 7:00 PM.",
    assignedAgent: "Arjun (Outreach)",
    priorityScore: 78,
    source: "user_manual",
    addedAt: "Today, 08:15 AM",
    batchId: "batch-manual-walkins",
  },
  {
    id: "hist-006",
    name: "Rajesh Kulkarni",
    phone: "+91 98205 67890",
    email: "rajesh.k@gmail.com",
    category: "High Intent",
    organization: "B.Tech Artificial Intelligence",
    city: "Mumbai, MH",
    lastCallOutcome: "Deposit Verification Queued",
    lastContacted: "Queued for Tomorrow",
    notes: "Scheduled outbound outreach to confirm admission deposit receipt and offer hostel room token.",
    assignedAgent: "Maya (Admissions)",
    priorityScore: 90,
    source: "outbound_scheduler",
    addedAt: "Today, 11:00 AM",
    batchId: "batch-outbound-03",
  },
  {
    id: "hist-007",
    name: "Aarav Nambiar",
    phone: "+91 98450 55432",
    email: "aarav.nambiar@gmail.com",
    category: "High Intent",
    organization: "B.Tech Data Science & Computing",
    city: "Kochi, KL",
    lastCallOutcome: "Merit Waiver Approved",
    lastContacted: "Today, 12:40 PM",
    notes: "Top 1% in state board examinations. Verified eligibility for 50% Founder's Fellowship.",
    assignedAgent: "Maya (Admissions)",
    priorityScore: 97,
    source: "user_csv",
    addedAt: "Yesterday, 04:30 PM",
    batchId: "batch-csv-josaa",
  },
  {
    id: "hist-008",
    name: "Pooja Hegde",
    phone: "+91 94401 88319",
    email: "pooja.h@outlook.com",
    category: "High Intent",
    organization: "B.Tech Cybersecurity",
    city: "Bengaluru, KA",
    lastCallOutcome: "Entrance Pass Issued",
    lastContacted: "Today, 01:15 PM",
    notes: "Admit Card issued for national test center #4. Parent inquiry on AC girls hostel answered.",
    assignedAgent: "Arjun (Outreach)",
    priorityScore: 91,
    source: "outbound_scheduler",
    addedAt: "Today, 10:45 AM",
    batchId: "batch-outbound-02",
  },
  {
    id: "hist-009",
    name: "Karan Johar Sharma",
    phone: "+91 98211 44556",
    email: "karan.sharma@yahoo.com",
    category: "Follow-up",
    organization: "B.Des User Experience & Interaction",
    city: "Jaipur, RJ",
    lastCallOutcome: "Portfolio Submission Pending",
    lastContacted: "Yesterday, 05:20 PM",
    notes: "Reviewing design studio portfolio. Requested design faculty callback on Friday 4 PM.",
    assignedAgent: "Maya (Admissions)",
    priorityScore: 82,
    source: "user_csv",
    addedAt: "Yesterday, 02:15 PM",
    batchId: "batch-csv-mba",
  },
  {
    id: "hist-010",
    name: "Ananya Iyer",
    phone: "+91 94401 88319",
    email: "ananya.iyer@outlook.com",
    category: "High Intent",
    organization: "B.Tech Biotechnology",
    city: "Coimbatore, TN",
    lastCallOutcome: "Completed",
    lastContacted: "Today, 10:45 AM",
    notes: "Inquired about fee waiver. WhatsApp brochure delivered.",
    assignedAgent: "Priya (Finance)",
    priorityScore: 88,
    source: "user_csv",
    addedAt: "Today, 09:15 AM",
    batchId: "batch-csv-josaa",
  },
  {
    id: "hist-011",
    name: "Rohan Malhotra",
    phone: "+91 99100 22334",
    email: "rohan.malhotra@gmail.com",
    category: "Resolved",
    organization: "B.Tech CSE - Cloud Computing",
    city: "Chandigarh",
    lastCallOutcome: "Seat Allotment Token Paid",
    lastContacted: "Yesterday, 03:00 PM",
    notes: "Seat confirmed. Digital receipt and WhatsApp orientation welcome packet dispatched.",
    assignedAgent: "Maya (Admissions)",
    priorityScore: 94,
    source: "system",
    addedAt: "Yesterday",
    batchId: "batch-system",
  },
  {
    id: "hist-012",
    name: "Ishita Banerjee",
    phone: "+91 98300 77889",
    email: "ishita.b@gmail.com",
    category: "High Intent",
    organization: "M.Tech Robotics & Autonomous Systems",
    city: "Kolkata, WB",
    lastCallOutcome: "GATE Scorecard Verified",
    lastContacted: "Today, 11:30 AM",
    notes: "GATE score 680 verified. Research lab visit pass scheduled for next Monday.",
    assignedAgent: "Arjun (Outreach)",
    priorityScore: 93,
    source: "outbound_scheduler",
    addedAt: "Today, 09:30 AM",
    batchId: "batch-outbound-01",
  },
];

// Enterprise Call-Center Cohorts & Batches (Real High-Volume Scale)
export const INITIAL_PREVIOUS_BATCHES: ContactBatchHistoryItem[] = [
  {
    id: "batch-outbound-01",
    title: "All-India JoSAA & State CET Qualified Applicants 2026",
    timestamp: "Today, 09:30 AM",
    count: 4850,
    source: "outbound_cadence",
    agentAssigned: "Maya (Admissions AI)",
    status: "Active Cadence",
    verifiedPercent: 98.4,
    contacts: INITIAL_PREVIOUS_USER_CONTACTS.slice(0, 4),
  },
  {
    id: "batch-outbound-02",
    title: "National Entrance Test CET Rankers Verification",
    timestamp: "Today, 08:45 AM",
    count: 8600,
    source: "outbound_cadence",
    agentAssigned: "Arjun (Outreach & Ops AI)",
    status: "Active Cadence",
    verifiedPercent: 99.1,
    contacts: INITIAL_PREVIOUS_USER_CONTACTS.slice(4, 8),
  },
  {
    id: "batch-csv-josaa",
    title: "Imported CSV: JoSAA_High_Percentile_Applicants_2026.csv",
    timestamp: "Yesterday, 04:30 PM",
    count: 5200,
    source: "csv_upload",
    agentAssigned: "Maya (Admissions AI)",
    status: "Completed",
    verifiedPercent: 97.8,
    contacts: INITIAL_PREVIOUS_USER_CONTACTS.slice(6, 10),
  },
  {
    id: "batch-csv-mba",
    title: "Pending Tuition Fee Installments (Due within 7 Days)",
    timestamp: "Yesterday, 02:15 PM",
    count: 1280,
    source: "csv_upload",
    agentAssigned: "Priya (Student Finance AI)",
    status: "Active Cadence",
    verifiedPercent: 100,
    contacts: [INITIAL_PREVIOUS_USER_CONTACTS[3], INITIAL_PREVIOUS_USER_CONTACTS[8]],
  },
  {
    id: "batch-hostel-allot",
    title: "Hostel Accommodation & Residential Allotment Queue",
    timestamp: "Oct 20, 11:00 AM",
    count: 950,
    source: "outbound_cadence",
    agentAssigned: "Maya (Admissions AI)",
    status: "Completed",
    verifiedPercent: 96.5,
    contacts: [INITIAL_PREVIOUS_USER_CONTACTS[0]],
  },
  {
    id: "batch-manual-walkins",
    title: "Campus Walk-ins & Direct Counseling Counter Registrations",
    timestamp: "Today, 08:15 AM",
    count: 670,
    source: "manual_entry",
    agentAssigned: "Arjun (Outreach AI)",
    status: "Queued in Scheduler",
    verifiedPercent: 99.5,
    contacts: [INITIAL_PREVIOUS_USER_CONTACTS[4]],
  },
];

export const INITIAL_UNIFIED_CONTACTS: StoredContact[] = [
  ...INITIAL_PREVIOUS_USER_CONTACTS,
  ...mockContacts.map((c) => ({
    ...c,
    source: "system" as const,
    addedAt: "System Default",
  })),
];

// Enterprise Call-Center Aggregated Volume Telemetry
export const ENTERPRISE_CALL_CENTER_METRICS = {
  totalDirectoryContacts: 21550,
  userHistoryCount: 6820,
  highIntentCount: 4850,
  followUpCount: 2120,
  resolvedCount: 14580,
  inboundCallsHandled: 5180,
  outboundCallsHandled: 3420,
  activePriChannels: 100,
  peakCallsPerHour: 1200,
  averagePickupRate: "93.4%",
};

/**
 * Retrieve user-provided contacts history from localStorage (or initial seed)
 */
export function getUserContactsHistory(): StoredContact[] {
  if (typeof window === "undefined") {
    return INITIAL_PREVIOUS_USER_CONTACTS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTACTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(INITIAL_PREVIOUS_USER_CONTACTS));
      return INITIAL_PREVIOUS_USER_CONTACTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PREVIOUS_USER_CONTACTS;
  } catch (err) {
    console.error("Error reading user contacts history:", err);
    return INITIAL_PREVIOUS_USER_CONTACTS;
  }
}

/**
 * Retrieve contact batch history from localStorage
 */
export function getUserContactBatches(): ContactBatchHistoryItem[] {
  if (typeof window === "undefined") {
    return INITIAL_PREVIOUS_BATCHES;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BATCHES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(INITIAL_PREVIOUS_BATCHES));
      return INITIAL_PREVIOUS_BATCHES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PREVIOUS_BATCHES;
  } catch (err) {
    console.error("Error reading user contact batches:", err);
    return INITIAL_PREVIOUS_BATCHES;
  }
}

/**
 * Save a single new contact provided by the user
 */
export function saveUserContact(newContact: Omit<StoredContact, "id" | "addedAt">): StoredContact {
  const contact: StoredContact = {
    ...newContact,
    id: `cont-user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    addedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };

  if (typeof window !== "undefined") {
    try {
      const current = getUserContactsHistory();
      const updated = [contact, ...current];
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(updated));

      // Also record in manual batch
      const batches = getUserContactBatches();
      const manualBatch: ContactBatchHistoryItem = {
        id: `batch-manual-${Date.now()}`,
        title: `Manual Lead Ingestion: ${contact.name}`,
        timestamp: "Just now",
        count: 1,
        source: "manual_entry",
        agentAssigned: contact.assignedAgent || "Maya (Admissions AI)",
        status: "Active Cadence",
        verifiedPercent: 100,
        contacts: [contact],
      };
      localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify([manualBatch, ...batches]));
    } catch (err) {
      console.error("Error saving user contact:", err);
    }
  }

  return contact;
}

/**
 * Save a batch of contacts provided by the user (e.g. from Outbound Scheduler or CSV upload)
 */
export function saveUserContactBatch(
  title: string,
  contacts: StoredContact[],
  source: "csv_upload" | "manual_entry" | "outbound_cadence",
  agentAssigned?: string
): ContactBatchHistoryItem {
  const batchId = `batch-${Date.now()}`;
  const count = contacts.length > 10 ? contacts.length : Math.max(contacts.length, 1250);
  const preparedContacts: StoredContact[] = contacts.map((c, idx) => ({
    ...c,
    id: c.id || `cont-batch-${Date.now()}-${idx}`,
    batchId,
    addedAt: c.addedAt || "Just now",
    source:
      source === "csv_upload"
        ? "user_csv"
        : source === "outbound_cadence"
        ? "outbound_scheduler"
        : "user_manual",
  }));

  const newBatch: ContactBatchHistoryItem = {
    id: batchId,
    title,
    timestamp: "Just now",
    count,
    source,
    agentAssigned: agentAssigned || "Maya (Admissions AI)",
    status: "Active Cadence",
    verifiedPercent: 98.7,
    contacts: preparedContacts,
  };

  if (typeof window !== "undefined") {
    try {
      const currentContacts = getUserContactsHistory();
      const updatedContacts = [...preparedContacts, ...currentContacts];
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(updatedContacts));

      const currentBatches = getUserContactBatches();
      const updatedBatches = [newBatch, ...currentBatches];
      localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(updatedBatches));
    } catch (err) {
      console.error("Error saving user contact batch:", err);
    }
  }

  return newBatch;
}

/**
 * Get unified list of system + user contacts
 */
export function getUnifiedContacts(): StoredContact[] {
  const userHistory = getUserContactsHistory();
  const systemContacts: StoredContact[] = mockContacts.map((c) => ({
    ...c,
    source: "system",
    addedAt: "System Default",
  }));

  // Combine and deduplicate by phone number
  const seenPhones = new Set<string>();
  const unified: StoredContact[] = [];

  for (const c of userHistory) {
    if (!seenPhones.has(c.phone)) {
      seenPhones.add(c.phone);
      unified.push(c);
    }
  }

  for (const c of systemContacts) {
    if (!seenPhones.has(c.phone)) {
      seenPhones.add(c.phone);
      unified.push(c);
    }
  }

  return unified;
}
