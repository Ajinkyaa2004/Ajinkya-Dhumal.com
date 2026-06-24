// "Featured Teardowns" — surfaces the FULL thinking for a few best case studies
// ON the page (framework → insights → recommendation → metric), so a recruiter
// sees depth without clicking out to Notion. Tabbed + animated.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { SectionHeader } from "../shared/AnimationUtils";
import { FEATURED_TEARDOWNS } from "../../data/pm-data";

const FeaturedCaseStudies = () => {
  const [active, setActive] = useState(0);
  const t = FEATURED_TEARDOWNS[active];

  return (
    <section aria-label="Featured product teardowns" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-600/12 rounded-full blur-[70px] pointer-events-none animate-blob" />

      <SectionHeader
        eyebrow="Go deeper"
        title="Featured"
        highlight="Teardowns."
        subtitle="The full thinking on a few favorites — the framework, the insights, and the call I'd actually make — without leaving the page."
        line="from-violet-500 via-purple-500 to-fuchsia-400"
        eyebrowGrad="from-violet-400 to-purple-400"
        highlightGrad="from-violet-400 via-purple-400 to-fuchsia-400"
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2.5 mb-6">
        {FEATURED_TEARDOWNS.map((f, i) => {
          const on = i === active;
          return (
            <button
              key={f.company}
              type="button"
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2.5 rounded-2xl border px-3.5 py-2.5 transition-all duration-300 ${on ? "border-white/25 bg-white/[0.06]" : "border-white/10 bg-white/[0.02] hover:border-white/20 opacity-70 hover:opacity-100"}`}
            >
              <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-extrabold text-sm bg-gradient-to-br ${f.accentGrad} shadow-lg`}>{f.company.charAt(0)}</span>
              <span className="text-left">
                <span className="block text-sm font-bold text-white leading-tight">{f.company}</span>
                <span className={`block text-[10px] font-semibold uppercase tracking-wider ${f.accentText}`}>{f.theme}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div className="glass-panel rounded-[2rem] border border-white/10 p-6 md:p-9 relative overflow-hidden">
        <div className="absolute inset-0 noise-texture opacity-[0.05] pointer-events-none mix-blend-overlay" />
        <div className={`absolute -top-28 -right-28 w-72 h-72 rounded-full blur-[80px] opacity-30 bg-gradient-to-br ${t.accentGrad} pointer-events-none`} />

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="relative z-10">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`text-[10px] font-bold uppercase tracking-wider border px-2.5 py-1 rounded-full ${t.chip}`}>{t.theme}</span>
              <span className="text-[11px] font-mono text-white/40">Framework · {t.framework}</span>
            </div>

            <p className="text-lg md:text-2xl font-bold text-white leading-snug max-w-3xl mb-7">{t.question}</p>

            <div className="grid md:grid-cols-2 gap-7 md:gap-10">
              {/* insights */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">Key insights</p>
                <ul className="space-y-3.5">
                  {t.insights.map((ins, i) => (
                    <li key={i} className="flex gap-3">
                      <span className={`shrink-0 w-6 h-6 rounded-lg border border-white/15 bg-white/[0.03] flex items-center justify-center text-[11px] font-bold ${t.accentText}`}>{i + 1}</span>
                      <span className="text-white/65 text-[13.5px] leading-relaxed">{ins}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* recommendation + metric + CTA */}
              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 relative overflow-hidden">
                  <div className={`absolute left-0 top-4 bottom-4 w-[3px] rounded-full bg-gradient-to-b ${t.accentGrad}`} />
                  <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${t.accentText} mb-2 pl-2`}>My recommendation</p>
                  <p className="text-white/80 text-sm leading-relaxed pl-2">{t.recommendation}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Metric that matters</p>
                  <p className="text-white text-sm font-semibold leading-relaxed">{t.metric}</p>
                </div>
                <a href={t.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:gap-3 transition-all">
                  Read the full teardown <MdArrowOutward />
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedCaseStudies;
