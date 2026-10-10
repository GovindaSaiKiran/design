"use client";

import React, { useState } from "react";
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

  const navItems = [
    {
      label: "Dash boards",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "My agents",
      href: "/dashboard/agents",
      icon: Bot,
    },
    {
      label: "Create a new agent",
      href: "/dashboard/agents",
      icon: UserPlus,
      isAction: true,
      onClick: () => setCreateEmployeeOpen(true),
    },
    {
      label: "Train My Agent",
      href: "/dashboard/knowledge",
      icon: GraduationCap,
    },
    {
      label: "Use agents",
      href: "/dashboard/delegate",
      icon: Sparkles,
    },
    {
      label: "Phone numbers",
      href: "/dashboard/phone-numbers",
      icon: Phone,
    },
    {
      label: "Credits",
      href: "/dashboard/billing",
      icon: CreditCard,
      badge: "14 min",
    },
    {
      label: "Account",
      href: "/dashboard/settings",
      icon: UserCog,
    },
    {
      label: "History",
      href: "/dashboard/calls",
      icon: History,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Swaram Sidebar matching Reference Image Style */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-xl border border-slate-200/80 m-0 lg:my-3 lg:ml-3 lg:rounded-[32px] shadow-[0_12px_40px_-15px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-transform duration-200 ease-in-out font-sans lg:translate-x-0 lg:static shrink-0 select-none text-[13px] ${
          isOpenMobile ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Top Header: Asterisk Mark + SW-AI Brand */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-slate-100 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#111418] text-white flex items-center justify-center font-bold text-xl shadow-xs group">
              <span className="text-xl leading-none">✱</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm text-slate-900 tracking-tight">
                  SW-AI
                </span>
                <span className="w-2 h-2 rounded-full bg-[#c8f53c]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-400 block -mt-0.5">
                Swaram Voice Core
              </span>
            </div>
          </Link>

          <button
            onClick={onCloseMobile}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors lg:hidden"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5 scrollbar-none">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Control Deck
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
              9 Active
            </span>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname?.startsWith(item.href) && !item.isAction;

              if (item.isAction) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-slate-700 hover:bg-[#c8f53c]/20 hover:text-slate-950 transition-all text-left font-medium cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#c8f53c] text-slate-700 group-hover:text-slate-950 flex items-center justify-center transition-colors">
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                      </div>
                      <span className="font-semibold text-slate-800 group-hover:text-slate-950">
                        {item.label}
                      </span>
                    </div>
                    <span className="w-5 h-5 rounded-full bg-[#111418] text-[#c8f53c] text-xs font-black flex items-center justify-center">
                      +
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all font-medium text-[13px] group ${
                    isActive
                      ? "bg-[#111418] text-white font-semibold shadow-xs"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-[#c8f53c] text-slate-950"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-900"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                    </div>
                    <span>{item.label}</span>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-[#c8f53c] text-slate-950"
                          : "bg-[#c8f53c]/30 text-slate-900 border border-[#c8f53c]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8f53c]" />
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Dock matching the image's dock footer */}
        <div className="p-3.5 border-t border-slate-100 shrink-0 space-y-3">
          {/* Workspace Credits Card */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">clinic</span>
              <span className="px-2 py-0.5 rounded-full bg-[#c8f53c] text-slate-950 text-[10px] font-black font-mono">
                14 min
              </span>
            </div>
            <p className="text-[11px] text-slate-500 truncate">taninkigovinda@gmail.com</p>
            <button
              onClick={() => setTopUpOpen(true)}
              className="w-full py-1.5 text-center text-[11px] font-bold text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              Top up credits →
            </button>
          </div>

          {/* Micro Dock Controls matching reference image bottom dock */}
          <div className="flex items-center justify-between px-1 text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold flex items-center justify-center">
                13:34
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                  } else {
                    document.exitFullscreen().catch(() => {});
                  }
                }}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Fullscreen"
              >
                ⤢
              </button>
              <button
                onClick={onCloseMobile}
                className="w-7 h-7 rounded-full bg-[#111418] hover:bg-black text-[#c8f53c] flex items-center justify-center text-xs transition-colors cursor-pointer"
                title="Collapse"
              >
                ↙
              </button>
            </div>
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
