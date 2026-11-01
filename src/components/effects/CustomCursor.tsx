"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const [cursorState, setCursorState] = useState<"default" | "hover-btn" | "hover-link" | "hidden">("default");
  const [ripples, setRipples] = useState<ClickRipple[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Only activate on devices with fine pointer (mouse/trackpad)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    if (prefersReduced) return;

    document.documentElement.classList.add("custom-cursor-enabled");

    let mouseX = -100;
    let mouseY = -100;
    let trailX = -100;
    let trailY = -100;
    let isVisible = false;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        trailX = mouseX;
        trailY = mouseY;
      }

      // Check hover targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Text input or selectable area
      const isTextInput =
        (target.tagName === "INPUT" &&
          !["button", "submit", "reset", "checkbox", "radio"].includes(
            ((target as HTMLInputElement).type || "").toLowerCase()
          )) ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable;

      if (isTextInput) {
        setCursorState("hidden");
        return;
      }

      // Button or primary CTA
      const isButton =
        target.closest("button") ||
        target.closest(".btn-game") ||
        target.closest(".btn-register-team") ||
        target.closest('[role="button"]') ||
        target.closest(".faq-item") ||
        target.closest(".round-card");

      if (isButton) {
        setCursorState("hover-btn");
        return;
      }

      // Nav link or anchor
      const isLink = target.closest("a") || target.closest(".cursor-pointer");
      if (isLink) {
        setCursorState("hover-link");
        return;
      }

      setCursorState("default");
    };

    const onMouseLeave = () => {
      isVisible = false;
      setCursorState("hidden");
    };

    const onMouseEnter = () => {
      isVisible = true;
      setCursorState("default");
    };

    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isTextInput =
        (target?.tagName === "INPUT" &&
          !["button", "submit", "reset", "checkbox", "radio"].includes(
            ((target as HTMLInputElement).type || "").toLowerCase()
          )) ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if (isTextInput) {
        return;
      }

      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-3), { id, x: e.clientX, y: e.clientY }]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mousedown", onMouseDown, { passive: true });

    // Smooth animation loop using direct transforms for 60/120fps zero-react-render movement
    const loop = () => {
      if (isVisible) {
        // Fast direct follow for main pointer
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }

        // Fluid spring/lerp trailing for golden aura & ember trail
        trailX += (mouseX - trailX) * 0.22;
        trailY += (mouseY - trailY) * 0.22;

        if (trailingRef.current) {
          trailingRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
        }
        if (auraRef.current) {
          auraRef.current.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      document.documentElement.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, [prefersReduced]);

  if (!isClient || prefersReduced) return null;

  const isHovered = cursorState === "hover-btn" || cursorState === "hover-link";
  const isHidden = cursorState === "hidden";

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* ── Trailing Golden Aura Glow ── */}
      <div
        ref={auraRef}
        className="pointer-events-none absolute top-0 left-0 -ml-6 -mt-6 w-12 h-12 rounded-full transition-opacity duration-300"
        style={{
          opacity: isHidden ? 0 : isHovered ? 0.75 : 0.4,
          background: "radial-gradient(circle, rgba(255, 215, 0, 0.5) 0%, rgba(245, 166, 35, 0.2) 40%, transparent 70%)",
          filter: "blur(6px)",
          willChange: "transform",
        }}
      />

      {/* ── Trailing Magic Spark Dot ── */}
      <div
        ref={trailingRef}
        className="pointer-events-none absolute top-0 left-0 -ml-1 -mt-1 w-2.5 h-2.5 rounded-full transition-opacity duration-200"
        style={{
          opacity: isHidden ? 0 : 0.65,
          background: "radial-gradient(circle, #FFF5A0 0%, #FFD700 60%, transparent 100%)",
          boxShadow: "0 0 6px #FFD700",
          willChange: "transform",
        }}
      />

      {/* ── Main 3D Golden Fantasy Pointer ── */}
      <div
        ref={cursorRef}
        className="pointer-events-none absolute top-0 left-0 transition-opacity duration-200"
        style={{
          opacity: isHidden ? 0 : 1,
          willChange: "transform",
        }}
      >
        <div
          className="transition-transform duration-200 ease-out origin-top-left"
          style={{
            transform: isHovered ? "scale(1.18) rotate(-4deg)" : "scale(1) rotate(0deg)",
            filter: isHovered
              ? "drop-shadow(0 0 10px rgba(255, 215, 0, 0.9)) drop-shadow(0 4px 12px rgba(0, 0, 0, 0.8))"
              : "drop-shadow(0 0 5px rgba(255, 200, 0, 0.6)) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.7))",
          }}
        >
          {/* Authentic 3D Fantasy Golden Dagger / Gauntlet Pointer SVG */}
          <svg
            width="28"
            height="32"
            viewBox="0 0 28 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <defs>
              {/* Left facet bright highlight */}
              <linearGradient id="goldFacetLeft" x1="0" y1="0" x2="16" y2="24" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFBD0" />
                <stop offset="35%" stopColor="#FFE066" />
                <stop offset="70%" stopColor="#FFC400" />
                <stop offset="100%" stopColor="#D48800" />
              </linearGradient>

              {/* Right facet rich bronze shadow */}
              <linearGradient id="goldFacetRight" x1="10" y1="5" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFC837" />
                <stop offset="45%" stopColor="#D48800" />
                <stop offset="85%" stopColor="#8A4E00" />
                <stop offset="100%" stopColor="#5C3100" />
              </linearGradient>

              {/* Crossguard ruby / amber gem */}
              <radialGradient id="gemGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF2A0" />
                <stop offset="40%" stopColor="#FF9900" />
                <stop offset="100%" stopColor="#800000" />
              </radialGradient>
            </defs>

            {/* Dark Antique Bronze Outer Shell / Border */}
            <path
              d="M1 1 L1.5 25 L7.5 19.5 L12.5 29.5 L17.5 27 L12.5 17 L21 16.5 Z"
              fill="#261202"
              stroke="#1A0A00"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Left 3D Golden Facet (Reflective Highlight) */}
            <path
              d="M2.5 2.5 L3 23 L7.5 18.5 L9.5 13.5 Z"
              fill="url(#goldFacetLeft)"
            />

            {/* Right 3D Golden Facet (Metallic Shade) */}
            <path
              d="M2.5 2.5 L9.5 13.5 L19.5 15.5 L7.5 18.5 Z"
              fill="url(#goldFacetRight)"
            />

            {/* Handle / Stem Upper Highlight */}
            <path
              d="M8.5 17.5 L13 26.5 L16 25 L11.5 16 Z"
              fill="url(#goldFacetRight)"
            />
            <path
              d="M8.5 17.5 L11.5 26.5 L10 26.5 L7.5 18 Z"
              fill="url(#goldFacetLeft)"
            />

            {/* Center Spine Ridge Highlight Line */}
            <path
              d="M2.5 2.5 L9.5 13.5 L8.5 18 L12.5 26"
              stroke="#FFFBE0"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Embedded Crossguard Jewel / Crest */}
            <circle
              cx="9"
              cy="14"
              r="2.2"
              fill="url(#gemGradient)"
              stroke="#FFEAA0"
              strokeWidth="0.6"
            />
          </svg>
        </div>
      </div>

      {/* ── Click Impact Shockwaves ── */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="pointer-events-none absolute -ml-6 -mt-6 w-12 h-12 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            border: "2px solid #FFD700",
            boxShadow: "0 0 16px #FFD700, inset 0 0 10px #FFD700",
            animationDuration: "500ms",
            animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          }}
        />
      ))}
    </div>
  );
}

