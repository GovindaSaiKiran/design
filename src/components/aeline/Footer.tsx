"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-100 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-16 border-b border-slate-100">
          {/* Col 1: Brand & Bio (2 cols) */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 inline-block">
              <div className="w-7 h-7 relative flex items-center justify-center">
                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                >
                  <path
                    d="M5 26L16 6L21 15.5L13 22L5 26Z"
                    fill="#1682ec"
                  />
                  <path
                    d="M16 6L27 26L19 23L16 16.5L16 6Z"
                    fill="#0ea5e9"
                  />
                  <path
                    d="M13 22L19 23L16 26L13 22Z"
                    fill="#0284c7"
                  />
                </svg>
              </div>
              <span className="text-slate-950 font-bold text-xl tracking-tight flex items-center gap-1">
                EduVoice <span className="text-sky-600 text-xs font-black">AI</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mb-6 font-normal">
              Autonomous AI Admission Counselor for Higher Education. Answering prospective student calls 24/7 with verified institutional grounding, zero hold times, and warm dean escalation.
            </p>

            <div className="flex items-center gap-3">
              {["LinkedIn", "HigherEd Tech", "GitHub", "FERPA Whitepaper"].map((social, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <div className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-4">
              Solutions
            </div>
            <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
              <li>
                <a href="#capabilities" className="hover:text-slate-950 transition-colors">
                  24/7 Voice Telephony
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-slate-950 transition-colors">
                  Institutional Knowledge RAG
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-slate-950 transition-colors">
                  Smart Human Handoff
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-slate-950 transition-colors">
                  Admissions ROI Calculator
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-slate-950 transition-colors">
                  Meet Maya Voice Core
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Campuses */}
          <div>
            <div className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-4">
              Campuses
            </div>
            <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
              <li>
                <a href="#about" className="hover:text-slate-950 transition-colors">
                  About Edu-Voice-Ai
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-slate-950 transition-colors">
                  Dean Testimonials
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-slate-950 transition-colors">
                  Institutional Pricing
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-slate-950 transition-colors">
                  Admissions Case Studies
                </a>
              </li>
              <li>
                <span className="text-slate-400 cursor-pointer hover:text-slate-950 transition-colors">
                  Accreditation Alignment
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Compliance & Security */}
          <div>
            <div className="text-xs font-bold text-slate-950 uppercase tracking-wider mb-4">
              Compliance
            </div>
            <ul className="space-y-2.5 text-xs text-slate-500 font-medium">
              <li>
                <span className="text-slate-500 cursor-pointer hover:text-slate-950 transition-colors">
                  FERPA Compliance
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-pointer hover:text-slate-950 transition-colors">
                  SOC 2 Type II Certified
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-pointer hover:text-slate-950 transition-colors">
                  HIPAA Health Center Alignment
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-pointer hover:text-slate-950 transition-colors">
                  Student Data Privacy Agreement
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-pointer hover:text-slate-950 transition-colors">
                  Telephony SLA (99.99% Uptime)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Edu-Voice-Ai Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-600 transition-colors cursor-pointer">
              Student Privacy
            </span>
            <span className="hover:text-slate-600 transition-colors cursor-pointer">
              Campus Terms
            </span>
            <span className="hover:text-slate-600 transition-colors cursor-pointer">
              Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
