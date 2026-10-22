"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  PhoneIncoming,
  PhoneOutgoing,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  CostIntelligenceBreakdown,
  DailyUsageDataPoint,
} from "@/types/usageControls";

interface CostIntelligenceAndTrendsProps {
  costs: CostIntelligenceBreakdown;
  dailyTrends: DailyUsageDataPoint[];
  invoices: Array<{
    id: string;
    date: string;
    billingPeriod: string;
    amount: string;
    status: string;
    minutesBilled: string;
    paymentMethod: string;
  }>;
  onOpenTopUp: () => void;
  currency?: string;
}

export default function CostIntelligenceAndTrends({
  costs,
  dailyTrends,
  invoices,
  onOpenTopUp,
  currency = "INR",
}: CostIntelligenceAndTrendsProps) {
  const [statementToast, setStatementToast] = useState<string | null>(null);

  const currencySymbol = currency === "INR" ? "₹" : "$";

  const maxDailyMinutes = Math.max(...dailyTrends.map((d) => d.totalMinutes), 100);

  const handleDownloadInvoice = (invoiceId: string) => {
    setStatementToast(`Downloading tax invoice & GST statement for ${invoiceId}...`);
    setTimeout(() => setStatementToast(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {statementToast && (
        <div className="p-3.5 rounded-2xl bg-[#B8DEC8]/50 border border-[#2E8066]/30 text-[#165B4C] text-xs flex items-center justify-between shadow-2xs animate-in fade-in">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#2E8066]" />
            <span>{statementToast}</span>
          </div>
        </div>
      )}

      {/* Grid: 7-Day Usage Trend (Left) & Cost Intelligence Breakdown (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 7-Day Usage Trend Visualization (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E9E1D4] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9E1D4]">
            <div>
              <h3 className="text-sm font-bold text-[#283A50] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#C4A5E8]" />
                Daily Minute Consumption Trend
              </h3>
              <p className="text-xs text-[#707684] mt-0.5">
                Past 7 days minute velocity split by Inbound vs. Outbound calling
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1.5 text-[#283A50]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#283A50]" />
                Inbound
              </span>
              <span className="flex items-center gap-1.5 text-[#707684]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#C4A5E8]" />
                Outbound
              </span>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-44 flex items-end gap-3 pt-4 px-2">
            {dailyTrends.map((dp) => {
              const inboundHeight = (dp.inboundMinutes / maxDailyMinutes) * 100;
              const outboundHeight = (dp.outboundMinutes / maxDailyMinutes) * 100;

              return (
                <div
                  key={dp.dateLabel}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                >
                  <div className="text-[10px] font-mono text-[#707684] opacity-0 group-hover:opacity-100 transition-opacity">
                    {dp.totalMinutes}m
                  </div>
                  <div className="w-full max-w-[36px] bg-[#FAF5E9] rounded-t-xl overflow-hidden flex flex-col-reverse h-32 border border-[#E9E1D4]">
                    <div
                      style={{ height: `${inboundHeight}%` }}
                      className="bg-[#283A50] w-full transition-all duration-300"
                      title={`Inbound: ${dp.inboundMinutes} mins`}
                    />
                    <div
                      style={{ height: `${outboundHeight}%` }}
                      className="bg-[#C4A5E8] w-full transition-all duration-300"
                      title={`Outbound: ${dp.outboundMinutes} mins`}
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] font-bold text-[#283A50] block">
                      {dp.dayName}
                    </span>
                    <span className="text-[9px] text-[#707684]">
                      {dp.dateLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[11px] text-[#707684] flex items-center justify-between">
            <span>7-Day Total: <span className="font-bold text-[#283A50]">{dailyTrends.reduce((a, b) => a + b.totalMinutes, 0)} minutes</span></span>
            <span>Average Burn: <span className="font-bold text-[#283A50]">74 mins/day</span></span>
            <span className="text-[#2E8066] font-semibold">Predictable Burn Pace</span>
          </div>
        </div>

        {/* Right: Cost Intelligence Ledger (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E9E1D4] p-6 shadow-xs space-y-4">
          <div className="pb-3 border-b border-[#E9E1D4] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#283A50]">
                Cost Intelligence Breakdown
              </h3>
              <p className="text-[11px] text-[#707684]">
                Live estimated month-to-date charges
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]">
              {costs.billingStatus}
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-[#707684]">Call Transit &amp; Voice Minutes</span>
              <span className="font-mono font-bold text-[#283A50]">
                {currencySymbol}{costs.voiceTransitCharges.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#707684] flex items-center gap-1">
                <span>AI Neural Inference &amp; LLM</span>
                <span className="text-[9px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded-md font-semibold">
                  Bundled
                </span>
              </span>
              <span className="font-mono text-[#2E8066] font-medium">
                Included in Plan
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#707684]">WhatsApp &amp; SMS Confirmations</span>
              <span className="font-mono font-bold text-[#283A50]">
                {currencySymbol}{costs.messagingCharges.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#707684]">Dedicated Phone Numbers (3 active)</span>
              <span className="font-mono font-bold text-[#283A50]">
                {currencySymbol}{costs.numberRentalCharges.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-1 pt-2 border-t border-[#E9E1D4]">
              <span className="text-[#707684]">Subtotal (Pre-tax)</span>
              <span className="font-mono font-bold text-[#283A50]">
                {currencySymbol}{costs.subtotalEstimated.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-[#707684]">Applicable GST (18%)</span>
              <span className="font-mono font-bold text-[#283A50]">
                {currencySymbol}{costs.taxCharges.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between py-2 pt-3 border-t-2 border-[#E9E1D4] bg-[#FAF5E9]/50 px-3 rounded-xl">
              <div>
                <span className="font-bold text-xs text-[#283A50]">Current Estimated Total</span>
                <div className="text-[10px] text-[#707684]">Billed on 12 Nov 2026</div>
              </div>
              <span className="font-mono font-extrabold text-base text-[#283A50]">
                {currencySymbol}{costs.totalEstimatedCurrentCharges.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Invoices Ledger */}
      <div className="bg-white rounded-3xl border border-[#E9E1D4] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#E9E1D4] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#283A50]">
              Invoices &amp; Settlement Statements
            </h3>
            <p className="text-xs text-[#707684] mt-0.5">
              Historical itemized records with GST tax breakdowns and minute reconciliations.
            </p>
          </div>
          <button
            onClick={onOpenTopUp}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#283A50] text-white hover:bg-black transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Recharge Packs</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E9E1D4] bg-[#FAF5E9]/50 text-[11px] font-bold uppercase tracking-wider text-[#707684]">
                <th className="py-3 px-5">Invoice Reference</th>
                <th className="py-3 px-5">Billing Period</th>
                <th className="py-3 px-5">Minutes Accounted</th>
                <th className="py-3 px-5">Amount</th>
                <th className="py-3 px-5">Payment Status</th>
                <th className="py-3 px-5 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E1D4]">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#FAF5E9]/30 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-[#283A50]">
                    {inv.id}
                  </td>
                  <td className="py-3.5 px-5 text-[#707684]">
                    {inv.billingPeriod}
                  </td>
                  <td className="py-3.5 px-5 text-[#283A50] font-medium">
                    {inv.minutesBilled}
                  </td>
                  <td className="py-3.5 px-5 font-mono font-bold text-[#283A50]">
                    {inv.amount}
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#B8DEC8]/40 text-[#165B4C] border border-[#2E8066]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2E8066]" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => handleDownloadInvoice(inv.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border border-[#E9E1D4] bg-[#FAF5E9]/50 hover:bg-[#FAF5E9] text-[#283A50] text-[11px] font-medium transition-colors cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-[#707684]" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
