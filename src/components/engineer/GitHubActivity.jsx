// Live "building in public" panel — pulls Ajinkya's most recently pushed public
// repos from the GitHub API (no auth needed). Degrades gracefully to a CTA on
// rate-limit/error so it never shows a broken state.

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { Reveal, SectionHeader } from "../shared/AnimationUtils";
import { CONTACT } from "../../data/shared-data";

const GH_USER = "Ajinkyaa2004";

const LANG_COLOR = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", HTML: "#e34c26",
  CSS: "#563d7c", Java: "#b07219", Jupyter: "#DA5B0B", "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051", Vue: "#41b883", Dart: "#00B4AB", C: "#555555", "C++": "#f34b7d",
};

const timeAgo = (iso) => {
  const secs = (Date.now() - new Date(iso).getTime()) / 1000;
  const units = [[31536000, "y"], [2592000, "mo"], [604800, "w"], [86400, "d"], [3600, "h"], [60, "m"]];
  for (const [s, label] of units) if (secs >= s) return `${Math.floor(secs / s)}${label} ago`;
  return "just now";
};

const GitHubActivity = () => {
  const [repos, setRepos] = useState(null); // null = loading, [] = error/empty
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=12`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        const top = (Array.isArray(data) ? data : [])
          .filter((r) => !r.fork)
          .slice(0, 6);
        setRepos(top);
      })
      .catch((e) => {
        if (e?.name !== "AbortError") {
          setFailed(true);
          setRepos([]);
        }
      });
    return () => ctrl.abort();
  }, []);

  return (
    <section aria-label="Live GitHub activity" className="relative py-16 md:py-24 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-slate-500/10 rounded-full blur-[70px] pointer-events-none animate-blob" />
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <div className="flex justify-between items-end mb-10">
          <SectionHeader
            className="mb-0"
            eyebrow="Building in public"
            title="Live from"
            highlight="GitHub."
            subtitle="My most recently pushed repositories — pulled live, not a screenshot."
            line="from-slate-300 via-slate-400 to-slate-500"
            eyebrowGrad="from-slate-300 to-slate-400"
            highlightGrad="from-slate-200 via-slate-300 to-slate-400"
          />
          <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer" className="hidden md:inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors bg-white/5 px-5 py-2.5 rounded-full border border-white/10 hover:bg-white/10 text-sm font-medium">
            <FaGithub /> @{GH_USER}
          </a>
        </div>

        {/* Loading skeletons */}
        {repos === null && (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 rounded-3xl border border-white/5 bg-white/[0.03] animate-pulse" />
            ))}
          </div>
        )}

        {/* Error / rate-limited fallback */}
        {repos && repos.length === 0 && (
          <div className="glass-panel rounded-3xl p-8 border border-white/10 text-center">
            <FaGithub className="text-4xl text-white/40 mx-auto mb-3" />
            <p className="text-white/60 text-sm mb-4">{failed ? "Couldn't reach GitHub right now — see everything on my profile." : "No public repos to show."}</p>
            <a href={`https://github.com/${GH_USER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold bg-white text-black px-5 py-2.5 rounded-full hover:scale-105 transition-transform">
              <FaGithub /> Explore GitHub
            </a>
          </div>
        )}

        {/* Repo cards */}
        {repos && repos.length > 0 && (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((r, i) => (
              <Reveal key={r.id} idx={i}>
                <a href={r.html_url} target="_blank" rel="noreferrer" className="block h-full">
                  <div className="h-full glass-panel rounded-3xl p-6 border border-white/10 hover:border-white/25 hover:-translate-y-1.5 transition-all duration-300 group flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <FaGithub className="text-white/50 group-hover:text-white transition-colors" />
                      <MdArrowOutward className="text-white/30 group-hover:text-white group-hover:rotate-45 transition-all" />
                    </div>
                    <h4 className="font-bold text-white text-[15px] mb-1.5 truncate">{r.name}</h4>
                    <p className="text-white/45 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">{r.description || "No description."}</p>
                    <div className="flex items-center gap-4 text-[11px] text-white/40 font-mono">
                      {r.language && (
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: LANG_COLOR[r.language] || "#8b949e" }} />
                          {r.language}
                        </span>
                      )}
                      {r.stargazers_count > 0 && <span className="flex items-center gap-1"><FaStar /> {r.stargazers_count}</span>}
                      {r.forks_count > 0 && <span className="flex items-center gap-1"><FaCodeBranch /> {r.forks_count}</span>}
                      <span className="ml-auto">{timeAgo(r.pushed_at)}</span>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default GitHubActivity;
