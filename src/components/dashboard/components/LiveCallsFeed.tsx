"use client";

import React, { useState, useEffect } from "react";
import { LiveCallItem } from "@/types/dashboard";
import { Radio, Eye, Volume2, ShieldCheck, ArrowRight, MessageSquareQuote } from "lucide-react";

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
    <div className="bg-white rounded-2xl p-5 sm:p-6 border-3 border-black shadow-[6px_6px_0px_#000000] flex flex-col justify-between select-none">
      {/* Neo Header */}
      <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#d6ff38] border-2 border-black inline-block animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-black">
              LIVE AUDIO FEED
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              {liveCalls.length} CONCURRENT SESSIONS
            </span>
          </div>
          <h3 className="text-xl font-black text-black tracking-tight mt-1 uppercase">
            Active Admissions Calls
          </h3>
          <p className="text-xs font-bold text-black/70">
            Real-time acoustic streaming, sub-second latency, and live student dialogue
          </p>
        </div>
      </div>

      {/* Live Calls List */}
      <div className="space-y-4">
        {liveCalls.map((call, idx) => {
          const currentDuration = formatTimer(call.durationSeconds, secondsElapsed);

          return (
            <div
              key={call.id}
              className="group p-4 rounded-xl bg-[#f8fafc] border-2 border-black shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000] transition-all"
            >
              {/* Top Row: Caller + Agent + Live Duration */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d6ff38] border border-black inline-block animate-pulse" />
                  <div>
                    <span className="font-mono text-sm font-black text-black">
                      {call.callerNumber}
                    </span>
                    <span className="text-xs font-bold text-black/60 ml-1.5">
                      ({call.callerName || "Verified Caller"})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#c084fc] text-black border-2 border-black text-xs font-mono font-black shadow-[2px_2px_0px_#000000]">
                    {call.agentName}
                  </span>
                  <span className="font-mono text-xs font-black text-black bg-[#ffe600] px-2 py-0.5 rounded-md border-2 border-black shadow-[2px_2px_0px_#000000]">
                    {currentDuration}
                  </span>
                </div>
              </div>

              {/* Live Quotation Snippet */}
              <div className="my-2.5 p-3 rounded-xl bg-white border-2 border-black flex items-start gap-2 text-xs text-black shadow-[2px_2px_0px_#000000]">
                <MessageSquareQuote className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[2.5]" />
                <span className="line-clamp-2 font-semibold italic">
                  &ldquo;{call.latestSnippet}&rdquo;
                </span>
              </div>

              {/* Animated Audio Waveform + View Button */}
              <div className="flex items-center justify-between gap-3 pt-2 mt-2 border-t-2 border-black">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-black stroke-[2.5]" />
                  {/* Waveform Bars */}
                  <div className="flex items-center gap-1 h-5 px-1">
                    <span className="w-1.5 bg-black border border-black rounded-t h-2 animate-wave-1" />
                    <span className="w-1.5 bg-[#00f0ff] border border-black rounded-t h-4 animate-wave-2" />
                    <span className="w-1.5 bg-[#d6ff38] border border-black rounded-t h-5 animate-wave-3" />
                    <span className="w-1.5 bg-[#ffe600] border border-black rounded-t h-3 animate-wave-4" />
                    <span className="w-1.5 bg-black border border-black rounded-t h-4 animate-wave-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-black/70 ml-1">
                    {call.latencyMs}ms latency
                  </span>
                </div>

                <button
                  onClick={() => onViewCall(call)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#d6ff38] hover:bg-[#bbf01b] text-black text-xs font-black uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>View Live</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Telemetry */}
      <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-bold text-black">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
          SRTP Encrypted 24/7 Helpline Stream
        </span>
        <span className="font-mono text-[11px] bg-black text-[#d6ff38] px-2.5 py-0.5 rounded-md border-2 border-black font-black">
          OPUS 48kHz HD
        </span>
      </div>
    </div>
  );
}
