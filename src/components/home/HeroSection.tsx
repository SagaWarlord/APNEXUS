"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, ChevronDown } from "lucide-react";
import MagneticButton from "@/components/effects/MagneticButton";
import TiltCard from "@/components/effects/TiltCard";
import CinematicReveal from "@/components/effects/CinematicReveal";

/* Countdown target */
const BATTLE_TARGET_MS = new Date("2026-11-06T09:00:00+05:30").getTime();

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, Math.floor((BATTLE_TARGET_MS - Date.now()) / 1000));
      setT({
        d: Math.floor(diff / 86400),
        h: Math.floor((diff % 86400) / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function pad(n: number) { return String(n).padStart(2, "0"); }

/* Info panels */
const INFO_PANELS = [
  { icon: Calendar, label: "Event Date",  value: "6th November, 2026" },
  { icon: Clock,    label: "Timings",     value: "9 AM – 9 PM" },
  { icon: MapPin,   label: "Venue",       value: "MMMUT, Gorakhpur", sub: "Multi Purpose Hall" },
  { icon: Users,    label: "Team Size",   value: "1–3 Members" },
];

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const { d, h, m, s } = useCountdown();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {}); // auto-play may be blocked; silent fail
  }, []);

  const scrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden scroll-mt-20"
    >
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {/* Fallback gradient (shown while video loads or if unavailable) */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 60% 30%, rgba(150,60,0,0.6) 0%, transparent 55%),
              radial-gradient(ellipse at 20% 70%, rgba(80,20,80,0.5) 0%, transparent 50%),
              linear-gradient(180deg,
                #3D2010 0%,
                #2A1508 25%,
                #1E1008 50%,
                #140B04 75%,
                #0A0602 100%
              )
            `,
          }}
        />

        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none"
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            opacity: videoReady ? 1 : 0,
            zIndex: 1,
          }}
        >
          <source src="/asset/battlefield.mp4" type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        {/* Bottom fade — text area readability */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `
              linear-gradient(180deg,
                rgba(10,6,2,0.25)  0%,
                rgba(10,6,2,0.15) 30%,
                rgba(10,6,2,0.30) 60%,
                rgba(10,6,2,0.70) 82%,
                rgba(10,6,2,0.95) 100%
              )
            `,
          }}
        />
        {/* Vignette sides */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg,
                rgba(0,0,0,0.45) 0%,
                transparent 25%,
                transparent 75%,
                rgba(0,0,0,0.45) 100%
              )
            `,
          }}
        />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 px-4 sm:px-6 lg:px-8 pt-28 pb-6 text-center">

        {/* CODE • BUILD • COMPETE eyebrow */}
        <CinematicReveal variant="fade-down" delay={0.1} duration={0.6}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 sm:w-24" style={{ background: "linear-gradient(90deg, transparent, rgba(200,160,40,0.6), transparent)" }} />
            <span className="font-eyebrow text-xs sm:text-sm">
              Code &bull; Build &bull; Compete
            </span>
            <div className="h-px flex-1 sm:w-24" style={{ background: "linear-gradient(270deg, transparent, rgba(200,160,40,0.6), transparent)" }} />
          </div>
        </CinematicReveal>

        {/* JOBREADY main title */}
        <CinematicReveal variant="scale-blur" delay={0.2} duration={0.8}>
          <h1
            className="game-title animate-glow select-none"
            style={{
              fontSize: "clamp(4rem, 14vw, 11rem)",
            }}
          >
            JOBREADY
          </h1>
        </CinematicReveal>

        {/* Wooden "A TECH EVENT" banner */}
        <CinematicReveal variant="mask" delay={0.35} duration={0.7}>
          <div className="mt-4 mb-8">
            <div className="wood-banner inline-block">
              A Tech Event
            </div>
          </div>
        </CinematicReveal>

        {/* Tagline */}
        <CinematicReveal variant="fade-up" delay={0.45} duration={0.65}>
          <p
            className="text-base sm:text-xl lg:text-2xl font-body max-w-2xl leading-relaxed mb-8"
            style={{ color: "#FFFFFF", textShadow: "0 2px 12px rgba(0,0,0,0.85)" }}
          >
            Turn your ideas into a{" "}
            <span style={{ color: "var(--gold-primary)", fontWeight: 700 }}>website</span>{" "}
            and get ready for the{" "}
            <span style={{ color: "var(--gold-primary)", fontWeight: 700 }}>tech battlefield!</span>
          </p>
        </CinematicReveal>

        {/* Countdown */}
        <CinematicReveal variant="scale-blur" delay={0.55} duration={0.65}>
          <div className="flex items-center gap-3 my-6">
            <span className="font-eyebrow text-xs tracking-[0.18em]">⚔ Battle begins in</span>
            {[{ v: d, l: "Days" }, { v: h, l: "Hrs" }, { v: m, l: "Min" }, { v: s, l: "Sec" }].map(({ v, l }, i) => (
              <div key={l} className="flex items-center gap-2">
                <div
                  className="flex flex-col items-center px-3 py-2 rounded-lg border"
                  style={{
                    background: "rgba(20, 12, 4, 0.8)",
                    borderColor: "rgba(200, 160, 40, 0.5)",
                    minWidth: "60px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,215,0,0.1)",
                  }}
                >
                  <span className="font-lilita text-xl sm:text-2xl leading-none" style={{ color: "#FFFFFF" }}>{pad(v)}</span>
                  <span className="text-[0.6rem] tracking-wider uppercase" style={{ color: "#FFFFFF" }}>{l}</span>
                </div>
                {i < 3 && <span className="font-lilita text-xl pb-1" style={{ color: "#FFFFFF" }}>:</span>}
              </div>
            ))}
          </div>
        </CinematicReveal>

        {/* Register Now button -> Navigates to /register */}
        <CinematicReveal variant="fade-up" delay={0.65} duration={0.65}>
          <MagneticButton strength={0.4} glowRadius={150}>
            <Link
              href="/register"
              className="btn-game text-base sm:text-lg px-10 sm:px-14 py-4 inline-block"
            >
              Register Now &nbsp;›
            </Link>
          </MagneticButton>
        </CinematicReveal>
      </div>

      {/* INFO PANELS STRIP (4 horizontal cards) */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {INFO_PANELS.map(({ icon: Icon, label, value, sub }, idx) => (
            <CinematicReveal key={label} variant="fade-up" delay={0.7 + idx * 0.1}>
              <TiltCard maxTilt={6} glareOpacity={0.2}>
                <div className="info-panel flex items-center gap-3.5 px-5 py-5 h-full">
                  {/* Gold icon circle */}
                  <div className="info-panel-icon">
                    <Icon className="w-6 h-6" style={{ color: "var(--gold-primary)" }} />
                  </div>
                  <div>
                    <p className="text-xs font-cinzel tracking-wider uppercase mb-1" style={{ color: "#FFFFFF" }}>
                      {label}
                    </p>
                    <p className="text-sm sm:text-base font-cinzel font-bold leading-tight" style={{ color: "#FFFFFF" }}>
                      {value}
                    </p>
                    {sub && <p className="text-xs leading-tight mt-0.5" style={{ color: "#FFFFFF" }}>{sub}</p>}
                  </div>
                </div>
              </TiltCard>
            </CinematicReveal>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={scrollDown}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 transition-opacity hover:opacity-80 cursor-pointer"
        style={{ color: "#FFFFFF" }}
      >
        <span className="font-eyebrow text-[0.55rem]">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" style={{ color: "var(--gold-medium)" }} />
      </button>
    </section>
  );
}
