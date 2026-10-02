"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Layers,
  CheckCircle2,
  RefreshCw,
  FolderGit2,
  Database,
  ExternalLink,
} from "lucide-react";

export default function ConnectorsGridSection() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState("Just now");

  const connectors = [
    {
      name: "Google Drive",
      desc: "Collegiate Docs & Prospectuses",
      status: "Synced",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: "/images/connectors/google-drive.png",
    },
    {
      name: "Notion",
      desc: "Admissions SOPs & FAQs",
      status: "Synced",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: "/images/connectors/notion.png",
    },
    {
      name: "Slack",
      desc: "Counselor Desk & Live Escalations",
      status: "Active",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      image: "/images/connectors/slack.png",
    },
    {
      name: "Microsoft Excel",
      desc: "Applicant Rosters & Cutoffs",
      status: "Synced",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: "/images/connectors/excel.png",
    },
    {
      name: "GitHub",
      desc: "Campus SIS & Webhook API",
      status: "Active",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      image: "/images/connectors/github.png",
    },
  ];

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSynced("Just now");
    }, 1500);
  };

  return (
    <section className="w-full mb-10 font-sans select-none" id="connectors-hub">
      <div className="bg-white/95 backdrop-blur-xl border border-neutral-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
        
        {/* Section Header (Matches PDF Page 7) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-5 border-b border-neutral-200/80">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-neutral-100 border border-neutral-200 text-neutral-800 mb-2">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>INTEGRATED CONNECTORS</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900">
              Connectors & Campus ERPs
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Connect Google Drive, Notion, Slack, Microsoft Excel, and GitHub. Agents read updated records in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className="text-xs font-semibold text-neutral-500">
              5 Connected Apps
            </span>
            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-xs font-semibold text-neutral-800 flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin text-blue-600" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Sync All"}</span>
            </button>
          </div>
        </div>

        {/* 5 Connectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectors.map((c) => (
            <div
              key={c.name}
              className="bg-neutral-50/70 hover:bg-neutral-50 border border-neutral-200/90 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-2xs hover:shadow-xs group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 p-2 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={32}
                    height={32}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 ${c.badgeColor}`}
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{c.status}</span>
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-neutral-900 flex items-center justify-between">
                  <span>{c.name}</span>
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
