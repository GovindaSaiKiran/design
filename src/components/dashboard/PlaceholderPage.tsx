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
    <div className="space-y-6 select-none max-w-4xl">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              {eyebrow}
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-950 bg-[#cdfb56]/30 px-2 py-0.5 rounded-full border border-[#cdfb56]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926]" />
              Dedicated Workspace
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>

        {primaryActionLabel && (
          <button
            className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-lg border border-[#bceb42] shadow-xs hover:shadow transition-all self-start sm:self-auto shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{primaryActionLabel}</span>
          </button>
        )}
      </div>

      {/* Main Folder-Style Workspace Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Folder Tab Header Area */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/70 border-b border-slate-100 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#cdfb56] text-slate-950 border border-[#bceb42] flex items-center justify-center font-bold text-xs shadow-2xs">
              <Folder className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block leading-none">
                {title} FOLDER
              </span>
              <span className="text-[10px] text-slate-500 font-normal">
                {purpose}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold bg-[#cdfb56] text-slate-950 px-2.5 py-0.5 rounded border border-[#bceb42]">
              {phase}
            </span>
          </div>
        </div>

        {/* Interior Workspace Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {highlights.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                Workspace Capabilities & Architecture
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-[#cdfb56] hover:bg-[#f7fee7]/30 transition-all text-xs text-slate-700 shadow-2xs group"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#8ac926] mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="leading-relaxed font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Action Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 font-bold text-slate-900 hover:bg-[#cdfb56] px-3.5 py-2 rounded-xl border border-slate-200 bg-white transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Workspace Home</span>
            </Link>
            <span className="text-[11px] text-slate-500 font-medium">
              Apex Engineering College • Production Tenant
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
