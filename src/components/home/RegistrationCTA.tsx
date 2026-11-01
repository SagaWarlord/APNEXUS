"use client";

import Link from "next/link";
import CinematicReveal from "@/components/effects/CinematicReveal";
import MagneticButton from "@/components/effects/MagneticButton";
import ParallaxElement from "@/components/effects/ParallaxElement";

export default function RegistrationCTA() {
  return (
    <section id="register" className="relative py-20 overflow-hidden scroll-mt-20">
      <div className="gold-divider absolute top-0 left-0 right-0" />

      {/* Warm atmospheric background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 0%,   rgba(180,90,0,0.25) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 100%, rgba(120,50,0,0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 100%, rgba(100,40,0,0.15) 0%, transparent 50%),
            linear-gradient(180deg, #1E1510 0%, #2A1C0E 50%, #1E1510 100%)
          `,
        }}
      />

      {/* Decorative corner gems with parallax */}
      <ParallaxElement speed={30} className="absolute top-6 left-6 text-4xl opacity-20 select-none rotate-[-15deg] pointer-events-none">
        💎
      </ParallaxElement>
      <ParallaxElement speed={-30} className="absolute top-6 right-6 text-4xl opacity-20 select-none rotate-[15deg] pointer-events-none">
        💎
      </ParallaxElement>
      <ParallaxElement speed={40} className="absolute bottom-6 left-6 text-3xl opacity-15 select-none pointer-events-none">
        🗡️
      </ParallaxElement>
      <ParallaxElement speed={-40} className="absolute bottom-6 right-6 text-3xl opacity-15 select-none pointer-events-none">
        🗡️
      </ParallaxElement>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <CinematicReveal variant="mask">
          {/* Wooden top banner */}
          <div className="wood-banner text-base sm:text-xl mb-8">
            ⚔ Ready for the Battle? ⚔
          </div>
        </CinematicReveal>

        <CinematicReveal variant="scale-blur" delay={0.1}>
          {/* Main heading */}
          <h2
            className="font-lilita mb-4 leading-tight"
            style={{
              fontSize: "clamp(2.2rem, 7vw, 5rem)",
              color: "#FFE566",
              textShadow: `
                -2px -2px 0 #2D0E00, 2px -2px 0 #2D0E00,
                -2px 2px 0 #2D0E00,  2px  2px 0 #2D0E00,
                0 3px 0 #CC7800, 0 4px 0 #A05800, 0 5px 0 #7C4200,
                0 10px 20px rgba(0,0,0,0.7)
              `,
              letterSpacing: "0.04em",
            }}
          >
            READY FOR THE BATTLE?
          </h2>

          <p className="text-base sm:text-xl leading-relaxed mb-10" style={{ color: "#C4A878" }}>
            Build your base. Show your skills.{" "}
            <span style={{ color: "#FFD700", fontWeight: 700 }}>Conquer the code.</span>
          </p>
        </CinematicReveal>

        {/* Stats row */}
        <CinematicReveal variant="fade-up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {[
              { icon: "📅", label: "Event Date", value: "6 November 2026" },
              { icon: "👥", label: "Team Size",  value: "1–3 Members" },
              { icon: "📍", label: "Venue",      value: "MMMUT, Gorakhpur" },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl transition-transform duration-300 hover:scale-105"
                style={{
                  background: "rgba(20,12,4,0.6)",
                  border: "1.5px solid rgba(200,160,40,0.35)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                }}
              >
                <span className="text-xl">{icon}</span>
                <div className="text-left">
                  <p className="text-[0.6rem] font-cinzel tracking-wider uppercase" style={{ color: "#9B7A40" }}>{label}</p>
                  <p className="text-sm font-cinzel font-bold" style={{ color: "#FFD700" }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </CinematicReveal>

        {/* CTA Button -> Navigates to /register with Magnetic 3D & Cursor Light */}
        <CinematicReveal variant="fade-up" delay={0.3}>
          <MagneticButton strength={0.4} glowRadius={160}>
            <Link
              href="/register"
              className="btn-game text-lg sm:text-xl px-12 sm:px-16 py-4 sm:py-5 inline-block"
            >
              ⚔ REGISTER NOW ›
            </Link>
          </MagneticButton>
        </CinematicReveal>

        <p className="text-xs mt-6 font-cinzel tracking-wider" style={{ color: "#6B5030" }}>
          Assemble your squad and join the competition.
        </p>
      </div>

      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
