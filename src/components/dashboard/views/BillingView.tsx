"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Gauge,
  Calculator,
  ShieldAlert,
  CreditCard,
  Bot,
  Plus,
  Zap,
  TrendingUp,
  Download,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Sparkles,
  Info,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import OperatingCapacityHeader from "../usage-controls/OperatingCapacityHeader";
import CampaignCapacitySimulator from "../usage-controls/CampaignCapacitySimulator";
import AgentEfficiencyTable from "../usage-controls/AgentEfficiencyTable";
import SmartGuardrailsPanel from "../usage-controls/SmartGuardrailsPanel";
import CostIntelligenceAndTrends from "../usage-controls/CostIntelligenceAndTrends";
import TopUpCreditsModal from "../modals/TopUpCreditsModal";
import {
  WorkspaceCapacity,
  AgentUsageMetric,
  UsageGuardrailsConfig,
  CostIntelligenceBreakdown,
  DailyUsageDataPoint,
} from "@/types/usageControls";
import {
  initialWorkspaceCapacity,
  initialAgentMetrics,
  initialGuardrailsConfig,
  initialCostBreakdown,
  initialDailyUsageTrend,
  initialInvoicesList,
} from "@/data/mock/usageControlsData";
import { mockAgents } from "@/data/mock/dashboardData";

export default function BillingView() {
  const [activeTab, setActiveTab] = useState<"capacity" | "simulator" | "costs">("capacity");
  
  // State
  const [capacity, setCapacity] = useState<WorkspaceCapacity>(initialWorkspaceCapacity);
  const [agents, setAgents] = useState<AgentUsageMetric[]>(initialAgentMetrics);
  const [guardrails, setGuardrails] = useState<UsageGuardrailsConfig>(initialGuardrailsConfig);
  const [costs, setCosts] = useState<CostIntelligenceBreakdown>(initialCostBreakdown);
  const [dailyTrends, setDailyTrends] = useState<DailyUsageDataPoint[]>(initialDailyUsageTrend);
  const [invoices, setInvoices] = useState(initialInvoicesList);
  
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [toastNotice, setToastNotice] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToastNotice({ message, type });
    setTimeout(() => setToastNotice(null), 4000);
  };

  // Synchronize with API
  const fetchUsageData = async () => {
    try {
      const res = await fetch("/api/usage-controls");
      const data = await res.json();
      if (data.success) {
        if (data.capacity) setCapacity(data.capacity);
        if (data.agents) setAgents(data.agents);
        if (data.guardrails) setGuardrails(data.guardrails);
        if (data.costs) setCosts(data.costs);
        if (data.dailyTrends) setDailyTrends(data.dailyTrends);
        if (data.invoices) setInvoices(data.invoices);
      }
    } catch (err) {
      console.error("Failed to load usage controls data:", err);
    }
  };

  useEffect(() => {
    fetchUsageData();
  }, []);

  // Save Guardrails handler
  const handleSaveGuardrails = async (updated: Partial<UsageGuardrailsConfig>): Promise<boolean> => {
    try {
      const res = await fetch("/api/usage-controls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update-guardrails",
          payload: updated,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setGuardrails(data.guardrails);
        showToast("Smart usage guardrails and spending policy saved successfully.", "success");
        return true;
      } else {
        showToast(data.message || "Failed to update guardrails.", "error");
        return false;
      }
    } catch (err: any) {
      showToast(err.message || "Network error updating guardrails.", "error");
      return false;
    }
  };

  const availableAgentsForSimulator = mockAgents.map((a) => ({
    id: a.id,
    name: a.name,
  }));

  return (
    <div className="space-y-6 font-sans text-[#283A50] pb-12">
      {/* Toast Notification */}
      {toastNotice && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-medium shadow-md animate-in fade-in duration-200 ${
            toastNotice.type === "success"
              ? "bg-[#B8DEC8]/50 border-[#2E8066]/30 text-[#165B4C]"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#2E8066] shrink-0" />
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

      {/* Top Header */}
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
              Usage &amp; Controls
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#283A50] mt-2">
            Usage Control Center
          </h1>

          <p className="text-xs text-[#707684] mt-1 max-w-2xl leading-relaxed">
            Manage your AI workforce operating capacity, simulate outbound dialer minute requirements, configure spend guardrails, and audit itemized carrier expenses.
          </p>
        </div>

        <button
          onClick={() => setTopUpOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#283A50] hover:bg-black text-white font-semibold text-xs transition-all cursor-pointer shadow-xs hover:scale-[1.02] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Top Up Minutes</span>
        </button>
      </div>

      {/* Section 1: Prominent Operating Capacity Header (Always visible at top of viewport) */}
      <OperatingCapacityHeader
        capacity={capacity}
        onOpenTopUp={() => setTopUpOpen(true)}
      />

      {/* Internal Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-[#E9E1D4] w-fit shadow-xs">
        <button
          onClick={() => setActiveTab("capacity")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "capacity"
              ? "bg-[#283A50] text-white shadow-xs"
              : "text-[#707684] hover:text-[#283A50] hover:bg-[#FAF5E9]/50"
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span>Capacity &amp; Guardrails</span>
        </button>

        <button
          onClick={() => setActiveTab("simulator")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "simulator"
              ? "bg-[#283A50] text-white shadow-xs"
              : "text-[#707684] hover:text-[#283A50] hover:bg-[#FAF5E9]/50"
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Campaign Capacity Simulator</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              activeTab === "simulator"
                ? "bg-white/20 text-white"
                : "bg-[#FAF5E9] text-[#707684]"
            }`}
          >
            Planning Tool
          </span>
        </button>

        <button
          onClick={() => setActiveTab("costs")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "costs"
              ? "bg-[#283A50] text-white shadow-xs"
              : "text-[#707684] hover:text-[#283A50] hover:bg-[#FAF5E9]/50"
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Cost Intelligence &amp; Invoices</span>
        </button>
      </div>

      {/* Tab 1: Capacity, Guardrails & Agent Breakdown */}
      {activeTab === "capacity" && (
        <div className="space-y-6">
          {/* Agent Efficiency Comparison */}
          <AgentEfficiencyTable agents={agents} currency={capacity.currency} />

          {/* Smart Usage Guardrails */}
          <SmartGuardrailsPanel
            guardrails={guardrails}
            onSaveGuardrails={handleSaveGuardrails}
            currency={capacity.currency}
          />
        </div>
      )}

      {/* Tab 2: Signature Feature — Campaign Capacity Simulator */}
      {activeTab === "simulator" && (
        <CampaignCapacitySimulator
          capacity={capacity}
          availableAgents={availableAgentsForSimulator}
        />
      )}

      {/* Tab 3: Cost Intelligence, Trends & Invoices */}
      {activeTab === "costs" && (
        <CostIntelligenceAndTrends
          costs={costs}
          dailyTrends={dailyTrends}
          invoices={invoices}
          onOpenTopUp={() => setTopUpOpen(true)}
          currency={capacity.currency}
        />
      )}

      {/* Recharge Modal */}
      <TopUpCreditsModal
        isOpen={topUpOpen}
        onClose={() => setTopUpOpen(false)}
        currentCredits={capacity.remainingMinutes}
      />
    </div>
  );
}
