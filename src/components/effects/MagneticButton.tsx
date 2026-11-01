"use client";

import React, { useRef, useState, useCallback, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number; // Distance multiplier for attraction (e.g. 0.35)
  glowRadius?: number; // Size of golden spotlight in px (default 120)
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  glowRadius = 140,
  onClick,
  style,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Coordinates for magnetic translation
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  // Spotlight coordinates on button surface
  const [spotlight, setSpotlight] = useState({ x: -100, y: -100, visible: false });
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance from center
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      x.set(deltaX);
      y.set(deltaY);

      // Relative coordinates inside the element for the golden spotlight
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      setSpotlight({ x: localX, y: localY, visible: true });
    },
    [strength, x, y, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setSpotlight((prev) => ({ ...prev, visible: false }));
    setIsPressed(false);
  }, [x, y]);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      style={{
        x: prefersReduced ? 0 : x,
        y: prefersReduced ? 0 : y,
        display: "inline-block",
        position: "relative",
        willChange: "transform",
        ...style,
      }}
      whileHover={
        prefersReduced
          ? {}
          : {
              scale: 1.04,
              filter: "drop-shadow(0 12px 24px rgba(255,180,0,0.35))",
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      animate={{
        scale: isPressed ? 0.96 : 1,
        y: isPressed ? 2 : 0,
      }}
      className={`relative inline-block cursor-pointer select-none group ${className}`}
    >
      {/* Golden Cursor-following spotlight sheen */}
      {!prefersReduced && spotlight.visible && (
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-xl overflow-hidden transition-opacity duration-300"
          style={{
            opacity: spotlight.visible ? 1 : 0,
          }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              width: `${glowRadius * 2}px`,
              height: `${glowRadius * 2}px`,
              left: `${spotlight.x - glowRadius}px`,
              top: `${spotlight.y - glowRadius}px`,
              background: `radial-gradient(circle, rgba(255, 245, 180, 0.45) 0%, rgba(255, 200, 0, 0.2) 40%, transparent 70%)`,
              mixBlendMode: "screen",
              borderRadius: "50%",
              filter: "blur(4px)",
            }}
          />
        </div>
      )}

      {children}
    </motion.div>
  );
}

