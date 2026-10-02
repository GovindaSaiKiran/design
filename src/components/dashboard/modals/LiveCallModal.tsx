"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  PhoneOff,
  User,
  Bot,
  Volume2,
  ShieldCheck,
  PhoneForwarded,
  Activity,
  Sparkles,
  MessageSquare,
  Radio,
} from "lucide-react";
import { LiveCallItem } from "@/types/dashboard";

interface LiveCallModalProps {
  call: LiveCallItem | null;
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
  const [seconds, setSeconds] = useState(0);
  const [handoffSuccess, setHandoffSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setHandoffSuccess(false);
      return;
    }
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen || !call) return null;

  const totalSec = call.durationSeconds + seconds;
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  const formattedDuration = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  const handleTakeover = () => {
    setHandoffSuccess(true);
    onHumanHandoff?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col max-h-[90vh] text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center shadow-xs">
                <Phone className="w-6 h-6 stroke-[2]" />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#8ac926] border-2 border-white animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 font-mono tracking-tight">
                  {call.callerNumber}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#cdfb56]/40 text-slate-950 border border-[#cdfb56] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926] animate-ping" />
                  Live Voice Session
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Candidate: <span className="text-slate-900 font-semibold">{call.callerName || "Verified Applicant"}</span> • Agent: <strong className="text-slate-950 font-bold">{call.agentName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="font-mono text-xs font-bold text-slate-800 bg-[#f7fee7] px-3 py-1.5 rounded-xl border border-[#cdfb56]/60">
              {formattedDuration}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-100 hover:bg-[#cdfb56] text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Acoustic Waveform & Latency Bar */}
        <div className="my-4 p-4 rounded-2xl bg-slate-950 text-white shadow-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-4 h-4 text-[#cdfb56]" />
            <span className="text-xs font-medium text-slate-300">Live Acoustic Stream:</span>
            {/* Animated Waveform */}
            <div className="flex items-center gap-1 h-6 px-1">
              <span className="w-1 bg-[#cdfb56] rounded-full h-3 animate-pulse" />
              <span className="w-1 bg-[#bef03f] rounded-full h-5 animate-pulse delay-75" />
              <span className="w-1 bg-[#8ac926] rounded-full h-6 animate-pulse delay-150" />
              <span className="w-1 bg-[#cdfb56] rounded-full h-4 animate-pulse delay-200" />
              <span className="w-1 bg-[#bef03f] rounded-full h-5 animate-pulse delay-300" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
            <span>Latency: <strong className="text-[#cdfb56]">{call.latencyMs}ms</strong></span>
            <span>Sentiment: <strong className="text-[#bef03f] uppercase">{call.currentSentiment}</strong></span>
          </div>
        </div>

        {/* Live Transcript Log */}
        <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-neutral-50/80 rounded-2xl border border-black/5 my-2">
          {call.transcript.map((item, idx) => {
            const isAgent = item.speaker === "agent";
            const isSystem = item.speaker === "system";

            if (isSystem) {
              return (
                <div key={idx} className="text-center my-2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-neutral-500 bg-neutral-200/60">
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
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                    isAgent
                      ? "bg-neutral-900 text-white"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {isAgent ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isAgent
                      ? "bg-white border border-black/10 text-neutral-800 shadow-xs"
                      : "bg-blue-600 text-white shadow-xs"
                  }`}
                >
                  <div className={`flex items-center justify-between gap-2 mb-1 text-[10px] font-mono ${
                    isAgent ? "text-neutral-400" : "text-blue-200"
                  }`}>
                    <span>{isAgent ? call.agentName : (call.callerName || "Candidate")}</span>
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
          <div className="p-3.5 my-2 rounded-2xl bg-[#f7fee7] border border-[#cdfb56] text-slate-900 text-xs font-medium flex items-center justify-between shadow-2xs">
            <span className="flex items-center gap-2">
              <PhoneForwarded className="w-4 h-4 text-[#8ac926]" />
              Transfer initiated! Connecting candidate to Senior Admissions Counselor.
            </span>
            <span className="font-mono text-xs font-bold bg-[#cdfb56] text-slate-950 px-2.5 py-0.5 rounded-full border border-[#bceb42]">Desk Queue #01</span>
          </div>
        )}

        {/* Modal Controls */}
        <div className="flex items-center justify-between pt-5 border-t border-slate-100 shrink-0 gap-3">
          <button
            onClick={handleTakeover}
            disabled={handoffSuccess}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-xs ${
              handoffSuccess
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 border border-[#bceb42] active:scale-95 shadow-xs"
            }`}
          >
            <PhoneForwarded className="w-3.5 h-3.5" />
            <span>{handoffSuccess ? "Transfer In Progress" : "Transfer to Human Counselor"}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-[#f7fee7] border border-slate-200 hover:border-[#cdfb56] transition-all cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
