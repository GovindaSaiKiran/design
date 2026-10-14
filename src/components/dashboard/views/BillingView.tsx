"use client";

import React, { useState } from "react";
import {
  Zap,
  CreditCard,
  Plus,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Check,
  Download,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";
import TopUpCreditsModal from "../modals/TopUpCreditsModal";
import { soundSynth } from "@/lib/audio-synth";

export default function BillingView() {
  const [topUpOpen, setTopUpOpen] = useState(false);

  const transactions: {
    id: string;
    date: string;
    type: string;
    description: string;
    amount: string;
    status: string;
  }[] = [];

  return (
    <div className="space-y-8 pb-12 font-sans select-none text-white">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#71717A] uppercase">
              BILLING & ACCOUNTING
            </span>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-white bg-[#18181B] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              WALLET ACTIVE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Billing & Calling Credits
          </h1>
          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1">
            Manage your account balance, minute consumption, and Razorpay/GST invoices.
          </p>
        </div>

        <button
          onClick={() => {
            soundSynth.play("confirm");
            setTopUpOpen(true);
          }}
          className="px-4 py-2 rounded-[2px] bg-white hover:bg-zinc-200 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Top Up Credits</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-[2px] bg-[#121215] border border-[#27272A] text-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A]">CURRENT BALANCE</span>
            <span className="p-1.5 rounded-[2px] bg-[#18181B] border border-[#27272A] text-white">
              <Zap className="w-4 h-4 fill-white" />
            </span>
          </div>
          <div>
            <span className="text-4xl font-extrabold font-mono text-white tracking-tight">14.0</span>
            <span className="text-xs font-mono text-[#A1A1AA] ml-2">Credits / Minutes</span>
          </div>
          <p className="text-[11px] font-mono text-[#71717A]">
            Free tier promotional allowance. 1 Credit = 1 Connected Minute.
          </p>
        </div>

        <div className="p-6 rounded-[2px] bg-[#09090B] border border-[#27272A] text-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A]">MINUTES CONSUMED</span>
            <span className="p-1.5 rounded-[2px] bg-[#18181B] border border-[#27272A] text-[#A1A1AA]">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-4xl font-extrabold font-mono text-white tracking-tight">0.0</span>
            <span className="text-xs font-mono text-[#A1A1AA] ml-2">Mins Talk Time</span>
          </div>
          <p className="text-[11px] font-mono text-[#71717A]">
            No live minutes billed during current billing cycle.
          </p>
        </div>

        <div className="p-6 rounded-[2px] bg-[#09090B] border border-[#27272A] text-white space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#71717A]">ACTIVE PLAN</span>
            <span className="p-1.5 rounded-[2px] bg-[#18181B] border border-[#27272A] text-white">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-2xl font-extrabold font-mono text-white uppercase">Free Sandbox</span>
            <p className="text-xs font-mono text-zinc-300 mt-0.5">Trial Capacity</p>
          </div>
          <p className="text-[11px] font-mono text-[#71717A]">
            Outbound test calls & conversational simulation enabled
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-6 rounded-[2px] bg-[#09090B] border border-[#27272A] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs font-mono uppercase tracking-wider text-white">
            Credits Usage & Recharge History
          </h3>
          <button
            onClick={() => {
              soundSynth.play("click");
              alert("No invoices available yet for this workspace.");
            }}
            className="text-xs font-mono uppercase tracking-wider text-white hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Invoices</span>
          </button>
        </div>

        <div className="border border-[#27272A] bg-[#000000] rounded-[2px] overflow-hidden divide-y divide-[#27272A] text-xs font-mono">
          <div className="bg-[#121215] p-3 text-[#71717A] uppercase tracking-wider font-bold text-[10px] grid grid-cols-5">
            <span>Transaction ID</span>
            <span>Date & Time</span>
            <span className="col-span-2">Description</span>
            <span className="text-right">Credits Amount</span>
          </div>

          {transactions.length === 0 ? (
            <div className="py-12 px-4 text-center font-mono">
              <CreditCard className="w-8 h-8 text-[#71717A] mx-auto mb-2" />
              <p className="text-sm font-bold text-white uppercase tracking-wider">No Transactions Recorded</p>
              <p className="text-xs text-[#71717A] mt-1 max-w-sm mx-auto font-sans">
                Credits usage from outbound AI calls or wallet top-ups will appear here in real time.
              </p>
            </div>
          ) : (
            transactions.map((txn) => (
              <div key={txn.id} className="p-3.5 grid grid-cols-5 items-center hover:bg-[#121215] text-white">
                <span className="font-mono font-bold text-white">{txn.id}</span>
                <span className="text-[#A1A1AA]">{txn.date}</span>
                <span className="col-span-2 text-white font-medium">{txn.description}</span>
                <span
                  className={`text-right font-extrabold ${
                    txn.amount.startsWith("+") ? "text-white" : "text-zinc-400"
                  }`}
                >
                  {txn.amount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Top Up Modal */}
      <TopUpCreditsModal
        isOpen={topUpOpen}
        onClose={() => setTopUpOpen(false)}
        currentCredits={14}
      />
    </div>
  );
}
