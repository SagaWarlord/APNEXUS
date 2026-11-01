"use client";

import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Positive = moves slower than scroll; negative = moves faster (e.g. -40 to 60)
  style?: React.CSSProperties;
}

export default function ParallaxElement({
  children,
  className = "",
  speed = 30,
  style,
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  if (prefersReduced) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        willChange: "transform",
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

