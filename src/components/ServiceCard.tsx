import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
};

export function ServiceCard({ icon: Icon, title, description }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 hover:bg-white/7 hover:ring-white/15"
    >
      <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative flex flex-1 items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 ring-1 ring-brand-500/25">
          <Icon className="h-5 w-5 text-brand-300" strokeWidth={2} aria-hidden />
        </div>
        <div>
          <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-white/70">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

