export type ScheduleStatus =
  | "scheduled"
  | "running"
  | "paused"
  | "completed"
  | "partially-completed"
  | "cancelled"
  | "failed";

export type CallingMode = "normal" | "bulk";

export interface StructuredCallingPurpose {
  goal: string;                 // Why agent is calling
  keyInformation: string;      // What it should communicate
  questionsToAsk: string;      // What questions it should ask
  desiredOutcome: string;      // The desired outcome
  onInterested: string;        // What to do if contact is interested
  onDeclined: string;          // What to do if contact declines
  humanHandoffCriteria?: string;// When to hand off to a human
  callEndingProtocol?: string; // How the call should end
}

export interface KnowledgeSourceReference {
  type: "upload" | "manual" | "kb_collection" | "playground_reference";
  id: string;
  title: string;
  category?: string;
  snippet?: string;
  status: "ready" | "processing" | "error";
  metadata?: Record<string, unknown>;
}

export type ContactCallStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "no-answer"
  | "failed"
  | "skipped";

export interface ScheduledContact {
  id: string;
  name: string;
  phone: string; // E.164 normalized, e.g. +919840122345
  email?: string;
  organization?: string;
  customFields?: Record<string, string>;
  status: ContactCallStatus;
  attempts: number;
  callSid?: string;
  failureReason?: string;
  executedAt?: string;
  durationSeconds?: number;
}

export interface CallingWindowConfig {
  startHour: number; // e.g. 9 (09:00)
  endHour: number;   // e.g. 19 (19:00)
  concurrencyLimit: number; // 1 to 50 concurrent calls
  pacingDelaySec: number;   // delay between dispatch batches
  maxRetries?: number;      // 1 to 3 retries
}

export interface CallConfigSnapshot {
  agentId: string;
  agentName: string;
  language: string;
  voiceName: string;
  voiceAccent?: string;
  callObjective: string;
  instructions: string;
  openingScript?: string;
  customContext?: Record<string, string>;
  knowledgeBaseId?: string;
  knowledgeBaseName?: string;
  knowledgeChunkCount?: number;
  strictGrounding?: boolean;
}

export interface ExecutionLogItem {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "success";
  message: string;
  details?: Record<string, unknown>;
}

export interface ScheduledCampaign {
  id: string;
  workspaceId: string;
  name: string;
  status: ScheduleStatus;
  callingMode: CallingMode;
  scheduleType: "now" | "later";
  scheduledAtUtc: string; // ISO 8601 UTC timestamp
  timezone: string;       // IANA timezone identifier, e.g. "Asia/Kolkata"
  localScheduledTime: string; // Interpreted formatted local representation
  callingWindow: CallingWindowConfig;
  config: CallConfigSnapshot;
  callingPurpose?: StructuredCallingPurpose;
  knowledgeSources?: KnowledgeSourceReference[];
  contacts: ScheduledContact[];
  stats: {
    totalContacts: number;
    completedCount: number;
    noAnswerCount: number;
    failedCount: number;
    skippedCount: number;
    progressPercent: number;
  };
  suppressionChecked: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  pausedAt?: string;
  logs: ExecutionLogItem[];
}

export interface CreateSchedulePayload {
  name: string;
  callingMode?: CallingMode;
  scheduleType: "now" | "later";
  scheduledDate?: string; // YYYY-MM-DD
  scheduledTime?: string; // HH:mm
  timezone: string;
  contacts: Array<{
    name: string;
    phone: string;
    email?: string;
    organization?: string;
    customFields?: Record<string, string>;
  }>;
  config: CallConfigSnapshot;
  callingPurpose?: StructuredCallingPurpose;
  knowledgeSources?: KnowledgeSourceReference[];
  callingWindow?: Partial<CallingWindowConfig>;
  consentAcknowledged: boolean;
}

