export interface WorkspaceCapacity {
  includedMinutes: number;
  usedMinutes: number;
  remainingMinutes: number;
  percentRemaining: number;
  prepaidTopUpMinutes: number;
  totalAvailableMinutes: number;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  daysRemainingInPeriod: number;
  averageBurnRatePerDay: number; // minutes / day
  estimatedExhaustionDays: number | null; // null if burn rate is 0 or runway exceeds period
  exhaustionStatus: "healthy" | "attention" | "critical";
  currency: string;
  overageRatePerMinute: number;
  planName: string;
  planTierBadge: string;
}

export interface AgentUsageMetric {
  agentId: string;
  agentName: string;
  department: string;
  avatarSeed: string;
  minutesConsumed: number;
  percentOfTotalUsage: number;
  callsHandled: number;
  avgDurationFormatted: string;
  avgDurationSeconds: number;
  costPerCompletedCall: number;
  resolutionRatePercent: number;
  direction: "inbound" | "outbound" | "blended";
  operationalContext: string;
  trendDirection: "stable" | "up" | "down";
}

export interface UsageGuardrailsConfig {
  lowAllowanceThresholdPercent: number; // e.g. 80 (meaning 80% used / 20% remaining)
  lowAllowanceEmailNotify: boolean;
  lowAllowanceInAppNotify: boolean;
  spendingAlertThreshold: number; // e.g. 2500 in currency
  spendingAlertEnabled: boolean;
  spendingAlertEmailNotify: boolean;
  enforcedHardCapEnabled: boolean;
  enforcedHardCapAmount: number; // e.g. 5000 in currency
  hardCapPolicy: "pause_outbound_only" | "pause_all_campaigns" | "alert_only";
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

export interface CostIntelligenceBreakdown {
  voiceTransitCharges: number;
  aiVoiceInferenceCharges: number; // 0 if bundled in plan
  messagingCharges: number;
  numberRentalCharges: number;
  subtotalEstimated: number;
  taxCharges: number; // GST / VAT
  totalEstimatedCurrentCharges: number;
  lastClosedInvoiceAmount: number;
  lastClosedInvoiceDate: string;
  billingStatus: "Current" | "Pending Payment" | "Autopay Active";
}

export interface DailyUsageDataPoint {
  dateLabel: string;
  dayName: string;
  inboundMinutes: number;
  outboundMinutes: number;
  totalMinutes: number;
}

export interface CampaignSimulationInput {
  numberOfContacts: number;
  answerRatePercent: number; // e.g. 65%
  avgAnsweredDurationMinutes: number; // e.g. 1.8 mins
  unansweredRingDurationSeconds: number; // e.g. 12 seconds
  unansweredBillable: boolean; // default true for carrier connected rings
  attemptsPerContact: number; // 1, 2, or 3
  selectedAgentId: string;
}

export interface CampaignSimulationResult {
  typicalMinutesRequired: number;
  conservativeMinutesRequired: number; // +15% answer rate, +20% duration
  availableMinutes: number;
  typicalSurplusOrDeficit: number; // positive = surplus, negative = deficit
  conservativeSurplusOrDeficit: number;
  typicalEstimatedAdditionalCost: number;
  conservativeEstimatedAdditionalCost: number;
  hoursMinutesFormatted: string;
  capacityFit: "fits_comfortably" | "tight_fit" | "requires_topup";
  estimatedCompletionHours: number;
}
