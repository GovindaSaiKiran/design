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
    <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-black/10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between select-none font-sans">
      {/* Apple Header */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-black/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Live Audio Feed
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-black/10 shadow-xs">
              {liveCalls.length} Concurrent Sessions
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Active Admissions Calls
          </h3>
          <p className="text-xs text-slate-500 font-normal">
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
              className="group p-5 rounded-2xl bg-white/90 border border-black/10 hover:border-black/30 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              {/* Top Row: Caller + Agent + Live Duration */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  <div>
                    <span className="font-mono text-sm font-bold text-slate-900">
                      {call.callerNumber}
                    </span>
                    <span className="text-xs text-slate-500 font-medium ml-2">
                      ({call.callerName || "Verified Caller"})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-black/5 text-xs font-mono font-semibold">
                    {call.agentName}
                  </span>
                  <span className="font-mono text-xs font-semibold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-black/5">
                    {currentDuration}
                  </span>
                </div>
              </div>

              {/* Live Quotation Snippet */}
              <div className="my-3 p-3.5 rounded-xl bg-slate-50/90 border border-black/5 flex items-start gap-2.5 text-xs text-slate-800">
                <MessageSquareQuote className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5 stroke-[2]" />
                <span className="line-clamp-2 font-normal italic leading-relaxed">
                  &ldquo;{call.latestSnippet}&rdquo;
                </span>
              </div>

              {/* Animated Audio Waveform + View Button */}
              <div className="flex items-center justify-between gap-3 pt-3 mt-3 border-t border-black/5">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-slate-500 stroke-[2]" />
                  {/* Waveform Bars */}
                  <div className="flex items-center gap-1 h-5 px-1">
                    <span className="w-1.5 bg-indigo-500 rounded-t h-2 animate-wave-1" />
                    <span className="w-1.5 bg-sky-500 rounded-t h-4 animate-wave-2" />
                    <span className="w-1.5 bg-emerald-500 rounded-t h-5 animate-wave-3" />
                    <span className="w-1.5 bg-amber-500 rounded-t h-3 animate-wave-4" />
                    <span className="w-1.5 bg-indigo-600 rounded-t h-4 animate-wave-5" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-500 ml-1.5">
                    {call.latencyMs}ms latency
                  </span>
                </div>

                <button
                  onClick={() => onViewCall(call)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold border border-black shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
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
      <div className="mt-5 pt-4 border-t border-black/10 flex items-center justify-between text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1.5 text-slate-700">
          <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[2]" />
          SRTP Encrypted 24/7 Helpline Stream
        </span>
        <span className="font-mono text-[11px] bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-lg border border-black/5 font-semibold">
          OPUS 48kHz HD
        </span>
      </div>
    </div>
  );
}
