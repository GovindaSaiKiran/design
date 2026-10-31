"use client";

import React, { useState, useMemo, useEffect, Suspense, useCallback } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PhoneOutgoing,
  PhoneCall,
  Calendar,
  Clock,
  Users,
  Bot,
  Sparkles,
  Check,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  Globe,
  Sliders,
  Play,
  Pause,
  Volume2,
  FileSpreadsheet,
  ChevronRight,
  ShieldCheck,
  Radio,
  Search,
  Filter,
  Eye,
  ExternalLink,
  MessageSquare,
  Building,
  RefreshCw,
  Send,
  Zap,
  ArrowRight,
  ArrowUpRight,
  PhoneForwarded,
  Tag,
  Copy,
  SlidersHorizontal,
  Info,
  CalendarClock,
  Layers,
  ChevronDown,
  X,
  FileText,
  BadgeAlert,
  Headphones,
  BookOpen,
  Database,
  Square,
  RotateCcw,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";
import { mockAgents, mockKnowledgeBase } from "@/data/mock/dashboardData";
import { INITIAL_UNIFIED_CONTACTS, saveUserContactBatch, getUnifiedContacts } from "@/lib/contactsHistory";
import {
  CallingMode,
  StructuredCallingPurpose,
  ScheduledCampaign,
  KnowledgeSourceReference,
} from "@/types/schedule";

// Subcomponents for Outbound Scheduler
import CallingModeSelector from "@/components/dashboard/outbound-scheduler/CallingModeSelector";
import AIAgentSelector from "@/components/dashboard/outbound-scheduler/AIAgentSelector";
import CallingPurposeSection from "@/components/dashboard/outbound-scheduler/CallingPurposeSection";
import KnowledgeSection from "@/components/dashboard/outbound-scheduler/KnowledgeSection";
import ContactSelectionSection, { ContactRecord, COHORTS_LIST } from "@/components/dashboard/outbound-scheduler/ContactSelectionSection";
import TestCallSetupModal from "@/components/dashboard/outbound-scheduler/TestCallSetupModal";
import PreLaunchReviewModal from "@/components/dashboard/outbound-scheduler/PreLaunchReviewModal";

// =========================================================================
// LEGACY COMPATIBILITY DATA STRUCTURES
// =========================================================================

export interface OutboundContact {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  leadScore: number;
  intent: "High Intent" | "Qualified" | "Follow-up Needed";
  city: string;
  source: string;
}

export interface OutboundCallRecord {
  id: string;
  contactName: string;
  contactPhone: string;
  courseOrProgram: string;
  city: string;
  agentId: string;
  agentName: string;
  agentAvatar: string;
  agentRole: string;
  topic: string;
  direction: "outbound";
  status: "completed" | "in-progress" | "scheduled" | "callback" | "no-answer";
  duration: string;
  durationSeconds: number;
  scheduledTime?: string;
  timestamp: string;
  timeAgo: string;
  dispatchMode: "Instant Batch" | "Scheduled Time" | "Bulk Cadence Window";
  callingWindow?: string;
  sentimentScore: number;
  outcome: string;
  summary: string;
  knowledgeBaseId?: string;
  knowledgeBaseName?: string;
  knowledgeChunks?: number;
  relatedCallHistoryId?: string;
  extractedEntities?: {
    phoneNumbers?: { label: string; value: string; verified?: boolean }[];
    emails?: { label: string; value: string; verified?: boolean }[];
    addresses?: { label: string; street: string; cityStatePincode: string }[];
    keyPoints?: string[];
  };
}

function OutboundSchedulerPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cohortParam = searchParams.get("cohort");
  const simContactsParam = searchParams.get("simContacts");
  const simAgentParam = searchParams.get("simAgent");
  const simDurationParam = searchParams.get("simDuration");

  // Navigation tab: "dispatch" (Wizard) vs "history" (Real Backend Ledger)
  const [activeTab, setActiveTab] = useState<"dispatch" | "history">("dispatch");

  // Campaign Name
  const [campaignName, setCampaignName] = useState("Outbound Verification & Customer Outreach");

  // 1. Calling Mode State
  const [callingMode, setCallingMode] = useState<CallingMode>("normal");
  const [concurrencyLimit, setConcurrencyLimit] = useState<number>(20);
  const [pacingDelaySec, setPacingDelaySec] = useState<number>(2);
  const [maxRetries, setMaxRetries] = useState<number>(2);
  const [callingWindowStart, setCallingWindowStart] = useState<number>(9);
  const [callingWindowEnd, setCallingWindowEnd] = useState<number>(19);

  // 2. AI Agent State
  const [selectedAgentId, setSelectedAgentId] = useState<string>("agent-maya");
  const [openingScript, setOpeningScript] = useState<string>(
    "Hello {name}, I am calling from our support desk regarding your recent inquiry."
  );
  const [campaignInstructions, setCampaignInstructions] = useState<string>(
    "Greet the contact warmly by name. Verify details. Answer customer questions and schedule follow-ups as appropriate."
  );

  // 3. Calling Purpose State
  const [callingPurpose, setCallingPurpose] = useState<StructuredCallingPurpose>({
    goal: "Verify contact details and confirm interest in current offerings.",
    keyInformation: "Confirm eligibility and provide overview of available benefits and solutions.",
    questionsToAsk: "1. Did you have any questions regarding our services? 2. Would you like to schedule a demonstration or consultation?",
    desiredOutcome: "Secure contact's interest and schedule a follow-up consultation.",
    onInterested: "Confirm appointment details and dispatch follow-up confirmation.",
    onDeclined: "Politely thank the contact and close the call courteously.",
    humanHandoffCriteria: "If contact requests customized commercial terms or complex enterprise escalation.",
    callEndingProtocol: "Summarize discussion points, provide support contact info, and offer warm sign-off.",
  });

  // 4. Grounded Knowledge State
  const [selectedKbIds, setSelectedKbIds] = useState<string[]>(["doc-002"]);
  const [manualNotes, setManualNotes] = useState<string>(
    "• High-concurrency SLA: 99.99% uptime with sub-140ms response latency.\n• Enterprise multi-region SIP peering supported across major Indian carriers.\n• Telephony operations helpline: +91 40 4590 1199."
  );
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [selectedPlaygroundIds, setSelectedPlaygroundIds] = useState<string[]>(["play-01"]);

  // 5. Contact Selection State
  const [contactSourceMode, setContactSourceMode] = useState<"cohort" | "directory" | "csv" | "manual">("cohort");
  const [selectedCohortId, setSelectedCohortId] = useState<string>("cohort-enterprise-leads");
  const [selectedDirectoryContactIds, setSelectedDirectoryContactIds] = useState<string[]>([
    "cont-001",
    "cont-002",
    "cont-003",
  ]);
  const [importedContacts, setImportedContacts] = useState<ContactRecord[]>([]);
  const [manualContacts, setManualContacts] = useState<ContactRecord[]>([
    {
      id: "man-init-1",
      name: "Rohan K. Varma",
      phone: "+91 98401 22345",
      email: "rohan.varma@enterprise.ai",
      organization: "Acme Technologies",
      isValid: true,
      isDuplicate: false,
      isSuppressed: false,
    },
    {
      id: "man-init-2",
      name: "Pooja Hegde",
      phone: "+91 94401 88319",
      email: "pooja.h@enterprise.ai",
      organization: "Global Retail Corp",
      isValid: true,
      isDuplicate: false,
      isSuppressed: false,
    },
  ]);
  const [excludeInvalidAndSuppressed, setExcludeInvalidAndSuppressed] = useState<boolean>(true);
  const [consentAcknowledged, setConsentAcknowledged] = useState<boolean>(true);

  // 6. Schedule Timing State
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [scheduledDate, setScheduledDate] = useState<string>("2026-10-24");
  const [scheduledTime, setScheduledTime] = useState<string>("10:30");
  const [timezone, setTimezone] = useState<string>("Asia/Kolkata");

  // Modals & Drawers
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedScheduleDetail, setSelectedScheduleDetail] = useState<ScheduledCampaign | null>(null);
  const [selectedOutboundCall, setSelectedOutboundCall] = useState<OutboundCallRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Real Backend Schedules Ledger
  const [serverSchedules, setServerSchedules] = useState<ScheduledCampaign[]>([]);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
  const [historySearch, setHistorySearch] = useState("");
  const [historyStatusFilter, setHistoryStatusFilter] = useState<string>("all");

  // Toast notification
  const [toast, setToast] = useState<{ type: "success" | "error"; title: string; message: string } | null>(null);

  // Handle incoming simulation parameters from Usage Control Center
  useEffect(() => {
    if (simContactsParam) {
      setCallingMode("bulk");
      setConcurrencyLimit(Math.min(50, Math.max(5, Math.ceil(Number(simContactsParam) / 100))));
      setContactSourceMode("cohort");
    }
    if (simAgentParam) {
      const match = mockAgents.find((a) => a.id.toLowerCase().includes(simAgentParam.toLowerCase()));
      if (match) setSelectedAgentId(match.id);
    }
    if (cohortParam) {
      const match = COHORTS_LIST.find((c) => c.id === cohortParam || c.id.includes(cohortParam));
      if (match) {
        setSelectedCohortId(match.id);
        setContactSourceMode("cohort");
      }
    }
  }, [simContactsParam, simAgentParam, cohortParam]);

  // Load Saved Campaign Defaults from Personalization Settings
  const [defaultsNotice, setDefaultsNotice] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("swaram_campaign_defaults");
      if (raw) {
        const d = JSON.parse(raw);
        if (d.preferredAgentId) setSelectedAgentId(d.preferredAgentId);
        if (d.defaultConcurrencyLimit) setConcurrencyLimit(d.defaultConcurrencyLimit);
        setDefaultsNotice("Applied preferred agent & concurrency from your Campaign Defaults.");
      } else {
        fetch("/api/settings")
          .then((res) => res.json())
          .then((json) => {
            if (json.success && json.settings?.campaignDefaults) {
              const d = json.settings.campaignDefaults;
              if (d.preferredAgentId) setSelectedAgentId(d.preferredAgentId);
              if (d.defaultConcurrencyLimit) setConcurrencyLimit(d.defaultConcurrencyLimit);
              setDefaultsNotice("Applied preferred agent & concurrency from Settings.");
            }
          })
          .catch(() => {});
      }
    } catch {}
  }, []);

  // Fetch real schedules from backend API
  const fetchSchedules = useCallback(async () => {
    try {
      setIsLoadingSchedules(true);
      const res = await fetch("/api/schedules");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setServerSchedules(json.data);
        }
      }
    } catch (err) {
      console.error("Error fetching schedules:", err);
    } finally {
      setIsLoadingSchedules(false);
    }
  }, []);

  // Initial fetch and auto-polling when running jobs exist
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  useEffect(() => {
    const hasRunning = serverSchedules.some((s) => s.status === "running");
    if (hasRunning && activeTab === "history") {
      const interval = setInterval(() => {
        fetchSchedules();
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [serverSchedules, activeTab, fetchSchedules]);

  // Selected Agent Object
  const selectedAgent = useMemo(() => {
    return (
      mockAgents.find((a) => a.id === selectedAgentId) ||
      mockAgents[0] || {
        id: "agent-maya",
        name: "Maya — Admissions & Student Concierge",
        role: "Admissions Concierge AI",
        language: "Hindi + English",
        avatar: "M",
        accuracy: 98,
        voice: { name: "Neural Voice 1" },
        capabilities: ["Telephony Inbound", "Telephony Outbound"],
      }
    );
  }, [selectedAgentId]);

  // Selected Knowledge Base Name
  const knowledgeSummaryText = useMemo(() => {
    const kbNames = selectedKbIds
      .map((id) => mockKnowledgeBase.find((k) => k.id === id)?.title)
      .filter(Boolean);
    const parts = [];
    if (kbNames.length > 0) parts.push(`${kbNames.length} KB Collections (${kbNames[0]})`);
    if (uploadedFiles.length > 0) parts.push(`${uploadedFiles.length} Uploaded Documents`);
    if (manualNotes.trim()) parts.push("Manual Campaign Facts");
    if (selectedPlaygroundIds.length > 0) parts.push(`${selectedPlaygroundIds.length} Playground Examples`);
    return parts.join(" • ") || "Default Grounded Business Vector Store";
  }, [selectedKbIds, uploadedFiles, manualNotes, selectedPlaygroundIds]);

  // Compute contacts payload according to active source mode
  const resolvedContacts = useMemo(() => {
    if (contactSourceMode === "cohort") {
      const unified = getUnifiedContacts();
      if (unified.length > 0) {
        return unified.slice(0, 5).map((c) => ({
          name: c.name,
          phone: c.phone,
          email: c.email,
          organization: c.organization || "Direct Contact",
        }));
      }
      return [
        { name: "Aarav Patel", phone: "+919840122345", email: "aarav.patel@example.com", organization: "Enterprise Support" },
        { name: "Ananya Iyer", phone: "+919440188319", email: "ananya.iyer@example.com", organization: "Direct Inquiry" },
        { name: "Devansh Patil", phone: "+919711033499", email: "devansh.patil@example.com", organization: "Priority Account" },
        { name: "Meera Krishnan", phone: "+919821055678", email: "meera.k@example.com", organization: "Follow-up Queue" },
        { name: "Siddharth Verma", phone: "+919811234567", email: "siddharth.v@example.com", organization: "Standard Client" },
      ];
    }
    if (contactSourceMode === "directory") {
      return INITIAL_UNIFIED_CONTACTS.filter((c) => selectedDirectoryContactIds.includes(c.id)).map((c) => ({
        name: c.name,
        phone: c.phone,
        email: c.email,
        organization: c.organization,
      }));
    }
    if (contactSourceMode === "csv") {
      const list = excludeInvalidAndSuppressed
        ? importedContacts.filter((c) => c.isValid && !c.isDuplicate && !c.isSuppressed)
        : importedContacts;
      return list.map((c) => ({
        name: c.name,
        phone: c.phone,
        email: c.email,
        organization: c.organization,
      }));
    }
    // manual
    const list = excludeInvalidAndSuppressed
      ? manualContacts.filter((c) => c.isValid && !c.isDuplicate && !c.isSuppressed)
      : manualContacts;
    return list.map((c) => ({
      name: c.name,
      phone: c.phone,
      email: c.email,
      organization: c.organization,
    }));
  }, [
    contactSourceMode,
    selectedDirectoryContactIds,
    importedContacts,
    manualContacts,
    excludeInvalidAndSuppressed,
  ]);

  // Counts
  const totalContactsCount = useMemo(() => {
    if (contactSourceMode === "cohort") {
      const match = COHORTS_LIST.find((c) => c.id === selectedCohortId);
      return match ? match.count : 4850;
    }
    if (contactSourceMode === "directory") return selectedDirectoryContactIds.length;
    if (contactSourceMode === "csv") return importedContacts.length;
    return manualContacts.length;
  }, [contactSourceMode, selectedCohortId, selectedDirectoryContactIds, importedContacts, manualContacts]);

  const eligibleContactsCount = useMemo(() => {
    if (contactSourceMode === "cohort") {
      return Math.round(totalContactsCount * 0.988); // 98.8% eligible after DND exclusion
    }
    if (contactSourceMode === "directory") return selectedDirectoryContactIds.length;
    if (contactSourceMode === "csv") {
      return importedContacts.filter((c) => c.isValid && !c.isDuplicate && !c.isSuppressed).length;
    }
    return manualContacts.filter((c) => c.isValid && !c.isDuplicate && !c.isSuppressed).length;
  }, [contactSourceMode, totalContactsCount, selectedDirectoryContactIds, importedContacts, manualContacts]);

  const excludedContactsCount = Math.max(0, totalContactsCount - eligibleContactsCount);

  // Cost and Minutes Estimate
  const estimatedMinutes = Math.round(eligibleContactsCount * 2.2);
  const estimatedCostFormatted = `₹${(estimatedMinutes * 0.6).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  // Execute Campaign Launch via Backend API
  const handleConfirmLaunch = async () => {
    if (!consentAcknowledged) {
      setToast({
        type: "error",
        title: "Regulatory Consent Required",
        message: "Please acknowledge recipient consent compliance before scheduling outbound calls.",
      });
      return;
    }

    if (resolvedContacts.length === 0) {
      setToast({
        type: "error",
        title: "No Eligible Contacts",
        message: "Please select or import at least one valid recipient phone number.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const knowledgeSources: KnowledgeSourceReference[] = [
        ...selectedKbIds.map((id) => {
          const doc = mockKnowledgeBase.find((k) => k.id === id);
          return {
            type: "kb_collection" as const,
            id,
            title: doc?.title || id,
            category: doc?.category,
            status: "ready" as const,
          };
        }),
        ...uploadedFiles
          .filter((f) => f.status === "ready")
          .map((f) => ({
            type: "upload" as const,
            id: f.id,
            title: f.name,
            status: "ready" as const,
          })),
        ...(manualNotes.trim()
          ? [
              {
                type: "manual" as const,
                id: "manual-notes-1",
                title: "Manual Campaign Facts & Policies",
                snippet: manualNotes.slice(0, 100),
                status: "ready" as const,
              },
            ]
          : []),
        ...selectedPlaygroundIds.map((pid) => ({
          type: "playground_reference" as const,
          id: pid,
          title: `Playground Approved Turn: ${pid}`,
          status: "ready" as const,
        })),
      ];

      const payload = {
        name: campaignName.trim(),
        callingMode,
        scheduleType,
        scheduledDate: scheduleType === "later" ? scheduledDate : undefined,
        scheduledTime: scheduleType === "later" ? scheduledTime : undefined,
        timezone,
        contacts: resolvedContacts,
        config: {
          agentId: selectedAgent.id,
          agentName: selectedAgent.name,
          language: selectedAgent.language,
          voiceName: selectedAgent.voice.name,
          voiceAccent: selectedAgent.voice.accent,
          callObjective: callingPurpose.goal,
          instructions: campaignInstructions,
          openingScript,
          customContext: {
            campaignName,
            callingMode,
            desiredOutcome: callingPurpose.desiredOutcome,
          },
          knowledgeBaseId: selectedKbIds[0] || "all",
          knowledgeBaseName: knowledgeSummaryText,
          strictGrounding: true,
        },
        callingPurpose,
        knowledgeSources,
        callingWindow: {
          startHour: callingWindowStart,
          endHour: callingWindowEnd,
          concurrencyLimit: callingMode === "normal" ? 1 : concurrencyLimit,
          pacingDelaySec,
          maxRetries,
        },
        consentAcknowledged: true,
      };

      const res = await fetch("/api/schedules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to create scheduled campaign");
      }

      // Successful creation
      try { soundSynth.playSuccess(); } catch {}

      // Save contacts into user contacts history
      saveUserContactBatch({
        title: `Outbound: ${campaignName}`,
        source: "outbound_cadence",
        agentAssigned: selectedAgent.name,
        contacts: resolvedContacts.map((c) => ({
          name: c.name,
          phone: c.phone,
          email: c.email || "",
          category: "High Intent",
          organization: c.organization || "",
          city: "Pan-India",
          notes: "Scheduled via Outbound Telephony Scheduler",
          assignedAgent: selectedAgent.name,
          priorityScore: 85,
          source: "user_csv",
          lastCallOutcome: "Callback Requested",
          lastContacted: "Scheduled",
        })),
      });

      setIsReviewModalOpen(false);
      setToast({
        type: "success",
        title: scheduleType === "now" ? "🚀 Campaign Dispatched!" : "📅 Campaign Scheduled!",
        message: `${eligibleContactsCount.toLocaleString()} contacts queued for ${selectedAgent.name.split("—")[0].trim()} (${callingMode === "normal" ? "Sequential" : `${concurrencyLimit} Lines Concurrent`}).`,
      });

      // Refresh real backend schedules and switch to ledger view
      await fetchSchedules();
      setActiveTab("history");
    } catch (err: any) {
      setToast({
        type: "error",
        title: "Campaign Dispatch Error",
        message: err.message || "Failed to submit campaign to telephony server.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pause / Resume running campaigns
  const handlePauseResume = async (scheduleId: string, action: "pause" | "resume") => {
    try {
      soundSynth.play("click");
      const res = await fetch(`/api/schedules/${scheduleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) {
        try { soundSynth.play("confirm"); } catch {}
        fetchSchedules();
      }
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
    }
  };

  // Cancel scheduled campaign
  const handleCancelSchedule = async (scheduleId: string) => {
    if (!confirm("Are you sure you want to cancel this scheduled campaign?")) return;
    try {
      soundSynth.play("click");
      const res = await fetch(`/api/schedules/${scheduleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel", reason: "User cancelled via Outbound Scheduler" }),
      });
      const data = await res.json();
      if (data.success) {
        fetchSchedules();
      }
    } catch (err) {
      console.error("Error cancelling schedule:", err);
    }
  };

  // Filtered backend schedules
  const filteredServerSchedules = useMemo(() => {
    return serverSchedules.filter((s) => {
      const matchStatus = historyStatusFilter === "all" || s.status === historyStatusFilter;
      const matchSearch =
        !historySearch ||
        s.name.toLowerCase().includes(historySearch.toLowerCase()) ||
        s.config.agentName.toLowerCase().includes(historySearch.toLowerCase()) ||
        s.id.toLowerCase().includes(historySearch.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [serverSchedules, historyStatusFilter, historySearch]);

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300 text-[#283A50]">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-2xl shadow-xl border flex items-start gap-3 animate-in slide-in-from-top duration-200 ${
            toast.type === "success"
              ? "bg-[#FAF5E9] border-[#2E8066] text-[#283A50]"
              : "bg-red-50 border-red-300 text-red-900"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-[#2E8066] shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-xs">
            <h4 className="font-bold text-sm">{toast.title}</h4>
            <p className="mt-0.5 opacity-90 leading-relaxed">{toast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-[#707684] hover:text-[#283A50] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E9E1D4]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold uppercase tracking-wider text-[#707684] hover:text-[#283A50] transition-colors"
            >
              TELEPHONY WORKFORCE
            </Link>
            <span className="text-[#283A50]/30">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2E8066] bg-[#B8DEC8]/40 px-3 py-0.5 rounded-full border border-[#B8DEC8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E8066] animate-pulse" />
              PRI Trunks Active · Zero Hallucination
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#283A50] mt-2">
            Outbound Telephony Scheduler
          </h1>

          <p className="text-xs sm:text-sm text-[#707684] mt-1 max-w-2xl leading-relaxed">
            Configure and launch autonomous voice campaigns. Choose between high-touch sequential calling or scalable multi-channel bulk concurrency.
          </p>
        </div>

        {/* Tab Toggle: Dispatch Wizard vs History Ledger */}
        <div className="flex items-center gap-1.5 bg-[#FAF5E9] p-1 rounded-2xl border border-[#E9E1D4] text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setActiveTab("dispatch");
              try { soundSynth.play("click"); } catch {}
            }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
              activeTab === "dispatch"
                ? "bg-[#283A50] text-white shadow-xs"
                : "text-[#707684] hover:text-[#283A50]"
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Campaign Dispatcher</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("history");
              try { soundSynth.play("click"); } catch {}
              fetchSchedules();
            }}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 relative ${
              activeTab === "history"
                ? "bg-[#283A50] text-white shadow-xs"
                : "text-[#707684] hover:text-[#283A50]"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Scheduled Runs &amp; Ledger ({serverSchedules.length})</span>
            {serverSchedules.some((s) => s.status === "running") && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute top-2 right-2" />
            )}
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: CAMPAIGN DISPATCHER WIZARD
      ========================================================================= */}
      {activeTab === "dispatch" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Personalized Defaults Applied Notice */}
          {defaultsNotice && (
            <div className="p-3.5 rounded-2xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-between text-xs text-[#283A50] shadow-2xs">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#283A50]" />
                <span className="font-medium">{defaultsNotice}</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-[#283A50] border border-[#E9E1D4]">
                Campaign Defaults Applied (Editable)
              </span>
            </div>
          )}

          {/* Campaign Name Field */}
          <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#707684]">
              Campaign Name / Identifier *
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl px-4 py-2.5 text-sm font-bold text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white"
              placeholder="e.g. Q1 Customer Outreach & Verification"
            />
          </div>

          {/* STEP 1: Calling Mode Selector (Normal Sequential vs Bulk Concurrent) */}
          <CallingModeSelector
            callingMode={callingMode}
            onChangeMode={setCallingMode}
            concurrencyLimit={concurrencyLimit}
            onChangeConcurrency={setConcurrencyLimit}
            pacingDelaySec={pacingDelaySec}
            onChangePacing={setPacingDelaySec}
            maxRetries={maxRetries}
            onChangeRetries={setMaxRetries}
            callingWindowStart={callingWindowStart}
            callingWindowEnd={callingWindowEnd}
            onChangeCallingWindow={(start, end) => {
              setCallingWindowStart(start);
              setCallingWindowEnd(end);
            }}
            workspaceMaxConcurrency={50}
          />

          {/* STEP 2: AI Agent Selector */}
          <AIAgentSelector
            selectedAgentId={selectedAgentId}
            onSelectAgent={setSelectedAgentId}
            campaignInstructions={campaignInstructions}
            onChangeCampaignInstructions={setCampaignInstructions}
            openingScript={openingScript}
            onChangeOpeningScript={setOpeningScript}
          />

          {/* STEP 3: Calling Purpose Section */}
          <CallingPurposeSection
            purpose={callingPurpose}
            onChangePurpose={setCallingPurpose}
          />

          {/* STEP 4: Grounded Knowledge Section ("What should your AI agent know?") */}
          <KnowledgeSection
            selectedKbIds={selectedKbIds}
            onChangeSelectedKbs={setSelectedKbIds}
            manualNotes={manualNotes}
            onChangeManualNotes={setManualNotes}
            uploadedFiles={uploadedFiles}
            onChangeUploadedFiles={setUploadedFiles}
            selectedPlaygroundIds={selectedPlaygroundIds}
            onChangeSelectedPlaygroundIds={setSelectedPlaygroundIds}
          />

          {/* STEP 5: Contact Selection Section */}
          <ContactSelectionSection
            contactSourceMode={contactSourceMode}
            onChangeSourceMode={setContactSourceMode}
            selectedCohortId={selectedCohortId}
            onChangeSelectedCohort={setSelectedCohortId}
            selectedDirectoryContactIds={selectedDirectoryContactIds}
            onChangeDirectoryContacts={setSelectedDirectoryContactIds}
            importedContacts={importedContacts}
            onChangeImportedContacts={setImportedContacts}
            manualContacts={manualContacts}
            onChangeManualContacts={setManualContacts}
            excludeInvalidAndSuppressed={excludeInvalidAndSuppressed}
            onToggleExcludeInvalid={setExcludeInvalidAndSuppressed}
            consentAcknowledged={consentAcknowledged}
            onToggleConsent={setConsentAcknowledged}
          />

          {/* STEP 6: Execution Timing & Schedule Type */}
          <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#707684]">
                  Step 6 · Launch Timing
                </span>
                <span className="text-xs text-[#283A50]/30">•</span>
                <span className="text-xs text-[#707684]">When Should Calls Begin?</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#283A50] mt-0.5">
                Immediate vs Scheduled Dispatch
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Now */}
              <div
                onClick={() => setScheduleType("now")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  scheduleType === "now"
                    ? "bg-[#FAF5E9]/50 border-[#283A50] shadow-xs ring-1 ring-[#283A50]"
                    : "bg-white border-[#E9E1D4] hover:bg-[#FAF5E9]/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#283A50]" />
                    <h4 className="font-bold text-xs text-[#283A50]">Start Now (Immediate)</h4>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      scheduleType === "now" ? "border-[#283A50] bg-[#283A50] text-white" : "border-[#E9E1D4]"
                    }`}
                  >
                    {scheduleType === "now" && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                </div>
                <p className="text-[11px] text-[#707684] leading-relaxed">
                  Triggers call processing right now through the telephony worker engine according to your chosen mode.
                </p>
              </div>

              {/* Schedule for Later */}
              <div
                onClick={() => setScheduleType("later")}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  scheduleType === "later"
                    ? "bg-[#FAF5E9]/50 border-[#283A50] shadow-xs ring-1 ring-[#283A50]"
                    : "bg-white border-[#E9E1D4] hover:bg-[#FAF5E9]/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#283A50]" />
                    <h4 className="font-bold text-xs text-[#283A50]">Schedule for Later</h4>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      scheduleType === "later" ? "border-[#283A50] bg-[#283A50] text-white" : "border-[#E9E1D4]"
                    }`}
                  >
                    {scheduleType === "later" && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                </div>
                <p className="text-[11px] text-[#707684] leading-relaxed">
                  Saves to durable backend store. Automatically wakes up and revalidates capacity and DND rules before dialing.
                </p>
              </div>
            </div>

            {/* Scheduled Date/Time Inputs */}
            {scheduleType === "later" && (
              <div className="p-4 rounded-xl bg-[#FAF5E9]/40 border border-[#E9E1D4] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs animate-in fade-in duration-150">
                <div>
                  <label className="text-[10px] font-bold text-[#707684] uppercase tracking-wider block mb-1">
                    Scheduled Date *
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full bg-white border border-[#E9E1D4] rounded-lg px-3 py-1.5 text-xs text-[#283A50]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#707684] uppercase tracking-wider block mb-1">
                    Execution Time (HH:mm) *
                  </label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-white border border-[#E9E1D4] rounded-lg px-3 py-1.5 text-xs text-[#283A50]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#707684] uppercase tracking-wider block mb-1">
                    Time Zone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-white border border-[#E9E1D4] rounded-lg px-3 py-1.5 text-xs text-[#283A50]"
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                    <option value="Asia/Singapore">Asia/Singapore (SGT)</option>
                    <option value="UTC">UTC (Universal)</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Action Footer */}
          <div className="sticky bottom-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E9E1D4] p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50]">
                {callingMode === "normal" ? <PhoneCall className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#283A50]">
                    {callingMode === "normal" ? "Normal Sequential Mode" : `Bulk Concurrency (${concurrencyLimit} Lines)`}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#2E8066] border border-[#B8DEC8]">
                    {eligibleContactsCount.toLocaleString()} Eligible Contacts
                  </span>
                </div>
                <p className="text-[11px] text-[#707684] mt-0.5">
                  Assigned: {selectedAgent.name.split("—")[0].trim()} • Grounded on {knowledgeSummaryText.split("•")[0].trim()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Optional Test Call Setup Action */}
              <button
                type="button"
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setIsTestModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#FAF5E9] hover:bg-[#FAF5E9]/80 text-[#283A50] border border-[#E9E1D4] text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C4A5E8]" />
                <span>Test This Call Setup</span>
              </button>

              {/* Review & Launch Button */}
              <button
                type="button"
                onClick={() => {
                  try { soundSynth.play("confirm"); } catch {}
                  setIsReviewModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#283A50] hover:bg-[#283A50]/90 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Review &amp; Launch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: REAL BACKEND SCHEDULES LEDGER & HISTORY
      ========================================================================= */}
      {activeTab === "history" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header & Filter Controls */}
          <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-[#283A50] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#283A50]" />
                  <span>Durable Telephony Campaign Ledger</span>
                </h3>
                <p className="text-xs text-[#707684] mt-0.5">
                  Survives server restarts and browser navigation. Monitored by the persistent background worker loop.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={fetchSchedules}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF5E9] hover:bg-[#FAF5E9]/80 text-xs font-bold text-[#283A50] border border-[#E9E1D4] flex items-center gap-1.5"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoadingSchedules ? "animate-spin" : ""}`} />
                  <span>Refresh</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("dispatch")}
                  className="px-4 py-1.5 rounded-xl bg-[#283A50] text-white text-xs font-bold hover:bg-[#283A50]/90 transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Outbound Campaign</span>
                </button>
              </div>
            </div>

            {/* Filter Pills & Search Bar */}
            <div className="pt-3 border-t border-[#E9E1D4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                {["all", "running", "scheduled", "paused", "completed", "cancelled"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setHistoryStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                      historyStatusFilter === st
                        ? "bg-[#283A50] text-white"
                        : "bg-[#FAF5E9] text-[#707684] hover:text-[#283A50] border border-[#E9E1D4]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#707684]" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-[#E9E1D4] bg-[#FAF5E9]/30 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50]"
                />
              </div>
            </div>
          </div>

          {/* Schedules Table */}
          <div className="bg-white rounded-2xl border border-[#E9E1D4] shadow-xs overflow-hidden">
            {filteredServerSchedules.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center mx-auto text-[#707684]">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-[#283A50]">No Scheduled Campaigns Found</h4>
                <p className="text-xs text-[#707684] max-w-sm mx-auto">
                  {historySearch || historyStatusFilter !== "all"
                    ? "No campaigns match your current filters. Try resetting search or status filters."
                    : "No outbound voice jobs have been scheduled yet. Click below to launch your first automated campaign."}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("dispatch")}
                  className="px-4 py-2 rounded-xl bg-[#283A50] text-white text-xs font-bold"
                >
                  Create Outbound Campaign
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#E9E1D4]">
                {filteredServerSchedules.map((campaign) => {
                  const isRunning = campaign.status === "running";
                  const isPaused = campaign.status === "paused";
                  const isScheduled = campaign.status === "scheduled";
                  const isCompleted = campaign.status === "completed";
                  const isCancelled = campaign.status === "cancelled";

                  const progress = campaign.stats.progressPercent || 0;

                  return (
                    <div
                      key={campaign.id}
                      className="p-5 hover:bg-[#FAF5E9]/20 transition-colors space-y-3"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-[#283A50]">{campaign.name}</h4>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                campaign.callingMode === "bulk"
                                  ? "bg-purple-50 text-purple-800 border-purple-200"
                                  : "bg-emerald-50 text-[#2E8066] border-[#B8DEC8]"
                              }`}
                            >
                              {campaign.callingMode === "bulk" ? "Bulk Mode" : "Normal Mode (Sequential)"}
                            </span>
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                isRunning
                                  ? "bg-emerald-100 text-[#2E8066] animate-pulse"
                                  : isPaused
                                  ? "bg-amber-100 text-amber-800"
                                  : isScheduled
                                  ? "bg-blue-50 text-blue-800 border border-blue-200"
                                  : isCompleted
                                  ? "bg-slate-100 text-slate-800"
                                  : "bg-red-50 text-red-800 border border-red-200"
                              }`}
                            >
                              {campaign.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#707684]">
                            <span>
                              Agent: <strong className="text-[#283A50]">{campaign.config.agentName.split("—")[0].trim()}</strong>
                            </span>
                            <span>•</span>
                            <span>
                              Timing: <strong className="text-[#283A50]">{campaign.localScheduledTime}</strong>
                            </span>
                            <span>•</span>
                            <span>
                              Concurrency:{" "}
                              <strong className="text-[#283A50]">
                                {campaign.callingMode === "normal"
                                  ? "1 Line (Sequential)"
                                  : `${campaign.callingWindow.concurrencyLimit} Lines Max`}
                              </strong>
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          {isRunning && (
                            <button
                              type="button"
                              onClick={() => handlePauseResume(campaign.id, "pause")}
                              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1.5"
                            >
                              <Pause className="w-3.5 h-3.5" />
                              <span>Pause Calling</span>
                            </button>
                          )}

                          {isPaused && (
                            <button
                              type="button"
                              onClick={() => handlePauseResume(campaign.id, "resume")}
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#2E8066] border border-[#B8DEC8] text-xs font-bold flex items-center gap-1.5"
                            >
                              <Play className="w-3.5 h-3.5" />
                              <span>Resume Campaign</span>
                            </button>
                          )}

                          {isScheduled && (
                            <button
                              type="button"
                              onClick={() => handleCancelSchedule(campaign.id)}
                              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold"
                            >
                              Cancel Job
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setSelectedScheduleDetail(campaign)}
                            className="px-3 py-1.5 rounded-lg bg-[#FAF5E9] hover:bg-[#FAF5E9]/80 text-[#283A50] border border-[#E9E1D4] text-xs font-semibold flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View Dossier &amp; Logs</span>
                          </button>
                        </div>
                      </div>

                      {/* Progress Bar & Breakdown */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-[11px] text-[#707684]">
                          <span>
                            Progress: <strong>{progress}%</strong> ({campaign.stats.completedCount} connected /{" "}
                            {campaign.stats.totalContacts} total)
                          </span>
                          <span className="space-x-2">
                            <span className="text-[#2E8066] font-semibold">{campaign.stats.completedCount} Connected</span>
                            {campaign.stats.noAnswerCount > 0 && (
                              <span className="text-amber-700 font-semibold">{campaign.stats.noAnswerCount} No-Answer</span>
                            )}
                            {campaign.stats.failedCount > 0 && (
                              <span className="text-red-700 font-semibold">{campaign.stats.failedCount} Failed</span>
                            )}
                            {campaign.stats.skippedCount > 0 && (
                              <span className="text-slate-500 font-semibold">{campaign.stats.skippedCount} Skipped (DND)</span>
                            )}
                          </span>
                        </div>
                        <div className="w-full bg-[#FAF5E9] h-2 rounded-full overflow-hidden border border-[#E9E1D4]/80">
                          <div
                            className="h-full bg-[#283A50] transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          MODALS & DRAWERS
      ========================================================================= */}

      {/* Test Call Setup Modal */}
      <TestCallSetupModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        agentName={selectedAgent.name}
        agentRole={selectedAgent.role}
        openingScript={openingScript}
        campaignGoal={callingPurpose.goal}
        knowledgeSummary={knowledgeSummaryText}
      />

      {/* Pre-Launch Review Modal */}
      <PreLaunchReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onConfirmLaunch={handleConfirmLaunch}
        isSubmitting={isSubmitting}
        callingMode={callingMode}
        campaignName={campaignName}
        agentName={selectedAgent.name}
        agentVoice={selectedAgent.voice.name}
        agentLanguage={selectedAgent.language}
        campaignGoal={callingPurpose.goal}
        desiredOutcome={callingPurpose.desiredOutcome}
        knowledgeSourcesSummary={knowledgeSummaryText}
        totalContacts={totalContactsCount}
        eligibleContacts={eligibleContactsCount}
        excludedContacts={excludedContactsCount}
        excludedReasons={["National DND Suppression Match", "Malformed / Duplicate Number"]}
        scheduleType={scheduleType}
        scheduledDate={scheduledDate}
        scheduledTime={scheduledTime}
        timezone={timezone}
        concurrencyLimit={concurrencyLimit}
        pacingDelaySec={pacingDelaySec}
        maxRetries={maxRetries}
        estimatedMinutes={estimatedMinutes}
        estimatedCostFormatted={estimatedCostFormatted}
      />

      {/* Scheduled Campaign Detail Dossier Drawer */}
      {selectedScheduleDetail && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full border border-[#E9E1D4] shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1D4]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
                  Campaign ID: {selectedScheduleDetail.id}
                </span>
                <h3 className="font-bold text-base text-[#283A50]">{selectedScheduleDetail.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScheduleDetail(null)}
                className="p-1.5 rounded-lg text-[#707684] hover:bg-[#FAF5E9]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Campaign Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#FAF5E9]/50 p-4 rounded-2xl border border-[#E9E1D4]">
              <div>
                <span className="text-[10px] text-[#707684] uppercase font-bold block">Status</span>
                <span className="font-bold text-[#283A50] uppercase">{selectedScheduleDetail.status}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#707684] uppercase font-bold block">Calling Mode</span>
                <span className="font-bold text-[#283A50]">{selectedScheduleDetail.callingMode || "normal"}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#707684] uppercase font-bold block">Assigned Agent</span>
                <span className="font-bold text-[#283A50]">{selectedScheduleDetail.config.agentName.split("—")[0]}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#707684] uppercase font-bold block">Scheduled At</span>
                <span className="font-bold text-[#283A50]">{selectedScheduleDetail.localScheduledTime}</span>
              </div>
            </div>

            {/* Contacts Table */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#283A50] block">Recipients Call Dispatches:</span>
              <div className="border border-[#E9E1D4] rounded-xl overflow-hidden divide-y divide-[#E9E1D4] max-h-56 overflow-y-auto">
                {selectedScheduleDetail.contacts.map((c: any) => (
                  <div key={c.id} className="p-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#283A50]">{c.name}</span>
                      <span className="text-[#707684] ml-2 font-mono text-[11px]">{c.phone}</span>
                      {c.callSid && (
                        <span className="text-[10px] text-[#707684] ml-2 font-mono">SID: {c.callSid}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {c.durationSeconds && (
                        <span className="text-[11px] text-[#707684]">{c.durationSeconds}s</span>
                      )}
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                          c.status === "completed"
                            ? "bg-emerald-100 text-[#2E8066]"
                            : c.status === "in-progress"
                            ? "bg-blue-100 text-blue-800"
                            : c.status === "no-answer"
                            ? "bg-amber-100 text-amber-800"
                            : c.status === "skipped"
                            ? "bg-slate-100 text-slate-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Audit Logs */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-[#283A50] block">Durable Execution Logs:</span>
              <div className="bg-[#FAF5E9]/40 border border-[#E9E1D4] rounded-xl p-3 max-h-36 overflow-y-auto font-mono text-[11px] space-y-1">
                {selectedScheduleDetail.logs.map((log: any) => (
                  <div key={log.id} className="flex items-start gap-2">
                    <span className="text-[#707684] shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span
                      className={`font-semibold ${
                        log.level === "success"
                          ? "text-[#2E8066]"
                          : log.level === "warn"
                          ? "text-amber-700"
                          : log.level === "error"
                          ? "text-red-700"
                          : "text-[#283A50]"
                      }`}
                    >
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E9E1D4] flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedScheduleDetail(null)}
                className="px-4 py-2 rounded-xl bg-[#283A50] text-white text-xs font-bold"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OutboundSchedulerPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-[#707684] text-xs font-sans">
          Loading Autonomous Outbound Telephony Scheduler...
        </div>
      }
    >
      <OutboundSchedulerPageContent />
    </Suspense>
  );
}
