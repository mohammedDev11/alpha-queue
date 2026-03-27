"use client";

import React from "react";
import { cn } from "@/Data/Common/utils";

type PreviewVideoProps = {
  src?: string;
  className?: string;
};

const PreviewVideo: React.FC<PreviewVideoProps> = ({ src, className }) => {
  if (!src) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center text-xs",
          className
        )}
        style={{ color: "var(--muted)" }}
      >
        No preview video
      </div>
    );
  }

  return (
    <video
      src={src}
      muted
      loop
      autoPlay
      playsInline
      preload="metadata"
      className={cn("h-full w-full object-cover", className)}
    />
  );
};

export default PreviewVideo;
