import { NotificationItem } from "@/types/dashboard";

export interface CallbackItem {
  id: string;
  contactName: string;
  phone: string;
  email?: string;
  city: string;
  course: string;
  
  // 1. Which Agent
  agentId: string;
  agentName: string;
  agentAvatar: string;
  agentRole: string;
  agentBadgeColor: string;
  
  // 2. Which Topic
  topicId: string;
  topicName: string;
  topicCategory: "Admissions" | "Finance & Fees" | "Hostel & Facilities" | "Verification & Portal";
  
  // 3. Same Group / Dataset / Cohort
  datasetBatchId: string;
  datasetBatchTitle: string;
  
  // 4. When Scheduled
  scheduledWindow: string;
  scheduledExactTime: string;
  countdownLabel: string;
  isOverdue?: boolean;
  
  // Reschedule & Manual Scheduling Tracking
  rescheduleCount?: number;
  lastRescheduledBy?: "Agent" | "User" | "System";
  lastRescheduledReason?: string;
  rescheduledAt?: string;
  originalScheduledTime?: string;
  
  // 5. Why Queued
  whyQueued: string;
  queuedTrigger: "Candidate Requested" | "Automated Retry (Busy Line)" | "Post-WhatsApp Followup" | "Special Exception Escalation" | "Doc Verification Sync Issue";
  
  // 6. Any Human Interaction Needed
  humanInteractionNeeded: boolean;
  humanInteractionReason?: string;
  humanAssignee?: string;
  
  priority: "Urgent" | "High" | "Normal";
  status: "Pending" | "Completed" | "Rescheduled" | "Cancelled";
  sourceCallId: string;
  createdAt: string;
  notes?: string;
}

export const initialCallbacks: CallbackItem[] = [];

/**
 * Filter all callbacks that require human interaction and are still pending action
 */
export function getHumanActionCallbacks(list: CallbackItem[] = initialCallbacks): CallbackItem[] {
  return list.filter((cb) => cb.humanInteractionNeeded && cb.status === "Pending");
}

/**
 * Transform a human-action callback into an actionable NotificationItem
 */
export function callbackToNotification(cb: CallbackItem): NotificationItem {
  const isUrgent = cb.priority === "Urgent";
  return {
    id: `notif-cb-${cb.id}`,
    type: "callback",
    title: `Human Action Needed: ${cb.contactName}`,
    message: `${cb.phone} • ${cb.course} — ${cb.humanInteractionReason || cb.whyQueued}`,
    timestamp: cb.scheduledExactTime.includes("Today") ? "Scheduled Today" : "Pending Action",
    read: false,
    severity: isUrgent ? "error" : "warning",
    actionUrl: `/dashboard/callbacks?id=${cb.id}&filter=human`,
    callbackId: cb.id,
    contactName: cb.contactName,
    humanInteractionReason: cb.humanInteractionReason || cb.whyQueued,
  };
}
