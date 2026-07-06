// /connect — the NFC/QR tap landing page. Standalone (App.jsx renders it OUTSIDE the
// splash/navbar shell) so it opens instantly. Mobile-first: face, a rotating proof
// line, one-tap links, a save-contact vCard, and an optional "reach out" form.

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Globe, FileText, Download, ArrowUpRight, Hand } from "lucide-react";
import Seo from "../components/shared/Seo";
import { CONTACT } from "../data/shared-data";
import { prefersReducedMotion } from "../lib/perf";
import { initAnalytics, track } from "../lib/analytics";

const PROOF = [
  "I cut API latency 40%",
  "AI products · 1K+ daily users",
  "50K+ records/day data pipelines",
  "16 product case studies",
  "Elite Project Analyst @ Hudl",
];

const WHATSAPP = `https://wa.me/919004933771?text=${encodeURIComponent("Hi Ajinkya, great connecting with you!")}`;

const LINKS = [
  { key: "portfolio", label: "Portfolio", desc: "See what I build", href: "/", Icon: Globe, external: false },
  { key: "linkedin", label: "LinkedIn", desc: "Let's connect", href: CONTACT.linkedin, Icon: FaLinkedin, external: true },
  { key: "github", label: "GitHub", desc: "My code", href: CONTACT.github, Icon: FaGithub, external: true },
  { key: "resume", label: "Résumé", desc: "One-page PDF", href: CONTACT.resumeEngineer, Icon: FileText, external: true },
  { key: "whatsapp", label: "WhatsApp", desc: "Message me", href: WHATSAPP, Icon: FaWhatsapp, external: true },
  { key: "email", label: "Email", desc: "Say hi", href: `mailto:${CONTACT.email}`, Icon: FaEnvelope, external: true },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } } };
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const ConnectPage = () => {
  const reduce = prefersReducedMotion();
  const [pi, setPi] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    initAnalytics();
  }, []);

  // Rotating proof line (skipped for reduced-motion users — they see the first line).
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setPi((p) => (p + 1) % PROOF.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    const data = new FormData(e.target);
    try {
      const res = await fetch(CONTACT.formspree, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (res.ok) {
        setSent(true);
        track("connect_left_details");
      }
    } catch {
      /* silent — networking page shouldn't error at them */
    }
    setSending(false);
  };

  return (
    <main
      style={{ scrollbarGutter: "stable both-edges" }}
      className="relative h-[100dvh] w-full bg-[#050505] text-white overflow-y-auto overflow-x-hidden flex justify-center"
    >
      <Seo title="Ajinkya Dhumal — Let's connect 👋" description="Ajinkya Dhumal — Project Analyst @ Hudl, product-minded full-stack engineer. Portfolio, LinkedIn, GitHub, résumé, and save my contact — one tap." path="/connect" />

      {/* Accent glow — cheap radial gradient (no heavy blur), so it's fast on any phone. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80" style={{ background: "radial-gradient(120% 80% at 50% -10%, rgba(99,102,241,0.24), rgba(168,85,247,0.10) 42%, transparent 72%)" }} />

      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="relative z-10 w-full max-w-[440px] px-5 pt-14 pb-12 flex flex-col"
      >
        {/* Header */}
        <motion.div variants={item} className="flex flex-col items-center text-center">
          <img
            src="/ajinkya-dhumal.jpg"
            alt="Ajinkya Dhumal — Full Stack Engineer"
            width="112"
            height="112"
            className="w-28 h-28 rounded-full object-cover ring-2 ring-indigo-400/50 shadow-[0_0_44px_-8px_rgba(99,102,241,0.65)]"
          />
          <h1 className="mt-5 text-[1.75rem] leading-tight font-extrabold tracking-tight">
            Hey{" "}
            <motion.span
              className="inline-flex align-middle text-amber-300"
              style={{ transformOrigin: "72% 82%" }}
              animate={reduce ? undefined : { rotate: [0, 16, -8, 16, -4, 12, 0] }}
              transition={reduce ? undefined : { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.6 }}
              aria-hidden="true"
            >
              <Hand className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.4} />
            </motion.span>{" "}
            I'm ajinkya!
          </h1>
          <div className="h-6 mt-2 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={pi}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-sm font-semibold bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 text-transparent bg-clip-text"
              >
                {PROOF[pi]}
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="mt-3 text-white/45 text-[13px] leading-relaxed">
            Project Analyst @ Hudl · Full-Stack Engineer · heading into Product
          </p>
        </motion.div>

        {/* Save contact — the primary action */}
        <motion.a
          variants={item}
          href="/ajinkya-dhumal.vcf"
          download="Ajinkya-Dhumal.vcf"
          onClick={() => track("connect_save_contact")}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          className="mt-8 flex items-center justify-center gap-2.5 rounded-2xl py-4 font-bold text-white bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 shadow-[0_12px_34px_-10px_rgba(99,102,241,0.8)] active:shadow-none"
        >
          <Download size={19} strokeWidth={2.4} /> Save my contact
        </motion.a>
        <motion.p variants={item} className="text-center text-white/30 text-[11px] mt-2">
          Adds me to your phone in one tap
        </motion.p>

        {/* Links */}
        <motion.div variants={item} className="mt-6 grid grid-cols-2 gap-3">
          {LINKS.map((l) => (
            <motion.a
              key={l.key}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              onClick={() => track("connect_click", { target: l.key })}
              whileHover={reduce ? undefined : { y: -3 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 flex flex-col gap-2 hover:border-indigo-400/40 hover:bg-white/[0.07] transition-colors"
            >
              <l.Icon className="text-xl text-indigo-300" />
              <div>
                <div className="font-semibold text-sm text-white flex items-center gap-1">
                  {l.label}
                  <ArrowUpRight size={13} className="opacity-40 group-hover:opacity-80 transition-opacity" />
                </div>
                <div className="text-white/40 text-[11px]">{l.desc}</div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Optional "reach out" form → Formspree */}
        <motion.div variants={item} className="mt-6">
          {!sent ? (
            <>
              <button
                onClick={() => setFormOpen((o) => !o)}
                className="w-full text-center text-sm text-white/50 hover:text-white/80 py-2 transition-colors"
              >
                {formOpen ? "Maybe later" : "Want me to reach out? →"}
              </button>
              <AnimatePresence initial={false}>
                {formOpen && (
                  <motion.form
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={submit}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-2.5 pt-2">
                      <input name="name" required placeholder="Your name" className="rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/35 focus:border-indigo-400/50 focus:outline-none" />
                      <input name="contact" required placeholder="Email or LinkedIn" className="rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-sm text-white placeholder-white/35 focus:border-indigo-400/50 focus:outline-none" />
                      <input type="hidden" name="_subject" value="New tap from /connect 👋" />
                      <button type="submit" disabled={sending} className="rounded-xl py-3 font-semibold text-sm bg-white/10 border border-white/15 hover:bg-white/15 transition-colors disabled:opacity-50">
                        {sending ? "Sending…" : "Send"}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </>
          ) : (
            <p className="text-center text-emerald-400 text-sm font-medium py-2">Got it — I'll reach out. Thanks! 🙌</p>
          )}
        </motion.div>

        <motion.p variants={item} className="mt-8 text-center text-white/25 text-[11px] leading-relaxed">
          Nice meeting you. Let's build something. 🚀
        </motion.p>
      </motion.div>
    </main>
  );
};

export default ConnectPage;
