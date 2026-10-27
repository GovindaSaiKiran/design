"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
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
  ArrowUpRight,
  Eye,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Zap,
  PhoneIncoming,
  PhoneOutgoing,
  X,
  SlidersHorizontal,
  Bot,
  Activity,
  Headphones,
  Database,
  Calendar,
  Volume2,
  Users,
  ShieldCheck,
  GraduationCap,
  CreditCard,
  Building2,
  Wrench,
  BookOpen,
  Plus,
  Layers,
  FileText,
  Flame,
  Send,
  PauseCircle,
  PlayCircle,
  Sliders,
  RefreshCw,
  Gauge,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import ExportReportModal from "@/components/dashboard/modals/ExportReportModal";
import TestCallModal from "@/components/dashboard/modals/TestCallModal";
import StartCampaignModal from "@/components/dashboard/modals/StartCampaignModal";
import CallDrawer from "@/components/dashboard/views/CallDrawer";
import { LiveCallItem, RecentCallRecord, CallOutcome } from "@/types/dashboard";
import { mockRecentCalls } from "@/data/mock/dashboardData";
import { soundSynth } from "@/lib/audio-synth";

export type KnowledgeCategory = "sales" | "billing" | "support" | "technical" | "admissions" | "fees" | "hostels";

export interface KnowledgeDomainConfig {
  id: KnowledgeCategory;
  name: string;
  shortLabel: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor: string;
  pillColor: string;
  themeGradient: string;
  vectorDoc: string;
  description: string;
  retrievalConfidence: string;
  sampleQuery: string;
}

export const KNOWLEDGE_DOMAINS: KnowledgeDomainConfig[] = [
  {
    id: "sales",
    name: "Enterprise Sales & SLA",
    shortLabel: "Sales & SLA",
    emoji: "💼",
    icon: Building2,
    badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
    pillColor: "bg-gradient-to-r from-amber-500 to-rose-500 text-white",
    themeGradient: "from-amber-500/10 to-rose-500/10 border-amber-300/80",
    vectorDoc: "Enterprise_SLA_Product_Catalog_2026.pdf",
    description: "Volume tiers, high-availability SLA, SIP trunk peering & dedicated account management",
    retrievalConfidence: "99.4%",
    sampleQuery: "Enterprise multi-region SIP peering SLA & concurrency",
  },
  {
    id: "billing",
    name: "Billing, Invoicing & Contracts",
    shortLabel: "Billing & Plans",
    emoji: "💳",
    icon: CreditCard,
    badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
    pillColor: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white",
    themeGradient: "from-emerald-500/10 to-teal-500/10 border-emerald-300/80",
    vectorDoc: "Service_Pricing_Invoicing_Policy_2026.pdf",
    description: "Per-minute billing increments, monthly usage invoicing, payment cycles & contract terms",
    retrievalConfidence: "98.9%",
    sampleQuery: "Net-30 invoice terms and per-minute tiered volume discounts",
  },
  {
    id: "support",
    name: "Customer Operations & Care",
    shortLabel: "Customer Care",
    emoji: "🎧",
    icon: PhoneIncoming,
    badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
    pillColor: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white",
    themeGradient: "from-blue-500/10 to-indigo-500/10 border-blue-300/80",
    vectorDoc: "Customer_Operations_Escalation_Runbook.pdf",
    description: "Standard support triage, L2 escalation workflows, call recording retrieval & SLAs",
    retrievalConfidence: "99.1%",
    sampleQuery: "L2 technical escalation path and emergency contact roster",
  },
  {
    id: "technical",
    name: "Technical & API Integrations",
    shortLabel: "API & Webhooks",
    emoji: "🛠️",
    icon: Wrench,
    badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
    pillColor: "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white",
    themeGradient: "from-purple-500/10 to-fuchsia-500/10 border-purple-300/80",
    vectorDoc: "Telephony_Webhooks_API_Reference_v2.pdf",
    description: "Webhook callback signatures, CRM bi-directional sync, SIP trunk authentication & error codes",
    retrievalConfidence: "99.6%",
    sampleQuery: "HMAC-SHA256 signature verification for outbound webhook events",
  },
];

interface LiveActiveCall {
  id: string;
  callerName: string;
  callerPhone: string;
  agentName: string;
  agentRole: string;
  agentAvatar: string;
  agentTheme: string;
  direction: "inbound" | "outbound";
  durationSeconds: number;
  currentSentiment: "positive" | "neutral" | "urgent";
  knowledgeDomain: KnowledgeCategory;
  knowledgeDomainLabel: string;
  groundedDocTitle: string;
  groundedChunkRef: string;
  knowledgeFactRetrieved: string;
  currentTopic: string;
  currentTurnSpeaker: "caller" | "agent";
  currentLiveSnippet: string;
  liveExtractedData: {
    [key: string]: string | undefined;
  };
  audioWaveLevels: number[];
  startedAt: string;
  latencyMs: number;
  channel: string;
}

export interface LiveBulkChannel {
  id: string;
  channelIndex: number;
  contactName: string;
  phone: string;
  durationSeconds: number;
  agentName: string;
  agentAvatar: string;
  agentTheme: string;
  status: "connected" | "ringing" | "wrap_up";
  currentSentiment: "positive" | "neutral" | "urgent";
  currentSnippet: string;
  groundedKnowledge: string;
  audioWaveLevels: number[];
  latencyMs: number;
}

export interface LiveBulkCampaign {
  id: string;
  title: string;
  knowledgeDomain: KnowledgeCategory;
  knowledgeDomainLabel: string;
  groundedDocTitle: string;
  assignedAgent: string;
  agentAvatar: string;
  agentTheme: string;
  totalContacts: number;
  dialedCount: number;
  connectedCount: number;
  noAnswerCount: number;
  handoffCount: number;
  concurrentLines: number;
  maxConcurrency: number;
  dialRatePerMin: number;
  status: "active" | "paused" | "completed";
  startedAt: string;
  targetAudience: string;
  liveChannels: LiveBulkChannel[];
}

interface CallRow {
  id: string;
  name: string;
  phone: string;
  intent: string;
  knowledgeDomain: KnowledgeCategory;
  knowledgeDomainLabel: string;
  groundedDocTitle: string;
  agent: string;
  language: string;
  duration: string;
  direction: "inbound" | "outbound";
  status: "live" | "completed" | "transferred" | "missed";
  sentiment: "positive" | "neutral" | "urgent";
  timestamp: string;
  outcome: CallOutcome;
  qualification: string;
  transcriptSnippet: string;
  extractedData?: {
    [key: string]: string | undefined;
  };
}

// Active individual calls currently occurring in real time divided by knowledge domain
// Cleared active calls, bulk campaigns, and previous calls (zero mock records)
const initialLiveActiveCalls: LiveActiveCall[] = [];
const initialLiveBulkCampaigns: LiveBulkCampaign[] = [];
const initialCallsData: CallRow[] = [];

function CallsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"live-now" | "live-bulk" | "previous-calls">("live-now");
  const [selectedKnowledge, setSelectedKnowledge] = useState<"all" | KnowledgeCategory>("all");
  const [directionFilter, setDirectionFilter] = useState<"all" | "inbound" | "outbound">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [agentFilter, setAgentFilter] = useState<string>("all");
  const [selectedCall, setSelectedCall] = useState<RecentCallRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [startCampaignModalOpen, setStartCampaignModalOpen] = useState(false);
  const [callsList, setCallsList] = useState<CallRow[]>(initialCallsData);

  // Live individual active calls
  const [liveCalls, setLiveCalls] = useState<LiveActiveCall[]>(initialLiveActiveCalls);
  const [selectedLiveCallModal, setSelectedLiveCallModal] = useState<LiveActiveCall | null>(null);

  // Live Bulk Calling Campaigns
  const [bulkCampaigns, setBulkCampaigns] = useState<LiveBulkCampaign[]>(initialLiveBulkCampaigns);
  const [expandedCampaignId, setExpandedCampaignId] = useState<string | null>("bulk-camp-admissions");

  // Tick live call seconds every second
  useEffect(() => {
    const timer = setInterval(() => {
      // Tick live individual calls
      setLiveCalls((prev) =>
        prev.map((c) => ({
          ...c,
          durationSeconds: c.durationSeconds + 1,
        }))
      );

      // Tick bulk campaign channels and wave levels
      setBulkCampaigns((prev) =>
        prev.map((camp) => {
          if (camp.status !== "active") return camp;
          const updatedChannels = camp.liveChannels.map((ch) => ({
            ...ch,
            durationSeconds: ch.durationSeconds + 1,
            audioWaveLevels: ch.audioWaveLevels.map(() => Math.floor(25 + Math.random() * 75)),
          }));
          return {
            ...camp,
            liveChannels: updatedChannels,
          };
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Tick bulk campaign progress counts every 3 seconds for active campaigns
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setBulkCampaigns((prev) =>
        prev.map((camp) => {
          if (camp.status !== "active") return camp;
          if (camp.dialedCount >= camp.totalContacts) return camp;
          const increment = Math.floor(1 + Math.random() * 2);
          const newDialed = Math.min(camp.totalContacts, camp.dialedCount + increment);
          const newConnected = camp.connectedCount + (Math.random() > 0.25 ? increment : 0);
          return {
            ...camp,
            dialedCount: newDialed,
            connectedCount: newConnected,
          };
        })
      );
    }, 3000);
    return () => clearInterval(progressTimer);
  }, []);

  // Sync direction filter from URL query param
  useEffect(() => {
    const dir = searchParams.get("direction");
    if (dir === "inbound" || dir === "outbound") {
      setDirectionFilter(dir);
    } else if (dir === "all") {
      setDirectionFilter("all");
    }
  }, [searchParams]);

  // Filtered live calls by knowledge category
  const filteredLiveCalls = useMemo(() => {
    return liveCalls.filter((call) => {
      if (selectedKnowledge !== "all" && call.knowledgeDomain !== selectedKnowledge) {
        return false;
      }
      return true;
    });
  }, [liveCalls, selectedKnowledge]);

  // Filtered live bulk campaigns by knowledge category
  const filteredBulkCampaigns = useMemo(() => {
    return bulkCampaigns.filter((camp) => {
      if (selectedKnowledge !== "all" && camp.knowledgeDomain !== selectedKnowledge) {
        return false;
      }
      return true;
    });
  }, [bulkCampaigns, selectedKnowledge]);

  // Total concurrent lines across all active bulk campaigns
  const totalBulkConcurrentLines = useMemo(() => {
    return bulkCampaigns
      .filter((c) => c.status === "active")
      .reduce((sum, c) => sum + c.concurrentLines, 0);
  }, [bulkCampaigns]);

  const totalBulkContacts = useMemo(() => {
    return bulkCampaigns.reduce((sum, c) => sum + c.totalContacts, 0);
  }, [bulkCampaigns]);

  const totalDialRate = useMemo(() => {
    return bulkCampaigns
      .filter((c) => c.status === "active")
      .reduce((sum, c) => sum + c.dialRatePerMin, 0);
  }, [bulkCampaigns]);

  // Filtered previous calls by knowledge category, direction, search, status, and agent
  const filteredCalls = useMemo(() => {
    return callsList.filter((call) => {
      const matchesKnowledge =
        selectedKnowledge === "all" || call.knowledgeDomain === selectedKnowledge;

      const matchesDirection =
        directionFilter === "all" || call.direction === directionFilter;

      const matchesSearch =
        call.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.phone.includes(searchQuery) ||
        call.intent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
        call.knowledgeDomainLabel.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && call.status === "completed") ||
        (statusFilter === "transferred" && call.status === "transferred") ||
        (statusFilter === "missed" && call.status === "missed");

      const matchesAgent =
        agentFilter === "all" || call.agent.toLowerCase().includes(agentFilter.toLowerCase());

      return matchesKnowledge && matchesDirection && matchesSearch && matchesStatus && matchesAgent;
    });
  }, [callsList, searchQuery, statusFilter, agentFilter, directionFilter, selectedKnowledge]);

  const handleInspect = (call?: CallRow) => {
    if (!call) return;
    try {
      soundSynth.play("click");
    } catch {}
    const record: RecentCallRecord = {
      id: call.id,
      contactNumber: call.phone,
      contactName: call.name,
      agentName: call.agent,
      direction: call.direction,
      duration: call.duration,
      durationSeconds: 162,
      outcome: call.outcome,
      timestamp: call.timestamp,
      timeAgo: call.timestamp,
      summary: call.transcriptSnippet,
      sentimentScore: call.sentiment === "positive" ? 94 : call.sentiment === "urgent" ? 65 : 85,
      qualification: call.qualification,
      transcriptSnippet: call.transcriptSnippet,
      audioRecordingUrl: "https://actions.google.com/sounds/v1/speech/female_affirmation.ogg",
      knowledgeDomain: call.knowledgeDomain,
      knowledgeDomainLabel: call.knowledgeDomainLabel,
      groundedDocTitle: call.groundedDocTitle,
    };
    setSelectedCall(record);
    setDrawerOpen(true);
  };

  const handleOpenLiveListener = (liveCall: LiveActiveCall) => {
    try {
      soundSynth.play("confirm");
    } catch {}
    setSelectedLiveCallModal(liveCall);
  };

  const handleInspectBulkChannel = (camp: LiveBulkCampaign, channel: LiveBulkChannel) => {
    try {
      soundSynth.play("confirm");
    } catch {}
    const modalCall: LiveActiveCall = {
      id: channel.id,
      callerName: channel.contactName,
      callerPhone: channel.phone,
      agentName: channel.agentName,
      agentRole: `${camp.knowledgeDomainLabel} Bulk Voice Agent`,
      agentAvatar: channel.agentAvatar,
      agentTheme: channel.agentTheme,
      direction: "outbound",
      durationSeconds: channel.durationSeconds,
      currentSentiment: channel.currentSentiment,
      knowledgeDomain: camp.knowledgeDomain,
      knowledgeDomainLabel: camp.knowledgeDomainLabel,
      groundedDocTitle: camp.groundedDocTitle,
      groundedChunkRef: `Channel #${channel.channelIndex}: Concurrent Blast Line`,
      knowledgeFactRetrieved: channel.groundedKnowledge,
      currentTopic: camp.title,
      currentTurnSpeaker: "agent",
      currentLiveSnippet: channel.currentSnippet,
      liveExtractedData: {
        campaign: camp.title,
        channel: `Line #${channel.channelIndex}`,
        contact: channel.contactName,
        dialRate: `${camp.dialRatePerMin} calls/min`,
      },
      audioWaveLevels: channel.audioWaveLevels,
      startedAt: "Active in Bulk Wave",
      latencyMs: channel.latencyMs,
      channel: `SIP Bulk Trunk 0${channel.channelIndex}`,
    };
    setSelectedLiveCallModal(modalCall);
  };

  const handleToggleCampaignStatus = (campaignId: string) => {
    try {
      soundSynth.play("click");
    } catch {}
    setBulkCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaignId
          ? { ...c, status: c.status === "active" ? "paused" : "active" }
          : c
      )
    );
  };

  const handleAdjustConcurrency = (campaignId: string, lines: number) => {
    try {
      soundSynth.play("confirm");
    } catch {}
    setBulkCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, concurrentLines: lines } : c))
    );
  };

  const handleSimulateDomainCall = (domain: KnowledgeCategory) => {
    try {
      soundSynth.play("confirm");
    } catch {}

    const cfg = KNOWLEDGE_DOMAINS.find((k) => k.id === domain);
    if (!cfg) return;

    // Check if there's already a live call with this domain
    const existing = liveCalls.find((c) => c.knowledgeDomain === domain);
    if (existing) {
      setSelectedKnowledge(domain);
      setActiveTab("live-now");
      handleOpenLiveListener(existing);
      return;
    }

    // Otherwise create a simulated live call for this domain
    const newSimCall: LiveActiveCall = {
      id: `live-call-sim-${Date.now()}`,
      callerName:
        domain === "admissions"
          ? "Divya Kapoor"
          : domain === "fees"
          ? "Karthik Nair"
          : domain === "hostels"
          ? "Sameer Joshi"
          : "Pooja Hegde",
      callerPhone: `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`,
      agentName: domain === "fees" ? "Priya" : domain === "hostels" ? "Arjun" : "Maya",
      agentRole: cfg.shortLabel + " Specialist",
      agentAvatar: domain === "fees" ? "P" : domain === "hostels" ? "A" : "M",
      agentTheme:
        domain === "fees"
          ? "from-emerald-600 to-teal-600"
          : domain === "hostels"
          ? "from-blue-600 to-indigo-600"
          : domain === "technical"
          ? "from-purple-600 to-fuchsia-600"
          : "from-[#FF6B08] to-[#E11D48]",
      direction: "inbound",
      durationSeconds: 14,
      currentSentiment: "positive",
      knowledgeDomain: domain,
      knowledgeDomainLabel: cfg.name,
      groundedDocTitle: cfg.vectorDoc,
      groundedChunkRef: `Chunk #0${Math.floor(Math.random() * 9 + 1)}: ${cfg.shortLabel} Protocol`,
      knowledgeFactRetrieved: `Verified knowledge base data retrieved from ${cfg.vectorDoc} with ${cfg.retrievalConfidence} semantic grounding.`,
      currentTopic: `${cfg.name} Live Inquiry`,
      currentTurnSpeaker: "agent",
      currentLiveSnippet: `Hello! I have our ${cfg.vectorDoc} loaded right now. How can I assist you with your ${cfg.shortLabel} query today?`,
      liveExtractedData: {
        domain: cfg.shortLabel,
        knowledgeGrounded: cfg.vectorDoc,
        status: "Active Voice Turn",
      },
      audioWaveLevels: [50, 75, 90, 60, 80, 45, 90, 65, 80, 50, 70, 85],
      startedAt: "Just now",
      latencyMs: 124,
      channel: `SIP Carrier Trunk 0${Math.floor(Math.random() * 4 + 1)}`,
    };

    setLiveCalls((prev) => [newSimCall, ...prev]);
    setSelectedKnowledge(domain);
    setActiveTab("live-now");
  };

  const handleCampaignStarted = (title: string, count: number) => {
    try {
      soundSynth.play("confirm");
    } catch {}

    const domain = selectedKnowledge === "all" ? "admissions" : selectedKnowledge;
    const cfg = KNOWLEDGE_DOMAINS.find((k) => k.id === domain) || KNOWLEDGE_DOMAINS[0];

    const newBulkCamp: LiveBulkCampaign = {
      id: `bulk-camp-${Date.now()}`,
      title,
      knowledgeDomain: domain,
      knowledgeDomainLabel: cfg.name,
      groundedDocTitle: cfg.vectorDoc,
      assignedAgent: domain === "fees" ? "Priya (Finance AI)" : "Maya (Admissions AI)",
      agentAvatar: domain === "fees" ? "P" : "M",
      agentTheme: domain === "fees" ? "from-emerald-600 to-teal-600" : "from-[#FF6B08] to-[#E11D48]",
      totalContacts: count || 850,
      dialedCount: 14,
      connectedCount: 11,
      noAnswerCount: 2,
      handoffCount: 1,
      concurrentLines: 30,
      maxConcurrency: 50,
      dialRatePerMin: 22,
      status: "active",
      startedAt: "Just now",
      targetAudience: "Custom Uploaded Contact Pool",
      liveChannels: [
        {
          id: `bulk-ch-new-1`,
          channelIndex: 1,
          contactName: "Sunil Narang",
          phone: "+91 98210 11200",
          durationSeconds: 12,
          agentName: "Maya",
          agentAvatar: "M",
          agentTheme: "from-[#FF6B08] to-[#E11D48]",
          status: "connected",
          currentSentiment: "positive",
          currentSnippet: `Hello Sunil! I am calling regarding your recent inquiry for ${cfg.name}.`,
          groundedKnowledge: `${cfg.vectorDoc} Instant RAG Grounding`,
          audioWaveLevels: [45, 80, 95, 70, 85, 60, 75, 90],
          latencyMs: 121,
        },
      ],
    };

    setBulkCampaigns((prev) => [newBulkCamp, ...prev]);
    setActiveTab("live-bulk");
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const inboundCount = callsList.filter((c) => c.direction === "inbound").length;
  const outboundCount = callsList.filter((c) => c.direction === "outbound").length;

  const activeDomainConfig = KNOWLEDGE_DOMAINS.find((d) => d.id === selectedKnowledge);

  return (
    <div className="space-y-6 pb-20 font-sans text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-black/45 hover:text-black transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Live Calling Operations</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A] mt-2 flex items-center gap-3 flex-wrap">
            <span>Live Calling Operations</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                {liveCalls.length} 1-on-1 Connected
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current text-amber-600" />
                <span>{totalBulkConcurrentLines} Bulk Lines Active</span>
              </span>
            </div>
          </h1>

          <p className="text-sm text-black/55 mt-1 max-w-2xl leading-relaxed">
            Monitor real-time active individual calls and concurrent bulk calling blast campaigns. Calls are partitioned by knowledge base (Admissions, Fees, Hostels, Technical) with instant audio inspection &amp; multi-channel SIP controls.
          </p>
        </div>


      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Live Individual Calls"
          icon={Radio}
          description="Active conversational SIP sessions currently connected to agents."
          metric={`${liveCalls.length} Calls Live`}
          metricLabel="Maya (Admissions), Priya (Fees) & Arjun"
          status="Live On Air"
          statusType="ready"
          actionLabel="View 1-on-1 feeds ↓"
          onClick={() => setActiveTab("live-now")}
        />

        <WorkspaceCard
          name="Live Bulk Calling Blasts"
          icon={Zap}
          description="Mass outbound dialing campaigns running concurrent SIP lines."
          metric={`${totalBulkConcurrentLines} Lines Active`}
          metricLabel={`${filteredBulkCampaigns.length} Active Wave Blasts (${totalDialRate}/min)`}
          status="Dialing Now"
          statusType="ready"
          actionLabel="View bulk channels ↓"
          onClick={() => setActiveTab("live-bulk")}
        />

        <WorkspaceCard
          name="Knowledge Domains"
          icon={Layers}
          description="Vector knowledge categories partitioning inbound & outbound traffic."
          metric="4 Categories"
          metricLabel="Admissions, Fees, Hostels, Technical"
          status="RAG Grounded"
          statusType="ready"
          actionLabel="Filter by topic ↓"
        />

        <WorkspaceCard
          name="Carrier Telecom Concurrency"
          icon={Activity}
          description="Mean speech-to-speech round-trip across carrier gateway lines."
          metric={`${totalBulkConcurrentLines + liveCalls.length} / 120 Channels`}
          metricLabel="Sub-140ms acoustic turn SLA"
          status="Optimal SLA"
          statusType="ready"
          actionLabel="View telemetry →"
          onClick={() => router.push("/dashboard/analytics")}
        />
      </div>

      {/* ======================================================================= */}
      {/* KNOWLEDGE-BASED CALL DIVISION BAR (ADMISSIONS / FEES / HOSTELS / TECH) */}
      {/* ======================================================================= */}
      {/* ======================================================================= */}
      {/* SLEEK OPERATIONS CONTROLS & KNOWLEDGE DOMAIN FILTERS                   */}
      {/* ======================================================================= */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-black/[0.08] p-3 shadow-2xs space-y-3">
        {/* Row 1: Section Switcher Tabs + Carrier Gateway Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-[#F5F2EB] rounded-xl border border-black/[0.05] overflow-x-auto scrollbar-none">
            {/* Tab 1: 1-on-1 Live Calls */}
            <button
              type="button"
              onClick={() => {
                try {
                  soundSynth.play("click");
                } catch {}
                setActiveTab("live-now");
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "live-now"
                  ? "bg-white text-rose-700 shadow-xs border border-rose-200"
                  : "text-black/60 hover:text-black hover:bg-white/50"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>1-on-1 Live Calls</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  activeTab === "live-now" ? "bg-rose-100 text-rose-800" : "bg-black/5 text-black/50"
                }`}
              >
                {filteredLiveCalls.length}
              </span>
            </button>

            {/* Tab 2: Bulk Blasts */}
            <button
              type="button"
              onClick={() => {
                try {
                  soundSynth.play("click");
                } catch {}
                setActiveTab("live-bulk");
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "live-bulk"
                  ? "bg-white text-amber-800 shadow-xs border border-amber-200"
                  : "text-black/60 hover:text-black hover:bg-white/50"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-current" />
              <span>Bulk Calling Blasts</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  activeTab === "live-bulk" ? "bg-amber-100 text-amber-800" : "bg-black/5 text-black/50"
                }`}
              >
                {filteredBulkCampaigns.length} Waves • {totalBulkConcurrentLines} Lines
              </span>
            </button>

            {/* Tab 3: Previous Ledger */}
            <button
              type="button"
              onClick={() => {
                try {
                  soundSynth.play("click");
                } catch {}
                setActiveTab("previous-calls");
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "previous-calls"
                  ? "bg-white text-[#18181B] shadow-xs border border-black/10"
                  : "text-black/60 hover:text-black hover:bg-white/50"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Call Ledger</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  activeTab === "previous-calls" ? "bg-black/10 text-black/80" : "bg-black/5 text-black/50"
                }`}
              >
                {filteredCalls.length}
              </span>
            </button>
          </div>

          {/* Right Status */}
          <div className="flex items-center gap-2 text-xs font-medium text-black/55 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-emerald-800">WebSocket Carrier Active</span>
            <span className="text-black/25">•</span>
            <span className="text-[11px] text-black/45">Sub-140ms acoustic SLA</span>
          </div>
        </div>

        {/* Row 2: Sleek Knowledge Domain Segmented Filter */}
        <div className="pt-2.5 border-t border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <div className="flex items-center gap-1.5 mr-1 text-xs font-bold text-black/55">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>Topic:</span>
            </div>

            {/* Pill: All */}
            <button
              type="button"
              onClick={() => {
                try {
                  soundSynth.play("click");
                } catch {}
                setSelectedKnowledge("all");
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                selectedKnowledge === "all"
                  ? "bg-[#18181B] text-white border-[#18181B] shadow-xs"
                  : "bg-white hover:bg-[#FAF8F3] text-black/65 border-black/[0.08]"
              }`}
            >
              <span>🌐 All Topics</span>
            </button>

            {/* Pills: Admissions, Fees, Hostels, Technical */}
            {KNOWLEDGE_DOMAINS.map((domain) => {
              const isSelected = selectedKnowledge === domain.id;
              const liveCount = liveCalls.filter((c) => c.knowledgeDomain === domain.id).length;
              return (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => {
                    try {
                      soundSynth.play("click");
                    } catch {}
                    setSelectedKnowledge(domain.id);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    isSelected
                      ? `${domain.pillColor} border-transparent shadow-xs`
                      : "bg-white hover:bg-[#FAF8F3] text-black/65 border-black/[0.08]"
                  }`}
                >
                  <span>{domain.emoji}</span>
                  <span>{domain.shortLabel}</span>
                  <span
                    className={`px-1 py-0.2 rounded-full text-[9.5px] font-bold ${
                      isSelected ? "bg-white/25 text-white" : "bg-black/5 text-black/50"
                    }`}
                  >
                    {liveCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right side: Active RAG Document & Quick Action */}
          {activeDomainConfig ? (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] font-semibold text-indigo-900 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full flex items-center gap-1 truncate max-w-[260px]">
                <Database className="w-3 h-3 text-indigo-600 shrink-0" />
                <span className="truncate">{activeDomainConfig.vectorDoc}</span>
                <span className="text-emerald-700 font-bold ml-1">({activeDomainConfig.retrievalConfidence})</span>
              </span>
              <button
                type="button"
                onClick={() => handleSimulateDomainCall(activeDomainConfig.id)}
                className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#111] hover:bg-black text-white cursor-pointer shadow-2xs transition-all hover:scale-102 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Simulate Call</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedKnowledge("all")}
                className="p-1 rounded-full text-black/40 hover:text-black hover:bg-black/5 cursor-pointer transition-colors"
                title="Clear domain filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <span className="text-[11px] font-medium text-black/45 hidden lg:inline">
              4 Active Vector Stores Grounded • Click any topic to focus feeds
            </span>
          )}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* SECTION 1: INDIVIDUAL CALLS NOW ON LIVE                                 */}
      {/* ======================================================================= */}
      {activeTab === "live-now" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span>
                1-on-1 Voice Channels (
                {filteredLiveCalls.length}{" "}
                {selectedKnowledge !== "all"
                  ? `on ${activeDomainConfig?.shortLabel}`
                  : "Connected Across 4 Knowledge Domains"}
                )
              </span>
            </h3>
            <span className="text-[11px] text-black/50">
              Live updates every second via WebSocket Carrier Gateway
            </span>
          </div>

          {filteredLiveCalls.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-black/[0.06] space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <h4 className="text-sm font-bold text-[#1A1A1A]">
                No active 1-on-1 calls currently connected for {activeDomainConfig?.name || "this topic"}
              </h4>
              <p className="text-xs text-black/55 max-w-md mx-auto leading-relaxed">
                You can instantly simulate a caller inquiring about {activeDomainConfig?.shortLabel || "this topic"} or check the live bulk calling blasts on air.
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                {activeDomainConfig && (
                  <button
                    type="button"
                    onClick={() => handleSimulateDomainCall(activeDomainConfig.id)}
                    className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                    <span>Simulate 1-on-1 {activeDomainConfig.shortLabel} Call</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveTab("live-bulk")}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>View Live Bulk Blasts</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredLiveCalls.map((call) => {
                const domainConfig = KNOWLEDGE_DOMAINS.find((d) => d.id === call.knowledgeDomain);

                return (
                  <div
                    key={call.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white border border-rose-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(244,63,94,0.06)] hover:border-rose-300 transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      {/* Top Header: Contact + Knowledge Domain Badge + Duration */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${call.agentTheme} text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0`}
                          >
                            {call.agentAvatar}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-extrabold text-[#1A1A1A] truncate">
                                {call.callerName}
                              </span>
                              <span className="text-xs font-mono text-black/50">
                                {call.callerPhone}
                              </span>
                              <span className="px-2 py-0.2 rounded-full text-[9.5px] font-extrabold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                                <span>LIVE</span>
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-black/55 mt-0.5 flex-wrap">
                              <span className="font-semibold text-indigo-700 flex items-center gap-1">
                                <Bot className="w-3.5 h-3.5" />
                                <span>Agent {call.agentName}</span>
                              </span>
                              <span>•</span>
                              <span className="text-black/50 truncate">{call.agentRole}</span>
                              <span>•</span>
                              <span className="text-emerald-700 font-bold">
                                {call.latencyMs}ms
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Domain Pill & Live Timer */}
                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <div className="font-mono text-xs font-black text-rose-600 bg-rose-50/80 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-rose-500" />
                            <span>{formatSeconds(call.durationSeconds)}</span>
                          </div>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                              domainConfig?.badgeColor || "bg-amber-100 text-amber-900 border-amber-300"
                            }`}
                          >
                            <span>{domainConfig?.emoji || "📚"}</span>
                            <span>{domainConfig?.shortLabel || call.knowledgeDomainLabel}</span>
                          </span>
                        </div>
                      </div>

                      {/* Waveform & Voice Activity Bar */}
                      <div className="px-3.5 py-2.5 rounded-2xl bg-[#FAF8F3] border border-black/[0.05] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <Volume2 className="w-4 h-4 text-rose-600 animate-pulse shrink-0" />
                          <span className="text-xs font-bold text-black/75 truncate">
                            {call.currentTurnSpeaker === "agent" ? `Agent ${call.agentName} speaking` : `${call.callerName} speaking`}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 h-5 shrink-0">
                          {call.audioWaveLevels.map((h, i) => (
                            <div
                              key={i}
                              style={{ height: `${h}%` }}
                              className="w-1 bg-gradient-to-t from-rose-500 to-amber-500 rounded-full animate-pulse"
                            />
                          ))}
                        </div>

                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                          98% Positive
                        </span>
                      </div>

                      {/* Live Speech Utterance Snippet */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50/50 via-white to-rose-50/30 border border-amber-200/70 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-black/45">
                            Live Transcript Snippet
                          </span>
                          <span className="text-[9.5px] font-bold text-amber-900 bg-amber-100/70 px-2 py-0.2 rounded-full">
                            {call.currentTurnSpeaker === "agent" ? "Agent" : "Caller"} Turn
                          </span>
                        </div>
                        <p className="text-xs text-[#1A1A1A] font-medium leading-relaxed italic">
                          &ldquo;{call.currentLiveSnippet}&rdquo;
                        </p>
                      </div>

                      {/* Knowledge Base Grounded Retrieval Highlight */}
                      <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-200/70 space-y-1 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 flex items-center gap-1 truncate">
                            <Sparkles className="w-3 h-3 text-indigo-600 shrink-0" />
                            <span>Grounded: {call.groundedDocTitle}</span>
                          </span>
                          <span className="text-[9.5px] font-mono text-indigo-700 bg-white px-2 py-0.2 rounded font-semibold border border-indigo-200 shrink-0">
                            {call.groundedChunkRef}
                          </span>
                        </div>
                        <p className="text-[11px] text-indigo-950/90 leading-relaxed bg-white/70 p-2 rounded-xl border border-indigo-100">
                          &ldquo;{call.knowledgeFactRetrieved}&rdquo;
                        </p>
                      </div>

                      {/* Live Extracted Data Parameters */}
                      {call.liveExtractedData && Object.keys(call.liveExtractedData).length > 0 && (
                        <div className="pt-2 border-t border-black/[0.05]">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Database className="w-3 h-3 text-indigo-600" />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">
                              Live Extracted Entities
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {Object.entries(call.liveExtractedData).map(([k, val], i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF8F3] border border-black/[0.06] text-[11px]"
                              >
                                <span className="font-semibold text-black/50 capitalize text-[10px]">
                                  {k.replace(/([A-Z])/g, " $1")}:
                                </span>
                                <span className="font-bold text-[#1A1A1A] truncate max-w-[150px]">
                                  {val}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Row */}
                    <div className="flex items-center justify-between pt-3 mt-1 border-t border-black/[0.06]">
                      <span className="text-[10.5px] font-mono text-black/45 truncate">
                        {call.channel}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleOpenLiveListener(call)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs cursor-pointer transition-all hover:scale-102 active:scale-98"
                      >
                        <Headphones className="w-3.5 h-3.5" />
                        <span>Listen Live &amp; Inspect</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ======================================================================= */}
      {/* SECTION 2: LIVE BULK CALLING BLASTS (CONCURRENT AUTO-DIALER WAVES)      */}
      {/* ======================================================================= */}
      {activeTab === "live-bulk" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Telecom Trunk Concurrency Meter & Live Gateway Status */}
          <div className="p-6 rounded-[28px] bg-gradient-to-r from-[#18181B] via-zinc-900 to-black text-white shadow-xl space-y-5 border border-white/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>Real-Time Bulk Telephony Gateway</span>
                  </span>
                  <span className="text-[10px] font-bold bg-white/10 text-white px-2 py-0.5 rounded-full border border-white/10">
                    Carrier SIP Auto-Dialer On Air
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  High-Capacity Mass Calling Streams
                </h3>
                <p className="text-xs text-white/60 leading-relaxed max-w-2xl">
                  Simultaneous mass dialing blasts categorized by knowledge base. Monitor real-time acoustic channels, listen in on any live line, and control dialing rates.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setStartCampaignModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 to-rose-500 hover:brightness-110 text-white shadow-lg cursor-pointer transition-all hover:scale-102"
                >
                  <Plus className="w-4 h-4 text-white stroke-[2.5]" />
                  <span>Launch New Bulk Blast</span>
                </button>
              </div>
            </div>

            {/* Live Gateway Telemetry Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10.5px] font-semibold text-white/50 uppercase tracking-wider block">
                  Active Concurrent Lines
                </span>
                <div className="text-2xl font-black text-amber-400 flex items-baseline gap-2">
                  <span>{totalBulkConcurrentLines}</span>
                  <span className="text-xs font-normal text-white/50">/ 120 SIP Max</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden mt-2">
                  <div
                    style={{ width: `${Math.round((totalBulkConcurrentLines / 120) * 100)}%` }}
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10.5px] font-semibold text-white/50 uppercase tracking-wider block">
                  Carrier Dialing Rate
                </span>
                <div className="text-2xl font-black text-emerald-400 flex items-baseline gap-1">
                  <span>{totalDialRate}</span>
                  <span className="text-xs font-normal text-white/50">calls / min</span>
                </div>
                <span className="text-[10px] text-white/45 block mt-1">
                  Across 4 active knowledge waves
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10.5px] font-semibold text-white/50 uppercase tracking-wider block">
                  Global Answer Rate
                </span>
                <div className="text-2xl font-black text-indigo-300">
                  88.6%
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Sub-2 ring average response</span>
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10.5px] font-semibold text-white/50 uppercase tracking-wider block">
                  Total Audience Pool
                </span>
                <div className="text-2xl font-black text-white">
                  {totalBulkContacts.toLocaleString()}
                </div>
                <span className="text-[10px] text-white/50 block mt-1">
                  Contacts loaded across campaigns
                </span>
              </div>
            </div>
          </div>

          {/* List of Bulk Campaigns */}
          <div className="space-y-5">
            {filteredBulkCampaigns.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-3xl border border-black/[0.06] space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[#1A1A1A]">
                  No active bulk campaigns running
                </h4>
                <p className="text-xs text-black/55 max-w-md mx-auto leading-relaxed">
                  Start an outbound blast campaign or upload a contact list to launch autonomous concurrent voice lines.
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCampaignModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5 text-white" />
                    <span>Launch New Campaign</span>
                  </button>
                </div>
              </div>
            ) : (
              filteredBulkCampaigns.map((camp) => {
              const isExpanded = expandedCampaignId === camp.id;
              const domainCfg = KNOWLEDGE_DOMAINS.find((d) => d.id === camp.knowledgeDomain);
              const progressPct = Math.round((camp.dialedCount / camp.totalContacts) * 100);

              return (
                <div
                  key={camp.id}
                  className="bg-white rounded-[28px] border-2 border-black/[0.08] shadow-sm overflow-hidden hover:border-black/20 transition-all space-y-4 p-6"
                >
                  {/* Top Campaign Bar: Title, Domain, Agent & Controls */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                            domainCfg?.badgeColor || "bg-amber-100 text-amber-900 border-amber-300"
                          }`}
                        >
                          <span>{domainCfg?.emoji || "📚"}</span>
                          <span>{camp.knowledgeDomainLabel}</span>
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                            camp.status === "active"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              camp.status === "active" ? "bg-emerald-600 animate-ping" : "bg-amber-600"
                            }`}
                          />
                          <span>{camp.status === "active" ? "Dialing Now (Active Blast)" : "Paused"}</span>
                        </span>

                        <span className="text-[10.5px] text-black/50 font-mono bg-[#FAF8F3] px-2 py-0.5 rounded border border-black/[0.06] truncate max-w-[220px]">
                          Doc: {camp.groundedDocTitle}
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-[#1A1A1A] tracking-tight">
                        {camp.title}
                      </h4>

                      <div className="flex items-center gap-3 text-xs text-black/55 flex-wrap">
                        <span className="font-semibold text-indigo-900 flex items-center gap-1">
                          <Bot className="w-3.5 h-3.5 text-indigo-600" />
                          <span>{camp.assignedAgent}</span>
                        </span>
                        <span>•</span>
                        <span>Target: <strong className="text-black/80">{camp.targetAudience}</strong></span>
                        <span>•</span>
                        <span>Started: {camp.startedAt}</span>
                      </div>
                    </div>

                    {/* Action Controls & Throttle Slider */}
                    <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
                      {/* Concurrency Selector */}
                      <div className="flex items-center gap-1.5 bg-[#FAF8F3] p-1 rounded-full border border-black/[0.06]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-black/45 px-2">
                          Lines:
                        </span>
                        {[15, 25, 40].map((lines) => (
                          <button
                            key={lines}
                            type="button"
                            onClick={() => handleAdjustConcurrency(camp.id, lines)}
                            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              camp.concurrentLines === lines
                                ? "bg-[#18181B] text-white shadow-2xs"
                                : "text-black/60 hover:text-black"
                            }`}
                          >
                            {lines}
                          </button>
                        ))}
                      </div>

                      {/* Pause / Resume Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleCampaignStatus(camp.id)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs ${
                          camp.status === "active"
                            ? "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                      >
                        {camp.status === "active" ? (
                          <>
                            <Pause className="w-3.5 h-3.5 text-amber-700" />
                            <span>Pause Blast</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current text-white" />
                            <span>Resume Dialing</span>
                          </>
                        )}
                      </button>

                      {/* Toggle Expand Live Channels Button */}
                      <button
                        type="button"
                        onClick={() => {
                          try {
                            soundSynth.play("click");
                          } catch {}
                          setExpandedCampaignId(isExpanded ? null : camp.id);
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-[#FAF8F3] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.08] cursor-pointer"
                      >
                        <Headphones className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{isExpanded ? "Hide Channels" : `View ${camp.liveChannels.length} Live Lines`}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Progress & Real-Time Stats Row */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[#1A1A1A] flex items-center gap-2">
                        <span>Dialed Contacts:</span>
                        <strong className="font-extrabold text-sm">{camp.dialedCount.toLocaleString()}</strong>
                        <span className="text-black/45 font-normal">/ {camp.totalContacts.toLocaleString()} Contacts</span>
                      </span>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-emerald-700">
                          <strong>{camp.connectedCount}</strong> Connected
                        </span>
                        <span className="text-amber-700">
                          <strong>{camp.noAnswerCount}</strong> No Answer
                        </span>
                        <span className="text-indigo-700">
                          <strong>{camp.handoffCount}</strong> Human Handoff
                        </span>
                        <span className="font-extrabold text-[#1A1A1A] bg-[#FAF8F3] px-2.5 py-0.5 rounded-full border border-black/[0.06]">
                          {progressPct}% Completed
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar with Color Segments */}
                    <div className="w-full bg-[#FAF8F3] rounded-full h-3.5 border border-black/[0.06] overflow-hidden flex p-0.5">
                      <div
                        style={{ width: `${progressPct}%` }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full h-full transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* ================================================================= */}
                  {/* EXPANDABLE CONCURRENT LIVE CHANNELS GRID FOR THIS BULK CAMPAIGN   */}
                  {/* ================================================================= */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-black/[0.06] space-y-3 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-indigo-950 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Active Concurrent Lines on Air ({camp.liveChannels.length} Live Channels Streaming)</span>
                        </span>
                        <span className="text-[11px] text-black/50">
                          Click &quot;Listen In / Barge In&quot; on any line to inspect conversation
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {camp.liveChannels.map((ch) => (
                          <div
                            key={ch.id}
                            className="p-4 rounded-2xl bg-[#FAF8F3]/90 border border-black/[0.08] hover:border-indigo-300 transition-all space-y-2.5 flex flex-col justify-between"
                          >
                            <div className="space-y-2">
                              {/* Channel Header */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black font-mono bg-indigo-100 text-indigo-900 border border-indigo-200">
                                    Line #{ch.channelIndex}
                                  </span>
                                  <span className="text-xs font-bold text-[#1A1A1A]">{ch.contactName}</span>
                                  <span className="text-[11px] font-mono text-black/50">{ch.phone}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                                    ⏱ {formatSeconds(ch.durationSeconds)}
                                  </span>
                                </div>
                              </div>

                              {/* Live Audio Waveform */}
                              <div className="p-2.5 rounded-xl bg-white border border-black/[0.05] flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1.5">
                                  <Volume2 className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                                  <span className="text-[11px] font-semibold text-black/70">
                                    {ch.agentName} (AI)
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 h-5">
                                  {ch.audioWaveLevels.map((lvl, idx) => (
                                    <div
                                      key={idx}
                                      style={{ height: `${lvl}%` }}
                                      className="w-1 bg-gradient-to-t from-rose-500 to-amber-500 rounded-full animate-pulse"
                                    />
                                  ))}
                                </div>

                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                                  {ch.latencyMs}ms Latency
                                </span>
                              </div>

                              {/* Live Utterance Snippet */}
                              <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50/70 to-rose-50/40 border border-amber-200/60 text-xs">
                                <span className="text-[9.5px] font-extrabold uppercase tracking-wider text-black/50 block mb-0.5">
                                  Live Turn Utterance:
                                </span>
                                <p className="text-[11.5px] text-[#1A1A1A] italic leading-relaxed">
                                  &ldquo;{ch.currentSnippet}&rdquo;
                                </p>
                              </div>
                            </div>

                            {/* Action Row */}
                            <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
                              <span className="text-[10.5px] text-indigo-900 font-medium truncate max-w-[220px]">
                                📚 {ch.groundedKnowledge}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleInspectBulkChannel(camp, ch)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#18181B] hover:bg-black text-white shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
                              >
                                <Headphones className="w-3.5 h-3.5" />
                                <span>Listen In / Barge</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* SECTION 3: PREVIOUS CALLS LEDGER (CONTACTS, DATA & TRANSCRIPTS)         */}
      {/* ======================================================================= */}
      {activeTab === "previous-calls" && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Direction & Status Filter Tabs Bar */}
          <div className="bg-white rounded-[26px] border border-black/[0.06] p-4 space-y-3.5 shadow-2xs">
            {/* Top Filter Row: Inbound vs Outbound Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-black/50">
                  Call Direction:
                </span>
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#FBF7ED] border border-black/[0.06]">
                  <button
                    onClick={() => setDirectionFilter("all")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      directionFilter === "all"
                        ? "bg-[#111111] text-white shadow-sm"
                        : "text-black/60 hover:text-black"
                    }`}
                  >
                    All ({callsList.length})
                  </button>

                  <button
                    onClick={() => setDirectionFilter("inbound")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      directionFilter === "inbound"
                        ? "bg-[#111111] text-white shadow-sm"
                        : "text-black/60 hover:text-black"
                    }`}
                  >
                    <PhoneIncoming className="w-3.5 h-3.5" />
                    <span>Inbound ({inboundCount})</span>
                  </button>

                  <button
                    onClick={() => setDirectionFilter("outbound")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      directionFilter === "outbound"
                        ? "bg-[#111111] text-white shadow-sm"
                        : "text-black/60 hover:text-black"
                    }`}
                  >
                    <PhoneOutgoing className="w-3.5 h-3.5" />
                    <span>Outbound ({outboundCount})</span>
                  </button>
                </div>
              </div>

              {directionFilter !== "all" && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-black/60">
                    Filtered by:{" "}
                    <strong className="capitalize text-[#1A1A1A]">
                      {directionFilter}
                    </strong>
                  </span>
                  <button
                    onClick={() => setDirectionFilter("all")}
                    className="text-xs text-[#1A1A1A] hover:underline flex items-center gap-1 cursor-pointer font-semibold"
                  >
                    <X className="w-3 h-3" />
                    <span>Clear filter</span>
                  </button>
                </div>
              )}
            </div>

            {/* Second Filter Row: Status Tabs + Search */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
              {/* Status Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                {[
                  { id: "all", label: "All Statuses" },
                  { id: "completed", label: "Completed" },
                  { id: "transferred", label: "Transferred / Escalated" },
                  { id: "missed", label: "Missed" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      statusFilter === tab.id
                        ? "bg-[#111111] text-white shadow-sm"
                        : "bg-[#FBF7ED] text-black/60 hover:text-black border border-black/[0.06]"
                    }`}
                  >
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Search & Agent Selector */}
              <div className="flex items-center gap-2 flex-1 md:max-w-md justify-end">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search caller contact, phone, or topic..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all placeholder:text-black/40"
                  />
                </div>

                <select
                  value={agentFilter}
                  onChange={(e) => setAgentFilter(e.target.value)}
                  className="text-xs bg-[#FBF7ED] border border-black/[0.06] rounded-full px-4 py-2 text-[#1A1A1A] font-medium focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer"
                >
                  <option value="all">All Agents</option>
                  <option value="Maya">Maya (Admissions)</option>
                  <option value="Priya">Priya (Finance)</option>
                  <option value="Arjun">Arjun (Outreach)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Calls Data Table */}
          <div className="bg-white rounded-[26px] border border-black/[0.06] overflow-hidden shadow-2xs">
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1A1A1A]">
                  Previous Conversation Ledger
                </span>
                <span className="text-xs text-black/45 font-medium">
                  ({filteredCalls.length} records{" "}
                  {selectedKnowledge !== "all" ? `in ${activeDomainConfig?.shortLabel}` : "total"})
                </span>
              </div>
              <span className="text-xs text-black/50 hidden sm:inline">
                Click any row to inspect audio waveform, transcript &amp; extracted parameters
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-5">Caller Contact &amp; Phone</th>
                    <th className="py-3 px-5">Direction</th>
                    <th className="py-3 px-5">Knowledge Domain &amp; Source</th>
                    <th className="py-3 px-5">Topic &amp; Extracted Data</th>
                    <th className="py-3 px-5">AI Agent</th>
                    <th className="py-3 px-5">Duration &amp; Time</th>
                    <th className="py-3 px-5">Outcome</th>
                    <th className="py-3 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  {filteredCalls.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-16 text-center">
                        <div className="max-w-md mx-auto space-y-3 font-sans">
                          <div className="w-12 h-12 rounded-full bg-[#BCD0F5] text-[#1E3A8A] flex items-center justify-center mx-auto">
                            <PhoneCall className="w-6 h-6 text-[#1E3A8A]" />
                          </div>
                          <h3 className="text-sm font-bold text-[#1A1A1A]">
                            No {directionFilter !== "all" ? directionFilter : ""} calls found in this knowledge domain
                          </h3>
                          <p className="text-xs text-black/55 leading-relaxed">
                            No calls matched your filter criteria. Try resetting the knowledge domain or initiate a test simulation.
                          </p>
                          <div className="flex items-center justify-center gap-2 pt-2">
                            <button
                              onClick={() => {
                                setSelectedKnowledge("all");
                                setDirectionFilter("all");
                              }}
                              className="inline-flex items-center gap-1.5 bg-[#FAF3E4] hover:bg-[#F0E6D0] text-[#1A1A1A] text-xs font-semibold px-4 py-2 rounded-full border border-black/[0.08] cursor-pointer"
                            >
                              <span>View All Domains</span>
                            </button>
                            <button
                              onClick={() => setTestModalOpen(true)}
                              className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer shadow-sm"
                            >
                              <Radio className="w-3.5 h-3.5 text-white" />
                              <span>Run Test Call</span>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredCalls.map((call) => {
                      const domainCfg = KNOWLEDGE_DOMAINS.find((d) => d.id === call.knowledgeDomain);

                      return (
                        <tr
                          key={call.id}
                          onClick={() => handleInspect(call)}
                          className="hover:bg-black/[0.015] transition-colors cursor-pointer group text-[#1A1A1A]"
                        >
                          <td className="py-4 px-5">
                            <div className="font-semibold text-[#1A1A1A] flex items-center gap-2">
                              <span>{call.name}</span>
                            </div>
                            <div className="text-[11px] text-black/50 mt-0.5 font-mono">
                              {call.phone}
                            </div>
                          </td>

                          <td className="py-4 px-5 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-medium ${
                                call.direction === "inbound"
                                  ? "bg-[#BCD0F5] text-[#1E3A8A]"
                                  : "bg-[#FFD9A0] text-[#733F00]"
                              }`}
                            >
                              {call.direction === "inbound" ? (
                                <>
                                  <PhoneIncoming className="w-3 h-3 text-[#1E3A8A]" />
                                  <span>Inbound</span>
                                </>
                              ) : (
                                <>
                                  <PhoneOutgoing className="w-3 h-3 text-[#733F00]" />
                                  <span>Outbound</span>
                                </>
                              )}
                            </span>
                          </td>

                          <td className="py-4 px-5">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold border ${
                                domainCfg?.badgeColor || "bg-amber-100 text-amber-900 border-amber-300"
                              }`}
                            >
                              <span>{domainCfg?.emoji || "📚"}</span>
                              <span>{call.knowledgeDomainLabel}</span>
                            </span>
                            <div className="font-mono text-[10px] text-indigo-700/80 mt-1 truncate max-w-[190px]">
                              {call.groundedDocTitle}
                            </div>
                          </td>

                          <td className="py-4 px-5 max-w-xs">
                            <div className="font-semibold text-[#1A1A1A] truncate">
                              {call.intent}
                            </div>
                            {call.extractedData && (
                              <div className="flex items-center gap-1.5 text-[10.5px] mt-1 flex-wrap">
                                {Object.entries(call.extractedData).map(([k, val], idx) => (
                                  <span
                                    key={idx}
                                    className="px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200"
                                  >
                                    {val}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-5 whitespace-nowrap">
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1A1A1A] bg-[#FBF7ED] px-3 py-0.5 rounded-full border border-black/[0.06]">
                              <Bot className="w-3 h-3 text-indigo-600" />
                              <span>{call.agent}</span>
                            </span>
                            <div className="text-[10px] text-black/45 mt-0.5">
                              {call.language}
                            </div>
                          </td>

                          <td className="py-4 px-5 whitespace-nowrap text-[#1A1A1A]">
                            <span className="font-bold">{call.duration}</span>
                            <span className="text-[11px] text-black/45 block mt-0.5">
                              {call.timestamp}
                            </span>
                          </td>

                          <td className="py-4 px-5 whitespace-nowrap">
                            {call.status === "completed" ? (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#C1F2D5] text-[#0D593F] px-2.5 py-0.5 rounded-full">
                                <CheckCircle2 className="w-3 h-3 text-[#16856B]" />
                                {call.outcome}
                              </span>
                            ) : call.status === "transferred" ? (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#FFD9A0] text-[#733F00] px-2.5 py-0.5 rounded-full">
                                <PhoneForwarded className="w-3 h-3 text-[#733F00]" />
                                {call.outcome}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-black/[0.04] text-black/60 px-2.5 py-0.5 rounded-full">
                                <PhoneMissed className="w-3 h-3 text-black/50" />
                                No Answer
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-5 text-right whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInspect(call);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] transition-all cursor-pointer"
                            >
                              <Eye className="w-3 h-3 text-black/50" />
                              <span>Inspect</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Live Stream Listener Modal with Knowledge Grounding */}
      {selectedLiveCallModal && (
        <LiveCallModal
          isOpen={!!selectedLiveCallModal}
          onClose={() => setSelectedLiveCallModal(null)}
          call={{
            id: selectedLiveCallModal.id,
            callerNumber: selectedLiveCallModal.callerPhone,
            callerName: selectedLiveCallModal.callerName,
            agentName: selectedLiveCallModal.agentName,
            duration: selectedLiveCallModal.durationSeconds,
            durationSeconds: selectedLiveCallModal.durationSeconds,
            latencyMs: selectedLiveCallModal.latencyMs,
            currentSentiment: selectedLiveCallModal.currentSentiment,
            knowledgeDomain: selectedLiveCallModal.knowledgeDomain,
            knowledgeDomainLabel: selectedLiveCallModal.knowledgeDomainLabel,
            groundedDocTitle: selectedLiveCallModal.groundedDocTitle,
            groundedChunkRef: selectedLiveCallModal.groundedChunkRef,
            knowledgeFactRetrieved: selectedLiveCallModal.knowledgeFactRetrieved,
            transcript: [
              {
                speaker: "agent",
                text: `Hello! I am ${selectedLiveCallModal.agentName} with our Voice Operations Desk. I have our official ${selectedLiveCallModal.knowledgeDomainLabel} knowledge base loaded right now. How can I assist your inquiry today?`,
                time: "00:02",
              },
              {
                speaker: "caller",
                text: `Hi, I was checking information regarding ${selectedLiveCallModal.currentTopic}.`,
                time: "00:15",
              },
              {
                speaker: "agent",
                text: selectedLiveCallModal.currentLiveSnippet,
                time: "00:32",
              },
            ],
          }}
        />
      )}

      {/* Previous Call Detail Drawer */}
      <CallDrawer
        call={selectedCall}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <ExportReportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />

      <TestCallModal
        isOpen={testModalOpen}
        onClose={() => setTestModalOpen(false)}
      />

      <StartCampaignModal
        isOpen={startCampaignModalOpen}
        onClose={() => setStartCampaignModalOpen(false)}
        onCampaignStarted={handleCampaignStarted}
      />
    </div>
  );
}

export default function CallsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-[#64748B] text-xs">
          Loading Live Calling console...
        </div>
      }
    >
      <CallsPageContent />
    </Suspense>
  );
}
