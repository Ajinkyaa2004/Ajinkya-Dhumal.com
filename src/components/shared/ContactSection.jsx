// Shared contact section — premium, route-accent-aware. Animated gradient
// border + cursor spotlight, floating-label inputs, availability badge, copy
// email, and an AJAX Formspree submit with inline success / error states.

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdEmail, MdLocationOn, MdArrowOutward, MdContentCopy, MdCheck } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { CONTACT, SOCIALS } from "../../data/shared-data";

const inputBase =
  "peer w-full bg-white/[0.035] text-white rounded-xl px-4 pt-5 pb-2 border border-white/[0.08] focus:border-[rgb(var(--accent-rgb))] focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.12)] focus-visible:outline-none transition-all duration-300 text-sm";
const labelCenter =
  "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35 text-sm transition-all duration-200 peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:tracking-wider peer-focus:uppercase peer-focus:[color:rgb(var(--accent-rgb))] peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-white/45";
const labelTop =
  "pointer-events-none absolute left-4 top-4 text-white/35 text-sm transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:tracking-wider peer-focus:uppercase peer-focus:[color:rgb(var(--accent-rgb))] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-wider peer-[:not(:placeholder-shown)]:text-white/45";

const accentText = { backgroundImage: "linear-gradient(to right, rgb(var(--accent-rgb)), rgb(var(--accent-2-rgb)))" };

const Field = ({ id, label, ...props }) => (
  <div className="relative">
    <input id={id} placeholder=" " className={inputBase} {...props} />
    <label htmlFor={id} className={labelCenter}>{label}</label>
  </div>
);

const ContactSection = () => {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [copied, setCopied] = useState(false);
  const panelRef = useRef(null);

  const onMove = (e) => {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--cx", `${e.clientX - r.left}px`);
    el.style.setProperty("--cy", `${e.clientY - r.top}px`);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(CONTACT.formspree, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" aria-label="Contact" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-20 z-10 w-full max-w-6xl mx-auto mb-10">
      <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full blur-[60px] pointer-events-none animate-blob" style={{ background: "rgba(var(--accent-rgb), 0.12)" }} />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" style={{ background: "rgba(var(--accent-2-rgb), 0.1)" }} />

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <div
          ref={panelRef}
          onMouseMove={onMove}
          className="contact-panel premium-border relative glass-panel rounded-[1.75rem] md:rounded-[2rem] p-4 sm:p-6 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 overflow-hidden border border-white/[0.06]"
        >
          <div className="contact-spotlight absolute inset-0 pointer-events-none z-0" />
          <div className="absolute inset-0 noise-texture opacity-[0.03] pointer-events-none mix-blend-overlay" />

          {/* Left — info */}
          <div className="w-full md:w-1/2 flex flex-col justify-between relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">Available for new projects</span>
              </div>

              <motion.div initial={{ width: 0 }} whileInView={{ width: "60px" }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }} className="h-1 rounded-full mb-4" style={accentText} />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Let's <span className="text-transparent bg-clip-text" style={accentText}>Connect</span>.
              </h2>
              <p className="text-white/50 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md">Have an exciting idea or an innovative product? Let's build something exceptional together.</p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {/* email card with copy + open */}
              <div className="flex items-center gap-3 sm:gap-4 group p-3.5 sm:p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl flex justify-center items-center" style={{ background: "linear-gradient(135deg, rgba(var(--accent-rgb),0.22), rgba(var(--accent-2-rgb),0.18))", border: "1px solid rgba(var(--accent-rgb),0.3)" }}>
                  <MdEmail className="text-xl" style={{ color: "rgb(var(--accent-rgb))" }} />
                </div>
                <div className="relative z-10 min-w-0 flex-1">
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Email me at</p>
                  <p className="text-[13px] sm:text-sm font-medium text-white whitespace-nowrap">{CONTACT.email}</p>
                </div>
                <button type="button" onClick={copyEmail} aria-label="Copy email" className="relative z-10 shrink-0 w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  {copied ? <MdCheck className="text-emerald-400" /> : <MdContentCopy className="text-sm" />}
                </button>
                <a href={`mailto:${CONTACT.email}`} aria-label="Open email" className="relative z-10 shrink-0 w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all hover:rotate-45">
                  <MdArrowOutward className="text-sm" />
                </a>
              </div>

              {/* location card */}
              <div className="flex items-center gap-3 sm:gap-4 group p-3.5 sm:p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] relative overflow-hidden">
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl flex justify-center items-center" style={{ background: "linear-gradient(135deg, rgba(var(--accent-2-rgb),0.22), rgba(var(--accent-rgb),0.14))", border: "1px solid rgba(var(--accent-2-rgb),0.3)" }}>
                  <MdLocationOn className="text-xl" style={{ color: "rgb(var(--accent-2-rgb))" }} />
                </div>
                <div className="relative z-10 min-w-0 flex-1">
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Based in</p>
                  <p className="text-[13px] sm:text-sm md:text-base font-medium text-white">{CONTACT.location}</p>
                </div>
                <span className="relative z-10 shrink-0 hidden sm:inline text-[11px] text-white/35 font-medium">Remote-friendly</span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  {SOCIALS.map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex justify-center items-center text-white/40 transition-all duration-300 ${s.hover}`}>
                      <s.Icon size={16} />
                    </a>
                  ))}
                </div>
                <span className="text-[11px] text-white/35 font-medium flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/30" /> Usually replies within a day
                </span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="md:w-1/2 w-full relative z-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[340px] flex flex-col items-center justify-center text-center backdrop-blur-xl p-8 rounded-2xl sm:rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.05]"
                >
                  <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 13 }} className="relative">
                    <span className="absolute inset-0 rounded-full bg-emerald-400/30 blur-xl" />
                    <FaCheckCircle className="relative text-5xl text-emerald-400 mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">Message sent!</h3>
                  <p className="text-white/50 text-sm mt-2 max-w-xs">Thanks for reaching out — Ajinkya will get back to you soon.</p>
                  <button type="button" onClick={() => setStatus("idle")} className="mt-6 text-sm font-semibold text-emerald-300 hover:text-emerald-200 transition-colors">
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  aria-label="Contact form"
                  className="space-y-3.5 sm:space-y-4 backdrop-blur-xl p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl border bg-black/40 border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <Field id="cf-first" label="First name" type="text" name="first_name" required autoComplete="given-name" />
                    <Field id="cf-last" label="Last name" type="text" name="last_name" required autoComplete="family-name" />
                  </div>
                  <Field id="cf-email" label="Email address" type="email" name="email" required autoComplete="email" />
                  <div className="relative">
                    <textarea id="cf-msg" name="message" rows="4" required placeholder=" " className={`${inputBase} pt-6 resize-none`} />
                    <label htmlFor="cf-msg" className={labelTop}>Your message</label>
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                      Something went wrong. Please try again, or email directly at {CONTACT.email}.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 sm:py-4 text-white text-sm sm:text-base font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                    style={{ background: "linear-gradient(to right, rgb(var(--accent-rgb)), rgba(var(--accent-2-rgb), 0.95))", boxShadow: "0 8px 30px rgba(var(--accent-rgb), 0.25)" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                    <span className="relative z-10 flex items-center gap-2">
                      {status === "submitting" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Sending…
                        </>
                      ) : (
                        <>Send Message <MdArrowOutward className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                      )}
                    </span>
                  </button>
                  <p className="text-[11px] text-white/30 text-center">Prefer email? Reach Ajinkya directly at {CONTACT.email}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
