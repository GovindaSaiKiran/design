import {
  DashboardAgent,
  LiveCallItem,
  RecentCallRecord,
  CampaignData,
  ContactItem,
  KnowledgeDocument,
  TelephonyNumber,
  NotificationItem,
  KPIMetric,
  OrganizationInfo,
  AIAgent,
} from "@/types/dashboard";

export type { AIAgent, DashboardAgent };

export const mockOrganizations: OrganizationInfo[] = [
  {
    id: "org-default",
    name: "My Workspace",
    type: "Enterprise Voice Center",
    verified: true,
    plan: "Starter Plan",
    usagePercent: 0,
    usedMinutes: 0,
    totalMinutes: 0,
    activeAgents: 0,
    totalNumbers: 0,
    accountManager: "admin@swaram.ai",
  },
];

export const mockKPIs: KPIMetric[] = [];

export const mockAgents: DashboardAgent[] = [];

export const mockLiveCalls: LiveCallItem[] = [];

export const mockRecentCalls: RecentCallRecord[] = [];

export const mockCampaigns: CampaignData[] = [];

export const mockContacts: ContactItem[] = [];

export const mockContactIntelligence: {
  counts: {
    newContacts: number;
    highIntent: number;
    followUps: number;
    resolved: number;
  };
  featuredContact: ContactItem | null;
} = {
  counts: {
    newContacts: 0,
    highIntent: 0,
    followUps: 0,
    resolved: 0,
  },
  featuredContact: null,
};

export const mockKnowledgeBase: KnowledgeDocument[] = [];

export const mockTelephonyNumbers: TelephonyNumber[] = [];

export const mockNotifications: NotificationItem[] = [];

export const mockCallActivityData: {
  today: { time: string; calls: number; minutes: number; interested: number; handoffs: number }[];
  sevenDays: { time: string; calls: number; minutes: number; interested: number; handoffs: number }[];
  thirtyDays: { time: string; calls: number; minutes: number; interested: number; handoffs: number }[];
} = {
  today: [],
  sevenDays: [],
  thirtyDays: [],
};

// Aliases
export const campaignDataMock = mockCampaigns;
export const recentCallRecordsMock = mockRecentCalls;
export const liveCallsMock = mockLiveCalls;
export const telephonyNumbersMock = mockTelephonyNumbers;
export const dashboardAgentsMock = mockAgents;
export const knowledgeDocumentsMock = mockKnowledgeBase;
