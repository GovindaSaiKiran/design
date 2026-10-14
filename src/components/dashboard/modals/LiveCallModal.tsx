"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  User,
  Bot,
  Volume2,
  PhoneForwarded,
} from "lucide-react";
import { LiveCallItem } from "@/types/dashboard";
import { soundSynth } from "@/lib/audio-synth";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="relative w-full max-w-2xl bg-[#09090B] rounded-[2px] border border-[#27272A] shadow-2xl p-6 sm:p-7 overflow-hidden flex flex-col max-h-[90vh] text-white font-sans">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272A] shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-9 h-9 rounded-[2px] bg-white text-black border border-white flex items-center justify-center">
                <Phone className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-[1px] bg-white animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-mono tracking-tight">
                  {call.callerNumber}
                </h3>
                <span className="px-2 py-0.5 rounded-[1px] text-[10px] font-mono font-bold bg-[#18181B] text-white border border-[#27272A] flex items-center gap-1.5 uppercase">
                  <span className="w-1.5 h-1.5 rounded-[1px] bg-white animate-pulse" />
                  Live Voice Session
                </span>
              </div>
              <p className="text-[11px] text-[#A1A1AA] font-mono mt-0.5">
                Caller: <span className="text-white font-semibold">{call.callerName || "Verified Applicant"}</span> • Agent: <strong className="text-white">{call.agentName}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="font-mono text-xs font-bold text-white bg-[#121215] px-3 py-1.5 rounded-[1px] border border-[#27272A]">
              {formattedDuration}
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="p-1.5 rounded-[2px] bg-[#121215] border border-[#27272A] hover:border-white text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 pointer-events-none" />
            </button>
          </div>
        </div>

        {/* Acoustic Waveform & Latency Bar */}
        <div className="my-3.5 p-3.5 rounded-[2px] bg-[#121215] border border-[#27272A] text-white shadow-xs flex flex-wrap items-center justify-between gap-3 shrink-0 font-mono text-xs">
          <div className="flex items-center gap-2.5">
            <Volume2 className="w-4 h-4 text-white" />
            <span className="text-[11px] text-[#A1A1AA] uppercase">Live Acoustic Stream:</span>
            {/* Animated Waveform */}
            <div className="flex items-center gap-1 h-5 px-1">
              <span className="w-1 bg-white rounded-[1px] h-2.5 animate-pulse" />
              <span className="w-1 bg-white rounded-[1px] h-4 animate-pulse delay-75" />
              <span className="w-1 bg-white rounded-[1px] h-5 animate-pulse delay-150" />
              <span className="w-1 bg-white rounded-[1px] h-3 animate-pulse delay-200" />
              <span className="w-1 bg-white rounded-[1px] h-4 animate-pulse delay-300" />
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#A1A1AA]">
            <span>Latency: <strong className="text-white">{call.latencyMs}ms</strong></span>
            <span>Sentiment: <strong className="text-white uppercase">{call.currentSentiment}</strong></span>
          </div>
        </div>

        {/* Live Transcript Log */}
        <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-[#040405] rounded-[2px] border border-[#27272A] my-2 font-mono text-xs">
          {call.transcript.map((item, idx) => {
            const isAgent = item.speaker === "agent";
            const isSystem = item.speaker === "system";

            if (isSystem) {
              return (
                <div key={idx} className="text-center my-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-[1px] text-[10px] font-mono text-[#A1A1AA] bg-[#18181B] border border-[#27272A]">
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
                  className={`w-6 h-6 rounded-[1px] flex items-center justify-center text-xs shrink-0 border ${
                    isAgent
                      ? "bg-[#18181B] text-white border-[#27272A]"
                      : "bg-white text-black border-white"
                  }`}
                >
                  {isAgent ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`max-w-[80%] p-3 rounded-[2px] text-xs leading-relaxed ${
                    isAgent
                      ? "bg-[#121215] border border-[#27272A] text-white"
                      : "bg-white text-black font-semibold shadow-2xs"
                  }`}
                >
                  <div className={`flex items-center justify-between gap-2 mb-1 text-[10px] ${
                    isAgent ? "text-[#71717A]" : "text-zinc-600"
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
          <div className="p-3 my-2 rounded-[2px] bg-[#121215] border border-white text-white text-xs font-mono flex items-center justify-between shadow-2xs">
            <span className="flex items-center gap-2">
              <PhoneForwarded className="w-4 h-4 text-white" />
              Transfer initiated! Connecting candidate to Human Counselor.
            </span>
            <span className="font-mono text-[10px] font-bold bg-white text-black px-2 py-0.5 rounded-[1px]">Queue #01</span>
          </div>
        )}

        {/* Modal Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-[#27272A] shrink-0 gap-3">
          <button
            onClick={handleTakeover}
            disabled={handoffSuccess}
            className={`px-4 py-2 rounded-[2px] text-xs font-mono font-bold uppercase transition-all inline-flex items-center gap-2 cursor-pointer shadow-2xs ${
              handoffSuccess
                ? "bg-[#18181B] text-[#71717A] border border-[#27272A] cursor-not-allowed"
                : "bg-white text-black hover:bg-zinc-200 border border-white active:translate-x-[1px] active:translate-y-[1px]"
            }`}
          >
            <PhoneForwarded className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{handoffSuccess ? "Transfer In Progress" : "Transfer to Human Desk"}</span>
          </button>

          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-[2px] text-xs font-mono font-bold uppercase text-[#A1A1AA] hover:text-white bg-transparent border border-[#27272A] hover:border-white transition-all cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
