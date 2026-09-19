"use client";

import React, { useState, useEffect } from "react";
import {
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Bot,
  User,
  Sparkles,
  CheckCircle2,
  Clock,
  Radio,
  Zap,
  Play,
  Plus,
  Upload,
  Phone,
  Volume2,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { DashboardAgent, LiveCallItem } from "@/types/dashboard";

interface LiveOperationsCompactCardProps {
  agents: DashboardAgent[];
  liveCalls: LiveCallItem[];
  onOpenLiveCallModal: () => void;
  onCreateAgent: () => void;
  onStartCampaign: () => void;
  onUploadKnowledge: () => void;
}

export default function LiveOperationsCompactCard({
  agents,
  liveCalls,
  onOpenLiveCallModal,
  onCreateAgent,
  onStartCampaign,
  onUploadKnowledge,
}: LiveOperationsCompactCardProps) {
  const [activeCallSeconds, setActiveCallSeconds] = useState(222); // 3m 42s
  const [testCallSent, setTestCallSent] = useState(false);
  const [waveformHeights, setWaveformHeights] = useState([
    45, 80, 60, 95, 30, 75, 100, 85, 40, 90, 65, 80, 100, 70, 50, 85, 95, 60, 40, 75
  ]);

  // Real-time ticking and dancing audio waves
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCallSeconds((prev) => prev + 1);
      // Randomize waveform bars subtly for live audio effect
      setWaveformHeights((prev) =>
        prev.map(() => Math.floor(Math.random() * 75) + 25)
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleTestCall = () => {
    setTestCallSent(true);
    setTimeout(() => setTestCallSent(false), 3000);
  };

  return (
    <div className="w-full space-y-5 select-none font-sans">
      {/* 1. REAL-TIME LIVE CALLING MONITOR & DANCING AUDIO EQUALIZER */}
      <div className="bg-black text-white rounded-2xl p-5 border-[2.5px] border-black shadow-[6px_6px_0px_#000000] relative overflow-hidden group">
        {/* Header: Live Status Badge + Mode */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b-2 border-neutral-800 relative z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-black bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#ffffff]">
              <span className="w-2 h-2 rounded-full bg-black inline-block animate-ping" />
              Live Line 1
            </span>
            <span className="text-xs text-neutral-300 font-bold">Inbound Session</span>
          </div>

          <span className="text-xs font-mono font-black text-black bg-[#ffe600] px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#ffffff]">
            ⏱ {formatSeconds(activeCallSeconds)}
          </span>
        </div>

        {/* Current Caller Info */}
        <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff] text-black flex items-center justify-center font-black text-xs shrink-0 border-2 border-black shadow-[2px_2px_0px_#ffffff]">
              <PhoneIncoming className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-black text-white text-xs sm:text-sm">
                  Rahul Sharma
                </h4>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-black bg-neutral-800 text-[#d6ff38] border border-neutral-700">
                  CBSE 94%
                </span>
              </div>
              <p className="text-[11px] font-mono text-neutral-400 font-bold">
                +91 98401 77120
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-neutral-400 uppercase font-black block">Counselor</span>
            <span className="text-xs font-black text-black bg-[#d6ff38] px-2 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_#ffffff]">
              Maya AI
            </span>
          </div>
        </div>

        {/* Live Audio Frequency Bars with Dynamic Dancing Effect */}
        <div className="p-3.5 rounded-xl bg-neutral-900 text-white mb-4 border-2 border-neutral-800 shadow-inner relative">
          <div className="flex items-center justify-between text-[10px] font-black text-neutral-300 uppercase tracking-wider mb-2.5">
            <span className="flex items-center gap-1.5 text-[#d6ff38]">
              <Volume2 className="w-3.5 h-3.5 animate-pulse stroke-[2.5]" /> Neural Voice Stream
            </span>
            <span className="text-black font-mono font-black text-[10px] bg-[#00f0ff] px-2 py-0.5 rounded border border-black">382ms Latency</span>
          </div>

          <div className="flex items-end justify-between gap-1 h-8 px-1">
            {waveformHeights.map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className="flex-1 rounded-t bg-[#d6ff38] transition-all duration-300 shadow-[0_0_6px_rgba(214,255,56,0.6)]"
              />
            ))}
          </div>

          <p className="text-[11px] text-white font-bold italic truncate mt-2.5 border-t border-neutral-800 pt-2">
            &ldquo;Rahul, your 35% Chancellor Scholarship is pre-approved for CSE!&rdquo;
          </p>
        </div>

        {/* Inspect Live Call Button */}
        <button
          onClick={onOpenLiveCallModal}
          className="w-full py-2.5 rounded-xl bg-[#d6ff38] hover:bg-[#ffe600] text-black font-black text-xs border-2.5 border-black shadow-[3px_3px_0px_#ffffff] hover:shadow-[4px_4px_0px_#ffffff] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#ffffff] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <Radio className="w-4 h-4 animate-spin stroke-[2.5]" />
          <span>Listen In Live Stream</span>
        </button>
      </div>

      {/* 2. DEDICATED AI CALLING WORKFORCE */}
      <div className="bg-white rounded-2xl p-4.5 border-[2.5px] border-black shadow-[5px_5px_0px_#000000]">
        <div className="flex items-center justify-between pb-3 mb-3.5 border-b-2 border-black">
          <div>
            <h3 className="text-xs font-black text-black uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-black stroke-[2.5]" />
              Active AI Counselors
            </h3>
            <p className="text-[11px] text-black/70 font-bold">
              3 autonomous voice agents online
            </p>
          </div>

          <button
            onClick={onCreateAgent}
            className="w-8 h-8 rounded-xl bg-[#d6ff38] hover:bg-[#ffe600] text-black border-2 border-black shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] flex items-center justify-center cursor-pointer transition-all"
            title="Create New Agent"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Agents Mini List with Neo-Brutalist Badges */}
        <div className="space-y-2.5">
          {agents.slice(0, 3).map((agent, index) => {
            const avatarBgs = [
              "bg-[#c084fc] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
              "bg-[#ffe600] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
              "bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]"
            ];
            const colorClass = avatarBgs[index % avatarBgs.length];

            return (
              <div
                key={agent.id}
                className="p-2.5 rounded-xl bg-white hover:bg-[#d6ff38]/20 border-2 border-black shadow-[2.5px_2.5px_0px_#000000] hover:shadow-[3.5px_3.5px_0px_#000000] hover:-translate-y-0.5 flex items-center justify-between gap-2.5 transition-all duration-150 cursor-default group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg ${colorClass} flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform`}>
                    <Bot className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-black text-black text-xs truncate group-hover:text-black">
                      {agent.name}
                    </div>
                    <div className="text-[10px] text-black/70 font-bold truncate">
                      {agent.role}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-black text-black block">
                    {agent.callsToday}
                  </span>
                  <span className="text-[9px] text-black/60 font-black uppercase">calls</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. OPERATOR ACTIONS */}
      <div className="bg-white rounded-2xl p-4.5 border-[2.5px] border-black shadow-[5px_5px_0px_#000000] space-y-3">
        <h3 className="text-xs font-black text-black uppercase tracking-wider pb-2 border-b-2 border-black flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          Operator Actions
        </h3>

        {testCallSent && (
          <div className="p-2.5 rounded-xl bg-[#d6ff38] border-2 border-black text-black text-xs font-black flex items-center gap-2 shadow-[2px_2px_0px_#000000] animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-black stroke-[3]" />
            <span>Test call triggered to your phone!</span>
          </div>
        )}

        <button
          onClick={onStartCampaign}
          className="w-full py-2.5 px-3.5 rounded-xl bg-black hover:bg-[#ffe600] text-white hover:text-black text-xs font-black border-2.5 border-black shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all flex items-center justify-between cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#ffe600] group-hover:text-black stroke-[2.5]" />
            <span>Start Outbound Batch</span>
          </span>
          <span className="text-[10px] font-mono bg-[#d6ff38] text-black px-2 py-0.5 rounded-md font-black border border-black">Queue: 194</span>
        </button>

        <button
          onClick={onUploadKnowledge}
          className="w-full py-2.5 px-3.5 rounded-xl bg-white hover:bg-[#00f0ff] text-black border-2.5 border-black text-xs font-black flex items-center justify-between cursor-pointer shadow-[3px_3px_0px_#000000] hover:shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all"
        >
          <span className="flex items-center gap-2">
            <Upload className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            <span>Upload Prospectus PDF</span>
          </span>
          <span className="text-[10px] font-black text-black bg-[#c084fc] px-2 py-0.5 rounded-md border border-black shadow-[1px_1px_0px_#000000]">Vector RAG</span>
        </button>
      </div>
    </div>
  );
}
