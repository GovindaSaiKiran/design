"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  X,
  Search,
  Bot,
  FlaskConical,
  TrendingUp,
  PhoneCall,
  Building2,
  CheckCircle2,
  ChevronDown,
  Bell,
  Sparkles,
  Radio,
  Globe,
  Sliders,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { OrganizationInfo, NotificationItem } from "@/types/dashboard";
import NotificationsPanel from "./components/NotificationsPanel";
import { TabKey } from "./DashboardSidebar";

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
}: DashboardHeaderProps) {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Sarvam-styled navigation pill tabs - complete Indic suite
  const navPills: { id: TabKey; label: string; icon: any; tag?: string; live?: boolean }[] = [
    { id: "overview", label: "Overview", icon: Search },
    { id: "calls", label: "Voice Streams", icon: PhoneCall, tag: "Live", live: true },
    { id: "agents", label: "Indic Fleet", icon: Bot, tag: "V3" },
    { id: "campaigns", label: "Outbound", icon: Radio },
    { id: "contacts", label: "Candidates", icon: Building2 },
    { id: "knowledge", label: "Knowledge", icon: FlaskConical },
    { id: "analytics", label: "Telemetry", icon: TrendingUp },
    { id: "telephony", label: "SIP Trunk", icon: PhoneCall },
    { id: "settings", label: "Settings", icon: Sliders },
  ];

  return (
    <header className="w-full pb-5 px-1 z-30 select-none border-b border-black/10 mb-7 font-sans space-y-5">
      {/* ========================================================================= */}
      {/* ROW 1: BRAND EMBLEM & INSTITUTION / CAMPUS CONTROLLER                     */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: Brand Emblem & Institution */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Home / Exit Action Button */}
          <Link
            href="/"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center border border-black/20 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer shrink-0"
            title="Return to Voice Simulator"
          >
            <X className="w-4 h-4 stroke-[2]" />
          </Link>

          {/* Model & Institution Title */}
          <div>
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
                Indic Voice Operations Console
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Bulbul V3 • 140ms Latency
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 font-serif-display">
                Apex Institute of Technology
              </h1>

              {/* Organization Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
                  className="px-2.5 py-1 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-black/5 text-neutral-700 text-xs font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span className="max-w-[140px] truncate">{currentOrg.name}</span>
                  <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
                </button>

                {orgDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl border border-black/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="text-[10px] font-semibold text-neutral-400 uppercase px-3 py-1.5">
                      Switch Organization / Campus
                    </div>
                    {organizations.map((org) => (
                      <button
                        key={org.id}
                        onClick={() => {
                          onSwitchOrg(org);
                          setOrgDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                          currentOrg.id === org.id
                            ? "bg-neutral-900 text-white font-semibold"
                            : "text-neutral-700 hover:bg-neutral-100 font-medium"
                        }`}
                      >
                        <span className="truncate">{org.name}</span>
                        {currentOrg.id === org.id && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Search Pill & Notification Bell */}
        <div className="flex items-center gap-2.5 self-end sm:self-center">
          {/* Quick Search trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 hover:bg-white border border-black/10 hover:border-black/25 text-neutral-500 hover:text-neutral-900 text-xs font-medium shadow-xs transition-all cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span>Search transcripts, leads...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 text-[10px] font-mono text-neutral-400 border border-black/5">⌘K</kbd>
          </button>

          {/* Notifications Drawer Button */}
          <div className="relative shrink-0">
            <button
              onClick={() => setNotifPanelOpen(!notifPanelOpen)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/80 backdrop-blur-xl hover:bg-white border border-black/10 hover:border-black/30 text-neutral-700 hover:text-neutral-900 flex items-center justify-center shadow-xs hover:-translate-y-0.5 cursor-pointer transition-all relative"
              title="Admissions Alerts & Telephony Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center border-2 border-white shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifPanelOpen && (
              <div className="relative z-50">
                <NotificationsPanel
                  notifications={notifications}
                  isOpen={notifPanelOpen}
                  onClose={() => setNotifPanelOpen(false)}
                  onMarkAllRead={onMarkAllNotificationsRead}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ROW 2: UI-FRIENDLY APPLE DYNAMIC ISLAND TASKBAR WITH TRUE GLASSMORPHISM   */}
      {/* ========================================================================= */}
      <div className="w-full apple-island-frosted rounded-full p-1.5 sm:p-2 px-3 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 relative z-20">
        {/* Left Wing: Dynamic Live Audio Visualizer Pill */}
        <div className="flex items-center gap-2 bg-neutral-900/90 text-white px-3 py-1.5 rounded-full shadow-xs shrink-0 backdrop-blur-md">
          {/* Animated 4-Bar Dancing Equalizer */}
          <div className="flex items-end gap-1 h-3.5 w-4 px-0.5 shrink-0">
            <span className="w-0.5 bg-emerald-400 rounded-full animate-audio-bar-1" />
            <span className="w-0.5 bg-emerald-400 rounded-full animate-audio-bar-2" />
            <span className="w-0.5 bg-emerald-400 rounded-full animate-audio-bar-3" />
            <span className="w-0.5 bg-emerald-400 rounded-full animate-audio-bar-4" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-[10px] font-semibold tracking-wider uppercase text-emerald-300 font-mono">
              LIVE
            </span>
            <span className="text-white/40 text-[10px]">•</span>
            <span className="text-[10px] text-white/85 font-mono">
              140ms
            </span>
          </div>
        </div>

        {/* Center: Frosted Glassmorphic Navigation Tabs on ONE UNBROKEN HORIZONTAL LINE */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5 max-w-full">
          {navPills.map((pill) => {
            const Icon = pill.icon;
            const isActive = activeTab === pill.id;

            return (
              <button
                key={pill.id}
                onClick={() => onSelectTab(pill.id)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isActive
                    ? "apple-pill-active-frosted"
                    : "apple-pill-inactive-frosted"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-emerald-400" : "text-neutral-500"}`} />
                <span className="font-medium">{pill.label}</span>
                {pill.tag && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[9px] font-semibold uppercase tracking-wider ${
                      isActive
                        ? "bg-white/20 text-emerald-300"
                        : pill.live
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                        : "bg-black/5 text-neutral-600 border border-black/5"
                    }`}
                  >
                    {pill.live && <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 mr-1 animate-pulse" />}
                    {pill.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Wing: Dynamic Island Status Telemetry */}
        <div className="hidden xl:flex items-center gap-2 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 text-[11px] text-neutral-700 font-medium shrink-0 shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>99.98% Gateway SLA</span>
        </div>
      </div>
    </header>
  );
}
