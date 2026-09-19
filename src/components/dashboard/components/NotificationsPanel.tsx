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
        return <PhoneForwarded className="w-4 h-4 text-amber-600" />;
      case "campaign":
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case "knowledge":
        return <Sparkles className="w-4 h-4 text-blue-600" />;
      case "usage":
      default:
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
    }
  };

  return (
    <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-2xl border-3 border-black shadow-[8px_8px_0px_#000000] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 select-none">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-black stroke-[2.5]" />
          <h4 className="font-black text-black text-sm uppercase">
            Notifications
          </h4>
          <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-[#d6ff38] text-black border border-black shadow-[1px_1px_0px_#000000]">
            {notifications.filter((n) => !n.read).length} UNREAD
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onMarkAllRead}
            className="text-xs font-black text-black hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            Mark read
          </button>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-[#fcffe0] text-black border border-black flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
          >
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="divide-y-2 divide-black/10 max-h-[340px] overflow-y-auto my-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`py-3 px-2 rounded-xl transition-colors flex items-start gap-3 ${
              notif.read ? "opacity-75 hover:bg-neutral-50" : "bg-[#fcffe0] hover:bg-[#f6ffb8]"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-white shadow-[1.5px_1.5px_0px_#000000] border-2 border-black flex items-center justify-center shrink-0 mt-0.5 text-black">
              {renderIcon(notif.type, notif.severity)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="font-black text-black text-xs truncate uppercase">
                  {notif.title}
                </span>
                <span className="text-[10px] text-black/60 shrink-0 font-mono font-bold">
                  {notif.timestamp}
                </span>
              </div>
              <p className="text-xs font-medium text-black leading-snug">
                {notif.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-2 border-t-2 border-black text-center">
        <span className="text-xs font-bold text-black/70">
          Real-time webhook notifications active
        </span>
      </div>
    </div>
  );
}
