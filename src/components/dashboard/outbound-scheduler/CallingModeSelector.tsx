"use client";

import React from "react";
import {
  PhoneCall,
  Layers,
  CheckCircle2,
  Sliders,
  Clock,
  ShieldCheck,
  AlertCircle,
  Zap,
  Info,
} from "lucide-react";
import { CallingMode } from "@/types/schedule";

interface CallingModeSelectorProps {
  callingMode: CallingMode;
  onChangeMode: (mode: CallingMode) => void;
  concurrencyLimit: number;
  onChangeConcurrency: (limit: number) => void;
  pacingDelaySec: number;
  onChangePacing: (sec: number) => void;
  maxRetries: number;
  onChangeRetries: (retries: number) => void;
  callingWindowStart: number;
  callingWindowEnd: number;
  onChangeCallingWindow: (start: number, end: number) => void;
  workspaceMaxConcurrency?: number;
}

export default function CallingModeSelector({
  callingMode,
  onChangeMode,
  concurrencyLimit,
  onChangeConcurrency,
  pacingDelaySec,
  onChangePacing,
  maxRetries,
  onChangeRetries,
  callingWindowStart,
  callingWindowEnd,
  onChangeCallingWindow,
  workspaceMaxConcurrency = 50,
}: CallingModeSelectorProps) {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#707684]">
            Step 1 · Calling Architecture
          </span>
          <span className="text-xs text-[#283A50]/30">•</span>
          <span className="text-xs text-[#707684]">Select How Your Calls Are Processed</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#283A50] mt-0.5">
          Choose Calling Mode
        </h3>
        <p className="text-xs text-[#707684] mt-0.5 leading-relaxed">
          Select between sequential one-by-one outreach or scalable multi-channel bulk concurrency.
        </p>
      </div>

      {/* Two Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Normal Calling Card */}
        <div
          onClick={() => onChangeMode("normal")}
          className={`cursor-pointer rounded-2xl p-5 border transition-all text-left relative ${
            callingMode === "normal"
              ? "bg-[#FAF5E9]/50 border-[#283A50] shadow-sm ring-1 ring-[#283A50]"
              : "bg-white border-[#E9E1D4] hover:border-[#283A50]/40 hover:bg-[#FAF5E9]/20"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  callingMode === "normal"
                    ? "bg-[#283A50] text-[#FAF5E9]"
                    : "bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]"
                }`}
              >
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#283A50]">Normal Calling</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#2E8066] border border-[#B8DEC8]">
                    Sequential · 1 at a time
                  </span>
                </div>
                <p className="text-[11px] text-[#707684] mt-0.5">
                  Single active line · Steady paced conversational cadence
                </p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                callingMode === "normal"
                  ? "border-[#283A50] bg-[#283A50] text-white"
                  : "border-[#E9E1D4] bg-white"
              }`}
            >
              {callingMode === "normal" && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
          </div>

          <p className="text-xs text-[#283A50]/80 mt-3.5 leading-relaxed">
            Calls one contact at a time in sequence. Ideal for high-touch student counseling, VIP merit scholarship follow-ups, and precise manual callbacks where quality and individual attention matter most.
          </p>

          <div className="mt-4 pt-3 border-t border-[#E9E1D4]/80 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#707684]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E8066]" />
              Strictly 1 call active at a time
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E8066]" />
              Zero carrier congestion risk
            </span>
          </div>
        </div>

        {/* Bulk Calling Card */}
        <div
          onClick={() => onChangeMode("bulk")}
          className={`cursor-pointer rounded-2xl p-5 border transition-all text-left relative ${
            callingMode === "bulk"
              ? "bg-[#FAF5E9]/50 border-[#283A50] shadow-sm ring-1 ring-[#283A50]"
              : "bg-white border-[#E9E1D4] hover:border-[#283A50]/40 hover:bg-[#FAF5E9]/20"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  callingMode === "bulk"
                    ? "bg-[#283A50] text-[#FAF5E9]"
                    : "bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]"
                }`}
              >
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#283A50]">Bulk Calling</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-[#C4A5E8]">
                    Multi-Channel · Up to {workspaceMaxConcurrency} Lines
                  </span>
                </div>
                <p className="text-[11px] text-[#707684] mt-0.5">
                  Simultaneous dispatch · Configurable concurrency &amp; pacing
                </p>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                callingMode === "bulk"
                  ? "border-[#283A50] bg-[#283A50] text-white"
                  : "border-[#E9E1D4] bg-white"
              }`}
            >
              {callingMode === "bulk" && <CheckCircle2 className="w-3.5 h-3.5" />}
            </div>
          </div>

          <p className="text-xs text-[#283A50]/80 mt-3.5 leading-relaxed">
            Dials multiple contacts simultaneously across available carrier channels. Built for large cohorts, entrance exam notifications, seat allotment follow-ups, and scheduled high-volume campaigns with controlled concurrency.
          </p>

          <div className="mt-4 pt-3 border-t border-[#E9E1D4]/80 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-[#707684]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              Simultaneous concurrent dialing
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
              Pause &amp; resume mid-campaign
            </span>
          </div>
        </div>
      </div>

      {/* Advanced Bulk Controls — Only rendered if Bulk Calling is selected */}
      {callingMode === "bulk" && (
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9E1D4]">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#283A50]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#283A50]">
                Bulk Concurrency &amp; Cadence Controls
              </h4>
            </div>
            <span className="text-[11px] text-[#707684] bg-[#FAF5E9] px-2.5 py-0.5 rounded-full border border-[#E9E1D4]">
              Carrier Plan Limit: {workspaceMaxConcurrency} PRI Channels
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Concurrency Limit */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#283A50]">Maximum Simultaneous Calls</label>
                <span className="font-mono font-bold text-sm text-[#283A50] bg-[#FAF5E9] px-2 py-0.5 rounded border border-[#E9E1D4]">
                  {concurrencyLimit} channels
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={workspaceMaxConcurrency}
                step={1}
                value={concurrencyLimit}
                onChange={(e) => onChangeConcurrency(Number(e.target.value))}
                className="w-full accent-[#283A50] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#707684]">
                <span>2 lines (Conservative)</span>
                <span>{workspaceMaxConcurrency} lines (Max Plan Capacity)</span>
              </div>
              <p className="text-[10px] text-[#707684]">
                Enforced by your SIP trunk provider. Does not exceed workspace quota.
              </p>
            </div>

            {/* Pacing Delay */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#283A50]">Dispatch Pacing Delay</label>
                <span className="font-mono font-bold text-sm text-[#283A50] bg-[#FAF5E9] px-2 py-0.5 rounded border border-[#E9E1D4]">
                  {pacingDelaySec}s between calls
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={pacingDelaySec}
                onChange={(e) => onChangePacing(Number(e.target.value))}
                className="w-full accent-[#283A50] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#707684]">
                <span>1s (Rapid)</span>
                <span>10s (Gentle)</span>
              </div>
              <p className="text-[10px] text-[#707684]">
                Buffers telephony initiation to prevent telecom rate-limit throttling.
              </p>
            </div>

            {/* Automatic Retries */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#283A50]">No-Answer / Busy Retries</label>
                <span className="font-mono font-bold text-sm text-[#283A50] bg-[#FAF5E9] px-2 py-0.5 rounded border border-[#E9E1D4]">
                  Up to {maxRetries} {maxRetries === 1 ? "retry" : "retries"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                {[1, 2, 3].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => onChangeRetries(r)}
                    className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                      maxRetries === r
                        ? "bg-[#283A50] text-white border-[#283A50]"
                        : "bg-white text-[#283A50] border-[#E9E1D4] hover:bg-[#FAF5E9]"
                    }`}
                  >
                    {r} {r === 1 ? "Retry" : "Retries"}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-[#707684]">
                Retries unanswered contacts with 2-hour spacing during permitted hours.
              </p>
            </div>
          </div>

          {/* Permitted Calling Window */}
          <div className="pt-3 border-t border-[#E9E1D4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#283A50]">
              <Clock className="w-4 h-4 text-[#707684]" />
              <span className="font-bold">Permitted Calling Hours Window:</span>
              <span className="font-mono bg-[#FAF5E9] px-2 py-0.5 rounded text-[11px] border border-[#E9E1D4]">
                {String(callingWindowStart).padStart(2, "0")}:00 - {String(callingWindowEnd).padStart(2, "0")}:00 IST
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={callingWindowStart}
                onChange={(e) => onChangeCallingWindow(Number(e.target.value), callingWindowEnd)}
                className="bg-white border border-[#E9E1D4] rounded-lg px-2 py-1 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50]"
              >
                <option value={8}>08:00 AM</option>
                <option value={9}>09:00 AM</option>
                <option value={10}>10:00 AM</option>
              </select>
              <span className="text-[#707684]">to</span>
              <select
                value={callingWindowEnd}
                onChange={(e) => onChangeCallingWindow(callingWindowStart, Number(e.target.value))}
                className="bg-white border border-[#E9E1D4] rounded-lg px-2 py-1 text-xs text-[#283A50] focus:outline-none focus:ring-1 focus:ring-[#283A50]"
              >
                <option value={18}>06:00 PM</option>
                <option value={19}>07:00 PM</option>
                <option value={20}>08:00 PM</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
