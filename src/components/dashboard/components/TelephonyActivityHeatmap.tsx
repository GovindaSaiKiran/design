"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Check,
  Activity,
  RotateCcw,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";
import { usePalette } from "@/context/PaletteContext";

export interface HourlyActivity {
  hour: number;
  label: string;
  formattedHour: string;
  inbound: number;
  outbound: number;
  total: number;
}

export interface DayActivity {
  id: string;
  date: Date;
  dateString: string;
  dayOfWeek: number; // 0 = Mon, 1 = Tue, ..., 6 = Sun
  dayName: string;
  formattedDate: string;
  fullDateString: string;
  isToday: boolean;
  isFuture: boolean;
  inbound: number;
  outbound: number;
  total: number;
  hourly: HourlyActivity[];
}

// Exactly how many days in each real calendar month (May=31, June=30, July=31, August=31, September=30, October=31)
export interface CalendarCell {
  id: string;
  type: "real" | "padding" | "future";
  day?: DayActivity;
}

export interface MonthData {
  key: string;
  name: string;
  fullName: string;
  daysInMonth: number;
  activeDaysCount: number;
  weeksCount: number;
  weeks: CalendarCell[][]; // Each week has exactly 7 CalendarCell items (rows 0 to 6)
}

interface TelephonyActivityHeatmapProps {
  currentCallsCount?: number;
  onSelectDay?: (day: DayActivity) => void;
}

