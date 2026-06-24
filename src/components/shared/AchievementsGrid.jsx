// "Growth & Accolades" — a glanceable credentials board.
// A recruiter scans this in seconds, so EVERYTHING is visible at once: a quick
// credibility summary, then all credentials as compact, scannable cards. A fast
// stagger-in adds life; nothing is hidden behind scroll/hover/cycling.

import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { FaCertificate, FaTrophy, FaAward } from "react-icons/fa";
import { CERTIFICATIONS, ACHIEVEMENTS } from "../../data/shared-data";

const ITEMS = [
  ...CERTIFICATIONS.map((c) => ({
    kind: "cert", tag: "Certification", title: c.title, sub: c.provider, link: c.link, Icon: c.Icon, iconColor: c.iconColor,
    chip: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30", bar: "from-indigo-500 to-violet-500", dot: "bg-indigo-400", hover: "hover:border-indigo-500/40",
  })),
  ...ACHIEVEMENTS.map((a) => ({
    kind: "achv", tag: "Achievement", title: a.title, sub: a.badge, link: a.link, Icon: a.Icon, iconColor: "text-amber-300",
    chip: "bg-amber-500/15 text-amber-300 border-amber-500/30", bar: "from-amber-500 to-orange-500", dot: "bg-amber-400", hover: "hover:border-amber-500/40",
  })),
];

const STATS = [
  { value: CERTIFICATIONS.length, label: "Certifications", Icon: FaCertificate, grad: "from-indigo-400 to-violet-400" },
  { value: ACHIEVEMENTS.length, label: "Achievements", Icon: FaTrophy, grad: "from-amber-400 to-orange-400" },
  { value: "IBM", label: "PM Certified", Icon: FaAward, grad: "from-blue-400 to-cyan-400" },
];

const CredCard = ({ item, i }) => {
  const live = item.link && item.link !== "#";
  const Tag = live ? "a" : "div";
  const props = live ? { href: item.link, target: "_blank", rel: "noreferrer" } : {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(i, 9) * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tag
        {...props}
        aria-label={live ? `${item.title} — view credential` : item.title}
        className={`group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 pl-5 flex items-center gap-3.5 h-full transition-all duration-300 hover:bg-white/[0.06] hover:-translate-y-0.5 ${item.hover}`}
      >
        <div className={`absolute left-0 top-2.5 bottom-2.5 w-[3px] rounded-full bg-gradient-to-b ${item.bar} opacity-60 group-hover:opacity-100 transition-opacity`} />
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-white/[0.1] to-white/[0.02] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
          <item.Icon className={`${item.iconColor} text-lg`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h5 className="font-bold text-white text-[13px] leading-snug line-clamp-2">{item.title}</h5>
            <span className={`shrink-0 text-[8px] font-bold uppercase tracking-wider border px-1.5 py-0.5 rounded-full whitespace-nowrap ${item.chip}`}>{item.tag}</span>
          </div>
          <p className="text-[11px] text-white/45 mt-0.5 flex items-center gap-1.5 truncate"><span className={`w-1 h-1 rounded-full ${item.dot} shrink-0`} />{item.sub}</p>
        </div>
        {live && <MdArrowOutward className="shrink-0 text-white/25 group-hover:text-white/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />}
      </Tag>
    </motion.div>
  );
};

const AchievementsGrid = () => (
  <section id="achievements" aria-label="Achievements and Certifications" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-600/15 rounded-full blur-[60px] pointer-events-none animate-blob" />
    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />

    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
      {/* Header */}
      <div className="mb-6 relative">
        <motion.div initial={{ width: 0 }} whileInView={{ width: "60px" }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }} className="h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 rounded-full mb-4" />
        <h2 className="text-xs md:text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 uppercase mb-3">Milestones</h2>
        <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Growth &amp; <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text">Accolades</span>.
        </h3>
      </div>

      {/* Quick credibility summary — scannable in a glance */}
      <div className="flex flex-wrap gap-3 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="inline-flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] pl-2.5 pr-5 py-2.5">
            <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.grad} flex items-center justify-center text-white shadow-lg`}>
              <s.Icon className="text-base" />
            </span>
            <span className="leading-tight">
              <span className={`block text-lg font-extrabold bg-gradient-to-r ${s.grad} text-transparent bg-clip-text`}>{s.value}</span>
              <span className="block text-[11px] text-white/50 font-medium">{s.label}</span>
            </span>
          </div>
        ))}
      </div>

      {/* All credentials, visible at once */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {ITEMS.map((item, i) => (
          <CredCard key={item.title} item={item} i={i} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default AchievementsGrid;
