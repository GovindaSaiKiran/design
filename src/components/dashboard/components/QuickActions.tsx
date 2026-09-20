"use client";

import React from "react";
import { Plus, Send, Upload, FileText, PhoneCall, Download, Sparkles, Bot, Layers } from "lucide-react";

interface QuickActionsProps {
  onCreateAgent?: () => void;
  onStartCampaign?: () => void;
  onUploadContacts?: () => void;
  onUploadKnowledge?: () => void;
  onViewCalls?: () => void;
  onExportReport?: () => void;
}

export default function QuickActions({
  onCreateAgent,
  onStartCampaign,
  onUploadContacts,
  onUploadKnowledge,
  onViewCalls,
  onExportReport,
}: QuickActionsProps) {
  const actions = [
    {
      title: "Create AI Agent",
      desc: "Voice & persona tuning",
      icon: <Bot className="w-5 h-5 text-purple-600 stroke-[1.8]" />,
      iconBg: "bg-purple-50 border border-purple-100",
      onClick: onCreateAgent,
    },
    {
      title: "Start Campaign",
      desc: "Launch dialing batch",
      icon: <Send className="w-5 h-5 text-blue-600 stroke-[1.8]" />,
      iconBg: "bg-blue-50 border border-blue-100",
      onClick: onStartCampaign,
    },
    {
      title: "Upload Students",
      desc: "Import CSV applicants",
      icon: <Upload className="w-5 h-5 text-amber-600 stroke-[1.8]" />,
      iconBg: "bg-amber-50 border border-amber-100",
      onClick: onUploadContacts,
    },
    {
      title: "Upload Knowledge",
      desc: "Index syllabus & fees",
      icon: <FileText className="w-5 h-5 text-cyan-600 stroke-[1.8]" />,
      iconBg: "bg-cyan-50 border border-cyan-100",
      onClick: onUploadKnowledge,
    },
    {
      title: "Live Calls Feed",
      desc: "Acoustic live monitor",
      icon: <PhoneCall className="w-5 h-5 text-emerald-600 stroke-[1.8]" />,
      iconBg: "bg-emerald-50 border border-emerald-100",
      onClick: onViewCalls,
    },
    {
      title: "Export Report",
      desc: "Download call logs",
      icon: <Download className="w-5 h-5 text-neutral-700 stroke-[1.8]" />,
      iconBg: "bg-neutral-100 border border-neutral-200",
      onClick: onExportReport,
    },
  ];

  return (
    <div className="liquid-glass-card p-7 select-none">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Operations Shortcuts
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-700 border border-black/5">
              6 Workflows
            </span>
          </div>
          <h3 className="text-xl font-semibold text-neutral-900 tracking-tight mt-1">
            Quick Actions
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((act) => (
          <button
            key={act.title}
            onClick={act.onClick}
            className="liquid-glass-interactive p-5 rounded-2xl text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className={`w-11 h-11 rounded-2xl ${act.iconBg} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
              {act.icon}
            </div>

            <div>
              <div className="text-xs font-semibold text-neutral-900 leading-tight mb-1 group-hover:text-blue-600 transition-colors">
                {act.title}
              </div>
              <div className="text-[11px] text-neutral-400 line-clamp-1">
                {act.desc}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
