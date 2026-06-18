// Performance + capability detection. Drives whether we run heavy effects
// (particles, parallax, cursor follower) or fall back to lighter motion.

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
