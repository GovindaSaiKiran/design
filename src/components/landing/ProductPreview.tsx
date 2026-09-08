"use client";

import React, { useState } from "react";
import { Sparkles, Phone, UserCheck, TrendingUp, Clock, Search, Filter, ShieldCheck, ArrowUpRight, BarChart3, Users, ChevronRight } from "lucide-react";
import SceneContainer from "../three/SceneContainer";
import MiniMayaCore from "../three/MiniMayaCore";
import { mockCalls } from "@/data/mock/calls";
import { mockLeads } from "@/data/mock/leads";
import { soundSynth } from "@/lib/audio-synth";

export default function ProductPreview() {
  const [activeTab, setActiveTab] = useState<"calls" | "leads">("calls");

  return (
    <section id="product" className="py-20 md:py-32 bg-[#fffdf5] border-b-3 border-black relative bg-neo-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-[#00f0ff] text-black border-2 border-black text-xs font-space font-black mb-4 shadow-[3px_3px_0px_#000] rotate-[-1deg]">
            <Sparkles className="w-3.5 h-3.5" />
            ADMISSIONS COMMAND CENTER
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight">
            One place to understand <br className="hidden sm:inline" />
            <span className="bg-[#ffe600] text-black px-3 py-0.5 border-2 border-black shadow-[4px_4px_0px_#000] inline-block font-serif-editorial italic font-normal mt-2 rotate-1">
              every admission conversation.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-800 leading-relaxed font-sans font-medium">
            Gain immediate visibility into real-time campus call traffic, student qualification scores, sentiment analysis, and enrollment conversion velocity.
          </p>
        </div>

        {/* Mock SaaS Dashboard Preview Window in Neo-Brutal Style */}
        <div className="mt-14 max-w-6xl mx-auto bg-white rounded-3xl border-4 border-black shadow-[10px_10px_0px_#000] overflow-hidden">
          {/* Dashboard Window Header / Chrome */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#ffe600] border-b-3 border-black">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ff53cd] border border-black inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-white border border-black inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#a3e635] border border-black inline-block" />
              <span className="ml-3 text-xs font-mono text-black font-black hidden sm:inline">
                https://app.eduvoice.ai/telephony/live-console
              </span>
            </div>

            {/* Sub-navigation tabs in dashboard */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] font-space">
              <button
                onClick={() => {
                  soundSynth.playClick();
                  setActiveTab("calls");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeTab === "calls"
                    ? "bg-black text-[#ffe600]"
                    : "text-black hover:bg-[#ffe600]"
                }`}
              >
                Live Calls Feed
              </button>
              <button
                onClick={() => {
                  soundSynth.playClick();
                  setActiveTab("leads");
                }}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  activeTab === "leads"
                    ? "bg-black text-[#ffe600]"
                    : "text-black hover:bg-[#ffe600]"
                }`}
              >
                Qualified Leads
              </button>
            </div>
          </div>

          {/* Dashboard Main Workspace */}
          <div className="p-4 sm:p-6 bg-[#fffdf5] text-black space-y-6">
            {/* Top KPI Metrics Row with Neo-Brutal Colors */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#00f0ff] p-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000]">
                <div className="flex items-center justify-between text-xs font-space text-black font-black">
                  <span>Total Calls</span>
                  <Phone className="w-4 h-4" />
                </div>
                <div className="font-syne text-2xl sm:text-3xl font-black text-black mt-2">1,248</div>
                <div className="text-[11px] font-space text-black font-bold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +24% vs last week
                </div>
              </div>

              <div className="bg-[#a3e635] p-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000]">
                <div className="flex items-center justify-between text-xs font-space text-black font-black">
                  <span>Qualified Leads</span>
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="font-syne text-2xl sm:text-3xl font-black text-black mt-2">612</div>
                <div className="text-[11px] font-space text-black font-bold flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 49.0% Conversion Rate
                </div>
              </div>

              <div className="bg-[#c084fc] p-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000]">
                <div className="flex items-center justify-between text-xs font-space text-black font-black">
                  <span>Avg Handling</span>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="font-syne text-2xl sm:text-3xl font-black text-black mt-2">2m 45s</div>
                <div className="text-[11px] font-space text-black font-bold mt-1">
                  0s Student Hold Queue
                </div>
              </div>

              {/* Active AI Agent Widget with Mini 3D Core */}
              <div className="bg-black text-white p-4 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#ffe600] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#ffe600] uppercase font-black">
                    ACTIVE AGENT
                  </div>
                  <div className="font-syne text-base font-black text-white mt-1">Maya Counselor</div>
                  <div className="text-[11px] font-space text-[#a3e635] font-bold flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping" />
                    SIP Connected
                  </div>
                </div>
                <div className="w-16 h-16 shrink-0">
                  <SceneContainer cameraPosition={[0, 0, 2.8]} fov={40}>
                    <MiniMayaCore scale={0.9} />
                  </SceneContainer>
                </div>
              </div>
            </div>

            {/* Main Data Feed Table / Cards */}
            {activeTab === "calls" && (
              <div className="bg-white rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] overflow-hidden">
                <div className="px-5 py-3.5 bg-[#ffe600] border-b-2 border-black flex items-center justify-between font-space">
                  <h4 className="font-black text-sm text-black">Recent Admission Calls</h4>
                  <span className="text-xs text-black font-bold">LIVE TELEPHONY FEED</span>
                </div>
                <div className="divide-y-2 divide-slate-100">
                  {mockCalls.map((call) => (
                    <div key={call.id} className="p-4 hover:bg-[#fffdf5] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#00f0ff] border-2 border-black text-black flex items-center justify-center font-bold font-mono shrink-0 shadow-[2px_2px_0px_#000]">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-syne font-black text-black text-sm">{call.callerName || call.callerNumber}</span>
                            <span className="text-slate-600 font-mono font-bold text-[11px]">{call.callerNumber}</span>
                          </div>
                          <span className="text-slate-800 font-bold font-sans">{call.courseInquired}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto font-space">
                        <span className="font-mono font-bold text-black">{call.duration}</span>
                        <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black border border-black ${
                          call.status === "completed"
                            ? "bg-[#a3e635] text-black"
                            : "bg-[#fb923c] text-black"
                        }`}>
                          {call.status === "completed" ? "AI RESOLVED" : "ESCALATED"}
                        </span>
                        <span className="font-black text-black bg-[#ffe600] px-2.5 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                          SCORE {call.qualificationScore}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "leads" && (
              <div className="bg-white rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] overflow-hidden">
                <div className="px-5 py-3.5 bg-[#a3e635] border-b-2 border-black flex items-center justify-between font-space">
                  <h4 className="font-black text-sm text-black">Enriched Student Leads (CRM Ready)</h4>
                  <span className="text-xs text-black font-bold">AUTOMATIC CRM SYNC</span>
                </div>
                <div className="divide-y-2 divide-slate-100">
                  {mockLeads.map((lead) => (
                    <div key={lead.id} className="p-4 hover:bg-[#fffdf5] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#ffe600] border-2 border-black text-black flex items-center justify-center font-syne font-black text-xs shrink-0 shadow-[2px_2px_0px_#000]">
                          {lead.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-syne font-black text-black text-sm">{lead.name}</span>
                            <span className="text-black font-space font-black bg-[#00f0ff] px-2 py-0.5 rounded border border-black text-[10px]">
                              {lead.status}
                            </span>
                          </div>
                          <span className="text-slate-800 font-sans font-medium">{lead.targetCourse} • {lead.phone}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto font-space">
                        {lead.intentTags.map((tag, tIdx) => (
                          <span key={tIdx} className="bg-white text-black border border-black px-2 py-0.5 rounded text-[10px] font-black shadow-[1px_1px_0px_#000]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
