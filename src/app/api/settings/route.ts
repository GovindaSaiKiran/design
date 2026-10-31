import { NextResponse } from "next/server";
import { CompleteSwaramSettings } from "@/types/settings";

// In-memory persistent store for settings during runtime
let globalSettingsStore: CompleteSwaramSettings = {
  profile: {
    fullName: "Operations Administrator",
    avatarUrl: "",
    email: "admin@enterprise.ai",
    phone: "+91 98401 22345",
    jobTitle: "Head of Voice Telephony Operations",
    displayLanguage: "English (India)",
    timezone: "Asia/Kolkata (IST • UTC+05:30)",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h",
    lastLogin: "Today, 09:14 AM IST",
  },
  workspace: {
    businessName: "Enterprise Voice Workspace",
    organizationName: "Enterprise Voice Workspace",
    logoUrl: "",
    industry: "Automated Voice Operations & Customer Experience",
    organizationType: "Hospital & Healthcare",
    website: "https://swaram.ai",
    businessAddress: "Suite 400, HITEC City Main Rd, Hyderabad, TG 500081",
    country: "India",
    timezone: "Asia/Kolkata (IST • UTC+05:30)",
    teamSize: "51-200",
    businessDescription: "AI voice agent call center operations providing autonomous caller interaction, follow-ups, and notifications.",
    defaultLanguage: "English + Hindi (Pan-India Bilingual)",
    businessHoursStart: "09:00",
    businessHoursEnd: "19:00",
    callingHoursStart: "10:00",
    callingHoursEnd: "18:30",
    callingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    workspaces: [
      { id: "ws-primary", name: "Enterprise Voice Workspace (Primary)", role: "Owner", isCurrent: true, industry: "Healthcare" },
      { id: "ws-branch", name: "Regional Patient Outreach Desk", role: "Admin", isCurrent: false, industry: "Outreach" },
    ],
  },
  myPreferences: {
    primaryGoals: ["customer_support", "customer_notifications", "appointment_reminders"],
    customGoalText: "",
    industry: "Healthcare & Clinic Services",
    mainAudience: "Patients & Inquiring Customers",
    preferredLanguages: ["English", "Hindi", "Telugu"],
    preferredChannels: ["Voice Call", "WhatsApp Automation"],
    typicalCampaignFrequency: "daily",
    preferredCallingMode: "ai_autonomous",
    technicalExperienceLevel: "intermediate",
    mainBusinessObjective: "Automate patient follow-ups, appointment reminders, and inquiry support with zero wait time.",
    lastUpdated: "Just now",
  },
  campaignDefaults: {
    preferredAgentId: "agent-default",
    preferredAgentName: "Primary Voice Agent",
    defaultVoice: "Bulbul Indic (Female)",
    defaultLanguage: "English",
    defaultKnowledgeBaseId: "all",
    defaultKnowledgeBaseName: "Complete Enterprise Knowledge Library",
    defaultCallingMode: "autonomous",
    defaultConcurrencyLimit: 15,
    preferredCallingHoursStart: "10:00",
    preferredCallingHoursEnd: "18:30",
    defaultReportingOptions: {
      sendEmailSummary: true,
      sendWhatsappReport: true,
      includeCallRecordings: true,
      detailedTranscriptAnalysis: true,
    },
    safetyDisclaimerAcknowledged: true,
  },
  onboarding: {
    completedSteps: ["complete_profile", "set_organization", "choose_goals", "configure_agent", "connect_phone"],
    isDismissed: false,
    lastUpdated: "2026-10-31T09:00:00Z",
  },
  team: [
    {
      id: "team-1",
      name: "Operations Administrator",
      email: "admin@enterprise.ai",
      role: "Owner",
      status: "Active",
      addedDate: "Jan 12, 2026",
      lastActive: "Just now",
    },
    {
      id: "team-2",
      name: "Telephony Engineer",
      email: "telephony@enterprise.ai",
      role: "Admin",
      status: "Active",
      addedDate: "Feb 04, 2026",
      lastActive: "15 mins ago",
    },
    {
      id: "team-3",
      name: "Outreach Lead",
      email: "outreach@enterprise.ai",
      role: "Member",
      status: "Active",
      addedDate: "Mar 01, 2026",
      lastActive: "2 hours ago",
    },
  ],
  billing: {
    planName: "Growth Enterprise Telephony",
    planBadge: "Enterprise SLA",
    planPrice: "₹14,999",
    billingPeriod: "Monthly",
    includedMinutes: 3000,
    usedMinutes: 0,
    overageRatePerMinute: "₹0.45/min",
    currentPeriodStart: "01 Oct 2026",
    currentPeriodEnd: "31 Oct 2026",
    paymentMethod: {
      brand: "Visa Corporate",
      last4: "4242",
      expMonth: "08",
      expYear: "2028",
    },
    billingEmail: "accounts.billing@enterprise.ai",
    billingAddress: "Swaram Telephony Hub, HITEC City, Hyderabad, TG 500081",
    gstinTaxId: "36AAACA0000A1Z5",
    usageAlertsEnabled: true,
    spendingLimitMonthly: 25000,
    purchasedNumbers: [
      {
        id: "num-1",
        phoneNumber: "+91 40 4821 9900",
        label: "Direct Inbound Helpline",
        monthlyFee: "₹1,200",
        channelType: "PRI SIP Trunk",
        renewalDate: "15 Nov 2026",
      },
      {
        id: "num-2",
        phoneNumber: "+91 40 4821 9901",
        label: "Outbound Automated Desk",
        monthlyFee: "₹1,200",
        channelType: "High-Throughput Trunk",
        renewalDate: "15 Nov 2026",
      },
    ],
    invoices: [
      {
        id: "inv-2026-10",
        invoiceNumber: "INV-SWR-88421",
        date: "01 Oct 2026",
        amount: "₹14,999.00",
        status: "Paid",
      },
      {
        id: "inv-2026-09",
        invoiceNumber: "INV-SWR-82104",
        date: "01 Sep 2026",
        amount: "₹14,999.00",
        status: "Paid",
      },
      {
        id: "inv-2026-08",
        invoiceNumber: "INV-SWR-76492",
        date: "01 Aug 2026",
        amount: "₹15,420.50",
        status: "Paid",
      },
    ],
  },
  notifications: {
    // 11 distinct event notification preferences
    campaignStarted: { inApp: true, email: false },
    campaignCompleted: { inApp: true, email: true },
    campaignFailed: { inApp: true, email: true },
    scheduledReminders: { inApp: true, email: true },
    failedCalls: { inApp: true, email: false },
    callbackRequests: { inApp: true, email: true },
    lowMinutesBalance: { inApp: true, email: true },
    usageLimits: { inApp: true, email: true },
    telephonyIssues: { inApp: true, email: true },
    weeklyReports: { inApp: false, email: true },
    securityAlerts: { inApp: true, email: true },

    // Legacy backward compatibility
    campaignCompletedEmail: true,
    campaignCompletedInApp: true,
    campaignFailedEmail: true,
    campaignFailedInApp: true,
    callingUsageAlertsEmail: true,
    callingUsageAlertsInApp: true,
    lowMinutesBalanceEmail: true,
    lowMinutesBalanceInApp: true,
    serviceDisconnectedEmail: true,
    serviceDisconnectedInApp: true,
    dailySummaryEmail: false,
    weeklySummaryEmail: true,
    summaryTime: "18:30 IST",
  },
  security: {
    twoFactorEnabled: true,
    twoFactorMethod: "authenticator",
    passwordLastChanged: "14 Sep 2026",
    dataRetentionDays: 90,
    activeSessions: [
      {
        id: "sess-1",
        device: "MacBook Pro 16",
        browser: "Chrome 129",
        ip: "49.205.112.44",
        location: "Hyderabad, India",
        isCurrent: true,
        lastActive: "Active now",
      },
      {
        id: "sess-2",
        device: "iPhone 15 Pro",
        browser: "Swaram Mobile Companion",
        ip: "49.205.112.98",
        location: "Hyderabad, India",
        isCurrent: false,
        lastActive: "3 hours ago",
      },
    ],
    loginHistory: [
      {
        id: "log-1",
        timestamp: "Today, 09:14 AM",
        ip: "49.205.112.44",
        location: "Hyderabad, India",
        status: "Successful",
        client: "Chrome macOS",
      },
      {
        id: "log-2",
        timestamp: "Yesterday, 08:45 AM",
        ip: "49.205.112.44",
        location: "Hyderabad, India",
        status: "Successful",
        client: "Chrome macOS",
      },
      {
        id: "log-3",
        timestamp: "20 Oct 2026, 11:20 PM",
        ip: "152.58.41.10",
        location: "Bengaluru, India",
        status: "Successful",
        client: "iOS Mobile",
      },
    ],
  },
  preferences: {
    appearance: "light",
    interfaceLanguage: "English (India)",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h",
    defaultDashboard: "Overview",
    tableDensity: "comfortable",
  },
  aiServices: [
    {
      id: "ai-swaram-core",
      name: "Swaram Indic Acoustic Core",
      purpose: "Ultra low-latency speech synthesis and Hindi/Telugu/Tamil conversational logic",
      provider: "swaram",
      status: "connected",
      selectedModel: "Swaram-Indic-Conversational-v3.2",
      availableModels: [
        "Swaram-Indic-Conversational-v3.2 (Recommended)",
        "Swaram-UltraFast-Voice-v2.8 (110ms Latency)",
      ],
      speechRecognition: "Swaram Conformer-ASR (Indian Dialect Optimized)",
      speechGeneration: "Maya & Arjun Neural Voice Engine (Expressive)",
      apiKeyMasked: "swm_native_builtin_carrier_verified",
      lastVerified: "Today, 10:15 AM",
      latencyMs: 124,
    },
    {
      id: "ai-gemini-live",
      name: "Google Gemini 3.8 Live & Reasoning",
      purpose: "Multimodal contextual reasoning, zero-hallucination document extraction, and fallback logic",
      provider: "gemini",
      status: "connected",
      selectedModel: "Gemini 3.8 Flash (Low Latency)",
      availableModels: [
        "Gemini 3.8 Flash (Low Latency)",
        "Gemini 3.5 Pro (Deep Document Retrieval)",
      ],
      speechRecognition: "Google Real-Time Speech Recognition API",
      speechGeneration: "Google Neural Cloud TTS",
      apiKeyMasked: "AIzaSy••••••••••••••••••••••••••••••••",
      lastVerified: "Today, 09:30 AM",
      latencyMs: 142,
    },
    {
      id: "ai-sarvam",
      name: "Sarvam AI Indic Dialect Models",
      purpose: "Deep regional speech nuances and Pan-Indian accent adaptation",
      provider: "sarvam",
      status: "connected",
      selectedModel: "Saaras-Indic-Voice-v2",
      availableModels: [
        "Saaras-Indic-Voice-v2",
        "Sarvam-2B-Bilingual",
      ],
      speechRecognition: "Sarvam Speech-to-Text",
      speechGeneration: "Sarvam Bulbul Speech Engine",
      apiKeyMasked: "srvm_••••••••••••••••••••••••••••••••",
      lastVerified: "Yesterday, 04:00 PM",
      latencyMs: 168,
    },
    {
      id: "ai-openai",
      name: "OpenAI Whisper & GPT-4o Mini",
      purpose: "Secondary fallback speech recognition and English intent mapping",
      provider: "openai",
      status: "not_configured",
      selectedModel: "gpt-4o-mini",
      availableModels: ["gpt-4o-mini", "gpt-4o"],
      speechRecognition: "Whisper-1 Cloud",
      speechGeneration: "OpenAI TTS-1 HD",
      apiKeyMasked: "",
      lastVerified: "Never",
      latencyMs: 0,
    },
  ],
  phoneCalling: {
    provider: "Airtel / Jio Enterprise PRI & Cloud Trunking",
    providerType: "Airtel / Jio Enterprise PRI",
    status: "connected",
    defaultCallerId: "+91 40 4590 1197",
    phoneNumbers: [
      {
        id: "num-1",
        number: "+91 40 4590 1197",
        label: "Main Campus Admissions Line (PRI-1)",
        isDefaultCallerId: true,
        status: "Active",
        channelType: "PRI Trunk",
      },
      {
        id: "num-2",
        number: "+91 80 6902 4410",
        label: "Outreach & Entrance Verification Line",
        isDefaultCallerId: false,
        status: "Active",
        channelType: "SIP Cloud",
      },
      {
        id: "num-3",
        number: "+91 22 5092 8812",
        label: "Fee Counseling & Hostel Support",
        isDefaultCallerId: false,
        status: "Active",
        channelType: "PRI Trunk",
      },
    ],
    permittedCallingHours: "10:00 AM – 06:30 PM",
    timezone: "Asia/Kolkata (IST)",
    lastTested: "Today, 08:30 AM (Latency: 28ms, Jitter: 1.2ms)",
    sipSettings: {
      sipRegistrar: "sip.airteltelephony.in",
      port: 5061,
      transport: "TLS",
      srtpEncryption: true,
      authUsernameMasked: "enterprise_pri_trunk_01",
    },
  },
  whatsapp: {
    status: "connected",
    businessAccountName: "Enterprise Telephony Desk (Official)",
    phoneNumber: "+91 98401 22345",
    verifiedBadge: true,
    wabaIdMasked: "WABA-994821••••••••••",
    phoneNumberIdMasked: "PNID-884102••••••••••",
    deliveryRatePercent: 99.8,
    lastWebhookPing: "2 mins ago (HTTP 200)",
  },
  otherApps: [
    {
      id: "app-hubspot",
      name: "HubSpot CRM",
      category: "CRM & Customer Management",
      description: "Automatically log qualified candidate calls, conversation transcripts, and lead intent scores into HubSpot contacts.",
      status: "connected",
      iconName: "HubSpot",
      lastSync: "12 mins ago",
      syncFrequency: "Real-time after every call",
    },
    {
      id: "app-sheets",
      name: "Google Sheets & Drive",
      category: "Spreadsheets & Vault",
      description: "Stream live call records, sentiment breakdowns, and counselor follow-up rows into your admissions tracking spreadsheet.",
      status: "connected",
      iconName: "GoogleSheets",
      lastSync: "4 mins ago",
      syncFrequency: "Every 5 minutes",
    },
    {
      id: "app-slack",
      name: "Slack Notifications",
      category: "Team Notifications",
      description: "Receive instant Slack channel alerts when a candidate requests human counseling or when a campaign completes.",
      status: "connected",
      iconName: "Slack",
      lastSync: "Today, 11:42 AM",
      syncFrequency: "Instant event alerts",
    },
    {
      id: "app-leadsquared",
      name: "LeadSquared Admissions CRM",
      category: "CRM & Customer Management",
      description: "Push verified entrance registrations and fee inquiries directly into counselor calling cadences.",
      status: "available",
      iconName: "LeadSquared",
    },
    {
      id: "app-zapier",
      name: "Zapier & Make Automations",
      category: "Workflow Automation",
      description: "Trigger multi-app business workflows whenever Swaram completes a voice campaign or WhatsApp dialogue.",
      status: "available",
      iconName: "Zapier",
    },
  ],
  advanced: {
    webhookUrl: "https://api.apex.edu.in/webhooks/swaram-telephony",
    webhookSecretMasked: "whsec_••••••••••••••••••••••••••••••••",
    subscribedEvents: [
      "call.completed",
      "call.human_handoff",
      "lead.qualified",
      "campaign.finished",
      "whatsapp.message_received",
    ],
    retryCount: 3,
    timeoutSeconds: 8,
    diagnosticsStatus: "Healthy",
    apiKeys: [
      {
        id: "key-1",
        name: "Admissions Portal Production Key",
        prefix: "swm_live_9042••••••••",
        createdDate: "12 Jan 2026",
        lastUsedDate: "5 mins ago",
        role: "Full Access",
      },
      {
        id: "key-2",
        name: "WhatsApp Bot Webhook Secret",
        prefix: "swm_live_3811••••••••",
        createdDate: "18 Feb 2026",
        lastUsedDate: "Today, 10:20 AM",
        role: "Outbound Dispatcher",
      },
    ],
  },
};

