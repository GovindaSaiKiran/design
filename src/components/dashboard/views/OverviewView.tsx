"use client";

import React, { useState } from "react";
import {
  KPIMetric,
  DashboardAgent,
  LiveCallItem,
  RecentCallRecord,
  CampaignData,
  OrganizationInfo,
} from "@/types/dashboard";
import InstitutionVitalsBar from "../components/InstitutionVitalsBar";
import LeadSegmentationHub, { StudentLeadItem } from "../components/LeadSegmentationHub";
import LiveOperationsCompactCard from "../components/LiveOperationsCompactCard";
import InteractiveAudioPlayerModal from "../components/InteractiveAudioPlayerModal";

interface OverviewViewProps {
  currentOrg: OrganizationInfo;
  kpis: KPIMetric[];
  agents: DashboardAgent[];
  liveCalls: LiveCallItem[];
  recentCalls: RecentCallRecord[];
  activeCampaign: CampaignData;
  onCreateAgent: () => void;
  onStartCampaign: () => void;
  onUploadContacts: () => void;
  onUploadKnowledge: () => void;
  onViewCall: (call: LiveCallItem) => void;
  onSelectRecentCall: (call: RecentCallRecord) => void;
  onViewContact: (contactId: string) => void;
  onExportReport: () => void;
  onManageKnowledge: () => void;
  onManageTelephony: () => void;
  onViewAllCalls: () => void;
}

export default function OverviewView({
  currentOrg,
  kpis,
  agents,
  liveCalls,
  recentCalls,
  activeCampaign,
  onCreateAgent,
  onStartCampaign,
  onUploadContacts,
  onUploadKnowledge,
  onViewCall,
  onSelectRecentCall,
  onViewContact,
  onExportReport,
  onManageKnowledge,
  onManageTelephony,
  onViewAllCalls,
}: OverviewViewProps) {
  const [selectedLeadForAudio, setSelectedLeadForAudio] = useState<StudentLeadItem | null>(null);
  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "interested" | "call_later" | "not_interested" | "inbound">("interested");

  const handleOpenLeadModal = (lead?: StudentLeadItem) => {
    if (lead) {
      setSelectedLeadForAudio(lead);
      setAudioModalOpen(true);
    } else if (liveCalls.length > 0) {
      onViewCall(liveCalls[0]);
    }
  };

  const handleFilterCategoryFromTile = (category: string) => {
    const validCategory = category as "all" | "interested" | "call_later" | "not_interested" | "inbound";
    setSelectedCategory(validCategory);

    // Smooth scroll to lead table for immediate focus
    const el = document.getElementById("lead-table-hub");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full space-y-6 select-none">
      {/* ========================================================================= */}
      {/* 1. TOP: EXECUTIVE INSTITUTION VITALS & 4 CLICK-TO-FILTER METRIC TILES     */}
      {/* ========================================================================= */}
      <InstitutionVitalsBar
        currentOrg={currentOrg}
        activeCategory={selectedCategory}
        onUploadContacts={onUploadContacts}
        onExportReport={onExportReport}
        onStartCampaign={onStartCampaign}
        onCreateAgent={onCreateAgent}
        onFilterCategory={handleFilterCategoryFromTile}
      />

      {/* ========================================================================= */}
      {/* 2. MAIN COMMAND CENTER: 2 CLEAN COLUMNS (FAST ACCESS, ZERO CONFUSION)    */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ======================================================================= */}
        {/* LEFT COLUMN (8 COLS / 67%): CORE STUDENT LEAD HUB & CALL HISTORY TABLE */}
        {/* ======================================================================= */}
        <div id="lead-table-hub" className="lg:col-span-8 w-full scroll-mt-6">
          <LeadSegmentationHub
            activeCategory={selectedCategory}
            onCategoryChange={(cat) => setSelectedCategory(cat)}
            onInspectCall={handleOpenLeadModal}
            onOpenExportModal={onExportReport}
          />
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN (4 COLS / 33%): LIVE DIALER PULSE, ACTIVE AGENTS & ACTIONS */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 w-full">
          <LiveOperationsCompactCard
            agents={agents}
            liveCalls={liveCalls}
            onOpenLiveCallModal={() => handleOpenLeadModal()}
            onCreateAgent={onCreateAgent}
            onStartCampaign={onStartCampaign}
            onUploadKnowledge={onUploadKnowledge}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE AUDIO PLAYER & VERBATIM TRANSCRIPT MODAL                      */}
      {/* ========================================================================= */}
      <InteractiveAudioPlayerModal
        lead={selectedLeadForAudio}
        isOpen={audioModalOpen}
        onClose={() => {
          setAudioModalOpen(false);
          setSelectedLeadForAudio(null);
        }}
      />
    </div>
  );
}
