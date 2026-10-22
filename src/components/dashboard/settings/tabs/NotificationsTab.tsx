import React, { useState } from "react";
import { Bell, Mail, AppWindow, ShieldCheck, CheckCircle2, Clock } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { NotificationPreferences } from "@/types/settings";

interface NotificationsTabProps {
  initialNotifications: NotificationPreferences;
  onSaveNotifications: (updated: NotificationPreferences) => Promise<boolean>;
}

export default function NotificationsTab({
  initialNotifications,
  onSaveNotifications,
}: NotificationsTabProps) {
  const [prefs, setPrefs] = useState<NotificationPreferences>(initialNotifications);
  const [saveNotice, setSaveNotice] = useState(false);

  const handleToggle = async (key: keyof NotificationPreferences) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    await onSaveNotifications(updated);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2000);
  };

  const handleTimeChange = async (newTime: string) => {
    const updated = { ...prefs, summaryTime: newTime };
    setPrefs(updated);
    await onSaveNotifications(updated);
    setSaveNotice(true);
    setTimeout(() => setSaveNotice(false), 2000);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Notifications & Operational Alerts"
        badge="Live Dispatch Sync"
        whatIsThis="Controls how and when you and your team receive operational email and in-app alerts."
        whyDoINeedIt="Allows you to stay updated on critical events (e.g. campaign finished, carrier trunk disconnected, low minute quota) without checking the dashboard manually."
        whatToDoNext="Enable alerts for campaign failures and low minutes, and choose whether you want daily or weekly email summaries."
      />

      {saveNotice && (
        <div className="p-3.5 rounded-xl bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066] text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Notification preferences saved and synced.</span>
        </div>
      )}

      {/* Mandatory Security Alerts Notice */}
      <div className="p-4 rounded-2xl bg-[#FAF5E9] border border-[#E9E1D4] text-xs text-[#283A50] flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-[#283A50] shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Mandatory Security Alerts:</strong>
          Critical account security alerts (such as password changes, new logins from unrecognized IP addresses, and carrier trunk failures) are always dispatched immediately to your verified email and cannot be muted.
        </div>
      </div>

      {/* Operational Events Table */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] overflow-hidden shadow-2xs">
        <div className="px-6 py-4 bg-[#FAF5E9]/50 border-b border-[#E9E1D4] flex items-center justify-between">
          <span className="text-xs font-bold text-[#283A50]">Operational Events</span>
          <div className="flex items-center gap-6 text-[11px] font-bold text-[#707684]">
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Email
            </span>
            <span className="flex items-center gap-1">
              <AppWindow className="w-3.5 h-3.5" /> In-App
            </span>
          </div>
        </div>

        <div className="divide-y divide-[#E9E1D4]/60 text-xs">
          {/* Campaign Completed */}
          <div className="p-4 sm:px-6 flex items-center justify-between hover:bg-[#FAF5E9]/20 transition-colors">
            <div>
              <strong className="text-[#283A50] block font-bold">Campaign Finished Dispatching</strong>
              <p className="text-[#707684] text-[11px] mt-0.5">
                Sent when an outbound call batch completes all queued numbers.
              </p>
            </div>
            <div className="flex items-center gap-8 pr-2">
              <input
                type="checkbox"
                checked={prefs.campaignCompletedEmail}
                onChange={() => handleToggle("campaignCompletedEmail")}
                className="w-4 h-4 rounded text-[#283A50] cursor-pointer"
                title="Email alert"
              />
              <input
                type="checkbox"
                checked={prefs.campaignCompletedInApp}
                onChange={() => handleToggle("campaignCompletedInApp")}
                className="w-4 h-4 rounded text-[#283A50] cursor-pointer"
                title="In-app notification"
              />
            </div>
          </div>

          {/* Campaign Failed */}
          <div className="p-4 sm:px-6 flex items-center justify-between hover:bg-[#FAF5E9]/20 transition-colors">
            <div>
              <strong className="text-[#283A50] block font-bold">Campaign or Call Batch Errors</strong>
              <p className="text-[#707684] text-[11px] mt-0.5">
                Urgent notification if invalid numbers or carrier congestion causes calls to fail.
              </p>
            </div>
            <div className="flex items-center gap-8 pr-2">
              <input
                type="checkbox"
                checked={prefs.campaignFailedEmail}
                onChange={() => handleToggle("campaignFailedEmail")}
                className="w-4 h-4 rounded text-[#283A50] cursor-pointer"
              />
              <input
                type="checkbox"
                checked={prefs.campaignFailedInApp}
                onChange={() => handleToggle("campaignFailedInApp")}
                className="w-4 h-4 rounded text-[#283A50] cursor-pointer"
              />
            </div>
          </div>

          {/* High Usage Alerts */}
          <div className="p-4 sm:px-6 flex items-center justify-between hover:bg-[#FAF5E9]/20 transition-colors">
            <div>
              <strong className="text-[#283A50] block font-bold">High Calling or Messaging Volume</strong>
              <p className="text-[#707684] text-[11px] mt-0.5">
                Alerts when simultaneous concurrent calls peak above 80% capacity.
              </p>
            </div>
            <div className="flex items-center gap-8 pr-2">
              <input
                type="checkbox"
                checked={prefs.callingUsageAlertsEmail}
                onChange={() => handleToggle("callingUsageAlertsEmail")}
                className="w-4 h-4 rounded text-[#283A50] cursor-pointer"
              />
              <input
                type="checkbox"
                checked={prefs.callingUsageAlertsInApp}
                onChange={() => handleToggle("callingUsageAlertsInApp")}
                className="w-4 h-4 rounded text-[#283A50] cursor-pointer"
              />
            </div>
          </div>

          {/* Low Balance / Minutes Alert */}
          <div className="p-4 sm:px-6 flex items-center justify-between hover:bg-[#FAF5E9]/20 transition-colors">
            <div>
              <strong className="text-[#283A50] block font-bold">Low Minutes Remaining Quota</strong>
              <p className="text-[#707684] text-[11px] mt-0.5">
                Warnings when included telephony minutes drop below 15%.
              </p>
            </div>
            <div className="flex items-center gap-8 pr-2">
              <input
                type="checkbox"
                checked={prefs.lowMinutesBalanceEmail}
                onChange={() => handleToggle("lowMinutesBalanceEmail")}
                className="w-4 h-4 rounded text-[#283A50] cursor-pointer"
              />
              <input
                type="checkbox"
                checked={prefs.lowMinutesBalanceInApp}
                onChange={() => handleToggle("lowMinutesBalanceInApp")}
                className="w-4 h-4 rounded text-[#283A50] cursor-pointer"
              />
            </div>
          </div>

          {/* Service Disconnected */}
          <div className="p-4 sm:px-6 flex items-center justify-between hover:bg-[#FAF5E9]/20 transition-colors">
            <div>
              <strong className="text-[#283A50] block font-bold">Service Connection Disconnected</strong>
              <p className="text-[#707684] text-[11px] mt-0.5">
                Immediate alert if an AI voice provider, WhatsApp token, or SIP trunk loses connection.
              </p>
            </div>
            <div className="flex items-center gap-8 pr-2">
              <input
                type="checkbox"
                checked={prefs.serviceDisconnectedEmail}
                onChange={() => handleToggle("serviceDisconnectedEmail")}
                className="w-4 h-4 rounded text-[#283A50] cursor-pointer"
              />
              <input
                type="checkbox"
                checked={prefs.serviceDisconnectedInApp}
                onChange={() => handleToggle("serviceDisconnectedInApp")}
                className="w-4 h-4 rounded text-[#283A50] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Digest Summary Frequency */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] p-5 sm:p-6 shadow-2xs space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#707684]">
          Periodic Digest &amp; Executive Summary
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.dailySummaryEmail}
              onChange={() => handleToggle("dailySummaryEmail")}
              className="w-4 h-4 rounded text-[#283A50] mt-0.5"
            />
            <div>
              <strong className="text-xs font-bold text-[#283A50] block">Daily Evening Digest</strong>
              <p className="text-[11px] text-[#707684] mt-0.5 leading-relaxed">
                Summary of calls handled today, candidate qualification counts, and unresolved callback tickets.
              </p>
            </div>
          </label>

          <label className="p-4 rounded-xl bg-[#FAF5E9]/50 border border-[#E9E1D4] flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={prefs.weeklySummaryEmail}
              onChange={() => handleToggle("weeklySummaryEmail")}
              className="w-4 h-4 rounded text-[#283A50] mt-0.5"
            />
            <div>
              <strong className="text-xs font-bold text-[#283A50] block">Weekly Executive Report</strong>
              <p className="text-[11px] text-[#707684] mt-0.5 leading-relaxed">
                Sent every Monday morning with weekly conversion metrics, average call durations, and minutes saved.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
