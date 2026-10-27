"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Download,
  Calendar,
  DollarSign,
  PhoneCall,
  Clock,
  Info,
  TrendingUp,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";
import { NumberUsageCostRecord } from "@/types/phoneNumbers";

interface UsageCostsTabProps {
  usageRecords: NumberUsageCostRecord[];
  currency?: string;
}

export default function UsageCostsTab({
  usageRecords,
  currency = "INR",
}: UsageCostsTabProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const totalMonthlyRental = usageRecords.reduce((acc, r) => acc + r.monthlyRental, 0);
  const totalMinutes = usageRecords.reduce((acc, r) => acc + r.minutesUsed, 0);
  const totalCallUsageCost = usageRecords.reduce((acc, r) => acc + r.callUsageCost, 0);
  const totalSetupFees = usageRecords.reduce((acc, r) => acc + r.setupFee, 0);
  const totalEstimatedCost = totalMonthlyRental + totalCallUsageCost + totalSetupFees;

  const currencySymbol = currency === "INR" ? "₹" : "$";

  const handleExportCSV = () => {
    const headers = [
      "Phone Number",
      "Label",
      "Type",
      "Assigned Agent",
      "Monthly Rental",
      "Minutes Used",
      "Call Usage Cost",
      "Setup Fee",
      "Total Estimated",
      "Currency",
    ];

    const rows = usageRecords.map((r) => [
      `"${r.phoneNumber}"`,
      `"${r.label}"`,
      `"${r.type}"`,
      `"${r.assignedAgent}"`,
      r.monthlyRental,
      r.minutesUsed,
      r.callUsageCost,
      r.setupFee,
      r.totalBilledCost,
      `"${r.currency}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `swaram_phone_numbers_usage_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportNotice("Telecommunications billing ledger exported successfully as CSV.");
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Export Toast Banner */}
      {exportNotice && (
        <div className="p-4 rounded-2xl bg-[#B8DEC8]/50 border border-[#2E8066]/30 text-[#165B4C] text-xs flex items-center justify-between shadow-2xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#2E8066]" />
            <span>{exportNotice}</span>
          </div>
        </div>
      )}

      {/* Header & Date Range Filter */}
      <div className="bg-white rounded-3xl border border-[#E9E1D4] p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#283A50] flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#C4A5E8]" />
            Telecommunications Usage &amp; Expenses
          </h2>
          <p className="text-xs text-[#707684] mt-0.5">
            Transparent breakdown of number monthly subscriptions versus carrier voice talk-time.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1.5 bg-[#FAF5E9]/60 border border-[#E9E1D4] rounded-2xl p-1 text-xs">
            <button
              onClick={() => setSelectedPeriod("current")}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedPeriod === "current"
                  ? "bg-white text-[#283A50] shadow-2xs font-semibold"
                  : "text-[#707684] hover:text-[#283A50]"
              }`}
            >
              Current Month (Oct 2026)
            </button>
            <button
              onClick={() => setSelectedPeriod("previous")}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedPeriod === "previous"
                  ? "bg-white text-[#283A50] shadow-2xs font-semibold"
                  : "text-[#707684] hover:text-[#283A50]"
              }`}
            >
              Sep 2026
            </button>
            <button
              onClick={() => setSelectedPeriod("ytd")}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedPeriod === "ytd"
                  ? "bg-white text-[#283A50] shadow-2xs font-semibold"
                  : "text-[#707684] hover:text-[#283A50]"
              }`}
            >
              Year-to-Date
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold bg-[#FAF5E9] hover:bg-[#FAF5E9]/80 border border-[#E9E1D4] text-[#283A50] transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Monthly Rental */}
        <div className="bg-white rounded-3xl border border-[#E9E1D4] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#707684]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Number Subscriptions</span>
            <PhoneCall className="w-4 h-4 text-[#283A50]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#283A50]">
            {currencySymbol}{totalMonthlyRental.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#707684]">
            {usageRecords.length} active rented phone numbers
          </div>
        </div>

        {/* Card 2: Talk Time Used */}
        <div className="bg-white rounded-3xl border border-[#E9E1D4] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#707684]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Talk-Time Consumed</span>
            <Clock className="w-4 h-4 text-[#C4A5E8]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#283A50]">
            {totalMinutes.toLocaleString()}{" "}
            <span className="text-sm font-sans font-normal text-[#707684]">mins</span>
          </div>
          <div className="text-[11px] text-[#707684]">
            Inbound &amp; outbound carrier minutes
          </div>
        </div>

        {/* Card 3: Call Usage Cost */}
        <div className="bg-white rounded-3xl border border-[#E9E1D4] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#707684]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Carrier Minute Cost</span>
            <TrendingUp className="w-4 h-4 text-[#2E8066]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#283A50]">
            {currencySymbol}{totalCallUsageCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#2E8066] font-medium">
            Billed at per-minute carrier transit rate
          </div>
        </div>

        {/* Card 4: Estimated Total */}
        <div className="bg-white rounded-3xl border border-[#E9E1D4] p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-[#707684]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Current Period Estimate</span>
            <FileText className="w-4 h-4 text-[#283A50]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#283A50]">
            {currencySymbol}{totalEstimatedCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-[#707684]">
            Estimated total before taxes &amp; discounts
          </div>
        </div>
      </div>

      {/* Clarification Alert */}
      <div className="p-4 rounded-2xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-start gap-3 text-xs text-[#283A50]">
        <Info className="w-4 h-4 text-[#283A50] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Billing Guidance:</span> Telecommunications charges consist of two items: (1) A predictable monthly subscription to reserve the phone number, and (2) Usage fees incurred strictly based on actual minutes connected. Usage amounts displayed above represent live estimates and are consolidated onto your monthly Swaram invoice.
        </div>
      </div>

      {/* Per-Number Cost Breakdown Table */}
      <div className="bg-white rounded-3xl border border-[#E9E1D4] overflow-hidden shadow-xs">
        <div className="p-5 border-b border-[#E9E1D4] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#283A50]">
            Per-Number Expense Breakdown
          </h3>
          <span className="text-[11px] text-[#707684]">
            Values reflect current billing cycle
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E9E1D4] bg-[#FAF5E9]/50 text-[11px] font-bold uppercase tracking-wider text-[#707684]">
                <th className="py-3 px-5">Phone Number &amp; Label</th>
                <th className="py-3 px-5">Number Type</th>
                <th className="py-3 px-5">Assigned Agent</th>
                <th className="py-3 px-5">Monthly Rental</th>
                <th className="py-3 px-5">Talk Time</th>
                <th className="py-3 px-5">Call Usage</th>
                <th className="py-3 px-5 text-right">Total Estimated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E1D4]">
              {usageRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-[#707684]">
                    No telecommunications usage recorded in this billing cycle.
                  </td>
                </tr>
              ) : (
                usageRecords.map((item) => {
                return (
                  <tr key={item.numberId} className="hover:bg-[#FAF5E9]/30 transition-colors">
                    {/* Number & Label */}
                    <td className="py-4 px-5">
                      <div className="font-mono font-bold text-[#283A50]">
                        {item.phoneNumber}
                      </div>
                      <div className="text-[11px] text-[#707684] mt-0.5">
                        {item.label}
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4]">
                        {item.type}
                      </span>
                    </td>

                    {/* Assigned Agent */}
                    <td className="py-4 px-5">
                      <div className="font-medium text-[#283A50]">{item.assignedAgent}</div>
                    </td>

                    {/* Monthly Rental */}
                    <td className="py-4 px-5 font-mono">
                      {currencySymbol}{item.monthlyRental.toLocaleString()}
                    </td>

                    {/* Talk Time */}
                    <td className="py-4 px-5">
                      <span className="font-medium text-[#283A50]">{item.minutesUsed}</span>
                      <span className="text-[10px] text-[#707684]"> mins</span>
                    </td>

                    {/* Call Usage */}
                    <td className="py-4 px-5 font-mono">
                      {currencySymbol}{item.callUsageCost.toLocaleString()}
                    </td>

                    {/* Total Estimated */}
                    <td className="py-4 px-5 text-right font-mono font-bold text-[#283A50]">
                      {currencySymbol}{item.totalBilledCost.toLocaleString()}
                    </td>
                  </tr>
                );
              }))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#E9E1D4] bg-[#FAF5E9]/70 font-semibold text-xs text-[#283A50]">
                <td className="py-3.5 px-5" colSpan={3}>
                  Total Consolidated Telecommunications
                </td>
                <td className="py-3.5 px-5 font-mono">
                  {currencySymbol}{totalMonthlyRental.toLocaleString()}
                </td>
                <td className="py-3.5 px-5">
                  {totalMinutes.toLocaleString()} mins
                </td>
                <td className="py-3.5 px-5 font-mono">
                  {currencySymbol}{totalCallUsageCost.toLocaleString()}
                </td>
                <td className="py-3.5 px-5 text-right font-mono font-bold text-[#283A50]">
                  {currencySymbol}{totalEstimatedCost.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
