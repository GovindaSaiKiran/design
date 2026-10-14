"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Zap,
  Mic,
  RefreshCw,
  Check,
  Calendar,
  Sparkles,
  PhoneCall,
  Activity,
} from "lucide-react";
import TestCallModal from "./modals/TestCallModal";
import TopUpCreditsModal from "./modals/TopUpCreditsModal";

interface AppHeaderProps {
  onToggleMobileSidebar: () => void;
  onOpenSearch?: () => void;
}

export default function AppHeader({
  onToggleMobileSidebar,
  onOpenSearch,
}: AppHeaderProps) {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [testCallOpen, setTestCallOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [userName, setUserName] = useState("Govinda T.");
  const [userEmail, setUserEmail] = useState("clinic@swaram.ai");

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

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("aeline_auth_token");
    }
    setProfileOpen(false);
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-5 lg:px-6 py-2.5 bg-[#09090B] border-b border-[#27272A] select-none text-white">
        {/* LEFT: Mobile toggle & Breadcrumb / Status */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-1.5 rounded-[2px] bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-white transition-colors"
            aria-label="Toggle navigation"
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 font-telemetry text-xs">
              <span className="text-[#A1A1AA] uppercase font-bold tracking-wider">Trunk Deck</span>
              <span className="text-[#3F3F46]">/</span>
              <span className="font-bold text-white tracking-tight">Main Dispatcher</span>
            </div>

            {/* Carrier Status Indicator */}
            <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-[2px] bg-[#18181B] border border-[#27272A] text-[11px] font-telemetry text-white">
              <span className="w-1.5 h-1.5 rounded-[1px] bg-white animate-pulse" />
              <span className="font-bold">SIP/2.0: 200 OK</span>
            </div>
          </div>
        </div>

        {/* CENTER: Quick Command Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-[2px] bg-[#121215] hover:bg-[#18181B] border border-[#27272A] hover:border-white text-xs text-[#A1A1AA] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-[#71717A]" />
              <span className="font-sans text-[12px]">Search channels, phone trunks, call logs...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded-[2px] text-[10px] font-telemetry bg-[#18181B] border border-[#27272A] text-white">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* RIGHT: Actions, Balance & Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Mobile search button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-1.5 rounded-[2px] text-[#A1A1AA] hover:bg-[#18181B] transition-colors"
            title="Search (⌘K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Balance Telemetry Meter */}
          <button
            onClick={() => setTopUpOpen(true)}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-[2px] bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-xs font-telemetry font-bold text-white transition-all cursor-pointer"
            title="Voice minutes remaining. Click to add more."
          >
            <span className="w-1.5 h-1.5 rounded-[1px] bg-white" />
            <span>14.0 MIN</span>
          </button>

          {/* Live Test Call Inverted Brick Button */}
          <button
            onClick={() => setTestCallOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-[2px] bg-white hover:bg-zinc-200 text-black text-xs font-bold transition-all border border-white cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Mic className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline font-display">Test Voice Agent</span>
          </button>

          {/* User Profile Capsule */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded-[2px] bg-[#121215] hover:bg-[#18181B] transition-all cursor-pointer border border-[#27272A]"
            >
              <div className="w-5 h-5 rounded-[2px] bg-white text-black font-telemetry font-bold text-[11px] flex items-center justify-center shrink-0">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-white truncate max-w-[90px] font-sans">
                {userName}
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-1.5 w-56 bg-[#09090B] rounded-[2px] border border-[#3F3F46] shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
                <div className="px-3.5 py-2 border-b border-[#27272A] bg-[#121215]">
                  <p className="font-bold text-white font-display text-xs">{userName}</p>
                  <p className="text-[11px] text-[#A1A1AA] font-telemetry truncate">{userEmail}</p>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard/agents"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-1.5 text-zinc-300 hover:text-white hover:bg-[#18181B] transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-[#A1A1AA]" />
                    <span>Manage Voice Agents</span>
                  </Link>
                  <Link
                    href="/dashboard/billing"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-1.5 text-zinc-300 hover:text-white hover:bg-[#18181B] transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-white" />
                    <span>Credits & Billing (14 min)</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-1.5 text-zinc-300 hover:text-white hover:bg-[#18181B] transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#A1A1AA]" />
                    <span>Workspace Settings</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-[#27272A]">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3.5 py-1.5 text-red-400 hover:bg-red-950/40 transition-colors text-left font-medium cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
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
