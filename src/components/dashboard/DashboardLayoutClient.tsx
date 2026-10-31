"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";
import { PaletteProvider } from "@/context/PaletteContext";
import {
  Search,
  X,
  ArrowRight,
  Zap,
  Bot,
  Users,
  History,
  Settings,
  CreditCard,
  Sparkles,
  Activity,
  Clock,
  PhoneIncoming,
  PhoneOutgoing,
  Volume2,
  Calendar,
  TrendingUp,
  Radio,
  Megaphone,
  BookOpen,
  User,
  LayoutGrid,
  MessageSquare,
  PhoneCall,
  Filter,
  PanelLeftClose,
  CornerDownLeft,
  ChevronRight,
  Layers,
  Database,
  Gauge,
  FolderKanban,
  ShieldCheck,
  Download,
  AlertTriangle,
  FileText,
} from "lucide-react";
import {
  DASHBOARD_SEARCH_INDEX,
  SearchItem,
  SearchCategory,
} from "@/data/dashboardSearchIndex";
import { soundSynth } from "@/lib/audio-synth";

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

const getSearchIcon = (iconName: string) => {
  switch (iconName) {
    case "Activity": return Activity;
    case "Clock": return Clock;
    case "PhoneIncoming": return PhoneIncoming;
    case "PhoneOutgoing": return PhoneOutgoing;
    case "Volume2": return Volume2;
    case "Calendar": return Calendar;
    case "Settings": return Settings;
    case "Sparkles": return Sparkles;
    case "TrendingUp": return TrendingUp;
    case "Radio": return Radio;
    case "CreditCard": return CreditCard;
    case "Bot": return Bot;
    case "Megaphone": return Megaphone;
    case "Users": return Users;
    case "BookOpen": return BookOpen;
    case "User": return User;
    case "LayoutGrid": return LayoutGrid;
    case "MessageSquare": return MessageSquare;
    case "PhoneCall": return PhoneCall;
    case "Filter": return Filter;
    case "PanelLeftClose": return PanelLeftClose;
    case "Database": return Database;
    case "FolderKanban": return FolderKanban;
    case "Gauge": return Gauge;
    case "ShieldCheck": return ShieldCheck;
    case "Download": return Download;
    case "AlertTriangle": return AlertTriangle;
    case "FileText": return FileText;
    case "History": return History;
    case "Zap": return Zap;
    default: return Layers;
  }
};

interface ColorTheme {
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  actionBg: string;
  actionText: string;
  actionBorder: string;
}

