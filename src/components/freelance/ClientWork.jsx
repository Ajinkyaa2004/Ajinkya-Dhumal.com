// Client work showcase — outcome-led cards (screenshots come in Phase 4).

import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { Reveal, SectionHeader } from "../shared/AnimationUtils";
import { CLIENT_WORK } from "../../data/freelance-data";

const ClientWork = () => (
  <section id="client-work" aria-label="Client work" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-teal-600/10 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />
    <SectionHeader
      eyebrow="Selected Work"
      title="Built for"
      highlight="Clients."
      subtitle="Real projects shipped for real businesses — from lead-gen to B2B catalogs."
      line="from-emerald-500 via-teal-500 to-green-400"
      eyebrowGrad="from-emerald-400 to-teal-400"
      highlightGrad="from-emerald-400 via-teal-400 to-green-400"
    />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {CLIENT_WORK.map((c, i) => (
        <Reveal key={c.client} idx={i}>
          <motion.div whileHover={{ y: -6 }} className={`h-full glass-panel rounded-3xl overflow-hidden group border border-white/10 hover:border-emerald-500/40 transition-colors duration-500 ${c.glow}`}>
            {/* Project screenshot (falls back to a gradient monogram) */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              {c.image ? (
                <img src={c.image} alt={`${c.client} website screenshot`} loading="lazy" className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${c.accent} flex items-center justify-center`}>
                  <div className="absolute inset-0 noise-texture opacity-20 mix-blend-overlay" />
                  <span className="text-6xl font-extrabold text-white/90 drop-shadow-lg uppercase">{c.monogram}</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
              <span className="absolute top-3 right-3 text-[10px] font-mono tracking-widest uppercase text-white/90 bg-black/45 px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/10">{c.tag}</span>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 mb-2">
                <h4 className="text-xl font-bold text-white">{c.client}</h4>
                <span className="max-w-full text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">{c.outcome}</span>
              </div>
              <p className="text-white/55 text-sm leading-relaxed mb-4">{c.desc}</p>
              {c.demo ? (
                <a href={c.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors" aria-label={`Visit ${c.client}`}>
                  Visit site <MdArrowOutward className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/30">Case study coming soon</span>
              )}
            </div>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default ClientWork;
