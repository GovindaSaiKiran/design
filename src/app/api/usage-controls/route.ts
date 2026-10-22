import { NextResponse } from "next/server";
import {
  initialWorkspaceCapacity,
  initialAgentMetrics,
  initialGuardrailsConfig,
  initialCostBreakdown,
  initialDailyUsageTrend,
  initialInvoicesList,
} from "@/data/mock/usageControlsData";
import { UsageGuardrailsConfig, WorkspaceCapacity } from "@/types/usageControls";

let capacityStore: WorkspaceCapacity = { ...initialWorkspaceCapacity };
let guardrailsStore: UsageGuardrailsConfig = { ...initialGuardrailsConfig };
let agentMetricsStore = [...initialAgentMetrics];
let invoicesStore = [...initialInvoicesList];

export async function GET() {
  return NextResponse.json({
    success: true,
    capacity: capacityStore,
    agents: agentMetricsStore,
    guardrails: guardrailsStore,
    costs: initialCostBreakdown,
    dailyTrends: initialDailyUsageTrend,
    invoices: invoicesStore,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action;
    const payload = body.payload || body;

    // UPDATE GUARDRAILS
    if (action === "update-guardrails") {
      const {
        lowAllowanceThresholdPercent,
        lowAllowanceEmailNotify,
        lowAllowanceInAppNotify,
        spendingAlertThreshold,
        spendingAlertEnabled,
        spendingAlertEmailNotify,
        enforcedHardCapEnabled,
        enforcedHardCapAmount,
        hardCapPolicy,
      } = payload;

      guardrailsStore = {
        ...guardrailsStore,
        lowAllowanceThresholdPercent:
          lowAllowanceThresholdPercent !== undefined
            ? Number(lowAllowanceThresholdPercent)
            : guardrailsStore.lowAllowanceThresholdPercent,
        lowAllowanceEmailNotify:
          lowAllowanceEmailNotify !== undefined
            ? Boolean(lowAllowanceEmailNotify)
            : guardrailsStore.lowAllowanceEmailNotify,
        lowAllowanceInAppNotify:
          lowAllowanceInAppNotify !== undefined
            ? Boolean(lowAllowanceInAppNotify)
            : guardrailsStore.lowAllowanceInAppNotify,
        spendingAlertThreshold:
          spendingAlertThreshold !== undefined
            ? Number(spendingAlertThreshold)
            : guardrailsStore.spendingAlertThreshold,
        spendingAlertEnabled:
          spendingAlertEnabled !== undefined
            ? Boolean(spendingAlertEnabled)
            : guardrailsStore.spendingAlertEnabled,
        spendingAlertEmailNotify:
          spendingAlertEmailNotify !== undefined
            ? Boolean(spendingAlertEmailNotify)
            : guardrailsStore.spendingAlertEmailNotify,
        enforcedHardCapEnabled:
          enforcedHardCapEnabled !== undefined
            ? Boolean(enforcedHardCapEnabled)
            : guardrailsStore.enforcedHardCapEnabled,
        enforcedHardCapAmount:
          enforcedHardCapAmount !== undefined
            ? Number(enforcedHardCapAmount)
            : guardrailsStore.enforcedHardCapAmount,
        hardCapPolicy: hardCapPolicy || guardrailsStore.hardCapPolicy,
        lastUpdatedBy: "admin@swaram.ai",
        lastUpdatedAt: "Just now",
      };

      return NextResponse.json({
        success: true,
        message: "Smart usage guardrails and spending policy saved successfully.",
        guardrails: guardrailsStore,
      });
    }

    // TOP UP MINUTES
    if (action === "topup") {
      const { minutes, price } = payload;
      const addedMins = Number(minutes) || 1000;

      capacityStore = {
        ...capacityStore,
        prepaidTopUpMinutes: capacityStore.prepaidTopUpMinutes + addedMins,
        totalAvailableMinutes: capacityStore.totalAvailableMinutes + addedMins,
        remainingMinutes: capacityStore.remainingMinutes + addedMins,
        percentRemaining: Math.round(
          ((capacityStore.remainingMinutes + addedMins) / capacityStore.includedMinutes) * 100
        ),
      };

      return NextResponse.json({
        success: true,
        message: `Successfully topped up ${addedMins.toLocaleString()} calling minutes!`,
        capacity: capacityStore,
      });
    }

    return NextResponse.json(
      { success: false, message: "Unknown action" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Server error in usage controls" },
      { status: 500 }
    );
  }
}
