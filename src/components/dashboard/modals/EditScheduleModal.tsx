"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, AlertCircle, Check } from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";
import { ScheduledCampaign } from "@/types/schedule";
import { schedulesApi } from "@/lib/api/schedulesApi";
import {
  COMMON_TIMEZONES,
  convertLocalToUtc,
  formatUtcToLocal,
  isFutureTime,
} from "@/lib/utils/phoneAndDateUtils";

interface EditScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: ScheduledCampaign | null;
  onUpdated: () => void;
}

export default function EditScheduleModal({
  isOpen,
  onClose,
  campaign,
  onUpdated,
}: EditScheduleModalProps) {
  // Extract initial date & time
  const [name, setName] = useState(campaign?.name || "");
  const [date, setDate] = useState(() => {
    if (!campaign?.scheduledAtUtc) return "";
    const d = new Date(campaign.scheduledAtUtc);
    return d.toISOString().split("T")[0];
  });
  const [time, setTime] = useState(() => {
    if (!campaign?.scheduledAtUtc) return "10:00";
    const d = new Date(campaign.scheduledAtUtc);
    const hrs = String(d.getHours()).padStart(2, "0");
    const mins = String(d.getMinutes()).padStart(2, "0");
    return `${hrs}:${mins}`;
  });
  const [timezone, setTimezone] = useState(campaign?.timezone || "Asia/Kolkata");
  const [concurrency, setConcurrency] = useState(
    campaign?.callingWindow?.concurrencyLimit || 20
  );
  const [pacing, setPacing] = useState(
    campaign?.callingWindow?.pacingDelaySec || 2
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (campaign) {
      setName(campaign.name || "");
      if (campaign.scheduledAtUtc) {
        const d = new Date(campaign.scheduledAtUtc);
        setDate(d.toISOString().split("T")[0]);
        const hrs = String(d.getHours()).padStart(2, "0");
        const mins = String(d.getMinutes()).padStart(2, "0");
        setTime(`${hrs}:${mins}`);
      }
      setTimezone(campaign.timezone || "Asia/Kolkata");
      setConcurrency(campaign.callingWindow?.concurrencyLimit || 20);
      setPacing(campaign.callingWindow?.pacingDelaySec || 2);
    }
  }, [campaign]);

  if (!isOpen || !campaign) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Campaign name is required");
      return;
    }

    if (!date || !time) {
      setErrorMsg("Date and time are required");
      return;
    }

    try {
      const newUtc = convertLocalToUtc(date, time, timezone);
      if (!isFutureTime(newUtc, 30)) {
        setErrorMsg("Scheduled time must be at least 1 minute in the future");
        return;
      }

      setLoading(true);
      await schedulesApi.editSchedule(campaign.id, {
        name: name.trim(),
        scheduledDate: date,
        scheduledTime: time,
        timezone,
        callingWindow: {
          concurrencyLimit: concurrency,
          pacingDelaySec: pacing,
        },
      });

      try { soundSynth.play("confirm"); } catch {}
      onUpdated();
      onClose();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to update schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/25 backdrop-blur-xs animate-in fade-in duration-150 select-none font-sans text-[#1A1A1A]"
    >
      <div className="relative w-full max-w-md bg-white rounded-[26px] border border-black/[0.08] shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF3E4] text-[#733F00] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#1A1A1A]">Reschedule Campaign</h3>
              <p className="text-[11px] text-black/45">Update execution window and pacing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-black/40 hover:text-[#1A1A1A]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-3.5 my-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-black/70 mb-1">
              Campaign Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-full bg-[#FBF7ED] border border-black/[0.08] text-xs focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-black/70 mb-1">
                New Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-full bg-[#FBF7ED] border border-black/[0.08] text-xs focus:outline-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-black/70 mb-1">
                New Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 rounded-full bg-[#FBF7ED] border border-black/[0.08] text-xs focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-black/70 mb-1">
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-3 py-2 rounded-full bg-[#FBF7ED] border border-black/[0.08] text-xs focus:outline-none cursor-pointer"
            >
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <div className="flex justify-between text-[11px] font-medium text-black/70 mb-1">
                <span>Concurrency</span>
                <span className="font-bold text-[#1A1A1A]">{concurrency} lines</span>
              </div>
              <input
                type="range"
                min={5}
                max={50}
                step={5}
                value={concurrency}
                onChange={(e) => setConcurrency(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-[11px] font-medium text-black/70 mb-1">
                <span>Pacing Delay</span>
                <span className="font-bold text-[#1A1A1A]">{pacing}s</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={pacing}
                onChange={(e) => setPacing(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-[11px] font-medium flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-black/[0.06]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-black/60 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-full text-xs font-semibold bg-[#111111] text-white hover:bg-black transition-all cursor-pointer shadow-xs"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
