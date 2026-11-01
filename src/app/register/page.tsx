"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import MagneticButton from "@/components/effects/MagneticButton";
import {
  ArrowLeft,
  Crown,
  User,
  Hash,
  Mail,
  Phone,
  Users,
  Shield,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

interface MemberData {
  fullName: string;
  rollNumber: string;
  email: string;
  phone: string;
}

const emptyMember = (): MemberData => ({
  fullName: "",
  rollNumber: "",
  email: "",
  phone: "",
});

interface FormErrors {
  leader?: Partial<Record<keyof MemberData, string>>;
  member2?: Partial<Record<keyof MemberData, string>>;
  member3?: Partial<Record<keyof MemberData, string>>;
  duplicate?: string;
}

export default function RegisterPage() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Team size: 1, 2, or 3 (Leader is included)
  const [teamSize, setTeamSize] = useState<1 | 2 | 3>(3);

  // Member states (index 0 = Leader, index 1 = Member 02, index 2 = Member 03)
  const [leader, setLeader] = useState<MemberData>(emptyMember());
  const [member2, setMember2] = useState<MemberData>(emptyMember());
  const [member3, setMember3] = useState<MemberData>(emptyMember());

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedData, setSubmittedData] = useState<{
    teamSize: number;
    leader: MemberData;
    additionalMembers: MemberData[];
  } | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.play().catch(() => {});
    }
  }, []);

  const validateMember = (m: MemberData, roleName: string): Partial<Record<keyof MemberData, string>> => {
    const errs: Partial<Record<keyof MemberData, string>> = {};

    if (!m.fullName.trim()) {
      errs.fullName = `${roleName} name is required`;
    } else if (m.fullName.trim().length < 2) {
      errs.fullName = "Name must be at least 2 characters";
    }

    if (!m.rollNumber.trim()) {
      errs.rollNumber = "Roll number is required";
    }

    if (!m.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    const cleanPhone = m.phone.replace(/[\s\-()]/g, "");
    if (!m.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
      errs.phone = "Enter a valid 10-digit phone number";
    }

    return errs;
  };

  const handleValidation = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate Leader
    const leaderErrs = validateMember(leader, "Team Leader");
    if (Object.keys(leaderErrs).length > 0) {
      newErrors.leader = leaderErrs;
    }

    // Validate Member 2
    if (teamSize >= 2) {
      const m2Errs = validateMember(member2, "Member 02");
      if (Object.keys(m2Errs).length > 0) {
        newErrors.member2 = m2Errs;
      }
    }

    // Validate Member 3
    if (teamSize >= 3) {
      const m3Errs = validateMember(member3, "Member 03");
      if (Object.keys(m3Errs).length > 0) {
        newErrors.member3 = m3Errs;
      }
    }

    // Duplicate check among active members
    const activeMembers = [
      { role: "Team Leader", data: leader },
      ...(teamSize >= 2 ? [{ role: "Member 02", data: member2 }] : []),
      ...(teamSize >= 3 ? [{ role: "Member 03", data: member3 }] : []),
    ];

    const emails = activeMembers.map((m) => m.data.email.trim().toLowerCase()).filter(Boolean);
    const rolls = activeMembers.map((m) => m.data.rollNumber.trim().toLowerCase()).filter(Boolean);
    const phones = activeMembers.map((m) => m.data.phone.replace(/[\s\-()]/g, "")).filter(Boolean);

    if (new Set(emails).size !== emails.length) {
      newErrors.duplicate = "Duplicate email address detected. Each team member must have a unique email.";
    } else if (new Set(rolls).size !== rolls.length) {
      newErrors.duplicate = "Duplicate roll number detected. Each team member must have a unique roll number.";
    } else if (new Set(phones).size !== phones.length) {
      newErrors.duplicate = "Duplicate phone number detected. Each team member must have a unique phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(null);

    const isValid = handleValidation();
    if (!isValid) {
      // Scroll to first error smoothly
      const firstErrorEl = document.querySelector(".input-error, .text-rose-400");
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Prepare complete structured team registration data
    const additionalMembers: MemberData[] = [];
    if (teamSize >= 2) additionalMembers.push(member2);
    if (teamSize >= 3) additionalMembers.push(member3);

    const payload = {
      teamSize,
      leader,
      additionalMembers,
      registeredAt: new Date().toISOString(),
    };

    // Log payload for developer inspection
    console.log("JOBREADY Team Registration Payload Prepared:", payload);

    // Save prepared data to state for user feedback
    setSubmittedData({
      teamSize,
      leader,
      additionalMembers,
    });
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* ══════════════════════════════════════════════════════
          LAYER 0: BACKGROUND VIDEO (register.mp4)
          Fixed full-screen, object-fit: cover, z-index: 0
      ══════════════════════════════════════════════════════ */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 w-screen h-screen object-cover pointer-events-none"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src="/asset/register.mp4" type="video/mp4" />
      </video>

      {/* ══════════════════════════════════════════════════════
          LAYER 1: DARK OVERLAY
          Reduced opacity: ~0.26 base, max ~0.36 vignette
          Video colors, movement and details are clearly visible
      ══════════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.26) 0%, rgba(0, 0, 0, 0.36) 100%)",
        }}
      />
      {/* ══════════════════════════════════════════════════════
          LAYER 2: TOP BAR & NAVIGATION
      ══════════════════════════════════════════════════════ */}
      <header className="relative z-20 border-b border-[rgba(255,215,0,0.2)] bg-[rgba(14,9,4,0.85)] backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Back to Home Button */}
          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-semibold text-[#F5E6C8] hover:text-[#FFD700] hover:bg-[rgba(255,215,0,0.08)] border border-[rgba(200,160,40,0.3)] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#FFD700]" />
            <span>Back to Home</span>
          </Link>

          {/* Logo badge */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #FFE566, #F5A623, #8B4A00)",
                boxShadow: "0 0 12px rgba(255,180,0,0.35)",
              }}
            >
              <Crown className="w-5 h-5 text-[#2D0E00]" />
            </div>
            <span
              className="font-lilita text-lg sm:text-xl tracking-wider"
              style={{
                color: "#FFFFFF",
                textShadow: "-1px -1px 0 #2D0E00, 1px 1px 0 #2D0E00",
              }}
            >
              JOBREADY
            </span>
          </Link>

          {/* Event Date badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-cinzel text-[#C4A87A]">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
            <span>6 November 2026</span>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          3. REGISTRATION FORM CONTENT
      ══════════════════════════════════════════════════════ */}
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-10 pb-20">
        {/* Title Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 border border-[rgba(255,215,0,0.35)] bg-[rgba(20,12,4,0.7)]">
            <Shield className="w-4 h-4 text-[#FFD700]" />
            <span className="text-xs uppercase font-cinzel font-bold tracking-[0.2em] text-[#FFE566]">
              Official Event Registration
            </span>
          </div>

          <h1
            className="font-lilita text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wider mb-3"
            style={{
              color: "#FFE566",
              textShadow: `
                -2px -2px 0 #2D0E00, 2px -2px 0 #2D0E00,
                -2px 2px 0 #2D0E00, 2px 2px 0 #2D0E00,
                0 4px 0 #CC7800, 0 8px 24px rgba(0,0,0,0.75)
              `,
            }}
          >
            JOBREADY TEAM REGISTRATION
          </h1>

          <p
            className="font-cinzel text-sm sm:text-lg tracking-widest uppercase font-semibold"
            style={{ color: "#F5E6C8", textShadow: "0 2px 6px rgba(0,0,0,0.8)" }}
          >
            &ldquo;BUILD YOUR TEAM. PREPARE FOR BATTLE.&rdquo;
          </p>
        </div>

        {/* Main Semi-Transparent Form Panel */}
        <div
          className="rounded-2xl p-6 sm:p-10 relative overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(28, 18, 10, 0.88) 0%, rgba(18, 12, 6, 0.94) 100%)",
            border: "2px solid rgba(255, 215, 0, 0.4)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.85), 0 0 30px rgba(200, 130, 0, 0.2)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Top subtle golden shimmer border */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.8), transparent)",
            }}
          />

          <form onSubmit={handleSubmit} noValidate className="space-y-10">

            {/* ────────────────────────────────────────────────
                SECTION B: TEAM SIZE SELECTOR
            ──────────────────────────────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[rgba(200,130,0,0.2)] border border-[rgba(255,215,0,0.4)] flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#FFD700]" />
                </div>
                <div>
                  <h2 className="font-cinzel font-bold text-lg sm:text-xl text-[#FFF8E8] tracking-wider uppercase">
                    Select Team Size
                  </h2>
                  <p className="text-xs text-[#C4A87A]">
                    The leader is included in the selected team size (Max 3 members).
                  </p>
                </div>
              </div>

              {/* 3 Size Options */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                {([1, 2, 3] as const).map((size) => {
                  const isSelected = teamSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        setTeamSize(size);
                        setErrors({});
                      }}
                      className="relative p-3.5 sm:p-5 rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
                      style={{
                        background: isSelected
                          ? "linear-gradient(145deg, rgba(80, 40, 10, 0.9), rgba(50, 25, 5, 0.95))"
                          : "rgba(22, 14, 8, 0.7)",
                        border: isSelected
                          ? "2px solid #FFD700"
                          : "1.5px solid rgba(200, 160, 40, 0.25)",
                        boxShadow: isSelected
                          ? "0 0 20px rgba(255, 215, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)"
                          : "none",
                        transform: isSelected ? "translateY(-2px)" : "none",
                      }}
                    >
                      {/* Member count icon badge */}
                      <span className="text-xl sm:text-2xl mb-1.5 select-none">
                        {size === 1 ? "⚔️" : size === 2 ? "🛡️" : "👑"}
                      </span>

                      <span
                        className="font-cinzel font-black text-sm sm:text-lg leading-tight"
                        style={{ color: isSelected ? "#FFE566" : "#FFF8E8" }}
                      >
                        {size} {size === 1 ? "Member" : "Members"}
                      </span>

                      <span className="text-[0.65rem] sm:text-xs font-cinzel text-[#8B7355] mt-0.5">
                        {size === 1 ? "Solo Warrior" : size === 2 ? "Duo Squad" : "Trio Clan"}
                      </span>

                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FFD700] flex items-center justify-center shadow-md">
                          <CheckCircle2 className="w-4 h-4 text-[#2D0E00]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(200,160,40,0.3)] to-transparent" />

            {/* ────────────────────────────────────────────────
                SECTION A: TEAM LEADER DETAILS
            ──────────────────────────────────────────────── */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(255,215,0,0.15)] border border-[rgba(255,215,0,0.4)] flex items-center justify-center">
                    <Crown className="w-4 h-4 text-[#FFD700]" />
                  </div>
                  <div>
                    <h3 className="font-cinzel font-black text-base sm:text-lg text-[#FFE566] tracking-wider uppercase">
                      TEAM LEADER
                    </h3>
                    <p className="text-[0.7rem] sm:text-xs text-[#C4A87A]">Primary contact and team coordinator</p>
                  </div>
                </div>

                <span className="text-[0.65rem] font-cinzel font-bold px-2.5 py-1 rounded bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.3)] text-[#FFD700] uppercase tracking-wider">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Leader Name */}
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                    Team Leader Name <span className="text-[#FFD700]">*</span>
                  </label>
                  <div className="game-input-container">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                    <input
                      type="text"
                      value={leader.fullName}
                      onChange={(e) => {
                        setLeader({ ...leader, fullName: e.target.value });
                        if (errors.leader?.fullName) {
                          setErrors({ ...errors, leader: { ...errors.leader, fullName: undefined } });
                        }
                      }}
                      className={`game-input ${errors.leader?.fullName ? "input-error" : ""}`}
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  {errors.leader?.fullName && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.leader.fullName}
                    </p>
                  )}
                </div>

                {/* Leader Roll Number */}
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                    Roll Number <span className="text-[#FFD700]">*</span>
                  </label>
                  <div className="game-input-container">
                    <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                    <input
                      type="text"
                      value={leader.rollNumber}
                      onChange={(e) => {
                        setLeader({ ...leader, rollNumber: e.target.value });
                        if (errors.leader?.rollNumber) {
                          setErrors({ ...errors, leader: { ...errors.leader, rollNumber: undefined } });
                        }
                      }}
                      className={`game-input ${errors.leader?.rollNumber ? "input-error" : ""}`}
                      placeholder="e.g. 202301001"
                    />
                  </div>
                  {errors.leader?.rollNumber && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.leader.rollNumber}
                    </p>
                  )}
                </div>

                {/* Leader Email */}
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-[#FFD700]">*</span>
                  </label>
                  <div className="game-input-container">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                    <input
                      type="email"
                      value={leader.email}
                      onChange={(e) => {
                        setLeader({ ...leader, email: e.target.value });
                        if (errors.leader?.email) {
                          setErrors({ ...errors, leader: { ...errors.leader, email: undefined } });
                        }
                      }}
                      className={`game-input ${errors.leader?.email ? "input-error" : ""}`}
                      placeholder="e.g. leader@gmail.com"
                    />
                  </div>
                  {errors.leader?.email && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.leader.email}
                    </p>
                  )}
                </div>

                {/* Leader Phone */}
                <div>
                  <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-[#FFD700]">*</span>
                  </label>
                  <div className="game-input-container">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                    <input
                      type="tel"
                      value={leader.phone}
                      onChange={(e) => {
                        setLeader({ ...leader, phone: e.target.value });
                        if (errors.leader?.phone) {
                          setErrors({ ...errors, leader: { ...errors.leader, phone: undefined } });
                        }
                      }}
                      className={`game-input ${errors.leader?.phone ? "input-error" : ""}`}
                      placeholder="e.g. 9876543210"
                    />
                  </div>
                  {errors.leader?.phone && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.leader.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ────────────────────────────────────────────────
                SECTION C: ADDITIONAL TEAM MEMBERS (DYNAMIC)
            ──────────────────────────────────────────────── */}
            {teamSize >= 2 && (
              <>
                <div className="h-px bg-gradient-to-r from-transparent via-[rgba(200,160,40,0.3)] to-transparent" />

                {/* MEMBER 02 */}
                <div className="space-y-5 animate-float-up">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(200,160,40,0.15)] border border-[rgba(200,160,40,0.35)] flex items-center justify-center">
                        <User className="w-4 h-4 text-[#F5A623]" />
                      </div>
                      <div>
                        <h3 className="font-cinzel font-black text-base sm:text-lg text-[#F5A623] tracking-wider uppercase">
                          TEAM MEMBER 02
                        </h3>
                        <p className="text-[0.7rem] sm:text-xs text-[#C4A87A]">Second warrior of your squad</p>
                      </div>
                    </div>

                    <span className="text-[0.65rem] font-cinzel font-bold px-2.5 py-1 rounded bg-[rgba(245,166,35,0.1)] border border-[rgba(245,166,35,0.3)] text-[#F5A623] uppercase tracking-wider">
                      Required
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Member 2 Name */}
                    <div>
                      <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-[#F5A623]">*</span>
                      </label>
                      <div className="game-input-container">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                        <input
                          type="text"
                          value={member2.fullName}
                          onChange={(e) => {
                            setMember2({ ...member2, fullName: e.target.value });
                            if (errors.member2?.fullName) {
                              setErrors({ ...errors, member2: { ...errors.member2, fullName: undefined } });
                            }
                          }}
                          className={`game-input ${errors.member2?.fullName ? "input-error" : ""}`}
                          placeholder="e.g. Alex Smith"
                        />
                      </div>
                      {errors.member2?.fullName && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.member2.fullName}
                        </p>
                      )}
                    </div>

                    {/* Member 2 Roll Number */}
                    <div>
                      <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                        Roll Number <span className="text-[#F5A623]">*</span>
                      </label>
                      <div className="game-input-container">
                        <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                        <input
                          type="text"
                          value={member2.rollNumber}
                          onChange={(e) => {
                            setMember2({ ...member2, rollNumber: e.target.value });
                            if (errors.member2?.rollNumber) {
                              setErrors({ ...errors, member2: { ...errors.member2, rollNumber: undefined } });
                            }
                          }}
                          className={`game-input ${errors.member2?.rollNumber ? "input-error" : ""}`}
                          placeholder="e.g. 202301002"
                        />
                      </div>
                      {errors.member2?.rollNumber && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.member2.rollNumber}
                        </p>
                      )}
                    </div>

                    {/* Member 2 Email */}
                    <div>
                      <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-[#F5A623]">*</span>
                      </label>
                      <div className="game-input-container">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                        <input
                          type="email"
                          value={member2.email}
                          onChange={(e) => {
                            setMember2({ ...member2, email: e.target.value });
                            if (errors.member2?.email) {
                              setErrors({ ...errors, member2: { ...errors.member2, email: undefined } });
                            }
                          }}
                          className={`game-input ${errors.member2?.email ? "input-error" : ""}`}
                          placeholder="e.g. member2@gmail.com"
                        />
                      </div>
                      {errors.member2?.email && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.member2.email}
                        </p>
                      )}
                    </div>

                    {/* Member 2 Phone */}
                    <div>
                      <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-[#F5A623]">*</span>
                      </label>
                      <div className="game-input-container">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                        <input
                          type="tel"
                          value={member2.phone}
                          onChange={(e) => {
                            setMember2({ ...member2, phone: e.target.value });
                            if (errors.member2?.phone) {
                              setErrors({ ...errors, member2: { ...errors.member2, phone: undefined } });
                            }
                          }}
                          className={`game-input ${errors.member2?.phone ? "input-error" : ""}`}
                          placeholder="e.g. 9876543211"
                        />
                      </div>
                      {errors.member2?.phone && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.member2.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* MEMBER 03 */}
            {teamSize >= 3 && (
              <>
                <div className="h-px bg-gradient-to-r from-transparent via-[rgba(200,160,40,0.3)] to-transparent" />

                <div className="space-y-5 animate-float-up">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[rgba(200,160,40,0.15)] border border-[rgba(200,160,40,0.35)] flex items-center justify-center">
                        <User className="w-4 h-4 text-[#F5A623]" />
                      </div>
                      <div>
                        <h3 className="font-cinzel font-black text-base sm:text-lg text-[#F5A623] tracking-wider uppercase">
                          TEAM MEMBER 03
                        </h3>
                        <p className="text-[0.7rem] sm:text-xs text-[#C4A87A]">Third warrior of your squad</p>
                      </div>
                    </div>

                    <span className="text-[0.65rem] font-cinzel font-bold px-2.5 py-1 rounded bg-[rgba(245,166,35,0.1)] border border-[rgba(245,166,35,0.3)] text-[#F5A623] uppercase tracking-wider">
                      Required
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Member 3 Name */}
                    <div>
                      <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-[#F5A623]">*</span>
                      </label>
                      <div className="game-input-container">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                        <input
                          type="text"
                          value={member3.fullName}
                          onChange={(e) => {
                            setMember3({ ...member3, fullName: e.target.value });
                            if (errors.member3?.fullName) {
                              setErrors({ ...errors, member3: { ...errors.member3, fullName: undefined } });
                            }
                          }}
                          className={`game-input ${errors.member3?.fullName ? "input-error" : ""}`}
                          placeholder="e.g. Sarah Connor"
                        />
                      </div>
                      {errors.member3?.fullName && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.member3.fullName}
                        </p>
                      )}
                    </div>

                    {/* Member 3 Roll Number */}
                    <div>
                      <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                        Roll Number <span className="text-[#F5A623]">*</span>
                      </label>
                      <div className="game-input-container">
                        <Hash className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                        <input
                          type="text"
                          value={member3.rollNumber}
                          onChange={(e) => {
                            setMember3({ ...member3, rollNumber: e.target.value });
                            if (errors.member3?.rollNumber) {
                              setErrors({ ...errors, member3: { ...errors.member3, rollNumber: undefined } });
                            }
                          }}
                          className={`game-input ${errors.member3?.rollNumber ? "input-error" : ""}`}
                          placeholder="e.g. 202301003"
                        />
                      </div>
                      {errors.member3?.rollNumber && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.member3.rollNumber}
                        </p>
                      )}
                    </div>

                    {/* Member 3 Email */}
                    <div>
                      <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-[#F5A623]">*</span>
                      </label>
                      <div className="game-input-container">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                        <input
                          type="email"
                          value={member3.email}
                          onChange={(e) => {
                            setMember3({ ...member3, email: e.target.value });
                            if (errors.member3?.email) {
                              setErrors({ ...errors, member3: { ...errors.member3, email: undefined } });
                            }
                          }}
                          className={`game-input ${errors.member3?.email ? "input-error" : ""}`}
                          placeholder="e.g. member3@gmail.com"
                        />
                      </div>
                      {errors.member3?.email && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.member3.email}
                        </p>
                      )}
                    </div>

                    {/* Member 3 Phone */}
                    <div>
                      <label className="block text-xs font-cinzel font-semibold text-[#F5E6C8] uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-[#F5A623]">*</span>
                      </label>
                      <div className="game-input-container">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C87A00]" />
                        <input
                          type="tel"
                          value={member3.phone}
                          onChange={(e) => {
                            setMember3({ ...member3, phone: e.target.value });
                            if (errors.member3?.phone) {
                              setErrors({ ...errors, member3: { ...errors.member3, phone: undefined } });
                            }
                          }}
                          className={`game-input ${errors.member3?.phone ? "input-error" : ""}`}
                          placeholder="e.g. 9876543212"
                        />
                      </div>
                      {errors.member3?.phone && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.member3.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Duplicate error banner if detected */}
            {errors.duplicate && (
              <div className="p-4 rounded-xl bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.4)] flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-rose-300 font-sans">{errors.duplicate}</p>
              </div>
            )}

            {/* ────────────────────────────────────────────────
                SECTION 5: SUBMISSION STATUS & BACKEND NOTICE
            ──────────────────────────────────────────────── */}
            {submittedData && (
              <div
                className="p-6 rounded-xl border space-y-4 animate-float-up"
                style={{
                  background: "linear-gradient(135deg, rgba(20, 28, 15, 0.95), rgba(15, 20, 10, 0.98))",
                  borderColor: "rgba(76, 175, 80, 0.5)",
                  boxShadow: "0 0 25px rgba(76, 175, 80, 0.2)",
                }}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-cinzel font-black text-lg text-emerald-400">
                      Frontend Validation Successful!
                    </h4>
                    <p className="text-xs text-[#C4A87A] mt-1">
                      Team data has been structured and validated for {submittedData.teamSize}{" "}
                      {submittedData.teamSize === 1 ? "member" : "members"}.
                    </p>
                  </div>
                </div>

                {/* Clear transparent backend status notice */}
                <div
                  className="p-3.5 rounded-lg text-xs font-sans space-y-1.5"
                  style={{
                    background: "rgba(245, 166, 35, 0.08)",
                    border: "1px dashed rgba(245, 166, 35, 0.4)",
                  }}
                >
                  <p className="font-bold text-[#F5A623] flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    Backend API Integration Required for Database Storage
                  </p>
                  <p className="text-[#C4A87A] leading-relaxed">
                    No backend registration endpoint is configured yet in this project. The complete registration payload was successfully validated and output to the browser console. To persist data to a live database, connect a backend service (such as Supabase or a Next.js API route).
                  </p>
                </div>
              </div>
            )}

            {/* ────────────────────────────────────────────────
                REGISTER TEAM BUTTON (Uses You Blockhead font)
            ──────────────────────────────────────────────── */}
            <div className="pt-4 text-center">
              <MagneticButton strength={0.35} glowRadius={170}>
                <button
                  type="submit"
                  className="btn-game btn-register-team w-full sm:w-auto text-lg sm:text-xl px-12 sm:px-20 py-4 sm:py-5 uppercase tracking-wider cursor-pointer"
                >
                  REGISTER TEAM &nbsp;›
                </button>
              </MagneticButton>

              <p className="text-xs text-[#8B7355] font-cinzel mt-4 tracking-wider">
                Please double-check all member details before submitting.
              </p>
            </div>
          </form>
        </div>

        {/* Back Link at bottom */}
        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-cinzel text-[#C4A87A] hover:text-[#FFD700] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#FFD700]" />
            Return to JOBREADY Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
