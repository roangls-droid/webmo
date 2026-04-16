import type { ReactNode } from "react";
import type { SimpleIcon } from "simple-icons";
import { Search } from "lucide-react";
import {
  siGoogleanalytics,
  siGooglesearchconsole,
  siLooker,
  siSemrush,
} from "simple-icons";

function SiGlyph({ icon, className }: { icon: SimpleIcon; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill={`#${icon.hex}`} d={icon.path} />
    </svg>
  );
}

/** Colonne texte : pas de min-w-0 (sinon largeur → 0 dans la flex du carrousel). */
function ChipLabel({ children }: { children: ReactNode }) {
  return <div className="shrink-0 leading-tight">{children}</div>;
}

function ToolChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex shrink-0 flex-nowrap items-center gap-2.5 overflow-visible rounded-xl border border-white/[0.16] bg-zinc-900/90 px-3 py-2 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function IconTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.14] bg-zinc-950 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function SemrushChip() {
  return (
    <ToolChip>
      <IconTile>
        <SiGlyph icon={siSemrush} className="h-5 w-5 shrink-0" />
      </IconTile>
      <ChipLabel>
        <p className="text-xs font-bold uppercase italic tracking-wide text-orange-400">Semrush</p>
        <p className="text-[10px] font-medium text-white/60">SEO &amp; content</p>
      </ChipLabel>
    </ToolChip>
  );
}

function AhrefsChip() {
  return (
    <ToolChip className="border-[#0b5fcc]/50 bg-gradient-to-br from-[#0d6efd]/35 to-[#052c65]/40">
      <div className="flex h-9 shrink-0 items-center rounded-lg bg-[#0d6efd] px-2.5">
        <span className="text-sm font-bold tracking-tight text-white">
          <span className="text-orange-400">a</span>hrefs
        </span>
      </div>
      <ChipLabel>
        <p className="text-[10px] font-medium text-white/75">SEO tools</p>
      </ChipLabel>
    </ToolChip>
  );
}

function MajesticChip() {
  return (
    <ToolChip>
      <ChipLabel>
        <span className="text-[10px] font-semibold tracking-[0.2em] text-red-500">★★★★★</span>
        <p className="text-xs font-black uppercase tracking-wide text-white">Majestic</p>
        <p className="text-[10px] font-medium text-white/55">Backlink intelligence</p>
      </ChipLabel>
    </ToolChip>
  );
}

function ScreamingFrogChip() {
  return (
    <ToolChip>
      <IconTile className="border-emerald-500/35 bg-emerald-950/60">
        <span className="text-[11px] font-bold leading-none text-emerald-300">SF</span>
      </IconTile>
      <ChipLabel>
        <p className="text-xs font-semibold tracking-tight">
          <span className="text-white/90">Screaming </span>
          <span className="text-emerald-400">Frog</span>
        </p>
        <p className="text-[10px] font-medium text-white/55">SEO Spider</p>
      </ChipLabel>
    </ToolChip>
  );
}

function SistrixChip() {
  return (
    <ToolChip className="border-sky-500/45 bg-gradient-to-br from-sky-700/40 to-sky-950/50">
      <div className="flex h-9 shrink-0 items-center gap-1 rounded-lg bg-sky-600 px-2.5">
        <span className="text-[10px] font-black tracking-[0.12em] text-white">SISTRIX</span>
        <Search className="h-3.5 w-3.5 shrink-0 text-white" strokeWidth={2.5} aria-hidden />
      </div>
      <ChipLabel>
        <p className="text-[10px] font-medium text-white/75">Visibility</p>
      </ChipLabel>
    </ToolChip>
  );
}

function GoogleAnalyticsChip() {
  return (
    <ToolChip>
      <IconTile>
        <SiGlyph icon={siGoogleanalytics} className="h-5 w-5 shrink-0" />
      </IconTile>
      <ChipLabel>
        <p className="text-xs font-semibold text-white">Google</p>
        <p className="text-[11px] font-medium text-orange-300">Analytics</p>
      </ChipLabel>
    </ToolChip>
  );
}

function SearchConsoleChip() {
  return (
    <ToolChip>
      <IconTile>
        <SiGlyph icon={siGooglesearchconsole} className="h-5 w-5 shrink-0" />
      </IconTile>
      <ChipLabel>
        <p className="text-xs font-semibold text-white">Google</p>
        <p className="text-[11px] font-medium text-white/70">Search Console</p>
      </ChipLabel>
    </ToolChip>
  );
}

function LookerStudioChip() {
  return (
    <ToolChip>
      <IconTile>
        <SiGlyph icon={siLooker} className="h-5 w-5 shrink-0" />
      </IconTile>
      <ChipLabel>
        <p className="text-xs font-semibold text-sky-200">Looker Studio</p>
        <p className="text-[10px] font-medium text-white/55">Reporting</p>
      </ChipLabel>
    </ToolChip>
  );
}

const CHIPS: { key: string; el: ReactNode }[] = [
  { key: "semrush", el: <SemrushChip /> },
  { key: "ahrefs", el: <AhrefsChip /> },
  { key: "majestic", el: <MajesticChip /> },
  { key: "frog", el: <ScreamingFrogChip /> },
  { key: "sistrix", el: <SistrixChip /> },
  { key: "ga", el: <GoogleAnalyticsChip /> },
  { key: "gsc", el: <SearchConsoleChip /> },
  { key: "looker", el: <LookerStudioChip /> },
];

function MarqueeStrip({ suffix }: { suffix: string }) {
  return (
    <div className="flex w-max shrink-0 flex-nowrap items-center gap-4 pr-4 sm:gap-5 sm:pr-5" aria-hidden={suffix === "b"}>
      {CHIPS.map(({ key, el }) => (
        <div key={`${suffix}-${key}`} className="shrink-0">
          {el}
        </div>
      ))}
    </div>
  );
}

export function SeoToolsMarquee() {
  return (
    <div className="relative overflow-hidden py-2">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-10 bg-gradient-to-r from-[#0b1220] to-transparent sm:w-14"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-10 bg-gradient-to-l from-[#0b1220] to-transparent sm:w-14"
        aria-hidden
      />
      <div
        className="relative z-10 flex w-max animate-marquee motion-reduce:animate-none"
        aria-label="Logos d’outils SEO et SEA"
      >
        <MarqueeStrip suffix="a" />
        <MarqueeStrip suffix="b" />
      </div>
    </div>
  );
}
