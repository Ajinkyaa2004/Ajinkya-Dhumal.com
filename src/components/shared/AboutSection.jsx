// Shared About section — bento grid (intro + hackathon widget + tech marquee).

import { motion } from "framer-motion";
import { SectionHeader } from "./AnimationUtils";
import { TECH_MARQUEE } from "../../data/shared-data";

const AboutSection = () => (
  <section id="about" aria-label="About Ajinkya Dhumal" className="relative min-h-screen py-20 md:py-28 px-6 md:px-20 z-10 max-w-6xl mx-auto">
    <div className="absolute -top-32 -right-32 w-72 h-72 bg-teal-600/15 rounded-full blur-[60px] pointer-events-none animate-blob" />
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />

    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <SectionHeader
        eyebrow="About me"
        title="Glimpse into my"
        highlight="world."
        subtitle="A snapshot of who I am, what drives me, and the tech I breathe every day."
        line="from-teal-500 via-emerald-500 to-green-400"
        eyebrowGrad="from-teal-400 to-emerald-400"
        highlightGrad="from-teal-400 via-emerald-400 to-green-400"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[220px]">
        {/* Main intro */}
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }} whileHover={{ y: -4, scale: 1.01 }} className="md:col-span-2 md:row-span-2 glass-panel hover-glass-panel rounded-3xl p-6 md:p-10 flex flex-col justify-between group overflow-hidden relative border border-white/10 hover:border-teal-500/50 transition-all duration-500 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/30 rounded-full blur-[60px] animate-pulse-slow" />
          <div className="absolute inset-0 noise-texture opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">I engineer products, not just pages — and I'm moving toward PM.</h4>
              <p className="text-white/70 leading-relaxed text-base max-w-xl">
                I'm <strong className="text-white/90">Ajinkya Dhumal</strong> — a Product-Minded Full Stack Engineer who builds AI-powered, data-driven products end to end. Today I'm an <strong className="text-white/90">Elite Project Analyst at Hudl</strong>, turning professional ice-hockey footage into precise performance data (50+ metrics per game), and a <strong className="text-white/90">Full Stack Developer at Insight Fusion Analytics</strong>, shipping React/Next.js platforms processing 50K+ records/day with 1K+ daily active users.
                <br />
                <br />
                A final-year CS (AI/ML) student and <strong className="text-white/90">IBM-certified in Product Management</strong>, I care about the <em>why</em> behind every feature — not just the <em>how</em>. I've surveyed 20 users before writing a single line of code, designed incremental ETL pipelines that cut latency by 40%, and built 12+ API integrations. My next step: <strong className="text-white/90">Product Management</strong>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-mono flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> {"<React.js />"}</span>
              <span className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-400 text-sm font-mono flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" /> {"<Next.js />"}</span>
              <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-mono flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" /> {"<Node.js />"}</span>
              <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-mono flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" /> {"<AI />"}</span>
            </div>
          </div>
        </motion.div>

        {/* Hackathon widget */}
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} whileHover={{ y: -4, scale: 1.01 }} className="glass-panel hover-glass-panel rounded-3xl p-6 flex flex-col items-start justify-end relative overflow-hidden group border border-white/10 hover:border-yellow-500/50 transition-all duration-500 shadow-lg">
          <div className="absolute right-2 top-2 text-7xl opacity-30 drop-shadow-[0_0_20px_rgba(234,179,8,0.8)] pointer-events-none">🏆</div>
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 w-full">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-white font-bold text-xl">Hackathon Champ</h4>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500" />
              </span>
            </div>
            <p className="text-white/60 text-sm font-medium">Ranked in the Top 5 / 60+ teams at the Dizzy Hackers National Hackathon.</p>
          </div>
        </motion.div>

        {/* Tech-stack marquee widget */}
        <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} whileHover={{ y: -4, scale: 1.01 }} className="glass-panel hover-glass-panel rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden group border border-white/10 hover:border-cyan-500/50 transition-all duration-500 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div
            className="relative z-10 self-stretch w-full overflow-hidden py-2 opacity-80 group-hover:opacity-100 transition-opacity"
            style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
          >
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="flex w-max gap-8 items-center whitespace-nowrap">
              {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
                <t.Icon key={i} className={`${t.color} drop-shadow-md text-3xl`} />
              ))}
            </motion.div>
          </div>
          <p className="text-white text-xs mt-8 tracking-widest uppercase font-bold relative z-10 bg-[#050505] px-5 py-2 rounded-full border border-white/10 group-hover:border-white/30 transition-colors shadow-xl">Core Stack</p>
        </motion.div>
      </div>
    </motion.div>
  </section>
);

export default AboutSection;
