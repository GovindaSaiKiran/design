"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Search,
  User,
  Settings,
  LogOut,
  Zap,
  CreditCard,
  Bell,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import TopUpCreditsModal from "./modals/TopUpCreditsModal";
import NotificationsPanel from "./components/NotificationsPanel";
import { NotificationItem } from "@/types/dashboard";
import { soundSynth } from "@/lib/audio-synth";

interface AppHeaderProps {
  onToggleMobileSidebar: () => void;
  onOpenSearch?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

export default function AppHeader({
  onToggleMobileSidebar,
  onOpenSearch,
  isCollapsed = false,
  onToggleCollapse,
}: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [userName, setUserName] = useState("Govinda T.");
  const [userEmail, setUserEmail] = useState("admin@swaram.ai");

  const searchPrompts = [
    "Search calls, ask Swara AI, or jump anywhere...",
    "Filter calls by 'fee inquiry', 'positive sentiment'...",
    "Lookup Maya's transcripts, student leads, or SIP trunks...",
    "Search voice workforce, campaign queues, or dial a contact...",
  ];
  const [promptIndex, setPromptIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsList, setNotificationsList] = useState<NotificationItem[]>([
    {
      id: "notif-001",
      type: "campaign",
      title: "Outbound Batch Milestone",
      message: "Batch 'Round 2 Entrance Follow-up' reached 100% resolution with 63% conversion.",
      timestamp: "10 mins ago",
      read: false,
      severity: "info",
    },
    {
      id: "notif-002",
      type: "handoff",
      title: "Warm Transfer Escalated",
      message: "Agent Maya escalated student Rahul Sharma (+91 98401 22345) to Senior Admissions Desk.",
      timestamp: "25 mins ago",
      read: false,
      severity: "warning",
    },
    {
      id: "notif-003",
      type: "knowledge",
      title: "SIP Carrier SLA Optimal",
      message: "TRK-91-AIRTEL-PRI operating at 136ms SLA (Opus HD codec verified).",
      timestamp: "1 hr ago",
      read: true,
      severity: "info",
    },
    {
      id: "notif-004",
      type: "usage",
      title: "Sandbox Balance Quota",
      message: "14.0 minutes remaining in Free Sandbox tier. Auto-recharge standby.",
      timestamp: "2 hrs ago",
      read: true,
      severity: "info",
    },
  ]);
  const unreadCount = notificationsList.filter((n) => !n.read).length;

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("swaram_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.name || u.fullName) setUserName(u.name || u.fullName);
        if (u.email) setUserEmail(u.email);
      }
    } catch {
      // Keep defaults
    }

