import fs from "fs/promises";
import path from "path";
import { ScheduledCampaign, ScheduledContact, ExecutionLogItem, ScheduleStatus, ContactCallStatus } from "@/types/schedule";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "schedules.json");

// In-memory cache + lock
let memoryCache: ScheduledCampaign[] | null = null;
let isWriting = false;

// Initial seed data if file doesn't exist
const initialSeedSchedules: ScheduledCampaign[] = [
  {
    id: "sched-001",
    workspaceId: "ws-apex-global",
    name: "Early Bird Merit Scholarship Verification Cadence",
    status: "scheduled",
    callingMode: "bulk",
    scheduleType: "later",
    // Set to 2 hours in future from current time for a clean scheduled state
    scheduledAtUtc: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    timezone: "Asia/Kolkata",
    localScheduledTime: "Today, 04:30 PM IST",
    callingWindow: {
      startHour: 9,
      endHour: 19,
      concurrencyLimit: 20,
      pacingDelaySec: 2,
    },
    config: {
      agentId: "agent-maya",
      agentName: "Maya — Admissions & Student Concierge",
      language: "Hindi + English (Auto Code-Switching)",
      voiceName: "Ritu (North Indian Warm)",
      voiceAccent: "Authentic North Indian Hindi & Indian English",
      callObjective: "Verify Class 12 board percentage and confirm 35% Chancellor Merit Scholarship eligibility.",
      instructions: "Greet the candidate by name. Verify if board score is >=90%. Answer fee installment queries. Book Saturday 11 AM campus visit.",
      openingScript: "Hello {name}, I am Maya calling from Apex Global Institutions regarding your scholarship verification.",
      customContext: {
        campaignBatch: "Merit-Verification-Q4",
        scholarshipSlab: "35%",
      },
    },
    contacts: [
      {
        id: "c-001",
        name: "Rahul Sharma",
        phone: "+919840122345",
        email: "rahul.sharma@gmail.com",
        organization: "B.Tech Computer Science (AI/ML)",
        status: "pending",
        attempts: 0,
      },
      {
        id: "c-002",
        name: "Ananya Iyer",
        phone: "+919440188319",
        email: "ananya.iyer@outlook.com",
        organization: "B.Tech Biotechnology",
        status: "pending",
        attempts: 0,
      },
      {
        id: "c-003",
        name: "Devansh Patil",
        phone: "+919711033499",
        email: "devansh.patil@gmail.com",
        organization: "MBA General Management",
        status: "pending",
        attempts: 0,
      },
      {
        id: "c-004",
        name: "Meera Krishnan",
        phone: "+919821055678",
        email: "meera.k@gmail.com",
        organization: "B.Tech Electronics & Communication",
        status: "pending",
        attempts: 0,
      },
    ],
    stats: {
      totalContacts: 4,
      completedCount: 0,
      noAnswerCount: 0,
      failedCount: 0,
      skippedCount: 0,
      progressPercent: 0,
    },
    suppressionChecked: true,
    createdBy: "admin@swaram.ai",
    createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000).toISOString(),
    logs: [
      {
        id: "log-seed-1",
        timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
        level: "info",
        message: "Scheduled campaign created and queued for automated dispatch.",
      },
    ],
  },
  {
    id: "sched-002",
    workspaceId: "ws-apex-global",
    name: "JoSAA Round 1 Seat Allocation Follow-up",
    status: "completed",
    callingMode: "normal",
    scheduleType: "later",
    scheduledAtUtc: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    timezone: "Asia/Kolkata",
    localScheduledTime: "Yesterday, 10:00 AM IST",
    callingWindow: {
      startHour: 9,
      endHour: 19,
      concurrencyLimit: 25,
      pacingDelaySec: 2,
    },
    config: {
      agentId: "agent-arjun",
      agentName: "Arjun — Technical Support & Verification",
      language: "English + Hinglish",
      voiceName: "Vikram (Pan-Indian Corporate)",
      callObjective: "Confirm acceptance of provisional allotment letter and document submission.",
      instructions: "Confirm candidate details and provide counseling desk helpdesk link.",
      openingScript: "Hello {name}, calling from Admissions regarding your JoSAA seat allotment.",
    },
    contacts: [
      {
        id: "c-005",
        name: "Karan Malhotra",
        phone: "+919811234567",
        status: "completed",
        attempts: 1,
        callSid: "EXO-99120391",
        executedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        durationSeconds: 114,
      },
      {
        id: "c-006",
        name: "Sanya Gupta",
        phone: "+919876543210",
        status: "completed",
        attempts: 1,
        callSid: "EXO-99120392",
        executedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        durationSeconds: 88,
      },
      {
        id: "c-007",
        name: "Vikramaditya Rao",
        phone: "+919988044120",
        status: "no-answer",
        attempts: 2,
        failureReason: "User Unreachable (Ringing Timeout 45s)",
        executedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    stats: {
      totalContacts: 3,
      completedCount: 2,
      noAnswerCount: 1,
      failedCount: 0,
      skippedCount: 0,
      progressPercent: 100,
    },
    suppressionChecked: true,
    createdBy: "admin@swaram.ai",
    createdAt: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
    startedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    completedAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
    logs: [
      {
        id: "log-seed-2",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        level: "info",
        message: "Batch execution triggered by backend scheduler worker.",
      },
      {
        id: "log-seed-3",
        timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
        level: "success",
        message: "Campaign completed. 2 completed, 1 no-answer.",
      },
    ],
  },
];

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DATA_FILE);
    } catch {
      // File doesn't exist, write initial seed
      await fs.writeFile(DATA_FILE, JSON.stringify(initialSeedSchedules, null, 2), "utf-8");
      memoryCache = [...initialSeedSchedules];
    }
  } catch (err) {
    console.error("[ScheduleStore] Error ensuring data file:", err);
  }
}

