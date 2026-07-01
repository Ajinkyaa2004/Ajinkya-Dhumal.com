// Home hero hub — routes visitors to the right portfolio within ~5 seconds.
// The three route cards are the centerpiece.

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Code2, LineChart, Briefcase, ArrowRight } from "lucide-react";
import { MagneticLink, SplitHeadline } from "../shared/AnimationUtils";
import { ROUTE_ACCENTS } from "../../data/shared-data";

// The cool robot the user added (animation.json).
const LazyHeroLottie = lazy(() =>
  Promise.all([import("lottie-react"), import("../../lottie/animation.json")]).then(([mod, data]) => ({
    default: () => <mod.default animationData={data.default} loop className="w-full max-w-[340px] sm:max-w-[400px] h-[260px] sm:h-[340px] md:h-[400px]" />,
  }))
);

const ROUTE_CARDS = [
  { ...ROUTE_ACCENTS.engineer, Icon: Code2, audience: "For tech recruiters", blurb: "Production full-stack apps, 1K+ DAU, real metrics. The whole stack, shipped." },
  { ...ROUTE_ACCENTS.pm, Icon: LineChart, audience: "For PM hiring managers", blurb: "16 strategic case studies + shipped products. Product thinking, proven." },
  { ...ROUTE_ACCENTS.freelance, Icon: Briefcase, audience: "For businesses", blurb: "Web apps, dashboards & AI for growing businesses. From idea to launch." },
];

const HeroHub = () => (
  <section id="hero" aria-label="Introduction" className="hero-section relative min-h-[100dvh] flex flex-col items-center justify-center px-6 md:px-20 z-10 pt-28 pb-16">
    <div className="hero-spotlight pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

    <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
      {/* Home robot renders on ALL screens (it's the light 37KB animation) — lazy, so
          it loads after the hero text/cards and never blocks LCP. Other pages' heavier
          hero Lotties stay desktop-only. */}
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mb-2">
        <Suspense fallback={<div className="w-full max-w-md h-[260px] sm:h-[320px] md:h-[380px]" />}>
          <LazyHeroLottie />
        </Suspense>
      </motion.div>

      <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-white/50">
        Ajinkya Dhumal
      </motion.span>

      <SplitHeadline
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mt-3 max-w-2xl mx-auto"
        lines={[
          { text: "I build products people" },
          { text: "actually use.", gradient: "from-indigo-400 via-blue-400 to-cyan-400" },
        ]}
      />

      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-base md:text-lg text-white/60 leading-relaxed font-light max-w-xl mt-5">
        Mumbai → Bangalore. CS (AI/ML) student, Full Stack Engineer, and product-minded builder. Pick the path that fits why you're here.
      </motion.p>

      {/* Route cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 w-full mt-12">
        {ROUTE_CARDS.map((card, i) => (
          <motion.div key={card.key} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 + i * 0.12 }}>
            <MagneticLink
              to={card.path}
              strength={0.25}
              whileHover={{ y: -8 }}
              className="block h-full text-left group relative rounded-3xl p-px bg-gradient-to-br from-white/10 to-white/5 hover:from-[rgba(var(--accent-rgb),0.6)] transition-all duration-500"
              aria-label={`${card.label} portfolio`}
            >
              <div className="h-full glass-panel rounded-3xl p-6 md:p-7 relative overflow-hidden">
                <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[55px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none bg-gradient-to-br ${card.solidGrad}`} />
                <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${card.solidGrad} shadow-lg mb-5`}>
                    <card.Icon size={22} strokeWidth={2.2} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-2">{card.audience}</span>
                  <h3 className="text-xl font-bold text-white mb-2">{card.label}</h3>
                  <p className="text-white/55 text-sm leading-relaxed flex-grow">{card.blurb}</p>
                  <span className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${card.grad}`}>
                    Explore
                    <ArrowRight size={15} className="text-white/70 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </MagneticLink>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroHub;
