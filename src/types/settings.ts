export type SettingsTabKey =
  // ACCOUNT
  | "profile"
  | "workspace"
  | "team"
  | "billing"
  | "notifications"
  | "security"
  | "preferences"
  // CONNECTIONS
  | "ai-services"
  | "phone-calling"
  | "whatsapp"
  | "other-apps"
  | "advanced";

export interface PersonalProfile {
  fullName: string;
  avatarUrl: string;
  email: string;
  phone: string;
  jobTitle?: string;
  lastLogin?: string;
}

export interface WorkspaceProfile {
  businessName: string;
  logoUrl: string;
  industry: string;
  website: string;
  country: string;
  timezone: string;
  defaultLanguage: string;
  businessHoursStart: string;
  businessHoursEnd: string;
  callingHoursStart: string;
  callingHoursEnd: string;
  callingDays: string[];
}

export type TeamRole = "Owner" | "Admin" | "Member" | "Viewer";
export type TeamMemberStatus = "Active" | "Pending Invitation";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: TeamMemberStatus;
  avatarUrl?: string;
  addedDate: string;
  lastActive: string;
}

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: string;
  status: "Paid" | "Processing" | "Upcoming";
  pdfUrl?: string;
}

export interface BillingPlanInfo {
  planName: string;
  planBadge: string;
  planPrice: string;
  billingPeriod: string;
  includedMinutes: number;
  usedMinutes: number;
  overageRatePerMinute: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  paymentMethod: {
    brand: string;
    last4: string;
    expMonth: string;
    expYear: string;
  };
  billingEmail: string;
  billingAddress: string;
  gstinTaxId: string;
  usageAlertsEnabled: boolean;
  spendingLimitMonthly: number;
  invoices: InvoiceRecord[];
}

export interface NotificationPreferences {
  campaignCompletedEmail: boolean;
  campaignCompletedInApp: boolean;
  campaignFailedEmail: boolean;
  campaignFailedInApp: boolean;
  callingUsageAlertsEmail: boolean;
  callingUsageAlertsInApp: boolean;
  lowMinutesBalanceEmail: boolean;
  lowMinutesBalanceInApp: boolean;
  serviceDisconnectedEmail: boolean;
  serviceDisconnectedInApp: boolean;
  dailySummaryEmail: boolean;
  weeklySummaryEmail: boolean;
  summaryTime: string;
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  isCurrent: boolean;
  lastActive: string;
}

export interface LoginAuditRecord {
  id: string;
  timestamp: string;
  ip: string;
  location: string;
  status: "Successful" | "Failed";
  client: string;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod?: "authenticator" | "sms";
  passwordLastChanged: string;
  dataRetentionDays: number;
  activeSessions: ActiveSession[];
  loginHistory: LoginAuditRecord[];
}

export interface AppPreferences {
  appearance: "light" | "dark" | "system";
  interfaceLanguage: string;
  dateFormat: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  timeFormat: "12h" | "24h";
  defaultDashboard: string;
  tableDensity: "comfortable" | "compact";
}

// ==========================================
// CONNECTIONS TYPES
// ==========================================

export interface AIServiceConnection {
  id: string;
  name: string;
  purpose: string;
  provider: "swaram" | "gemini" | "sarvam" | "openai";
  status: "connected" | "needs_attention" | "not_configured";
  selectedModel: string;
  availableModels: string[];
  speechRecognition: string;
  speechGeneration: string;
  apiKeyMasked: string;
  lastVerified: string;
  latencyMs: number;
}

export interface BusinessPhoneNumber {
  id: string;
  number: string;
  label: string;
  isDefaultCallerId: boolean;
  status: "Active" | "Reserved";
  channelType: "PRI Trunk" | "SIP Cloud" | "Virtual Mobile";
}

export interface PhoneCallingConnection {
  provider: string;
  providerType: "Airtel / Jio Enterprise PRI" | "Tata Tele Business Cloud" | "Twilio / Exotel Cloud";
  status: "connected" | "needs_attention" | "not_configured";
  defaultCallerId: string;
  phoneNumbers: BusinessPhoneNumber[];
  permittedCallingHours: string;
  timezone: string;
  lastTested: string;
  sipSettings: {
    sipRegistrar: string;
    port: number;
    transport: "TLS" | "UDP" | "TCP";
    srtpEncryption: boolean;
    authUsernameMasked: string;
  };
}

export interface WhatsAppConnection {
  status: "connected" | "needs_attention" | "not_configured";
  businessAccountName: string;
  phoneNumber: string;
  verifiedBadge: boolean;
  wabaIdMasked: string;
  phoneNumberIdMasked: string;
  deliveryRatePercent: number;
  lastWebhookPing: string;
}

export interface AppIntegration {
  id: string;
  name: string;
  category: "CRM & Customer Management" | "Workflow Automation" | "Spreadsheets & Vault" | "Team Notifications";
  description: string;
  status: "connected" | "available";
  iconName: string;
  lastSync?: string;
  syncFrequency?: string;
}

export interface ApiKeyRecord {
  id: string;
  name: string;
  prefix: string;
  createdDate: string;
  lastUsedDate: string;
  role: "Full Access" | "Read-Only" | "Outbound Dispatcher";
}

export interface AdvancedConnectionSettings {
  webhookUrl: string;
  webhookSecretMasked: string;
  subscribedEvents: string[];
  retryCount: number;
  timeoutSeconds: number;
  apiKeys: ApiKeyRecord[];
  diagnosticsStatus: "Healthy" | "Degraded" | "Idle";
}

export interface CompleteSwaramSettings {
  profile: PersonalProfile;
  workspace: WorkspaceProfile;
  team: TeamMember[];
  billing: BillingPlanInfo;
  notifications: NotificationPreferences;
  security: SecuritySettings;
  preferences: AppPreferences;
  aiServices: AIServiceConnection[];
  phoneCalling: PhoneCallingConnection;
  whatsapp: WhatsAppConnection;
  otherApps: AppIntegration[];
  advanced: AdvancedConnectionSettings;
}
