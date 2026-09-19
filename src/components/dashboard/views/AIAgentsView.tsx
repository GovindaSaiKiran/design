"use client";

import React from "react";
import { DashboardAgent } from "@/types/dashboard";
import { Bot, Plus, Mic, Globe, Sparkles, Phone, Play, Pause, Settings2, ArrowUpRight, HelpCircle, CheckCircle2 } from "lucide-react";

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
  const cardColorAccents = [
    {
      avatarBg: "bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
      tagBg: "bg-[#d6ff38] text-black border-2 border-black font-black",
    },
    {
      avatarBg: "bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
      tagBg: "bg-[#00f0ff] text-black border-2 border-black font-black",
    },
    {
      avatarBg: "bg-[#ffe600] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
      tagBg: "bg-[#ffe600] text-black border-2 border-black font-black",
    },
    {
      avatarBg: "bg-[#c084fc] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
      tagBg: "bg-[#c084fc] text-black border-2 border-black font-black",
    },
    {
      avatarBg: "bg-[#ff8080] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
      tagBg: "bg-[#ff8080] text-black border-2 border-black font-black",
    },
  ];

  return (
    <div className="space-y-6 pb-12 select-none font-sans">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-[2.5px] border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-lg bg-black text-[#d6ff38] border-2 border-black shadow-[2px_2px_0px_#000000]">
              ⚡ AI Orchestration Studio
            </span>
            <span className="px-3 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider bg-[#ffe600] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              {agents.length} Deployed Counselors
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-black tracking-tight">
            AI Voice Agents Directory
          </h1>
          <p className="text-xs font-bold text-black/70 mt-1 max-w-xl">
            Configure prompt guardrails, acoustic personas, telephony numbers, and admission vector retrieval for each autonomous counselor.
          </p>
        </div>

        <button
          onClick={onCreateAgent}
          className="px-4.5 py-2.5 rounded-xl bg-[#d6ff38] hover:bg-[#ffe600] text-black text-xs font-black tracking-wide border-2.5 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Deploy New Voice Agent</span>
        </button>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {agents.map((agent, index) => {
          const isActive = agent.status === "active";
          const theme = cardColorAccents[index % cardColorAccents.length];

          return (
            <div
              key={agent.id}
              className="bg-white border-[2.5px] border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Status */}
                <div className="flex items-start justify-between gap-2 mb-3.5 pt-1">
                  <div className={`w-11 h-11 rounded-xl ${theme.avatarBg} flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform`}>
                    <Bot className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-black tracking-wide border-2 border-black shadow-[1.5px_1.5px_0px_#000000] ${
                      isActive
                        ? "bg-[#d6ff38] text-black"
                        : "bg-neutral-200 text-black/70"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? "bg-black animate-ping" : "bg-neutral-500"
                      }`}
                    />
                    {isActive ? "Active Caller" : "Paused"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-black tracking-tight">
                    {agent.name}
                  </h3>
                  <span className={`text-[10px] font-black tracking-wider px-2 py-0.5 rounded-md shadow-[1px_1px_0px_#000000] ${theme.tagBg}`}>
                    {agent.department}
                  </span>
                </div>

                <p className="text-xs font-bold text-black/70 mt-0.5">
                  {agent.role}
                </p>

                {/* System Prompt Preview */}
                <div className="p-3 rounded-xl bg-neutral-50 border-2 border-black text-xs font-bold text-black italic my-3 line-clamp-2 shadow-[2px_2px_0px_#000000]">
                  &ldquo;{agent.systemPromptPreview}&rdquo;
                </div>

                {/* Voice & Language Specifications */}
                <div className="space-y-2 text-xs font-bold text-black border-t-2 border-black/15 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-black/70 flex items-center gap-1.5 font-bold">
                      <Mic className="w-3.5 h-3.5 text-black stroke-[2.5]" /> Voice Engine:
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#ffe600] border-2 border-black rounded-md text-[11px] font-black text-black shadow-[1px_1px_0px_#000000]">
                      {agent.voice.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/70 flex items-center gap-1.5 font-bold">
                      <Globe className="w-3.5 h-3.5 text-black stroke-[2.5]" /> Dialect:
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#00f0ff] border-2 border-black rounded-md text-[11px] font-black text-black shadow-[1px_1px_0px_#000000]">
                      {agent.language}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-black/70 flex items-center gap-1.5 font-bold">
                      <Phone className="w-3.5 h-3.5 text-black stroke-[2.5]" /> Virtual DID:
                    </span>
                    <strong className="font-mono text-black font-black text-xs">{agent.assignedNumber}</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Metrics & Edit Trigger */}
              <div className="pt-3.5 mt-3.5 border-t-2 border-black/15 flex items-center justify-between text-xs">
                <div>
                  <span className="text-black/60 block text-[10px] uppercase font-black">Calls Handled</span>
                  <span className="font-black text-black font-mono text-sm">{agent.callsToday} today</span>
                </div>

                <div className="text-center">
                  <span className="text-black/60 block text-[10px] uppercase font-black">Accuracy</span>
                  <span className="font-black text-black bg-[#d6ff38] px-2.5 py-0.5 rounded-md border-2 border-black font-mono text-xs shadow-[1.5px_1.5px_0px_#000000]">
                    {agent.accuracy}%
                  </span>
                </div>

                <button
                  onClick={() => onEditAgent?.(agent)}
                  className="p-2.5 rounded-xl bg-black hover:bg-[#ffe600] text-[#d6ff38] hover:text-black border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer"
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
