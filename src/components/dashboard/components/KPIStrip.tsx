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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 font-sans select-none">
      {metrics.map((metric, idx) => {
        const isUp = metric.trend === "up";
        const icon = icons[idx % icons.length];
        const explainer = cardExplainers[idx % cardExplainers.length];
        const pastelIconBgs = [
          "bg-[#D9C2FA]/40 text-[#553C9A]",
          "bg-[#C1F2D5]/50 text-[#16856B]",
          "bg-[#FFD9A0]/50 text-[#9A5B00]",
          "bg-[#BCD0F5]/50 text-[#2451B2]",
          "bg-[#FFC0D3]/50 text-[#A81D47]",
        ];
        const iconStyle = pastelIconBgs[idx % pastelIconBgs.length];

        return (
          <div
            key={metric.label}
            className="bg-white rounded-[24px] border border-black/[0.06] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-default"
          >
            <div>
              {/* Header: Icon + Sparkline */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className={`w-9 h-9 rounded-xl ${iconStyle} flex items-center justify-center font-medium transition-transform group-hover:scale-105 shadow-2xs`}>
                  {icon}
                </div>
                {renderMiniSparkline(metric.sparkline, isUp)}
              </div>

              {/* Metric Title & Value */}
              <div>
                <div className="text-[11px] font-semibold tracking-wider text-black/45 uppercase mb-1">
                  {metric.label}
                </div>
                <div className="text-2xl font-bold tracking-tight text-[#1A1A1A] font-sans">
                  {metric.value}
                </div>
              </div>

              {/* Explainer */}
              <div className="mt-1 text-xs text-black/55 leading-tight">
                {explainer}
              </div>
            </div>

            {/* Bottom: Trend Pill + Detail */}
            <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between gap-1 text-xs">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                  isUp
                    ? "bg-[#C1F2D5] text-[#16856B]"
                    : "bg-[#FFC0D3] text-[#A81D47]"
                }`}
              >
                {isUp ? (
                  <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                ) : (
                  <TrendingDown className="w-3 h-3 stroke-[2.5]" />
                )}
                {metric.trendLabel.split(" ")[0]}
              </span>

              <span className="text-[11px] text-black/45 truncate font-normal">
                {metric.trendLabel.split(" ").slice(1).join(" ")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
