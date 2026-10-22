import {
  WorkspaceCapacity,
  AgentUsageMetric,
  UsageGuardrailsConfig,
  CostIntelligenceBreakdown,
  DailyUsageDataPoint,
} from "@/types/usageControls";

export const initialWorkspaceCapacity: WorkspaceCapacity = {
  includedMinutes: 3000,
  usedMinutes: 820,
  remainingMinutes: 2180,
  percentRemaining: 72.7,
  prepaidTopUpMinutes: 500,
  totalAvailableMinutes: 2680,
  billingPeriodStart: "13 Oct 2026",
  billingPeriodEnd: "12 Nov 2026",
  daysRemainingInPeriod: 21,
  averageBurnRatePerDay: 74,
  estimatedExhaustionDays: 36,
  exhaustionStatus: "healthy",
  currency: "INR",
  overageRatePerMinute: 0.85,
  planName: "Institution Growth Tier",
  planTierBadge: "High-Throughput SIP",
};

export const initialAgentMetrics: AgentUsageMetric[] = [
  {
    agentId: "agent-maya",
    agentName: "Maya — Admissions & Student Concierge",
    department: "Admissions Office",
    avatarSeed: "maya",
    minutesConsumed: 480,
    percentOfTotalUsage: 58.5,
    callsHandled: 218,
    avgDurationFormatted: "2m 12s",
    avgDurationSeconds: 132,
    costPerCompletedCall: 1.87,
    resolutionRatePercent: 96.2,
    direction: "inbound",
    operationalContext:
      "High-touch academic counseling and syllabus Q&A. Longer call duration directly drives 96.2% verified prospective application yield.",
    trendDirection: "stable",
  },
  {
    agentId: "agent-priya",
    agentName: "Priya — Fee & Financial Aid Advisor",
    department: "Student Finance Desk",
    avatarSeed: "priya",
    minutesConsumed: 210,
    percentOfTotalUsage: 25.6,
    callsHandled: 120,
    avgDurationFormatted: "1m 45s",
    avgDurationSeconds: 105,
    costPerCompletedCall: 1.48,
    resolutionRatePercent: 98.1,
    direction: "inbound",
    operationalContext:
      "Fee installment schedules, merit scholarship calculators, and immediate post-call WhatsApp PDF quote dispatches.",
    trendDirection: "up",
  },
  {
    agentId: "agent-arjun",
    agentName: "Arjun — Lead Verification & Outreach",
    department: "Operations & Outreach",
    avatarSeed: "arjun",
    minutesConsumed: 130,
    percentOfTotalUsage: 15.9,
    callsHandled: 110,
    avgDurationFormatted: "1m 11s",
    avgDurationSeconds: 71,
    costPerCompletedCall: 1.01,
    resolutionRatePercent: 92.4,
    direction: "outbound",
    operationalContext:
      "Rapid entrance rank verification, webinar invites, and automated callback scheduling. Optimized for short, concise calls.",
    trendDirection: "stable",
  },
];

export const initialGuardrailsConfig: UsageGuardrailsConfig = {
  lowAllowanceThresholdPercent: 80,
  lowAllowanceEmailNotify: true,
  lowAllowanceInAppNotify: true,
  spendingAlertThreshold: 2500,
  spendingAlertEnabled: true,
  spendingAlertEmailNotify: true,
  enforcedHardCapEnabled: true,
  enforcedHardCapAmount: 6000,
  hardCapPolicy: "pause_outbound_only",
  lastUpdatedBy: "admin@swaram.ai",
  lastUpdatedAt: "14 Oct 2026, 03:15 PM",
};

export const initialCostBreakdown: CostIntelligenceBreakdown = {
  voiceTransitCharges: 697,
  aiVoiceInferenceCharges: 0, // Bundled into standard plan
  messagingCharges: 184, // 245 WhatsApp follow-up summaries @ ₹0.75
  numberRentalCharges: 2490, // 3 active local & toll-free numbers
  subtotalEstimated: 3371,
  taxCharges: 606.78, // 18% GST
  totalEstimatedCurrentCharges: 3977.78,
  lastClosedInvoiceAmount: 4250,
  lastClosedInvoiceDate: "12 Oct 2026",
  billingStatus: "Autopay Active",
};

export const initialDailyUsageTrend: DailyUsageDataPoint[] = [
  { dateLabel: "16 Oct", dayName: "Thu", inboundMinutes: 48, outboundMinutes: 24, totalMinutes: 72 },
  { dateLabel: "17 Oct", dayName: "Fri", inboundMinutes: 52, outboundMinutes: 30, totalMinutes: 82 },
  { dateLabel: "18 Oct", dayName: "Sat", inboundMinutes: 42, outboundMinutes: 18, totalMinutes: 60 },
  { dateLabel: "19 Oct", dayName: "Sun", inboundMinutes: 28, outboundMinutes: 10, totalMinutes: 38 },
  { dateLabel: "20 Oct", dayName: "Mon", inboundMinutes: 62, outboundMinutes: 32, totalMinutes: 94 },
  { dateLabel: "21 Oct", dayName: "Tue", inboundMinutes: 58, outboundMinutes: 28, totalMinutes: 86 },
  { dateLabel: "22 Oct", dayName: "Wed", inboundMinutes: 54, outboundMinutes: 34, totalMinutes: 88 },
];

export const initialInvoicesList = [
  {
    id: "INV-2026-10",
    date: "12 Oct 2026",
    billingPeriod: "13 Sep 2026 – 12 Oct 2026",
    amount: "₹4,250",
    status: "Paid",
    minutesBilled: "3,420 mins (3,000 incl. + 420 overage)",
    paymentMethod: "Visa ending in 4242",
    pdfUrl: "#",
  },
  {
    id: "INV-2026-09",
    date: "12 Sep 2026",
    billingPeriod: "13 Aug 2026 – 12 Sep 2026",
    amount: "₹3,890",
    status: "Paid",
    minutesBilled: "3,110 mins (3,000 incl. + 110 overage)",
    paymentMethod: "Visa ending in 4242",
    pdfUrl: "#",
  },
  {
    id: "INV-2026-08",
    date: "12 Aug 2026",
    billingPeriod: "13 Jul 2026 – 12 Aug 2026",
    amount: "₹3,750",
    status: "Paid",
    minutesBilled: "2,980 mins (Under plan allowance)",
    paymentMethod: "Visa ending in 4242",
    pdfUrl: "#",
  },
];
