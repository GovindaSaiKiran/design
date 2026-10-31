"use client";

import React from "react";
import Link from "next/link";

interface FooterProps {
  onOpenLogin?: () => void;
  onOpenSignUp?: () => void;
}

export default function Footer({ onOpenLogin, onOpenSignUp }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FFFFFF] text-[#111111] overflow-hidden">
      <div className="w-full max-w-[1800px] mx-auto px-3 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12">
        {/* ========================================================================= */}
        {/* A. Minimal Upper Footer Navigation                                       */}
        {/* ========================================================================= */}
        <nav
          className="flex flex-col sm:flex-row items-center justify-between gap-y-4 gap-x-6 pb-10 sm:pb-16 lg:pb-20 text-[13px] sm:text-sm font-medium text-[#50525A]"
          aria-label="Footer Navigation"
        >
          {/* Primary Navigation Links */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-wrap justify-center sm:justify-start">
            <a
              href="#capabilities"
              className="hover:text-[#111111] transition-colors duration-150"
            >
              Product
            </a>
            <a
              href="#work-agents"
              className="hover:text-[#111111] transition-colors duration-150"
            >
              AI Agents
            </a>
            <a
              href="#about"
              className="hover:text-[#111111] transition-colors duration-150"
            >
              Use Cases
            </a>
            <a
              href="#pricing"
              className="hover:text-[#111111] transition-colors duration-150"
            >
              Pricing
            </a>
            <Link
              href="/dashboard"
              className="hover:text-[#111111] transition-colors duration-150"
            >
              Documentation
            </Link>
          </div>

          {/* Secondary / Action Links */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0 whitespace-nowrap">
            {onOpenLogin && (
              <button
                type="button"
                onClick={onOpenLogin}
                className="hover:text-[#111111] transition-colors duration-150 cursor-pointer"
              >
                Log In
              </button>
            )}
            {onOpenSignUp && (
              <button
                type="button"
                onClick={onOpenSignUp}
                className="font-bold text-slate-900 hover:text-black transition-colors duration-150 cursor-pointer"
              >
                Sign Up
              </button>
            )}
            <Link
              href="/dashboard"
              className="font-semibold text-[#111111] hover:opacity-75 transition-opacity duration-150 inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Command Center</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>

        {/* ========================================================================= */}
        {/* B. Oversized Swaram Wordmark (Edge-to-Edge Span)                          */}
        {/* ========================================================================= */}
        <div className="w-full flex items-center justify-center py-2 sm:py-6 lg:py-10 select-none overflow-hidden">
          <h2 className="sr-only">Swaram</h2>
          <span
            className="w-full text-center font-sans font-black text-[#111111] tracking-[-0.045em] leading-[0.78] block text-[clamp(3.5rem,24.8vw,28.5rem)] whitespace-nowrap pointer-events-auto"
            style={{
              fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
            }}
          >
            Swaram
          </span>
        </div>

        {/* ========================================================================= */}
        {/* C. Thin Horizontal Divider                                               */}
        {/* ========================================================================= */}
        <div
          className="w-full h-px bg-[#E8E8E8] mt-8 sm:mt-12 lg:mt-16 mb-6 sm:mb-8"
          role="separator"
        />

        {/* ========================================================================= */}
        {/* D. Bottom Information Row                                                */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-[13px] text-[#50525A]">
          {/* Left: Brand Identification & Copyright */}
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-[#111111] tracking-tight">Swaram</span>
            <span className="text-[#888888]">&bull;</span>
            <span>&copy; {currentYear} Swaram Inc. All rights reserved.</span>
          </div>

          {/* Right: Regulatory and Legal Links */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center sm:justify-end">
            <Link
              href="/dashboard"
              className="hover:text-[#111111] transition-colors duration-150"
            >
              Privacy Policy
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-[#111111] transition-colors duration-150"
            >
              Terms of Service
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-[#111111] transition-colors duration-150"
            >
              DPDP Compliance
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-[#111111] transition-colors duration-150"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
