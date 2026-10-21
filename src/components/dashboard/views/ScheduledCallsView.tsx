"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Calendar,
  Clock,
  Users,
  Bot,
  Play,
  RotateCcw,
  Ban,
  Search,
  Filter,
  Plus,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Edit3,
  MoreVertical,
  ExternalLink,
  ChevronRight,
  Radio,
  FileSpreadsheet,
} from "lucide-react";
import { soundSynth } from "@/lib/audio-synth";
import { ScheduledCampaign, ScheduleStatus } from "@/types/schedule";
import { schedulesApi } from "@/lib/api/schedulesApi";
import ScheduleDetailsDrawer from "@/components/dashboard/modals/ScheduleDetailsDrawer";
import EditScheduleModal from "@/components/dashboard/modals/EditScheduleModal";
import ScheduleCallModal from "@/components/dashboard/modals/ScheduleCallModal";

export default function ScheduledCallsView() {
  const [schedules, setSchedules] = useState<ScheduledCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Drawers state
  const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<ScheduledCampaign | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<ScheduledCampaign | null>(null);

  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [duplicateCampaignData, setDuplicateCampaignData] = useState<Partial<ScheduledCampaign> | null>(null);

  const [cancelModalCampaign, setCancelModalCampaign] = useState<ScheduledCampaign | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);

  // Fetch schedules
  const fetchSchedules = useCallback(async () => {
    try {
      const data = await schedulesApi.getSchedules();
      setSchedules(data);
    } catch (err) {
      console.error("Failed to load schedules:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
    // Auto-poll every 6 seconds to reflect live worker progress and executions
    const interval = setInterval(fetchSchedules, 6000);
    return () => clearInterval(interval);
  }, [fetchSchedules]);

  // Filtered schedules
  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => {
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "upcoming" && s.status === "scheduled") ||
        (statusFilter === "running" && s.status === "running") ||
        (statusFilter === "completed" && (s.status === "completed" || s.status === "partially-completed")) ||
        (statusFilter === "cancelled" && s.status === "cancelled") ||
        (statusFilter === "failed" && s.status === "failed");

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        s.name.toLowerCase().includes(q) ||
        s.config.agentName.toLowerCase().includes(q) ||
        s.contacts.some((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [schedules, statusFilter, searchQuery]);

  const handleOpenDetails = (campaign: ScheduledCampaign) => {
    try { soundSynth.play("click"); } catch {}
    setSelectedCampaign(campaign);
    setDetailsDrawerOpen(true);
  };

  const handleEditClick = (campaign: ScheduledCampaign) => {
    try { soundSynth.play("click"); } catch {}
    setEditingCampaign(campaign);
    setEditModalOpen(true);
  };

  const handleDuplicateClick = (campaign: ScheduledCampaign) => {
    try { soundSynth.play("click"); } catch {}
    setDuplicateCampaignData({
      name: `${campaign.name} (Copy)`,
      config: campaign.config,
      callingWindow: campaign.callingWindow,
      timezone: campaign.timezone,
    });
    setScheduleModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!cancelModalCampaign) return;
    setIsCancelling(true);
    try {
      soundSynth.play("click");
      await schedulesApi.cancelSchedule(cancelModalCampaign.id, cancelReason);
      setCancelModalCampaign(null);
      setCancelReason("");
      fetchSchedules();
    } catch (err) {
      console.error("Cancellation error:", err);
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusBadge = (status: ScheduleStatus) => {
    switch (status) {
      case "scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FAF3E4] text-[#733F00] border border-[#FFD9A0]">
            <Clock className="w-3 h-3" />
            Scheduled
          </span>
        );
      case "running":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
            Dialing Active
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle2 className="w-3 h-3 text-green-600" />
            Completed
          </span>
        );
      case "partially-completed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            Partially Connected
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
            <Ban className="w-3 h-3 text-gray-500" />
            Cancelled
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
            <AlertCircle className="w-3 h-3 text-red-600" />
            Failed
          </span>
        );
    }
  };

  const upcomingCount = schedules.filter((s) => s.status === "scheduled").length;
  const runningCount = schedules.filter((s) => s.status === "running").length;
  const completedCount = schedules.filter((s) => s.status === "completed" || s.status === "partially-completed").length;

  return (
    <div className="space-y-4 font-sans text-[#1A1A1A]">
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search scheduled campaigns, agents, or phone numbers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-[#FBF7ED] border border-black/[0.06] text-xs font-medium text-[#1A1A1A] placeholder:text-black/40 focus:outline-none focus:border-black/30 transition-all"
          />
        </div>

        {/* Schedule New Call CTA */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              try { soundSynth.play("click"); } catch {}
              setDuplicateCampaignData(null);
              setScheduleModalOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Outbound Call</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between border-b border-black/[0.06] pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
          {[
            { id: "all", label: "All Schedules", count: schedules.length },
            { id: "upcoming", label: "Upcoming / Queued", count: upcomingCount },
            { id: "running", label: "Dialing Active", count: runningCount },
            { id: "completed", label: "Completed", count: completedCount },
            { id: "cancelled", label: "Cancelled", count: schedules.filter((s) => s.status === "cancelled").length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                try { soundSynth.play("click"); } catch {}
                setStatusFilter(tab.id);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                statusFilter === tab.id
                  ? "bg-[#111111] text-white shadow-xs font-bold"
                  : "bg-[#FBF7ED] text-black/60 hover:text-black border border-black/[0.06]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  statusFilter === tab.id ? "bg-white/20 text-white" : "bg-black/5 text-black/50"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <span className="text-xs text-black/45 font-medium">
          Showing {filteredSchedules.length} of {schedules.length} schedules
        </span>
      </div>

      {/* Schedules Table */}
      <div className="bg-white rounded-[24px] border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-black/45">
            <div className="w-5 h-5 rounded-full border-2 border-black/20 border-t-black animate-spin mx-auto mb-2" />
            <span>Loading scheduled campaigns...</span>
          </div>
        ) : filteredSchedules.length === 0 ? (
          <div className="p-12 text-center text-xs text-black/50 space-y-2">
            <Calendar className="w-8 h-8 text-black/30 mx-auto" />
            <p className="font-semibold text-[#1A1A1A] text-sm">No scheduled campaigns found</p>
            <p className="text-black/55 max-w-sm mx-auto">
              {searchQuery
                ? `No schedules matching "${searchQuery}". Clear your search query to view all.`
                : "Create your first scheduled AI voice campaign to automatically execute calls at a future date and time."}
            </p>
            <button
              onClick={() => {
                setDuplicateCampaignData(null);
                setScheduleModalOpen(true);
              }}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111111] text-white font-semibold text-xs hover:bg-black transition-all cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Schedule Now</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FBF7ED] border-b border-black/[0.06] text-[11px] font-bold text-black/55 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Campaign &amp; Agent</th>
                  <th className="px-4 py-3.5">Scheduled Execution</th>
                  <th className="px-4 py-3.5">Recipients</th>
                  <th className="px-4 py-3.5">Progress</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                {filteredSchedules.map((schedule) => {
                  const failedOrNoAnswer =
                    schedule.stats.failedCount + schedule.stats.noAnswerCount;

                  return (
                    <tr
                      key={schedule.id}
                      className="hover:bg-[#FBF7ED]/40 transition-colors group cursor-default"
                    >
                      {/* Campaign & Agent */}
                      <td className="px-5 py-4">
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(schedule)}
                            className="font-bold text-xs text-[#1A1A1A] hover:text-[#733F00] transition-colors text-left line-clamp-1 cursor-pointer"
                          >
                            {schedule.name}
                          </button>
                          <div className="flex items-center gap-1.5 text-[11px] text-black/55">
                            <Bot className="w-3 h-3 text-[#733F00]" />
                            <span>{schedule.config.agentName.split("—")[0]}</span>
                            <span>•</span>
                            <span className="text-black/45">{schedule.config.language}</span>
                          </div>
                        </div>
                      </td>

                      {/* Scheduled Time & Timezone */}
                      <td className="px-4 py-4">
                        <div className="space-y-0.5">
                          <div className="font-semibold text-xs text-[#1A1A1A] flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-black/40" />
                            <span>{schedule.localScheduledTime}</span>
                          </div>
                          <span className="text-[10px] text-black/45 block">
                            {schedule.timezone}
                          </span>
                        </div>
                      </td>

                      {/* Contacts & Concurrency */}
                      <td className="px-4 py-4">
                        <div className="space-y-0.5">
                          <div className="font-semibold text-xs text-[#1A1A1A] flex items-center gap-1.5">
                            <Users className="w-3 h-3 text-black/40" />
                            <span>{schedule.stats.totalContacts} contacts</span>
                          </div>
                          <span className="text-[10px] text-black/45">
                            {schedule.callingWindow.concurrencyLimit} trunks • {schedule.callingWindow.pacingDelaySec}s pacing
                          </span>
                        </div>
                      </td>

                      {/* Progress Bar & Connected Count */}
                      <td className="px-4 py-4">
                        <div className="w-32 space-y-1">
                          <div className="flex items-center justify-between text-[10px] font-semibold">
                            <span className="text-green-700">
                              {schedule.stats.completedCount} connected
                            </span>
                            <span className="text-black/45">{schedule.stats.progressPercent}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-black/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#111111] transition-all duration-500 rounded-full"
                              style={{ width: `${schedule.stats.progressPercent}%` }}
                            />
                          </div>
                          {failedOrNoAnswer > 0 && (
                            <span className="text-[10px] text-amber-700 font-medium block">
                              {failedOrNoAnswer} unreachable
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        {getStatusBadge(schedule.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenDetails(schedule)}
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FBF7ED] text-[#1A1A1A] border border-black/[0.06] hover:bg-[#FAF3E4] transition-all cursor-pointer"
                          >
                            Details
                          </button>

                          {schedule.status === "scheduled" && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleEditClick(schedule)}
                                className="p-1.5 rounded-full text-black/50 hover:text-[#1A1A1A] hover:bg-[#FAF3E4] transition-colors cursor-pointer"
                                title="Reschedule"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                type="button"
                                onClick={() => setCancelModalCampaign(schedule)}
                                className="p-1.5 rounded-full text-black/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                title="Cancel Schedule"
                              >
                                <Ban className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDuplicateClick(schedule)}
                            className="p-1.5 rounded-full text-black/40 hover:text-black hover:bg-[#FAF3E4] transition-colors cursor-pointer"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Drawer */}
      <ScheduleDetailsDrawer
        isOpen={detailsDrawerOpen}
        onClose={() => setDetailsDrawerOpen(false)}
        campaign={selectedCampaign}
        onRefresh={fetchSchedules}
        onDuplicate={(c) => {
          setDetailsDrawerOpen(false);
          handleDuplicateClick(c);
        }}
        onEdit={(c) => {
          setDetailsDrawerOpen(false);
          handleEditClick(c);
        }}
      />

      {/* Edit / Reschedule Modal */}
      <EditScheduleModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        campaign={editingCampaign}
        onUpdated={fetchSchedules}
      />

      {/* Schedule Creation Modal */}
      <ScheduleCallModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        onScheduleCreated={fetchSchedules}
        duplicateFrom={duplicateCampaignData || undefined}
      />

      {/* Cancellation Confirmation Dialog */}
      {cancelModalCampaign && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/35 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full border border-black/10 shadow-xl space-y-3">
            <h4 className="font-bold text-sm text-[#1A1A1A]">Cancel Pending Schedule?</h4>
            <p className="text-xs text-black/60 leading-relaxed">
              Are you sure you want to cancel &ldquo;{cancelModalCampaign.name}&rdquo;? It will not dispatch any outbound calls.
            </p>
            <input
              type="text"
              placeholder="Reason for cancellation (optional)"
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FBF7ED] border border-black/[0.08] text-xs focus:outline-none"
            />
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCancelModalCampaign(null)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-black/60 hover:bg-gray-100 cursor-pointer"
              >
                Keep Schedule
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isCancelling}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-red-600 text-white hover:bg-red-700 cursor-pointer shadow-xs"
              >
                {isCancelling ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
