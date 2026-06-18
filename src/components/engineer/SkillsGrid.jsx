// Skills grid — 4 categories with animated proficiency bars + live filler card.

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { AnimatedProgress, SectionHeader } from "../shared/AnimationUtils";
import { SKILL_CATEGORIES } from "../../data/engineer-data";
import { CONTACT } from "../../data/shared-data";

const DotLottieReact = lazy(() => import("@lottiefiles/dotlottie-react").then((m) => ({ default: m.DotLottieReact })));

const SkillsGrid = () => (
  <section id="skills" aria-label="Technical Skills and Capabilities" className="relative py-20 md:py-28 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <div className="absolute -top-32 -left-32 w-72 h-72 bg-rose-600/15 rounded-full blur-[60px] pointer-events-none animate-blob" />
    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-600/10 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[80px] pointer-events-none" />

    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <SectionHeader
        className="mb-14"
        eyebrow="Capabilities"
        title="Technical"
        highlight="Arsenal."
        subtitle="The tools, frameworks, and methodologies I wield to build world-class products."
        line="from-rose-500 via-pink-500 to-fuchsia-400"
        eyebrowGrad="from-rose-400 to-pink-400"
        highlightGrad="from-rose-400 via-pink-400 to-fuchsia-400"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <motion.div key={idx} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }} className={`glass-panel rounded-[2rem] p-6 flex flex-col group relative overflow-hidden border border-white/5 transition-all duration-300 ${cat.glow}`}>
            <div className="absolute -bottom-8 -right-8 text-[12rem] text-white opacity-[0.02] group-hover:opacity-[0.04] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none z-0">
              <cat.Icon />
            </div>
            <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-0 ${cat.blob}`} />

            <div className="flex items-center gap-4 mb-8 text-white text-xl relative z-10 border-b border-white/5 pb-5">
              <div className="text-white p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-sm">
                <cat.Icon />
              </div>
              <h4 className="font-bold tracking-wide">{cat.title}</h4>
            </div>

            <div className="space-y-6 relative z-10 w-full flex-grow">
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx} className="w-full flex flex-col group/skill mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg text-white/50 group-hover/skill:text-white group-hover/skill:scale-110 group-hover/skill:-translate-y-0.5 transition-all duration-300">
                        <skill.Icon className={skill.color} />
                      </span>
                      <span className="text-sm font-semibold text-white/70 group-hover/skill:text-white transition-colors">{skill.name}</span>
                    </div>
                  </div>
                  <AnimatedProgress level={skill.level} colorClass={cat.grad} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Live-environment filler */}
        <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }} className="lg:col-span-2 glass-panel rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between group relative overflow-hidden border border-white/5 transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] bg-gradient-to-br from-cyan-500/5 to-blue-600/5">
          <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay z-0" />
          <div className="absolute -top-48 -left-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-[80px] opacity-40 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-0" />

          <div className="relative z-10 w-full md:w-1/2 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
              </span>
              <h4 className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase border border-cyan-500/20 px-3 py-1 rounded-full bg-cyan-500/10 shadow-[0_0_10px_rgba(6,182,212,0.2)]">Live Environment</h4>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Constantly learning, building, and scaling.</h3>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">Every day is an opportunity to explore architecture, optimize algorithms, and push robust enterprise-grade code into production.</p>
            <div className="pt-2">
              <a href={CONTACT.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold bg-white text-black px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <FaGithub className="text-lg" /> Explore GitHub
              </a>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-1/2 flex justify-center mt-6 md:mt-0 opacity-90 group-hover:opacity-100 group-hover:scale-[1.15] drop-shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all duration-700">
            <Suspense fallback={<div className="w-full max-w-[420px] h-[280px] sm:h-[340px] md:h-[420px] rounded-full theme-soft-panel" />}>
              <DotLottieReact src="/lottie/Assistant-Bot.lottie" loop autoplay className="w-full max-w-[420px] h-[280px] sm:h-[340px] md:h-[420px] scale-110" />
            </Suspense>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

export default SkillsGrid;
