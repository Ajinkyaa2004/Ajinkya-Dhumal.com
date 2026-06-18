// Shared contact section — info column + AJAX Formspree form with inline
// success / error states (no full-page reload).

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdEmail, MdLocationOn, MdArrowOutward } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { CONTACT, SOCIALS } from "../../data/shared-data";

const FIELD =
  "w-full bg-white/[0.04] text-white placeholder:text-white/30 rounded-xl px-4 py-3.5 sm:py-4 border border-white/[0.08] focus:border-sky-500/60 focus:shadow-[0_0_15px_rgba(14,165,233,0.15)] focus-visible:outline-none transition-all duration-300 text-[13px] sm:text-sm";

const ContactSection = () => {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(CONTACT.formspree, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
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
    <section id="contact" aria-label="Contact Information" className="relative py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-20 z-10 w-full max-w-6xl mx-auto mb-10">
      <div className="absolute -top-32 -right-32 w-72 h-72 bg-sky-600/15 rounded-full blur-[60px] pointer-events-none animate-blob" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-[70px] pointer-events-none animate-pulse-slow" />

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <div className="glass-panel rounded-[1.75rem] md:rounded-[2rem] p-4 sm:p-6 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 relative overflow-hidden border border-white/[0.06] hover:border-sky-500/30 transition-all duration-700">
          <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-sky-600/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-5%] w-[30vw] h-[30vw] bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 noise-texture opacity-[0.03] pointer-events-none mix-blend-overlay rounded-[2rem]" />

          <div className="w-full md:w-1/2 flex flex-col justify-between relative z-10">
            <div>
              <motion.div initial={{ width: 0 }} whileInView={{ width: "60px" }} transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }} className="h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-violet-500 rounded-full mb-4" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
                Let's <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-violet-400 text-transparent bg-clip-text">Connect</span>.
              </h2>
              <p className="text-white/50 text-sm sm:text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md">Have an exciting idea or an innovative product? Let's build something exceptional together.</p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              <motion.a href={`mailto:${CONTACT.email}`} whileHover={{ x: 4 }} className="flex items-start sm:items-center gap-3 sm:gap-4 group p-3.5 sm:p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-sky-500/40 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl border border-sky-500/30 flex justify-center items-center bg-gradient-to-br from-sky-500/20 to-blue-500/20 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-500">
                  <MdEmail className="text-xl text-sky-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="relative z-10 min-w-0 flex-1">
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Email me at</p>
                  <p className="text-[13px] sm:text-sm md:text-base font-medium text-white break-words group-hover:text-sky-300 transition-colors">{CONTACT.email}</p>
                </div>
                <div className="hidden sm:flex ml-auto w-8 h-8 rounded-full bg-white/[0.04] items-center justify-center group-hover:bg-sky-500/20 group-hover:text-sky-300 text-white/20 transition-all duration-300 flex-shrink-0 group-hover:rotate-45">
                  <MdArrowOutward className="text-sm" />
                </div>
              </motion.a>

              <motion.div whileHover={{ x: 4 }} className="flex items-start sm:items-center gap-3 sm:gap-4 group p-3.5 sm:p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-500/40 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl border border-violet-500/30 flex justify-center items-center bg-gradient-to-br from-violet-500/20 to-blue-500/20 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-500">
                  <MdLocationOn className="text-xl text-violet-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="relative z-10 min-w-0 flex-1">
                  <p className="text-xs text-white/40 uppercase tracking-wider font-semibold">Based in</p>
                  <p className="text-[13px] sm:text-sm md:text-base font-medium text-white group-hover:text-violet-300 transition-colors">{CONTACT.location}</p>
                </div>
              </motion.div>

              <div className="flex items-center gap-3 pt-2 sm:pt-4">
                {SOCIALS.map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex justify-center items-center text-white/40 transition-all duration-300 ${s.hover}`}>
                    <s.Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="md:w-1/2 w-full relative z-10">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[320px] flex flex-col items-center justify-center text-center backdrop-blur-xl p-8 rounded-2xl sm:rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.04]"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
                    <FaCheckCircle className="text-5xl text-emerald-400 mb-4" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">Message sent!</h3>
                  <p className="text-white/50 text-sm mt-2 max-w-xs">Thanks for reaching out — I'll get back to you soon.</p>
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
                  className="space-y-4 sm:space-y-5 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-500 bg-black/40 border-white/[0.06] hover:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <input type="text" name="first_name" required placeholder="First Name" className={FIELD} />
                    <input type="text" name="last_name" required placeholder="Last Name" className={FIELD} />
                  </div>
                  <input type="email" name="email" required placeholder="Email Address" className={FIELD} />
                  <textarea name="message" rows="4" required placeholder="Your Message" className={`${FIELD} resize-none`} />

                  {status === "error" && (
                    <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                      Something went wrong. Please try again, or email me directly at {CONTACT.email}.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 text-white text-sm sm:text-base font-bold rounded-xl hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex justify-center items-center gap-2 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                    <span className="relative z-10 flex items-center gap-2">
                      {status === "submitting" ? "Sending…" : <>Send Message <MdArrowOutward className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                    </span>
                  </button>
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
