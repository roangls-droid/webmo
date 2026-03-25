import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** Titre en dégradé subtil (gradient text) */
  titleGradient?: boolean;
};

export function SectionHeading({ eyebrow, title, subtitle, titleGradient }: Props) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-300/90">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl",
          titleGradient ? "text-gradient-soft" : "text-white",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-sm leading-6 text-white/70 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

