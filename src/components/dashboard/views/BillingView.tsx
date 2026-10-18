"use client";

import React, { useState } from "react";
import Link from "next/link";
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

export default function BillingView() {
  const [topUpOpen, setTopUpOpen] = useState(false);

  const transactions = [
    {
      id: "TXN-90112",
      date: "Today, 11:20 AM",
      type: "Usage",
      description: "Call Session: Rahul Sharma (2m 24s) — Maya Admissions",
      amount: "-1.2 min",
      status: "Settled",
    },
    {
      id: "TXN-90084",
      date: "Today, 10:45 AM",
      type: "Usage",
      description: "Call Session: Ananya Iyer (1m 48s) — Priya Finance",
      amount: "-1.0 min",
      status: "Settled",
    },
    {
      id: "TXN-89912",
      date: "Oct 18, 2026",
      type: "Credit",
      description: "Institutional Promotional Sandbox Allowance",
      amount: "+14.0 min",
      status: "Credited",
    },
  ];

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A] pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-black/50 hover:text-[#1A1A1A] transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] bg-[#FFD9A0] px-3 py-0.5 rounded-full">
              Billing &amp; Allowance
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Billing &amp; Calling Minutes
          </h1>

          <p className="text-sm text-black/60 mt-1 max-w-2xl leading-relaxed">
            Manage your organization minute balance, call consumption ledger, GST invoice records, and carrier recharge options.
          </p>
        </div>

        <button
          onClick={() => setTopUpOpen(true)}
          className="px-5 py-2.5 rounded-full bg-[#111111] hover:bg-black text-white font-semibold text-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Top Up Minutes</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-[26px] bg-[#D9C2FA] border border-black/[0.04] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-black/60 uppercase tracking-wider">Current Balance</span>
            <span className="p-2 rounded-2xl bg-white/70 text-[#1A1A1A] shadow-2xs">
              <Zap className="w-4 h-4 fill-current" />
            </span>
          </div>
          <div>
            <span className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight">11.8</span>
            <span className="text-xs text-black/60 font-semibold ml-2">Minutes Remaining</span>
          </div>
          <p className="text-xs text-black/60">
            Promotional institutional allowance. 1 Credit = 1 Connected Minute.
          </p>
        </div>

        <div className="p-6 rounded-[26px] bg-[#FFD9A0] border border-black/[0.04] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-black/60 uppercase tracking-wider">Minutes Consumed</span>
            <span className="p-2 rounded-2xl bg-white/70 text-[#1A1A1A] shadow-2xs">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight">2.2</span>
            <span className="text-xs text-black/60 font-semibold ml-2">Minutes Used Today</span>
          </div>
          <p className="text-xs text-black/60">
            Billed strictly per actual audio seconds connected.
          </p>
        </div>

        <div className="p-6 rounded-[26px] bg-white border border-black/[0.06] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-black/45 uppercase tracking-wider">Active Plan</span>
            <span className="p-2 rounded-2xl bg-[#C1F2D5] text-[#16856B]">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-2xl font-bold text-[#1A1A1A]">Standard Production</span>
            <p className="text-xs text-[#16856B] font-semibold mt-0.5">SIP Gateway Enabled</p>
          </div>
          <p className="text-xs text-black/55">
            Inbound DID attendants &amp; batch dialer campaigns enabled.
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-6 rounded-[26px] bg-white border border-black/[0.06] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <div>
            <h3 className="font-bold text-sm text-[#1A1A1A]">
              Usage &amp; Recharge History
            </h3>
            <p className="text-xs text-black/55 mt-0.5">
              Itemized ledger of call sessions, minute deductions, and promotional credit top-ups.
            </p>
          </div>
          <button
            onClick={() => alert("Downloading GST invoice statement...")}
            className="text-xs font-semibold text-[#1A1A1A] px-4 py-1.5 rounded-full bg-[#FBF7ED] hover:bg-[#FAF3E4] border border-black/[0.06] flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Statement</span>
          </button>
        </div>

        <div className="border border-black/[0.06] rounded-2xl overflow-hidden divide-y divide-black/[0.06] text-xs">
          <div className="bg-[#FBF7ED] p-3.5 text-black/45 font-semibold text-[11px] grid grid-cols-5">
            <span>Transaction ID</span>
            <span>Date &amp; Time</span>
            <span className="col-span-2">Description</span>
            <span className="text-right">Minutes Change</span>
          </div>

          {transactions.map((txn) => (
            <div key={txn.id} className="p-3.5 grid grid-cols-5 items-center hover:bg-[#FBF7ED]/50 transition-colors text-[#1A1A1A]">
              <span className="font-semibold text-[#1A1A1A]">{txn.id}</span>
              <span className="text-black/50">{txn.date}</span>
              <span className="col-span-2 text-[#1A1A1A] font-medium">{txn.description}</span>
              <span
                className={`text-right font-bold ${
                  txn.amount.startsWith("+") ? "text-[#16856B]" : "text-[#1A1A1A]"
                }`}
              >
                {txn.amount}
              </span>
            </div>
          ))}
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
