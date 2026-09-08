import { AnalyticsSummary } from "@/types";

export const mockAnalytics: AnalyticsSummary = {
  totalCalls: 842,
  totalMinutes: 2680,
  leadsCaptured: 412,
  conversionRate: 48.9,
  humanHandoffs: 28,
  aiResolutionRate: 96.7,
  avgCallDurationSec: 191, // ~3m 11s
  topInquiryTopics: [
    { topic: "Fee Structure & Scholarships", percentage: 41, count: 345 },
    { topic: "Cutoffs & Eligibility Criteria", percentage: 27, count: 227 },
    { topic: "Campus Life, Hostels & Security", percentage: 16, count: 135 },
    { topic: "Placements & Industry Tie-ups", percentage: 11, count: 93 },
    { topic: "Application Deadlines & Form Help", percentage: 5, count: 42 }
  ],
  hourlyTraffic: [
    { hour: "08:00", calls: 14, missedWithoutAI: 12 },
    { hour: "10:00", calls: 48, missedWithoutAI: 22 },
    { hour: "12:00", calls: 62, missedWithoutAI: 31 },
    { hour: "14:00", calls: 58, missedWithoutAI: 26 },
    { hour: "16:00", calls: 74, missedWithoutAI: 40 },
    { hour: "18:00", calls: 92, missedWithoutAI: 68 }, // Peak after-hours
    { hour: "20:00", calls: 115, missedWithoutAI: 115 }, // Office closed!
    { hour: "22:00", calls: 86, missedWithoutAI: 86 }, // Office closed!
    { hour: "00:00", calls: 38, missedWithoutAI: 38 } // Office closed!
  ]
};

export const weeklyPerformanceMetrics = [
  { day: "Mon", calls: 112, leads: 54, handoffs: 4 },
  { day: "Tue", calls: 128, leads: 62, handoffs: 3 },
  { day: "Wed", calls: 145, leads: 71, handoffs: 5 },
  { day: "Thu", calls: 138, leads: 67, handoffs: 4 },
  { day: "Fri", calls: 164, leads: 82, handoffs: 6 },
  { day: "Sat", calls: 95, leads: 48, handoffs: 3 },
  { day: "Sun", calls: 60, leads: 28, handoffs: 3 }
];
