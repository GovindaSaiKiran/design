"use client";

import React, { useState } from "react";
import EmployeeStoreView from "@/components/dashboard/views/EmployeeStoreView";
import CreateAgentModal from "@/components/dashboard/modals/CreateAgentModal";

export default function StorePage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <>
      <EmployeeStoreView
        onCreateCustomAgent={() => setCreateModalOpen(true)}
      />
      <CreateAgentModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </>
  );
}
