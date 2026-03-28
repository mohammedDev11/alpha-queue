"use client";

import { cn } from "@/Data/Common/utils";

type SpotlightProps = {
  className?: string;
};

export const Spotlight = ({ className }: SpotlightProps) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 blur-[120px]",
        className
      )}
      style={{
        width: "1200px",
        height: "700px",
        background: `
          radial-gradient(
            ellipse at center,
            rgba(55,125,255,0.35) 0%,
            rgba(55,125,255,0.2) 30%,
            rgba(55,125,255,0.1) 55%,
            transparent 75%
          )
        `,
      }}
    />
  );
};
