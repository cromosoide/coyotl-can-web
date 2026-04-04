interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target, suffix = "", prefix = "", className,
}: AnimatedCounterProps) {
  return (
    <span className={className}>
      {prefix}{target.toLocaleString()}{suffix}
    </span>
  );
}
