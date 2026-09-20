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
    <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-7 border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] font-sans select-none flex flex-col justify-between">
      {/* Module Header */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-black/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Voice Workforce
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              3 Active AI Lines
            </span>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 tracking-tight mt-1">
            AI Voice Agents Fleet
          </h3>
          <p className="text-xs text-neutral-500">
            Automated counseling specialists with verified prospectus RAG intelligence
          </p>
        </div>

        <button
          onClick={onCreateAgent}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create AI Agent</span>
        </button>
      </div>

      {/* Agents List / Cards */}
      <div className="space-y-3.5">
        {agents.map((agent) => {
          return (
            <div
              key={agent.id}
              onClick={() => onSelectAgent?.(agent)}
              className="group p-4.5 rounded-2xl bg-neutral-50/80 border border-black/10 hover:border-black/30 hover:bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer relative overflow-hidden"
            >
              {/* Top Row: Name + Status */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center font-semibold text-sm bg-neutral-900 text-white shadow-xs group-hover:scale-105 transition-transform"
                  >
                    <Bot className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-neutral-900 text-sm sm:text-base group-hover:text-blue-600 transition-colors">
                        {agent.name}
                      </h4>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border bg-emerald-50 text-emerald-800 border-emerald-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">{agent.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-mono font-semibold text-neutral-900">
                    {agent.callsToday}
                  </div>
                  <div className="text-[10px] font-medium text-neutral-400 uppercase">calls dialed</div>
                </div>
              </div>

              {/* Attributes / Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 mt-3 pt-3 border-t border-black/5">
                <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-black/5 text-[11px] shadow-xs">
                  <Mic className="w-3 h-3 text-neutral-400" />
                  <span>Voice: <strong>{agent.voice.name}</strong></span>
                </div>

                <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-black/5 text-[11px] shadow-xs">
                  <Globe className="w-3 h-3 text-neutral-400" />
                  <span>{agent.language}</span>
                </div>

                <div className="ml-auto flex items-center gap-1 text-xs font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{agent.accuracy}% accuracy</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Link */}
      <div className="mt-5 pt-3 border-t border-black/10 flex items-center justify-between text-xs text-neutral-500">
        <span>Capacity: 500 concurrent callers per agent</span>
        <button
          onClick={onCreateAgent}
          className="text-neutral-900 hover:text-blue-600 font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
        >
          <span>Configure Personas</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
