// Honest, client-facing trust section (in place of fabricated testimonials).
// Real client names + the real reasons businesses work with Ajinkya, framed as
// his commitments. When real, attributable quotes exist, TestimonialsSlider
// renders right after this — this section stays as the "why me" pitch.

import { Zap, Eye, TrendingUp, LifeBuoy } from "lucide-react";
import { Reveal, SectionHeader, TiltCard } from "../shared/AnimationUtils";
import { CLIENT_WORK } from "../../data/freelance-data";

const REASONS = [
  { Icon: Zap, title: "Direct line, no agency markup", body: "You talk to the person actually building it — faster decisions, no middleman, none of the inflated agency rates." },
  { Icon: Eye, title: "Clear comms, no surprises", body: "Regular updates and a shared timeline. You always know exactly where your project stands — never left guessing." },
  { Icon: TrendingUp, title: "Built for results", body: "Speed, conversions, and leads — engineering that performs and lasts, not just a page that looks nice." },
  { Icon: LifeBuoy, title: "I don't vanish at launch", body: "Post-launch support and a clean handoff, so you can keep growing with confidence after go-live." },
];

const WhyWorkWithMe = () => (
  <section aria-label="Why businesses work with me" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-600/12 rounded-full blur-[70px] pointer-events-none animate-blob" />

    <SectionHeader
      eyebrow="Working Together"
      title="Why businesses"
      highlight="work with me."
      subtitle="No agency overhead, no jargon — just a builder who ships, communicates, and sticks around after launch."
      line="from-emerald-500 via-teal-500 to-green-400"
      eyebrowGrad="from-emerald-400 to-teal-400"
      highlightGrad="from-emerald-400 via-teal-400 to-green-400"
    />

    {/* Real client trust strip — actual businesses Ajinkya has shipped for */}
    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 mb-10 text-sm">
      <span className="text-white/40 font-medium mr-1">Already trusted by</span>
      {CLIENT_WORK.map((c, i) => (
        <span key={c.client} className="inline-flex items-center gap-2.5">
          {i > 0 && <span className="text-white/20">·</span>}
          <span className="text-white/85 font-semibold">{c.client}</span>
        </span>
      ))}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {REASONS.map((r, i) => (
        <Reveal key={r.title} idx={i}>
          <TiltCard whileHover={{ y: -6 }} className="h-full glass-panel rounded-3xl p-6 md:p-7 border border-white/10 hover:border-emerald-500/40 transition-colors duration-500 relative overflow-hidden group">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="relative z-10 flex items-start gap-4">
              <span className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg">
                <r.Icon size={22} strokeWidth={2.2} />
              </span>
              <div>
                <h4 className="text-lg font-bold text-white mb-1.5">{r.title}</h4>
                <p className="text-white/55 text-sm leading-relaxed">{r.body}</p>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  </section>
);

export default WhyWorkWithMe;
