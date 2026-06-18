// Current roles — 3 cards (Hudl, IFA, Freelance) with engineering bullets.

import { motion } from "framer-motion";
import { Reveal, TiltCard, SectionHeader } from "../shared/AnimationUtils";
import { CURRENT_ROLES } from "../../data/engineer-data";

const CurrentRoles = () => (
  <section id="roles" aria-label="Current Roles" className="relative py-16 md:py-24 px-6 md:px-20 z-10 max-w-6xl mx-auto">
    <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-600/12 rounded-full blur-[70px] pointer-events-none animate-blob" />
    <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-600/10 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <SectionHeader
        eyebrow="Where I Work"
        title="Current"
        highlight="Roles."
        subtitle="Three hats, one throughline — turning data and ideas into products that ship."
        line="from-cyan-500 via-blue-500 to-indigo-400"
        eyebrowGrad="from-cyan-400 to-blue-400"
        highlightGrad="from-cyan-400 via-blue-400 to-indigo-400"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CURRENT_ROLES.map((r, i) => (
          <Reveal key={i} idx={i}>
            <TiltCard whileHover={{ y: -6 }} className={`h-full glass-panel rounded-3xl p-6 flex flex-col group relative overflow-hidden border border-white/10 ${r.accentBorder} transition-[border-color,box-shadow,background-color] duration-500 shadow-lg`}>
              <div className={`absolute -top-16 -right-16 w-40 h-40 ${r.accentGlow} rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl bg-gradient-to-br ${r.accentGrad} shadow-lg`}>
                    <r.Icon />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 border border-white/10 px-2.5 py-1 rounded-full">{r.tag}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-1">{r.company}</h4>
                <p className={`text-sm font-semibold ${r.accentText} mb-1`}>{r.role}</p>
                <span className="text-[11px] font-mono text-white/40 mb-4 block">{r.period}</span>
                <ul className="space-y-2.5 mt-auto">
                  {r.points.map((p, pi) => (
                    <li key={pi} className="flex gap-2.5 text-[13px] text-white/60 leading-relaxed">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${r.accentGrad} shrink-0`} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </motion.div>
  </section>
);

export default CurrentRoles;
