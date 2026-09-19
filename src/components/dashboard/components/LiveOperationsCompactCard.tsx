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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCallSeconds((prev) => prev + 1);
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
    <div className="w-full space-y-3.5 select-none">
      {/* 1. REAL-TIME LIVE CALLING MONITOR & AUDIO EQUALIZER (Refined & Light) */}
      <div className="bg-white rounded-xl p-4 border-[1.5px] border-black shadow-[3px_3px_0px_#000000]">
        {/* Header: Live Status Badge + Mode */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#d6ff38] text-black border border-black shadow-[1px_1px_0px_#000000]">
              <span className="w-2 h-2 rounded-full bg-black inline-block animate-pulse" />
              LIVE DIALER
            </span>
            <span className="text-[11px] font-semibold text-neutral-600">Line 1</span>
          </div>

          <span className="text-[11px] font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
            {formatSeconds(activeCallSeconds)}
          </span>
        </div>

        {/* Current Caller Info */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#d6ff38] text-black border border-black flex items-center justify-center font-bold text-xs shrink-0 shadow-[1px_1px_0px_#000000]">
              <PhoneIncoming className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-neutral-950 text-xs">
                  Rahul Sharma
                </h4>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-neutral-100 text-neutral-700 border border-neutral-200">
                  B.Tech CSE
                </span>
              </div>
              <p className="text-[11px] font-mono text-neutral-500">
                +91 98401 77120
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] font-bold text-neutral-400 uppercase block">AI Agent</span>
            <span className="text-xs font-bold text-neutral-900">Maya AI</span>
          </div>
        </div>

        {/* Live Audio Frequency Bars */}
        <div className="p-2.5 rounded-lg bg-neutral-950 text-white mb-3 border border-black">
          <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            <span className="flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-[#d6ff38]" /> Audio Frequency
            </span>
            <span className="text-[#d6ff38] font-mono text-[10px]">142ms Latency</span>
          </div>

          <div className="flex items-end justify-between gap-1 h-7 px-1">
            {[45, 80, 60, 95, 30, 75, 100, 85, 40, 90, 65, 80, 100, 70, 50, 85, 95, 60, 40, 75].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                className={`flex-1 rounded-xs transition-all duration-150 ${
                  i % 2 === 0 ? "bg-[#d6ff38]" : "bg-neutral-300"
                }`}
              />
            ))}
          </div>

          <p className="text-[11px] text-neutral-300 font-medium italic truncate mt-1.5">
            &ldquo;Can we book a campus visit this Saturday to see AI Labs?&rdquo;
          </p>
        </div>

        {/* Inspect Live Call Button */}
        <button
          onClick={onOpenLiveCallModal}
          className="w-full py-2 rounded-lg bg-white hover:bg-neutral-50 text-black font-bold text-xs border border-black shadow-[1.5px_1.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Radio className="w-3.5 h-3.5 stroke-[2]" />
          <span>Inspect Live Dialogue</span>
        </button>
      </div>

      {/* 2. DEDICATED AI CALLING WORKFORCE */}
      <div className="bg-white rounded-xl p-4 border-[1.5px] border-black shadow-[3px_3px_0px_#000000]">
        <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-neutral-900 text-[#d6ff38]">
                Workforce
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#d6ff38] text-black border border-black">
                3 Active
              </span>
            </div>
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-tight mt-1">
              Active Calling Agents
            </h3>
          </div>

          <button
            onClick={onCreateAgent}
            className="p-1 rounded-md bg-[#d6ff38] hover:bg-[#cbf72e] text-black border border-black shadow-[1px_1px_0px_#000000] cursor-pointer transition-all"
            title="Create New Agent"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Agents Mini List */}
        <div className="space-y-2">
          {agents.slice(0, 3).map((agent) => (
            <div
              key={agent.id}
              className="p-2 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-2 hover:border-black transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-md bg-neutral-900 text-[#d6ff38] flex items-center justify-center font-bold text-xs shrink-0">
                  <Bot className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-neutral-900 text-xs truncate">
                    {agent.name}
                  </div>
                  <div className="text-[10px] text-neutral-500 truncate">
                    {agent.role}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-neutral-900 block">
                  {agent.callsToday}
                </span>
                <span className="text-[9px] text-neutral-400 uppercase">calls</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 1-CLICK FAST TOOLS */}
      <div className="bg-white rounded-xl p-4 border-[1.5px] border-black shadow-[3px_3px_0px_#000000] space-y-2">
        <h3 className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider pb-1.5 border-b border-neutral-200">
          ⚡ Fast Actions
        </h3>

        {testCallSent && (
          <div className="p-2 rounded-lg bg-[#d6ff38] border border-black text-black text-[11px] font-bold uppercase animate-in fade-in flex items-center gap-1.5 shadow-[1px_1px_0px_#000000]">
            <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
            Test call triggered to your registered number!
          </div>
        )}

        <button
          onClick={onStartCampaign}
          className="w-full py-2 px-2.5 rounded-lg bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-black shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all"
        >
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 stroke-[2]" />
            <span>Launch Urgent Batch</span>
          </span>
          <span className="text-[10px] font-medium text-neutral-500">Batch #5</span>
        </button>

        <button
          onClick={onUploadKnowledge}
          className="w-full py-2 px-2.5 rounded-lg bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-black shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all"
        >
          <span className="flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 stroke-[2]" />
            <span>Upload Fee Brochure PDF</span>
          </span>
          <span className="text-[10px] font-medium text-neutral-500">RAG</span>
        </button>

        <button
          onClick={handleTestCall}
          className="w-full py-2 px-2.5 rounded-lg bg-[#d6ff38] hover:bg-[#cbf72e] text-black border border-black shadow-[1.5px_1.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 text-xs font-bold uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all"
        >
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 stroke-[2]" />
            <span>Test Call My Phone</span>
          </span>
          <span className="text-[10px] font-bold underline">Instant</span>
        </button>
      </div>
    </div>
  );
}
