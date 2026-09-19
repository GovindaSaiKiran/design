"use client";

import React, { useState } from "react";
import { TelephonyNumber } from "@/types/dashboard";
import { Radio, Phone, ShieldCheck, Plus, Server, Activity, ArrowUpRight, CheckCircle2 } from "lucide-react";
import TelephonyStatus from "../components/TelephonyStatus";

interface TelephonyViewProps {
  numbers: TelephonyNumber[];
}

export default function TelephonyView({ numbers }: TelephonyViewProps) {
  const [provisionSuccess, setProvisionSuccess] = useState(false);

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Neo Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-md bg-black text-[#d6ff38] border-2 border-black shadow-[2px_2px_0px_#000000] -rotate-1">
              📞 TELECOM CARRIER & SIP TRUNKING
            </span>
            <span className="px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              3 ACTIVE INWARD DID LINES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase">
            Virtual Telephony & Routing Rules
          </h1>
          <p className="text-xs font-bold text-black/70 mt-1 max-w-xl">
            Provision national virtual phone numbers, configure admissions IVR fallback nodes, and monitor low-jitter SIP trunk carrier routes.
          </p>
        </div>

        <button
          onClick={() => {
            setProvisionSuccess(true);
            setTimeout(() => setProvisionSuccess(false), 3000);
          }}
          className="px-5 py-3 rounded-xl bg-[#d6ff38] hover:bg-[#bbf01b] text-black text-xs font-black uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all inline-flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Provision New Number</span>
        </button>
      </div>

      {provisionSuccess && (
        <div className="p-4 rounded-xl bg-[#d6ff38] border-3 border-black text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[4px_4px_0px_#000000] animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-black stroke-[3]" />
          New virtual number +91 40 4590 1199 successfully provisioned and bound to Inbound Admissions Router!
        </div>
      )}

      {/* Main Telephony Status */}
      <TelephonyStatus />

      {/* SIP Trunk & Carrier Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-[6px_6px_0px_#000000]">
          <h3 className="text-lg font-black text-black uppercase mb-3 flex items-center gap-2 pb-3 border-b-2 border-black">
            <Server className="w-5 h-5 text-black stroke-[2.5]" />
            Carrier Gateway Health
          </h3>
          <div className="space-y-3 text-xs font-bold text-black">
            <div className="flex justify-between py-2 border-b-2 border-black">
              <span className="text-black/70 font-bold">Primary SIP Gateway:</span>
              <span className="font-mono font-black text-black">sip.hyderabad.voicepilot.in</span>
            </div>
            <div className="flex justify-between py-2 border-b-2 border-black">
              <span className="text-black/70 font-bold">Backup Failover:</span>
              <span className="font-mono font-black text-black">sip.mumbai.voicepilot.in (Hot Standby)</span>
            </div>
            <div className="flex justify-between py-2 border-b-2 border-black">
              <span className="text-black/70 font-bold">Codec Negotiation:</span>
              <span className="font-mono font-black bg-[#ffe600] text-black px-2.5 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_#000000]">G.711 / Opus Wideband HD</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-black/70 font-bold">SRTP Security:</span>
              <span className="font-mono font-black bg-[#d6ff38] text-black px-2.5 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_#000000]">TLS 1.3 / SRTP Enabled</span>
            </div>
          </div>
        </div>

        <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-[6px_6px_0px_#000000]">
          <h3 className="text-lg font-black text-black uppercase mb-3 flex items-center gap-2 pb-3 border-b-2 border-black">
            <Activity className="w-5 h-5 text-black stroke-[2.5]" />
            Live Telephony Health SLA
          </h3>
          <div className="space-y-3 text-xs font-bold text-black">
            <div className="flex justify-between py-2 border-b-2 border-black">
              <span className="text-black/70 font-bold">Uptime SLA:</span>
              <span className="font-mono font-black bg-[#d6ff38] text-black px-2.5 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_#000000]">99.98% Guaranteed</span>
            </div>
            <div className="flex justify-between py-2 border-b-2 border-black">
              <span className="text-black/70 font-bold">Acoustic Jitter:</span>
              <span className="font-mono font-black text-black bg-[#00f0ff] px-2 py-0.5 rounded border border-black">1.2 ms</span>
            </div>
            <div className="flex justify-between py-2 border-b-2 border-black">
              <span className="text-black/70 font-bold">Packet Loss:</span>
              <span className="font-mono font-black text-black">0.00%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-black/70 font-bold">STIR/SHAKEN Caller ID Attestation:</span>
              <span className="font-mono font-black bg-[#c084fc] text-black px-2.5 py-0.5 rounded border-2 border-black shadow-[1px_1px_0px_#000000]">Level A (Full Verified)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
