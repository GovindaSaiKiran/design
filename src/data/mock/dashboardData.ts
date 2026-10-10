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
} from "@/types/dashboard";

export const mockOrganizations: OrganizationInfo[] = [
  {
    id: "org-clinic",
    name: "clinic",
    type: "Healthcare & AI Telephony",
    verified: true,
    plan: "Free Tier",
    usagePercent: 0,
    usedMinutes: 0,
    totalMinutes: 14,
    activeAgents: 0,
    totalNumbers: 0,
    accountManager: "taninkigovinda@gmail.com",
  },
];

export const mockKPIs: KPIMetric[] = [
  {
    label: "Calls Handled",
    value: "0",
    numericValue: 0,
    changePercent: 0,
    trend: "neutral",
    trendLabel: "0 calls today",
    sparkline: [0, 0, 0, 0, 0],
  },
  {
    label: "Talk Time / Minutes",
    value: "0",
    numericValue: 0,
    changePercent: 0,
    trend: "neutral",
    trendLabel: "0 minutes used",
    sparkline: [0, 0, 0, 0, 0],
  },
  {
    label: "Students & Contacts",
    value: "0",
    numericValue: 0,
    changePercent: 0,
    trend: "neutral",
    trendLabel: "0 contacts",
    sparkline: [0, 0, 0, 0, 0],
  },
  {
    label: "Counselor Handoffs",
    value: "0",
    numericValue: 0,
    changePercent: 0,
    trend: "neutral",
    trendLabel: "0 handoffs",
    sparkline: [0, 0, 0, 0, 0],
  },
  {
    label: "Average Call Duration",
    value: "0s",
    numericValue: 0,
    changePercent: 0,
    trend: "neutral",
    trendLabel: "No calls yet",
    sparkline: [0, 0, 0, 0, 0],
  },
];

export const mockAgents: DashboardAgent[] = [];

export const mockLiveCalls: LiveCallItem[] = [];

export const mockRecentCalls: RecentCallRecord[] = [];

export const mockCampaigns: CampaignData[] = [];

export const mockContactIntelligence = {
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

export const mockCallActivityData = {
  today: [
    { time: "06:00", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "08:00", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "10:00", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "12:00", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "14:00", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "16:00", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "18:00", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "20:00", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
  ],
  sevenDays: [
    { time: "Mon", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "Tue", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "Wed", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "Thu", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "Fri", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "Sat", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "Sun", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
  ],
  thirtyDays: [
    { time: "W1", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "W2", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "W3", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
    { time: "W4", calls: 0, minutes: 0, interested: 0, handoffs: 0 },
  ],
};

// Aliases
export const campaignDataMock = mockCampaigns;
export const recentCallRecordsMock = mockRecentCalls;
export const liveCallsMock = mockLiveCalls;
export const telephonyNumbersMock = mockTelephonyNumbers;
export const dashboardAgentsMock = mockAgents;
export const knowledgeDocumentsMock = mockKnowledgeBase;
