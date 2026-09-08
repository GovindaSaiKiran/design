import { MayaCapability } from "@/types";

export const mayaCapabilities: MayaCapability[] = [
  {
    id: "natural-voice",
    title: "Ultra-Natural Voice & Sub-Second Latency",
    shortTag: "Voice Latency < 650ms",
    iconName: "Mic",
    summary: "Human-like conversational cadence with fluid interruptions, emotional tone adaptation, and zero robotic pauses.",
    metrics: "480ms average response latency • Natural breathing & prosody",
    details: [
      "Handles conversational interruptions gracefully without losing context.",
      "Adapts tone dynamically to reassure stressed parents or guide eager applicants.",
      "Ultra-low latency streaming voice engine powered by state-of-the-art neural speech synthesis."
    ],
    sampleAudioPrompt: "Wait, sorry to interrupt—what did you say the tuition was again?",
    sampleMayaResponse: "No problem at all! For B.Tech CSE, the annual tuition is $9,500, and with your 94% board score, you receive a 35% scholarship bringing it down to $6,175."
  },
  {
    id: "multilingual",
    title: "Multilingual Fluency & Dialect Recognition",
    shortTag: "20+ Regional Languages",
    iconName: "Globe2",
    summary: "Speaks and switches effortlessly across English, Hindi, Hinglish, Telugu, Tamil, Marathi, Spanish, and regional dialects.",
    metrics: "24 languages supported • Native accent synthesis",
    details: [
      "Seamless mid-conversation code-switching (e.g. switching between English and Hindi effortlessly).",
      "Understands regional colloquialisms and course naming variations.",
      "Locally tuned phonetics for authentic, institution-tailored pronunciations."
    ],
    sampleAudioPrompt: "Kya mujhe scholarship mil sakti hai agar mere 92% hain?",
    sampleMayaResponse: "Haan bilkul! Agar aapke 12th mein 92% hain, toh aap hamare Merit Tier-1 Scholarship ke liye eligible hain, jisme 30% tuition fee waive hoti hai."
  },
  {
    id: "knowledge-grounded",
    title: "Institutional Knowledge Grounding (Zero Hallucination)",
    shortTag: "100% Verified Answers",
    iconName: "BookOpen",
    summary: "Retrieves answers strictly from your approved university brochures, policy PDFs, fee schedules, and syllabus documents.",
    metrics: "0.0% Hallucination rate • Exact source document citations",
    details: [
      "Strict vector-grounded RAG architecture tied to university-approved PDFs.",
      "Transparent source citations captured in every call transcript log.",
      "Instant synchronization whenever admission policies or fee structures update."
    ],
    sampleAudioPrompt: "Is there a sports quota for national level badminton players?",
    sampleMayaResponse: "Yes, Section 4.2 of our 2026 Admissions Guide offers a 50% sports scholarship and direct hostel allocation for National level athletes."
  },
  {
    id: "admission-guidance",
    title: "Dynamic Admission Guidance & Lead Scoring",
    shortTag: "Auto Lead Qualification",
    iconName: "Target",
    summary: "Calculates cutoff eligibility in real-time, qualifies prospective students, and scores admission probability on the fly.",
    metrics: "94% lead qualification accuracy • Instant CRM synchronization",
    details: [
      "Evaluates complex eligibility criteria across board marks, JEE/CAT scores, and state quotas.",
      "Captures enriched data points: applicant name, target intake, score, budget, and hostel preference.",
      "Instantly pushes qualified leads directly into Salesforce, HubSpot, or custom SIS."
    ],
    sampleAudioPrompt: "I scored 87 percentile in CAT. Can I get into the FinTech MBA?",
    sampleMayaResponse: "Yes! Our Round-2 cutoff for MBA FinTech is 85 percentile. You are eligible for the GD/PI round. Would you like me to book your interview slot?"
  },
  {
    id: "human-handoff",
    title: "Intelligent Human Counselor Escalation",
    shortTag: "Zero-Drop Escalation",
    iconName: "Users",
    summary: "Warmly transfers complex exceptions, special scholarship appeals, or distressed callers directly to human admissions staff.",
    metrics: "< 3.5s warm transfer • Complete CRM briefing included",
    details: [
      "Live call routing via SIP trunking to on-duty admission counselors or department deans.",
      "Populates the counselor's screen with real-time transcript, caller profile, and key pain points.",
      "Never leaves a student stranded—schedules automated callbacks if lines are busy."
    ],
    sampleAudioPrompt: "I want to appeal for a custom fee discount directly with the Dean.",
    sampleMayaResponse: "I completely understand. Let me transfer you directly to Senior Admissions Officer Mr. Sharma. I have shared your 94% board score and inquiry notes on his screen."
  }
];