// Generate exact calendar month data with true day counts (May=31, June=30, July=31, Aug=31, Sep=30, Oct=31)
function generateHeatmapData(todayCallsCount?: number): {
  months: MonthData[];
  allDays: DayActivity[];
  todayDay: DayActivity;
} {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const months: MonthData[] = [];
  const allDays: DayActivity[] = [];
  let todayDayRecord: DayActivity | null = null;

  // Real 6-month range for 2026: May to October
  const monthList = [
    { name: "MAY", monthIndex: 4, year: 2026 },
    { name: "JUN", monthIndex: 5, year: 2026 },
    { name: "JUL", monthIndex: 6, year: 2026 },
    { name: "AUG", monthIndex: 7, year: 2026 },
    { name: "SEP", monthIndex: 8, year: 2026 },
    { name: "OCT", monthIndex: 9, year: 2026 },
  ];

  for (const mInfo of monthList) {
    const year = mInfo.year;
    const monthIndex = mInfo.monthIndex;
    // Exactly how many days in this real month (31, 30, 31, 31, 30, 31)
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const firstDay = new Date(year, monthIndex, 1);
    // Monday-based day index: 0 = Mon, 1 = Tue, ..., 6 = Sun
    const firstDayOfWeek = (firstDay.getDay() + 6) % 7;

    const fullName = firstDay.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const weeks: CalendarCell[][] = [];
    let currentWeek: CalendarCell[] = [];
    let activeDaysCount = 0;

    // 1. Leading padding cells before the 1st of this month (rendered as micro-dots)
    for (let p = 0; p < firstDayOfWeek; p++) {
      currentWeek.push({
        id: `pad_start_${year}_${monthIndex}_${p}`,
        type: "padding",
      });
    }

    // 2. Exact real days of this month (day 1 to daysInMonth)
    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const cellDate = new Date(year, monthIndex, dayNum);

      const isToday =
        cellDate.getFullYear() === today.getFullYear() &&
        cellDate.getMonth() === today.getMonth() &&
        cellDate.getDate() === today.getDate();

      const isFuture = cellDate > today;

      const dayOfWeek = (cellDate.getDay() + 6) % 7;
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;

      const seed =
        (cellDate.getFullYear() * 10000 +
          (cellDate.getMonth() + 1) * 100 +
          cellDate.getDate()) %
        1000;
      const pseudoRandom = (offset: number) => {
        const x = Math.sin(seed + offset) * 10000;
        return x - Math.floor(x);
      };

      let rawTotal = 0;
      if (!isFuture) {
        activeDaysCount++;
        const p = pseudoRandom(1);
        if (isWeekend) {
          rawTotal = p > 0.45 ? Math.floor(1 + pseudoRandom(2) * 5) : 0;
        } else {
          if (p < 0.12) rawTotal = 0; // Natural quiet day (micro-dot)
          else if (p < 0.32) rawTotal = Math.floor(2 + pseudoRandom(2) * 5); // Tier 1: 2-6
          else if (p < 0.62) rawTotal = Math.floor(7 + pseudoRandom(3) * 8); // Tier 2: 7-14
          else if (p < 0.85) rawTotal = Math.floor(15 + pseudoRandom(4) * 8); // Tier 3: 15-22
          else rawTotal = Math.floor(23 + pseudoRandom(5) * 12); // Tier 4: 23-34
        }
      }

      const adjustedTotal =
        isToday && todayCallsCount ? Math.max(rawTotal, todayCallsCount) : rawTotal;

      const inboundRatio = 0.55 + (pseudoRandom(2) - 0.5) * 0.2;
      const inbound = isFuture ? 0 : Math.round(adjustedTotal * inboundRatio);
      const outbound = isFuture ? 0 : Math.max(0, adjustedTotal - inbound);

      // Hourly breakdown for 24 hours
      const hourly: HourlyActivity[] = [];
      for (let h = 0; h < 24; h++) {
        let weight = 0.04;
        if (h >= 9 && h <= 12) weight = 0.95;
        else if (h >= 14 && h <= 17) weight = 1.0;
        else if (h === 8 || h === 13 || h === 18) weight = 0.55;
        else if (h >= 19 && h <= 21) weight = 0.25;
        else if (h >= 22 || h <= 6) weight = 0.02;

        const hourNoise = 0.75 + pseudoRandom(h + 10) * 0.55;
        const hourInbound = isFuture
          ? 0
          : Math.max(0, Math.round((inbound / 9.5) * weight * hourNoise));
        const hourOutbound = isFuture
          ? 0
          : Math.max(0, Math.round((outbound / 9.5) * weight * hourNoise));

        const hourLabel = `${String(h).padStart(2, "0")}:00`;
        const hour12 =
          h === 0 ? "12 AM" : h < 12 ? `${h} AM` : h === 12 ? "12 PM" : `${h - 12} PM`;

        hourly.push({
          hour: h,
          label: hourLabel,
          formattedHour: hour12,
          inbound: hourInbound,
          outbound: hourOutbound,
          total: hourInbound + hourOutbound,
        });
      }

      const dayName = cellDate.toLocaleDateString("en-US", { weekday: "short" });
      const formattedDate = cellDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const fullDateString = cellDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const dayRecord: DayActivity = {
        id: `day_${cellDate.toISOString().slice(0, 10)}`,
        date: cellDate,
        dateString: cellDate.toISOString().slice(0, 10),
        dayOfWeek,
        dayName,
        formattedDate,
        fullDateString,
        isToday,
        isFuture,
        inbound,
        outbound,
        total: adjustedTotal,
        hourly,
      };

      if (!isFuture) {
        allDays.push(dayRecord);
      }

      if (isToday) {
        todayDayRecord = dayRecord;
      }

      currentWeek.push({
        id: dayRecord.id,
        type: isFuture ? "future" : "real",
        day: dayRecord,
      });

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // 3. Trailing padding cells after the last day of this month (rendered as micro-dots)
    if (currentWeek.length > 0) {
      const needed = 7 - currentWeek.length;
      for (let p = 0; p < needed; p++) {
        currentWeek.push({
          id: `pad_end_${year}_${monthIndex}_${p}`,
          type: "padding",
        });
      }
      weeks.push(currentWeek);
    }

    months.push({
      key: mInfo.name,
      name: mInfo.name,
      fullName,
      daysInMonth,
      activeDaysCount,
      weeksCount: weeks.length,
      weeks,
    });
  }

  return {
    months,
    allDays,
    todayDay: todayDayRecord || allDays[allDays.length - 1],
  };
}

