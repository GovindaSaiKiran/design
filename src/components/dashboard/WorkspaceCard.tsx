"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MoreHorizontal, Calendar } from "lucide-react";

export interface WorkspaceCardProps {
  name: string;
  href?: string;
  onClick?: () => void;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  metric: string;
  metricLabel?: string;
  status: string;
  statusType?: "live" | "running" | "ready" | "neutral" | "warning";
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
  actionLabel = "Open section →",
  tag,
}: WorkspaceCardProps) {
  let tagBg = "bg-[#BCD0F5] text-[#1E3A8A]";
  if (tag === "Commercial" || statusType === "warning") {
    tagBg = "bg-[#FFA98B] text-[#7C2D12]";
  } else if (tag === "Design" || statusType === "running") {
    tagBg = "bg-[#D9C2FA] text-[#4C1D95]";
  } else if (tag === "Internal Tasks" || statusType === "ready") {
    tagBg = "bg-[#FFD9A0] text-[#78350F]";
  }

  const content = (
    <div className="flex flex-col justify-between h-full space-y-3.5">
      {/* Top Tag & More Menu */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${tagBg}`}>
            {tag || "Operations"}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#FAF0D7] text-[#78350F]">
            {status}
          </span>
        </div>

        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="w-6 h-6 rounded-full hover:bg-black/5 flex items-center justify-center text-black/40 hover:text-black transition-colors cursor-pointer"
        >
          <MoreHorizontal className="w-4 h-4" />
        </span>
      </div>

      {/* Title & Description */}
      <div className="space-y-1">
        <h4 className="font-bold text-[15px] text-[#1A1A1A] tracking-tight leading-snug">
          {name}
        </h4>
        <p className="text-xs text-black/60 leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>

      {/* Date Chip */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-black/[0.08] text-[11px] font-medium text-black/60 self-start">
        <Calendar className="w-3 h-3 text-black/40" />
        <span>Today</span>
      </div>

      {/* Bottom Metric & Action */}
      <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between">
        <div>
          <span className="text-xl font-bold tracking-tight text-[#1A1A1A]">
            {metric}
          </span>
          {metricLabel && (
            <span className="text-[11px] text-black/50 block -mt-0.5 font-medium">
              {metricLabel}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-[#1A1A1A] group-hover:translate-x-0.5 transition-transform">
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );

  const containerClasses =
    "group pastel-card p-4 sm:p-5 flex flex-col justify-between cursor-pointer text-left w-full";

  if (href) {
    return (
      <Link href={href} className={containerClasses}>
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        className={containerClasses}
      >
        {content}
      </div>
    );
  }

  return <div className={containerClasses}>{content}</div>;
}
