"use client";

import { useRef } from "react";

const JOURNEY = [
  {
    step: "01",
    icon: "🎨",
    title: "FRONTEND CLASH",
    subtitle: "9:00 AM – 12:00 PM",
    desc: "Transform your ideas into a visually stunning, responsive and interactive frontend.",
    color: "#4CAF50",
  },
  {
    step: "02",
    icon: "⚙️",
    title: "FULL-STACK FORGE",
    subtitle: "12:00 PM – 6:00 PM",
    desc: "Connect your frontend with backend services, APIs and databases to build a complete product.",
    color: "#42A5F5",
  },
  {
    step: "03",
    icon: "🏆",
    title: "THE FINAL ARENA",
    subtitle: "6:00 PM – 9:00 PM",
    desc: "Present and defend your creation before the judges at the Multi Purpose Hall, MMMUT.",
    color: "#FFD700",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 section-bg-forest overflow-hidden">
      {/* Decorative top border */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="badge-gold inline-flex mb-4">⚔ About the Event</div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFF8E1] mb-6">
            FROM IDEA TO{" "}
            <span className="gradient-text-gold">REAL-WORLD PRODUCT.</span>
          </h2>
          <p className="text-[#A5C8A8] text-lg max-w-2xl mx-auto leading-relaxed">
            The complete journey of building a real-world web product — in one extraordinary day.
          </p>
        </div>

        {/* Event description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="game-card p-8 lg:p-10">
            <div className="text-4xl mb-4">🏰</div>
            <p className="text-[#A5C8A8] leading-relaxed mb-4">
              JobReady is a three-round website development challenge designed to take participants
              through the complete journey of building a real-world web product.
            </p>
            <p className="text-[#A5C8A8] leading-relaxed mb-4">
              The competition begins with <span className="text-[#66BB6A] font-semibold">Frontend Development</span>,
              where participants turn their ideas into visually engaging and responsive websites. In the second
              round, they take their projects further by developing the backend, integrating databases and APIs,
              and transforming their prototypes into fully working web applications.
            </p>
            <p className="text-[#A5C8A8] leading-relaxed">
              The final round brings participants together physically at the{" "}
              <span className="text-[#F5A623] font-semibold">Multi Purpose Hall, MMMUT, Gorakhpur</span>.
              Here, each team presents its completed website, demonstrates its features, explains its
              technology stack and answers questions from the judges.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: "🤝", title: "Teamwork", desc: "Maximum 3 members per team. Collaborate, build, test and deploy together." },
              { icon: "💡", title: "Creativity meets Engineering", desc: "We want participants to think like developers, build like engineers and present like professionals." },
              { icon: "🚀", title: "Complete Product Cycle", desc: "From initial interface to working application to professional presentation." },
              { icon: "⚔️", title: "Real Competition", desc: "Judged across three rounds by expert evaluators with configurable criteria." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 game-card p-5">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <div>
                  <h3 className="font-display font-bold text-[#FFD700] text-sm tracking-wider uppercase mb-1">{title}</h3>
                  <p className="text-[#A5C8A8] text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey steps */}
        <div>
          <h3 className="text-center font-display text-2xl font-bold text-[#FFF8E1] mb-10 tracking-wider">
            THE THREE-STAGE JOURNEY
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-0.5 bg-gradient-to-r from-[#4CAF50] via-[#42A5F5] to-[#FFD700] opacity-40" />

            {JOURNEY.map(({ step, icon, title, subtitle, desc, color }) => (
              <div key={step} className="game-card p-8 text-center relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border-2"
                  style={{ borderColor: color, background: `${color}18` }}
                >
                  {icon}
                </div>
                <div
                  className="font-display text-xs tracking-[0.2em] uppercase font-bold mb-2"
                  style={{ color }}
                >
                  ROUND {step}
                </div>
                <h3 className="font-display font-bold text-[#FFF8E1] text-lg mb-1">{title}</h3>
                <p className="text-xs text-[#6B8F6E] tracking-wider mb-3">{subtitle}</p>
                <p className="text-[#A5C8A8] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="mt-16 text-center">
          <blockquote className="font-display text-xl sm:text-2xl text-[#FFD700] italic max-w-3xl mx-auto leading-relaxed">
            "At JobReady, we don't just want participants to design websites. We want them to
            think like developers, build like engineers and present like professionals."
          </blockquote>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}

