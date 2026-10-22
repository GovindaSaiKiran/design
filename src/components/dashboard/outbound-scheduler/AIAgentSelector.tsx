"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bot,
  ExternalLink,
  Volume2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Info,
  SlidersHorizontal,
  Mic,
  Play,
  Pause,
  AlertTriangle,
} from "lucide-react";
import { DashboardAgent } from "@/types/dashboard";
import { mockAgents } from "@/data/mock/dashboardData";
import { soundSynth } from "@/lib/audio-synth";

interface AIAgentSelectorProps {
  selectedAgentId: string;
  onSelectAgent: (agentId: string) => void;
  campaignInstructions: string;
  onChangeCampaignInstructions: (instructions: string) => void;
  openingScript: string;
  onChangeOpeningScript: (script: string) => void;
}

export default function AIAgentSelector({
  selectedAgentId,
  onSelectAgent,
  campaignInstructions,
  onChangeCampaignInstructions,
  openingScript,
  onChangeOpeningScript,
}: AIAgentSelectorProps) {
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const selectedAgent =
    mockAgents.find((a) => a.id === selectedAgentId) || mockAgents[0];

  const handleToggleVoicePreview = (agentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingVoiceId === agentId) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(agentId);
      try {
        soundSynth.play("confirm");
      } catch {}
      setTimeout(() => {
        setPlayingVoiceId(null);
      }, 3000);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707684]">
            Step 2 · Conversational Intelligence
          </span>
          <span className="text-xs text-[#283A50]/30">•</span>
          <span className="text-xs text-[#707684]">Choose Your Telephony AI Representative</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#283A50] mt-0.5">
          Select AI Voice Agent
        </h3>
        <p className="text-xs text-[#707684] mt-0.5 leading-relaxed">
          Select an existing agent from your workforce. Voice timbre, language capabilities, and foundational reasoning are reused automatically.
        </p>
      </div>

      {/* Agents Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {mockAgents.map((agent) => {
          const isSelected = agent.id === selectedAgentId;
          const isPlaying = playingVoiceId === agent.id;

          return (
            <div
              key={agent.id}
              onClick={() => onSelectAgent(agent.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer text-left relative flex flex-col justify-between ${
                isSelected
                  ? "bg-[#FAF5E9]/50 border-[#283A50] shadow-sm ring-1 ring-[#283A50]"
                  : "bg-white border-[#E9E1D4] hover:border-[#283A50]/40 hover:bg-[#FAF5E9]/20"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        isSelected
                          ? "bg-[#283A50] text-[#FAF5E9]"
                          : "bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]"
                      }`}
                    >
                      {agent.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#283A50] leading-tight">
                        {agent.name.split("—")[0].trim()}
                      </h4>
                      <p className="text-[10px] text-[#707684] line-clamp-1 mt-0.5">
                        {agent.role.split("Specialist")[0].trim()}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "border-[#283A50] bg-[#283A50] text-white"
                        : "border-[#E9E1D4] bg-white"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                </div>

                <div className="mt-3 space-y-1.5 text-[11px] text-[#707684]">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-medium">Voice Model:</span>
                    <span className="font-bold text-[#283A50]">{agent.voice.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-medium">Languages:</span>
                    <span className="text-[#283A50] font-medium line-clamp-1 text-right max-w-[120px]">
                      {agent.language}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-medium">Accuracy Rating:</span>
                    <span className="text-[#2E8066] font-bold">{agent.accuracy}% Zero-Hallucination</span>
                  </div>
                </div>
              </div>

              {/* Voice Sample Play Button */}
              <div className="mt-3.5 pt-2.5 border-t border-[#E9E1D4]/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => handleToggleVoicePreview(agent.id, e)}
                  className={`px-2 py-1 rounded-md text-[10px] font-semibold border flex items-center gap-1.5 transition-colors ${
                    isPlaying
                      ? "bg-[#283A50] text-white border-[#283A50]"
                      : "bg-[#FAF5E9] text-[#283A50] border-[#E9E1D4] hover:bg-[#FAF5E9]/80"
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-2.5 h-2.5" />
                      <span>Playing Voice...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-2.5 h-2.5" />
                      <span>Listen to Voice</span>
                    </>
                  )}
                </button>

                <span className="text-[10px] text-[#707684]">{agent.department}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Agent Summary & Readiness Dossier */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1D4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50] font-bold text-xs">
              {selectedAgent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs text-[#283A50]">{selectedAgent.name}</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#2E8066] border border-[#B8DEC8] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2E8066] animate-pulse" />
                  Readiness Validated
                </span>
              </div>
              <p className="text-[11px] text-[#707684]">{selectedAgent.role}</p>
            </div>
          </div>

          <Link
            href={`/dashboard/agents?id=${selectedAgent.id}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF5E9] hover:bg-[#FAF5E9]/80 text-[#283A50] border border-[#E9E1D4] text-[11px] font-semibold transition-colors"
          >
            <span>View &amp; Edit in AI Agents</span>
            <ExternalLink className="w-3 h-3 text-[#707684]" />
          </Link>
        </div>

        {/* Readiness Checklist */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF5E9]/40 p-3 rounded-xl border border-[#E9E1D4]/80 text-[11px]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8066] shrink-0" />
            <span className="text-[#283A50] font-medium">Neural Voice Synced</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8066] shrink-0" />
            <span className="text-[#283A50] font-medium">Sub-150ms Telephony SLA</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8066] shrink-0" />
            <span className="text-[#283A50] font-medium">Bilingual Auto Code-Switch</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8066] shrink-0" />
            <span className="text-[#283A50] font-medium">Guardrail Grounding Active</span>
          </div>
        </div>

        {/* Campaign-Specific Opening Script */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#283A50]">
              Campaign Opening Script (First 5 Seconds)
            </label>
            <span className="text-[10px] text-[#707684]">
              Available variables: <code className="bg-[#FAF5E9] px-1 py-0.5 rounded text-[#283A50] font-mono">{"{name}"}</code>, <code className="bg-[#FAF5E9] px-1 py-0.5 rounded text-[#283A50] font-mono">{"{organization}"}</code>
            </span>
          </div>
          <textarea
            rows={2}
            value={openingScript}
            onChange={(e) => onChangeOpeningScript(e.target.value)}
            className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl p-3 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white resize-none"
            placeholder="e.g. Hello {name}, this is Maya from Admissions at Apex Global. I'm calling regarding your scholarship verification."
          />
        </div>

        {/* Campaign-Specific Supplementary Instructions */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-[#283A50]">
              Campaign-Specific Instructions
            </label>
            <span className="text-[10px] text-[#707684]">
              Guards this outbound run only · Original agent remains unmodified
            </span>
          </div>
          <textarea
            rows={2}
            value={campaignInstructions}
            onChange={(e) => onChangeCampaignInstructions(e.target.value)}
            className="w-full bg-[#FAF5E9]/30 border border-[#E9E1D4] rounded-xl p-3 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50] focus:bg-white resize-none"
            placeholder="e.g. Prioritize Saturday 11 AM campus tour booking. If candidate asks about hostel, explain AC twin room pricing."
          />
        </div>
      </div>
    </div>
  );
}
