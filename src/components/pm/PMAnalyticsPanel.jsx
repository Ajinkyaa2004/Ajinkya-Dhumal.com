// PM hero visual — an animated product-analytics dashboard (stands in for the
// "analytics Lottie" in the brief, built custom so there's no missing asset and
// it's on-brand). Bars grow on mount; metric numbers count up.

import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/perf";
import { PM_HERO_STATS } from "../../data/pm-data";

const BARS = [38, 55, 47, 70, 60, 84, 76];

const PMAnalyticsPanel = () => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const bars = ref.current.querySelectorAll("[data-bar]");
      const line = ref.current.querySelector("[data-spark]");

      if (reduced) {
        gsap.set(bars, { scaleY: 1 });
        if (line) gsap.set(line, { strokeDashoffset: 0 });
      } else {
        gsap.set(bars, { transformOrigin: "50% 100%" });
        gsap.from(bars, { scaleY: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, delay: 0.25 });

        // After the grow-in, keep the chart subtly "alive" — each bar breathes
        // with its own amplitude/period so it reads as streaming live data.
        bars.forEach((bar, i) => {
          gsap.to(bar, {
            scaleY: gsap.utils.random(0.86, 0.99),
            duration: gsap.utils.random(1.7, 2.9),
            delay: 1.6 + i * 0.12,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            overwrite: "auto",
          });
        });

        if (line) {
          const len = line.getTotalLength();
          gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(line, { strokeDashoffset: 0, duration: 1.1, ease: "power2.out", delay: 0.6 });
          // Gentle trend-line shimmer.
          gsap.to(line, { opacity: 0.45, duration: 2.2, delay: 1.7, repeat: -1, yoyo: true, ease: "sine.inOut" });
        }
      }

      // Count-up numeric metrics.
      ref.current.querySelectorAll("[data-count]").forEach((el) => {
        const target = parseInt(el.getAttribute("data-count"), 10);
        if (reduced) {
          el.textContent = String(target);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, { v: target, duration: 1.2, ease: "power2.out", delay: 0.4, onUpdate: () => (el.textContent = String(Math.round(obj.v))) });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="glass-panel rounded-3xl p-6 border border-white/10 w-full relative overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-fuchsia-500/10 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
            </span>
            <h3 className="text-xs font-bold tracking-[0.25em] uppercase text-white/60">Product Analytics</h3>
          </div>
          <span className="text-[10px] font-semibold text-violet-300 bg-violet-500/10 border border-violet-500/30 px-2.5 py-1 rounded-full">▲ on track</span>
        </div>

        {/* Bar chart with a drawn sparkline overlay */}
        <div className="relative h-40">
          <div className="absolute inset-0 flex items-end gap-2.5">
            {BARS.map((h, i) => (
              <div key={i} className="flex-1 flex items-end h-full">
                <div data-bar className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-fuchsia-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]" style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline data-spark points="2,66 18,50 33,58 50,30 66,40 82,14 98,24" fill="none" stroke="#e9d5ff" strokeWidth="1.2" vectorEffect="non-scaling-stroke" opacity="0.8" />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          {PM_HERO_STATS.map((s) => {
            const numeric = /^\d+$/.test(String(s.value));
            return (
              <div key={s.label} className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 text-center">
                <div className="text-2xl font-extrabold bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text leading-none">
                  {numeric ? <span data-count={s.value}>0</span> : s.value}
                </div>
                <div className="text-[9px] text-white/45 mt-1.5 uppercase tracking-wide leading-tight">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PMAnalyticsPanel;
