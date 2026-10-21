import { NextRequest, NextResponse } from "next/server";
import { scheduleStore } from "@/lib/server/scheduleStore";
import { executeCampaign } from "@/lib/server/schedulerEngine";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const campaign = await scheduleStore.getById(id);

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: "Scheduled campaign not found" },
        { status: 404 }
      );
    }

    if (campaign.status === "running") {
      return NextResponse.json(
        { success: false, error: "Campaign is already running" },
        { status: 400 }
      );
    }

    // Find failed and no-answer contacts
    const retryableContacts = campaign.contacts.filter(
      (c) => c.status === "failed" || c.status === "no-answer"
    );

    if (retryableContacts.length === 0) {
      return NextResponse.json(
        { success: false, error: "No eligible failed or unanswered contacts to retry" },
        { status: 400 }
      );
    }

    // Reset eligible contacts back to pending
    for (const contact of retryableContacts) {
      await scheduleStore.updateContactCall(id, contact.id, {
        status: "pending",
        failureReason: undefined,
      });
    }

    await scheduleStore.updateStatus(id, "running");
    await scheduleStore.appendLog(
      id,
      "info",
      `Retry initiated for ${retryableContacts.length} failed/unanswered contacts.`
    );

    // Trigger execution in background
    setTimeout(() => {
      executeCampaign(id).catch((err) =>
        console.error(`[API] Retry execution error for ${id}:`, err)
      );
    }, 100);

    const refreshed = await scheduleStore.getById(id);

    return NextResponse.json({
      success: true,
      message: `Retrying ${retryableContacts.length} eligible contacts`,
      data: refreshed,
    });
  } catch (error) {
    console.error("[API POST /api/schedules/:id/retry] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to initiate retry" },
      { status: 500 }
    );
  }
}
