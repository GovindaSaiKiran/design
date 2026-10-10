import { apiClient } from "./client";
import { TelephonyNumber } from "@/types/dashboard";
import { mockTelephonyNumbers } from "@/data/mock/dashboardData";

export interface OutboundCallRequest {
  toNumber: string;
  recipientName?: string;
  agentId: string;
  language?: string;
  customContext?: Record<string, string>;
  campaignId?: string;
}

export interface CallControlAction {
  callId: string;
  action: "hangup" | "transfer" | "whisper" | "mute";
  transferToNumber?: string;
  whisperMessage?: string;
}

export const telephonyApi = {
  // Trigger single outbound call via Exotel / Telephony Gateway
  initiateCall: async (data: OutboundCallRequest): Promise<{ success: boolean; callSid: string; status: string }> => {
    return apiClient<{ success: boolean; callSid: string; status: string }>("/telephony/outbound-call", {
      method: "POST",
      body: JSON.stringify(data),
      fallbackData: {
        success: true,
        callSid: `EXO-${Date.now()}`,
        status: "initiated",
      },
    });
  },

  // Perform active in-call actions (Warm transfer to human counselor, hang up, whisper)
  controlLiveCall: async (control: CallControlAction): Promise<{ success: boolean; message: string }> => {
    return apiClient<{ success: boolean; message: string }>("/telephony/control", {
      method: "POST",
      body: JSON.stringify(control),
      fallbackData: {
        success: true,
        message: `Action ${control.action} executed successfully`,
      },
    });
  },

  // Fetch provisioned phone numbers (DIDs / SIP trunks)
  getPhoneNumbers: async (): Promise<TelephonyNumber[]> => {
    return apiClient<TelephonyNumber[]>("/telephony/numbers", {
      method: "GET",
      fallbackData: mockTelephonyNumbers,
    });
  },

  // Update routing rules for a phone number
  updateNumberRouting: async (numberId: string, assignedAgentId: string): Promise<TelephonyNumber> => {
    return apiClient<TelephonyNumber>(`/telephony/numbers/${numberId}`, {
      method: "PATCH",
      body: JSON.stringify({ assignedAgentId }),
      fallbackData: {
        ...mockTelephonyNumbers[0],
        assignedAgent: assignedAgentId,
      },
    });
  },
};
