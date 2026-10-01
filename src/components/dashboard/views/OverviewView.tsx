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
import DashboardFooter from "../components/DashboardFooter";
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
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "interested" | "call_later" | "not_interested" | "inbound"
  >("interested");

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
    <div className="w-full space-y-8 select-none animate-in fade-in duration-300 pb-16 font-sans">
      {/* ========================================================================= */}
      {/* 1. INSTITUTION VITALS & CATEGORY FILTER TILES                             */}
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
      {/* 2. VERIFIED CANDIDATE REGISTRY TABLE & LIVE OPERATIONS SIDEBAR             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div id="lead-table-hub" className="lg:col-span-8 w-full scroll-mt-8">
          <LeadSegmentationHub
            activeCategory={selectedCategory}
            onCategoryChange={(cat) => setSelectedCategory(cat)}
            onInspectCall={handleOpenLeadModal}
            onOpenExportModal={onExportReport}
          />
        </div>

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
      {/* 3. CAMPUS COMPLIANCE FOOTER                                               */}
      {/* ========================================================================= */}
      <DashboardFooter />

      {/* Interactive Audio Recording Modal */}
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
