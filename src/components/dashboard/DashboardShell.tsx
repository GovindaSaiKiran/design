"use client";

import React, { useState } from "react";
import DashboardHeader, { DashboardTheme } from "./DashboardHeader";
import { TabKey } from "./DashboardSidebar";
import OverviewView from "./views/OverviewView";
import AIAgentsView from "./views/AIAgentsView";
import CallsView from "./views/CallsView";
import CampaignsView from "./views/CampaignsView";
import ContactsView from "./views/ContactsView";
import KnowledgeView from "./views/KnowledgeView";
import AnalyticsView from "./views/AnalyticsView";
import TelephonyView from "./views/TelephonyView";
import SettingsView from "./views/SettingsView";
import TimelineScrubberDock from "./components/TimelineScrubberDock";

// Modals
import CreateAgentModal from "./modals/CreateAgentModal";
import LiveCallModal from "./modals/LiveCallModal";
import StartCampaignModal from "./modals/StartCampaignModal";
import UploadContactsModal from "./modals/UploadContactsModal";
import UploadKnowledgeModal from "./modals/UploadKnowledgeModal";
import ExportReportModal from "./modals/ExportReportModal";
import ContactDossierModal from "./modals/ContactDossierModal";

// Mock dataset
import {
  mockOrganizations,
  mockKPIs,
  mockAgents,
  mockLiveCalls,
  mockRecentCalls,
  mockCampaigns,
  mockKnowledgeBase,
  mockTelephonyNumbers,
  mockNotifications,
} from "@/data/mock/dashboardData";
import {
  LiveCallItem,
  RecentCallRecord,
  DashboardAgent,
  OrganizationInfo,
  NotificationItem,
} from "@/types/dashboard";

