"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Layers,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

export default function ConnectorsGridSection() {
  const [isSyncing, setIsSyncing] = useState(false);

  const connectors = [
    {
      id: "gdrive",
      name: "Google Drive",
      desc: "Collegiate Docs",
      status: "Synced",
      fillBg: "#eafaf1",
      backTabBg: "#f6fcf8",
      borderColor: "#c2efd5",
      statusColor: "text-emerald-700 bg-white/95 border-emerald-200/80",
      dotColor: "bg-emerald-500",
      logo2D: "/images/connectors/google-drive.png",
      logo3D: "/images/connectors/google-drive-3d.png",
    },
    {
      id: "notion",
      name: "Notion",
      desc: "Admissions SOPs",
      status: "Synced",
      fillBg: "#f4f5f7",
      backTabBg: "#fafbfc",
      borderColor: "#e1e3e8",
      statusColor: "text-emerald-700 bg-white/95 border-emerald-200/80",
      dotColor: "bg-emerald-500",
      logo2D: "/images/connectors/notion.png",
      logo3D: "/images/connectors/notion-3d.png",
    },
    {
      id: "slack",
      name: "Slack",
      desc: "Counselor Desk",
      status: "Active",
      fillBg: "#f3effe",
      backTabBg: "#f9f6ff",
      borderColor: "#ded1fd",
      statusColor: "text-emerald-700 bg-white/95 border-emerald-200/80",
      dotColor: "bg-emerald-500",
      logo2D: "/images/connectors/slack.png",
      logo3D: "/images/connectors/slack-3d.png",
    },
    {
      id: "excel",
      name: "Microsoft Excel",
      desc: "Applicant Rosters",
      status: "Live Sync",
      fillBg: "#eafaf1",
      backTabBg: "#f6fcf8",
      borderColor: "#c2efd5",
      statusColor: "text-emerald-700 bg-white/95 border-emerald-200/80",
      dotColor: "bg-emerald-500",
      logo2D: "/images/connectors/excel.png",
      logo3D: "/images/connectors/excel-3d.png",
    },
    {
      id: "github",
      name: "GitHub",
      desc: "Campus SIS & API",
      status: "Connected",
      fillBg: "#edf4fc",
      backTabBg: "#f6faff",
      borderColor: "#cbdcf3",
      statusColor: "text-emerald-700 bg-white/95 border-emerald-200/80",
      dotColor: "bg-emerald-500",
      logo2D: "/images/connectors/github.png",
      logo3D: "/images/connectors/github-3d.png",
    },
  ];

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1400);
  };

  return (
    <section className="w-full mb-10 font-sans select-none" id="connectors-hub">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        
        {/* Section Header (Matching Reference Image 1) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
              INTEGRATED CONNECTORS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-slate-900">
              Connectors & Campus ERPs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Connect Google Drive, Notion, Slack, Microsoft Excel, and GitHub. Agents read updated records in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/80">
              5 Connected Apps
            </span>
            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-emerald-600" : "text-slate-500"}`} />
              <span>{isSyncing ? "Syncing..." : "Sync All"}</span>
            </button>
          </div>
        </div>

        {/* 5 Folder Cards Grid (Refined Digital Folder Design matching Reference Image 1) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {connectors.map((c) => (
            <div
              key={c.id}
              className="relative p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:drop-shadow-md group cursor-pointer min-h-[220px]"
            >
              {/* SVG Digital Folder Silhouette with Dual Tabs (Direct from Reference) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300"
                viewBox="0 0 240 220"
                preserveAspectRatio="none"
                fill="none"
              >
                {/* Back Tab on the right side */}
                <path
                  d="M 112 14 C 120 14, 126 2, 136 2 L 216 2 C 228 2, 238 12, 238 24 L 238 34"
                  fill={c.backTabBg}
                  stroke={c.borderColor}
                  strokeWidth="1.2"
                />
                {/* Front Main Folder Body */}
                <path
                  d="M 2 24 C 2 12, 12 2, 24 2 L 100 2 C 112 2, 116 14, 128 14 L 216 14 C 228 14, 238 24, 238 34 L 238 198 C 238 210, 228 218, 216 218 L 24 218 C 12 218, 2 210, 2 198 Z"
                  fill={c.fillBg}
                  stroke={c.borderColor}
                  strokeWidth="1.2"
                />
              </svg>

              {/* Top Icons Row: Left 2D Logo Container, Right 3D Illustration */}
              <div className="relative z-10 pt-2 flex items-center justify-between gap-2 mb-4">
                {/* 2D App Logo inside white rounded container */}
                <div className="w-11 h-11 rounded-2xl bg-white shadow-2xs border border-white/90 flex items-center justify-center p-2.5 shrink-0 group-hover:scale-105 transition-transform">
                  <Image
                    src={c.logo2D}
                    alt={c.name}
                    width={32}
                    height={32}
                    className="w-6 h-6 object-contain"
                  />
                </div>

                {/* 3D Volumetric Illustration Graphic */}
                <div className="w-16 h-16 relative shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={c.logo3D}
                    alt={`${c.name} 3D`}
                    fill
                    className="object-contain drop-shadow-sm"
                  />
                </div>
              </div>

              {/* App Title & Subtitle */}
              <div className="relative z-10 mb-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-snug">
                  {c.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {c.desc}
                </p>
              </div>

              {/* Bottom Row: Status Pill (Left) & White Circle Arrow Action (Right) */}
              <div className="relative z-10 flex items-center justify-between pt-1">
                {/* Status Indicator Pill */}
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shadow-2xs ${c.statusColor}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.dotColor}`} />
                  <span>{c.status}</span>
                </div>

                {/* White Circle Arrow Action Button */}
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white text-slate-700 group-hover:text-slate-950 flex items-center justify-center shadow-2xs hover:shadow-xs group-hover:scale-105 transition-all cursor-pointer"
                  title={`Configure ${c.name}`}
                >
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
