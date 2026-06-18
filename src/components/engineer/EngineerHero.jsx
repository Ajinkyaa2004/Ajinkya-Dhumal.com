// Engineer hero — Full Stack pitch with headline metrics + developer Lottie.

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { MdArrowOutward, MdDownload } from "react-icons/md";
import { MagneticLink, SplitHeadline } from "../shared/AnimationUtils";
import { ENGINEER_HERO_STATS } from "../../data/engineer-data";
import { CONTACT } from "../../data/shared-data";

// Lazy-load lottie-react + the JSON together (heavy — keep off the critical path).
const LazyHeroLottie = lazy(() =>
  Promise.all([import("lottie-react"), import("../../lottie/DeveloperFrontEnd.json")]).then(([mod, data]) => ({
    default: () => <mod.default animationData={data.default} loop className="w-full max-w-lg h-[300px] sm:h-[360px] md:h-[440px] relative drop-shadow-2xl" />,
  }))
);

const SOCIAL_LINKS = [
  { Icon: FaGithub, href: CONTACT.github, color: "hover:text-white", label: "GitHub Profile" },
  { Icon: FaLinkedin, href: CONTACT.linkedin, color: "hover:text-blue-400", label: "LinkedIn Profile" },
  { Icon: FaEnvelope, href: `mailto:${CONTACT.email}`, color: "hover:text-red-400", label: "Send Email" },
];

const EngineerHero = () => (
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

    <div className="flex-1 flex flex-col items-start px-4 md:px-10 justify-center space-y-6 z-20 w-full max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full theme-soft-panel backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-medium text-white/70 tracking-wide uppercase">Open to Full Stack Roles</span>
      </motion.div>

      <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-white/50">
        Hi, I'm Ajinkya Dhumal
      </motion.span>

      <SplitHeadline
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1]"
        lines={[
          { text: "Full Stack Engineer" },
          { text: "→ Building AI & Data-Driven Products", gradient: "from-cyan-400 via-blue-500 to-sky-400" },
        ]}
      />

      <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-base md:text-lg text-white/60 leading-relaxed font-light max-w-xl">
        I build scalable web platforms end to end — <strong className="text-white/90">React, Next.js, Node.js, PostgreSQL</strong>. Currently shipping products with 1K+ DAU at Insight Fusion Analytics and tagging pro sports data at Hudl.
      </motion.p>

      {/* Headline metrics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-wrap gap-3 pt-1">
        {ENGINEER_HERO_STATS.map((s) => (
          <div key={s.label} className="flex flex-col px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10">
            <span className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text leading-none">{s.value}</span>
            <span className="text-[10px] md:text-[11px] text-white/50 mt-1 uppercase tracking-wide">{s.label}</span>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-wrap items-center gap-4 pt-2">
        <MagneticLink href="#projects" aria-label="View featured projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group relative px-6 py-3 bg-white text-black font-semibold rounded-full overflow-hidden inline-flex">
          <span className="relative z-10 flex items-center gap-2">View Projects <MdArrowOutward /></span>
        </MagneticLink>

        <MagneticLink href={CONTACT.resumeEngineer} target="_blank" rel="noreferrer" aria-label="Download resume" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="group px-6 py-3 rounded-full font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2">
          Download Resume <MdDownload className="text-sm" />
        </MagneticLink>

        <div className="flex items-center gap-4 ml-2" role="list" aria-label="Social links">
          {SOCIAL_LINKS.map((item, i) => (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className={`text-white/50 transition-colors duration-300 ${item.color} p-2 bg-white/5 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/10`}>
              <item.Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </motion.div>
    </div>

    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.5, type: "spring" }} className="flex-1 flex justify-center items-center mt-12 md:mt-0 z-10 relative">
      <div className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full" />
      <Suspense fallback={<div className="w-full max-w-lg h-[300px] sm:h-[360px] md:h-[440px] rounded-full theme-soft-panel" />}>
        <LazyHeroLottie />
      </Suspense>
    </motion.div>
  </section>
);

export default EngineerHero;
