"use client";

import CinematicReveal from "@/components/effects/CinematicReveal";
import TiltCard from "@/components/effects/TiltCard";
import ParallaxElement from "@/components/effects/ParallaxElement";

const PRIZES = [
  {
    position: "1st",
    title: "Champion",
    icon: "👑",
    chest: "🏆",
    color: "#FFD700",
    bg: "rgba(255,215,0,0.08)",
    border: "rgba(255,215,0,0.45)",
    glow: "rgba(255,215,0,0.25)",
    featured: true,
    placeholder: "Exciting rewards await the champion.",
  },
  {
    position: "2nd",
    title: "Runner-up",
    icon: "🥈",
    chest: "🛡️",
    color: "#C0C0C0",
    bg: "rgba(192,192,192,0.07)",
    border: "rgba(192,192,192,0.3)",
    glow: "rgba(192,192,192,0.1)",
    featured: false,
    placeholder: "Exciting rewards await the runner-up.",
  },
  {
    position: "Special",
    title: "Best Innovation",
    icon: "💡",
    chest: "⚡",
    color: "#F5A623",
    bg: "rgba(245,166,35,0.08)",
    border: "rgba(245,166,35,0.35)",
    glow: "rgba(245,166,35,0.15)",
    featured: false,
    placeholder: "Special award for the most innovative project.",
  },
];

export default function PrizesSection() {
  return (
    <section id="prizes" className="relative py-20 section-dark overflow-hidden scroll-mt-20">
      <div className="gold-divider absolute top-0 left-0 right-0" />

      {/* Decorative with Parallax */}
      <ParallaxElement speed={35} className="absolute bottom-8 left-4 text-8xl opacity-10 select-none pointer-events-none">
        💎
      </ParallaxElement>
      <ParallaxElement speed={-35} className="absolute top-8 right-4 text-8xl opacity-10 select-none pointer-events-none">
        🏆
      </ParallaxElement>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(200,122,0,0.08) 0%, transparent 60%)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <CinematicReveal variant="mask" className="text-center mb-14">
          <div className="wood-banner text-base sm:text-lg">Prizes & Glory</div>
          <p className="text-sm sm:text-base mt-6" style={{ color: "#9B7A40" }}>
            Compete. Conquer. Claim your rewards.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-xs"
            style={{ background: "rgba(200,130,0,0.08)", border: "1px solid rgba(200,160,40,0.2)", color: "#9B7A40" }}>
            ⚠ Prize details will be announced by the organisers
          </div>
        </CinematicReveal>

        {/* Prize cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRIZES.map(({ position, title, icon, chest, color, bg, border, glow, featured, placeholder }, idx) => (
            <CinematicReveal key={title} variant="scale-blur" delay={idx * 0.15} className="h-full">
              <TiltCard maxTilt={6} glareOpacity={featured ? 0.3 : 0.18} className="h-full">
                <div
                  className="relative text-center h-full flex flex-col justify-between"
                  style={{
                    background: `linear-gradient(145deg, #1C1510, #251D14)`,
                    border: `2px solid ${border}`,
                    borderRadius: "14px",
                    boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 ${featured ? "40px" : "20px"} ${glow}`,
                  }}
                >
                  {/* Top badge */}
                  {featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-4 py-1 rounded-full text-xs font-cinzel font-black tracking-wider uppercase text-[#1A0800] shadow-[0_0_12px_rgba(255,215,0,0.6)]"
                        style={{ background: "linear-gradient(90deg, #FFE566, #F5A623, #FFE566)" }}>
                        ⭐ Top Prize
                      </span>
                    </div>
                  )}

                  <div className="p-8 flex flex-col items-center flex-1 justify-between">
                    {/* Treasure chest / icon */}
                    <div>
                      <div className="relative mb-5 mx-auto w-24 h-24">
                        <div
                          className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl border-2 mx-auto transition-transform duration-300 group-hover:scale-105"
                          style={{ borderColor: border, background: bg, boxShadow: `0 0 20px ${glow}` }}
                        >
                          {icon}
                        </div>
                        <div className="absolute -bottom-2 -right-1 text-2xl">{chest}</div>
                      </div>

                      {/* Position badge */}
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-cinzel font-bold tracking-wider uppercase mb-3"
                        style={{ color, background: bg, border: `1px solid ${border}` }}>
                        {position} Place
                      </div>

                      <h3 className="font-cinzel font-black text-2xl mb-4" style={{ color }}>
                        {title}
                      </h3>
                    </div>

                    {/* Placeholder reward text */}
                    <div className="p-4 rounded-xl w-full mt-4"
                      style={{ background: "rgba(0,0,0,0.25)", border: `1px solid ${border}40` }}>
                      <p className="text-sm italic leading-relaxed" style={{ color: "#9B7A40" }}>
                        {placeholder}
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </CinematicReveal>
          ))}
        </div>

        {/* Golden note */}
        <p className="text-center text-xs mt-10 font-cinzel tracking-wider" style={{ color: "#6B5030" }}>
          🏅 All participants receive a Certificate of Participation
        </p>
      </div>

      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
