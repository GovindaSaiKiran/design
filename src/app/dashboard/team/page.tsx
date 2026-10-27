"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  UserPlus,
  ShieldCheck,
  UserCheck,
  Mail,
  MoreVertical,
  CheckCircle2,
  Clock,
  Key,
  X,
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Workspace Admin" | "Telephony Lead" | "Operations Specialist" | "Viewer";
  department: string;
  status: "active" | "invited";
  lastActive: string;
}

const initialTeamList: TeamMember[] = [
  {
    id: "tm-owner",
    name: "Operations Admin",
    email: "admin@enterprise.ai",
    role: "Workspace Admin",
    department: "Voice Operations",
    status: "active",
    lastActive: "Active now",
  },
  {
    id: "tm-02",
    name: "Telephony Lead",
    email: "telephony@enterprise.ai",
    role: "Telephony Lead",
    department: "Engineering & PRI Trunks",
    status: "active",
    lastActive: "15 mins ago",
  },
  {
    id: "tm-03",
    name: "Outreach Specialist",
    email: "outreach@enterprise.ai",
    role: "Operations Specialist",
    department: "Customer Experience",
    status: "active",
    lastActive: "1 hr ago",
  },
];

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeamList);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Operations Specialist");
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteEmail.split("@")[0].replace(".", " "),
      email: inviteEmail,
      role: inviteRole,
      department: "Voice Operations",
      status: "invited",
      lastActive: "Invitation pending",
    };

    setTeam([...team, newMember]);
    setInviteSuccess(inviteEmail);
    setInviteEmail("");
    setInviteModalOpen(false);
    setTimeout(() => setInviteSuccess(null), 3500);
  };

  return (
    <div className="space-y-6 font-sans text-[#1A1A1A]">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-black/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-black/50 hover:text-[#1A1A1A] transition-colors"
            >
              Overview
            </Link>
            <span className="text-black/20">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] bg-[#FFD9A0] px-3 py-0.5 rounded-full">
              Team &amp; Access
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1A1A] mt-2">
            Team &amp; Staff Access Control
          </h1>

          <p className="text-sm text-black/60 mt-1 max-w-2xl leading-relaxed">
            Manage organization members who can access the Swaram platform, configure RBAC permissions, and route warm call handoffs.
          </p>
        </div>

        {/* Workspace Actions */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap shrink-0">
          <button
            onClick={() => setInviteModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5 text-white" />
            <span>Invite Staff Member</span>
          </button>
        </div>
      </div>

      {inviteSuccess && (
        <div className="bg-[#C1F2D5]/50 border border-[#16856B]/20 p-3.5 rounded-2xl flex items-center gap-3 text-xs text-[#16856B] shadow-2xs animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#16856B] shrink-0" />
          <span>Invitation email delivered to <strong>{inviteSuccess}</strong>.</span>
        </div>
      )}

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Staff Roster"
          icon={Users}
          description="Organization administrators and admissions monitoring staff."
          metric={`${team.length} members`}
          metricLabel="All accounts active"
          status="Verified"
          statusType="ready"
          actionLabel="View roster →"
        />

        <WorkspaceCard
          name="Counselor Handoff Desk"
          icon={UserCheck}
          description="Staff members eligible to receive warm call transfers from AI agents."
          metric="2 counselors"
          metricLabel="Warm transfer routing enabled"
          status="Online"
          statusType="ready"
          actionLabel="Manage routing →"
        />

        <WorkspaceCard
          name="Access Control"
          icon={ShieldCheck}
          description="Role-based permissions (Admin, Counselor, Staff, Viewer)."
          metric="RBAC Enforced"
          metricLabel="Audit logs enabled on transcript views"
          status="Strict Mode"
          statusType="ready"
          actionLabel="Inspect permissions →"
        />

        <WorkspaceCard
          name="SSO & Multi-Factor"
          icon={Key}
          description="Google Workspace and Microsoft Entra ID single sign-on integration."
          metric="SSO Active"
          metricLabel="Enterprise authentication verified"
          status="Enforced"
          statusType="ready"
          actionLabel="Security policy →"
        />
      </div>

      {/* Team Members Table */}
      <div className="bg-white rounded-[26px] border border-black/[0.06] overflow-hidden shadow-2xs">
        {/* Table Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-black/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-[#1A1A1A]">
              Organization Staff Roster
            </span>
            <span className="text-xs text-black/50">
              ({team.length} members)
            </span>
          </div>
          <span className="text-xs text-black/50 hidden sm:inline">
            Enterprise Voice Tenant
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FBF7ED] border-b border-black/[0.06] text-black/45 font-semibold text-[11px]">
                <th className="py-3.5 px-6">Staff Member</th>
                <th className="py-3.5 px-4">Workspace Role</th>
                <th className="py-3.5 px-4">Department</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Active</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.06]">
              {team.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-[#FBF7ED]/50 transition-colors group text-[#1A1A1A]"
                >
                  {/* Member Name & Email */}
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#1A1A1A]">
                      {member.name}
                    </div>
                    <div className="text-[11px] text-black/50 mt-0.5">
                      {member.email}
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#BCD0F5]/50 text-blue-950 border border-[#A8C3F0]/60">
                      {member.role}
                    </span>
                  </td>

                  {/* Department */}
                  <td className="py-4 px-4 text-[#1A1A1A] font-semibold">
                    {member.department}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {member.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-[#C1F2D5] text-[#16856B] px-3 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16856B] animate-pulse" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-[#FFD9A0] text-amber-950 px-3 py-0.5 rounded-full">
                        <Clock className="w-3 h-3 text-amber-800" />
                        Invited
                      </span>
                    )}
                  </td>

                  {/* Last Active */}
                  <td className="py-4 px-4 text-black/50 text-xs">
                    {member.lastActive}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <button
                      onClick={() => alert(`Configuring permissions for ${member.name}`)}
                      className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FBF7ED] hover:bg-[#FAF3E4] text-[#1A1A1A] border border-black/[0.06] shadow-2xs transition-all cursor-pointer"
                    >
                      <span>Configure</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-[28px] border border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.12)] max-w-md w-full overflow-hidden p-6 sm:p-7 text-[#1A1A1A]">
            <div className="pb-4 border-b border-black/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">STAFF INVITATION</span>
                <h3 className="text-base font-bold text-[#1A1A1A]">
                  Invite Staff Member
                </h3>
              </div>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="p-2 rounded-full text-black/40 hover:text-[#1A1A1A] hover:bg-[#FBF7ED] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="my-5 space-y-4">
              <div>
                <label className="text-xs text-[#1A1A1A] font-semibold block mb-1.5">
                  Staff Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. member@enterprise.ai"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full text-xs px-4 py-2.5 bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:border-black/30 transition-all font-medium placeholder:text-black/35"
                />
              </div>

              <div>
                <label className="text-xs text-[#1A1A1A] font-semibold block mb-1.5">
                  Platform Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full text-xs px-4 py-2.5 bg-[#FBF7ED] border border-black/[0.06] rounded-full text-[#1A1A1A] focus:outline-none focus:border-black/30 transition-all cursor-pointer font-medium"
                >
                  <option value="Operations Specialist">Operations Specialist (Warm Call Handoffs)</option>
                  <option value="Telephony Lead">Telephony Lead (Manage Trunks &amp; Campaigns)</option>
                  <option value="Workspace Admin">Workspace Admin (Full Administrative Access)</option>
                  <option value="Viewer">Viewer (Read-only Analytics &amp; Transcripts)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-black/60 hover:text-[#1A1A1A] border border-black/[0.08] bg-white hover:bg-[#FAF3E4] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#111111] hover:bg-black text-white transition-all cursor-pointer shadow-sm"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
