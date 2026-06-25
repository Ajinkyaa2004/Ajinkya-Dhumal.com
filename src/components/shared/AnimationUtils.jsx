// Reusable animation primitives shared across every route.
// Extracted from the old monolithic App.js and generalized.

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import SplitType from "split-type";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../lib/perf";

const MotionLink = motion.create(Link);

/* ---------- Skill bar that counts up + fills when scrolled into view ---------- */
export const AnimatedProgress = ({ level, colorClass = "from-cyan-400 to-blue-500" }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    let rafId;
    const step = () => {
      start += 2;
      if (start >= level) {
        setValue(level);
        return;
      }
      setValue(start);
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, level]);

  return (
    <div ref={ref} className="w-full mt-auto pt-2 group-hover/skill:drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-white/30 tracking-widest uppercase font-semibold">Proficiency</span>
        <span className="text-xs font-mono font-bold text-white/90 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">{value} / 100</span>
      </div>
      <div className="w-full bg-[#050505] rounded-full h-1.5 border border-white/5 relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : "0%" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r ${colorClass}`}
          style={{ willChange: "width" }}
        />
      </div>
    </div>
  );
};

/* ---------- 3D tilt that follows the cursor (spring-smoothed) ---------- */
export const useTilt = (maxDeg = 7) => {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 15, mass: 0.4 });
  const sy = useSpring(ry, { stiffness: 150, damping: 15, mass: 0.4 });
  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    rx.set(((e.clientY - r.top) / r.height - 0.5) * -2 * maxDeg);
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 2 * maxDeg);
    // Track cursor position for an optional glare overlay (reads var(--gx/--gy)).
    e.currentTarget.style.setProperty("--gx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };
  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };
  if (reduce) return {};
  return { onMouseMove, onMouseLeave, style: { rotateX: sx, rotateY: sy, transformPerspective: 1000 } };
};

export const TiltCard = ({ children, className, ...props }) => {
  const tilt = useTilt();
  return (
    <motion.div className={className} {...tilt} {...props}>
      {children}
    </motion.div>
  );
};

/* ---------- Link/Button that gently pulls toward the cursor (magnetic) ---------- */
// Renders a router <Link> when `to` is given, else an <a>. Works for hash,
// external, and internal-route targets.
export const MagneticLink = ({ children, strength = 0.4, className, to, ...props }) => {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });
  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    className,
    style: reduce ? undefined : { x: sx, y: sy },
    onMouseMove: reduce ? undefined : onMouseMove,
    onMouseLeave: reduce ? undefined : onMouseLeave,
    ...props,
  };

  return to ? (
    <MotionLink to={to} {...shared}>
      {children}
    </MotionLink>
  ) : (
    <motion.a {...shared}>{children}</motion.a>
  );
};

/* ---------- 3D scroll-reveal wrapper ---------- */
export const Reveal = ({ children, idx = 0, className = "" }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 50, rotateX: 16 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={reduce ? undefined : { transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
};

/* ---------- Standardized section header (scroll-scrubbed accent line) ---------- */
export const SectionHeader = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  line = "from-blue-500 via-cyan-500 to-sky-400",
  eyebrowGrad = "from-blue-400 to-cyan-400",
  highlightGrad = "from-blue-400 via-cyan-400 to-sky-400",
  className = "",
}) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      const lineEl = ref.current?.querySelector("[data-accent-line]");
      if (!lineEl) return;
      if (prefersReducedMotion()) {
        gsap.set(lineEl, { width: 60 });
        return;
      }
      gsap.fromTo(
        lineEl,
        { width: 0 },
        { width: 60, ease: "none", scrollTrigger: { trigger: lineEl, start: "top 88%", end: "top 50%", scrub: true } }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`mb-10 ${className}`}>
      <div data-accent-line className={`h-1 bg-gradient-to-r ${line} rounded-full mb-4`} style={{ width: 0 }} />
      {eyebrow && (
        <h2 className={`text-xs md:text-sm font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r ${eyebrowGrad} uppercase mb-3`}>
          {eyebrow}
        </h2>
      )}
      <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
        {title}{" "}
        {highlight && (
          <span className={`bg-gradient-to-r ${highlightGrad} text-transparent bg-clip-text`}>{highlight}</span>
        )}
      </h3>
      {subtitle && <p className="text-white/40 text-sm md:text-base mt-3 max-w-lg">{subtitle}</p>}
    </div>
  );
};

