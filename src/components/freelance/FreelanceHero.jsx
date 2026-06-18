// Freelance hero — client-focused. Outcomes, not job-search language.

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { MagneticLink, SplitHeadline } from "../shared/AnimationUtils";
import { CONTACT } from "../../data/shared-data";

const LazyHeroLottie = lazy(() =>
  Promise.all([import("lottie-react"), import("../../lottie/Support.json")]).then(([mod, data]) => ({
    default: () => <mod.default animationData={data.default} loop className="w-full max-w-lg h-[300px] sm:h-[360px] md:h-[440px] drop-shadow-2xl" />,
  }))
);

const FreelanceHero = () => (
  <section
    id="hero"
    aria-label="Introduction"
    onMouseMove={(e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    }}
    className="hero-section relative min-h-[100dvh] flex flex-col md:flex-row items-center justify-center px-6 md:px-20 z-10 pt-28 pb-12 md:py-0"
  >
    <div className="hero-spotlight pointer-events-none absolute inset-0 z-0" aria-hidden="true" />

    <div className="flex-1 flex flex-col items-start justify-center space-y-6 z-20 w-full max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full theme-soft-panel backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Available for freelance projects</span>
      </motion.div>

      <SplitHeadline
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]"
        lines={[
          { text: "I Build Digital Products" },
          { text: "→ For Growing Businesses", gradient: "from-emerald-400 via-teal-400 to-green-400" },
        ]}
      />

      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-base md:text-lg text-white/60 leading-relaxed font-light max-w-xl">
        From idea to launch. Web apps, dashboards, and AI integrations that look great, load fast, and turn visitors into customers.
      </motion.p>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-wrap items-center gap-4 pt-2">
        <MagneticLink href="#client-work" aria-label="See my work" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group relative px-6 py-3 bg-white text-black font-semibold rounded-full overflow-hidden inline-flex">
          <span className="relative z-10 flex items-center gap-2">See My Work <MdArrowOutward /></span>
        </MagneticLink>
        <MagneticLink href={CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="Get a quote on WhatsApp" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all inline-flex items-center gap-2">
          Get a Quote <FaWhatsapp className="text-base" />
        </MagneticLink>
      </motion.div>
    </div>

    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5, type: "spring" }} className="flex-1 flex justify-center items-center mt-12 md:mt-0 z-10 relative">
      <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full" />
      <Suspense fallback={<div className="w-full max-w-lg h-[300px] sm:h-[360px] md:h-[440px] rounded-full theme-soft-panel" />}>
        <LazyHeroLottie />
      </Suspense>
    </motion.div>
  </section>
);

export default FreelanceHero;
