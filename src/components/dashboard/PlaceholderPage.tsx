"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Clock, CheckCircle2, Folder, ExternalLink } from "lucide-react";

interface PlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
  purpose: string;
  primaryActionLabel?: string;
  phase: string;
  highlights?: string[];
}

export default function PlaceholderPage({
  eyebrow,
  title,
  description,
  purpose,
  primaryActionLabel,
  phase,
  highlights = [],
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6 select-none max-w-4xl text-[#1A1A1A]">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider text-black/50 uppercase">
              {eyebrow}
            </span>
            <span className="text-black/20">•</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#0D593F] bg-[#C1F2D5] px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16856B]" />
              Dedicated Workspace
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-1">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-black/60 mt-1 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {primaryActionLabel && (
          <button
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-xs transition-all self-start sm:self-auto shrink-0 active:translate-y-px"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{primaryActionLabel}</span>
          </button>
        )}
      </div>

      {/* Main Folder-Style Workspace Card */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] shadow-2xs overflow-hidden">
        {/* Folder Tab Header Area */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FBF7ED]/60 border-b border-black/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#D9C2FA]/40 text-[#1A1A1A] border border-[#D9C2FA]/60 flex items-center justify-center font-bold text-xs shadow-2xs">
              <Folder className="w-4 h-4 stroke-[2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-wider block leading-none">
                {title} FOLDER
              </span>
              <span className="text-[11px] text-black/50 font-normal">
                {purpose}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold bg-[#FFD9A0]/50 text-[#8C4A00] px-3 py-1 rounded-full border border-[#FFD9A0]">
              {phase}
            </span>
          </div>
        </div>

        {/* Interior Workspace Body */}
        <div className="p-6 space-y-5">
          {highlights.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider block">
                Workspace Capabilities & Architecture
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-[20px] border border-black/[0.06] bg-[#FBF7ED]/40 hover:bg-[#FBF7ED] transition-all text-xs text-[#1A1A1A] shadow-2xs group"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#16856B] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="leading-relaxed font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Action Footer */}
          <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs text-black/50">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 font-semibold text-[#1A1A1A] hover:bg-[#FBF7ED] px-4 py-2 rounded-full border border-black/[0.08] bg-white transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Workspace Home</span>
            </Link>
            <span className="text-[11px] text-black/50 font-medium">
              Swaram AI • Active Workspace
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