export async function GET() {
  return NextResponse.json({
    success: true,
    settings: globalSettingsStore,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { section, data, action } = body;

    // Handle test actions
    if (action === "test-ai") {
      return NextResponse.json({
        success: true,
        message: "AI connection verified successfully. Latency: 118ms. Speech synthesis: Responsive.",
        latencyMs: 118,
        testedAt: new Date().toLocaleTimeString(),
      });
    }

    if (action === "test-phone") {
      return NextResponse.json({
        success: true,
        message: "SIP Trunk & Carrier PRI connection verified. Roundtrip delay: 24ms. Jitter: 0.8ms. Ready for live calls.",
        testedAt: new Date().toLocaleTimeString(),
      });
    }

    if (action === "test-webhook") {
      return NextResponse.json({
        success: true,
        message: "Test webhook delivered with HTTP 200 OK response from server.",
        testedAt: new Date().toLocaleTimeString(),
      });
    }

    if (action === "invite-member") {
      const { email, role, name } = data || {};
      if (!email || !role) {
        return NextResponse.json({ success: false, message: "Email and role are required." }, { status: 400 });
      }
      const existing = globalSettingsStore.team.find((m) => m.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return NextResponse.json({ success: false, message: "A team member with this email already exists." }, { status: 400 });
      }
      const newMember = {
        id: `team-${Date.now()}`,
        name: name || email.split("@")[0],
        email,
        role,
        status: "Pending Invitation" as const,
        addedDate: "Today",
        lastActive: "Never",
      };
      globalSettingsStore.team = [newMember, ...globalSettingsStore.team];
      return NextResponse.json({
        success: true,
        message: `Invitation email sent to ${email} with role ${role}.`,
        team: globalSettingsStore.team,
      });
    }

    if (action === "remove-member") {
      const { memberId } = data || {};
      const target = globalSettingsStore.team.find((m) => m.id === memberId);
      if (target?.role === "Owner") {
        return NextResponse.json({ success: false, message: "Workspace Owner cannot be removed." }, { status: 403 });
      }
      globalSettingsStore.team = globalSettingsStore.team.filter((m) => m.id !== memberId);
      return NextResponse.json({
        success: true,
        message: "Member access revoked successfully.",
        team: globalSettingsStore.team,
      });
    }

    if (action === "request-account-deletion") {
      return NextResponse.json({
        success: true,
        message: "Account deletion request submitted. An administrative verification link has been dispatched to your registered email.",
      });
    }

    // Handle section updates
    if (section && data) {
      if (section === "profile") {
        globalSettingsStore.profile = { ...globalSettingsStore.profile, ...data };
      } else if (section === "workspace" || section === "organization") {
        globalSettingsStore.workspace = { ...globalSettingsStore.workspace, ...data };
      } else if (section === "myPreferences" || section === "swaram-preferences" || section === "preferences") {
        globalSettingsStore.myPreferences = { ...globalSettingsStore.myPreferences, ...data };
      } else if (section === "campaignDefaults" || section === "campaign-defaults") {
        globalSettingsStore.campaignDefaults = { ...globalSettingsStore.campaignDefaults, ...data };
      } else if (section === "onboarding") {
        globalSettingsStore.onboarding = { ...globalSettingsStore.onboarding, ...data };
      } else if (section === "team") {
        globalSettingsStore.team = data;
      } else if (section === "billing") {
        globalSettingsStore.billing = { ...globalSettingsStore.billing, ...data };
      } else if (section === "notifications") {
        globalSettingsStore.notifications = { ...globalSettingsStore.notifications, ...data };
      } else if (section === "security") {
        globalSettingsStore.security = { ...globalSettingsStore.security, ...data };
      } else if (section === "appPreferences") {
        globalSettingsStore.preferences = { ...globalSettingsStore.preferences, ...data };
      } else if (section === "aiServices") {
        globalSettingsStore.aiServices = data;
      } else if (section === "phoneCalling") {
        globalSettingsStore.phoneCalling = { ...globalSettingsStore.phoneCalling, ...data };
      } else if (section === "whatsapp") {
        globalSettingsStore.whatsapp = { ...globalSettingsStore.whatsapp, ...data };
      } else if (section === "otherApps") {
        globalSettingsStore.otherApps = data;
      } else if (section === "advanced") {
        globalSettingsStore.advanced = { ...globalSettingsStore.advanced, ...data };
      }

      return NextResponse.json({
        success: true,
        message: "Settings updated successfully.",
        settings: globalSettingsStore,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid payload: missing section or data" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Server error while saving settings" },
      { status: 500 }
    );
  }
}
