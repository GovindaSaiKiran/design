"use client";

import React from "react";
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
  ShieldCheck,
  Zap,
} from "lucide-react";
import { OrganizationInfo } from "@/types/dashboard";

export type TabKey =
  | "overview"
  | "agents"
  | "create-agent"
  | "knowledge"
  | "delegate"
  | "telephony"
  | "billing"
  | "settings"
  | "calls"
  | "campaigns"
  | "contacts"
  | "analytics"
  | "reports"
  | "team";

interface DashboardSidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  currentOrg: OrganizationInfo;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

interface SidebarItem {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  live?: boolean;
}

export default function DashboardSidebar({
  activeTab,
  onSelectTab,
  currentOrg,
  isOpenMobile,
  onCloseMobile,
}: DashboardSidebarProps) {
  const sections: { title: string; items: SidebarItem[] }[] = [
    {
      title: "FEATURES & CONTROLS",
      items: [
        { key: "overview" as TabKey, label: "Dash boards", icon: LayoutDashboard },
        { key: "agents" as TabKey, label: "My agents", icon: Bot },
        { key: "create-agent" as TabKey, label: "Create a new agent", icon: UserPlus },
        { key: "knowledge" as TabKey, label: "Train My Agent", icon: GraduationCap },
        { key: "delegate" as TabKey, label: "Use agents", icon: Sparkles },
        { key: "telephony" as TabKey, label: "Phone numbers", icon: Phone },
        { key: "billing" as TabKey, label: "Credits", icon: CreditCard, badge: "14 min" },
        { key: "settings" as TabKey, label: "Account", icon: UserCog },
        { key: "calls" as TabKey, label: "History", icon: History },
      ],
    },
  ];

  const handleTabClick = (tab: TabKey) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`fixed lg:sticky top-0 lg:top-[61px] left-0 z-50 lg:z-30 h-screen lg:h-[calc(100vh-61px)] w-64 bg-[#FBF7ED] border-r border-black/[0.06] p-4 flex flex-col justify-between font-sans select-none transition-transform duration-300 ${
        isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Top Nav Items */}
      <div className="space-y-6 overflow-y-auto pr-1">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-black/40 px-3 mb-2">
              {section.title}
            </div>

            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => handleTabClick(item.key)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#111111] text-white font-semibold shadow-xs"
                        : "text-black/70 hover:text-black hover:bg-black/[0.04] font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 ${isActive ? "text-white" : "text-black/50"}`}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.live && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                      )}

                      {item.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-[#FFD9A0] text-[#7A4B00]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Organization Card */}
      <div className="pt-3 border-t border-black/[0.06]">
        <div className="p-4 rounded-[20px] bg-white border border-black/[0.06] shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between gap-1.5 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#16856B] bg-[#C1F2D5] px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              Verified Org
            </span>
          </div>

          <div className="font-semibold text-[#1A1A1A] text-xs truncate mt-1">
            {currentOrg.name}
          </div>

          <div className="flex items-center justify-between text-[11px] text-black/60 mt-2">
            <span>Plan: <strong className="text-[#1A1A1A] font-semibold">{currentOrg.plan}</strong></span>
            <span className="font-mono text-[#4A72B2] font-semibold">{currentOrg.usagePercent}%</span>
          </div>

          {/* Usage Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-black/[0.06] overflow-hidden mt-2">
            <div
              style={{ width: `${currentOrg.usagePercent}%` }}
              className="h-full bg-[#111111] rounded-full"
            />
          </div>

          <div className="text-[10px] text-black/50 mt-2 flex justify-between items-center font-mono">
            <span>{currentOrg.usedMinutes.toLocaleString()} / {currentOrg.totalMinutes.toLocaleString()} min</span>
            <span className="text-[#16856B] flex items-center gap-0.5">
              <Zap className="w-3 h-3" /> High QoS
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
