"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Upload, Award, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CinematicReveal from "@/components/effects/CinematicReveal";
import TiltCard from "@/components/effects/TiltCard";
import MagneticButton from "@/components/effects/MagneticButton";

const ROUNDS = [
  {
    id: 1,
    label: "Round 01",
    name: "FRONTEND BATTLE",
    time: "9 AM – 12 PM",
    icon: "🎨",
    colorClass: "round-card-1",
    accentColor: "#4CAF50",
    bgAccent: "rgba(76,175,80,0.08)",
    description: "Build the foundation. Create a visually engaging, responsive and interactive frontend website that showcases your creativity and design skills.",
    submission: "Live frontend website URL",
    criteria: ["UI/UX Design", "Visual Creativity", "Responsiveness", "Frontend Functionality"],
  },
  {
    id: 2,
    label: "Round 02",
    name: "FULL-STACK BATTLE",
    time: "12 PM – 6 PM",
    icon: "⚙️",
    colorClass: "round-card-2",
    accentColor: "#F5A623",
    bgAccent: "rgba(245,166,35,0.08)",
    description: "Bring your project to life. Extend your frontend with backend functionality, databases, APIs and all required features to make a complete working product.",
    submission: "Final website URL · GitHub URL · PPT/PDF",
    criteria: ["Backend Implementation", "Database Integration", "API Design", "Product Completeness"],
  },
  {
    id: 3,
    label: "Round 03",
    name: "FINAL BATTLE",
    time: "6 PM – 9 PM",
    icon: "🏆",
    colorClass: "round-card-3",
    accentColor: "#FFD700",
    bgAccent: "rgba(255,215,0,0.08)",
    description: "The ultimate showdown. Physically present your complete project at MMMUT, Gorakhpur. Demonstrate features, explain your architecture and answer judges' questions.",
    submission: "Physical presentation at MMMUT",
    criteria: ["Live Demonstration", "Technical Understanding", "Innovation", "Presentation Quality"],
  },
];

export default function RoundsSection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="rounds" className="relative py-20 section-dark overflow-hidden scroll-mt-20">
      <div className="gold-divider absolute top-0 left-0 right-0" />

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, var(--theme-rounds-glow) 0%, transparent 60%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <CinematicReveal variant="mask" className="text-center mb-14">
          <div className="wood-banner text-base sm:text-lg mb-2">Competition Rounds</div>
          <p className="text-sm sm:text-base mt-6" style={{ color: "#9B7A40" }}>
            Three epic battles — one extraordinary day.
          </p>
        </CinematicReveal>

        {/* Round cards */}
        <div className="space-y-5">
          {ROUNDS.map((round, idx) => {
            const isOpen = expanded === round.id;
            return (
              <CinematicReveal key={round.id} variant="scale-blur" delay={idx * 0.15}>
                <TiltCard maxTilt={4} glareOpacity={0.15}>
                  <div
                    className={`round-card ${round.colorClass} cursor-pointer transition-colors duration-300`}
                    style={{
                      borderColor: isOpen ? round.accentColor + "99" : "rgba(200,160,40,0.3)",
                      boxShadow: isOpen ? `0 8px 32px ${round.accentColor}25` : undefined,
                    }}
                    onClick={() => setExpanded(isOpen ? null : round.id)}
                  >
                    {/* Header row */}
                    <div className="flex items-center gap-5 p-6 sm:p-8">
                      {/* Icon */}
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 border-2 transition-transform duration-300 group-hover:scale-105"
                        style={{
                          borderColor: round.accentColor + "60",
                          background: round.bgAccent,
                          boxShadow: isOpen ? `0 0 20px ${round.accentColor}30` : "none",
                        }}
                      >
                        {round.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-cinzel tracking-[0.2em] uppercase mb-1"
                              style={{ color: round.accentColor }}>
                              {round.label}
                            </p>
                            <h3 className="font-cinzel font-black text-xl sm:text-2xl lg:text-3xl"
                              style={{ color: "#F5E6C8", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                              {round.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                            style={{ background: round.bgAccent, border: `1px solid ${round.accentColor}40` }}>
                            <Clock className="w-4 h-4" style={{ color: round.accentColor }} />
                            <span className="text-sm font-cinzel font-bold" style={{ color: round.accentColor }}>
                              {round.time}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm mt-2 leading-relaxed hidden sm:block" style={{ color: "#C4A878" }}>
                          {round.description}
                        </p>
                      </div>

                      <ChevronDown
                        className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                        style={{
                          color: round.accentColor,
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    </div>

                    {/* Description (mobile only visible here) */}
                    <p className="text-sm px-6 pb-4 sm:hidden leading-relaxed" style={{ color: "#C4A878" }}>
                      {round.description}
                    </p>

                    {/* Expanded details with smooth height animation */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                          className="overflow-hidden"
                        >
                          <div
                            className="px-6 sm:px-8 pb-8 border-t grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6"
                            style={{ borderColor: round.accentColor + "25" }}
                          >
                            {/* Criteria */}
                            <div>
                              <h4 className="font-cinzel text-sm font-bold tracking-wider uppercase mb-3 flex items-center gap-2"
                                style={{ color: "#FFD700" }}>
                                <Award className="w-4 h-4" /> Judging Criteria
                              </h4>
                              <ul className="space-y-2">
                                {round.criteria.map((c) => (
                                  <li key={c} className="flex items-center gap-2 text-sm" style={{ color: "#C4A878" }}>
                                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                      style={{ background: round.accentColor }} />
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Submission */}
                            <div>
                              <h4 className="font-cinzel text-sm font-bold tracking-wider uppercase mb-3 flex items-center gap-2"
                                style={{ color: "#FFD700" }}>
                                <Upload className="w-4 h-4" /> Submission
                              </h4>
                              <p className="text-sm leading-relaxed" style={{ color: "#C4A878" }}>{round.submission}</p>
                              {round.id === 3 && (
                                <div className="mt-3 p-3 rounded-lg"
                                  style={{ background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)" }}>
                                  <p className="text-xs" style={{ color: "#C4A030" }}>
                                    📍 Multi Purpose Hall, MMMUT, Gorakhpur
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </TiltCard>
              </CinematicReveal>
            );
          })}
        </div>

        {/* CTA -> /register */}
        <CinematicReveal variant="fade-up" delay={0.3} className="text-center mt-12">
          <MagneticButton strength={0.35} glowRadius={130}>
            <Link
              href="/register"
              className="btn-game text-sm px-8 py-3 inline-block"
            >
              ⚔ Register for the Battle
            </Link>
          </MagneticButton>
        </CinematicReveal>
      </div>

      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
