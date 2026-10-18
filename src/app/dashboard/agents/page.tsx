"use client";

import React, { useState, useMemo } from "react";
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
  Lock,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import CreateAgentModal from "@/components/dashboard/modals/CreateAgentModal";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import { DashboardAgent, LiveCallItem } from "@/types/dashboard";
import { mockAgents } from "@/data/mock/dashboardData";
import { readyMadeVoices, VoiceItem } from "@/data/mock/voiceLibrary";
import { soundSynth } from "@/lib/audio-synth";

export default function AgentsPage() {
  const [agents, setAgents] = useState<DashboardAgent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<DashboardAgent>(mockAgents[0]);
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "instructions"
    | "voice"
    | "languages"
    | "knowledge"
    | "data-extraction"
    | "call-rules"
    | "playground"
    | "history"
  >("overview");

  // Voice tab states
  const [voiceSearch, setVoiceSearch] = useState("");
  const [voiceLangFilter, setVoiceLangFilter] = useState("all");
  const [voiceToneFilter, setVoiceToneFilter] = useState("all");
  const [voiceGenderFilter, setVoiceGenderFilter] = useState("all");
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  // Voice cloning states
  const [cloneConsentConfirmed, setCloneConsentConfirmed] = useState(false);
  const [cloneFileName, setCloneFileName] = useState<string | null>(null);
  const [cloneStatus, setCloneStatus] = useState<"idle" | "uploading" | "analyzing" | "ready">("idle");
  const [cloneVoiceName, setCloneVoiceName] = useState("Campus Dean Voice Clone");

  // Playground simulation states
  const [simInput, setSimInput] = useState("");
  const [simTurns, setSimTurns] = useState([
    {
      id: "1",
      speaker: "caller",
      text: "Hello! I saw your announcement regarding B.Tech admissions for 2026. What is the tuition for Computer Science?",
      time: "00:03",
    },
    {
      id: "2",
      speaker: "agent",
      text: "Hello! Welcome to Apex Global Admissions. For B.Tech Computer Science, the annual tuition is ₹5.18 Lakhs. May I know what percentage you secured in your 12th board exams?",
      time: "00:08",
    },
    {
      id: "3",
      speaker: "caller",
      text: "I got 94.2% in CBSE with Physics, Chemistry and Math.",
      time: "00:15",
    },
    {
      id: "4",
      speaker: "agent",
      text: "Congratulations! With 94.2%, you qualify for our 35% Chancellor Merit Scholarship, reducing your tuition fee significantly. Would you like me to book your campus tour for this Saturday at 11:00 AM?",
      time: "00:22",
    },
  ]);
  const [simPlayingTurnId, setSimPlayingTurnId] = useState<string | null>(null);

  // Publish confirmation modal state
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishSuccessNotice, setPublishSuccessNotice] = useState(false);

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [testCallItem, setTestCallItem] = useState<LiveCallItem | null>(null);

  // Voice selector filtering
  const filteredVoices = useMemo(() => {
    return readyMadeVoices.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(voiceSearch.toLowerCase()) ||
        v.accent.toLowerCase().includes(voiceSearch.toLowerCase()) ||
        v.language.toLowerCase().includes(voiceSearch.toLowerCase());
      const matchesLang = voiceLangFilter === "all" || v.language.toLowerCase().includes(voiceLangFilter.toLowerCase());
      const matchesTone = voiceToneFilter === "all" || v.tone === voiceToneFilter;
      const matchesGender = voiceGenderFilter === "all" || v.gender.toLowerCase() === voiceGenderFilter.toLowerCase();
      return matchesSearch && matchesLang && matchesTone && matchesGender;
    });
  }, [voiceSearch, voiceLangFilter, voiceToneFilter, voiceGenderFilter]);

  const handlePlayVoiceSample = (v: VoiceItem) => {
    if (playingVoiceId === v.id) {
      setPlayingVoiceId(null);
    } else {
      try {
        soundSynth.play("affirm");
      } catch {}
      setPlayingVoiceId(v.id);
      setTimeout(() => {
        setPlayingVoiceId(null);
      }, 3500);
    }
  };

  const handleSelectVoice = (v: VoiceItem) => {
    try {
      soundSynth.play("click");
    } catch {}
    setSelectedAgent((prev) => ({
      ...prev,
      voice: {
        name: v.name,
        gender: v.gender,
        accent: `${v.accent} (${v.tone})`,
        sampleUrl: v.sampleAudio,
      },
    }));
  };

  const handleSimulateCall = (agent: DashboardAgent) => {
    try {
      soundSynth.play("confirm");
    } catch {}
    const liveCallObj: LiveCallItem = {
      id: `sim-${agent.id}`,
      callerNumber: "+91 98401 22345",
      callerName: "Rahul Sharma (Simulation Test)",
      agentId: agent.id,
      agentName: agent.name.split("—")[0].trim(),
      direction: "inbound",
      durationSeconds: 24,
      durationFormatted: "00:24",
      currentSentiment: "positive",
      intent: "Simulated Inquiry for " + agent.role,
      latestSnippet: "Testing voice latency, prompt guardrails, and knowledge retrieval.",
      audioWaveLevels: [40, 70, 95, 60, 85, 50, 90, 70, 45, 80, 60, 40],
      startedAt: "Just now",
      latencyMs: 135,
      transcript: [
        { speaker: "caller", text: "Hello, I am testing the conversational voice agent in simulation mode.", time: "00:02" },
        { speaker: "agent", text: `Hello! I am ${agent.name.split("—")[0].trim()}. How can I assist you with admissions today?`, time: "00:08" },
      ],
    };
    setTestCallItem(liveCallObj);
    setLiveModalOpen(true);
  };

  const handleSendSimMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simInput.trim()) return;
    try {
      soundSynth.play("click");
    } catch {}
    const userTurn = {
      id: String(Date.now()),
      speaker: "caller",
      text: simInput,
      time: "00:28",
    };
    setSimTurns((prev) => [...prev, userTurn]);
    setSimInput("");

    setTimeout(() => {
      try {
        soundSynth.play("affirm");
      } catch {}
      const agentResponse = {
        id: String(Date.now() + 1),
        speaker: "agent",
        text: `Thank you for sharing that. Based on our 2026 admissions policy, all candidates with board percentages above 90% receive priority counseling. I have updated your simulation dossier accordingly.`,
        time: "00:33",
      };
      setSimTurns((prev) => [...prev, agentResponse]);
    }, 600);
  };

  const handleStartCloningProcess = () => {
    if (!cloneConsentConfirmed) return;
    try {
      soundSynth.play("confirm");
    } catch {}
    setCloneStatus("uploading");
    setTimeout(() => {
      setCloneStatus("analyzing");
      setTimeout(() => {
        setCloneStatus("ready");
      }, 1500);
    }, 1200);
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
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] bg-[#D9C2FA]/40 px-3 py-1 rounded-full border border-[#D9C2FA]/60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
              {agents.length} Configured Personas
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-1">
            AI Voice Agents Studio
          </h1>

          <p className="text-xs sm:text-sm text-black/60 mt-1 max-w-2xl leading-relaxed">
            Configure conversational voice personas, ready-made acoustic models, RAG guardrails, and telephony DID routing.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab("playground")}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#FBF7ED] text-[#1A1A1A] text-xs font-semibold px-4 py-2 rounded-full border border-black/[0.08] transition-all cursor-pointer shadow-2xs"
          >
            <Volume2 className="w-3.5 h-3.5 text-black/60" />
            <span>Test Playground</span>
          </button>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-xs transition-all cursor-pointer active:translate-y-px"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Provision Agent</span>
          </button>
        </div>
      </div>

      {/* Publish Notification Banner */}
      {publishSuccessNotice && (
        <div className="p-3.5 rounded-2xl bg-[#C1F2D5]/40 border border-[#16856B]/20 flex items-center gap-3 text-xs text-[#0D593F] font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#16856B]" />
          <span>Agent revision successfully compiled and published to live telephony line {selectedAgent.assignedNumber}.</span>
        </div>
      )}

      {/* ======================================================================= */}
      {/* AGENT SELECTOR CARDS                                                    */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const isSelected = selectedAgent.id === agent.id;
          return (
            <div
              key={agent.id}
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setSelectedAgent(agent);
              }}
              className={`p-4.5 rounded-[22px] border transition-all text-left cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-white border-[#111111] shadow-sm ring-2 ring-black/5"
                  : "bg-white border-black/[0.06] hover:border-black/20 shadow-2xs"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    isSelected ? "bg-[#111111] text-white" : "bg-[#D9C2FA]/35 text-[#1A1A1A]"
                  }`}>
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#1A1A1A] line-clamp-1">
                      {agent.name.split("—")[0].trim()}
                    </h3>
                    <p className="text-[11px] text-black/55 line-clamp-1">
                      {agent.role}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#C1F2D5] text-[#0D593F] shrink-0">
                  Active
                </span>
              </div>

              <div className="mt-3.5 pt-3 border-t border-black/[0.05] flex items-center justify-between text-[11px] text-black/60">
                <span>Voice: <strong className="text-[#1A1A1A]">{agent.voice.name}</strong></span>
                <span>DID: <strong className="text-[#1A1A1A]">{agent.assignedNumber.slice(-4)}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ======================================================================= */}
      {/* ACTIVE AGENT DETAIL DECK (9 TABS)                                       */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] shadow-2xs overflow-hidden">
        {/* Agent Profile Sub-Header */}
        <div className="px-6 py-4.5 bg-white border-b border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#D9C2FA]/40 text-[#1A1A1A] border border-[#D9C2FA]/60 flex items-center justify-center font-bold text-base shadow-2xs">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#1A1A1A]">
                  {selectedAgent.name}
                </h2>
                <span className="text-[10.5px] font-semibold bg-[#FBF7ED] text-[#1A1A1A] px-2.5 py-0.5 rounded-full border border-black/[0.08]">
                  Production v3.4
                </span>
              </div>
              <p className="text-xs text-black/60 mt-0.5">
                {selectedAgent.department} • Assigned Route: <span className="font-semibold text-[#1A1A1A]">{selectedAgent.assignedNumber}</span> • Voice: <span className="font-semibold text-[#1A1A1A]">{selectedAgent.voice.name}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSimulateCall(selectedAgent)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white hover:bg-[#FBF7ED] text-[#1A1A1A] border border-black/[0.08] transition-all cursor-pointer shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-black/60" />
              <span>Simulate Call</span>
            </button>

            <button
              onClick={() => setPublishModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold bg-[#111111] hover:bg-black text-white shadow-xs transition-all cursor-pointer active:translate-y-px"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Publish Changes</span>
            </button>
          </div>
        </div>

        {/* 9 Tab Navigation Strip */}
        <div className="px-6 border-b border-black/[0.06] bg-[#FBF7ED]/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none py-2.5">
          {[
            { id: "overview", label: "Overview", icon: Bot },
            { id: "instructions", label: "Instructions", icon: Terminal },
            { id: "voice", label: "Voice", icon: Volume2 },
            { id: "languages", label: "Languages", icon: Globe },
            { id: "knowledge", label: "Knowledge", icon: FileText },
            { id: "data-extraction", label: "Data Extraction", icon: Database },
            { id: "call-rules", label: "Call Rules", icon: ShieldCheck },
            { id: "playground", label: "Test Playground", icon: Activity },
            { id: "history", label: "History", icon: HistoryIcon },
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
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-full transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "bg-[#111111] text-white shadow-2xs font-bold"
                    : "text-black/60 hover:text-[#1A1A1A] hover:bg-white/80"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4.5 rounded-[20px] bg-[#FBF7ED] border border-black/[0.05] space-y-1">
                  <span className="text-[11px] font-semibold text-black/50 uppercase tracking-wider block">
                    Calls Handled
                  </span>
                  <div className="text-2xl font-bold text-[#1A1A1A]">
                    {selectedAgent.callsToday}
                  </div>
                  <span className="text-[11px] text-[#0D593F] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#16856B]" />
                    All routed successfully
                  </span>
                </div>

                <div className="p-4.5 rounded-[20px] bg-[#FBF7ED] border border-black/[0.05] space-y-1">
                  <span className="text-[11px] font-semibold text-black/50 uppercase tracking-wider block">
                    Resolution Accuracy
                  </span>
                  <div className="text-2xl font-bold text-[#1A1A1A]">
                    {selectedAgent.accuracy}%
                  </div>
                  <span className="text-[11px] text-black/60 font-medium">
                    Strict RAG grounding
                  </span>
                </div>

                <div className="p-4.5 rounded-[20px] bg-[#FBF7ED] border border-black/[0.05] space-y-1">
                  <span className="text-[11px] font-semibold text-black/50 uppercase tracking-wider block">
                    Average Duration
                  </span>
                  <div className="text-2xl font-bold text-[#1A1A1A]">
                    {selectedAgent.avgDuration}
                  </div>
                  <span className="text-[11px] text-black/60 font-medium">
                    Natural turn-taking
                  </span>
                </div>

                <div className="p-4.5 rounded-[20px] bg-[#FBF7ED] border border-black/[0.05] space-y-1">
                  <span className="text-[11px] font-semibold text-black/50 uppercase tracking-wider block">
                    Response Latency SLA
                  </span>
                  <div className="text-2xl font-bold text-[#1A1A1A]">
                    138 ms
                  </div>
                  <span className="text-[11px] text-[#0D593F] font-medium">
                    Sub-150ms certified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-[22px] border border-black/[0.06] bg-white space-y-3 shadow-2xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-[#1A1A1A]" />
                    <span>Acoustic Profile</span>
                  </h3>
                  <div className="text-xs space-y-2 text-black/60">
                    <div className="flex justify-between py-1 border-b border-black/[0.04]">
                      <span>Active Ready-Made Voice:</span>
                      <strong className="text-[#1A1A1A]">{selectedAgent.voice.name}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-black/[0.04]">
                      <span>Accent & Tone:</span>
                      <strong className="text-[#1A1A1A]">{selectedAgent.voice.accent}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-black/[0.04]">
                      <span>Language Mode:</span>
                      <strong className="text-[#1A1A1A]">{selectedAgent.language}</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Assigned DID:</span>
                      <strong className="text-[#1A1A1A]">{selectedAgent.assignedNumber}</strong>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("voice")}
                    className="text-xs font-semibold text-[#1A1A1A] hover:underline pt-1 block cursor-pointer"
                  >
                    Change Voice & Audio Model →
                  </button>
                </div>

                <div className="p-5 rounded-[22px] border border-black/[0.06] bg-white space-y-3 shadow-2xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#16856B]" />
                    <span>Operational Guardrails</span>
                  </h3>
                  <div className="text-xs space-y-2 text-black/60">
                    <div className="flex items-center gap-2 py-1">
                      <Check className="w-3.5 h-3.5 text-[#16856B]" />
                      <span>Zero-hallucination vector store restriction active</span>
                    </div>
                    <div className="flex items-center gap-2 py-1">
                      <Check className="w-3.5 h-3.5 text-[#16856B]" />
                      <span>Warm transfer to Counselor desk on complex disputes</span>
                    </div>
                    <div className="flex items-center gap-2 py-1">
                      <Check className="w-3.5 h-3.5 text-[#16856B]" />
                      <span>Automated DPDP compliance & PII masking</span>
                    </div>
                    <div className="flex items-center gap-2 py-1">
                      <Check className="w-3.5 h-3.5 text-[#16856B]" />
                      <span>10-minute maximum call safety cutoff</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("instructions")}
                    className="text-xs font-semibold text-[#1A1A1A] hover:underline pt-1 block cursor-pointer"
                  >
                    Edit Guardrails & System Prompt →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 2: INSTRUCTIONS                                                 */}
          {/* =================================================================== */}
          {activeTab === "instructions" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    System Prompt & Conversational Guardrails
                  </h3>
                  <p className="text-xs text-black/60 mt-0.5">
                    Define the agent's identity, communication style, greeting message, and fallback criteria.
                  </p>
                </div>
                <span className="text-xs text-black/50 font-mono">SPEC V3.4 • PRODUCTION</span>
              </div>

              <div className="p-4.5 rounded-[20px] bg-[#FBF7ED] border border-black/[0.05] space-y-2">
                <label className="text-xs font-semibold text-[#1A1A1A] block">
                  Greeting Phrase (First turn audio packet)
                </label>
                <input
                  type="text"
                  defaultValue={`Hello! Welcome to Apex Global Admissions. I am ${selectedAgent.name.split("—")[0].trim()}. How may I assist you with your campus inquiry today?`}
                  className="w-full text-xs p-3 bg-white border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#1A1A1A] block">
                  Core Instructions & Behavioral Rules
                </label>
                <textarea
                  rows={8}
                  defaultValue={selectedAgent.systemPromptPreview}
                  className="w-full font-mono text-xs p-4 bg-[#FBF7ED] border border-black/[0.08] rounded-2xl text-[#1A1A1A] focus:outline-none focus:border-black leading-relaxed"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#BCD0F5]/30 border border-[#BCD0F5]/60 flex items-start gap-3 text-xs text-[#1A1A1A]">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#1A1A1A] mt-0.5" />
                <p>
                  <strong>Zero-Hallucination Policy:</strong> The agent is programmed to reply "I do not have verified documentation for that specific detail, let me connect you with counselor Mr. Sharma" whenever a requested piece of information is not present in the connected knowledge base.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="rounded-full px-4 py-2 text-xs font-semibold text-black/60 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] transition-colors cursor-pointer"
                >
                  Discard Changes
                </button>
                <button
                  type="button"
                  onClick={() => setPublishModalOpen(true)}
                  className="rounded-full px-5 py-2 text-xs font-semibold bg-[#111111] hover:bg-black text-white shadow-xs transition-colors cursor-pointer"
                >
                  Save &amp; Stage Revision
                </button>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 3: VOICE                                                        */}
          {/* =================================================================== */}
          {activeTab === "voice" && (
            <div className="space-y-8">
              {/* Selected Voice Summary Banner */}
              <div className="p-4.5 rounded-[22px] bg-[#D9C2FA]/30 border border-[#D9C2FA]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-bold">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#1A1A1A]">
                        Selected Voice: {selectedAgent.voice.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white text-[#1A1A1A] border border-black/[0.08]">
                        Active Inbound & Outbound
                      </span>
                    </div>
                    <p className="text-xs text-black/60 mt-0.5">
                      {selectedAgent.voice.accent} • Latency: Sub-135ms
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      try { soundSynth.play("affirm"); } catch {}
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white text-[#1A1A1A] border border-black/[0.08] hover:bg-[#FBF7ED] transition-colors cursor-pointer shadow-2xs"
                  >
                    <Play className="w-3 h-3 fill-[#1A1A1A]" />
                    <span>Test Current Audio</span>
                  </button>
                </div>
              </div>

              {/* Section 1: Ready-Made Voice Selection (Prioritised) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-2">
                      <span>Ready-Made Voice Library</span>
                      <span className="text-[10px] font-semibold bg-[#C1F2D5] text-[#0D593F] px-2.5 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </h3>
                    <p className="text-xs text-black/60 mt-0.5">
                      High-fidelity, low-latency neural acoustic models optimized for Indian English and regional Indic languages.
                    </p>
                  </div>
                </div>

                {/* Filters */}
                <div className="p-3.5 rounded-[20px] bg-[#FBF7ED] border border-black/[0.05] flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="w-3.5 h-3.5 text-black/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search voice name, accent or language..."
                      value={voiceSearch}
                      onChange={(e) => setVoiceSearch(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-black/[0.08] rounded-full text-[#1A1A1A] focus:outline-none focus:border-black placeholder:text-black/40"
                    />
                  </div>

                  <select
                    value={voiceLangFilter}
                    onChange={(e) => setVoiceLangFilter(e.target.value)}
                    className="text-xs bg-white border border-black/[0.08] rounded-full px-3.5 py-2 text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer"
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
                    className="text-xs bg-white border border-black/[0.08] rounded-full px-3.5 py-2 text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer"
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
                    className="text-xs bg-white border border-black/[0.08] rounded-full px-3.5 py-2 text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer"
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
                    return (
                      <div
                        key={v.id}
                        className={`p-4.5 rounded-[22px] border transition-all flex flex-col justify-between ${
                          isSelected
                            ? "bg-white border-[#111111] ring-2 ring-black/5 shadow-sm"
                            : "bg-white border-black/[0.06] hover:border-black/20 shadow-2xs"
                        }`}
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-bold text-xs text-[#1A1A1A]">{v.name}</h4>
                                {v.tag && (
                                  <span className="text-[9.5px] font-semibold bg-[#D9C2FA]/40 text-[#1A1A1A] px-2 py-0.5 rounded-full border border-[#D9C2FA]/60">
                                    {v.tag}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-black/55 mt-0.5">{v.accent}</p>
                            </div>

                            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FBF7ED] text-black/60 font-medium shrink-0 border border-black/[0.04]">
                              {v.gender}
                            </span>
                          </div>

                          <div className="p-3 rounded-xl bg-[#FBF7ED] border border-black/[0.04] text-[11px] text-black/70 italic leading-snug line-clamp-2">
                            "{v.sampleTranscript}"
                          </div>

                          <div className="flex items-center justify-between text-[10.5px] text-black/60">
                            <span>Tone: <strong className="text-[#1A1A1A]">{v.tone}</strong></span>
                            <span>Latency: <strong className="text-[#0D593F]">{v.latencyMs}ms</strong></span>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => handlePlayVoiceSample(v)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] hover:text-black transition-colors cursor-pointer"
                          >
                            {isPlaying ? (
                              <>
                                <Pause className="w-3.5 h-3.5 fill-[#1A1A1A] text-[#1A1A1A]" />
                                <span className="text-[#1A1A1A]">Playing sample...</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3.5 h-3.5 fill-[#1A1A1A]" />
                                <span>Play Sample</span>
                              </>
                            )}
                          </button>

                          {isSelected ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0D593F]">
                              <Check className="w-3.5 h-3.5 text-[#16856B]" />
                              <span>Active</span>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSelectVoice(v)}
                              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#111111] hover:text-white text-[#1A1A1A] border border-black/[0.06] transition-colors cursor-pointer"
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

              {/* Section 2: Custom Consent-Based Voice Cloning (Optional & Separate) */}
              <div className="pt-6 border-t border-black/[0.06] space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                      Custom Voice Cloning (Optional)
                    </h3>
                    <span className="text-[10px] font-semibold bg-[#FFD9A0]/50 text-[#8C4A00] px-2.5 py-0.5 rounded-full border border-[#FFD9A0]">
                      Consent Required
                    </span>
                  </div>
                  <p className="text-xs text-black/60 mt-0.5">
                    Clone an executive or counselor voice with verified legal consent. Only available with an enterprise provider license.
                  </p>
                </div>

                <div className="p-5 rounded-[24px] border border-black/[0.06] bg-white space-y-4 shadow-2xs">
                  {/* Provider Verification Notice */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.05] text-xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#16856B]" />
                      <span className="text-[#1A1A1A]">
                        <strong>Configured Engine:</strong> ElevenLabs Enterprise Telephony Integration
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#0D593F] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
                      Provider Ready
                    </span>
                  </div>

                  {/* Mandatory Consent Checkbox */}
                  <div className="p-4 rounded-2xl bg-[#FFD9A0]/25 border border-[#FFD9A0]/50 space-y-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={cloneConsentConfirmed}
                        onChange={(e) => setCloneConsentConfirmed(e.target.checked)}
                        className="mt-0.5 rounded text-[#111111] focus:ring-black accent-black"
                      />
                      <span className="text-xs text-[#1A1A1A] leading-relaxed">
                        <strong>Mandatory Legal & Ethical Consent:</strong> I confirm and certify under penalty of policy violation that I have obtained explicit, recorded, written authorization from the individual whose voice is being cloned. I understand that unauthorized voice cloning is strictly prohibited under DPDP and platform acceptable use guidelines.
                      </span>
                    </label>
                  </div>

                  {/* Upload and Configuration Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#1A1A1A] block">
                        Voice Persona Identifier
                      </label>
                      <input
                        type="text"
                        value={cloneVoiceName}
                        onChange={(e) => setCloneVoiceName(e.target.value)}
                        placeholder="e.g. Dean Vikram Rao Voice Model"
                        className="w-full text-xs px-3.5 py-2.5 bg-white border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#1A1A1A] block">
                        Upload Sample (Min 60 seconds clean audio, WAV/MP3)
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setCloneFileName("dean_speech_60s_sample.wav")}
                          className="flex-1 flex items-center justify-center gap-2 p-2.5 border border-dashed border-black/20 rounded-xl text-xs text-black/60 hover:border-black hover:text-[#1A1A1A] transition-colors cursor-pointer bg-[#FBF7ED]"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{cloneFileName || "Choose audio file..."}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {cloneFileName && (
                    <div className="p-3.5 rounded-xl bg-[#FBF7ED] border border-black/[0.05] space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-black/60">Sample Quality Analysis:</span>
                        <span className="font-semibold text-[#0D593F]">96% High Fidelity (Low Noise Floor)</span>
                      </div>
                      <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#16856B] h-full w-[96%]" />
                      </div>
                    </div>
                  )}

                  {cloneStatus !== "idle" && (
                    <div className="p-3.5 rounded-2xl bg-[#BCD0F5]/30 border border-[#BCD0F5]/60 flex items-center justify-between text-xs text-[#1A1A1A]">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 animate-spin text-[#1A1A1A]" />
                        <span>
                          {cloneStatus === "uploading" && "Uploading encrypted audio sample..."}
                          {cloneStatus === "analyzing" && "Extracting phoneme vectors and neural embeddings..."}
                          {cloneStatus === "ready" && "Voice model synthesized and verified ready for preview!"}
                        </span>
                      </div>
                      {cloneStatus === "ready" && (
                        <button
                          type="button"
                          onClick={() => {
                            try { soundSynth.play("affirm"); } catch {}
                          }}
                          className="font-semibold underline cursor-pointer"
                        >
                          Play Preview
                        </button>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      disabled={!cloneConsentConfirmed || !cloneFileName}
                      onClick={handleStartCloningProcess}
                      className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#111111] hover:bg-black text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
                    >
                      {cloneStatus === "ready" ? "Assign Cloned Voice to Maya" : "Analyze & Process Clone"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 4: LANGUAGES                                                    */}
          {/* =================================================================== */}
          {activeTab === "languages" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Multilingual Code-Switching & Dialect Routing
                </h3>
                <p className="text-xs text-black/60 mt-0.5">
                  Enable regional languages. The voice engine automatically detects spoken language within 1 turn and responds fluently in the caller's dialect.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { lang: "Hindi", desc: "North Indian standard and colloquial Hindi", active: true },
                  { lang: "Indian English", desc: "Corporate and educational English", active: true },
                  { lang: "Telugu", desc: "Coastal Andhra & Telangana regional nuances", active: true },
                  { lang: "Tamil", desc: "Chennai and standard Tamil Nadu dialects", active: true },
                  { lang: "Kannada", desc: "Bangalore & Mysuru regional phrasing", active: false },
                  { lang: "Marathi", desc: "Mumbai & Pune colloquial expressions", active: false },
                  { lang: "Bengali", desc: "Kolkata standard and regional Bengali", active: false },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="p-4.5 rounded-[20px] border border-black/[0.06] bg-white flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#1A1A1A]">{item.lang}</span>
                        {item.active && (
                          <span className="text-[10px] font-semibold bg-[#C1F2D5] text-[#0D593F] px-2.5 py-0.5 rounded-full">
                            Enabled
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-black/55 mt-0.5">{item.desc}</p>
                    </div>

                    <input
                      type="checkbox"
                      defaultChecked={item.active}
                      className="rounded text-[#111111] focus:ring-black accent-black"
                    />
                  </div>
                ))}
              </div>

              <div className="p-4.5 rounded-[20px] bg-[#FBF7ED] border border-black/[0.05] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1A1A1A]">Instant Mid-Call Code Switching</h4>
                  <p className="text-[11px] text-black/60">
                    Allow seamless bilingual switching (e.g. Hindi to English and vice versa in the same breath).
                  </p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded text-[#111111] focus:ring-black accent-black"
                />
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 5: KNOWLEDGE                                                    */}
          {/* =================================================================== */}
          {activeTab === "knowledge" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Connected Knowledge Collections (RAG)
                  </h3>
                  <p className="text-xs text-black/60 mt-0.5">
                    Agent retrieves verified answers strictly from approved institutional documents.
                  </p>
                </div>
                <Link
                  href="/dashboard/knowledge"
                  className="text-xs font-semibold text-[#1A1A1A] hover:underline"
                >
                  Manage All Vector Stores →
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "B.Tech Fee Structure, TFW & Merit Scholarships 2026.xlsx",
                    chunks: 142,
                    category: "Fees & Scholarships",
                    status: "Synchronized",
                  },
                  {
                    title: "Campus Admissions Policy, Cutoffs & Seat Matrix.pdf",
                    chunks: 218,
                    category: "Admissions Policy",
                    status: "Synchronized",
                  },
                ].map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4.5 rounded-[20px] border border-black/[0.06] bg-white flex items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#D9C2FA]/40 text-[#1A1A1A] flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-[#1A1A1A]">{doc.title}</h4>
                        <p className="text-[11px] text-black/55">
                          {doc.category} • {doc.chunks} semantic vector chunks
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-semibold bg-[#C1F2D5] text-[#0D593F] px-2.5 py-0.5 rounded-full">
                        {doc.status}
                      </span>
                      <button
                        type="button"
                        onClick={() => alert(`Unlinking ${doc.title} from agent.`)}
                        className="text-xs text-black/50 hover:text-[#B42318] font-semibold cursor-pointer"
                      >
                        Unlink
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4.5 rounded-[20px] bg-[#FBF7ED] border border-black/[0.05] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1A1A1A]">Grounding Strictness: Strict (Recommended)</span>
                  <span className="text-black/60">Cosine Threshold: 0.82</span>
                </div>
                <div className="w-full bg-black/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#111111] h-full w-[85%]" />
                </div>
                <span className="text-[11px] text-black/60 block">
                  Prevents speculative answers. When confidence drops below threshold, agent gracefully transfers to human staff.
                </span>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 6: DATA EXTRACTION                                              */}
          {/* =================================================================== */}
          {activeTab === "data-extraction" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                    Structured Data Extraction Schema
                  </h3>
                  <p className="text-xs text-black/60 mt-0.5">
                    Variables extracted automatically during conversations and archived directly into the Data Vault.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Add custom variable modal opened.")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#111111] text-white hover:bg-black transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Field</span>
                </button>
              </div>

              <div className="border border-black/[0.06] rounded-[22px] overflow-hidden bg-white shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/60 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Field Name</th>
                      <th className="py-3 px-4">Data Type</th>
                      <th className="py-3 px-4">Required</th>
                      <th className="py-3 px-4">Destination</th>
                      <th className="py-3 px-4">Example Extracted Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.05]">
                    {[
                      { name: "caller_name", type: "String", req: true, dest: "Data Vault + CRM", sample: "Rahul Sharma" },
                      { name: "caller_phone", type: "Phone (E.164)", req: true, dest: "Data Vault", sample: "+91 98401 22345" },
                      { name: "target_course", type: "Categorical", req: true, dest: "Data Vault + CRM", sample: "B.Tech Computer Science" },
                      { name: "board_percentage", type: "Number", req: false, dest: "Data Vault", sample: "94.2%" },
                      { name: "hostel_required", type: "Boolean", req: false, dest: "Data Vault", sample: "Yes (AC Room)" },
                      { name: "campus_tour_datetime", type: "DateTime", req: false, dest: "Data Vault + Calendar", sample: "Sat 11:00 AM" },
                    ].map((f, i) => (
                      <tr key={i} className="hover:bg-[#FBF7ED]/40">
                        <td className="py-3 px-4 font-mono font-semibold text-[#1A1A1A]">{f.name}</td>
                        <td className="py-3 px-4 text-black/60">{f.type}</td>
                        <td className="py-3 px-4">
                          {f.req ? (
                            <span className="text-[10px] font-bold text-[#0D593F] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
                              Required
                            </span>
                          ) : (
                            <span className="text-[10px] text-black/60 bg-[#FBF7ED] px-2.5 py-0.5 rounded-full border border-black/[0.04]">
                              Optional
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-[#1A1A1A] font-medium">{f.dest}</td>
                        <td className="py-3 px-4 text-black/60 italic">{f.sample}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-2xl bg-[#FBF7ED] border border-black/[0.05] flex items-center justify-between text-xs text-black/60">
                <span>All extracted records automatically link back to their source call ID and audio transcript in the Data Vault.</span>
                <Link href="/dashboard/data-vault" className="font-semibold text-[#1A1A1A] hover:underline">
                  Inspect Data Vault →
                </Link>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 7: CALL RULES                                                   */}
          {/* =================================================================== */}
          {activeTab === "call-rules" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Telephony Rules & Human Counselor Escalation
                </h3>
                <p className="text-xs text-black/60 mt-0.5">
                  Configure limits, office hours routing, inactivity reprompting, and escalation parameters.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4.5 rounded-[20px] border border-black/[0.06] bg-white space-y-2 shadow-2xs">
                  <label className="text-xs font-semibold text-[#1A1A1A] block">
                    Maximum Call Duration
                  </label>
                  <select className="w-full text-xs p-2.5 bg-[#FBF7ED] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer">
                    <option value="600">10 Minutes (Standard limit)</option>
                    <option value="900">15 Minutes (Extended inquiries)</option>
                    <option value="300">5 Minutes (Quick verification)</option>
                  </select>
                </div>

                <div className="p-4.5 rounded-[20px] border border-black/[0.06] bg-white space-y-2 shadow-2xs">
                  <label className="text-xs font-semibold text-[#1A1A1A] block">
                    Silence Detection Threshold
                  </label>
                  <select className="w-full text-xs p-2.5 bg-[#FBF7ED] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer">
                    <option value="5">5 Seconds (Gentle reprompt)</option>
                    <option value="7">7 Seconds (Patient waiting)</option>
                  </select>
                </div>

                <div className="p-4.5 rounded-[20px] border border-black/[0.06] bg-white space-y-2 shadow-2xs">
                  <label className="text-xs font-semibold text-[#1A1A1A] block">
                    Escalation Destination (Warm Handoff)
                  </label>
                  <select className="w-full text-xs p-2.5 bg-[#FBF7ED] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer">
                    <option value="counselor">Admissions Counselor Desk (+91 40 4590 1100)</option>
                    <option value="dean">Senior Registrar Office</option>
                  </select>
                </div>

                <div className="p-4.5 rounded-[20px] border border-black/[0.06] bg-white space-y-2 shadow-2xs">
                  <label className="text-xs font-semibold text-[#1A1A1A] block">
                    Voicemail Detection
                  </label>
                  <select className="w-full text-xs p-2.5 bg-[#FBF7ED] border border-black/[0.08] rounded-xl text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer">
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
              {/* Simulation Banner */}
              <div className="p-3.5 rounded-2xl bg-[#BCD0F5]/30 border border-[#BCD0F5]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#111111]" />
                  <span className="text-xs font-bold text-[#1A1A1A]">
                    SIMULATION PLAYGROUND — Real-time turn testing environment
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-black/70 bg-white px-3 py-0.5 rounded-full border border-black/[0.06]">
                  No Live Phone Trunk Billed
                </span>
              </div>

              {/* Dual-Pane Playground */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Chat & Audio Player */}
                <div className="lg:col-span-2 border border-black/[0.06] rounded-[24px] overflow-hidden bg-white flex flex-col h-[520px] shadow-2xs">
                  {/* Playground Header */}
                  <div className="px-5 py-3.5 bg-[#FBF7ED] border-b border-black/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-[#1A1A1A]" />
                      <span className="text-xs font-bold text-[#1A1A1A]">Conversation Flow</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSimTurns([
                          {
                            id: "1",
                            speaker: "agent",
                            text: `Hello! I am ${selectedAgent.name.split("—")[0].trim()}. How can I assist you with your campus inquiry today?`,
                            time: "00:00",
                          },
                        ]);
                      }}
                      className="text-xs font-semibold text-black/60 hover:text-[#1A1A1A] flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Transcript Scroll Area */}
                  <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-white">
                    {simTurns.map((turn) => {
                      const isAgent = turn.speaker === "agent";
                      return (
                        <div
                          key={turn.id}
                          className={`flex flex-col ${isAgent ? "items-start" : "items-end"}`}
                        >
                          <div className="flex items-center gap-1.5 mb-1 px-1 text-[10.5px] text-black/50">
                            <span className="font-semibold text-[#1A1A1A]">
                              {isAgent ? selectedAgent.name.split("—")[0].trim() : "Caller (You)"}
                            </span>
                            <span>•</span>
                            <span>{turn.time}</span>
                          </div>

                          <div
                            className={`p-4 rounded-2xl max-w-md text-xs leading-relaxed relative ${
                              isAgent
                                ? "bg-[#FBF7ED] border border-black/[0.05] text-[#1A1A1A] rounded-tl-none"
                                : "bg-[#111111] text-white rounded-tr-none shadow-xs"
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
                                className="mt-2.5 inline-flex items-center gap-1 text-[10.5px] font-semibold text-[#1A1A1A] hover:underline cursor-pointer"
                              >
                                {simPlayingTurnId === turn.id ? (
                                  <>
                                    <Pause className="w-3 h-3 fill-[#1A1A1A]" />
                                    <span>Playing Audio...</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-3 h-3 fill-[#1A1A1A]" />
                                    <span>Listen Audio Turn</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Message Input Bar */}
                  <form onSubmit={handleSendSimMessage} className="p-3.5 border-t border-black/[0.06] bg-[#FBF7ED] flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Type a caller question or test an edge case prompt..."
                      value={simInput}
                      onChange={(e) => setSimInput(e.target.value)}
                      className="flex-1 text-xs px-4 py-2.5 bg-white border border-black/[0.08] rounded-full text-[#1A1A1A] focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="p-2.5 rounded-full bg-[#111111] hover:bg-black text-white transition-colors cursor-pointer shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* Right 1 Col: Extracted Variables & Telemetry in Real-Time */}
                <div className="border border-black/[0.06] rounded-[24px] p-5 bg-white space-y-5 h-[520px] overflow-y-auto shadow-2xs">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                      Simulation Test Outcomes
                    </h3>
                    <p className="text-[11px] text-black/60 mt-0.5">
                      Telemetry and extracted fields captured dynamically during this simulation.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.05]">
                      <span className="text-[10px] font-semibold text-black/50 uppercase block">First-Byte Turn Latency</span>
                      <span className="text-lg font-bold text-[#1A1A1A] block mt-0.5">136 ms</span>
                      <span className="text-[10.5px] text-[#0D593F] font-medium">SLA Verified (Sub-150ms)</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.05]">
                      <span className="text-[10px] font-semibold text-black/50 uppercase block">Sentiment Classification</span>
                      <span className="text-lg font-bold text-[#0D593F] block mt-0.5">94% Positive</span>
                      <span className="text-[10.5px] text-black/60">High intent detected</span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.05]">
                      <span className="text-[10px] font-semibold text-black/50 uppercase block">Test Outcome</span>
                      <span className="text-xs font-bold text-[#1A1A1A] block mt-0.5">Merit Scholarship & Tour Confirmed</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-black/[0.05] space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black/60 block">
                      Live Extracted Fields
                    </span>
                    <div className="text-xs space-y-1.5 text-black/60">
                      <div className="flex justify-between py-1 border-b border-black/[0.04]">
                        <span>Target Course:</span>
                        <strong className="text-[#1A1A1A]">B.Tech CSE</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-black/[0.04]">
                        <span>Board Percentage:</span>
                        <strong className="text-[#1A1A1A]">94.2%</strong>
                      </div>
                      <div className="flex justify-between py-1 border-b border-black/[0.04]">
                        <span>Scholarship Tier:</span>
                        <strong className="text-[#1A1A1A]">35% Chancellor</strong>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Action:</span>
                        <strong className="text-[#0D593F]">Campus Visit (Sat 11 AM)</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================== */}
          {/* TAB 9: HISTORY                                                      */}
          {/* =================================================================== */}
          {activeTab === "history" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]">
                  Configuration Revision Ledger & Audit Log
                </h3>
                <p className="text-xs text-black/60 mt-0.5">
                  Complete immutable version history. Changes are tracked per user and can be reverted with one click.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    version: "v3.4 (Current Production)",
                    author: "Govinda T.",
                    date: "2 days ago",
                    changes: "Updated Chancellor merit waiver tiers to 35% and configured Telugu auto-code switching.",
                    isCurrent: true,
                  },
                  {
                    version: "v3.3",
                    author: "Govinda T.",
                    date: "Oct 12, 2026",
                    changes: "Connected new 2026 Hostel AC fee schedule vector collection.",
                    isCurrent: false,
                  },
                  {
                    version: "v3.2",
                    author: "System Admin",
                    date: "Oct 05, 2026",
                    changes: "Adjusted silence threshold to 5 seconds and added warm counselor transfer trigger.",
                    isCurrent: false,
                  },
                  {
                    version: "v3.1",
                    author: "System Admin",
                    date: "Sep 28, 2026",
                    changes: "Initial provision of Maya Admissions Agent on DID +91 40 4590 1199.",
                    isCurrent: false,
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4.5 rounded-[22px] border border-black/[0.06] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-xs font-bold text-[#1A1A1A]">{item.version}</strong>
                        {item.isCurrent && (
                          <span className="text-[10px] font-semibold bg-[#C1F2D5] text-[#0D593F] px-2.5 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-black/60 mt-1">{item.changes}</p>
                      <span className="text-[10.5px] text-black/40 mt-1 block">
                        Published by {item.author} • {item.date}
                      </span>
                    </div>

                    {!item.isCurrent && (
                      <button
                        type="button"
                        onClick={() => alert(`Reverting to ${item.version}...`)}
                        className="px-4 py-1.5 rounded-full text-xs font-semibold border border-black/[0.08] bg-[#FBF7ED] text-[#1A1A1A] hover:bg-white transition-colors cursor-pointer shrink-0"
                      >
                        Revert to this version
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================================= */}
      {/* PUBLISH CONFIRMATION MODAL                                              */}
      {/* ======================================================================= */}
      {publishModalOpen && (
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
    </div>
  );
}
