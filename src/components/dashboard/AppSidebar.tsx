"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  UserPlus,
  GraduationCap,
  Sparkles,
  Phone,
  CreditCard,
  UserCog,
  History,
  PanelLeftClose,
  Radio,
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import TopUpCreditsModal from "./modals/TopUpCreditsModal";
import TestCallModal from "./modals/TestCallModal";
import CreateAgentModal from "./modals/CreateAgentModal";

interface AppSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function AppSidebar({
  isOpenMobile = false,
  onCloseMobile,
}: AppSidebarProps) {
  const pathname = usePathname();
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [testCallOpen, setTestCallOpen] = useState(false);
  const [createEmployeeOpen, setCreateEmployeeOpen] = useState(false);
  const [userName, setUserName] = useState("Govinda T.");
  const [userEmail, setUserEmail] = useState("clinic@swaram.ai");
  const [workspaceName, setWorkspaceName] = useState("Swaram Voice HQ");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("swaram_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.name || u.fullName) setUserName(u.name || u.fullName);
        if (u.email) setUserEmail(u.email);
        if (u.workspaceName) setWorkspaceName(u.workspaceName);
      }
    } catch {
      // Keep defaults
    }
  }, []);

  const coreNavItems = [
    {
      label: "Operations Deck",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Call Logs & Audio",
      href: "/dashboard/calls",
      icon: History,
      badge: "Live",
    },
    {
      label: "Realtime Analytics",
      href: "/dashboard/analytics",
      icon: Radio,
    },
  ];

  const agentStudioItems = [
    {
      label: "AI Voice Agents",
      href: "/dashboard/agents",
      icon: Bot,
      badge: "3",
    },
    {
      label: "Knowledge Base (RAG)",
      href: "/dashboard/knowledge",
      icon: GraduationCap,
    },
    {
      label: "Autonomous Calling",
      href: "/dashboard/delegate",
      icon: Sparkles,
    },
  ];

  const telecomItems = [
    {
      label: "Phone Numbers & SIP",
      href: "/dashboard/phone-numbers",
      icon: Phone,
    },
    {
      label: "Voice Minutes & Billing",
      href: "/dashboard/billing",
      icon: CreditCard,
      badge: "14 min",
      badgeColor: "lime",
    },
    {
      label: "Workspace Settings",
      href: "/dashboard/settings",
      icon: UserCog,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
          onClick={onCloseMobile}
        />
      )}

      {/* Persistent Enterprise Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#09090B] border-r border-[#27272A] flex flex-col justify-between transition-transform duration-200 ease-in-out font-sans select-none text-[13px] lg:translate-x-0 lg:static shrink-0 ${
          isOpenMobile ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Top Header: Brand & Carrier Status */}
        <div className="h-14 px-3.5 flex items-center justify-between border-b border-[#27272A] shrink-0 bg-[#121215]">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[2px] bg-white text-black flex items-center justify-center font-telemetry font-bold text-xs border border-white shadow-2xs">
              <span className="font-black">SW</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-sm text-white tracking-tight">
                  SWARAM TELECOM
                </span>
                <span className="w-1.5 h-1.5 rounded-[1px] bg-white animate-pulse" title="Carrier Online" />
              </div>
              <span className="text-[10px] font-telemetry font-semibold text-[#A1A1AA] block -mt-0.5 tracking-wider uppercase">
                RACK ID: TRK-01 / IN-HYD
              </span>
            </div>
          </Link>

          <button
            onClick={onCloseMobile}
            className="p-1 rounded-[2px] text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition-colors lg:hidden"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Action Inverted Brick Button */}
        <div className="px-3 pt-3 pb-1">
          <button
            onClick={() => setCreateEmployeeOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-[2px] bg-white hover:bg-zinc-200 text-black text-xs font-display font-bold transition-all border border-white cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
          >
            <span className="font-mono text-sm leading-none font-bold">
              +
            </span>
            <span>Provision Voice Agent</span>
          </button>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-3.5">
          {/* Section 1: Core Operations */}
          <div>
            <div className="px-2.5 py-1 text-[10px] font-telemetry font-bold text-[#71717A] uppercase tracking-widest">
              Core Operations
            </div>
            <div className="space-y-0.5 mt-0.5">
              {coreNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-[2px] transition-all font-medium text-xs group ${
                      isActive
                        ? "bg-[#18181B] text-white font-bold border-l-2 border-white border-y border-r border-[#27272A]"
                        : "text-[#A1A1AA] hover:text-white hover:bg-[#121215]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isActive ? "text-white" : "text-[#71717A] group-hover:text-white"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-telemetry font-bold px-1.5 py-0.2 rounded-[1px] ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-[#18181B] text-white border border-[#27272A]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 2: Agent Studio */}
          <div>
            <div className="px-2.5 py-1 text-[10px] font-telemetry font-bold text-[#71717A] uppercase tracking-widest">
              AI Voice Agents
            </div>
            <div className="space-y-0.5 mt-0.5">
              {agentStudioItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-[2px] transition-all font-medium text-xs group ${
                      isActive
                        ? "bg-[#18181B] text-white font-bold border-l-2 border-white border-y border-r border-[#27272A]"
                        : "text-[#A1A1AA] hover:text-white hover:bg-[#121215]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isActive ? "text-white" : "text-[#71717A] group-hover:text-white"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-telemetry font-bold px-1.5 py-0.2 rounded-[1px] ${
                          isActive
                            ? "bg-white text-black"
                            : "bg-[#18181B] text-white border border-[#27272A]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 3: Telephony & Settings */}
          <div>
            <div className="px-2.5 py-1 text-[10px] font-telemetry font-bold text-[#71717A] uppercase tracking-widest">
              Telephony &amp; Infrastructure
            </div>
            <div className="space-y-0.5 mt-0.5">
              {telecomItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-[2px] transition-all font-medium text-xs group ${
                      isActive
                        ? "bg-[#18181B] text-white font-bold border-l-2 border-white border-y border-r border-[#27272A]"
                        : "text-[#A1A1AA] hover:text-white hover:bg-[#121215]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                          isActive ? "text-white" : "text-[#71717A] group-hover:text-white"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-telemetry font-bold px-1.5 py-0.2 rounded-[1px] border border-[#27272A] ${
                          isActive
                            ? "bg-white text-black border-white"
                            : "bg-[#18181B] text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Workspace Dock */}
        <div className="p-2.5 border-t border-[#27272A] shrink-0 space-y-2 bg-[#121215]">
          {/* Minutes Balance Telemetry Gauge */}
          <div className="p-2 rounded-[2px] bg-[#09090B] border border-[#27272A] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-display font-bold text-white truncate max-w-[120px]">
                {workspaceName}
              </span>
              <span className="px-1.5 py-0.2 rounded-[1px] bg-[#18181B] text-white text-[10px] font-telemetry font-bold border border-[#27272A]">
                14.0 MIN
              </span>
            </div>
            <div className="w-full bg-[#18181B] h-1.5 rounded-[1px] overflow-hidden">
              <div className="bg-white h-full w-[14%]" />
            </div>
            <button
              onClick={() => setTopUpOpen(true)}
              className="w-full py-1 text-center text-[10.5px] font-display font-bold text-white hover:bg-[#18181B] rounded-[2px] transition-colors cursor-pointer border border-[#27272A] hover:border-white flex items-center justify-center gap-1 active:translate-x-[1px] active:translate-y-[1px]"
            >
              <Zap className="w-3 h-3 text-white" />
              <span>Add Telephony Minutes</span>
            </button>
          </div>

          {/* User Profile Mini Bar */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-[2px] bg-white text-black font-telemetry font-bold text-[11px] flex items-center justify-center shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <span className="font-bold text-white text-xs block truncate leading-tight font-display">
                  {userName}
                </span>
                <span className="text-[10px] text-[#A1A1AA] block truncate leading-tight font-telemetry">
                  {userEmail}
                </span>
              </div>
            </div>

            <button
              onClick={() => setTestCallOpen(true)}
              className="p-1 rounded-[2px] text-[#A1A1AA] hover:text-white hover:bg-[#18181B] transition-colors border border-transparent hover:border-[#27272A]"
              title="Test Voice Agent"
            >
              <Zap className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </aside>

      {/* Modals */}
      <TopUpCreditsModal
        isOpen={topUpOpen}
        onClose={() => setTopUpOpen(false)}
      />
      <TestCallModal
        isOpen={testCallOpen}
        onClose={() => setTestCallOpen(false)}
      />
      <CreateAgentModal
        isOpen={createEmployeeOpen}
        onClose={() => setCreateEmployeeOpen(false)}
      />
    </>
  );
}