    if (typeof navigator !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent));
    }

    const interval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % searchPrompts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSectionTitle = () => {
    if (pathname === "/dashboard") return "Voice Operations Console";
    if (pathname?.startsWith("/dashboard/agents")) return "AI Voice Agents";
    if (pathname?.startsWith("/dashboard/calls")) return "Conversations & Transcripts";
    if (pathname?.startsWith("/dashboard/contacts")) return "Contacts & Audiences";
    if (pathname?.startsWith("/dashboard/campaigns")) return "Campaigns & Bulk Calling";
    if (pathname?.startsWith("/dashboard/data-vault")) return "Data Vault";
    if (pathname?.startsWith("/dashboard/callbacks")) return "Callbacks & Follow-ups";
    if (pathname?.startsWith("/dashboard/instant-leads")) return "WhatsApp & Instant Leads";
    if (pathname?.startsWith("/dashboard/delegate")) return "Agent Playground";
    if (pathname?.startsWith("/dashboard/knowledge")) return "Knowledge Base";
    if (pathname?.startsWith("/dashboard/analytics")) return "Analytics & Reports";
    if (pathname?.startsWith("/dashboard/reports")) return "Compliance Reports";
    if (pathname?.startsWith("/dashboard/phone-numbers")) return "Telephony & SIP Trunks";
    if (pathname?.startsWith("/dashboard/billing")) return "Minutes & Billing";
    if (pathname?.startsWith("/dashboard/team")) return "Team & Access Roles";
    if (pathname?.startsWith("/dashboard/settings")) return "Workspace Settings";
    return "Operations";
  };

  return (
    <>
      <header className="w-full flex flex-col gap-3 pb-3 select-none">
        {/* Top Row: Title, Carrier Status Pill, and Action Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Mobile hamburger & Section Title & Desktop Collapse Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-2xl bg-white border border-black/[0.08] text-black shadow-xs cursor-pointer"
              aria-label="Toggle navigation"
            >
              <Menu className="w-4 h-4" />
            </button>

            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex items-center justify-center p-2 rounded-2xl bg-white border border-black/[0.08] text-black/60 hover:text-black hover:bg-[#FAF3E4] transition-colors cursor-pointer shadow-2xs"
                title={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="w-4 h-4" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )}
              </button>
            )}

            <h1 className="text-xl sm:text-[22px] font-semibold text-[#1A1A1A] tracking-tight">
              {getSectionTitle()}
            </h1>
          </div>

          {/* Right: Secondary Action Pills (Balance, Profile) */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Notifications Trigger & Panel */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setNotificationsOpen(!notificationsOpen);
                }}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border text-xs font-semibold shadow-2xs transition-all cursor-pointer ${
                  notificationsOpen
                    ? "bg-[#FAF3E4] border-black/25 text-[#1A1A1A]"
                    : "bg-white hover:bg-[#FAF3E4] border-black/[0.08] text-[#1A1A1A]"
                }`}
                title="System Notifications & Alerts"
                aria-label="Open notifications"
              >
                <div className="relative flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5 text-black/75" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#EF4444] ring-1 ring-white animate-pulse" />
                  )}
                </div>
                <span className="hidden sm:inline">Notifications</span>
                {unreadCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#EF4444] text-white leading-tight shadow-xs">
                    {unreadCount}
                  </span>
                )}
              </button>

              <NotificationsPanel
                notifications={notificationsList}
                isOpen={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
                onMarkAllRead={() => {
                  try { soundSynth.play("confirm"); } catch {}
                  setNotificationsList((prev) => prev.map((n) => ({ ...n, read: true })));
                }}
              />
            </div>

            {/* Balance chip */}
            <button
              onClick={() => setTopUpOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C1F2D5] text-[#065F46] border border-[#16856B]/20 text-xs font-semibold shadow-2xs cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
              <span>14.0 min</span>
            </button>

            {/* Profile Avatar Capsule */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-8 h-8 rounded-full bg-[#C9A7F5] text-[#3B0764] font-bold text-xs flex items-center justify-center border border-black/10 shadow-2xs cursor-pointer hover:scale-105 transition-transform"
                title={`Profile: ${userName}`}
              >
                {userName.charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-black/[0.08] shadow-xl py-2 z-50 animate-in fade-in duration-100 text-xs text-[#1A1A1A]">
                  <div className="px-4 py-2 border-b border-black/[0.06] bg-[#FAF3E4]/50 rounded-t-2xl">
                    <p className="font-semibold text-[#1A1A1A] text-xs">{userName}</p>
                    <p className="text-[11px] text-black/50 truncate">{userEmail}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/dashboard/agents"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-black/70 hover:text-black hover:bg-[#FAF3E4]/60 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-black/50" />
                      <span>Manage Voice Agents</span>
                    </Link>
                    <Link
                      href="/dashboard/billing"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-black/70 hover:text-black hover:bg-[#FAF3E4]/60 transition-colors"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-black/50" />
                      <span>Minutes &amp; Billing</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-black/70 hover:text-black hover:bg-[#FAF3E4]/60 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-black/50" />
                      <span>Workspace Settings</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Toolbar: Full-width Interactive Search Bar with Attractive Rotating Prompts */}
        <div
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-2.5 sm:py-3 bg-white/85 hover:bg-white border-2 border-black/[0.08] hover:border-black/20 rounded-2xl sm:rounded-full shadow-xs backdrop-blur-xs transition-all duration-200 cursor-pointer group select-none"
        >
          {/* Search Input on Left */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#FFF4ED] border border-[#FF6B08]/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
              <Search className="w-4 h-4 text-[#FF6B08]" />
            </div>
            <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
              <span className="text-xs sm:text-sm font-medium text-black/75 tracking-tight truncate transition-all duration-300">
                {searchPrompts[promptIndex]}
              </span>
            </div>
          </div>

          {/* Keyboard shortcut keycap pill on Right */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/[0.04] border border-black/[0.08] text-[11px] font-mono font-bold text-black/50 shadow-2xs shrink-0 group-hover:bg-black/[0.07] group-hover:text-black/70 transition-colors">
            <span>{isMac ? "⌘" : "Ctrl"}</span>
            <span>K</span>
          </div>
        </div>
      </header>


      <TopUpCreditsModal
        isOpen={topUpOpen}
        onClose={() => setTopUpOpen(false)}
        currentCredits={14}
      />
    </>
  );
}
