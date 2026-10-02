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
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import CreateAgentModal from "@/components/dashboard/modals/CreateAgentModal";
import LiveCallModal from "@/components/dashboard/modals/LiveCallModal";
import { DashboardAgent, LiveCallItem } from "@/types/dashboard";
import { mockAgents } from "@/data/mock/dashboardData";

export default function AgentsPage() {
  const [agents, setAgents] = useState<DashboardAgent[]>(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<DashboardAgent>(mockAgents[0]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [liveModalOpen, setLiveModalOpen] = useState(false);
  const [testCallItem, setTestCallItem] = useState<LiveCallItem | null>(null);

  const handleSimulateCall = (agent: DashboardAgent) => {
    const liveCallObj: LiveCallItem = {
      id: `sim-${agent.id}`,
      callerNumber: "+91 98401 99999",
      callerName: "Prospective Student (Simulation)",
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
        { speaker: "agent", text: `Hello! I am ${agent.name.split("—")[0].trim()}, representing Apex Engineering College. How can I assist you today?`, time: "00:08" },
      ],
    };
    setTestCallItem(liveCallObj);
    setLiveModalOpen(true);
  };

  return (
    <div className="space-y-6 sm:space-y-8 select-none">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[11px] font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase transition-colors"
            >
              WORKSPACES
            </Link>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-950 bg-[#cdfb56]/30 px-2.5 py-0.5 rounded-full border border-[#cdfb56]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926]" />
              4 Personas Active
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            AI Agents & Workforce
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Autonomous multilingual voice personas, system prompts, voices, and telephony routing.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => handleSimulateCall(selectedAgent)}
            className="inline-flex items-center gap-2 bg-white hover:bg-[#f7fee7] text-slate-800 hover:text-slate-950 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 hover:border-[#cdfb56] shadow-2xs transition-all cursor-pointer"
          >
            <Volume2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Test Voice Simulator</span>
          </button>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-lg border border-[#bceb42] shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-slate-950" />
            <span>Create New Persona</span>
          </button>
        </div>
      </div>

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
            onClick={() => setSelectedAgent(agent)}
          />
        ))}
      </div>

      {/* ======================================================================= */}
      {/* ACTIVE AGENT DOSSIER / CONFIGURATION DECK                              */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Top Folder Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 bg-slate-50/70 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center font-bold shadow-2xs">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900">
                  {selectedAgent.name}
                </h2>
                <span className="text-[10px] font-bold bg-[#cdfb56]/40 text-slate-950 px-2 py-0.2 rounded border border-[#cdfb56]">
                  Production Agent
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {selectedAgent.department} • Telephony: {selectedAgent.assignedNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSimulateCall(selectedAgent)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 border border-[#bceb42] shadow-2xs transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Simulate Call Now</span>
            </button>
          </div>
        </div>

        {/* Interior Agent Configuration Details */}
        <div className="p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Voice Model Block */}
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Acoustic & Voice Persona
              </span>
              <div className="font-bold text-xs text-slate-900">
                {selectedAgent.voice.name}
              </div>
              <div className="text-[11px] text-slate-600">
                Accent: {selectedAgent.voice.accent}
              </div>
              <div className="text-[11px] text-slate-600">
                Languages: {selectedAgent.language}
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  <CheckCircle2 className="w-2.5 h-2.5 text-[#8ac926]" />
                  Sub-140ms Native Audio Latency
                </span>
              </div>
            </div>

            {/* Performance Telemetry */}
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Daily Operations
              </span>
              <div className="text-xl font-bold text-slate-900 font-mono">
                {selectedAgent.callsToday} calls handled
              </div>
              <div className="text-[11px] text-slate-600">
                Resolution Accuracy: {selectedAgent.accuracy}%
              </div>
              <div className="text-[11px] text-slate-600">
                Average Duration: {selectedAgent.avgDuration}
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  <ShieldCheck className="w-2.5 h-2.5 text-[#8ac926]" />
                  Zero Hallucinations Verified
                </span>
              </div>
            </div>

            {/* Knowledge Bases Linked */}
            <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Grounded Knowledge Bases
              </span>
              <div className="font-bold text-xs text-slate-900">
                Apex Engineering College Official RAG
              </div>
              <div className="text-[11px] text-slate-600">
                480 indexed vector chunks active
              </div>
              <div className="text-[11px] text-slate-600">
                Strict grounding with source citations
              </div>
              <div className="pt-1">
                <Link
                  href="/dashboard/knowledge"
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-900 hover:text-slate-950 underline underline-offset-2"
                >
                  Inspect Grounding Chunks →
                </Link>
              </div>
            </div>
          </div>

          {/* System Prompt Instruction Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                System Prompt & Conversational Guidelines
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                Version 3.4 • Updated Yesterday
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed border border-slate-800 shadow-inner">
              {selectedAgent.systemPromptPreview}
            </div>
          </div>
        </div>
      </div>

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
