/**
 * Phone number validation and E.164 normalization,
 * plus timezone conversion and formatting utilities.
 */

export interface PhoneValidationResult {
  isValid: boolean;
  normalized: string;
  display: string;
  error?: string;
}

export const COMMON_TIMEZONES = [
  { value: "Asia/Kolkata", label: "India Standard Time (IST) - GMT+5:30" },
  { value: "Asia/Dubai", label: "Gulf Standard Time (GST) - GMT+4:00" },
  { value: "Asia/Singapore", label: "Singapore / Malaysia (SGT) - GMT+8:00" },
  { value: "Europe/London", label: "London / UK (GMT/BST) - GMT+0/+1" },
  { value: "Europe/Berlin", label: "Central European Time (CET) - GMT+1/+2" },
  { value: "America/New_York", label: "US Eastern Time (ET) - GMT-5/-4" },
  { value: "America/Chicago", label: "US Central Time (CT) - GMT-6/-5" },
  { value: "America/Denver", label: "US Mountain Time (MT) - GMT-7/-6" },
  { value: "America/Los_Angeles", label: "US Pacific Time (PT) - GMT-8/-7" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET) - GMT+10/+11" },
  { value: "UTC", label: "Coordinated Universal Time (UTC) - GMT+0" },
];

/**
 * Normalizes phone numbers to standard E.164 format.
 * Defaults 10-digit Indian numbers to +91.
 */
export function normalizePhoneNumber(raw: string): PhoneValidationResult {
  if (!raw || typeof raw !== "string") {
    return { isValid: false, normalized: "", display: "", error: "Phone number is empty" };
  }

  // Strip spaces, dashes, periods, brackets
  const cleaned = raw.trim().replace(/[\s\-\(\)\.]/g, "");

  // Check if starts with +
  if (cleaned.startsWith("+")) {
    const digitsOnly = cleaned.slice(1);
    if (!/^\d{10,15}$/.test(digitsOnly)) {
      return {
        isValid: false,
        normalized: cleaned,
        display: cleaned,
        error: "International number must have 10-15 digits",
      };
    }
    return {
      isValid: true,
      normalized: `+${digitsOnly}`,
      display: formatPhoneForDisplay(`+${digitsOnly}`),
    };
  }

  // If starts with 0 and 11 digits (Indian STD format 09840122345)
  if (cleaned.startsWith("0") && cleaned.length === 11 && /^\d+$/.test(cleaned)) {
    const norm = `+91${cleaned.slice(1)}`;
    return {
      isValid: true,
      normalized: norm,
      display: formatPhoneForDisplay(norm),
    };
  }

  // If 10 digits (Standard Indian mobile number 9840122345)
  if (/^\d{10}$/.test(cleaned)) {
    const norm = `+91${cleaned}`;
    return {
      isValid: true,
      normalized: norm,
      display: formatPhoneForDisplay(norm),
    };
  }

  // If 12 digits starting with 91 (e.g. 919840122345)
  if (/^91\d{10}$/.test(cleaned)) {
    const norm = `+${cleaned}`;
    return {
      isValid: true,
      normalized: norm,
      display: formatPhoneForDisplay(norm),
    };
  }

  return {
    isValid: false,
    normalized: cleaned,
    display: cleaned,
    error: "Invalid phone number format. Expected 10 digits or E.164 (+91...)",
  };
}

export function formatPhoneForDisplay(e164: string): string {
  if (e164.startsWith("+91") && e164.length === 13) {
    // +91 98401 22345
    return `+91 ${e164.slice(3, 8)} ${e164.slice(8)}`;
  }
  return e164;
}

/**
 * Converts a local date, time, and IANA timezone into an exact UTC ISO string.
 */
export function convertLocalToUtc(
  dateStr: string, // YYYY-MM-DD
  timeStr: string, // HH:mm
  timeZone: string
): string {
  if (!dateStr || !timeStr) {
    throw new Error("Date and time must be provided");
  }

  // Build a test date string
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Guess UTC timestamp by constructing a Date as UTC first
  const naiveUtc = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));

  // Determine timezone offset for the target timezone at this moment
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(naiveUtc);
  const getPart = (type: string) => Number(parts.find((p) => p.type === type)?.value || 0);

  const tzYear = getPart("year");
  const tzMonth = getPart("month");
  const tzDay = getPart("day");
  let tzHour = getPart("hour");
  if (tzHour === 24) tzHour = 0;
  const tzMinute = getPart("minute");

  const tzDateAsUtc = new Date(Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, 0));
  const offsetDiffMs = tzDateAsUtc.getTime() - naiveUtc.getTime();

  // Correct naive UTC by subtracting the offset
  const accurateUtc = new Date(naiveUtc.getTime() - offsetDiffMs);
  return accurateUtc.toISOString();
}

/**
 * Formats a UTC ISO string in the target IANA timezone for user readability.
 */
export function formatUtcToLocal(
  utcIso: string,
  timeZone: string,
  includeTimezoneName = true
): string {
  try {
    const date = new Date(utcIso);
    if (isNaN(date.getTime())) return "Invalid date";

    const options: Intl.DateTimeFormatOptions = {
      timeZone,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: includeTimezoneName ? "short" : undefined,
    };

    return new Intl.DateTimeFormat("en-IN", options).format(date);
  } catch {
    return utcIso;
  }
}

/**
 * Validates that the scheduled time is in the future.
 */
export function isFutureTime(utcIso: string, bufferSeconds = 30): boolean {
  try {
    const time = new Date(utcIso).getTime();
    return time > Date.now() + bufferSeconds * 1000;
  } catch {
    return false;
  }
}

/**
 * Detects the client's current timezone or falls back to Asia/Kolkata
 */
export function getDefaultTimezone(): string {
  try {
    const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (detected) return detected;
  } catch {}
  return "Asia/Kolkata";
}
