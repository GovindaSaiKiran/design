"use client";

import React from "react";
import { mockTelephonyNumbers } from "@/data/mock/dashboardData";
import { Phone, Radio, ArrowUpRight, Activity, ShieldCheck, Server } from "lucide-react";

interface TelephonyStatusProps {
  onManageNumbers?: () => void;
}

export default function TelephonyStatus({ onManageNumbers }: TelephonyStatusProps) {
  return (
    <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000] flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d6ff38] border border-black" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38]">
              Carrier & SIP Network
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              3 Numbers Active
            </span>
          </div>

          <button
            onClick={onManageNumbers}
            className="text-xs font-black uppercase text-black hover:bg-[#d6ff38] px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000000] transition-all inline-flex items-center gap-1 cursor-pointer"
          >
            Manage
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>

        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-black text-black tracking-tight uppercase">
            TELEPHONY ROUTING
          </h3>
          <span className="text-xs font-mono font-black text-black bg-[#fcffe0] px-2 py-0.5 rounded border border-black">
            Latency: <strong className="text-black">38ms avg</strong>
          </span>
        </div>
        <p className="text-xs font-bold text-black/70 mt-0.5">
          Dedicated virtual SIP trunks with instant carrier failover
        </p>
      </div>

      {/* Number List */}
      <div className="space-y-2.5 my-4">
        {mockTelephonyNumbers.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-white border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center justify-between gap-3 hover:bg-[#fcffe0] transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-[#d6ff38] text-black border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#000000]">
                <Phone className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="min-w-0">
                <div className="font-black text-black font-mono text-xs truncate">
                  {item.phoneNumber}
                </div>
                <div className="text-[11px] font-bold text-black/70 truncate">
                  Assigned: <strong className="text-black">{item.assignedAgent}</strong>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-white text-black border-2 border-black shadow-[1px_1px_0px_#000000]">
                {item.channelType}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action / Health Telemetry */}
      <div className="pt-3 border-t-2 border-black/10 flex items-center justify-between text-xs font-bold text-black">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          99.98% Carrier SLA
        </span>
        <button
          onClick={onManageNumbers}
          className="text-xs font-black uppercase text-black hover:bg-[#d6ff38] px-2 py-0.5 rounded border border-black cursor-pointer"
        >
          Provision New DID
        </button>
      </div>
    </div>
  );
}
