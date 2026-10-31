import React, { useState } from "react";
import {
  CreditCard,
  Zap,
  Clock,
  ShieldCheck,
  Download,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Sliders,
  FileText,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { BillingPlanInfo } from "@/types/settings";

interface PlanBillingTabProps {
  initialBilling: BillingPlanInfo;
  onSaveBilling: (updated: BillingPlanInfo) => Promise<boolean>;
}

export default function PlanBillingTab({ initialBilling, onSaveBilling }: PlanBillingTabProps) {
  const [billing, setBilling] = useState<BillingPlanInfo>(initialBilling);
  const [isSaving, setIsSaving] = useState(false);
  const [saveNotice, setSaveNotice] = useState(false);

  const percentUsed = Math.min(
    100,
    Math.round((billing.usedMinutes / billing.includedMinutes) * 100)
  );

  const remainingMinutes = Math.max(0, billing.includedMinutes - billing.usedMinutes);

  const handleToggleAlerts = async () => {
    const updated = { ...billing, usageAlertsEnabled: !billing.usageAlertsEnabled };
    setBilling(updated);
    await onSaveBilling(updated);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2500);
  };

  const handleSpendingLimitChange = async (newLimit: number) => {
    const updated = { ...billing, spendingLimitMonthly: newLimit };
    setBilling(updated);
    await onSaveBilling(updated);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2500);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Plan, Minutes &amp; Invoices"
        badge={billing.planBadge}
        whatIsThis="Your enterprise subscription, telephony talk-time quota, payment cards, and tax invoices."
        whyDoINeedIt="Ensures your outbound call dispatchers and WhatsApp bots never pause unexpectedly due to exhausted minutes or failed billing renewals."
        whatToDoNext={`Review your remaining minutes (${remainingMinutes.toLocaleString()} min left this cycle) or configure a spending limit cap to guard against unwanted overages.`}
      >
        <button
          type="button"
          onClick={() => alert("Redirecting to Plan Tier Upgrade selector...")}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer"
        >
          <span>Upgrade Tier</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </SectionHeader>

      {saveNotice && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Billing parameters and spending limits updated successfully.</span>
        </div>
      )}

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active Plan Card */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
              Current Plan
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#B8DEC8]/50 text-[#2E8066]">
              Active Renewal
            </span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#283A50]">{billing.planPrice}</h3>
            <span className="text-xs text-[#707684]">per {billing.billingPeriod.toLowerCase()}</span>
          </div>
          <p className="text-xs text-[#283A50] font-medium leading-relaxed">
            {billing.planName} • Includes priority PRI trunk allocation and 24/7 SLA.
          </p>
          <div className="text-[11px] text-[#707684] pt-2 border-t border-[#E9E1D4]/60">
            Current cycle: {billing.currentPeriodStart} – {billing.currentPeriodEnd}
          </div>
        </div>

        {/* Minutes Quota Bar Card */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
              Talk-Time Minutes
            </span>
            <span className="text-[11px] font-bold text-[#283A50]">
              {remainingMinutes} min left
            </span>
          </div>
          <div>
            <div className="flex items-baseline justify-between text-xs mb-1.5">
              <span className="font-bold text-[#283A50] text-lg">{billing.usedMinutes}</span>
              <span className="text-[#707684]">of {billing.includedMinutes} included min</span>
            </div>
            {/* Progress Track */}
            <div className="w-full h-2 rounded-full bg-[#FAF5E9] overflow-hidden border border-[#E9E1D4]">
              <div
                className="h-full bg-[#283A50] rounded-full transition-all duration-300"
                style={{ width: `${percentUsed}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-[#707684] leading-relaxed">
            Overage rate: <strong>{billing.overageRatePerMinute}</strong> after included minutes expire.
          </p>
          <div className="text-[11px] text-[#2E8066] font-semibold pt-2 border-t border-[#E9E1D4]/60 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Never pause: Auto-overage enabled</span>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
              Default Payment Method
            </span>
            <span className="text-[11px] font-semibold text-[#707684]">Auto-Debit</span>
          </div>
          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-7 rounded-lg bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center font-bold text-[#283A50] text-xs">
              VISA
            </div>
            <div>
              <span className="text-xs font-bold text-[#283A50] block">
                •••• •••• •••• {billing.paymentMethod.last4}
              </span>
              <span className="text-[11px] text-[#707684]">
                Expires {billing.paymentMethod.expMonth}/{billing.paymentMethod.expYear}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#707684] leading-relaxed">
            Receipts sent to: <strong>{billing.billingEmail}</strong>
          </p>
          <div className="text-[11px] text-[#707684] pt-2 border-t border-[#E9E1D4]/60">
            GSTIN: <span className="font-mono text-[#283A50] font-semibold">{billing.gstinTaxId}</span>
          </div>
        </div>
      </div>

      {/* Spending Limits & Usage Alerts Control */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#707684]">
          Spending Protection &amp; Overage Guardrails
        </h4>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4]">
          <div>
            <strong className="text-xs font-bold text-[#283A50] block">
              Low Balance &amp; Overage Email Notifications
            </strong>
            <p className="text-xs text-[#707684] mt-0.5">
              Receive early warnings at 80% and 95% talk-time consumption before any overage fees apply.
            </p>
          </div>
          <button
            type="button"
            onClick={handleToggleAlerts}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer shrink-0 ${
              billing.usageAlertsEnabled
                ? "bg-[#283A50] text-white"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {billing.usageAlertsEnabled ? "Alerts Active" : "Alerts Muted"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4]">
          <div>
            <strong className="text-xs font-bold text-[#283A50] block">
              Hard Monthly Spending Cap
            </strong>
            <p className="text-xs text-[#707684] mt-0.5">
              Prevent unintended high-volume calling fees. Dispatches automatically pause if total monthly bill reaches this threshold.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-[#283A50]">₹</span>
            <input
              type="number"
              value={billing.spendingLimitMonthly}
              onChange={(e) => handleSpendingLimitChange(Number(e.target.value))}
              className="w-28 text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-[#E9E1D4] text-[#283A50] focus:outline-none"
            />
            <span className="text-[11px] text-[#707684]">/ month</span>
          </div>
        </div>
      </div>

      {/* Purchased Numbers and Associated Charges */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] overflow-hidden shadow-2xs">
        <div className="px-6 py-4 bg-[#FAF5E9]/50 border-b border-[#E9E1D4] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#283A50] block">
              Purchased Phone Numbers &amp; Carrier Trunks
            </span>
            <span className="text-[11px] text-[#707684]">
              Dedicated inbound lines and outbound caller IDs reserved for this workspace
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[#283A50] bg-[#FAF5E9] px-2.5 py-1 rounded-lg border border-[#E9E1D4]">
            {billing.purchasedNumbers?.length || 2} Lines Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E9E1D4] text-[#707684] font-semibold text-[11px] uppercase tracking-wider bg-white">
                <th className="py-3 px-5">Phone Number</th>
                <th className="py-3 px-5">Label / Desk</th>
                <th className="py-3 px-5">Channel Type</th>
                <th className="py-3 px-5">Monthly Charge</th>
                <th className="py-3 px-5 text-right">Renewal Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E1D4]/60">
              {(
                billing.purchasedNumbers || [
                  {
                    id: "num-1",
                    phoneNumber: "+91 40 4821 9900",
                    label: "Primary Inbound Line",
                    channelType: "PRI SIP Trunk",
                    monthlyFee: "₹1,200",
                    renewalDate: "15 Nov 2026",
                  },
                  {
                    id: "num-2",
                    phoneNumber: "+91 40 4821 9901",
                    label: "Outbound Automated Desk",
                    channelType: "High-Throughput Trunk",
                    monthlyFee: "₹1,200",
                    renewalDate: "15 Nov 2026",
                  },
                ]
              ).map((num) => (
                <tr key={num.id} className="hover:bg-[#FAF5E9]/30 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-[#283A50]">
                    {num.phoneNumber}
                  </td>
                  <td className="py-3.5 px-5 text-[#283A50] font-medium">{num.label}</td>
                  <td className="py-3.5 px-5 text-[#707684]">{num.channelType}</td>
                  <td className="py-3.5 px-5 font-bold text-[#283A50]">{num.monthlyFee}/mo</td>
                  <td className="py-3.5 px-5 text-right text-[#707684]">{num.renewalDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Invoices History */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] overflow-hidden shadow-2xs">
        <div className="px-6 py-4 bg-[#FAF5E9]/50 border-b border-[#E9E1D4] flex items-center justify-between">
          <span className="text-xs font-bold text-[#283A50]">
            GST Invoices &amp; Payment History
          </span>
          <span className="text-[11px] text-[#707684]">
            Tax Deductible under Indian Goods &amp; Services Tax Rules
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E9E1D4] text-[#707684] font-semibold text-[11px] uppercase tracking-wider bg-white">
                <th className="py-3 px-5">Invoice #</th>
                <th className="py-3 px-5">Billing Date</th>
                <th className="py-3 px-5">Total Paid</th>
                <th className="py-3 px-5">Payment Status</th>
                <th className="py-3 px-5 text-right">PDF Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E1D4]/60">
              {billing.invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-[#FAF5E9]/30 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-semibold text-[#283A50]">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-5 text-[#707684]">{inv.date}</td>
                  <td className="py-3.5 px-5 font-bold text-[#283A50]">{inv.amount}</td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2E8066] bg-[#B8DEC8]/50 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#2E8066]" />
                      Paid
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Downloading official GST invoice ${inv.invoiceNumber} (PDF)...`)}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF5E9] hover:bg-[#FAF3E4] text-[#283A50] border border-[#E9E1D4] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
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
