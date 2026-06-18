// The star section — 16 strategic case studies across 3 themed categories.
// Cards stagger in by category via GSAP ScrollTrigger; hover-lift is CSS (so it
// doesn't fight GSAP's entrance transform).

import { useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import { SectionHeader } from "../shared/AnimationUtils";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/perf";
import { CASE_STUDY_CATEGORIES, CASE_STUDY_TOTAL } from "../../data/pm-data";

const StudyCard = ({ study, cat }) => {
  const live = Boolean(study.link);
  const inner = (
    <div className={`h-full glass-panel rounded-3xl p-6 flex flex-col group relative overflow-hidden border border-white/10 ${cat.hoverBorder} ${cat.glow} transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5`}>
      <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg uppercase bg-gradient-to-br ${cat.accentGrad} shadow-lg`}>
          {study.monogram || study.company.slice(0, 1)}
        </div>
        <span className={`text-[10px] font-mono tracking-widest uppercase border px-2.5 py-1 rounded-full ${cat.chip}`}>{study.company}</span>
      </div>
      <p className="text-white/80 text-[15px] leading-relaxed font-medium relative z-10 flex-grow">{study.question}</p>
      <div className="relative z-10 mt-5 pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors">
        {live ? (
          <span className={`inline-flex items-center gap-2 text-sm font-semibold ${cat.accentText}`}>
            Read case study
            <MdArrowOutward className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/30">Coming soon</span>
        )}
      </div>
    </div>
  );

  return (
    <div data-case-card className="h-full">
      {live ? (
        <a href={study.link} target="_blank" rel="noreferrer" className="block h-full" aria-label={`${study.company} case study`}>
          {inner}
        </a>
      ) : (
        <div className="h-full cursor-default" aria-label={`${study.company} case study coming soon`}>{inner}</div>
      )}
    </div>
  );
};

const CategoryBlock = ({ cat }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const cards = ref.current.querySelectorAll("[data-case-card]");
      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1 });
        return;
      }
      gsap.from(cards, {
        opacity: 0,
        y: 44,
        rotateX: -10,
        transformOrigin: "50% 100%",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref}>
      <div className="flex items-center gap-3 mb-2">
        <span className={`text-sm md:text-base font-bold ${cat.accentText} whitespace-nowrap`}>{cat.title}</span>
        <span className="text-[11px] font-mono text-white/30">{cat.studies.length} studies</span>
        <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
      </div>
      <p className="text-white/40 text-sm mb-6">{cat.blurb}</p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
        {cat.studies.map((study) => (
          <StudyCard key={study.company} study={study} cat={cat} />
        ))}
      </div>
    </div>
  );
};

const CaseStudyGrid = () => (
  <section id="case-studies" aria-label="Product case studies" className="relative py-20 md:py-28 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <div className="absolute -top-32 -right-32 w-72 h-72 bg-violet-600/15 rounded-full blur-[60px] pointer-events-none animate-blob" />
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />

    <SectionHeader
      eyebrow={`${CASE_STUDY_TOTAL} deep dives`}
      title="Case Study"
      highlight="Showcase."
      subtitle="Strategic product teardowns across pricing, unit economics, and growth — each a full written analysis on Notion."
      line="from-violet-500 via-purple-500 to-fuchsia-400"
      eyebrowGrad="from-violet-400 to-purple-400"
      highlightGrad="from-violet-400 via-purple-400 to-fuchsia-400"
    />

    <div className="space-y-14">
      {CASE_STUDY_CATEGORIES.map((cat) => (
        <CategoryBlock key={cat.key} cat={cat} />
      ))}
    </div>
  </section>
);

export default CaseStudyGrid;