export default function TelephonyActivityHeatmap({
  currentCallsCount = 10,
  onSelectDay,
}: TelephonyActivityHeatmapProps) {
  const { months, allDays, todayDay } = useMemo(
    () => generateHeatmapData(currentCallsCount),
    [currentCallsCount]
  );

  const { palette } = usePalette();
  const [selectedDay, setSelectedDay] = useState<DayActivity>(todayDay);
  const [hoveredDay, setHoveredDay] = useState<DayActivity | null>(null);
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const handleDayClick = (day: DayActivity) => {
    if (day.isFuture) return;
    try {
      soundSynth.play("click");
    } catch {}
    setSelectedDay(day);
    setSelectedHour(null);
    setHoveredHour(null);
    if (onSelectDay) onSelectDay(day);
  };

  const handleResetToToday = () => {
    handleDayClick(todayDay);
  };

  const handleHourClick = (hour: number) => {
    try {
      soundSynth.play("click");
    } catch {}
    setSelectedHour((prev) => (prev === hour ? null : hour));
  };

  // 4-Tier Palette matching active selected palette
  const getDayTierStyle = (count: number) => {
    const tiers = palette.colors.heatmapTiers;
    if (count <= 6) {
      return { backgroundColor: tiers[0] };
    }
    if (count <= 14) {
      return { backgroundColor: tiers[1] };
    }
    if (count <= 22) {
      return { backgroundColor: tiers[2] };
    }
    return { backgroundColor: tiers[3] };
  };

  // Inbound Hourly Palette (4 Tiers matching Inspiration Rose aesthetic)
  const getInboundHourColor = (count: number) => {
    if (count <= 1) {
      // Tier 1: Soft Rose Quartz
      return "bg-[#FFE4E6] text-[#9F1239] border border-[#FECDD3]";
    }
    if (count <= 3) {
      // Tier 2: Fresh Coral Rose
      return "bg-[#FDA4AF] text-[#881337] border border-[#FB7185]";
    }
    if (count <= 5) {
      // Tier 3: Rich Crimson Rose
      return "bg-[#F43F5E] text-white border border-[#E11D48] shadow-xs";
    }
    // Tier 4: Deep Burgundy Ruby
    return "bg-[#9F1239] text-white border border-[#881337] shadow-sm";
  };

  // Outbound Hourly Palette (4 Tiers matching Inspiration Purple aesthetic)
  const getOutboundHourColor = (count: number) => {
    if (count <= 1) {
      // Tier 1: Soft Lavender Mist
      return "bg-[#F3E8FF] text-[#6B21A8] border border-[#E9D5FF]";
    }
    if (count <= 3) {
      // Tier 2: Fresh Orchid Purple
      return "bg-[#D8B4FE] text-[#581C87] border border-[#C084FC]";
    }
    if (count <= 5) {
      // Tier 3: Rich Royal Purple
      return "bg-[#A855F7] text-white border border-[#9333EA] shadow-xs";
    }
    // Tier 4: Deep Midnight Purple
    return "bg-[#581C87] text-white border border-[#3B0764] shadow-sm";
  };

  const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const activeHourIndex = hoveredHour !== null ? hoveredHour : selectedHour;
  const activeHourSlot =
    activeHourIndex !== null ? selectedDay.hourly[activeHourIndex] : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full items-stretch">
      {/* ========================================================================= */}
      {/* 1. LEFT CARD: 6-MONTH DAILY TELEPHONY MATRIX                              */}
      {/* 31 columns stretch edge-to-edge naturally with NO empty space on 2 sides!  */}
      {/* ========================================================================= */}
      <div className="lg:col-span-7 xl:col-span-7 bg-[#FAFBF9] text-[#1A1A1A] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] shadow-sm flex flex-col justify-between space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8F5EF] border border-[#16856B]/20 flex items-center justify-center text-[#16856B] shrink-0">
              <Activity className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base tracking-tight text-[#1A1A1A]">
                  Daily Telephony Matrix
                </h3>
                <span className="text-[10px] font-semibold text-[#16856B] bg-[#E8F5EF] px-2 py-0.5 rounded-full border border-[#16856B]/25">
                  1 Dot = 1 Day
                </span>
              </div>
              <p className="text-[11px] text-black/55 mt-0.5">
                Click any single-day dot to inspect 24h concurrency on the right.
              </p>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-1.5">
            {selectedDay.isToday ? (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#E8F5EF] border border-[#16856B]/30 text-[#16856B] text-[11px] font-semibold">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Today Active</span>
              </div>
            ) : (
              <button
                onClick={handleResetToToday}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] border border-black/[0.08] text-[#1A1A1A] text-[11px] font-medium transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Today</span>
              </button>
            )}
          </div>
        </div>

        {/* Matrix Canvas: Warm-neutral background (#F2F4F2) as in Inspiration */}
        {/* Full width inside card: NO max-w-[780px], NO empty space on the sides! */}
        <div className="bg-[#F2F4F2] p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl border border-black/[0.04] w-full overflow-x-auto scrollbar-none space-y-2">
          {/* Month Headers */}
          <div className="flex items-center w-full min-w-[560px]">
            {/* Empty spacer matching weekday row labels */}
            <div className="shrink-0 w-7 sm:w-8 pr-1.5" />

            <div className="flex flex-1 w-full items-center">
              {months.map((month, mIdx) => (
                <React.Fragment key={month.key}>
                  {mIdx > 0 && (
                    <div className="px-1 shrink-0 flex items-center">
                      <div className="w-[1px] h-2.5 bg-black/15 rounded-full" />
                    </div>
                  )}
                  <div
                    style={{ flex: month.weeksCount }}
                    className="overflow-visible text-left px-0.5"
                  >
                    <span className="text-[10px] font-bold text-black/60 uppercase tracking-wider whitespace-nowrap block">
                      {month.name}{" "}
                      <span className="text-[#16856B] font-semibold text-[8.5px]">
                        ({month.daysInMonth}d)
                      </span>
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* 7 Calendar Rows with All 7 Weekdays Labeled on the Left */}
          <div className="flex items-stretch w-full min-w-[560px]">
            {/* Weekday Row Labels: Mon, Tue, Wed, Thu, Fri, Sat, Sun */}
            <div className="grid grid-rows-7 gap-1 pr-1.5 select-none shrink-0 w-7 sm:w-8">
              {weekdayLabels.map((label, rIdx) => (
                <div
                  key={rIdx}
                  className="flex items-center justify-end text-[10px] font-semibold text-black/45 leading-none"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Months Layout with Exact Calendar Days, Inspiration Micro-dots, and Squircles */}
            <div className="flex flex-1 w-full items-stretch">
              {months.map((month, mIdx) => (
                <React.Fragment key={month.key}>
                  {/* Subtle, elegant hairline month divider */}
                  {mIdx > 0 && (
                    <div
                      title={`Month division: ${month.fullName} (${month.daysInMonth} days)`}
                      className="flex items-center px-1 shrink-0 self-stretch my-0.5"
                    >
                      <div className="w-[1px] bg-black/[0.08] h-[85%] self-center rounded-full" />
                    </div>
                  )}

                  {/* Month's week columns */}
                  <div
                    style={{ flex: month.weeksCount }}
                    className="flex gap-1 items-stretch"
                  >
                    {month.weeks.map((week, colIdx) => (
                      <div key={colIdx} className="flex flex-col gap-1 flex-1">
                        {week.map((cell) => {
                          // 1. PADDING CELL
                          if (cell.type === "padding") {
                            return (
                              <div
                                key={cell.id}
                                className="aspect-square w-full pointer-events-none"
                                aria-hidden="true"
                              />
                            );
                          }

                          const day = cell.day!;
                          const isSelected = selectedDay.id === day.id;

                          // 2. FUTURE DAY
                          if (cell.type === "future" || day.isFuture) {
                            return (
                              <div
                                key={cell.id}
                                title={`${day.fullDateString} (Upcoming)`}
                                className="aspect-square w-full flex items-center justify-center opacity-30 cursor-not-allowed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#134A23]/35" />
                              </div>
                            );
                          }

                          // 3. ZERO-CALL QUIET DAY
                          if (day.total === 0) {
                            return (
                              <div
                                key={day.id}
                                onClick={() => handleDayClick(day)}
                                onMouseEnter={() => setHoveredDay(day)}
                                onMouseLeave={() => setHoveredDay(null)}
                                title={`${day.fullDateString}: 0 calls (Quiet day)`}
                                className={`aspect-square w-full flex items-center justify-center cursor-pointer transition-all duration-150 rounded-[4.5px] hover:bg-black/[0.05] ${
                                  isSelected
                                    ? "ring-2 ring-[#134A23] ring-offset-2 ring-offset-[#F2F4F2] bg-white shadow-xs"
                                    : ""
                                }`}
                              >
                                <span
                                  className={`rounded-full transition-transform ${
                                    isSelected
                                      ? "w-2 h-2 bg-[#134A23] scale-125"
                                      : "w-1.5 h-1.5 bg-[#629774]/65 hover:scale-125 hover:bg-[#134A23]"
                                  }`}
                                />
                              </div>
                            );
                          }

                          // 4. ACTIVE CALL DAY
                          const dayStyle = getDayTierStyle(day.total);

                          return (
                            <div
                              key={day.id}
                              onClick={() => handleDayClick(day)}
                              onMouseEnter={() => setHoveredDay(day)}
                              onMouseLeave={() => setHoveredDay(null)}
                              title={`${day.fullDateString}: ${day.total} calls (${day.inbound} in, ${day.outbound} out)`}
                              style={dayStyle}
                              className={`aspect-square w-full rounded-[4.5px] cursor-pointer transition-all duration-150 relative ${
                                isSelected
                                  ? "ring-2 ring-slate-900 ring-offset-2 ring-offset-[#F2F4F2] scale-110 z-20 shadow-md"
                                  : "hover:scale-105 hover:brightness-105 z-10"
                              }`}
                            >
                              {day.isToday && (
                                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs animate-pulse" />
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legend & Day Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs w-full">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#208843] shrink-0" />
            {hoveredDay && !hoveredDay.isFuture ? (
              <span className="text-black/80 text-[11px]">
                <span className="font-bold text-[#1A1A1A]">{hoveredDay.formattedDate}:</span>{" "}
                <span className="font-bold text-[#16856B]">{hoveredDay.total} Calls</span>{" "}
                <span className="text-black/50">
                  ({hoveredDay.inbound} In &bull; {hoveredDay.outbound} Out)
                </span>
              </span>
            ) : (
              <span className="text-black/80 text-[11px]">
                <span className="font-bold text-[#1A1A1A]">{selectedDay.formattedDate}:</span>{" "}
                <span className="text-[#16856B] font-bold">{selectedDay.total} Calls</span>{" "}
                <span className="text-black/50">
                  ({selectedDay.inbound} In &bull; {selectedDay.outbound} Out)
                </span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[10.5px] font-semibold text-black/50 shrink-0">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div
                title="0 Calls"
                className="w-3 h-3 rounded-[2.5px] bg-[#F2F4F2] border border-black/[0.06] flex items-center justify-center"
              >
                <span className="w-1 h-1 rounded-full bg-[#629774]/70" />
              </div>
              <span
                title="1–6 Calls"
                style={{ backgroundColor: palette.colors.heatmapTiers[0] }}
                className="w-3 h-3 rounded-[2.5px]"
              />
              <span
                title="7–14 Calls"
                style={{ backgroundColor: palette.colors.heatmapTiers[1] }}
                className="w-3 h-3 rounded-[2.5px]"
              />
              <span
                title="15–22 Calls"
                style={{ backgroundColor: palette.colors.heatmapTiers[2] }}
                className="w-3 h-3 rounded-[2.5px]"
              />
              <span
                title="23+ Calls"
                style={{ backgroundColor: palette.colors.heatmapTiers[3] }}
                className="w-3 h-3 rounded-[2.5px]"
              />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. RIGHT CARD: HOURLY CONCURRENCY (24h of Selected Day)                   */}
      {/* Real-time sync with clicked day on left                                    */}
      {/* ========================================================================= */}
      <div className="lg:col-span-5 xl:col-span-5 bg-[#FAFBF9] text-[#1A1A1A] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] shadow-sm flex flex-col justify-between space-y-3.5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF3E4] border border-[#FFA98B]/30 flex items-center justify-center text-[#1A1A1A] shrink-0">
              <Clock className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base tracking-tight text-[#1A1A1A]">
                  Hourly Concurrency
                </h3>
                <span className="text-[10px] font-semibold text-black/60 bg-black/[0.05] px-2 py-0.5 rounded-full">
                  1 Dot = 1h
                </span>
              </div>
              <p className="text-[11px] text-black/55 mt-0.5">
                {selectedDay.fullDateString}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#E8F5EF] border border-[#16856B]/30 text-[#16856B] text-xs font-bold shadow-2xs">
            <span>{selectedDay.total} Calls</span>
          </div>
        </div>

        {/* 2 Mini Side-by-Side Concurrency Panels: Inbound (Rose) & Outbound (Purple) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
          {/* INBOUND MINI CARD */}
          <div className="bg-[#FBF4F5] p-2.5 rounded-xl sm:rounded-2xl border border-rose-200/40 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1.5 border-b border-rose-200/40">
              <div className="flex items-center gap-1.5">
                <PhoneIncoming className="w-3.5 h-3.5 text-rose-600 stroke-[2.2]" />
                <span className="font-bold text-xs text-rose-900">Inbound</span>
              </div>
              <span className="text-[10.5px] font-bold text-rose-700 bg-white/80 px-2 py-0.5 rounded-full border border-rose-200/60">
                {selectedDay.inbound}
              </span>
            </div>

            {/* 24 Hours in 6 Cols x 4 Rows */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                gap: "4px",
              }}
              className="w-full"
            >
              {selectedDay.hourly.map((slot) => {
                const isHovered = activeHourIndex === slot.hour;
                const isQuiet = slot.inbound === 0;

                if (isQuiet) {
                  return (
                    <div
                      key={`in_${slot.hour}`}
                      onClick={() => handleHourClick(slot.hour)}
                      onMouseEnter={() => setHoveredHour(slot.hour)}
                      onMouseLeave={() => setHoveredHour(null)}
                      title={`${slot.formattedHour}: 0 Inbound`}
                      className={`h-8 rounded-[5px] p-0.5 flex flex-col justify-between items-center cursor-pointer transition-all ${
                        isHovered
                          ? "bg-rose-100 border border-rose-300 ring-1 ring-rose-400 scale-105 z-10"
                          : "bg-white/60 hover:bg-white border border-rose-100/60"
                      }`}
                    >
                      <span className="text-[7.5px] font-medium text-black/35 leading-none">
                        {String(slot.hour).padStart(2, "0")}h
                      </span>
                      <span className="w-1 h-1 rounded-full bg-rose-300/70" />
                    </div>
                  );
                }

                const tileClass = getInboundHourColor(slot.inbound);

                return (
                  <div
                    key={`in_${slot.hour}`}
                    onClick={() => handleHourClick(slot.hour)}
                    onMouseEnter={() => setHoveredHour(slot.hour)}
                    onMouseLeave={() => setHoveredHour(null)}
                    title={`${slot.formattedHour}: ${slot.inbound} Inbound Calls`}
                    className={`h-8 rounded-[5px] p-0.5 flex flex-col justify-between items-center cursor-pointer transition-all relative ${tileClass} ${
                      isHovered
                        ? "ring-2 ring-rose-600 scale-105 z-20 shadow-xs"
                        : "hover:scale-105"
                    }`}
                  >
                    <span className="text-[7.5px] font-bold leading-none opacity-85">
                      {String(slot.hour).padStart(2, "0")}h
                    </span>
                    <span className="text-[10.5px] font-black leading-none">
                      {slot.inbound}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Time labels */}
            <div className="flex justify-between text-[8px] font-semibold text-black/40 pt-0.5 px-0.5">
              <span>00h</span>
              <span>06h</span>
              <span>12h</span>
              <span>18h</span>
            </div>
          </div>

          {/* OUTBOUND MINI CARD */}
          <div className="bg-[#F8F4FA] p-2.5 rounded-xl sm:rounded-2xl border border-purple-200/40 space-y-2 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-1.5 border-b border-purple-200/40">
              <div className="flex items-center gap-1.5">
                <PhoneOutgoing className="w-3.5 h-3.5 text-purple-600 stroke-[2.2]" />
                <span className="font-bold text-xs text-purple-900">Outbound</span>
              </div>
              <span className="text-[10.5px] font-bold text-purple-700 bg-white/80 px-2 py-0.5 rounded-full border border-purple-200/60">
                {selectedDay.outbound}
              </span>
            </div>

            {/* 24 Hours in 6 Cols x 4 Rows */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                gap: "4px",
              }}
              className="w-full"
            >
              {selectedDay.hourly.map((slot) => {
                const isHovered = activeHourIndex === slot.hour;
                const isQuiet = slot.outbound === 0;

                if (isQuiet) {
                  return (
                    <div
                      key={`out_${slot.hour}`}
                      onClick={() => handleHourClick(slot.hour)}
                      onMouseEnter={() => setHoveredHour(slot.hour)}
                      onMouseLeave={() => setHoveredHour(null)}
                      title={`${slot.formattedHour}: 0 Outbound`}
                      className={`h-8 rounded-[5px] p-0.5 flex flex-col justify-between items-center cursor-pointer transition-all ${
                        isHovered
                          ? "bg-purple-100 border border-purple-300 ring-1 ring-purple-400 scale-105 z-10"
                          : "bg-white/60 hover:bg-white border border-purple-100/60"
                      }`}
                    >
                      <span className="text-[7.5px] font-medium text-black/35 leading-none">
                        {String(slot.hour).padStart(2, "0")}h
                      </span>
                      <span className="w-1 h-1 rounded-full bg-purple-300/70" />
                    </div>
                  );
                }

                const tileClass = getOutboundHourColor(slot.outbound);

                return (
                  <div
                    key={`out_${slot.hour}`}
                    onClick={() => handleHourClick(slot.hour)}
                    onMouseEnter={() => setHoveredHour(slot.hour)}
                    onMouseLeave={() => setHoveredHour(null)}
                    title={`${slot.formattedHour}: ${slot.outbound} Outbound Calls`}
                    className={`h-8 rounded-[5px] p-0.5 flex flex-col justify-between items-center cursor-pointer transition-all relative ${tileClass} ${
                      isHovered
                        ? "ring-2 ring-purple-600 scale-105 z-20 shadow-xs"
                        : "hover:scale-105"
                    }`}
                  >
                    <span className="text-[7.5px] font-bold leading-none opacity-85">
                      {String(slot.hour).padStart(2, "0")}h
                    </span>
                    <span className="text-[10.5px] font-black leading-none">
                      {slot.outbound}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Time labels */}
            <div className="flex justify-between text-[8px] font-semibold text-black/40 pt-0.5 px-0.5">
              <span>00h</span>
              <span>06h</span>
              <span>12h</span>
              <span>18h</span>
            </div>
          </div>
        </div>

        {/* Bottom Concurrency Telemetry Bar */}
        <div className="flex items-center justify-between pt-1 border-t border-black/[0.06] text-[11px] font-semibold text-black/60 w-full">
          {activeHourSlot ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-[#1A1A1A]">
                <span className="font-bold">{activeHourSlot.label}:</span>{" "}
                <span className="text-[#16856B] font-bold">{activeHourSlot.total} concurrent</span>{" "}
                <span className="text-black/45 font-normal">
                  ({activeHourSlot.inbound} In &bull; {activeHourSlot.outbound} Out)
                </span>
              </span>
              <button
                onClick={() => setSelectedHour(null)}
                className="text-[10px] text-black/50 hover:text-black underline cursor-pointer"
              >
                Clear
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-black/55 text-[10.5px]">
                Hover any 1h slot to inspect concurrent SIP trunks
              </span>
              <span className="text-[#16856B] text-[10.5px] font-bold flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[2.5]" /> Sub-140ms SLA
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


