import { apiClient } from "./client";
import { CampaignData } from "@/types/dashboard";
import { mockCampaigns } from "@/data/mock/dashboardData";

export interface CreateCampaignRequest {
  title: string;
  assignedAgentId: string;
  targetAudience: string;
  contacts: Array<{
    name: string;
    phone: string;
    email?: string;
    customFields?: Record<string, string>;
  }>;
  scheduledTime?: string;
  concurrencyLimit?: number;
}

export const campaignsApi = {
  // Get all active and completed campaigns
  getCampaigns: async (): Promise<CampaignData[]> => {
    return apiClient<CampaignData[]>("/campaigns", {
      method: "GET",
      fallbackData: mockCampaigns,
    });
  },

  // Create and launch a new outbound campaign
  createCampaign: async (data: CreateCampaignRequest): Promise<CampaignData> => {
    const newMock: CampaignData = {
      id: `CMP-${Date.now()}`,
      title: data.title,
      status: "active",
      totalContacts: data.contacts.length,
      completedCount: 0,
      noAnswerCount: 0,
      failedCount: 0,
      progressPercent: 0,
      targetAudience: data.targetAudience,
      assignedAgent: data.assignedAgentId,
      startDate: new Date().toISOString(),
      estTimeRemaining: "Calculating...",
    };

    return apiClient<CampaignData>("/campaigns", {
      method: "POST",
      body: JSON.stringify(data),
      fallbackData: newMock,
    });
  },

  // Pause / Resume / Cancel a campaign
  updateCampaignStatus: async (campaignId: string, status: CampaignData["status"]): Promise<CampaignData> => {
    const fallback = mockCampaigns.find((c) => c.id === campaignId) || mockCampaigns[0];
    return apiClient<CampaignData>(`/campaigns/${campaignId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      fallbackData: { ...fallback, status },
    });
  },
};
