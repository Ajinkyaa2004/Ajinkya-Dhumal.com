// Professional snapshot — quick-scan credibility marquee.
// The auto-marquee is driven by scrollLeft (not a CSS transform) so the SAME
// container is natively scrollable: users can swipe (mobile), drag or wheel
// (desktop) to fast-forward and read at their own pace. It pauses the instant
// they interact and resumes ~1.4s after they stop. Reduced-motion users get a
// static, fully-visible, manually-scrollable strip (no auto-motion).

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { StatCard } from "../shared/AnimationUtils";
import { STATS } from "../../data/engineer-data";
import { prefersReducedMotion } from "../../lib/perf";

const StatsMarquee = () => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || prefersReducedMotion()) return;

    let paused = false;
    let idleTimer;
    let last = performance.now();
    const pauseNow = () => {
      paused = true;
      clearTimeout(idleTimer);
    };
    const resumeSoon = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        paused = false;
        last = performance.now();
      }, 1400);
    };

    // Auto-marquee: nudge scrollLeft every frame; wrap at the halfway mark
    // (the list is duplicated) so the loop is seamless.
    let raf;
    const SPEED = 45; // px / second
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!paused && el.scrollWidth > el.clientWidth + 4) {
        el.scrollLeft += SPEED * dt;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Pause on any user intent; resume when they're done. We deliberately do NOT
    // listen to the `scroll` event (our own scrollLeft writes would fire it and
    // pause us forever) — only real input events.
    const onEnter = () => pauseNow();
    const onLeave = () => resumeSoon();
    const onWheel = () => {
      pauseNow();
      resumeSoon();
    };
    const onTouchStart = () => pauseNow();
    const onTouchEnd = () => resumeSoon();

    // Desktop drag-to-scroll (touch already pans natively via overflow-x-auto).
    let down = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      pauseNow();
      startX = e.pageX;
      startScroll = el.scrollLeft;
    };
    const onMove = (e) => {
      if (down) el.scrollLeft = startScroll - (e.pageX - startX);
    };
    const onUp = () => {
      if (down) {
        down = false;
        resumeSoon();
      }
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <section id="snapshot" aria-label="Professional Snapshot" className="relative px-6 md:px-20 z-10 max-w-6xl mx-auto mb-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/15 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
              </span>
              <h2 className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/50">Professional Snapshot</h2>
            </div>
            <span className="hidden sm:inline text-[10px] font-mono tracking-widest uppercase text-white/30 select-none">Swipe / drag to explore →</span>
          </div>
          <div
            ref={scrollerRef}
            className="snapshot-marquee relative overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none touch-pan-x"
            style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}
          >
            <div className="snapshot-marquee-track flex w-max py-1">
              {STATS.map((s, i) => (
                <StatCard key={`s-${i}`} s={s} />
              ))}
              {STATS.map((s, i) => (
                <StatCard key={`d-${i}`} s={s} extra="snapshot-marquee-dup" ariaHidden />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default StatsMarquee;
