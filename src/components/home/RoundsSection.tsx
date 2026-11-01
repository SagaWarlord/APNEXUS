"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUNDS } from "@/lib/constants";
import { Clock, Calendar, Upload, Award, ChevronDown } from "lucide-react";

const ROUND_ICONS = ["🎨", "⚙️", "🏆"];
const ROUND_COLORS = {
  emerald: { border: "#4CAF50", bg: "#4CAF5018", text: "#66BB6A", glow: "rgba(76,175,80,0.2)" },
  blue: { border: "#42A5F5", bg: "#42A5F518", text: "#64B5F6", glow: "rgba(66,165,245,0.2)" },
  gold: { border: "#FFD700", bg: "#FFD70018", text: "#FFD700", glow: "rgba(255,215,0,0.2)" },
};

export default function RoundsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="rounds" className="relative py-24 section-bg-emerald overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-emerald inline-flex mb-4">⚔ Competition Structure</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF8E1] mb-4">
            THE THREE{" "}
            <span className="gradient-text-gold">ROUNDS</span>
          </h2>
          <p className="text-[#A5C8A8] text-lg max-w-xl mx-auto">
            Three epic challenges. One glorious day. Build, forge and conquer.
          </p>
        </div>

        {/* Round cards */}
        <div className="space-y-6">
          {ROUNDS.map((round, i) => {
            const colors = ROUND_COLORS[round.color as keyof typeof ROUND_COLORS];
            const isExpanded = expanded === round.id;

            return (
              <div
                key={round.id}
                className="game-card overflow-hidden cursor-pointer group"
                style={{ borderColor: isExpanded ? colors.border : "rgba(245,166,35,0.15)" }}
                onClick={() => setExpanded(isExpanded ? null : round.id)}
              >
                {/* Card header */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-6">
                    {/* Round icon */}
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl flex items-center justify-center text-3xl sm:text-4xl border-2 transition-all"
                      style={{
                        borderColor: colors.border,
                        background: colors.bg,
                        boxShadow: isExpanded ? `0 0 20px ${colors.glow}` : "none",
                      }}
                    >
                      {ROUND_ICONS[i]}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                        <div>
                          <span
                            className="text-xs font-bold tracking-[0.2em] uppercase"
                            style={{ color: colors.text }}
                          >
                            {round.label}
                          </span>
                          <h3 className="font-display text-2xl sm:text-3xl font-black text-[#FFF8E1] mt-0.5">
                            {round.name}
                          </h3>
                        </div>
                        <div className="flex flex-col gap-1 text-right">
                          <div className="flex items-center gap-1.5 text-sm text-[#A5C8A8]">
                            <Clock className="w-4 h-4 text-[#F5A623]" />
                            <span>{round.startTime} – {round.endTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-[#A5C8A8]">
                            <Calendar className="w-4 h-4 text-[#F5A623]" />
                            <span>6 November 2026</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[#A5C8A8] text-sm sm:text-base leading-relaxed mb-4">
                        {round.description}
                      </p>

                      <div className="flex flex-wrap gap-2 items-center">
                        <div className="flex items-center gap-1.5 text-xs text-[#6B8F6E]">
                          <Upload className="w-3 h-3" />
                          <span>{round.submission}</span>
                        </div>
                        <button
                          className="ml-auto flex items-center gap-1 text-xs font-semibold tracking-wide"
                          style={{ color: colors.text }}
                        >
                          {isExpanded ? "Less" : "Details"}
                          <ChevronDown
                            className="w-4 h-4 transition-transform"
                            style={{ transform: isExpanded ? "rotate(180deg)" : "" }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div
                    className="px-6 sm:px-8 pb-8 pt-0 border-t"
                    style={{ borderColor: `${colors.border}30` }}
                  >
                    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Judging criteria */}
                      <div>
                        <h4 className="flex items-center gap-2 font-display text-sm font-bold text-[#F5A623] tracking-wider uppercase mb-3">
                          <Award className="w-4 h-4" />
                          Judging Criteria
                        </h4>
                        <ul className="space-y-2">
                          {round.criteria.map((c) => (
                            <li key={c} className="flex items-center gap-2 text-sm text-[#A5C8A8]">
                              <span
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: colors.border }}
                              />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Submission info */}
                      <div>
                        <h4 className="flex items-center gap-2 font-display text-sm font-bold text-[#F5A623] tracking-wider uppercase mb-3">
                          <Upload className="w-4 h-4" />
                          Submission
                        </h4>
                        <p className="text-sm text-[#A5C8A8] leading-relaxed">
                          {round.submission}
                        </p>
                        {round.id === 3 && (
                          <div className="mt-3 p-3 rounded-lg bg-[rgba(255,215,0,0.05)] border border-[rgba(255,215,0,0.2)]">
                            <p className="text-xs text-[#A5C8A8]">
                              📍 <span className="text-[#FFD700]">Venue:</span> Multi Purpose Hall, MMMUT, Gorakhpur
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/register" className="btn-gold">
            ⚔ Register Your Team Now
          </Link>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

