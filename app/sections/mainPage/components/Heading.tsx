"use client";

import React from "react";
import clsx from "clsx";

type HeadingProps = {
  title: string;
  description?: string;
  align?: "left" | "center";
  size?: "sm" | "md" | "lg";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const sizeStyles = {
  sm: {
    title: "text-lg sm:text-xl font-semibold leading-tight",
    description: "text-sm sm:text-base text-slate-500 leading-relaxed",
    spacing: "gap-1",
    maxWidth: "max-w-xl",
  },
  md: {
    title: "text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight",
    description: "text-base sm:text-lg text-slate-500 leading-relaxed",
    spacing: "gap-2",
    maxWidth: "max-w-2xl",
  },
  lg: {
    title: "text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]",
    description:
      "text-base sm:text-lg lg:text-xl text-slate-500 leading-relaxed",
    spacing: "gap-3",
    maxWidth: "max-w-2xl",
  },
};

const Heading = ({
  title,
  description,
  align = "left",
  size = "md",
  className = "",
  titleClassName = "",
  descriptionClassName = "",
}: HeadingProps) => {
  const styles = sizeStyles[size];

  return (
    <div
      className={clsx(
        "flex flex-col",
        styles.spacing,
        align === "left" && "items-start text-left",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <h1 className={clsx(styles.title, "text-slate-900", titleClassName)}>
        {title}
      </h1>

      {description && (
        <p
          className={clsx(
            styles.description,
            styles.maxWidth,
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default Heading;
