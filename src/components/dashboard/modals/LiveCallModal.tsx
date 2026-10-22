"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Bot,
  User,
  PhoneForwarded,
  Volume2,
  CheckCircle2,
  Activity,
  BookOpen,
  Database,
  Sparkles,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface LiveCallModalProps {
  call: {
    id: string;
    callerNumber: string;
    callerName?: string;
    agentName: string;
    duration?: number;
    durationSeconds?: number;
    latencyMs: number;
    currentSentiment: "positive" | "neutral" | "negative" | "urgent" | "frustrated";
    knowledgeDomain?: string;
    knowledgeDomainLabel?: string;
    groundedDocTitle?: string;
    groundedChunkRef?: string;
    knowledgeFactRetrieved?: string;
    transcript: Array<{
      speaker: "agent" | "caller" | "system";
      text: string;
      time: string;
    }>;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onHumanHandoff?: () => void;
}

export default function LiveCallModal({
  call,
  isOpen,
  onClose,
  onHumanHandoff,
}: LiveCallModalProps) {
  const [seconds, setSeconds] = useState(call ? (call.durationSeconds ?? call.duration ?? 0) : 0);
  const [handoffSuccess, setHandoffSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen || !call) return;
    setSeconds(call.durationSeconds ?? call.duration ?? 0);
    setHandoffSuccess(false);

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, call]);

  if (!isOpen || !call) return null;

  const formattedDuration = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  const handleClose = () => {
    try {
      soundSynth.play("click");
    } catch {}
    onClose();
  };

  const handleTakeover = () => {
    try {
      soundSynth.play("confirm");
    } catch {}
    setHandoffSuccess(true);
    onHumanHandoff?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="relative w-full max-w-2xl bg-white rounded-[28px] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 sm:p-7 overflow-hidden flex flex-col max-h-[90vh] text-[#1A1A1A]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-[#C1F2D5] text-[#16856B] flex items-center justify-center shadow-xs">
                <Phone className="w-4 h-4 text-[#16856B]" />
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#16856B] ring-2 ring-white animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#1A1A1A] tracking-tight">
                  {call.callerNumber}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#C1F2D5] text-[#16856B] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16856B] animate-pulse" />
                  Active Call
                </span>
              </div>
              <p className="text-xs text-black/55 mt-0.5">
                Caller: <span className="text-[#1A1A1A] font-medium">{call.callerName || "Verified Contact"}</span> • Agent: <strong className="text-[#1A1A1A]">{call.agentName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="text-xs font-mono font-bold text-[#1A1A1A] bg-[#FBF7ED] px-3.5 py-1.5 rounded-full border border-black/[0.06]">
              {formattedDuration}
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="p-2 rounded-full text-black/40 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Acoustic Waveform & Latency Bar */}
        <div className="my-3.5 p-3.5 rounded-2xl bg-[#FBF7ED] border border-black/[0.06] flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-4 h-4 text-[#1A1A1A]" />
            <span className="text-xs font-semibold text-[#1A1A1A]">Live Acoustic Stream:</span>
            {/* Animated Waveform */}
            <div className="flex items-center gap-1 h-5 px-1">
              <span className="w-1 bg-[#111111] rounded-full h-2.5 animate-pulse" />
              <span className="w-1 bg-[#111111] rounded-full h-4 animate-pulse delay-75" />
              <span className="w-1 bg-[#111111] rounded-full h-5 animate-pulse delay-150" />
              <span className="w-1 bg-[#111111] rounded-full h-3 animate-pulse delay-200" />
              <span className="w-1 bg-[#111111] rounded-full h-4 animate-pulse delay-300" />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-black/55">
            <span>Latency: <strong className="text-[#1A1A1A] font-semibold">{call.latencyMs}ms</strong></span>
            <span>Sentiment: <strong className="text-[#16856B] font-semibold capitalize">{call.currentSentiment}</strong></span>
          </div>
        </div>

        {/* Knowledge Base Grounding Card */}
        {call.groundedDocTitle && (
          <div className="my-2 p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 text-xs shrink-0 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-[11px] uppercase tracking-wider text-indigo-900 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Knowledge Domain: {call.knowledgeDomainLabel || call.knowledgeDomain}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-indigo-800 border border-indigo-200 flex items-center gap-1">
                <Database className="w-3 h-3 text-indigo-600" />
                <span>RAG Vector Grounded</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-indigo-950 font-medium text-[11.5px]">
              <span className="text-black/50 text-[10px]">Active Document:</span>
              <span className="font-mono font-semibold bg-white/80 px-2 py-0.5 rounded border border-indigo-200/60 truncate">
                {call.groundedDocTitle}
              </span>
              {call.groundedChunkRef && (
                <span className="text-[10px] text-indigo-700 font-semibold truncate hidden sm:inline">
                  • {call.groundedChunkRef}
                </span>
              )}
            </div>
            {call.knowledgeFactRetrieved && (
              <p className="text-[11px] text-indigo-900/80 bg-white/90 p-2 rounded-xl border border-indigo-100 italic">
                &ldquo;{call.knowledgeFactRetrieved}&rdquo;
              </p>
            )}
          </div>
        )}

        {/* Live Transcript Log */}
        <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-[#FBF7ED]/60 rounded-2xl border border-black/[0.06] my-2 text-xs">
          {call.transcript.map((item, idx) => {
            const isAgent = item.speaker === "agent";
            const isSystem = item.speaker === "system";

            if (isSystem) {
              return (
                <div key={idx} className="text-center my-2">
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-medium text-black/55 bg-white border border-black/[0.06]">
                    {item.text}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${
                  isAgent ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    isAgent
                      ? "bg-[#D9C2FA] text-[#1A1A1A]"
                      : "bg-[#C1F2D5] text-[#16856B]"
                  }`}
                >
                  {isAgent ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isAgent
                      ? "bg-white border border-black/[0.06] text-[#1A1A1A] shadow-2xs"
                      : "bg-[#111111] text-white"
                  }`}
                >
                  <div className={`flex items-center justify-between gap-2 mb-1 text-[10px] ${
                    isAgent ? "text-black/45" : "text-white/60"
                  }`}>
                    <span className="font-semibold">{isAgent ? call.agentName : (call.callerName || "Candidate")}</span>
                    <span>{item.time}</span>
                  </div>
                  <p className="font-normal">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Handoff Notice Banner */}
        {handoffSuccess && (
          <div className="p-3.5 my-2 rounded-2xl bg-[#C1F2D5]/50 border border-[#16856B]/20 text-[#16856B] text-xs flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#16856B]" />
              Transfer initiated! Connecting candidate to Human Counselor Desk.
            </span>
            <span className="text-[10px] font-bold bg-[#16856B] text-white px-2.5 py-0.5 rounded-full">Queue #01</span>
          </div>
        )}

        {/* Modal Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] shrink-0 gap-3">
          <button
            onClick={handleTakeover}
            disabled={handoffSuccess}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs ${
              handoffSuccess
                ? "bg-black/5 text-black/30 border border-black/[0.04] cursor-not-allowed"
                : "bg-white text-[#1A1A1A] hover:bg-[#FAF3E4] border border-black/[0.08]"
            }`}
          >
            <PhoneForwarded className="w-3.5 h-3.5" />
            <span>{handoffSuccess ? "Transfer In Progress" : "Transfer to Human Desk"}</span>
          </button>

          <button
            onClick={handleClose}
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#111111] hover:bg-black transition-all cursor-pointer shadow-sm"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
