"use client";

import React, { useState, useEffect } from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import {
  Search,
  X,
  ArrowRight,
  LayoutDashboard,
  Bot,
  UserPlus,
  GraduationCap,
  Sparkles,
  Phone,
  CreditCard,
  UserCog,
  History,
} from "lucide-react";
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
    { label: "Dash boards", href: "/dashboard", category: "Overview", icon: LayoutDashboard },
    { label: "My agents", href: "/dashboard/agents", category: "AI Agents", icon: Bot },
    { label: "Create a new agent", href: "/dashboard/agents", category: "Quick Action", icon: UserPlus },
    { label: "Train My Agent", href: "/dashboard/knowledge", category: "Training & Knowledge", icon: GraduationCap },
    { label: "Use agents", href: "/dashboard/delegate", category: "Execution", icon: Sparkles },
    { label: "Phone numbers", href: "/dashboard/phone-numbers", category: "Telephony", icon: Phone },
    { label: "Credits", href: "/dashboard/billing", category: "Billing", icon: CreditCard },
    { label: "Account", href: "/dashboard/settings", category: "Account & Org", icon: UserCog },
    { label: "History", href: "/dashboard/calls", category: "Call Logs", icon: History },
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
    <div className="min-h-screen flex bg-[#000000] text-[#FFFFFF] antialiased font-sans selection:bg-white selection:text-black">
      {/* Persistent / Responsive Sidebar */}
      <AppSidebar
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#000000]">
        <AppHeader
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenSearch={() => setSearchModalOpen(true)}
        />

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-[1440px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global Quick Search Modal (⌘K Command Palette) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-100">
          <div className="relative w-full max-w-lg bg-[#09090B] rounded-[2px] border border-[#3F3F46] shadow-2xl overflow-hidden text-xs text-white">
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#27272A] bg-[#09090B]">
              <Search className="w-4 h-4 text-[#A1A1AA] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search channels, agents, transcripts, phone trunks (Esc to close)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-medium outline-none placeholder:text-[#71717A] bg-transparent text-white"
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1 rounded-[1px] text-[#A1A1AA] hover:text-white hover:bg-[#18181B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1 bg-[#09090B]">
              <div className="px-2 py-1 text-[10px] font-bold text-[#A1A1AA] tracking-wider uppercase font-telemetry">
                Dispatch Routing &amp; Telephony Channels
              </div>

              {filteredLinks.length === 0 ? (
                <div className="p-4 text-center text-[#71717A] font-telemetry">
                  No operational records found for "{searchQuery}"
                </div>
              ) : (
                filteredLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleSelectLink(item.href)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-[2px] border border-transparent hover:border-white hover:bg-[#18181B] text-zinc-300 hover:text-white transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#A1A1AA] group-hover:text-white" />
                        <span className="font-semibold text-xs text-white">{item.label}</span>
                      </div>
                      <span className="text-[10px] text-[#71717A] font-telemetry group-hover:text-[#A1A1AA]">
                        {item.category}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-[#040405] border-t border-[#27272A] flex items-center justify-between text-[11px] text-[#71717A]">
              <span className="font-telemetry">Press <kbd className="font-telemetry bg-[#18181B] px-1.5 py-0.5 rounded-[1px] border border-[#27272A] text-white">Esc</kbd> to exit</span>
              <span className="font-display font-bold tracking-tight text-white uppercase">Swaram Operations Deck</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
