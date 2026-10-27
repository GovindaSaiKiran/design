import { apiClient } from "./client";
import { DashboardAgent } from "@/types/dashboard";
import { mockAgents } from "@/data/mock/dashboardData";

const defaultAgent: DashboardAgent = {
  id: "agent-default",
  name: "Default Voice Agent",
  role: "Voice Concierge",
  language: "English",
  avatar: "A",
  voiceModel: "Gemini Live",
  latencyMs: 120,
  description: "Default voice assistant",
  status: "ready",
  capabilities: [],
  callsHandled: 0,
};

export const agentsApi = {
  // Get all configured voice agents
  getAgents: async (): Promise<DashboardAgent[]> => {
    return apiClient<DashboardAgent[]>("/agents", {
      method: "GET",
      fallbackData: mockAgents,
    });
  },

  // Get specific agent by ID
  getAgentById: async (agentId: string): Promise<DashboardAgent> => {
    const fallback = mockAgents.find((a) => a.id === agentId) || mockAgents[0] || defaultAgent;
    return apiClient<DashboardAgent>(`/agents/${agentId}`, {
      method: "GET",
      fallbackData: fallback,
    });
  },

  // Update agent status (active, paused, training)
  updateAgentStatus: async (agentId: string, status: DashboardAgent["status"]): Promise<DashboardAgent> => {
    const fallback = mockAgents.find((a) => a.id === agentId) || mockAgents[0] || defaultAgent;
    return apiClient<DashboardAgent>(`/agents/${agentId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      fallbackData: { ...fallback, status },
    });
  },

  // Update system prompt and voice configuration
  updateAgentConfig: async (agentId: string, updates: Partial<DashboardAgent>): Promise<DashboardAgent> => {
    const fallback = mockAgents.find((a) => a.id === agentId) || mockAgents[0] || defaultAgent;
    return apiClient<DashboardAgent>(`/agents/${agentId}`, {
      method: "PUT",
      body: JSON.stringify(updates),
      fallbackData: { ...fallback, ...updates },
    });
  },
};
