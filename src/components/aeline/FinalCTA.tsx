"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

interface FinalCTAProps {
  onOpenDemo?: () => void;
}

export default function FinalCTA({ onOpenDemo }: FinalCTAProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="w-full p-4 sm:p-6 lg:p-8 bg-white">
      <div className="max-w-[1360px] mx-auto bg-[#121316] text-white rounded-[32px] sm:rounded-[44px] p-8 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-sky-500/20 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#cdfb56]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#cdfb56] text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#cdfb56]" />
            TRUSTED BY 120+ UNIVERSITIES NATIONWIDE
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            We combine institutional insight with artificial intelligence
          </h2>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-10 font-normal">
            Never miss an admission inquiry again. Equip your campus with 24/7 voice intelligence, zero hold times, and seamless human escalation for this upcoming intake cycle.
          </p>

          {/* Institutional Briefing Form */}
          <div className="w-full max-w-md mx-auto mb-8">
            {subscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 p-4 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" />
                Thank you! Your institutional briefing packet is on its way.
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-2.5 bg-white/10 p-1.5 rounded-full border border-white/15 backdrop-blur-md shadow-lg"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your university (.edu) email"
                  className="w-full bg-transparent px-5 py-3 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#cdfb56] hover:bg-[#bef03f] text-black text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200 cursor-pointer shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>SCHEDULE A CAMPUS PILOT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="#pricing"
              className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all border border-white/15 cursor-pointer"
            >
              VIEW CAMPUS PLANS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
