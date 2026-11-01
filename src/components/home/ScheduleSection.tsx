"use client";

import { TRACKS, SCHEDULE } from "@/lib/constants";
import { Clock, Check } from "lucide-react";

const ROUND_COLORS = [
  { dot: "#4CAF50", line: "#4CAF50", bg: "#4CAF5018", border: "#4CAF5040" },
  { dot: "#42A5F5", line: "#42A5F5", bg: "#42A5F518", border: "#42A5F540" },
  { dot: "#FFD700", line: "#FFD700", bg: "#FFD70018", border: "#FFD70040" },
];

const ROUND_SUBACTIVITIES = [
  [],
  ["Submit website URL", "Submit GitHub repository", "Upload PPT/PDF presentation"],
  ["Live demonstration to judges", "Technical Q&A session", "Architecture walkthrough", "Judges' evaluation"],
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="relative py-24 section-bg-forest overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-gold inline-flex mb-4">📅 Event Day</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF8E1] mb-4">
            DAY{" "}
            <span className="gradient-text-gold">SCHEDULE</span>
          </h2>
          <p className="text-[#A5C8A8] text-lg">
            6 November 2026 — Multi Purpose Hall, MMMUT, Gorakhpur
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-7 top-8 bottom-8 w-0.5 timeline-line opacity-30" />

            <div className="space-y-0">
              {SCHEDULE.map((item, i) => {
                const colors = ROUND_COLORS[i];
                const subs = ROUND_SUBACTIVITIES[i];

                return (
                  <div key={i} className="relative flex gap-6 group">
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center z-10">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-lg border-2 flex-shrink-0 shadow-lg"
                        style={{ borderColor: colors.dot, background: colors.bg, boxShadow: `0 0 16px ${colors.bg}` }}
                      >
                        {i === 0 ? "🎨" : i === 1 ? "⚙️" : "🏆"}
                      </div>
                      {i < SCHEDULE.length - 1 && (
                        <div className="w-0.5 h-8 mt-1" style={{ background: colors.line, opacity: 0.3 }} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-8 flex-1">
                      <div
                        className="p-5 rounded-xl border transition-all group-hover:scale-[1.01]"
                        style={{ background: colors.bg, borderColor: colors.border }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-3.5 h-3.5" style={{ color: colors.dot }} />
                          <span className="text-xs font-bold tracking-wider" style={{ color: colors.dot }}>
                            {item.time}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-[#FFF8E1] text-lg mb-1">{item.label}</h3>
                        <p className="text-[#A5C8A8] text-sm mb-3">{item.sub}</p>

                        {subs.length > 0 && (
                          <ul className="space-y-1.5">
                            {subs.map((s) => (
                              <li key={s} className="flex items-center gap-2 text-xs text-[#A5C8A8]">
                                <Check className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors.dot }} />
                                {s}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tracks section */}
          <div>
            <h3 className="font-display text-2xl font-bold text-[#FFF8E1] mb-6 text-center lg:text-left">
              CHALLENGE <span className="gradient-text-gold">TRACKS</span>
            </h3>
            <p className="text-[#A5C8A8] text-sm mb-8 text-center lg:text-left">
              Three challenge categories judge different dimensions of your project.
            </p>

            <div className="space-y-4">
              {TRACKS.map(({ id, name, description, icon }) => (
                <div key={id} className="game-card p-6 flex gap-4 items-start">
                  <div className="text-3xl flex-shrink-0">{icon}</div>
                  <div>
                    <h4 className="font-display font-bold text-[#F5A623] text-sm tracking-wider uppercase mb-1">
                      {name}
                    </h4>
                    <p className="text-[#A5C8A8] text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Event date callout */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[rgba(245,166,35,0.1)] to-[rgba(245,166,35,0.05)] border border-[rgba(245,166,35,0.3)]">
              <p className="font-display text-center text-[#FFD700] font-bold text-lg">
                📅 6 November 2026
              </p>
              <p className="text-center text-[#A5C8A8] text-sm mt-1">
                9:00 AM – 9:00 PM IST
              </p>
              <p className="text-center text-[#6B8F6E] text-xs mt-1">
                Multi Purpose Hall, MMMUT, Gorakhpur
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

