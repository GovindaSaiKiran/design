"use client";

import React, { useState } from "react";
import { BarChart3, TrendingUp, Clock, Users, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import { mockAnalytics, weeklyPerformanceMetrics } from "@/data/mock/analytics";
import { soundSynth } from "@/lib/audio-synth";

export default function AnalyticsSection() {
  const [selectedMetricView, setSelectedMetricView] = useState<"hourly" | "topics" | "weekly">("hourly");

  return (
    <section id="analytics" className="py-20 md:py-32 bg-[#fffdf5] border-b-3 border-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg bg-[#ffe600] text-black border-2 border-black text-xs font-space font-black mb-4 shadow-[3px_3px_0px_#000] rotate-1">
            <BarChart3 className="w-3.5 h-3.5" />
            TELEPHONY & ENROLLMENT ANALYTICS
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight">
            See what your conversations <br />
            <span className="bg-[#00f0ff] text-black px-3 py-0.5 border-2 border-black shadow-[4px_4px_0px_#000] inline-block font-serif-editorial italic font-normal mt-2 rotate-[-1deg]">
              are telling you.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-800 leading-relaxed font-sans font-medium">
            Understand student intent trends, identify peak inquiry hours, track counselor handoffs, and optimize your university's recruitment funnel with conversational intelligence.
          </p>
        </div>

        {/* 5 Core Metrics Highlight Bar with Neo-Brutal Color Blocks */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-space">
          <div className="bg-[#ffe600] p-5 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] text-center hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
            <div className="text-xs font-black text-black uppercase">Total Calls</div>
            <div className="font-syne text-3xl sm:text-4xl font-black text-black mt-2">{mockAnalytics.totalCalls}</div>
            <div className="text-[11px] font-black text-black mt-1 bg-white border border-black rounded px-1.5 py-0.5 inline-block">100% Answered</div>
          </div>

          <div className="bg-[#00f0ff] p-5 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] text-center hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
            <div className="text-xs font-black text-black uppercase">Total Minutes</div>
            <div className="font-syne text-3xl sm:text-4xl font-black text-black mt-2">2,680</div>
            <div className="text-[11px] font-black text-black mt-1 bg-white border border-black rounded px-1.5 py-0.5 inline-block">Avg 3m 11s / call</div>
          </div>

          <div className="bg-[#a3e635] p-5 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] text-center hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
            <div className="text-xs font-black text-black uppercase">Leads Captured</div>
            <div className="font-syne text-3xl sm:text-4xl font-black text-black mt-2">{mockAnalytics.leadsCaptured}</div>
            <div className="text-[11px] font-black text-black mt-1 bg-white border border-black rounded px-1.5 py-0.5 inline-block">Enriched & Scored</div>
          </div>

          <div className="bg-[#c084fc] p-5 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] text-center hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
            <div className="text-xs font-black text-black uppercase">Conversion</div>
            <div className="font-syne text-3xl sm:text-4xl font-black text-black mt-2">{mockAnalytics.conversionRate}%</div>
            <div className="text-[11px] font-black text-black mt-1 bg-white border border-black rounded px-1.5 py-0.5 inline-block">+18% vs forms</div>
          </div>

          <div className="bg-[#fb923c] p-5 rounded-2xl border-3 border-black shadow-[5px_5px_0px_#000] text-center col-span-2 sm:col-span-1 hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
            <div className="text-xs font-black text-black uppercase">Handoffs</div>
            <div className="font-syne text-3xl sm:text-4xl font-black text-black mt-2">{mockAnalytics.humanHandoffs}</div>
            <div className="text-[11px] font-black text-black mt-1 bg-white border border-black rounded px-1.5 py-0.5 inline-block">3.3% Escalation</div>
          </div>
        </div>

        {/* Interactive Analytics Tabs & Charts Panel */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 border-3 border-black shadow-[8px_8px_0px_#000]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-black font-space">
            <div>
              <h3 className="font-syne text-lg font-black text-black">Conversation & Inquiry Trends</h3>
              <p className="text-xs text-slate-700 font-sans font-medium">Live operational data aggregated from telephony events</p>
            </div>

            <div className="flex items-center gap-2 bg-[#fffdf5] p-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
              <button
                onClick={() => {
                  soundSynth.playClick();
                  setSelectedMetricView("hourly");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedMetricView === "hourly"
                    ? "bg-[#ffe600] text-black border border-black shadow-[2px_2px_0px_#000]"
                    : "text-black hover:bg-slate-100"
                }`}
              >
                Hourly Peak Call Heatmap
              </button>
              <button
                onClick={() => {
                  soundSynth.playClick();
                  setSelectedMetricView("topics");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedMetricView === "topics"
                    ? "bg-[#ffe600] text-black border border-black shadow-[2px_2px_0px_#000]"
                    : "text-black hover:bg-slate-100"
                }`}
              >
                Top Inquiry Topics
              </button>
              <button
                onClick={() => {
                  soundSynth.playClick();
                  setSelectedMetricView("weekly");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedMetricView === "weekly"
                    ? "bg-[#ffe600] text-black border border-black shadow-[2px_2px_0px_#000]"
                    : "text-black hover:bg-slate-100"
                }`}
              >
                Weekly Volume
              </button>
            </div>
          </div>

          {/* VIEW 1: Hourly Peak Heatmap */}
          {selectedMetricView === "hourly" && (
            <div className="mt-6 space-y-6 font-space">
              <div className="text-xs font-bold text-black flex items-center justify-between">
                <span>Inbound Call Volume by Time of Day</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#00f0ff] border border-black inline-block" /> Answered by Maya (100%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#fb923c] border border-black inline-block" /> Missed Before AI
                  </span>
                </div>
              </div>

              {/* Bar visualization */}
              <div className="grid grid-cols-9 gap-2 sm:gap-3 items-end h-56 pt-6 border-b-2 border-black pb-2">
                {mockAnalytics.hourlyTraffic.map((item, idx) => {
                  const maxCalls = 120;
                  const heightPct = (item.calls / maxCalls) * 100;
                  const isAfterHours = parseInt(item.hour.split(":")[0]) >= 18 || parseInt(item.hour.split(":")[0]) < 8;

                  return (
                    <div key={idx} className="flex flex-col items-center h-full justify-end group">
                      <div className="text-[10px] font-mono text-black font-black mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.calls}
                      </div>
                      <div
                        className={`w-full rounded-t-lg border-2 border-black transition-all ${
                          isAfterHours ? "bg-[#ffe600] shadow-[2px_0px_0px_#000]" : "bg-[#00f0ff] shadow-[2px_0px_0px_#000]"
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[11px] font-mono text-black font-bold mt-2">{item.hour}</span>
                    </div>
                  );
                })}
              </div>

              <div className="p-3.5 rounded-xl bg-[#a3e635] border-2 border-black text-xs text-black font-space font-bold flex items-center justify-between shadow-[3px_3px_0px_#000]">
                <span>
                  <strong>KEY ADMISSIONS INSIGHT:</strong> 54% of all calls arrive between 18:00 and 00:00 after office hours. Maya captures 100% of them.
                </span>
                <Sparkles className="w-4 h-4 text-black shrink-0 ml-2" />
              </div>
            </div>
          )}

          {/* VIEW 2: Top Inquiry Topics */}
          {selectedMetricView === "topics" && (
            <div className="mt-6 space-y-4 font-space">
              {mockAnalytics.topInquiryTopics.map((topic, idx) => {
                const colors = ["bg-[#ffe600]", "bg-[#00f0ff]", "bg-[#a3e635]", "bg-[#c084fc]", "bg-[#fb923c]"];
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-black text-black">
                      <span>{topic.topic}</span>
                      <span className="font-mono text-black">{topic.count} inquiries ({topic.percentage}%)</span>
                    </div>
                    <div className="w-full h-4 bg-[#fffdf5] rounded-lg border-2 border-black overflow-hidden shadow-[2px_2px_0px_#000]">
                      <div
                        className={`h-full ${colors[idx % colors.length]} border-r-2 border-black transition-all duration-500`}
                        style={{ width: `${topic.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW 3: Weekly Trends */}
          {selectedMetricView === "weekly" && (
            <div className="mt-6 font-space">
              <div className="grid grid-cols-7 gap-3 h-52 items-end border-b-2 border-black pb-2">
                {weeklyPerformanceMetrics.map((day, dIdx) => {
                  const height = (day.calls / 180) * 100;
                  return (
                    <div key={dIdx} className="flex flex-col items-center h-full justify-end group">
                      <span className="text-[10px] font-mono font-black text-black mb-1 opacity-0 group-hover:opacity-100">
                        {day.calls} calls
                      </span>
                      <div
                        className="w-full bg-[#ffe600] border-2 border-black rounded-t-lg shadow-[2px_0px_0px_#000]"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs font-black text-black mt-2">{day.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