const getItemTheming = (item: SearchItem): ColorTheme => {
  // WhatsApp Workspace
  if (item.section.includes("WhatsApp") || item.id.includes("whatsapp") || item.iconName === "MessageSquare") {
    return {
      iconBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-700",
      iconColor: "text-emerald-700",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-800",
      badgeBorder: "border-emerald-200/80",
      actionBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
      actionText: "text-emerald-800",
      actionBorder: "border-emerald-200",
    };
  }
  // Data Vault & Schema Engine
  if (item.section.includes("Data Vault") || item.id.includes("vault") || item.id.includes("schema") || item.iconName === "Database") {
    return {
      iconBg: "bg-indigo-500/10 border-indigo-500/25 text-indigo-700",
      iconColor: "text-indigo-700",
      badgeBg: "bg-indigo-50",
      badgeText: "text-indigo-800",
      badgeBorder: "border-indigo-200/80",
      actionBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
      actionText: "text-indigo-800",
      actionBorder: "border-indigo-200",
    };
  }
  // Usage Controls & Telephony Billing
  if (item.section.includes("Usage") || item.id.includes("capacity") || item.id.includes("simulator") || item.iconName === "Gauge") {
    return {
      iconBg: "bg-amber-500/10 border-amber-500/25 text-amber-700",
      iconColor: "text-amber-700",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-800",
      badgeBorder: "border-amber-200/80",
      actionBg: "bg-amber-50 text-amber-800 border-amber-200",
      actionText: "text-amber-800",
      actionBorder: "border-amber-200",
    };
  }
  // Phone Numbers & SIP Gateways
  if (item.section.includes("Phone Numbers") || item.id.includes("phone-number") || item.iconName === "PhoneCall") {
    return {
      iconBg: "bg-sky-500/10 border-sky-500/25 text-sky-700",
      iconColor: "text-sky-700",
      badgeBg: "bg-sky-50",
      badgeText: "text-sky-800",
      badgeBorder: "border-sky-200/80",
      actionBg: "bg-sky-50 text-sky-800 border-sky-200",
      actionText: "text-sky-800",
      actionBorder: "border-sky-200",
    };
  }
  // Call History & Transcripts
  if (item.section.includes("Call History") || item.iconName === "History") {
    return {
      iconBg: "bg-rose-500/10 border-rose-500/25 text-rose-700",
      iconColor: "text-rose-700",
      badgeBg: "bg-rose-50",
      badgeText: "text-rose-800",
      badgeBorder: "border-rose-200/80",
      actionBg: "bg-rose-50 text-rose-800 border-rose-200",
      actionText: "text-rose-800",
      actionBorder: "border-rose-200",
    };
  }
  // Telephony Activity Heatmap
  if (item.id.includes("heatmap") || item.id.includes("matrix")) {
    return {
      iconBg: "bg-emerald-500/10 border-emerald-500/25 text-emerald-700",
      iconColor: "text-emerald-700",
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-800",
      badgeBorder: "border-emerald-200/80",
      actionBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
      actionText: "text-emerald-800",
      actionBorder: "border-emerald-200",
    };
  }
  if (item.id.includes("hourly") || item.iconName === "Clock") {
    return {
      iconBg: "bg-amber-500/10 border-amber-500/25 text-amber-700",
      iconColor: "text-amber-700",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-800",
      badgeBorder: "border-amber-200/80",
      actionBg: "bg-amber-50 text-amber-800 border-amber-200",
      actionText: "text-amber-800",
      actionBorder: "border-amber-200",
    };
  }
  if (
    item.category === "Agent" ||
    item.id.includes("agent") ||
    item.id.includes("maya") ||
    item.id.includes("karan") ||
    item.id.includes("swara")
  ) {
    return {
      iconBg: "bg-purple-500/10 border-purple-500/25 text-purple-700",
      iconColor: "text-purple-700",
      badgeBg: "bg-purple-50",
      badgeText: "text-purple-800",
      badgeBorder: "border-purple-200/80",
      actionBg: "bg-purple-50 text-purple-800 border-purple-200",
      actionText: "text-purple-800",
      actionBorder: "border-purple-200",
    };
  }
  if (
    item.category === "Modal" ||
    item.id.includes("modal") ||
    item.id.includes("schedule")
  ) {
    return {
      iconBg: "bg-blue-500/10 border-blue-500/25 text-blue-700",
      iconColor: "text-blue-700",
      badgeBg: "bg-blue-50",
      badgeText: "text-blue-800",
      badgeBorder: "border-blue-200/80",
      actionBg: "bg-blue-50 text-blue-800 border-blue-200",
      actionText: "text-blue-800",
      actionBorder: "border-blue-200",
    };
  }
  if (
    item.id.includes("call") ||
    item.id.includes("drawer") ||
    item.iconName === "PhoneIncoming" ||
    item.iconName === "Volume2"
  ) {
    return {
      iconBg: "bg-rose-500/10 border-rose-500/25 text-rose-700",
      iconColor: "text-rose-700",
      badgeBg: "bg-rose-50",
      badgeText: "text-rose-800",
      badgeBorder: "border-rose-200/80",
      actionBg: "bg-rose-50 text-rose-800 border-rose-200",
      actionText: "text-rose-800",
      actionBorder: "border-rose-200",
    };
  }
  if (item.id.includes("campaign") || item.iconName === "Megaphone" || item.iconName === "PhoneOutgoing") {
    return {
      iconBg: "bg-indigo-500/10 border-indigo-500/25 text-indigo-700",
      iconColor: "text-indigo-700",
      badgeBg: "bg-indigo-50",
      badgeText: "text-indigo-800",
      badgeBorder: "border-indigo-200/80",
      actionBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
      actionText: "text-indigo-800",
      actionBorder: "border-indigo-200",
    };
  }
  if (item.id.includes("knowledge") || item.iconName === "BookOpen") {
    return {
      iconBg: "bg-amber-600/10 border-amber-600/25 text-amber-800",
      iconColor: "text-amber-800",
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-900",
      badgeBorder: "border-amber-200/80",
      actionBg: "bg-amber-50 text-amber-900 border-amber-200",
      actionText: "text-amber-900",
      actionBorder: "border-amber-200",
    };
  }
  if (
    item.id.includes("setting") ||
    item.id.includes("governance") ||
    item.iconName === "Settings"
  ) {
    return {
      iconBg: "bg-zinc-500/10 border-zinc-500/25 text-zinc-700",
      iconColor: "text-zinc-700",
      badgeBg: "bg-zinc-100",
      badgeText: "text-zinc-800",
      badgeBorder: "border-zinc-200/80",
      actionBg: "bg-zinc-100 text-zinc-800 border-zinc-200",
      actionText: "text-zinc-800",
      actionBorder: "border-zinc-200",
    };
  }
  return {
    iconBg: "bg-teal-500/10 border-teal-500/25 text-teal-700",
    iconColor: "text-teal-700",
    badgeBg: "bg-teal-50",
    badgeText: "text-teal-800",
    badgeBorder: "border-teal-200/80",
    actionBg: "bg-teal-50 text-teal-800 border-teal-200",
    actionText: "text-teal-800",
    actionBorder: "border-teal-200",
  };
};

