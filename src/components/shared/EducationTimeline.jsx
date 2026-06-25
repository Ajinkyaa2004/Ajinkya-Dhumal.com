// Experience + Education timeline — a GSAP-pinned HORIZONTAL scroller.
// The section pins; the rail + nodes + alternating cards slide left as you
// scroll. Each entry reveals as it crosses the viewport (GSAP containerAnimation),
// and a comet sweeps the rail. Desktop only (gsap.matchMedia); mobile = swipe.

import { useRef } from "react";
import { MdWork } from "react-icons/md";
import { GraduationCap } from "lucide-react";
import { SectionHeader } from "./AnimationUtils";
import { gsap, useGSAP } from "../../lib/gsap";
import { EDUCATION } from "../../data/shared-data";

const TimelineCard = ({ edu, pos }) => (
  <div
    data-card
    className="w-[260px] sm:w-[300px] glass-panel rounded-2xl p-5 border border-white/10 relative hover:border-amber-500/40 transition-colors duration-500 shadow-xl"
  >
    {/* stem connecting card to the rail node */}
    <div className={`absolute left-1/2 -translate-x-1/2 w-px h-5 bg-gradient-to-b from-amber-500/50 to-transparent ${pos === "top" ? "-bottom-5 rotate-180" : "-top-5"}`} />
    <span className={`font-mono text-xs ${edu.isWork ? "text-amber-400" : "text-orange-400"} font-bold tracking-wide block mb-2`}>{edu.year}</span>
    <h4 className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">{edu.title}</h4>
    <span className="text-xs sm:text-sm text-white/70 block mb-2 font-medium">{edu.place}</span>
    <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed line-clamp-3">{edu.desc}</p>
  </div>
);

const EducationTimeline = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const cometRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Pinned horizontal scroll on ALL widths (phones included) — scroll up/down,
      // content moves left→right. Reduced-motion users get the native swipe instead.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);

        const scrollTween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + dist(),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Comet sweeps the rail in sync with scroll.
        gsap.fromTo(
          cometRef.current,
          { x: 0 },
          {
            x: () => track.scrollWidth - 40,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top top", end: () => "+=" + dist(), scrub: 1, invalidateOnRefresh: true },
          }
        );

        // Reveal each entry as it crosses the horizontal viewport.
        track.querySelectorAll("[data-entry]").forEach((el) => {
          const card = el.querySelector("[data-card]");
          const node = el.querySelector("[data-node]");
          const top = el.getAttribute("data-pos") === "top";
          gsap.from(card, {
            opacity: 0,
            y: top ? -50 : 50,
            scale: 0.92,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, containerAnimation: scrollTween, start: "left 82%", toggleActions: "play none none reverse" },
          });
          gsap.fromTo(
            node,
            { scale: 0.5, opacity: 0.4 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: { trigger: el, containerAnimation: scrollTween, start: "left 68%", toggleActions: "play none none reverse" },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="education" aria-label="Experience and Education Timeline" className="relative z-10 motion-safe:h-screen motion-safe:flex motion-safe:flex-col motion-safe:justify-center overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-600/10 rounded-full blur-[70px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-[70px] pointer-events-none" />

      <div className="px-6 md:px-20 max-w-6xl mx-auto w-full pt-16 lg:pt-0 mb-8 lg:mb-12 relative z-10">
        <SectionHeader
          eyebrow="Timeline"
          title="Experience &"
          highlight="Education"
          subtitle="Scroll through my path in professional roles and computer science."
          line="from-amber-500 via-orange-500 to-yellow-400"
          eyebrowGrad="from-amber-400 to-orange-400"
          highlightGrad="from-amber-400 via-orange-400 to-yellow-400"
        />
      </div>

      {/* Pinned horizontal stage (all sizes via motion-safe; reduced-motion = swipe) */}
      <div ref={stageRef} className="overflow-x-auto motion-safe:overflow-hidden no-scrollbar snap-x snap-mandatory motion-safe:snap-none">
        <div ref={trackRef} className="relative flex items-stretch px-6 md:px-20 lg:pr-[20vw] w-max h-[420px] sm:h-[460px]">
          {/* rail */}
          <div className="absolute left-6 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-amber-500/10 via-amber-500/50 to-amber-500/10 shadow-[0_0_12px_rgba(251,146,60,0.3)]" />
          {/* comet */}
          <div ref={cometRef} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden motion-safe:block">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-200 via-orange-400 to-orange-500 shadow-[0_0_18px_rgba(251,146,60,0.9),0_0_40px_rgba(251,146,60,0.5)]" />
          </div>

          {EDUCATION.map((edu, i) => {
            const top = i % 2 === 0;
            const Icon = edu.isWork ? MdWork : GraduationCap;
            return (
              <div key={i} data-entry data-pos={top ? "top" : "bottom"} className="relative shrink-0 w-[300px] sm:w-[340px] h-full flex flex-col items-center snap-center">
                <div className={`flex-1 w-full flex justify-center ${top ? "items-end pb-6" : ""}`}>
                  {top && <TimelineCard edu={edu} pos="top" />}
                </div>
                <div
                  data-node
                  className={`relative z-10 w-12 h-12 rounded-full border-2 ${edu.isWork ? "border-amber-500/60 text-amber-300" : "border-orange-500/60 text-orange-300"} bg-[#050505] flex items-center justify-center shadow-[0_0_15px_rgba(251,146,60,0.4)] shrink-0`}
                >
                  <Icon size={18} />
                </div>
                <div className={`flex-1 w-full flex justify-center ${!top ? "items-start pt-6" : ""}`}>
                  {!top && <TimelineCard edu={edu} pos="bottom" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* subtle scroll hint */}
      <p className="hidden motion-safe:block text-center text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 mt-6">Scroll to explore →</p>
    </section>
  );
};

export default EducationTimeline;
