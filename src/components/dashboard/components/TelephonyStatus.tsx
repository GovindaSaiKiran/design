"use client";

import React from "react";
import { mockTelephonyNumbers } from "@/data/mock/dashboardData";
import { Phone, Radio, ArrowUpRight, Activity, ShieldCheck, Server } from "lucide-react";

interface TelephonyStatusProps {
  onManageNumbers?: () => void;
}

export default function TelephonyStatus({ onManageNumbers }: TelephonyStatusProps) {
  return (
    <div className="liquid-glass-card p-7 transition-all duration-300 flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 border border-black/5 text-neutral-700">
              Carrier & SIP Network
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
              3 Lines Active
            </span>
          </div>

          <button
            onClick={onManageNumbers}
            className="text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-xl border border-black/5 transition-all inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Manage</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <h3 className="text-xl font-semibold text-neutral-900 tracking-tight">
            Virtual Number Routing Table
          </h3>
          <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Latency: 38ms avg
          </span>
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">
          Dedicated virtual SIP trunks with instant sub-millisecond carrier failover
        </p>
      </div>

      {/* Number List */}
      <div className="space-y-3 my-5">
        {mockTelephonyNumbers.map((item) => (
          <div
            key={item.id}
            className="liquid-glass-subtle p-4 rounded-2xl border border-black/10 hover:border-black/30 hover:bg-white/80 hover:shadow-xs transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Phone className="w-4 h-4 stroke-[2]" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-neutral-900 font-mono text-sm truncate">
                  {item.phoneNumber}
                </div>
                <div className="text-xs text-neutral-500 truncate mt-0.5">
                  Assigned Agent: <strong className="text-neutral-800 font-medium">{item.assignedAgent}</strong>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-neutral-200/70 text-neutral-700 border border-black/5">
                {item.channelType}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action / Health Telemetry */}
      <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs">
        <span className="flex items-center gap-2 text-neutral-600 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          99.98% Carrier SLA Guaranteed
        </span>
        <button
          onClick={onManageNumbers}
          className="text-xs font-semibold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 px-3.5 py-1.5 rounded-xl border border-black/10 transition-all cursor-pointer"
        >
          Provision New DID
        </button>
      </div>
    </div>
  );
}
