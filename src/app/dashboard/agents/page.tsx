"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bot,
  Plus,
  Play,
  Pause,
  Volume2,
  Settings,
  Sparkles,
  CheckCircle2,
  Radio,
  FileText,
  ShieldCheck,
  Layers,
  PhoneCall,
  Clock,
  Terminal,
  Search,
  Filter,
  Check,
  Upload,
  AlertTriangle,
  RotateCcw,
  Sliders,
  Database,
  Globe,
  SlidersHorizontal,
  Mic,
  Activity,
  History as HistoryIcon,
  HelpCircle,
  ArrowRight,
  Send,
  PhoneIncoming,
  PhoneOutgoing,
  UserCheck,
  MessageSquare,
  Calendar,
  ChevronDown,
  ChevronUp,
  BookmarkCheck,
  Eye,
  BookOpen,
  Phone,
  PhoneOff,
  Smartphone,
  Lock,
  Zap,
  Square,
  Trash2,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import CreateAgentModal from "@/components/dashboard/modals/CreateAgentModal";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import { DashboardAgent, LiveCallItem } from "@/types/dashboard";
import { mockAgents } from "@/data/mock/dashboardData";
import { readyMadeVoices, initialClonedVoices, VoiceItem } from "@/data/mock/voiceLibrary";
import { soundSynth } from "@/lib/audio-synth";
import { usePalette } from "@/context/PaletteContext";

export const getAgentTheme = (agentId: string) => {
  if (agentId.includes("maya")) {
    return {
      name: "Maya",
      accent: "#FF6B08",
      accentLight: "#FFF4ED",
      gradient: "from-[#FFF9F2] via-white to-[#FFF0E0]",
      border: "border-[#FFD9B3]",
      borderActive: "border-[#FF6B08]",
      ring: "ring-2 ring-[#FF6B08]/30",
      shadow: "shadow-[0_8px_24px_rgba(255,107,8,0.18)]",
      avatarBg: "bg-gradient-to-br from-[#FF8800] to-[#FF6B08]",
      avatarText: "text-white",
      badgeBg: "bg-[#FFF4ED]",
      badgeText: "text-[#D9532F]",
      badgeBorder: "border-[#FFA98B]/50",
      heroBg: "bg-gradient-to-r from-[#FFF7ED] via-[#FFFDF9] to-white",
      heroBorder: "border-[#FF6B08]/20",
      glowColor: "rgba(255, 107, 8, 0.15)",
    };
  }
  if (agentId.includes("priya")) {
    return {
      name: "Priya",
      accent: "#8B5CF6",
      accentLight: "#FAF5FF",
      gradient: "from-[#FAF5FF] via-white to-[#F3E8FF]",
      border: "border-[#E9D5FF]",
      borderActive: "border-[#8B5CF6]",
      ring: "ring-2 ring-[#8B5CF6]/30",
      shadow: "shadow-[0_8px_24px_rgba(139,92,246,0.18)]",
      avatarBg: "bg-gradient-to-br from-[#A855F7] to-[#7C3AED]",
      avatarText: "text-white",
      badgeBg: "bg-[#FAF5FF]",
      badgeText: "text-[#6B21A8]",
      badgeBorder: "border-[#D8B4FE]/50",
      heroBg: "bg-gradient-to-r from-[#FAF5FF] via-[#FDF4FF] to-white",
      heroBorder: "border-[#8B5CF6]/20",
      glowColor: "rgba(139, 92, 246, 0.15)",
    };
  }
  if (agentId.includes("arjun")) {
    return {
      name: "Arjun",
      accent: "#0284C7",
      accentLight: "#F0F9FF",
      gradient: "from-[#F0F9FF] via-white to-[#E0F2FE]",
      border: "border-[#BAE6FD]",
      borderActive: "border-[#0284C7]",
      ring: "ring-2 ring-[#0284C7]/30",
      shadow: "shadow-[0_8px_24px_rgba(2,132,199,0.18)]",
      avatarBg: "bg-gradient-to-br from-[#38BDF8] to-[#0284C7]",
      avatarText: "text-white",
      badgeBg: "bg-[#F0F9FF]",
      badgeText: "text-[#0369A1]",
      badgeBorder: "border-[#7DD3FC]/50",
      heroBg: "bg-gradient-to-r from-[#F0F9FF] via-[#F8FAFC] to-white",
      heroBorder: "border-[#0284C7]/20",
      glowColor: "rgba(2, 132, 199, 0.15)",
    };
  }

  // Dynamic themes for custom created agents based on char code sum
  const charSum = agentId.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const themeIndex = charSum % 4;

  if (themeIndex === 0) {
    return {
      name: "Emerald",
      accent: "#10B981",
      accentLight: "#ECFDF5",
      gradient: "from-[#ECFDF5] via-white to-[#D1FAE5]",
      border: "border-[#A7F3D0]",
      borderActive: "border-[#10B981]",
      ring: "ring-2 ring-[#10B981]/30",
      shadow: "shadow-[0_8px_24px_rgba(16,185,129,0.18)]",
      avatarBg: "bg-gradient-to-br from-[#34D399] to-[#059669]",
      avatarText: "text-white",
      badgeBg: "bg-[#ECFDF5]",
      badgeText: "text-[#065F46]",
      badgeBorder: "border-[#6EE7B7]/50",
      heroBg: "bg-gradient-to-r from-[#ECFDF5] via-[#F0FDF4] to-white",
      heroBorder: "border-[#10B981]/20",
      glowColor: "rgba(16, 185, 129, 0.15)",
    };
  } else if (themeIndex === 1) {
    return {
      name: "Rose",
      accent: "#F43F5E",
      accentLight: "#FFF1F2",
      gradient: "from-[#FFF1F2] via-white to-[#FFE4E6]",
      border: "border-[#FECDD3]",
      borderActive: "border-[#F43F5E]",
      ring: "ring-2 ring-[#F43F5E]/30",
      shadow: "shadow-[0_8px_24px_rgba(244,63,94,0.18)]",
      avatarBg: "bg-gradient-to-br from-[#FB7185] to-[#E11D48]",
      avatarText: "text-white",
      badgeBg: "bg-[#FFF1F2]",
      badgeText: "text-[#9F1239]",
      badgeBorder: "border-[#FDA4AF]/50",
      heroBg: "bg-gradient-to-r from-[#FFF1F2] via-[#FFF5F5] to-white",
      heroBorder: "border-[#F43F5E]/20",
      glowColor: "rgba(244, 63, 94, 0.15)",
    };
  } else if (themeIndex === 2) {
    return {
      name: "Amber",
      accent: "#F59E0B",
      accentLight: "#FFFBEB",
      gradient: "from-[#FFFBEB] via-white to-[#FEF3C7]",
      border: "border-[#FDE68A]",
      borderActive: "border-[#F59E0B]",
      ring: "ring-2 ring-[#F59E0B]/30",
      shadow: "shadow-[0_8px_24px_rgba(245,158,11,0.18)]",
      avatarBg: "bg-gradient-to-br from-[#FBBF24] to-[#D97706]",
      avatarText: "text-white",
      badgeBg: "bg-[#FFFBEB]",
      badgeText: "text-[#92400E]",
      badgeBorder: "border-[#FCD34D]/50",
      heroBg: "bg-gradient-to-r from-[#FFFBEB] via-[#FEF9C3] to-white",
      heroBorder: "border-[#F59E0B]/20",
      glowColor: "rgba(245, 158, 11, 0.15)",
    };
  } else {
    return {
      name: "Indigo",
      accent: "#6366F1",
      accentLight: "#EEF2FF",
      gradient: "from-[#EEF2FF] via-white to-[#E0E7FF]",
      border: "border-[#C7D2FE]",
      borderActive: "border-[#6366F1]",
      ring: "ring-2 ring-[#6366F1]/30",
      shadow: "shadow-[0_8px_24px_rgba(99,102,241,0.18)]",
      avatarBg: "bg-gradient-to-br from-[#818CF8] to-[#4F46E5]",
      avatarText: "text-white",
      badgeBg: "bg-[#EEF2FF]",
      badgeText: "text-[#3730A3]",
      badgeBorder: "border-[#A5B4FC]/50",
      heroBg: "bg-gradient-to-r from-[#EEF2FF] via-[#F5F3FF] to-white",
      heroBorder: "border-[#6366F1]/20",
      glowColor: "rgba(99, 102, 241, 0.15)",
    };
  }
};

export interface StoredConversation {
  id: string;
  agentId: string;
  agentName: string;
  direction: "inbound" | "outbound";
  contactName: string;
  contactNumber: string;
  timestamp: string;
  durationFormatted: string;
  turnsCount: number;
  sentiment: "positive" | "neutral" | "escalated";
  sentimentScore: string;
  topics: string[];
  status: "Trained" | "Active" | "Escalated";
  trainingOutcome: string;
  turns: {
    id: string;
    speaker: "agent" | "caller";
    text: string;
    time: string;
  }[];
}

const initialConversationHistory: StoredConversation[] = [];


