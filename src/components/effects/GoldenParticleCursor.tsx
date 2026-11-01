"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

const GOLD_PALETTE = [
  "#FFE57F", // bright yellow gold
  "#FFD700", // pure gold
  "#FFC107", // amber gold
  "#FFA000", // deep amber
  "#FFF9C4", // sparkling white-gold
];

export default function GoldenParticleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Disable on touch devices or reduced motion
    if (prefersReduced) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const particles: Particle[] = [];
    const MAX_PARTICLES = 30;
    let lastMoveTime = Date.now();

    const spawnParticle = (x: number, y: number) => {
      if (particles.length >= MAX_PARTICLES) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.2 + 0.4;
      particles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.6, // float upward like sparks/embers
        size: Math.random() * 2.2 + 1.2,
        color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
        alpha: 0.9,
        decay: Math.random() * 0.025 + 0.02,
      });
    };

    let prevX = -1;
    let prevY = -1;

    const onMouseMove = (e: MouseEvent) => {
      lastMoveTime = Date.now();
      const currentX = e.clientX;
      const currentY = e.clientY;

      // Only spawn if cursor moved at least 4px
      const dist = Math.hypot(currentX - prevX, currentY - prevY);
      if (dist > 4) {
        spawnParticle(currentX, currentY);
        if (Math.random() > 0.4) spawnParticle(currentX, currentY);
        prevX = currentX;
        prevY = currentY;
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // If no movement for > 2 seconds and no particles, skip heavy loops
      if (particles.length > 0) {
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 select-none"
      style={{
        width: "100vw",
        height: "100vh",
        mixBlendMode: "screen",
      }}
    />
  );
}

