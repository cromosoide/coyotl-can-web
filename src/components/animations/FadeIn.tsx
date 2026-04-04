"use client";

import { type ReactNode } from "react";
import { useInView } from "./useInView";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export default function FadeIn({ children, className = "", delay = 0, direction = "up" }: FadeInProps) {
  const { ref, inView } = useInView();

  const hiddenClass = direction === "left" ? "anim-hidden-left"
    : direction === "right" ? "anim-hidden-right"
    : direction === "scale" ? "anim-hidden-scale"
    : "anim-hidden";

  const visibleClass = direction === "left" ? "anim-visible-left"
    : direction === "right" ? "anim-visible-right"
    : direction === "scale" ? "anim-visible-scale"
    : "anim-visible";

  const delayClass = delay > 0 ? `anim-delay-${Math.min(Math.round(delay * 10), 8)}` : "";

  return (
    <div ref={ref} className={`${inView ? `${visibleClass} ${delayClass}` : hiddenClass} ${className}`}>
      {children}
    </div>
  );
}
