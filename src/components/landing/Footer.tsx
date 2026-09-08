"use client";

import React from "react";
import { Sparkles, PhoneCall, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#fffdf5] text-black text-xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#ffe600] border-2 border-black flex items-center justify-center text-black font-syne font-black text-base shadow-[3px_3px_0px_#000]">
                EV
              </div>
              <span className="font-syne font-black text-black tracking-tight text-xl">
                EDU<span className="text-[#ff53cd] font-black">•</span>VOICE<span className="bg-[#00f0ff] text-black border border-black px-1.5 py-0.2 rounded text-[11px] font-space font-extrabold ml-1 shadow-[1px_1px_0px_#000]">AI</span>
              </span>
            </div>
            <p className="text-slate-800 max-w-sm leading-relaxed text-xs font-medium">
              Spatial AI voice counselors for universities, colleges, and educational institutions worldwide. Transform every phone inquiry into an enrolled student.
            </p>
            <div className="flex items-center gap-3 text-black text-xs pt-2 font-space font-black">
              <span className="bg-[#a3e635] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000] flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> FERPA COMPLIANT
              </span>
              <span>•</span>
              <span className="bg-[#c084fc] px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                ISO 27001
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3 font-space">
            <h4 className="font-black text-black uppercase tracking-wider text-[11px]">Product</h4>
            <ul className="space-y-2 text-slate-800 font-bold">
              <li><a href="#ai-agent" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">AI Agent (Maya)</a></li>
              <li><a href="#intelligence" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Call Intelligence</a></li>
              <li><a href="#product" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Leads & CRM</a></li>
              <li><a href="#knowledge" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Knowledge RAG</a></li>
              <li><a href="#analytics" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Analytics & Insights</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3 font-space">
            <h4 className="font-black text-black uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2 text-slate-800 font-bold">
              <li><a href="#" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">About Us</a></li>
              <li><a href="#" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Contact</a></li>
              <li><a href="#" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Careers</a></li>
              <li><a href="#" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Partnerships</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3 font-space">
            <h4 className="font-black text-black uppercase tracking-wider text-[11px]">Resources</h4>
            <ul className="space-y-2 text-slate-800 font-bold">
              <li><a href="#" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Documentation</a></li>
              <li><a href="#" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Privacy Policy</a></li>
              <li><a href="#" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Terms of Service</a></li>
              <li><a href="#" className="hover:bg-[#ffe600] hover:px-1 rounded transition-all">Security Overview</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-black font-space font-bold">
          <p>© 2026 Edu-Voice-Ai Inc. All rights reserved.</p>
          <p className="text-slate-700 text-[11px]">Engineered for bold educational leadership & modern admissions.</p>
        </div>
      </div>
    </footer>
  );
}