export default function DashboardShell() {
  // State
  const [theme, setTheme] = useState<DashboardTheme>("indigo");
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [currentOrg, setCurrentOrg] = useState<OrganizationInfo>(mockOrganizations[0]);
  const [organizations] = useState<OrganizationInfo[]>(mockOrganizations);
  const [agents, setAgents] = useState<DashboardAgent[]>(mockAgents);
  const [liveCalls, setLiveCalls] = useState<LiveCallItem[]>(mockLiveCalls);
  const [recentCalls, setRecentCalls] = useState<RecentCallRecord[]>(mockRecentCalls);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [knowledgeDocs, setKnowledgeDocs] = useState(mockKnowledgeBase);
  const [telephonyNumbers] = useState(mockTelephonyNumbers);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // Modals state
  const [createAgentOpen, setCreateAgentOpen] = useState(false);
  const [liveCallModalOpen, setLiveCallModalOpen] = useState(false);
  const [selectedLiveCall, setSelectedLiveCall] = useState<LiveCallItem | null>(null);
  const [startCampaignOpen, setStartCampaignOpen] = useState(false);
  const [uploadContactsOpen, setUploadContactsOpen] = useState(false);
  const [uploadKnowledgeOpen, setUploadKnowledgeOpen] = useState(false);
  const [exportReportOpen, setExportReportOpen] = useState(false);
  const [contactDossierOpen, setContactDossierOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  // Handlers
  const handleViewLiveCall = (call: LiveCallItem) => {
    setSelectedLiveCall(call);
    setLiveCallModalOpen(true);
  };

  const handleSelectRecentCall = (call: RecentCallRecord) => {
    const converted: LiveCallItem = {
      id: call.id,
      callerNumber: call.contactNumber,
      callerName: call.contactName,
      agentId: "agent-alpha",
      agentName: call.agentName,
      direction: call.direction,
      durationSeconds: call.durationSeconds,
      durationFormatted: call.duration,
      currentSentiment: call.sentimentScore > 85 ? "positive" : "neutral",
      intent: call.summary,
      latestSnippet: call.transcriptSnippet,
      audioWaveLevels: [40, 60, 80, 50, 90, 70, 40],
      startedAt: call.timeAgo,
      latencyMs: 142,
      transcript: [
        {
          speaker: "system",
          text: `Call logged at ${call.timestamp}. Qualification: ${call.qualification}.`,
          time: "00:00",
        },
        {
          speaker: "agent",
          text: `Hello, thank you for connecting with ${currentOrg.name}.`,
          time: "00:02",
        },
        {
          speaker: "caller",
          text: call.transcriptSnippet,
          time: "00:10",
        },
        {
          speaker: "agent",
          text: call.summary,
          time: "00:40",
        },
      ],
    };
    setSelectedLiveCall(converted);
    setLiveCallModalOpen(true);
  };

  const handleViewContactDossier = (contactId: string) => {
    setSelectedContactId(contactId);
    setContactDossierOpen(true);
  };

  const handleAgentCreated = (newAgent: Partial<DashboardAgent>) => {
    const fullAgent: DashboardAgent = {
      id: `agent-${Date.now()}`,
      name: newAgent.name || "Agent New",
      role: newAgent.role || "Specialist",
      department: newAgent.department || "General",
      status: "active",
      voice: newAgent.voice || { name: "Priya (Neural)", gender: "Female", accent: "Indian English" },
      language: newAgent.language || "English + Hindi",
      callsToday: 0,
      avgDuration: "0m 00s",
      accuracy: 99.2,
      assignedNumber: "+91 40 4590 1166",
      systemPromptPreview: newAgent.systemPromptPreview || "General customer triage.",
      activeLiveCount: 0,
    };
    setAgents([fullAgent, ...agents]);
  };

  const handleCampaignStarted = (title: string, count: number) => {
    const newCamp = {
      id: `camp-${Date.now()}`,
      title,
      status: "active" as const,
      totalContacts: count,
      completedCount: 12,
      noAnswerCount: 2,
      failedCount: 0,
      progressPercent: 1,
      targetAudience: "Executive Health Checkups & Discharged Inpatients",
      assignedAgent: "Agent Alpha & Agent Beta",
      startDate: "Today",
      estTimeRemaining: "Starting now...",
    };
    setCampaigns([newCamp, ...campaigns]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen py-4 sm:py-6 px-2 sm:px-4 lg:px-6 dashboard-neo-frame font-sans select-none">
      {/* ========================================================================= */}
      {/* AUTHENTIC NEO-BRUTALIST WORKSPACE CONTAINER                              */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1500px] mx-auto min-h-[92vh] rounded-3xl p-5 sm:p-6 lg:p-8 flex flex-col justify-between relative bg-white border-3 border-black shadow-[8px_8px_0px_#000000]">
        <div>
          {/* Top Neo Header with Tactile Pill Navigation */}
          <DashboardHeader
            currentOrg={currentOrg}
            organizations={organizations}
            onSwitchOrg={setCurrentOrg}
            notifications={notifications}
            onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onOpenSearch={() => setActiveTab("calls")}
            theme={theme}
            onThemeChange={setTheme}
          />

          {/* Signature Neo-Brutalist Electric Admissions Ticker */}
          <div className="w-full bg-[#ffe600] border-2.5 border-black rounded-2xl px-3.5 py-2 mb-6 shadow-[4px_4px_0px_#000000] overflow-hidden flex items-center gap-3 font-sans select-none">
            <div className="inline-flex items-center gap-1.5 bg-black text-[#d6ff38] px-3 py-1 rounded-xl text-[11px] font-black shrink-0 border-2 border-black shadow-[2px_2px_0px_#000000] -rotate-1">
              <span className="w-2 h-2 rounded-full bg-[#d6ff38] inline-block animate-ping" />
              <span className="tracking-wider uppercase text-[10px]">LIVE TELEMETRY</span>
            </div>

            <div className="overflow-hidden whitespace-nowrap flex-1 relative">
              <div className="animate-ticker flex items-center gap-8 text-xs font-black text-black">
                <span className="flex items-center gap-2">
                  <span className="bg-black text-[#c084fc] px-2 py-0.5 rounded-md text-[11px] border border-black shadow-[1px_1px_0px_#000000]">⚡ Maya AI</span>
                  <span>pre-approved <strong className="underline decoration-2">35% Chancellor Scholarship</strong> for Rahul (CBSE 94%)</span>
                </span>
                <span className="text-black font-black">•</span>
                <span className="flex items-center gap-2">
                  <span className="bg-black text-[#00f0ff] px-2 py-0.5 rounded-md text-[11px] border border-black shadow-[1px_1px_0px_#000000]">🚀 Vikram AI</span>
                  <span>explained tuition fee 3-part installment to Sneha (BBA Intake)</span>
                </span>
                <span className="text-black font-black">•</span>
                <span className="flex items-center gap-2">
                  <span className="bg-black text-[#d6ff38] px-2 py-0.5 rounded-md text-[11px] border border-black shadow-[1px_1px_0px_#000000]">📞 Priya AI</span>
                  <span>confirmed Campus Tour visit pass for Ananya (Saturday 11 AM)</span>
                </span>
                <span className="text-black font-black">•</span>
                <span className="flex items-center gap-2">
                  <span className="bg-black text-white px-2 py-0.5 rounded-md text-[11px] border border-black shadow-[1px_1px_0px_#000000]">🟢 Zero Wait Time</span>
                  <span>3 SIP Trunks Operating • 382ms Latency</span>
                </span>
                <span className="text-black font-black">•</span>
                <span className="flex items-center gap-2">
                  <span className="bg-black text-[#fb923c] px-2 py-0.5 rounded-md text-[11px] border border-black shadow-[1px_1px_0px_#000000]">🏆 Today&apos;s Activity</span>
                  <span>842 Calls Dialed • 342 Qualified Leads</span>
                </span>
                {/* Seamless Loop Duplicate */}
                <span className="text-black font-black">•</span>
                <span className="flex items-center gap-2">
                  <span className="bg-black text-[#c084fc] px-2 py-0.5 rounded-md text-[11px] border border-black shadow-[1px_1px_0px_#000000]">⚡ Maya AI</span>
                  <span>pre-approved <strong className="underline decoration-2">35% Chancellor Scholarship</strong> for Rahul (CBSE 94%)</span>
                </span>
                <span className="text-black font-black">•</span>
                <span className="flex items-center gap-2">
                  <span className="bg-black text-[#00f0ff] px-2 py-0.5 rounded-md text-[11px] border border-black shadow-[1px_1px_0px_#000000]">🚀 Vikram AI</span>
                  <span>explained tuition fee 3-part installment to Sneha (BBA Intake)</span>
                </span>
                <span className="text-black font-black">•</span>
                <span className="flex items-center gap-2">
                  <span className="bg-black text-[#d6ff38] px-2 py-0.5 rounded-md text-[11px] border border-black shadow-[1px_1px_0px_#000000]">📞 Priya AI</span>
                  <span>confirmed Campus Tour visit pass for Ananya (Saturday 11 AM)</span>
                </span>
                <span className="text-black font-black">•</span>
                <span className="flex items-center gap-2">
                  <span className="bg-black text-white px-2 py-0.5 rounded-md text-[11px] border border-black shadow-[1px_1px_0px_#000000]">🟢 Zero Wait Time</span>
                  <span>3 SIP Trunks Operating • 382ms Latency</span>
                </span>
                <span className="text-black font-black">•</span>
                <span className="flex items-center gap-2">
                  <span className="bg-black text-[#fb923c] px-2 py-0.5 rounded-md text-[11px] border border-black shadow-[1px_1px_0px_#000000]">🏆 Today&apos;s Activity</span>
                  <span>842 Calls Dialed • 342 Qualified Leads</span>
                </span>
              </div>
            </div>
          </div>

          {/* Main Dynamic Viewport */}
          <main className="w-full mt-2">
            {activeTab === "overview" && (
              <OverviewView
                currentOrg={currentOrg}
                kpis={mockKPIs}
                agents={agents}
                liveCalls={liveCalls}
                recentCalls={recentCalls}
                activeCampaign={campaigns[0]}
                onCreateAgent={() => setCreateAgentOpen(true)}
                onStartCampaign={() => setStartCampaignOpen(true)}
                onUploadContacts={() => setUploadContactsOpen(true)}
                onUploadKnowledge={() => setUploadKnowledgeOpen(true)}
                onViewCall={handleViewLiveCall}
                onSelectRecentCall={handleSelectRecentCall}
                onViewContact={handleViewContactDossier}
                onExportReport={() => setExportReportOpen(true)}
                onManageKnowledge={() => setActiveTab("knowledge")}
                onManageTelephony={() => setActiveTab("telephony")}
                onViewAllCalls={() => setActiveTab("calls")}
              />
            )}

            {activeTab === "agents" && (
              <AIAgentsView
                agents={agents}
                onCreateAgent={() => setCreateAgentOpen(true)}
                onEditAgent={(agent) => setCreateAgentOpen(true)}
              />
            )}

            {activeTab === "calls" && (
              <CallsView
                liveCalls={liveCalls}
                recentCalls={recentCalls}
                onViewLiveCall={handleViewLiveCall}
                onSelectRecentCall={handleSelectRecentCall}
                onExportReport={() => setExportReportOpen(true)}
              />
            )}

            {activeTab === "campaigns" && (
              <CampaignsView
                campaigns={campaigns}
                onStartCampaign={() => setStartCampaignOpen(true)}
                onExportResults={() => setExportReportOpen(true)}
              />
            )}

            {activeTab === "contacts" && (
              <ContactsView
                onUploadContacts={() => setUploadContactsOpen(true)}
                onViewContactDossier={handleViewContactDossier}
              />
            )}

            {activeTab === "knowledge" && (
              <KnowledgeView
                documents={knowledgeDocs}
                onUploadDoc={() => setUploadKnowledgeOpen(true)}
              />
            )}

            {activeTab === "analytics" && (
              <AnalyticsView kpis={mockKPIs} />
            )}

            {activeTab === "reports" && (
              <CallsView
                liveCalls={liveCalls}
                recentCalls={recentCalls}
                onViewLiveCall={handleViewLiveCall}
                onSelectRecentCall={handleSelectRecentCall}
                onExportReport={() => setExportReportOpen(true)}
              />
            )}

            {activeTab === "telephony" && (
              <TelephonyView numbers={telephonyNumbers} />
            )}

            {activeTab === "team" && (
              <SettingsView currentOrg={currentOrg} />
            )}

            {activeTab === "settings" && (
              <SettingsView currentOrg={currentOrg} />
            )}
          </main>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GLOBAL MODALS */}
      {/* ========================================================================= */}
      <CreateAgentModal
        isOpen={createAgentOpen}
        onClose={() => setCreateAgentOpen(false)}
        onAgentCreated={handleAgentCreated}
      />

      <LiveCallModal
        call={selectedLiveCall}
        isOpen={liveCallModalOpen}
        onClose={() => {
          setLiveCallModalOpen(false);
          setSelectedLiveCall(null);
        }}
      />

      <StartCampaignModal
        isOpen={startCampaignOpen}
        onClose={() => setStartCampaignOpen(false)}
        onCampaignStarted={handleCampaignStarted}
      />

      <UploadContactsModal
        isOpen={uploadContactsOpen}
        onClose={() => setUploadContactsOpen(false)}
      />

      <UploadKnowledgeModal
        isOpen={uploadKnowledgeOpen}
        onClose={() => setUploadKnowledgeOpen(false)}
      />

      <ExportReportModal
        isOpen={exportReportOpen}
        onClose={() => setExportReportOpen(false)}
      />

      <ContactDossierModal
        contactId={selectedContactId}
        isOpen={contactDossierOpen}
        onClose={() => {
          setContactDossierOpen(false);
          setSelectedContactId(null);
        }}
      />
    </div>
  );
}
