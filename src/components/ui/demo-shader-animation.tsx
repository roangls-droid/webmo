import { ShaderAnimation } from "@/components/ui/shader-animation";

export default function DemoShaderAnimation() {
  return (
    <div className="relative flex h-[650px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-ink-900">
      <ShaderAnimation className="absolute inset-0 min-h-full" />
      <span className="pointer-events-none absolute z-10 whitespace-pre-wrap text-center text-7xl font-semibold leading-none tracking-tighter text-white">
        Shader Animation
      </span>
    </div>
  );
}
