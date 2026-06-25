// Performance + capability detection. Drives whether we run heavy effects
// (particles, parallax, cursor follower) or fall back to lighter motion.

import { useState, useEffect } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// True on low-end / small devices where heavy GSAP effects would jank.
export const detectLowPerf = () => {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return true;
  const lowCpu = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
  const lowMemory = typeof navigator.deviceMemory === "number" && navigator.deviceMemory <= 4;
  const smallViewport = window.innerWidth < 1024;
  return smallViewport && (lowCpu || lowMemory);
};

// Cursor follower / hover-only effects: real pointer + desktop width only.
export const isDesktopPointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  window.innerWidth >= 1024 &&
  !prefersReducedMotion();

// Reactive desktop check (≥1024px). Used to keep heavy/decorative assets —
// lottie-react + large Lottie JSON — OFF mobile entirely so phones load fast.
export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setIsDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return isDesktop;
};
