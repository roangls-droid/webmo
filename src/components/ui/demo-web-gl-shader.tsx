import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { WebGLShader } from "@/components/ui/web-gl-shader";

export default function DemoWebGLShader() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-ink-900">
      <WebGLShader />
      <div className="relative z-10 mx-auto w-full max-w-3xl border border-zinc-700/80 p-2">
        <main className="relative overflow-hidden border border-zinc-700/80 py-10">
          <h1 className="mb-3 text-center text-7xl font-extrabold tracking-tighter text-white md:text-[clamp(2rem,8vw,7rem)]">
            Design is Everything
          </h1>
          <p className="px-6 text-center text-xs text-white/60 md:text-sm lg:text-lg">
            Unleashing creativity through bold visuals, seamless interfaces, and limitless possibilities.
          </p>
          <div className="my-8 flex items-center justify-center gap-1">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-xs text-emerald-400">Available for New Projects</p>
          </div>
          <div className="flex justify-center">
            <LiquidButton className="rounded-full border border-white/20 text-white" size="xl">
              Let&apos;s Go
            </LiquidButton>
          </div>
        </main>
      </div>
    </div>
  );
}
