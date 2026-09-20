"use client";

import React, { useState, useEffect } from "react";
import { KPIMetric } from "@/types/dashboard";
import { PhoneCall, Clock, UserCheck, PhoneForwarded, Timer, TrendingUp, TrendingDown } from "lucide-react";

interface KPIStripProps {
  metrics: KPIMetric[];
}

export default function KPIStrip({ metrics }: KPIStripProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(1);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const icons = [
    <PhoneCall key="0" className="w-4 h-4 stroke-[2]" />,
    <Clock key="1" className="w-4 h-4 stroke-[2]" />,
    <UserCheck key="2" className="w-4 h-4 stroke-[2]" />,
    <PhoneForwarded key="3" className="w-4 h-4 stroke-[2]" />,
    <Timer key="4" className="w-4 h-4 stroke-[2]" />,
  ];

  const renderMiniSparkline = (data: number[], isGreen: boolean) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 64;
    const height = 24;

    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

    const strokeColor = isGreen ? "#10b981" : "#f43f5e";

    return (
      <svg width={width} height={height} className="overflow-visible shrink-0">
        <polyline
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {/* End dot */}
        {data.length > 0 && (
          <circle
            cx={(width).toFixed(1)}
            cy={(height - ((data[data.length - 1] - min) / range) * (height - 6) - 3).toFixed(1)}
            r="2.5"
            fill={strokeColor}
            stroke="#ffffff"
            strokeWidth="1"
          />
        )}
      </svg>
    );
  };

  const cardExplainers = [
    "Calls dialed today",
    "Answered & held > 15s",
    "Enrolled / token paid",
    "Transferred to Counselor",
    "AI response turnaround",
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 font-sans select-none">
      {metrics.map((metric, idx) => {
        const isUp = metric.trend === "up";
        const icon = icons[idx % icons.length];
        const explainer = cardExplainers[idx % cardExplainers.length];

        return (
          <div
            key={metric.label}
            className="liquid-glass-card p-6 flex flex-col justify-between group cursor-default hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              {/* Header: Icon + Sparkline */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-neutral-100 text-neutral-800 border border-black/5 flex items-center justify-center font-medium group-hover:bg-neutral-900 group-hover:text-white transition-all shadow-xs">
                  {icon}
                </div>
                {renderMiniSparkline(metric.sparkline, isUp)}
              </div>

              {/* Metric Title & Value */}
              <div>
                <div className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase mb-1">
                  {metric.label}
                </div>
                <div className="text-2xl font-semibold tracking-tight text-neutral-900 font-mono">
                  {metric.value}
                </div>
              </div>

              {/* Explainer */}
              <div className="mt-1.5 text-xs text-neutral-500 leading-tight">
                {explainer}
              </div>
            </div>

            {/* Bottom: Trend Pill + Detail */}
            <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between gap-1 text-xs">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                  isUp
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}
              >
                {isUp ? (
                  <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                ) : (
                  <TrendingDown className="w-3 h-3 stroke-[2.5]" />
                )}
                {metric.trendLabel.split(" ")[0]}
              </span>

              <span className="text-[11px] text-neutral-400 truncate font-normal">
                {metric.trendLabel.split(" ").slice(1).join(" ")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
