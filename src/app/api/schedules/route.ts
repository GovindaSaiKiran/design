import { NextRequest, NextResponse } from "next/server";
import { scheduleStore } from "@/lib/server/scheduleStore";
import { executeCampaign, initSchedulerWorker } from "@/lib/server/schedulerEngine";
import {
  normalizePhoneNumber,
  convertLocalToUtc,
  formatUtcToLocal,
  isFutureTime,
} from "@/lib/utils/phoneAndDateUtils";
import { ScheduledCampaign, CreateSchedulePayload } from "@/types/schedule";

// Ensure background worker is active
initSchedulerWorker();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let schedules = await scheduleStore.getAll();

    if (status && status !== "all") {
      schedules = schedules.filter((s) => s.status === status);
    }

    if (search) {
      const q = search.toLowerCase();
      schedules = schedules.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.config.agentName.toLowerCase().includes(q) ||
          s.contacts.some((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      count: schedules.length,
      data: schedules,
    });
  } catch (error) {
    console.error("[API GET /api/schedules] Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error fetching schedules" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateSchedulePayload = await request.json();

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "Campaign name is required" },
        { status: 400 }
      );
    }

    if (!body.consentAcknowledged) {
      return NextResponse.json(
        {
          success: false,
          error: "Regulatory consent confirmation is required before scheduling outbound calls.",
        },
        { status: 400 }
      );
    }

    if (!body.contacts || body.contacts.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one contact is required" },
        { status: 400 }
      );
    }

    // Validate and normalize all contacts
    const validContacts = [];
    const seenPhones = new Set<string>();

    for (const rawContact of body.contacts) {
      const norm = normalizePhoneNumber(rawContact.phone);
      if (!norm.isValid) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid phone number for contact "${rawContact.name || 'Unknown'}": ${rawContact.phone}. (${norm.error})`,
          },
          { status: 400 }
        );
      }

      if (seenPhones.has(norm.normalized)) {
        continue; // Skip duplicate numbers in this batch
      }
      seenPhones.add(norm.normalized);

      validContacts.push({
        id: `c-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        name: rawContact.name?.trim() || "Recipient",
        phone: norm.normalized,
        email: rawContact.email?.trim(),
        organization: rawContact.organization?.trim(),
        customFields: rawContact.customFields || {},
        status: "pending" as const,
        attempts: 0,
      });
    }

    if (validContacts.length === 0) {
      return NextResponse.json(
        { success: false, error: "No valid unique contacts found in submission." },
        { status: 400 }
      );
    }

    // Determine scheduled time
    let scheduledAtUtc: string;
    let localFormatted: string;

    if (body.scheduleType === "now") {
      scheduledAtUtc = new Date().toISOString();
      localFormatted = "Immediate Start";
    } else {
      if (!body.scheduledDate || !body.scheduledTime) {
        return NextResponse.json(
          { success: false, error: "Scheduled date and time are required for future campaigns." },
          { status: 400 }
        );
      }

      try {
        scheduledAtUtc = convertLocalToUtc(body.scheduledDate, body.scheduledTime, body.timezone);
      } catch {
        return NextResponse.json(
          { success: false, error: "Invalid date or timezone parameters." },
          { status: 400 }
        );
      }

      // Ensure chosen time is in future
      if (!isFutureTime(scheduledAtUtc, 30)) {
        return NextResponse.json(
          {
            success: false,
            error: "Scheduled time must be at least 1 minute in the future.",
          },
          { status: 400 }
        );
      }

      localFormatted = formatUtcToLocal(scheduledAtUtc, body.timezone);
    }

    const callingMode = body.callingMode || "normal";
    const isNormal = callingMode === "normal";

    const campaignId = `sched-${Date.now()}`;
    const newCampaign: ScheduledCampaign = {
      id: campaignId,
      workspaceId: "ws-apex-global",
      name: body.name.trim(),
      status: "scheduled",
      callingMode,
      scheduleType: body.scheduleType,
      scheduledAtUtc,
      timezone: body.timezone || "Asia/Kolkata",
      localScheduledTime: localFormatted,
      callingWindow: {
        startHour: body.callingWindow?.startHour ?? 9,
        endHour: body.callingWindow?.endHour ?? 19,
        concurrencyLimit: isNormal ? 1 : (body.callingWindow?.concurrencyLimit ?? 20),
        pacingDelaySec: isNormal ? 3 : (body.callingWindow?.pacingDelaySec ?? 2),
        maxRetries: body.callingWindow?.maxRetries ?? (isNormal ? 1 : 2),
      },
      callingPurpose: body.callingPurpose,
      knowledgeSources: body.knowledgeSources,
      config: {
        agentId: body.config.agentId,
        agentName: body.config.agentName,
        language: body.config.language,
        voiceName: body.config.voiceName,
        voiceAccent: body.config.voiceAccent,
        callObjective: body.config.callObjective,
        instructions: body.config.instructions,
        openingScript: body.config.openingScript,
        customContext: body.config.customContext,
        knowledgeBaseId: body.config.knowledgeBaseId || "all",
        knowledgeBaseName: body.config.knowledgeBaseName || "All Campus Knowledge Documents",
        knowledgeChunkCount: body.config.knowledgeChunkCount || 456,
        strictGrounding: body.config.strictGrounding ?? true,
      },
      contacts: validContacts,
      stats: {
        totalContacts: validContacts.length,
        completedCount: 0,
        noAnswerCount: 0,
        failedCount: 0,
        skippedCount: 0,
        progressPercent: 0,
      },
      suppressionChecked: true,
      createdBy: "admin@swaram.ai",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      logs: [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toISOString(),
          level: "info",
          message:
            body.scheduleType === "now"
              ? "Campaign submitted for immediate automated dispatch."
              : `Campaign scheduled for ${localFormatted} (${body.timezone}).`,
        },
      ],
    };

    await scheduleStore.create(newCampaign);

    // If immediate, dispatch right away in background
    if (body.scheduleType === "now") {
      setTimeout(() => {
        executeCampaign(campaignId).catch((err) =>
          console.error(`[API] Immediate execution error for ${campaignId}:`, err)
        );
      }, 100);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Scheduled campaign created successfully",
        data: newCampaign,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API POST /api/schedules] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process schedule creation request" },
      { status: 500 }
    );
  }
}
