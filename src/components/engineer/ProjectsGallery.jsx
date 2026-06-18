// Featured + Client/Commercial project grids.

import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { ProjectCard, SectionHeader } from "../shared/AnimationUtils";
import { FEATURED_PROJECTS, CLIENT_PROJECTS } from "../../data/engineer-data";
import { CONTACT } from "../../data/shared-data";

const ProjectsGallery = () => (
  <section id="projects" aria-label="Featured Projects Portfolio" className="relative py-20 md:py-28 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <div className="absolute -top-32 -right-32 w-72 h-72 bg-blue-600/15 rounded-full blur-[60px] pointer-events-none animate-blob" />
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />

    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <div className="flex justify-between items-end mb-12">
        <SectionHeader
          className="mb-0"
          eyebrow="Portfolio"
          title="Featured"
          highlight="Projects."
          subtitle="A showcase of production-grade apps and platforms I've engineered."
        />
        <a href={CONTACT.github} target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-white/5 px-6 py-2.5 rounded-full border border-white/10 hover:bg-white/10 relative group text-sm font-medium">
          <div className="absolute inset-0 bg-blue-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform origin-center" />
          <span className="relative z-10 flex items-center gap-2">View all 20+ repos on GitHub <MdArrowOutward /></span>
        </a>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_PROJECTS.map((item, idx) => (
          <ProjectCard key={idx} item={item} idx={idx} />
        ))}
      </div>

      <div className="mt-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500 uppercase whitespace-nowrap">Client &amp; Commercial</span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {CLIENT_PROJECTS.map((item, idx) => (
            <ProjectCard key={idx} item={item} idx={idx} />
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <a href={CONTACT.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-full border border-white/10">
          GitHub <MdArrowOutward />
        </a>
      </div>
    </motion.div>
  </section>
);

export default ProjectsGallery;
