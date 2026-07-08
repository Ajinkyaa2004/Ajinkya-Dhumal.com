// Engineer route data: roles, snapshot stats, skills, projects, interests.
// Icons stored as component references (rendered as <X.Icon /> in components).

import {
  FaHockeyPuck,
  FaLaptopCode,
  FaHandshake,
  FaGithub,
  FaRocket,
  FaTrophy,
  FaChartLine,
  FaCode,
  FaServer,
  FaDatabase,
  FaBrain,
  FaProjectDiagram,
  FaRobot,
  FaFutbol,
  FaBuilding,
  FaUserTie,
  FaIndustry,
  FaPumpSoap,
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiSpringboot,
  SiFastapi,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiMysql,
  SiFramer,
  SiGoogleanalytics,
} from "react-icons/si";

// Headline metrics for the engineer hero.
export const ENGINEER_HERO_STATS = [
  { value: "1K+", label: "Daily Active Users" },
  { value: "50K+", label: "Records / day (ETL)" },
  { value: "40%", label: "Latency reduction" },
];

export const CURRENT_ROLES = [
  {
    company: "Hudl",
    role: "Elite Project Analyst — Instat Ice Hockey",
    period: "May 2026 – Present",
    tag: "Sports Analytics",
    Icon: FaHockeyPuck,
    accentText: "text-cyan-400",
    accentBorder: "hover:border-cyan-500/40",
    accentGrad: "from-cyan-400 to-sky-500",
    accentGlow: "bg-cyan-500/10",
    points: [
      "Analyze & tag professional ice hockey matches, tracking 50+ performance metrics per game.",
      "Deliver accurate event & performance data used by teams, coaches, and analysts for decisions.",
      "Uphold strict quality and data-accuracy standards — building systems thinking for product roles.",
    ],
  },
  {
    company: "Insight Fusion Analytics",
    role: "Full Stack Developer",
    period: "Oct 2025 – Present",
    tag: "Product Engineering",
    Icon: FaLaptopCode,
    accentText: "text-indigo-400",
    accentBorder: "hover:border-indigo-500/40",
    accentGrad: "from-indigo-400 to-blue-500",
    accentGlow: "bg-indigo-500/10",
    points: [
      "Build scalable web platforms serving 1K+ DAU with React.js, Next.js, and Node.js.",
      "Design PostgreSQL incremental ETL pipelines processing 50K+ records/day, cutting latency 40%.",
      "Integrate 12+ APIs and contribute to AI-driven hiring systems in Agile sprints.",
    ],
  },
  {
    company: "Freelance",
    role: "Product-Focused Full Stack Developer",
    period: "Ongoing",
    tag: "Client Work",
    Icon: FaHandshake,
    accentText: "text-emerald-400",
    accentBorder: "hover:border-emerald-500/40",
    accentGrad: "from-emerald-400 to-teal-500",
    accentGlow: "bg-emerald-500/10",
    points: [
      "Ship web products end to end for businesses and startups.",
      "Translate business goals into clean, conversion-focused interfaces.",
      "Own the full lifecycle — product thinking, build, and deployment.",
    ],
  },
];

export const STATS = [
  { value: "Hudl", label: "Elite Project Analyst", sub: "Instat Ice Hockey", Icon: FaHockeyPuck, accent: "from-cyan-400 to-sky-500" },
  { value: "IFA", label: "Full Stack Developer", sub: "AI & Analytics", Icon: FaLaptopCode, accent: "from-indigo-400 to-blue-500" },
  { value: 20, suffix: "+", label: "GitHub Repositories", Icon: FaGithub, accent: "from-slate-300 to-slate-500" },
  { value: 10, suffix: "+", label: "Projects Built", Icon: FaRocket, accent: "from-emerald-400 to-teal-500" },
  { value: "Winner", label: "Hackathon Champion", sub: "IFA Hackathon", Icon: FaTrophy, accent: "from-yellow-400 to-amber-500" },
  { value: "Top 5", label: "Hackathon Finalist", sub: "Dizzy Hackers", Icon: FaChartLine, accent: "from-purple-400 to-pink-500" },
];

