// "A PRD I'd actually ship" — a real PM deliverable rendered as a LIVING product
// spec for NexPrep AI (a product Ajinkya shipped). Ambient motion keeps it alive
// (rotating gradient border, scan line, blinking caret, twinkling North Star),
// while a pulled-out North Star callout + fast staggered cascade help a recruiter
// get the gist in one glance.

import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub, FaStar } from "react-icons/fa";
import { SectionHeader } from "../shared/AnimationUtils";
import { NEXPREP_PRD as P } from "../../data/pm-data";

// Fast staggered cascade — everything is on screen in well under a second, so it
// reads quickly rather than making the user wait.
const container = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } };

const ProductSpec = () => (
  <section aria-label="Sample PRD" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-fuchsia-600/12 rounded-full blur-[70px] pointer-events-none animate-blob" />

    <SectionHeader
      eyebrow="PM Deliverable"
      title="A PRD I'd actually"
      highlight="ship."
      subtitle="Talk is cheap — here's a one-page product spec for NexPrep AI, a product I shipped. The artifact, not just the story."
      line="from-violet-500 via-purple-500 to-fuchsia-400"
      eyebrowGrad="from-violet-400 to-purple-400"
      highlightGrad="from-violet-400 via-purple-400 to-fuchsia-400"
    />

    {/* The document — STATIC gradient border (painted once, so it's buttery). The
        constant motion comes from the scan line + caret + twinkle + pulse-dot, which
        are all GPU-cheap (transform/opacity only — no per-frame repaint). */}
    <div className="rounded-[2rem] p-px bg-gradient-to-br from-violet-500/30 via-white/[0.06] to-fuchsia-500/30 shadow-[0_30px_80px_-30px_rgba(124,58,237,0.4)]">
    <div className="glass-panel rounded-[2rem] p-6 md:p-9 relative overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-[0.04] pointer-events-none mix-blend-overlay" />

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="relative z-10">
        {/* doc header */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-extrabold shadow-lg">N</span>
            <div>
              <p className="text-white font-bold text-lg leading-tight flex items-center gap-2 flex-wrap">
                {P.product}
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-violet-300/80 border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 rounded-full">
                  <span className="prd-pulse-dot w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                  Sample PRD
                </span>
              </p>
              <p className="text-white/45 text-xs">{P.tagline}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={P.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 rounded-lg transition-colors">Live demo <MdArrowOutward className="text-[13px]" /></a>
            <a href={P.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white bg-white/[0.04] hover:bg-white/10 border border-white/10 px-3 py-2 rounded-lg transition-colors"><FaGithub /> Code</a>
          </div>
        </motion.div>

        {/* one-liner with a live blinking caret */}
        <motion.p variants={item} className="text-base md:text-lg text-white/85 font-medium leading-relaxed mb-6 max-w-3xl">
          {P.oneLiner}
          <span className="prd-caret inline-block w-[3px] h-[1.05em] align-text-bottom ml-1 rounded-sm bg-fuchsia-400" />
        </motion.p>

        {/* North Star callout — the one-glance gist */}
        <motion.div variants={item} className="relative overflow-hidden rounded-2xl border border-violet-400/25 bg-gradient-to-r from-violet-500/[0.12] via-fuchsia-500/[0.06] to-transparent p-4 md:p-5 mb-8 flex items-center gap-4">
          <span className="shrink-0 w-11 h-11 rounded-xl bg-violet-500/15 border border-violet-400/30 flex items-center justify-center">
            <FaStar className="prd-twinkle text-amber-300 text-lg" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300 mb-0.5">North Star metric</p>
            <p className="text-white font-semibold text-[15px] md:text-base leading-snug">{P.northStar}</p>
          </div>
          <span className="hidden md:block ml-auto text-white/40 text-[12px] italic max-w-[180px] leading-snug text-right">{P.northStarWhy}</span>
        </motion.div>

        {/* overview blocks */}
        <motion.div variants={item} className="grid md:grid-cols-3 gap-5 mb-8">
          {P.overview.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 hover:border-violet-500/25 hover:bg-white/[0.035] transition-colors duration-300">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300 mb-2">{s.label}</p>
              <p className="text-white/60 text-[13px] leading-relaxed">{s.body}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* features */}
          <motion.div variants={item}>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Key features (prioritized)</p>
            <ul className="space-y-3">
              {P.features.map((f) => (
                <li key={f.title} className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 hover:translate-x-1 hover:border-violet-500/25 hover:bg-white/[0.04] transition-all duration-300">
                  <span className={`shrink-0 h-5 px-1.5 rounded-md flex items-center text-[9px] font-bold border ${f.p === "P0" ? "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30" : "bg-violet-500/15 text-violet-300 border-violet-500/30"}`}>{f.p}</span>
                  <div>
                    <p className="text-white text-[13.5px] font-semibold leading-tight">{f.title}</p>
                    <p className="text-white/50 text-[12.5px] leading-relaxed mt-0.5">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* metrics + risks */}
          <motion.div variants={item} className="space-y-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Success metrics</p>
              <ul className="space-y-2">
                {P.metrics.map((m, i) => {
                  const isNorthStar = /north star/i.test(m);
                  return (
                    <li key={i} className={`flex items-start gap-2.5 text-[13px] leading-relaxed ${isNorthStar ? "text-white/80" : "text-white/65"}`}>
                      {isNorthStar ? (
                        <FaStar className="text-amber-300/90 shrink-0 mt-1 text-[11px]" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shrink-0 mt-1.5" />
                      )}
                      {m}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Risks &amp; mitigations</p>
              <ul className="space-y-2.5">
                {P.risks.map((r, i) => (
                  <li key={i} className="text-[13px] leading-relaxed">
                    <span className="text-rose-300/90 font-medium">{r.risk}</span>
                    <span className="text-white/40"> → </span>
                    <span className="text-white/60">{r.fix}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.p variants={item} className="text-[11px] text-white/30 mt-8 pt-5 border-t border-white/10 italic">{P.note}</motion.p>
      </motion.div>
    </div>
    </div>
  </section>
);

export default ProductSpec;
