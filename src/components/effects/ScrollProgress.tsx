"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
      } else {
        const percent = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setProgress(percent);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (prefersReduced) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none"
      style={{
        background: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #D48800 0%, #FFD700 50%, #FFF5A0 100%)",
          boxShadow: "0 0 10px rgba(255, 215, 0, 0.8), 0 0 18px rgba(255, 180, 0, 0.4)",
        }}
      />
    </div>
  );
}

