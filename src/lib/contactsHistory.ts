"use client";

import { ContactItem } from "@/types/dashboard";

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

export const INITIAL_PREVIOUS_USER_CONTACTS: StoredContact[] = [];

export const INITIAL_PREVIOUS_BATCHES: ContactBatchHistoryItem[] = [];

export const INITIAL_UNIFIED_CONTACTS: StoredContact[] = [];

// Call-Center Aggregated Volume Telemetry (starts clean with 0 metrics)
export const ENTERPRISE_CALL_CENTER_METRICS = {
  totalDirectoryContacts: 0,
  userHistoryCount: 0,
  highIntentCount: 0,
  followUpCount: 0,
  resolvedCount: 0,
  inboundCallsHandled: 0,
  outboundCallsHandled: 0,
  activePriChannels: 0,
  peakCallsPerHour: 0,
  averagePickupRate: "0%",
};

/**
 * Retrieve user-provided contacts history from localStorage
 */
export function getUserContactsHistory(): StoredContact[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONTACTS);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const clean = parsed.filter(
        (c: any) =>
          c &&
          c.id &&
          !c.id.startsWith("hist-") &&
          c.name !== "Rahul Sharma" &&
          c.name !== "Ananya Iyer" &&
          c.name !== "Vikram Singhania" &&
          c.name !== "Sunita Roy" &&
          c.name !== "Kavita Rao" &&
          c.name !== "Aditya Joshi"
      );
      if (clean.length !== parsed.length) {
        if (clean.length === 0) {
          localStorage.removeItem(STORAGE_KEY_CONTACTS);
        } else {
          localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(clean));
        }
      }
      return clean;
    }
    return [];
  } catch (err) {
    return [];
  }
}

/**
 * Retrieve contact batch history from localStorage
 */
export function getUserContactBatches(): ContactBatchHistoryItem[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BATCHES);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const clean = parsed.filter(
        (b: any) =>
          b &&
          b.id &&
          !b.id.startsWith("batch-outbound-") &&
          !b.id.startsWith("batch-csv-") &&
          !b.id.startsWith("batch-hostel-") &&
          !b.id.startsWith("batch-manual-walkins")
      );
      if (clean.length !== parsed.length) {
        if (clean.length === 0) {
          localStorage.removeItem(STORAGE_KEY_BATCHES);
        } else {
          localStorage.setItem(STORAGE_KEY_BATCHES, JSON.stringify(clean));
        }
      }
      return clean;
    }
    return [];
  } catch (err) {
    return [];
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
      const updated = [contact, ...current.filter((c) => c.phone !== contact.phone)];
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(updated));
    } catch (err) {
      console.error("Error saving user contact:", err);
    }
  }

  return contact;
}

/**
 * Save a batch of imported contacts (e.g. from CSV or Manual Multi-entry)
 */
export function saveUserContactBatch(params: {
  title: string;
  source: "csv_upload" | "manual_entry" | "outbound_cadence";
  agentAssigned?: string;
  contacts: Array<Omit<StoredContact, "id" | "addedAt">>;
  status?: "Active Cadence" | "Completed" | "Queued in Scheduler";
}): ContactBatchHistoryItem {
  const batchId = `batch-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const nowFormatted = "Today, " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const storedContacts: StoredContact[] = params.contacts.map((c, idx) => ({
    ...c,
    id: `cont-batch-${Date.now()}-${idx}`,
    addedAt: nowFormatted,
    batchId,
    source: (c.source as any) || (params.source === "csv_upload" ? "user_csv" : "user_manual"),
  }));

  const newBatch: ContactBatchHistoryItem = {
    id: batchId,
    title: params.title,
    timestamp: nowFormatted,
    count: storedContacts.length,
    source: params.source,
    agentAssigned: params.agentAssigned || "Maya (Admissions)",
    contacts: storedContacts,
    status: params.status || "Active Cadence",
    verifiedPercent: 100,
  };

  if (typeof window !== "undefined") {
    try {
      // 1. Update individual contacts registry
      const currentContacts = getUserContactsHistory();
      const existingPhones = new Set(currentContacts.map((c) => c.phone));
      const filteredNew = storedContacts.filter((c) => !existingPhones.has(c.phone));
      const updatedContacts = [...filteredNew, ...currentContacts];
      localStorage.setItem(STORAGE_KEY_CONTACTS, JSON.stringify(updatedContacts));

      // 2. Update batches ledger
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
 * Get unified list of user contacts
 */
export function getUnifiedContacts(): StoredContact[] {
  return getUserContactsHistory();
}
