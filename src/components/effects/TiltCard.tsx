"use client";

import React, { useRef, useState, useCallback, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // Max degrees of tilt (e.g. 8)
  glareOpacity?: number; // Opacity of glare sheen (e.g. 0.25)
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  glareOpacity = 0.25,
  style,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const springConfig = { damping: 20, stiffness: 200, mass: 0.2 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const [glare, setGlare] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles: inverted Y for natural tilt
      const rX = ((y - centerY) / centerY) * -maxTilt;
      const rY = ((x - centerX) / centerX) * maxTilt;

      rotateX.set(rX);
      rotateY.set(rY);

      // Percentage for glare
      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;
      setGlare({ x: px, y: py, active: true });
    },
    [maxTilt, prefersReduced, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    setGlare((prev) => ({ ...prev, active: false }));
  }, [rotateX, rotateY]);

  return (
    <div
      style={{ perspective: 1000 }}
      className={`relative ${className}`}
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: prefersReduced ? 0 : rotateX,
          rotateY: prefersReduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
          ...style,
        }}
        whileHover={
          prefersReduced
            ? {}
            : {
                scale: 1.015,
                transition: { duration: 0.25 },
              }
        }
        className="relative h-full w-full rounded-2xl overflow-hidden"
      >
        {/* Dynamic Specular Sheen */}
        {!prefersReduced && (
          <div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-2xl"
            style={{
              opacity: glare.active ? glareOpacity : 0,
              background: `radial-gradient(circle 300px at ${glare.x}% ${glare.y}%, rgba(255, 235, 170, 0.45) 0%, rgba(255, 215, 0, 0.1) 40%, transparent 80%)`,
              mixBlendMode: "screen",
            }}
          />
        )}

        {children}
      </motion.div>
    </div>
  );
}