export default function AgentsPage() {
  const { palette } = usePalette();
  const [agents, setAgents] = useState<DashboardAgent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<DashboardAgent | null>(mockAgents[0] || null);
  const activeAgentTheme = getAgentTheme(selectedAgent?.id || "maya");
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "instructions"
    | "voice"
    | "languages"
    | "knowledge"
    | "call-rules"
    | "playground"
    | "history"
  >("overview");

  // Cloned voices registry & filter
  const [clonedVoices, setClonedVoices] = useState<VoiceItem[]>(initialClonedVoices);
  const [voiceSourceTab, setVoiceSourceTab] = useState<"all" | "ready" | "cloned">("all");
  const [creationSuccessToast, setCreationSuccessToast] = useState<string | null>(null);

  // Voice tab states
  const [voiceSearch, setVoiceSearch] = useState("");
  const [voiceLangFilter, setVoiceLangFilter] = useState("all");
  const [voiceToneFilter, setVoiceToneFilter] = useState("all");
  const [voiceGenderFilter, setVoiceGenderFilter] = useState("all");
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  // Voice cloning studio states
  const [cloneConsentConfirmed, setCloneConsentConfirmed] = useState(false);
  const [cloneFileName, setCloneFileName] = useState<string | null>(null);
  const [cloneStatus, setCloneStatus] = useState<"idle" | "uploading" | "analyzing" | "ready">("idle");
  const [cloneVoiceName, setCloneVoiceName] = useState("Custom Voice Clone");
  const [cloneSpeakerGender, setCloneSpeakerGender] = useState<"Female" | "Male" | "Neutral">("Male");
  const [cloneSpeakerAccent, setCloneSpeakerAccent] = useState("Pan-Indian Corporate English");
  const [cloneInputMode, setCloneInputMode] = useState<"mic" | "upload">("mic");
  const [isCloneRecording, setIsCloneRecording] = useState(false);
  const [cloneRecordingSecs, setCloneRecordingSecs] = useState(0);
  const [cloneRecordedBlob, setCloneRecordedBlob] = useState<string | null>(null);
  const [cloneTestSentence, setCloneTestSentence] = useState(
    "Hello! Welcome. I am testing my newly cloned neural voice model."
  );
  const cloneMicTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Freedom to edit Context, Rules, Purposes for the selected agent
  const [editPurpose, setEditPurpose] = useState(
    selectedAgent?.purpose ||
      "Counsel prospective callers on inquiries, fee structures, and services."
  );
  const [editGreetingPhrase, setEditGreetingPhrase] = useState(
    selectedAgent?.greetingPhrase ||
      (selectedAgent ? `Hello! Welcome. I am ${selectedAgent.name.split("—")[0].trim()}. How may I assist you today?` : "Hello! Welcome. How may I assist you today?")
  );
  const [editSystemPrompt, setEditSystemPrompt] = useState(selectedAgent?.systemPromptPreview || "");
  const [editGroundingFacts, setEditGroundingFacts] = useState<string[]>([]);
  const [newContextFactInput, setNewContextFactInput] = useState("");
  const [editDosRules, setEditDosRules] = useState<string[]>([]);
  const [newDoInput, setNewDoInput] = useState("");
  const [editDontsRules, setEditDontsRules] = useState<string[]>([]);
  const [newDontInput, setNewDontInput] = useState("");
  const [editEscalationDesk, setEditEscalationDesk] = useState(
    selectedAgent?.escalationDesk || "Counselor Desk"
  );
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);

  // Keep editor state in sync when selected agent changes
  useEffect(() => {
    if (!selectedAgent) return;
    setEditPurpose(
      selectedAgent.purpose ||
        "Counsel prospective callers on inquiries, fee structures, and services."
    );
    setEditGreetingPhrase(
      selectedAgent.greetingPhrase ||
        `Hello! Welcome. I am ${selectedAgent.name.split("—")[0].trim()}. How may I assist you today?`
    );
    setEditSystemPrompt(selectedAgent.systemPromptPreview || "");
    if (selectedAgent.rules && selectedAgent.rules.length > 0) {
      setEditDosRules(selectedAgent.rules);
    } else {
      setEditDosRules([]);
    }
    if (selectedAgent.guardrails && selectedAgent.guardrails.length > 0) {
      setEditDontsRules(selectedAgent.guardrails);
    } else {
      setEditDontsRules([]);
    }
    if (selectedAgent.contextKnowledge) {
      const facts = selectedAgent.contextKnowledge.split("\n").filter((f) => f.trim().length > 0);
      setEditGroundingFacts(facts);
    } else {
      setEditGroundingFacts([]);
    }
    setEditEscalationDesk(
      selectedAgent.escalationDesk || "Counselor Desk"
    );
  }, [selectedAgent]);

  // Language tab states (12+ Indian Languages with Native Scripts)
  const [activeDialects, setActiveDialects] = useState<string[]>([
    "HI",
    "EN",
    "TE",
    "TA",
  ]);
  const [bilingualSwitching, setBilingualSwitching] = useState(true);
  const [languageRegionFilter, setLanguageRegionFilter] = useState("all");

  const toggleDialect = (code: string) => {
    try { soundSynth.play("click"); } catch {}
    setActiveDialects((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  // Playground simulation states (Supports both Inbound & Outbound Call Simulation)
  const [callSimulationMode, setCallSimulationMode] = useState<"inbound" | "outbound">("inbound");
  const [simInput, setSimInput] = useState("");

  const getInboundTurns = () => [
    {
      id: "in-1",
      speaker: "caller",
      text: "Hello! I am calling to inquire about your enterprise voice telephony solutions and pricing tiers.",
      time: "00:03",
    },
    {
      id: "in-2",
      speaker: "agent",
      text: "Hello! Welcome to our Voice Operations Desk. Our enterprise plan includes 3,000 monthly minutes with dedicated SIP trunks. May I know your estimated monthly call volume?",
      time: "00:08",
    },
    {
      id: "in-3",
      speaker: "caller",
      text: "We are currently handling around 15,000 calls per month across regional languages.",
      time: "00:15",
    },
    {
      id: "in-4",
      speaker: "agent",
      text: "Understood! For 15,000 calls, we offer sub-140ms multi-lingual models with volume discounts. Would you like me to schedule a technical walkthrough with our telephony solutions engineer?",
      time: "00:22",
    },
  ];

  const getOutboundTurns = () => [
    {
      id: "out-1",
      speaker: "agent",
      text: `Hello! This is ${selectedAgent ? selectedAgent.name.split("—")[0].trim() : "Agent"} calling from voice operations. Do you have two quick minutes?`,
      time: "00:02",
    },
    {
      id: "out-2",
      speaker: "caller",
      text: "Hi! Yes, I was actually looking at high-concurrency SIP trunking and wanted to know your SLA guarantees for multi-carrier failover.",
      time: "00:10",
    },
    {
      id: "out-3",
      speaker: "agent",
      text: "We provide 99.99% high-availability SLA with automated failover in under 120ms. What is your estimated monthly concurrent line volume?",
      time: "00:18",
    },
    {
      id: "out-4",
      speaker: "caller",
      text: "We are scaling up to approximately 48 concurrent lines across pan-India campaigns.",
      time: "00:26",
    },
    {
      id: "out-5",
      speaker: "agent",
      text: "That fits our Tier-1 enterprise volume plan with dedicated SIP routing. May I schedule a technical onboarding walkthrough with our solutions team for Thursday?",
      time: "00:34",
    },
  ];

  const [simTurns, setSimTurns] = useState(getInboundTurns);
  const [simPlayingTurnId, setSimPlayingTurnId] = useState<string | null>(null);

  const handleSwitchSimMode = (mode: "inbound" | "outbound") => {
    try { soundSynth.play("click"); } catch {}
    setCallSimulationMode(mode);
    setSimTurns(mode === "inbound" ? getInboundTurns() : getOutboundTurns());
  };

  // Conversation History & Training sessions
  const [conversationHistory, setConversationHistory] = useState<StoredConversation[]>(initialConversationHistory);
  const [expandedConvId, setExpandedConvId] = useState<string | null>(null);
  const [historyFilter, setHistoryFilter] = useState<"all" | "inbound" | "outbound" | "audit">("all");
  const [trainingSuccessNotice, setTrainingSuccessNotice] = useState<string | null>(null);

  const handleStartNewTraining = () => {
    try {
      soundSynth.play("confirm");
    } catch {}

    const isOut = callSimulationMode === "outbound";
    const agentNameStr = selectedAgent ? selectedAgent.name.split("—")[0].trim() : "Agent";
    const newSession: StoredConversation = {
      id: `train-${Date.now()}`,
      agentId: selectedAgent?.id || "default",
      agentName: agentNameStr,
      direction: callSimulationMode,
      contactName: isOut ? "Prospective Lead (Outbound)" : "Incoming Caller",
      contactNumber: "+91 98401 22345",
      timestamp: "Just now",
      durationFormatted: "00:36",
      turnsCount: simTurns.length,
      sentiment: "positive",
      sentimentScore: "95%",
      topics: isOut
        ? ["Outbound Discovery", "Lead Qualification", "WhatsApp Delivery", "Demo Scheduling"]
        : ["Pricing & Plans", "SIP Trunks", "CRM Integration", "Multi-lingual Routing"],
      status: "Trained",
      trainingOutcome: isOut
        ? "Outbound Campaign Script Validated & Lead Qualified"
        : "Inbound RAG Inquiries & Objection Knowledge Reinforced",
      turns: [...simTurns],
    };

    setConversationHistory((prev) => [newSession, ...prev]);
    setTrainingSuccessNotice(
      `🎉 Training Session Saved to History! ${agentNameStr}'s neural weights & RAG dialogue memory have been updated.`
    );
    setTimeout(() => {
      setTrainingSuccessNotice(null);
    }, 4500);

    // Reset to fresh training prompt for current mode
    if (callSimulationMode === "inbound") {
      setSimTurns([
        {
          id: `fresh-in-${Date.now()}`,
          speaker: "agent",
          text: `Hello! I am ${agentNameStr}. How can I assist you with your inquiry today?`,
          time: "00:00",
        },
      ]);
    } else {
      setSimTurns([
        {
          id: `fresh-out-${Date.now()}`,
          speaker: "agent",
          text: `Hello! This is ${agentNameStr} following up on your recent platform inquiry. Do you have two quick minutes?`,
          time: "00:00",
        },
      ]);
    }
  };

  const handleLoadConversationIntoPlayground = (conv: StoredConversation) => {
    try {
      soundSynth.play("affirm");
    } catch {}
    setCallSimulationMode(conv.direction);
    setSimTurns(conv.turns);
    setActiveTab("playground");
  };

  // Practical Phone Call Testing Modal State
  const [phoneTestModalOpen, setPhoneTestModalOpen] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState("+91");
  const [phoneInputNumber, setPhoneInputNumber] = useState("98401 22345");
  const [callConnectState, setCallConnectState] = useState<"idle" | "dialing" | "ringing" | "connected" | "ended">("idle");
  const [livePhoneCallSeconds, setLivePhoneCallSeconds] = useState(0);
  const [phoneCallError, setPhoneCallError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callConnectState === "connected") {
      interval = setInterval(() => {
        setLivePhoneCallSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callConnectState]);

  const handleOpenPhoneTestModal = () => {
    try {
      soundSynth.play("click");
    } catch {}
    setPhoneTestModalOpen(true);
    setCallConnectState("idle");
    setPhoneCallError(null);
    setLivePhoneCallSeconds(0);
  };

  const handleInitiatePracticalCall = () => {
    const cleanNumber = phoneInputNumber.trim().replace(/\s+/g, "");
    if (cleanNumber.length < 8) {
      setPhoneCallError("Please enter a valid phone number (at least 8-10 digits).");
      return;
    }
    setPhoneCallError(null);
    try {
      soundSynth.play("confirm");
    } catch {}
    setCallConnectState("dialing");

    setTimeout(() => {
      setCallConnectState("ringing");
      try {
        soundSynth.play("affirm");
      } catch {}

      setTimeout(() => {
        setCallConnectState("connected");
        try {
          soundSynth.play("confirm");
        } catch {}

        const practicalSession: StoredConversation = {
          id: `real-tel-${Date.now()}`,
          agentId: selectedAgent.id,
          agentName: selectedAgent.name.split("—")[0].trim(),
          direction: callSimulationMode,
          contactName: "Practical Phone Call",
          contactNumber: `${phoneCountryCode} ${cleanNumber}`,
          timestamp: "Just now",
          durationFormatted: "00:48",
          turnsCount: simTurns.length,
          sentiment: "positive",
          sentimentScore: "97%",
          topics: [
            "Practical Real-Phone Call",
            "Handset Ringing Tested",
            callSimulationMode === "outbound" ? "Campaign Live Dial" : "Inbound Carrier Route",
            "Telecom SLA Verified",
          ],
          status: "Trained",
          trainingOutcome: `Real Phone Handset Call Verified (${phoneCountryCode} ${cleanNumber})`,
          turns: [...simTurns],
        };
        setConversationHistory((prev) => [practicalSession, ...prev]);
      }, 2400);
    }, 1400);
  };

  const handleEndPracticalCall = () => {
    try {
      soundSynth.play("click");
    } catch {}
    setCallConnectState("ended");
    setTimeout(() => {
      setPhoneTestModalOpen(false);
      setCallConnectState("idle");
      setLivePhoneCallSeconds(0);
    }, 1500);
  };

  // Publish confirmation modal state
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishSuccessNotice, setPublishSuccessNotice] = useState(false);

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [testCallItem, setTestCallItem] = useState<LiveCallItem | null>(null);

  // Unified voices list (cloned + ready-made)
  const allAvailableVoices = useMemo(() => {
    return [...clonedVoices, ...readyMadeVoices];
  }, [clonedVoices]);

  // Voice selector filtering
  const filteredVoices = useMemo(() => {
    return allAvailableVoices.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(voiceSearch.toLowerCase()) ||
        v.accent.toLowerCase().includes(voiceSearch.toLowerCase()) ||
        v.language.toLowerCase().includes(voiceSearch.toLowerCase());
      const matchesLang =
        voiceLangFilter === "all" || v.language.toLowerCase().includes(voiceLangFilter.toLowerCase());
      const matchesTone = voiceToneFilter === "all" || v.tone === voiceToneFilter;
      const matchesGender =
        voiceGenderFilter === "all" || v.gender.toLowerCase() === voiceGenderFilter.toLowerCase();
      const matchesSource =
        voiceSourceTab === "all" ||
        (voiceSourceTab === "ready" && !v.isCloned) ||
        (voiceSourceTab === "cloned" && v.isCloned);
      return matchesSearch && matchesLang && matchesTone && matchesGender && matchesSource;
    });
  }, [allAvailableVoices, voiceSearch, voiceLangFilter, voiceToneFilter, voiceGenderFilter, voiceSourceTab]);

  const handlePlayVoiceSample = (v: VoiceItem) => {
    if (playingVoiceId === v.id) {
      soundSynth.stop();
      setPlayingVoiceId(null);
    } else {
      try {
        soundSynth.play("affirm");
      } catch {}
      setPlayingVoiceId(v.id);
      soundSynth.speak(v.sampleTranscript);
      setTimeout(() => {
        setPlayingVoiceId(null);
      }, 4000);
    }
  };

  const handleSelectVoice = (v: VoiceItem) => {
    if (!selectedAgent) return;
    try {
      soundSynth.play("click");
    } catch {}
    const updatedAgent: DashboardAgent = {
      ...selectedAgent,
      voice: {
        name: v.name,
        gender: v.gender,
        accent: `${v.accent} (${v.tone})`,
        sampleUrl: v.sampleAudio,
        isCloned: v.isCloned,
      },
    };
    setSelectedAgent(updatedAgent);
    setAgents((prev) => prev.map((a) => (a.id === selectedAgent.id ? updatedAgent : a)));
    try {
      soundSynth.speak(`Voice updated to ${v.name}.`, { rate: 1.05 });
    } catch {}
  };

  const handleAgentCreated = (newAgent: DashboardAgent) => {
    try {
      soundSynth.play("confirm");
    } catch {}
    setAgents((prev) => [newAgent, ...prev]);
    setSelectedAgent(newAgent);
    setCreationSuccessToast(
      `Autonomous Voice Agent "${newAgent.name}" deployed successfully! Active with voice "${newAgent.voice.name}".`
    );
    setTimeout(() => setCreationSuccessToast(null), 7000);
  };

  const handleVoiceCloned = (newVoice: VoiceItem) => {
    setClonedVoices((prev) => [newVoice, ...prev]);
  };

  const startCloneMicRecord = () => {
    try {
      soundSynth.play("confirm");
    } catch {}
    setIsCloneRecording(true);
    setCloneRecordingSecs(0);
    setCloneRecordedBlob(null);
    cloneMicTimerRef.current = setInterval(() => {
      setCloneRecordingSecs((prev) => prev + 1);
    }, 1000);
  };

  const stopCloneMicRecord = () => {
    try {
      soundSynth.play("pop");
    } catch {}
    setIsCloneRecording(false);
    if (cloneMicTimerRef.current) {
      clearInterval(cloneMicTimerRef.current);
    }
    setCloneRecordedBlob("mic-live-clean-capture.wav");
    setCloneFileName("mic-live-clean-capture.wav");
  };

  const handleSaveAgentInstructions = () => {
    if (!selectedAgent) return;
    try {
      soundSynth.play("confirm");
    } catch {}
    const updated: DashboardAgent = {
      ...selectedAgent,
      purpose: editPurpose,
      greetingPhrase: editGreetingPhrase,
      systemPromptPreview: editSystemPrompt,
      contextKnowledge: editGroundingFacts.join("\n"),
      rules: editDosRules,
      guardrails: editDontsRules,
      escalationDesk: editEscalationDesk,
    };
    setSelectedAgent(updated);
    setAgents((prev) => prev.map((a) => (a.id === selectedAgent.id ? updated : a)));
    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 4000);
    try {
      soundSynth.speak("Agent instructions, purpose, and guardrails updated successfully.");
    } catch {}
  };

  const handleSimulateCall = (agent: DashboardAgent, forceDirection?: "inbound" | "outbound") => {
    if (!agent) return;
    try {
      soundSynth.play("confirm");
    } catch {}
    const direction = forceDirection || callSimulationMode;
    const isOut = direction === "outbound";

    const liveCallObj: LiveCallItem = {
      id: `sim-${direction}-${agent.id}`,
      callerNumber: "+91 98401 22345",
      callerName: isOut ? "Prospective Lead (Outbound)" : "Customer (Incoming Caller)",
      agentId: agent.id,
      agentName: agent.name.split("—")[0].trim(),
      direction: direction,
      durationSeconds: 28,
      durationFormatted: "00:28",
      currentSentiment: "positive",
      intent: isOut
        ? "Outbound Lead Qualification & Demo Scheduling"
        : "Inbound Inquiries & Plan Verification",
      latestSnippet: isOut
        ? "Testing proactive outbound campaign pitch, objection handling, and appointment booking."
        : "Testing inbound voice latency, prompt guardrails, and knowledge retrieval.",
      audioWaveLevels: [45, 75, 95, 65, 85, 55, 90, 75, 50, 85, 65, 45],
      startedAt: "Just now",
      latencyMs: isOut ? 112 : 135,
      transcript: isOut
        ? [
            { speaker: "agent", text: `Hello! This is ${agent.name.split("—")[0].trim()} following up from our Voice Telephony Desk regarding your recent platform inquiry.`, time: "00:02" },
            { speaker: "caller", text: "Hi! Yes, I was looking into automated voice agents and wanted to verify SIP trunk integration.", time: "00:09" },
            { speaker: "agent", text: "We support carrier PRI and SIP trunking with sub-140ms latency. Would you like me to schedule a technical consultation?", time: "00:18" },
          ]
        : [
            { speaker: "caller", text: "Hello, I am testing the conversational voice agent in inbound simulation mode.", time: "00:02" },
            { speaker: "agent", text: `Hello! I am ${agent.name.split("—")[0].trim()}. How can I assist with your voice operations today?`, time: "00:08" },
          ],
    };
    setTestCallItem(liveCallObj);
    setLiveModalOpen(true);
  };

  const handleSendSimMessage = (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || simInput;
    if (!textToSend.trim()) return;
    try {
      soundSynth.play("click");
    } catch {}
    const userTurn = {
      id: String(Date.now()),
      speaker: "caller",
      text: textToSend,
      time: "00:38",
    };
    setSimTurns((prev) => [...prev, userTurn]);
    if (!customText) setSimInput("");

    setTimeout(() => {
      try {
        soundSynth.play("affirm");
      } catch {}
      let responseText = "";
      const lower = textToSend.toLowerCase();

      if (callSimulationMode === "outbound") {
        if (lower.includes("busy") || lower.includes("later") || lower.includes("tomorrow") || lower.includes("call back")) {
          responseText = "I completely understand! Would tomorrow at 4:00 PM be a convenient time for me to call you back? I have recorded this in your callback schedule.";
        } else if (lower.includes("not interested") || lower.includes("cancel") || lower.includes("remove") || lower.includes("no")) {
          responseText = "Understood, thank you for letting us know! I have updated your status and removed your contact from our active outreach list. Wishing you all the best!";
        } else if (lower.includes("pricing") || lower.includes("fee") || lower.includes("cost") || lower.includes("rate") || lower.includes("plan")) {
          responseText = "Our enterprise voice plans start with per-minute increments, and volume discounts apply above 10,000 monthly minutes. Would you like me to send the complete rate matrix on WhatsApp?";
        } else if (lower.includes("whatsapp") || lower.includes("brochure") || lower.includes("catalog") || lower.includes("spec")) {
          responseText = "I have dispatched our verified Technical Architecture and Telephony Runbook directly to your registered WhatsApp number. Please feel free to review it!";
        } else {
          responseText = "Great! I have updated your contact profile in our CRM. We can also arrange a personalized live demonstration this Thursday. May I lock in a slot for your team?";
        }
      } else {
        // Inbound mode
        if (lower.includes("sla") || lower.includes("uptime") || lower.includes("latency") || lower.includes("peering")) {
          responseText = "We guarantee 99.99% carrier uptime with automated multi-region SIP failover under 120ms. Audio streams are end-to-end encrypted via TLS 1.3 and SRTP.";
        } else if (lower.includes("telugu") || lower.includes("hindi") || lower.includes("language")) {
          responseText = "ఖచ్చితంగా! మీరు తెలుగులో మాట్లాడవచ్చు. మన వాయిస్ ఆటోమేషన్ ప్లాట్‌ఫారమ్ వివరాలు మరియు API ఇంటిగ్రేషన్ పూర్తి సమాచారం నేను మీకు వివరించగలను. (Sure, you can speak in Telugu! I am fully equipped to guide you in your native language.)";
        } else if (lower.includes("human") || lower.includes("agent") || lower.includes("operator") || lower.includes("transfer")) {
          responseText = "Certainly! I am transferring your call directly to our Senior Solutions Engineer. Please hold for direct SIP connection with zero wait time...";
        } else {
          responseText = "Thank you for asking! Our enterprise platform provides sub-140ms voice latency, multi-lingual Indic speech synthesis, and bi-directional CRM webhook synchronization. I have updated your simulation dossier accordingly.";
        }
      }

      const agentResponse = {
        id: String(Date.now() + 1),
        speaker: "agent",
        text: responseText,
        time: "00:44",
      };
      setSimTurns((prev) => [...prev, agentResponse]);
    }, 600);
  };

  const handleStartCloningProcess = () => {
    if (!cloneConsentConfirmed) return;
    if (!cloneVoiceName.trim()) {
      alert("Please enter a voice identifier name.");
      return;
    }
    try {
      soundSynth.play("confirm");
    } catch {}
    setCloneStatus("uploading");
    setTimeout(() => {
      setCloneStatus("analyzing");
      setTimeout(() => {
        setCloneStatus("ready");
        const newCloned: VoiceItem = {
          id: `cloned-${Date.now()}`,
          name: `${cloneVoiceName.trim()} (Cloned)`,
          gender: cloneSpeakerGender,
          language: cloneSpeakerAccent,
          accent: "Custom Neural Clone",
          tone: "Warm & Reassuring",
          sampleAudio: "https://actions.google.com/sounds/v1/speech/female_affirmation.ogg",
          latencyMs: 122,
          sampleTranscript: cloneTestSentence,
          tag: "Cloned Neural Model",
          recommendedFor: "Personalized Admissions Guidance",
          isCloned: true,
          cloneFidelity: 98.6,
          clonedAt: "Just now",
          provider: "Custom Cloned Neural Engine",
        };
        setClonedVoices((prev) => [newCloned, ...prev]);
        if (selectedAgent) {
          const updatedAgent: DashboardAgent = {
            ...selectedAgent,
            voice: {
              name: newCloned.name,
              gender: newCloned.gender,
              accent: `${newCloned.accent} (${newCloned.tone})`,
              sampleUrl: newCloned.sampleAudio,
              isCloned: true,
            },
          };
          setSelectedAgent(updatedAgent);
          setAgents((prev) => prev.map((a) => (a.id === selectedAgent.id ? updatedAgent : a)));
          try {
            soundSynth.play("affirm");
            soundSynth.speak(
              `Voice model ${cloneVoiceName} cloned and assigned to ${selectedAgent.name.split("—")[0].trim()}!`,
              { rate: 1.05 }
            );
          } catch {}
        }
      }, 1400);
    }, 1000);
  };

  const handlePublishAgent = () => {
    try {
      soundSynth.play("confirm");
    } catch {}
    setPublishModalOpen(false);
    setPublishSuccessNotice(true);
    setTimeout(() => {
      setPublishSuccessNotice(false);
    }, 4000);
  };

  return (
    <div className="space-y-6 select-none font-sans text-[#1A1A1A]">
      {/* ======================================================================= */}
      {/* PAGE HEADER                                                             */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold tracking-wider text-black/50 hover:text-[#1A1A1A] uppercase transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B5CF6] bg-purple-50 px-3 py-1 rounded-full border border-purple-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>{agents.length} Configured Personas</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1A1A1A] mt-1.5 flex items-center gap-2.5">
            <span>AI Voice Agents Studio</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 border border-orange-500/25 text-orange-900 uppercase tracking-wider">
              Autonomous Telecom
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-black/60 mt-1 max-w-2xl leading-relaxed">
            Configure conversational voice personas, ready-made acoustic models, RAG guardrails, and telephony DID routing.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab("playground")}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FAF6EE] text-[#1A1A1A] text-xs font-bold px-4 py-2.5 rounded-full border-2 border-black/[0.08] hover:border-black/20 transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-98"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#FF6B08]" />
            <span>Test Playground</span>
          </button>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B08] via-[#FF7A1A] to-[#E11D48] hover:brightness-110 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(255,107,8,0.35)] transition-all cursor-pointer hover:scale-102 active:scale-98"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Provision Agent</span>
          </button>
        </div>
      </div>

      {/* Creation Success Toast Banner */}
      {creationSuccessToast && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-in fade-in duration-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-2xs shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-xs font-black block text-emerald-950">New Autonomous Voice Agent Deployed!</strong>
              <span className="text-[11.5px] text-emerald-800 font-medium">{creationSuccessToast}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab("playground")}
            className="text-xs font-black px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs cursor-pointer shrink-0 transition-all hover:scale-105 active:scale-95"
          >
            Test Call in Playground →
          </button>
        </div>
      )}

      {/* Save Success Notice */}
      {saveSuccessNotice && (
        <div className="p-3.5 rounded-2xl bg-[#C1F2D5]/70 border-2 border-[#16856B]/40 flex items-center gap-3 text-xs text-[#0D593F] font-bold animate-in fade-in duration-200 shadow-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16856B]" />
          <span>Agent purpose, context knowledge, and behavioral guardrails successfully updated and saved!</span>
        </div>
      )}

      {/* Publish Notification Banner */}
      {publishSuccessNotice && (
        <div className="p-3.5 rounded-2xl bg-[#C1F2D5]/40 border border-[#16856B]/20 flex items-center gap-3 text-xs text-[#0D593F] font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16856B]" />
          <span>Agent revision successfully compiled and published to live telephony line {selectedAgent?.assignedNumber || ""}.</span>
        </div>
      )}

      {/* ======================================================================= */}
      {/* AGENT SELECTOR CARDS (Persona-Specific Color System)                    */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => {
          const isSelected = selectedAgent?.id === agent.id;
          const theme = getAgentTheme(agent.id);

          return (
            <div
              key={agent.id}
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setSelectedAgent(agent);
              }}
              className={`relative overflow-hidden p-5 rounded-[24px] border-2 transition-all duration-200 text-left cursor-pointer flex flex-col justify-between select-none ${
                isSelected
                  ? `bg-gradient-to-br ${theme.gradient} ${theme.borderActive} ${theme.shadow} ${theme.ring} scale-[1.01]`
                  : "bg-white hover:bg-white/95 border-black/[0.07] hover:border-black/20 shadow-2xs hover:-translate-y-0.5"
              }`}
            >
              {/* Subtle ambient corner decoration */}
              <div
                className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full pointer-events-none opacity-20"
                style={{ backgroundColor: theme.accent }}
              />

              <div className="relative z-10 flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm border border-white/40 transition-transform ${
                      theme.avatarBg
                    } ${theme.avatarText} ${isSelected ? "scale-105" : ""}`}
                  >
                    <Bot className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-sm text-[#1A1A1A] truncate">
                      {agent.name.split("—")[0].trim()}
                    </h3>
                    <p className="text-[11px] font-medium text-black/60 truncate">
                      {agent.role}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#C1F2D5] text-[#0D593F] border border-[#16856B]/20 shrink-0 shadow-2xs">
                  Active
                </span>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px]">
                <span className="text-black/60 font-medium truncate mr-1">
                  Voice: <strong className="text-[#1A1A1A] font-bold">{agent.voice.name}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-lg bg-black/[0.04] border border-black/[0.06] font-mono font-bold text-[10.5px] text-black/75 shrink-0">
                  DID: {agent.assignedNumber.slice(-4)}
                </span>
              </div>
            </div>
          );
        })}

        {/* Quick Provision New Agent Card */}
        <div
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setCreateModalOpen(true);
          }}
          className="relative overflow-hidden p-5 rounded-[24px] border-2 border-dashed border-black/15 hover:border-[#FF6B08] bg-black/[0.01] hover:bg-orange-50/40 transition-all text-left cursor-pointer flex flex-col items-center justify-center gap-2.5 select-none min-h-[120px] group shadow-2xs"
        >
          <div className="w-11 h-11 rounded-2xl bg-orange-100 text-[#FF6B08] group-hover:bg-[#FF6B08] group-hover:text-white transition-all flex items-center justify-center font-bold shadow-2xs">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="text-center">
            <strong className="text-xs font-black text-[#1A1A1A] group-hover:text-[#FF6B08] transition-colors block">
              + Create New Agent
            </strong>
            <span className="text-[11px] text-black/50">Custom Voice, Context &amp; Rules</span>
          </div>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* ACTIVE AGENT DETAIL DECK (9 TABS) OR ZERO-STATE                          */}
      {/* ======================================================================= */}
      {!selectedAgent ? (
        <div className="bg-white rounded-[26px] border-2 border-dashed border-black/15 p-12 text-center flex flex-col items-center justify-center gap-4 shadow-2xs">
          <div className="w-16 h-16 rounded-3xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6B08]">
            <Bot className="w-8 h-8 stroke-[2.2]" />
          </div>
          <div className="max-w-md">
            <h3 className="text-base font-bold text-[#1A1A1A]">No Voice Agents Deployed</h3>
            <p className="text-xs text-black/60 mt-1">
              Create your first autonomous AI voice agent with custom system prompts, neural voice synthesis, and call routing guardrails.
            </p>
          </div>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-[#FF6B08] hover:bg-[#E55F05] text-white shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create Your First Agent</span>
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-[26px] border-2 border-black/[0.08] shadow-[0_6px_30px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Agent Profile Sub-Header with Dynamic Theme Gradient */}
        <div
          className={`px-6 py-5 border-b border-black/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 ${activeAgentTheme.heroBg}`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md border-2 border-white shrink-0 ${activeAgentTheme.avatarBg} ${activeAgentTheme.avatarText}`}
            >
              <Bot className="w-7 h-7 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-extrabold text-[#1A1A1A] tracking-tight">
                  {selectedAgent.name}
                </h2>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
                  Production v3.4
                </span>
                <span className="text-[10px] font-extrabold bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-200 shadow-2xs">
                  {selectedAgent.department}
                </span>
              </div>
              <p className="text-xs text-black/60 mt-1 flex items-center gap-2 flex-wrap">
                <span>Assigned Route: <strong className="text-[#1A1A1A] font-bold font-mono">{selectedAgent.assignedNumber}</strong></span>
                <span>•</span>
                <span>Voice: <strong className="text-[#FF6B08] font-bold">{selectedAgent.voice.name}</strong></span>
                <span>•</span>
                <span>Language: <strong className="text-purple-700 font-bold">{selectedAgent.language}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleSimulateCall(selectedAgent)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold bg-white hover:bg-[#FAF6EE] text-[#1A1A1A] border-2 border-black/[0.08] hover:border-black/20 transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-98"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FF6B08]" />
              <span>Simulate Call</span>
            </button>

            <button
              onClick={() => setPublishModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#10B981] to-[#059669] hover:brightness-110 text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all cursor-pointer hover:scale-102 active:scale-98"
            >
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Publish Changes</span>
            </button>
          </div>
        </div>

        {/* 8 Tab Navigation Strip with Jewel-Toned Icons */}
        <div className="px-5 border-b border-black/[0.06] bg-[#FAF8F3] flex items-center gap-1.5 overflow-x-auto scrollbar-none py-2.5">
          {[
            { id: "overview", label: "Overview", icon: Bot, color: "text-purple-600" },
            { id: "instructions", label: "Instructions", icon: Terminal, color: "text-emerald-600" },
            { id: "voice", label: "Voice & Library", icon: Volume2, color: "text-amber-600" },
            { id: "languages", label: "Languages", icon: Globe, color: "text-cyan-600" },
            { id: "knowledge", label: "Knowledge", icon: FileText, color: "text-blue-600" },
            { id: "call-rules", label: "Call Rules", icon: ShieldCheck, color: "text-rose-600" },
            { id: "playground", label: "Test Playground", icon: Activity, color: "text-orange-600" },
            { id: "history", label: "History", icon: HistoryIcon, color: "text-purple-600", badge: conversationHistory.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? "bg-[#18181B] text-white border-[#18181B] shadow-xs scale-102"
                    : "bg-white hover:bg-[#FAF6EE] text-black/65 hover:text-black border-black/[0.07] hover:border-black/15 shadow-2xs"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : tab.color}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-white/25 text-white" : "bg-purple-100 text-purple-900 border border-purple-200"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="p-6">
          {/* =================================================================== */}
          {/* TAB 1: OVERVIEW                                                     */}
          {/* =================================================================== */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Agent Telemetry HUD Pods - Distinctive Acoustic Shape, Size & Color Palette */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-black/70">
                      Real-time Agent Telemetry
                    </span>
                    <span className="text-[11px] font-medium text-black/40 hidden sm:inline">
                      • Acoustic telemetry & latency metrics for {selectedAgent.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/[0.05] text-black/60 border border-black/10">
                    Agent Pods
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {/* CARD 1: Calls Handled (Electric Indigo Violet) */}
                  <div className="relative overflow-hidden rounded-[18px] border border-[#4338CA]/50 bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#3730A3] p-4 flex flex-col justify-between min-h-[128px] text-white shadow-[0_8px_20px_-4px_rgba(79,70,229,0.35)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_-4px_rgba(79,70,229,0.45)] group select-none">
                    {/* Top specular highlight edge */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/60 via-white/20 to-transparent" />
                    {/* High-tech acoustic waveform graphic */}
                    <div className="absolute right-3.5 top-3.5 flex items-end gap-1 opacity-25 group-hover:opacity-45 transition-opacity pointer-events-none">
                      <span className="w-1 h-3 rounded-full bg-white animate-pulse" style={{ animationDelay: "0ms" }} />
                      <span className="w-1 h-5 rounded-full bg-white animate-pulse" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "300ms" }} />
                      <span className="w-1 h-6 rounded-full bg-white animate-pulse" style={{ animationDelay: "450ms" }} />
                      <span className="w-1 h-4 rounded-full bg-white animate-pulse" style={{ animationDelay: "200ms" }} />
                    </div>

                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform text-white">
                          <PhoneCall className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                        <span className="font-extrabold text-xs tracking-tight text-white/95">
                          Calls Handled
                        </span>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/30 text-white/95 border border-white/20 shadow-2xs">
                        ROUTED
                      </span>
                    </div>

                    <div className="relative z-10 pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[30px] font-black tracking-tight leading-none text-white">
                          {selectedAgent.callsToday ? selectedAgent.callsToday.toLocaleString() : "0"}
                        </span>
                        <span className="text-[11px] font-bold text-white/75">calls today</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 text-[11px] border-t border-white/15 mt-2">
                        <span className="text-white/80 font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 100% Routed
                        </span>
                        <span className="font-black text-white/90 group-hover:text-white group-hover:underline cursor-pointer">
                          Live Ledger &rarr;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: Resolution Accuracy (Cyber Emerald Mint) */}
                  <div className="relative overflow-hidden rounded-[18px] border border-[#047857]/50 bg-gradient-to-br from-[#059669] via-[#047857] to-[#064E3B] p-4 flex flex-col justify-between min-h-[128px] text-white shadow-[0_8px_20px_-4px_rgba(5,150,105,0.35)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_-4px_rgba(5,150,105,0.45)] group select-none">
                    {/* Top specular highlight edge */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/60 via-white/20 to-transparent" />
                    {/* Acoustic waveform graphic */}
                    <div className="absolute right-3.5 top-3.5 flex items-end gap-1 opacity-25 group-hover:opacity-45 transition-opacity pointer-events-none">
                      <span className="w-1 h-4 rounded-full bg-white animate-pulse" style={{ animationDelay: "100ms" }} />
                      <span className="w-1 h-6 rounded-full bg-white animate-pulse" style={{ animationDelay: "250ms" }} />
                      <span className="w-1 h-3 rounded-full bg-white animate-pulse" style={{ animationDelay: "400ms" }} />
                      <span className="w-1 h-5 rounded-full bg-white animate-pulse" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "350ms" }} />
                    </div>

                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform text-white">
                          <ShieldCheck className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                        <span className="font-extrabold text-xs tracking-tight text-white/95">
                          Resolution Accuracy
                        </span>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/30 text-white/95 border border-white/20 shadow-2xs">
                        STRICT RAG
                      </span>
                    </div>

                    <div className="relative z-10 pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[30px] font-black tracking-tight leading-none text-white">
                          {selectedAgent.accuracy}%
                        </span>
                        <span className="text-[11px] font-bold text-white/75">grounded yield</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 text-[11px] border-t border-white/15 mt-2">
                        <span className="text-white/80 font-bold">Zero Hallucination</span>
                        <span className="font-black text-white/90 group-hover:text-white group-hover:underline cursor-pointer">
                          Audit Log &rarr;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 3: Average Duration (Hot Crimson Berry) */}
                  <div className="relative overflow-hidden rounded-[18px] border border-[#BE123C]/50 bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#881337] p-4 flex flex-col justify-between min-h-[128px] text-white shadow-[0_8px_20px_-4px_rgba(225,29,72,0.35)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_-4px_rgba(225,29,72,0.45)] group select-none">
                    {/* Top specular highlight edge */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/60 via-white/20 to-transparent" />
                    {/* Acoustic waveform graphic */}
                    <div className="absolute right-3.5 top-3.5 flex items-end gap-1 opacity-25 group-hover:opacity-45 transition-opacity pointer-events-none">
                      <span className="w-1 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "200ms" }} />
                      <span className="w-1 h-5 rounded-full bg-white animate-pulse" style={{ animationDelay: "50ms" }} />
                      <span className="w-1 h-6 rounded-full bg-white animate-pulse" style={{ animationDelay: "300ms" }} />
                      <span className="w-1 h-3 rounded-full bg-white animate-pulse" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-4 rounded-full bg-white animate-pulse" style={{ animationDelay: "400ms" }} />
                    </div>

                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform text-white">
                          <Clock className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                        <span className="font-extrabold text-xs tracking-tight text-white/95">
                          Avg Call Duration
                        </span>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/30 text-white/95 border border-white/20 shadow-2xs">
                        NATURAL
                      </span>
                    </div>

                    <div className="relative z-10 pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[28px] sm:text-[30px] font-black tracking-tight leading-none text-white">
                          {selectedAgent.avgDuration}
                        </span>
                        <span className="text-[11px] font-bold text-white/75">turn paced</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 text-[11px] border-t border-white/15 mt-2">
                        <span className="text-white/80 font-bold">Natural Turn-Taking</span>
                        <span className="font-black text-white/90 group-hover:text-white group-hover:underline cursor-pointer">
                          Waveform &rarr;
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 4: Response Latency SLA (Deep Oceanic Teal) */}
                  <div className="relative overflow-hidden rounded-[18px] border border-[#0F766E]/50 bg-gradient-to-br from-[#0D9488] via-[#0F766E] to-[#134E4A] p-4 flex flex-col justify-between min-h-[128px] text-white shadow-[0_8px_20px_-4px_rgba(13,148,136,0.35)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_-4px_rgba(13,148,136,0.45)] group select-none">
                    {/* Top specular highlight edge */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/60 via-white/20 to-transparent" />
                    {/* Acoustic waveform graphic */}
                    <div className="absolute right-3.5 top-3.5 flex items-end gap-1 opacity-25 group-hover:opacity-45 transition-opacity pointer-events-none">
                      <span className="w-1 h-6 rounded-full bg-white animate-pulse" style={{ animationDelay: "100ms" }} />
                      <span className="w-1 h-3 rounded-full bg-white animate-pulse" style={{ animationDelay: "300ms" }} />
                      <span className="w-1 h-5 rounded-full bg-white animate-pulse" style={{ animationDelay: "150ms" }} />
                      <span className="w-1 h-2 rounded-full bg-white animate-pulse" style={{ animationDelay: "450ms" }} />
                      <span className="w-1 h-4 rounded-full bg-white animate-pulse" style={{ animationDelay: "200ms" }} />
                    </div>

                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform text-white">
                          <Zap className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                        <span className="font-extrabold text-xs tracking-tight text-white/95">
                          Response SLA
                        </span>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/30 text-white/95 border border-white/20 shadow-2xs">
                        SUB-150MS
                      </span>
                    </div>

                    <div className="relative z-10 pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[30px] font-black tracking-tight leading-none text-white">
                          138 ms
                        </span>
                        <span className="text-[11px] font-bold text-white/75">turn latency</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 text-[11px] border-t border-white/15 mt-2">
                        <span className="text-white/80 font-bold">Ultra-Low Latency</span>
                        <span className="font-black text-white/90 group-hover:text-white group-hover:underline cursor-pointer">
                          SLA Metrics &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Acoustic Profile */}
                <div className="p-6 rounded-[24px] border-2 border-amber-500/20 bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF7ED] space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#FFF4ED] border border-[#FF6B08]/25 text-[#FF6B08] flex items-center justify-center shadow-2xs">
                        <Volume2 className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <span>Acoustic Profile</span>
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      High Fidelity
                    </span>
                  </div>

                  <div className="text-xs space-y-2.5">
                    <div className="flex items-center justify-between py-2 border-b border-black/[0.05]">
                      <span className="text-black/60 font-medium">Active Ready-Made Voice:</span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-orange-50 border border-orange-200 font-bold text-orange-900">
                        {selectedAgent.voice.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-black/[0.05]">
                      <span className="text-black/60 font-medium">Accent & Tone:</span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 border border-purple-200 font-bold text-purple-900">
                        {selectedAgent.voice.accent}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-black/[0.05]">
                      <span className="text-black/60 font-medium">Language Mode:</span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 border border-blue-200 font-bold text-blue-900">
                        {selectedAgent.language}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-black/60 font-medium">Assigned DID:</span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 font-bold font-mono text-emerald-900">
                        {selectedAgent.assignedNumber}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("voice")}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-[#FAF6EE] text-xs font-bold text-[#FF6B08] border border-[#FF6B08]/30 transition-all cursor-pointer text-center block shadow-2xs hover:shadow-xs"
                  >
                    Change Voice & Audio Model &rarr;
                  </button>
                </div>

                {/* Operational Guardrails */}
                <div className="p-6 rounded-[24px] border-2 border-emerald-500/20 bg-gradient-to-br from-[#F7FCF9] via-white to-[#ECFDF5] space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-2xs">
                        <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                      </div>
                      <span>Operational Guardrails</span>
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                      Enterprise Compliant
                    </span>
                  </div>

                  <div className="text-xs space-y-2.5">
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                      </div>
                      <span className="text-[#1A1A1A] font-medium">Zero-hallucination vector store restriction active</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                      </div>
                      <span className="text-[#1A1A1A] font-medium">Warm transfer to Counselor desk on complex disputes</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                      </div>
                      <span className="text-[#1A1A1A] font-medium">Automated DPDP compliance & PII masking</span>
                    </div>
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-emerald-100 shadow-2xs">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-emerald-700 stroke-[2.5]" />
                      </div>
                      <span className="text-[#1A1A1A] font-medium">10-minute maximum call safety cutoff</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("instructions")}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-xs font-bold text-emerald-700 border border-emerald-300 transition-all cursor-pointer text-center block shadow-2xs hover:shadow-xs"
                  >
                    Edit Guardrails & System Prompt &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 2: INSTRUCTIONS                                                 */}
          {/* =================================================================== */}
          {activeTab === "instructions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Purpose, Context &amp; Conversational Rules Studio</span>
                  </h3>
                  <p className="text-xs text-black/60 mt-0.5">
                    Customize the core mission, institutional context facts, behavioral rules, and voice greeting for {selectedAgent.name.split("—")[0].trim()}.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 font-mono shadow-2xs">
                    SPEC V3.5 • PRODUCTION
                  </span>
                </div>
              </div>

              {/* SECTION 1: PURPOSE & CORE OBJECTIVE FREEDOM */}
              <div className="p-5 rounded-[24px] bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white border-2 border-amber-400/30 space-y-3.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-[#1A1A1A] flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#FF8800] to-[#FF6B08] text-white flex items-center justify-center shadow-2xs font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Agent Purpose &amp; Core Mission (Full Freedom)</span>
                  </label>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                    Autonomous Scope
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={editPurpose}
                  onChange={(e) => setEditPurpose(e.target.value)}
                  placeholder="Define this agent's core purpose, decision rights, target audience, and primary KPIs..."
                  className="w-full text-xs p-3.5 bg-white border-2 border-amber-300/60 rounded-xl text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B08] shadow-xs leading-relaxed"
                />
              </div>

              {/* SECTION 2: CONTEXT & GROUNDING KNOWLEDGE POINTS */}
              <div className="p-5 rounded-[24px] bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-white border-2 border-blue-400/30 space-y-3.5 shadow-xs">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-[#1A1A1A] flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-2xs font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span>Institutional Context &amp; Grounding Facts ({editGroundingFacts.length})</span>
                  </label>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                    Zero-Hallucination Vector Store
                  </span>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {editGroundingFacts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-white border border-blue-200/80 flex items-center justify-between gap-2 shadow-2xs"
                    >
                      <span className="text-xs text-[#1A1A1A] font-medium leading-relaxed">
                        • {fact}
                      </span>
                      <button
                        type="button"
                        onClick={() => setEditGroundingFacts((prev) => prev.filter((_, i) => i !== idx))}
                        className="text-black/35 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                        title="Remove Fact"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Fact Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add verified institutional fact (e.g. Hostels feature 24/7 solar water heating and Wi-Fi)..."
                    value={newContextFactInput}
                    onChange={(e) => setNewContextFactInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newContextFactInput.trim()) {
                          setEditGroundingFacts((prev) => [...prev, newContextFactInput.trim()]);
                          setNewContextFactInput("");
                          try { soundSynth.play("pop"); } catch {}
                        }
                      }
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white border-2 border-blue-200/80 focus:border-blue-600 text-xs font-medium focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newContextFactInput.trim()) {
                        setEditGroundingFacts((prev) => [...prev, newContextFactInput.trim()]);
                        setNewContextFactInput("");
                        try { soundSynth.play("pop"); } catch {}
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Fact</span>
                  </button>
                </div>
              </div>

              {/* SECTION 3: CONVERSATIONAL RULES & STRICT GUARDRAILS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Behavioral DO's */}
                <div className="p-5 rounded-[24px] bg-emerald-50/60 border-2 border-emerald-300/80 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-950 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                      <span>Behavioral DO's ({editDosRules.length})</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {editDosRules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-emerald-200/70 flex items-center justify-between gap-2 text-xs shadow-2xs"
                      >
                        <span className="text-emerald-950 font-medium">✓ {rule}</span>
                        <button
                          type="button"
                          onClick={() => setEditDosRules((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-black/30 hover:text-rose-600 cursor-pointer p-0.5 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      placeholder="Add mandatory rule..."
                      value={newDoInput}
                      onChange={(e) => setNewDoInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newDoInput.trim()) {
                            setEditDosRules((prev) => [...prev, newDoInput.trim()]);
                            setNewDoInput("");
                            try { soundSynth.play("pop"); } catch {}
                          }
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newDoInput.trim()) {
                          setEditDosRules((prev) => [...prev, newDoInput.trim()]);
                          setNewDoInput("");
                          try { soundSynth.play("pop"); } catch {}
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Strict DON'Ts */}
                <div className="p-5 rounded-[24px] bg-rose-50/60 border-2 border-rose-300/80 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-rose-950 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>Strict DON'Ts &amp; Guardrails ({editDontsRules.length})</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {editDontsRules.map((rule, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-rose-200/70 flex items-center justify-between gap-2 text-xs shadow-2xs"
                      >
                        <span className="text-rose-950 font-medium">✕ {rule}</span>
                        <button
                          type="button"
                          onClick={() => setEditDontsRules((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-black/30 hover:text-rose-600 cursor-pointer p-0.5 shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 pt-1">
                    <input
                      type="text"
                      placeholder="Add forbidden policy..."
                      value={newDontInput}
                      onChange={(e) => setNewDontInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newDontInput.trim()) {
                            setEditDontsRules((prev) => [...prev, newDontInput.trim()]);
                            setNewDontInput("");
                            try { soundSynth.play("pop"); } catch {}
                          }
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-rose-300 text-xs focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newDontInput.trim()) {
                          setEditDontsRules((prev) => [...prev, newDontInput.trim()]);
                          setNewDontInput("");
                          try { soundSynth.play("pop"); } catch {}
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 4: GREETING PHRASE & ESCALATION DESK */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-[22px] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border-2 border-amber-400/30 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-[#1A1A1A] flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-[#FF6B08]" />
                      <span>Greeting Phrase (Turn 1 Audio Packet)</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        soundSynth.speak(editGreetingPhrase);
                      }}
                      className="text-[11px] font-bold text-[#FF6B08] hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-[#FF6B08]" />
                      <span>Listen</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editGreetingPhrase}
                    onChange={(e) => setEditGreetingPhrase(e.target.value)}
                    className="w-full text-xs p-3 bg-white border-2 border-amber-300/60 rounded-xl text-[#1A1A1A] font-medium focus:outline-none focus:border-[#FF6B08] shadow-xs"
                  />
                </div>

                <div className="p-5 rounded-[22px] bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 border-2 border-purple-400/30 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-[#1A1A1A] flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-purple-700" />
                      <span>Human Escalation Desk</span>
                    </label>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-900">
                      SIP Zero-Wait
                    </span>
                  </div>
                  <input
                    type="text"
                    value={editEscalationDesk}
                    onChange={(e) => setEditEscalationDesk(e.target.value)}
                    className="w-full text-xs p-3 bg-white border-2 border-purple-300/60 rounded-xl text-[#1A1A1A] font-medium focus:outline-none focus:border-purple-600 shadow-xs"
                  />
                </div>
              </div>

              {/* Terminal-style Core System Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-extrabold text-[#1A1A1A] flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300 shadow-2xs">
                      <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span>Full Compiled System Prompt (Markdown)</span>
                  </label>
                  <span className="text-[10.5px] font-mono text-black/50">Runtime Instruction Engine</span>
                </div>

                <div className="rounded-[22px] border-2 border-black/[0.08] overflow-hidden shadow-xs">
                  <div className="px-4 py-2.5 bg-[#1F2937] border-b border-black/20 flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                        <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                        <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                      </div>
                      <span className="text-white/60 font-mono text-[11px] ml-2">system-prompt.md</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                      SYNTAX VALID
                    </span>
                  </div>

                  <textarea
                    rows={6}
                    value={editSystemPrompt}
                    onChange={(e) => setEditSystemPrompt(e.target.value)}
                    className="w-full font-mono text-xs p-4 bg-[#FDFBF7] text-[#1A1A1A] focus:outline-none focus:bg-white leading-relaxed resize-y border-none"
                  />
                </div>
              </div>

              {/* Save & Apply Revisions Controls */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditPurpose(selectedAgent.purpose || "");
                    setEditGreetingPhrase(selectedAgent.greetingPhrase || "");
                    setEditSystemPrompt(selectedAgent.systemPromptPreview);
                  }}
                  className="rounded-full px-5 py-2.5 text-xs font-bold text-black/60 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] border border-black/10 transition-all cursor-pointer"
                >
                  Reset to Current
                </button>
                <button
                  type="button"
                  onClick={handleSaveAgentInstructions}
                  className="rounded-full px-6 py-2.5 text-xs font-bold bg-gradient-to-r from-[#10B981] via-[#059669] to-[#047857] hover:brightness-110 text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)] transition-all cursor-pointer hover:scale-102 active:scale-98"
                >
                  Save &amp; Apply Revisions
                </button>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 3: VOICE & LIBRARY                                              */}
          {/* =================================================================== */}
          {activeTab === "voice" && (
            <div className="space-y-8">
              {/* Selected Voice Summary Banner with High-Voltage Persona Gradient */}
              <div className="p-5 rounded-[24px] bg-gradient-to-r from-purple-500/12 via-pink-500/10 to-amber-500/12 border-2 border-purple-300/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B5CF6] via-[#EC4899] to-[#FF6B08] text-white flex items-center justify-center font-bold shadow-md border-2 border-white shrink-0">
                    <Volume2 className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-extrabold text-[#1A1A1A]">
                        Active Voice: {selectedAgent.voice.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
                        Active Telephony Line
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-200">
                        {selectedAgent.voice.gender}
                      </span>
                    </div>
                    <p className="text-xs text-black/65 mt-1 font-medium flex items-center gap-2 flex-wrap">
                      <span>{selectedAgent.voice.accent}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">Latency: Sub-135ms</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => {
                      try { soundSynth.play("affirm"); } catch {}
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#FF6B08] to-[#FF8800] hover:brightness-110 text-white shadow-[0_4px_16px_rgba(255,107,8,0.3)] transition-all cursor-pointer hover:scale-102 active:scale-98"
                  >
                    <Play className="w-3.5 h-3.5 fill-white stroke-none" />
                    <span>Test Current Audio</span>
                  </button>
                </div>
              </div>

              {/* Section 1: Ready-Made Voice Selection (Prioritised) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-[#FF6B08]" />
                      <span>Ready-Made Neural Voice Library</span>
                      <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
                        Recommended
                      </span>
                    </h3>
                    <p className="text-xs text-black/60 mt-0.5">
                      High-fidelity, ultra low-latency neural acoustic models optimized for Indian English and regional Indic dialects.
                    </p>
                  </div>
                </div>

                {/* Source Filter Switcher Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 p-1.5 bg-black/[0.04] rounded-2xl border border-black/[0.06]">
                    <button
                      type="button"
                      onClick={() => {
                        setVoiceSourceTab("all");
                        try { soundSynth.play("click"); } catch {}
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        voiceSourceTab === "all"
                          ? "bg-white text-[#1A1A1A] shadow-xs"
                          : "text-black/60 hover:text-black"
                      }`}
                    >
                      All Voices ({allAvailableVoices.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVoiceSourceTab("ready");
                        try { soundSynth.play("click"); } catch {}
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        voiceSourceTab === "ready"
                          ? "bg-white text-[#1A1A1A] shadow-xs"
                          : "text-black/60 hover:text-black"
                      }`}
                    >
                      <span>Ready-Made</span>
                      <span className="px-1.5 py-0.2 rounded-md bg-emerald-100 text-emerald-800 text-[10px]">
                        {readyMadeVoices.length}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setVoiceSourceTab("cloned");
                        try { soundSynth.play("click"); } catch {}
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        voiceSourceTab === "cloned"
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xs"
                          : "text-purple-700 hover:text-purple-900"
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Cloned Vault</span>
                      <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                        voiceSourceTab === "cloned" ? "bg-white/20 text-white" : "bg-purple-100 text-purple-900"
                      }`}>
                        {clonedVoices.length}
                      </span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      setCreateModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white shadow-xs transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create Agent with Cloned Voice</span>
                  </button>
                </div>

                {/* Filters */}
                <div className="p-4 rounded-[22px] bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-purple-500/5 border-2 border-black/[0.06] flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-black/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search voice name, accent or language..."
                      value={voiceSearch}
                      onChange={(e) => setVoiceSearch(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-black/[0.08] rounded-full text-[#1A1A1A] focus:outline-none focus:border-[#FF6B08] placeholder:text-black/40 shadow-2xs"
                    />
                  </div>

                  <select
                    value={voiceLangFilter}
                    onChange={(e) => setVoiceLangFilter(e.target.value)}
                    className="text-xs bg-white border border-black/[0.08] rounded-full px-3.5 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B08] cursor-pointer shadow-2xs font-semibold"
                  >
                    <option value="all">All Languages</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Indian English">Indian English</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Bengali">Bengali</option>
                    <option value="US English">US English</option>
                  </select>

                  <select
                    value={voiceToneFilter}
                    onChange={(e) => setVoiceToneFilter(e.target.value)}
                    className="text-xs bg-white border border-black/[0.08] rounded-full px-3.5 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B08] cursor-pointer shadow-2xs font-semibold"
                  >
                    <option value="all">All Tones</option>
                    <option value="Warm & Reassuring">Warm &amp; Reassuring</option>
                    <option value="Professional Executive">Professional Executive</option>
                    <option value="Conversational Friendly">Conversational Friendly</option>
                    <option value="Direct & Crisp">Direct &amp; Crisp</option>
                  </select>

                  <select
                    value={voiceGenderFilter}
                    onChange={(e) => setVoiceGenderFilter(e.target.value)}
                    className="text-xs bg-white border border-black/[0.08] rounded-full px-3.5 py-2 text-[#1A1A1A] focus:outline-none focus:border-[#FF6B08] cursor-pointer shadow-2xs font-semibold"
                  >
                    <option value="all">All Genders</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>

                {/* Voice Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredVoices.map((v) => {
                    const isSelected = selectedAgent.voice.name.toLowerCase() === v.name.toLowerCase();
                    const isPlaying = playingVoiceId === v.id;
                    const isFemale = v.gender.toLowerCase() === "female";

                    return (
                      <div
                        key={v.id}
                        className={`p-5 rounded-[24px] border-2 transition-all flex flex-col justify-between ${
                          isSelected
                            ? "bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 border-[#FF6B08] ring-4 ring-[#FF6B08]/15 shadow-md scale-[1.01]"
                            : "bg-white hover:bg-[#FAF9F6] border-black/[0.07] hover:border-[#FF6B08]/40 shadow-2xs hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shrink-0 shadow-2xs ${
                                  v.isCloned
                                    ? "bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 shadow-[0_4px_12px_rgba(147,51,234,0.3)]"
                                    : isFemale
                                    ? "bg-gradient-to-br from-pink-500 to-purple-600"
                                    : "bg-gradient-to-br from-cyan-500 to-blue-600"
                                }`}
                              >
                                {v.isCloned ? (
                                  <Sparkles className="w-5 h-5 stroke-[2.2]" />
                                ) : (
                                  <Volume2 className="w-5 h-5 stroke-[2.2]" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <h4 className="font-extrabold text-xs text-[#1A1A1A]">{v.name}</h4>
                                  {v.isCloned ? (
                                    <span className="text-[9.5px] font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-2 py-0.5 rounded-full shadow-2xs">
                                      Neural Clone
                                    </span>
                                  ) : v.tag && (
                                    <span className="text-[9.5px] font-extrabold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full border border-purple-200">
                                      {v.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] font-medium text-black/60 mt-0.5">{v.accent}</p>
                              </div>
                            </div>

                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 border ${
                                v.isCloned
                                  ? "bg-purple-50 text-purple-700 border-purple-200"
                                  : isFemale
                                  ? "bg-pink-50 text-pink-700 border-pink-200"
                                  : "bg-cyan-50 text-cyan-700 border-cyan-200"
                              }`}
                            >
                              {v.gender}
                            </span>
                          </div>

                          <div className="p-3 rounded-xl bg-black/[0.02] border-l-3 border-[#FF6B08] text-[11px] text-black/75 italic leading-snug line-clamp-2">
                            &ldquo;{v.sampleTranscript}&rdquo;
                          </div>

                          <div className="flex items-center justify-between text-[10.5px]">
                            <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 border border-indigo-200 font-semibold">
                              {v.tone}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                              {v.latencyMs}ms latency
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handlePlayVoiceSample(v)}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6B08] hover:text-[#E11D48] transition-colors cursor-pointer"
                          >
                            {isPlaying ? (
                              <>
                                <Pause className="w-3.5 h-3.5 fill-[#FF6B08]" />
                                <span>Playing sample...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-[#FF6B08]" />
                                <span>Play Sample</span>
                              </>
                            )}
                          </button>

                          {isSelected ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0D593F] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 shadow-2xs">
                              <Check className="w-3.5 h-3.5 text-[#16856B] stroke-[2.5]" />
                              <span>Active</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSelectVoice(v)}
                              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white hover:bg-[#FF6B08] hover:text-white text-[#1A1A1A] border-2 border-black/[0.08] hover:border-[#FF6B08] transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-98"
                            >
                              Select Voice
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Section 2: Full-Featured Custom Voice Cloning Studio */}
              <div className="pt-6 border-t border-black/[0.06] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-[#1A1A1A]">
                        Custom Voice Cloning Studio
                      </h3>
                      <span className="text-[10px] font-extrabold bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-900 px-2.5 py-0.5 rounded-full border border-purple-300">
                        Zero Shot Neural Acoustic Embeddings
                      </span>
                    </div>
                    <p className="text-xs text-black/60 mt-1">
                      Capture or upload audio to clone any voice (Dean, counselor, ambassador, or founder) with verifiable legal consent.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-[28px] border-2 border-purple-200/80 bg-gradient-to-br from-purple-50/40 via-white to-indigo-50/40 space-y-5 shadow-xs">
                  {/* Step A: Input Mode Choice (Microphone vs Audio File) */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-[#1A1A1A] block">
                      1. Audio Capture Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setCloneInputMode("mic");
                          try { soundSynth.play("click"); } catch {}
                        }}
                        className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                          cloneInputMode === "mic"
                            ? "bg-purple-100/70 border-purple-600 shadow-sm"
                            : "bg-white border-black/10 hover:border-purple-300"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                          cloneInputMode === "mic"
                            ? "bg-purple-600 text-white"
                            : "bg-black/5 text-black/60"
                        }`}>
                          <Mic className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#1A1A1A]">Live Microphone Record</h4>
                          <p className="text-[11px] text-black/60 mt-0.5">Read a 30-60 sec prompt into your microphone</p>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCloneInputMode("upload");
                          try { soundSynth.play("click"); } catch {}
                        }}
                        className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                          cloneInputMode === "upload"
                            ? "bg-purple-100/70 border-purple-600 shadow-sm"
                            : "bg-white border-black/10 hover:border-purple-300"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                          cloneInputMode === "upload"
                            ? "bg-purple-600 text-white"
                            : "bg-black/5 text-black/60"
                        }`}>
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#1A1A1A]">Upload Audio File</h4>
                          <p className="text-[11px] text-black/60 mt-0.5">WAV, MP3, M4A or OGG studio speech recording</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Step B: Live Mic Recording or Upload Box */}
                  {cloneInputMode === "mic" ? (
                    <div className="p-5 rounded-2xl bg-white border-2 border-purple-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1 text-center sm:text-left">
                        <span className="text-[11px] font-black uppercase tracking-wider text-purple-900 block">
                          Microphone Audio Capture Session
                        </span>
                        <p className="text-xs text-black/65">
                          {isCloneRecording
                            ? `Recording in progress... (${cloneRecordingSecs} seconds elapsed)`
                            : cloneRecordedBlob
                            ? `Live recording captured (${cloneFileName}). Ready for neural vector processing.`
                            : "Press Record and speak naturally in a quiet room."}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {isCloneRecording ? (
                          <>
                            <div className="flex items-center gap-1.5 h-6">
                              {[30, 80, 100, 60, 90, 45, 75, 55].map((h, i) => (
                                <div
                                  key={i}
                                  style={{ height: `${h}%` }}
                                  className="w-1 bg-rose-500 rounded-full animate-pulse"
                                />
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={stopCloneMicRecord}
                              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
                            >
                              <Square className="w-3.5 h-3.5 fill-white stroke-none" />
                              <span>Stop Recording ({cloneRecordingSecs}s)</span>
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={startCloneMicRecord}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-md cursor-pointer transition-all hover:scale-105 active:scale-95"
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span>{cloneRecordedBlob ? "Re-Record Sample" : "Start Live Mic Record"}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 rounded-2xl bg-white border-2 border-purple-300/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-black uppercase tracking-wider text-purple-900 block">
                          Speech Audio File Attachment
                        </span>
                        <p className="text-xs text-black/65">
                          {cloneFileName ? `Selected: ${cloneFileName}` : "Choose a clear speech clip of at least 30-60 seconds."}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setCloneFileName("dean_speech_60s_sample.wav");
                            try { soundSynth.play("confirm"); } catch {}
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FAF9F6] hover:bg-purple-100 text-purple-900 border border-purple-200 cursor-pointer transition-all"
                        >
                          Use Studio Sample File
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCloneFileName("counselor_ananya_audio_90s.wav");
                            try { soundSynth.play("confirm"); } catch {}
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FAF9F6] hover:bg-purple-100 text-purple-900 border border-purple-200 cursor-pointer transition-all"
                        >
                          Use Counselor Sample
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Speaker Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1A1A1A] block">
                        Voice Persona Name
                      </label>
                      <input
                        type="text"
                        value={cloneVoiceName}
                        onChange={(e) => setCloneVoiceName(e.target.value)}
                        placeholder="e.g. Dean Vikram Rao Voice"
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-black/[0.08] rounded-xl text-[#1A1A1A] font-semibold focus:outline-none focus:border-purple-600 shadow-2xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1A1A1A] block">
                        Speaker Gender
                      </label>
                      <select
                        value={cloneSpeakerGender}
                        onChange={(e) => setCloneSpeakerGender(e.target.value as "female" | "male")}
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-black/[0.08] rounded-xl text-[#1A1A1A] font-semibold focus:outline-none focus:border-purple-600 shadow-2xs cursor-pointer"
                      >
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1A1A1A] block">
                        Accent / Language Dialect
                      </label>
                      <input
                        type="text"
                        value={cloneSpeakerAccent}
                        onChange={(e) => setCloneSpeakerAccent(e.target.value)}
                        placeholder="e.g. Indian English (Warm & Reassuring)"
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-black/[0.08] rounded-xl text-[#1A1A1A] font-semibold focus:outline-none focus:border-purple-600 shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Quality Analysis Meter */}
                  {cloneFileName && (
                    <div className="p-4 rounded-2xl bg-white border border-emerald-300 space-y-2 shadow-2xs">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-black/70 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Acoustic Sample Quality Analysis:</span>
                        </span>
                        <span className="font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          98.6% High Fidelity (Low Noise Floor)
                        </span>
                      </div>
                      <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-[98.6%]" />
                      </div>
                      <span className="text-[10.5px] text-emerald-700 block font-medium">
                        ✓ Optimal pitch distribution, clean phoneme contours, zero room reverberation detected.
                      </span>
                    </div>
                  )}

                  {/* Test Sentence with Live Speech Synthesis */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#1A1A1A] block">
                        Test Sentence for Cloned Voice Model
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          try {
                            soundSynth.speak(cloneTestSentence, {
                              rate: 1.0,
                              pitch: cloneSpeakerGender === "female" ? 1.05 : 0.95,
                            });
                          } catch {}
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-extrabold text-purple-700 hover:text-purple-900 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-purple-700 stroke-none" />
                        <span>Synthesize &amp; Listen to Test Sentence</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={cloneTestSentence}
                      onChange={(e) => setCloneTestSentence(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-black/[0.08] rounded-xl text-[#1A1A1A] font-medium focus:outline-none focus:border-purple-600 shadow-2xs"
                    />
                  </div>

                  {/* Mandatory Consent Checkbox */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400/40 space-y-1.5">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cloneConsentConfirmed}
                        onChange={(e) => setCloneConsentConfirmed(e.target.checked)}
                        className="mt-0.5 rounded text-purple-700 focus:ring-purple-700 accent-purple-700 cursor-pointer"
                      />
                      <span className="text-xs text-[#1A1A1A] leading-relaxed">
                        <strong className="text-amber-950 font-black">Mandatory DPDP &amp; Voice Ethics Consent:</strong> I confirm and legally certify that explicit authorization has been secured from the individual whose voice is being cloned. Unauthorized impersonation is strictly prohibited under institutional acceptable use policies.
                      </span>
                    </label>
                  </div>

                  {/* Progress / Status Banner */}
                  {cloneStatus !== "idle" && (
                    <div className="p-4 rounded-2xl bg-purple-100/80 border border-purple-300 flex items-center justify-between text-xs text-purple-950">
                      <div className="flex items-center gap-2.5">
                        <Activity className="w-4 h-4 animate-spin text-purple-700" />
                        <span className="font-bold">
                          {cloneStatus === "uploading" && "Uploading encrypted high-fidelity audio packet..."}
                          {cloneStatus === "analyzing" && "Extracting phoneme vectors and neural embeddings..."}
                          {cloneStatus === "ready" && "Voice model synthesized and verified ready for preview!"}
                        </span>
                      </div>
                      {cloneStatus === "ready" && (
                        <button
                          type="button"
                          onClick={() => {
                            try {
                              soundSynth.speak(cloneTestSentence, {
                                rate: 1.0,
                                pitch: cloneSpeakerGender === "female" ? 1.05 : 0.95,
                              });
                            } catch {}
                          }}
                          className="font-black underline text-purple-900 cursor-pointer"
                        >
                          Play Synthesized Sample
                        </button>
                      )}
                    </div>
                  )}

                  {/* Action Controls */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      disabled={!cloneConsentConfirmed || !cloneFileName}
                      onClick={handleStartCloningProcess}
                      className="px-6 py-2.5 rounded-full text-xs font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 hover:brightness-110 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md hover:scale-102 active:scale-98"
                    >
                      {cloneStatus === "ready"
                        ? `Assign Cloned Voice to ${selectedAgent.name.split("—")[0].trim()}`
                        : "Analyze & Train Cloned Voice Model"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 4: LANGUAGES (12+ Indian Regional Languages with Native Scripts) */}
          {/* =================================================================== */}
          {activeTab === "languages" && (() => {
            const indianLanguages = [
              {
                code: "HI",
                lang: "Hindi",
                native: "हिन्दी",
                region: "North",
                desc: "North Indian standard, colloquial & Khari Boli Hindi",
                color: "from-amber-500 to-orange-500",
                border: "border-amber-300/80",
                bg: "bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40",
              },
              {
                code: "EN",
                lang: "Indian English",
                native: "English / Hinglish",
                region: "Pan-India",
                desc: "Corporate, educational & conversational Indian English",
                color: "from-blue-600 to-indigo-600",
                border: "border-blue-300/80",
                bg: "bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/40",
              },
              {
                code: "TE",
                lang: "Telugu",
                native: "తెలుగు",
                region: "South",
                desc: "Coastal Andhra, Rayalaseema & Telangana regional nuances",
                color: "from-emerald-500 to-teal-600",
                border: "border-emerald-300/80",
                bg: "bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40",
              },
              {
                code: "TA",
                lang: "Tamil",
                native: "தமிழ்",
                region: "South",
                desc: "Chennai, Kongu & Madurai standard Tamil Nadu dialects",
                color: "from-rose-500 to-pink-600",
                border: "border-rose-300/80",
                bg: "bg-gradient-to-br from-rose-50/70 via-white to-pink-50/40",
              },
              {
                code: "KN",
                lang: "Kannada",
                native: "ಕನ್ನಡ",
                region: "South",
                desc: "Bangalore, Mysuru & North Karnataka regional phrasing",
                color: "from-purple-500 to-violet-600",
                border: "border-purple-300/80",
                bg: "bg-gradient-to-br from-purple-50/70 via-white to-violet-50/40",
              },
              {
                code: "ML",
                lang: "Malayalam",
                native: "മലയാളം",
                region: "South",
                desc: "Kochi, Travancore & Malabar standard pronunciation",
                color: "from-teal-500 to-cyan-600",
                border: "border-teal-300/80",
                bg: "bg-gradient-to-br from-teal-50/70 via-white to-cyan-50/40",
              },
              {
                code: "MR",
                lang: "Marathi",
                native: "मराठी",
                region: "West",
                desc: "Mumbai, Pune & Vidarbha colloquial expressions",
                color: "from-orange-500 to-amber-600",
                border: "border-orange-300/80",
                bg: "bg-gradient-to-br from-orange-50/70 via-white to-amber-50/40",
              },
              {
                code: "BN",
                lang: "Bengali",
                native: "বাংলা",
                region: "East",
                desc: "Kolkata standard, Rarh & regional Bengali phrasing",
                color: "from-cyan-500 to-sky-600",
                border: "border-cyan-300/80",
                bg: "bg-gradient-to-br from-cyan-50/70 via-white to-sky-50/40",
              },
              {
                code: "GU",
                lang: "Gujarati",
                native: "ગુજરાતી",
                region: "West",
                desc: "Ahmedabad, Surat & Saurashtra business conversational dialects",
                color: "from-yellow-500 to-amber-600",
                border: "border-yellow-300/80",
                bg: "bg-gradient-to-br from-yellow-50/70 via-white to-amber-50/40",
              },
              {
                code: "PA",
                lang: "Punjabi",
                native: "ਪੰਜਾਬੀ",
                region: "North",
                desc: "Majhi, Doabi, Malwai & urban conversational Punjabi",
                color: "from-red-500 to-orange-600",
                border: "border-red-300/80",
                bg: "bg-gradient-to-br from-red-50/70 via-white to-orange-50/40",
              },
              {
                code: "OR",
                lang: "Odia",
                native: "ଓଡ଼ିଆ",
                region: "East",
                desc: "Coastal Odisha, Cuttack & Sambalpuri regional flow",
                color: "from-indigo-500 to-blue-600",
                border: "border-indigo-300/80",
                bg: "bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/40",
              },
              {
                code: "AS",
                lang: "Assamese",
                native: "অসমীয়া",
                region: "East",
                desc: "Guwahati & Brahmaputra valley polite conversational cadence",
                color: "from-lime-600 to-emerald-600",
                border: "border-lime-300/80",
                bg: "bg-gradient-to-br from-lime-50/70 via-white to-emerald-50/40",
              },
              {
                code: "UR",
                lang: "Urdu",
                native: "اردو",
                region: "North",
                desc: "Hyderabadi, Dakhni & Lucknowi refined conversational tone",
                color: "from-fuchsia-600 to-pink-600",
                border: "border-fuchsia-300/80",
                bg: "bg-gradient-to-br from-fuchsia-50/70 via-white to-pink-50/40",
              },
            ];

            const filteredLanguages = indianLanguages.filter((item) => {
              if (languageRegionFilter !== "all" && item.region !== languageRegionFilter) {
                return false;
              }
              return true;
            });

            return (
              <div className="space-y-6">
                {/* Header & Dialect Counters */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                      <Globe className="w-4 h-4 text-cyan-600" />
                      <span>Multilingual Code-Switching & Dialect Routing</span>
                    </h3>
                    <p className="text-xs text-black/60 mt-0.5">
                      Enable regional Indian languages with native script parsing. The voice engine automatically detects spoken language within 1 turn and responds fluently in the caller's dialect.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300 shadow-2xs">
                      {activeDialects.length} of {indianLanguages.length} Active Dialects
                    </span>
                  </div>
                </div>

                {/* Filter and Bulk Selection Bar */}
                <div className="flex items-center justify-between gap-3 flex-wrap bg-[#FAF8F5] p-2.5 rounded-2xl border border-black/[0.07]">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {[
                      { id: "all", label: "All 13 Languages" },
                      { id: "South", label: "South (TE, TA, KN, ML)" },
                      { id: "North", label: "North & Central (HI, PA, UR)" },
                      { id: "West", label: "West (MR, GU)" },
                      { id: "East", label: "East (BN, OR, AS)" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          try { soundSynth.play("click"); } catch {}
                          setLanguageRegionFilter(tab.id);
                        }}
                        className={`px-3 py-1 text-[11px] font-extrabold rounded-full transition-all cursor-pointer ${
                          languageRegionFilter === tab.id
                            ? "bg-[#18181B] text-white shadow-xs"
                            : "bg-white text-black/65 hover:text-black border border-black/[0.08]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[11px]">
                    <button
                      type="button"
                      onClick={() => {
                        try { soundSynth.play("click"); } catch {}
                        setActiveDialects(indianLanguages.map((l) => l.code));
                      }}
                      className="font-extrabold text-blue-700 hover:text-blue-900 underline cursor-pointer"
                    >
                      Enable All 13
                    </button>
                    <span className="text-black/20">•</span>
                    <button
                      type="button"
                      onClick={() => {
                        try { soundSynth.play("click"); } catch {}
                        setActiveDialects(["HI", "EN", "TE", "TA"]);
                      }}
                      className="font-extrabold text-black/60 hover:text-black underline cursor-pointer"
                    >
                      Reset Default (4)
                    </button>
                  </div>
                </div>

                {/* 12+ Indian Languages Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {filteredLanguages.map((item) => {
                    const isActive = activeDialects.includes(item.code);
                    return (
                      <div
                        key={item.code}
                        onClick={() => toggleDialect(item.code)}
                        className={`p-4 rounded-[22px] border-2 cursor-pointer transition-all duration-200 select-none ${
                          isActive
                            ? `${item.border} ${item.bg} shadow-xs scale-[1.01]`
                            : "border-black/[0.08] bg-white hover:border-black/20 hover:bg-[#FAF8F5]/60"
                        } flex items-center justify-between gap-3`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-black text-xs shadow-2xs shrink-0`}
                          >
                            {item.code}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-extrabold text-sm text-[#1A1A1A] tracking-tight">
                                {item.lang}
                              </span>
                              <span className="text-xs font-black text-black/75 px-2 py-0.5 rounded-lg bg-black/[0.05] border border-black/10 tracking-normal font-sans shadow-2xs">
                                {item.native}
                              </span>
                              {isActive && (
                                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
                                  Enabled
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-black/60 mt-0.5 truncate">{item.desc}</p>
                          </div>
                        </div>

                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => toggleDialect(item.code)}
                          className="w-4 h-4 rounded text-[#FF6B08] focus:ring-[#FF6B08] accent-[#FF6B08] cursor-pointer shrink-0"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Instant Mid-Call Code Switching Banner */}
                <div className="p-5 rounded-[22px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-purple-300/50 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                      <Radio className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#1A1A1A]">
                        Instant Mid-Call Code Switching (Polyglot Engine)
                      </h4>
                      <p className="text-[11px] text-black/65 mt-0.5">
                        Allow seamless bilingual switching (e.g. Hindi/Telugu to English and vice versa in the same breath) with sub-turn acoustic inflection matching across all 12+ enabled Indian languages.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={bilingualSwitching}
                    onChange={() => {
                      try { soundSynth.play("click"); } catch {}
                      setBilingualSwitching(!bilingualSwitching);
                    }}
                    className="w-4 h-4 rounded text-[#8B5CF6] focus:ring-[#8B5CF6] accent-[#8B5CF6] cursor-pointer shrink-0"
                  />
                </div>
              </div>
            );
          })()}

          {/* =================================================================== */}
          {/* TAB 5: KNOWLEDGE                                                    */}
          {/* =================================================================== */}
          {activeTab === "knowledge" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Connected Knowledge Collections (RAG)</span>
                  </h3>
                  <p className="text-xs text-black/60 mt-0.5">
                    Agent retrieves verified answers strictly from approved institutional documents.
                  </p>
                </div>
                <Link
                  href="/dashboard/knowledge"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200 transition-colors shadow-2xs"
                >
                  <span>Manage All Vector Stores</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Enterprise Pricing, Invoicing & SLA Terms 2026.xlsx",
                    chunks: 142,
                    category: "Pricing & Invoicing",
                    status: "Synchronized",
                    theme: "emerald",
                    iconBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
                    border: "border-emerald-300/80 bg-gradient-to-r from-emerald-50/60 via-white to-teal-50/40",
                  },
                  {
                    title: "Telephony Integration & PBX Carrier Runbook.pdf",
                    chunks: 218,
                    category: "Telephony Infrastructure",
                    status: "Synchronized",
                    theme: "rose",
                    iconBg: "bg-rose-100 text-rose-800 border-rose-300",
                    border: "border-rose-300/80 bg-gradient-to-r from-rose-50/60 via-white to-pink-50/40",
                  },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-[22px] border-2 ${doc.border} flex items-center justify-between gap-3 shadow-2xs transition-all hover:scale-[1.005]`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold border ${doc.iconBg} shadow-2xs shrink-0`}>
                        <FileText className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-[#1A1A1A]">{doc.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/[0.04] text-black/70">
                            {doc.category}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200">
                            {doc.chunks} semantic vector chunks
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10.5px] font-extrabold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300 shadow-2xs flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{doc.status}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => alert(`Unlinking ${doc.title} from agent.`)}
                        className="text-xs text-rose-600 hover:text-rose-800 font-bold px-3 py-1 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        Unlink
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grounding Strictness Slider Card */}
              <div className="p-5 rounded-[22px] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border-2 border-amber-300/60 space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#1A1A1A] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#FF6B08]" />
                    <span>Grounding Strictness: Strict (Recommended)</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold font-mono text-[11px] border border-amber-300">
                    Cosine Threshold: 0.82
                  </span>
                </div>
                <div className="w-full bg-black/10 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-[#FF6B08] h-full rounded-full w-[85%]" />
                </div>
                <span className="text-[11.5px] text-black/70 font-medium block">
                  Prevents speculative answers. When confidence drops below threshold, agent gracefully transfers to human admissions staff.
                </span>
              </div>
            </div>
          )}


          {/* =================================================================== */}
          {/* TAB 7: CALL RULES                                                   */}
          {/* =================================================================== */}
          {activeTab === "call-rules" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  <span>Telephony Rules & Human Counselor Escalation</span>
                </h3>
                <p className="text-xs text-black/60 mt-0.5">
                  Configure limits, office hours routing, inactivity reprompting, and escalation parameters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-[22px] border-2 border-amber-300/60 bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 space-y-2.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300">
                      <Clock className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <label className="text-xs font-extrabold text-[#1A1A1A] block">
                      Maximum Call Duration
                    </label>
                  </div>
                  <select className="w-full text-xs p-3 bg-white border-2 border-amber-300/60 rounded-xl text-[#1A1A1A] font-bold focus:outline-none focus:border-[#FF6B08] cursor-pointer shadow-2xs">
                    <option value="600">10 Minutes (Standard limit)</option>
                    <option value="900">15 Minutes (Extended inquiries)</option>
                    <option value="300">5 Minutes (Quick verification)</option>
                  </select>
                </div>

                <div className="p-5 rounded-[22px] border-2 border-cyan-300/60 bg-gradient-to-br from-cyan-50/60 via-white to-sky-50/40 space-y-2.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center border border-cyan-300">
                      <Mic className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <label className="text-xs font-extrabold text-[#1A1A1A] block">
                      Silence Detection Threshold
                    </label>
                  </div>
                  <select className="w-full text-xs p-3 bg-white border-2 border-cyan-300/60 rounded-xl text-[#1A1A1A] font-bold focus:outline-none focus:border-cyan-600 cursor-pointer shadow-2xs">
                    <option value="5">5 Seconds (Gentle reprompt)</option>
                    <option value="7">7 Seconds (Patient waiting)</option>
                  </select>
                </div>

                <div className="p-5 rounded-[22px] border-2 border-rose-300/60 bg-gradient-to-br from-rose-50/60 via-white to-pink-50/40 space-y-2.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center border border-rose-300">
                      <PhoneCall className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <label className="text-xs font-extrabold text-[#1A1A1A] block">
                      Escalation Destination (Warm Handoff)
                    </label>
                  </div>
                  <select className="w-full text-xs p-3 bg-white border-2 border-rose-300/60 rounded-xl text-[#1A1A1A] font-bold focus:outline-none focus:border-rose-600 cursor-pointer shadow-2xs">
                    <option value="counselor">Admissions Counselor Desk (+91 40 4590 1100)</option>
                    <option value="dean">Senior Registrar Office</option>
                  </select>
                </div>

                <div className="p-5 rounded-[22px] border-2 border-purple-300/60 bg-gradient-to-br from-purple-50/60 via-white to-violet-50/40 space-y-2.5 shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center border border-purple-300">
                      <Radio className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <label className="text-xs font-extrabold text-[#1A1A1A] block">
                      Voicemail Detection
                    </label>
                  </div>
                  <select className="w-full text-xs p-3 bg-white border-2 border-purple-300/60 rounded-xl text-[#1A1A1A] font-bold focus:outline-none focus:border-purple-600 cursor-pointer shadow-2xs">
                    <option value="hangup">Hangup immediately without consuming talk-time</option>
                    <option value="leave_msg">Leave friendly standard message</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 8: TEST PLAYGROUND                                              */}
          {/* =================================================================== */}
          {activeTab === "playground" && (
            <div className="space-y-6">
              {/* Training Saved Success Notification */}
              {trainingSuccessNotice && (
                <div className="p-4 rounded-[22px] bg-gradient-to-r from-emerald-50 via-white to-teal-50 border-2 border-emerald-400 text-emerald-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md animate-in fade-in duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                      <BookmarkCheck className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <strong className="text-xs font-black block text-emerald-900">Training Session Recorded in History!</strong>
                      <span className="text-[11px] text-emerald-800 font-medium">{trainingSuccessNotice}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("history")}
                    className="text-xs font-black px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer shrink-0 transition-all hover:scale-105 active:scale-95"
                  >
                    View in History →
                  </button>
                </div>
              )}

              {/* Dual Calling Direction Selector Bar */}
              <div className="p-4 sm:p-5 rounded-[24px] bg-gradient-to-r from-slate-50 via-white to-amber-50/40 border-2 border-black/[0.08] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#FF6B08] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Bi-Directional Telephony Simulator</span>
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#1A1A1A] mt-0.5">
                      Choose Calling Direction to Test
                    </h3>
                    <p className="text-xs text-black/60 mt-0.5">
                      Test both scenarios: incoming callers reaching your agent or autonomous agent outbound campaigns.
                    </p>
                  </div>

                  {/* Actions: Start New Training */}
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                      type="button"
                      onClick={handleStartNewTraining}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:brightness-110 text-white text-xs font-extrabold shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Start New Training</span>
                    </button>
                  </div>
                </div>

                {/* Two Selectable Direction Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Option 1: Inbound (Someone calls Agent) */}
                  <button
                    type="button"
                    onClick={() => handleSwitchSimMode("inbound")}
                    className={`p-4 rounded-[20px] text-left transition-all cursor-pointer border-2 flex flex-col justify-between gap-2.5 ${
                      callSimulationMode === "inbound"
                        ? "bg-gradient-to-br from-cyan-50/80 via-white to-indigo-50/40 border-cyan-400 shadow-md ring-2 ring-cyan-500/20"
                        : "bg-white/80 border-black/[0.08] hover:border-cyan-300 hover:bg-cyan-50/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          callSimulationMode === "inbound"
                            ? "bg-cyan-600 text-white shadow-xs"
                            : "bg-cyan-100 text-cyan-800"
                        }`}>
                          <PhoneIncoming className="w-4 h-4 stroke-[2.3]" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-[#1A1A1A]">
                            1. Someone Calls Agent (Inbound)
                          </div>
                          <div className="text-[10.5px] text-black/55 font-medium">
                            Prospective student/parent dials your DID line
                          </div>
                        </div>
                      </div>
                      {callSimulationMode === "inbound" && (
                        <span className="px-2 py-0.5 rounded-full bg-cyan-600 text-white text-[10px] font-black uppercase tracking-wider">
                          Active Mode
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-black/65 leading-relaxed">
                      Tests caller-initiated questions, RAG knowledge accuracy (tuition, hostels), multilingual Telugu/Hindi code-switching, and counselor transfer.
                    </p>
                  </button>

                  {/* Option 2: Outbound (Agent calls Someone) */}
                  <button
                    type="button"
                    onClick={() => handleSwitchSimMode("outbound")}
                    className={`p-4 rounded-[20px] text-left transition-all cursor-pointer border-2 flex flex-col justify-between gap-2.5 ${
                      callSimulationMode === "outbound"
                        ? "bg-gradient-to-br from-amber-50/80 via-white to-rose-50/40 border-[#FF6B08] shadow-md ring-2 ring-[#FF6B08]/20"
                        : "bg-white/80 border-black/[0.08] hover:border-amber-300 hover:bg-amber-50/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          callSimulationMode === "outbound"
                            ? "bg-[#FF6B08] text-white shadow-xs"
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          <PhoneOutgoing className="w-4 h-4 stroke-[2.3]" />
                        </div>
                        <div>
                          <div className="text-xs font-black text-[#1A1A1A]">
                            2. Agent Calls Someone (Outbound)
                          </div>
                          <div className="text-[10.5px] text-black/55 font-medium">
                            Autonomous campaign dialer reaches leads
                          </div>
                        </div>
                      </div>
                      {callSimulationMode === "outbound" && (
                        <span className="px-2 py-0.5 rounded-full bg-[#FF6B08] text-white text-[10px] font-black uppercase tracking-wider">
                          Active Mode
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-black/65 leading-relaxed">
                      Tests proactive intro pitch, qualifying prospective leads, handling &apos;I am busy / call later&apos; objections, and booking campus tours.
                    </p>
                  </button>
                </div>
              </div>

              {/* Status Context Banner */}
              <div className={`p-4 rounded-[22px] border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
                callSimulationMode === "inbound"
                  ? "bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-blue-500/10 border-cyan-300/70"
                  : "bg-gradient-to-r from-amber-500/12 via-orange-500/10 to-rose-500/12 border-[#FF6B08]/40"
              }`}>
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full animate-pulse shadow-xs ${
                    callSimulationMode === "inbound" ? "bg-cyan-500 shadow-cyan-500/60" : "bg-[#FF6B08] shadow-[#FF6B08]/60"
                  }`} />
                  <span className="text-xs font-extrabold text-[#1A1A1A] tracking-tight">
                    {callSimulationMode === "inbound" ? (
                      <>INBOUND SIP CALL SIMULATION — Caller dialed (+91 40 4590 1000) Telephony Desk</>
                    ) : (
                      <>OUTBOUND CAMPAIGN SIMULATION — Agent dialing lead (+91 98401 22345)</>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10.5px] font-extrabold text-black/70 bg-white/95 px-3 py-1 rounded-full border border-black/10 shadow-2xs">
                    Direction: {callSimulationMode === "inbound" ? "Inbound (Caller → Agent)" : "Outbound (Agent → Contact)"}
                  </span>
                  <span className="text-[10.5px] font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs">
                    Zero Trunk Billed
                  </span>
                </div>
              </div>

              {/* Dual-Pane Playground */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Interactive Conversation Stream */}
                <div className="lg:col-span-2 border-2 border-black/[0.08] rounded-[26px] overflow-hidden bg-white flex flex-col h-[580px] shadow-sm">
                  {/* Playground Header */}
                  <div className="px-5 py-3.5 bg-gradient-to-r from-slate-50 via-white to-amber-50/30 border-b border-black/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg text-white flex items-center justify-center shadow-2xs ${
                        callSimulationMode === "inbound" ? "bg-cyan-600" : "bg-[#FF6B08]"
                      }`}>
                        {callSimulationMode === "inbound" ? (
                          <PhoneIncoming className="w-3.5 h-3.5 stroke-[2.3]" />
                        ) : (
                          <PhoneOutgoing className="w-3.5 h-3.5 stroke-[2.3]" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-[#1A1A1A] block">
                          {callSimulationMode === "inbound"
                            ? "Inbound Call Transcript Stream"
                            : "Outbound Campaign Call Stream"}
                        </span>
                        <span className="text-[10px] text-black/50 font-bold block">
                          {callSimulationMode === "inbound"
                            ? "Caller initiates • Agent retrieves RAG context"
                            : "Agent initiates first • Contact responds"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleStartNewTraining}
                        className="text-xs font-extrabold text-white flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:brightness-110 shadow-xs transition-all cursor-pointer hover:scale-102 active:scale-98"
                      >
                        <Sparkles className="w-3.5 h-3.5 stroke-[2.3]" />
                        <span>Start New Training</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleOpenPhoneTestModal}
                        className="text-xs font-extrabold text-white flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF6B08] via-amber-500 to-[#E11D48] hover:brightness-110 shadow-sm transition-all cursor-pointer hover:scale-102 active:scale-98"
                      >
                        <PhoneCall className="w-3.5 h-3.5 stroke-[2.3]" />
                        <span>Launch Audio Call</span>
                      </button>
                    </div>
                  </div>

                  {/* Transcript Scroll Area */}
                  <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#FAF9F6]/40">
                    {simTurns.map((turn) => {
                      const isAgent = turn.speaker === "agent";
                      return (
                        <div
                          key={turn.id}
                          className={`flex flex-col ${isAgent ? "items-start" : "items-end"}`}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5 px-1 text-[10.5px] text-black/55">
                            <span className="font-extrabold text-[#1A1A1A]">
                              {isAgent
                                ? `${selectedAgent.name.split("—")[0].trim()} (${callSimulationMode === "inbound" ? "Inbound Agent" : "Outbound Persona"})`
                                : callSimulationMode === "inbound"
                                ? "Caller (You • +91 98401 22345)"
                                : "Prospective Lead (+91 98401 22345)"}
                            </span>
                            <span>•</span>
                            <span>{turn.time}</span>
                          </div>

                          <div
                            className={`p-4 rounded-2xl max-w-md text-xs leading-relaxed relative ${
                              isAgent
                                ? "bg-gradient-to-br from-[#FFFDF9] via-white to-[#FFF4ED] border-2 border-amber-300/70 text-[#1A1A1A] rounded-tl-none shadow-xs"
                                : "bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white rounded-tr-none shadow-md"
                            }`}
                          >
                            <p>{turn.text}</p>
                            {isAgent && (
                              <button
                                type="button"
                                onClick={() => {
                                  try { soundSynth.play("affirm"); } catch {}
                                  setSimPlayingTurnId(turn.id);
                                  setTimeout(() => setSimPlayingTurnId(null), 2500);
                                }}
                                className="mt-2.5 inline-flex items-center gap-1.5 text-[10.5px] font-extrabold text-[#FF6B08] hover:text-[#E11D48] transition-colors cursor-pointer"
                              >
                                {simPlayingTurnId === turn.id ? (
                                  <>
                                    <Pause className="w-3.5 h-3.5 fill-[#FF6B08]" />
                                    <span>Playing Voice Turn...</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-3.5 h-3.5 fill-[#FF6B08]" />
                                    <span>Listen Neural Voice</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* One-Click Quick Test Prompt Chips */}
                  <div className="px-4 py-2.5 bg-slate-50/90 border-t border-black/[0.06] flex items-center gap-1.5 overflow-x-auto text-nowrap">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-black/50 shrink-0 mr-1">
                      Quick Test Chips:
                    </span>
                    {callSimulationMode === "inbound" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSendSimMessage(undefined, "What is the hostel fee and accommodation options?")}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white hover:bg-cyan-50 border border-black/10 hover:border-cyan-400 text-black/80 hover:text-cyan-900 shadow-2xs transition-all cursor-pointer"
                        >
                          Hostel &amp; Stay Details
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendSimMessage(undefined, "Can I speak in Telugu? (Language Switch test)")}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white hover:bg-cyan-50 border border-black/10 hover:border-cyan-400 text-black/80 hover:text-cyan-900 shadow-2xs transition-all cursor-pointer"
                        >
                          తెలుగు Switch Test
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendSimMessage(undefined, "Please transfer me to a human admissions counselor")}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white hover:bg-rose-50 border border-black/10 hover:border-rose-400 text-black/80 hover:text-rose-900 shadow-2xs transition-all cursor-pointer"
                        >
                          Human Counselor Escalation
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSendSimMessage(undefined, "I am driving right now, can you call me tomorrow at 4 PM?")}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white hover:bg-amber-50 border border-black/10 hover:border-amber-400 text-black/80 hover:text-amber-900 shadow-2xs transition-all cursor-pointer"
                        >
                          I&apos;m Busy (Schedule Callback)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendSimMessage(undefined, "Can you send the complete fee breakdown on WhatsApp?")}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 border border-black/10 hover:border-emerald-400 text-black/80 hover:text-emerald-900 shadow-2xs transition-all cursor-pointer"
                        >
                          Send WhatsApp Brochure
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendSimMessage(undefined, "Not interested, please remove my phone number.")}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white hover:bg-rose-50 border border-black/10 hover:border-rose-400 text-black/80 hover:text-rose-900 shadow-2xs transition-all cursor-pointer"
                        >
                          Not Interested (DNC Opt-Out)
                        </button>
                      </>
                    )}
                  </div>

                  {/* Message Input Bar */}
                  <form onSubmit={handleSendSimMessage} className="p-3.5 border-t border-black/[0.08] bg-white flex items-center gap-2.5">
                    <input
                      type="text"
                      placeholder={
                        callSimulationMode === "inbound"
                          ? "Type a caller question e.g. 'hostel fees?', 'scholarships?', or custom query..."
                          : "Simulate lead response e.g. 'I am busy call later', 'what are the fees?'..."
                      }
                      value={simInput}
                      onChange={(e) => setSimInput(e.target.value)}
                      className="flex-1 text-xs px-4 py-2.5 bg-[#FAF8F3] border-2 border-black/[0.08] focus:border-[#FF6B08] rounded-full text-[#1A1A1A] font-medium focus:outline-none focus:bg-white shadow-2xs"
                    />
                    <button
                      type="submit"
                      className="p-2.5 rounded-full bg-gradient-to-r from-[#FF6B08] to-[#E11D48] hover:brightness-110 text-white transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
                    >
                      <Send className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </form>
                </div>

                {/* Right 1 Col: Dynamic Extracted Variables & Telemetry */}
                <div className="border-2 border-black/[0.08] rounded-[26px] p-5 bg-white space-y-5 h-[580px] overflow-y-auto shadow-sm">
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                      <Activity className={`w-4 h-4 ${callSimulationMode === "inbound" ? "text-cyan-600" : "text-[#FF6B08]"}`} />
                      <span>{callSimulationMode === "inbound" ? "Inbound Telemetry" : "Outbound Telemetry"}</span>
                    </h3>
                    <p className="text-[11px] text-black/60 mt-0.5">
                      {callSimulationMode === "inbound"
                        ? "Real-time acoustic turn latency & semantic RAG resolution."
                        : "Campaign attribution, objection handling & appointment conversion."}
                    </p>
                  </div>

                  {/* Mode-Specific Telemetry Cards */}
                  <div className="space-y-3">
                    {callSimulationMode === "inbound" ? (
                      <>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-blue-50 border-2 border-cyan-300/70 shadow-2xs">
                          <span className="text-[10px] font-extrabold text-cyan-800 uppercase block">First-Byte Turn Latency</span>
                          <span className="text-2xl font-black text-cyan-900 block mt-0.5">136 ms</span>
                          <span className="text-[10.5px] text-cyan-700 font-bold">Ultra-Low SLA Verified</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-300/70 shadow-2xs">
                          <span className="text-[10px] font-extrabold text-emerald-800 uppercase block">Caller Sentiment</span>
                          <span className="text-2xl font-black text-emerald-700 block mt-0.5">94% Positive</span>
                          <span className="text-[10.5px] text-emerald-600 font-bold">High Intent &amp; Confidence</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-2 border-purple-300/70 shadow-2xs">
                          <span className="text-[10px] font-extrabold text-purple-800 uppercase block">Call Resolution</span>
                          <span className="text-xs font-extrabold text-purple-900 block mt-1">Direct RAG Knowledge Resolved</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-300/70 shadow-2xs">
                          <span className="text-[10px] font-extrabold text-amber-800 uppercase block">Dialer Connect Time (AMD)</span>
                          <span className="text-2xl font-black text-[#FF6B08] block mt-0.5">0.82 s</span>
                          <span className="text-[10.5px] text-amber-700 font-bold">Human Answer Detected</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-300/70 shadow-2xs">
                          <span className="text-[10px] font-extrabold text-emerald-800 uppercase block">Contact Disposition</span>
                          <span className="text-2xl font-black text-emerald-700 block mt-0.5">Hot Lead (Engaged)</span>
                          <span className="text-[10.5px] text-emerald-600 font-bold">Ready for Demo</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-2 border-purple-300/70 shadow-2xs">
                          <span className="text-[10px] font-extrabold text-purple-800 uppercase block">Campaign Attribution</span>
                          <span className="text-xs font-extrabold text-purple-900 block mt-1">Enterprise Telephony Outreach</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mode-Specific Extracted Dossier */}
                  <div className="pt-2 border-t border-black/[0.06] space-y-2.5">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#1A1A1A] block">
                      {callSimulationMode === "inbound" ? "Inbound Extracted Fields" : "Outbound Lead Sync Data"}
                    </span>
                    <div className="text-xs space-y-2">
                      {callSimulationMode === "inbound" ? (
                        <>
                          <div className="flex justify-between items-center py-1.5 border-b border-black/[0.04]">
                            <span className="text-black/60">Service Tier:</span>
                            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 font-bold text-[11px]">Enterprise SIP Trunking</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-black/[0.04]">
                            <span className="text-black/60">Concurrency:</span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[11px]">48 Active Channels</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-black/[0.04]">
                            <span className="text-black/60">Integration:</span>
                            <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 font-bold text-[11px]">Salesforce &amp; Asterisk PBX</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5">
                            <span className="text-black/60">Follow-up:</span>
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[11px]">Technical Demo Reserved</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex justify-between items-center py-1.5 border-b border-black/[0.04]">
                            <span className="text-black/60">Lead Name:</span>
                            <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900 font-bold text-[11px]">Prospective Client</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-black/[0.04]">
                            <span className="text-black/60">Contact Number:</span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold text-[11px]">+91 98401 22345</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5 border-b border-black/[0.04]">
                            <span className="text-black/60">WhatsApp Follow-up:</span>
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-bold text-[11px]">Overview Dispatched</span>
                          </div>
                          <div className="flex justify-between items-center py-1.5">
                            <span className="text-black/60">CRM Status:</span>
                            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[11px]">Meeting Scheduled</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 9: HISTORY & CONVERSATION TRAINING LEDGER                       */}
          {/* =================================================================== */}
          {activeTab === "history" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                    <HistoryIcon className="w-4 h-4 text-purple-600" />
                    <span>AI Agent Conversation History &amp; Training Ledger</span>
                  </h3>
                  <p className="text-xs text-black/60 mt-0.5">
                    Immutable audit record of all incoming caller inquiries and outbound automated campaign calls. Every simulated or live conversation is preserved here.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      setActiveTab("playground");
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:brightness-110 text-white shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Start New Training</span>
                  </button>
                  <span className="text-xs font-extrabold bg-purple-100 text-purple-900 border border-purple-200 px-3 py-1.5 rounded-full shadow-2xs">
                    {conversationHistory.length} Sessions Saved
                  </span>
                </div>
              </div>

              {/* History Telemetry Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                <div className="p-4 rounded-[20px] bg-gradient-to-br from-purple-50 via-white to-indigo-50 border-2 border-purple-200/70 shadow-2xs">
                  <span className="text-[10px] font-extrabold text-purple-800 uppercase block">Total Saved Dialogues</span>
                  <span className="text-2xl font-black text-purple-950 block mt-0.5">{conversationHistory.length} Sessions</span>
                  <span className="text-[10.5px] text-purple-700 font-bold">Neural Memory Indexed</span>
                </div>

                <div className="p-4 rounded-[20px] bg-gradient-to-br from-cyan-50 via-white to-blue-50 border-2 border-cyan-200/70 shadow-2xs">
                  <span className="text-[10px] font-extrabold text-cyan-800 uppercase block">Inbound Calls</span>
                  <span className="text-2xl font-black text-cyan-950 block mt-0.5">
                    {conversationHistory.filter((c) => c.direction === "inbound").length} Calls
                  </span>
                  <span className="text-[10.5px] text-cyan-700 font-bold">Caller Inquiries &amp; RAG</span>
                </div>

                <div className="p-4 rounded-[20px] bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-200/70 shadow-2xs">
                  <span className="text-[10px] font-extrabold text-amber-800 uppercase block">Outbound Dialed</span>
                  <span className="text-2xl font-black text-[#FF6B08] block mt-0.5">
                    {conversationHistory.filter((c) => c.direction === "outbound").length} Sessions
                  </span>
                  <span className="text-[10.5px] text-amber-700 font-bold">Lead Qualification Pushed</span>
                </div>

                <div className="p-4 rounded-[20px] bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-200/70 shadow-2xs">
                  <span className="text-[10px] font-extrabold text-emerald-800 uppercase block">Knowledge SLA</span>
                  <span className="text-2xl font-black text-emerald-900 block mt-0.5">98.6%</span>
                  <span className="text-[10.5px] text-emerald-700 font-bold">High Intent Accuracy</span>
                </div>
              </div>

              {/* Segmented Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: "all", label: `All Conversations (${conversationHistory.length})` },
                  { id: "inbound", label: `Inbound Calls (${conversationHistory.filter((c) => c.direction === "inbound").length})` },
                  { id: "outbound", label: `Outbound Campaigns (${conversationHistory.filter((c) => c.direction === "outbound").length})` },
                  { id: "audit", label: "Config Revision Ledger (4)" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      setHistoryFilter(f.id as any);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                      historyFilter === f.id
                        ? "bg-[#18181B] text-white border-[#18181B] shadow-xs"
                        : "bg-white hover:bg-[#FAF8F3] text-black/65 hover:text-black border-black/[0.08] shadow-2xs"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Filter: Config Revision Ledger */}
              {historyFilter === "audit" ? (
                <div className="space-y-3">
                  {[
                    {
                      version: "v3.4 (Current Production)",
                      author: "Govinda T.",
                      date: "2 days ago",
                      changes: "Configured sub-140ms acoustic model and Telugu auto-code switching.",
                      isCurrent: true,
                    },
                    {
                      version: "v3.3",
                      author: "Govinda T.",
                      date: "Oct 12, 2026",
                      changes: "Connected new 2026 Enterprise Telephony SLA and carrier pricing vector collection.",
                      isCurrent: false,
                    },
                    {
                      version: "v3.2",
                      author: "System Admin",
                      date: "Oct 05, 2026",
                      changes: "Adjusted silence threshold to 4 seconds and added warm operator transfer trigger.",
                      isCurrent: false,
                    },
                    {
                      version: "v3.1",
                      author: "System Admin",
                      date: "Sep 28, 2026",
                      changes: "Initial provision of Voice Agent on primary SIP DID +91 40 4590 1199.",
                      isCurrent: false,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-[24px] border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs transition-all ${
                        item.isCurrent
                          ? "bg-gradient-to-r from-emerald-500/12 via-teal-500/8 to-white border-emerald-400/60 shadow-xs"
                          : "bg-white border-black/[0.07] hover:border-black/20"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-xs font-black text-[#1A1A1A]">{item.version}</strong>
                          {item.isCurrent && (
                            <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-3 py-0.5 rounded-full border border-emerald-300 shadow-2xs">
                              Active Production Line
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-black/65 mt-1 font-medium">{item.changes}</p>
                        <span className="text-[10.5px] text-black/45 mt-1 block">
                          Published by <strong className="text-black/70">{item.author}</strong> • {item.date}
                        </span>
                      </div>

                      {!item.isCurrent && (
                        <button
                          type="button"
                          onClick={() => alert(`Reverting to ${item.version}...`)}
                          className="px-4 py-2 rounded-full text-xs font-bold border-2 border-black/[0.08] hover:border-black/20 bg-white hover:bg-[#FAF8F3] text-[#1A1A1A] transition-all cursor-pointer shrink-0 shadow-2xs"
                        >
                          Revert to this version
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Stored Conversation Sessions List */
                <div className="space-y-3.5">
                  {conversationHistory
                    .filter((conv) => {
                      if (historyFilter === "inbound") return conv.direction === "inbound";
                      if (historyFilter === "outbound") return conv.direction === "outbound";
                      return true;
                    })
                    .map((conv) => {
                      const isExpanded = expandedConvId === conv.id;
                      const isInbound = conv.direction === "inbound";

                      return (
                        <div
                          key={conv.id}
                          className={`rounded-[24px] border-2 transition-all shadow-xs overflow-hidden ${
                            isInbound
                              ? "bg-gradient-to-br from-cyan-50/25 via-white to-blue-50/15 border-cyan-200/90 hover:border-cyan-400"
                              : "bg-gradient-to-br from-amber-50/25 via-white to-orange-50/15 border-amber-200/90 hover:border-[#FF6B08]"
                          }`}
                        >
                          {/* Main Row Summary */}
                          <div className="p-4 sm:p-5 flex flex-col gap-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                              <div className="flex items-center gap-2.5 flex-wrap">
                                {isInbound ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 border border-cyan-300 font-extrabold text-[10.5px] shadow-2xs">
                                    <PhoneIncoming className="w-3.5 h-3.5 text-cyan-700 stroke-[2.3]" />
                                    <span>Inbound Call (Caller dialed Agent)</span>
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10.5px] shadow-2xs">
                                    <PhoneOutgoing className="w-3.5 h-3.5 text-[#FF6B08] stroke-[2.3]" />
                                    <span>Outbound Call (Agent dialed Contact)</span>
                                  </span>
                                )}

                                <strong className="text-xs font-black text-[#1A1A1A]">
                                  {conv.contactName}
                                </strong>
                                <span className="text-[11px] font-mono text-black/55">
                                  {conv.contactNumber}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 text-[11px]">
                                <span className="font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                                  {conv.sentimentScore} Positive
                                </span>
                                <span className="text-black/50 font-medium">•</span>
                                <span className="text-black/55 font-bold">{conv.timestamp}</span>
                              </div>
                            </div>

                            {/* Training Outcome & Topic Badges */}
                            <div>
                              <p className="text-xs font-bold text-[#1A1A1A] leading-relaxed">
                                {conv.trainingOutcome}
                              </p>
                              <div className="flex items-center gap-1.5 flex-wrap mt-2">
                                {conv.topics.map((t, tidx) => (
                                  <span
                                    key={tidx}
                                    className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-white text-black/75 border border-black/10 shadow-2xs"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Actions & Metrics Row */}
                            <div className="pt-2 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                              <div className="flex items-center gap-2 text-[11px] text-black/60 font-medium">
                                <span className="font-bold text-[#1A1A1A]">{conv.turnsCount} Dialog Turns</span>
                                <span>•</span>
                                <span>Duration: {conv.durationFormatted}</span>
                                <span>•</span>
                                <span>Persona: <strong className="text-purple-700 font-bold">{conv.agentName}</strong></span>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => setExpandedConvId(isExpanded ? null : conv.id)}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 border border-black/15 text-[#1A1A1A] shadow-2xs transition-colors cursor-pointer"
                                >
                                  {isExpanded ? (
                                    <>
                                      <ChevronUp className="w-3.5 h-3.5" />
                                      <span>Hide Transcript</span>
                                    </>
                                  ) : (
                                    <>
                                      <ChevronDown className="w-3.5 h-3.5" />
                                      <span>View Full Transcript ({conv.turns.length} turns)</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleLoadConversationIntoPlayground(conv)}
                                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-[#FF6B08] to-[#E11D48] text-white shadow-xs hover:brightness-110 transition-all cursor-pointer hover:scale-102 active:scale-98"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Load in Playground &amp; Re-Train</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Expandable Turn-by-Turn Speech Transcript */}
                          {isExpanded && (
                            <div className="p-5 border-t border-black/[0.08] bg-[#FAF9F6]/80 space-y-3.5 animate-in fade-in duration-200">
                              <div className="flex items-center justify-between text-[11px] font-extrabold text-black/60 pb-1 border-b border-black/[0.06]">
                                <span>Turn-by-Turn Dialog Sequence</span>
                                <span className="text-purple-800 font-mono">Session ID: {conv.id}</span>
                              </div>

                              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                                {conv.turns.map((turn, tidx) => {
                                  const isAgent = turn.speaker === "agent";
                                  return (
                                    <div
                                      key={tidx}
                                      className={`flex flex-col ${isAgent ? "items-start" : "items-end"}`}
                                    >
                                      <div className="flex items-center gap-1.5 mb-1 px-1 text-[10.5px] text-black/55">
                                        <span className="font-extrabold text-[#1A1A1A]">
                                          {isAgent ? `${conv.agentName} (Voice Agent)` : `${conv.contactName}`}
                                        </span>
                                        <span>•</span>
                                        <span>{turn.time}</span>
                                      </div>

                                      <div
                                        className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed relative ${
                                          isAgent
                                            ? "bg-white border-2 border-amber-300/70 text-[#1A1A1A] rounded-tl-none shadow-2xs"
                                            : "bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-tr-none shadow-xs"
                                        }`}
                                      >
                                        <p>{turn.text}</p>
                                        {isAgent && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              try { soundSynth.play("affirm"); } catch {}
                                              setSimPlayingTurnId(turn.id);
                                              setTimeout(() => setSimPlayingTurnId(null), 2500);
                                            }}
                                            className="mt-2 inline-flex items-center gap-1.5 text-[10.5px] font-extrabold text-[#FF6B08] hover:text-[#E11D48] transition-colors cursor-pointer"
                                          >
                                            {simPlayingTurnId === turn.id ? (
                                              <>
                                                <Pause className="w-3.5 h-3.5 fill-[#FF6B08]" />
                                                <span>Playing Voice Turn...</span>
                                              </>
                                            ) : (
                                              <>
                                                <Play className="w-3.5 h-3.5 fill-[#FF6B08]" />
                                                <span>Listen Voice Playback</span>
                                              </>
                                            )}
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      )}

      {/* ======================================================================= */}
      {/* PUBLISH CONFIRMATION MODAL                                              */}
      {/* ======================================================================= */}
      {publishModalOpen && selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-100">
          <div className="relative w-full max-w-md bg-white rounded-[28px] border border-black/[0.08] shadow-2xl overflow-hidden text-xs text-[#1A1A1A] p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD9A0]/50 text-[#8C4A00] flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-[#8C4A00]" />
            </div>

            <div>
              <h3 className="text-base font-bold text-[#1A1A1A]">
                Confirm Publishing to Production Telephony?
              </h3>
              <p className="text-xs text-black/60 mt-1.5 leading-relaxed">
                You are about to publish configuration updates to <strong>{selectedAgent.name}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.05] space-y-2 text-[11px] text-black/60">
              <div className="flex justify-between">
                <span>Assigned Phone Trunk:</span>
                <strong className="text-[#1A1A1A]">{selectedAgent.assignedNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span>Selected Voice:</span>
                <strong className="text-[#1A1A1A]">{selectedAgent.voice.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Deployment Scope:</span>
                <strong className="text-[#0D593F]">Immediate Live Inbound Routing</strong>
              </div>
            </div>

            <p className="text-[11px] text-[#8C4A00] leading-snug">
              Live inbound callers dialling this DID will immediately interact with the updated prompt instructions and acoustic model.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setPublishModalOpen(false)}
                className="rounded-full px-4 py-2 text-xs font-semibold text-black/60 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePublishAgent}
                className="rounded-full px-5 py-2.5 text-xs font-semibold bg-[#111111] hover:bg-black text-white shadow-xs transition-colors cursor-pointer"
              >
                Confirm &amp; Publish Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Other Modals */}
      <CreateAgentModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <LiveCallModal
        isOpen={liveModalOpen}
        onClose={() => setLiveModalOpen(false)}
        call={testCallItem}
      />

      {/* ======================================================================= */}
      {/* PRACTICAL REAL-PHONE TEST CALL MODAL                                    */}
      {/* ======================================================================= */}
      {phoneTestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-[28px] border-2 border-black/[0.1] shadow-2xl overflow-hidden text-xs text-[#1A1A1A]">
            {/* Modal Header */}
            <div className="p-5 border-b border-black/[0.08] bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-rose-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B08] to-[#E11D48] text-white flex items-center justify-center shadow-md">
                  <PhoneCall className="w-5 h-5 stroke-[2.3]" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#1A1A1A] flex items-center gap-2">
                    <span>Practical Real-Phone Call Test</span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Live Telecom
                    </span>
                  </h3>
                  <p className="text-[11px] text-black/60 mt-0.5">
                    Test the exact conversation script below with {selectedAgent ? selectedAgent.name.split("—")[0].trim() : "your agent"} on your physical mobile handset.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPhoneTestModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-black/60 hover:text-black flex items-center justify-center border border-black/10 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {callConnectState === "idle" ? (
                <>
                  {/* Mode & Persona Summary */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-black/[0.08] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="text-xs font-black text-[#1A1A1A] block">
                          Persona: {selectedAgent ? selectedAgent.name : "Voice Agent"}
                        </strong>
                        <span className="text-[11px] text-black/60">
                          Mode: {callSimulationMode === "inbound" ? "Inbound Routing (Caller dials Agent)" : "Outbound Campaign (Agent dials You)"}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white text-[#FF6B08] border border-[#FF6B08]/30 font-black text-[10.5px] shadow-2xs">
                      {simTurns.length} Scripted Turns
                    </span>
                  </div>

                  {/* Conversation Starter Preview */}
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-50 to-amber-50/30 border border-black/[0.07] space-y-1.5">
                    <div className="flex items-center justify-between text-[10.5px] text-black/55 font-bold uppercase tracking-wider">
                      <span>First Turn Opening Hook</span>
                      <span className="text-[#FF6B08]">Live Speech Ready</span>
                    </div>
                    <p className="text-xs text-black/80 font-medium italic">
                      &ldquo;{simTurns[0]?.text}&rdquo;
                    </p>
                  </div>

                  {/* Phone Number Input Form */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-black text-[#1A1A1A] block flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-[#FF6B08]" />
                        <span>Enter Your Real Physical Phone Number</span>
                      </span>
                      <span className="text-[10.5px] text-emerald-700 font-bold">Free Practice Trunk</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <select
                        value={phoneCountryCode}
                        onChange={(e) => setPhoneCountryCode(e.target.value)}
                        className="text-xs font-bold py-3 px-3 bg-[#FAF8F3] border-2 border-black/[0.1] rounded-2xl text-[#1A1A1A] focus:outline-none focus:border-[#FF6B08] cursor-pointer"
                      >
                        <option value="+91">🇮🇳 +91 (India)</option>
                        <option value="+1">🇺🇸 +1 (USA)</option>
                        <option value="+44">🇬🇧 +44 (UK)</option>
                        <option value="+971">🇦🇪 +971 (UAE)</option>
                        <option value="+65">🇸🇬 +65 (SG)</option>
                        <option value="+61">🇦🇺 +61 (AUS)</option>
                      </select>

                      <input
                        type="tel"
                        value={phoneInputNumber}
                        onChange={(e) => setPhoneInputNumber(e.target.value)}
                        placeholder="e.g. 98401 22345"
                        className="flex-1 text-xs font-bold py-3 px-4 bg-[#FAF8F3] border-2 border-black/[0.1] focus:border-[#FF6B08] rounded-2xl text-[#1A1A1A] focus:outline-none focus:bg-white transition-colors"
                      />
                    </div>

                    {phoneCallError && (
                      <p className="text-[11px] font-bold text-rose-600 animate-in fade-in">
                        {phoneCallError}
                      </p>
                    )}

                    <p className="text-[11px] text-black/55 leading-snug">
                      When you click <strong>Initiate Live Call</strong>, our SIP telephony gateway will connect directly to your mobile phone. Answer the call to speak directly with the AI agent!
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-black/[0.08]">
                    <button
                      type="button"
                      onClick={() => setPhoneTestModalOpen(false)}
                      className="px-4 py-2.5 rounded-full text-xs font-bold text-black/60 hover:text-black transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleInitiatePracticalCall}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#FF6B08] via-amber-500 to-[#E11D48] text-white text-xs font-black shadow-md hover:brightness-110 hover:scale-102 active:scale-98 transition-all cursor-pointer"
                    >
                      <Phone className="w-4 h-4 fill-white" />
                      <span>Initiate Live Phone Call Now</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Active Call Dispatch States: Dialing / Ringing / Connected / Ended */
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                  {callConnectState === "dialing" && (
                    <>
                      <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center animate-bounce shadow-md">
                        <PhoneCall className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-[#1A1A1A]">
                          Connecting Telecom Carrier Gateway...
                        </h4>
                        <p className="text-xs text-black/60 mt-1">
                          Routing SIP session to {phoneCountryCode} {phoneInputNumber}
                        </p>
                      </div>
                      <div className="w-32 h-1.5 rounded-full bg-black/[0.06] overflow-hidden">
                        <div className="h-full bg-[#FF6B08] rounded-full animate-pulse w-3/4" />
                      </div>
                    </>
                  )}

                  {callConnectState === "ringing" && (
                    <>
                      <div className="relative">
                        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-md animate-pulse">
                          <Phone className="w-8 h-8 fill-emerald-600 text-emerald-600" />
                        </div>
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 animate-ping" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-emerald-950">
                          📞 Handset Ringing Now!
                        </h4>
                        <p className="text-xs text-emerald-800 mt-1">
                          Incoming call arriving on <strong>{phoneCountryCode} {phoneInputNumber}</strong>. Please answer your mobile phone!
                        </p>
                      </div>
                    </>
                  )}

                  {callConnectState === "connected" && (
                    <>
                      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg">
                        <Mic className="w-8 h-8 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full border border-emerald-300">
                          Live Practical Call In Progress
                        </span>
                        <h4 className="text-2xl font-black text-[#1A1A1A] mt-2 font-mono">
                          {Math.floor(livePhoneCallSeconds / 60)
                            .toString()
                            .padStart(2, "0")}
                          :{(livePhoneCallSeconds % 60).toString().padStart(2, "0")}
                        </h4>
                        <p className="text-xs text-black/65 mt-1 font-medium">
                          Speaking with {selectedAgent.name.split("—")[0].trim()} on your handset • Real Speech Synthesis Active
                        </p>
                      </div>

                      {/* Acoustic Wave Visualizer */}
                      <div className="flex items-center gap-1.5 h-10 py-2">
                        {[40, 80, 100, 60, 90, 45, 85, 70, 95, 60, 40, 75, 50].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="w-1.5 bg-gradient-to-t from-emerald-600 to-teal-400 rounded-full animate-pulse"
                          />
                        ))}
                      </div>

                      {/* Current Playing Turn Text */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-black/[0.08] max-w-sm text-left">
                        <span className="text-[10px] font-black uppercase tracking-wider text-black/50 block">
                          Current Script Prompt:
                        </span>
                        <p className="text-xs text-[#1A1A1A] mt-1 font-medium">
                          &ldquo;{simTurns[0]?.text}&rdquo;
                        </p>
                      </div>

                      {/* Hang Up Action */}
                      <button
                        type="button"
                        onClick={handleEndPracticalCall}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer mt-2"
                      >
                        <PhoneOff className="w-4 h-4" />
                        <span>Hang Up &amp; Complete Test</span>
                      </button>
                    </>
                  )}

                  {callConnectState === "ended" && (
                    <>
                      <div className="w-16 h-16 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center shadow-md">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-purple-950">
                          Practical Phone Call Completed!
                        </h4>
                        <p className="text-xs text-purple-800 mt-1">
                          The audio conversation session has been recorded and saved to your History section.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Provision & Create Agent Modal with 4-Step Freedom Wizard */}
      <CreateAgentModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onAgentCreated={handleAgentCreated}
        existingClonedVoices={clonedVoices}
        onVoiceCloned={handleVoiceCloned}
      />

      {/* Live Simulation Call Modal */}
      {testCallItem && (
        <LiveCallModal
          isOpen={liveModalOpen}
          call={testCallItem}
          onClose={() => {
            setLiveModalOpen(false);
            setTestCallItem(null);
          }}
        />
      )}
    </div>
  );
}
