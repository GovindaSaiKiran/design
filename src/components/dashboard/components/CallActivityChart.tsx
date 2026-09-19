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
    <div className="bg-white border-3 border-black rounded-2xl p-5 sm:p-6 shadow-[6px_6px_0px_#000000]">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b-2 border-black">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-md bg-black text-[#d6ff38]">
              Operations Telemetry
            </span>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-md bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]">
              Peak Traffic: 12:00 - 16:00
            </span>
          </div>
          <h3 className="text-xl font-black text-black uppercase tracking-tight">
            CALL ACTIVITY DYNAMICS
          </h3>
        </div>

        {/* View Toggles & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Metric View Switcher */}
          <div className="flex items-center bg-white p-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000000] text-xs font-black">
            <button
              onClick={() => setMetricView("calls")}
              className={`px-3 py-1 rounded-lg transition-all ${
                metricView === "calls"
                  ? "bg-[#d6ff38] text-black border border-black"
                  : "text-black/70 hover:text-black"
              }`}
            >
              Calls
            </button>
            <button
              onClick={() => setMetricView("minutes")}
              className={`px-3 py-1 rounded-lg transition-all ${
                metricView === "minutes"
                  ? "bg-[#d6ff38] text-black border border-black"
                  : "text-black/70 hover:text-black"
              }`}
            >
              Minutes
            </button>
            <button
              onClick={() => setMetricView("outcomes")}
              className={`px-3 py-1 rounded-lg transition-all ${
                metricView === "outcomes"
                  ? "bg-[#d6ff38] text-black border border-black"
                  : "text-black/70 hover:text-black"
              }`}
            >
              Interested Leads
            </button>
          </div>

          {/* Time Range */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-1.5 rounded-xl text-xs font-black bg-white border-2 border-black shadow-[2px_2px_0px_#000000] focus:outline-none focus:bg-[#fcffe0] cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="sevenDays">Past 7 Days</option>
            <option value="thirtyDays">Past 30 Days</option>
          </select>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-48 sm:h-64 overflow-visible"
        >
          {/* Grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.2"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#000000"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.2"
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
            fill="#d6ff38"
            opacity="0.45"
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
                r={hoveredPoint === idx ? 7 : 4.5}
                fill={hoveredPoint === idx ? "#000000" : "#d6ff38"}
                stroke="#000000"
                strokeWidth="2.5"
                className="transition-all"
              />
            </g>
          ))}
        </svg>

        {/* Hovered Tooltip */}
        {hoveredPoint !== null && (
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 bg-black text-[#d6ff38] px-3.5 py-1.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_#d6ff38] text-xs font-black uppercase pointer-events-none"
          >
            {chartData[hoveredPoint].label}: {chartData[hoveredPoint].val} {metricView} ({chartData[hoveredPoint].interested} interested)
          </div>
        )}
      </div>

      {/* Bottom Time Labels */}
      <div className="flex justify-between text-[11px] font-black text-black font-mono pt-2 px-6">
        {chartData.map((d, i) => (
          <span key={i}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
