import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type SceneHandle = {
  renderer: THREE.WebGLRenderer;
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
};

export function ShaderAnimation({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneHandle | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;

        vec3 color = vec3(0.0);
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            color[j] += lineWidth * float(i * i) / abs(
              fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2)
            );
          }
        }

        vec3 tint = vec3(0.42, 0.46, 0.98);
        vec3 ink = vec3(0.043, 0.071, 0.125);
        vec3 outColor = ink + color * tint * 0.85;
        gl_FragColor = vec4(outColor, 1.0);
      }
    `;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    const onWindowResize = () => {
      const width = container.clientWidth;
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height);
      uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
    };

    onWindowResize();
    window.addEventListener("resize", onWindowResize, false);

    sceneRef.current = { renderer, geometry, material };

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onWindowResize);
      cancelAnimationFrame(raf);

      const handle = sceneRef.current;
      sceneRef.current = null;
      if (!handle) return;

      const { domElement } = handle.renderer;
      if (domElement.parentNode === container) {
        container.removeChild(domElement);
      }
      handle.geometry.dispose();
      handle.material.dispose();
      handle.renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("h-full min-h-dvh w-full overflow-hidden bg-ink-900", className)}
    />
  );
}
