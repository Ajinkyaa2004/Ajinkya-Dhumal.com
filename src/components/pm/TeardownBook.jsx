// "The Product Playbook" — a scroll-driven booklet of the featured teardowns.
// Pages slide horizontally as you scroll (GSAP-pinned, snap-to-page) so it feels
// like turning pages — same 60fps horizontal-pin technique as the timeline/process
// strip. Desktop pins + scroll-flips; mobile is a native horizontal swipe.

import { useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { SectionHeader } from "../shared/AnimationUtils";
import { gsap, useGSAP } from "../../lib/gsap";
import { FEATURED_TEARDOWNS, CASE_STUDY_TOTAL } from "../../data/pm-data";

const PAGES = FEATURED_TEARDOWNS.length + 1; // cover + teardowns
const pad = (n) => String(n).padStart(2, "0");

// One book page — gutter shadow (left), content, page number (bottom-right).
const Page = ({ children, num }) => (
  <div className="shrink-0 w-full h-full snap-center relative bg-gradient-to-br from-[#16131f] to-[#0c0a13] overflow-hidden">
    <div className="absolute inset-y-0 left-0 w-12 z-20 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.5), transparent)" }} />
    <div className="absolute inset-0 noise-texture opacity-[0.04] pointer-events-none mix-blend-overlay" />
    <div className="relative z-10 h-full overflow-y-auto no-scrollbar p-7 md:p-10 lg:p-12">{children}</div>
    {num && <span className="absolute bottom-4 right-6 z-20 text-[11px] font-mono text-white/25 tracking-widest">{num} / {pad(PAGES)}</span>}
  </div>
);

const TeardownBook = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const winRef = useRef(null);
  const [page, setPage] = useState(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Pinned page-slide on ALL widths (phones included) — scroll up/down, pages
      // turn left→right. Reduced-motion users get the native swipe instead.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        const dist = () => winRef.current.offsetWidth * (PAGES - 1);
        const tween = gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => "+=" + dist() * 1.1,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (PAGES - 1), duration: { min: 0.2, max: 0.45 }, ease: "power1.inOut" },
            onUpdate: (self) => setPage(Math.round(self.progress * (PAGES - 1))),
          },
        });
        return () => tween.scrollTrigger?.kill();
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} aria-label="Product playbook" className="relative z-10 motion-safe:h-screen motion-safe:flex motion-safe:flex-col motion-safe:justify-center overflow-hidden">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-600/12 rounded-full blur-[70px] pointer-events-none" />

      <div className="px-6 md:px-20 max-w-6xl mx-auto w-full pt-16 lg:pt-0 mb-6 lg:mb-8 relative z-10">
        <SectionHeader
          eyebrow="The Playbook"
          title="Featured"
          highlight="Teardowns."
          subtitle="A short playbook of my favorite teardowns — turn the pages to read the framework, the insights, and the call I'd make."
          line="from-violet-500 via-purple-500 to-fuchsia-400"
          eyebrowGrad="from-violet-400 to-purple-400"
          highlightGrad="from-violet-400 via-purple-400 to-fuchsia-400"
        />
      </div>

      {/* Book */}
      <div className="px-4 md:px-12 relative z-10">
        <div className="mx-auto w-full max-w-5xl relative">
          {/* outer cover */}
          <div className="relative rounded-[1.5rem] p-2.5 md:p-3 bg-gradient-to-br from-[#221d3a] to-[#0e0c18] border border-white/10 shadow-[0_45px_90px_-25px_rgba(0,0,0,0.75)]">
            <div className="absolute inset-[3px] rounded-[1.35rem] border border-violet-400/15 pointer-events-none" />
            {/* spine */}
            <div className="absolute left-0 top-5 bottom-5 w-3 md:w-4 rounded-l-[1.5rem] bg-gradient-to-r from-black/60 via-black/30 to-transparent z-30 pointer-events-none" />
            {/* page window */}
            <div
              ref={winRef}
              className="relative overflow-x-auto motion-safe:overflow-hidden snap-x snap-mandatory motion-safe:snap-none no-scrollbar rounded-[1.15rem] h-[64vh] md:h-[540px]"
            >
              <div ref={trackRef} className="flex h-full w-full will-change-transform">
                {/* Cover */}
                <Page>
                  <div className="h-full flex flex-col items-center justify-center text-center relative">
                    <div className="absolute -top-4 -right-4 text-[10rem] text-white opacity-[0.04] leading-none pointer-events-none">❝</div>
                    <p className="text-[11px] font-bold tracking-[0.4em] uppercase text-violet-300/70 mb-5">Ajinkya Dhumal · Product</p>
                    <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                      The Product
                      <span className="block bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 text-transparent bg-clip-text">Playbook.</span>
                    </h3>
                    <p className="text-white/50 text-sm md:text-base mt-5 max-w-md leading-relaxed">Strategic teardowns — the framework, the insights, and the call I'd actually make. {FEATURED_TEARDOWNS.length} featured, part of {CASE_STUDY_TOTAL} total.</p>
                    <div className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
                    <p className="mt-6 text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">
                      <span className="hidden motion-safe:inline">Scroll to turn the page →</span>
                      <span className="hidden motion-reduce:inline">Swipe to turn the page →</span>
                    </p>
                  </div>
                </Page>

                {/* Teardown pages */}
                {FEATURED_TEARDOWNS.map((t, i) => (
                  <Page key={t.company} num={pad(i + 2)}>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm bg-gradient-to-br ${t.accentGrad} shadow-lg`}>{t.company.charAt(0)}</span>
                      <div>
                        <p className="text-white font-bold leading-tight">{t.company}</p>
                        <p className={`text-[10px] font-semibold uppercase tracking-wider ${t.accentText}`}>{t.theme}</p>
                      </div>
                      <span className="ml-auto text-[10px] font-mono text-white/35 hidden sm:inline">Framework · {t.framework}</span>
                    </div>

                    <p className="text-lg md:text-xl font-bold text-white leading-snug mb-6 max-w-2xl">{t.question}</p>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-3">Key insights</p>
                        <ul className="space-y-3">
                          {t.insights.map((ins, k) => (
                            <li key={k} className="flex gap-2.5">
                              <span className={`shrink-0 w-5 h-5 rounded-md border border-white/15 bg-white/[0.03] flex items-center justify-center text-[10px] font-bold ${t.accentText}`}>{k + 1}</span>
                              <span className="text-white/65 text-[13px] leading-relaxed">{ins}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 relative overflow-hidden">
                          <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-gradient-to-b ${t.accentGrad}`} />
                          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${t.accentText} mb-1.5 pl-2`}>My recommendation</p>
                          <p className="text-white/80 text-[13px] leading-relaxed pl-2">{t.recommendation}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-1.5">Metric that matters</p>
                          <p className="text-white text-[13px] font-semibold leading-relaxed">{t.metric}</p>
                        </div>
                        <a href={t.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white hover:gap-2.5 transition-all">
                          Read the full teardown <MdArrowOutward />
                        </a>
                      </div>
                    </div>
                  </Page>
                ))}
              </div>
            </div>
            {/* page-stack edges */}
            <div className="absolute right-[3px] top-7 bottom-7 w-1.5 rounded-r-md bg-gradient-to-l from-white/12 via-white/5 to-transparent pointer-events-none z-30" />
          </div>

          {/* progress dots */}
          <div className="hidden motion-safe:flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: PAGES }).map((_, i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? "w-7 bg-gradient-to-r from-violet-400 to-fuchsia-400" : "w-1.5 bg-white/20"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeardownBook;
