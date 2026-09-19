"use client";

import React from "react";
import { DashboardAgent } from "@/types/dashboard";
import { Bot, Plus, Mic, Globe, Sparkles, Phone, Play, Pause, Settings2, ArrowUpRight } from "lucide-react";

interface AIAgentsViewProps {
  agents: DashboardAgent[];
  onCreateAgent: () => void;
  onEditAgent?: (agent: DashboardAgent) => void;
}

export default function AIAgentsView({
  agents,
  onCreateAgent,
  onEditAgent,
}: AIAgentsViewProps) {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38]">
              Agent Orchestration Studio
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              {agents.length} Active AI Callers
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
            AI Voice Agents Directory
          </h1>
          <p className="text-xs font-bold text-black/70 mt-1 max-w-xl">
            Configure system prompts, voice personas, telephony routing, and admission knowledge grounding for each specialized AI counselor.
          </p>
        </div>

        <button
          onClick={onCreateAgent}
          className="px-5 py-3 rounded-xl bg-[#d6ff38] hover:bg-black hover:text-[#d6ff38] text-black border-3 border-black text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create New AI Agent</span>
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const isActive = agent.status === "active";

          return (
            <div
              key={agent.id}
              className="bg-white border-3 border-black rounded-2xl p-5 shadow-[6px_6px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000000] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Status */}
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-black text-[#d6ff38] border-2 border-black flex items-center justify-center font-black text-lg shadow-[3px_3px_0px_#000000]">
                    <Bot className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000000] ${
                      isActive
                        ? "bg-[#d6ff38] text-black"
                        : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full border border-black ${
                        isActive ? "bg-black animate-ping" : "bg-neutral-500"
                      }`}
                    />
                    {isActive ? "Operational" : "Paused"}
                  </span>
                </div>

                <h3 className="text-lg font-black text-black uppercase tracking-tight">
                  {agent.name}
                </h3>
                <p className="text-xs font-black text-black/80 mb-0.5">
                  {agent.role}
                </p>
                <p className="text-[11px] font-bold text-black/60 mb-3">
                  Department: <span className="text-black font-black">{agent.department}</span>
                </p>

                {/* System Prompt Preview */}
                <div className="p-3 rounded-xl bg-[#fcffe0] border-2 border-black text-xs font-bold text-black italic mb-4 line-clamp-3 shadow-[2px_2px_0px_#000000]">
                  &ldquo;{agent.systemPromptPreview}&rdquo;
                </div>

                {/* Voice & Language Specifications */}
                <div className="space-y-2 text-xs font-bold text-black border-t-2 border-black/10 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-black/70 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 stroke-[2.5]" /> Voice:
                    </span>
                    <strong className="text-black font-black">{agent.voice.name}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/70 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 stroke-[2.5]" /> Language:
                    </span>
                    <strong className="text-black font-black">{agent.language}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/70 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 stroke-[2.5]" /> Virtual DID:
                    </span>
                    <strong className="font-mono text-black font-black">{agent.assignedNumber}</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics & Edit Trigger */}
              <div className="pt-4 mt-4 border-t-2 border-black flex items-center justify-between text-xs">
                <div>
                  <span className="text-black/60 block text-[10px] font-black uppercase">Calls Handled</span>
                  <span className="font-black text-black font-mono text-base">{agent.callsToday}</span>
                </div>

                <div className="text-center">
                  <span className="text-black/60 block text-[10px] font-black uppercase">Accuracy Score</span>
                  <span className="font-black text-black bg-[#d6ff38] px-2 py-0.5 rounded border border-black font-mono text-sm">{agent.accuracy}%</span>
                </div>

                <button
                  onClick={() => onEditAgent?.(agent)}
                  className="p-2.5 rounded-xl bg-white hover:bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  title="Configure Agent Prompts"
                >
                  <Settings2 className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
