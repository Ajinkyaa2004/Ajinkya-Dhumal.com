// /engineer — self-contained engineering portfolio for tech recruiters.
// Top half = engineering pitch; bottom half = shared personal brand.

import { motion } from "framer-motion";
import { FaBullseye } from "react-icons/fa";
import Seo from "../components/shared/Seo";
import EngineerHero from "../components/engineer/EngineerHero";
import StatsMarquee from "../components/engineer/StatsMarquee";
import CurrentRoles from "../components/engineer/CurrentRoles";
import WorkedWith from "../components/engineer/WorkedWith";
import ProjectsGallery from "../components/engineer/ProjectsGallery";
import SkillsGrid from "../components/engineer/SkillsGrid";
import GitHubActivity from "../components/engineer/GitHubActivity";
import SharedBottom from "../components/shared/SharedBottom";
import { INTERESTS } from "../data/engineer-data";

const InterestedIn = () => (
  <section id="interested" aria-label="Interested In" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/12 rounded-full blur-[70px] pointer-events-none animate-blob" />
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="glass-panel rounded-[2rem] p-8 md:p-12 border border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="absolute -bottom-12 -right-8 text-[14rem] text-white opacity-[0.025] -rotate-12 pointer-events-none z-0 leading-none">
        <FaBullseye />
      </div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-600/12 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
        <div className="md:w-1/3">
          <motion.div initial={{ width: 0 }} whileInView={{ width: "60px" }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }} className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 rounded-full mb-4" />
          <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 uppercase mb-3">Open To</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Interested <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 text-transparent bg-clip-text">In</span>.
          </h3>
          <p className="text-white/50 text-sm mt-3">Roles and collaborations where I do my best work.</p>
        </div>
        <div className="md:w-2/3 flex flex-wrap gap-3">
          {INTERESTS.map((it, i) => (
            <motion.span key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }} whileHover={{ y: -3 }} className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white/90 text-sm font-semibold hover:border-blue-500/40 hover:bg-white/[0.06] transition-all duration-300">
              <span className="text-blue-400 text-base"><it.Icon /></span>
              {it.label}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

const ENGINEER_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Featured projects by Ajinkya Dhumal",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "NexPrep AI", url: "https://nexprepai.vercel.app/" },
    { "@type": "ListItem", position: 2, name: "CopaScore AI", url: "https://copascore-with-llm.onrender.com/" },
    { "@type": "ListItem", position: 3, name: "Skillquest IFA", url: "https://ifa-hiring-platform.vercel.app" },
    { "@type": "ListItem", position: 4, name: "Smart Algo Trade", url: "https://github.com/Ajinkyaa2004/Smart-Algo-Trading" },
    { "@type": "ListItem", position: 5, name: "Max Extrusions", url: "https://www.maxextrusions.com/" },
    { "@type": "ListItem", position: 6, name: "Godrej Properties", url: "https://www.godrejreserve.org.in/" },
  ],
};

const EngineerPage = () => (
  <>
    <Seo
      title="Ajinkya Dhumal — Full Stack Engineer | React, Next.js, Node.js"
      description="Full Stack Engineer shipping AI & data-driven products — 1K+ DAU, 50K+ records/day ETL pipelines, 40% latency cut. React, Next.js, Node.js, PostgreSQL. Open to full-stack roles."
      path="/engineer"
      jsonLd={ENGINEER_JSONLD}
    />
    <EngineerHero />
    <StatsMarquee />
    <CurrentRoles />
    <WorkedWith />
    <ProjectsGallery />
    <SkillsGrid />
    <GitHubActivity />
    <InterestedIn />
    <SharedBottom />
  </>
);

export default EngineerPage;
