import { useCallback, useEffect, useId, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectPerspectiveCard } from "./ProjectPerspectiveCard";

export type PortfolioProject = {
  title: string;
  category: string;
  href: string;
  previewImage: string;
  mobilePreviewImage?: string;
  description: string;
};

type Lang = "fr" | "en";

type Props = {
  projects: PortfolioProject[];
  visitLabel: string;
  lang: Lang;
};

/** `md` (768px) : desktop = 2 cartes, mobile = 1 carte lisible. */
const MD_UP_QUERY = "(min-width: 768px)";

function subscribeMdUp(onChange: () => void) {
  const mq = window.matchMedia(MD_UP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getMdUpSnapshot() {
  return window.matchMedia(MD_UP_QUERY).matches;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 56 : -56,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -56 : 56,
    opacity: 0,
  }),
};

function chunkProjects(projects: PortfolioProject[], pageSize: number): PortfolioProject[][] {
  const pages: PortfolioProject[][] = [];
  const step = Math.max(1, pageSize);
  for (let i = 0; i < projects.length; i += step) {
    pages.push(projects.slice(i, i + step));
  }
  return pages;
}

export function PortfolioCarousel({ projects, visitLabel, lang }: Props) {
  const id = useId();
  const isMdUp = useSyncExternalStore(subscribeMdUp, getMdUpSnapshot, () => false);
  const pageSize = isMdUp ? 2 : 1;
  const pages = useMemo(() => chunkProjects(projects, pageSize), [projects, pageSize]);
  const numPages = pages.length;

  const [[pageIndex, direction], setSlide] = useState(() => [0, 0]);

  useEffect(() => {
    setSlide([0, 0]);
  }, [pageSize]);

  const go = useCallback(
    (delta: number) => {
      setSlide(([i]) => {
        const next = (i + delta + numPages) % numPages;
        return [next, delta];
      });
    },
    [numPages],
  );

  const goTo = useCallback(
    (target: number) => {
      if (target === pageIndex) return;
      setSlide([target, target > pageIndex ? 1 : -1]);
    },
    [pageIndex],
  );

  const pair = pages[pageIndex];
  const slideKey = pair.map((p) => p.title).join("|");
  const liveTitles = pair.map((p) => p.title).join(" — ");

  const regionLabel = lang === "fr" ? "Projets portfolio" : "Portfolio projects";

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={regionLabel}
    >
      <div
        id={`${id}-live`}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {lang === "fr" ? "Projets affichés : " : "Showing: "}
        {liveTitles}
      </div>

      <div className="relative mx-auto max-w-6xl px-2 sm:px-6">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            id={`${id}-slide`}
            key={slideKey}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="will-change-transform"
          >
            <div
              className={
                pair.length === 2
                  ? "grid grid-cols-2 items-start gap-3 sm:gap-6 md:gap-8"
                  : "flex justify-center"
              }
            >
              {pair.map((project) => (
                <div
                  key={project.title}
                  className={
                    pair.length === 1
                      ? "w-full max-w-md md:max-w-lg"
                      : "min-w-0"
                  }
                >
                  <ProjectPerspectiveCard
                    title={project.title}
                    category={project.category}
                    href={project.href}
                    previewImage={project.previewImage}
                    mobilePreviewImage={project.mobilePreviewImage}
                    description={project.description}
                    visitLabel={visitLabel}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-0 top-[38%] z-20 flex h-11 w-11 -translate-x-1 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0f172a]/90 text-white shadow-lg backdrop-blur-md transition hover:border-white/30 hover:bg-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 sm:-translate-x-2 md:-translate-x-3"
          aria-controls={`${id}-slide`}
          aria-label={
            pageSize === 1
              ? lang === "fr"
                ? "Projet précédent"
                : "Previous project"
              : lang === "fr"
                ? "Paire de projets précédente"
                : "Previous project pair"
          }
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-0 top-[38%] z-20 flex h-11 w-11 translate-x-1 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#0f172a]/90 text-white shadow-lg backdrop-blur-md transition hover:border-white/30 hover:bg-[#0f172a] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 sm:translate-x-2 md:translate-x-3"
          aria-controls={`${id}-slide`}
          aria-label={
            pageSize === 1
              ? lang === "fr"
                ? "Projet suivant"
                : "Next project"
              : lang === "fr"
                ? "Paire de projets suivante"
                : "Next project pair"
          }
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>
      </div>

      <div
        className="mt-8 flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label={
          pageSize === 1
            ? lang === "fr"
              ? "Choisir un projet"
              : "Choose a project"
            : lang === "fr"
              ? "Choisir une paire"
              : "Choose a pair"
        }
      >
        {pages.map((page, i) => (
          <button
            key={page.map((p) => p.title).join("-")}
            type="button"
            aria-current={i === pageIndex ? "true" : undefined}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 ${
              i === pageIndex ? "w-8 bg-brand-400" : "w-2 bg-white/25 hover:bg-white/45"
            }`}
            aria-label={
              lang === "fr"
                ? `Afficher ${page.map((p) => p.title).join(" et ")}`
                : `Show ${page.map((p) => p.title).join(" and ")}`
            }
          />
        ))}
      </div>
    </div>
  );
}
