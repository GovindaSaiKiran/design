"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  History,
  PhoneCall,
  Search,
  Filter,
  Download,
  Play,
  Pause,
  Clock,
  User,
  Radio,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  PhoneForwarded,
  PhoneMissed,
  PhoneIncoming,
  PhoneOutgoing,
  Eye,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Volume2,
  Share2,
  Copy,
  Check,
  Calendar,
  Layers,
  Database,
  Bot,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  BookOpen,
  X,
  SlidersHorizontal,
  Headphones,
  RotateCcw,
  Mail,
  MapPin,
  Phone,
  Tag,
  Tags,
  ListChecks,
  FileText,
  ShieldCheck,
  Building,
  Printer,
  FileDown,
  CheckSquare,
  Square,
  Briefcase,
  GraduationCap,
  CreditCard,
  Edit2,
  HelpCircle,
} from "lucide-react";
import CallDrawer from "@/components/dashboard/views/CallDrawer";
import ExportReportModal from "@/components/dashboard/modals/ExportReportModal";
import PurposeGroupCards from "@/components/dashboard/call-history/PurposeGroupCards";
import KeyPointsModal from "@/components/dashboard/call-history/KeyPointsModal";
import BulkExportModal from "@/components/dashboard/call-history/BulkExportModal";
import {
  CallIntelligenceRecord,
  PurposeCampaignGroup,
  CallLifecycleStatus,
  CallType,
  TranscriptTurn,
  ExtractedFieldItem,
} from "@/types/callIntelligence";
import {
  downloadIndividualTranscriptPdf,
  downloadIndividualKeyPointsPdf,
  downloadIndividualKeyPointsExcel,
  downloadIndividualKeyPointsDoc,
  downloadBulkTranscriptsPdf,
  downloadBulkKeyPointsExcel,
  downloadBulkKeyPointsPdf,
  formatMaskedPhone,
} from "@/lib/utils/callIntelligenceExport";
import { soundSynth } from "@/lib/audio-synth";
import { RecentCallRecord } from "@/types/dashboard";

// Comprehensive verified base mock logs with purpose, campaign, and structured extraction
const INITIAL_CALL_INTELLIGENCE_LOGS: CallIntelligenceRecord[] = [];

function CallHistoryPageContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams?.get("search") || "";
  const initialId = searchParams?.get("id") || "";

  // Data state
  const [allCalls, setAllCalls] = useState<CallIntelligenceRecord[]>(INITIAL_CALL_INTELLIGENCE_LOGS);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState(initialSearch || initialId || "");
  const [callTypeFilter, setCallTypeFilter] = useState<string>("all");
  const [agentFilter, setAgentFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [outcomeFilter, setOutcomeFilter] = useState<string>("all");

  // Selection state for multi-select bulk operations
  const [selectedCallIds, setSelectedCallIds] = useState<Set<string>>(new Set());

  // Modals & Drawers
  const [keyPointsModalCall, setKeyPointsModalCall] = useState<CallIntelligenceRecord | null>(null);
  const [transcriptCall, setTranscriptCall] = useState<CallIntelligenceRecord | null>(null);
  const [bulkExportOpen, setBulkExportOpen] = useState(false);
  const [bulkExportScopeTitle, setBulkExportScopeTitle] = useState("Selected Calls");
  const [bulkExportCalls, setBulkExportCalls] = useState<CallIntelligenceRecord[]>([]);
  const [bulkExportInitialMode, setBulkExportInitialMode] = useState<"transcripts_pdf" | "keypoints_excel" | "keypoints_pdf">("transcripts_pdf");

  // Legacy CallDrawer & export modal backup compatibility
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Audio Playback state
  const [playingCallId, setPlayingCallId] = useState<string | null>(null);

  // Auto-open call if query param is set
  useEffect(() => {
    if (initialId) {
      const match = allCalls.find((c) => c.id.toLowerCase() === initialId.toLowerCase());
      if (match) {
        setKeyPointsModalCall(match);
      }
    }
  }, [initialId, allCalls]);

  // Load any live schedules from persistent store if available
  useEffect(() => {
    async function fetchScheduledCampaigns() {
      try {
        const res = await fetch("/api/schedules");
        if (!res.ok) return;
        const data = await res.json();
        if (data.campaigns && Array.isArray(data.campaigns)) {
          // Convert any active campaign contacts into live queued/in-progress/completed calls
          const scheduledCallsToAdd: CallIntelligenceRecord[] = [];
          data.campaigns.forEach((camp: any) => {
            if (camp.contacts && Array.isArray(camp.contacts)) {
              camp.contacts.slice(0, 5).forEach((ct: any) => {
                const callId = `SCH-${camp.id.slice(0, 4)}-${ct.id.slice(0, 4)}`;
                // check if already exists
                if (allCalls.some((c) => c.id === callId)) return;

                const mappedStatus: CallLifecycleStatus =
                  ct.status === "completed"
                    ? "completed"
                    : ct.status === "in-progress"
                    ? "in-progress"
                    : ct.status === "failed"
                    ? "failed"
                    : ct.status === "no-answer"
                    ? "no-answer"
                    : ct.status === "skipped"
                    ? "skipped"
                    : "queued";

                scheduledCallsToAdd.push({
                  id: callId,
                  contactName: ct.name || "Contact",
                  contactPhone: ct.phone || "—",
                  callingPurpose: camp.callingPurpose?.goal || camp.config?.callObjective || "Outbound Campaign",
                  campaignName: camp.name || "Scheduled Campaign",
                  campaignId: camp.id,
                  callType: camp.callingMode || "bulk",
                  agentId: camp.config?.agentId || "agent-custom",
                  agentName: camp.config?.agentName || "AI Agent",
                  agentRole: "Telephony Assistant",
                  language: camp.config?.language || "English",
                  date: "Scheduled",
                  timestamp: camp.localScheduledTime || "Today",
                  duration: ct.durationSeconds ? `${Math.floor(ct.durationSeconds / 60)}m ${ct.durationSeconds % 60}s` : "—",
                  durationSeconds: ct.durationSeconds || 0,
                  lifecycleStatus: mappedStatus,
                  plannedStartTime: camp.localScheduledTime,
                  conversationOutcome: mappedStatus === "completed" ? "Interested" : "Pending Execution",
                  sentiment: "neutral",
                  sentimentScore: 75,
                  keyPointsStatus: mappedStatus === "completed" ? "available" : "pending",
                  transcriptStatus: mappedStatus === "completed" ? "available" : "unavailable",
                  hasRecording: false,
                  intent: camp.config?.instructions?.slice(0, 80) || "Scheduled outbound follow-up",
                  summary: `Dispatched under scheduled campaign '${camp.name}'. Status: ${mappedStatus}.`,
                  generalKeyPoints: {
                    shortSummary: `Outbound task under campaign: ${camp.name}`,
                    purposeOfConversation: camp.callingPurpose?.goal || "Outbound campaign follow-up",
                    mainQuestions: [camp.callingPurpose?.questionsToAsk || "Information inquiry"],
                    needsAndInterests: [],
                    factsSupplied: [],
                    objectionsOrConcerns: [],
                    statedPreferences: [],
                    purchaseOrEnquiryIntent: "Medium",
                    agreedActions: [],
                    followUpRequired: false,
                    finalOutcome: mappedStatus === "completed" ? "Completed" : "Pending",
                    unresolvedQuestions: [],
                    notesForHumanTeam: `Created via Outbound Scheduler. Campaign: ${camp.name}`,
                  },
                  purposeSpecificFields: [
                    { key: "campaignName", label: "Originating Campaign", value: camp.name },
                    { key: "agent", label: "Scheduled Agent", value: camp.config?.agentName || "AI Agent" },
                  ],
                  transcript: [],
                });
              });
            }
          });

          if (scheduledCallsToAdd.length > 0) {
            setAllCalls((prev) => [...prev, ...scheduledCallsToAdd]);
          }
        }
      } catch (err) {
        // Silently preserve base logs if API is not yet seeded
      }
    }

    fetchScheduledCampaigns();
  }, []);

  // Compute Purpose / Campaign Groups dynamically from actual call data
  const purposeGroups: PurposeCampaignGroup[] = useMemo(() => {
    const groupMap = new Map<string, CallIntelligenceRecord[]>();

    allCalls.forEach((call) => {
      // Group key: combination of purpose & campaign
      const key = `${call.callingPurpose}:::${call.campaignName}`;
      if (!groupMap.has(key)) {
        groupMap.set(key, []);
      }
      groupMap.get(key)!.push(call);
    });

    const groups: PurposeCampaignGroup[] = [];
    groupMap.forEach((callsInGroup, key) => {
      const [purpose, campaignName] = key.split(":::");
      const total = callsInGroup.length;
      const completed = callsInGroup.filter((c) => c.lifecycleStatus === "completed").length;
      const inProgress = callsInGroup.filter((c) => c.lifecycleStatus === "in-progress").length;
      const queued = callsInGroup.filter((c) => c.lifecycleStatus === "queued" || c.lifecycleStatus === "scheduled").length;
      const failed = callsInGroup.filter((c) => c.lifecycleStatus === "failed" || c.lifecycleStatus === "no-answer" || c.lifecycleStatus === "cancelled").length;
      const skipped = callsInGroup.filter((c) => c.lifecycleStatus === "skipped").length;
      const remaining = total - completed - failed - skipped;
      const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

      let category: PurposeCampaignGroup["category"] = "general";
      const pLower = purpose.toLowerCase();
      if (pLower.includes("admission")) category = "admissions";
      else if (pLower.includes("fee") || pLower.includes("tuition")) category = "fees";
      else if (pLower.includes("sale")) category = "sales";
      else if (pLower.includes("appointment")) category = "appointment";
      else if (pLower.includes("feedback")) category = "feedback";
      else if (pLower.includes("uncategorized")) category = "uncategorized";

      groups.push({
        id: key,
        title: purpose,
        purpose,
        campaignName,
        category,
        totalContacts: total,
        queued,
        inProgress,
        completed,
        failed,
        skipped,
        remaining: Math.max(0, remaining),
        progressPercent,
        lastActive: callsInGroup[0]?.timestamp || "Recent",
      });
    });

    return groups;
  }, [allCalls]);

  // Filtered Calls
  const filteredCalls = useMemo(() => {
    return allCalls.filter((call) => {
      // Purpose Group filter
      if (selectedGroupId !== null) {
        const [purpose, campaignName] = selectedGroupId.split(":::");
        if (call.callingPurpose !== purpose || call.campaignName !== campaignName) {
          return false;
        }
      }

      // Call Type filter
      if (callTypeFilter !== "all" && call.callType !== callTypeFilter) {
        return false;
      }

      // Agent filter
      if (agentFilter !== "all" && call.agentName.toLowerCase() !== agentFilter.toLowerCase()) {
        return false;
      }

      // Language filter
      if (languageFilter !== "all" && !call.language.toLowerCase().includes(languageFilter.toLowerCase())) {
        return false;
      }

      // Status filter
      if (statusFilter !== "all" && call.lifecycleStatus !== statusFilter) {
        return false;
      }

      // Outcome filter
      if (outcomeFilter !== "all" && !call.conversationOutcome.toLowerCase().includes(outcomeFilter.toLowerCase())) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = call.contactName.toLowerCase().includes(q);
        const matchesPhone = call.contactPhone.toLowerCase().includes(q);
        const matchesId = call.id.toLowerCase().includes(q);
        const matchesPurpose = call.callingPurpose.toLowerCase().includes(q);
        const matchesCampaign = call.campaignName.toLowerCase().includes(q);
        const matchesAgent = call.agentName.toLowerCase().includes(q);
        const matchesSummary = call.summary.toLowerCase().includes(q);
        const matchesIntent = call.intent.toLowerCase().includes(q);
        const matchesTranscript = call.transcript.some((t) => t.text.toLowerCase().includes(q));

        if (
          !matchesName &&
          !matchesPhone &&
          !matchesId &&
          !matchesPurpose &&
          !matchesCampaign &&
          !matchesAgent &&
          !matchesSummary &&
          !matchesIntent &&
          !matchesTranscript
        ) {
          return false;
        }
      }

      return true;
    });
  }, [allCalls, selectedGroupId, callTypeFilter, agentFilter, languageFilter, statusFilter, outcomeFilter, searchQuery]);

  // Multi-select helpers
  const handleToggleSelectCall = (callId: string) => {
    setSelectedCallIds((prev) => {
      const next = new Set(prev);
      if (next.has(callId)) next.delete(callId);
      else next.add(callId);
      return next;
    });
  };

  const handleSelectAllInView = () => {
    if (selectedCallIds.size === filteredCalls.length && filteredCalls.length > 0) {
      setSelectedCallIds(new Set());
    } else {
      setSelectedCallIds(new Set(filteredCalls.map((c) => c.id)));
    }
  };

  const handleDeselectAll = () => {
    setSelectedCallIds(new Set());
  };

  const selectedCallsList = useMemo(() => {
    return allCalls.filter((c) => selectedCallIds.has(c.id));
  }, [allCalls, selectedCallIds]);

  // Bulk actions trigger
  const handleOpenBulkExport = (modeTitle: string = "Selected Calls") => {
    try {
      soundSynth.play("click");
    } catch {}
    setBulkExportCalls(selectedCallsList);
    setBulkExportScopeTitle(modeTitle);
    setBulkExportInitialMode("transcripts_pdf");
    setBulkExportOpen(true);
  };

  // Group card export actions - opens in-page modal window without redirecting to another tab
  const handleExportGroupKeyPoints = (group: PurposeCampaignGroup) => {
    try {
      soundSynth.play("click");
    } catch {}
    const groupCalls = allCalls.filter(
      (c) => c.callingPurpose === group.purpose && c.campaignName === group.campaignName
    );
    setBulkExportCalls(groupCalls);
    setBulkExportScopeTitle(`${group.title} Key Points`);
    setBulkExportInitialMode("keypoints_pdf");
    setBulkExportOpen(true);
  };

  const handleExportGroupTranscripts = (group: PurposeCampaignGroup) => {
    try {
      soundSynth.play("click");
    } catch {}
    const groupCalls = allCalls.filter(
      (c) => c.callingPurpose === group.purpose && c.campaignName === group.campaignName
    );
    setBulkExportCalls(groupCalls);
    setBulkExportScopeTitle(`${group.title} Transcripts`);
    setBulkExportInitialMode("transcripts_pdf");
    setBulkExportOpen(true);
  };

  // User edit update handler for KeyPointsModal
  const handleUpdateKeyPointField = (callId: string, fieldKey: string, newValue: string) => {
    setAllCalls((prev) =>
      prev.map((call) => {
        if (call.id !== callId) return call;
        const updatedFields = call.purposeSpecificFields.map((f) =>
          f.key === fieldKey
            ? {
                ...f,
                value: newValue,
                isEdited: true,
                editedBy: "Current User",
                editedAt: new Date().toLocaleTimeString(),
                originalValue: f.originalValue || f.value,
              }
            : f
        );
        return {
          ...call,
          purposeSpecificFields: updatedFields,
        };
      })
    );
  };

  // Convert for CallDrawer compatibility
  const drawerCompatibleCall: RecentCallRecord | null = useMemo(() => {
    if (!transcriptCall) return null;
    return {
      id: transcriptCall.id,
      contactNumber: transcriptCall.contactPhone,
      contactName: transcriptCall.contactName,
      agentName: transcriptCall.agentName,
      direction: transcriptCall.callType === "inbound" ? "inbound" : "outbound",
      duration: transcriptCall.duration,
      durationSeconds: transcriptCall.durationSeconds,
      outcome: (transcriptCall.conversationOutcome as any) || "Interested",
      timestamp: `${transcriptCall.date} ${transcriptCall.timestamp}`,
      timeAgo: transcriptCall.date,
      summary: transcriptCall.summary,
      sentimentScore: transcriptCall.sentimentScore,
      qualification: "Qualified",
      transcriptSnippet: transcriptCall.intent,
      knowledgeDomain: "admissions",
      knowledgeDomainLabel: transcriptCall.callingPurpose,
      groundedDocTitle: transcriptCall.groundedDocTitle,
    };
  }, [transcriptCall]);

  return (
    <div className="space-y-6 pb-20 font-sans text-[#283A50]">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E9E1D4]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-[#707684] hover:text-[#283A50] transition-colors"
            >
              Overview
            </Link>
            <span className="text-[#E9E1D4]">/</span>
            <Link
              href="/dashboard/calls"
              className="text-xs font-semibold text-[#707684] hover:text-[#283A50] transition-colors"
            >
              Live Monitor
            </Link>
            <span className="text-[#E9E1D4]">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2E8066] bg-[#EAF5F0] border border-[#B8E2D4] px-3 py-0.5 rounded-full">
              <History className="w-3.5 h-3.5 text-[#2E8066]" />
              <span>Call History &amp; Intelligence</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#283A50] mt-2 flex items-center gap-3 flex-wrap">
            <span>Call History &amp; Purpose-Based Transcripts</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EAF5F0] text-[#2E8066] border border-[#B8E2D4]">
              {allCalls.length} Sessions Logged
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#2E8066]" />
              <span>Purpose Intelligence</span>
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[#707684] mt-1 max-w-3xl leading-relaxed">
            Calls are organized logically by their calling purpose and campaign. Inspect real execution statuses, review purpose-specific extracted key points from transcripts, and download individual or combined reports.
          </p>
        </div>

        {/* Global Export Shortcuts */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setBulkExportCalls(filteredCalls);
              setBulkExportScopeTitle("Master Call Transcripts");
              setBulkExportInitialMode("transcripts_pdf");
              setBulkExportOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-[#283A50] hover:bg-[#1C2B3C] text-white shadow-xs transition-colors cursor-pointer"
            title="Open Master Transcripts Compilation window on this page"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Master Transcripts (PDF)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setBulkExportCalls(filteredCalls);
              setBulkExportScopeTitle("Master Key Points");
              setBulkExportInitialMode("keypoints_excel");
              setBulkExportOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white hover:bg-black/5 text-[#283A50] border border-[#E9E1D4] transition-colors cursor-pointer"
            title="Open Master Key Points Export window on this page"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#2E8066]" />
            <span>All Key Points (.csv)</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: PURPOSE / CAMPAIGN GROUPS */}
      <PurposeGroupCards
        groups={purposeGroups}
        selectedGroupId={selectedGroupId}
        onSelectGroup={(groupId) => setSelectedGroupId(groupId)}
        onExportGroupKeyPoints={handleExportGroupKeyPoints}
        onExportGroupTranscripts={handleExportGroupTranscripts}
      />

      {/* SECTION 2: SEARCH, FILTERS & SELECTION TOOLBAR */}
      <div className="bg-white p-4 rounded-2xl border border-[#E9E1D4] space-y-3.5 shadow-2xs">
        {/* Search & Main Filter Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#707684] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by contact, phone number, campaign, purpose, agent, or call ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-medium bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-xl text-[#283A50] placeholder:text-[#707684] focus:outline-hidden focus:border-[#283A50] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707684] hover:text-[#283A50]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 shrink-0">
            {/* Call Type Filter */}
            <select
              value={callTypeFilter}
              onChange={(e) => setCallTypeFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-hidden"
            >
              <option value="all">Call Type: All</option>
              <option value="inbound">Inbound</option>
              <option value="outbound">Outbound</option>
              <option value="bulk">Bulk</option>
              <option value="normal">Normal</option>
            </select>

            {/* AI Agent Filter */}
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-hidden"
            >
              <option value="all">Agent: All</option>
              <option value="maya">Maya</option>
              <option value="aryan">Aryan</option>
              <option value="priya">Priya</option>
            </select>

            {/* Language Filter */}
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-hidden"
            >
              <option value="all">Language: All</option>
              <option value="hindi">Hindi</option>
              <option value="english">English</option>
              <option value="tamil">Tamil</option>
              <option value="telugu">Telugu</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-hidden"
            >
              <option value="all">Status: All</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
              <option value="queued">Queued</option>
              <option value="failed">Failed / No Answer</option>
            </select>

            {/* Outcome Filter */}
            <select
              value={outcomeFilter}
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-[#E9E1D4] rounded-xl text-[#283A50] focus:outline-hidden"
            >
              <option value="all">Outcome: All</option>
              <option value="confirmed">Confirmed / Accepted</option>
              <option value="scheduled">Scheduled</option>
              <option value="answered">Enquiry Answered</option>
              <option value="interested">Interested</option>
            </select>

            {/* Reset Filters */}
            {(callTypeFilter !== "all" ||
              agentFilter !== "all" ||
              languageFilter !== "all" ||
              statusFilter !== "all" ||
              outcomeFilter !== "all" ||
              selectedGroupId !== null ||
              searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setCallTypeFilter("all");
                  setAgentFilter("all");
                  setLanguageFilter("all");
                  setStatusFilter("all");
                  setOutcomeFilter("all");
                  setSelectedGroupId(null);
                  setSearchQuery("");
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-[#707684] hover:text-[#283A50] bg-[#FAF5E9] hover:bg-[#E9E1D4] rounded-xl transition-colors cursor-pointer"
                title="Reset active filters (selection is preserved)"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Multi-Select Action Bar (shown when 1+ calls are checked) */}
        {selectedCallIds.size > 0 && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] flex-wrap gap-2 animate-in fade-in">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#283A50]">
                {selectedCallIds.size} of {filteredCalls.length} calls selected
              </span>
              <span className="text-xs text-[#707684]">
                ({selectedCallsList.filter((c) => c.transcriptStatus !== "unavailable").length} eligible for transcript PDF)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenBulkExport("Selected Calls")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#283A50] hover:bg-[#1C2B3C] text-white shadow-xs transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Bulk Export Hub...</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setBulkExportCalls(selectedCallsList);
                  setBulkExportScopeTitle("Selected Transcripts");
                  setBulkExportInitialMode("transcripts_pdf");
                  setBulkExportOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-[#E9E1D4] hover:bg-black/5 text-[#283A50] transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#283A50]" />
                <span>Download Transcripts (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setBulkExportCalls(selectedCallsList);
                  setBulkExportScopeTitle("Selected Key Points");
                  setBulkExportInitialMode("keypoints_excel");
                  setBulkExportOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white border border-[#E9E1D4] hover:bg-black/5 text-[#283A50] transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#2E8066]" />
                <span>Export Key Points (Excel)</span>
              </button>

              <button
                type="button"
                onClick={handleDeselectAll}
                className="text-xs font-bold text-[#707684] hover:text-[#283A50] px-2 py-1"
              >
                Deselect
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 3: COMPACT ESSENTIAL TABLE OF CALL RECORDS */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF5E9] border-b border-[#E9E1D4] text-[#707684] font-bold uppercase text-[10px] tracking-wider">
                <th className="p-3 pl-4 w-10">
                  <input
                    type="checkbox"
                    checked={selectedCallIds.size > 0 && selectedCallIds.size === filteredCalls.length}
                    onChange={handleSelectAllInView}
                    className="rounded border-[#E9E1D4] text-[#283A50] focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="p-3">Contact &amp; Number</th>
                <th className="p-3">Purpose &amp; Campaign</th>
                <th className="p-3">Type</th>
                <th className="p-3">AI Agent &amp; Lang</th>
                <th className="p-3">Date, Time &amp; Duration</th>
                <th className="p-3">Execution Status</th>
                <th className="p-3">Conversation Outcome</th>
                <th className="p-3 text-right pr-4">Intelligence Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E1D4]/60">
              {filteredCalls.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-[#707684]">
                    <div className="max-w-sm mx-auto space-y-2">
                      <HelpCircle className="w-8 h-8 text-[#707684]/50 mx-auto" />
                      <p className="font-semibold text-sm text-[#283A50]">No call records found matching criteria</p>
                      <p className="text-xs text-[#707684]">
                        Try adjusting your search query, purpose filter, or lifecycle status filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCalls.map((call) => {
                  const isChecked = selectedCallIds.has(call.id);
                  const isQueued = call.lifecycleStatus === "queued" || call.lifecycleStatus === "scheduled";
                  const isActive = call.lifecycleStatus === "in-progress";

                  return (
                    <tr
                      key={call.id}
                      onClick={() => setKeyPointsModalCall(call)}
                      className={`hover:bg-[#FAF8F5] transition-colors cursor-pointer ${
                        isChecked ? "bg-[#FAF5E9]/60" : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td
                        className="p-3 pl-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleSelectCall(call.id);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelectCall(call.id)}
                          className="rounded border-[#E9E1D4] text-[#283A50] focus:ring-0 cursor-pointer"
                        />
                      </td>

                      {/* Contact & Phone */}
                      <td className="p-3">
                        <div className="font-bold text-[#283A50] flex items-center gap-1.5">
                          <span>{call.contactName}</span>
                          <span className="text-[10px] font-mono font-normal text-[#707684]">
                            {call.id}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-[#707684] mt-0.5">
                          {formatMaskedPhone(call.contactPhone)}
                        </div>
                      </td>

                      {/* Purpose & Campaign */}
                      <td className="p-3">
                        <div className="font-semibold text-[#283A50] flex items-center gap-1">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              call.callingPurpose.includes("Admissions")
                                ? "bg-orange-500"
                                : call.callingPurpose.includes("Fee")
                                ? "bg-emerald-500"
                                : call.callingPurpose.includes("Sales")
                                ? "bg-blue-500"
                                : call.callingPurpose.includes("Appointment")
                                ? "bg-purple-500"
                                : call.callingPurpose.includes("Feedback")
                                ? "bg-rose-500"
                                : "bg-slate-400"
                            }`}
                          />
                          <span className="line-clamp-1">{call.callingPurpose}</span>
                        </div>
                        <div className="text-[11px] text-[#707684] line-clamp-1">
                          {call.campaignName}
                        </div>
                      </td>

                      {/* Call Type */}
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold capitalize ${
                            call.callType === "inbound"
                              ? "bg-sky-50 text-sky-800 border border-sky-200"
                              : call.callType === "bulk"
                              ? "bg-purple-50 text-purple-800 border border-purple-200"
                              : "bg-amber-50 text-amber-800 border border-amber-200"
                          }`}
                        >
                          {call.callType === "inbound" ? (
                            <PhoneIncoming className="w-2.5 h-2.5" />
                          ) : (
                            <PhoneOutgoing className="w-2.5 h-2.5" />
                          )}
                          <span>{call.callType}</span>
                        </span>
                      </td>

                      {/* AI Agent & Language */}
                      <td className="p-3">
                        <div className="font-semibold text-[#283A50] flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#FAF5E9] border border-[#E9E1D4] text-[10px] font-bold flex items-center justify-center shrink-0">
                            {call.agentAvatar || call.agentName[0]}
                          </span>
                          <span>{call.agentName}</span>
                        </div>
                        <div className="text-[11px] text-[#707684]">{call.language}</div>
                      </td>

                      {/* Date, Time & Duration */}
                      <td className="p-3">
                        <div className="text-[11px] text-[#283A50] font-medium">
                          {call.date} • {call.timestamp}
                        </div>
                        <div className="text-[11px] font-mono text-[#707684]">
                          {isQueued ? (
                            <span className="text-amber-700 font-semibold">Planned: {call.plannedStartTime || "Queue"}</span>
                          ) : isActive ? (
                            <span className="text-indigo-700 font-semibold animate-pulse">Live: {call.duration}</span>
                          ) : (
                            <span>{call.duration}</span>
                          )}
                        </div>
                      </td>

                      {/* Execution Status */}
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                            call.lifecycleStatus === "completed"
                              ? "bg-[#EAF5F0] text-[#2E8066] border border-[#B8E2D4]"
                              : call.lifecycleStatus === "in-progress"
                              ? "bg-indigo-50 text-indigo-800 border border-indigo-200"
                              : isQueued
                              ? "bg-amber-50 text-amber-800 border border-amber-200"
                              : "bg-rose-50 text-rose-800 border border-rose-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              call.lifecycleStatus === "completed"
                                ? "bg-[#2E8066]"
                                : call.lifecycleStatus === "in-progress"
                                ? "bg-indigo-600 animate-pulse"
                                : isQueued
                                ? "bg-amber-600"
                                : "bg-rose-600"
                            }`}
                          />
                          <span>{call.lifecycleStatus}</span>
                        </span>
                      </td>

                      {/* Conversation Outcome */}
                      <td className="p-3">
                        <div className="font-semibold text-xs text-[#283A50] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8066] shrink-0" />
                          <span className="line-clamp-1">{call.conversationOutcome}</span>
                        </div>
                        {call.generalKeyPoints.followUpRequired && (
                          <div className="text-[10px] text-amber-800 font-bold mt-0.5">
                            Follow-up required
                          </div>
                        )}
                      </td>

                      {/* Intelligence Actions */}
                      <td className="p-3 pr-4 text-right">
                        <div
                          className="flex items-center justify-end gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Key Points Action Button - Opens in-page Key Points Window */}
                          <button
                            type="button"
                            onClick={() => {
                              try {
                                soundSynth.play("click");
                              } catch {}
                              setKeyPointsModalCall(call);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#FAF5E9] hover:bg-[#E9E1D4] text-[#283A50] border border-[#E9E1D4] transition-colors cursor-pointer"
                            title="Open extracted Key Points & purpose dossier on this page"
                          >
                            <Sparkles className="w-3 h-3 text-[#2E8066]" />
                            <span>Key Points</span>
                          </button>

                          {/* Transcript Button - Opens in-page Transcript Window */}
                          <button
                            type="button"
                            disabled={call.transcriptStatus === "unavailable" || call.transcript.length === 0}
                            onClick={() => {
                              try {
                                soundSynth.play("click");
                              } catch {}
                              setTranscriptCall(call);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-white hover:bg-black/5 text-[#283A50] border border-[#E9E1D4] disabled:opacity-40 transition-colors cursor-pointer"
                            title={
                              call.transcriptStatus === "unavailable"
                                ? "Transcript not available for this call"
                                : "View transcript and audio on this page"
                            }
                          >
                            <FileText className="w-3 h-3 text-[#707684]" />
                            <span>Transcript</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Bottom Footer Summary */}
        <div className="p-3 px-4 bg-[#FAF5E9] border-t border-[#E9E1D4] flex items-center justify-between text-xs text-[#707684] flex-wrap gap-2">
          <div>
            Showing <strong className="text-[#283A50]">{filteredCalls.length}</strong> of{" "}
            <strong className="text-[#283A50]">{allCalls.length}</strong> total call records
            {selectedGroupId && " in selected purpose group"}
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2E8066]" />
              <span>Completed</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>In-Progress</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <span>Queued</span>
            </span>
          </div>
        </div>
      </div>

      {/* MODAL 1: KEY POINTS INSPECTION & DOWNLOAD (In-Page Window) */}
      <KeyPointsModal
        call={keyPointsModalCall}
        isOpen={Boolean(keyPointsModalCall)}
        onClose={() => setKeyPointsModalCall(null)}
        onOpenTranscript={(c) => {
          setKeyPointsModalCall(null);
          setTranscriptCall(c);
        }}
        onUpdateField={handleUpdateKeyPointField}
      />

      {/* MODAL 2: BULK INTELLIGENCE EXPORT HUB (In-Page Window) */}
      <BulkExportModal
        selectedCalls={bulkExportCalls.length > 0 ? bulkExportCalls : selectedCallsList}
        isOpen={bulkExportOpen}
        onClose={() => setBulkExportOpen(false)}
        scopeTitle={bulkExportScopeTitle}
        initialMode={bulkExportInitialMode}
      />

      {/* MODAL 3: FULL TRANSCRIPT VIEW MODAL (In-Page Window) */}
      {transcriptCall && (
        <div
          onClick={() => setTranscriptCall(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#E9E1D4] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#283A50] my-auto animate-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="p-6 bg-[#FAF5E9] border-b border-[#E9E1D4] flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold bg-white px-2.5 py-0.5 rounded-full border border-[#E9E1D4]">
                    {transcriptCall.id}
                  </span>
                  <span className="text-xs font-bold text-[#2E8066] bg-[#EAF5F0] border border-[#B8E2D4] px-2.5 py-0.5 rounded-full">
                    {transcriptCall.callingPurpose}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#283A50] tracking-tight flex items-center gap-2">
                  <span>{transcriptCall.contactName}</span>
                  <span className="text-xs font-mono font-normal text-[#707684]">
                    ({formatMaskedPhone(transcriptCall.contactPhone)})
                  </span>
                </h3>
                <div className="text-xs text-[#707684] mt-0.5">
                  Handled by <strong>{transcriptCall.agentName}</strong> • {transcriptCall.language} • {transcriptCall.date} {transcriptCall.timestamp} ({transcriptCall.duration})
                </div>
              </div>

              <button
                type="button"
                onClick={() => setTranscriptCall(null)}
                className="w-8 h-8 rounded-full bg-white border border-[#E9E1D4] hover:bg-black/5 text-[#707684] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Audio Wave Player Bar */}
            <div className="p-4 px-6 bg-white border-b border-[#E9E1D4] flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (playingCallId === transcriptCall.id) {
                      setPlayingCallId(null);
                    } else {
                      setPlayingCallId(transcriptCall.id);
                      try {
                        soundSynth.play("click");
                      } catch {}
                    }
                  }}
                  className="w-9 h-9 rounded-full bg-[#283A50] hover:bg-[#1C2B3C] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                >
                  {playingCallId === transcriptCall.id ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" />
                  )}
                </button>
                <div>
                  <div className="text-xs font-bold text-[#283A50]">Audio Recording Preview</div>
                  <div className="text-[11px] text-[#707684] font-mono">
                    {playingCallId === transcriptCall.id ? "Playing back session..." : `Duration: ${transcriptCall.duration}`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => downloadIndividualTranscriptPdf(transcriptCall)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FAF5E9] hover:bg-[#E9E1D4] text-[#283A50] border border-[#E9E1D4] transition-colors cursor-pointer"
                  title="Download transcript as PDF directly on this page"
                >
                  <Printer className="w-3.5 h-3.5 text-[#2E8066]" />
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const fullText = transcriptCall.transcript
                      .map((t) => `[${t.time}] ${t.speakerName}: ${t.text}`)
                      .join("\n\n");
                    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `transcript-${transcriptCall.id}-${transcriptCall.contactName.replace(/\s+/g, "_")}.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white hover:bg-black/5 text-[#283A50] border border-[#E9E1D4] transition-colors cursor-pointer"
                  title="Download transcript as raw text"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Text (.txt)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const c = transcriptCall;
                    setTranscriptCall(null);
                    setKeyPointsModalCall(c);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FAF5E9] hover:bg-[#E9E1D4] text-[#283A50] border border-[#E9E1D4] transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#2E8066]" />
                  <span>View Key Points</span>
                </button>
              </div>
            </div>

            {/* Dialog Turns */}
            <div className="p-6 overflow-y-auto space-y-3 flex-1 bg-[#FAF8F5]/50">
              {transcriptCall.transcript.length === 0 ? (
                <div className="p-8 text-center text-[#707684] text-xs">
                  No transcript available for this call.
                </div>
              ) : (
                transcriptCall.transcript.map((turn) => (
                  <div
                    key={turn.id}
                    className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                      turn.speaker === "agent"
                        ? "bg-white border-[#E9E1D4] ml-0 mr-8"
                        : "bg-[#FAF5E9] border-[#E9E1D4] ml-8 mr-0"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#707684] mb-1">
                      <span className="flex items-center gap-1 text-[#283A50]">
                        {turn.speaker === "agent" ? (
                          <Bot className="w-3.5 h-3.5 text-[#283A50]" />
                        ) : (
                          <User className="w-3.5 h-3.5 text-[#2E8066]" />
                        )}
                        <span>{turn.speakerName}</span>
                      </span>
                      <span className="font-mono text-[10px]">{turn.time}</span>
                    </div>
                    <p className="text-[#283A50] font-medium">{turn.text}</p>
                    {turn.groundedDocCitation && (
                      <div className="mt-2 text-[10px] text-[#2E8066] font-semibold flex items-center gap-1 bg-[#EAF5F0] p-1.5 rounded-lg border border-[#B8E2D4]">
                        <Sparkles className="w-3 h-3 text-[#2E8066]" />
                        <span>Source Citation: {turn.groundedDocCitation}</span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 px-6 bg-[#FAF5E9] border-t border-[#E9E1D4] flex items-center justify-between">
              <span className="text-xs text-[#707684] font-mono">
                Log ID: {transcriptCall.id} • {transcriptCall.transcript.length} turns
              </span>
              <button
                type="button"
                onClick={() => setTranscriptCall(null)}
                className="px-5 py-2 rounded-full text-xs font-bold bg-[#283A50] hover:bg-[#1C2B3C] text-white shadow-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Call Drawer Backup */}
      <CallDrawer
        call={drawerCompatibleCall}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Export Report Modal */}
      <ExportReportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </div>
  );
}

export default function CallHistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-[#707684] text-xs">
          Loading Purpose-Based Call Intelligence &amp; Transcripts...
        </div>
      }
    >
      <CallHistoryPageContent />
    </Suspense>
  );
}
