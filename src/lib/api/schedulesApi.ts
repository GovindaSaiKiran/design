import { ScheduledCampaign, CreateSchedulePayload } from "@/types/schedule";

export interface ScheduleFilterParams {
  status?: string;
  search?: string;
}

export const schedulesApi = {
  async getSchedules(params?: ScheduleFilterParams): Promise<ScheduledCampaign[]> {
    const searchParams = new URLSearchParams();
    if (params?.status && params.status !== "all") {
      searchParams.set("status", params.status);
    }
    if (params?.search) {
      searchParams.set("search", params.search);
    }

    const query = searchParams.toString();
    const url = `/api/schedules${query ? `?${query}` : ""}`;

    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      throw new Error(`Failed to fetch schedules: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data || [];
  },

  async getScheduleById(id: string): Promise<ScheduledCampaign> {
    const res = await fetch(`/api/schedules/${id}`, { method: "GET" });
    if (!res.ok) {
      throw new Error(`Failed to fetch schedule: ${res.statusText}`);
    }
    const data = await res.json();
    return data.data;
  },

  async createSchedule(payload: CreateSchedulePayload): Promise<ScheduledCampaign> {
    const res = await fetch("/api/schedules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to create scheduled campaign");
    }
    return data.data;
  },

  async cancelSchedule(id: string, reason?: string): Promise<ScheduledCampaign> {
    const res = await fetch(`/api/schedules/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "cancel", reason }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to cancel schedule");
    }
    return data.data;
  },

  async editSchedule(
    id: string,
    updates: {
      name?: string;
      scheduledDate?: string;
      scheduledTime?: string;
      timezone?: string;
      config?: Partial<CreateSchedulePayload["config"]>;
      callingWindow?: Partial<CreateSchedulePayload["callingWindow"]>;
    }
  ): Promise<ScheduledCampaign> {
    const res = await fetch(`/api/schedules/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "edit", ...updates }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to edit schedule");
    }
    return data.data;
  },

  async retryFailedCalls(id: string): Promise<ScheduledCampaign> {
    const res = await fetch(`/api/schedules/${id}/retry`, {
      method: "POST",
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to retry calls");
    }
    return data.data;
  },

  async deleteSchedule(id: string): Promise<boolean> {
    const res = await fetch(`/api/schedules/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    return res.ok && data.success;
  },
};
