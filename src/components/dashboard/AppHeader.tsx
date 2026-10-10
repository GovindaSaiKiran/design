"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  ChevronDown,
  Search,
  Bell,
  BookOpen,
  CircleOff,
  User,
  Settings,
  LogOut,
  Zap,
  Mic,
  RefreshCw,
  Check,
  Heart,
  Sparkles,
  Calendar,
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [testCallOpen, setTestCallOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="px-4 sm:px-6 pt-3 pb-2 sticky top-0 z-20 flex items-center justify-between select-none font-sans bg-[#eceef2]/80 backdrop-blur-md">
        {/* LEFT: Capsule Tools & Profile Dock */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
            aria-label="Toggle navigation"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* 1. Tool Actions Capsule: [ 🎙️ | 🔄 | ✓ ] */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-slate-600 text-xs">
            <button
              onClick={() => setTestCallOpen(true)}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-700 hover:text-black transition-colors cursor-pointer"
              title="Mic / Test Voice"
            >
              <Mic className="w-3.5 h-3.5 text-purple-600" />
            </button>
            <span className="w-px h-3 bg-slate-200" />
            <button
              onClick={() => alert("Telephony synced")}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-700 hover:text-black transition-colors cursor-pointer"
              title="Sync Telephony"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <span className="w-px h-3 bg-slate-200" />
            <button
              onClick={() => alert("System online")}
              className="p-1 rounded-full hover:bg-slate-100 text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
              title="System Ready"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. User Profile Capsule: [ 👤 Govinda / clinic | 🩵 ⚡ ✦ ] */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-slate-900 text-[#c8f53c] font-black text-[10px] flex items-center justify-center shrink-0">
                G
              </div>
              <span className="font-bold text-slate-900 truncate max-w-[120px]">Govinda T.</span>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 pl-1 border-l border-slate-200">
                <span>🩵</span>
                <span className="text-amber-500">⚡</span>
                <span className="text-[#84b80e] font-black">✦</span>
              </div>
            </button>

            {profileOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
                <div className="px-3.5 py-2 border-b border-slate-100">
                  <p className="font-bold text-slate-900 text-xs">clinic</p>
                  <p className="text-[11px] text-slate-500 truncate">taninkigovinda@gmail.com</p>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard/store"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>AI Employee Store</span>
                  </Link>
                  <Link
                    href="/dashboard/billing"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Credits & Minutes</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3.5 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Workspace Settings</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      alert("Signed out");
                    }}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-red-600 hover:bg-red-50 transition-colors text-left font-medium cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CENTER GREETING (Matching Image: "Hi Celeste, Welcome to AI-BL") */}
        <div className="hidden xl:flex items-center gap-2 text-xs">
          <div className="w-5 h-5 rounded-full bg-[#c8f53c] text-slate-950 flex items-center justify-center font-bold text-[10px]">
            ✦
          </div>
          <div>
            <span className="font-bold text-slate-900">Hi Govinda, </span>
            <span className="text-slate-400 font-medium">Welcome to Swaram AI</span>
          </div>
          <button
            onClick={onOpenSearch}
            className="text-slate-400 hover:text-slate-900 ml-1 font-bold text-xs cursor-pointer"
            title="Search"
          >
            •••
          </button>
        </div>

        {/* RIGHT CAPSULES: Date Pill & Menu Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Date + Notification Pill: [ 🔔 Today, 11 Oct (14 min) ] */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-800">
            <Bell className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-700">Sat, 11 Oct</span>
            <button
              onClick={() => setTopUpOpen(true)}
              className="w-5 h-5 rounded-full bg-[#111418] text-white text-[10px] font-black font-mono flex items-center justify-center cursor-pointer"
              title="14 min credits left. Click to top up."
            >
              14
            </button>
          </div>

          {/* Search trigger pill */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            title="Search (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          {/* Menu toggle */}
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-full bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            title="Menu"
          >
            <Menu className="w-3.5 h-3.5" />
          </button>
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
