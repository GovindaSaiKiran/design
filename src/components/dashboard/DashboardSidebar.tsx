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
      className={`fixed lg:sticky top-0 lg:top-[61px] left-0 z-50 lg:z-30 h-screen lg:h-[calc(100vh-61px)] w-64 bg-[#fcfcf9] border-r-3 border-black p-4 flex flex-col justify-between font-space select-none transition-transform duration-300 ${
        isOpenMobile ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      {/* Top Nav Items */}
      <div className="space-y-6 overflow-y-auto pr-1">
        {sections.map((section) => (
          <div key={section.title}>
            <div className="text-[11px] font-black uppercase tracking-wider text-black/60 px-3 mb-2">
              {section.title}
            </div>

            <div className="space-y-1.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;

                return (
                  <button
                    key={item.key}
                    onClick={() => handleTabClick(item.key)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all duration-150 border-2 cursor-pointer ${
                      isActive
                        ? "bg-[#d6ff38] text-black border-black shadow-[3px_3px_0px_#000000] font-black -translate-y-0.5"
                        : "text-black font-bold border-transparent hover:border-black hover:bg-[#ffe600] hover:shadow-[2px_2px_0px_#000000] hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={`w-4 h-4 stroke-[2.5] ${isActive ? "text-black" : "text-black"}`}
                      />
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.live && (
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d6ff38] opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black" />
                        </span>
                      )}

                      {item.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${
                            isActive
                              ? "bg-black text-[#d6ff38] border-black shadow-[1px_1px_0px_#ffffff]"
                              : "bg-white text-black border-black shadow-[1px_1px_0px_#000000]"
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

      {/* Bottom Verified Organization Status Card */}
      <div className="pt-3 border-t-2 border-black">
        <div className="p-3.5 rounded-2xl bg-black text-white border-2 border-black shadow-[4px_4px_0px_#d6ff38] relative overflow-hidden">
          <div className="flex items-center justify-between gap-1.5 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-black bg-[#d6ff38] border border-black px-2 py-0.5 rounded-md shadow-[1px_1px_0px_#ffffff]">
              <ShieldCheck className="w-3 h-3 stroke-[3]" />
              Verified Org
            </span>
          </div>

          <div className="font-black text-white text-xs truncate mt-1">
            {currentOrg.name}
          </div>

          <div className="flex items-center justify-between text-[11px] text-white/90 mt-2 font-bold">
            <span>Plan: <strong className="text-[#d6ff38] font-black">{currentOrg.plan}</strong></span>
            <span className="font-mono text-[#00f0ff] font-black">{currentOrg.usagePercent}%</span>
          </div>

          {/* Usage Progress Bar */}
          <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden mt-1.5 border border-black">
            <div
              style={{ width: `${currentOrg.usagePercent}%` }}
              className="h-full bg-[#d6ff38] rounded-full"
            />
          </div>

          <div className="text-[10px] text-white/80 mt-2 flex justify-between items-center font-bold">
            <span>{currentOrg.usedMinutes.toLocaleString()} / {currentOrg.totalMinutes.toLocaleString()} min</span>
            <span className="text-[#00f0ff] font-black flex items-center gap-0.5">
              <Zap className="w-3 h-3 stroke-[3]" /> High QoS
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
