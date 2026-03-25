import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
  className?: string;
};

export function BentoServiceCell({ icon: Icon, title, description, featured, className }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className={cn(
        "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl p-5 glass glass-hover sm:p-6",
        featured && "justify-between sm:p-8",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div
        className={cn(
          "relative flex flex-1 flex-col",
          featured ? "h-full justify-between gap-6" : "gap-4",
        )}
      >
        <div
          className={cn(
            "flex w-fit rounded-2xl border border-white/15 bg-white/[0.08] p-3 backdrop-blur-md transition-transform duration-300 group-hover:scale-105",
            featured && "p-4",
          )}
        >
          <Icon className={cn("text-brand-300", featured ? "h-7 w-7" : "h-5 w-5")} />
        </div>
        <div className="flex-1">
          <h3
            className={cn(
              "font-semibold tracking-tight text-white",
              featured ? "text-xl sm:text-2xl" : "text-base",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "leading-6 text-white/70",
              featured ? "mt-3 max-w-md text-sm sm:text-base" : "mt-2 text-sm",
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
