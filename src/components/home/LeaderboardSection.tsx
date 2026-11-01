"use client";

import { motion } from "framer-motion";
import CinematicReveal from "@/components/effects/CinematicReveal";
import TiltCard from "@/components/effects/TiltCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function LeaderboardSection() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="leaderboard" className="relative py-20 section-stone overflow-hidden scroll-mt-20">
      <div className="gold-divider absolute top-0 left-0 right-0" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <CinematicReveal variant="mask" className="mb-10">
          <div className="wood-banner text-base sm:text-lg">Leaderboard</div>
        </CinematicReveal>

        <CinematicReveal variant="scale-blur" delay={0.15}>
          <TiltCard maxTilt={5} glareOpacity={0.15}>
            <div
              className="py-16 px-8 rounded-2xl"
              style={{
                background: "linear-gradient(145deg, var(--theme-bg-card), var(--theme-bg-card-secondary))",
                border: "2px solid rgba(200,160,40,0.3)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              {/* Crossed swords icon with breathing glow */}
              <div className="text-6xl mb-6 select-none animate-float-up inline-block" style={{ filter: "drop-shadow(0 0 16px rgba(255,215,0,0.3))" }}>
                ⚔️
              </div>

              <h3
                className="font-cinzel font-black text-2xl sm:text-3xl mb-4"
                style={{ color: "#FFD700", textShadow: "0 2px 12px rgba(255,180,0,0.3)" }}
              >
                THE BATTLE IS UNDERWAY
              </h3>
              <p className="text-base sm:text-lg mb-2" style={{ color: "#C4A878" }}>
                Results will be revealed after the event.
              </p>
              <p className="text-sm" style={{ color: "#6B5030" }}>
                Rankings are published by the organisers after each round concludes.
              </p>

              {/* Decorative rank indicators with progressive upward emergence */}
              <div className="flex items-end justify-center gap-4 mt-10 opacity-40 select-none">
                {/* 2nd Place */}
                <motion.div
                  initial={prefersReduced ? {} : { scaleY: 0, opacity: 0 }}
                  whileInView={prefersReduced ? {} : { scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
                  style={{ originY: 1 }}
                  className="flex flex-col items-center gap-1 transition-transform duration-300 hover:scale-105"
                >
                  <span className="text-2xl">🥈</span>
                  <div className="w-12 h-16 rounded-t-lg" style={{ background: "#C0C0C0" }} />
                  <span className="text-xs font-cinzel" style={{ color: "#C0C0C0" }}>2nd</span>
                </motion.div>

                {/* 1st Place */}
                <motion.div
                  initial={prefersReduced ? {} : { scaleY: 0, opacity: 0 }}
                  whileInView={prefersReduced ? {} : { scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.45, ease: "backOut" }}
                  style={{ originY: 1 }}
                  className="flex flex-col items-center gap-1 transition-transform duration-300 hover:scale-105"
                >
                  <span className="text-2xl">👑</span>
                  <div className="w-12 h-24 rounded-t-lg" style={{ background: "#FFD700", boxShadow: "0 0 16px rgba(255,215,0,0.4)" }} />
                  <span className="text-xs font-cinzel" style={{ color: "#FFD700" }}>1st</span>
                </motion.div>

                {/* 3rd Place */}
                <motion.div
                  initial={prefersReduced ? {} : { scaleY: 0, opacity: 0 }}
                  whileInView={prefersReduced ? {} : { scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.6, ease: "backOut" }}
                  style={{ originY: 1 }}
                  className="flex flex-col items-center gap-1 transition-transform duration-300 hover:scale-105"
                >
                  <span className="text-2xl">🥉</span>
                  <div className="w-12 h-12 rounded-t-lg" style={{ background: "#CD7F32" }} />
                  <span className="text-xs font-cinzel" style={{ color: "#CD7F32" }}>3rd</span>
                </motion.div>
              </div>
            </div>
          </TiltCard>
        </CinematicReveal>
      </div>

      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
