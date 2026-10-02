"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  ChevronDown,
  Search,
  Bell,
  CheckCircle2,
  Building2,
  Sparkles,
  User,
  Settings,
  LogOut,
  X,
  Phone,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { mockNotifications } from "@/data/mock/dashboardData";

interface AppHeaderProps {
  onToggleMobileSidebar: () => void;
  onOpenSearch?: () => void;
}

export default function AppHeader({
  onToggleMobileSidebar,
  onOpenSearch,
}: AppHeaderProps) {
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(mockNotifications);

  const orgRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (orgRef.current && !orgRef.current.contains(event.target as Node)) {
        setOrgDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setUnreadNotifications([]);
    setNotificationsOpen(false);
  };

  return (
    <header className="h-16 px-4 sm:px-6 bg-white border-b border-slate-200/80 sticky top-0 z-20 flex items-center justify-between select-none">
      {/* LEFT: Mobile Toggle + Organization Selector + Back to Landing Page */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Mobile Sidebar Hamburger */}
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Back to Landing Page Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-slate-950 text-xs font-semibold transition-all shadow-2xs group shrink-0"
          title="Return to VoicePilot AI Landing Page"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Landing Page</span>
        </Link>

        {/* Organization Selector */}
        <div className="relative" ref={orgRef}>
          <button
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-900 text-xs font-semibold transition-all shadow-2xs"
            title="Switch Active Organization"
          >
            <div className="w-5 h-5 rounded bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center text-[10px] font-black shrink-0">
              A
            </div>
            <span className="truncate max-w-[120px] sm:max-w-[180px]">
              Apex Engineering College
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {/* Org Selector Dropdown */}
          {orgDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
              <div className="px-3 py-2 border-b border-slate-100 text-slate-500">
                <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-400">
                  Active Organization
                </span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block">
                  Apex Engineering College
                </span>
                <span className="text-[11px] text-slate-500">
                  Institutional License • Autonomous Tier
                </span>
              </div>

              <div className="p-1 space-y-0.5">
                <div className="px-2.5 py-1.5 rounded-lg bg-[#cdfb56]/20 border border-[#cdfb56]/40 flex items-center justify-between text-slate-950 font-bold">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                    <span>Apex Engineering College</span>
                  </span>
                  <span className="text-[10px] bg-[#cdfb56] text-slate-950 px-1.5 py-0.2 rounded font-bold">Active</span>
                </div>
                <button
                  onClick={() => setOrgDropdownOpen(false)}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <span>National Institute of Design</span>
                  <span className="text-[10px] text-slate-400">Switch</span>
                </button>
                <button
                  onClick={() => setOrgDropdownOpen(false)}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center justify-between"
                >
                  <span>Oxford Global Academy</span>
                  <span className="text-[10px] text-slate-400">Switch</span>
                </button>
              </div>

              <div className="pt-1.5 mt-1 border-t border-slate-100 px-2">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setOrgDropdownOpen(false)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-[11px] transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Manage Organization Settings</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CENTER / STATUS: Clean Status Pill */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200/80 bg-emerald-50/70 text-xs text-slate-800 shadow-2xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-slate-700 font-medium text-[11px]">All telephony & agent systems operational</span>
      </div>

      {/* RIGHT: Search, Notifications, Admin Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Quick Search */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-slate-900 text-xs font-medium transition-all shadow-2xs"
          title="Search conversations, agents, and contacts"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline font-medium">Search...</span>
          <kbd className="hidden sm:inline text-[10px] font-mono bg-slate-100 text-slate-500 px-1 py-0.5 rounded border border-slate-200">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs cursor-pointer"
            title="Acoustic Notifications & Alerts"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl border border-slate-200 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                  <span>Acoustic Alerts</span>
                  <span className="text-[10px] font-mono bg-[#cdfb56] text-slate-950 px-1.5 py-0.2 rounded font-bold border border-[#bceb42]">
                    {unreadNotifications.length} Active
                  </span>
                </div>
                <button
                  onClick={markAllRead}
                  className="text-[11px] text-slate-500 hover:text-slate-900 font-medium transition-colors"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1.5 pr-0.5">
                {unreadNotifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="p-2.5 rounded-lg border border-slate-200/80 bg-white hover:bg-[#f7fee7] hover:border-[#cdfb56] transition-colors shadow-2xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-slate-900">
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Real-time WebSocket alerts</span>
                <Link
                  href="/dashboard/calls"
                  onClick={() => setNotificationsOpen(false)}
                  className="font-bold text-slate-900 hover:underline"
                >
                  View live calls →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 sm:px-2 sm:py-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#cdfb56] transition-colors shadow-2xs"
            title="Account Menu"
          >
            <div className="w-6 h-6 rounded-md bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center text-xs font-black shrink-0">
              AV
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-xs font-bold text-slate-900 block leading-none">
                Arjun Verma
              </span>
              <span className="text-[10px] text-slate-500 font-normal">
                Dean of Admissions
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs space-y-1">
              <div className="px-2.5 py-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 block">
                  Arjun Verma
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  admissions.dean@apex.edu.in
                </span>
                <span className="inline-block mt-1 text-[10px] font-bold bg-[#cdfb56] text-slate-950 px-1.5 py-0.2 rounded border border-[#bceb42]">
                  Organization Administrator
                </span>
              </div>

              <Link
                href="/dashboard/team"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Team & Access</span>
              </Link>

              <Link
                href="/dashboard/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Organization Settings</span>
              </Link>

              <div className="pt-1 mt-1 border-t border-slate-100">
                <Link
                  href="/"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Exit Dashboard</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
