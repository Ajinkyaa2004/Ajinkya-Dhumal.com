// / — the hub. Personal-brand landing that routes visitors to the right page.

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "../components/shared/Seo";
import HeroHub from "../components/home/HeroHub";
import StatsMarquee from "../components/engineer/StatsMarquee";
import { ROUTE_ACCENTS } from "../data/shared-data";

const MiniAbout = () => (
  <section id="about" aria-label="About" className="relative py-20 md:py-28 px-6 md:px-20 z-10 max-w-4xl mx-auto text-center">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="relative z-10">
      <div className="h-1 w-[60px] mx-auto bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-full mb-6" />
      <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
        I'm a final-year CS (AI &amp; ML) student and Full Stack Engineer who's been building since 2022 — from AI platforms with 1K+ daily users to data pipelines and client web apps. I care about the <em className="text-white">why</em> behind what I build, which is pulling me toward product.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
        {["engineer", "pm", "freelance"].map((key) => {
          const r = ROUTE_ACCENTS[key];
          return (
            <Link key={key} to={r.path} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white/80 hover:text-white hover:border-white/25 transition-all duration-300`}>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${r.grad}`}>{r.label}</span>
              <ArrowRight size={14} className="text-white/50" />
            </Link>
          );
        })}
      </div>
    </motion.div>
  </section>
);

const HomePage = () => (
  <>
    <Seo
      title="Ajinkya Dhumal — Engineer · Product · Freelance"
      description="Ajinkya Dhumal builds products people keep using — a Full Stack Engineer, product-minded builder, and freelance web developer. Explore the engineering, product, and freelance portfolios."
      path="/"
    />
    <HeroHub />
    <StatsMarquee />
    <MiniAbout />
  </>
);

export default HomePage;
