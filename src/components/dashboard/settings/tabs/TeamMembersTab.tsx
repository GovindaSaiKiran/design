import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  Trash2,
  Send,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  X,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import ConfirmationModal from "../ConfirmationModal";
import { TeamMember, TeamRole } from "@/types/settings";

interface TeamMembersTabProps {
  initialTeam: TeamMember[];
  onSaveTeam: (updatedTeam: TeamMember[]) => Promise<boolean>;
}

export default function TeamMembersTab({ initialTeam, onSaveTeam }: TeamMembersTabProps) {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamRole>("Member");
  const [feedbackNotice, setFeedbackNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Confirmation modal state for removing member
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);

  const showNotice = (type: "success" | "error", text: string) => {
    setFeedbackNotice({ type, text });
    setTimeout(() => setFeedbackNotice(null), 3500);
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteEmail.includes("@")) {
      showNotice("error", "Please provide a valid business email address.");
      return;
    }

    const newMember: TeamMember = {
      id: `team-${Date.now()}`,
      name: inviteName.trim() || inviteEmail.split("@")[0],
      email: inviteEmail.trim(),
      role: inviteRole,
      status: "Pending Invitation",
      addedDate: "Today",
      lastActive: "Invite sent",
    };

    const updated = [newMember, ...team];
    setTeam(updated);
    setIsInviteModalOpen(false);
    setInviteEmail("");
    setInviteName("");
    setInviteRole("Member");

    await onSaveTeam(updated);
    showNotice("success", `Invitation sent successfully to ${newMember.email}`);
  };

  const handleResendInvite = async (member: TeamMember) => {
    showNotice("success", `Invitation re-dispatched to ${member.email}`);
  };

  const handleRoleChange = async (memberId: string, newRole: TeamRole) => {
    const member = team.find((m) => m.id === memberId);
    if (!member) return;

    // Guardrail: Do not allow demoting the only owner
    if (member.role === "Owner" && newRole !== "Owner") {
      const owners = team.filter((m) => m.role === "Owner");
      if (owners.length <= 1) {
        showNotice("error", "Cannot demote the only workspace Owner. Transfer ownership first.");
        return;
      }
    }

    const updated = team.map((m) => (m.id === memberId ? { ...m, role: newRole } : m));
    setTeam(updated);
    await onSaveTeam(updated);
    showNotice("success", `Updated ${member.name}'s role to ${newRole}`);
  };

  const confirmRemoveMember = async () => {
    if (!memberToRemove) return;

    // Guardrail: Cannot remove the last owner
    if (memberToRemove.role === "Owner") {
      const owners = team.filter((m) => m.role === "Owner");
      if (owners.length <= 1) {
        showNotice("error", "Cannot remove the only workspace Owner. Assign another owner first.");
        setMemberToRemove(null);
        return;
      }
    }

    const updated = team.filter((m) => m.id !== memberToRemove.id);
    setTeam(updated);
    await onSaveTeam(updated);
    showNotice("success", `Removed ${memberToRemove.name} from the workspace.`);
    setMemberToRemove(null);
  };

  return (
    <div className="space-y-5">
      <SectionHeader
        title="Team Members & Access"
        badge={`${team.length} Active Accounts`}
        whatIsThis="The list of administrators, counselors, and staff who can access your Swaram workspace."
        whyDoINeedIt="Assigning proper roles ensures counselors can inspect transcripts and callbacks without accidentally altering billing or carrier phone numbers."
        whatToDoNext="Invite colleagues or adjust permissions so your admissions and support staff have the right level of operational access."
      >
        <button
          type="button"
          onClick={() => setIsInviteModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#283A50] hover:bg-[#1f2d3e] text-white shadow-xs transition-colors cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Invite Member</span>
        </button>
      </SectionHeader>

      {feedbackNotice && (
        <div
          className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
            feedbackNotice.type === "success"
              ? "bg-[#B8DEC8]/40 border border-[#2E8066]/30 text-[#2E8066]"
              : "bg-rose-50 border border-rose-200 text-rose-700"
          }`}
        >
          {feedbackNotice.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedbackNotice.text}</span>
        </div>
      )}

      {/* Team Members Table */}
      <div className="bg-white rounded-2xl border border-[#E9E1D4] overflow-hidden shadow-2xs">
        <div className="px-6 py-4 bg-[#FAF5E9]/50 border-b border-[#E9E1D4] flex items-center justify-between">
          <span className="text-xs font-bold text-[#283A50]">
            Workspace Authorized Users ({team.length})
          </span>
          <span className="text-[11px] text-[#707684]">
            Enforced by role-based access control (RBAC)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E9E1D4] text-[#707684] font-semibold text-[11px] uppercase tracking-wider bg-white">
                <th className="py-3 px-5">Member</th>
                <th className="py-3 px-5">Email Address</th>
                <th className="py-3 px-5">Role Permission</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Last Active</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E1D4]/60">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-[#FAF5E9]/30 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FAF5E9] border border-[#E9E1D4] flex items-center justify-center font-bold text-[#283A50] text-xs">
                        {member.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-[#283A50]">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-[#707684] font-mono">{member.email}</td>
                  <td className="py-3.5 px-5">
                    <select
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value as TeamRole)}
                      className="text-xs px-2.5 py-1 rounded-lg bg-[#FAF5E9] border border-[#E9E1D4] text-[#283A50] font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="Owner">Owner (Full Controls)</option>
                      <option value="Admin">Admin (Ops &amp; Config)</option>
                      <option value="Member">Member (Operations)</option>
                      <option value="Viewer">Viewer (Read-only)</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-5">
                    {member.status === "Active" ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2E8066] bg-[#B8DEC8]/50 px-2.5 py-0.5 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        Pending Invite
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-5 text-[#707684]">{member.lastActive}</td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {member.status === "Pending Invitation" && (
                        <button
                          type="button"
                          onClick={() => handleResendInvite(member)}
                          className="px-2.5 py-1 rounded-lg bg-[#FAF5E9] hover:bg-[#FAF3E4] text-[#283A50] border border-[#E9E1D4] text-[11px] font-semibold flex items-center gap-1"
                          title="Resend invitation email"
                        >
                          <Send className="w-3 h-3" />
                          <span>Resend</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setMemberToRemove(member)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove member from workspace"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Explanations Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-white border border-[#E9E1D4] space-y-1">
          <strong className="text-[#283A50] block font-bold">Owner</strong>
          <p className="text-[#707684] text-[11px] leading-relaxed">
            Full workspace ownership, billing, delete authority, and master credentials.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-[#E9E1D4] space-y-1">
          <strong className="text-[#283A50] block font-bold">Admin</strong>
          <p className="text-[#707684] text-[11px] leading-relaxed">
            Manage agents, voice schedules, phone trunks, and operational workflows.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-[#E9E1D4] space-y-1">
          <strong className="text-[#283A50] block font-bold">Member</strong>
          <p className="text-[#707684] text-[11px] leading-relaxed">
            Dial outbound calls, review candidate logs, manage assigned callbacks.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-white border border-[#E9E1D4] space-y-1">
          <strong className="text-[#283A50] block font-bold">Viewer</strong>
          <p className="text-[#707684] text-[11px] leading-relaxed">
            Read-only analytics, reports inspection, and audit log verification.
          </p>
        </div>
      </div>

      {/* Invite Member Modal */}
      {isInviteModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsInviteModalOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs animate-in fade-in duration-150"
        >
          <div className="bg-white rounded-2xl border border-[#E9E1D4] max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E1D4]">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#283A50]" />
                <h3 className="text-base font-bold text-[#283A50]">Invite Team Member</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#283A50] block">Member Name</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Priyadarshini Mehta"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#283A50] block">
                  Work Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@apex.edu.in"
                  required
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#283A50] block">Role Permission</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as TeamRole)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF5E9]/60 border border-[#E9E1D4] text-[#283A50] font-medium focus:outline-none"
                >
                  <option value="Admin">Admin — Manage voice setups &amp; scheduling</option>
                  <option value="Member">Member — Handle calls, callbacks &amp; reviews</option>
                  <option value="Viewer">Viewer — Read-only reports &amp; analytics</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E9E1D4]">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-[#707684] bg-white border border-[#E9E1D4]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-semibold text-white bg-[#283A50] hover:bg-[#1f2d3e]"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Confirmation Dialog */}
      <ConfirmationModal
        isOpen={!!memberToRemove}
        title="Remove Team Member?"
        description={`Are you sure you want to remove ${memberToRemove?.name} (${memberToRemove?.email}) from this workspace? They will immediately lose access to all voice agents, candidate transcripts, and callback logs.`}
        confirmLabel="Remove Member"
        isDestructive={true}
        onConfirm={confirmRemoveMember}
        onClose={() => setMemberToRemove(null)}
      />
    </div>
  );
}
