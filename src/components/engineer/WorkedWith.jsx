// "Worked with" credibility strip.

import { motion } from "framer-motion";
import { WORKED_WITH } from "../../data/engineer-data";

const WorkedWith = () => (
  <section aria-label="Worked with" className="relative px-6 md:px-20 z-10 max-w-6xl mx-auto pb-10 md:pb-16">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="border-t border-b border-white/[0.06] py-8">
      <p className="text-center text-[11px] font-bold tracking-[0.3em] uppercase text-white/30 mb-7">Worked with</p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-16">
        {WORKED_WITH.map((name) => (
          <span key={name} className="text-lg md:text-2xl font-extrabold tracking-tight text-white/35 hover:text-white/80 transition-colors duration-300 cursor-default whitespace-nowrap">
            {name}
          </span>
        ))}
      </div>
    </motion.div>
  </section>
);

export default WorkedWith;
