// PM hero — "Product-Minded Engineer → Product Manager" with IBM cert badge.

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { FileText } from "lucide-react";
import { MagneticLink, SplitHeadline } from "../shared/AnimationUtils";
import { CASE_STUDY_TOTAL } from "../../data/pm-data";
import { CONTACT } from "../../data/shared-data";

// "Man and robot at workplace" Lottie — the PM hero illustration.
const LazyHeroLottie = lazy(() =>
  Promise.all([import("lottie-react"), import("../../lottie/workplace.json")]).then(([mod, data]) => ({
    default: () => <mod.default animationData={data.default} loop className="w-full max-w-xl h-[280px] sm:h-[340px] md:h-[400px] relative drop-shadow-2xl" />,
  }))
);

const PMHero = () => (
  <section
    id="hero"
    aria-label="Introduction"
    onMouseMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    }}
    className="hero-section relative min-h-[100dvh] flex flex-col md:flex-row items-center justify-center px-6 md:px-20 z-10 pt-28 pb-12 md:py-0 gap-10"
  >
    <div className="hero-spotlight pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

    <div className="flex-1 flex flex-col items-start justify-center space-y-6 z-20 w-full max-w-2xl">
      {/* IBM PM cert badge */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-full bg-white/[0.04] border border-violet-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.12)]">
        <img src="/logos/ibm.png" alt="IBM" className="h-5 w-auto object-contain" loading="lazy" />
        <span className="text-xs font-semibold text-white/80 tracking-wide">IBM Certified — Product Management</span>
      </motion.div>

      <SplitHeadline
        className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
        lines={[
          { text: "Product-Minded Engineer" },
          { text: "→ Product Manager", gradient: "from-violet-400 via-purple-400 to-fuchsia-400" },
        ]}
      />

      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-base md:text-lg text-white/60 leading-relaxed font-light max-w-xl">
        <strong className="text-white/90">{CASE_STUDY_TOTAL} case studies. 4 shipped products.</strong> Engineering depth plus product instinct — I pressure-test strategy against real business problems and build the things I argue for.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-wrap items-center gap-4 pt-2">
        <MagneticLink href="#case-studies" aria-label="View case studies" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group relative px-6 py-3 bg-white text-black font-semibold rounded-full overflow-hidden inline-flex">
          <span className="relative z-10 flex items-center gap-2">View Case Studies <MdArrowOutward /></span>
        </MagneticLink>
        <MagneticLink href={CONTACT.resumePM} target="_blank" rel="noreferrer" aria-label="View resume" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group px-6 py-3 rounded-full font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2">
          View Resume <FileText size={15} />
        </MagneticLink>
      </motion.div>
    </div>

    {/* Workplace illustration */}
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }} className="flex-1 flex justify-center items-center w-full max-w-xl z-10 relative">
      <div className="absolute inset-0 bg-violet-500/20 blur-[60px] rounded-full" />
      <Suspense fallback={<div className="w-full max-w-xl h-[280px] sm:h-[340px] md:h-[400px] rounded-full theme-soft-panel" />}>
        <LazyHeroLottie />
      </Suspense>
    </motion.div>
  </section>
);

export default PMHero;
