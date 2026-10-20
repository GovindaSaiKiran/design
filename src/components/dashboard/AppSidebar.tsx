"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Bot,
  Sparkles,
  Radio,
  Users,
  Megaphone,
  Calendar,
  FolderKanban,
  MessageSquare,
  BookOpen,
  TrendingUp,
  PhoneCall,
  CreditCard,
  Settings,
  Plus,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import CreateAgentModal from "./modals/CreateAgentModal";
import TopUpCreditsModal from "./modals/TopUpCreditsModal";
import { soundSynth } from "@/lib/audio-synth";

// Voice Library Icon matching the user's stacked library cards with mic symbol
// Standardized to 20x20 with 1.5px stroke width
function VoiceLibraryIcon({
  className = "w-5 h-5",
  isFilled = false,
}: {
  className?: string;
  isFilled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Back 2 stacked card edges */}
      <path d="M7 3h10a2 2 0 0 1 2 2v10" fill="none" />
      <path d="M10 1.5h8a2 2 0 0 1 2 2v10" fill="none" opacity="0.5" />
      {/* Front card body */}
      <rect x="3" y="6" width="13" height="16" rx="2.5" fill={isFilled ? "currentColor" : "none"} />
      {/* Microphone capsule */}
      <rect
        x="7"
        y="9"
        width="5"
        height="7"
        rx="2.5"
        fill={isFilled ? "var(--tw-fill-contrast, #1E1B4B)" : "none"}
        stroke={isFilled ? "white" : "currentColor"}
      />
      {/* Mic sound pickup ribs */}
      <line x1="8" y1="11.5" x2="11" y2="11.5" stroke={isFilled ? "white" : "currentColor"} />
      <line x1="8" y1="13.5" x2="11" y2="13.5" stroke={isFilled ? "white" : "currentColor"} />
      {/* Mic cradle U-arc */}
      <path d="M5.5 12.5a3.5 3.5 0 0 0 7 0" fill="none" stroke={isFilled ? "white" : "currentColor"} />
      {/* Mic stand stem */}
      <line x1="9" y1="16" x2="9" y2="18.5" stroke={isFilled ? "white" : "currentColor"} />
      {/* Mic base stand foot */}
      <line x1="7" y1="18.5" x2="11" y2="18.5" stroke={isFilled ? "white" : "currentColor"} />
    </svg>
  );
}

interface AppSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; isFilled?: boolean }>;
  exact?: boolean;
  badge?: string;
  badgeColor?: string;
  tintBg: string;
  activeTintBg: string;
  iconColor: string;
}

