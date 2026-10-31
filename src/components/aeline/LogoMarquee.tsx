"use client";

import React from "react";
import {
  Bot,
  Languages,
  PhoneCall,
  Bell,
  Megaphone,
  TrendingUp,
  MessageSquare,
  MessageCircle,
  Clock,
  BarChart3,
} from "lucide-react";

interface CapabilityItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const capabilities: CapabilityItem[] = [
  { label: "AI Voice Agents", icon: Bot },
  { label: "Multilingual Conversations", icon: Languages },
  { label: "Bulk Calling", icon: PhoneCall },
  { label: "Public Alerts", icon: Bell },
  { label: "Awareness Campaigns", icon: Megaphone },
  { label: "Business Promotions", icon: TrendingUp },
  { label: "Customer Notifications", icon: MessageSquare },
  { label: "WhatsApp Automation", icon: MessageCircle },
  { label: "Smart Follow-ups", icon: Clock },
  { label: "Conversation Intelligence", icon: BarChart3 },
];

export default function LogoMarquee() {
  return (
    <section
      aria-label="Swaram AI Capabilities"
      className="w-full max-w-full bg-white border-y border-slate-100 py-5 sm:py-6 overflow-hidden relative select-none"
    >
      {/* Subtle fade edges to blend marquee smoothly into page background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10"
      />

      {/* Marquee Track with Reduced Motion Accessibility */}
      <div className="flex animate-marquee motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3 items-center hover:[animation-play-state:paused] w-max motion-reduce:w-full">
        {/* Primary Set */}
        <div className="flex items-center shrink-0">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={`cap-a-${idx}`}>
                <div className="flex items-center gap-2.5 px-6 sm:px-8 text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap">
                  <Icon className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                  <span className="text-xs sm:text-[13px] font-semibold tracking-wide text-slate-700">
                    {item.label}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="w-1 h-1 rounded-full bg-slate-300 shrink-0"
                />
              </React.Fragment>
            );
          })}
        </div>

        {/* Duplicated Set for Seamless Continuous Looping (Hidden from screen readers to prevent redundant announcements) */}
        <div
          aria-hidden="true"
          className="flex items-center shrink-0 motion-reduce:hidden"
        >
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={`cap-b-${idx}`}>
                <div className="flex items-center gap-2.5 px-6 sm:px-8 text-slate-700 hover:text-slate-950 transition-colors whitespace-nowrap">
                  <Icon className="w-4 h-4 text-slate-400 stroke-[1.8] shrink-0" />
                  <span className="text-xs sm:text-[13px] font-semibold tracking-wide text-slate-700">
                    {item.label}
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="w-1 h-1 rounded-full bg-slate-300 shrink-0"
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