export default function DashboardLayoutClient({
  children,
}: DashboardLayoutClientProps) {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

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

  // Keyboard shortcut listener (Ctrl+K, Cmd+K, Ctrl+B, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        try { soundSynth.play("click"); } catch {}
        setSearchModalOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        handleToggleCollapse();
      }
      if (e.key === "Escape" && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchModalOpen]);

  // Reset selected index when query or category changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery, selectedCategory]);

  // Deep search filtering & relevance scoring
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matches = DASHBOARD_SEARCH_INDEX.filter((item) => {
      // Category filter check
      if (selectedCategory !== "All") {
        if (selectedCategory === "Components" && item.category !== "Component" && item.category !== "Widget") {
          return false;
        }
        if (selectedCategory === "Modals" && item.category !== "Modal") {
          return false;
        }
        if (selectedCategory === "Sections" && item.category !== "Section") {
          return false;
        }
        if (selectedCategory === "Agents" && item.category !== "Agent") {
          return false;
        }
      }

      if (!q) return true;

      const nameMatch = item.name.toLowerCase().includes(q);
      const compMatch = item.componentName.toLowerCase().includes(q);
      const sectionMatch = item.section.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const keywordMatch = item.keywords.some((kw) => kw.toLowerCase().includes(q));

      return nameMatch || compMatch || sectionMatch || descMatch || keywordMatch;
    });

    if (!q) return matches;

    // Rank results by relevance: exact match in name/component first, then startsWith, then keywords
    return matches.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aComp = a.componentName.toLowerCase();
      const bComp = b.componentName.toLowerCase();

      // Highest: exact match
      if (aName === q || aComp === q) return -1;
      if (bName === q || bComp === q) return 1;

      // Second: startsWith name or componentName
      const aStarts = aName.startsWith(q) || aComp.startsWith(q);
      const bStarts = bName.startsWith(q) || bComp.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;

      // Third: name includes
      const aNameInc = aName.includes(q);
      const bNameInc = bName.includes(q);
      if (aNameInc && !bNameInc) return -1;
      if (!aNameInc && bNameInc) return 1;

      return 0;
    });
  }, [searchQuery, selectedCategory]);

  // Handle arrow key navigation in search dialog
  const handleDialogKeyDown = (e: React.KeyboardEvent) => {
    if (searchResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = prev < searchResults.length - 1 ? prev + 1 : 0;
        scrollActiveIntoView(next);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = prev > 0 ? prev - 1 : searchResults.length - 1;
        scrollActiveIntoView(next);
        return next;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        handleSelectLink(searchResults[selectedIndex]);
      }
    }
  };

  const scrollActiveIntoView = (index: number) => {
    if (!resultsContainerRef.current) return;
    const items = resultsContainerRef.current.querySelectorAll("[data-search-item]");
    const activeEl = items[index] as HTMLElement | undefined;
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  };

  const handleSelectLink = (item: SearchItem) => {
    try { soundSynth.play("confirm"); } catch {}
    setSearchModalOpen(false);
    setSearchQuery("");

    const [path, hash] = item.href.split("#");
    const currentPath = window.location.pathname;

    // Target element jump with smooth scrolling and high-visibility halo highlight
    const highlightTarget = (targetHash: string) => {
      const el = document.getElementById(targetHash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("ring-4", "ring-[#F59E0B]", "shadow-[0_0_32px_rgba(245,158,11,0.35)]", "transition-all", "duration-500");
        setTimeout(() => {
          el.classList.remove("ring-4", "ring-[#F59E0B]", "shadow-[0_0_32px_rgba(245,158,11,0.35)]");
        }, 2500);
      }
    };

    if (hash) {
      if (currentPath === path || (path === "/dashboard" && (currentPath === "/dashboard" || currentPath === "/dashboard/"))) {
        highlightTarget(hash);
        return;
      }
    }

    // Route navigation
    router.push(item.href);

    // If navigating to a page with a hash anchor, scroll to it after mount
    if (hash) {
      setTimeout(() => {
        highlightTarget(hash);
      }, 400);
    }
  };

  // Dynamic counts for each category
  const categoryCounts = useMemo(() => {
    const total = DASHBOARD_SEARCH_INDEX.length;
    const components = DASHBOARD_SEARCH_INDEX.filter(
      (i) => i.category === "Component" || i.category === "Widget"
    ).length;
    const modals = DASHBOARD_SEARCH_INDEX.filter(
      (i) => i.category === "Modal"
    ).length;
    const sections = DASHBOARD_SEARCH_INDEX.filter(
      (i) => i.category === "Section"
    ).length;
    const agents = DASHBOARD_SEARCH_INDEX.filter(
      (i) => i.category === "Agent"
    ).length;

    return { total, components, modals, sections, agents };
  }, []);

  const categoryFilters = [
    { id: "All", label: "All Items", count: categoryCounts.total },
    { id: "Components", label: "Components & Widgets", count: categoryCounts.components },
    { id: "Modals", label: "Modals & Dialogs", count: categoryCounts.modals },
    { id: "Sections", label: "Sections", count: categoryCounts.sections },
    { id: "Agents", label: "Workforce", count: categoryCounts.agents },
  ];

  return (
    <PaletteProvider>
      <div
        style={{
          background: "var(--palette-page-bg, linear-gradient(135deg, #FBF8EE 0%, #F5EFE0 50%, #ECE4CE 100%))",
          color: "var(--palette-text-primary, #1A1A1A)",
        }}
        className="min-h-screen flex text-[#1A1A1A] antialiased font-sans relative overflow-x-hidden transition-colors duration-300"
      >
        {/* Floating White Sidebar Panel */}
        <AppSidebar
          isOpenMobile={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
          isCollapsed={isCollapsed}
          onToggleCollapse={handleToggleCollapse}
        />

        {/* Main Content Area with guaranteed desktop margin clear of fixed sidebar */}
        <div
          className={`dashboard-main-content flex-1 flex flex-col min-w-0 bg-transparent relative z-10 py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:pl-6 lg:pr-8 ${
            isCollapsed ? "is-collapsed" : ""
          }`}
        >
          <AppHeader
            onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            onOpenSearch={() => {
              try { soundSynth.play("click"); } catch {}
              setSearchModalOpen(true);
            }}
            isCollapsed={isCollapsed}
            onToggleCollapse={handleToggleCollapse}
          />

          {/* Dynamic Page Content Viewport */}
          <main className="flex-1 pt-4 pb-12 w-full max-w-[1520px] mx-auto">
            {children}
          </main>
        </div>

        {/* ========================================================================= */}
        {/* UNIVERSAL DASHBOARD SEARCH & COMPONENT COMMAND PALETTE                    */}
        {/* Luxury Raycast/Linear Inspired Aesthetic with Rich Colorway & Typography */}
        {/* ========================================================================= */}
        {searchModalOpen && (
          <div
            onClick={() => setSearchModalOpen(false)}
            className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-16 px-3 sm:px-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleDialogKeyDown}
              className="relative w-full max-w-3xl bg-[#FAFBF9] rounded-[28px] border-2 border-black/[0.12] shadow-[0_28px_80px_rgba(0,0,0,0.24),0_4px_16px_rgba(0,0,0,0.08)] overflow-hidden text-xs text-[#1A1A1A] flex flex-col max-h-[85vh] transition-all"
            >
              {/* Top Search Input Bar */}
              <div className="flex items-center gap-3.5 px-6 py-4.5 border-b border-black/[0.08] bg-gradient-to-r from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9] shrink-0">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FFA98B] to-[#FF6B08] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Search className="w-4 h-4 stroke-[2.5]" />
                </div>
                <input
                  type="text"
                  autoFocus
                  placeholder="Type any component, widget, modal, voice agent, or section..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm sm:text-[15px] font-semibold outline-none placeholder:text-black/35 bg-transparent text-[#111827] tracking-tight"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="p-1.5 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                    title="Clear query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-black/15 text-[10.5px] font-mono font-bold text-black/60 shadow-[0_1px_3px_rgba(0,0,0,0.08)] shrink-0">
                  <span>ESC</span>
                </div>
              </div>

              {/* Category Filter Pills Bar */}
              <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-black/[0.06] bg-white/90 backdrop-blur-xs overflow-x-auto scrollbar-none shrink-0">
                {categoryFilters.map((cat) => {
                  const isCatActive = selectedCategory === cat.id;
                  const count = cat.count;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        try { soundSynth.play("click"); } catch {}
                        setSelectedCategory(cat.id);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                        isCatActive
                          ? "bg-[#18181B] text-white border-[#18181B] shadow-xs"
                          : "bg-white hover:bg-[#FAF6EE] text-black/60 hover:text-black border-black/[0.08] hover:border-black/15 shadow-2xs"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                          isCatActive
                            ? "bg-white/20 text-white"
                            : "bg-black/[0.06] text-black/50"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Results List Viewport */}
              <div
                ref={resultsContainerRef}
                className="overflow-y-auto p-3.5 space-y-2 bg-[#FAFBF9] flex-1 min-h-[260px]"
              >
                {searchResults.length === 0 ? (
                  <div className="py-16 px-4 text-center">
                    <div className="w-14 h-14 rounded-3xl bg-[#FAF0D7] border border-[#FFA98B]/40 flex items-center justify-center mx-auto mb-3 text-[#D9532F] shadow-sm">
                      <Search className="w-6 h-6 stroke-[2]" />
                    </div>
                    <p className="font-bold text-base text-[#111827]">
                      No dashboard components or sections found
                    </p>
                    <p className="text-xs text-black/50 mt-1.5 max-w-sm mx-auto">
                      Try searching for &ldquo;data vault&rdquo;, &ldquo;whatsapp&rdquo;, &ldquo;callbacks&rdquo;, &ldquo;outbound scheduler&rdquo;, &ldquo;telephony matrix&rdquo;, or &ldquo;maya&rdquo;.
                    </p>
                  </div>
                ) : (
                  searchResults.map((item, index) => {
                    const Icon = getSearchIcon(item.iconName);
                    const isSelected = index === selectedIndex;
                    const theming = getItemTheming(item);

                    return (
                      <button
                        key={item.id}
                        data-search-item
                        onClick={() => handleSelectLink(item)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full flex items-center justify-between gap-3.5 px-4 py-3 rounded-2xl transition-all text-left group cursor-pointer border ${
                          isSelected
                            ? "bg-white border-black/20 shadow-[0_6px_24px_rgba(0,0,0,0.08)] scale-[1.008] z-10"
                            : "bg-white/80 hover:bg-white border-black/[0.06] hover:border-black/15 shadow-2xs"
                        }`}
                      >
                        {/* Left: Icon Squircle */}
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-200 ${theming.iconBg} ${
                            isSelected ? "scale-105 shadow-xs" : ""
                          }`}
                        >
                          <Icon className="w-4 h-4 stroke-[2.2]" />
                        </div>

                        {/* Center: Info Column (Fixed flex-1 min-w-0, no chaotic wrapping) */}
                        <div className="flex-1 min-w-0">
                          {/* Line 1: Name, Code Tag, Badge, Section */}
                          <div className="flex items-center gap-2 flex-nowrap overflow-hidden">
                            <span className="font-bold text-xs sm:text-[13.5px] text-[#111827] tracking-tight truncate">
                              {item.name}
                            </span>

                            <span className="hidden sm:inline-flex shrink-0 px-2 py-0.5 rounded-md bg-black/[0.04] text-[10.5px] font-mono font-medium text-black/55 border border-black/[0.06]">
                              &lt;{item.componentName} /&gt;
                            </span>

                            <span
                              className={`shrink-0 px-2 py-0.5 rounded-full text-[9.5px] font-bold border uppercase tracking-wider ${theming.badgeBg} ${theming.badgeText} ${theming.badgeBorder}`}
                            >
                              {item.badge || item.category}
                            </span>

                            <span className="hidden md:inline-block shrink-0 text-[10.5px] font-semibold text-black/40">
                              in {item.section}
                            </span>
                          </div>

                          {/* Line 2: Description snippet */}
                          <p className="text-[11.5px] text-black/55 group-hover:text-black/80 mt-1 line-clamp-1 leading-tight">
                            {item.description}
                          </p>
                        </div>

                        {/* Right: Action Pill & Return Keycap */}
                        <div className="flex items-center gap-2 shrink-0">
                          {item.actionHint && (
                            <span
                              className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl border transition-all ${
                                isSelected
                                  ? "bg-[#18181B] text-white border-[#18181B] shadow-xs"
                                  : `${theming.actionBg} ${theming.actionText} ${theming.actionBorder}`
                              }`}
                            >
                              <span>{item.actionHint}</span>
                              <CornerDownLeft className="w-3 h-3 opacity-70" />
                            </span>
                          )}

                          <div
                            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all border ${
                              isSelected
                                ? "bg-[#18181B] text-white border-[#18181B] shadow-2xs"
                                : "bg-black/[0.03] text-black/40 border-black/[0.05] group-hover:text-black group-hover:bg-black/[0.06]"
                            }`}
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Bottom Keyboard Navigation Hints Bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-[#FAF6EE] via-white to-[#FAF6EE] border-t border-black/[0.07] text-[11px] font-medium text-black/60 shrink-0">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.06)] font-mono font-bold text-[10px] text-black/80">
                      &uarr;&darr;
                    </kbd>
                    <span className="text-black/60">navigate</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.06)] font-mono font-bold text-[10px] text-black/80">
                      &crarr;
                    </kbd>
                    <span className="text-black/60">open</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.06)] font-mono font-bold text-[10px] text-black/80">
                      esc
                    </kbd>
                    <span className="text-black/60">close</span>
                  </span>
                </div>

                <div className="text-[11px] font-bold text-[#16856B] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#16856B] animate-pulse shadow-[0_0_8px_rgba(22,133,107,0.5)]" />
                  <span>Interactive Navigation Active &bull; 46 Components</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PaletteProvider>
  );
}
