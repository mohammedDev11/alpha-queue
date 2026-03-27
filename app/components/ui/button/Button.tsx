import clsx from "clsx";
import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition",
        
        // Variant styles depending on the need
        {
          "bg-brand-500 text-white hover:bg-brand-600":
            variant === "primary",
          "bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--surface-2)]":
            variant === "outline",
          "border border-brand-500 bg-transparent text-brand-500 hover:bg-brand-500/10":
            variant === "secondary",
          "bg-transparent text-slate-300 hover:bg-white/5":
            variant === "ghost",
        },

        // Sizes (padding and font size) depending on the need
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2.5 text-sm": size === "md",
          "px-5 py-3 text-base": size === "lg",
        },

        className
      )}
      {...props}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}