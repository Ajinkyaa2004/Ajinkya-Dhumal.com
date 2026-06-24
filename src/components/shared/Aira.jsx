// Aira — Ajinkya's AI assistant widget. Floating launcher (her avatar) → chat
// panel. Talks to /api/chat (Groq). Degrades gracefully when no key is set.
// Accent follows the active route via CSS vars.

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUp } from "lucide-react";
import AiraAvatar from "./AiraAvatar";

const GREETING =
  "Hi, I'm Aira 🎀 — Ajinkya's assistant. Ask me anything about his engineering work, PM case studies, or freelance projects, and I'll point you to exactly what you need.";

const SUGGESTIONS = [
  "What's his tech stack?",
  "Tell me about his PM case studies",
  "Is he open to full-stack roles?",
  "Can he build a site for my business?",
];

const NETWORK_FALLBACK =
  "I couldn't reach my brain just now. You can email Ajinkya at dhumalajinkya2004@gmail.com or explore the Engineer, Product, and Freelance pages directly.";

// Turn bare URLs and emails in a reply into clickable links; keep newlines.
const LINK_RE = /(https?:\/\/[^\s)]+|\/[a-z0-9-]+(?:\.[a-z]+)?|[\w.+-]+@[\w-]+\.[\w.-]+)/gi;
const linkify = (text) =>
  text.split(LINK_RE).map((part, i) => {
    if (!part) return null;
    if (/^https?:\/\//i.test(part))
      return (
        <a key={i} href={part} target="_blank" rel="noreferrer" className="underline decoration-white/30 hover:decoration-white break-words" style={{ color: "rgb(var(--accent-rgb))" }}>
          {part}
        </a>
      );
    if (/^[\w.+-]+@[\w-]+\.[\w.-]+$/.test(part))
      return (
        <a key={i} href={`mailto:${part}`} className="underline decoration-white/30 hover:decoration-white break-words" style={{ color: "rgb(var(--accent-rgb))" }}>
          {part}
        </a>
      );
    if (/^\/[a-z0-9-]+(\.[a-z]+)?$/i.test(part))
      return (
        <a key={i} href={part} className="underline decoration-white/30 hover:decoration-white" style={{ color: "rgb(var(--accent-rgb))" }}>
          {part}
        </a>
      );
    return part;
  });

const Typing = () => (
  <div className="flex items-center gap-1.5 px-1 py-1" aria-label="Aira is typing">
    {[0, 1, 2].map((i) => (
      <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-white/50" animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
    ))}
  </div>
);

const Aira = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: GREETING, seed: true }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [nudge, setNudge] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const nudgedRef = useRef(false);

  const showSuggestions = messages.length === 1 && !sending;

  // Friendly idle nudge — invite the visitor to chat (shows once, then rests).
  useEffect(() => {
    if (open) {
      setNudge(false);
      return;
    }
    if (nudgedRef.current) return;
    const t = setTimeout(() => {
      setNudge(true);
      nudgedRef.current = true;
    }, 2800);
    return () => clearTimeout(t);
  }, [open]);
  useEffect(() => {
    if (!nudge) return;
    const t = setTimeout(() => setNudge(false), 8000);
    return () => clearTimeout(t);
  }, [nudge]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 250);
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = useCallback(
    async (raw) => {
      const text = raw.trim();
      if (!text || sending) return;
      const convo = [...messages, { role: "user", content: text }];
      setMessages(convo);
      setInput("");
      setSending(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: convo.filter((m) => !m.seed).map(({ role, content }) => ({ role, content })) }),
        });
        const data = await res.json().catch(() => ({}));
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply || NETWORK_FALLBACK }]);
      } catch {
        setMessages((prev) => [...prev, { role: "assistant", content: NETWORK_FALLBACK }]);
      } finally {
        setSending(false);
        setTimeout(() => inputRef.current?.focus(), 30);
      }
    },
    [messages, sending]
  );

  return (
    <>
      {/* Idle nudge bubble — invites a chat */}
      <AnimatePresence>
        {nudge && !open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[6.5rem] right-5 md:right-6 z-[109] max-w-[210px] text-left bg-[#0a0a0b]/95 backdrop-blur-xl border border-white/12 rounded-2xl rounded-br-md px-3.5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            aria-label="Open chat with Aira"
          >
            <p className="text-[12.5px] text-white/85 leading-snug">Hi, I'm Aira 🎀 — ask me anything about Ajinkya!</p>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Launcher — Aira's avatar (floats + glows when idle) */}
      <motion.div
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[110]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 18 }}
      >
        <motion.div
          animate={{ y: open ? 0 : [0, -5, 0] }}
          transition={{ duration: 3.6, repeat: open ? 0 : Infinity, ease: "easeInOut" }}
          className="relative"
        >
          {!open && (
            <motion.span
              aria-hidden
              className="absolute -inset-2 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(var(--accent-rgb), 0.5), transparent 68%)" }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          <motion.button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close Aira" : "Chat with Aira — Ajinkya's assistant"}
            aria-expanded={open}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            className="relative w-16 h-16 rounded-full flex items-center justify-center text-white shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/15 overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgb(var(--accent-rgb)), rgba(var(--accent-2-rgb), 0.95))" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span key="aira" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-0">
                  <AiraAvatar className="w-full h-full" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
          {!open && <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a0a0b]" />}
        </motion.div>
      </motion.div>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Aira — Ajinkya's assistant"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[6rem] right-3 md:right-6 z-[110] w-[min(93vw,384px)] h-[min(72vh,560px)] flex flex-col rounded-[1.75rem] overflow-hidden border border-white/12 bg-[#0a0a0b]/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          >
            {/* Header */}
            <div className="relative shrink-0 px-4 py-3.5 border-b border-white/10 flex items-center gap-3 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.13] pointer-events-none" style={{ background: "linear-gradient(135deg, rgb(var(--accent-rgb)), transparent 70%)" }} />
              <AiraAvatar className="relative w-10 h-10 shrink-0" />
              <div className="relative flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight">Aira <span className="text-[13px]">🎀</span></p>
                <p className="text-[11px] text-emerald-300/90 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ajinkya's assistant · online
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="relative w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                <X size={17} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3.5">
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white shadow-md" style={{ background: "linear-gradient(135deg, rgb(var(--accent-rgb)), rgba(var(--accent-2-rgb), 0.9))" }}>
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex items-end gap-2">
                    <AiraAvatar className="w-7 h-7 shrink-0 mb-0.5" />
                    <div className="max-w-[82%] rounded-2xl rounded-bl-md px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white/85 bg-white/[0.06] border border-white/10 whitespace-pre-wrap break-words">
                      {linkify(m.content)}
                    </div>
                  </div>
                )
              )}

              {sending && (
                <div className="flex items-end gap-2">
                  <AiraAvatar className="w-7 h-7 shrink-0 mb-0.5" />
                  <div className="rounded-2xl rounded-bl-md px-2 py-1.5 bg-white/[0.06] border border-white/10">
                    <Typing />
                  </div>
                </div>
              )}

              {showSuggestions && (
                <div className="pt-1 pl-9 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} type="button" onClick={() => send(s)} className="text-[12px] text-white/70 hover:text-white border border-white/12 hover:border-white/30 rounded-full px-3 py-1.5 transition-colors bg-white/[0.02] hover:bg-white/[0.06]">
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Composer */}
            <div className="shrink-0 border-t border-white/10 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Message Aira…"
                  aria-label="Your message to Aira"
                  className="flex-1 bg-white/[0.05] border border-white/10 rounded-xl px-3.5 py-2.5 text-[13.5px] text-white placeholder:text-white/35 focus:outline-none focus:border-white/25 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || sending}
                  aria-label="Send"
                  className="w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-white shadow-md disabled:opacity-35 disabled:cursor-not-allowed transition-opacity"
                  style={{ background: "linear-gradient(135deg, rgb(var(--accent-rgb)), rgba(var(--accent-2-rgb), 0.95))" }}
                >
                  <ArrowUp size={18} />
                </button>
              </form>
              <p className="text-[10px] text-white/30 text-center mt-2">Aira is AI-assisted · may be imperfect. Email Ajinkya for anything important.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Aira;
