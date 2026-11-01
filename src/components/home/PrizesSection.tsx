"use client";

const PRIZES = [
  {
    rank: "Champion",
    icon: "👑",
    emoji: "🏆",
    badge: "1st Place",
    color: "#FFD700",
    bg: "#FFD70012",
    border: "#FFD70040",
    glow: "rgba(255,215,0,0.25)",
    desc: "[Prize details to be announced by the organiser]",
    perks: ["Winner Trophy", "Certificate of Excellence", "Recognition across MMMUT community"],
    featured: true,
  },
  {
    rank: "Runner-up",
    icon: "🥈",
    emoji: "🛡️",
    badge: "2nd Place",
    color: "#C0C0C0",
    bg: "#C0C0C012",
    border: "#C0C0C040",
    glow: "rgba(192,192,192,0.15)",
    desc: "[Prize details to be announced by the organiser]",
    perks: ["Runner-up Trophy", "Certificate of Merit", "Recognition across MMMUT community"],
    featured: false,
  },
  {
    rank: "Best Innovation",
    icon: "💡",
    emoji: "⚡",
    badge: "Special Award",
    color: "#42A5F5",
    bg: "#42A5F512",
    border: "#42A5F540",
    glow: "rgba(66,165,245,0.2)",
    desc: "[Prize details to be announced by the organiser]",
    perks: ["Innovation Award", "Certificate of Innovation", "Recognition across MMMUT community"],
    featured: false,
  },
];

const SPONSORS = [
  { tier: "Technology Partner", name: "[Sponsor Name]", placeholder: true },
  { tier: "Community Partner", name: "[Sponsor Name]", placeholder: true },
  { tier: "Innovation Partner", name: "[Sponsor Name]", placeholder: true },
];

export default function PrizesSection() {
  return (
    <section id="prizes" className="relative py-24 section-bg-emerald overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
        <div className="absolute top-20 left-10 text-9xl">💎</div>
        <div className="absolute bottom-20 right-10 text-9xl">🏆</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-gold inline-flex mb-4">🏆 Rewards</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF8E1] mb-4">
            PRIZES &{" "}
            <span className="gradient-text-gold">GLORY</span>
          </h2>
          <p className="text-[#A5C8A8] text-base max-w-xl mx-auto">
            Compete for recognition, trophies and special awards. Prize values will be confirmed and updated by the organisers.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.2)] rounded-full">
            <span className="text-xs text-[#F5A623]">⚠ Prize details are placeholder — to be confirmed by organisers</span>
          </div>
        </div>

        {/* Prize cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PRIZES.map(({ rank, icon, emoji, badge, color, bg, border, glow, desc, perks, featured }) => (
            <div
              key={rank}
              className={`relative game-card p-8 text-center transition-all duration-300 hover:-translate-y-2 ${featured ? "md:-translate-y-4" : ""}`}
              style={{
                borderColor: border,
                background: `linear-gradient(135deg, ${bg}, rgba(15,30,16,0.95))`,
                boxShadow: featured ? `0 0 40px ${glow}, 0 8px 32px rgba(0,0,0,0.5)` : undefined,
              }}
            >
              {featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-[#FFD700] to-[#F5A623] text-[#1A1A1A]">
                    ⭐ Top Prize
                  </span>
                </div>
              )}

              {/* Trophy visual */}
              <div className="relative mb-4">
                <div
                  className="w-24 h-24 mx-auto rounded-2xl flex items-center justify-center text-5xl border-2"
                  style={{ borderColor: border, background: bg }}
                >
                  {icon}
                </div>
                <div className="absolute -bottom-2 -right-2 text-2xl">{emoji}</div>
              </div>

              <div
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3"
                style={{ color, background: bg, border: `1px solid ${border}` }}
              >
                {badge}
              </div>

              <h3 className="font-display text-2xl font-black mb-3" style={{ color }}>
                {rank}
              </h3>

              <p className="text-[#6B8F6E] text-sm italic mb-4">{desc}</p>

              <ul className="space-y-2 text-left">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-[#A5C8A8]">
                    <span style={{ color }}>✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sponsors */}
        <div>
          <h3 className="text-center font-display text-2xl font-bold text-[#FFF8E1] mb-2">
            SPONSORS & <span className="gradient-text-gold">PARTNERS</span>
          </h3>
          <p className="text-center text-[#6B8F6E] text-sm mb-8">
            [Placeholder — actual sponsors to be confirmed and updated by organisers]
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SPONSORS.map(({ tier, name }) => (
              <div key={tier} className="game-card p-6 text-center">
                <div className="w-20 h-12 mx-auto mb-3 rounded-lg bg-[rgba(245,166,35,0.08)] border border-[rgba(245,166,35,0.2)] flex items-center justify-center">
                  <span className="text-xs text-[#6B8F6E] italic">Logo</span>
                </div>
                <p className="text-[#F5A623] font-bold text-xs tracking-widest uppercase mb-1">{tier}</p>
                <p className="text-[#6B8F6E] text-sm italic">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

