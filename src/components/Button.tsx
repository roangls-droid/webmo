import type { ComponentProps } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

const MotionButton = motion.button;
type Props = Omit<ComponentProps<typeof MotionButton>, "className"> & {
  className?: string;
  variant?: "primary" | "ghost";
};

export function Button({ className, variant = "primary", disabled, ...props }: Props) {
  return (
    <MotionButton
      disabled={disabled}
      whileHover={
        disabled ? undefined : { scale: variant === "primary" ? 1.03 : 1.02, y: -1 }
      }
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 disabled:pointer-events-none disabled:opacity-45",
        variant === "primary" &&
          "bg-brand-500 text-white shadow-glow hover:bg-brand-400 hover:shadow-[0_0_0_1px_rgba(129,140,248,0.35),0_20px_50px_rgba(99,102,241,0.28)]",
        variant === "ghost" &&
          "glass text-white ring-0 hover:border-white/[0.2] hover:bg-white/[0.1]",
        className,
      )}
      {...props}
    />
  );
}