export const INTERESTS = [
  { label: "Associate Product Manager (APM)", Icon: FaProjectDiagram },
  { label: "Product Analyst", Icon: FaChartLine },
  { label: "Full Stack Engineering", Icon: FaCode },
  { label: "Technical Program Manager", Icon: FaBrain },
  { label: "Product Operations", Icon: FaHandshake },
];

// `logo` is a path under public/ (e.g. "/logos/hudl.svg"); while null, a styled
// wordmark is shown. Drop logo files in public/logos/ and set the paths here.
export const WORKED_WITH = [
  { name: "Hudl", logo: null },
  { name: "Insight Fusion Analytics", logo: null },
  { name: "Godrej Properties", logo: null },
  { name: "Max Extrusions", logo: null },
  { name: "Wasro", logo: null },
];

export const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    Icon: FaCode,
    grad: "from-blue-500 to-cyan-400",
    glow: "group-hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    blob: "bg-blue-500/10",
    skills: [
      { name: "React", Icon: SiReact, color: "text-cyan-400", level: 90 },
      { name: "Next.js", Icon: SiNextdotjs, color: "text-white", level: 85 },
      { name: "TypeScript", Icon: SiTypescript, color: "text-blue-500", level: 80 },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "text-sky-400", level: 88 },
    ],
  },
  {
    title: "Backend",
    Icon: FaServer,
    grad: "from-emerald-400 to-teal-500",
    glow: "group-hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    blob: "bg-emerald-500/10",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "text-green-500", level: 85 },
      { name: "Spring Boot", Icon: SiSpringboot, color: "text-green-500", level: 72 },
      { name: "FastAPI", Icon: SiFastapi, color: "text-green-400", level: 75 },
      { name: "REST APIs", Icon: SiExpress, color: "text-gray-400", level: 85 },
    ],
  },
  {
    title: "Databases",
    Icon: FaDatabase,
    grad: "from-orange-400 to-red-500",
    glow: "group-hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]",
    blob: "bg-orange-500/10",
    skills: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "text-blue-400", level: 82 },
      { name: "MongoDB", Icon: SiMongodb, color: "text-green-500", level: 85 },
      { name: "Firebase", Icon: SiFirebase, color: "text-yellow-500", level: 88 },
      { name: "MySQL", Icon: SiMysql, color: "text-blue-500", level: 78 },
    ],
  },
  {
    title: "AI & Analytics",
    Icon: FaBrain,
    grad: "from-purple-500 to-pink-500",
    glow: "group-hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    blob: "bg-purple-500/10",
    skills: [
      { name: "LLM Integration", Icon: FaRobot, color: "text-purple-400", level: 80 },
      { name: "Sports Analytics", Icon: FaChartLine, color: "text-cyan-400", level: 85 },
      { name: "Data Pipelines / ETL", Icon: FaDatabase, color: "text-emerald-400", level: 80 },
      { name: "Data Visualization", Icon: SiGoogleanalytics, color: "text-orange-500", level: 78 },
    ],
  },
];

