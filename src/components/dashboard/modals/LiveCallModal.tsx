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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-4 border-black shadow-[10px_10px_0px_#000000] p-6 sm:p-7 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-3 border-black shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000000]">
                <Phone className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-black border border-white" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-black font-mono">
                  {call.callerNumber}
                </h3>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                  LIVE CALL
                </span>
              </div>
              <p className="text-xs font-bold text-black/70">
                Caller: <span className="text-black font-black">{call.callerName || "Verified Student"}</span> • Assigned to <strong className="text-black underline">{call.agentName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="font-mono text-sm font-black text-black bg-[#ffe600] px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000]">
              {formattedDuration}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-[#ff8080] text-black border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] transition-all cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Acoustic Waveform & Latency Bar */}
        <div className="my-4 p-3.5 rounded-xl bg-black text-white border-2 border-black shadow-[4px_4px_0px_#000000] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#d6ff38] stroke-[2.5]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#d6ff38]">Live Acoustic Stream:</span>
            {/* Animated Waveform */}
            <div className="flex items-center gap-1 h-6 px-1">
              <span className="w-1.5 bg-[#d6ff38] border border-black rounded-full h-3 animate-wave-1" />
              <span className="w-1.5 bg-[#00f0ff] border border-black rounded-full h-5 animate-wave-2" />
              <span className="w-1.5 bg-[#d6ff38] border border-black rounded-full h-6 animate-wave-3" />
              <span className="w-1.5 bg-[#ffe600] border border-black rounded-full h-4 animate-wave-4" />
              <span className="w-1.5 bg-[#00f0ff] border border-black rounded-full h-5 animate-wave-5" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono font-black text-white">
            <span>Latency: <strong className="text-[#00f0ff]">{call.latencyMs}ms</strong></span>
            <span>Sentiment: <strong className="text-[#d6ff38] uppercase">{call.currentSentiment}</strong></span>
          </div>
        </div>

        {/* Live Transcript Log */}
        <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-slate-100 rounded-xl border-2 border-black my-2 shadow-inner">
          {call.transcript.map((item, idx) => {
            const isAgent = item.speaker === "agent";
            const isSystem = item.speaker === "system";

            if (isSystem) {
              return (
                <div key={idx} className="text-center my-2">
                  <span className="inline-block px-3 py-1 rounded-md text-xs font-mono font-black text-black bg-[#00f0ff] border-2 border-black shadow-[2px_2px_0px_#000000]">
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
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs shrink-0 border-2 border-black shadow-[2px_2px_0px_#000000] ${
                    isAgent
                      ? "bg-[#d6ff38] text-black"
                      : "bg-black text-white"
                  }`}
                >
                  {isAgent ? <Bot className="w-4 h-4 stroke-[2.5]" /> : <User className="w-4 h-4 stroke-[2.5]" />}
                </div>

                <div
                  className={`max-w-[78%] p-3.5 rounded-xl text-xs leading-relaxed border-2 border-black shadow-[3px_3px_0px_#000000] ${
                    isAgent
                      ? "bg-[#d6ff38] text-black"
                      : "bg-white text-black"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1 text-[10px] font-mono font-black uppercase text-black/70">
                    <span>{isAgent ? call.agentName : (call.callerName || "Caller")}</span>
                    <span>{item.time}</span>
                  </div>
                  <p className="font-semibold text-black">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Handoff Notice Banner */}
        {handoffSuccess && (
          <div className="p-3 my-2 rounded-xl bg-[#d6ff38] border-2 border-black text-black text-xs font-black uppercase tracking-wider flex items-center justify-between shadow-[3px_3px_0px_#000000]">
            <span className="flex items-center gap-1.5">
              <PhoneForwarded className="w-4 h-4 text-black stroke-[3]" />
              Transfer initiated! Connecting call to Senior Admissions Counselor.
            </span>
            <span className="font-mono text-xs font-black bg-black text-[#d6ff38] px-2 py-0.5 rounded">Desk Queue #01</span>
          </div>
        )}

        {/* Modal Controls */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-black shrink-0 gap-3">
          <button
            onClick={handleTakeover}
            disabled={handoffSuccess}
            className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] ${
              handoffSuccess
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-[#ffe600] hover:bg-[#ebd300] text-black"
            }`}
          >
            <PhoneForwarded className="w-4 h-4 stroke-[2.5]" />
            <span>{handoffSuccess ? "Transfer In Progress" : "Transfer to Human Counselor"}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-slate-100 border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer"
          >
            Close Audio Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
