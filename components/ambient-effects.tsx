"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/** Pointer effects use motion values and CSS variables, never React renders per frame. */
export function AmbientEffects() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-800);
  const y = useMotionValue(-800);
  const smoothX = useSpring(x, { stiffness: 70, damping: 22 });
  const smoothY = useSpring(y, { stiffness: 70, damping: 22 });

  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let active: HTMLElement | null = null;
    const reset = () => {
      if (!active) return;
      active.style.setProperty("--tilt-x", "0deg");
      active.style.setProperty("--tilt-y", "0deg");
      active.style.setProperty("--magnet-x", "0px");
      active.style.setProperty("--magnet-y", "0px");
      active = null;
    };
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 300);
      y.set(event.clientY - 300);
      const target = (event.target as Element).closest<HTMLElement>("[data-tilt], .btn-primary, .spotlight-card");
      if (active !== target) reset();
      if (!target || target.matches(":disabled")) return;
      active = target;
      const rect = target.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      target.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      target.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      target.style.setProperty("--tilt-x", `${-py * 5}deg`);
      target.style.setProperty("--tilt-y", `${px * 5}deg`);
      target.style.setProperty("--magnet-x", `${px * 7}px`);
      target.style.setProperty("--magnet-y", `${py * 7}px`);
    };
    const leave = () => { reset(); x.set(-800); y.set(-800); };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [reduced, x, y]);

  // Keep the server/client tree identical; CSS hides the glow for reduced motion.
  return <motion.div aria-hidden="true" className="cursor-glow" style={{ x: smoothX, y: smoothY }} />;
}
