import type { Metadata } from "next";
import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";

export const metadata: Metadata = {
  title: "VoicePilot AI — Operations Command Center",
  description:
    "Enterprise AI voice calling operations platform for educational institutions and organizations. Manage agents, monitor live calls, run campaigns, and track outcomes.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayoutClient>{children}</DashboardLayoutClient>;
}
