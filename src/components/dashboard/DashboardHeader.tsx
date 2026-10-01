"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
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
  Sliders,
  ArrowUpRight,
  ArrowLeft,
  Activity,
  Layers,
  PhoneForwarded,
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
  onCreateAgent?: () => void;
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
  onCreateAgent,
}: DashboardHeaderProps) {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [notifPanelOpen, setNotifPanelOpen] = useState(false);
  const [showTelemetryPopup, setShowTelemetryPopup] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Front Page styled navigation tabs
  const navTabs: { id: TabKey; label: string; tag?: string; live?: boolean }[] = [
    { id: "overview", label: "OVERVIEW" },
    { id: "calls", label: "VOICE STREAMS", tag: "LIVE", live: true },
    { id: "agents", label: "INDIC FLEET", tag: "V3" },
    { id: "campaigns", label: "OUTBOUND" },
    { id: "contacts", label: "CANDIDATES" },
    { id: "knowledge", label: "KNOWLEDGE" },
    { id: "analytics", label: "TELEMETRY" },
    { id: "telephony", label: "SIP TRUNK" },
    { id: "settings", label: "SETTINGS" },
  ];

  return (
    <header className="w-full mb-6 font-sans select-none relative z-40">
      {/* ========================================================================= */}
      {/* FLOATING FRONT-PAGE DYNAMIC ISLAND HEADER BAR                             */}
      {/* ========================================================================= */}
      <div className="w-full dynamic-island-glass rounded-full px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-white/80 bg-white/85 backdrop-blur-2xl">
        
        {/* ========================================================================= */}
        {/* 1. LEFT WING: Origami Soundwave Logo + Live Voice Pill + Org Selector     */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          {/* Origami Logo & Brand Mark */}
          <Link
            href="/"
            className="flex items-center gap-2 focus:outline-none group/logo"
            title="Return to VoicePilot Front Page"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 relative flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-xs transition-transform group-hover/logo:scale-105 duration-200"
              >
                <path d="M5 26L16 6L21 15.5L13 22L5 26Z" fill="#0f172a" fillOpacity="0.95" />
                <path d="M16 6L27 26L19 23L16 16.5L16 6Z" fill="#0284c7" fillOpacity="1" />
                <path d="M13 22L19 23L16 26L13 22Z" fill="#38bdf8" fillOpacity="1" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-neutral-900">
                VoicePilot
              </span>
              <span className="text-[#0d5926] bg-[#cdfb56] text-[9px] sm:text-[10px] font-black tracking-widest px-1.5 py-0.5 rounded-md shadow-xs">
                AI
              </span>
            </div>
          </Link>

          {/* Vertical Divider */}
          <div className="hidden sm:block w-px h-5 bg-neutral-200" />

          {/* Live Voice Indicator with 4-Bar Dancing Equalizer (Front-Page Style) */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setShowTelemetryPopup(true)}
            onMouseLeave={() => setShowTelemetryPopup(false)}
            onClick={() => setShowTelemetryPopup(!showTelemetryPopup)}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-800 shadow-2xs hover:bg-emerald-500/15 transition-all">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#34d399]" />
              </span>
              <span className="hidden md:inline tracking-wide font-medium">Live Voice</span>

              {/* 4-Bar Audio Equalizer Waveform */}
              <div className="flex items-end gap-0.5 h-3 ml-0.5" title="Sub-140ms Voice Telephony Active">
                <span className="w-0.5 h-1.5 rounded-full bg-emerald-600 animate-[pulse_0.8s_ease-in-out_infinite]" />
                <span className="w-0.5 h-3 rounded-full bg-emerald-600 animate-[pulse_1.2s_ease-in-out_infinite]" />
                <span className="w-0.5 h-2.5 rounded-full bg-emerald-600 animate-[pulse_0.9s_ease-in-out_infinite]" />
                <span className="w-0.5 h-1.5 rounded-full bg-emerald-600 animate-[pulse_1.4s_ease-in-out_infinite]" />
              </div>
            </div>

            {/* Hover Telemetry Popup (Front Page style) */}
            {showTelemetryPopup && (
              <div className="absolute top-full left-0 mt-2.5 w-72 bg-white/98 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl border border-neutral-200/90 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Maya Voice Telemetry</span>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-mono px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                    99.98% Uptime
                  </span>
                </div>
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">First-Byte Turn Latency</span>
                    <span className="font-mono font-bold text-emerald-600">140 ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Concurrent SIP Trunks</span>
                    <span className="font-semibold text-neutral-800">14 Active Channels</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">FERPA Grounding</span>
                    <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Enforced
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Campus Organization Selector Dropdown */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
              className="px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 text-neutral-800 text-[11px] font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <Building2 className="w-3 h-3 text-neutral-500 shrink-0" />
              <span className="max-w-[140px] truncate">{currentOrg.name}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400 shrink-0" />
            </button>

            {orgDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-2xl rounded-2xl border border-neutral-200 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[10px] font-semibold text-neutral-400 uppercase px-3 py-1.5">
                  Select Campus / Institution
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

        {/* ========================================================================= */}
        {/* 2. CENTER CAPSULE: Front-Page Style Capsule Navigation Menu               */}
        {/* ========================================================================= */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5 max-w-full">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`text-[11px] lg:text-xs font-semibold tracking-wider uppercase px-3 sm:px-3.5 py-1.5 rounded-full transition-all duration-150 cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 active:scale-95 ${
                  isActive
                    ? "bg-neutral-900 text-white shadow-xs"
                    : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/80"
                }`}
              >
                <span>{tab.label}</span>
                {tab.tag && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[9px] font-bold uppercase tracking-wider ${
                      isActive
                        ? "bg-white/20 text-[#cdfb56]"
                        : tab.live
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-black/5 text-neutral-600"
                    }`}
                  >
                    {tab.live && <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 mr-1 animate-pulse" />}
                    {tab.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* ========================================================================= */}
        {/* 3. RIGHT WING: Search, Notifications & Front-Page CTA Buttons             */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-200 text-neutral-600 hover:text-neutral-900 text-xs font-medium transition-all cursor-pointer shadow-2xs"
            title="Search transcripts, candidates..."
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-[11px]">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white text-[9px] font-mono text-neutral-500 border border-neutral-200">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Bell */}
          <div className="relative shrink-0">
            <button
              onClick={() => setNotifPanelOpen(!notifPanelOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-700 hover:text-neutral-900 flex items-center justify-center cursor-pointer transition-all shadow-2xs relative"
              title="Notifications & Admissions Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 text-white font-bold text-[8px] flex items-center justify-center border border-white shadow-2xs">
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

          {/* Front-Page Style Lime CTA Button (matches BOOK DEMO ↗) */}
          <button
            onClick={onCreateAgent}
            className="hidden sm:inline-flex bg-[#cdfb56] hover:bg-[#bef03f] active:scale-95 text-black text-xs font-black uppercase tracking-wider px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-[0_0_20px_rgba(205,251,86,0.35)] hover:shadow-[0_0_26px_rgba(205,251,86,0.55)] transition-all duration-200 cursor-pointer items-center gap-1.5 shrink-0"
          >
            <span>NEW AGENT</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>

          {/* Exit / Return to Front Page Link */}
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-neutral-200 hover:border-neutral-300 text-neutral-700 hover:text-neutral-950 bg-neutral-100/60 hover:bg-neutral-200/60 transition-all cursor-pointer flex items-center gap-1 shrink-0"
            title="Return to VoicePilot Front Page"
          >
            <ArrowLeft className="w-3 h-3" />
            <span className="hidden md:inline">FRONT PAGE</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
