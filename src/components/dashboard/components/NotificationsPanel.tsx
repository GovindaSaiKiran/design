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
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl border-3 border-black shadow-[6px_6px_0px_#000000] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 select-none">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-black stroke-[2.5]" />
          <h4 className="font-black text-black text-sm uppercase tracking-tight">
            Notifications
          </h4>
          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[1.5px_1.5px_0px_#000000]">
            {notifications.filter((n) => !n.read).length} UNREAD
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onMarkAllRead}
            className="text-[11px] font-black uppercase text-black hover:bg-[#ffe600] flex items-center gap-1 cursor-pointer bg-[#ffe600]/60 px-2 py-1 rounded-md border-2 border-black shadow-[1.5px_1.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            Mark Read
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-white hover:bg-[#ff8080] text-black border-2 border-black flex items-center justify-center cursor-pointer transition-colors shadow-[1.5px_1.5px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2 max-h-[340px] overflow-y-auto my-3 pr-1">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-2.5 rounded-xl transition-all flex items-start gap-3 border-2 border-black ${
              notif.read
                ? "bg-slate-50 opacity-80 shadow-[1.5px_1.5px_0px_#000000]"
                : "bg-[#00f0ff]/15 hover:bg-[#00f0ff]/25 shadow-[3px_3px_0px_#000000]"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg shadow-[2px_2px_0px_#000000] border-2 border-black flex items-center justify-center shrink-0 mt-0.5 ${
              notif.type === "handoff" ? "bg-[#ffe600]" :
              notif.type === "campaign" ? "bg-[#d6ff38]" :
              notif.type === "knowledge" ? "bg-[#00f0ff]" : "bg-[#ff8080]"
            }`}>
              {renderIcon(notif.type, notif.severity)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-black text-black text-xs truncate">
                  {notif.title}
                </span>
                <span className="text-[10px] text-black/60 shrink-0 font-mono font-bold">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-xs font-bold text-black/80 leading-snug">
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2.5 border-t-2 border-black text-center">
        <span className="text-[11px] font-black uppercase tracking-wider text-black/70">
          ⚡ Real-time webhook notifications active
        </span>
      </div>
    </div>
  );
}
