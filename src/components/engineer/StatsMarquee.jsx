// Professional snapshot — quick-scan credibility marquee.

import { motion } from "framer-motion";
import { StatCard } from "../shared/AnimationUtils";
import { STATS } from "../../data/engineer-data";

const StatsMarquee = () => (
  <section id="snapshot" aria-label="Professional Snapshot" className="relative px-6 md:px-20 z-10 max-w-6xl mx-auto mb-6">
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="glass-panel rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/15 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" />
          </span>
          <h2 className="text-[11px] md:text-xs font-bold tracking-[0.3em] uppercase text-white/50">Professional Snapshot</h2>
        </div>
        <div className="snapshot-marquee relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
          <div className="snapshot-marquee-track flex w-max py-1">
            {STATS.map((s, i) => (
              <StatCard key={`s-${i}`} s={s} />
            ))}
            {STATS.map((s, i) => (
              <StatCard key={`d-${i}`} s={s} extra="snapshot-marquee-dup" ariaHidden />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

export default StatsMarquee;
