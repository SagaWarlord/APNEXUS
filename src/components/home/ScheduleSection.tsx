"use client";

import { Clock } from "lucide-react";

const TIMELINE = [
  {
    time: "9:00 AM",
    event: "Round 1 Begins",
    sub: "Frontend Battle kicks off",
    icon: "🎨",
    color: "#4CAF50",
    bg: "rgba(76,175,80,0.1)",
    border: "rgba(76,175,80,0.4)",
  },
  {
    time: "12:00 PM",
    event: "Round 2 Begins",
    sub: "Full-Stack Battle · Round 1 submissions close",
    icon: "⚙️",
    color: "#F5A623",
    bg: "rgba(245,166,35,0.1)",
    border: "rgba(245,166,35,0.4)",
  },
  {
    time: "6:00 PM",
    event: "Final Battle Begins",
    sub: "Round 2 submissions close · Physical presentations start",
    icon: "🏆",
    color: "#FFD700",
    bg: "rgba(255,215,0,0.1)",
    border: "rgba(255,215,0,0.4)",
  },
  {
    time: "9:00 PM",
    event: "Event Concludes",
    sub: "Results announced · Prizes awarded",
    icon: "🎉",
    color: "#FF6B35",
    bg: "rgba(255,107,53,0.1)",
    border: "rgba(255,107,53,0.4)",
  },
];

export default function ScheduleSection() {
  return (
    <section id="schedule" className="relative py-20 section-stone overflow-hidden">
      <div className="gold-divider absolute top-0 left-0 right-0" />

      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{ background: "radial-gradient(ellipse at 80% 50%, #FF8C00, transparent 60%)" }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="wood-banner text-base sm:text-lg">Event Schedule</div>
          <p className="text-sm sm:text-base mt-6" style={{ color: "#9B7A40" }}>
            6 November 2026 · Multi Purpose Hall, MMMUT, Gorakhpur
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <div
            className="absolute left-[27px] sm:left-1/2 top-8 bottom-8 w-0.5 -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, #4CAF50, #F5A623, #FFD700, #FF6B35)", opacity: 0.35 }}
          />

          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className={`relative flex gap-4 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>

                {/* Content card */}
                <div className={`w-full sm:w-[calc(50%-44px)] ${i % 2 === 0 ? "sm:pr-8" : "sm:pl-8"} pb-8`}>
                  <div
                    className="p-5 rounded-xl transition-all hover:-translate-y-1"
                    style={{
                      background: item.bg,
                      border: `1.5px solid ${item.border}`,
                      boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 12px ${item.bg}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4" style={{ color: item.color }} />
                      <span className="font-cinzel font-black text-lg" style={{ color: item.color }}>
                        {item.time}
                      </span>
                    </div>
                    <h3 className="font-cinzel font-bold text-base sm:text-lg mb-1" style={{ color: "#F5E6C8" }}>
                      {item.event}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: "#9B7A40" }}>{item.sub}</p>
                  </div>
                </div>

                {/* Timeline dot (desktop centre, mobile left) */}
                <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-4 z-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl border-2 ml-0 sm:ml-0"
                    style={{
                      background: `linear-gradient(135deg, ${item.bg}, rgba(20,12,4,0.9))`,
                      borderColor: item.border,
                      boxShadow: `0 0 16px ${item.color}50, 0 4px 12px rgba(0,0,0,0.5)`,
                    }}
                  >
                    {item.icon}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden sm:block w-[calc(50%-44px)]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
