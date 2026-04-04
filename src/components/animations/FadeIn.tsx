import { type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export default function FadeIn({ children, className = "" }: FadeInProps) {
  return <div className={className}>{children}</div>;
}
