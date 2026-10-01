"use client";

import React, { useState } from "react";
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
      iconSvg: (
        <svg className="w-6 h-6" viewBox="0 0 87.3 78" fill="none">
          <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
          <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
          <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
          <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
          <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
          <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
        </svg>
      ),
    },
    {
      name: "Notion",
      desc: "Admissions SOPs & FAQs",
      status: "Synced",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconSvg: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.934zm14.337.747c.093.42 0 .84-.42.887l-.934.14v10.36c-.607.327-1.167.514-1.634.514-.748 0-.98-.233-1.541-1.027l-4.76-7.467v7.28l1.4.327c.094.42 0 .84-.42.887l-3.593.233c-.094-.42 0-.84.42-.887l1.027-.233V9.247l-1.447-.14c-.093-.42 0-.84.42-.887l3.687-.233 4.993 7.653v-6.673l-1.167-.187c-.093-.42 0-.84.42-.887z"/>
        </svg>
      ),
    },
    {
      name: "Slack",
      desc: "Counselor Desk & Live Escalations",
      status: "Active",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      iconSvg: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
        </svg>
      ),
    },
    {
      name: "Linear",
      desc: "Escalations & Special Cases",
      status: "Synced",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconSvg: (
        <svg className="w-6 h-6 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      desc: "Campus SIS & Webhook API",
      status: "Active",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      iconSvg: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      name: "Zoho CRM",
      desc: "Applicant Leads & Telephony",
      status: "Synced",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconSvg: (
        <div className="w-6 h-6 rounded-md bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
          Z
        </div>
      ),
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
              Connect Notion, Slack, Google Drive, Linear, GitHub, and Zoho CRM. Agents read updated records in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className="text-xs font-semibold text-neutral-500">
              6 Connected Apps
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

        {/* 6 Connectors Grid (Matches PDF Page 7) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectors.map((c) => (
            <div
              key={c.name}
              className="bg-neutral-50/70 hover:bg-neutral-50 border border-neutral-200/90 rounded-2xl p-5 flex flex-col justify-between transition-all shadow-2xs hover:shadow-xs group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  {c.iconSvg}
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
