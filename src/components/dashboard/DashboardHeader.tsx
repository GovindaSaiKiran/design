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
import { Palette } from "lucide-react";

export type DashboardTheme = "indigo" | "ocean" | "sunset" | "midnight";

interface DashboardHeaderProps {
  currentOrg: OrganizationInfo;
  organizations: OrganizationInfo[];
  onSwitchOrg: (org: OrganizationInfo) => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onOpenSearch?: () => void;
  theme?: DashboardTheme;
  onThemeChange?: (theme: DashboardTheme) => void;
}

export default function DashboardHeader({
  currentOrg,
  organizations,
  onSwitchOrg,
  notifications,
  onMarkAllNotificationsRead,
  activeTab,
  onSelectTab,
  onOpenSearch,
  theme = "indigo",
  onThemeChange
}: DashboardHeaderProps) {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const themesList: { id: DashboardTheme; label: string; primaryDot: string; accentDot: string }[] = [
    { id: "indigo", label: "Electric Indigo", primaryDot: "bg-indigo-600", accentDot: "bg-cyan-400" },
    { id: "ocean", label: "Ocean & Mint", primaryDot: "bg-sky-600", accentDot: "bg-emerald-400" },
    { id: "sunset", label: "Sunset Violet", primaryDot: "bg-purple-600", accentDot: "bg-amber-400" },
    { id: "midnight", label: "Midnight Luxe", primaryDot: "bg-slate-900", accentDot: "bg-emerald-400" },
  ];

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
    <header className="w-full pb-4 px-1 z-30 select-none border-b-2.5 border-black mb-5 font-sans">
      <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        {/* ========================================================================= */}
        {/* LEFT: ACTION BUTTON + UNIVERSITY HEAD MODULE HEADER                      */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-3">
          {/* Home / Exit Action Button */}
          <Link
            href="/"
            className="w-10 h-10 rounded-xl bg-black hover:bg-[#d6ff38] text-white hover:text-black flex items-center justify-center border-2.5 border-black shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] transition-all cursor-pointer shrink-0 font-black"
            title="Return to Home Portal"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </Link>

          {/* Module Title */}
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-black uppercase">
              Admissions Intelligence
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-[#d6ff38] text-black border-2 border-black shadow-[2.5px_2.5px_0px_#000000] -rotate-1">
              <span className="w-2 h-2 rounded-full bg-black inline-block animate-ping" />
              Apex University • 24/7 AI
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT: NEO PILL NAVIGATION + CONTROLS                                    */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 xl:pb-0 scrollbar-none">
          {navPills.map((pill) => {
            const Icon = pill.icon;
            const isActive = activeTab === pill.id;

            return (
              <button
                key={pill.id}
                onClick={() => onSelectTab(pill.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-150 cursor-pointer flex items-center gap-2 whitespace-nowrap border-2.5 border-black ${
                  isActive
                    ? "bg-[#d6ff38] text-black shadow-[3px_3px_0px_#000000] -translate-y-0.5"
                    : "bg-white text-black hover:bg-[#00f0ff] shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000]"
                }`}
              >
                <Icon className="w-4 h-4 stroke-[2.5]" />
                <span>{pill.label}</span>
              </button>
            );
          })}

          {/* Notifications Drawer */}
          <div className="relative shrink-0 ml-1">
            <button
              onClick={() => setNotifPanelOpen(!notifPanelOpen)}
              className="w-10 h-10 rounded-xl bg-white hover:bg-[#ffe600] border-2.5 border-black text-black flex items-center justify-center shadow-[3px_3px_0px_#000000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000000] cursor-pointer transition-all relative font-black"
              title="Admissions Alerts & Telephony Notifications"
            >
              <Bell className="w-4 h-4 stroke-[2.5]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black text-[#d6ff38] font-black text-[10px] flex items-center justify-center border border-black shadow-[1px_1px_0px_#ffffff]">
                  {unreadCount}
                </span>
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
