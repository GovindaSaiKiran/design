"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Calendar,
  FileText,
  PhoneCall,
  Download,
} from "lucide-react";

interface TimelineMonth {
  id: string;
  name: string;
  count?: number;
  stageLabel?: string;
  active?: boolean;
}

const timelineData: TimelineMonth[] = [
  { id: "jan", name: "Jan", count: 6, stageLabel: "Q1 Campaign" },
  { id: "feb", name: "Feb", stageLabel: "Carrier Peering" },
  { id: "mar", name: "Mar", count: 3, stageLabel: "SLA Reviews" },
  { id: "apr", name: "Apr", stageLabel: "Usage Volume" },
  { id: "may", name: "May", count: 2, stageLabel: "Q2 Outreach" },
  { id: "jun", name: "Jun", stageLabel: "Trunk Scaling" },
  { id: "jul", name: "Jul", stageLabel: "Mid-Year Audit" },
  { id: "aug", name: "Aug", count: 4, stageLabel: "Peak Dialing", active: true },
  { id: "sep", name: "Sep", count: 2, stageLabel: "Outbound Cadence", active: true },
  { id: "oct", name: "Oct", count: 6, stageLabel: "Q4 Scaling" }
];

interface TimelineScrubberDockProps {
  onSelectPeriod?: (periodId: string) => void;
  onOpenExportModal?: () => void;
}

export default function TimelineScrubberDock({
  onSelectPeriod,
  onOpenExportModal
}: TimelineScrubberDockProps) {
  const [selectedRange, setSelectedRange] = useState<string[]>(["aug", "sep"]);

  const toggleMonth = (id: string) => {
    if (selectedRange.includes(id)) {
      if (selectedRange.length > 1) {
        setSelectedRange(selectedRange.filter((m) => m !== id));
      }
    } else {
      setSelectedRange([...selectedRange, id]);
    }
    onSelectPeriod?.(id);
  };

  const handleDownloadAll = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.9 },
        colors: ["#D9C2FA", "#C1F2D5", "#FFD9A0", "#BCD0F5"]
      });
    } catch (e) {}
    onOpenExportModal?.();
  };

  return (
    <div className="w-full flex items-center justify-center select-none font-sans text-[#1A1A1A]">
      <div className="bg-white border border-black/[0.06] rounded-full px-4 py-2 shadow-2xs flex items-center gap-2 max-w-full overflow-x-auto select-none">
        {/* Academic Calendar Year Selector */}
        <div className="flex items-center gap-1.5 bg-[#FAF3E4] text-[#1A1A1A] px-3 py-1 rounded-full text-xs font-semibold shrink-0">
          <Calendar className="w-3.5 h-3.5 stroke-[2] text-black/60" />
          <span className="text-[10px] uppercase tracking-wider">2026 Intake</span>
        </div>

        {/* Milestone Icon Pill 1 */}
        <div className="w-7 h-7 rounded-full bg-[#BCD0F5]/50 flex items-center justify-center text-[#1B365D] shrink-0" title="Prospectus Downloads">
          <FileText className="w-3.5 h-3.5 stroke-[2]" />
        </div>

        {/* Milestone Icon Pill 2 */}
        <div className="relative shrink-0" title="Active Dialed Helplines">
          <div className="w-7 h-7 rounded-full bg-[#FFD9A0] flex items-center justify-center text-[#7A4B00]">
            <PhoneCall className="w-3.5 h-3.5 stroke-[2]" />
          </div>
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#111111] text-white text-[8px] font-bold flex items-center justify-center">
            6
          </span>
        </div>

        {/* Months Scrubber Sequence */}
        <div className="flex items-center gap-1 shrink-0">
          {timelineData.map((item) => {
            const isSelected = selectedRange.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => toggleMonth(item.id)}
                className={`relative px-2.5 py-1 rounded-full text-xs transition-all duration-120 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#111111] text-white font-semibold shadow-2xs"
                    : "bg-transparent text-black/60 hover:text-black hover:bg-[#FAF3E4] font-medium"
                }`}
                title={item.stageLabel}
              >
                <span className="text-[11px] uppercase tracking-tight">{item.name}</span>

                {item.count && (
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-mono font-bold shrink-0 ${
                      isSelected
                        ? "bg-[#C1F2D5] text-[#16856B]"
                        : "bg-black/5 text-black/60"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Action: Export */}
        <div className="pl-1 shrink-0">
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs font-semibold shadow-2xs cursor-pointer transition-all active:scale-95"
            title="Export complete institutional archive and call logs"
          >
            <Download className="w-3.5 h-3.5 stroke-[2]" />
            <span className="text-[11px] uppercase tracking-wider">Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}
