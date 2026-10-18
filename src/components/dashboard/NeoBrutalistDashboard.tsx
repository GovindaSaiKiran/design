"use client";

import React from "react";
import DashboardShell from "./DashboardShell";

/**
 * NeoBrutalistDashboard legacy alias
 * Kept for backwards-compatibility; seamlessly forwards to modern pastel DashboardShell.
 */
export default function NeoBrutalistDashboard() {
  return <DashboardShell />;
}
