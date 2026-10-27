"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  User,
  Bot,
  UserCheck,
  Send,
  Plus,
  Filter,
  Check,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Settings as SettingsIcon,
  Layers,
  FileText,
  SlidersHorizontal,
  ArrowRight,
  RotateCcw,
  Zap,
  Building,
  Phone,
  Calendar,
  AlertCircle,
  Copy,
  Eye,
  FileCheck,
  Globe,
  Radio,
  BookOpen,
  Tag,
  X,
  Sparkles,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";

// ============================================================================
// DATA MODELS
// ============================================================================

export type WhatsAppTab = "overview" | "inbox" | "automations" | "templates" | "settings";

export interface ChatMessage {
  id: string;
  sender: "customer" | "ai" | "human" | "system";
  text: string;
  timestamp: string;
  status?: "sent" | "delivered" | "read";
  agentName?: string;
  interactiveButtons?: string[];
  attachedDocName?: string;
  attachedDocSize?: string;
}

export interface Conversation {
  id: string;
  contactName: string;
  phone: string;
  city: string;
  course: string;
  leadScore: number;
  leadSource: string;
  assignedAgent: string;
  status: "Open" | "In Progress" | "Needs Human" | "Resolved";
  unreadCount: number;
  lastMessage: string;
  lastTimestamp: string;
  humanInteractionNeeded: boolean;
  humanAssignee?: string;
  escalationReason?: string;
  messages: ChatMessage[];
}

export interface AutomationFlow {
  id: string;
  name: string;
  description: string;
  status: "Published" | "Draft" | "Disabled";
  triggerType: "Voice Call Event" | "Inbound Keyword" | "Web Form Submit" | "QR Code Scan";
  triggerDetail: string;
  conditionSummary: string;
  assignedAgent: string;
  knowledgeBase: string;
  actionsSummary: string;
  humanHandoffRule: string;
  executions24h: number;
  successRate: string;
  lastModified: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: "Utility" | "Marketing" | "Authentication";
  language: string;
  status: "Approved" | "In Review" | "Draft";
  bodySnippet: string;
  variables: string[];
  buttons: string[];
  hasDocument: boolean;
  documentType?: string;
  lastUpdated: string;
}

// ============================================================================
// INITIAL MOCK DATA (High fidelity, realistic university admissions & ops)
// ============================================================================

const initialConversations: Conversation[] = [];

const initialFlows: AutomationFlow[] = [];

const initialTemplates: MessageTemplate[] = [];

// ============================================================================
// MAIN COMPONENT: WHATSAPP WORKSPACE
// ============================================================================

