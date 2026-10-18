"use client";

import React from "react";
import { NotificationItem } from "@/types/dashboard";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  PhoneForwarded,
  Sparkles,
  X,
  Check,
} from "lucide-react";

interface NotificationsPanelProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead: () => void;
}

export default function NotificationsPanel({
  notifications,
  isOpen,
  onClose,
  onMarkAllRead,
}: NotificationsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-[26px] border border-black/[0.08] shadow-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 select-none font-sans text-[#1A1A1A]">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#FAF3E4] flex items-center justify-center text-[#1A1A1A]">
            <Bell className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <h4 className="font-bold text-[#1A1A1A] text-sm tracking-tight">
            Notifications
          </h4>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#D9C2FA] text-[#5B21B6]">
            {notifications.filter((n) => !n.read).length} Unread
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onMarkAllRead}
            className="text-[11px] font-semibold text-black/70 hover:text-black flex items-center gap-1 cursor-pointer bg-[#FAF3E4] hover:bg-[#FAF3E4]/80 px-2.5 py-1 rounded-full border border-black/[0.06] transition-all"
          >
            <Check className="w-3 h-3 stroke-[2.5]" />
            Mark Read
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#FAF3E4] hover:bg-[#FAF3E4]/80 text-black/50 hover:text-black border border-black/[0.06] flex items-center justify-center cursor-pointer transition-all shadow-2xs"
          >
            <X className="w-3.5 h-3.5 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5 max-h-[340px] overflow-y-auto my-3.5 pr-1">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3 rounded-[18px] transition-all flex items-start gap-3 border ${
              notif.read
                ? "bg-[#FAF3E4]/30 border-black/[0.04] opacity-75"
                : "bg-[#FAF3E4]/60 border-black/[0.06] hover:bg-[#FAF3E4] shadow-2xs"
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
              notif.type === "handoff" ? "bg-[#FFD9A0] text-[#7A4B00]" :
              notif.type === "campaign" ? "bg-[#C1F2D5] text-[#16856B]" :
              notif.type === "knowledge" ? "bg-[#D9C2FA] text-[#5B21B6]" : "bg-[#FFC0D3] text-[#9F1239]"
            }`}>
              {notif.type === "handoff" && <PhoneForwarded className="w-3.5 h-3.5 stroke-[2]" />}
              {notif.type === "campaign" && <CheckCircle2 className="w-3.5 h-3.5 stroke-[2]" />}
              {notif.type === "knowledge" && <Sparkles className="w-3.5 h-3.5 stroke-[2]" />}
              {notif.type !== "handoff" && notif.type !== "campaign" && notif.type !== "knowledge" && <AlertTriangle className="w-3.5 h-3.5 stroke-[2]" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-semibold text-[#1A1A1A] text-xs truncate">
                  {notif.title}
                </span>
                <span className="text-[10px] text-black/40 shrink-0 font-mono font-medium">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-xs text-black/60 font-normal leading-snug">
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-black/[0.06] text-center">
        <span className="text-[11px] font-medium text-black/50">
          ⚡ Real-time webhook notifications active
        </span>
      </div>
    </div>
  );
}
