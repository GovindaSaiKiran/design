"use client";

import React, { useEffect, useState, useTransition } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon | React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  id?: string;
  badge?: string;
}

export interface NavBarProps {
  items: NavItem[];
  className?: string;
  activeTab?: string;
  onTabChange?: (item: NavItem) => void;
  onItemClick?: (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => void;
  children?: React.ReactNode;
}

/**
 * Tubelight Navbar Component
 * 
 * Floating navigation bar with an animated "tubelight" lamp indicator that slides
 * smoothly across active navigation items using Framer Motion spring physics.
 * 
 * Features:
 * - Active route & hash detection (direct URL, popstate, scrollspy, and pathname)
 * - Accessible ARIA attributes & screen-reader labels
 * - Spring-physics animated lamp indicator with layered ambient glow
 * - Respects prefers-reduced-motion
 * - Responsive desktop text labels & compact mobile icon-first layout
 */
export function NavBar({
  items,
  className,
  activeTab: controlledActiveTab,
  onTabChange,
  onItemClick,
  children,
}: NavBarProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [internalActiveTab, setInternalActiveTab] = useState<string>(() => {
    return items[0]?.name || "";
  });
  const [, startTransition] = useTransition();

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  // Sync active route automatically from current pathname & hash
  useEffect(() => {
    if (controlledActiveTab !== undefined) return;

    const determineActiveItem = () => {
      if (typeof window === "undefined") return;

      const currentPath = window.location.pathname;
      const currentHash = window.location.hash;

      // 1. Check exact hash matches first if currently on landing page
      if (currentHash) {
        const hashMatch = items.find(
          (item) => item.url === currentHash || item.url.endsWith(currentHash)
        );
        if (hashMatch) {
          setInternalActiveTab(hashMatch.name);
          return;
        }
      }

      // 2. Check pathname matches (supports nested routes e.g. /dashboard/analytics)
      const pathMatches = items.filter((item) => {
        if (item.url.startsWith("#")) return false;
        if (item.url === "/") return currentPath === "/";
        return currentPath === item.url || currentPath.startsWith(item.url + "/");
      });

      if (pathMatches.length > 0) {
        // Pick the most specific match
        const bestMatch = pathMatches.sort((a, b) => b.url.length - a.url.length)[0];
        setInternalActiveTab(bestMatch.name);
        return;
      }

      // 3. Fallback: if at root "/" with no hash, pick the first item that points to "/" or root
      if (currentPath === "/") {
        const rootItem = items.find((item) => item.url === "/" || item.id === "overview");
        if (rootItem) {
          setInternalActiveTab(rootItem.name);
        }
      }
    };

    determineActiveItem();

    // Listen to browser forward/back history events
    window.addEventListener("popstate", determineActiveItem);
    window.addEventListener("hashchange", determineActiveItem);

    return () => {
      window.removeEventListener("popstate", determineActiveItem);
      window.removeEventListener("hashchange", determineActiveItem);
    };
  }, [pathname, items, controlledActiveTab]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    startTransition(() => {
      setInternalActiveTab(item.name);
    });

    if (onTabChange) {
      onTabChange(item);
    }

    if (onItemClick) {
      onItemClick(e, item);
      return;
    }

    // Default smooth scroll for in-page anchors
    if (item.url.startsWith("#")) {
      e.preventDefault();
      const targetId = item.url.replace("#", "");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navHeight = 90;
        const targetPos =
          targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
        if (window.history.pushState) {
          window.history.pushState(null, "", item.url);
        }
      }
    } else if (item.url === "/" && window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.history.pushState) {
        window.history.pushState(null, "", "/");
      }
    }
  };

  return (
    <nav
      role="navigation"
      aria-label="Main Navigation"
      className={cn(
        "flex items-center gap-1 sm:gap-1.5 p-1 rounded-full",
        "bg-white/90 backdrop-blur-xl",
        "border border-slate-200/90",
        "shadow-xs",
        className
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          activeTab === item.name ||
          activeTab === item.id ||
          (item.id && activeTab.toLowerCase() === item.id.toLowerCase()) ||
          activeTab.toLowerCase() === item.name.toLowerCase();

        return (
          <Link
            key={item.name}
            href={item.url}
            onClick={(e) => handleLinkClick(e, item)}
            aria-current={isActive ? "page" : undefined}
            aria-label={item.name}
            className={cn(
              "relative cursor-pointer text-xs font-semibold px-3 sm:px-3.5 py-1.5 rounded-full transition-colors select-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 dark:focus-visible:ring-white/30",
              "flex items-center gap-1.5 whitespace-nowrap",
              isActive
                ? "text-slate-950 dark:text-white font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
            )}
          >
            {/* Mobile Icon */}
            <span className="sm:hidden flex items-center justify-center">
              <Icon size={16} strokeWidth={2.2} />
            </span>

            {/* Desktop Label + Icon */}
            <span className="hidden sm:flex items-center gap-1.5">
              <Icon size={14} strokeWidth={2.2} className="opacity-80" />
              <span>{item.name}</span>
            </span>

            {/* Optional Small Status Badge */}
            {item.badge && (
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {item.badge}
              </span>
            )}

            {/* Tubelight Animated Lamp Indicator */}
            {isActive && (
              <motion.div
                layoutId="lamp"
                className="absolute inset-0 w-full bg-slate-100/90 rounded-full -z-10 shadow-2xs border border-slate-200/90"
                initial={false}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }
                }
              >
                {/* Horizontal Tubelight Filament Bar at Top of Active Pill */}
                <div className="absolute -top-[1.5px] left-1/2 -translate-x-1/2 w-5 h-[1.5px] bg-slate-900 rounded-full pointer-events-none">
                  <div className="absolute -top-[1px] -left-1 w-7 h-1 bg-slate-900/15 rounded-full blur-[1px] pointer-events-none" />
                </div>
              </motion.div>
            )}
          </Link>
        );
      })}

      {/* Auxiliary Child Elements (e.g., Solutions Dropdown) */}
      {children}
    </nav>
  );
}

// Alias export for alternate naming convention
export { NavBar as TubelightNavbar };
export default NavBar;
