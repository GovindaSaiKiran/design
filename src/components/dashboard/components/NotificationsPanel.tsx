"use client";

import React from "react";
import { NotificationItem } from "@/types/dashboard";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
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

  const renderIcon = (type: NotificationItem["type"], severity: NotificationItem["severity"]) => {
    switch (type) {
      case "handoff":
        return <PhoneForwarded className="w-4 h-4 text-black stroke-[2.5]" />;
      case "campaign":
        return <CheckCircle2 className="w-4 h-4 text-black stroke-[2.5]" />;
      case "knowledge":
        return <Sparkles className="w-4 h-4 text-black stroke-[2.5]" />;
      case "usage":
      default:
        return <AlertTriangle className="w-4 h-4 text-black stroke-[2.5]" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl rounded-3xl border border-black/15 shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 select-none font-sans">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-black/10">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800">
            <Bell className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm tracking-tight">
            Notifications
          </h4>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-black/10 shadow-xs">
            {notifications.filter((n) => !n.read).length} Unread
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onMarkAllRead}
            className="text-[11px] font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1 cursor-pointer bg-white/90 hover:bg-white px-2.5 py-1 rounded-xl border border-black/10 hover:border-black/30 shadow-xs transition-all"
          >
            <Check className="w-3 h-3 stroke-[2.5]" />
            Mark Read
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xl bg-white/90 hover:bg-white text-slate-500 hover:text-slate-950 border border-black/10 hover:border-black/30 flex items-center justify-center cursor-pointer transition-all shadow-xs"
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
            className={`p-3 rounded-2xl transition-all flex items-start gap-3 border ${
              notif.read
                ? "bg-slate-50/70 border-black/5 opacity-75"
                : "bg-white border-black/15 hover:border-black/35 shadow-xs hover:shadow-sm"
            }`}
          >
            <div className={`w-8 h-8 rounded-xl border border-black/10 flex items-center justify-center shrink-0 mt-0.5 shadow-xs ${
              notif.type === "handoff" ? "bg-amber-50 text-amber-700" :
              notif.type === "campaign" ? "bg-emerald-50 text-emerald-700" :
              notif.type === "knowledge" ? "bg-sky-50 text-sky-700" : "bg-rose-50 text-rose-700"
            }`}>
              {notif.type === "handoff" && <PhoneForwarded className="w-4 h-4 stroke-[2]" />}
              {notif.type === "campaign" && <CheckCircle2 className="w-4 h-4 stroke-[2]" />}
              {notif.type === "knowledge" && <Sparkles className="w-4 h-4 stroke-[2]" />}
              {notif.type !== "handoff" && notif.type !== "campaign" && notif.type !== "knowledge" && <AlertTriangle className="w-4 h-4 stroke-[2]" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-semibold text-slate-900 text-xs truncate">
                  {notif.title}
                </span>
                <span className="text-[10px] text-slate-400 shrink-0 font-mono font-medium">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-normal leading-snug">
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-black/10 text-center">
        <span className="text-[11px] font-medium text-slate-500">
          ⚡ Real-time webhook notifications active
        </span>
      </div>
    </div>
  );
}
