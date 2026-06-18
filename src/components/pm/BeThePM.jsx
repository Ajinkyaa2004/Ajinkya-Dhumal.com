// "Think like a PM" — an interactive judgment widget. Visitors make the call on
// a product scenario and get instant reasoning for every option. Demonstrates
// product thinking on-site instead of only linking out to Notion.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, RotateCcw } from "lucide-react";
import { SectionHeader } from "../shared/AnimationUtils";

const SCENARIOS = [
  {
    q: "Your food-delivery app loses ₹30 on every order. What's your first move as PM?",
    options: [
      { text: "Raise delivery fees across the board", verdict: "tradeoff", why: "Protects per-order margin, but can tank volume and hand share to rivals. Know your price elasticity before a blanket hike." },
      { text: "Break the unit economics down by city, cohort & order value", verdict: "best", why: "You can't fix what you haven't diagnosed. The loss is rarely uniform — some zones and cohorts are already profitable." },
      { text: "Cut delivery-partner payouts", verdict: "risky", why: "Quick on a spreadsheet, but it erodes supply reliability and brand — the cost resurfaces as churn and slower deliveries." },
    ],
  },
  {
    q: "A free tier drives 90% of signups but only 2% convert to paid. Kill the free tier?",
    options: [
      { text: "Yes — make everyone pay", verdict: "risky", why: "The free tier is often your top funnel and word-of-mouth engine. Killing it can collapse acquisition. Measure assisted conversions first." },
      { text: "Keep it, add usage limits & upgrade nudges at high-intent moments", verdict: "best", why: "Keep the funnel, monetize intent. Gate the features heavy users need — not the ones that hook newcomers." },
      { text: "Leave it exactly as is", verdict: "tradeoff", why: "Safe, but 2% with zero experiments means revenue left on the table. Test paywalls where intent is highest." },
    ],
  },
  {
    q: "One sprint, two features: one delights power users, one cuts new-user churn. Which ships first?",
    options: [
      { text: "The churn fix", verdict: "best", why: "Retention compounds and a leaky bucket caps every other metric. Fix the funnel before delighting the few who already stayed." },
      { text: "The power-user delight", verdict: "tradeoff", why: "Great for advocacy and depth — but if new users keep leaving, that delight reaches a shrinking audience." },
      { text: "Split the sprint, ship both halfway", verdict: "risky", why: "Two half-shipped features usually means two things that don't land. Sequence, don't dilute." },
    ],
  },
];

const VERDICT = {
  best: { label: "Best move", text: "text-emerald-300", chip: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300", ring: "border-emerald-500/50" },
  tradeoff: { label: "Has tradeoffs", text: "text-amber-300", chip: "bg-amber-500/15 border-amber-500/40 text-amber-300", ring: "border-amber-500/40" },
  risky: { label: "Risky", text: "text-rose-300", chip: "bg-rose-500/15 border-rose-500/40 text-rose-300", ring: "border-rose-500/40" },
};

const BeThePM = () => {
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const scenario = SCENARIOS[idx];
  const revealed = picked !== null;

  const next = () => {
    setPicked(null);
    setIdx((i) => (i + 1) % SCENARIOS.length);
  };

  return (
    <section aria-label="Think like a PM" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-[70px] pointer-events-none animate-blob" />
      <SectionHeader
        eyebrow="Interactive"
        title="Think like a"
        highlight="PM."
        subtitle="Make the call — then see the product reasoning. (No wrong answers, just tradeoffs.)"
        line="from-violet-500 via-purple-500 to-fuchsia-400"
        eyebrowGrad="from-violet-400 to-purple-400"
        highlightGrad="from-violet-400 via-purple-400 to-fuchsia-400"
      />

      <div className="glass-panel rounded-[2rem] p-6 md:p-10 border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
        <div className="relative z-10">
          <div className="flex items-start gap-3 mb-7">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shrink-0 shadow-lg">
              <Lightbulb size={18} />
            </span>
            <AnimatePresence mode="wait">
              <motion.h3 key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="text-lg md:text-2xl font-bold text-white leading-snug pt-1">
                {scenario.q}
              </motion.h3>
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {scenario.options.map((opt, i) => {
              const v = VERDICT[opt.verdict];
              const isPicked = picked === i;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={revealed}
                  onClick={() => setPicked(i)}
                  className={`text-left rounded-2xl border p-4 md:p-5 transition-all duration-300 ${
                    revealed
                      ? `${v.ring} bg-white/[0.03] ${isPicked ? "ring-2 ring-white/10" : "opacity-80"}`
                      : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06] cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm md:text-[15px] font-semibold text-white/90">{opt.text}</span>
                    {revealed && <span className={`text-[10px] font-bold uppercase tracking-wider border px-2.5 py-1 rounded-full whitespace-nowrap ${v.chip}`}>{v.label}{isPicked ? " · your pick" : ""}</span>}
                  </div>
                  <AnimatePresence>
                    {revealed && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} transition={{ duration: 0.35 }} className="text-white/55 text-[13px] leading-relaxed mt-3 overflow-hidden">
                        {opt.why}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {revealed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between gap-4 mt-6">
                <p className="text-sm text-white/50">
                  {scenario.options[picked].verdict === "best" ? "Nice — that's the product-minded call. " : "Solid instinct. The strongest move balances data before action. "}
                </p>
                <button type="button" onClick={next} className="inline-flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-violet-200 transition-colors whitespace-nowrap">
                  <RotateCcw size={14} /> Try another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BeThePM;
