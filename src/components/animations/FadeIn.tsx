"use client";

import { useState, useEffect, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

// Cache the motion component after first load
let MotionDiv: any = null;
let loadAttempted = false;

export default function FadeIn({ children, className = "", delay = 0, direction = "up" }: FadeInProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Skip if already loaded or attempted
    if (MotionDiv) { setReady(true); return; }
    if (loadAttempted) return;
    loadAttempted = true;

    // Only load framer-motion on modern browsers
    if (typeof IntersectionObserver === "undefined") return;

    import("framer-motion")
      .then((fm) => { MotionDiv = fm.motion.div; setReady(true); })
      .catch(() => {});
  }, []);

  // SSR + old browsers: always visible, no animation
  if (!ready || !MotionDiv) {
    return <div className={className}>{children}</div>;
  }

  // Modern browsers: framer-motion animations
  const initial = direction === "left" ? { opacity: 0, x: -24 }
    : direction === "right" ? { opacity: 0, x: 24 }
    : direction === "scale" ? { opacity: 0, scale: 0.95 }
    : { opacity: 0, y: 24 };

  return (
    <MotionDiv
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </MotionDiv>
  );
}