async function readFromDisk(): Promise<ScheduledCampaign[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    memoryCache = parsed;
    return parsed;
  } catch (err) {
    console.error("[ScheduleStore] Failed to read data file, using memory cache:", err);
    return memoryCache || initialSeedSchedules;
  }
}

async function writeToDisk(data: ScheduledCampaign[]): Promise<void> {
  memoryCache = data;
  if (isWriting) {
    // Retry shortly if another write is finishing
    setTimeout(() => writeToDisk(data), 50);
    return;
  }
  isWriting = true;
  try {
    await ensureDataFile();
    const tempFile = `${DATA_FILE}.tmp`;
    await fs.writeFile(tempFile, JSON.stringify(data, null, 2), "utf-8");
    await fs.rename(tempFile, DATA_FILE);
  } catch (err) {
    console.error("[ScheduleStore] Failed to write data file:", err);
  } finally {
    isWriting = false;
  }
}

export const scheduleStore = {
  async getAll(workspaceId?: string): Promise<ScheduledCampaign[]> {
    const all = await readFromDisk();
    if (workspaceId) {
      return all.filter((s) => s.workspaceId === workspaceId);
    }
    return all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getById(id: string): Promise<ScheduledCampaign | null> {
    const all = await readFromDisk();
    return all.find((s) => s.id === id) || null;
  },

  async create(campaign: ScheduledCampaign): Promise<ScheduledCampaign> {
    const all = await readFromDisk();
    // Prepend new schedule
    const updated = [campaign, ...all.filter((s) => s.id !== campaign.id)];
    await writeToDisk(updated);
    return campaign;
  },

  async update(id: string, patch: Partial<ScheduledCampaign>): Promise<ScheduledCampaign | null> {
    const all = await readFromDisk();
    const index = all.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const existing = all[index];
    const updated: ScheduledCampaign = {
      ...existing,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    all[index] = updated;
    await writeToDisk(all);
    return updated;
  },

  async updateStatus(
    id: string,
    status: ScheduleStatus,
    details?: { cancelReason?: string; startedAt?: string; completedAt?: string }
  ): Promise<ScheduledCampaign | null> {
    const all = await readFromDisk();
    const index = all.findIndex((s) => s.id === id);
    if (index === -1) return null;

    const existing = all[index];
    const updated: ScheduledCampaign = {
      ...existing,
      status,
      updatedAt: new Date().toISOString(),
      ...(details?.cancelReason ? { cancelReason: details.cancelReason, cancelledAt: new Date().toISOString() } : {}),
      ...(details?.startedAt ? { startedAt: details.startedAt } : {}),
      ...(details?.completedAt ? { completedAt: details.completedAt } : {}),
    };

    all[index] = updated;
    await writeToDisk(all);
    return updated;
  },

  async updateContactCall(
    scheduleId: string,
    contactId: string,
    update: {
      status: ContactCallStatus;
      callSid?: string;
      failureReason?: string;
      executedAt?: string;
      durationSeconds?: number;
    }
  ): Promise<ScheduledCampaign | null> {
    const all = await readFromDisk();
    const camp = all.find((s) => s.id === scheduleId);
    if (!camp) return null;

    const contact = camp.contacts.find((c) => c.id === contactId);
    if (!contact) return null;

    contact.status = update.status;
    contact.attempts = (contact.attempts || 0) + 1;
    if (update.callSid) contact.callSid = update.callSid;
    if (update.failureReason) contact.failureReason = update.failureReason;
    if (update.executedAt) contact.executedAt = update.executedAt;
    if (update.durationSeconds !== undefined) contact.durationSeconds = update.durationSeconds;

    // Recalculate stats
    const total = camp.contacts.length;
    const completed = camp.contacts.filter((c) => c.status === "completed").length;
    const noAnswer = camp.contacts.filter((c) => c.status === "no-answer").length;
    const failed = camp.contacts.filter((c) => c.status === "failed").length;
    const skipped = camp.contacts.filter((c) => c.status === "skipped").length;
    const processed = completed + noAnswer + failed + skipped;

    camp.stats = {
      totalContacts: total,
      completedCount: completed,
      noAnswerCount: noAnswer,
      failedCount: failed,
      skippedCount: skipped,
      progressPercent: total > 0 ? Math.round((processed / total) * 100) : 0,
    };
    camp.updatedAt = new Date().toISOString();

    await writeToDisk(all);
    return camp;
  },

  async appendLog(
    scheduleId: string,
    level: ExecutionLogItem["level"],
    message: string,
    details?: Record<string, unknown>
  ): Promise<void> {
    const all = await readFromDisk();
    const camp = all.find((s) => s.id === scheduleId);
    if (!camp) return;

    camp.logs.push({
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
    });
    camp.updatedAt = new Date().toISOString();
    await writeToDisk(all);
  },

  async getDueSchedules(): Promise<ScheduledCampaign[]> {
    const all = await readFromDisk();
    const now = Date.now();
    return all.filter((s) => {
      if (s.status !== "scheduled") return false;
      const scheduledTime = new Date(s.scheduledAtUtc).getTime();
      return scheduledTime <= now;
    });
  },

  async delete(id: string): Promise<boolean> {
    const all = await readFromDisk();
    const filtered = all.filter((s) => s.id !== id);
    if (filtered.length === all.length) return false;
    await writeToDisk(filtered);
    return true;
  },
};
