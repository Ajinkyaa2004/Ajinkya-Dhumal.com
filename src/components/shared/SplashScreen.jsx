// Enhanced splash — GSAP master timeline:
//  1) luminous dot pulses
//  2) dot bursts into a rotating icosahedron wireframe + particle trails
//  3) "Ajinkya Dhumal" reveals letter-by-letter (SplitType, blur + rise)
//  4) shape shrinks to a mark; "Building Reality" types in
//  5) everything scales + fades; page takes over
// Falls back to a minimal reveal when reduced motion is requested.

import { useRef, useState, useEffect, useCallback } from "react";
import SplitType from "split-type";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/perf";

const PARTICLES = Array.from({ length: 14 }, (_, i) => i);

// Icosahedron-style wireframe geometry (pointy-top outer hex + inner hex + facets).
const OUTER = "100,20 169,60 169,140 100,180 31,140 31,60";
const INNER = "120,65 140,100 120,135 80,135 60,100 80,65";
const FACETS = [
  ["100,20", "120,65"], ["100,20", "80,65"],
  ["169,60", "120,65"], ["169,60", "140,100"],
  ["169,140", "140,100"], ["169,140", "120,135"],
  ["100,180", "120,135"], ["100,180", "80,135"],
  ["31,140", "80,135"], ["31,140", "60,100"],
  ["31,60", "60,100"], ["31,60", "80,65"],
];

const SplashScreen = ({ onFinish }) => {
  const root = useRef(null);
  const [done, setDone] = useState(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setDone(true);
    onFinish?.();
  }, [onFinish]);

  // Safety net: always finish even if the GSAP timeline never reaches its
  // onComplete (e.g. a backgrounded tab pauses rAF). setTimeout runs on real
  // time, so it must sit COMFORTABLY beyond the timeline's real duration
  // (~2.3s at 2× speed). At 2900ms it could fire mid-animation on a phone —
  // where the app mounting underneath starves the main thread and GSAP's rAF
  // ticks lag — cutting the splash off on the opening dot. 4200ms gives ~1.9s
  // of slack so the animation's own onComplete always wins first.
  useEffect(() => {
    const id = setTimeout(finish, 4200);
    return () => clearTimeout(id);
  }, [finish]);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      // Reduced motion: skip the show, just reveal + fade.
      if (prefersReducedMotion()) {
        gsap.set(q(".splash-stage"), { display: "none" });
        gsap.timeline({ onComplete: finish })
          .to(q(".splash-name, .splash-tagline"), { opacity: 1, duration: 0.4 })
          .to(root.current, { opacity: 0, duration: 0.5, delay: 0.9 });
        return;
      }

      const split = new SplitType(q(".splash-name")[0], { types: "chars" });

      gsap.set(q(".splash-dot, .splash-particle"), { xPercent: -50, yPercent: -50 });
      gsap.set(q(".splash-name"), { opacity: 1 });
      gsap.set(split.chars, { opacity: 0, yPercent: 60 });
      gsap.set(q(".splash-shape"), { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.set(q(".splash-dot"), { scale: 0, opacity: 0 });
      gsap.set(q(".splash-particle"), { opacity: 0, x: 0, y: 0 });
      gsap.set(q(".splash-tagline"), { opacity: 0 });
      gsap.set(q(".splash-tagline-text"), { clipPath: "inset(0 100% 0 0)" });

      let spin;
      // Play the whole intro 2× faster (~2.25s instead of ~4.5s) — snappy, premium,
      // and fast enough to keep LCP green (the splash gates LCP).
      const tl = gsap.timeline({ onComplete: finish });
      tl.timeScale(2);

      // Stage 1 — dot appears + pulses
      tl.to(q(".splash-dot"), { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" })
        .to(q(".splash-dot"), { scale: 1.4, duration: 0.25, yoyo: true, repeat: 1, ease: "sine.inOut" });

      // Stage 2 — dot bursts into wireframe + particle trails
      tl.to(q(".splash-dot"), { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" }, ">-0.1")
        .to(q(".splash-shape"), {
          opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)",
          onStart: () => {
            spin = gsap.to(q(".splash-shape"), { rotation: 360, rotationY: 360, duration: 9, ease: "none", repeat: -1 });
          },
        }, "<")
        .to(q(".splash-particle"), {
          opacity: 1,
          x: () => gsap.utils.random(-150, 150),
          y: () => gsap.utils.random(-150, 150),
          duration: 0.9, ease: "power2.out",
          stagger: { each: 0.02, from: "center" },
        }, "<")
        .to(q(".splash-particle"), { opacity: 0, duration: 0.5 }, ">-0.4");

      // Stage 3 — name letters rise + unblur
      tl.to(split.chars, { opacity: 1, yPercent: 0, duration: 0.7, ease: "power3.out", stagger: 0.045 }, ">-0.25");

      // Stage 4 — shape shrinks to a mark; tagline types in
      tl.to(q(".splash-shape"), { scale: 0.26, y: -78, opacity: 0.55, duration: 0.7, ease: "power2.inOut" }, ">-0.1")
        .to(q(".splash-tagline"), { opacity: 1, duration: 0.3 }, "<")
        .to(q(".splash-tagline-text"), { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "steps(16)" }, "<");

      // Stage 5 — scale + fade out
      tl.to(root.current, { scale: 1.06, opacity: 0, duration: 0.7, ease: "power2.in", onStart: () => spin && spin.kill() }, ">0.35");

      // Kill the infinite spin on unmount too — if the safety net finishes the
      // splash before Stage 5's onStart runs, the spin tween would otherwise leak.
      return () => {
        spin && spin.kill();
        split.revert();
      };
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div ref={root} aria-label="Intro animation" className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute w-[60vw] h-[60vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)", top: "-20%", left: "-15%" }} />
      <div className="absolute w-[45vw] h-[45vw] rounded-full" style={{ background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)", bottom: "-25%", right: "-10%" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 flex flex-col items-center gap-7">
        <div className="splash-stage relative h-[200px] w-[200px] flex items-center justify-center">
          {PARTICLES.map((p) => (
            <span key={p} className="splash-particle absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-white" />
          ))}
          <span className="splash-dot absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-white" style={{ boxShadow: "0 0 30px 6px rgba(129,140,248,0.85)" }} />
          <svg className="splash-shape absolute inset-0" width="200" height="200" viewBox="0 0 200 200" fill="none" style={{ transformPerspective: 600 }}>
            <polygon points={OUTER} stroke="#a5b4fc" strokeWidth="1.2" opacity="0.9" />
            <polygon points={INNER} stroke="#818cf8" strokeWidth="1" opacity="0.7" />
            {FACETS.map(([a, b], i) => {
              const [x1, y1] = a.split(",");
              const [x2, y2] = b.split(",");
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c7d2fe" strokeWidth="0.8" opacity="0.55" />;
            })}
          </svg>
        </div>

        <h1 className="splash-name text-3xl md:text-5xl font-extrabold tracking-tight text-white opacity-0 drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]">
          Ajinkya Dhumal
        </h1>

        <div className="splash-tagline px-6 py-2 rounded-full border border-white/10 bg-white/5">
          <span className="splash-tagline-text inline-block text-white/60 text-sm tracking-widest uppercase font-semibold whitespace-nowrap">
            Building Reality
          </span>
        </div>
      </div>

    </div>
  );
};

export default SplashScreen;
