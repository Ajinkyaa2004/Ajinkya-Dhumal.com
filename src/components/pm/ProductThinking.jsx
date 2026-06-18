// "Product thinking in practice" — own engineering work framed as product calls.

import { motion } from "framer-motion";
import { Reveal, SectionHeader } from "../shared/AnimationUtils";
import { PRODUCT_THINKING } from "../../data/pm-data";

const ProductThinking = () => (
  <section aria-label="Product thinking in practice" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <SectionHeader
      eyebrow="In Practice"
      title="Product Thinking,"
      highlight="Applied."
      subtitle="The same instinct, applied to products I actually shipped — not hypotheticals."
      line="from-fuchsia-500 via-purple-500 to-violet-400"
      eyebrowGrad="from-fuchsia-400 to-purple-400"
      highlightGrad="from-fuchsia-400 via-purple-400 to-violet-400"
    />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {PRODUCT_THINKING.map((p, i) => (
        <Reveal key={p.title} idx={i}>
          <motion.div whileHover={{ y: -6 }} className="h-full glass-panel rounded-3xl p-6 border border-white/10 hover:border-purple-500/40 transition-colors duration-500 relative overflow-hidden group">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-purple-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-purple-300 border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 rounded-full">{p.angle}</span>
            <h4 className="text-xl font-bold text-white mt-4 mb-2">{p.title}</h4>
            <p className="text-white/55 text-sm leading-relaxed">{p.blurb}</p>
          </motion.div>
        </Reveal>
      ))}
    </div>
  </section>
);

export default ProductThinking;
