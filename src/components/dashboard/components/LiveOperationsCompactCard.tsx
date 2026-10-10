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
  ShieldCheck,
  Globe
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

  return (
    <div className="w-full space-y-6 select-none font-sans">
      {/* 1. REAL-TIME LIVE CALLING MONITOR */}
      <div className="bg-neutral-900 text-white rounded-3xl p-6 border border-black/20 shadow-xl relative overflow-hidden group">
        {/* Header: Live Status Badge + Timer */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                liveCalls.length > 0
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/10 text-neutral-400 border border-white/10"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full inline-block ${
                  liveCalls.length > 0 ? "bg-emerald-400 animate-ping" : "bg-neutral-500"
                }`}
              />
              {liveCalls.length > 0 ? `Live Channel (${liveCalls.length})` : "Telephony Standby"}
            </span>
            <span className="text-xs text-neutral-400 font-medium">
              {liveCalls.length > 0 ? "Call In Progress" : "0 Channels Active"}
            </span>
          </div>

          <span className="text-xs font-mono font-semibold text-neutral-300 bg-white/10 px-3 py-1 rounded-xl border border-white/10">
            {liveCalls.length > 0 ? `⏱ ${formatSeconds(activeCallSeconds)}` : "Idle"}
          </span>
        </div>

        {liveCalls.length > 0 ? (
          <>
            {/* Current Caller Info */}
            <div className="flex items-start justify-between gap-3 mb-5 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full sarvam-disc-periwinkle flex items-center justify-center shrink-0 shadow-md animate-spin-slow">
                  <div className="w-4 h-4 rounded-full bg-white/90" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-white text-xs sm:text-sm">
                      {liveCalls[0].callerName}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-blue-300 border border-white/10">
                      {liveCalls[0].channel}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-400 mt-0.5">
                    {liveCalls[0].callerPhone}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-neutral-400 uppercase font-medium block">Agent</span>
                <span className="text-xs font-semibold text-neutral-200 bg-white/10 px-2.5 py-0.5 rounded-lg border border-white/10 inline-block mt-0.5">
                  {liveCalls[0].agentName}
                </span>
              </div>
            </div>

            {/* Live Audio Frequency Equalizer */}
            <div className="p-4 rounded-2xl bg-black/60 text-white mb-4 border border-white/10 relative">
              <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" /> Neural Voice Stream
                </span>
                <span className="text-emerald-400 font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded border border-white/10">
                  {liveCalls[0].latency} Latency
                </span>
              </div>

              <div className="flex items-end justify-between gap-1 h-8 px-1">
                {waveformHeights.map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="flex-1 rounded-t bg-gradient-to-t from-blue-600 via-indigo-400 to-cyan-300 transition-all duration-300 opacity-90 hover:opacity-100"
                  />
                ))}
              </div>

              <p className="text-[11px] text-neutral-300 font-normal italic truncate mt-3 border-t border-white/10 pt-2.5">
                &ldquo;{liveCalls[0].liveTranscript}&rdquo;
              </p>
            </div>

            <button
              onClick={onOpenLiveCallModal}
              className="w-full py-3 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 font-semibold text-xs shadow-md transition-all inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Radio className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span>Listen In Live Stream</span>
            </button>
          </>
        ) : (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-neutral-200">No active calls in progress</p>
              <p className="text-[11px] text-neutral-400 mt-1 max-w-xs mx-auto">
                Telephony trunks are ready. Launch a campaign or dial an outbound test call to view live audio telemetry.
              </p>
            </div>
            <button
              onClick={onStartCampaign}
              className="mt-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 inline-flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Start Outbound Call</span>
            </button>
          </div>
        )}
      </div>

      {/* 2. MULTILINGUAL VOICE AGENTS FLEET */}
      <div className="liquid-glass-card rounded-3xl p-6 hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-black/10">
          <div>
            <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              AI Voice Personas
            </h3>
            <p className="text-[11px] text-neutral-500">
              {agents.length} autonomous voice agents deployed
            </p>
          </div>

          <button
            onClick={onCreateAgent}
            className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 border border-black/5 flex items-center justify-center cursor-pointer shadow-xs transition-all active:scale-95"
            title="Deploy New Persona"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Agents Mini List */}
        <div className="space-y-2.5">
          {agents.length === 0 ? (
            <div className="p-5 rounded-2xl bg-neutral-50 border border-black/5 text-center space-y-2">
              <Bot className="w-7 h-7 text-neutral-300 mx-auto" />
              <p className="text-xs font-semibold text-neutral-700">No AI employees configured</p>
              <p className="text-[11px] text-neutral-400">
                Build your first persona to start handling customer calls.
              </p>
              <button
                onClick={onCreateAgent}
                className="mt-1 px-3 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-medium inline-flex items-center gap-1 cursor-pointer hover:bg-neutral-800"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Persona</span>
              </button>
            </div>
          ) : (
            agents.map((ag) => (
              <div
                key={ag.id}
                className="p-3.5 rounded-2xl bg-neutral-50/80 hover:bg-white border border-black/5 hover:border-black/20 flex items-center justify-between gap-3 shadow-xs transition-all cursor-default"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full sarvam-disc-periwinkle flex items-center justify-center shrink-0 shadow-xs">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-neutral-900 text-xs truncate">
                      {ag.name}
                    </div>
                    <div className="text-[10px] text-neutral-500 truncate">
                      {ag.languages.join(", ")} • {ag.role}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-semibold text-neutral-900 block">
                    {ag.totalCallsHandled}
                  </span>
                  <span className="text-[9px] text-neutral-400 uppercase">calls</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 3. OPERATOR QUICK ACTIONS */}
      <div className="liquid-glass-card rounded-3xl p-6 hover:shadow-lg transition-all duration-200 space-y-3 mt-6">
        <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider pb-3 border-b border-black/10 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          Operator Actions
        </h3>

        <button
          onClick={onStartCampaign}
          className="w-full py-3 px-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all flex items-center justify-between cursor-pointer active:scale-95"
        >
          <span className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>Launch Outbound Campaign</span>
          </span>
          <span className="text-[10px] font-mono bg-white/10 text-neutral-300 px-2.5 py-0.5 rounded-lg border border-white/10">Queue: 0</span>
        </button>

        <button
          onClick={onUploadKnowledge}
          className="w-full py-3 px-4 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-black/5 text-xs font-semibold flex items-center justify-between cursor-pointer transition-all active:scale-95"
        >
          <span className="flex items-center gap-2">
            <Upload className="w-3.5 h-3.5 text-neutral-500" />
            <span>Upload Knowledge Document</span>
          </span>
          <span className="text-[10px] font-medium text-neutral-500 bg-white px-2 py-0.5 rounded-md border border-black/5">Vector RAG</span>
        </button>
      </div>
    </div>
  );
}
