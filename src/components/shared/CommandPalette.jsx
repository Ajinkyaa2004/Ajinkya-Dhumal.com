// ⌘K command palette — global launcher to jump routes, grab the resume, copy
// email, open socials. Opens on Cmd/Ctrl+K or a `cmdk:open` window event
// (dispatched by the navbar pill). Fully keyboard-navigable.

import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Code2, LineChart, Briefcase, Home, FileText, Mail, Copy, Check, Github, Linkedin } from "lucide-react";
import { CONTACT } from "../../data/shared-data";

const CommandPalette = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  const commands = useMemo(
    () => [
      { group: "Go to", icon: Home, label: "Home", keywords: "hub start", run: () => navigate("/") },
      { group: "Go to", icon: Code2, label: "Engineer portfolio", keywords: "developer full stack react projects recruiter", run: () => navigate("/engineer") },
      { group: "Go to", icon: LineChart, label: "Product Manager", keywords: "pm case studies apm product", run: () => navigate("/pm") },
      { group: "Go to", icon: Briefcase, label: "Freelance / Hire me", keywords: "client work services quote business", run: () => navigate("/freelance") },
      { group: "Actions", icon: FileText, label: "Download résumé — Engineer", keywords: "cv pdf resume", run: () => window.open(CONTACT.resumeEngineer, "_blank") },
      { group: "Actions", icon: FileText, label: "Download résumé — Product", keywords: "cv pdf resume pm", run: () => window.open(CONTACT.resumePM, "_blank") },
      { group: "Actions", icon: Copy, label: "Copy email address", keywords: "contact mail clipboard", run: async () => { try { await navigator.clipboard.writeText(CONTACT.email); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { window.location.href = `mailto:${CONTACT.email}`; } return true; } },
      { group: "Actions", icon: Mail, label: "Send an email", keywords: "contact reach out", run: () => { window.location.href = `mailto:${CONTACT.email}`; } },
      { group: "Elsewhere", icon: Github, label: "GitHub", keywords: "code repos", run: () => window.open(CONTACT.github, "_blank") },
      { group: "Elsewhere", icon: Linkedin, label: "LinkedIn", keywords: "connect profile", run: () => window.open(CONTACT.linkedin, "_blank") },
    ],
    [navigate]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => (c.label + " " + c.keywords + " " + c.group).toLowerCase().includes(q));
  }, [query, commands]);

  // Global open: Cmd/Ctrl+K or custom event.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("cmdk:open", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cmdk:open", onOpen);
    };
  }, []);

  // Focus input when opened; reset selection on query change.
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);
  useEffect(() => setActive(0), [query]);

  const exec = async (cmd) => {
    if (!cmd) return;
    const keepOpen = await cmd.run();
    if (!keepOpen) close();
  };

  const onListKey = (e) => {
    if (e.key === "Escape") return close();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      exec(filtered[active]);
    }
  };

  // Keep active item scrolled into view.
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={close}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
            className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#0b0b0c]/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search size={18} className="text-white/40 shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a page, grab my résumé, copy email…"
                className="flex-1 bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none"
              />
              {copied && <span className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1"><Check size={13} /> Copied</span>}
              <kbd className="hidden sm:inline text-[10px] font-mono text-white/40 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
              {filtered.length === 0 && <p className="px-4 py-6 text-center text-sm text-white/40">No matches.</p>}
              {filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                const showGroup = i === 0 || filtered[i - 1].group !== cmd.group;
                return (
                  <div key={cmd.label}>
                    {showGroup && <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">{cmd.group}</p>}
                    <button
                      data-idx={i}
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => exec(cmd)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${active === i ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"}`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center border ${active === i ? "border-indigo-400/40 text-indigo-300 bg-indigo-500/10" : "border-white/10 text-white/50"}`}>
                        <Icon size={15} />
                      </span>
                      <span className={`flex-1 text-sm ${active === i ? "text-white" : "text-white/70"}`}>{cmd.label}</span>
                      {active === i && <ArrowRight size={14} className="text-white/40" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
