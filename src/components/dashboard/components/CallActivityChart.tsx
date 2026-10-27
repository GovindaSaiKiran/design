"use client";

import React, { useState } from "react";
import { mockCallActivityData } from "@/data/mock/dashboardData";
import { TrendingUp, BarChart3, Filter, Calendar, Zap, Layers } from "lucide-react";

export default function CallActivityChart() {
  const [timeRange, setTimeRange] = useState<"today" | "sevenDays" | "thirtyDays">("sevenDays");
  const [metricView, setMetricView] = useState<"calls" | "minutes" | "outcomes">("calls");
  const [filterDirection, setFilterDirection] = useState<"all" | "inbound" | "outbound">("all");
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const rawData = mockCallActivityData[timeRange];

  // Adjust values based on filter
  const chartData = rawData.map((d) => {
    let multiplier = 1;
    if (filterDirection === "inbound") multiplier = 0.58;
    if (filterDirection === "outbound") multiplier = 0.42;

    const calls = Math.round(d.calls * multiplier);
    const minutes = Math.round(d.minutes * multiplier);
    const interested = Math.round(d.interested * multiplier);

    let displayVal = calls;
    if (metricView === "minutes") displayVal = minutes;
    if (metricView === "outcomes") displayVal = interested;

    return {
      label: d.time,
      val: displayVal,
      calls,
      minutes,
      interested,
      handoffs: d.handoffs,
    };
  });

  const values = chartData.map((d) => d.val);
  const maxVal = Math.max(...values, 10);
  const minVal = 0;
  const range = maxVal - minVal;

  const width = 640;
  const height = 200;
  const paddingX = 30;
  const paddingY = 20;
  const plotWidth = width - paddingX * 2;
  const plotHeight = height - paddingY * 2;

  const points = chartData.map((d, idx) => {
    const x = paddingX + (idx / (chartData.length - 1)) * plotWidth;
    const y = height - paddingY - ((d.val - minVal) / range) * plotHeight;
    return { x, y, data: d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${(height - paddingY).toFixed(1)} L ${points[0].x.toFixed(1)} ${(height - paddingY).toFixed(1)} Z`;

  return (
    <div className="bg-white rounded-[26px] border border-black/[0.06] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] select-none">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/[0.05]">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06]">
              Operations Telemetry
            </span>
            <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#BCD0F5]/50 text-[#2451B2]">
              Peak Traffic: 12:00 - 16:00
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight font-sans">
            Call Activity Dynamics &amp; Candidate Flow
          </h3>
          <p className="text-xs text-black/55 mt-0.5">
            Real-time breakdown of automated admissions queries, counseling durations, and conversion yields
          </p>
        </div>

        {/* View Toggles & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Metric View Switcher */}
          <div className="flex items-center bg-[#FAF3E4] p-1 rounded-full border border-black/[0.05] text-xs gap-1">
            <button
              onClick={() => setMetricView("calls")}
              className={`px-3.5 py-1 rounded-full transition-all text-xs font-semibold cursor-pointer ${
                metricView === "calls"
                  ? "bg-[#111111] text-white shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              Calls
            </button>
            <button
              onClick={() => setMetricView("minutes")}
              className={`px-3.5 py-1 rounded-full transition-all text-xs font-semibold cursor-pointer ${
                metricView === "minutes"
                  ? "bg-[#111111] text-white shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              Minutes
            </button>
            <button
              onClick={() => setMetricView("outcomes")}
              className={`px-3.5 py-1 rounded-full transition-all text-xs font-semibold cursor-pointer ${
                metricView === "outcomes"
                  ? "bg-[#111111] text-white shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              Interested Leads
            </button>
          </div>

          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#FAF3E4] border border-black/[0.08] text-[#1A1A1A] focus:outline-none cursor-pointer transition-all shadow-2xs"
          >
            <option value="today">Today (Hourly)</option>
            <option value="sevenDays">Past 7 Days</option>
            <option value="thirtyDays">Past 30 Days</option>
          </select>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full overflow-hidden bg-[#FAF3E4]/30 rounded-2xl p-4 border border-black/[0.05]">
        {chartData.length === 0 ? (
          <div className="text-center space-y-2 py-12">
            <BarChart3 className="w-8 h-8 text-black/30 mx-auto" />
            <h4 className="text-sm font-bold text-[#1A1A1A]">No call telemetry recorded yet</h4>
            <p className="text-xs text-black/50 max-w-sm mx-auto">
              Activity graphs, candidate flow dynamics, and conversion yields will generate in real time as voice calls are connected.
            </p>
          </div>
        ) : (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-52 sm:h-60 overflow-visible"
        >
          <defs>
            <linearGradient id="pastelChartAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C1F2D5" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#C1F2D5" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#1A1A1A"
            strokeOpacity="0.06"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#1A1A1A"
            strokeOpacity="0.06"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#1A1A1A"
            strokeOpacity="0.12"
            strokeWidth="1"
          />

          {/* Area under curve */}
          <path
            d={areaPath}
            fill="url(#pastelChartAreaGradient)"
          />

          {/* Line curve */}
          <path
            d={linePath}
            fill="none"
            stroke="#16856B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((p, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(idx)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={hoveredPoint === idx ? 6 : 3.5}
                fill={hoveredPoint === idx ? "#16856B" : "#ffffff"}
                stroke="#16856B"
                strokeWidth={2}
                className="transition-all duration-150"
              />
            </g>
          ))}
        </svg>

        {/* Hovered Tooltip */}
        {hoveredPoint !== null && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#111111] text-white px-4 py-2 rounded-full border border-black/10 shadow-xl text-xs pointer-events-none animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2 font-medium"
          >
            <span className="text-white/60">{chartData[hoveredPoint].label}:</span>{" "}
            <span className="text-[#C1F2D5] font-bold">
              {chartData[hoveredPoint].val} {metricView}
            </span>{" "}
            <span className="text-white/60 text-[11px]">
              ({chartData[hoveredPoint].interested} interested)
            </span>
          </div>
        )}
      </div>

      {/* Bottom Time Labels */}
      <div className="flex justify-between text-xs text-black/45 font-medium pt-3 px-6">
        {chartData.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
