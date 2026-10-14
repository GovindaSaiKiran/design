"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bot,
  Plus,
  Play,
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
  ChevronRight,
  Terminal,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import CreateAgentModal from "@/components/dashboard/modals/CreateAgentModal";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import { DashboardAgent, LiveCallItem } from "@/types/dashboard";
import { mockAgents } from "@/data/mock/dashboardData";
import { soundSynth } from "@/lib/audio-synth";

export default function AgentsPage() {
  const [agents, setAgents] = useState<DashboardAgent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<DashboardAgent | null>(mockAgents[0] || null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [testCallItem, setTestCallItem] = useState<LiveCallItem | null>(null);

  const handleSimulateCall = (agent?: DashboardAgent | null) => {
    if (!agent) return;
    soundSynth.play("confirm");
    const liveCallObj: LiveCallItem = {
      id: `sim-${agent.id}`,
      callerNumber: "+91 98401 99999",
      callerName: "Prospective Customer (Simulation)",
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
        { speaker: "caller", text: "Hello, I am testing the conversational voice agent.", time: "00:02" },
        { speaker: "agent", text: `Hello! I am ${agent.name.split("—")[0].trim()}. How can I assist you today?`, time: "00:08" },
      ],
    };
    setTestCallItem(liveCallObj);
    setLiveModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 select-none text-white font-sans">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[10px] font-mono font-bold tracking-widest text-[#71717A] hover:text-white uppercase transition-colors"
            >
              WORKSPACES
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-white bg-[#18181B] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {agents.length} PERSONAS ONLINE
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">
            AI Agents & Workforce
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Autonomous multilingual voice personas, acoustic models, system prompt guardrails, and carrier trunk routing.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          {selectedAgent && (
            <button
              onClick={() => handleSimulateCall(selectedAgent)}
              className="inline-flex items-center gap-2 bg-[#09090B] hover:bg-[#18181B] text-white text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-2 rounded-[2px] border border-[#27272A] hover:border-white transition-all cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#A1A1AA]" />
              <span>Voice Simulator</span>
            </button>
          )}

          <button
            onClick={() => {
              soundSynth.play("click");
              setCreateModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Persona</span>
          </button>
        </div>
      </div>

      {agents.length === 0 ? (
        <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] p-8 sm:p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-[2px] bg-[#121215] text-white flex items-center justify-center mx-auto border border-[#27272A]">
            <Bot className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">No AI Personas Deployed</h2>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Deploy your first autonomous voice agent in under 2 minutes with customized acoustic persona, system prompt instructions, and assigned telephony DID.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                soundSynth.play("click");
                setCreateModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-5 py-2.5 rounded-[2px] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Build Agent</span>
            </button>
            <Link
              href="/dashboard/store"
              className="inline-flex items-center gap-2 bg-[#121215] hover:bg-[#18181B] text-white text-xs font-mono font-bold uppercase tracking-wider px-4 py-2.5 rounded-[2px] border border-[#27272A] hover:border-white transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A1A1AA]" />
              <span>Browse Catalog</span>
            </Link>
          </div>
        </div>
      ) : selectedAgent ? (
        <>
          {/* ======================================================================= */}
          {/* WORKSPACE SUB-FOLDER CARDS FOR AGENTS                                   */}
          {/* ======================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.slice(0, 4).map((agent) => (
              <WorkspaceCard
                key={agent.id}
                name={agent.name.split("—")[0].trim()}
                icon={Bot}
                description={agent.role}
                metric={`${agent.callsToday} calls`}
                metricLabel={`${agent.accuracy}% accuracy • ${agent.avgDuration} avg`}
                status={agent.activeLiveCount > 0 ? `${agent.activeLiveCount} live` : "Active & Ready"}
                statusType={agent.activeLiveCount > 0 ? "live" : "ready"}
                actionLabel="Configure persona →"
                onClick={() => {
                  soundSynth.play("click");
                  setSelectedAgent(agent);
                }}
              />
            ))}
          </div>

          {/* ======================================================================= */}
          {/* ACTIVE AGENT DOSSIER / CONFIGURATION DECK                              */}
          {/* ======================================================================= */}
          <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] overflow-hidden">
            {/* Top Folder Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 bg-[#121215] border-b border-[#27272A] gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-[2px] bg-white text-black flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-white tracking-wide">
                      {selectedAgent.name}
                    </h2>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#18181B] text-zinc-300 px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                      PRODUCTION SPEC
                    </span>
                  </div>
                  <p className="text-xs text-[#71717A] font-mono mt-0.5">
                    {selectedAgent.department} • Telephony: {selectedAgent.assignedNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSimulateCall(selectedAgent)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-all cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Simulate Call</span>
                </button>
              </div>
            </div>

            {/* Interior Agent Configuration Details */}
            <div className="p-5 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Voice Model Block */}
                <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] block">
                    ACOUSTIC PERSONA
                  </span>
                  <div className="font-bold text-xs text-white">
                    {selectedAgent.voice.name}
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] font-mono">
                    Accent: {selectedAgent.voice.accent}
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] font-mono">
                    Languages: {selectedAgent.language}
                  </div>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-white bg-[#18181B] px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      Sub-140ms Native Audio Latency
                    </span>
                  </div>
                </div>

                {/* Performance Telemetry */}
                <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] block">
                    TELEMETRY & OPERATIONS
                  </span>
                  <div className="text-xl font-bold text-white font-mono">
                    {selectedAgent.callsToday} calls handled
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] font-mono">
                    Resolution Accuracy: {selectedAgent.accuracy}%
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] font-mono">
                    Average Duration: {selectedAgent.avgDuration}
                  </div>
                  <div className="pt-1">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-white bg-[#18181B] px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                      <ShieldCheck className="w-3 h-3 text-white" />
                      Zero Hallucination Guardrails
                    </span>
                  </div>
                </div>

                {/* Knowledge Bases Linked */}
                <div className="p-4 rounded-[2px] bg-[#121215] border border-[#27272A] space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] block">
                    GROUNDED KNOWLEDGE RAG
                  </span>
                  <div className="font-bold text-xs text-white">
                    Workspace Vector Store
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] font-mono">
                    Semantic indexing enabled
                  </div>
                  <div className="text-[11px] text-[#A1A1AA] font-mono">
                    Strict institutional grounding
                  </div>
                  <div className="pt-1">
                    <Link
                      href="/dashboard/knowledge"
                      className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-white hover:underline uppercase tracking-wider"
                    >
                      Inspect Vector Chunks →
                    </Link>
                  </div>
                </div>
              </div>

              {/* System Prompt Instruction Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A] flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-[#A1A1AA]" />
                    <span>System Prompt & Conversational Guardrails</span>
                  </span>
                  <span className="text-[10px] text-[#71717A] font-mono">
                    SPEC V3.4 • PRODUCTION
                  </span>
                </div>

                <div className="p-4 rounded-[2px] bg-[#000000] text-zinc-200 font-mono text-xs leading-relaxed border border-[#27272A]">
                  {selectedAgent.systemPromptPreview}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {/* Modals */}
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
