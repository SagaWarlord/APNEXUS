"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, ArrowLeft, Plus, Trash2, User } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { EVENT } from "@/lib/constants";

interface Member {
  fullName: string;
  email: string;
  mobile: string;
  college: string;
  branch: string;
  year: string;
}

const emptyMember = (): Member => ({
  fullName: "",
  email: "",
  mobile: "",
  college: "",
  branch: "",
  year: "",
});

export default function RegisterPage() {
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const [members, setMembers] = useState<Member[]>([emptyMember()]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const addMember = () => {
    if (members.length < EVENT.maxTeamSize) {
      setMembers([...members, emptyMember()]);
    }
  };

  const removeMember = (index: number) => {
    if (index === 0) return; // Cannot remove leader
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof Member, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    // Client-side validation
    if (!teamName.trim()) {
      setErrorMsg("Team name is required.");
      setStatus("error");
      return;
    }

    const emails = members.map((m) => m.email.toLowerCase().trim());
    const unique = new Set(emails);
    if (unique.size !== emails.length) {
      setErrorMsg("Duplicate email addresses found. Each member must have a unique email.");
      setStatus("error");
      return;
    }

    for (const m of members) {
      if (!m.fullName || !m.email || !m.mobile || !m.college || !m.branch || !m.year) {
        setErrorMsg("All member fields are required.");
        setStatus("error");
        return;
      }
    }

    // TODO: Call server action / API to save to Supabase
    // This placeholder shows the structure — real persistence in Phase 4
    setErrorMsg("Registration backend not yet configured. Add Supabase credentials to enable.");
    setStatus("error");
  };

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Postgraduate"];

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <Shield className="w-9 h-9 text-[#1A1A1A] fill-[#1A1A1A]" />
            </div>
            <h1 className="font-display text-4xl font-black text-[#FFD700] mb-2">
              REGISTER YOUR TEAM
            </h1>
            <p className="text-[#A5C8A8] text-base">
              Assemble your squad — up to {EVENT.maxTeamSize} warriors including yourself.
            </p>
          </div>

          {/* Setup note */}
          <div className="mb-8 p-4 rounded-lg bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.25)] text-center">
            <p className="text-[#F5A623] text-xs font-bold tracking-wider uppercase mb-1">
              Backend Setup Required
            </p>
            <p className="text-[#6B8F6E] text-xs">
              Add Supabase credentials to .env.local to enable real data persistence.
              The form validates correctly — database save is wired in Phase 4.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Team info */}
            <div className="game-card p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-[#FFD700] mb-6 flex items-center gap-2">
                🏰 Team Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#A5C8A8] mb-1.5 font-medium">
                    Team Name <span className="text-[#F5A623]">*</span>
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="game-input"
                    placeholder="e.g. Code Crusaders"
                    maxLength={60}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#A5C8A8] mb-1.5 font-medium">
                    Team Description <span className="text-[#6B8F6E] text-xs">(optional)</span>
                  </label>
                  <textarea
                    value={teamDesc}
                    onChange={(e) => setTeamDesc(e.target.value)}
                    className="game-input resize-none h-20"
                    placeholder="A brief description of your team..."
                    maxLength={300}
                  />
                </div>
              </div>
            </div>

            {/* Members */}
            <div className="space-y-4">
              {members.map((member, index) => (
                <div key={index} className="game-card p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-lg font-bold text-[#FFD700] flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {index === 0 ? "Team Leader" : `Member ${index + 1}`}
                      {index === 0 && (
                        <span className="badge-gold text-xs ml-2">Leader</span>
                      )}
                    </h2>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeMember(index)}
                        className="text-[#6B8F6E] hover:text-[#F44336] transition-colors p-1"
                        aria-label="Remove member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#A5C8A8] mb-1.5 font-medium">
                        Full Name <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        type="text"
                        value={member.fullName}
                        onChange={(e) => updateMember(index, "fullName", e.target.value)}
                        className="game-input"
                        placeholder="Full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#A5C8A8] mb-1.5 font-medium">
                        Email Address <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) => updateMember(index, "email", e.target.value)}
                        className="game-input"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#A5C8A8] mb-1.5 font-medium">
                        Mobile Number <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={member.mobile}
                        onChange={(e) => updateMember(index, "mobile", e.target.value)}
                        className="game-input"
                        placeholder="+91 XXXXX XXXXX"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#A5C8A8] mb-1.5 font-medium">
                        College / University <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        type="text"
                        value={member.college}
                        onChange={(e) => updateMember(index, "college", e.target.value)}
                        className="game-input"
                        placeholder="e.g. MMMUT, Gorakhpur"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#A5C8A8] mb-1.5 font-medium">
                        Branch / Department <span className="text-[#F5A623]">*</span>
                      </label>
                      <input
                        type="text"
                        value={member.branch}
                        onChange={(e) => updateMember(index, "branch", e.target.value)}
                        className="game-input"
                        placeholder="e.g. Computer Science"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#A5C8A8] mb-1.5 font-medium">
                        Academic Year <span className="text-[#F5A623]">*</span>
                      </label>
                      <select
                        value={member.year}
                        onChange={(e) => updateMember(index, "year", e.target.value)}
                        className="game-input"
                        required
                      >
                        <option value="">Select year</option>
                        {years.map((y) => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add member button */}
              {members.length < EVENT.maxTeamSize && (
                <button
                  type="button"
                  onClick={addMember}
                  className="btn-outline-gold w-full py-3 gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Team Member ({members.length}/{EVENT.maxTeamSize})
                </button>
              )}

              {members.length === EVENT.maxTeamSize && (
                <p className="text-center text-xs text-[#6B8F6E] py-2">
                  Maximum team size of {EVENT.maxTeamSize} reached.
                </p>
              )}
            </div>

            {/* Error / Status */}
            {status === "error" && (
              <div className="p-4 rounded-lg bg-[rgba(183,28,28,0.15)] border border-[rgba(183,28,28,0.4)]">
                <p className="text-[#EF9A9A] text-sm">{errorMsg}</p>
              </div>
            )}

            {status === "success" && (
              <div className="p-4 rounded-lg bg-[rgba(76,175,80,0.15)] border border-[rgba(76,175,80,0.4)]">
                <p className="text-[#A5D6A7] text-sm font-semibold">
                  ✅ Your team has been successfully registered! Check your email for confirmation.
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-gold w-full justify-center py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Registering..." : "⚔ Register Team"}
            </button>

            <p className="text-center text-xs text-[#6B8F6E]">
              Already registered?{" "}
              <Link href="/login" className="text-[#F5A623] hover:underline">
                Sign in here
              </Link>
            </p>
          </form>

          <div className="text-center mt-8">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#6B8F6E] hover:text-[#A5C8A8] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to event site
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

