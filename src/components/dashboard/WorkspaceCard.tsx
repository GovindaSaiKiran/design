"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface WorkspaceCardProps {
  name: string;
  href?: string;
  onClick?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  metric: string;
  metricLabel?: string;
  status: string;
  statusType?: "live" | "running" | "ready" | "neutral";
  actionLabel?: string;
  tag?: string;
}

export default function WorkspaceCard({
  name,
  href,
  onClick,
  icon: Icon,
  description,
  metric,
  metricLabel,
  status,
  statusType = "neutral",
  actionLabel = "Open workspace →",
  tag,
}: WorkspaceCardProps) {
  const content = (
    <>
      {/* Top Console Channel Header */}
      <div className="relative flex items-center justify-between px-3.5 py-2.5 bg-[#121215] border-b border-[#27272A] group-hover:bg-[#18181B] transition-colors">
        {/* Workspace Title & Icon */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-[2px] bg-white text-black flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-all">
            <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <span className="font-display font-bold text-xs uppercase tracking-wider text-white truncate">
            {name}
          </span>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[1px] border border-[#27272A] bg-[#09090B] text-[10px] font-telemetry font-bold text-white shrink-0">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-white animate-pulse" />
          <span className="truncate max-w-[120px]">{status}</span>
        </div>
      </div>

      {/* Main Workspace Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#09090B]">
        {/* One-Line Explanation */}
        <p className="text-xs text-[#A1A1AA] leading-relaxed line-clamp-2 font-sans">
          {description}
        </p>

        {/* Primary Metric Block */}
        <div>
          <div className="text-xl sm:text-2xl font-black font-telemetry tracking-tight text-white flex items-baseline gap-2">
            <span>{metric}</span>
            {tag && (
              <span className="text-[10px] font-telemetry font-bold text-black bg-white px-1.5 py-0.2 rounded-[1px]">
                {tag}
              </span>
            )}
          </div>
          {metricLabel && (
            <span className="text-[11px] text-[#71717A] font-telemetry font-medium block mt-0.5 uppercase">
              {metricLabel}
            </span>
          )}
        </div>

        {/* Action Link Footer */}
        <div className="pt-2.5 border-t border-[#27272A] flex items-center justify-between text-xs font-display font-bold text-[#A1A1AA] group-hover:text-white transition-colors">
          <span className="group-hover:underline underline-offset-2">
            {actionLabel}
          </span>
          <div className="w-5 h-5 rounded-[1px] bg-[#18181B] group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all">
            <ArrowRight className="w-3 h-3 text-[#A1A1AA] group-hover:text-black transform group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </>
  );

  const containerClasses =
    "group relative flex flex-col justify-between bg-[#09090B] rounded-[2px] border border-[#27272A] hover:border-white transition-all duration-150 text-left overflow-hidden cursor-pointer w-full";

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={containerClasses}>
        {content}
      </button>
    );
  }

  return <div className={containerClasses}>{content}</div>;
}
