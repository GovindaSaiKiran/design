import { NextResponse } from "next/server";
import {
  AvailableMarketplaceNumber,
  OwnedWorkspaceNumber,
  PhoneNumbersOverviewMetrics,
  NumberUsageCostRecord,
} from "@/types/phoneNumbers";
import {
  initialOwnedNumbers,
  initialMarketplaceCatalog,
} from "@/data/mock/phoneNumbersData";

// In-memory data persistence across requests
let ownedNumbersStore: OwnedWorkspaceNumber[] = [...initialOwnedNumbers];
let availableCatalogStore: AvailableMarketplaceNumber[] = [...initialMarketplaceCatalog];

export async function GET() {
  const totalActive = ownedNumbersStore.filter((n) => n.status === "Active").length;
  const needingAttention = ownedNumbersStore.filter(
    (n) => n.status === "Verification Required" || n.status === "Action Required"
  ).length;
  const monthlyCost = ownedNumbersStore.reduce((acc, n) => acc + n.monthlyPrice, 0);

  const metrics: PhoneNumbersOverviewMetrics = {
    totalActiveNumbers: totalActive,
    availableToPurchase: availableCatalogStore.length,
    numbersNeedingAttention: needingAttention,
    monthlyRecurringCost: monthlyCost,
    currency: "INR",
  };

  const usageRecords: NumberUsageCostRecord[] = ownedNumbersStore.map((n) => ({
    numberId: n.id,
    phoneNumber: n.phoneNumber,
    label: n.label,
    type: n.type,
    assignedAgent: n.assignedAgentName,
    monthlyRental: n.monthlyPrice,
    setupFee: n.setupFee,
    minutesUsed: n.totalMinutesUsed,
    callUsageCost: Math.round(n.totalMinutesUsed * 0.45),
    totalBilledCost: n.monthlyPrice,
    currency: n.currency,
    status: n.status,
  }));

  return NextResponse.json({
    success: true,
    metrics,
    ownedNumbers: ownedNumbersStore,
    catalog: availableCatalogStore,
    availableCatalog: availableCatalogStore,
    usageRecords,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const action = body.action;
    const payload = body.payload || body;

    // BUY A NUMBER
    if (action === "buy") {
      const { numberId, label, assignedAgentId, assignedAgentName, intendedUse } = payload;
      const target = availableCatalogStore.find((n) => n.id === numberId);

      if (!target) {
        return NextResponse.json(
          { success: false, message: "Selected phone number is no longer available in the catalog." },
          { status: 400 }
        );
      }

      // Remove from catalog
      availableCatalogStore = availableCatalogStore.filter((n) => n.id !== numberId);

      // Create owned record
      const inboundEnabled = intendedUse === "inbound" || intendedUse === "both";
      const outboundEnabled = intendedUse === "outbound" || intendedUse === "both";

      const newOwned: OwnedWorkspaceNumber = {
        id: `owned-${Date.now()}`,
        phoneNumber: target.phoneNumber,
        label: label || `New ${target.type} Helpline`,
        country: target.country,
        countryCode: target.countryCode,
        flagEmoji: target.flagEmoji,
        region: target.region,
        type: target.type,
        status: "Active",
        assignedAgentId: assignedAgentId || "agent-maya",
        assignedAgentName: assignedAgentName || "Maya (Admissions Desk)",
        inboundEnabled,
        outboundEnabled,
        isDefaultCallerId: false,
        monthlyPrice: target.monthlyPrice,
        setupFee: target.setupFee,
        currency: target.currency,
        renewalDate: "22 Nov 2026",
        activatedDate: "Just now",
        provider: target.provider,
        capabilities: target.capabilities,
        callsToday: 0,
        totalMinutesUsed: 0,
        estimatedMonthlyCost: target.monthlyPrice,
        lastLatencyMs: 32,
      };

      ownedNumbersStore = [newOwned, ...ownedNumbersStore];

      return NextResponse.json({
        success: true,
        message: `Phone number ${newOwned.phoneNumber} successfully purchased and activated!`,
        number: newOwned,
      });
    }

    // UPDATE ROUTING
    if (action === "update-routing") {
      const { numberId, label, assignedAgentId, assignedAgentName, inboundEnabled, outboundEnabled, isDefaultCallerId } = payload;
      
      ownedNumbersStore = ownedNumbersStore.map((num) => {
        if (num.id === numberId) {
          return {
            ...num,
            label: label !== undefined ? label : num.label,
            assignedAgentId: assignedAgentId || num.assignedAgentId,
            assignedAgentName: assignedAgentName || num.assignedAgentName,
            inboundEnabled: inboundEnabled !== undefined ? inboundEnabled : num.inboundEnabled,
            outboundEnabled: outboundEnabled !== undefined ? outboundEnabled : num.outboundEnabled,
            isDefaultCallerId: isDefaultCallerId !== undefined ? isDefaultCallerId : num.isDefaultCallerId,
          };
        }
        if (isDefaultCallerId) {
          // If this number became default caller ID, clear default from others
          return { ...num, isDefaultCallerId: false };
        }
        return num;
      });

      return NextResponse.json({
        success: true,
        message: "Call routing and agent assignments updated successfully.",
        ownedNumbers: ownedNumbersStore,
      });
    }

    // RELEASE NUMBER
    if (action === "release") {
      const { numberId } = payload;
      const target = ownedNumbersStore.find((n) => n.id === numberId);

      if (!target) {
        return NextResponse.json(
          { success: false, message: "Number not found in your workspace inventory." },
          { status: 404 }
        );
      }

      ownedNumbersStore = ownedNumbersStore.filter((n) => n.id !== numberId);

      return NextResponse.json({
        success: true,
        message: `Phone number ${target.phoneNumber} has been released.`,
      });
    }

    // TEST ROUTE
    if (action === "test") {
      const { phoneNumber, assignedAgentName } = payload;
      return NextResponse.json({
        success: true,
        message: `Carrier route diagnostic ping passed for ${phoneNumber}. Direct SIP signaling verified to ${assignedAgentName} in 32ms.`,
        latencyMs: 32,
      });
    }

    return NextResponse.json(
      { success: false, message: "Unknown action" },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Server error processing phone numbers request." },
      { status: 500 }
    );
  }
}
