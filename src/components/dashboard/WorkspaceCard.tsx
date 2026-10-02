"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

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
  // Status indicator dot colors
  const getStatusDot = () => {
    switch (statusType) {
      case "live":
        return "bg-[#8ac926] animate-pulse";
      case "running":
        return "bg-[#8ac926]";
      case "ready":
        return "bg-emerald-500";
      default:
        return "bg-slate-400";
    }
  };

  const getStatusBadgeStyle = () => {
    switch (statusType) {
      case "live":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "running":
        return "bg-[#f7fee7] text-slate-800 border-[#cdfb56]";
      case "ready":
        return "bg-slate-50 text-slate-700 border-slate-200/90";
      default:
        return "bg-white text-slate-600 border-slate-200/80";
    }
  };

  const content = (
    <>
      {/* Top Folder Tab Header */}
      <div className="relative flex items-center justify-between px-4 py-3 bg-slate-50/80 border-b border-slate-100 rounded-t-2xl group-hover:bg-[#f7fee7]/30 transition-colors">
        {/* Workspace Title & Icon */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-all">
            <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
          </div>
          <span className="font-bold text-xs uppercase tracking-wider text-slate-900 truncate">
            {name}
          </span>
        </div>

        {/* Small Status Indicator */}
        <div
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold shrink-0 ${getStatusBadgeStyle()}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusDot()}`} />
          <span className="truncate max-w-[120px]">{status}</span>
        </div>
      </div>

      {/* Main Workspace Body Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* One-Line Explanation */}
        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Primary Metric Block */}
        <div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-baseline gap-2">
            <span>{metric}</span>
            {tag && (
              <span className="text-[10px] font-bold text-slate-950 bg-[#cdfb56]/40 px-1.5 py-0.2 rounded border border-[#cdfb56]/70">
                {tag}
              </span>
            )}
          </div>
          {metricLabel && (
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              {metricLabel}
            </span>
          )}
        </div>

        {/* Action Link Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-slate-950 transition-colors">
          <span className="group-hover:underline underline-offset-2">
            {actionLabel}
          </span>
          <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#cdfb56] flex items-center justify-center transition-all group-hover:scale-105">
            <ArrowRight className="w-3 h-3 text-slate-700 group-hover:text-slate-950 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </>
  );

  const containerClasses =
    "group relative flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left overflow-hidden cursor-pointer w-full";

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
