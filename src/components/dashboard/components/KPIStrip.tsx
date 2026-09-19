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

    return (
      <svg width={width} height={height} className="overflow-visible shrink-0">
        <polyline
          fill="none"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {/* End dot */}
        {data.length > 0 && (
          <circle
            cx={(width).toFixed(1)}
            cy={(height - ((data[data.length - 1] - min) / range) * (height - 6) - 3).toFixed(1)}
            r="3.5"
            fill="#d6ff38"
            stroke="#000000"
            strokeWidth="2"
          />
        )}
      </svg>
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {metrics.map((metric, idx) => {
        const isUp = metric.trend === "up";
        const icon = icons[idx % icons.length];

        return (
          <div
            key={metric.label}
            className="bg-white border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_#000000] transition-all group"
          >
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#d6ff38] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000000] text-black">
                {icon}
              </div>
              {renderMiniSparkline(metric.sparkline, isUp)}
            </div>

            <div>
              <div className="text-[10px] font-black tracking-wider text-black/70 uppercase mb-0.5">
                {metric.label}
              </div>
              <div className="text-2xl font-black tracking-tight text-black font-mono">
                {metric.value}
              </div>
            </div>

            <div className="mt-2.5 flex items-center gap-1.5 text-xs font-bold">
              <span
                className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border border-black ${
                  isUp
                    ? "bg-[#d6ff38] text-black shadow-[1px_1px_0px_#000000]"
                    : "bg-white text-black shadow-[1px_1px_0px_#000000]"
                }`}
              >
                {isUp ? (
                  <TrendingUp className="w-3 h-3 stroke-[3]" />
                ) : (
                  <TrendingDown className="w-3 h-3 stroke-[3]" />
                )}
                {metric.trendLabel.split(" ")[0]}
              </span>
              <span className="text-black/60 truncate text-[10px] font-bold">
                {metric.trendLabel.split(" ").slice(1).join(" ")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
