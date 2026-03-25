/** Éléments décoratifs inspirés du branding Google / avis — sans affiliation. */

import type { CSSProperties } from "react";

const GOOGLE_STAR = "#FBBF24";
const GOOGLE_STAR_EMPTY = "rgba(255,255,255,0.22)";

function StarIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden style={style}>
      <path
        fill="currentColor"
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
}

/** Étoiles jaunes type avis Google, avec dernière étoile partielle si besoin. */
export function GoogleStyleStars({
  rating = 4.9,
  size = "md",
}: {
  rating?: number;
  size?: "sm" | "md";
}) {
  const full = Math.floor(rating);
  const fraction = Math.max(0, Math.min(1, rating - full));
  const emptyCount = Math.max(0, 5 - full - (fraction > 0 ? 1 : 0));
  const dim = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className="flex items-center gap-0.5" aria-label={`Note ${rating} sur 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <StarIcon key={`f-${i}`} className={`${dim} shrink-0`} style={{ color: GOOGLE_STAR }} />
      ))}
      {fraction > 0 ? (
        <span className={`relative inline-block shrink-0 ${dim}`}>
          <StarIcon className={`absolute inset-0 ${dim}`} style={{ color: GOOGLE_STAR_EMPTY }} />
          <span className="absolute inset-0 overflow-hidden" style={{ width: `${fraction * 100}%` }}>
            <StarIcon className={dim} style={{ color: GOOGLE_STAR }} />
          </span>
        </span>
      ) : null}
      {Array.from({ length: emptyCount }).map((_, i) => (
        <StarIcon key={`e-${i}`} className={`${dim} shrink-0`} style={{ color: GOOGLE_STAR_EMPTY }} />
      ))}
    </div>
  );
}

/** Logo Google classique : le « G » multicolore (viewBox 48×48). */
export function GoogleGMark({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "h-10 w-10 shrink-0"}
      viewBox="0 0 48 48"
      aria-hidden
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C43.98 37.98 46.98 31.85 46.98 24.55z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}
