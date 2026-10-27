"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Bot,
  Radio,
  Users,
  Calendar,
  FolderKanban,
  MessageSquare,
  BookOpen,
  PhoneCall,
  CreditCard,
  Gauge,
  Settings,
  Plus,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  History,
  PhoneOutgoing,
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

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
  badge?: string;
  badgeColor?: string;
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
  const [workspaceName, setWorkspaceName] = useState("Enterprise Workspace");
  const [voiceSquad, setVoiceSquad] = useState<
    Array<{ name: string; role: string; initial: string; status: string }>
  >([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("swaram_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.name || u.fullName) setUserName(u.name || u.fullName);
        if (u.workspaceName) setWorkspaceName(u.workspaceName);
      }
      const rawAgents = localStorage.getItem("swaram_agents");
      if (rawAgents) {
        const parsed = JSON.parse(rawAgents);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const clean = parsed
            .filter((a: any) => a && a.name && !a.name.includes("Admissions") && !a.name.includes("Tuition"))
            .map((a: any) => ({
              name: a.name,
              role: `${a.primaryLanguage || a.languages?.[0] || "English"} • ${a.latencyMs || 136}ms`,
              initial: (a.name || "A").charAt(0).toUpperCase(),
              status: a.status === "on-call" ? "On Call" : "Idle",
            }));
          setVoiceSquad(clean);
        }
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

  // Structured enterprise hierarchy
  const mainNav: NavItem[] = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutGrid,
      exact: true,
    },
    {
      label: "AI Agents",
      href: "/dashboard/agents",
      icon: Bot,
      badge: voiceSquad.length > 0 ? `${voiceSquad.length} Active` : undefined,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    },
    {
      label: "Live Calling",
      href: "/dashboard/calls",
      icon: Radio,
    },
    {
      label: "Call History & Transcripts",
      href: "/dashboard/call-history",
      icon: History,
    },
    {
      label: "Outbound Scheduler",
      href: "/dashboard/outbound-scheduler",
      icon: PhoneOutgoing,
      badge: "Bulk Dialer",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200/60",
    },
  ];

  const campaignNav: NavItem[] = [
    {
      label: "Contacts",
      href: "/dashboard/contacts",
      icon: Users,
    },
    {
      label: "Callbacks Queue",
      href: "/dashboard/callbacks",
      icon: Calendar,
    },
    {
      label: "Data Vault",
      href: "/dashboard/data-vault",
      icon: FolderKanban,
    },
    {
      label: "WhatsApp",
      href: "/dashboard/whatsapp",
      icon: MessageSquare,
    },
  ];

  const platformNav: NavItem[] = [
    {
      label: "Knowledge Base",
      href: "/dashboard/knowledge",
      icon: BookOpen,
    },
    {
      label: "Phone Numbers",
      href: "/dashboard/phone-numbers",
      icon: PhoneCall,
    },
    {
      label: "Usage & Controls",
      href: "/dashboard/billing",
      icon: Gauge,
    },
    {
      label: "Settings & Keys",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const renderNavSection = (items: NavItem[], sectionTitle: string) => (
    <div className="space-y-0.5">
      {isCollapsed ? (
        <div className="w-6 h-[1px] bg-slate-200 mx-auto my-2.5" />
      ) : (
        <div className="px-3 pt-3 pb-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-700 select-none block">
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
            className={`relative w-10 h-10 rounded-lg flex items-center justify-center mx-auto transition-colors group ${
              isActive
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {isActive && (
              <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-1 h-4 rounded-r-full bg-slate-900" />
            )}
          </Link>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={onCloseMobile}
            className={`group relative flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              isActive
                ? "bg-slate-900 text-white font-semibold shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/90"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
                }`}
              />
              <span className="truncate">{item.label}</span>
            </div>

            {/* Badges or subtle active indicator */}
            <div className="flex items-center gap-1.5 shrink-0">
              {item.badge && (
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-md border leading-none tracking-tight ${
                    isActive
                      ? "bg-white/15 text-white border-white/20"
                      : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
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
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-xs lg:hidden animate-in fade-in duration-150"
          onClick={onCloseMobile}
        />
      )}

      {/* Professional enterprise docked sidebar */}
      <aside
        className={`fixed top-3 sm:top-4 lg:top-5 z-40 bg-white rounded-2xl border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col justify-between select-none transition-all duration-200 ease-in-out h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2rem)] lg:h-[calc(100vh-2.5rem)] shrink-0 ${
          isOpenMobile
            ? "translate-x-0 left-3 sm:left-4 shadow-xl w-64 p-3.5"
            : "-translate-x-full lg:translate-x-0 left-0 lg:left-5"
        } ${
          isCollapsed
            ? "lg:w-[72px] lg:p-2.5"
            : "lg:w-64 lg:p-3.5"
        }`}
      >
        {/* Brand Header */}
        <div
          className={`flex items-center pb-3 border-b border-slate-100 shrink-0 ${
            isCollapsed ? "flex-col gap-2.5 justify-center" : "justify-between px-1"
          }`}
        >
          {isCollapsed ? (
            <>
              {/* Collapsed Brand Icon */}
              <Link
                href="/dashboard"
                className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs hover:bg-slate-800 transition-colors"
                title="Swaram AI Voice Platform"
              >
                SW
              </Link>

              {/* Expand Button */}
              <button
                onClick={onToggleCollapse}
                className="w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Expand sidebar (Ctrl+B)"
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="flex items-center gap-2.5 group min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 tracking-tight">
                  SW
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm text-slate-900 tracking-tight leading-tight">
                      Swaram AI
                    </span>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 leading-none">
                      v2.0
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-600 block leading-none mt-1">
                    Telephony Operations
                  </span>
                </div>
              </Link>

              <div className="flex items-center">
                {/* Desktop Collapse Button */}
                <button
                  onClick={onToggleCollapse}
                  className="hidden lg:flex p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Collapse sidebar (Ctrl+B)"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>

                {/* Mobile Close Button */}
                <button
                  onClick={onCloseMobile}
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden cursor-pointer"
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Scrollable Navigation Sections */}
        <div className={`flex-1 overflow-y-auto space-y-3.5 my-2 scrollbar-none ${isCollapsed ? "px-0" : "px-0.5"}`}>
          {/* Section 1: Operations */}
          {renderNavSection(mainNav, "Operations")}

          {/* Section 2: Campaigns & Outreach */}
          {renderNavSection(campaignNav, "Campaigns & Lists")}

          {/* Section 3: Platform Config */}
          {renderNavSection(platformNav, "Platform & Infrastructure")}

          {/* Section 4: Active AI Agents */}
          <div className="pt-2 border-t border-slate-100 space-y-1.5">
            {isCollapsed ? (
              <>
                <button
                  onClick={() => {
                    try { soundSynth.play("click"); } catch {}
                    setCreateAgentOpen(true);
                  }}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer mx-auto mb-2 border border-slate-200"
                  title="Deploy New Voice Agent"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                {voiceSquad.length > 0 && (
                  <div className="space-y-1.5">
                    {voiceSquad.map((member, i) => (
                      <div
                        key={i}
                        onClick={() => router.push("/dashboard/agents")}
                        className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto relative cursor-pointer bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors text-[11px] font-semibold text-slate-700"
                        title={`${member.name} • ${member.role} [${member.status}]`}
                      >
                        {member.initial}
                        <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ring-2 ring-white ${
                          member.status === "On Call" ? "bg-rose-500" : "bg-emerald-500"
                        }`} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center justify-between px-3 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    Live Voice Squad
                  </span>
                  <button
                    onClick={() => {
                      try { soundSynth.play("click"); } catch {}
                      setCreateAgentOpen(true);
                    }}
                    className="flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer px-1 py-0.5 rounded hover:bg-slate-100"
                    title="Deploy new voice agent"
                  >
                    <Plus className="w-3 h-3" />
                    <span>New</span>
                  </button>
                </div>

                {voiceSquad.length === 0 ? (
                  <div className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 text-center my-1">
                    <p className="text-[11.5px] font-semibold text-slate-700">No active agents</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                      Deploy voice agents to handle live telephony queues
                    </p>
                    <button
                      onClick={() => {
                        try { soundSynth.play("click"); } catch {}
                        setCreateAgentOpen(true);
                      }}
                      className="mt-2 w-full py-1 text-[11px] font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      + Deploy Agent
                    </button>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {voiceSquad.map((member, i) => (
                      <div
                        key={i}
                        onClick={() => router.push("/dashboard/agents")}
                        className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100/90 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center font-semibold text-[11px] text-slate-700 shrink-0">
                            {member.initial}
                          </div>
                          <div className="min-w-0">
                            <span className="font-medium text-[12px] text-slate-700 block truncate group-hover:text-slate-900 leading-tight">
                              {member.name}
                            </span>
                            <span className="text-[10.5px] text-slate-600 block truncate leading-none mt-0.5">
                              {member.role}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[9.5px] font-medium px-1.5 py-0.5 rounded leading-none shrink-0 ${
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
                )}
              </>
            )}
          </div>
        </div>

        {/* BOTTOM: Workspace Account & Logout */}
        <div className="pt-2.5 border-t border-slate-100 shrink-0">
          {isCollapsed ? (
            <button
              onClick={handleSignOut}
              className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Sign out of Swaram"
              aria-label="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-200/60">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-md bg-slate-900 text-white font-semibold text-[11px] flex items-center justify-center shrink-0">
                  {workspaceName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-xs text-slate-800 block truncate leading-tight">
                    {workspaceName}
                  </span>
                  <span className="text-[10.5px] text-slate-600 font-medium block truncate leading-none mt-0.5">
                    {userName}
                  </span>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="p-1.5 rounded-md text-slate-400 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
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
