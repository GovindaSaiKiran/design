"use client";

import React, { useState, useEffect } from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { Search, X, ArrowRight, LayoutDashboard, Sparkles, PhoneCall, Send, Users, Bot, BookOpen, Radio, BarChart3, FileSpreadsheet, UserCog, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export default function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === "Escape" && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchModalOpen]);

  const quickLinks = [
    { label: "Overview", href: "/dashboard", category: "Workspace", icon: LayoutDashboard },
    { label: "Delegate Task", href: "/dashboard/delegate", category: "Workspace", icon: Sparkles },
    { label: "Calls & Transcripts", href: "/dashboard/calls", category: "Operations", icon: PhoneCall },
    { label: "Outbound Campaigns", href: "/dashboard/campaigns", category: "Operations", icon: Send },
    { label: "Contacts & Applicants", href: "/dashboard/contacts", category: "Operations", icon: Users },
    { label: "AI Agents", href: "/dashboard/agents", category: "AI Workforce", icon: Bot },
    { label: "College Knowledge", href: "/dashboard/knowledge", category: "AI Workforce", icon: BookOpen },
    { label: "Phone Numbers & SIP Trunks", href: "/dashboard/phone-numbers", category: "AI Workforce", icon: Radio },
    { label: "Analytics & Benchmarks", href: "/dashboard/analytics", category: "Insights", icon: BarChart3 },
    { label: "Export Reports", href: "/dashboard/reports", category: "Insights", icon: FileSpreadsheet },
    { label: "Team & Permissions", href: "/dashboard/team", category: "Organization", icon: UserCog },
    { label: "Settings", href: "/dashboard/settings", category: "Organization", icon: Settings },
  ];

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
    <div className="min-h-screen flex bg-[#f8fafc] text-slate-900 antialiased font-sans">
      {/* Persistent / Responsive Sidebar */}
      <AppSidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenSearch={() => setSearchModalOpen(true)}
        />

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global Quick Search Modal (⌘K Command Palette) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-100">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden text-xs text-slate-900">
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search pages, agents, contacts, transcripts (Esc to close)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-medium outline-none placeholder:text-slate-400 bg-transparent"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Quick Navigation
              </div>

              {filteredLinks.length === 0 ? (
                <div className="p-4 text-center text-slate-400">
                  No matching pages found for "{searchQuery}"
                </div>
              ) : (
                filteredLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleSelectLink(item.href)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#f7fee7] hover:border hover:border-[#cdfb56]/60 text-slate-700 hover:text-slate-950 transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-xs">{item.label}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Press <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">Esc</kbd> to exit</span>
              <span className="font-semibold text-slate-600">VoicePilot AI</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
