// Shared achievements + certifications section (two columns).

import { motion } from "framer-motion";
import { FaCertificate, FaTrophy } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { CERTIFICATIONS, ACHIEVEMENTS } from "../../data/shared-data";

const BADGE_STYLES = [
  "from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.15)]",
  "from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]",
  "from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
  "from-pink-500/20 to-rose-500/20 text-pink-300 border-pink-500/40 shadow-[0_0_15px_rgba(236,72,153,0.15)]",
];
const HOVER_BORDERS = ["hover:border-yellow-500/40", "hover:border-cyan-500/40", "hover:border-emerald-500/40", "hover:border-pink-500/40"];
const GLOW_COLORS = ["bg-yellow-500/10", "bg-cyan-500/10", "bg-emerald-500/10", "bg-pink-500/10"];
const TEXT_HOVERS = [
  "group-hover:from-yellow-300 group-hover:to-amber-200",
  "group-hover:from-cyan-300 group-hover:to-blue-200",
  "group-hover:from-emerald-300 group-hover:to-green-200",
  "group-hover:from-pink-300 group-hover:to-rose-200",
];

const AchievementsGrid = () => (
  <section id="achievements" aria-label="Achievements and Certifications" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-600/15 rounded-full blur-[60px] pointer-events-none animate-blob" />
    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />

    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <div className="mb-10 sm:mb-14 relative">
        <motion.div initial={{ width: 0 }} whileInView={{ width: "60px" }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }} className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full mb-4" />
        <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 uppercase mb-3">Milestones</h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Growth & <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text">Accolades</span>.
        </h3>
        <p className="text-white/40 text-sm md:text-base mt-3 max-w-lg leading-relaxed">A curated collection of certifications earned and milestones achieved on my journey.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
        {/* Certifications */}
        <div className="space-y-5">
          <motion.h4 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-lg md:text-xl font-bold text-white/90 flex flex-wrap items-center gap-3 mb-6 md:mb-7">
            <span className="p-2.5 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <FaCertificate className="text-indigo-400 text-lg" />
            </span>
            <span>Certifications</span>
            <span className="w-full sm:w-auto sm:ml-auto text-[11px] font-mono text-white/30 bg-white/5 px-3 py-1 rounded-full border border-white/10">{CERTIFICATIONS.length} earned</span>
          </motion.h4>

          {CERTIFICATIONS.map((cert, idx) => (
            <motion.a
              href={cert.link}
              target="_blank"
              rel="noreferrer"
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -3, scale: 1.015 }}
              className="block p-4 sm:p-5 rounded-2xl group relative overflow-hidden border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <div className="flex items-start sm:items-center justify-between relative z-10">
                <div className="flex gap-4 items-center min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-xl border border-white/10 flex items-center justify-center group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-500">
                      <cert.Icon className={`${cert.iconColor} text-xl`} />
                    </div>
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-[0_0_10px_rgba(99,102,241,0.5)] border border-indigo-400/50">{idx + 1}</div>
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-cyan-300 transition-all duration-300 text-sm sm:text-base leading-snug break-words">{cert.title}</h5>
                    <p className="text-xs text-white/40 mt-0.5 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-indigo-500/60" />{cert.provider}</p>
                  </div>
                </div>
                <div className="hidden sm:flex w-8 h-8 rounded-full bg-white/[0.04] items-center justify-center group-hover:bg-indigo-500/20 group-hover:text-indigo-300 text-white/20 transition-all duration-300 flex-shrink-0 ml-3 group-hover:rotate-45">
                  <MdArrowOutward className="text-sm" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Achievements */}
        <div className="space-y-5">
          <motion.h4 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="text-lg md:text-xl font-bold text-white/90 flex flex-wrap items-center gap-3 mb-6 md:mb-7">
            <span className="p-2.5 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30 shadow-[0_0_20px_rgba(234,179,8,0.2)]">
              <FaTrophy className="text-yellow-500 text-lg" />
            </span>
            <span>Achievements</span>
            <span className="w-full sm:w-auto sm:ml-auto text-[11px] font-mono text-white/30 bg-white/5 px-3 py-1 rounded-full border border-white/10">{ACHIEVEMENTS.length} unlocked</span>
          </motion.h4>

          {ACHIEVEMENTS.map((ach, idx) => (
            <motion.a
              href={ach.link}
              target="_blank"
              rel="noreferrer"
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, scale: 1.015 }}
              className={`block p-4 sm:p-5 md:p-6 rounded-2xl group relative overflow-hidden border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl ${HOVER_BORDERS[idx % 4]} transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <div className={`absolute -bottom-16 -right-16 w-36 h-36 ${GLOW_COLORS[idx % 4]} rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              <div className="absolute inset-0 noise-texture opacity-[0.03] pointer-events-none mix-blend-overlay rounded-2xl" />
              <div className="flex flex-col gap-3 relative z-10">
                <div className="flex justify-between items-start">
                  <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${BADGE_STYLES[idx % 4]} border px-3 py-1.5 rounded-full whitespace-nowrap backdrop-blur-sm`}>{ach.badge}</span>
                  <div className="hidden sm:flex w-8 h-8 rounded-full bg-white/[0.04] items-center justify-center group-hover:bg-white/10 text-white/20 group-hover:text-white transition-all duration-300 flex-shrink-0 group-hover:rotate-45">
                    <MdArrowOutward className="text-sm" />
                  </div>
                </div>
                <h5 className={`font-bold text-white text-[15px] sm:text-base md:text-lg mt-1 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${TEXT_HOVERS[idx % 4]} transition-all duration-300`}>{ach.title}</h5>
                <p className="text-xs md:text-sm text-white/40 leading-relaxed">{ach.detail}</p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-1 group-hover:via-white/20 transition-all duration-500" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default AchievementsGrid;
