"use client";

export default function LeaderboardSection() {
  return (
    <section id="leaderboard" className="relative py-20 section-stone overflow-hidden">
      <div className="gold-divider absolute top-0 left-0 right-0" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="wood-banner text-base sm:text-lg mb-10">Leaderboard</div>

        <div
          className="py-16 px-8 rounded-2xl"
          style={{
            background: "linear-gradient(145deg, #1C1510, #251D14)",
            border: "2px solid rgba(200,160,40,0.3)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          }}
        >
          {/* Crossed swords icon */}
          <div className="text-6xl mb-6 select-none">⚔️</div>

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

          {/* Decorative rank indicators */}
          <div className="flex items-end justify-center gap-4 mt-10 opacity-20 select-none">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🥈</span>
              <div className="w-12 h-16 rounded-t-lg" style={{ background: "#C0C0C0" }} />
              <span className="text-xs font-cinzel" style={{ color: "#C0C0C0" }}>2nd</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">👑</span>
              <div className="w-12 h-24 rounded-t-lg" style={{ background: "#FFD700" }} />
              <span className="text-xs font-cinzel" style={{ color: "#FFD700" }}>1st</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl">🥉</span>
              <div className="w-12 h-12 rounded-t-lg" style={{ background: "#CD7F32" }} />
              <span className="text-xs font-cinzel" style={{ color: "#CD7F32" }}>3rd</span>
            </div>
          </div>
        </div>
      </div>

      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
