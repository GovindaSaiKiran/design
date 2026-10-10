import { apiClient } from "./client";
import { LiveCallItem, RecentCallRecord } from "@/types/dashboard";
import { mockRecentCalls, mockLiveCalls } from "@/data/mock/dashboardData";

export interface GetCallsParams {
  page?: number;
  limit?: number;
  status?: string;
  direction?: "inbound" | "outbound" | "all";
  search?: string;
}

export const callsApi = {
  // Get recent call logs with pagination and filters
  getRecentCalls: async (params?: GetCallsParams): Promise<{ calls: RecentCallRecord[]; total: number }> => {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", params.page.toString());
    if (params?.limit) query.set("limit", params.limit.toString());
    if (params?.status) query.set("status", params.status);
    if (params?.direction && params.direction !== "all") query.set("direction", params.direction);
    if (params?.search) query.set("search", params.search);

    const queryString = query.toString() ? `?${query.toString()}` : "";

    return apiClient<{ calls: RecentCallRecord[]; total: number }>(`/calls/history${queryString}`, {
      method: "GET",
      fallbackData: {
        calls: mockRecentCalls,
        total: mockRecentCalls.length,
      },
    });
  },

  // Get active live calls currently connected
  getLiveCalls: async (): Promise<LiveCallItem[]> => {
    return apiClient<LiveCallItem[]>("/calls/live", {
      method: "GET",
      fallbackData: mockLiveCalls,
    });
  },

  // Get full transcript and audio recording by call ID
  getCallDetails: async (callId: string): Promise<RecentCallRecord> => {
    const fallback = mockRecentCalls.find((c) => c.id === callId) || mockRecentCalls[0];
    return apiClient<RecentCallRecord>(`/calls/${callId}`, {
      method: "GET",
      fallbackData: fallback,
    });
  },

  // Export call logs as CSV
  exportCallLogsCsv: async (filters?: Record<string, string>): Promise<Blob> => {
    const response = await fetch("/api/calls/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters || {}),
    });
    return response.blob();
  },
};
