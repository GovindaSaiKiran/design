"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Menu,
  Search,
  User,
  Settings,
  LogOut,
  Zap,
  Mic,
  CreditCard,
  Share2,
  SlidersHorizontal,
  ArrowUpDown,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import TestCallModal from "./modals/TestCallModal";
import TopUpCreditsModal from "./modals/TopUpCreditsModal";
import { soundSynth } from "@/lib/audio-synth";

interface AppHeaderProps {
  onToggleMobileSidebar: () => void;
  onOpenSearch?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

export default function AppHeader({
  onToggleMobileSidebar,
  onOpenSearch,
  isCollapsed = false,
  onToggleCollapse,
}: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [profileOpen, setProfileOpen] = useState(false);
  const [testCallOpen, setTestCallOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [userName, setUserName] = useState("Govinda T.");
  const [userEmail, setUserEmail] = useState("admin@swaram.ai");

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("swaram_user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u.name || u.fullName) setUserName(u.name || u.fullName);
        if (u.email) setUserEmail(u.email);
      }
    } catch {
      // Keep defaults
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSectionTitle = () => {
    if (pathname === "/dashboard") return "Voice Operations Console";
    if (pathname?.startsWith("/dashboard/agents")) return "AI Voice Agents";
    if (pathname?.startsWith("/dashboard/calls")) return "Conversations & Transcripts";
    if (pathname?.startsWith("/dashboard/contacts")) return "Contacts & Audiences";
    if (pathname?.startsWith("/dashboard/campaigns")) return "Campaigns & Bulk Calling";
    if (pathname?.startsWith("/dashboard/data-vault")) return "Data Vault";
    if (pathname?.startsWith("/dashboard/callbacks")) return "Callbacks & Follow-ups";
    if (pathname?.startsWith("/dashboard/instant-leads")) return "WhatsApp & Instant Leads";
    if (pathname?.startsWith("/dashboard/delegate")) return "Agent Playground";
    if (pathname?.startsWith("/dashboard/knowledge")) return "Knowledge Base";
    if (pathname?.startsWith("/dashboard/analytics")) return "Analytics & Reports";
    if (pathname?.startsWith("/dashboard/reports")) return "Compliance Reports";
    if (pathname?.startsWith("/dashboard/phone-numbers")) return "Telephony & SIP Trunks";
    if (pathname?.startsWith("/dashboard/billing")) return "Minutes & Billing";
    if (pathname?.startsWith("/dashboard/team")) return "Team & Access Roles";
    if (pathname?.startsWith("/dashboard/settings")) return "Workspace Settings";
    return "Operations";
  };

  return (
    <>
      <header className="flex flex-col gap-3 pb-3 select-none">
        {/* Top Row: Title, Carrier Status Pill, and Action Pills */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left: Mobile hamburger & Section Title & Desktop Collapse Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-2xl bg-white border border-black/[0.08] text-black shadow-xs cursor-pointer"
              aria-label="Toggle navigation"
            >
              <Menu className="w-4 h-4" />
            </button>

            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="hidden lg:flex items-center justify-center p-2 rounded-2xl bg-white border border-black/[0.08] text-black/60 hover:text-black hover:bg-[#FAF3E4] transition-colors cursor-pointer shadow-2xs"
                title={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <PanelLeftOpen className="w-4 h-4" />
                ) : (
                  <PanelLeftClose className="w-4 h-4" />
                )}
              </button>
            )}

            <h1 className="text-xl sm:text-[22px] font-semibold text-[#1A1A1A] tracking-tight">
              {getSectionTitle()}
            </h1>
          </div>

          {/* Center: Live SIP Carrier Status Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/80 border border-black/[0.06] rounded-full self-start sm:self-center shadow-2xs text-xs">
            <span className="w-2 h-2 rounded-full bg-[#16856B] animate-pulse" />
            <span className="font-semibold text-[#1A1A1A]">SIP Carrier Active</span>
            <span className="text-black/25">•</span>
            <span className="text-black/60 font-medium">136ms SLA (Opus HD)</span>
          </div>

          {/* Right: Secondary Action Pills (Simulate Call, Balance, Profile) */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {/* Share secondary button */}
            <button
              onClick={() => {
                try { soundSynth.play("confirm"); } catch {}
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Dashboard link copied to clipboard!");
                }
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF3E4] border border-black/[0.08] text-xs font-medium text-[#1A1A1A] shadow-2xs transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-black/60" />
              <span>Share</span>
            </button>

            {/* Simulate Call Button */}
            <button
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setTestCallOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF3E4] border border-black/[0.08] text-xs font-semibold text-[#1A1A1A] shadow-2xs transition-all cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5 text-black/70" />
              <span className="hidden sm:inline">Simulate Call</span>
            </button>

            {/* Balance chip */}
            <button
              onClick={() => setTopUpOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C1F2D5] text-[#065F46] border border-[#16856B]/20 text-xs font-semibold shadow-2xs cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
              <span>14.0 min</span>
            </button>

            {/* Profile Avatar Capsule */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-8 h-8 rounded-full bg-[#C9A7F5] text-[#3B0764] font-bold text-xs flex items-center justify-center border border-black/10 shadow-2xs cursor-pointer hover:scale-105 transition-transform"
                title={`Profile: ${userName}`}
              >
                {userName.charAt(0).toUpperCase()}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl border border-black/[0.08] shadow-xl py-2 z-50 animate-in fade-in duration-100 text-xs text-[#1A1A1A]">
                  <div className="px-4 py-2 border-b border-black/[0.06] bg-[#FAF3E4]/50 rounded-t-2xl">
                    <p className="font-semibold text-[#1A1A1A] text-xs">{userName}</p>
                    <p className="text-[11px] text-black/50 truncate">{userEmail}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/dashboard/agents"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-black/70 hover:text-black hover:bg-[#FAF3E4]/60 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-black/50" />
                      <span>Manage Voice Agents</span>
                    </Link>
                    <Link
                      href="/dashboard/billing"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-black/70 hover:text-black hover:bg-[#FAF3E4]/60 transition-colors"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-black/50" />
                      <span>Minutes &amp; Billing</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-black/70 hover:text-black hover:bg-[#FAF3E4]/60 transition-colors"
                    >
                      <Settings className="w-3.5 h-3.5 text-black/50" />
                      <span>Workspace Settings</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Toolbar: Full-width Search Bar with Filters & Sort controls on right (Reference style) */}
        <div className="flex items-center justify-between gap-3 px-4 py-2 bg-white/70 border border-black/[0.06] rounded-2xl sm:rounded-full shadow-2xs backdrop-blur-xs">
          {/* Search Input on Left */}
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <Search className="w-4 h-4 text-black/40 shrink-0" />
            <input
              type="text"
              placeholder="Search calls, transcripts, voice agents, campaigns... (⌘K)"
              onClick={onOpenSearch}
              readOnly
              className="w-full text-xs font-medium outline-none bg-transparent text-[#1A1A1A] placeholder:text-black/40 cursor-pointer"
            />
          </div>

          {/* Filter & Sort Controls on Right */}
          <div className="flex items-center gap-3 shrink-0 text-xs font-medium text-black/60">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
            <span className="text-black/20">|</span>
            <button
              onClick={() => { try { soundSynth.play("click"); } catch {} }}
              className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sort by</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <TestCallModal
        isOpen={testCallOpen}
        onClose={() => setTestCallOpen(false)}
      />
      <TopUpCreditsModal
        isOpen={topUpOpen}
        onClose={() => setTopUpOpen(false)}
        currentCredits={14}
      />
    </>
  );
}
