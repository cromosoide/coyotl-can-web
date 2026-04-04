"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export default function FadeIn({ children, className = "" }: FadeInProps) {
  // No animations — just render children immediately.
  // This ensures compatibility with all browsers including Safari iOS 10+.
  // The content is always visible, never hidden with opacity:0.
  return (
    <div className={className}>
      {children}
    </div>
  );
}
