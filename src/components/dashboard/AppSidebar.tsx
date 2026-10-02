"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  PhoneCall,
  Send,
  Users,
  Bot,
  BookOpen,
  Radio,
  BarChart3,
  FileSpreadsheet,
  UserCog,
  Settings,
  X,
  Building2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface AppSidebarProps {
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeType?: "default" | "live" | "accent";
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigationSections: NavSection[] = [
  {
    title: "WORKSPACE",
    items: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Delegate Task",
        href: "/dashboard/delegate",
        icon: Sparkles,
        badge: "Autonomous",
        badgeType: "accent",
      },
    ],
  },
  {
    title: "OPERATIONS",
    items: [
      {
        label: "Calls",
        href: "/dashboard/calls",
        icon: PhoneCall,
        badge: "3 Live",
        badgeType: "live",
      },
      {
        label: "Campaigns",
        href: "/dashboard/campaigns",
        icon: Send,
        badge: "2 Running",
        badgeType: "default",
      },
      {
        label: "Contacts",
        href: "/dashboard/contacts",
        icon: Users,
      },
    ],
  },
  {
    title: "AI WORKFORCE",
    items: [
      {
        label: "AI Agents",
        href: "/dashboard/agents",
        icon: Bot,
        badge: "3 Active",
        badgeType: "default",
      },
      {
        label: "Knowledge",
        href: "/dashboard/knowledge",
        icon: BookOpen,
      },
      {
        label: "Phone Numbers",
        href: "/dashboard/phone-numbers",
        icon: Radio,
      },
    ],
  },
  {
    title: "INSIGHTS",
    items: [
      {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: BarChart3,
      },
      {
        label: "Reports",
        href: "/dashboard/reports",
        icon: FileSpreadsheet,
      },
    ],
  },
  {
    title: "ORGANIZATION",
    items: [
      {
        label: "Team",
        href: "/dashboard/team",
        icon: UserCog,
      },
      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ],
  },
];

export default function AppSidebar({
  isOpenMobile = false,
  onCloseMobile,
}: AppSidebarProps) {
  const pathname = usePathname();

  const isCurrent = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-white border-r border-slate-200/80 select-none">
      {/* Top Brand Header */}
      <div>
        <div className="h-16 px-5 border-b border-slate-200/80 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group"
            title="VoicePilot AI Operations"
          >
            <div className="w-8 h-8 rounded-lg bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center font-black text-xs tracking-tight shadow-xs group-hover:bg-[#bef03f] transition-colors">
              VP
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-slate-900">
                  VoicePilot
                </span>
                <span className="text-[10px] font-extrabold bg-[#cdfb56]/30 text-slate-950 px-1.5 py-0.2 rounded border border-[#cdfb56]/60">
                  AI
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-normal block leading-none mt-0.5">
                Operations Platform
              </span>
            </div>
          </Link>

          {/* Close button for mobile drawer */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="p-3.5 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] scrollbar-thin">
          {navigationSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <div className="px-2.5 mb-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isCurrent(item.href);
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                        active
                          ? "bg-slate-900 text-white shadow-xs font-semibold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            active ? "text-[#cdfb56] stroke-[2.2]" : "text-slate-400 group-hover:text-slate-600"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-tight ml-2 shrink-0 ${
                            active
                              ? "bg-[#cdfb56] text-slate-950 font-bold"
                              : item.badgeType === "live"
                              ? "bg-[#cdfb56]/30 text-slate-900 border border-[#cdfb56]/70"
                              : item.badgeType === "accent"
                              ? "bg-[#f7fee7] text-slate-900 border border-[#cdfb56]"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Organization Card & Landing Page Link */}
      <div className="p-3.5 border-t border-slate-200/80 bg-white">
        <div className="p-2.5 rounded-lg border border-slate-200/80 bg-white hover:bg-[#f7fee7]/30 hover:border-[#cdfb56] shadow-xs space-y-2 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#cdfb56] border border-[#bceb42] text-slate-950 flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5 text-slate-950" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900 truncate">
                  Apex Eng. College
                </span>
                <CheckCircle2 className="w-3 h-3 text-[#8ac926] shrink-0" />
              </div>
              <span className="text-[10px] text-slate-500 block truncate">
                Institutional License
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center justify-between text-[11px] font-semibold text-slate-600 hover:text-slate-950 pt-1.5 border-t border-slate-200/60 transition-colors"
          >
            <span>Back to Landing Page</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop / Tablet Persistent Sidebar */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 shrink-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden animate-in fade-in duration-150"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform transition-transform duration-200 ease-in-out lg:hidden ${
          isOpenMobile ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </div>
    </>
  );
}
