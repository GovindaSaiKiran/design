export type PhoneNumberType = "Local" | "National" | "Toll-Free" | "Mobile Virtual";

export type PhoneNumberCapability =
  | "Voice Inbound"
  | "Voice Outbound"
  | "Two-Way SMS"
  | "WhatsApp Eligible";

export type PhoneNumberStatus =
  | "Active"
  | "Pending Setup"
  | "Verification Required"
  | "Action Required"
  | "Suspended"
  | "Releasing";

export interface AvailableMarketplaceNumber {
  id: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  region: string;
  cityAreaCode: string;
  type: PhoneNumberType;
  capabilities: PhoneNumberCapability[];
  monthlyPrice: number;
  setupFee: number;
  currency: string;
  provider: string;
  featuresSummary: string;
}

export interface OwnedWorkspaceNumber {
  id: string;
  phoneNumber: string;
  label: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  region: string;
  type: PhoneNumberType;
  status: PhoneNumberStatus;
  assignedAgentId: string;
  assignedAgentName: string;
  inboundEnabled: boolean;
  outboundEnabled: boolean;
  isDefaultCallerId: boolean;
  monthlyPrice: number;
  setupFee: number;
  currency: string;
  renewalDate: string;
  activatedDate: string;
  provider: string;
  capabilities: PhoneNumberCapability[];
  callsToday: number;
  totalMinutesUsed: number;
  estimatedMonthlyCost: number;
  lastLatencyMs: number;
}

export interface PhoneNumbersOverviewMetrics {
  totalActiveNumbers: number;
  availableToPurchase: number;
  numbersNeedingAttention: number;
  monthlyRecurringCost: number;
  currency: string;
}

export interface NumberUsageCostRecord {
  numberId: string;
  phoneNumber: string;
  label: string;
  type: PhoneNumberType;
  assignedAgent: string;
  monthlyRental: number;
  setupFee: number;
  minutesUsed: number;
  callUsageCost: number;
  totalBilledCost: number;
  currency: string;
  status: PhoneNumberStatus;
}
