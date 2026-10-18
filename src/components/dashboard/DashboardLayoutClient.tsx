"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { Search, X, ArrowRight, Zap, Bot, Users, History, Settings, CreditCard, Sparkles } from "lucide-react";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export default function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("swaram_sidebar_collapsed");
      if (stored !== null) {
        setIsCollapsed(stored === "true");
      }
    } catch {
      // Default to expanded
    }
  }, []);

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("swaram_sidebar_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  const quickLinks = [
    { label: "Overview & Concurrency", href: "/dashboard", category: "Operations", icon: Zap },
    { label: "AI Voice Agents (Workforce)", href: "/dashboard/agents", category: "Core Workforce", icon: Bot },
    { label: "Autonomous Dispatch", href: "/dashboard/delegate", category: "Automation", icon: Sparkles },
    { label: "Contacts & Campaign Lists", href: "/dashboard/contacts", category: "Audience", icon: Users },
    { label: "Campaigns & Bulk Outbound", href: "/dashboard/campaigns", category: "Audience", icon: Users },
    { label: "Conversations & Transcripts", href: "/dashboard/calls", category: "Archives", icon: History },
    { label: "Telephony Trunks & Phone Lines", href: "/dashboard/phone-numbers", category: "Infrastructure", icon: Zap },
    { label: "Minutes Billing & Allowance", href: "/dashboard/billing", category: "Commercials", icon: CreditCard },
    { label: "Workspace Settings", href: "/dashboard/settings", category: "Governance", icon: Settings },
  ];

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        handleToggleCollapse();
      }
      if (e.key === "Escape") {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredLinks = quickLinks.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLink = (href: string) => {
    setSearchModalOpen(false);
    setSearchQuery("");
    router.push(href);
  };

  return (
    <div className="min-h-screen flex pastel-page-bg text-[#1A1A1A] antialiased font-sans selection:bg-[#FFD9A0] selection:text-[#1A1A1A] relative overflow-x-hidden">
      {/* Floating White Sidebar Panel (Fixed to viewport so it remains completely still when page scrolls) */}
      <AppSidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      {/* Desktop Spacer to reserve fixed sidebar width in the flex flow */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-[116px]" : "w-[320px]"
        }`}
        aria-hidden="true"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent relative z-10 py-3 sm:py-4 lg:py-5 px-3 sm:px-4 lg:px-0 lg:pr-6">
        <AppHeader
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenSearch={() => setSearchModalOpen(true)}
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 pt-4 pb-12 w-full max-w-[1520px] mx-auto">
          {children}
        </main>
      </div>

      {/* Global Quick Search Modal (Command Palette in Pastel Style) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/20 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-black/[0.08] shadow-[0_12px_48px_rgba(0,0,0,0.12)] overflow-hidden text-xs text-[#1A1A1A]">
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-black/[0.06] bg-[#FAF3E4]/40">
              <Search className="w-4 h-4 text-black/50 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search agents, transcripts, phone trunks, contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-medium outline-none placeholder:text-black/40 bg-transparent text-[#1A1A1A]"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-full text-black/40 hover:text-black hover:bg-black/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-3 space-y-1 bg-white">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-black/40 tracking-wider uppercase">
                Quick Navigation &amp; Workspaces
              </div>

              {filteredLinks.length === 0 ? (
                <div className="p-8 text-center text-black/40">
                  No operational records found for "{searchQuery}"
                </div>
              ) : (
                filteredLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleSelectLink(item.href)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl hover:bg-[#F8EED8]/60 transition-colors text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-xl bg-[#F6EBC8]/70 text-black flex items-center justify-center shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-semibold text-xs text-[#1A1A1A] block">
                            {item.label}
                          </span>
                          <span className="text-[10.5px] text-black/50 block">
                            {item.category}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-black/30 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
