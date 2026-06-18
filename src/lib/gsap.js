// Central GSAP setup: register plugins once, set perf-friendly defaults, and
// expose a lightweight useGSAP hook.
//
// We intentionally do NOT use @gsap/react's useGSAP — under React 19 + Vite it
// throws "Invalid hook call". This hook is the same idea (scoped gsap.context
// with automatic revert on unmount / dep change) using the app's own React.

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Cheaper resize handling on mobile + snappier teardown on fast scroll.
ScrollTrigger.config({ ignoreMobileResize: true });
ScrollTrigger.defaults({ fastScrollEnd: true });

/**
 * Run GSAP setup inside a scoped context. `fn` may return a cleanup function
 * (e.g. SplitType.revert); the context (and any ScrollTriggers it created) is
 * reverted automatically on unmount or when `dependencies` change.
 */
export const useGSAP = (fn, { scope, dependencies = [] } = {}) => {
  useLayoutEffect(() => {
    let cleanup;
    const ctx = gsap.context(() => {
      cleanup = fn();
    }, scope);
    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export { gsap, ScrollTrigger };
