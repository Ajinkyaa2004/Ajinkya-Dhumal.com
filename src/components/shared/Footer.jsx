// Global footer — rendered once in the App layout, shown on every route.

import { motion } from "framer-motion";
import { SOCIALS } from "../../data/shared-data";

const Footer = () => (
  <footer role="contentinfo" className="relative py-14 px-6 mt-10 overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

    <div className="max-w-6xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-tight mb-1">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text">Ajinkya.</span>
          </h2>
          <p className="text-sm text-white/40 font-medium">Building ideas into reality.</p>
        </motion.div>

        <div className="flex items-center gap-3">
          {SOCIALS.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex justify-center items-center text-white/40 transition-all duration-300 hover:scale-110 ${s.hover}`}
            >
              <s.Icon size={16} />
            </a>
          ))}
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs text-white/60 font-mono tracking-wider">© {new Date().getFullYear()} Ajinkya Dhumal. All rights reserved.</p>
          <p className="text-[10px] text-white/60 mt-1 uppercase tracking-widest font-semibold">Crafted for impact...</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