export const FEATURED_PROJECTS = [
  {
    title: "NexPrep AI",
    tag: "AI Platform",
    desc: "AI mock-interview platform born from surveying 20 users to identify pain points. Features voice simulation, real-time feedback, and ATS resume scoring — built with a product-first approach.",
    tech: [{ Icon: SiNextdotjs, color: "text-white" }, { Icon: SiReact, color: "text-[#61DAFB]" }, { Icon: SiFirebase, color: "text-[#FFCA28]" }, { Icon: SiMongodb, color: "text-[#47A248]" }],
    bgIcon: FaRobot,
    caseStudy: "/projects/nexprep",
    demo: "https://nexprepai.vercel.app/auth/sign-in",
    theme: "hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] glow-blue",
    textGlow: "group-hover:text-blue-400",
  },
  {
    title: "CopaScore AI",
    tag: "Sports Analytics",
    desc: "Live football analytics platform combining the SportsMonk API with GROQ LLM for real-time match predictions — processing live data to surface insights for fans and analysts.",
    tech: [{ Icon: SiNextdotjs, color: "text-white" }, { Icon: SiReact, color: "text-[#61DAFB]" }, { Icon: SiTailwindcss, color: "text-[#38B2AC]" }],
    bgIcon: FaFutbol,
    caseStudy: "/projects/copascore",
    demo: "https://copascore-with-llm.onrender.com/",
    theme: "hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] glow-orange",
    textGlow: "group-hover:text-orange-400",
  },
  {
    title: "Skillquest IFA",
    tag: "Hiring Platform",
    desc: "Gamified hiring-evaluation platform replacing resume screening with cognitive and problem-solving assessments — designed to reduce hiring bias and surface actual talent.",
    tech: [{ Icon: SiNextdotjs, color: "text-white" }, { Icon: SiReact, color: "text-[#61DAFB]" }, { Icon: SiTailwindcss, color: "text-[#38B2AC]" }],
    bgIcon: FaUserTie,
    caseStudy: "/projects/skillquest-ifa",
    demo: "https://ifa-hiring-platform.vercel.app",
    theme: "hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] glow-cyan",
    textGlow: "group-hover:text-cyan-400",
  },
  {
    title: "Smart Algo Trade",
    tag: "FinTech",
    desc: "Production algorithmic-trading platform for the Indian stock market via Kite Connect API — built with backtesting engine and risk controls to validate strategies before deployment.",
    tech: [{ Icon: SiReact, color: "text-[#61DAFB]" }, { Icon: SiTailwindcss, color: "text-[#38B2AC]" }, { Icon: SiFramer, color: "text-[#0055FF]" }, { Icon: SiMongodb, color: "text-[#47A248]" }],
    bgIcon: FaChartLine,
    caseStudy: "/projects/smart-algo-trade",
    demo: "https://github.com/Ajinkyaa2004/Smart-Algo-Trading",
    theme: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] glow-emerald",
    textGlow: "group-hover:text-emerald-400",
  },
];

export const CLIENT_PROJECTS = [
  {
    title: "Max Extrusions Pvt Ltd",
    tag: "B2B Website",
    desc: "Production-ready B2B corporate website with an optimized product catalog and solid performance foundations.",
    tech: [{ Icon: SiNextdotjs, color: "text-white" }, { Icon: SiReact, color: "text-[#61DAFB]" }, { Icon: SiTailwindcss, color: "text-[#38B2AC]" }, { Icon: SiFramer, color: "text-[#0055FF]" }],
    bgIcon: FaIndustry,
    caseStudy: "/projects/max-extrusions",
    demo: "https://www.maxextrusions.com/",
    theme: "hover:border-slate-400/50 hover:shadow-[0_0_30px_rgba(148,163,184,0.15)] glow-slate",
    textGlow: "group-hover:text-slate-300",
  },
  {
    title: "Godrej Properties",
    tag: "Lead Generation",
    desc: "High-performance real-estate landing platform for lead generation, backed by robust scheduling APIs.",
    tech: [{ Icon: SiNextdotjs, color: "text-white" }, { Icon: SiReact, color: "text-[#61DAFB]" }, { Icon: SiTailwindcss, color: "text-[#38B2AC]" }],
    bgIcon: FaBuilding,
    caseStudy: "/projects/godrej-properties",
    demo: "https://www.godrejreserve.org.in/",
    theme: "hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] glow-purple",
    textGlow: "group-hover:text-purple-400",
  },
  {
    title: "Wasro",
    tag: "Brand Website",
    desc: "Official brand site for Wasro — a value-tier home-care FMCG range (detergent powders, dishwash bars & tubs). A clean, fast, conversion-minded product showcase.",
    tech: [{ Icon: SiNextdotjs, color: "text-white" }, { Icon: SiReact, color: "text-[#61DAFB]" }, { Icon: SiTypescript, color: "text-[#3178C6]" }, { Icon: SiTailwindcss, color: "text-[#38B2AC]" }],
    bgIcon: FaPumpSoap,
    caseStudy: "https://github.com/Ajinkyaa2004/Wasro-Detergent-Brand",
    demo: "https://wasro.vercel.app/",
    theme: "hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] glow-emerald",
    textGlow: "group-hover:text-emerald-400",
  },
];
