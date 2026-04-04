"use client";

import { useEffect, useRef, useState } from "react";

export function useInView(options?: { once?: boolean; margin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Fallback for old browsers: just show everything
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.once !== false) observer.unobserve(el);
        }
      },
      { rootMargin: options?.margin || "-40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.once, options?.margin]);

  return { ref, inView };
}
