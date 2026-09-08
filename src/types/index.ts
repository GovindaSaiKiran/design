export interface CallLog {
  id: string;
  callerNumber: string;
  callerName?: string;
  timestamp: string;
  timeFormatted: string;
  duration: string;
  status: "completed" | "in_progress" | "escalated" | "missed";
  sentiment: "positive" | "neutral" | "high_interest" | "needs_attention";
  courseInquired: string;
  qualificationScore: number;
  intent: string;
  transcriptPreview: string;
  summary: string;
  handoffReason?: string;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  targetCourse: string;
  academicYear: string;
  qualificationScore: number; // 0 to 100
  status: "Hot Lead" | "Campus Visit Booked" | "Application Submitted" | "Counselor Follow-up";
  inquiryDate: string;
  intentTags: string[];
  sentiment: "Positive" | "Neutral" | "Very High";
  assignedCounselor?: string;
}

export interface MayaCapability {
  id: string;
  title: string;
  shortTag: string;
  iconName: string;
  summary: string;
  metrics: string;
  details: string[];
  sampleAudioPrompt: string;
  sampleMayaResponse: string;
}

export interface InstitutionalDocument {
  id: string;
  title: string;
  category: "Fees & Scholarships" | "Academics & Eligibility" | "Campus & Hostel" | "Admissions Policy";
  fileSize: string;
  lastUpdated: string;
  vectorStatus: "Indexed & Grounded" | "Active 100%";
  sampleQuestions: {
    question: string;
    answer: string;
    citation: string;
  }[];
}

export interface AnalyticsSummary {
  totalCalls: number;
  totalMinutes: number;
  leadsCaptured: number;
  conversionRate: number;
  humanHandoffs: number;
  aiResolutionRate: number;
  avgCallDurationSec: number;
  topInquiryTopics: {
    topic: string;
    percentage: number;
    count: number;
  }[];
  hourlyTraffic: {
    hour: string;
    calls: number;
    missedWithoutAI: number;
  }[];
}
