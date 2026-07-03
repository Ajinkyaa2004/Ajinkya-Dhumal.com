// "How I work" — GSAP-pinned horizontal scroll: the section pins and the 4
// steps slide left as you scroll down. Desktop only (gsap.matchMedia); on
// mobile / reduced motion it's a native horizontal swipe with snap.

import { useRef } from "react";
import { SectionHeader } from "../shared/AnimationUtils";
import { gsap, useGSAP } from "../../lib/gsap";
import { PROCESS } from "../../data/freelance-data";

const ProcessStrip = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const stage = stageRef.current;
        const dist = () => Math.max(0, track.scrollWidth - stage.offsetWidth);
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => "+=" + dist(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="process" aria-label="How I work" className="relative z-10">
      <div className="px-6 md:px-20 max-w-6xl mx-auto pt-16 md:pt-24">
        <SectionHeader
          eyebrow="How I Work"
          title="From idea to"
          highlight="launch."
          subtitle="A simple, transparent process — you always know what's happening and what's next."
          line="from-emerald-500 via-teal-500 to-green-400"
          eyebrowGrad="from-emerald-400 to-teal-400"
          highlightGrad="from-emerald-400 via-teal-400 to-green-400"
        />
      </div>

      {/* Pinned (desktop) / swipeable (mobile) stage */}
      <div ref={stageRef} className="overflow-x-auto lg:overflow-hidden snap-x snap-mandatory lg:snap-none no-scrollbar pb-6 lg:pb-0 lg:flex lg:items-center lg:min-h-[80vh]">
        <div ref={trackRef} className="flex gap-6 px-6 md:px-20 lg:pr-[20vw] w-max">
          {PROCESS.map((p, i) => (
            <div key={p.step} className="shrink-0 w-[82vw] sm:w-[60vw] lg:w-[40vw] snap-center">
              <div className="h-[400px] md:h-[440px] glass-panel rounded-[2rem] p-8 md:p-10 flex flex-col justify-between border border-white/10 relative overflow-hidden group hover:border-emerald-500/40 transition-colors duration-500">
                <div className="absolute -top-24 -right-24 w-56 h-56 bg-emerald-500/10 rounded-full blur-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
                <div className="absolute top-6 right-8 text-[8rem] leading-none font-extrabold text-white/[0.04] select-none">{p.step}</div>
                <div className="absolute -bottom-10 -right-6 text-[12rem] text-white opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none z-0 leading-none">
                  <p.Icon />
                </div>
                {/* Always-on live "intraday" ticker — pure CSS transform, cheap on every device */}
                <div
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-14 overflow-hidden pointer-events-none z-0 opacity-[0.55] group-hover:opacity-90 transition-opacity duration-500"
                  style={{ maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)" }}
                  aria-hidden="true"
                >
                  <div className="card-ticker h-full" style={{ width: "200%" }}>
                    <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="w-full h-full">
                      <path d="M0,22 L10,14 L20,28 L30,9 L40,20 L50,13 L60,30 L70,17 L80,24 L90,11 L100,22 L110,14 L120,28 L130,9 L140,20 L150,13 L160,30 L170,17 L180,24 L190,11 L200,22" fill="none" stroke="rgb(52,211,153)" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    </svg>
                  </div>
                </div>
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-lg font-extrabold shadow-lg mb-6">
                    {p.step}
                  </div>
                  <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-emerald-300/70">
                    <span className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.85)]" aria-hidden="true" />
                    Step {i + 1} of {PROCESS.length}
                  </span>
                </div>
                <div className="relative z-10">
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-3">{p.title}</h4>
                  <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-sm">{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStrip;
