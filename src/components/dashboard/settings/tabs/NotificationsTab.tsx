"use client";

import React, { useState } from "react";
import {
  Bell,
  Mail,
  AppWindow,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Play,
  CheckCircle,
  XCircle,
  Calendar,
  PhoneOff,
  PhoneForwarded,
  BatteryWarning,
  SlidersHorizontal,
  WifiOff,
  FileText,
  ShieldAlert,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { NotificationPreferences, NotificationChannelSetting } from "@/types/settings";

interface NotificationsTabProps {
  initialNotifications: NotificationPreferences;
  onSaveNotifications: (updated: NotificationPreferences) => Promise<boolean>;
}

interface EventConfig {
  key: keyof Omit<
    NotificationPreferences,
    | "campaignCompletedEmail"
    | "campaignCompletedInApp"
    | "campaignFailedEmail"
    | "campaignFailedInApp"
    | "callingUsageAlertsEmail"
    | "callingUsageAlertsInApp"
    | "lowMinutesBalanceEmail"
    | "lowMinutesBalanceInApp"
    | "serviceDisconnectedEmail"
    | "serviceDisconnectedInApp"
    | "dailySummaryEmail"
    | "weeklySummaryEmail"
    | "summaryTime"
  >;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isLocked?: boolean;
}

const NOTIFICATION_EVENTS: EventConfig[] = [
  {
    key: "campaignStarted",
    title: "Campaign Started",
    description: "Instant notification as soon as an outbound campaign starts dialing contacts.",
    icon: Play,
  },
  {
    key: "campaignCompleted",
    title: "Campaign Completed",
    description: "Comprehensive summary delivered once all queued contact numbers finish processing.",
    icon: CheckCircle,
  },
  {
    key: "campaignFailed",
    title: "Campaign Failed or Halted",
    description: "Urgent dispatch if a campaign stops due to trunk limits, rate capping, or provider errors.",
    icon: XCircle,
  },
  {
    key: "scheduledReminders",
    title: "Scheduled Campaign Reminders",
    description: "Pre-dispatch notification 30 minutes before a recurring or scheduled campaign triggers.",
    icon: Calendar,
  },
  {
    key: "failedCalls",
    title: "Failed Calls & Unreachable Numbers",
    description: "Alerts when individual numbers fail multiple retry attempts or hit invalid line states.",
    icon: PhoneOff,
  },
  {
    key: "callbackRequests",
    title: "Callback & Escalation Requests",
    description: "Real-time notice when a customer explicitly requests a human supervisor callback.",
    icon: PhoneForwarded,
  },
  {
    key: "lowMinutesBalance",
    title: "Low Minute Balance Warning",
    description: "Triggered when remaining telephony minutes drop below 10% of monthly quota.",
    icon: BatteryWarning,
  },
  {
    key: "usageLimits",
    title: "Usage & Concurrency Limits",
    description: "Alerts when your workspace approaches concurrent PRI trunk capacity or spending cap.",
    icon: SlidersHorizontal,
  },
  {
    key: "telephonyIssues",
    title: "Phone Number & Telephony Connection Issues",
    description: "High-priority warning if SIP trunk registration drops, jitter surges, or carrier disconnects.",
    icon: WifiOff,
  },
  {
    key: "weeklyReports",
    title: "Weekly Operational Reports",
    description: "Aggregated Monday morning analytics digest of total calls, pickup rate, and CSAT.",
    icon: FileText,
  },
  {
    key: "securityAlerts",
    title: "Security & Login Alerts",
    description: "New unrecognized device logins, API key creations, or password changes.",
    icon: ShieldAlert,
    isLocked: true, // Always locked on email for security
  },
];

export default function NotificationsTab({
  initialNotifications,
  onSaveNotifications,
}: NotificationsTabProps) {
  const [prefs, setPrefs] = useState<NotificationPreferences>({
    ...initialNotifications,
    campaignStarted: initialNotifications?.campaignStarted || { inApp: true, email: false },
    campaignCompleted: initialNotifications?.campaignCompleted || { inApp: true, email: true },
    campaignFailed: initialNotifications?.campaignFailed || { inApp: true, email: true },
    scheduledReminders: initialNotifications?.scheduledReminders || { inApp: true, email: true },
    failedCalls: initialNotifications?.failedCalls || { inApp: true, email: false },
    callbackRequests: initialNotifications?.callbackRequests || { inApp: true, email: true },
    lowMinutesBalance: initialNotifications?.lowMinutesBalance || { inApp: true, email: true },
    usageLimits: initialNotifications?.usageLimits || { inApp: true, email: true },
    telephonyIssues: initialNotifications?.telephonyIssues || { inApp: true, email: true },
    weeklyReports: initialNotifications?.weeklyReports || { inApp: false, email: true },
    securityAlerts: initialNotifications?.securityAlerts || { inApp: true, email: true },
  });

  const [saveNotice, setSaveNotice] = useState(false);

  const handleToggle = async (
    eventKey: keyof NotificationPreferences,
    channel: "inApp" | "email"
  ) => {
    const current = (prefs[eventKey] as NotificationChannelSetting) || { inApp: true, email: true };
    const updatedChannel = {
      ...current,
      [channel]: !current[channel],
    };

    const updated = {
      ...prefs,
      [eventKey]: updatedChannel,
    };

    setPrefs(updated);
    await onSaveNotifications(updated);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2000);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Notification Settings"
        badge="Live Dispatch Sync"
        whatIsThis="Controls how and when you and your team receive operational email and in-app alerts."
        whyDoINeedIt="Allows you to stay updated on critical events (e.g. campaign finished, carrier trunk disconnected, low minute quota) without checking the dashboard manually."
        whatToDoNext="Customize individual in-app and email switches across all 11 critical telephony event categories."
      />

      {saveNotice && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Notification preferences updated and synced across all channels.</span>
        </div>
      )}

      {/* Mandatory Security Notice */}
      <div className="p-4 rounded-2xl bg-[#FAF5E9] border border-[#E9E1D4] text-xs text-[#283A50] flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-[#283A50] shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Verified Notification Channels:</strong>
          In-App bell notifications and Email alerts are actively connected to the Swaram dispatch queue. Critical security alerts remain permanently active on verified administrative emails.
        </div>
      </div>

      {/* 11 Events Table */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] overflow-hidden shadow-2xs">
        <div className="px-6 py-4 bg-[#FAF5E9]/50 border-b border-[#E9E1D4] flex items-center justify-between">
          <span className="text-xs font-bold text-[#283A50]">
            Telephony &amp; Operational Events (11 Controls)
          </span>
          <div className="flex items-center gap-8 text-[11px] font-bold text-[#707684]">
            <span className="flex items-center gap-1.5 w-16 justify-center">
              <Mail className="w-3.5 h-3.5 text-[#283A50]" />
              <span>Email</span>
            </span>
            <span className="flex items-center gap-1.5 w-16 justify-center">
              <AppWindow className="w-3.5 h-3.5 text-[#283A50]" />
              <span>In-App</span>
            </span>
          </div>
        </div>

        <div className="divide-y divide-[#E9E1D4]/60 text-xs">
          {NOTIFICATION_EVENTS.map((event) => {
            const Icon = event.icon;
            const setting = (prefs[event.key] as NotificationChannelSetting) || {
              inApp: true,
              email: false,
            };

            return (
              <div
                key={event.key}
                className="p-4 sm:px-6 flex items-center justify-between hover:bg-[#FAF5E9]/20 transition-colors"
              >
                <div className="flex items-start gap-3 pr-4">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center shrink-0 mt-0.5 text-[#283A50]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#283A50] block font-bold text-xs">
                      {event.title}
                    </strong>
                    <p className="text-[#707684] text-[11px] mt-0.5 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8 shrink-0">
                  {/* Email Toggle */}
                  <div className="w-16 flex justify-center">
                    <button
                      type="button"
                      disabled={event.isLocked}
                      onClick={() => handleToggle(event.key, "email")}
                      className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer disabled:cursor-not-allowed ${
                        setting.email ? "bg-[#283A50]" : "bg-neutral-200"
                      } ${event.isLocked ? "opacity-80" : ""}`}
                      title={event.isLocked ? "Required for compliance" : "Toggle email alert"}
                    >
                      <span
                        className={`w-4 h-4 rounded-full bg-white absolute top-0.5 left-0.5 transition-transform ${
                          setting.email ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* In-App Toggle */}
                  <div className="w-16 flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleToggle(event.key, "inApp")}
                      className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                        setting.inApp ? "bg-[#283A50]" : "bg-neutral-200"
                      }`}
                      title="Toggle in-app notification"
                    >
                      <span
                        className={`w-4 h-4 rounded-full bg-white absolute top-0.5 left-0.5 transition-transform ${
                          setting.inApp ? "translate-x-5" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
