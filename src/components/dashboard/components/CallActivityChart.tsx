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
    <div className="liquid-glass-card p-7 transition-all duration-300 select-none">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-black/5">
              Operations Telemetry
            </span>
            <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              Peak Traffic: 12:00 - 16:00
            </span>
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 tracking-tight">
            Call Activity Dynamics & Candidate Flow
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real-time breakdown of automated admissions queries, counseling durations, and conversion yields
          </p>
        </div>

        {/* View Toggles & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Metric View Switcher */}
          <div className="flex items-center bg-neutral-100 p-1 rounded-xl border border-black/5 text-xs gap-1">
            <button
              onClick={() => setMetricView("calls")}
              className={`px-3 py-1 rounded-lg transition-all font-medium cursor-pointer ${
                metricView === "calls"
                  ? "bg-white text-neutral-900 shadow-xs font-semibold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Calls
            </button>
            <button
              onClick={() => setMetricView("minutes")}
              className={`px-3 py-1 rounded-lg transition-all font-medium cursor-pointer ${
                metricView === "minutes"
                  ? "bg-white text-neutral-900 shadow-xs font-semibold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Minutes
            </button>
            <button
              onClick={() => setMetricView("outcomes")}
              className={`px-3 py-1 rounded-lg transition-all font-medium cursor-pointer ${
                metricView === "outcomes"
                  ? "bg-white text-neutral-900 shadow-xs font-semibold"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              Interested Leads
            </button>
          </div>

          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-neutral-50 hover:bg-white border border-black/10 text-neutral-700 focus:outline-none focus:border-black cursor-pointer transition-all shadow-xs"
          >
            <option value="today">Today (Hourly)</option>
            <option value="sevenDays">Past 7 Days</option>
            <option value="thirtyDays">Past 30 Days</option>
          </select>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full overflow-hidden bg-neutral-50/70 rounded-2xl p-4 border border-black/5">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-52 sm:h-60 overflow-visible"
        >
          <defs>
            <linearGradient id="appleChartAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#e5e7eb"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#d1d5db"
            strokeWidth="1"
          />

          {/* Area under curve */}
          <path
            d={areaPath}
            fill="url(#appleChartAreaGradient)"
          />

          {/* Line curve */}
          <path
            d={linePath}
            fill="none"
            stroke="#2563eb"
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
                fill={hoveredPoint === idx ? "#2563eb" : "#ffffff"}
                stroke="#2563eb"
                strokeWidth={2}
                className="transition-all duration-150"
              />
            </g>
          ))}
        </svg>

        {/* Hovered Tooltip */}
        {hoveredPoint !== null && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-4 py-2 rounded-xl border border-black/20 shadow-xl text-xs pointer-events-none animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2 font-medium"
          >
            <span className="text-neutral-400">{chartData[hoveredPoint].label}:</span>{" "}
            <span className="text-blue-400 font-mono font-semibold">
              {chartData[hoveredPoint].val} {metricView}
            </span>{" "}
            <span className="text-neutral-400 text-[11px]">
              ({chartData[hoveredPoint].interested} interested)
            </span>
          </div>
        )}
      </div>

      {/* Bottom Time Labels */}
      <div className="flex justify-between text-xs text-neutral-400 font-mono pt-3 px-6">
        {chartData.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
