// "The work, by the numbers" — a real proof band of verifiable facts, replacing
// the old decorative/fake analytics chart. Numbers count up ONCE when scrolled
// into view (cheap, one-time) — no constant animation, so it stays buttery.

import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/perf";
import { CASE_STUDY_TOTAL, FEATURED_TEARDOWNS } from "../../data/pm-data";

const STATS = [
  { value: CASE_STUDY_TOTAL, label: "Strategic case studies" },
  { value: FEATURED_TEARDOWNS.length, label: "Deep teardowns" },
  { value: 4, label: "Products shipped" },
  { value: 20, label: "Users surveyed for NexPrep" },
];

const PMStatBand = () => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      ref.current.querySelectorAll("[data-count]").forEach((el) => {
        const target = parseInt(el.getAttribute("data-count"), 10);
        if (reduced) {
          el.textContent = String(target);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        });
      });
    },
    { scope: ref }
  );

  return (
    <section aria-label="Product work by the numbers" className="relative z-10 px-6 md:px-20 max-w-5xl mx-auto py-12 md:py-16">
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-80 h-40 bg-violet-600/10 rounded-full blur-[70px] pointer-events-none" />
      <p className="text-xs font-bold tracking-[0.3em] uppercase text-violet-300/70 mb-8 text-center relative z-10">The work, by the numbers</p>
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 relative z-10">
        {STATS.map((s) => (
          <div key={s.label} className="glass-panel rounded-2xl border border-white/10 p-5 md:p-6 text-center hover:border-violet-500/30 hover:bg-white/[0.03] transition-colors duration-300">
            <div className="text-3xl md:text-[2.5rem] font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text leading-none">
              <span data-count={s.value}>0</span>
            </div>
            <div className="text-[10px] md:text-[11px] text-white/50 mt-2.5 uppercase tracking-wide leading-tight">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PMStatBand;
