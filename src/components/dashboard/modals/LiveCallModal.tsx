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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border-4 border-black shadow-[12px_12px_0px_#000000] p-6 sm:p-7 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-black shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000]">
                <Phone className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-black border border-[#d6ff38]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-black font-mono">
                  {call.callerNumber}
                </h3>
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-black bg-[#d6ff38] text-black border border-black flex items-center gap-1 shadow-[1px_1px_0px_#000000]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                  LIVE CALL
                </span>
              </div>
              <p className="text-xs font-bold text-black/70">
                Caller: {call.callerName || "Verified Student"} • Assigned to <strong>{call.agentName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="font-mono text-sm font-black text-black bg-[#d6ff38] px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000]">
              {formattedDuration}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white hover:bg-[#fcffe0] text-black border-2 border-black flex items-center justify-center transition-all shadow-[2px_2px_0px_#000000] active:translate-x-0.5 cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Acoustic Waveform & Latency Bar */}
        <div className="my-4 p-3.5 rounded-xl bg-black text-white border-2 border-black shadow-[3px_3px_0px_#d6ff38] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#d6ff38] stroke-[2.5]" />
            <span className="text-xs font-black uppercase text-[#d6ff38]">Live Acoustic Stream:</span>
            {/* Animated Waveform */}
            <div className="flex items-center gap-1 h-6 px-1">
              <span className="w-1.5 bg-[#d6ff38] border border-black rounded-t h-3 animate-wave-1" />
              <span className="w-1.5 bg-white rounded-t h-5 animate-wave-2" />
              <span className="w-1.5 bg-[#d6ff38] border border-black rounded-t h-6 animate-wave-3" />
              <span className="w-1.5 bg-white rounded-t h-4 animate-wave-4" />
              <span className="w-1.5 bg-[#d6ff38] border border-black rounded-t h-5 animate-wave-5" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono font-bold text-neutral-300">
            <span>Latency: <strong className="text-[#d6ff38]">{call.latencyMs}ms</strong></span>
            <span>Sentiment: <strong className="text-[#d6ff38] uppercase">{call.currentSentiment}</strong></span>
          </div>
        </div>

        {/* Live Transcript Log */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3.5 bg-[#fcffe0] rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000] my-2">
          {call.transcript.map((item, idx) => {
            const isAgent = item.speaker === "agent";
            const isSystem = item.speaker === "system";

            if (isSystem) {
              return (
                <div key={idx} className="text-center my-2">
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-mono font-black text-black bg-white border border-black shadow-[1px_1px_0px_#000000]">
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
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 border-2 border-black ${
                    isAgent
                      ? "bg-[#d6ff38] text-black"
                      : "bg-black text-[#d6ff38]"
                  }`}
                >
                  {isAgent ? <Bot className="w-4 h-4 stroke-[2.5]" /> : <User className="w-4 h-4 stroke-[2.5]" />}
                </div>

                <div
                  className={`max-w-[78%] p-3 rounded-xl text-xs font-bold leading-relaxed border-2 border-black ${
                    isAgent
                      ? "bg-white text-black shadow-[2px_2px_0px_#000000]"
                      : "bg-black text-[#d6ff38] shadow-[2px_2px_0px_#d6ff38]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1 text-[10px] font-mono font-black uppercase opacity-80">
                    <span>{isAgent ? call.agentName : (call.callerName || "Caller")}</span>
                    <span>{item.time}</span>
                  </div>
                  <p className="font-medium">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Handoff Notice Banner */}
        {handoffSuccess && (
          <div className="p-3 my-2 rounded-xl bg-[#d6ff38] border-2 border-black text-black text-xs font-black flex items-center justify-between shadow-[2px_2px_0px_#000000]">
            <span className="flex items-center gap-1.5">
              <PhoneForwarded className="w-4 h-4 stroke-[3]" />
              Transfer initiated! Connecting call to Senior Admissions Counselor.
            </span>
            <span className="font-mono text-xs">Desk Queue #01</span>
          </div>
        )}

        {/* Modal Controls */}
        <div className="flex items-center justify-between pt-4 border-t-2 border-black shrink-0 gap-3">
          <button
            onClick={handleTakeover}
            disabled={handoffSuccess}
            className={`px-4 py-2.5 rounded-xl text-xs font-black border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 transition-all inline-flex items-center gap-1.5 cursor-pointer ${
              handoffSuccess
                ? "bg-neutral-200 text-neutral-600 cursor-not-allowed"
                : "bg-amber-300 hover:bg-amber-400 text-black"
            }`}
          >
            <PhoneForwarded className="w-4 h-4 stroke-[3]" />
            <span>{handoffSuccess ? "Transfer In Progress" : "Transfer to Admissions Counselor"}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-black text-black bg-white hover:bg-neutral-100 border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 cursor-pointer"
          >
            Close Audio Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
