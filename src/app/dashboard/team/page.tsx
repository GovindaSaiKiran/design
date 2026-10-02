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
    id: "tm-01",
    name: "Dr. Arjun Verma",
    email: "arjun.verma@apex.edu.in",
    role: "Institutional Admin",
    department: "Dean of Admissions & Institutional Ops",
    status: "active",
    lastActive: "Active now",
  },
  {
    id: "tm-02",
    name: "Prof. Sunita Rao",
    email: "sunita.rao@apex.edu.in",
    role: "Senior Counselor",
    department: "Admissions & Merit Scholarships",
    status: "active",
    lastActive: "15 min ago",
  },
  {
    id: "tm-03",
    name: "Kavita Reddy",
    email: "kavita.reddy@apex.edu.in",
    role: "Admissions Staff",
    department: "Student Affairs & Campus Life",
    status: "active",
    lastActive: "1 hour ago",
  },
  {
    id: "tm-04",
    name: "Rajeshwar Iyer",
    email: "r.iyer@apex.edu.in",
    role: "Senior Counselor",
    department: "Lateral Entry & Diploma Triage",
    status: "active",
    lastActive: "Yesterday",
  },
  {
    id: "tm-05",
    name: "Meenakshi Sundaram",
    email: "meenakshi.s@apex.edu.in",
    role: "Viewer",
    department: "Executive Board of Trustees",
    status: "invited",
    lastActive: "Invitation pending",
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

    const newMember: TeamMember = {
      id: `tm-${Date.now()}`,
      name: inviteEmail.split("@")[0].replace(".", " "),
      email: inviteEmail,
      role: inviteRole,
      department: "Admissions & Counseling",
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
    <div className="space-y-6 sm:space-y-8 select-none">
      {/* ======================================================================= */}
      {/* WORKSPACE HEADER                                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="text-[11px] font-bold tracking-wider text-slate-500 hover:text-slate-800 uppercase transition-colors"
            >
              ORGANIZATION
            </Link>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-950 bg-[#cdfb56]/30 px-2.5 py-0.5 rounded-full border border-[#cdfb56]/70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926]" />
              5 Active Members
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mt-1">
            Team & Staff Access
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Manage institutional staff who can access the VoicePilot AI platform, assign roles, and route warm counselor transfers.
          </p>
        </div>

        {/* Workspace Actions */}
        <button
          onClick={() => setInviteModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 text-xs font-bold px-4 py-2 rounded-lg border border-[#bceb42] shadow-xs hover:shadow transition-all cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5 text-slate-950" />
          <span>Invite Staff Member</span>
        </button>
      </div>

      {inviteSuccess && (
        <div className="bg-[#f7fee7] border border-[#cdfb56] p-3 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-900 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#8ac926]" />
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
          description="Institutional administrators and admissions desk team."
          metric="5 members"
          metricLabel="4 active • 1 invitation pending"
          status="All verified"
          statusType="ready"
          actionLabel="View roster →"
        />

        <WorkspaceCard
          name="Counselor Handoff Desk"
          icon={UserCheck}
          description="Staff members eligible to receive warm call transfers from AI agents."
          metric="3 counselors"
          metricLabel="Dr. Verma, Prof. Rao, Mr. Iyer"
          status="Online for calls"
          statusType="live"
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
          metricLabel="All staff authenticated via apex.edu.in"
          status="Enforced"
          statusType="ready"
          actionLabel="Security policy →"
        />
      </div>

      {/* ======================================================================= */}
      {/* TEAM MEMBERS TABLE                                                      */}
      {/* ======================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {/* Table Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/70 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Institutional Staff Roster
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              ({team.length} members)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            Managed under Apex Engineering College tenant
          </span>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/40 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Institutional Role</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {team.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-[#f7fee7]/30 transition-colors group"
                >
                  {/* Member Name & Email */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900 group-hover:text-slate-950">
                      {member.name}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {member.email}
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                        member.role === "Institutional Admin"
                          ? "bg-slate-900 text-white border-slate-900"
                          : member.role === "Senior Counselor"
                          ? "bg-[#cdfb56]/40 text-slate-950 border-[#cdfb56]"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {member.role}
                    </span>
                  </td>

                  {/* Department */}
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {member.department}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {member.status === "active" ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-900 bg-[#f7fee7] px-2 py-0.5 rounded-full border border-[#cdfb56]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8ac926]" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
                        <Clock className="w-2.5 h-2.5" />
                        Invited
                      </span>
                    )}
                  </td>

                  {/* Last Active */}
                  <td className="py-3.5 px-4 text-slate-500 text-[11px] font-mono">
                    {member.lastActive}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={() => alert(`Managing permissions for ${member.name}`)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs transition-all cursor-pointer"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Invite Staff Member
              </span>
              <button
                onClick={() => setInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInvite} className="p-5 space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Institutional Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. counselor@apex.edu.in"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#cdfb56]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Platform Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#cdfb56]"
                >
                  <option value="Senior Counselor">Senior Counselor (Call Handoffs)</option>
                  <option value="Admissions Staff">Admissions Staff (View & Call)</option>
                  <option value="Institutional Admin">Institutional Admin (Full Access)</option>
                  <option value="Viewer">Viewer (Read-only)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#cdfb56] hover:bg-[#bef03f] text-slate-950 border border-[#bceb42] shadow-2xs cursor-pointer"
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
