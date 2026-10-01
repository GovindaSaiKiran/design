"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

export default function DashboardFooter() {
  return (
    <footer className="w-full mt-12 pt-8 pb-12 border-t border-neutral-200/90 font-sans select-none text-neutral-600">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        {/* Col 1: Brand & Overview */}
        <div className="space-y-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 relative flex items-center justify-center">
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                <path d="M5 26L16 6L21 15.5L13 22L5 26Z" fill="#0f172a" fillOpacity="0.95" />
                <path d="M16 6L27 26L19 23L16 16.5L16 6Z" fill="#0284c7" fillOpacity="1" />
                <path d="M13 22L19 23L16 26L13 22Z" fill="#38bdf8" fillOpacity="1" />
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight text-neutral-900">
              VoicePilot
            </span>
            <span className="text-[#0d5926] bg-[#cdfb56] text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded-md shadow-xs">
              AI
            </span>
          </div>

          <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
            Autonomous AI Admission Counselor for Higher Education. Answering prospective student calls 24/7 with verified institutional grounding, zero hold times, and warm dean escalation.
          </p>

          <div className="flex items-center gap-3 text-[11px] font-semibold text-neutral-500 pt-1">
            <span>LinkedIn</span>
            <span>•</span>
            <span>HigherEd Tech</span>
            <span>•</span>
            <span>GitHub</span>
            <span>•</span>
            <span>FERPA Whitepaper</span>
          </div>
        </div>

        {/* Col 2: Solutions */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            SOLUTIONS
          </div>
          <ul className="space-y-2 text-xs text-neutral-600">
            <li className="hover:text-neutral-900 cursor-pointer">24/7 Voice Telephony</li>
            <li className="hover:text-neutral-900 cursor-pointer">Institutional Knowledge RAG</li>
            <li className="hover:text-neutral-900 cursor-pointer">Smart Human Handoff</li>
            <li className="hover:text-neutral-900 cursor-pointer">Admissions ROI Calculator</li>
            <li className="hover:text-neutral-900 cursor-pointer">Meet Maya Voice Core</li>
          </ul>
        </div>

        {/* Col 3: Compliance */}
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
            COMPLIANCE
          </div>
          <ul className="space-y-2 text-xs text-neutral-600">
            <li className="flex items-center gap-1.5 hover:text-neutral-900 cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>FERPA Vault Security</span>
            </li>
            <li className="hover:text-neutral-900 cursor-pointer">HIPAA Health Center Alignment</li>
            <li className="hover:text-neutral-900 cursor-pointer">Student Data Privacy Agreement</li>
            <li className="hover:text-neutral-900 cursor-pointer">Telephony SLA (99.99% Uptime)</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-neutral-200/80 text-xs text-neutral-400">
        <div>
          © 2026 Voice Pilot Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-neutral-700 cursor-pointer">Student Privacy</span>
          <span className="hover:text-neutral-700 cursor-pointer">Campus Terms</span>
          <span className="hover:text-neutral-700 cursor-pointer">Security</span>
        </div>
      </div>
    </footer>
  );
}
