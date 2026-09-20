"use client";

import React from "react";
import {
  LayoutDashboard,
  Bot,
  PhoneCall,
  Send,
  Users,
  BookOpen,
  BarChart3,
  FileSpreadsheet,
  Radio,
  UserCog,
  Settings,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";
import { OrganizationInfo } from "@/types/dashboard";

export type TabKey =
  | "overview"
  | "agents"
  | "calls"
  | "campaigns"
  | "contacts"
  | "knowledge"
  | "analytics"
  | "reports"
  | "telephony"
  | "team"
  | "settings";

interface DashboardSidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  currentOrg: OrganizationInfo;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function DashboardSidebar({
  activeTab,
  onSelectTab,
  currentOrg,
  isOpenMobile,
  onCloseMobile,
}: DashboardSidebarProps) {
  const sections = [
    {
      title: "WORKSPACE",
      items: [
        { key: "overview" as TabKey, label: "Overview", icon: LayoutDashboard },
        { key: "agents" as TabKey, label: "AI Agents", icon: Bot, badge: "3" },
        { key: "calls" as TabKey, label: "Calls", icon: PhoneCall, live: true },
        { key: "campaigns" as TabKey, label: "Campaigns", icon: Send, badge: "Active" },
        { key: "contacts" as TabKey, label: "Students & Contacts", icon: Users },
      ],
    },
    {
      title: "INTELLIGENCE",
      items: [
        { key: "knowledge" as TabKey, label: "Knowledge Base", icon: BookOpen, badge: "24 Docs" },
        { key: "analytics" as TabKey, label: "Analytics", icon: BarChart3 },
        { key: "reports" as TabKey, label: "Reports", icon: FileSpreadsheet },
      ],
    },
    {
      title: "ORGANIZATION",
      items: [
        { key: "telephony" as TabKey, label: "Telephony", icon: Radio, badge: "3 Lines" },
        { key: "team" as TabKey, label: "Team", icon: UserCog },
        { key: "settings" as TabKey, label: "Settings", icon: Settings },
      ],
    },
  ];

  const handleTabClick = (tab: TabKey) => {
    onSelectTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside
      className={`fixed lg:sticky top-0 lg:top-[61px] left-0 z-50 lg:z-30 h-screen lg:h-[calc(100vh-61px)] w-64 bg-white/80 backdrop-blur-2xl border-r border-black/10 p-4 flex flex-col justify-between font-sans select-none transition-transform duration-300 ${
        isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Top Nav Items */}
      <div className="space-y-6 overflow-y-auto pr-1">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 px-3 mb-2">
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
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-neutral-900 text-white font-semibold shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80 font-medium"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 ${isActive ? "text-white" : "text-neutral-500"}`}
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
                              : "bg-neutral-100 text-neutral-600 border border-black/5"
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
      <div className="pt-3 border-t border-black/10">
        <div className="p-4 rounded-2xl bg-neutral-900 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between gap-1.5 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3" />
              Verified Org
            </span>
          </div>

          <div className="font-semibold text-white text-xs truncate mt-1">
            {currentOrg.name}
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-300 mt-2">
            <span>Plan: <strong className="text-white font-semibold">{currentOrg.plan}</strong></span>
            <span className="font-mono text-blue-300 font-semibold">{currentOrg.usagePercent}%</span>
          </div>

          {/* Usage Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden mt-2">
            <div
              style={{ width: `${currentOrg.usagePercent}%` }}
              className="h-full bg-blue-500 rounded-full"
            />
          </div>

          <div className="text-[10px] text-neutral-400 mt-2 flex justify-between items-center font-mono">
            <span>{currentOrg.usedMinutes.toLocaleString()} / {currentOrg.totalMinutes.toLocaleString()} min</span>
            <span className="text-emerald-400 flex items-center gap-0.5">
              <Zap className="w-3 h-3" /> High QoS
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
