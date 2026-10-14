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
} from "lucide-react";
import WorkspaceCard from "@/components/dashboard/WorkspaceCard";
import { soundSynth } from "@/lib/audio-synth";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Institutional Admin" | "Senior Counselor" | "Admissions Staff" | "Viewer";
  department: string;
  status: "active" | "invited";
  lastActive: string;
}

const mockTeamList: TeamMember[] = [
  {
    id: "tm-owner",
    name: "clinic",
    email: "taninkigovinda@gmail.com",
    role: "Institutional Admin",
    department: "Organization Owner",
    status: "active",
    lastActive: "Active now",
  },
];

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeamList);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMember["role"]>("Senior Counselor");
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    try { soundSynth.play("confirm"); } catch {}

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteEmail.split("@")[0].replace(".", " "),
      email: inviteEmail,
      role: inviteRole,
      department: "Support & Operations",
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
    <div className="space-y-6 sm:space-y-8 select-none text-white">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#27272A]">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#71717A] hover:text-white transition-colors"
            >
              ORGANIZATION STAFF
            </Link>
            <span className="text-[#3F3F46]">/</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-white bg-[#121215] px-2.5 py-0.5 rounded-[2px] border border-[#27272A]">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {team.length} ACTIVE MEMBER{team.length === 1 ? "" : "S"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1.5">
            Team & Staff Access Control
          </h1>

          <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 max-w-2xl leading-relaxed">
            Manage institutional staff who can access the Swaram AI platform, configure RBAC permissions, and route warm call handoffs.
          </p>
        </div>

        {/* Workspace Actions */}
        <button
          onClick={() => {
            try { soundSynth.play("click"); } catch {}
            setInviteModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-[2px] transition-all cursor-pointer shadow-sm"
        >
          <UserPlus className="w-3.5 h-3.5 text-black" />
          <span>Invite Staff Member</span>
        </button>
      </div>

      {inviteSuccess && (
        <div className="bg-[#121215] border border-white/40 p-3.5 rounded-[2px] flex items-center gap-3 text-xs font-mono text-white shadow-lg animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>Invitation email delivered to {inviteSuccess}.</span>
        </div>
      )}

      {/* ======================================================================= */}
      {/* WORKSPACE SUB-FOLDER CARDS                                              */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WorkspaceCard
          name="Staff Roster"
          icon={Users}
          description="Organization administrators and call monitoring team."
          metric={`${team.length} member`}
          metricLabel="1 active • 0 invitation pending"
          status="All verified"
          statusType="ready"
          actionLabel="View roster →"
        />

        <WorkspaceCard
          name="Counselor Handoff Desk"
          icon={UserCheck}
          description="Staff members eligible to receive warm call transfers from AI agents."
          metric="0 counselors"
          metricLabel="No external transfer routing configured"
          status="Idle"
          statusType="neutral"
          actionLabel="Manage routing →"
        />

        <WorkspaceCard
          name="Access Control"
          icon={ShieldCheck}
          description="Role-based permissions (Admin, Counselor, Staff, Viewer)."
          metric="RBAC Enforced"
          metricLabel="Audit logs enabled on all transcript actions"
          status="Strict Mode"
          statusType="ready"
          actionLabel="Inspect permissions →"
        />

        <WorkspaceCard
          name="SSO & Multi-Factor"
          icon={Key}
          description="Google Workspace and Microsoft Entra ID single sign-on integration."
          metric="SSO Active"
          metricLabel="Authenticated via taninkigovinda@gmail.com"
          status="Enforced"
          statusType="ready"
          actionLabel="Security policy →"
        />
      </div>

      {/* ======================================================================= */}
      {/* TEAM MEMBERS TABLE                                                      */}
      {/* ======================================================================= */}
      <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] overflow-hidden">
        {/* Table Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#121215] border-b border-[#27272A]">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Organization Staff Roster
            </span>
            <span className="text-[11px] text-[#A1A1AA] font-mono">
              ({team.length} MEMBERS)
            </span>
          </div>
          <span className="text-[11px] text-[#71717A] font-mono hidden sm:inline">
            Managed under clinic tenant
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#121215]/80 border-b border-[#27272A] text-[#71717A] font-mono uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 font-bold">Staff Member</th>
                <th className="py-3 px-4 font-bold">Institutional Role</th>
                <th className="py-3 px-4 font-bold">Department</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold">Last Active</th>
                <th className="py-3 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#18181B]">
              {team.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-[#121215] transition-colors group"
                >
                  {/* Member Name & Email */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white group-hover:text-white">
                      {member.name}
                    </div>
                    <div className="text-[11px] text-[#A1A1AA] font-mono mt-0.5">
                      {member.email}
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[10px] font-mono uppercase bg-[#121215] text-zinc-300 border border-[#27272A]">
                      {member.role}
                    </span>
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-4 text-zinc-300 font-medium">
                    {member.department}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {member.status === "active" ? (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider bg-[#121215] text-white px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider bg-[#121215] text-[#71717A] px-2 py-0.5 rounded-[2px] border border-[#27272A]">
                        <Clock className="w-2.5 h-2.5" />
                        Invited
                      </span>
                    )}
                  </td>

                  {/* Last Active */}
                  <td className="py-3.5 px-4 text-[#A1A1AA] text-[11px] font-mono">
                    {member.lastActive}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => {
                        try { soundSynth.play("click"); } catch {}
                        alert(`Managing permissions for ${member.name}`);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-wider bg-transparent hover:bg-white text-zinc-300 hover:text-black border border-[#27272A] hover:border-white transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-[#09090B] rounded-[2px] border border-[#27272A] shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-5 py-4 bg-[#121215] border-b border-[#27272A] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Invite Staff Member
              </span>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="text-[#71717A] hover:text-white text-xs font-mono cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInvite} className="p-5 space-y-4 font-mono">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold block">
                  Team Member Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. member@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#121215] border border-[#27272A] rounded-[2px] text-white focus:outline-none focus:border-white transition-all placeholder:text-[#71717A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider text-[#A1A1AA] font-bold block">
                  Platform Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-[#121215] border border-[#27272A] rounded-[2px] text-white focus:outline-none focus:border-white transition-all"
                >
                  <option value="Senior Counselor">Senior Counselor (Call Handoffs)</option>
                  <option value="Admissions Staff">Admissions Staff (View & Call)</option>
                  <option value="Institutional Admin">Institutional Admin (Full Access)</option>
                  <option value="Viewer">Viewer (Read-only)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#27272A] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-3 py-1.5 rounded-[2px] text-xs font-mono uppercase tracking-wider text-[#A1A1AA] hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-black transition-all cursor-pointer shadow-xs"
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
