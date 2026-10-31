import {
  WorkspaceCapacity,
  AgentUsageMetric,
  UsageGuardrailsConfig,
  CostIntelligenceBreakdown,
  DailyUsageDataPoint,
} from "@/types/usageControls";

export const initialWorkspaceCapacity: WorkspaceCapacity = {
  includedMinutes: 0,
  usedMinutes: 0,
  remainingMinutes: 0,
  percentRemaining: 0,
  prepaidTopUpMinutes: 0,
  totalAvailableMinutes: 0,
  billingPeriodStart: "â€”",
  billingPeriodEnd: "â€”",
  daysRemainingInPeriod: 0,
  averageBurnRatePerDay: 0,
  estimatedExhaustionDays: 0,
  exhaustionStatus: "healthy",
  currency: "INR",
  overageRatePerMinute: 0.85,
  planName: "Starter Tier",
  planTierBadge: "SIP Voice",
};

export const initialAgentMetrics: AgentUsageMetric[] = [];

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
  lastUpdatedBy: "System",
  lastUpdatedAt: "Today",
};

export const initialCostBreakdown: CostIntelligenceBreakdown = {
  voiceTransitCharges: 0,
  aiVoiceInferenceCharges: 0,
  messagingCharges: 0,
  numberRentalCharges: 0,
  subtotalEstimated: 0,
  taxCharges: 0,
  totalEstimatedCurrentCharges: 0,
  lastClosedInvoiceAmount: 0,
  lastClosedInvoiceDate: "â€”",
  billingStatus: "Autopay Active",
};

export const initialDailyUsageTrend: DailyUsageDataPoint[] = [];

export const initialInvoicesList: Array<{
  id: string;
  date: string;
  billingPeriod: string;
  amount: string;
  status: string;
  minutesBilled: string;
  paymentMethod: string;
  pdfUrl: string;
}> = [];