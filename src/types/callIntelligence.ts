export type CallLifecycleStatus =
  | "queued"
  | "scheduled"
  | "starting"
  | "in-progress"
  | "completed"
  | "failed"
  | "no-answer"
  | "busy"
  | "cancelled"
  | "skipped";

export type CallOutcomeType =
  | "Enquiry answered"
  | "Interested"
  | "Not interested"
  | "Appointment confirmed"
  | "Follow-up requested"
  | "No useful outcome identified"
  | "Campus Tour Confirmed"
  | "Fee Plan Accepted"
  | "Hostel Room Reserved"
  | "Identity Verified"
  | "Callback Scheduled"
  | "Voicemail Left";

export type CallType = "inbound" | "outbound" | "normal" | "bulk";

export type CallingPurposeType =
  | "Admissions Enquiry Calls"
  | "Course Fee Follow-ups"
  | "Sales Outreach"
  | "Appointment Reminders"
  | "Customer Feedback Calls"
  | "Hostel Allotment Calls"
  | "Entrance Verification"
  | "Uncategorized";

export interface TranscriptTurn {
  id: number;
  speaker: "agent" | "caller" | "system";
  speakerName: string;
  time: string;
  text: string;
  sentiment?: "positive" | "neutral" | "urgent" | "negative";
  groundedDocCitation?: string;
}

export interface ExtractedFieldItem {
  key: string;
  label: string;
  value: string;
  confidence?: number; // 0 to 100
  isEdited?: boolean;
  editedBy?: string;
  editedAt?: string;
  originalValue?: string;
  verified?: boolean;
}

export interface GeneralKeyPoints {
  shortSummary: string;
  purposeOfConversation: string;
  mainQuestions: string[];
  needsAndInterests: string[];
  factsSupplied: string[];
  objectionsOrConcerns: string[];
  statedPreferences: string[];
  purchaseOrEnquiryIntent: "High" | "Medium" | "Low" | "Undetermined";
  agreedActions: string[];
  followUpRequired: boolean;
  followUpDateTime?: string; // Only if explicitly agreed
  finalOutcome: string;
  unresolvedQuestions: string[];
  notesForHumanTeam: string;
}

export interface AdmissionsKeyPoints {
  studentName?: string;
  courseOfInterest: string;
  previousQualification: string;
  academicDetails: string;
  admissionQuestions: string[];
  feeRelatedQuestions: string[];
  interestLevel: "High" | "Medium" | "Low";
  preferredNextStep: string;
  followUpRequired: boolean;
  followUpDateTime?: string;
}

export interface SalesKeyPoints {
  productOrService: string;
  customerRequirements: string;
  budgetCited?: string;
  purchaseIntent: "High" | "Moderate" | "Low" | "Exploring";
  objections: string[];
  requestedNextStep: string;
  followUpRequired: boolean;
  followUpDateTime?: string;
}

export interface AppointmentKeyPoints {
  appointmentDateTime?: string;
  confirmationStatus: "Confirmed" | "Rescheduled" | "Cancelled" | "Pending";
  requestedChanges?: string;
  reasonForRescheduling?: string;
  followUpRequired: boolean;
}

export interface FeedbackKeyPoints {
  feedbackOrConcern: string;
  satisfactionScore?: string; // e.g. "9/10" or "Very Satisfied"
  problemReported?: string;
  suggestedImprovement?: string;
  resolutionOrEscalationRequired: boolean;
  followUpRequired: boolean;
}

export type PurposeSpecificData =
  | { type: "admissions"; data: AdmissionsKeyPoints }
  | { type: "sales"; data: SalesKeyPoints }
  | { type: "appointment"; data: AppointmentKeyPoints }
  | { type: "feedback"; data: FeedbackKeyPoints }
  | { type: "general"; data: Record<string, string> };

export interface CallIntelligenceRecord {
  id: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  contactOrg?: string;
  callingPurpose: string; // e.g. "Admissions Enquiry Calls", "Course Fee Follow-ups" or "Uncategorized"
  campaignName: string;   // e.g. "Fall 2026 Merit Campaign", "Term 1 Collection"
  campaignId?: string;
  callType: CallType;
  agentId: string;
  agentName: string;
  agentRole: string;
  agentAvatar?: string;
  language: string;
  date: string;
  timestamp: string;
  duration: string;
  durationSeconds: number;
  lifecycleStatus: CallLifecycleStatus;
  plannedStartTime?: string; // For queued/scheduled calls
  elapsedSeconds?: number;   // For in-progress calls
  conversationOutcome: CallOutcomeType | string;
  sentiment: "positive" | "neutral" | "urgent" | "negative";
  sentimentScore: number;
  keyPointsStatus: "available" | "pending" | "failed" | "not_applicable";
  transcriptStatus: "available" | "generating" | "unavailable" | "partial";
  hasRecording: boolean;
  audioRecordingUrl?: string;
  groundedDocTitle?: string;
  intent: string;
  summary: string;
  generalKeyPoints: GeneralKeyPoints;
  purposeSpecificFields: ExtractedFieldItem[];
  purposeSchemaType?: "admissions" | "sales" | "appointment" | "feedback" | "general";
  transcript: TranscriptTurn[];
  userEditedFields?: Record<string, { value: string; editedBy: string; editedAt: string; originalValue: string }>;
  notesForTeam?: string;
}

export interface PurposeCampaignGroup {
  id: string;
  title: string;
  purpose: string;
  campaignName: string;
  category: "admissions" | "fees" | "sales" | "appointment" | "feedback" | "general" | "uncategorized";
  totalContacts: number;
  queued: number;
  inProgress: number;
  completed: number;
  failed: number;
  skipped: number;
  remaining: number;
  progressPercent: number;
  lastActive: string;
}
