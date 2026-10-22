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
  Sparkles,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  Radio,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";
import { usePalette } from "@/context/PaletteContext";
import { Blob, Shape, Sparkle } from "@/components/ui/Shapes";

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
          rawTotal = p > 0.45 ? Math.floor(650 + pseudoRandom(2) * 800) : 320;
        } else {
          if (p < 0.12) rawTotal = Math.floor(1400 + pseudoRandom(2) * 600); // Lighter weekday
          else if (p < 0.35) rawTotal = Math.floor(2800 + pseudoRandom(2) * 1200); // Standard weekday
          else if (p < 0.70) rawTotal = Math.floor(5200 + pseudoRandom(3) * 1600); // Heavy campaign day
          else rawTotal = Math.floor(7500 + pseudoRandom(5) * 1800); // Mega campaign day
        }
      }

      const adjustedTotal = isToday ? 8600 : rawTotal;

      const inboundRatio = isToday ? 5180 / 8600 : 0.58 + (pseudoRandom(2) - 0.5) * 0.1;
      const inbound = isFuture ? 0 : (isToday ? 5180 : Math.round(adjustedTotal * inboundRatio));
      const outbound = isFuture ? 0 : (isToday ? 3420 : Math.max(0, adjustedTotal - inbound));

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
  const [hourlyViewMode, setHourlyViewMode] = useState<"all" | "inbound" | "outbound">("all");

  // Calculate metrics for hourly concurrency
  const hourlyMetrics = useMemo(() => {
    const hourly = selectedDay.hourly;
    let peak = hourly[0];
    let inPeak = hourly[0];
    let outPeak = hourly[0];

    for (const h of hourly) {
      if (h.total > peak.total) peak = h;
      if (h.inbound > inPeak.inbound) inPeak = h;
      if (h.outbound > outPeak.outbound) outPeak = h;
    }

    return { peak, inPeak, outPeak };
  }, [selectedDay]);

  const amHours = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], []);
  const pmHours = useMemo(() => [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], []);

  const amLabels = useMemo(() => ["12a", "1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a"], []);
  const pmLabels = useMemo(() => ["12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p"], []);

  const amTotals = useMemo(() => {
    let inbound = 0;
    let outbound = 0;
    for (const h of amHours) {
      inbound += selectedDay.hourly[h].inbound;
      outbound += selectedDay.hourly[h].outbound;
    }
    return { inbound, outbound, total: inbound + outbound };
  }, [selectedDay, amHours]);

  const pmTotals = useMemo(() => {
    let inbound = 0;
    let outbound = 0;
    for (const h of pmHours) {
      inbound += selectedDay.hourly[h].inbound;
      outbound += selectedDay.hourly[h].outbound;
    }
    return { inbound, outbound, total: inbound + outbound };
  }, [selectedDay, pmHours]);

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
    if (count <= 1800) {
      return { backgroundColor: tiers[0] };
    }
    if (count <= 4200) {
      return { backgroundColor: tiers[1] };
    }
    if (count <= 6800) {
      return { backgroundColor: tiers[2] };
    }
    return { backgroundColor: tiers[3] };
  };

  // Inbound Hourly Palette (4 Tiers matching Inspiration Rose aesthetic)
  const getInboundHourColor = (count: number) => {
    if (count <= 80) {
      // Tier 1: Soft Rose Quartz
      return "bg-[#FFE4E6] text-[#9F1239] border border-[#FECDD3]";
    }
    if (count <= 220) {
      // Tier 2: Fresh Coral Rose
      return "bg-[#FDA4AF] text-[#881337] border border-[#FB7185]";
    }
    if (count <= 420) {
      // Tier 3: Rich Crimson Rose
      return "bg-[#F43F5E] text-white border border-[#E11D48] shadow-xs";
    }
    // Tier 4: Deep Burgundy Ruby
    return "bg-[#9F1239] text-white border border-[#881337] shadow-sm";
  };

  // Outbound Hourly Palette (4 Tiers matching Inspiration Purple aesthetic)
  const getOutboundHourColor = (count: number) => {
    if (count <= 60) {
      // Tier 1: Soft Lavender Mist
      return "bg-[#F3E8FF] text-[#6B21A8] border border-[#E9D5FF]";
    }
    if (count <= 160) {
      // Tier 2: Fresh Orchid Purple
      return "bg-[#D8B4FE] text-[#581C87] border border-[#C084FC]";
    }
    if (count <= 320) {
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
      <div id="telephony-matrix" className="lg:col-span-7 xl:col-span-7 bg-[#FAFBF9] text-[#1A1A1A] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] shadow-sm flex flex-col justify-between space-y-3.5 scroll-mt-24">
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
      {/* Direct AM/PM 24-hour matrix - Simple, clean, intuitive                   */}
      {/* ========================================================================= */}
      <div id="hourly-concurrency" className="lg:col-span-5 xl:col-span-5 bg-[#FAFBF9] text-[#1A1A1A] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-black/[0.06] shadow-sm flex flex-col justify-between space-y-3 scroll-mt-24">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF0D7] border border-[#FFA98B]/40 flex items-center justify-center text-[#D9532F] shrink-0">
              <Clock className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base tracking-tight text-[#1A1A1A]">
                  Hourly Concurrency
                </h3>
                <span className="text-[10px] font-bold text-[#16856B] bg-[#E8F5EF] px-2 py-0.5 rounded-full border border-[#16856B]/25">
                  1 Cell = 1 Hour
                </span>
              </div>
              <p className="text-[11px] text-black/55 mt-0.5 font-medium">
                {selectedDay.fullDateString}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.08] text-[#1A1A1A] text-xs font-black shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#16856B] animate-pulse" />
            <span>{selectedDay.total} Calls</span>
          </div>
        </div>

        {/* 24-HOUR CLEAN MATRIX CANVAS (AM 12h & PM 12h) */}
        <div className="bg-[#F2F4F2] p-3 rounded-xl border border-black/[0.04] w-full space-y-3.5">
          {/* 1. AM HOURS (12 AM to 11 AM) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-black/75 px-0.5">
              <span className="px-2 py-0.5 rounded-md bg-white border border-black/[0.08] text-[10px] sm:text-[10.5px] font-extrabold text-[#1A1A1A] shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                AM (12 AM – 11 AM)
              </span>
              <span className="text-[10.5px] font-medium text-black/55">
                {amTotals.total} Calls <span className="text-black/30">&bull;</span> <span className="text-rose-700 font-bold">{amTotals.inbound} In</span> <span className="text-black/30">&bull;</span> <span className="text-purple-700 font-bold">{amTotals.outbound} Out</span>
              </span>
            </div>

            <div className="w-full">
              {/* Hour Headers */}
              <div className="flex items-center w-full">
                <div className="w-16 sm:w-18 shrink-0" />
                <div className="grid grid-cols-12 gap-1 flex-1">
                  {amLabels.map((lbl, idx) => {
                    const h = amHours[idx];
                    const isColActive = activeHourIndex === h;
                    const hasActivity = selectedDay.hourly[h].total > 0;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleHourClick(h)}
                        onMouseEnter={() => setHoveredHour(h)}
                        onMouseLeave={() => setHoveredHour(null)}
                        className={`text-center text-[10px] cursor-pointer transition-colors select-none ${
                          isColActive
                            ? "font-black text-[#16856B]"
                            : hasActivity
                            ? "font-extrabold text-[#1A1A1A]"
                            : "font-semibold text-black/45 hover:text-black/70"
                        }`}
                      >
                        {lbl}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inbound Row */}
              <div className="flex items-center w-full mt-1">
                <div className="w-16 sm:w-18 shrink-0 flex items-center select-none">
                  <span className="px-1.5 py-0.5 rounded bg-rose-100/60 border border-rose-200/60 text-[9.5px] sm:text-[10px] font-extrabold text-rose-800 flex items-center gap-1">
                    <PhoneIncoming className="w-2.5 h-2.5 text-rose-600 stroke-[2.5]" />
                    Inbound
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-1 flex-1">
                  {amHours.map((h) => {
                    const slot = selectedDay.hourly[h];
                    const count = slot.inbound;
                    const isHovered = activeHourIndex === h;
                    const isSelected = selectedHour === h;

                    return (
                      <div
                        key={h}
                        onClick={() => handleHourClick(h)}
                        onMouseEnter={() => setHoveredHour(h)}
                        onMouseLeave={() => setHoveredHour(null)}
                        title={`${slot.formattedHour}: ${count} Inbound Calls`}
                        className={`h-7.5 sm:h-8 w-full rounded-[5px] flex items-center justify-center cursor-pointer transition-all duration-150 text-[11px] font-bold ${
                          count === 0
                            ? isHovered || isSelected
                              ? "bg-rose-100 ring-2 ring-rose-500 scale-105 z-10"
                              : "bg-white/70 hover:bg-white border border-black/[0.04] text-black/20 hover:scale-105"
                            : isHovered || isSelected
                            ? `${getInboundHourColor(count)} ring-2 ring-rose-700 ring-offset-1 scale-105 z-20 shadow-xs`
                            : `${getInboundHourColor(count)} hover:scale-105 shadow-2xs`
                        }`}
                      >
                        {count > 0 ? (
                          count
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400/35" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Outbound Row */}
              <div className="flex items-center w-full mt-1">
                <div className="w-16 sm:w-18 shrink-0 flex items-center select-none">
                  <span className="px-1.5 py-0.5 rounded bg-purple-100/60 border border-purple-200/60 text-[9.5px] sm:text-[10px] font-extrabold text-purple-800 flex items-center gap-1">
                    <PhoneOutgoing className="w-2.5 h-2.5 text-purple-600 stroke-[2.5]" />
                    Outbound
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-1 flex-1">
                  {amHours.map((h) => {
                    const slot = selectedDay.hourly[h];
                    const count = slot.outbound;
                    const isHovered = activeHourIndex === h;
                    const isSelected = selectedHour === h;

                    return (
                      <div
                        key={h}
                        onClick={() => handleHourClick(h)}
                        onMouseEnter={() => setHoveredHour(h)}
                        onMouseLeave={() => setHoveredHour(null)}
                        title={`${slot.formattedHour}: ${count} Outbound Calls`}
                        className={`h-7.5 sm:h-8 w-full rounded-[5px] flex items-center justify-center cursor-pointer transition-all duration-150 text-[11px] font-bold ${
                          count === 0
                            ? isHovered || isSelected
                              ? "bg-purple-100 ring-2 ring-purple-500 scale-105 z-10"
                              : "bg-white/70 hover:bg-white border border-black/[0.04] text-black/20 hover:scale-105"
                            : isHovered || isSelected
                            ? `${getOutboundHourColor(count)} ring-2 ring-purple-700 ring-offset-1 scale-105 z-20 shadow-xs`
                            : `${getOutboundHourColor(count)} hover:scale-105 shadow-2xs`
                        }`}
                      >
                        {count > 0 ? (
                          count
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/35" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Clean Thin Divider */}
          <div className="w-full h-[1px] bg-black/[0.06]" />

          {/* 2. PM HOURS (12 PM to 11 PM) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-black/75 px-0.5">
              <span className="px-2 py-0.5 rounded-md bg-white border border-black/[0.08] text-[10px] sm:text-[10.5px] font-extrabold text-[#1A1A1A] shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                PM (12 PM – 11 PM)
              </span>
              <span className="text-[10.5px] font-medium text-black/55">
                {pmTotals.total} Calls <span className="text-black/30">&bull;</span> <span className="text-rose-700 font-bold">{pmTotals.inbound} In</span> <span className="text-black/30">&bull;</span> <span className="text-purple-700 font-bold">{pmTotals.outbound} Out</span>
              </span>
            </div>

            <div className="w-full">
              {/* Hour Headers */}
              <div className="flex items-center w-full">
                <div className="w-16 sm:w-18 shrink-0" />
                <div className="grid grid-cols-12 gap-1 flex-1">
                  {pmLabels.map((lbl, idx) => {
                    const h = pmHours[idx];
                    const isColActive = activeHourIndex === h;
                    const hasActivity = selectedDay.hourly[h].total > 0;
                    return (
                      <div
                        key={idx}
                        onClick={() => handleHourClick(h)}
                        onMouseEnter={() => setHoveredHour(h)}
                        onMouseLeave={() => setHoveredHour(null)}
                        className={`text-center text-[10px] cursor-pointer transition-colors select-none ${
                          isColActive
                            ? "font-black text-[#16856B]"
                            : hasActivity
                            ? "font-extrabold text-[#1A1A1A]"
                            : "font-semibold text-black/45 hover:text-black/70"
                        }`}
                      >
                        {lbl}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Inbound Row */}
              <div className="flex items-center w-full mt-1">
                <div className="w-16 sm:w-18 shrink-0 flex items-center select-none">
                  <span className="px-1.5 py-0.5 rounded bg-rose-100/60 border border-rose-200/60 text-[9.5px] sm:text-[10px] font-extrabold text-rose-800 flex items-center gap-1">
                    <PhoneIncoming className="w-2.5 h-2.5 text-rose-600 stroke-[2.5]" />
                    Inbound
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-1 flex-1">
                  {pmHours.map((h) => {
                    const slot = selectedDay.hourly[h];
                    const count = slot.inbound;
                    const isHovered = activeHourIndex === h;
                    const isSelected = selectedHour === h;

                    return (
                      <div
                        key={h}
                        onClick={() => handleHourClick(h)}
                        onMouseEnter={() => setHoveredHour(h)}
                        onMouseLeave={() => setHoveredHour(null)}
                        title={`${slot.formattedHour}: ${count} Inbound Calls`}
                        className={`h-7.5 sm:h-8 w-full rounded-[5px] flex items-center justify-center cursor-pointer transition-all duration-150 text-[11px] font-bold ${
                          count === 0
                            ? isHovered || isSelected
                              ? "bg-rose-100 ring-2 ring-rose-500 scale-105 z-10"
                              : "bg-white/70 hover:bg-white border border-black/[0.04] text-black/20 hover:scale-105"
                            : isHovered || isSelected
                            ? `${getInboundHourColor(count)} ring-2 ring-rose-700 ring-offset-1 scale-105 z-20 shadow-xs`
                            : `${getInboundHourColor(count)} hover:scale-105 shadow-2xs`
                        }`}
                      >
                        {count > 0 ? (
                          count
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400/35" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Outbound Row */}
              <div className="flex items-center w-full mt-1">
                <div className="w-16 sm:w-18 shrink-0 flex items-center select-none">
                  <span className="px-1.5 py-0.5 rounded bg-purple-100/60 border border-purple-200/60 text-[9.5px] sm:text-[10px] font-extrabold text-purple-800 flex items-center gap-1">
                    <PhoneOutgoing className="w-2.5 h-2.5 text-purple-600 stroke-[2.5]" />
                    Outbound
                  </span>
                </div>
                <div className="grid grid-cols-12 gap-1 flex-1">
                  {pmHours.map((h) => {
                    const slot = selectedDay.hourly[h];
                    const count = slot.outbound;
                    const isHovered = activeHourIndex === h;
                    const isSelected = selectedHour === h;

                    return (
                      <div
                        key={h}
                        onClick={() => handleHourClick(h)}
                        onMouseEnter={() => setHoveredHour(h)}
                        onMouseLeave={() => setHoveredHour(null)}
                        title={`${slot.formattedHour}: ${count} Outbound Calls`}
                        className={`h-7.5 sm:h-8 w-full rounded-[5px] flex items-center justify-center cursor-pointer transition-all duration-150 text-[11px] font-bold ${
                          count === 0
                            ? isHovered || isSelected
                              ? "bg-purple-100 ring-2 ring-purple-500 scale-105 z-10"
                              : "bg-white/70 hover:bg-white border border-black/[0.04] text-black/20 hover:scale-105"
                            : isHovered || isSelected
                            ? `${getOutboundHourColor(count)} ring-2 ring-purple-700 ring-offset-1 scale-105 z-20 shadow-xs`
                            : `${getOutboundHourColor(count)} hover:scale-105 shadow-2xs`
                        }`}
                      >
                        {count > 0 ? (
                          count
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/35" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Concurrency Telemetry Bar */}
        <div className="pt-2 border-t border-black/[0.06] w-full">
          {activeHourSlot ? (
            <div className="bg-[#F2F4F2] rounded-xl p-2.5 border border-black/[0.05] flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300/60 flex items-center justify-center text-emerald-800 shrink-0 font-extrabold text-xs">
                  {activeHourSlot.formattedHour}
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A1A1A]">
                    <span>{activeHourSlot.formattedHour} Telemetry</span>
                    <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.2 rounded-md text-[10px]">
                      {activeHourSlot.total} Total Calls
                    </span>
                  </div>
                  <div className="text-[10.5px] text-black/60 flex items-center gap-2 mt-0.5">
                    <span className="text-rose-700 font-semibold flex items-center gap-1">
                      <PhoneIncoming className="w-3 h-3 text-rose-500" />
                      {activeHourSlot.inbound} Inbound
                    </span>
                    <span>&bull;</span>
                    <span className="text-purple-700 font-semibold flex items-center gap-1">
                      <PhoneOutgoing className="w-3 h-3 text-purple-500" />
                      {activeHourSlot.outbound} Outbound
                    </span>
                    <span>&bull;</span>
                    <span className="text-emerald-700 font-semibold">114ms Latency</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedHour(null);
                  setHoveredHour(null);
                }}
                className="px-2.5 py-1 text-[10.5px] rounded-lg bg-white border border-black/10 text-black/70 hover:text-black hover:border-black/30 font-bold cursor-pointer transition-all shadow-2xs"
              >
                Clear
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[10.5px] font-semibold text-black/60 px-1">
              <div className="flex items-center gap-1.5">
                <span>
                  Peak: <strong className="text-[#1A1A1A] font-extrabold">{hourlyMetrics.peak.total > 0 ? `${hourlyMetrics.peak.formattedHour} (${hourlyMetrics.peak.total} calls)` : "None"}</strong>
                </span>
              </div>

              {/* Inbound & Outbound Dual Legends */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-[9.5px] font-bold text-rose-800">Inbound</span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#FFE4E6] border border-[#FECDD3]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#FDA4AF] border border-[#FB7185]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F43F5E]" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[9.5px] font-bold text-purple-800">Outbound</span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F3E8FF] border border-[#E9D5FF]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#D8B4FE] border border-[#C084FC]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#A855F7]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

