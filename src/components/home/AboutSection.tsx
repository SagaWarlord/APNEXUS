"use client";

import { Code2, Zap, Trophy, Sword } from "lucide-react";

const HIGHLIGHTS = [
  "Build a website from scratch.",
  "Showcase your creativity.",
  "Compete for exciting prizes.",
  "Be part of the ultimate tech clash!",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 section-stone overflow-hidden">
      <div className="gold-divider absolute top-0 left-0 right-0" />

      {/* Decorative corner glows */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #FF8C00, transparent 70%)" }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none opacity-10"
        style={{ background: "radial-gradient(circle, #C87A00, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center mb-12">
          <div className="wood-banner text-base sm:text-lg">
            About the Event
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">

          {/* ── About Panel ── */}
          <div className="game-panel p-6 sm:p-8 flex flex-col gap-5">
            {/* Laptop / coder illustration area */}
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(80,30,0,0.6), rgba(40,15,0,0.8))",
                  border: "1.5px solid rgba(200,160,40,0.4)",
                  boxShadow: "0 0 20px rgba(100,80,0,0.2)",
                }}
              >
                <Code2 className="w-8 h-8" style={{ color: "#FFD700" }} />
              </div>
              <h3 className="section-heading text-xl sm:text-2xl">About the Event</h3>
            </div>

            <p className="text-base leading-relaxed" style={{ color: "#FFFFFF" }}>
              <span style={{ color: "#FFFFFF", fontWeight: 700 }}>JOBREADY</span> is a thrilling tech event
              where participants will showcase their creativity and coding skills by building a{" "}
              <span style={{ color: "#FFFFFF", fontWeight: 600 }}>website</span>.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "#FFFFFF" }}>
              Put your ideas, design, and logic to the test. Turn them into a working digital
              experience and stand a chance to win exciting prizes!
            </p>

            <div
              className="mt-auto p-4 rounded-lg"
              style={{
                background: "rgba(200,130,0,0.08)",
                border: "1px solid rgba(200,160,40,0.25)",
              }}
            >
              <p className="text-sm font-cinzel" style={{ color: "#FFFFFF" }}>
                📅 6 November 2026 &nbsp;·&nbsp; 9 AM – 9 PM &nbsp;·&nbsp; MMMUT, Gorakhpur
              </p>
            </div>
          </div>

          {/* ── Event Highlights Panel ── */}
          <div className="game-panel p-6 sm:p-8 flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(120,80,0,0.6), rgba(60,30,0,0.8))",
                  border: "1.5px solid rgba(200,160,40,0.4)",
                  boxShadow: "0 0 20px rgba(200,130,0,0.2)",
                }}
              >
                <Zap className="w-8 h-8" style={{ color: "#FFD700" }} />
              </div>
              <h3 className="section-heading text-xl sm:text-2xl">Event Highlights</h3>
            </div>

            <ul className="flex flex-col gap-3.5">
              {HIGHLIGHTS.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: "linear-gradient(135deg, #C87A00, #7A4500)",
                      border: "1px solid rgba(255,215,0,0.4)",
                    }}
                  >
                    <Trophy className="w-3.5 h-3.5" style={{ color: "#FFE566" }} />
                  </div>
                  <p className="text-base leading-relaxed" style={{ color: "#FFFFFF" }}>{item}</p>
                </li>
              ))}
            </ul>

            {/* Treasure chest decorative */}
            <div className="mt-auto text-right">
              <span className="text-4xl select-none opacity-40">🏆</span>
            </div>
          </div>
        </div>
      </div>

      <div className="gold-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
