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
    <div className="bg-white rounded-2xl p-6 border-3 border-black shadow-[6px_6px_0px_#000000] flex flex-col justify-between select-none">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d6ff38] border border-black inline-block animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-black">
              Live Audio Feed
            </span>
            <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-[#d6ff38] text-black border border-black shadow-[1.5px_1.5px_0px_#000000]">
              {liveCalls.length} CONNECTED
            </span>
          </div>
          <h3 className="text-lg font-black text-black tracking-tight mt-1 uppercase">
            Live Conversations
          </h3>
          <p className="text-xs font-bold text-black/70">
            Real-time acoustic streaming & live admissions sentiment
          </p>
        </div>
      </div>

      {/* Live Calls List */}
      <div className="space-y-3">
        {liveCalls.map((call, idx) => {
          const currentDuration = formatTimer(call.durationSeconds, secondsElapsed);

          return (
            <div
              key={call.id}
              className="group p-4 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#000000] transition-all"
            >
              {/* Top Row: Caller + Agent + Live Duration */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d6ff38] border border-black inline-block animate-ping" />
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
                  <span className="px-2 py-0.5 rounded-lg bg-black text-[#d6ff38] text-xs font-mono font-black border border-black">
                    {call.agentName}
                  </span>
                  <span className="font-mono text-xs font-black text-black bg-[#d6ff38] px-2 py-0.5 rounded-lg border border-black shadow-[1px_1px_0px_#000000]">
                    {currentDuration}
                  </span>
                </div>
              </div>

              {/* Live Quotation Snippet */}
              <div className="my-2 p-2.5 rounded-lg bg-[#fcffe0] border border-black flex items-start gap-2 text-xs text-black">
                <MessageSquareQuote className="w-4 h-4 text-black shrink-0 mt-0.5 stroke-[2.5]" />
                <span className="line-clamp-2 font-medium">
                  &ldquo;{call.latestSnippet}&rdquo;
                </span>
              </div>

              {/* Animated Audio Waveform + View Button */}
              <div className="flex items-center justify-between gap-3 pt-2 mt-2 border-t-2 border-black/10">
                <div className="flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-black stroke-[2.5]" />
                  {/* Waveform Bars */}
                  <div className="flex items-center gap-0.5 h-5 px-1">
                    <span className="w-1.5 bg-[#d6ff38] border border-black rounded-t h-2 animate-wave-1" />
                    <span className="w-1.5 bg-black rounded-t h-4 animate-wave-2" />
                    <span className="w-1.5 bg-[#d6ff38] border border-black rounded-t h-5 animate-wave-3" />
                    <span className="w-1.5 bg-black rounded-t h-3 animate-wave-4" />
                    <span className="w-1.5 bg-[#d6ff38] border border-black rounded-t h-4 animate-wave-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-black/70 ml-1">
                    {call.latencyMs}ms latency
                  </span>
                </div>

                <button
                  onClick={() => onViewCall(call)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d6ff38] hover:bg-[#cbf72e] text-black text-xs font-black transition-all border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 cursor-pointer"
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
      <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between text-xs font-bold text-black/70">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-black stroke-[2.5]" />
          Encrypted 24/7 Helpline Stream
        </span>
        <span className="font-mono text-[11px] bg-black text-[#d6ff38] px-2 py-0.5 rounded border border-black">
          Opus 48kHz HD
        </span>
      </div>
    </div>
  );
}
