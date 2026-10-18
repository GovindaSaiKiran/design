"use client";

import React, { useState, useEffect } from "react";
import { LiveCallItem } from "@/types/dashboard";
import { Eye, Volume2, ShieldCheck, MessageSquareQuote } from "lucide-react";

interface LiveCallsFeedProps {
  liveCalls: LiveCallItem[];
  onViewCall: (call: LiveCallItem) => void;
}

export default function LiveCallsFeed({ liveCalls, onViewCall }: LiveCallsFeedProps) {
  // Live ticker for seconds
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (baseSec: number, addedSec: number) => {
    const total = baseSec + addedSec;
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs flex flex-col justify-between select-none font-sans text-[#1A1A1A]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16856B] inline-block animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
              Live Audio Feed
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D9C2FA]/40 text-[#5B21B6] border border-[#D9C2FA]">
              {liveCalls.length} Concurrent Sessions
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight mt-1">
            Active Admissions Calls
          </h3>
          <p className="text-xs text-black/50 font-normal">
            Real-time acoustic streaming, sub-second latency, and live student dialogue
          </p>
        </div>
      </div>

      {/* Live Calls List */}
      <div className="space-y-4">
        {liveCalls.map((call) => {
          const currentDuration = formatTimer(call.durationSeconds, secondsElapsed);

          return (
            <div
              key={call.id}
              className="group p-5 rounded-[20px] bg-[#FAF3E4]/40 hover:bg-[#FAF3E4] border border-black/[0.06] shadow-2xs transition-all"
            >
              {/* Top Row: Caller + Agent + Live Duration */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#16856B] inline-block animate-pulse" />
                  <div>
                    <span className="font-mono text-sm font-bold text-[#1A1A1A]">
                      {call.callerNumber}
                    </span>
                    <span className="text-xs text-black/50 font-medium ml-2">
                      ({call.callerName || "Verified Caller"})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-black/[0.06] text-xs font-mono font-semibold text-[#1A1A1A]">
                    {call.agentName}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#1A1A1A] bg-white px-2.5 py-0.5 rounded-full border border-black/[0.06]">
                    {currentDuration}
                  </span>
                </div>
              </div>

              {/* Live Quotation Snippet */}
              <div className="my-3 p-3.5 rounded-xl bg-white border border-black/[0.06] flex items-start gap-2.5 text-xs text-[#1A1A1A]">
                <MessageSquareQuote className="w-4 h-4 text-[#5B21B6] shrink-0 mt-0.5 stroke-[2]" />
                <span className="line-clamp-2 font-normal italic leading-relaxed">
                  &ldquo;{call.latestSnippet}&rdquo;
                </span>
              </div>

              {/* Animated Audio Waveform + View Button */}
              <div className="flex items-center justify-between gap-3 pt-3 mt-3 border-t border-black/[0.06]">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-black/40 stroke-[2]" />
                  {/* Waveform Bars */}
                  <div className="flex items-center gap-1 h-5 px-1">
                    <span className="w-1.5 bg-[#D9C2FA] rounded-t h-2 animate-wave-1" />
                    <span className="w-1.5 bg-[#BCD0F5] rounded-t h-4 animate-wave-2" />
                    <span className="w-1.5 bg-[#C1F2D5] rounded-t h-5 animate-wave-3" />
                    <span className="w-1.5 bg-[#FFD9A0] rounded-t h-3 animate-wave-4" />
                    <span className="w-1.5 bg-[#D9C2FA] rounded-t h-4 animate-wave-5" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-black/50 ml-1.5">
                    {call.latencyMs}ms latency
                  </span>
                </div>

                <button
                  onClick={() => onViewCall(call)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all cursor-pointer active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5 stroke-[2]" />
                  <span>View Live</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Telemetry */}
      <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-medium text-black/50">
        <span className="flex items-center gap-1.5 text-black/70">
          <ShieldCheck className="w-4 h-4 text-[#16856B] stroke-[2]" />
          SRTP Encrypted 24/7 Helpline Stream
        </span>
        <span className="font-mono text-[11px] bg-[#FAF3E4] text-[#1A1A1A] px-2.5 py-0.5 rounded-full border border-black/[0.06] font-semibold">
          OPUS 48kHz HD
        </span>
      </div>
    </div>
  );
}
