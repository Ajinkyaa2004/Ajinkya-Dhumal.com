// "Why I'm moving to PM" — narrative + PM skills + currently-learning ticker.
// The narrative is a scroll-scrubbed "guided read": each word brightens from dim
// to full as you scroll past it (opacity only, so it stays buttery at 60fps).

import { useRef } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "../shared/AnimationUtils";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/perf";
import SplitType from "split-type";
import { WHY_PM, PM_SKILLS, CURRENTLY_LEARNING } from "../../data/pm-data";

const WhyPM = () => {
  const narrRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const paras = narrRef.current.querySelectorAll("[data-para]");
      const splits = [];
      paras.forEach((p) => {
        const split = new SplitType(p, { types: "words" });
        splits.push(split);
        gsap.set(split.words, { opacity: 0.22 });
        gsap.to(split.words, {
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: { trigger: p, start: "top 82%", end: "top 38%", scrub: true },
        });
      });
      return () => splits.forEach((s) => s.revert());
    },
    { scope: narrRef }
  );

  return (
    <section aria-label="Why I'm moving to Product Management" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-violet-600/12 rounded-full blur-[70px] pointer-events-none animate-blob" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Narrative */}
        <div>
          <SectionHeader
            eyebrow="The Why"
            title="Why I'm moving to"
            highlight="Product."
            line="from-violet-500 via-purple-500 to-fuchsia-400"
            eyebrowGrad="from-violet-400 to-purple-400"
            highlightGrad="from-violet-400 via-purple-400 to-fuchsia-400"
          />
          <div ref={narrRef} className="space-y-4">
            {WHY_PM.map((para, i) => (
              <p key={i} data-para className="text-white/90 text-[15px] leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Skills + learning */}
        <div className="space-y-8 md:pt-16">
          <div className="glass-panel rounded-3xl p-6 md:p-7 border border-white/10">
            <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-violet-300 mb-5">PM Toolkit</h4>
            <div className="flex flex-wrap gap-2.5">
              {PM_SKILLS.map((skill, i) => (
                <motion.span key={skill} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: i * 0.04 }} viewport={{ once: true }} className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white/80 text-[13px] font-medium hover:border-violet-500/40 hover:bg-white/[0.06] transition-all duration-300">
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 md:p-7 border border-white/10">
            <div className="flex items-center gap-2 mb-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-fuchsia-500" />
              </span>
              <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-fuchsia-300">Currently Learning</h4>
            </div>
            <ul className="space-y-3">
              {CURRENTLY_LEARNING.map((item, i) => (
                <motion.li key={item} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }} viewport={{ once: true }} className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPM;
