"use client";

import React from "react";
import { DashboardAgent } from "@/types/dashboard";
import { Bot, Plus, Mic, Globe, Radio, Phone, ArrowUpRight, Sparkles, PauseCircle, PlayCircle } from "lucide-react";

interface AIAgentsModuleProps {
  agents: DashboardAgent[];
  onCreateAgent?: () => void;
  onSelectAgent?: (agent: DashboardAgent) => void;
}

export default function AIAgentsModule({
  agents,
  onCreateAgent,
  onSelectAgent,
}: AIAgentsModuleProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border-3 border-black shadow-[6px_6px_0px_#000000] flex flex-col justify-between select-none">
      {/* Module Header */}
      <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              Voice Workforce
            </span>
            <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-[#d6ff38] text-black border border-black shadow-[1.5px_1.5px_0px_#000000]">
              2 ACTIVE • 1 STANDBY
            </span>
          </div>
          <h3 className="text-lg font-black text-black tracking-tight mt-1 uppercase">
            AI Calling Agents
          </h3>
          <p className="text-xs font-bold text-black/70">
            Admissions counseling & mass outbound dialers
          </p>
        </div>

        <button
          onClick={onCreateAgent}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#d6ff38] hover:bg-[#cbf72e] text-black text-xs font-black border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 cursor-pointer transition-all shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create AI Agent</span>
        </button>
      </div>

      {/* Agents List / Cards */}
      <div className="space-y-3">
        {agents.map((agent) => {
          const isActive = agent.status === "active";

          return (
            <div
              key={agent.id}
              onClick={() => onSelectAgent?.(agent)}
              className="group p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000] transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Top Row: Name + Status */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm border-2 border-black ${
                      isActive
                        ? "bg-[#d6ff38] text-black shadow-[2px_2px_0px_#000000]"
                        : "bg-neutral-200 text-neutral-600"
                    }`}
                  >
                    <Bot className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-black text-sm uppercase">
                        {agent.name}
                      </h4>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black border border-black ${
                          isActive
                            ? "bg-[#d6ff38] text-black"
                            : "bg-neutral-200 text-black"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isActive ? "bg-black animate-pulse" : "bg-neutral-500"
                          }`}
                        />
                        {isActive ? "ACTIVE" : "STANDBY"}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-black/70">{agent.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-base font-mono font-black text-black">
                    {agent.callsToday}
                  </div>
                  <div className="text-[10px] font-bold text-black/60 uppercase">calls dialed</div>
                </div>
              </div>

              {/* Attributes / Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-black mt-3 pt-3 border-t-2 border-black/10">
                <div className="flex items-center gap-1 bg-[#fcffe0] px-2.5 py-1 rounded-lg border border-black text-[11px]">
                  <Mic className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                  <span>Voice: <strong>{agent.voice.name}</strong></span>
                </div>

                <div className="flex items-center gap-1 bg-neutral-100 px-2.5 py-1 rounded-lg border border-black text-[11px]">
                  <Globe className="w-3.5 h-3.5 text-black stroke-[2.5]" />
                  <span>{agent.language}</span>
                </div>

                <div className="ml-auto flex items-center gap-1 text-xs font-black bg-[#d6ff38] px-2 py-0.5 rounded border border-black">
                  <Sparkles className="w-3 h-3 stroke-[3]" />
                  <span>{agent.accuracy}% accuracy</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Link */}
      <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-bold text-black/70">
        <span>Capacity: 500 concurrent callers per agent</span>
        <button
          onClick={onCreateAgent}
          className="text-black hover:text-blue-700 font-black inline-flex items-center gap-1 underline cursor-pointer"
        >
          Configure Voices
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
}
