// The star section — 16 strategic case studies as a compact interactive tile
// board: all 16 fit on ~one screen (no forced scroll, nothing hidden). Pick a
// tile → its question, my take, and the Notion link appear in the detail panel.
// Filter chips narrow by theme. Color-coded by theme.

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { SectionHeader } from "../shared/AnimationUtils";
import { CASE_STUDY_CATEGORIES, CASE_STUDY_TOTAL, STUDY_TAKES } from "../../data/pm-data";

// Flatten the studies, carrying each one's category styling + take.
const STUDIES = CASE_STUDY_CATEGORIES.flatMap((cat) =>
  cat.studies.map((s) => ({
    ...s,
    catKey: cat.key,
    catTitle: cat.title,
    accentGrad: cat.accentGrad,
    accentText: cat.accentText,
    chip: cat.chip,
    take: STUDY_TAKES[s.company],
  }))
);

const FILTERS = [
  { key: "all", label: "All", count: STUDIES.length },
  ...CASE_STUDY_CATEGORIES.map((c) => ({ key: c.key, label: c.title, count: c.studies.length })),
];

const CaseStudyGrid = () => {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(STUDIES[0].company);
  const detailRef = useRef(null);

  const visible = filter === "all" ? STUDIES : STUDIES.filter((s) => s.catKey === filter);
  const s = STUDIES.find((x) => x.company === active) || STUDIES[0];
  const live = Boolean(s.link);

  const selectFilter = (key) => {
    setFilter(key);
    const first = key === "all" ? STUDIES[0] : STUDIES.find((x) => x.catKey === key);
    if (first) setActive(first.company);
  };

  const selectTile = (company) => {
    setActive(company);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
    }
  };

  return (
    <section id="case-studies" aria-label="Product case studies" className="relative py-20 md:py-28 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-violet-600/15 rounded-full blur-[60px] pointer-events-none animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />

      <SectionHeader
        eyebrow={`${CASE_STUDY_TOTAL} deep dives`}
        title="Case Study"
        highlight="Showcase."
        subtitle="Pick any company — its strategic question, my take, and the full write-up, in one tap. Everything on one screen, no scrolling required."
        line="from-violet-500 via-purple-500 to-fuchsia-400"
        eyebrowGrad="from-violet-400 to-purple-400"
        highlightGrad="from-violet-400 via-purple-400 to-fuchsia-400"
      />

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2.5 mb-7">
        {FILTERS.map((f) => {
          const on = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => selectFilter(f.key)}
              className={`inline-flex items-center gap-2 text-[13px] font-semibold px-4 py-2 rounded-full border transition-all duration-300 ${on ? "bg-white text-black border-white" : "border-white/12 text-white/60 hover:text-white hover:border-white/30 bg-white/[0.03]"}`}
            >
              {f.label}
              <span className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md ${on ? "bg-black/10" : "bg-white/10 text-white/70"}`}>{f.count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Tiles */}
        <div className="lg:col-span-7">
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <AnimatePresence mode="popLayout">
              {visible.map((study, i) => {
                const on = study.company === active;
                return (
                  <motion.button
                    layout
                    key={study.company}
                    type="button"
                    onClick={() => selectTile(study.company)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.28, delay: Math.min(i, 12) * 0.02 }}
                    className={`group relative flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-colors duration-300 ${on ? "border-white/30 bg-white/[0.07]" : "border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"}`}
                    aria-pressed={on}
                    aria-label={`${study.company} case study`}
                  >
                    <span className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-white font-extrabold text-[11px] uppercase bg-gradient-to-br ${study.accentGrad} shadow group-hover:scale-105 transition-transform duration-300`}>
                      {study.monogram || study.company.charAt(0)}
                    </span>
                    <span className="text-[12.5px] font-semibold text-white/85 leading-tight truncate">{study.company}</span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* legend */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
            {CASE_STUDY_CATEGORIES.map((c) => (
              <span key={c.key} className="inline-flex items-center gap-2 text-[11px] text-white/40">
                <span className={`w-2.5 h-2.5 rounded-sm bg-gradient-to-br ${c.accentGrad}`} />
                {c.title}
              </span>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div ref={detailRef} className="lg:col-span-5">
          <div className="glass-panel rounded-3xl border border-white/10 p-6 md:p-7 relative overflow-hidden min-h-[280px]">
            <div className="absolute inset-0 noise-texture opacity-[0.05] pointer-events-none mix-blend-overlay" />
            <div className={`absolute -top-24 -right-24 w-52 h-52 rounded-full blur-[70px] opacity-30 bg-gradient-to-br ${s.accentGrad} pointer-events-none`} />
            <motion.div key={s.company} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="relative z-10">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg uppercase bg-gradient-to-br ${s.accentGrad} shadow-lg`}>{s.monogram || s.company.charAt(0)}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider border px-2.5 py-1 rounded-full ${s.chip}`}>{s.catTitle}</span>
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{s.company}</h4>
                <p className="text-white/80 text-[15px] leading-relaxed font-medium mb-4">{s.question}</p>
                {s.take && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 mb-5">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${s.accentText} mb-1.5`}>My take</p>
                    <p className="text-white/70 text-[13px] leading-relaxed">{s.take}</p>
                  </div>
                )}
                {live ? (
                  <a href={s.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold bg-white text-black px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    Read full case study <MdArrowOutward />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/35">Full write-up coming soon</span>
                )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyGrid;
