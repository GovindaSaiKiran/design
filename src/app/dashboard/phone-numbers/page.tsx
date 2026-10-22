"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PhoneCall,
  ShoppingBag,
  ListOrdered,
  CreditCard,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  PhoneIncoming,
  Radio,
  Sliders,
  Sparkles,
  Info,
  Server,
  Layers,
  ChevronRight,
  RefreshCw,
  Phone,
} from "lucide-react";
import BuyNumbersTab from "@/components/dashboard/phone-numbers/BuyNumbersTab";
import MyNumbersTab from "@/components/dashboard/phone-numbers/MyNumbersTab";
import UsageCostsTab from "@/components/dashboard/phone-numbers/UsageCostsTab";
import PurchaseConfirmModal from "@/components/dashboard/phone-numbers/PurchaseConfirmModal";
import {
  AvailableMarketplaceNumber,
  OwnedWorkspaceNumber,
  PhoneNumbersOverviewMetrics,
  NumberUsageCostRecord,
} from "@/types/phoneNumbers";
import { mockAgents } from "@/data/mock/dashboardData";
import {
  initialOwnedNumbers,
  initialMarketplaceCatalog,
  initialPhoneNumbersMetrics,
  initialUsageRecords,
} from "@/data/mock/phoneNumbersData";

export default function PhoneNumbersPage() {
  const [activeTab, setActiveTab] = useState<"buy" | "my-numbers" | "usage">("my-numbers");
  
  // Data State initialized with instant data, synchronized via API
  const [ownedNumbers, setOwnedNumbers] = useState<OwnedWorkspaceNumber[]>(initialOwnedNumbers);
  const [marketplaceCatalog, setMarketplaceCatalog] = useState<AvailableMarketplaceNumber[]>(initialMarketplaceCatalog);
  const [metrics, setMetrics] = useState<PhoneNumbersOverviewMetrics>(initialPhoneNumbersMetrics);
  const [usageRecords, setUsageRecords] = useState<NumberUsageCostRecord[]>(initialUsageRecords);
  const [isLoading, setIsLoading] = useState(false);

  // Modal / Toast states
  const [selectedNumberToBuy, setSelectedNumberToBuy] = useState<AvailableMarketplaceNumber | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [toastNotice, setToastNotice] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);
  const [showAdvancedSip, setShowAdvancedSip] = useState(false);

  const availableAgents = mockAgents.map((a) => ({
    id: a.id,
    name: a.name,
    role: a.role,
  }));

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToastNotice({ message, type });
    setTimeout(() => {
      setToastNotice(null);
    }, 4500);
  };

  // Fetch data from API
  const fetchPhoneNumbersData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/phone-numbers");
      const data = await res.json();
      if (data.success) {
        setOwnedNumbers(data.ownedNumbers || []);
        setMarketplaceCatalog(data.availableCatalog || data.catalog || []);
        setMetrics(data.metrics || {
          totalActiveNumbers: 0,
          availableToPurchase: 0,
          numbersNeedingAttention: 0,
          monthlyRecurringCost: 0,
          currency: "INR",
        });
        setUsageRecords(data.usageRecords || []);
      }
    } catch (err) {
      console.error("Failed to load phone numbers data:", err);
      showToast("Unable to reach phone numbers service.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhoneNumbersData();
  }, []);

  // Handle Buy Number
  const handleConfirmPurchase = async (params: {
    numberId: string;
    label: string;
    assignedAgentId: string;
    assignedAgentName: string;
    intendedUse: "inbound" | "outbound" | "both";
  }): Promise<boolean> => {
    try {
      const res = await fetch("/api/phone-numbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "buy",
          ...params,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || "Number purchased and activated successfully!", "success");
        setIsPurchaseModalOpen(false);
        setSelectedNumberToBuy(null);
        await fetchPhoneNumbersData();
        setActiveTab("my-numbers");
        return true;
      } else {
        showToast(data.message || "Failed to purchase number.", "error");
        return false;
      }
    } catch (err: any) {
      showToast(err.message || "Network error purchasing number.", "error");
      return false;
    }
  };

  // Handle Update Routing
  const handleUpdateRouting = async (params: {
    numberId: string;
    label?: string;
    assignedAgentId?: string;
    assignedAgentName?: string;
    inboundEnabled?: boolean;
    outboundEnabled?: boolean;
    isDefaultCallerId?: boolean;
  }): Promise<boolean> => {
    try {
      const res = await fetch("/api/phone-numbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update-routing",
          ...params,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || "Call routing updated successfully.", "success");
        await fetchPhoneNumbersData();
        return true;
      } else {
        showToast(data.message || "Failed to update routing.", "error");
        return false;
      }
    } catch (err: any) {
      showToast(err.message || "Network error updating routing.", "error");
      return false;
    }
  };

  // Handle Release Number
  const handleReleaseNumber = async (numberId: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/phone-numbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "release",
          numberId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message || "Number released successfully.", "info");
        await fetchPhoneNumbersData();
        return true;
      } else {
        showToast(data.message || "Failed to release number.", "error");
        return false;
      }
    } catch (err: any) {
      showToast(err.message || "Network error releasing number.", "error");
      return false;
    }
  };

  // Handle Diagnostic Ping
  const handleTestNumber = async (
    number: OwnedWorkspaceNumber
  ): Promise<{ success: boolean; latencyMs?: number; message: string }> => {
    try {
      const res = await fetch("/api/phone-numbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test",
          numberId: number.id,
          phoneNumber: number.phoneNumber,
          assignedAgentName: number.assignedAgentName,
        }),
      });
      const data = await res.json();
      return {
        success: data.success,
        latencyMs: data.latencyMs,
        message: data.message || "Diagnostic test completed.",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "Carrier diagnostic ping failed.",
      };
    }
  };

  const currencySymbol = metrics.currency === "INR" ? "₹" : "$";

  return (
    <div className="space-y-6 font-sans text-[#283A50]">
      {/* Toast Notification Banner */}
      {toastNotice && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-medium shadow-md animate-in fade-in duration-200 ${
            toastNotice.type === "success"
              ? "bg-[#B8DEC8]/50 border-[#2E8066]/30 text-[#165B4C]"
              : toastNotice.type === "error"
              ? "bg-rose-50 border-rose-200 text-rose-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {toastNotice.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-[#2E8066] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{toastNotice.message}</span>
          </div>
          <button
            onClick={() => setToastNotice(null)}
            className="text-[11px] underline opacity-70 hover:opacity-100 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E9E1D4]">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-[#707684] hover:text-[#283A50] transition-colors"
            >
              Overview
            </Link>
            <span className="text-[#E9E1D4]">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#283A50] bg-[#FAF5E9] border border-[#E9E1D4] px-3 py-0.5 rounded-full">
              Phone Numbers
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#283A50] mt-2">
            Phone Numbers
          </h1>

          <p className="text-xs text-[#707684] mt-1 max-w-2xl leading-relaxed">
            Search, rent, and manage business phone numbers for your AI workforce. Connect incoming calls directly to your agents and configure verified caller IDs.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setShowAdvancedSip(true)}
            className="inline-flex items-center gap-1.5 bg-[#FAF5E9] hover:bg-[#FAF5E9]/80 text-[#283A50] text-xs font-semibold px-3.5 py-2.5 rounded-full border border-[#E9E1D4] transition-all cursor-pointer"
            title="Carrier SIP details for technical administrators"
          >
            <Server className="w-3.5 h-3.5 text-[#707684]" />
            <span>Carrier Interconnect</span>
          </button>

          <button
            onClick={() => setActiveTab("buy")}
            className="inline-flex items-center gap-2 bg-[#283A50] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-xs hover:scale-[1.02]"
          >
            <Plus className="w-3.5 h-3.5 text-white" />
            <span>Buy a Number</span>
          </button>
        </div>
      </div>

      {/* Top Compact Overview Metrics (Restrained Metric Summaries) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Metric 1: Total Active Numbers */}
        <div className="bg-white rounded-3xl border border-[#E9E1D4] p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#707684]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Numbers</span>
            <Phone className="w-4 h-4 text-[#283A50]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#283A50]">
            {ownedNumbers.length}
          </div>
          <div className="text-[10px] text-[#2E8066] font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E8066]" />
            All lines operational
          </div>
        </div>

        {/* Metric 2: Available in Marketplace */}
        <div className="bg-white rounded-3xl border border-[#E9E1D4] p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#707684]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Available to Rent</span>
            <ShoppingBag className="w-4 h-4 text-[#C4A5E8]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#283A50]">
            {marketplaceCatalog.length}
          </div>
          <div className="text-[10px] text-[#707684]">
            Across 5 global countries
          </div>
        </div>

        {/* Metric 3: Numbers Needing Attention */}
        <div className="bg-white rounded-3xl border border-[#E9E1D4] p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#707684]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Attention Needed</span>
            <ShieldCheck className="w-4 h-4 text-[#2E8066]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#283A50]">
            {metrics.numbersNeedingAttention}
          </div>
          <div className="text-[10px] text-[#707684]">
            No verification holds
          </div>
        </div>

        {/* Metric 4: Monthly Recurring Cost */}
        <div className="bg-white rounded-3xl border border-[#E9E1D4] p-4 sm:p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[#707684]">
            <span className="text-[11px] font-bold uppercase tracking-wider">Monthly Recurring</span>
            <CreditCard className="w-4 h-4 text-[#283A50]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#283A50]">
            {currencySymbol}
            {ownedNumbers.reduce((acc, n) => acc + n.monthlyPrice, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-[#707684]">
            Base monthly line rental
          </div>
        </div>
      </div>

      {/* Internal Navigation Tabs (Buy Numbers / My Numbers / Usage & Costs) */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-[#E9E1D4] w-fit shadow-xs">
        <button
          onClick={() => setActiveTab("buy")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "buy"
              ? "bg-[#283A50] text-white shadow-xs"
              : "text-[#707684] hover:text-[#283A50] hover:bg-[#FAF5E9]/50"
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Buy Numbers</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === "buy"
                ? "bg-white/20 text-white"
                : "bg-[#FAF5E9] text-[#707684]"
            }`}
          >
            {marketplaceCatalog.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("my-numbers")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "my-numbers"
              ? "bg-[#283A50] text-white shadow-xs"
              : "text-[#707684] hover:text-[#283A50] hover:bg-[#FAF5E9]/50"
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span>My Numbers</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === "my-numbers"
                ? "bg-white/20 text-white"
                : "bg-[#FAF5E9] text-[#707684]"
            }`}
          >
            {ownedNumbers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("usage")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "usage"
              ? "bg-[#283A50] text-white shadow-xs"
              : "text-[#707684] hover:text-[#283A50] hover:bg-[#FAF5E9]/50"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Usage &amp; Costs</span>
        </button>
      </div>

      {/* Tab Content Display */}
      {activeTab === "buy" && (
        <BuyNumbersTab
          catalog={marketplaceCatalog}
          isLoading={isLoading}
          onSelectNumberToBuy={(num) => {
            setSelectedNumberToBuy(num);
            setIsPurchaseModalOpen(true);
          }}
        />
      )}

      {activeTab === "my-numbers" && (
        <MyNumbersTab
          numbers={ownedNumbers}
          availableAgents={availableAgents}
          onUpdateRouting={handleUpdateRouting}
          onReleaseNumber={handleReleaseNumber}
          onTestNumber={handleTestNumber}
          onNavigateToBuy={() => setActiveTab("buy")}
        />
      )}

      {activeTab === "usage" && (
        <UsageCostsTab
          usageRecords={usageRecords}
          currency={metrics.currency}
        />
      )}

      {/* Step 5: Purchase Confirmation Modal */}
      <PurchaseConfirmModal
        isOpen={isPurchaseModalOpen}
        number={selectedNumberToBuy}
        availableAgents={availableAgents}
        onConfirmPurchase={handleConfirmPurchase}
        onClose={() => {
          setIsPurchaseModalOpen(false);
          setSelectedNumberToBuy(null);
        }}
      />

      {/* Advanced Telephony / SIP Trunk Diagnostics Modal (for Technical Admins) */}
      {showAdvancedSip && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAdvancedSip(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-3xl border border-[#E9E1D4] max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 text-xs text-[#283A50] font-sans">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1D4]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center text-[#283A50]">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#283A50]">
                    Carrier Interconnect &amp; SIP Architecture
                  </h3>
                  <p className="text-[10px] text-[#707684]">
                    Technical administrator configuration summary
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAdvancedSip(false)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#707684] leading-relaxed">
              Swaram manages direct digital SIP signalling, session border controllers (SBCs), and RTP media packet encryption automatically for all marketplace numbers.
            </p>

            <div className="space-y-2 p-3.5 rounded-2xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="text-[#707684]">Signaling Gateway:</span>
                <span className="font-semibold text-[#283A50]">sip-inbound.swaram.ai:5061 (TLS)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707684]">Media Codec:</span>
                <span className="font-semibold text-[#283A50]">Opus / G.711u / G.711a (SRTP)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707684]">Allocated Channels:</span>
                <span className="font-semibold text-[#283A50]">32 Concurrent SIP Sessions</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707684]">Carrier Routing Engine:</span>
                <span className="font-semibold text-[#2E8066]">Active &amp; Redundant (Hyd-1 / Bom-2)</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowAdvancedSip(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-[#283A50] text-white hover:bg-black transition-colors cursor-pointer"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
