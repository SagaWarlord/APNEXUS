"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "slide-left"
  | "slide-right"
  | "scale-blur"
  | "mask";

interface CinematicRevealProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
  viewportAmount?: number;
  style?: React.CSSProperties;
}

const variantsMap: Record<AnimationVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 36, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -30, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -44, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 44, filter: "blur(4px)" },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  "scale-blur": {
    hidden: { opacity: 0, scale: 0.93, filter: "blur(8px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  "mask": {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: { opacity: 1, clipPath: "inset(0 0% 0 0)" },
  },
};

export default function CinematicReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.7,
  className = "",
  viewportAmount = 0.15,
  style,
}: CinematicRevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const selectedVariant = variantsMap[variant] || variantsMap["fade-up"];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={selectedVariant}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Cinematic easeOutExpo-like curve
      }}
      className={className}
      style={{ willChange: "transform, opacity", ...style }}
    >
      {children}
    </motion.div>
  );
}

