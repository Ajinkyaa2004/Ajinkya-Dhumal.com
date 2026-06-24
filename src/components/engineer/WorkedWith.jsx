// "Worked with" credibility strip — glassy monogram badges (logo-ready).

import { motion } from "framer-motion";
import { WORKED_WITH } from "../../data/engineer-data";

// Per-company accent for the monogram avatar (logos drop in later via c.logo).
const ACCENTS = [
  "from-cyan-400 to-sky-500",
  "from-indigo-400 to-blue-500",
  "from-purple-400 to-fuchsia-500",
  "from-slate-300 to-slate-500",
  "from-emerald-400 to-teal-500",
];

const WorkedWith = () => (
  <section aria-label="Worked with" className="relative px-6 md:px-20 z-10 max-w-6xl mx-auto pb-10 md:pb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="rounded-[2rem] border border-white/[0.07] bg-white/[0.02] px-6 py-9 md:px-10 md:py-10 relative overflow-hidden"
    >
      <div className="absolute inset-0 noise-texture opacity-[0.06] pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[60%] h-32 rounded-full blur-[70px] pointer-events-none" style={{ background: "rgba(var(--accent-rgb), 0.08)" }} />

      <p className="text-center text-[11px] font-bold tracking-[0.3em] uppercase text-white/35 mb-7 relative z-10">Worked with</p>

      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 relative z-10">
        {WORKED_WITH.map((c, i) =>
          c.logo ? (
            <img
              key={c.name}
              src={c.logo}
              alt={c.name}
              loading="lazy"
              className="h-9 md:h-11 w-auto object-contain opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            />
          ) : (
            <motion.span
              key={c.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              className="group inline-flex items-center gap-2.5 pl-2 pr-4 md:pr-5 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/25 transition-all duration-300 cursor-default"
            >
              <span className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white text-sm font-extrabold bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} shadow-[0_4px_14px_rgba(0,0,0,0.45)] group-hover:scale-110 transition-transform duration-300`}>
                {c.name.charAt(0)}
              </span>
              <span className="text-sm md:text-[15px] font-bold tracking-tight text-white/55 group-hover:text-white transition-colors whitespace-nowrap">
                {c.name}
              </span>
            </motion.span>
          )
        )}
      </div>
    </motion.div>
  </section>
);

export default WorkedWith;
