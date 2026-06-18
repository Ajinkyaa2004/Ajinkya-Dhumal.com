// Services offered — client-facing, outcome-oriented.

import { motion } from "framer-motion";
import { Reveal, SectionHeader } from "../shared/AnimationUtils";
import { SERVICES } from "../../data/freelance-data";

const ServicesGrid = () => (
  <section id="services" aria-label="Services" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-600/12 rounded-full blur-[70px] pointer-events-none animate-blob" />
    <SectionHeader
      eyebrow="What I Do"
      title="Services"
      highlight="I Offer."
      subtitle="Everything you need to take a product from idea to live — built end to end."
      line="from-emerald-500 via-teal-500 to-green-400"
      eyebrowGrad="from-emerald-400 to-teal-400"
      highlightGrad="from-emerald-400 via-teal-400 to-green-400"
    />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {SERVICES.map((s, i) => (
        <Reveal key={s.title} idx={i}>
          <motion.div whileHover={{ y: -6 }} className="h-full glass-panel rounded-3xl p-6 border border-white/10 hover:border-emerald-500/40 transition-colors duration-500 relative overflow-hidden group">
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl bg-gradient-to-br ${s.accent} shadow-lg mb-5`}>
              <s.Icon />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
            <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default ServicesGrid;
