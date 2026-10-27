import fs from "fs/promises";
import path from "path";
import { ScheduledCampaign, ScheduledContact, ExecutionLogItem, ScheduleStatus, ContactCallStatus } from "@/types/schedule";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "schedules.json");

// In-memory cache + lock
let memoryCache: ScheduledCampaign[] | null = null;
let isWriting = false;

// Initial seed data if file doesn't exist
const initialSeedSchedules: ScheduledCampaign[] = [];


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
