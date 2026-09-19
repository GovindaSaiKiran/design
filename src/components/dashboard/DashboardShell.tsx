"use client";

import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
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
    <div className="min-h-screen bg-[#f8f9fa] py-4 px-3 sm:px-6 lg:px-8 selection:bg-black selection:text-[#d6ff38]">
      {/* ========================================================================= */}
      {/* REFINED, LIGHTWEIGHT NEO-BRUTALIST CANVAS                                */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[1440px] mx-auto min-h-[92vh] bg-white border-[1.5px] border-black rounded-2xl p-4 sm:p-6 lg:p-7 shadow-[4px_4px_0px_#000000] flex flex-col justify-between relative">
        <div>
          {/* Top Sculpted Header with Pill Navigation */}
          <DashboardHeader
            currentOrg={currentOrg}
            organizations={organizations}
            onSwitchOrg={setCurrentOrg}
            notifications={notifications}
            onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            onOpenSearch={() => setActiveTab("calls")}
          />

          {/* Main Dynamic Viewport */}
          <main className="w-full mt-4">
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

        {/* ========================================================================= */}
        {/* BOTTOM TIMELINE SCRUBBER DOCK (Exact Match to Reference Image)            */}
        {/* ========================================================================= */}
        <div className="mt-8 pt-4 border-t border-neutral-200">
          <TimelineScrubberDock
            onSelectPeriod={(period) => {
              // Interactive timeline period selection
            }}
            onOpenExportModal={() => setExportReportOpen(true)}
          />
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
