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
    <div className="bg-white border-[2.5px] border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000] font-sans select-none">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 pb-4 border-b-2 border-black">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#ffe600] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              ⚡ Operations Telemetry
            </span>
            <span className="text-[11px] font-black px-2.5 py-1 rounded-lg bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              Peak: 12:00 - 16:00
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-black tracking-tight">
            Call Activity Dynamics & Lead Flow
          </h3>
          <p className="text-xs text-black/70 font-bold mt-0.5">
            Real-time breakdown of automated student queries and voice counseling conversations
          </p>
        </div>

        {/* View Toggles & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Metric View Switcher */}
          <div className="flex items-center bg-white p-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] text-xs gap-1">
            <button
              onClick={() => setMetricView("calls")}
              className={`px-3 py-1.5 rounded-lg transition-all font-black cursor-pointer ${
                metricView === "calls"
                  ? "bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]"
                  : "text-black hover:bg-neutral-100 border-2 border-transparent"
              }`}
            >
              Calls Dialed
            </button>
            <button
              onClick={() => setMetricView("minutes")}
              className={`px-3 py-1.5 rounded-lg transition-all font-black cursor-pointer ${
                metricView === "minutes"
                  ? "bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]"
                  : "text-black hover:bg-neutral-100 border-2 border-transparent"
              }`}
            >
              Minutes
            </button>
            <button
              onClick={() => setMetricView("outcomes")}
              className={`px-3 py-1.5 rounded-lg transition-all font-black cursor-pointer ${
                metricView === "outcomes"
                  ? "bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]"
                  : "text-black hover:bg-neutral-100 border-2 border-transparent"
              }`}
            >
              Interested Leads
            </button>
          </div>

          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3.5 py-2 rounded-xl text-xs font-black bg-white hover:bg-[#ffe600]/20 border-2 border-black text-black focus:outline-none cursor-pointer transition-all shadow-[2px_2px_0px_#000000]"
          >
            <option value="today">Today (Hourly)</option>
            <option value="sevenDays">Past 7 Days</option>
            <option value="thirtyDays">Past 30 Days</option>
          </select>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full overflow-hidden bg-[#fbfbf8] rounded-xl p-3.5 border-2 border-black shadow-[3px_3px_0px_#000000]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-48 sm:h-56 overflow-visible"
        >
          <defs>
            <linearGradient id="vibrantChartAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d6ff38" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d6ff38" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.25"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.25"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#000000"
            strokeWidth="2"
          />

          {/* Area under curve */}
          <path
            d={areaPath}
            fill="url(#vibrantChartAreaGradient)"
          />

          {/* Line curve */}
          <path
            d={linePath}
            fill="none"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points with Neo Brutalist dots */}
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
                r={hoveredPoint === idx ? 8 : 5}
                fill={hoveredPoint === idx ? "#ffe600" : "#d6ff38"}
                stroke="#000000"
                strokeWidth={2.5}
                className="transition-all duration-150"
              />
            </g>
          ))}
        </svg>

        {/* Hovered Tooltip */}
        {hoveredPoint !== null && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-black text-[#d6ff38] px-4 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0px_#ffffff] text-xs pointer-events-none animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2 font-black"
          >
            <span className="text-white font-bold">{chartData[hoveredPoint].label}:</span>{" "}
            <span className="text-[#d6ff38] font-mono font-black">
              {chartData[hoveredPoint].val} {metricView}
            </span>{" "}
            <span className="text-neutral-300 font-medium">
              ({chartData[hoveredPoint].interested} interested)
            </span>
          </div>
        )}
      </div>

      {/* Bottom Time Labels */}
      <div className="flex justify-between text-xs text-black font-mono font-black pt-3 px-6">
        {chartData.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
