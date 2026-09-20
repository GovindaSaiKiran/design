import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Operations Dashboard — VoicePilot AI Operations Command Center",
  description:
    "Enterprise AI voice calling operations platform for verified organizations. Manage agents, monitor live acoustic streams, run outbound campaigns, and inspect conversation transcripts.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#fbfbfd] text-slate-900 antialiased selection:bg-slate-900 selection:text-white">{children}</div>;
}
