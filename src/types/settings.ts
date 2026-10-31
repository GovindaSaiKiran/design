export type SettingsTabKey =
  // ACCOUNT SETTINGS
  | "profile"
  | "security"
  | "notifications"
  // WORKSPACE SETTINGS
  | "organization"
  | "workspace" // Alias for organization
  | "swaram-preferences"
  | "preferences" // Alias for swaram-preferences
  | "campaign-defaults"
  | "team"
  | "billing"
  // SYSTEM CONNECTIONS
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
  displayLanguage?: string;
  timezone?: string;
  dateFormat?: "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
  timeFormat?: "12h" | "24h";
  lastLogin?: string;
}

export interface WorkspaceItem {
  id: string;
  name: string;
  role: TeamRole;
  isCurrent: boolean;
  industry?: string;
}

export interface WorkspaceProfile {
  businessName: string; // Organization Name
  organizationName?: string;
  logoUrl: string;
  industry: string;
  organizationType?: string; // Hospital, E-commerce, Higher Ed, Enterprise, Government, etc.
  website: string;
  businessAddress?: string;
  country: string;
  timezone: string;
  teamSize?: string;
  businessDescription?: string;
  defaultLanguage: string;
  businessHoursStart: string;
  businessHoursEnd: string;
  callingHoursStart: string;
  callingHoursEnd: string;
  callingDays: string[];
  workspaces?: WorkspaceItem[];
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

export interface PurchasedPhoneNumber {
  id: string;
  phoneNumber: string;
  label: string;
  monthlyFee: string;
  channelType: string;
  renewalDate: string;
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
  purchasedNumbers?: PurchasedPhoneNumber[];
  invoices: InvoiceRecord[];
}

export interface NotificationChannelSetting {
  inApp: boolean;
  email: boolean;
}

export interface NotificationPreferences {
  // Individual 11 required event controls
  campaignStarted: NotificationChannelSetting;
  campaignCompleted: NotificationChannelSetting;
  campaignFailed: NotificationChannelSetting;
  scheduledReminders: NotificationChannelSetting;
  failedCalls: NotificationChannelSetting;
  callbackRequests: NotificationChannelSetting;
  lowMinutesBalance: NotificationChannelSetting;
  usageLimits: NotificationChannelSetting;
  telephonyIssues: NotificationChannelSetting;
  weeklyReports: NotificationChannelSetting;
  securityAlerts: NotificationChannelSetting;

  // Legacy compatibility fields
  campaignCompletedEmail?: boolean;
  campaignCompletedInApp?: boolean;
  campaignFailedEmail?: boolean;
  campaignFailedInApp?: boolean;
  callingUsageAlertsEmail?: boolean;
  callingUsageAlertsInApp?: boolean;
  lowMinutesBalanceEmail?: boolean;
  lowMinutesBalanceInApp?: boolean;
  serviceDisconnectedEmail?: boolean;
  serviceDisconnectedInApp?: boolean;
  dailySummaryEmail?: boolean;
  weeklySummaryEmail?: boolean;
  summaryTime?: string;
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
// MY SWARAM PREFERENCES (Personalization)
// ==========================================

export type SwaramPrimaryGoal =
  | "customer_support"
  | "bulk_voice"
  | "public_announcements"
  | "weather_service_alerts"
  | "awareness_campaigns"
  | "business_promotions"
  | "customer_notifications"
  | "admissions_enquiry"
  | "appointment_reminders"
  | "feedback_collection"
  | "whatsapp_automation"
  | "custom_communication";

export interface MySwaramPreferences {
  primaryGoals: SwaramPrimaryGoal[];
  customGoalText?: string;
  industry?: string;
  mainAudience?: string;
  preferredLanguages?: string[];
  preferredChannels?: string[];
  typicalCampaignFrequency?: "daily" | "weekly" | "monthly" | "ad_hoc";
  preferredCallingMode?: "ai_autonomous" | "interactive_ivr" | "agent_assisted" | "hybrid";
  technicalExperienceLevel?: "beginner" | "intermediate" | "advanced";
  mainBusinessObjective?: string;
  lastUpdated?: string;
}

// ==========================================
// DEFAULT CAMPAIGN PREFERENCES
// ==========================================

export interface CampaignDefaultPreferences {
  preferredAgentId: string;
  preferredAgentName: string;
  defaultVoice: string;
  defaultLanguage: string;
  defaultKnowledgeBaseId?: string;
  defaultKnowledgeBaseName?: string;
  defaultCallingMode: "autonomous" | "conversational_survey" | "alert_broadcast" | "interactive_ivr";
  defaultContactListId?: string;
  defaultContactListName?: string;
  defaultConcurrencyLimit: number;
  preferredCallingHoursStart: string;
  preferredCallingHoursEnd: string;
  defaultReportingOptions: {
    sendEmailSummary: boolean;
    sendWhatsappReport: boolean;
    includeCallRecordings: boolean;
    detailedTranscriptAnalysis: boolean;
  };
  safetyDisclaimerAcknowledged: boolean;
}

// ==========================================
// ONBOARDING PROGRESS CHECKLIST
// ==========================================

export type OnboardingStepId =
  | "complete_profile"
  | "set_organization"
  | "choose_goals"
  | "configure_agent"
  | "add_knowledge"
  | "connect_phone"
  | "import_contacts"
  | "test_call"
  | "launch_campaign";

export interface OnboardingChecklist {
  completedSteps: OnboardingStepId[];
  isDismissed: boolean;
  lastUpdated: string;
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
  myPreferences: MySwaramPreferences;
  campaignDefaults: CampaignDefaultPreferences;
  onboarding: OnboardingChecklist;
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
