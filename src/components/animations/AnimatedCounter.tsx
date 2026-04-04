"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target, suffix = "", prefix = "", duration = 2, className,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    // Respect reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const durationMs = duration * 1000;

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    }

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref as any} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
