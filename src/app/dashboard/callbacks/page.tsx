"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CalendarClock,
  Search,
  PhoneCall,
  Clock,
  CheckCircle2,
  AlertTriangle,
  User,
  ExternalLink,
  ShieldCheck,
  Plus,
  Play,
  RotateCcw,
  Bot,
  Sparkles,
  Filter,
  Users,
  Layers,
  FolderKanban,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  AlertCircle,
  X,
  Tag,
  HelpCircle,
  Send,
  Radio,
  FileText,
  UserCheck,
  Calendar,
  PhoneIncoming,
  PhoneOutgoing,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import CallDrawer from "@/components/dashboard/views/CallDrawer";
import { RecentCallRecord } from "@/types/dashboard";
import { mockRecentCalls } from "@/data/mock/dashboardData";
import { soundSynth } from "@/lib/audio-synth";
import {
  initialCallbacks,
  type CallbackItem,
} from "@/data/mock/callbacksData";

export type { CallbackItem } from "@/data/mock/callbacksData";

function CallbacksContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlFilter = searchParams?.get("filter");
  const urlTargetId = searchParams?.get("id");

  const [callbacks, setCallbacks] = useState<CallbackItem[]>(initialCallbacks);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>(urlFilter === "human" ? "human" : "all");
  const [viewMode, setViewMode] = useState<"grouped" | "table">("grouped");
  const [agentFilter, setAgentFilter] = useState<string>("all");
  const [humanNeededOnly, setHumanNeededOnly] = useState<boolean>(urlFilter === "human");
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(urlTargetId || null);

  const [selectedCallRecord, setSelectedCallRecord] = useState<RecentCallRecord | null>(null);
  const [callDrawerOpen, setCallDrawerOpen] = useState(false);

  // Sync state when URL search params change
  useEffect(() => {
    if (urlFilter === "human") {
      setStatusFilter("human");
      setHumanNeededOnly(true);
    }
    if (urlTargetId) {
      setActiveHighlightId(urlTargetId);
      // Ensure group is expanded and scroll into view smoothly
      setTimeout(() => {
        const el = document.getElementById(`callback-${urlTargetId}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 350);
    }
  }, [urlFilter, urlTargetId]);

  // Broadcast state changes so AppHeader notifications remain 100% in sync
  const updateCallbacksState = (
    updater: CallbackItem[] | ((prev: CallbackItem[]) => CallbackItem[])
  ) => {
    setCallbacks((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("swaram:callbacks-updated", {
            detail: { callbacks: next },
          })
        );
      }
      return next;
    });
  };

  // Expanded group cards state
  const [collapsedGroups, setCollapsedGroups] = useState<{ [groupId: string]: boolean }>({});

  // Confirmation Modal
  const [dialConfirmModalOpen, setDialConfirmModalOpen] = useState(false);
  const [targetCallback, setTargetCallback] = useState<CallbackItem | null>(null);
  const [diallingNotice, setDiallingNotice] = useState<string | null>(null);

  // Reassign Modal
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [reassignItem, setReassignItem] = useState<CallbackItem | null>(null);
  const [newAgentName, setNewAgentName] = useState("");
  const [newHumanNeeded, setNewHumanNeeded] = useState(false);
  const [newHumanReason, setNewHumanReason] = useState("");
  const [newScheduledWindow, setNewScheduledWindow] = useState("");

  // New Callback Modal
  const [newCallbackModalOpen, setNewCallbackModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newTopicName, setNewTopicName] = useState("B.Tech CSE Admissions & 35% Chancellor Waiver");
  const [newDatasetTitle, setNewDatasetTitle] = useState("All-India JoSAA & State CET Qualified Applicants 2026 (Batch OUT-01)");
  const [newAgentSelection, setNewAgentSelection] = useState("Maya (Admissions AI)");
  const [newScheduledTime, setNewScheduledTime] = useState("Today, 06:00 PM");
  const [newWhyQueued, setNewWhyQueued] = useState("");
  const [newHumanToggle, setNewHumanToggle] = useState(false);
  const [newHumanNotes, setNewHumanNotes] = useState("");

  // Manual Reschedule Modal
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleTargetItem, setRescheduleTargetItem] = useState<CallbackItem | null>(null);
  const [rescheduleSlotType, setRescheduleSlotType] = useState<string>("in-30-mins");
  const [rescheduleCustomTime, setRescheduleCustomTime] = useState<string>("");
  const [rescheduleReasonText, setRescheduleReasonText] = useState<string>("");
  const [rescheduleDelegateToAgent, setRescheduleDelegateToAgent] = useState<boolean>(true);
  const [reschedulePriority, setReschedulePriority] = useState<"Urgent" | "High" | "Normal">("High");

  const toggleGroupCollapse = (groupId: string) => {
    try { soundSynth.play("click"); } catch {}
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Filtered callbacks
  const filteredCallbacks = useMemo(() => {
    return callbacks.filter((cb) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cb.contactName.toLowerCase().includes(q) ||
        cb.phone.includes(q) ||
        cb.topicName.toLowerCase().includes(q) ||
        cb.whyQueued.toLowerCase().includes(q) ||
        cb.agentName.toLowerCase().includes(q) ||
        cb.datasetBatchTitle.toLowerCase().includes(q) ||
        (cb.humanInteractionReason && cb.humanInteractionReason.toLowerCase().includes(q));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "pending" && cb.status === "Pending") ||
        (statusFilter === "completed" && cb.status === "Completed") ||
        (statusFilter === "human" && cb.humanInteractionNeeded) ||
        (statusFilter === "autonomous" && !cb.humanInteractionNeeded);

      const matchesAgent =
        agentFilter === "all" ||
        (agentFilter === "maya" && cb.agentId.includes("maya")) ||
        (agentFilter === "priya" && cb.agentId.includes("priya")) ||
        (agentFilter === "arjun" && cb.agentId.includes("arjun")) ||
        (agentFilter === "human" && cb.agentId.includes("counselor"));

      const matchesHumanOnly = !humanNeededOnly || cb.humanInteractionNeeded;

      return matchesSearch && matchesStatus && matchesAgent && matchesHumanOnly;
    });
  }, [callbacks, searchQuery, statusFilter, agentFilter, humanNeededOnly]);

  // Grouped by Topic & Dataset Cohort
  const groupedCohorts = useMemo(() => {
    const groups: {
      [key: string]: {
        groupId: string;
        topicName: string;
        datasetBatchTitle: string;
        topicCategory: string;
        agentName: string;
        agentAvatar: string;
        items: CallbackItem[];
        pendingCount: number;
        humanNeededCount: number;
        earliestScheduled: string;
      };
    } = {};

    filteredCallbacks.forEach((cb) => {
      const key = `${cb.datasetBatchId}__${cb.topicId}`;
      if (!groups[key]) {
        groups[key] = {
          groupId: key,
          topicName: cb.topicName,
          datasetBatchTitle: cb.datasetBatchTitle,
          topicCategory: cb.topicCategory,
          agentName: cb.agentName,
          agentAvatar: cb.agentAvatar,
          items: [],
          pendingCount: 0,
          humanNeededCount: 0,
          earliestScheduled: cb.scheduledExactTime,
        };
      }
      groups[key].items.push(cb);
      if (cb.status === "Pending") {
        groups[key].pendingCount += 1;
      }
      if (cb.humanInteractionNeeded) {
        groups[key].humanNeededCount += 1;
      }
    });

    return Object.values(groups);
  }, [filteredCallbacks]);

  // Counts
  const pendingCount = callbacks.filter((c) => c.status === "Pending").length;
  const humanNeededCount = callbacks.filter((c) => c.humanInteractionNeeded && c.status === "Pending").length;
  const autonomousCount = callbacks.filter((c) => !c.humanInteractionNeeded && c.status === "Pending").length;
  const completedTodayCount = callbacks.filter((c) => c.status === "Completed").length;

  const handleOpenSourceCall = (callId: string) => {
    try { soundSynth.play("click"); } catch {}
    const match = mockRecentCalls.find((c) => c.id === callId) || mockRecentCalls[0];
    setSelectedCallRecord(match);
    setCallDrawerOpen(true);
  };

  const handlePromptDial = (cb: CallbackItem) => {
    try { soundSynth.play("click"); } catch {}
    setTargetCallback(cb);
    setDialConfirmModalOpen(true);
  };

  const handleConfirmLiveDial = () => {
    if (!targetCallback) return;
    try { soundSynth.play("confirm"); } catch {}
    setDialConfirmModalOpen(false);
    
    const isHuman = targetCallback.humanInteractionNeeded;
    setDiallingNotice(
      isHuman
        ? `Transferring live carrier call to ${targetCallback.contactName} (${targetCallback.phone}) with Human Counselor Handoff context.`
        : `Dispatched carrier SIP line to ${targetCallback.contactName} (${targetCallback.phone}) via ${targetCallback.agentName}. Sub-140ms voice latency SLA.`
    );

    updateCallbacksState((prev) =>
      prev.map((c) => (c.id === targetCallback.id ? { ...c, status: "Completed", countdownLabel: "Completed" } : c))
    );

    setTimeout(() => {
      setDiallingNotice(null);
    }, 5500);
  };

  const handleOpenReassignModal = (cb: CallbackItem) => {
    try { soundSynth.play("click"); } catch {}
    setReassignItem(cb);
    setNewAgentName(cb.agentName);
    setNewHumanNeeded(cb.humanInteractionNeeded);
    setNewHumanReason(cb.humanInteractionReason || "");
    setNewScheduledWindow(cb.scheduledWindow);
    setReassignModalOpen(true);
  };

  const handleSaveReassign = () => {
    if (!reassignItem) return;
    try { soundSynth.play("confirm"); } catch {}
    updateCallbacksState((prev) =>
      prev.map((c) => {
        if (c.id === reassignItem.id) {
          return {
            ...c,
            agentName: newAgentName,
            humanInteractionNeeded: newHumanNeeded,
            humanInteractionReason: newHumanNeeded ? newHumanReason : undefined,
            scheduledWindow: newScheduledWindow,
          };
        }
        return c;
      })
    );
    setReassignModalOpen(false);
    setDiallingNotice(`Updated callback settings for ${reassignItem.contactName}. Assigned to ${newAgentName}.`);
    setTimeout(() => setDiallingNotice(null), 4000);
  };

  const handleAddNewCallback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    try { soundSynth.play("confirm"); } catch {}

    const newItem: CallbackItem = {
      id: `cb-${Date.now()}`,
      contactName: newContactName.trim(),
      phone: newContactPhone.trim(),
      city: "Hyderabad, TS",
      course: "B.Tech Computer Science",
      agentId: newAgentSelection.includes("Maya")
        ? "agent-maya"
        : newAgentSelection.includes("Priya")
        ? "agent-priya"
        : newAgentSelection.includes("Arjun")
        ? "agent-arjun"
        : "agent-counselor-desk",
      agentName: newAgentSelection,
      agentAvatar: newAgentSelection.charAt(0),
      agentRole: newAgentSelection.includes("Maya")
        ? "Admissions Concierge"
        : newAgentSelection.includes("Priya")
        ? "Finance Specialist"
        : newAgentSelection.includes("Arjun")
        ? "Outreach Specialist"
        : "Senior Counselor",
      agentBadgeColor: newAgentSelection.includes("Maya")
        ? "bg-orange-50 text-orange-700 border-orange-200"
        : newAgentSelection.includes("Priya")
        ? "bg-purple-50 text-purple-700 border-purple-200"
        : "bg-blue-50 text-blue-700 border-blue-200",
      topicId: "topic-custom",
      topicName: newTopicName,
      topicCategory: "Admissions",
      datasetBatchId: "batch-outbound-01",
      datasetBatchTitle: newDatasetTitle,
      scheduledWindow: newScheduledTime,
      scheduledExactTime: newScheduledTime,
      countdownLabel: "Scheduled",
      isOverdue: false,
      whyQueued: newWhyQueued.trim() || "Manual appointment scheduled by admissions coordinator.",
      queuedTrigger: "Candidate Requested",
      humanInteractionNeeded: newHumanToggle,
      humanInteractionReason: newHumanToggle ? newHumanNotes : undefined,
      humanAssignee: newHumanToggle ? "Senior Counselor Desk" : undefined,
      priority: newHumanToggle ? "High" : "Normal",
      status: "Pending",
      sourceCallId: "call-001",
      createdAt: "Just now",
    };

    updateCallbacksState((prev) => [newItem, ...prev]);
    setNewCallbackModalOpen(false);
    setNewContactName("");
    setNewContactPhone("");
    setNewWhyQueued("");
    setNewHumanToggle(false);
    setNewHumanNotes("");
    setDiallingNotice(`Successfully added callback for ${newItem.contactName} to the queue!`);
    setTimeout(() => setDiallingNotice(null), 4000);
  };

  const handleMarkResolved = (id: string) => {
    try { soundSynth.play("click"); } catch {}
    updateCallbacksState((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Completed", countdownLabel: "Completed" } : c))
    );
  };

  const handleOpenManualSchedule = (cb: CallbackItem) => {
    try { soundSynth.play("click"); } catch {}
    setRescheduleTargetItem(cb);
    setRescheduleSlotType("in-30-mins");
    setRescheduleCustomTime(cb.scheduledWindow);
    setRescheduleReasonText(
      cb.lastRescheduledReason
        ? `Adjusted: ${cb.lastRescheduledReason}`
        : "Candidate requested revised callback slot"
    );
    setRescheduleDelegateToAgent(!cb.humanInteractionNeeded);
    setReschedulePriority(cb.priority);
    setRescheduleModalOpen(true);
  };

  const handleSaveManualSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleTargetItem) return;
    try { soundSynth.play("confirm"); } catch {}

    let newWindow = rescheduleCustomTime;
    let newCountdown = "Scheduled";

    if (rescheduleSlotType === "in-30-mins") {
      newWindow = "Today, 07:00 PM (In 30 mins)";
      newCountdown = "In 30 mins";
    } else if (rescheduleSlotType === "in-2-hours") {
      newWindow = "Today, 08:30 PM (Evening Slot)";
      newCountdown = "In 2 hrs";
    } else if (rescheduleSlotType === "tonight-9pm") {
      newWindow = "Tonight, 09:00 PM (Post-Dinner Slot)";
      newCountdown = "Tonight 9 PM";
    } else if (rescheduleSlotType === "tomorrow-10am") {
      newWindow = "Tomorrow, 10:00 AM (Morning Slot)";
      newCountdown = "Tomorrow 10:00 AM";
    } else if (rescheduleSlotType === "tomorrow-3pm") {
      newWindow = "Tomorrow, 03:00 PM (Afternoon Slot)";
      newCountdown = "Tomorrow 3:00 PM";
    } else if (rescheduleSlotType === "saturday-11am") {
      newWindow = "Saturday, 11:00 AM (Weekend Counseling)";
      newCountdown = "This Saturday 11 AM";
    } else {
      newWindow = rescheduleCustomTime || rescheduleTargetItem.scheduledWindow;
      newCountdown = "Custom Slot";
    }

    const updatedReason = rescheduleReasonText.trim() || "Manual slot adjustment by operator";

    updateCallbacksState((prev) =>
      prev.map((c) => {
        if (c.id === rescheduleTargetItem.id) {
          return {
            ...c,
            scheduledWindow: newWindow,
            scheduledExactTime: newWindow,
            countdownLabel: newCountdown,
            priority: reschedulePriority,
            status: "Pending",
            rescheduleCount: (c.rescheduleCount || 0) + 1,
            lastRescheduledBy: "User",
            lastRescheduledReason: updatedReason,
            rescheduledAt: "Just now",
            humanInteractionNeeded: !rescheduleDelegateToAgent,
            humanInteractionReason: !rescheduleDelegateToAgent
              ? c.humanInteractionReason || "Flagged for manual operator live dial at scheduled slot"
              : undefined,
          };
        }
        return c;
      })
    );

    setRescheduleModalOpen(false);
    setDiallingNotice(
      `Manually rescheduled callback for ${rescheduleTargetItem.contactName} to ${newWindow}. (Updated manually by operator)`
    );
    setTimeout(() => setDiallingNotice(null), 4500);
  };

  const activeHighlightCallback = useMemo(() => {
    if (!activeHighlightId) return null;
    return callbacks.find((c) => c.id === activeHighlightId) || null;
  }, [callbacks, activeHighlightId]);

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A] select-none pb-16">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold tracking-wider text-black/45 hover:text-black uppercase transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 bg-purple-100 px-3 py-0.5 rounded-full">
              Callbacks Queue
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span>Real-time Cadence Synced</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2 flex items-center gap-3">
            <span>Callbacks &amp; Follow-up Queue</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {callbacks.length} Total Requests
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-black/60 mt-1 max-w-3xl leading-relaxed">
            Enterprise call center follow-up queue. Tracks exactly which AI voice agent and topic each callback belongs to, when it is scheduled, why it was queued, whether human interaction is required, and groups related calls from the same topic or dataset.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setNewCallbackModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-sm shadow-purple-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Callback</span>
          </button>

          <Link
            href="/dashboard/outbound-scheduler"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-full border border-slate-200 shadow-2xs transition-all"
          >
            <PhoneOutgoing className="w-3.5 h-3.5 text-purple-600" />
            <span>Outbound Scheduler</span>
          </Link>
        </div>
      </div>

      {/* Human Action Call Selected From Notifications Banner */}
      {activeHighlightCallback && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/95 border-2 border-amber-400 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <UserCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-600 text-white shadow-2xs">
                  Notification Alert
                </span>
                <span className="text-xs font-bold text-amber-950">
                  {activeHighlightCallback.contactName} ({activeHighlightCallback.phone})
                </span>
                <span className="text-xs text-black/50">
                  • {activeHighlightCallback.course}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 border border-amber-300">
                  {activeHighlightCallback.priority} Priority
                </span>
              </div>
              <p className="text-xs text-amber-900 font-medium leading-relaxed">
                <strong className="text-amber-950">Human Action Needed:</strong>{" "}
                {activeHighlightCallback.humanInteractionReason || activeHighlightCallback.whyQueued}
              </p>
              {activeHighlightCallback.humanAssignee && (
                <p className="text-[11px] text-amber-800">
                  Assigned Desk: <strong>{activeHighlightCallback.humanAssignee}</strong> • Topic: {activeHighlightCallback.topicName}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start md:self-center">
            {activeHighlightCallback.status === "Pending" && (
              <button
                type="button"
                onClick={() => handlePromptDial(activeHighlightCallback)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#283A50] hover:bg-[#1E2C3D] text-white shadow-xs transition-all cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Take Action / Dial Now</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setActiveHighlightId(null);
                router.replace("/dashboard/callbacks");
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold bg-white hover:bg-amber-100/60 text-amber-900 border border-amber-300 transition-all cursor-pointer"
              title="Clear notification alert focus"
            >
              <X className="w-3.5 h-3.5" />
              <span>Dismiss</span>
            </button>
          </div>
        </div>
      )}

      {/* Notice Banner */}
      {diallingNotice && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3 text-xs text-emerald-900 font-semibold animate-in fade-in duration-200 shadow-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
            <span>{diallingNotice}</span>
          </div>
          <button onClick={() => setDiallingNotice(null)} className="text-emerald-700 hover:text-emerald-950 p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 4 Telemetry Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Pending In Queue"
          icon={Clock}
          description="Candidates awaiting scheduled follow-up outreach."
          metric={`${pendingCount} Pending`}
          metricLabel="Earliest: In 10 mins (Kavita Deshmukh)"
          status="Active"
          statusType="warning"
          actionLabel="View all pending →"
          onClick={() => setStatusFilter("pending")}
        />

        <WorkspaceCard
          name="Requires Human Action"
          icon={AlertTriangle}
          description="Complex appeals, fee exceptions, or special quota requests."
          metric={`${humanNeededCount} Handoffs`}
          metricLabel="Senior Counselor / Dean intervention"
          status="High Priority"
          statusType="warning"
          actionLabel="Inspect human desk →"
          onClick={() => setStatusFilter("human")}
        />

        <WorkspaceCard
          name="AI Autonomous Calls"
          icon={Bot}
          description="Autonomous AI agent callbacks dialed with full turn-by-turn memory."
          metric={`${autonomousCount} Autonomous`}
          metricLabel="Maya, Priya & Arjun pool"
          status="Operational"
          statusType="ready"
          actionLabel="View autonomous →"
          onClick={() => setStatusFilter("autonomous")}
        />

        <WorkspaceCard
          name="Resolved Today"
          icon={CheckCircle2}
          description="Follow-ups successfully connected and admissions verified."
          metric={`${completedTodayCount} Completed`}
          metricLabel="Sub-140ms voice latency SLA"
          status="100% Connect"
          statusType="ready"
          actionLabel="View completed →"
          onClick={() => setStatusFilter("completed")}
        />
      </div>

      {/* Controls Bar: View Mode Switcher, Quick Filters & Search */}
      <div className="p-4 rounded-2xl bg-white border border-black/[0.08] shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* View Mode Toggle: Grouped vs Table */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-fit">
            <button
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setViewMode("grouped");
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "grouped"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Grouped by Topic &amp; Dataset ({groupedCohorts.length} Groups)</span>
            </button>

            <button
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setViewMode("table");
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "table"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" />
              <span>Table / List View ({filteredCallbacks.length})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by candidate, topic, reason why queued, agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20 focus:bg-white placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Secondary Quick Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Filter:
          </span>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setStatusFilter("all");
              setHumanNeededOnly(false);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              statusFilter === "all" && !humanNeededOnly
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Callbacks ({callbacks.length})
          </button>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setStatusFilter("human");
              setHumanNeededOnly(true);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
              humanNeededOnly || statusFilter === "human"
                ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
            }`}
          >
            <AlertTriangle className="w-3 h-3" />
            <span>⚠️ Requires Human Action ({humanNeededCount})</span>
          </button>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setStatusFilter("autonomous");
              setHumanNeededOnly(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
              statusFilter === "autonomous"
                ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
            }`}
          >
            <Bot className="w-3 h-3" />
            <span>🤖 AI Autonomous ({autonomousCount})</span>
          </button>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setStatusFilter("pending");
              setHumanNeededOnly(false);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              statusFilter === "pending"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Pending Only ({pendingCount})
          </button>

          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setStatusFilter("completed");
              setHumanNeededOnly(false);
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              statusFilter === "completed"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Completed ({completedTodayCount})
          </button>

          <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

          {/* Agent Filter dropdown */}
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="text-xs bg-slate-100 border border-slate-200 text-slate-800 rounded-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-purple-600 font-medium cursor-pointer"
          >
            <option value="all">All Agents &amp; Desks</option>
            <option value="maya">Maya (Admissions AI)</option>
            <option value="priya">Priya (Finance AI)</option>
            <option value="arjun">Arjun (Outreach AI)</option>
            <option value="human">Senior Counselor Desk</option>
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: GROUPED BY TOPIC & DATASET COHORT                                */}
      {/* ========================================================================= */}
      {viewMode === "grouped" && (
        <div className="space-y-5">
          {groupedCohorts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
              <CalendarClock className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">No Callbacks Found</h3>
              <p className="text-xs max-w-sm mx-auto">
                No callback requests match your active search and filter criteria. Try clearing filters or searching with different terms.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setHumanNeededOnly(false);
                  setAgentFilter("all");
                }}
                className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-full border border-purple-200"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            groupedCohorts.map((group) => {
              const isCollapsed = !!collapsedGroups[group.groupId];

              return (
                <div
                  key={group.groupId}
                  className="bg-white rounded-2xl border border-black/[0.08] shadow-xs overflow-hidden transition-all"
                >
                  {/* Group Header Card */}
                  <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-white to-purple-50/20 border-b border-black/[0.06] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Topic Category Tag */}
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                          {group.topicCategory}
                        </span>

                        {/* Dataset Cohort Badge */}
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1 truncate max-w-xs sm:max-w-md">
                          <FolderKanban className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{group.datasetBatchTitle}</span>
                        </span>

                        {group.humanNeededCount > 0 && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            <span>{group.humanNeededCount} Requires Human</span>
                          </span>
                        )}
                      </div>

                      {/* Topic Name */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                        <span>{group.topicName}</span>
                      </h3>

                      {/* Group Telemetry Metadata */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1.5 font-medium">
                          <User className="w-3.5 h-3.5 text-purple-600" />
                          <span>Assigned Agent: <strong className="text-slate-900">{group.agentName}</strong></span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{group.pendingCount} Pending in Queue</span>
                        </span>
                      </div>
                    </div>

                    {/* Group Action Buttons */}
                    <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                      <button
                        onClick={() => {
                          const firstPending = group.items.find((c) => c.status === "Pending");
                          if (firstPending) {
                            handlePromptDial(firstPending);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900 hover:bg-black text-white shadow-xs transition-all cursor-pointer"
                      >
                        <PhoneCall className="w-3 h-3 text-purple-400" />
                        <span>Dial Next Call</span>
                      </button>

                      <button
                        onClick={() => toggleGroupCollapse(group.groupId)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all cursor-pointer"
                        title={isCollapsed ? "Expand Group" : "Collapse Group"}
                      >
                        <span>{isCollapsed ? "Expand" : "Collapse"}</span>
                        {isCollapsed ? (
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                        ) : (
                          <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Group Items Cards */}
                  {!isCollapsed && (
                    <div className="divide-y divide-black/[0.04]">
                      {group.items.map((cb) => (
                        <div
                          key={cb.id}
                          id={`callback-${cb.id}`}
                          className={`p-4 sm:p-5 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                            cb.id === activeHighlightId
                              ? "bg-amber-50/90 ring-2 ring-amber-500 rounded-xl my-1.5 shadow-md"
                              : "hover:bg-slate-50/60"
                          }`}
                        >
                          {/* Left: Contact Info + Why Queued */}
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-bold text-sm text-slate-900">
                                {cb.contactName}
                              </span>
                              <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                                {cb.phone}
                              </span>
                              <span className="text-xs text-slate-500">
                                {cb.city} • {cb.course}
                              </span>

                              {/* Priority Pill */}
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  cb.priority === "Urgent"
                                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                                    : cb.priority === "High"
                                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                                    : "bg-slate-100 text-slate-700 border border-slate-200"
                                }`}
                              >
                                {cb.priority} Priority
                              </span>

                              {/* Status Pill */}
                              {cb.status === "Completed" ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Completed</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                                  <Clock className="w-3 h-3" />
                                  <span>Pending</span>
                                </span>
                              )}
                            </div>

                            {/* Why Queued Detail Banner */}
                            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                                <span>Why Queued:</span>
                                <span className="font-normal text-slate-600">
                                  {cb.whyQueued}
                                </span>
                              </div>

                              {/* When Scheduled */}
                              <div className="flex items-center gap-2.5 text-[11px] text-slate-600 flex-wrap pt-0.5">
                                <span className="flex items-center gap-1 font-semibold text-slate-800">
                                  <Calendar className="w-3 h-3 text-purple-600" />
                                  <span>When Scheduled: <strong>{cb.scheduledWindow}</strong></span>
                                </span>
                                <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold text-[10px]">
                                  {cb.countdownLabel}
                                </span>

                                {cb.rescheduleCount && cb.rescheduleCount > 0 ? (
                                  cb.lastRescheduledBy === "Agent" ? (
                                    <span
                                      className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full"
                                      title={cb.lastRescheduledReason}
                                    >
                                      <Bot className="w-2.5 h-2.5 text-blue-600" />
                                      <span>Agent Rescheduled ({cb.rescheduleCount}x)</span>
                                    </span>
                                  ) : (
                                    <span
                                      className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full"
                                      title={cb.lastRescheduledReason}
                                    >
                                      <UserCheck className="w-2.5 h-2.5 text-purple-600" />
                                      <span>Manually Rescheduled ({cb.rescheduleCount}x)</span>
                                    </span>
                                  )
                                ) : null}
                              </div>

                              {/* Reschedule Context Log if modified */}
                              {cb.rescheduleCount && cb.rescheduleCount > 0 && cb.lastRescheduledReason && (
                                <div className="text-[10.5px] text-slate-500 bg-slate-100/70 rounded-md px-2.5 py-1 mt-1 flex items-center gap-1.5 border border-slate-200/60">
                                  <RotateCcw className="w-3 h-3 text-slate-400 shrink-0" />
                                  <span className="truncate">
                                    <strong className="text-slate-700 font-semibold">
                                      {cb.lastRescheduledBy === "Agent" ? "🤖 AI Agent Reschedule Note:" : "👤 Operator Slot Note:"}
                                    </strong>{" "}
                                    {cb.lastRescheduledReason}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Human Interaction Required Callout */}
                            {cb.humanInteractionNeeded ? (
                              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
                                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-bold block text-amber-950">
                                    Human Interaction Needed:
                                  </strong>
                                  <p className="text-[11.5px] text-amber-850 mt-0.5 leading-relaxed">
                                    {cb.humanInteractionReason}
                                  </p>
                                  {cb.humanAssignee && (
                                    <span className="text-[10.5px] font-semibold text-amber-800 mt-1 block">
                                      Assignee: <strong>{cb.humanAssignee}</strong>
                                    </span>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/60 px-3 py-1.5 rounded-lg border border-emerald-200/70 w-fit">
                                <Bot className="w-3.5 h-3.5 text-emerald-600" />
                                <span>
                                  <strong>AI Autonomous Callback:</strong> {cb.agentName} will dial automatically and guide turn-by-turn.
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Right: Actions */}
                          <div className="flex items-center gap-2 self-start lg:self-center shrink-0 flex-wrap">
                            {cb.status === "Pending" && (
                              <button
                                type="button"
                                onClick={() => handlePromptDial(cb)}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-slate-900 hover:bg-black text-white shadow-xs transition-all cursor-pointer"
                              >
                                <PhoneCall className="w-3 h-3 text-emerald-400" />
                                <span>Place Call Now</span>
                              </button>
                            )}

                            {/* Manual Reschedule Button for every queued call */}
                            {cb.status === "Pending" && (
                              <button
                                type="button"
                                onClick={() => handleOpenManualSchedule(cb)}
                                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-all cursor-pointer shadow-2xs"
                                title="Manually reschedule this callback slot or inspect agent reschedule history"
                              >
                                <CalendarClock className="w-3.5 h-3.5 text-purple-600" />
                                <span>Manual Schedule</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleOpenSourceCall(cb.sourceCallId)}
                              className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 transition-all cursor-pointer"
                              title="Inspect source conversation transcript"
                            >
                              <FileText className="w-3 h-3 text-slate-500" />
                              <span>Source Call</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleOpenReassignModal(cb)}
                              className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 transition-all cursor-pointer"
                              title="Reassign agent, toggle human intervention, or change schedule"
                            >
                              <UserCheck className="w-3 h-3 text-purple-600" />
                              <span>Reassign</span>
                            </button>

                            {cb.status === "Pending" && (
                              <button
                                type="button"
                                onClick={() => handleMarkResolved(cb.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-2 rounded-full text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer"
                                title="Mark this follow-up as resolved"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: ALL QUEUE ITEMS (FLAT TABLE VIEW)                                */}
      {/* ========================================================================= */}
      {viewMode === "table" && (
        <div className="bg-white rounded-2xl border border-black/[0.08] shadow-xs overflow-hidden">
          <div className="px-5 py-4 bg-slate-50 border-b border-black/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xs text-slate-900">
                Chronological Callback Queue
              </h3>
              <span className="text-[11px] font-medium text-slate-500">
                ({filteredCallbacks.length} requests in queue)
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Carrier dialing requires operator initiation or autonomous time-trigger
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F3] border-b border-black/[0.06] text-black/55 font-bold text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Contact &amp; Details</th>
                  <th className="py-3.5 px-4">Which Agent</th>
                  <th className="py-3.5 px-4">Which Topic &amp; Cohort</th>
                  <th className="py-3.5 px-4">When Scheduled</th>
                  <th className="py-3.5 px-4 max-w-xs">Why Queued</th>
                  <th className="py-3.5 px-4">Human Interaction</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {filteredCallbacks.map((cb) => (
                  <tr
                    key={cb.id}
                    id={`callback-row-${cb.id}`}
                    className={`transition-colors group ${
                      cb.id === activeHighlightId
                        ? "bg-amber-50/90 ring-2 ring-amber-500 font-semibold"
                        : "hover:bg-slate-50/70"
                    }`}
                  >
                    {/* Contact & Phone */}
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      <div className="font-bold">{cb.contactName}</div>
                      <div className="text-[11px] font-mono text-slate-500 font-normal">{cb.phone}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{cb.city}</div>
                    </td>

                    {/* Which Agent */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${cb.agentBadgeColor}`}>
                          {cb.agentAvatar}
                        </span>
                        <div>
                          <strong className="text-slate-900 block font-bold leading-tight">{cb.agentName}</strong>
                          <span className="text-[10px] text-slate-500">{cb.agentRole}</span>
                        </div>
                      </div>
                    </td>

                    {/* Which Topic & Dataset */}
                    <td className="py-4 px-4 max-w-xs">
                      <span className="font-bold text-slate-900 block line-clamp-1">{cb.topicName}</span>
                      <span className="text-[10.5px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60 inline-block mt-0.5 line-clamp-1">
                        {cb.datasetBatchTitle}
                      </span>
                    </td>

                    {/* When Scheduled */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{cb.scheduledWindow}</div>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full inline-block">
                          {cb.countdownLabel}
                        </span>
                        {cb.rescheduleCount && cb.rescheduleCount > 0 ? (
                          <span
                            className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full border ${
                              cb.lastRescheduledBy === "Agent"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-purple-50 text-purple-700 border-purple-200"
                            }`}
                            title={cb.lastRescheduledReason}
                          >
                            {cb.lastRescheduledBy === "Agent" ? "🤖 Agent Rescheduled" : "👤 Manual Slot"}
                          </span>
                        ) : null}
                      </div>
                    </td>

                    {/* Why Queued */}
                    <td className="py-4 px-4 max-w-xs text-slate-600">
                      <p className="line-clamp-2 text-[11.5px] leading-relaxed">{cb.whyQueued}</p>
                      <button
                        type="button"
                        onClick={() => handleOpenSourceCall(cb.sourceCallId)}
                        className="text-[10.5px] font-bold text-purple-700 hover:underline mt-1 inline-flex items-center gap-1"
                      >
                        <span>Inspect Source Turn ({cb.sourceCallId})</span>
                        <ExternalLink className="w-3 h-3 text-purple-500" />
                      </button>
                    </td>

                    {/* Any Human Interaction Needed */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {cb.humanInteractionNeeded ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            <span>Requires Human</span>
                          </span>
                          <span className="text-[10px] text-amber-800 block max-w-[160px] truncate" title={cb.humanInteractionReason}>
                            {cb.humanInteractionReason}
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          <Bot className="w-3 h-3 text-emerald-600" />
                          <span>AI Autonomous</span>
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {cb.status === "Completed" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Completed</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending</span>
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap space-x-1.5">
                      {cb.status === "Pending" && (
                        <button
                          type="button"
                          onClick={() => handlePromptDial(cb)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-900 hover:bg-black text-white shadow-xs transition-colors cursor-pointer"
                        >
                          <PhoneCall className="w-3 h-3 text-emerald-400" />
                          <span>Dial</span>
                        </button>
                      )}

                      {/* Manual Reschedule button */}
                      {cb.status === "Pending" && (
                        <button
                          type="button"
                          onClick={() => handleOpenManualSchedule(cb)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors cursor-pointer"
                          title="Manually reschedule slot or inspect agent reschedule history"
                        >
                          <CalendarClock className="w-3 h-3 text-purple-600" />
                          <span>Reschedule</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleOpenReassignModal(cb)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: CONFIRM LIVE CALL INITIATION                                     */}
      {/* ========================================================================= */}
      {dialConfirmModalOpen && targetCallback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4 text-xs text-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <PhoneCall className="w-6 h-6 text-purple-700" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Confirm Carrier Call Dispatch
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Initiating automated carrier line outreach for scheduled callback.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Candidate:</span>
                <strong className="text-slate-900 font-bold">{targetCallback.contactName} ({targetCallback.phone})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Which Agent:</span>
                <strong className="text-slate-900 font-bold">{targetCallback.agentName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Which Topic:</span>
                <strong className="text-slate-900 font-bold">{targetCallback.topicName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cohort Group:</span>
                <span className="text-slate-700 font-medium text-right max-w-[200px] truncate">{targetCallback.datasetBatchTitle}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Why Queued:</span>
                <span className="text-slate-700 font-medium text-right max-w-[220px] line-clamp-2">{targetCallback.whyQueued}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Human Action:</span>
                {targetCallback.humanInteractionNeeded ? (
                  <span className="text-amber-800 font-bold">⚠️ Requires Human Handoff</span>
                ) : (
                  <span className="text-emerald-700 font-bold">🤖 AI Autonomous Execution</span>
                )}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Standard SIP telephony trunk channels will be utilized. The agent will greet the candidate with verbatim context of their previous inquiry.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDialConfirmModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLiveDial}
                className="px-5 py-2 text-xs font-bold bg-slate-900 hover:bg-black text-white rounded-full shadow-sm transition-colors cursor-pointer"
              >
                Confirm &amp; Place Call Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REASSIGN AGENT / TOGGLE HUMAN INTERACTION                        */}
      {/* ========================================================================= */}
      {reassignModalOpen && reassignItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4 text-xs text-slate-800">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Manage Callback &amp; Agent Handoff
                </h3>
                <p className="text-xs text-slate-500">
                  Candidate: {reassignItem.contactName} ({reassignItem.phone})
                </p>
              </div>
              <button onClick={() => setReassignModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {/* Agent Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Which Agent / Desk Handles Callback?
                </label>
                <select
                  value={newAgentName}
                  onChange={(e) => setNewAgentName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                >
                  <option value="Maya (Admissions AI)">Maya (Admissions AI) — Student Counseling</option>
                  <option value="Priya (Student Finance AI)">Priya (Student Finance AI) — Fee &amp; Scholarships</option>
                  <option value="Arjun (Outreach & Ops AI)">Arjun (Outreach &amp; Ops AI) — Verification &amp; Entrance</option>
                  <option value="Senior Counselor Desk (Human Handoff)">Senior Counselor Desk (Human Handoff)</option>
                  <option value="Finance Officer Desk (Human Handoff)">Finance Officer Desk (Human Handoff)</option>
                  <option value="Residential Warden Desk (Human Handoff)">Residential Warden Desk (Human Handoff)</option>
                </select>
              </div>

              {/* Scheduled Window */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Scheduled Time Window
                </label>
                <input
                  type="text"
                  value={newScheduledWindow}
                  onChange={(e) => setNewScheduledWindow(e.target.value)}
                  placeholder="e.g. Today, 06:30 PM"
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                />
              </div>

              {/* Human Interaction Needed Toggle */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <div>
                      <strong className="text-xs font-bold text-amber-950 block">Requires Human Interaction?</strong>
                      <span className="text-[11px] text-amber-800">Flag for manual counselor exception or Dean sign-off</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={newHumanNeeded}
                    onChange={(e) => setNewHumanNeeded(e.target.checked)}
                    className="w-4 h-4 accent-amber-600 rounded cursor-pointer"
                  />
                </div>

                {newHumanNeeded && (
                  <div className="pt-2 border-t border-amber-200/80">
                    <label className="block text-[11px] font-bold text-amber-950 mb-1">
                      Reason for Human Intervention:
                    </label>
                    <textarea
                      rows={2}
                      value={newHumanReason}
                      onChange={(e) => setNewHumanReason(e.target.value)}
                      placeholder="Specify what document review, waiver signature, or appeal requires human staff..."
                      className="w-full text-xs bg-white border border-amber-300 rounded-xl p-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setReassignModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveReassign}
                className="px-5 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-sm transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: SCHEDULE NEW CALLBACK REQUEST                                    */}
      {/* ========================================================================= */}
      {newCallbackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4 text-xs text-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Schedule New Callback Request
                </h3>
                <p className="text-xs text-slate-500">
                  Add candidate follow-up to the call center queue.
                </p>
              </div>
              <button onClick={() => setNewCallbackModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewCallback} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Candidate Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvi Deshmukh"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (E.164) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20 font-mono"
                  />
                </div>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Which Topic / Subject?
                </label>
                <select
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                >
                  <option value="B.Tech CSE Admissions & 35% Chancellor Waiver">B.Tech CSE Admissions &amp; 35% Chancellor Waiver</option>
                  <option value="Tuition Fee 3-Part Installment & WhatsApp Matrix">Tuition Fee 3-Part Installment &amp; WhatsApp Matrix</option>
                  <option value="AC Twin Hostel Allotment & Dining Package">AC Twin Hostel Allotment &amp; Dining Package</option>
                  <option value="DigiLocker Marksheet Verification Sync Issue">DigiLocker Marksheet Verification Sync Issue</option>
                  <option value="Sports Quota 25% Fee Concession Appeal">Sports Quota 25% Fee Concession Appeal</option>
                  <option value="Campus Lab Tour Booking Confirmation">Campus Lab Tour Booking Confirmation</option>
                </select>
              </div>

              {/* Cohort Dataset */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Same Group / Dataset Cohort
                </label>
                <select
                  value={newDatasetTitle}
                  onChange={(e) => setNewDatasetTitle(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                >
                  <option value="All-India JoSAA & State CET Qualified Applicants 2026 (Batch OUT-01)">All-India JoSAA &amp; State CET Qualified Applicants 2026 (Batch OUT-01)</option>
                  <option value="Pending Tuition Fee Installments (Batch CSV-MBA)">Pending Tuition Fee Installments (Batch CSV-MBA)</option>
                  <option value="Hostel Accommodation Allotment Queue (Batch HOSTEL-01)">Hostel Accommodation Allotment Queue (Batch HOSTEL-01)</option>
                  <option value="National Entrance Test CET Rankers Verification (Batch OUT-02)">National Entrance Test CET Rankers Verification (Batch OUT-02)</option>
                  <option value="Web Portal & Social Inbound Inquiries">Web Portal &amp; Social Inbound Inquiries</option>
                </select>
              </div>

              {/* Agent & Scheduled Window */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Which Agent?
                  </label>
                  <select
                    value={newAgentSelection}
                    onChange={(e) => setNewAgentSelection(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  >
                    <option value="Maya (Admissions AI)">Maya (Admissions AI)</option>
                    <option value="Priya (Student Finance AI)">Priya (Student Finance AI)</option>
                    <option value="Arjun (Outreach & Ops AI)">Arjun (Outreach &amp; Ops AI)</option>
                    <option value="Senior Counselor Desk (Human Handoff)">Senior Counselor Desk</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    When Scheduled?
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Today, 06:00 PM"
                    value={newScheduledTime}
                    onChange={(e) => setNewScheduledTime(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>
              </div>

              {/* Why Queued */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Why Queued? (Reason for follow-up) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. Candidate requested evening slot to discuss scholarships with parents."
                  value={newWhyQueued}
                  onChange={(e) => setNewWhyQueued(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                />
              </div>

              {/* Human Intervention Checkbox */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block">Requires Human Interaction?</strong>
                    <span className="text-[11px] text-slate-500">Uncheck for autonomous AI callback execution</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={newHumanToggle}
                    onChange={(e) => setNewHumanToggle(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                  />
                </div>

                {newHumanToggle && (
                  <div className="pt-2 border-t border-slate-200">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Human Intervention Details:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dean manual signature required for special waiver"
                      value={newHumanNotes}
                      onChange={(e) => setNewHumanNotes(e.target.value)}
                      className="w-full text-xs bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-600"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setNewCallbackModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-sm shadow-purple-600/20 transition-colors cursor-pointer"
                >
                  Add to Callback Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: MANUAL RESCHEDULE & SLOT PLANNER                                */}
      {/* ========================================================================= */}
      {rescheduleModalOpen && rescheduleTargetItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 space-y-4 text-xs text-slate-800 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Manual Reschedule &amp; Slot Planner
                  </h3>
                  <p className="text-xs text-slate-500">
                    Candidate: <strong className="text-slate-800">{rescheduleTargetItem.contactName}</strong> ({rescheduleTargetItem.phone})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRescheduleModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Audit Banner: Already Rescheduled by Agent vs User vs Initial */}
            {rescheduleTargetItem.rescheduleCount && rescheduleTargetItem.rescheduleCount > 0 ? (
              rescheduleTargetItem.lastRescheduledBy === "Agent" ? (
                <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-900 space-y-1">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-600 shrink-0" />
                    <strong className="text-xs font-bold text-blue-950">
                      Already Rescheduled by AI Agent ({rescheduleTargetItem.rescheduleCount}x)
                    </strong>
                  </div>
                  <p className="text-[11.5px] text-blue-800 leading-relaxed pl-6">
                    Agent <strong>{rescheduleTargetItem.agentName}</strong> previously adjusted this slot ({rescheduleTargetItem.rescheduledAt || "prior turn"}).
                  </p>
                  {rescheduleTargetItem.lastRescheduledReason && (
                    <p className="text-[11px] text-blue-700 italic pl-6">
                      Reason: "{rescheduleTargetItem.lastRescheduledReason}"
                    </p>
                  )}
                  <div className="text-[10.5px] font-semibold text-blue-900 pt-1 pl-6">
                    Current Scheduled Slot: <strong className="underline">{rescheduleTargetItem.scheduledWindow}</strong> ({rescheduleTargetItem.countdownLabel})
                  </div>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 text-purple-900 space-y-1">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-purple-600 shrink-0" />
                    <strong className="text-xs font-bold text-purple-950">
                      Previously Rescheduled Manually by Operator ({rescheduleTargetItem.rescheduleCount}x)
                    </strong>
                  </div>
                  <p className="text-[11.5px] text-purple-800 leading-relaxed pl-6">
                    Note: "{rescheduleTargetItem.lastRescheduledReason || "Manual slot change"}"
                  </p>
                  <div className="text-[10.5px] font-semibold text-purple-900 pt-1 pl-6">
                    Current Slot: <strong className="underline">{rescheduleTargetItem.scheduledWindow}</strong> ({rescheduleTargetItem.countdownLabel})
                  </div>
                </div>
              )
            ) : (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span>Currently on initial slot: <strong>{rescheduleTargetItem.scheduledWindow}</strong></span>
                </div>
                <span className="font-bold text-[10.5px] px-2 py-0.5 rounded bg-slate-200/70 text-slate-800">
                  {rescheduleTargetItem.countdownLabel}
                </span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSaveManualSchedule} className="space-y-4">
              {/* Quick Slot Presets */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>Select New Callback Slot:</span>
                  <span className="text-[10.5px] text-slate-400 font-normal">Click preset or customize</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "in-30-mins", label: "⚡ In 30 Mins", sub: "Today 07:00 PM" },
                    { id: "in-2-hours", label: "⏰ In 2 Hours", sub: "Today 08:30 PM" },
                    { id: "tonight-9pm", label: "🌙 Tonight 9 PM", sub: "Post-Dinner Slot" },
                    { id: "tomorrow-10am", label: "☀️ Tomorrow 10 AM", sub: "Morning Shift" },
                    { id: "tomorrow-3pm", label: "⛅ Tomorrow 3 PM", sub: "Afternoon Shift" },
                    { id: "saturday-11am", label: "🗓️ Saturday 11 AM", sub: "Weekend Slot" },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        try { soundSynth.play("click"); } catch {}
                        setRescheduleSlotType(preset.id);
                      }}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        rescheduleSlotType === preset.id
                          ? "bg-purple-600 text-white border-purple-700 shadow-xs"
                          : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                      }`}
                    >
                      <div className={`text-xs font-bold ${rescheduleSlotType === preset.id ? "text-white" : "text-slate-900"}`}>
                        {preset.label}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${rescheduleSlotType === preset.id ? "text-purple-100" : "text-slate-500"}`}>
                        {preset.sub}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    try { soundSynth.play("click"); } catch {}
                    setRescheduleSlotType("custom");
                  }}
                  className={`w-full mt-2 p-2.5 rounded-xl text-left border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    rescheduleSlotType === "custom"
                      ? "bg-purple-50 text-purple-900 border-purple-300 ring-1 ring-purple-400"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>⚙️ Specify Custom Date &amp; Window</span>
                  <span className="text-[10px] font-bold text-purple-700">Enter custom timing</span>
                </button>
              </div>

              {/* Custom Window Input if Custom is Selected */}
              {rescheduleSlotType === "custom" && (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5 animate-in fade-in">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Custom Scheduled Window String *
                  </label>
                  <input
                    type="text"
                    required
                    value={rescheduleCustomTime}
                    onChange={(e) => setRescheduleCustomTime(e.target.value)}
                    placeholder="e.g. Next Monday, 11:30 AM (Post-Exams)"
                    className="w-full text-xs bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  />
                </div>
              )}

              {/* Reason for Manual Reschedule */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Why is this being rescheduled? (Logged to Call Dossier) *
                </label>
                <input
                  type="text"
                  required
                  value={rescheduleReasonText}
                  onChange={(e) => setRescheduleReasonText(e.target.value)}
                  placeholder="e.g. Candidate exam finished early; requested callback tonight."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                />
                {/* Quick Reason Chips */}
                <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                  {[
                    "Candidate in coaching class",
                    "Parent requested evening slot",
                    "Candidate exam finished early",
                    "Escalated priority callback",
                    "Line busy retry round #2",
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setRescheduleReasonText(chip)}
                      className="text-[10px] bg-slate-100 hover:bg-purple-50 hover:text-purple-700 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 transition-colors cursor-pointer"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Execution Mode & Priority */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Execution Mode at New Slot:
                  </label>
                  <select
                    value={rescheduleDelegateToAgent ? "agent" : "human"}
                    onChange={(e) => setRescheduleDelegateToAgent(e.target.value === "agent")}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  >
                    <option value="agent">🤖 Autonomous AI Dial ({rescheduleTargetItem.agentName})</option>
                    <option value="human">👤 Human Counselor Live Dial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Call Priority:
                  </label>
                  <select
                    value={reschedulePriority}
                    onChange={(e) => setReschedulePriority(e.target.value as "Urgent" | "High" | "Normal")}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
                  >
                    <option value="Urgent">🔥 Urgent Priority</option>
                    <option value="High">⚡ High Priority</option>
                    <option value="Normal">Standard Priority</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setRescheduleModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white rounded-full transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-sm shadow-purple-600/20 transition-all cursor-pointer"
                >
                  <CalendarClock className="w-3.5 h-3.5" />
                  <span>Confirm &amp; Lock Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Slide-over Call Transcript Drawer */}
      <CallDrawer
        call={selectedCallRecord}
        isOpen={callDrawerOpen}
        onClose={() => setCallDrawerOpen(false)}
      />
    </div>
  );
}

export default function CallbacksPage() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-[#707684] text-xs font-sans">
          Loading Callbacks &amp; Priority Queue...
        </div>
      }
    >
      <CallbacksContent />
    </Suspense>
  );
}
