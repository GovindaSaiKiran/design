import { NextRequest, NextResponse } from "next/server";
import { scheduleStore } from "@/lib/server/scheduleStore";
import {
  convertLocalToUtc,
  formatUtcToLocal,
  isFutureTime,
} from "@/lib/utils/phoneAndDateUtils";

export async function GET(
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

    return NextResponse.json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    console.error("[API GET /api/schedules/:id] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch schedule details" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const campaign = await scheduleStore.getById(id);

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: "Scheduled campaign not found" },
        { status: 404 }
      );
    }

    // Cancellation Action
    if (body.action === "cancel") {
      if (campaign.status === "completed") {
        return NextResponse.json(
          { success: false, error: "Cannot cancel a completed campaign" },
          { status: 400 }
        );
      }
      if (campaign.status === "cancelled") {
        return NextResponse.json(
          { success: false, error: "Campaign is already cancelled" },
          { status: 400 }
        );
      }

      const updated = await scheduleStore.updateStatus(id, "cancelled", {
        cancelReason: body.reason || "User requested cancellation via dashboard",
      });

      await scheduleStore.appendLog(
        id,
        "warn",
        `Campaign cancelled by user. Reason: ${body.reason || "User manual cancellation"}`
      );

      return NextResponse.json({
        success: true,
        message: "Campaign successfully cancelled",
        data: updated,
      });
    }

    // Edit Action (Reschedule or modify settings)
    if (body.action === "edit") {
      if (campaign.status !== "scheduled") {
        return NextResponse.json(
          {
            success: false,
            error: `Cannot edit campaign with status "${campaign.status}". Only pending scheduled campaigns may be edited.`,
          },
          { status: 400 }
        );
      }

      const patch: Record<string, unknown> = {};

      if (body.name && body.name.trim()) {
        patch.name = body.name.trim();
      }

      if (body.scheduledDate && body.scheduledTime) {
        const tz = body.timezone || campaign.timezone;
        const newUtc = convertLocalToUtc(body.scheduledDate, body.scheduledTime, tz);

        if (!isFutureTime(newUtc, 30)) {
          return NextResponse.json(
            { success: false, error: "Rescheduled time must be in the future." },
            { status: 400 }
          );
        }

        patch.scheduledAtUtc = newUtc;
        patch.timezone = tz;
        patch.localScheduledTime = formatUtcToLocal(newUtc, tz);
      }

      if (body.config) {
        patch.config = {
          ...campaign.config,
          ...body.config,
        };
      }

      if (body.callingWindow) {
        patch.callingWindow = {
          ...campaign.callingWindow,
          ...body.callingWindow,
        };
      }

      const updated = await scheduleStore.update(id, patch);

      await scheduleStore.appendLog(
        id,
        "info",
        `Campaign settings updated. Rescheduled to ${updated?.localScheduledTime || "updated"}.`
      );

      return NextResponse.json({
        success: true,
        message: "Campaign updated successfully",
        data: updated,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action specified. Must be 'cancel' or 'edit'." },
      { status: 400 }
    );
  } catch (error) {
    console.error("[API PATCH /api/schedules/:id] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update schedule" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
        { success: false, error: "Cannot delete a campaign that is currently running" },
        { status: 400 }
      );
    }

    await scheduleStore.delete(id);

    return NextResponse.json({
      success: true,
      message: "Scheduled campaign deleted",
    });
  } catch (error) {
    console.error("[API DELETE /api/schedules/:id] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete schedule" },
      { status: 500 }
    );
  }
}
