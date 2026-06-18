// Route-aware navbar with a role switcher (Eng | PM | Hire).
// The active route's pill slides via Framer `layoutId`, and the accent color
// (Contact CTA, active pill) recolors per route.

import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, LineChart, Briefcase, Mail, Menu, X, Sparkles, Search } from "lucide-react";
import { ROUTE_ACCENTS, ROUTE_ORDER } from "../../data/shared-data";

const PILL_ICONS = { engineer: Code2, pm: LineChart, freelance: Briefcase };

const routeKeyFromPath = (pathname) => {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p.startsWith("/engineer")) return "engineer";
  if (p.startsWith("/pm")) return "pm";
  if (p.startsWith("/freelance")) return "freelance";
  return "home";
};

const Navbar = () => {
  const location = useLocation();
  const activeKey = routeKeyFromPath(location.pathname);
  const accent = ROUTE_ACCENTS[activeKey];

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Close mobile menu on route change.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
        setIsOpen(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <motion.nav
      aria-label="Main navigation"
      role="navigation"
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: visible ? 0 : -120, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-5 px-3 sm:px-4"
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className={`w-full max-w-5xl rounded-2xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 border shadow-2xl relative overflow-hidden ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-black/30 backdrop-blur-lg border-white/5"
        }`}
      >
        <div className="absolute inset-0 noise-texture opacity-[0.02] pointer-events-none mix-blend-overlay rounded-2xl" />

        {/* Logo → home */}
        <motion.div className="flex items-center gap-2 relative z-10" whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
          <Link to="/" className="flex items-center gap-1.5 group" aria-label="Go to home">
            <div className="relative">
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 absolute -top-1 -right-1 transition-opacity duration-300 text-blue-400" />
              <span className="text-lg sm:text-xl font-extrabold tracking-tight cursor-pointer text-white">
                Ajinkya<span className={`text-transparent bg-clip-text bg-gradient-to-r ${accent.text}`}>.</span>
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop role switcher */}
        <div className="hidden md:flex items-center gap-0.5 rounded-full px-1.5 py-1 border relative z-10 bg-white/[0.04] border-white/[0.06]">
          {ROUTE_ORDER.map((key) => {
            const r = ROUTE_ACCENTS[key];
            const Icon = PILL_ICONS[key];
            const isActive = activeKey === key;
            return (
              <Link
                key={key}
                to={r.path}
                className="group relative flex items-center text-[13px] font-medium px-3.5 py-2 transition-all duration-300 rounded-full text-white/60 hover:text-white"
              >
                {isActive && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full border bg-white/[0.08] border-white/10"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={`w-3.5 h-3.5 transition-all duration-300 ${isActive ? r.iconText : "text-white/40 group-hover:text-white"}`} />
                  <span className={isActive ? "text-white" : ""}>{r.short}</span>
                </span>
                {!isActive && <div className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out origin-center bg-white/[0.06]" />}
              </Link>
            );
          })}
        </div>

        {/* Desktop: ⌘K palette trigger + Contact CTA */}
        <div className="hidden md:flex items-center gap-2 relative z-10">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("cmdk:open"))}
            aria-label="Open command palette"
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-full border border-white/10 bg-white/[0.04] text-white/45 hover:text-white hover:border-white/20 transition-colors"
          >
            <Search size={13} />
            <kbd className="text-[10px] font-mono tracking-wide">⌘K</kbd>
          </button>
          <motion.a
            href="#contact"
            aria-label="Go to contact section"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center space-x-2 px-5 py-2 bg-gradient-to-r ${accent.solidGrad} text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(var(--accent-rgb),0.25)] hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.5)] relative overflow-hidden group`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
            <Mail size={14} strokeWidth={2.5} className="relative z-10" />
            <span className="relative z-10">Contact</span>
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden relative z-10">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 bg-white/[0.06] border border-white/10 text-white/80 hover:text-white hover:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[70px] left-3 right-3 backdrop-blur-xl rounded-2xl p-4 md:hidden overflow-hidden bg-[#0a0a0a]/95 border border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
            <div className="flex flex-col gap-2 relative z-10">
              {ROUTE_ORDER.map((key, idx) => {
                const r = ROUTE_ACCENTS[key];
                const Icon = PILL_ICONS[key];
                const isActive = activeKey === key;
                return (
                  <motion.div key={key} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.06, duration: 0.3 }}>
                    <Link
                      to={r.path}
                      className={`flex items-center gap-3 text-[15px] font-medium rounded-xl px-4 py-3.5 transition-all duration-300 group relative overflow-hidden ${
                        isActive ? "text-white bg-white/[0.08] border border-white/10" : "text-white/70 hover:text-white bg-white/[0.03] border border-transparent hover:border-white/[0.06]"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${r.solidGrad} ${isActive ? "opacity-100 shadow-lg" : "opacity-60 group-hover:opacity-100"} transition-all duration-300`}>
                        <Icon size={16} strokeWidth={2.5} className="text-white" />
                      </div>
                      <span className="relative z-10">{r.label}</span>
                      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" />}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-1" />

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r ${accent.solidGrad} text-white rounded-xl font-bold text-[15px] shadow-lg transition-all duration-300 relative overflow-hidden group`}
              >
                <Mail size={16} strokeWidth={2.5} className="relative z-10" />
                <span className="relative z-10">Contact Me</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
