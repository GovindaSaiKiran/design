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
    <div className="space-y-8 pb-12 font-sans select-none animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Billing & Calling Credits
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your account balance, minute consumption, and Razorpay/GST invoices.
          </p>
        </div>

        <button
          onClick={() => setTopUpOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md hover:shadow-purple-600/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Top Up Credits</span>
        </button>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-800 text-white shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-200">Current Balance</span>
            <span className="p-1.5 rounded-lg bg-white/10 text-amber-300">
              <Zap className="w-4 h-4 fill-amber-300" />
            </span>
          </div>
          <div>
            <span className="text-4xl font-black">14.0</span>
            <span className="text-xs text-purple-200 ml-2 font-semibold">Credits / Minutes</span>
          </div>
          <p className="text-[11px] text-purple-200">
            Free tier promotional allowance. 1 Credit = 1 Connected Minute.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Minutes Consumed (This Month)</span>
            <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-4xl font-black text-slate-900">0.0</span>
            <span className="text-xs text-slate-500 ml-2 font-semibold">Mins Talk Time</span>
          </div>
          <p className="text-[11px] text-slate-500 font-semibold">
            No live minutes billed during current cycle.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Workspace Plan</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">Free Tier</span>
            <p className="text-xs text-purple-700 font-bold mt-0.5">Starter Sandbox</p>
          </div>
          <p className="text-[11px] text-slate-500">
            Outbound test calls & conversational simulation enabled
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Credits Usage & Recharge History</h3>
          <button
            onClick={() => alert("No invoices available yet for this workspace.")}
            className="text-xs font-semibold text-purple-700 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Invoices</span>
          </button>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
          <div className="bg-slate-50 p-3 font-semibold text-slate-500 grid grid-cols-5">
            <span>Transaction ID</span>
            <span>Date & Time</span>
            <span className="col-span-2">Description</span>
            <span className="text-right">Credits Amount</span>
          </div>

          {transactions.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <CreditCard className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No transactions recorded yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Credits usage from outbound AI calls or wallet top-ups will appear here in real time.
              </p>
            </div>
          ) : (
            transactions.map((txn) => (
              <div key={txn.id} className="p-3.5 grid grid-cols-5 items-center hover:bg-slate-50/80">
                <span className="font-mono font-bold text-slate-900">{txn.id}</span>
                <span className="text-slate-500">{txn.date}</span>
                <span className="col-span-2 text-slate-800 font-medium">{txn.description}</span>
                <span
                  className={`text-right font-extrabold ${
                    txn.amount.startsWith("+") ? "text-emerald-600" : "text-slate-900"
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