export default function AppSidebar({
  isOpenMobile = false,
  onCloseMobile,
  isCollapsed = false,
  onToggleCollapse,
}: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [createAgentOpen, setCreateAgentOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [userName, setUserName] = useState("Govinda T.");
  const [workspaceName, setWorkspaceName] = useState("Apex Global");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("swaram_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.name || u.fullName) setUserName(u.name || u.fullName);
        if (u.workspaceName) setWorkspaceName(u.workspaceName);
      }
    } catch {
      // Keep defaults
    }
  }, []);

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("aeline_auth_token");
    }
    router.push("/");
  };

  // Nav configuration following specific iconography & 36x36 badge with subtle tint
  const mainNav: NavItem[] = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutGrid,
      exact: true,
      tintBg: "bg-indigo-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-indigo-600",
    },
    {
      label: "AI Agents",
      href: "/dashboard/agents",
      icon: Bot,
      badge: "3 Live",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200/60",
      tintBg: "bg-emerald-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-emerald-600",
    },
    {
      label: "Voice Library",
      href: "/dashboard/agents?tab=voices",
      icon: VoiceLibraryIcon,
      badge: "HD",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200/60",
      tintBg: "bg-purple-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-purple-600",
    },
    {
      label: "Agent Playground",
      href: "/dashboard/delegate",
      icon: Sparkles,
      tintBg: "bg-amber-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-amber-600",
    },
    {
      label: "Live Telephony",
      href: "/dashboard/calls",
      icon: Radio,
      badge: "Active",
      badgeColor: "bg-rose-100 text-rose-700 border-rose-200/60 animate-pulse",
      tintBg: "bg-rose-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-rose-600",
    },
  ];

  const campaignNav: NavItem[] = [
    {
      label: "Contacts & Lists",
      href: "/dashboard/contacts",
      icon: Users,
      tintBg: "bg-blue-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-blue-600",
    },
    {
      label: "Campaign Dispatch",
      href: "/dashboard/campaigns",
      icon: Megaphone,
      tintBg: "bg-orange-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-orange-600",
    },
    {
      label: "Callbacks Queue",
      href: "/dashboard/callbacks",
      icon: Calendar,
      tintBg: "bg-teal-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-teal-600",
    },
    {
      label: "Data Vault",
      href: "/dashboard/data-vault",
      icon: FolderKanban,
      tintBg: "bg-cyan-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-cyan-600",
    },
    {
      label: "WhatsApp Flows",
      href: "/dashboard/instant-leads",
      icon: MessageSquare,
      tintBg: "bg-emerald-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-emerald-600",
    },
  ];

  const platformNav: NavItem[] = [
    {
      label: "Knowledge Base",
      href: "/dashboard/knowledge",
      icon: BookOpen,
      tintBg: "bg-violet-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-violet-600",
    },
    {
      label: "Telemetry & Logs",
      href: "/dashboard/analytics",
      icon: TrendingUp,
      tintBg: "bg-sky-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-sky-600",
    },
    {
      label: "SIP Trunks & PRI",
      href: "/dashboard/phone-numbers",
      icon: PhoneCall,
      tintBg: "bg-fuchsia-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-fuchsia-600",
    },
    {
      label: "Minutes & Quota",
      href: "/dashboard/billing",
      icon: CreditCard,
      tintBg: "bg-emerald-50/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-emerald-600",
    },
    {
      label: "Settings & Keys",
      href: "/dashboard/settings",
      icon: Settings,
      tintBg: "bg-slate-100/70",
      activeTintBg: "bg-white/20",
      iconColor: "text-slate-700",
    },
  ];

  const voiceMembers = [
    {
      name: "Maya (Admissions)",
      role: "Hindi + English • 136ms",
      avatarBg: "bg-gradient-to-br from-[#D9C2FA] to-[#C084FC] text-[#3B0764]",
      initial: "M",
      status: "Idle",
    },
    {
      name: "Priya (Tuition & Aid)",
      role: "Telugu + English • 142ms",
      avatarBg: "bg-gradient-to-br from-[#FFA98B] to-[#FB7185] text-[#7C2D12]",
      initial: "P",
      status: "On Call",
    },
    {
      name: "Arjun (Outreach)",
      role: "Campaign Lead • 148ms",
      avatarBg: "bg-gradient-to-br from-[#A8C3F0] to-[#60A5FA] text-[#1E3A8A]",
      initial: "A",
      status: "Idle",
    },
    {
      name: "Rajesh (Supervisor)",
      role: "Escalation Desk • 120ms",
      avatarBg: "bg-gradient-to-br from-[#FFD9A0] to-[#FBBF24] text-[#78350F]",
      initial: "R",
      status: "Standby",
    },
  ];

  const renderNavSection = (items: NavItem[], sectionTitle: string) => (
    <div className="space-y-1">
      {isCollapsed ? (
        <div className="w-8 h-[1px] bg-black/[0.06] mx-auto my-2" />
      ) : (
        <div className="px-3 pt-2.5 pb-1">
          {/* Section headers: 11-12px, uppercase, letter-spacing 0.1em, 50% opacity */}
          <span className="text-[11px] font-bold uppercase tracking-[0.1em] opacity-50 text-slate-800 select-none block">
            {sectionTitle}
          </span>
        </div>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.exact
          ? pathname === item.href
          : pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href.split("?")[0]));

        return isCollapsed ? (
          <Link
            key={item.href}
            href={item.href}
            onClick={onCloseMobile}
            title={item.label}
            className={`relative w-12 h-12 rounded-2xl flex items-center justify-center mx-auto transition-all group duration-200 ${
              isActive
                ? "bg-[#1E1B4B] text-white shadow-md shadow-indigo-950/20"
                : "hover:bg-slate-100/80"
            }`}
          >
            {/* 36x36 rounded-square badge (radius 12px) with subtle tint */}
            <div
              className={`w-[36px] h-[36px] rounded-[12px] flex items-center justify-center transition-all ${
                isActive ? item.activeTintBg : item.tintBg
              }`}
            >
              <Icon
                className={`w-5 h-5 stroke-[1.5] ${
                  isActive ? "fill-current text-white" : "text-slate-700 opacity-60 group-hover:opacity-100"
                }`}
                {...(item.icon === VoiceLibraryIcon ? { isFilled: isActive } : {})}
              />
            </div>
            {isActive && (
              <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1.5 h-5 rounded-r-full bg-[#6366F1]" />
            )}
          </Link>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={onCloseMobile}
            className={`group relative flex items-center justify-between px-2.5 py-1.5 rounded-2xl transition-all duration-200 ${
              isActive
                ? "bg-[#1E1B4B] text-white shadow-[0_4px_16px_rgba(30,27,75,0.18)]"
                : "hover:bg-slate-100/80"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* 36x36 rounded-square badge (radius 12px) with subtle tint */}
              <div
                className={`w-[36px] h-[36px] rounded-[12px] flex items-center justify-center shrink-0 transition-all ${
                  isActive ? item.activeTintBg : item.tintBg
                }`}
              >
                {/* Same size (20px, w-5 h-5), same stroke width (1.5px, stroke-[1.5]). Active: filled. Inactive: outline 60% opacity */}
                <Icon
                  className={`w-5 h-5 stroke-[1.5] ${
                    isActive
                      ? "fill-current text-white"
                      : "text-slate-700 opacity-60 group-hover:opacity-100 transition-opacity"
                  }`}
                  {...(item.icon === VoiceLibraryIcon ? { isFilled: isActive } : {})}
                />
              </div>

              {/* Nav labels: 14px, weight 500, letter-spacing 0.005em */}
              <span
                className={`text-[14px] font-medium tracking-[0.005em] truncate ${
                  isActive ? "text-white font-semibold" : "text-slate-800"
                }`}
              >
                {item.label}
              </span>
            </div>

            {/* Badges or active pill */}
            <div className="flex items-center gap-1.5 shrink-0">
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border leading-none tracking-tight ${
                    isActive ? "bg-white/20 text-white border-white/20" : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
              {isActive && !item.badge && (
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      {/* Floating White Sidebar Panel with Bricolage Grotesque typography variable applied */}
      <aside
        style={{ fontFamily: "var(--font-bricolage), sans-serif" }}
        className={`fixed top-3 sm:top-4 lg:top-5 z-40 bg-white/95 backdrop-blur-md rounded-[28px] sm:rounded-[32px] border border-black/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between select-none transition-all duration-300 ease-in-out h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)] lg:h-[calc(100vh-2.5rem)] shrink-0 ${
          isOpenMobile
            ? "translate-x-0 left-3 sm:left-4 shadow-2xl w-70 sm:w-74 p-4 sm:p-5"
            : "-translate-x-full lg:translate-x-0 left-0 lg:left-5"
        } ${
          isCollapsed
            ? "lg:w-[82px] lg:p-3"
            : "lg:w-72 lg:p-4"
        }`}
      >
        {/* Brand Header */}
        <div
          className={`flex items-center pb-2.5 border-b border-black/[0.06] shrink-0 ${
            isCollapsed ? "flex-col gap-3 justify-center" : "justify-between"
          }`}
        >
          {isCollapsed ? (
            <>
              {/* Collapsed Brand Icon */}
              <Link
                href="/dashboard"
                className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0F172A] via-[#1E1B4B] to-[#4338CA] text-white flex items-center justify-center shadow-md shadow-indigo-950/20 hover:scale-105 transition-transform group"
                title="Swaram AI Voice Platform"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                <span className="font-bold text-[16px] tracking-[-0.02em]">SW</span>
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
              </Link>

              {/* Expand Button */}
              <button
                onClick={onToggleCollapse}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Expand sidebar (Ctrl+B)"
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="w-5 h-5 stroke-[1.5]" />
              </button>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="flex items-center gap-3 group min-w-0">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0F172A] via-[#1E1B4B] to-[#4338CA] text-white flex items-center justify-center shadow-md shadow-indigo-950/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-950/30 shrink-0">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/25 to-transparent pointer-events-none" />
                  <span className="font-bold text-[15px] tracking-[-0.02em]">SW</span>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    {/* Brand/logo: bold, tight letter-spacing (-0.02em), 20-22px */}
                    <span className="font-bold text-[21px] text-slate-900 tracking-[-0.02em] leading-tight truncate">
                      Swaram
                    </span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/50 leading-none">
                      AI 2.0
                    </span>
                  </div>
                  <span className="text-[12px] font-medium text-slate-400 block -mt-0.5 truncate flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Telephony Cloud
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-1">
                {/* Desktop Collapse Button */}
                <button
                  onClick={onToggleCollapse}
                  className="hidden lg:flex p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Collapse sidebar (Ctrl+B)"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-5 h-5 stroke-[1.5]" />
                </button>

                {/* Mobile Close Button */}
                <button
                  onClick={onCloseMobile}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 lg:hidden cursor-pointer"
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Scrollable Navigation Sections */}
        <div className={`flex-1 overflow-y-auto space-y-3.5 my-2 scrollbar-none ${isCollapsed ? "px-0" : "pr-0.5"}`}>
          {/* Section 1: Operations */}
          {renderNavSection(mainNav, "Voice Operations")}

          {/* Section 2: Campaigns & Outreach */}
          {renderNavSection(campaignNav, "Growth & Pipelines")}

          {/* Section 3: Platform Config */}
          {renderNavSection(platformNav, "Engine & Telephony")}

          {/* Section 4: Active AI Agents */}
          <div className="pt-2 border-t border-black/[0.06] space-y-2">
            {isCollapsed ? (
              <>
                <button
                  onClick={() => {
                    try { soundSynth.play("click"); } catch {}
                    setCreateAgentOpen(true);
                  }}
                  className="w-10 h-10 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center justify-center transition-colors cursor-pointer mx-auto mb-2 border border-indigo-200/50"
                  title="Deploy New Voice Agent"
                >
                  <Plus className="w-5 h-5 stroke-[1.5]" />
                </button>
                <div className="space-y-2.5">
                  {voiceMembers.map((member, i) => (
                    <div
                      key={i}
                      onClick={() => router.push("/dashboard/agents")}
                      className="w-9 h-9 rounded-2xl flex items-center justify-center mx-auto relative cursor-pointer hover:scale-110 transition-transform shadow-xs"
                      title={`${member.name} • ${member.role} [${member.status}]`}
                    >
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-[12px] shadow-sm ${member.avatarBg}`}>
                        {member.initial}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white ${
                        member.status === "On Call" ? "bg-rose-500" : "bg-emerald-500"
                      }`} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between px-3">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] opacity-50 text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    Live Voice Squad
                  </span>
                  <button
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      setCreateAgentOpen(true);
                    }}
                    className="flex items-center gap-1 text-[12px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer px-1.5 py-0.5 rounded-md hover:bg-indigo-50"
                    title="Deploy new voice agent"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[1.5]" />
                    <span>Deploy</span>
                  </button>
                </div>

                <div className="space-y-1">
                  {voiceMembers.map((member, i) => (
                    <div
                      key={i}
                      onClick={() => router.push("/dashboard/agents")}
                      className="flex items-center justify-between gap-2.5 px-2.5 py-1.5 rounded-xl hover:bg-slate-100/80 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="relative shrink-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-[12px] shadow-xs group-hover:scale-105 transition-transform ${member.avatarBg}`}>
                            {member.initial}
                          </div>
                          <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full ring-1.5 ring-white ${
                            member.status === "On Call" ? "bg-rose-500" : "bg-emerald-500"
                          }`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="font-semibold text-[13px] text-slate-800 block truncate leading-tight group-hover:text-slate-950">
                            {member.name}
                          </span>
                          <span className="text-[11px] text-slate-400 block truncate leading-tight mt-0.5 font-medium">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded leading-none shrink-0 ${
                          member.status === "On Call"
                            ? "bg-rose-50 text-rose-600 border border-rose-200/50"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-200/50"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* BOTTOM: Workspace Card & Logout */}
        <div className="pt-3 border-t border-black/[0.06] shrink-0 space-y-2">
          {isCollapsed ? (
            <button
              onClick={handleSignOut}
              className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Sign out of Swaram"
              aria-label="Log out"
            >
              <LogOut className="w-5 h-5 stroke-[1.5]" />
            </button>
          ) : (
            <>
              {/* Workspace Mini Pill */}
              <div className="flex items-center justify-between p-2 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-black/[0.04]">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold text-[12px] flex items-center justify-center shrink-0">
                    {workspaceName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-[13px] text-slate-900 block truncate leading-tight">
                      {workspaceName}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold block truncate leading-none mt-0.5">
                      SIP PRI Verified
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>
            </>
          )}
        </div>
      </aside>

      {/* Modals */}
      <CreateAgentModal
        isOpen={createAgentOpen}
        onClose={() => setCreateAgentOpen(false)}
      />
      <TopUpCreditsModal
        isOpen={topUpOpen}
        onClose={() => setTopUpOpen(false)}
        currentCredits={14}
      />
    </>
  );
}
