"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Search,
  FileText,
  Bot,
  FlaskConical,
  TrendingUp,
  PhoneCall,
  Building2,
  CheckCircle2,
  ChevronDown,
  Bell,
  Sparkles,
  Home,
  SlidersHorizontal,
  Radio
} from "lucide-react";
import { OrganizationInfo, NotificationItem } from "@/types/dashboard";
import NotificationsPanel from "./components/NotificationsPanel";
import { TabKey } from "./DashboardSidebar";

interface DashboardHeaderProps {
  currentOrg: OrganizationInfo;
  organizations: OrganizationInfo[];
  onSwitchOrg: (org: OrganizationInfo) => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onOpenSearch?: () => void;
}

export default function DashboardHeader({
  currentOrg,
  organizations,
  onSwitchOrg,
  notifications,
  onMarkAllNotificationsRead,
  activeTab,
  onSelectTab,
  onOpenSearch
}: DashboardHeaderProps) {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Floating pill tabs tailored for Higher Ed Admissions Head & AI Voice Operations
  const navPills: { id: TabKey; label: string; icon: any }[] = [
    { id: "overview", label: "Admissions Dynamics", icon: Search },
    { id: "calls", label: "Inbound & Outbound", icon: PhoneCall },
    { id: "agents", label: "AI Voice Agents", icon: Bot },
    { id: "knowledge", label: "Prospectus RAG", icon: FlaskConical },
    { id: "analytics", label: "Admissions Yield", icon: TrendingUp },
    { id: "telephony", label: "SIP Trunks", icon: Radio }
  ];

  return (
    <header className="w-full pt-4 pb-2 px-2 sm:px-4 z-30 select-none">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* ========================================================================= */}
        {/* LEFT: ACTION BUTTON + UNIVERSITY HEAD MODULE HEADER                      */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-3">
          {/* Circular Home / Exit Action Button */}
          <Link
            href="/"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#d6ff38] hover:bg-[#cbf72e] border-[1.5px] border-black text-black flex items-center justify-center shadow-[2px_2px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-transform cursor-pointer shrink-0"
            title="Return to Home Portal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </Link>

          {/* Module Title */}
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg sm:text-xl font-black text-black tracking-tight font-sans uppercase">
              Admissions Intelligence
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#d6ff38] text-black border border-black shadow-[1px_1px_0px_#000000]">
              <span className="w-2 h-2 rounded-full bg-black inline-block animate-pulse" />
              APEX UNIVERSITY • 24/7 AI
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT: NEO-BRUTALIST PILL NAVIGATION TABS                                */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {navPills.map((pill) => {
            const Icon = pill.icon;
            const isActive = activeTab === pill.id;

            return (
              <button
                key={pill.id}
                onClick={() => onSelectTab(pill.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all duration-120 cursor-pointer flex items-center gap-1.5 whitespace-nowrap border-[1.5px] ${
                  isActive
                    ? "bg-[#d6ff38] text-black border-black shadow-[2px_2px_0px_#000000] -translate-y-0.5"
                    : "bg-white text-neutral-800 border-black shadow-[1px_1px_0px_#000000] hover:bg-neutral-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5 stroke-[2] text-black" />
                <span>{pill.label}</span>
              </button>
            );
          })}

          {/* Notifications Drawer */}
          <div className="relative shrink-0">
            <button
              onClick={() => setNotifPanelOpen(!notifPanelOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white hover:bg-neutral-50 border-[1.5px] border-black text-black flex items-center justify-center shadow-[1.5px_1.5px_0px_#000000] cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 relative"
              title="Admissions Alerts & Telephony Notifications"
            >
              <Bell className="w-3.5 h-3.5 stroke-[2]" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#d6ff38] border border-black" />
              )}
            </button>

            {notifPanelOpen && (
              <NotificationsPanel
                notifications={notifications}
                onClose={() => setNotifPanelOpen(false)}
                onMarkAllRead={onMarkAllNotificationsRead}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
