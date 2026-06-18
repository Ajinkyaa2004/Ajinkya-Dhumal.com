// Client testimonials slider. Handles 0, 1, or many entries gracefully.
// NOTE: current entries are placeholders (see freelance-data.js) — swap for
// real, attributable quotes before launch.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeader } from "../shared/AnimationUtils";
import { TESTIMONIALS } from "../../data/freelance-data";

const TestimonialsSlider = () => {
  const [idx, setIdx] = useState(0);
  if (!TESTIMONIALS.length) return null;

  const count = TESTIMONIALS.length;
  const t = TESTIMONIALS[idx];
  const go = (dir) => setIdx((p) => (p + dir + count) % count);

  return (
    <section aria-label="Testimonials" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-4xl mx-auto">
      <SectionHeader
        className="text-center mb-10 flex flex-col items-center"
        eyebrow="Kind Words"
        title="What Clients"
        highlight="Say."
        line="from-emerald-500 via-teal-500 to-green-400"
        eyebrowGrad="from-emerald-400 to-teal-400"
        highlightGrad="from-emerald-400 via-teal-400 to-green-400"
      />

      <div className="relative glass-panel rounded-3xl p-8 md:p-12 border border-white/10 overflow-hidden">
        <Quote className="absolute -top-2 -left-2 w-24 h-24 text-emerald-500/10" />
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }} className="relative z-10 text-center">
            <p className="text-lg md:text-2xl text-white/85 font-light leading-relaxed">"{t.quote}"</p>
            <div className="mt-6">
              <p className="text-white font-semibold">{t.name}</p>
              <p className="text-white/40 text-sm">{t.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8 relative z-10">
            <button onClick={() => go(-1)} aria-label="Previous testimonial" className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Go to testimonial ${i + 1}`} className={`h-2 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-emerald-400" : "w-2 bg-white/20 hover:bg-white/40"}`} />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next testimonial" className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSlider;
