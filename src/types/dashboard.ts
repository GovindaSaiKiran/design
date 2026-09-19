export type CallDirection = "inbound" | "outbound";

export type CallOutcome =
  | "Interested"
  | "Completed"
  | "Human Handoff"
  | "No Answer"
  | "Callback Requested"
  | "Failed"
  | "Voicemail";

export type AgentStatus = "active" | "paused" | "training" | "offline";

export interface DashboardAgent {
  id: string;
  name: string;
  role: string;
  department: string;
  status: AgentStatus;
  voice: {
    name: string;
    gender: "Female" | "Male" | "Neutral";
    accent: string;
    sampleUrl?: string;
  };
  language: string;
  callsToday: number;
  avgDuration: string;
  accuracy: number;
  assignedNumber: string;
  systemPromptPreview: string;
  activeLiveCount: number;
}

export interface LiveCallItem {
  id: string;
  callerNumber: string;
  callerName?: string;
  agentId: string;
  agentName: string;
  direction: CallDirection;
  durationSeconds: number;
  durationFormatted: string;
  currentSentiment: "positive" | "neutral" | "urgent" | "frustrated";
  intent: string;
  latestSnippet: string;
  audioWaveLevels: number[];
  startedAt: string;
  latencyMs: number;
  transcript: {
    speaker: "agent" | "caller" | "system";
    text: string;
    time: string;
  }[];
}

export interface RecentCallRecord {
  id: string;
  contactNumber: string;
  contactName?: string;
  agentName: string;
  direction: CallDirection;
  duration: string;
  durationSeconds: number;
  outcome: CallOutcome;
  timestamp: string;
  timeAgo: string;
  summary: string;
  sentimentScore: number; // 0 - 100
  qualification: "High Intent" | "Qualified" | "Follow-up Needed" | "Unreachable" | "Escalated";
  transcriptSnippet: string;
  audioRecordingUrl?: string;
}

export interface CampaignData {
  id: string;
  title: string;
  status: "active" | "paused" | "scheduled" | "completed";
  totalContacts: number;
  completedCount: number;
  noAnswerCount: number;
  failedCount: number;
  progressPercent: number;
  targetAudience: string;
  assignedAgent: string;
  scheduledTime?: string;
  startDate: string;
  estTimeRemaining: string;
}

export interface ContactItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  category: "New" | "High Intent" | "Follow-up" | "Resolved";
  organization: string;
  lastCallOutcome: CallOutcome;
  lastContacted: string;
  notes: string;
  assignedAgent: string;
  priorityScore: number;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: "Academic & Course Info" | "Fees & Scholarships" | "Campus & Hostel" | "Admissions Policy" | "College Policies" | "General Info";
  fileSize: string;
  uploadedAt: string;
  status: "ready" | "processing" | "failed";
  vectorChunks: number;
  lastUpdated: string;
}

export interface TelephonyNumber {
  id: string;
  phoneNumber: string;
  label: string;
  assignedAgent: string;
  status: "active" | "routing" | "inactive";
  channelType: "SIP Trunk" | "Direct DID" | "Toll-Free";
  latencyMs: number;
  callsToday: number;
}

export interface NotificationItem {
  id: string;
  type: "campaign" | "knowledge" | "handoff" | "usage" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  severity: "info" | "success" | "warning" | "error";
}

export interface KPIMetric {
  label: string;
  value: string;
  numericValue: number;
  changePercent: number;
  trend: "up" | "down" | "neutral";
  trendLabel: string;
  sparkline: number[];
}

export interface OrganizationInfo {
  id: string;
  name: string;
  type: string;
  verified: boolean;
  plan: string;
  usagePercent: number;
  usedMinutes: number;
  totalMinutes: number;
  activeAgents: number;
  totalNumbers: number;
  accountManager: string;
  avatarUrl?: string;
}
