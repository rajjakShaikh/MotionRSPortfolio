"use client";

import { TypeAnimation } from "react-type-animation";
import { cn } from "@/lib/utils";

interface TypewriterTextProps {
  sequences: (string | number)[];
  className?: string;
  wrapper?: "p" | "div" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  speed?: number;
  repeat?: number;
}

export function TypewriterText({
  sequences,
  className,
  wrapper = "span",
  speed = 50,
  repeat = Infinity,
}: TypewriterTextProps) {
  return (
    <TypeAnimation
      sequence={sequences}
      wrapper={wrapper}
      speed={speed}
      repeat={repeat}
      className={cn("", className)}
    />
  );
}
