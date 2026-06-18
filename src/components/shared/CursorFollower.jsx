// Desktop-only cursor follower: a small accent dot that trails the pointer
// (gsap.quickTo smoothing), grows over interactive elements, fades on scroll.

import { useRef, useEffect } from "react";
import { gsap } from "../../lib/gsap";
import { isDesktopPointer } from "../../lib/perf";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select";

const CursorFollower = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!isDesktopPointer()) return;
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });
    let shown = false;

    const onMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!shown) {
        shown = true;
        gsap.to(el, { opacity: 1, duration: 0.3 });
      }
    };
    const onScroll = () => {
      if (shown) {
        shown = false;
        gsap.to(el, { opacity: 0, duration: 0.25 });
      }
    };
    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE)) gsap.to(el, { scale: 2.4, duration: 0.3, overwrite: "auto" });
    };
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE)) gsap.to(el, { scale: 1, duration: 0.3, overwrite: "auto" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true" />;
};

export default CursorFollower;
