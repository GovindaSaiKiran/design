"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { NotificationItem } from "@/types/dashboard";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  PhoneForwarded,
  Sparkles,
  X,
  Check,
  UserCheck,
  PhoneCall,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

interface NotificationsPanelProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
  onNotificationClick?: (notif: NotificationItem) => void;
}

export default function NotificationsPanel({
  notifications,
  isOpen,
  onClose,
  onMarkAllRead,
  onNotificationClick,
}: NotificationsPanelProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "callbacks">("all");

  if (!isOpen) return null;

  const callbackNotifs = notifications.filter((n) => n.type === "callback");
  const unreadCount = notifications.filter((n) => !n.read).length;
  const humanActionsCount = callbackNotifs.filter((n) => !n.read).length || callbackNotifs.length;

  const displayedNotifications = activeTab === "callbacks" ? callbackNotifs : notifications;

  const handleNotificationClick = (notif: NotificationItem) => {
    if (onNotificationClick) {
      onNotificationClick(notif);
    }
    if (notif.actionUrl) {
      try { soundSynth.play("click"); } catch {}
      router.push(notif.actionUrl);
      onClose();
    }
  };

  return (
    <div className="absolute right-0 top-12 w-84 sm:w-[420px] bg-white rounded-[26px] border border-black/[0.08] shadow-2xl p-4 sm:p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 select-none font-sans text-[#1A1A1A]">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#FAF3E4] flex items-center justify-center text-[#1A1A1A]">
            <Bell className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="font-bold text-[#1A1A1A] text-sm tracking-tight flex items-center gap-1.5">
              Notifications &amp; Alerts
            </h4>
          </div>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEE2E2] text-[#991B1B] border border-red-200 shadow-2xs">
              {unreadCount} Unread
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onMarkAllRead}
            className="text-[11px] font-semibold text-black/70 hover:text-black flex items-center gap-1 cursor-pointer bg-[#FAF3E4] hover:bg-[#FAF3E4]/80 px-2.5 py-1 rounded-full border border-black/[0.06] transition-all"
            title="Mark all notifications as read"
          >
            <Check className="w-3 h-3 stroke-[2.5]" />
            Mark Read
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#FAF3E4] hover:bg-[#FAF3E4]/80 text-black/50 hover:text-black border border-black/[0.06] flex items-center justify-center cursor-pointer transition-all shadow-2xs"
            aria-label="Close notifications panel"
          >
            <X className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-1.5 pt-3 pb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === "all"
              ? "bg-[#283A50] text-white shadow-xs"
              : "bg-[#FAF3E4]/60 hover:bg-[#FAF3E4] text-black/70 hover:text-black"
          }`}
        >
          <span>All Alerts</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
            activeTab === "all" ? "bg-white/20 text-white" : "bg-black/[0.06] text-black/60"
          }`}>
            {notifications.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("callbacks")}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
            activeTab === "callbacks"
              ? "bg-amber-600 text-white border-amber-700 shadow-xs"
              : "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200"
          }`}
        >
          <UserCheck className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>Human Action Calls</span>
          {callbackNotifs.length > 0 && (
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
              activeTab === "callbacks" ? "bg-white/25 text-white" : "bg-amber-200 text-amber-900"
            }`}>
              {callbackNotifs.length}
            </span>
          )}
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto my-2 pr-1">
        {displayedNotifications.length === 0 ? (
          <div className="py-8 text-center text-black/50 text-xs">
            <UserCheck className="w-8 h-8 text-black/20 mx-auto mb-2" />
            <p className="font-semibold">No notifications in this view</p>
            <p className="text-[11px] text-black/40 mt-0.5">All calls are being handled autonomously by Swaram AI.</p>
          </div>
        ) : (
          displayedNotifications.map((notif) => {
            const isCallback = notif.type === "callback";
            return (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`group p-3 rounded-[20px] transition-all flex flex-col gap-2 border cursor-pointer ${
                  notif.read
                    ? "bg-[#FAF3E4]/30 border-black/[0.04] opacity-75 hover:opacity-100"
                    : isCallback
                    ? "bg-amber-50/70 hover:bg-amber-100/80 border-amber-200 shadow-2xs hover:shadow-xs"
                    : "bg-[#FAF3E4]/60 border-black/[0.06] hover:bg-[#FAF3E4] shadow-2xs"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {/* Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                      isCallback
                        ? "bg-[#FFEDD5] text-[#C2410C] border border-[#FDBA74]"
                        : notif.type === "handoff"
                        ? "bg-[#FFD9A0] text-[#7A4B00]"
                        : notif.type === "campaign"
                        ? "bg-[#C1F2D5] text-[#16856B]"
                        : notif.type === "knowledge"
                        ? "bg-[#D9C2FA] text-[#5B21B6]"
                        : "bg-[#FFC0D3] text-[#9F1239]"
                    }`}
                  >
                    {isCallback && <UserCheck className="w-4 h-4 stroke-[2.2]" />}
                    {!isCallback && notif.type === "handoff" && <PhoneForwarded className="w-3.5 h-3.5 stroke-[2]" />}
                    {!isCallback && notif.type === "campaign" && <CheckCircle2 className="w-3.5 h-3.5 stroke-[2]" />}
                    {!isCallback && notif.type === "knowledge" && <Sparkles className="w-3.5 h-3.5 stroke-[2]" />}
                    {!isCallback &&
                      notif.type !== "handoff" &&
                      notif.type !== "campaign" &&
                      notif.type !== "knowledge" && <AlertTriangle className="w-3.5 h-3.5 stroke-[2]" />}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                        <span className="font-bold text-[#1A1A1A] text-xs truncate">
                          {notif.title}
                        </span>
                        {isCallback && (
                          <span className="px-1.5 py-0.2 rounded-md text-[9px] font-bold uppercase tracking-wide bg-red-100 text-red-700 border border-red-200">
                            Human Action
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-black/40 shrink-0 font-mono font-medium">
                        {notif.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-black/70 font-normal leading-snug">
                      {notif.message}
                    </p>

                    {/* Specific Callout for Human Interaction Reason */}
                    {isCallback && notif.humanInteractionReason && (
                      <div className="mt-2 p-2 rounded-xl bg-white/90 border border-amber-200/90 text-[11px] text-amber-950 leading-relaxed shadow-2xs">
                        <div className="font-semibold text-amber-900 flex items-center gap-1.5 mb-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span>Action Required by Counselor / Admin:</span>
                        </div>
                        <p className="text-black/80 font-medium pl-3">
                          {notif.humanInteractionReason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Action Link for Callbacks */}
                {isCallback && (
                  <div className="mt-1 pt-1.5 border-t border-amber-200/60 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#C2410C] group-hover:text-[#9A3412] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <PhoneCall className="w-3 h-3 stroke-[2.2]" />
                      <span>Take Action in Callbacks Queue</span>
                      <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                      Open Callback
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-black/50">
        <span className="font-medium flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Real-time queue sync
        </span>
        <button
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            router.push("/dashboard/callbacks?filter=human");
            onClose();
          }}
          className="font-semibold text-black/70 hover:text-black hover:underline cursor-pointer"
        >
          View all callbacks queue &rarr;
        </button>
      </div>
    </div>
  );
}