/* ---------- Hero headline with word-by-word split reveal (gradient-safe) ---------- */
// lines: [{ text, gradient? }] — gradient is a tailwind "from-… via-… to-…" string,
// re-applied per-word so background-clip survives the split.
export const SplitHeadline = ({ lines, className = "", as: Tag = "h1", delay = 0.15 }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return; // render as-is (gradient on the line element)
      const lineEls = ref.current.querySelectorAll("[data-line]");
      const splits = [];
      const words = [];
      lineEls.forEach((el) => {
        const grad = el.getAttribute("data-gradient");
        const s = new SplitType(el, { types: "words" });
        if (grad) {
          // Move the gradient from the parent (which would paint a solid bar
          // once it no longer clips) onto each word so bg-clip-text survives.
          el.classList.remove("text-transparent", "bg-clip-text", "bg-gradient-to-r", ...grad.split(" "));
          s.words.forEach((w) => w.classList.add("bg-gradient-to-r", "bg-clip-text", "text-transparent", ...grad.split(" ")));
        }
        splits.push(s);
        words.push(...s.words);
      });
      gsap.set(words, { display: "inline-block" });
      gsap.from(words, { yPercent: 110, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.05, delay });
      return () => splits.forEach((s) => s.revert());
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {lines.map((l, i) => (
        <span
          key={i}
          data-line
          data-gradient={l.gradient || undefined}
          className={`block ${l.gradient ? `bg-gradient-to-r ${l.gradient} text-transparent bg-clip-text` : ""}`}
        >
          {l.text}
        </span>
      ))}
    </Tag>
  );
};

/* ---------- Professional-snapshot marquee stat card ---------- */
export const StatCard = ({ s, extra = "", ariaHidden = false }) => (
  <div
    aria-hidden={ariaHidden || undefined}
    className={`w-52 sm:w-56 shrink-0 mr-4 md:mr-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 flex flex-col items-start gap-3 hover:border-white/20 transition-colors duration-300 ${extra}`}
  >
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm bg-gradient-to-br ${s.accent} shadow-lg`}>
      <s.Icon />
    </div>
    <div className={`text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r ${s.accent} text-transparent bg-clip-text leading-none`}>
      {typeof s.value === "number" ? `${s.value}${s.suffix || ""}` : s.value}
    </div>
    <div className="leading-tight">
      <p className="text-[12px] md:text-sm font-semibold text-white/90">{s.label}</p>
      {s.sub && <p className="text-[10px] md:text-[11px] text-white/40 mt-0.5">{s.sub}</p>}
    </div>
  </div>
);

/* ---------- Reusable project card (Featured + Client grids) ---------- */
export const ProjectCard = ({ item, idx }) => {
  const BgIcon = item.bgIcon;
  return (
    <Reveal idx={idx}>
      <TiltCard
        whileHover={{ y: -6 }}
        className={`h-full glass-panel rounded-3xl p-6 flex flex-col group relative overflow-hidden border border-white/5 transition-[border-color,box-shadow,background-color] duration-500 ${item.theme}`}
      >
        {/* Shimmer overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none rounded-3xl z-[1]" />

        {/* Background icon watermark */}
        {BgIcon && (
          <div className="absolute -bottom-6 -right-6 text-[12rem] text-white opacity-[0.02] group-hover:opacity-[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none z-0">
            <BgIcon />
          </div>
        )}

        <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex gap-2">
            {item.tech.map((t, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors shadow-sm">
                <t.Icon className={`${t.color} opacity-70 group-hover:opacity-100 transition-opacity text-sm drop-shadow-md`} />
              </div>
            ))}
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 border border-white/10 px-2.5 py-1 rounded-full">{item.tag}</span>
        </div>

        <div className="relative z-10 flex-grow">
          <h4 className={`text-xl font-bold text-white mb-3 transition-colors duration-300 ${item.textGlow}`}>{item.title}</h4>
          <p className="text-white/50 text-sm leading-relaxed mb-6 font-medium">{item.desc}</p>
        </div>

        <div className="relative z-10 mt-auto pt-4 border-t border-white/5 group-hover:border-white/10 transition-colors flex items-center justify-between gap-3">
          {item.caseStudy && (
            <a href={item.caseStudy} className="inline-flex items-center gap-1.5 text-white/55 hover:text-white transition-colors text-sm font-semibold" aria-label={`${item.title} case study`}>
              Case study <MdArrowOutward className="text-xs" />
            </a>
          )}
          <a href={item.demo} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-2 text-white/70 group-hover:text-white transition-colors text-sm font-semibold" aria-label={`${item.title} live demo`}>
            <span>Live</span>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white text-white group-hover:text-black transition-all duration-300 group-hover:-translate-y-1">
              <MdArrowOutward />
            </div>
          </a>
        </div>
      </TiltCard>
    </Reveal>
  );
};
