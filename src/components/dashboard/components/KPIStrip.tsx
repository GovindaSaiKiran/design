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
    <PhoneCall key="0" className="w-4 h-4 stroke-[2.5]" />,
    <Clock key="1" className="w-4 h-4 stroke-[2.5]" />,
    <UserCheck key="2" className="w-4 h-4 stroke-[2.5]" />,
    <PhoneForwarded key="3" className="w-4 h-4 stroke-[2.5]" />,
    <Timer key="4" className="w-4 h-4 stroke-[2.5]" />,
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
            r="3"
            fill={strokeColor}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        )}
      </svg>
    );
  };

  // Neo-Brutalist colorful themes for each card
  const cardThemes = [
    {
      iconBg: "bg-[#d6ff38] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
      explainer: "Calls dialed by Maya & Vikram today",
      metricDetail: "All Inbound + Outbound attempts",
    },
    {
      iconBg: "bg-[#00f0ff] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
      explainer: "Answered & held > 15 seconds",
      metricDetail: "Live voice connection success",
    },
    {
      iconBg: "bg-[#ffe600] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
      explainer: "Interested leads enrolled / token paid",
      metricDetail: "Direct AI admissions conversion",
    },
    {
      iconBg: "bg-[#c084fc] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
      explainer: "Transferred to Dean / Counselor",
      metricDetail: "Complex questions escalated",
    },
    {
      iconBg: "bg-[#ff8080] text-black border-2 border-black shadow-[2px_2px_0px_#000000]",
      explainer: "Time AI takes to process & reply",
      metricDetail: "Ultra-fast conversational latency",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 font-sans select-none">
      {metrics.map((metric, idx) => {
        const isUp = metric.trend === "up";
        const icon = icons[idx % icons.length];
        const theme = cardThemes[idx % cardThemes.length];

        return (
          <div
            key={metric.label}
            className="bg-white border-[2.5px] border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group cursor-default"
          >
            <div>
              {/* Header: Icon + Sparkline */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className={`w-9 h-9 rounded-xl ${theme.iconBg} flex items-center justify-center font-bold group-hover:scale-105 transition-transform`}>
                  {icon}
                </div>
                {renderMiniSparkline(metric.sparkline, isUp)}
              </div>

              {/* Metric Title & Value */}
              <div>
                <div className="text-[11px] font-black tracking-wider text-black/60 uppercase mb-0.5">
                  {metric.label}
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-black font-mono">
                  {metric.value}
                </div>
              </div>

              {/* Explainer */}
              <div className="mt-1 text-[11px] font-bold text-black/70 leading-tight">
                {theme.explainer}
              </div>
            </div>

            {/* Bottom: Trend Pill + Detail */}
            <div className="mt-3.5 pt-2.5 border-t-2 border-black/15 flex items-center justify-between gap-1 text-xs">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-black border-2 border-black shadow-[1.5px_1.5px_0px_#000000] ${
                  isUp
                    ? "bg-[#d6ff38] text-black"
                    : "bg-[#ff8080] text-black"
                }`}
              >
                {isUp ? (
                  <TrendingUp className="w-3 h-3 stroke-[3]" />
                ) : (
                  <TrendingDown className="w-3 h-3 stroke-[3]" />
                )}
                {metric.trendLabel.split(" ")[0]}
              </span>

              <span className="text-[11px] font-bold text-black/60 truncate">
                {metric.trendLabel.split(" ").slice(1).join(" ")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
