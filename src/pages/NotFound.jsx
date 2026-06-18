// Themed 404 — replaces the old silent fallback-to-home for unknown routes.

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Code2, LineChart, Briefcase } from "lucide-react";
import Seo from "../components/shared/Seo";

const LINKS = [
  { to: "/", label: "Home", Icon: Home },
  { to: "/engineer", label: "Engineer", Icon: Code2 },
  { to: "/pm", label: "Product", Icon: LineChart },
  { to: "/freelance", label: "Freelance", Icon: Briefcase },
];

const NotFound = () => (
  <section className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
    <Seo title="Page not found — Ajinkya Dhumal" description="That page doesn't exist." path="/404" />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="relative">
      <div className="absolute -inset-10 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
      <p className="relative text-[7rem] md:text-[10rem] font-extrabold leading-none tracking-tight bg-gradient-to-br from-indigo-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">404</p>
    </motion.div>
    <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-2xl md:text-3xl font-bold text-white mt-2">
      This page wandered off.
    </motion.h1>
    <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="text-white/50 mt-3 max-w-md">
      The link may be broken or the page moved. Here's where you can go instead:
    </motion.p>
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap items-center justify-center gap-3 mt-8">
      {LINKS.map((l) => (
        <Link key={l.to} to={l.to} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white/80 hover:text-white hover:border-white/25 transition-all duration-300">
          <l.Icon size={15} className="text-white/50" />
          {l.label}
        </Link>
      ))}
    </motion.div>
  </section>
);

export default NotFound;
