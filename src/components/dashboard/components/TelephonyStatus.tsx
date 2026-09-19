"use client";

import React from "react";
import { mockTelephonyNumbers } from "@/data/mock/dashboardData";
import { Phone, Radio, ArrowUpRight, Activity, ShieldCheck, Server } from "lucide-react";

interface TelephonyStatusProps {
  onManageNumbers?: () => void;
}

export default function TelephonyStatus({ onManageNumbers }: TelephonyStatusProps) {
  return (
    <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000] flex flex-col justify-between select-none">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#d6ff38] border border-black inline-block animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38] border border-black shadow-[2px_2px_0px_#000000] -rotate-1">
              CARRIER & SIP NETWORK
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              3 NUMBERS ACTIVE
            </span>
          </div>

          <button
            onClick={onManageNumbers}
            className="text-xs font-black uppercase tracking-wider text-black bg-white hover:bg-[#ffe600] px-3 py-1.5 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Manage</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-black text-black tracking-tight uppercase">
            Telephony Routing
          </h3>
          <span className="text-xs font-mono font-black text-black bg-[#d6ff38] px-2.5 py-0.5 rounded-md border-2 border-black shadow-[2px_2px_0px_#000000]">
            Latency: 38ms avg
          </span>
        </div>
        <p className="text-xs font-bold text-black/70 mt-0.5">
          Dedicated virtual SIP trunks with instant sub-millisecond carrier failover
        </p>
      </div>

      {/* Number List */}
      <div className="space-y-3 my-4">
        {mockTelephonyNumbers.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-[#f8fafc] border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-between gap-3 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#ffe600] text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000]">
                <Phone className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="font-black text-black font-mono text-sm truncate">
                  {item.phoneNumber}
                </div>
                <div className="text-[11px] font-bold text-black/70 truncate">
                  Assigned Agent: <strong className="text-black font-black underline">{item.assignedAgent}</strong>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
                {item.channelType}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action / Health Telemetry */}
      <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-bold text-black">
        <span className="flex items-center gap-1.5 text-black font-black">
          <ShieldCheck className="w-4 h-4 text-black stroke-[3]" />
          99.98% Carrier SLA Guaranteed
        </span>
        <button
          onClick={onManageNumbers}
          className="text-xs font-black uppercase tracking-wider text-black bg-[#00f0ff] hover:bg-[#38bdf8] px-3 py-1 rounded-md border-2 border-black shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0px_0px_0px_#000000] transition-all cursor-pointer"
        >
          Provision New DID
        </button>
      </div>
    </div>
  );
}
