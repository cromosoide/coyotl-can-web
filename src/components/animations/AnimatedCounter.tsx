"use client";

import { useEffect, useRef, useState } from "react";

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
  const ref = useRef<HTMLSpanElement>(null);
  // Start with the final number (always visible, no 0+)
  const [count, setCount] = useState(target);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (animated) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          setAnimated(true);
          // Reset to 0 and animate up
          setCount(0);
          const startTime = performance.now();
          const durationMs = duration * 1000;
          function step(now: number) {
            const progress = Math.min((now - startTime) / durationMs, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          }
          requestAnimationFrame(step);
        }
      },
      { rootMargin: "-20px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animated, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
