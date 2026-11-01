"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { EVENT } from "@/lib/constants";
import { formatCountdown, padTwo } from "@/lib/utils";
import type { CountdownTime } from "@/types";
import dynamic from "next/dynamic";
import { SceneFallback } from "@/components/three/HeroScene";

// Lazy-load the heavy 3D scene
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

// WebGL detection
function canUseWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [time, setTime] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => setTime(formatCountdown(targetDate));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) return null;
  if (time.total <= 0) return (
    <div className="text-[#F5A623] font-display text-xl font-bold animate-pulse">
      ⚔️ THE BATTLE HAS BEGUN!
    </div>
  );

  const units = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hours" },
    { value: time.minutes, label: "Minutes" },
    { value: time.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-3">
          <div className="countdown-box">
            <span className="countdown-number">{padTwo(value)}</span>
            <span className="countdown-label">{label}</span>
          </div>
          {i < units.length - 1 && (
            <span className="font-display text-[#F5A623] text-2xl font-bold pb-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const [webGLAvailable, setWebGLAvailable] = useState(true);
  const targetDate = EVENT.date;

  useEffect(() => {
    setWebGLAvailable(canUseWebGL());
  }, []);

  const scrollToNext = () => {
    const el = document.getElementById("about");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Canvas background */}
      <div className="absolute inset-0 z-0">
        {webGLAvailable ? (
          <HeroScene />
        ) : (
          <SceneFallback />
        )}
        {/* Gradient overlay — keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E10] via-[rgba(15,30,16,0.55)] to-[rgba(15,30,16,0.3)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(15,30,16,0.4)] via-transparent to-[rgba(15,30,16,0.4)]" />
      </div>

      {/* Floating particles overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#FFD700] opacity-40"
            style={{
              left: `${10 + (i * 7.5) % 85}%`,
              top: `${15 + (i * 11) % 70}%`,
              animation: `float-particle ${4 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[rgba(245,166,35,0.12)] border border-[rgba(245,166,35,0.35)] rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#F5A623]">
            Code • Build • Compete
          </span>
        </div>

        {/* Main title */}
        <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-4 leading-none tracking-wide">
          <span className="gradient-text-gold drop-shadow-[0_4px_24px_rgba(245,166,35,0.5)]">
            JOBREADY
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-display text-lg sm:text-xl lg:text-2xl text-[#A5C8A8] tracking-[0.12em] uppercase mb-6">
          Build Your Base.{" "}
          <span className="text-[#FFD700]">Conquer the Code.</span>
        </p>

        {/* Description */}
        <p className="text-[#A5C8A8] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
          A three-round website development challenge where creativity meets engineering.
          Build your frontend, power it with a complete backend, and showcase your creation in the final battle.
        </p>

        {/* Event info pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { icon: Calendar, text: EVENT.dateLabel },
            { icon: MapPin, text: "Multi Purpose Hall, MMMUT, Gorakhpur" },
            { icon: Users, text: "Max 3 Members" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 bg-[rgba(15,30,16,0.8)] border border-[rgba(45,90,48,0.5)] rounded-full text-sm text-[#A5C8A8] backdrop-blur-sm"
            >
              <Icon className="w-4 h-4 text-[#F5A623] flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="flex flex-col items-center mb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-[#6B8F6E] mb-3 font-semibold">
            ⚔ Countdown to Battle
          </p>
          <CountdownTimer targetDate={targetDate} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register" className="btn-gold text-base px-8 py-4 w-full sm:w-auto justify-center">
            ⚔ Register Your Team
          </Link>
          <button
            onClick={scrollToNext}
            className="btn-outline-gold text-base px-8 py-4 w-full sm:w-auto justify-center"
          >
            Explore the Rounds
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[#6B8F6E] hover:text-[#F5A623] transition-colors cursor-pointer"
        aria-label="Scroll to next section"
      >
        <span className="text-xs tracking-widest uppercase text-current">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
}

