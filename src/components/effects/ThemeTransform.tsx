"use client";

import { useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type RGB = [number, number, number];
type RGBA = [number, number, number, number];

interface ColorStop {
  gold: RGB | RGBA;
  purple: RGB | RGBA;
}

const THEME_MAP: Record<string, ColorStop> = {
  "--theme-bg-body": {
    gold: [26, 18, 8],
    purple: [16, 9, 31],
  },
  "--theme-bg-section-dark-start": {
    gold: [26, 18, 8],
    purple: [16, 9, 31],
  },
  "--theme-bg-section-dark-end": {
    gold: [30, 21, 16],
    purple: [24, 13, 44],
  },
  "--theme-bg-section-stone-start": {
    gold: [28, 21, 16],
    purple: [22, 14, 38],
  },
  "--theme-bg-section-stone-mid": {
    gold: [38, 30, 20],
    purple: [33, 20, 56],
  },
  "--theme-bg-section-stone-end": {
    gold: [28, 21, 16],
    purple: [22, 14, 38],
  },
  "--theme-bg-card": {
    gold: [28, 21, 16],
    purple: [36, 22, 61],
  },
  "--theme-bg-card-secondary": {
    gold: [37, 29, 20],
    purple: [46, 28, 78],
  },
  "--theme-border-card": {
    gold: [200, 160, 40, 0.35],
    purple: [165, 107, 255, 0.45],
  },
  "--theme-border-card-hover": {
    gold: [255, 215, 0, 0.8],
    purple: [197, 160, 255, 0.85],
  },
  "--theme-card-shadow-glow": {
    gold: [200, 160, 40, 0.15],
    purple: [165, 107, 255, 0.3],
  },
  "--theme-nav-bg": {
    gold: [18, 12, 6, 0.92],
    purple: [16, 9, 31, 0.94],
  },
  "--theme-nav-border": {
    gold: [255, 215, 0, 0.45],
    purple: [197, 160, 255, 0.45],
  },
  "--theme-divider-glow": {
    gold: [255, 215, 0, 0.8],
    purple: [197, 160, 255, 0.85],
  },
  "--theme-divider-edge": {
    gold: [255, 180, 0, 0.6],
    purple: [116, 56, 200, 0.65],
  },
  "--theme-footer-bg-top": {
    gold: [18, 13, 8],
    purple: [16, 9, 31],
  },
  "--theme-footer-bg-bottom": {
    gold: [10, 6, 2],
    purple: [9, 4, 18],
  },
  "--theme-footer-border": {
    gold: [200, 160, 40, 0.2],
    purple: [165, 107, 255, 0.35],
  },
  "--theme-ambient-glow-1": {
    gold: [255, 140, 0, 0.15],
    purple: [165, 107, 255, 0.22],
  },
  "--theme-ambient-glow-2": {
    gold: [200, 122, 0, 0.12],
    purple: [116, 56, 200, 0.25],
  },
  "--theme-faq-bg-start": {
    gold: [28, 21, 16],
    purple: [36, 22, 61],
  },
  "--theme-faq-bg-end": {
    gold: [36, 28, 18],
    purple: [28, 16, 50],
  },
  "--theme-faq-border": {
    gold: [200, 160, 40, 0.35],
    purple: [165, 107, 255, 0.38],
  },
  "--theme-wood-border": {
    gold: [196, 144, 26],
    purple: [157, 96, 236],
  },
  "--theme-cta-glow": {
    gold: [180, 90, 0, 0.25],
    purple: [116, 56, 200, 0.32],
  },
  "--theme-rounds-glow": {
    gold: [200, 122, 0, 0.06],
    purple: [116, 56, 200, 0.12],
  },
};

function interpolate(c1: RGB | RGBA, c2: RGB | RGBA, t: number): string {
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);

  if (c1.length === 4 && c2.length === 4) {
    const a = +(c1[3] + (c2[3] - c1[3]) * t).toFixed(3);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

export default function ThemeTransform() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === "undefined") return;

    let ticking = false;
    const root = document.documentElement;

    const applyTheme = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      let progress = 0;
      if (maxScroll > 0) {
        progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      }

      // Smooth non-linear curve: gradual start at top 15%, accelerating smoothly into the magical depths
      // p = progress^1.15 for natural easing
      const t = Math.pow(progress, 1.15);

      for (const [property, stop] of Object.entries(THEME_MAP)) {
        const value = interpolate(stop.gold, stop.purple, t);
        root.style.setProperty(property, value);
      }

      // Update ambient progress percentage attribute for custom CSS hooks if needed
      root.style.setProperty("--theme-progress", t.toFixed(3));

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(applyTheme);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    applyTheme();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      for (const property of Object.keys(THEME_MAP)) {
        root.style.removeProperty(property);
      }
      root.style.removeProperty("--theme-progress");
    };
  }, [prefersReduced]);

  return null;
}

