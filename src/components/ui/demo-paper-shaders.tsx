import { useState } from "react";
import { DotOrbit, MeshGradient } from "@paper-design/shaders-react";

import { cn } from "@/lib/utils";

export default function DemoPaperShaders() {
  const [intensity, setIntensity] = useState(1.5);
  const [speed, setSpeed] = useState(1.0);
  const [activeEffect, setActiveEffect] = useState<"mesh" | "dots" | "combined">("mesh");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("pnpm i @paper-design/shaders-react");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const meshColors = ["#070a10", "#0b1220", "#182338", "#a5b4fc"];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-ink-900">
      {activeEffect === "mesh" && (
        <MeshGradient
          className="absolute inset-0 h-full w-full"
          colors={meshColors}
          speed={speed * 0.5}
          distortion={0.75}
          swirl={0.14}
          grainMixer={0.02}
          grainOverlay={0.04}
        />
      )}

      {activeEffect === "dots" && (
        <div className="absolute inset-0 h-full w-full bg-ink-900">
          <DotOrbit
            className="h-full w-full"
            speed={speed * 1.2}
            colorBack="#0b1220"
            colors={["#2d3352", "#4f46e5", "#818cf8", "#c7d2fe"]}
            spreading={0.85 + intensity * 0.08}
            size={0.55}
            stepsPerColor={4}
          />
        </div>
      )}

      {activeEffect === "combined" && (
        <>
          <MeshGradient
            className="absolute inset-0 h-full w-full"
            colors={meshColors}
            speed={speed * 0.45}
            distortion={0.7}
            swirl={0.12}
            grainMixer={0.02}
            grainOverlay={0.03}
          />
          <div className="absolute inset-0 h-full w-full opacity-[0.55]">
            <DotOrbit
              className="h-full w-full"
              colorBack="#070a10"
              colors={["#6366f1", "#312e81", "#1e1b4b"]}
              speed={speed * 1.35}
              spreading={0.9}
              size={0.5}
              stepsPerColor={3}
            />
          </div>
        </>
      )}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/3 top-1/4 h-32 w-32 animate-pulse rounded-full bg-brand-500/10 blur-3xl"
          style={{ animationDuration: `${3 / speed}s` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 h-24 w-24 animate-pulse rounded-full bg-white/[0.06] blur-2xl"
          style={{ animationDuration: `${2 / speed}s`, animationDelay: "1s" }}
        />
      </div>

      <div className="pointer-events-auto absolute bottom-8 left-8 flex flex-wrap gap-2">
        {(["mesh", "dots", "combined"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveEffect(key)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              activeEffect === key
                ? "border-brand-400/50 bg-brand-500/20 text-white"
                : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10",
            )}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="pointer-events-auto absolute bottom-8 right-8 flex flex-col gap-3 rounded-xl border border-white/10 bg-ink-900/80 p-4 text-xs text-white/80 backdrop-blur-md">
        <label className="flex items-center gap-2">
          <span className="w-14">Speed</span>
          <input
            type="range"
            min={0.2}
            max={2.5}
            step={0.05}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="flex-1"
          />
        </label>
        <label className="flex items-center gap-2">
          <span className="w-14">Spread</span>
          <input
            type="range"
            min={0.5}
            max={2.5}
            step={0.05}
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            className="flex-1"
          />
        </label>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center font-mono text-xs text-white/40">
          <div className="mb-1">@paper-design/shaders-react</div>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span>pnpm i @paper-design/shaders-react</span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="pointer-events-auto text-white/50 transition-opacity hover:text-white/80"
              title="Copy"
            >
              {copied ? "✓" : "⎘"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