export default function WhatsAppWorkspaceView() {
  const [activeTab, setActiveTab] = useState<WhatsAppTab>("overview");

  // Notifications / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    try { soundSynth.play("confirm"); } catch {}
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // --------------------------------------------------------------------------
  // INBOX TAB STATE
  // --------------------------------------------------------------------------
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConvId, setSelectedConvId] = useState<string>(initialConversations[0]?.id || '');
  const [inboxSearch, setInboxSearch] = useState<string>("");
  const [inboxFilter, setInboxFilter] = useState<"all" | "ai" | "human" | "resolved">("all");
  const [replyText, setReplyText] = useState<string>("");
  const [senderMode, setSenderMode] = useState<"ai" | "human">("ai");

  const activeConversation = useMemo(() => {
    return conversations.find((c) => c.id === selectedConvId) || conversations[0] || null;
  }, [conversations, selectedConvId]);

  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      const q = inboxSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.contactName.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.course.toLowerCase().includes(q) ||
        c.lastMessage.toLowerCase().includes(q);

      const matchesFilter =
        inboxFilter === "all" ||
        (inboxFilter === "ai" && !c.humanInteractionNeeded && c.status !== "Resolved") ||
        (inboxFilter === "human" && c.humanInteractionNeeded && c.status !== "Resolved") ||
        (inboxFilter === "resolved" && c.status === "Resolved");

      return matchesSearch && matchesFilter;
    });
  }, [conversations, inboxSearch, inboxFilter]);

  // Handle Send Reply in Mock Inbox
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConversation) return;

    try { soundSynth.play("confirm"); } catch {}

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: senderMode,
      agentName: senderMode === "ai" ? activeConversation.assignedAgent : "Admissions Counselor (Human Override)",
      text: replyText.trim(),
      timestamp: "Just now",
      status: "delivered",
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversation.id) {
          return {
            ...c,
            lastMessage: replyText.trim(),
            lastTimestamp: "Just now",
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    setReplyText("");
    showToast(`Message queued via WhatsApp sandbox trunk to ${activeConversation.contactName}.`);
  };

  // Toggle Human Handoff
  const handleToggleHumanHandoff = () => {
    if (!activeConversation) return;
    try { soundSynth.play("click"); } catch {}

    const isCurrentlyHuman = activeConversation.humanInteractionNeeded;
    const nextHumanState = !isCurrentlyHuman;

    const systemEventText = nextHumanState
      ? `Human Handoff Activated: Paused autonomous AI agent. Assigned to Senior Admissions Counselor.`
      : `AI Control Restored: Maya Admissions AI resumed autonomous conversational response.`;

    const systemMsg: ChatMessage = {
      id: `sys-${Date.now()}`,
      sender: "system",
      text: systemEventText,
      timestamp: "Just now",
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversation.id) {
          return {
            ...c,
            humanInteractionNeeded: nextHumanState,
            status: nextHumanState ? "Needs Human" : "In Progress",
            humanAssignee: nextHumanState ? "Mr. Rajesh Sharma (Senior Counselor)" : undefined,
            messages: [...c.messages, systemMsg],
          };
        }
        return c;
      })
    );

    showToast(nextHumanState ? "Transferred to Human Counselor" : "Control returned to AI Agent");
  };

  // --------------------------------------------------------------------------
  // AUTOMATIONS TAB STATE
  // --------------------------------------------------------------------------
  const [flows, setFlows] = useState<AutomationFlow[]>(initialFlows);
  const [flowSearch, setFlowSearch] = useState<string>("");
  const [flowStatusFilter, setFlowStatusFilter] = useState<string>("all");
  const [editingFlow, setEditingFlow] = useState<AutomationFlow | null>(null);
  const [flowModalOpen, setFlowModalOpen] = useState<boolean>(false);

  const filteredFlows = useMemo(() => {
    return flows.filter((f) => {
      const q = flowSearch.toLowerCase().trim();
      const matchesSearch = !q || f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q);
      const matchesStatus = flowStatusFilter === "all" || f.status === flowStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [flows, flowSearch, flowStatusFilter]);

  const handleOpenEditFlow = (flow: AutomationFlow) => {
    try { soundSynth.play("click"); } catch {}
    setEditingFlow(flow);
    setFlowModalOpen(true);
  };

  const handleCreateNewFlow = () => {
    try { soundSynth.play("click"); } catch {}
    const newTemplateFlow: AutomationFlow = {
      id: `flow-${Date.now()}`,
      name: "New Inbound Inquiry Cadence",
      description: "Define trigger condition, map AI voice/chat agent, and deliver verified WhatsApp collateral.",
      status: "Draft",
      triggerType: "Inbound Keyword",
      triggerDetail: "Keywords: 'INFO', 'DEMO'",
      conditionSummary: "Verified contact without prior active account representative",
      assignedAgent: "Maya (Voice Operations)",
      knowledgeBase: "Enterprise Product Catalog & SLA Documentation",
      actionsSummary: "Dispatch welcome collateral with verified customer schedule link.",
      humanHandoffRule: "Escalate to account manager if contact requests custom enterprise contract.",
      executions24h: 0,
      successRate: "—",
      lastModified: "Just now",
    };
    setEditingFlow(newTemplateFlow);
    setFlowModalOpen(true);
  };

  const handleSaveFlow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFlow) return;
    try { soundSynth.play("confirm"); } catch {}

    setFlows((prev) => {
      const exists = prev.find((f) => f.id === editingFlow.id);
      if (exists) {
        return prev.map((f) => (f.id === editingFlow.id ? editingFlow : f));
      }
      return [editingFlow, ...prev];
    });

    setFlowModalOpen(false);
    showToast(`Saved workflow '${editingFlow.name}' successfully.`);
  };

  // --------------------------------------------------------------------------
  // TEMPLATES TAB STATE
  // --------------------------------------------------------------------------
  const [templates, setTemplates] = useState<MessageTemplate[]>(initialTemplates);
  const [templateSearch, setTemplateSearch] = useState<string>("");
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<string>("all");
  const [previewTemplate, setPreviewTemplate] = useState<MessageTemplate | null>(null);

  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const q = templateSearch.toLowerCase().trim();
      const matchesSearch = !q || t.name.toLowerCase().includes(q) || t.bodySnippet.toLowerCase().includes(q);
      const matchesCategory = templateCategoryFilter === "all" || t.category === templateCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [templates, templateSearch, templateCategoryFilter]);

  // --------------------------------------------------------------------------
  // SETTINGS TAB STATE
  // --------------------------------------------------------------------------
  const [wabaId, setWabaId] = useState("");
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [displayName, setDisplayName] = useState("AI Voice & Messaging Desk");
  const [defaultAgent, setDefaultAgent] = useState("Primary AI Agent");
  const [primaryLanguage, setPrimaryLanguage] = useState("English (India)");
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [knowledgeBaseRef, setKnowledgeBaseRef] = useState("Default Knowledge Base");
  const [businessHoursSla, setBusinessHoursSla] = useState("5 minutes");
  const [outOfHoursBehavior, setOutOfHoursBehavior] = useState("AI continues answering + logs morning queue");
  const [notifySlack, setNotifySlack] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try { soundSynth.play("confirm"); } catch {}
    showToast("WhatsApp workspace settings saved in local sandbox configuration.");
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className="space-y-5 font-sans text-[#283A50] select-none pb-16">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#283A50] text-white text-xs px-4 py-2.5 rounded-lg shadow-md border border-[#E9E1D4]/40 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#C4A5E8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Sub-Navigation */}
      <div className="bg-white border border-[#E9E1D4] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E9E1D4]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="text-xs font-medium text-[#707684] hover:text-[#283A50] transition-colors"
              >
                Dashboard
              </Link>
              <span className="text-[#E9E1D4]">/</span>
              <span className="text-xs font-semibold text-[#283A50]">WhatsApp Workspace</span>
              <span className="text-[11px] font-semibold text-[#3B6655] bg-[#EAF2ED] border border-[#B8D5C5] px-2 py-0.5 rounded">
                Meta Cloud API Sandbox
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#283A50]">
              WhatsApp AI Messaging Console
            </h1>
          </div>

          {/* Sandbox Indicator Pill */}
          <div className="flex items-center gap-2 text-xs bg-[#FAF5E9] border border-[#E9E1D4] px-3 py-1.5 rounded-lg self-start sm:self-center">
            <span className="w-2 h-2 rounded-full bg-[#3B6655]" />
            <span className="text-[#707684]">Sender:</span>
            <strong className="text-[#283A50] font-mono">+91 94402 18765</strong>
            <span className="text-[10px] text-[#707684] bg-white border border-[#E9E1D4] px-1.5 py-0.5 rounded">
              Tier 2 (10k/day)
            </span>
          </div>
        </div>

        {/* Five Workspace Navigation Tabs */}
        <div className="flex items-center gap-1 border-b border-[#E9E1D4] overflow-x-auto pb-px">
          {[
            { id: "overview", label: "Overview", icon: Layers },
            { id: "inbox", label: "Inbox", icon: MessageSquare, badge: `${conversations.filter(c => c.humanInteractionNeeded).length} Pending` },
            { id: "automations", label: "Automations", icon: Zap, badge: `${flows.length} Flows` },
            { id: "templates", label: "Templates", icon: FileText, badge: `${templates.length}` },
            { id: "settings", label: "Settings", icon: SettingsIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  try { soundSynth.play("click"); } catch {}
                  setActiveTab(tab.id as WhatsAppTab);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? "border-[#283A50] text-[#283A50] bg-[#FAF5E9]/50"
                    : "border-transparent text-[#707684] hover:text-[#283A50] hover:bg-[#FAF5E9]/30"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#283A50]" : "text-[#707684]"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      isActive
                        ? "bg-[#283A50] text-white"
                        : "bg-[#E9E1D4]/70 text-[#707684]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ====================================================================== */}
      {/* TAB 1: OVERVIEW                                                        */}
      {/* ====================================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          {/* Top Operational Notice */}
          <div className="p-4 rounded-xl bg-white border border-[#E9E1D4] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EAF2ED] text-[#3B6655] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-[#3B6655]" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <strong className="text-sm font-bold text-[#283A50]">
                    WhatsApp Cloud API Connection Active
                  </strong>
                  <span className="text-[10.5px] font-semibold text-[#3B6655] bg-[#EAF2ED] border border-[#B8D5C5] px-2 py-0.2 rounded">
                    Verified Green Status
                  </span>
                </div>
                <p className="text-[#707684]">
                  Simulated production environment connected to WABA <code className="font-mono text-[#283A50]">waba_9920148901</code>.
                  Sub-4.2s latency SLA active with automatic counselor escalation rules.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className="px-3 py-1.5 text-xs font-semibold text-[#283A50] bg-[#FAF5E9] border border-[#E9E1D4] hover:bg-white rounded-lg transition-colors cursor-pointer"
              >
                Configure Meta Credentials
              </button>
            </div>
          </div>

          {/* Key Conversation Metrics (Sample Analytics) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                label: "Total Conversations",
                value: conversations.length.toString(),
                subtext: "Live active chat threads",
                metricTag: "Verified",
              },
              {
                label: "AI Autonomous Resolution",
                value: conversations.length > 0 ? ((conversations.filter(c => !c.humanInteractionNeeded).length / conversations.length) * 100).toFixed(1) + "%" : "0.0%",
                subtext: `${conversations.filter(c => !c.humanInteractionNeeded).length} chats handled by AI`,
                metricTag: "Target: > 80%",
              },
              {
                label: "Human Escalation Rate",
                value: conversations.length > 0 ? ((conversations.filter(c => c.humanInteractionNeeded).length / conversations.length) * 100).toFixed(1) + "%" : "0.0%",
                subtext: `${conversations.filter(c => c.humanInteractionNeeded).length} transferred to counselors`,
                metricTag: "Counselor Queue",
              },
              {
                label: "Avg First Response Time",
                value: conversations.length > 0 ? "4.2s" : "—",
                subtext: conversations.length > 0 ? "Automated turn-by-turn latency" : "No active session",
                metricTag: "Sub-5s SLA",
              },
            ].map((metric, i) => (
              <div
                key={i}
                className="bg-white border border-[#E9E1D4] rounded-xl p-4 space-y-1.5 shadow-2xs"
              >
                <div className="flex items-center justify-between text-[11px] text-[#707684]">
                  <span>{metric.label}</span>
                  <span className="text-[10px] bg-[#FAF5E9] text-[#707684] px-1.5 py-0.5 rounded border border-[#E9E1D4]">
                    {metric.metricTag}
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#283A50] tracking-tight">
                  {metric.value}
                </div>
                <div className="text-[11px] text-[#707684]">{metric.subtext}</div>
              </div>
            ))}
          </div>

          {/* Two-Column Section: Active Workflows Summary & Setup Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Left 2 Cols: Active Automation Summary */}
            <div className="lg:col-span-2 bg-white border border-[#E9E1D4] rounded-xl shadow-xs overflow-hidden space-y-0">
              <div className="p-4 border-b border-[#E9E1D4] bg-[#FAF5E9]/30 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#283A50]">
                    Active Automation Workflows
                  </h3>
                  <p className="text-[11px] text-[#707684]">
                    Real-time pipelines triggering messages from voice calls, web forms, and keywords.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("automations")}
                  className="text-xs font-semibold text-[#283A50] hover:underline inline-flex items-center gap-1"
                >
                  <span>View All Flows ({flows.length})</span>
                  <ArrowRight className="w-3 h-3 text-[#707684]" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF5E9] border-b border-[#E9E1D4] text-[#707684] font-semibold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 px-4">Workflow Name</th>
                      <th className="py-2.5 px-4">Trigger</th>
                      <th className="py-2.5 px-4">Assigned Agent</th>
                      <th className="py-2.5 px-4">24h Executions</th>
                      <th className="py-2.5 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9E1D4]/60">
                    {flows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 px-4 text-center">
                          <p className="text-xs font-semibold text-[#283A50]">No active automation workflows</p>
                          <p className="text-[11px] text-[#707684] mt-0.5">Configure your first automated flow in the Automations tab to dispatch follow-ups.</p>
                        </td>
                      </tr>
                    ) : (
                      flows.slice(0, 4).map((f) => (
                        <tr key={f.id} className="hover:bg-[#FAF5E9]/40 transition-colors">
                          <td className="py-3 px-4">
                            <strong className="text-[#283A50] block font-semibold">{f.name}</strong>
                            <span className="text-[10.5px] text-[#707684] line-clamp-1">
                              {f.description}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="text-[10.5px] text-[#283A50] bg-[#FAF5E9] border border-[#E9E1D4] px-2 py-0.5 rounded">
                              {f.triggerType}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-[#707684]">
                            {f.assignedAgent}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap font-mono text-[#283A50]">
                            {f.executions24h} runs ({f.successRate})
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <span className="text-[10px] font-semibold text-[#3B6655] bg-[#EAF2ED] border border-[#B8D5C5] px-2 py-0.5 rounded">
                              {f.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right 1 Col: Setup & Readiness Checklist */}
            <div className="bg-white border border-[#E9E1D4] rounded-xl p-4 shadow-xs space-y-3.5">
              <div className="border-b border-[#E9E1D4] pb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#283A50]">
                  WhatsApp Setup Checklist
                </h3>
                <p className="text-[11px] text-[#707684]">
                  4 of 5 setup steps verified for institutional messaging compliance.
                </p>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  {
                    title: "1. Connect Meta Cloud WABA Account",
                    desc: wabaId ? `WABA ID ${wabaId} linked.` : "Connect your Meta Cloud WABA ID in Settings.",
                    done: !!wabaId,
                    actionText: !wabaId ? "Configure WABA" : undefined,
                    actionTab: !wabaId ? "settings" : undefined,
                  },
                  {
                    title: "2. Verify Dedicated Sender Number",
                    desc: phoneNumberId ? `+91 ${phoneNumberId} registered with 2FA.` : "Register your sender phone number in Settings.",
                    done: !!phoneNumberId,
                    actionText: !phoneNumberId ? "Add Number" : undefined,
                    actionTab: !phoneNumberId ? "settings" : undefined,
                  },
                  {
                    title: "3. Map Default AI Voice & Chat Agent",
                    desc: `${defaultAgent} mapped for fallback intent.`,
                    done: true,
                  },
                  {
                    title: "4. Author & Approve Meta Templates",
                    desc: templates.length > 0
                      ? `${templates.filter((t) => t.status === "Approved").length} of ${templates.length} templates approved.`
                      : "Create and register WhatsApp message templates.",
                    done: templates.length > 0,
                    actionText: templates.length === 0 ? "Create Template" : undefined,
                    actionTab: templates.length === 0 ? "templates" : undefined,
                  },
                  {
                    title: "5. Configure Counselor Escalation SLA",
                    desc: "Define on-call counselor rotation for pending waivers.",
                    done: false,
                    actionText: "Configure SLA",
                    actionTab: "settings",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border flex items-start gap-2.5 ${
                      item.done
                        ? "bg-[#FAF5E9]/40 border-[#E9E1D4]"
                        : "bg-[#FDF6EB] border-[#ECCB9C]"
                    }`}
                  >
                    <div className="mt-0.5">
                      {item.done ? (
                        <CheckCircle2 className="w-4 h-4 text-[#3B6655]" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#8C6228]" />
                      )}
                    </div>
                    <div className="flex-1 space-y-0.5 min-w-0">
                      <strong className={`block text-[11.5px] font-semibold ${item.done ? "text-[#283A50]" : "text-[#8C6228]"}`}>
                        {item.title}
                      </strong>
                      <p className="text-[11px] text-[#707684] leading-relaxed">
                        {item.desc}
                      </p>
                      {item.actionText && (
                        <button
                          type="button"
                          onClick={() => setActiveTab(item.actionTab as WhatsAppTab)}
                          className="mt-1 text-[11px] font-bold text-[#283A50] hover:underline"
                        >
                          {item.actionText} →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* TAB 2: INBOX (THREE-COLUMN DESKTOP INTERFACE)                          */}
      {/* ====================================================================== */}
      {activeTab === "inbox" && (
        <div className="bg-white border border-[#E9E1D4] rounded-xl shadow-xs overflow-hidden">
          {/* Top Subheader for Inbox */}
          <div className="px-4 py-3 bg-[#FAF5E9]/50 border-b border-[#E9E1D4] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#283A50]">WhatsApp Unified Inbox</span>
              <span className="text-[#707684]">({conversations.length} total active threads)</span>
              <span className="text-[10px] text-[#707684] bg-white border border-[#E9E1D4] px-2 py-0.5 rounded">
                Simulated Telephony Webhook Feed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#707684] text-[11px]">Default Agent:</span>
              <strong className="text-[#283A50] font-semibold">Maya (Admissions AI)</strong>
            </div>
          </div>

          {/* Three-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
            {/* COLUMN 1: CONVERSATION LIST (lg:col-span-4, border-r) */}
            <div className="lg:col-span-4 border-r border-[#E9E1D4] flex flex-col bg-[#FAF5E9]/20">
              {/* Search & Filter Header */}
              <div className="p-3 border-b border-[#E9E1D4] space-y-2 bg-white">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#707684]" />
                  <input
                    type="text"
                    value={inboxSearch}
                    onChange={(e) => setInboxSearch(e.target.value)}
                    placeholder="Search candidate, phone, course..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg text-[#283A50] focus:outline-none focus:bg-white focus:border-[#283A50]"
                  />
                  {inboxSearch && (
                    <button
                      onClick={() => setInboxSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#707684] hover:text-[#283A50]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto text-[11px] font-medium pt-1">
                  {[
                    { id: "all", label: "All" },
                    { id: "ai", label: "AI Handled" },
                    { id: "human", label: "Needs Human" },
                    { id: "resolved", label: "Resolved" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => {
                        try { soundSynth.play("click"); } catch {}
                        setInboxFilter(f.id as any);
                      }}
                      className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                        inboxFilter === f.id
                          ? "bg-[#283A50] text-white font-semibold"
                          : "text-[#707684] hover:bg-[#FAF5E9] hover:text-[#283A50]"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Conversation Items */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#E9E1D4]/60 max-h-[580px]">
                {filteredConversations.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#707684] space-y-1">
                    <MessageSquare className="w-8 h-8 text-[#E9E1D4] mx-auto" />
                    <p className="font-semibold text-[#283A50]">No conversations match filter</p>
                    <p className="text-[11px]">Clear search or switch filter pill.</p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => {
                    const isSelected = conv.id === activeConversation?.id;
                    return (
                      <div
                        key={conv.id}
                        onClick={() => {
                          try { soundSynth.play("click"); } catch {}
                          setSelectedConvId(conv.id);
                        }}
                        className={`p-3 transition-colors cursor-pointer text-left ${
                          isSelected
                            ? "bg-white border-l-3 border-[#283A50] shadow-2xs"
                            : "hover:bg-white/80 bg-transparent"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <strong className="text-xs font-bold text-[#283A50] truncate">
                              {conv.contactName}
                            </strong>
                            {conv.humanInteractionNeeded && (
                              <span
                                className="w-2 h-2 rounded-full bg-[#8C6228] shrink-0"
                                title="Needs Human Review"
                              />
                            )}
                          </div>
                          <span className="text-[10px] text-[#707684] shrink-0 font-mono">
                            {conv.lastTimestamp}
                          </span>
                        </div>

                        <div className="text-[10.5px] font-mono text-[#707684] mt-0.5">
                          {conv.phone} • {conv.city}
                        </div>

                        <p className="text-xs text-[#707684] line-clamp-1 mt-1 font-normal">
                          {conv.lastMessage}
                        </p>

                        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                          <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-[#FAF5E9] text-[#283A50] border border-[#E9E1D4] font-medium">
                            {conv.course}
                          </span>
                          {conv.humanInteractionNeeded ? (
                            <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-[#FDF6EB] text-[#8C6228] border border-[#ECCB9C] font-semibold">
                              Needs Counselor
                            </span>
                          ) : (
                            <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-[#EAF2ED] text-[#3B6655] border border-[#B8D5C5] font-medium">
                              AI: {conv.assignedAgent.split(" ")[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {!activeConversation ? (
              <div className="lg:col-span-8 p-12 text-center text-xs text-[#707684] space-y-3 bg-white flex flex-col items-center justify-center min-h-[480px]">
                <div className="w-12 h-12 rounded-full bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center mx-auto text-[#283A50]">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[#283A50]">No active WhatsApp chat selected</h4>
                <p className="text-xs text-[#707684] max-w-sm mx-auto leading-relaxed">
                  Incoming chats and automated post-call dispatches will appear in your live inbox. Select a thread to view transcripts and agent controls.
                </p>
              </div>
            ) : (
              <>
            {/* COLUMN 2: READABLE CHAT TRANSCRIPT (lg:col-span-5, border-r) */}
            <div className="lg:col-span-5 border-r border-[#E9E1D4] flex flex-col bg-white">
              {/* Transcript Header */}
              <div className="p-3.5 border-b border-[#E9E1D4] bg-[#FAF5E9]/30 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#283A50] truncate">
                      {activeConversation.contactName}
                    </h3>
                    <span className="text-[10px] font-mono text-[#707684] bg-white border border-[#E9E1D4] px-1.5 py-0.5 rounded">
                      {activeConversation.phone}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#707684] flex items-center gap-1.5 mt-0.5">
                    <span>Target: <strong>{activeConversation.course}</strong></span>
                    <span>•</span>
                    <span className="text-[#3B6655] font-semibold">Meta WABA Session Active</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => showToast(`Transcript exported for ${activeConversation.contactName}`)}
                    className="px-2.5 py-1 text-[11px] font-medium text-[#283A50] bg-white border border-[#E9E1D4] hover:bg-[#FAF5E9] rounded transition-colors cursor-pointer"
                    title="Export chat transcript"
                  >
                    Export
                  </button>
                </div>
              </div>

              {/* Message Transcript Stream */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF5E9]/20 max-h-[480px]">
                <div className="text-center">
                  <span className="text-[10px] font-semibold text-[#707684] uppercase tracking-wider bg-white border border-[#E9E1D4] px-2.5 py-0.5 rounded-full">
                    Today, 22 Oct 2026 • Encrypted WhatsApp Channel
                  </span>
                </div>

                {activeConversation.messages.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div key={msg.id} className="text-center py-1">
                        <span className="text-[10.5px] text-[#707684] bg-[#FAF5E9] border border-[#E9E1D4] px-3 py-1 rounded-md inline-block max-w-sm">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  const isOutbound = msg.sender === "ai" || msg.sender === "human";

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isOutbound ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 text-xs space-y-1.5 border shadow-2xs ${
                          isOutbound
                            ? msg.sender === "human"
                              ? "bg-[#FDF6EB] border-[#ECCB9C] text-[#283A50]"
                              : "bg-white border-[#E9E1D4] text-[#283A50]"
                            : "bg-[#FAF5E9] border-[#E9E1D4] text-[#283A50]"
                        }`}
                      >
                        {/* Sender Label */}
                        <div className="flex items-center justify-between gap-3 text-[10px] text-[#707684] pb-0.5 border-b border-[#E9E1D4]/40">
                          <span className="font-semibold">
                            {msg.sender === "ai"
                              ? `🤖 ${msg.agentName || "AI Voice Agent"}`
                              : msg.sender === "human"
                              ? `👤 ${msg.agentName || "Human Counselor"}`
                              : `Candidate (${activeConversation.contactName})`}
                          </span>
                          <span className="font-mono">{msg.timestamp}</span>
                        </div>

                        {/* Message Text */}
                        <p className="leading-relaxed font-normal whitespace-pre-line">
                          {msg.text}
                        </p>

                        {/* Attached Document Card Preview */}
                        {msg.attachedDocName && (
                          <div className="p-2 rounded bg-white border border-[#E9E1D4] flex items-center justify-between gap-2 mt-1">
                            <div className="flex items-center gap-2 min-w-0">
                              <FileText className="w-4 h-4 text-[#283A50] shrink-0" />
                              <div className="min-w-0">
                                <span className="text-[11px] font-semibold text-[#283A50] block truncate">
                                  {msg.attachedDocName}
                                </span>
                                <span className="text-[9.5px] text-[#707684]">
                                  {msg.attachedDocSize || "PDF Document"}
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => showToast(`Opened document ${msg.attachedDocName}`)}
                              className="text-[10px] text-[#283A50] font-bold hover:underline shrink-0"
                            >
                              Download
                            </button>
                          </div>
                        )}

                        {/* Interactive WhatsApp Buttons Preview */}
                        {msg.interactiveButtons && msg.interactiveButtons.length > 0 && (
                          <div className="pt-1.5 space-y-1">
                            {msg.interactiveButtons.map((btn, btnIdx) => (
                              <div
                                key={btnIdx}
                                className="w-full text-center py-1 text-[11px] font-semibold text-[#283A50] bg-[#FAF5E9]/70 hover:bg-[#FAF5E9] border border-[#E9E1D4] rounded cursor-pointer transition-colors"
                              >
                                {btn}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Composer */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-[#E9E1D4] bg-white space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#707684]">
                  <div className="flex items-center gap-2">
                    <span>Send as:</span>
                    <button
                      type="button"
                      onClick={() => setSenderMode("ai")}
                      className={`px-2 py-0.5 rounded text-[10.5px] font-semibold border cursor-pointer ${
                        senderMode === "ai"
                          ? "bg-[#283A50] text-white border-[#283A50]"
                          : "bg-white text-[#707684] border-[#E9E1D4]"
                      }`}
                    >
                      🤖 AI Agent
                    </button>
                    <button
                      type="button"
                      onClick={() => setSenderMode("human")}
                      className={`px-2 py-0.5 rounded text-[10.5px] font-semibold border cursor-pointer ${
                        senderMode === "human"
                          ? "bg-[#8C6228] text-white border-[#8C6228]"
                          : "bg-white text-[#707684] border-[#E9E1D4]"
                      }`}
                    >
                      👤 Human Counselor
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setReplyText("Hello! Your personalized scholarship verification voucher is available.")}
                    className="text-[10.5px] text-[#283A50] hover:underline"
                  >
                    + Insert Template
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={
                      senderMode === "ai"
                        ? `Type message as ${activeConversation.assignedAgent}...`
                        : "Type counselor override message to student..."
                    }
                    className="flex-1 px-3 py-2 text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg text-[#283A50] focus:outline-none focus:bg-white focus:border-[#283A50]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-bold text-white bg-[#283A50] hover:bg-black rounded-lg transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>
              </form>
            </div>

            {/* COLUMN 3: CONTACT & CONTEXT PANEL (lg:col-span-3) */}
            <div className="lg:col-span-3 p-4 flex flex-col justify-between space-y-4 bg-[#FAF5E9]/10 text-xs">
              <div className="space-y-4">
                {/* Contact Header Card */}
                <div className="p-3 bg-white border border-[#E9E1D4] rounded-lg space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
                    Candidate Dossier
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-[#283A50]">
                      {activeConversation.contactName}
                    </h4>
                    <p className="font-mono text-[#707684] text-[11px]">
                      {activeConversation.phone}
                    </p>
                    <p className="text-[#707684] text-[11px] mt-0.5">
                      {activeConversation.city} • Lead Score: <strong className="text-[#283A50]">{activeConversation.leadScore}/100</strong>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E9E1D4] space-y-1 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#707684]">Program:</span>
                      <strong className="text-[#283A50] text-right truncate max-w-[150px]">
                        {activeConversation.course}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#707684]">Source:</span>
                      <span className="text-[#283A50] text-right truncate max-w-[150px]">
                        {activeConversation.leadSource}
                      </span>
                    </div>
                  </div>
                </div>

                {/* AI Agent Assignment Card */}
                <div className="p-3 bg-white border border-[#E9E1D4] rounded-lg space-y-2">
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider text-[#707684]">
                    Assigned AI Agent
                  </label>
                  <select
                    value={activeConversation.assignedAgent}
                    onChange={(e) => {
                      const newAgent = e.target.value;
                      setConversations((prev) =>
                        prev.map((c) => (c.id === activeConversation.id ? { ...c, assignedAgent: newAgent } : c))
                      );
                      showToast(`Reassigned to ${newAgent}`);
                    }}
                    className="w-full text-xs bg-[#FAF5E9] border border-[#E9E1D4] text-[#283A50] rounded-md px-2.5 py-1.5 focus:outline-none focus:border-[#283A50]"
                  >
                    <option value="Maya (Admissions AI)">Maya (Admissions AI)</option>
                    <option value="Priya (Student Finance AI)">Priya (Student Finance AI)</option>
                    <option value="Arjun (Outreach AI)">Arjun (Outreach AI)</option>
                    <option value="Senior Counselor Desk">Senior Counselor Desk (Human)</option>
                  </select>
                </div>

                {/* Human Handoff Control (Critical Feature) */}
                <div
                  className={`p-3.5 rounded-lg border space-y-2.5 transition-colors ${
                    activeConversation.humanInteractionNeeded
                      ? "bg-[#FDF6EB] border-[#ECCB9C]"
                      : "bg-[#EAF2ED] border-[#B8D5C5]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {activeConversation.humanInteractionNeeded ? (
                        <AlertTriangle className="w-4 h-4 text-[#8C6228]" />
                      ) : (
                        <Bot className="w-4 h-4 text-[#3B6655]" />
                      )}
                      <strong className={`text-xs font-bold ${activeConversation.humanInteractionNeeded ? "text-[#8C6228]" : "text-[#3B6655]"}`}>
                        {activeConversation.humanInteractionNeeded ? "Human Handoff Active" : "AI Autonomous Mode"}
                      </strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#707684] leading-relaxed">
                    {activeConversation.humanInteractionNeeded
                      ? activeConversation.escalationReason || "Autonomous AI response paused. Human counselor handles this thread."
                      : "Maya is autonomously answering student questions using approved admissions codex."}
                  </p>

                  {activeConversation.humanAssignee && (
                    <div className="text-[10.5px] font-semibold text-[#8C6228] bg-white/80 p-1.5 rounded border border-[#ECCB9C]/70">
                      Assigned Counselor: {activeConversation.humanAssignee}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleToggleHumanHandoff}
                    className={`w-full py-2 px-3 text-xs font-bold rounded-md transition-colors cursor-pointer border ${
                      activeConversation.humanInteractionNeeded
                        ? "bg-white text-[#283A50] border-[#E9E1D4] hover:bg-[#FAF5E9]"
                        : "bg-[#8C6228] text-white border-[#8C6228] hover:bg-[#724e1e]"
                    }`}
                  >
                    {activeConversation.humanInteractionNeeded
                      ? "Return Control to AI Agent"
                      : "Escalate to Human Counselor"}
                  </button>
                </div>
              </div>

              {/* Related Voice Call Record Context */}
              <div className="p-3 bg-white border border-[#E9E1D4] rounded-lg space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707684]">
                  Source Voice Call
                </span>
                <p className="text-[11px] text-[#283A50]">
                  Call Duration: <strong>4m 12s</strong> • Sub-140ms Voice Latency
                </p>
                <Link
                  href="/dashboard/call-history"
                  className="text-[11px] font-bold text-[#283A50] hover:underline inline-flex items-center gap-1 mt-0.5"
                >
                  <span>Inspect Audio Transcript</span>
                  <ExternalLink className="w-3 h-3 text-[#707684]" />
                </Link>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
      )}

      {/* ====================================================================== */}
      {/* TAB 3: AUTOMATIONS (LIST & WORKFLOW EDITOR)                             */}
      {/* ====================================================================== */}
      {activeTab === "automations" && (
        <div className="space-y-4">
          {/* Header & New Flow Action */}
          <div className="bg-white border border-[#E9E1D4] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="space-y-0.5">
              <h2 className="text-sm font-bold text-[#283A50]">
                Admissions &amp; Telephony Workflows
              </h2>
              <p className="text-xs text-[#707684]">
                Event-driven pipelines linking voice call completions, inbound keywords, and AI knowledge bases.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCreateNewFlow}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#283A50] hover:bg-black rounded-lg transition-colors cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Automation Flow</span>
            </button>
          </div>

          {/* Workflow Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-[#E9E1D4] rounded-xl p-3 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
              <span className="text-[11px] font-bold text-[#707684] uppercase tracking-wider mr-1">
                Filter Status:
              </span>
              {["all", "Published", "Draft", "Disabled"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFlowStatusFilter(st)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    flowStatusFilter === st
                      ? "bg-[#283A50] text-white"
                      : "bg-[#FAF5E9] text-[#707684] hover:text-[#283A50]"
                  }`}
                >
                  {st === "all" ? "All Workflows" : st}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#707684]" />
              <input
                type="text"
                value={flowSearch}
                onChange={(e) => setFlowSearch(e.target.value)}
                placeholder="Search workflows..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg text-[#283A50] focus:outline-none focus:bg-white focus:border-[#283A50]"
              />
            </div>
          </div>

          {/* Workflows Table */}
          <div className="bg-white border border-[#E9E1D4] rounded-xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF5E9] border-b border-[#E9E1D4] text-[#707684] font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Workflow Name &amp; Description</th>
                    <th className="py-3 px-4">Trigger Node</th>
                    <th className="py-3 px-4">AI Agent Node</th>
                    <th className="py-3 px-4">Knowledge Base</th>
                    <th className="py-3 px-4">24h Runs</th>
                    <th className="py-3 px-4">State</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9E1D4]/60">
                  {filteredFlows.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 px-4 text-center">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Zap className="w-6 h-6 text-[#707684]/50" />
                          <p className="text-xs font-semibold text-[#283A50]">No workflows found</p>
                          <p className="text-[11px] text-[#707684] max-w-sm">
                            {flowSearch || flowStatusFilter !== "all"
                              ? "Try adjusting your search criteria or filter to see more workflows."
                              : "Create your first automation workflow to trigger actions from voice calls or customer messages."}
                          </p>
                          <button
                            type="button"
                            onClick={handleCreateNewFlow}
                            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#283A50] hover:bg-black rounded-lg transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Create New Workflow</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredFlows.map((flow) => (
                      <tr key={flow.id} className="hover:bg-[#FAF5E9]/30 transition-colors">
                        <td className="py-3.5 px-4 max-w-xs">
                          <strong className="text-xs font-bold text-[#283A50] block">
                            {flow.name}
                          </strong>
                          <p className="text-[11px] text-[#707684] line-clamp-2 mt-0.5 leading-relaxed">
                            {flow.description}
                          </p>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[10.5px] font-semibold text-[#283A50] bg-[#FAF5E9] border border-[#E9E1D4] px-2 py-0.5 rounded block w-fit">
                            {flow.triggerType}
                          </span>
                          <span className="text-[10px] text-[#707684] mt-0.5 block max-w-[160px] truncate" title={flow.triggerDetail}>
                            {flow.triggerDetail}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap font-medium text-[#283A50]">
                          {flow.assignedAgent}
                        </td>

                        <td className="py-3.5 px-4 max-w-[180px] text-[#707684]">
                          <span className="truncate block" title={flow.knowledgeBase}>
                            {flow.knowledgeBase}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap font-mono text-[#283A50]">
                          {flow.executions24h} <span className="text-[#707684] text-[10.5px]">({flow.successRate})</span>
                        </td>

                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                              flow.status === "Published"
                                ? "bg-[#EAF2ED] text-[#3B6655] border-[#B8D5C5]"
                                : flow.status === "Draft"
                                ? "bg-[#FDF6EB] text-[#8C6228] border-[#ECCB9C]"
                                : "bg-[#FAF5E9] text-[#707684] border-[#E9E1D4]"
                            }`}
                          >
                            {flow.status}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditFlow(flow)}
                            className="px-2.5 py-1 text-xs font-semibold text-[#283A50] bg-[#FAF5E9] hover:bg-white border border-[#E9E1D4] rounded transition-colors cursor-pointer"
                          >
                            Configure Flow
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Flow Detail Editor Modal */}
          {flowModalOpen && editingFlow && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-2xs animate-in fade-in duration-100">
              <div className="relative w-full max-w-2xl bg-white border border-[#E9E1D4] rounded-2xl shadow-xl p-6 space-y-4 text-xs text-[#283A50] max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-3 border-b border-[#E9E1D4]">
                  <div>
                    <h3 className="text-base font-bold text-[#283A50]">
                      Workflow Detail Editor
                    </h3>
                    <p className="text-xs text-[#707684]">
                      Configure execution nodes from trigger to candidate response.
                    </p>
                  </div>
                  <button onClick={() => setFlowModalOpen(false)} className="text-[#707684] hover:text-[#283A50]">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveFlow} className="space-y-4">
                  {/* Flow Metadata */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#283A50] mb-1">
                        Workflow Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingFlow.name}
                        onChange={(e) => setEditingFlow({ ...editingFlow, name: e.target.value })}
                        className="w-full text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#283A50] mb-1">
                        Workflow State
                      </label>
                      <select
                        value={editingFlow.status}
                        onChange={(e) => setEditingFlow({ ...editingFlow, status: e.target.value as any })}
                        className="w-full text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                      >
                        <option value="Published">Published (Active Execution)</option>
                        <option value="Draft">Draft (In Authoring)</option>
                        <option value="Disabled">Disabled (Halted)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#283A50] mb-1">
                      Objective &amp; Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingFlow.description}
                      onChange={(e) => setEditingFlow({ ...editingFlow, description: e.target.value })}
                      className="w-full text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg p-2.5 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                    />
                  </div>

                  {/* Visual Node Pipeline (Trigger -> Condition -> AI Agent -> Knowledge Base -> Reply -> Human Handoff) */}
                  <div className="space-y-3 pt-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#707684]">
                      Sequential Node Pipeline
                    </label>

                    {/* Node 1: Trigger */}
                    <div className="p-3 rounded-lg bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#283A50]">
                        <span className="flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-[#283A50]" />
                          <span>Node 1: Trigger Event</span>
                        </span>
                        <span className="text-[10px] bg-white border border-[#E9E1D4] px-2 py-0.5 rounded font-mono">
                          {editingFlow.triggerType}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={editingFlow.triggerDetail}
                        onChange={(e) => setEditingFlow({ ...editingFlow, triggerDetail: e.target.value })}
                        placeholder="Define trigger condition / keyword..."
                        className="w-full text-xs bg-white border border-[#E9E1D4] rounded-md px-2.5 py-1.5 text-[#283A50]"
                      />
                    </div>

                    {/* Node 2: Condition */}
                    <div className="p-3 rounded-lg bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#283A50]">
                        <span className="flex items-center gap-1.5">
                          <SlidersHorizontal className="w-3.5 h-3.5 text-[#707684]" />
                          <span>Node 2: Qualification Condition</span>
                        </span>
                        <span className="text-[10px] bg-white border border-[#E9E1D4] px-2 py-0.5 rounded">
                          Evaluated Rule
                        </span>
                      </div>
                      <input
                        type="text"
                        value={editingFlow.conditionSummary}
                        onChange={(e) => setEditingFlow({ ...editingFlow, conditionSummary: e.target.value })}
                        placeholder="e.g. If Candidate Score >= 90% and Branch is Open"
                        className="w-full text-xs bg-white border border-[#E9E1D4] rounded-md px-2.5 py-1.5 text-[#283A50]"
                      />
                    </div>

                    {/* Node 3: AI Agent */}
                    <div className="p-3 rounded-lg bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#283A50]">
                        <span className="flex items-center gap-1.5">
                          <Bot className="w-3.5 h-3.5 text-[#3B6655]" />
                          <span>Node 3: Designated AI Voice &amp; Chat Agent</span>
                        </span>
                      </div>
                      <select
                        value={editingFlow.assignedAgent}
                        onChange={(e) => setEditingFlow({ ...editingFlow, assignedAgent: e.target.value })}
                        className="w-full text-xs bg-white border border-[#E9E1D4] rounded-md px-2.5 py-1.5 text-[#283A50]"
                      >
                        <option value="Maya (Admissions AI)">Maya (Admissions AI) — Counseling &amp; Campus Tours</option>
                        <option value="Priya (Student Finance AI)">Priya (Student Finance AI) — Scholarships &amp; Installments</option>
                        <option value="Arjun (Outreach & Ops AI)">Arjun (Outreach &amp; Ops AI) — Lead Qualification &amp; Docs</option>
                      </select>
                    </div>

                    {/* Node 4: Knowledge Base */}
                    <div className="p-3 rounded-lg bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#283A50]">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#283A50]" />
                          <span>Node 4: Grounding Knowledge Base</span>
                        </span>
                      </div>
                      <input
                        type="text"
                        value={editingFlow.knowledgeBase}
                        onChange={(e) => setEditingFlow({ ...editingFlow, knowledgeBase: e.target.value })}
                        placeholder="Name of admissions codex or PDF source..."
                        className="w-full text-xs bg-white border border-[#E9E1D4] rounded-md px-2.5 py-1.5 text-[#283A50]"
                      />
                    </div>

                    {/* Node 5: Reply Action */}
                    <div className="p-3 rounded-lg bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#283A50]">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-[#283A50]" />
                          <span>Node 5: WhatsApp Response &amp; Collateral</span>
                        </span>
                      </div>
                      <input
                        type="text"
                        value={editingFlow.actionsSummary}
                        onChange={(e) => setEditingFlow({ ...editingFlow, actionsSummary: e.target.value })}
                        placeholder="Specify template or document dispatch..."
                        className="w-full text-xs bg-white border border-[#E9E1D4] rounded-md px-2.5 py-1.5 text-[#283A50]"
                      />
                    </div>

                    {/* Node 6: Human Handoff */}
                    <div className="p-3 rounded-lg bg-[#FDF6EB] border border-[#ECCB9C] space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold text-[#8C6228]">
                        <span className="flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-[#8C6228]" />
                          <span>Node 6: Human Counselor Handoff Rule</span>
                        </span>
                      </div>
                      <input
                        type="text"
                        value={editingFlow.humanHandoffRule}
                        onChange={(e) => setEditingFlow({ ...editingFlow, humanHandoffRule: e.target.value })}
                        placeholder="Define escalation condition..."
                        className="w-full text-xs bg-white border border-[#ECCB9C] rounded-md px-2.5 py-1.5 text-[#283A50]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9E1D4]">
                    <button
                      type="button"
                      onClick={() => setFlowModalOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-[#707684] hover:text-[#283A50] border border-[#E9E1D4] bg-white rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-bold text-white bg-[#283A50] hover:bg-black rounded-lg transition-colors cursor-pointer"
                    >
                      Save Workflow
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ====================================================================== */}
      {/* TAB 4: TEMPLATES                                                       */}
      {/* ====================================================================== */}
      {activeTab === "templates" && (
        <div className="space-y-4">
          {/* Header */}
          <div className="bg-white border border-[#E9E1D4] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="space-y-0.5">
              <h2 className="text-sm font-bold text-[#283A50]">
                Meta-Approved WhatsApp Templates
              </h2>
              <p className="text-xs text-[#707684]">
                Reusable message templates authorized by Meta Business Manager for outbound customer messaging.
              </p>
            </div>

            <button
              type="button"
              onClick={() => showToast("New template creation dialog is in sandbox preview mode.")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#283A50] hover:bg-black rounded-lg transition-colors cursor-pointer self-start sm:self-center"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Template</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white border border-[#E9E1D4] rounded-xl p-3 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[11px] font-bold text-[#707684] uppercase tracking-wider mr-1">
                Category:
              </span>
              {["all", "Utility", "Marketing", "Authentication"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setTemplateCategoryFilter(cat)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                    templateCategoryFilter === cat
                      ? "bg-[#283A50] text-white"
                      : "bg-[#FAF5E9] text-[#707684] hover:text-[#283A50]"
                  }`}
                >
                  {cat === "all" ? "All Categories" : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#707684]" />
              <input
                type="text"
                value={templateSearch}
                onChange={(e) => setTemplateSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg text-[#283A50] focus:outline-none focus:bg-white focus:border-[#283A50]"
              />
            </div>
          </div>

          {/* 2-Column Layout: Template Table & Live WhatsApp Bubble Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left 7 Cols: Templates Table */}
            <div className="lg:col-span-7 bg-white border border-[#E9E1D4] rounded-xl shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF5E9] border-b border-[#E9E1D4] text-[#707684] font-semibold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Template Name</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9E1D4]/60">
                    {filteredTemplates.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-12 px-4 text-center">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <FileText className="w-6 h-6 text-[#707684]/50" />
                            <p className="text-xs font-semibold text-[#283A50]">No templates found</p>
                            <p className="text-[11px] text-[#707684] max-w-xs">
                              {templateSearch || templateCategoryFilter !== "all"
                                ? "Try adjusting your category filter or search query."
                                : "Add Meta-approved WhatsApp message templates to send notifications and follow-ups."}
                            </p>
                            <button
                              type="button"
                              onClick={() => showToast("New template creation dialog is in sandbox preview mode.")}
                              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#283A50] hover:bg-black rounded-lg transition-colors cursor-pointer"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Create New Template</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredTemplates.map((t) => {
                        const isSelected = previewTemplate?.id === t.id;
                        return (
                          <tr
                            key={t.id}
                            onClick={() => {
                              try { soundSynth.play("click"); } catch {}
                              setPreviewTemplate(t);
                            }}
                            className={`cursor-pointer transition-colors ${
                              isSelected ? "bg-[#FAF5E9]/60 font-medium" : "hover:bg-[#FAF5E9]/30"
                            }`}
                          >
                            <td className="py-3 px-4">
                              <strong className="text-xs font-bold text-[#283A50] block font-mono">
                                {t.name}
                              </strong>
                              <span className="text-[10.5px] text-[#707684] line-clamp-1 mt-0.5">
                                {t.bodySnippet}
                              </span>
                            </td>

                            <td className="py-3 px-4 whitespace-nowrap">
                              <span className="text-[10.5px] text-[#283A50] bg-[#FAF5E9] border border-[#E9E1D4] px-2 py-0.5 rounded">
                                {t.category}
                              </span>
                            </td>

                            <td className="py-3 px-4 whitespace-nowrap">
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                                  t.status === "Approved"
                                    ? "bg-[#EAF2ED] text-[#3B6655] border-[#B8D5C5]"
                                    : t.status === "In Review"
                                    ? "bg-[#FDF6EB] text-[#8C6228] border-[#ECCB9C]"
                                    : "bg-[#FAF5E9] text-[#707684] border-[#E9E1D4]"
                                }`}
                              >
                                {t.status}
                              </span>
                            </td>

                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPreviewTemplate(t);
                                }}
                                className="px-2.5 py-1 text-xs font-semibold text-[#283A50] bg-white border border-[#E9E1D4] rounded hover:bg-[#FAF5E9] transition-colors cursor-pointer"
                              >
                                Preview
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right 5 Cols: Live WhatsApp Bubble Preview Pane */}
            <div className="lg:col-span-5 bg-white border border-[#E9E1D4] rounded-xl p-5 shadow-xs space-y-4">
              <div className="border-b border-[#E9E1D4] pb-2.5 flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#283A50]">
                    WhatsApp Device Preview
                  </h3>
                  <p className="text-[11px] text-[#707684]">
                    Real-time rendering with interpolated variables.
                  </p>
                </div>
                {previewTemplate && (
                  <span className="text-[10px] font-semibold text-[#3B6655] bg-[#EAF2ED] border border-[#B8D5C5] px-2 py-0.5 rounded">
                    {previewTemplate.status}
                  </span>
                )}
              </div>

              {previewTemplate ? (
                <div className="space-y-4">
                  {/* WhatsApp Phone Mock Container */}
                  <div className="p-4 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#E9E1D4]">
                      <div className="w-6 h-6 rounded-full bg-[#283A50] text-white flex items-center justify-center text-[10px] font-bold">
                        S
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-[#283A50] block truncate">
                          Swaram University
                        </span>
                        <span className="text-[10px] text-[#707684]">Verified Business Account</span>
                      </div>
                    </div>

                    {/* The WhatsApp Message Bubble */}
                    <div className="bg-white border border-[#E9E1D4] rounded-lg p-3.5 space-y-2.5 shadow-2xs text-xs text-[#283A50]">
                      {previewTemplate.hasDocument && (
                        <div className="p-2.5 rounded bg-[#FAF5E9]/60 border border-[#E9E1D4] flex items-center gap-2 text-xs font-semibold text-[#283A50]">
                          <FileText className="w-4 h-4 text-[#283A50]" />
                          <span>{previewTemplate.documentType || "PDF Attachment"}</span>
                        </div>
                      )}

                      <p className="leading-relaxed whitespace-pre-line text-xs font-normal">
                        {previewTemplate.bodySnippet
                          .replace("{{1}}", "Devansh Patil")
                          .replace("{{2}}", "94.2")
                          .replace("{{3}}", "MBA Fintech & Analytics")
                          .replace("{{4}}", "30 November 2026")}
                      </p>

                      <div className="text-right text-[10px] text-[#707684] pt-1">
                        10:15 AM • Delivered
                      </div>

                      {/* Interactive Buttons */}
                      {previewTemplate.buttons.length > 0 && (
                        <div className="pt-2 border-t border-[#E9E1D4] space-y-1">
                          {previewTemplate.buttons.map((btn, idx) => (
                            <div
                              key={idx}
                              className="w-full text-center py-1.5 text-xs font-semibold text-[#283A50] bg-[#FAF5E9] hover:bg-[#FAF5E9]/80 border border-[#E9E1D4] rounded cursor-pointer"
                            >
                              {btn}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Variables Specification Table */}
                  <div className="space-y-1.5 text-xs">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#707684]">
                      Personalization Variables ({previewTemplate.variables.length})
                    </label>
                    <div className="space-y-1">
                      {previewTemplate.variables.map((v, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between p-2 rounded bg-[#FAF5E9]/50 border border-[#E9E1D4] text-[11px]"
                        >
                          <code className="font-mono font-bold text-[#283A50]">{v}</code>
                          <span className="text-[#707684]">Dynamic CRM Field</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-[#707684]">
                  Select a template to preview its message card.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================== */}
      {/* TAB 5: SETTINGS                                                        */}
      {/* ====================================================================== */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="space-y-5">
          {/* Section 1: WhatsApp Business Connection */}
          <div className="bg-white border border-[#E9E1D4] rounded-xl p-5 shadow-xs space-y-4">
            <div className="border-b border-[#E9E1D4] pb-2.5">
              <h3 className="text-sm font-bold text-[#283A50]">
                WhatsApp Business Cloud API Connection
              </h3>
              <p className="text-xs text-[#707684]">
                Meta Cloud API credentials and dedicated telephony webhook endpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#283A50] mb-1">
                  WhatsApp Business Account ID (WABA ID)
                </label>
                <input
                  type="text"
                  value={wabaId}
                  onChange={(e) => setWabaId(e.target.value)}
                  className="w-full text-xs font-mono bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#283A50] mb-1">
                  Phone Number ID
                </label>
                <input
                  type="text"
                  value={phoneNumberId}
                  onChange={(e) => setPhoneNumberId(e.target.value)}
                  className="w-full text-xs font-mono bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#283A50] mb-1">
                  Display Verified Business Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#283A50] mb-1">
                  Webhook Callback Endpoint (Read-only)
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    readOnly
                    value="https://api.swaram.in/webhooks/whatsapp/v1"
                    className="w-full text-xs font-mono bg-slate-50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#707684]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText("https://api.swaram.in/webhooks/whatsapp/v1");
                      showToast("Webhook URL copied to clipboard");
                    }}
                    className="p-2 border border-[#E9E1D4] bg-white rounded-lg hover:bg-[#FAF5E9]"
                    title="Copy URL"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#283A50]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: AI Voice & Chat Agent Preferences */}
          <div className="bg-white border border-[#E9E1D4] rounded-xl p-5 shadow-xs space-y-4">
            <div className="border-b border-[#E9E1D4] pb-2.5">
              <h3 className="text-sm font-bold text-[#283A50]">
                AI Agent &amp; Knowledge Routing Preferences
              </h3>
              <p className="text-xs text-[#707684]">
                Configure autonomous response defaults, language fallbacks, and knowledge codex bindings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#283A50] mb-1">
                  Default Inbound AI Agent
                </label>
                <select
                  value={defaultAgent}
                  onChange={(e) => setDefaultAgent(e.target.value)}
                  className="w-full text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                >
                  <option value="Maya (Admissions AI)">Maya (Admissions AI) — Recommended Default</option>
                  <option value="Priya (Student Finance AI)">Priya (Student Finance AI)</option>
                  <option value="Arjun (Outreach AI)">Arjun (Outreach AI)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#283A50] mb-1">
                  Primary Messaging Language
                </label>
                <select
                  value={primaryLanguage}
                  onChange={(e) => setPrimaryLanguage(e.target.value)}
                  className="w-full text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                >
                  <option value="English (India)">English (India)</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#283A50] mb-1">
                  Bound Knowledge Codex
                </label>
                <input
                  type="text"
                  value={knowledgeBaseRef}
                  onChange={(e) => setKnowledgeBaseRef(e.target.value)}
                  className="w-full text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[#FAF5E9]/40 border border-[#E9E1D4]">
                <div>
                  <strong className="block text-[#283A50] font-semibold">Auto-Translate Inbound Dialects</strong>
                  <span className="text-[11px] text-[#707684]">Translate regional student queries to Hindi / English</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoTranslate}
                  onChange={(e) => setAutoTranslate(e.target.checked)}
                  className="w-4 h-4 accent-[#283A50] rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Human Escalation & SLA Protocol */}
          <div className="bg-white border border-[#E9E1D4] rounded-xl p-5 shadow-xs space-y-4">
            <div className="border-b border-[#E9E1D4] pb-2.5">
              <h3 className="text-sm font-bold text-[#283A50]">
                Counselor Escalation &amp; SLA Protocol
              </h3>
              <p className="text-xs text-[#707684]">
                Handoff triggers when student questions require Dean or Athletic Director authorization.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#283A50] mb-1">
                  Human Response Target SLA
                </label>
                <select
                  value={businessHoursSla}
                  onChange={(e) => setBusinessHoursSla(e.target.value)}
                  className="w-full text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                >
                  <option value="5 minutes">5 minutes (Priority Admissions)</option>
                  <option value="15 minutes">15 minutes (Standard)</option>
                  <option value="1 hour">1 hour (General Inquiry)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#283A50] mb-1">
                  After-Hours Routing Behavior
                </label>
                <select
                  value={outOfHoursBehavior}
                  onChange={(e) => setOutOfHoursBehavior(e.target.value)}
                  className="w-full text-xs bg-[#FAF5E9]/50 border border-[#E9E1D4] rounded-lg px-3 py-2 text-[#283A50] focus:outline-none focus:border-[#283A50]"
                >
                  <option value="AI continues answering + logs morning queue">
                    Autonomous AI answers + Queues counselor callback at 09:00 AM
                  </option>
                  <option value="Auto-reply with office hours message only">
                    Auto-reply with office hours message only
                  </option>
                </select>
              </div>

              <div className="sm:col-span-2 flex items-center gap-6 p-3 rounded-lg bg-[#FAF5E9]/40 border border-[#E9E1D4]">
                <span className="font-semibold text-[#283A50]">Dispatch Escalation Notifications:</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifySlack}
                    onChange={(e) => setNotifySlack(e.target.checked)}
                    className="w-4 h-4 accent-[#283A50] rounded"
                  />
                  <span>Slack #admissions-urgent</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.checked)}
                    className="w-4 h-4 accent-[#283A50] rounded"
                  />
                  <span>Email to Duty Officer</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#283A50] hover:bg-black rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Save Configuration Settings
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
