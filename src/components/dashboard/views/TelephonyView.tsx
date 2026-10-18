"use client";

import React, { useState } from "react";
import { TelephonyNumber } from "@/types/dashboard";
import {
  Plus,
  Server,
  Activity,
  CheckCircle2,
  Sliders,
  Sparkles,
} from "lucide-react";
import TelephonyStatus from "../components/TelephonyStatus";

interface TelephonyViewProps {
  numbers: TelephonyNumber[];
}

export default function TelephonyView({ numbers }: TelephonyViewProps) {
  const [provisionSuccess, setProvisionSuccess] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [expression, setExpression] = useState("Natural / Warm");
  const [sampleRate, setSampleRate] = useState("22 kHz");

  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans select-none text-[#1A1A1A]">
      {/* 1. Header Card */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D9C2FA]/40 border border-[#D9C2FA] text-xs font-semibold text-[#5B21B6]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Low Latency Streaming Telephony</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A1A1A] tracking-tight leading-tight">
              Sub-250ms first byte with WebSocket streaming for real-time voice applications.
            </h1>
            <p className="text-xs sm:text-sm text-black/60 leading-relaxed font-sans">
              Provision virtual Indian numbers, configure zero-lag SIP trunks, and fine-tune voice pace, expressiveness, and tone to match your institutional admissions brand.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setProvisionSuccess(true);
                setTimeout(() => setProvisionSuccess(false), 3500);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2]" />
              <span>Provision Virtual Number</span>
            </button>
          </div>
        </div>
      </div>

      {provisionSuccess && (
        <div className="p-4 rounded-[20px] bg-[#C1F2D5] border border-[#16856B]/20 text-[#16856B] text-xs font-semibold flex items-center gap-2 shadow-2xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#16856B] shrink-0" />
          <span>New virtual line +91 40 4590 1199 successfully provisioned and bound to Inbound Admissions Router.</span>
        </div>
      )}

      {/* 2. Configurable Controls & Streaming Parameters */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-8 shadow-2xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD9A0] text-[11px] font-semibold text-[#7A4B00] mb-2">
              <Sliders className="w-3 h-3" />
              <span>Acoustic Synthesis Parameters</span>
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
              Configurable Controls
            </h3>
            <p className="text-xs text-black/60 mt-0.5">
              Fine-tune voice pace, expressiveness, and tone to match your institution.
            </p>
          </div>
          <span className="text-xs font-mono text-black/60 bg-[#FAF3E4] px-3 py-1 rounded-full border border-black/[0.06]">
            Bulbul V3 Tuner
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Speed Slider */}
          <div className="bg-[#FAF3E4]/50 p-5 rounded-[20px] border border-black/[0.06] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1A1A1A]">Speech Pace (Speed)</span>
              <span className="font-mono font-semibold text-[#1A1A1A] bg-white px-2.5 py-0.5 rounded-full border border-black/[0.06]">
                {speed.toFixed(2)}x
              </span>
            </div>
            <input
              type="range"
              min="0.75"
              max="1.5"
              step="0.05"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-black/10 rounded-full appearance-none cursor-pointer accent-[#111111]"
            />
            <div className="flex justify-between text-[10px] text-black/40 font-mono">
              <span>0.75x (Formal)</span>
              <span>1.0x (Standard)</span>
              <span>1.5x (Fast)</span>
            </div>
          </div>

          {/* Expression Selector */}
          <div className="bg-[#FAF3E4]/50 p-5 rounded-[20px] border border-black/[0.06] space-y-2">
            <label className="block text-xs font-semibold text-[#1A1A1A]">
              Emotional Expression & Tone
            </label>
            <select
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/[0.06] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-black/20"
            >
              <option value="Natural / Warm">Natural / Warm (Admissions Counseling)</option>
              <option value="Expressive / Excited">Expressive / Excited (Campus Fest & Open Days)</option>
              <option value="Instructional / Crisp">Instructional / Crisp (Fee & Examination Helpdesk)</option>
              <option value="Empathetic / Calm">Empathetic / Calm (Student Grievances)</option>
            </select>
            <p className="text-[10px] text-black/50">
              Modulates prosody and pitch contours across Indic phonetic utterances.
            </p>
          </div>

          {/* Audio Sample Rate */}
          <div className="bg-[#FAF3E4]/50 p-5 rounded-[20px] border border-black/[0.06] space-y-2">
            <label className="block text-xs font-semibold text-[#1A1A1A]">
              Acoustic Sample Rate
            </label>
            <select
              value={sampleRate}
              onChange={(e) => setSampleRate(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-black/[0.06] text-xs font-medium text-[#1A1A1A] focus:outline-none focus:border-black/20 font-mono"
            >
              <option value="22 kHz">22.05 kHz (Studio Ultra-HD)</option>
              <option value="16 kHz">16.0 kHz (Wideband VoIP HD)</option>
              <option value="8 kHz">8.0 kHz (Narrowband Telephony G.711)</option>
            </select>
            <p className="text-[10px] text-black/50">
              Standard SIP telephony routes automatically downsample with anti-aliasing.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Main Telephony Routing Status */}
      <TelephonyStatus />

      {/* 4. SIP Trunk & Carrier Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 shadow-2xs">
          <h3 className="text-base font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2.5 pb-3 border-b border-black/[0.06]">
            <div className="w-8 h-8 rounded-xl bg-[#BCD0F5]/40 text-[#1B365D] flex items-center justify-center border border-[#BCD0F5]">
              <Server className="w-4 h-4" />
            </div>
            <span>Carrier Gateway Architecture</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-black/[0.04]">
              <span className="text-black/50">Primary SIP Gateway:</span>
              <span className="font-mono font-semibold text-[#1A1A1A]">sip.hyderabad.swaram.in</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/[0.04]">
              <span className="text-black/50">Backup Failover:</span>
              <span className="font-mono font-medium text-black/70">sip.mumbai.swaram.in (Hot Standby)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/[0.04]">
              <span className="text-black/50">Codec Negotiation:</span>
              <span className="font-mono font-medium text-[#1B365D] bg-[#BCD0F5] px-2.5 py-0.5 rounded-full">G.711 / Opus Wideband HD</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-black/50">SRTP Security:</span>
              <span className="font-mono font-medium text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">TLS 1.3 / SRTP Enabled</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 shadow-2xs">
          <h3 className="text-base font-semibold text-[#1A1A1A] mb-4 flex items-center gap-2.5 pb-3 border-b border-black/[0.06]">
            <div className="w-8 h-8 rounded-xl bg-[#C1F2D5] text-[#16856B] flex items-center justify-center border border-[#C1F2D5]">
              <Activity className="w-4 h-4" />
            </div>
            <span>Live Carrier Health SLA</span>
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-black/[0.04]">
              <span className="text-black/50">Uptime SLA:</span>
              <span className="font-mono font-semibold text-[#16856B] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">99.98% Guaranteed</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/[0.04]">
              <span className="text-black/50">Acoustic Jitter:</span>
              <span className="font-mono font-semibold text-[#1A1A1A] bg-[#FAF3E4] px-2.5 py-0.5 rounded-full border border-black/[0.06]">1.2 ms</span>
            </div>
            <div className="flex justify-between py-2 border-b border-black/[0.04]">
              <span className="text-black/50">Packet Loss:</span>
              <span className="font-mono font-semibold text-[#1A1A1A]">0.00%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-black/50">STIR/SHAKEN Caller ID:</span>
              <span className="font-mono font-medium text-[#5B21B6] bg-[#D9C2FA] px-2.5 py-0.5 rounded-full">Level A (Full Attestation)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
