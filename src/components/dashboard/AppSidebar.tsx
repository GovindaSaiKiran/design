"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  Activity,
  MessageSquare,
  Settings,
  FolderKanban,
  Calendar,
  Sparkles,
  Megaphone,
  Plus,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Phone,
  CreditCard,
  History,
  GraduationCap,
  Users,
  Volume2,
} from "lucide-react";
import CreateAgentModal from "./modals/CreateAgentModal";
import TopUpCreditsModal from "./modals/TopUpCreditsModal";
import { soundSynth } from "@/lib/audio-synth";

interface AppSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
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

  const mainNav = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard, exact: true },
    { label: "AI Agents", href: "/dashboard/agents", icon: Bot },
    { label: "Voice Library", href: "/dashboard/agents?tab=voices", icon: Volume2 },
    { label: "Agent Playground", href: "/dashboard/delegate", icon: Sparkles },
    { label: "Conversations", href: "/dashboard/calls", icon: Activity },
  ];

  const campaignNav = [
    { label: "Contacts & Lists", href: "/dashboard/contacts", icon: Users },
    { label: "Campaigns & Bulk Calling", href: "/dashboard/campaigns", icon: Megaphone },
    { label: "Callbacks & Follow-ups", href: "/dashboard/callbacks", icon: Calendar },
    { label: "Data Vault", href: "/dashboard/data-vault", icon: FolderKanban },
    { label: "WhatsApp Automation", href: "/dashboard/instant-leads", icon: MessageSquare },
  ];

  const platformNav = [
    { label: "Knowledge & Integrations", href: "/dashboard/knowledge", icon: GraduationCap },
    { label: "Analytics & Reports", href: "/dashboard/analytics", icon: History },
    { label: "Telephony & SIP Trunks", href: "/dashboard/phone-numbers", icon: Phone },
    { label: "Minutes & Billing", href: "/dashboard/billing", icon: CreditCard },
    { label: "Workspace Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const voiceMembers = [
    {
      name: "Maya (Admissions)",
      role: "Hindi + English • 136ms",
      avatarBg: "bg-[#D9C2FA] text-[#4C1D95]",
      initial: "M",
    },
    {
      name: "Priya (Tuition & Aid)",
      role: "Telugu + English • 142ms",
      avatarBg: "bg-[#FFA98B] text-[#7C2D12]",
      initial: "P",
    },
    {
      name: "Arjun (Outreach)",
      role: "Campaign Lead • 148ms",
      avatarBg: "bg-[#A8C3F0] text-[#1E3A8A]",
      initial: "A",
    },
    {
      name: "Rajesh (Supervisor)",
      role: "Escalation Desk • 120ms",
      avatarBg: "bg-[#FFD9A0] text-[#78350F]",
      initial: "R",
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      {/* Floating White Sidebar Panel (Fixed to viewport so it remains 100% still when page scrolls) */}
      <aside
        className={`fixed top-3 sm:top-4 lg:top-5 z-40 bg-white rounded-[28px] sm:rounded-[32px] border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.035)] flex flex-col justify-between select-none font-sans text-xs transition-all duration-300 ease-in-out h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)] lg:h-[calc(100vh-2.5rem)] shrink-0 ${
          isOpenMobile
            ? "translate-x-0 left-3 sm:left-4 shadow-2xl w-64 sm:w-70 p-5"
            : "-translate-x-full lg:translate-x-0 left-0 lg:left-5"
        } ${
          isCollapsed
            ? "lg:w-[76px] lg:p-3"
            : "lg:w-70 lg:p-5"
        }`}
      >
        {/* Brand & Collapse / Mobile Close */}
        <div
          className={`flex items-center pb-2 shrink-0 ${
            isCollapsed ? "flex-col gap-2 justify-center" : "justify-between"
          }`}
        >
          {isCollapsed ? (
            <>
              {/* Collapsed Brand Icon */}
              <Link
                href="/dashboard"
                className="w-10 h-10 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-bold text-xs shadow-xs hover:scale-105 transition-transform"
                title="Swaram AI Voice Platform"
              >
                <span className="font-extrabold text-[13px] tracking-tight">SW</span>
              </Link>

              {/* Expand Button */}
              <button
                onClick={onToggleCollapse}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-black/50 hover:text-black hover:bg-[#FAF3E4] transition-colors cursor-pointer"
                title="Expand sidebar (Ctrl+B)"
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="flex items-center gap-2.5 group min-w-0">
                <div className="w-9 h-9 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-bold text-xs shadow-xs transition-transform group-hover:scale-105 shrink-0">
                  <span className="font-extrabold text-[13px] tracking-tight">SW</span>
                </div>
                <div className="min-w-0 truncate">
                  <span className="font-bold text-[18px] text-[#1A1A1A] tracking-tight block leading-tight truncate">
                    Swaram
                  </span>
                  <span className="text-[11px] font-medium text-black/40 block -mt-0.5 truncate">
                    AI Voice Platform
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-1">
                {/* Desktop Collapse Button */}
                <button
                  onClick={onToggleCollapse}
                  className="hidden lg:flex p-1.5 rounded-xl text-black/45 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                  title="Collapse sidebar (Ctrl+B)"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>

                {/* Mobile Close Button */}
                <button
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-xl text-black/50 hover:text-black hover:bg-black/5 lg:hidden cursor-pointer"
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Scrollable Navigation Sections */}
        <div className={`flex-1 overflow-y-auto space-y-4 my-2 scrollbar-none ${isCollapsed ? "px-0" : "pr-1"}`}>
          {/* Group 1: Core Operations */}
          <div className="space-y-1">
            {isCollapsed ? (
              <div className="w-6 h-[1px] bg-black/[0.08] mx-auto my-2" />
            ) : (
              <div className="px-3 pt-1 text-[11px] font-bold text-black/35 uppercase tracking-wider">
                Operations
              </div>
            )}
            {mainNav.map((item) => {
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
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center mx-auto transition-all ${
                    isActive
                      ? "bg-[#F7EEDA] text-[#1A1A1A] font-semibold shadow-2xs"
                      : "text-black/60 hover:text-[#1A1A1A] hover:bg-black/[0.04]"
                  }`}
                >
                  <Icon className={`w-4 h-4 stroke-[1.8] ${isActive ? "text-[#1A1A1A]" : "text-black/50"}`} />
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2 rounded-2xl text-[13px] font-medium transition-all ${
                    isActive
                      ? "bg-[#F7EEDA] text-[#1A1A1A] font-semibold shadow-2xs"
                      : "text-black/60 hover:text-[#1A1A1A] hover:bg-black/[0.03]"
                  }`}
                >
                  <Icon className={`w-4 h-4 stroke-[1.8] ${isActive ? "text-[#1A1A1A]" : "text-black/50"}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Group 2: Campaigns & Outreach */}
          <div className="space-y-1 pt-1">
            {isCollapsed ? (
              <div className="w-6 h-[1px] bg-black/[0.08] mx-auto my-2" />
            ) : (
              <div className="px-3 text-[11px] font-bold text-black/35 uppercase tracking-wider">
                Campaigns &amp; Outreach
              </div>
            )}
            {campaignNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));

              return isCollapsed ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={item.label}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center mx-auto transition-all ${
                    isActive
                      ? "bg-[#F7EEDA] text-[#1A1A1A] font-semibold shadow-2xs"
                      : "text-black/60 hover:text-black hover:bg-black/[0.03]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#1A1A1A]" : "text-black/45"}`} />
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[12.5px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#F7EEDA] text-[#1A1A1A] font-semibold shadow-2xs"
                      : "text-black/60 hover:text-black hover:bg-black/[0.03]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-black/45" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Group 3: Infrastructure & Settings */}
          <div className="space-y-1 pt-1">
            {isCollapsed ? (
              <div className="w-6 h-[1px] bg-black/[0.08] mx-auto my-2" />
            ) : (
              <div className="px-3 text-[11px] font-bold text-black/35 uppercase tracking-wider">
                Platform &amp; Config
              </div>
            )}
            {platformNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));

              return isCollapsed ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  title={item.label}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center mx-auto transition-all ${
                    isActive
                      ? "bg-[#F7EEDA] text-[#1A1A1A] font-semibold shadow-2xs"
                      : "text-black/60 hover:text-black hover:bg-black/[0.03]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#1A1A1A]" : "text-black/45"}`} />
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[12.5px] font-medium transition-colors ${
                    isActive
                      ? "bg-[#F7EEDA] text-[#1A1A1A] font-semibold shadow-2xs"
                      : "text-black/60 hover:text-black hover:bg-black/[0.03]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-black/45" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Group 4: Active Voice Agents with Online Indicators */}
          <div className="space-y-1.5 pt-2 border-t border-black/[0.05]">
            {isCollapsed ? (
              <>
                <button
                  onClick={() => {
                    try { soundSynth.play("click"); } catch {}
                    setCreateAgentOpen(true);
                  }}
                  className="w-8 h-8 rounded-xl bg-black/[0.03] hover:bg-black/5 flex items-center justify-center text-black/50 hover:text-black transition-colors cursor-pointer mx-auto mb-2"
                  title="Create AI Voice Agent"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <div className="space-y-2">
                  {voiceMembers.map((member, i) => (
                    <div
                      key={i}
                      onClick={() => router.push("/dashboard/agents")}
                      className="w-8 h-8 rounded-full flex items-center justify-center mx-auto relative cursor-pointer hover:scale-105 transition-transform"
                      title={`${member.name} • ${member.role}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${member.avatarBg}`}>
                        {member.initial}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#16856B] ring-2 ring-white" />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between px-3 text-[11px] font-bold text-black/35 uppercase tracking-wider">
                  <span>Active AI Agents</span>
                  <button
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      setCreateAgentOpen(true);
                    }}
                    className="w-5 h-5 rounded-md hover:bg-black/5 flex items-center justify-center text-black/50 hover:text-black transition-colors cursor-pointer"
                    title="Create voice agent"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {voiceMembers.map((member, i) => (
                    <div
                      key={i}
                      onClick={() => router.push("/dashboard/agents")}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-black/[0.03] transition-colors cursor-pointer group"
                    >
                      <div className="relative shrink-0">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] ${member.avatarBg}`}>
                          {member.initial}
                        </div>
                        {/* Small green online dot */}
                        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#16856B] ring-2 ring-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="font-semibold text-[12px] text-[#1A1A1A] block truncate leading-tight group-hover:text-black">
                          {member.name}
                        </span>
                        <span className="text-[10px] text-black/45 block truncate leading-tight mt-0.5">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* BOTTOM: Pinned Logout Link */}
        <div className="pt-3 border-t border-black/[0.06] shrink-0">
          {isCollapsed ? (
            <button
              onClick={handleSignOut}
              className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto text-black/60 hover:text-rose-600 hover:bg-rose-50/50 transition-colors cursor-pointer"
              title="Log out"
              aria-label="Log out"
            >
              <LogOut className="w-4 h-4 text-black/50 hover:text-rose-600" />
            </button>
          ) : (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-black/60 hover:text-rose-600 transition-colors text-[13px] font-medium cursor-pointer rounded-xl hover:bg-rose-50/50"
            >
              <LogOut className="w-4 h-4 text-black/50 group-hover:text-rose-600" />
              <span>Log out</span>
            </button>
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
