// Freelance route data: client work, services, process, testimonials.
// Audience = business clients. Outcomes over jargon, zero job-search language.

import { FaLaptopCode, FaChartLine, FaRobot, FaPaintBrush } from "react-icons/fa";

export const CLIENT_WORK = [
  {
    client: "Godrej Properties",
    image: "/clients/godrej.jpg",
    monogram: "G",
    tag: "Real Estate · Lead Generation",
    outcome: "Conversion-focused landing platform",
    desc: "A high-performance real-estate landing experience built to capture and qualify leads, backed by reliable scheduling APIs.",
    demo: "https://www.godrejreserve.org.in/",
    accent: "from-purple-500 to-fuchsia-500",
    glow: "glow-purple",
  },
  {
    client: "Max Extrusions Pvt Ltd",
    image: "/clients/max-extrusions.jpg",
    monogram: "M",
    tag: "Manufacturing · B2B",
    outcome: "Production B2B catalog site",
    desc: "A production-ready corporate website with an optimized product catalog and solid performance foundations for a B2B manufacturer.",
    demo: "https://www.maxextrusions.com/",
    accent: "from-slate-400 to-slate-600",
    glow: "glow-slate",
  },
  {
    client: "Skillquest (IFA)",
    image: "/clients/skillquest.jpg",
    monogram: "S",
    tag: "HR Tech · Platform",
    outcome: "Gamified hiring platform",
    desc: "A hiring-evaluation platform that replaces résumé screening with cognitive and problem-solving assessments to surface real talent.",
    demo: "https://ifa-hiring-platform.vercel.app",
    accent: "from-cyan-500 to-blue-500",
    glow: "glow-cyan",
  },
  {
    client: "Wasro",
    image: "/clients/wasro.jpg",
    monogram: "W",
    tag: "Web · Brand",
    outcome: "Brand & web presence",
    desc: "End-to-end web build translating brand goals into a clean, fast, conversion-minded site.",
    demo: null, // TODO: add live Wasro URL + screenshot when available
    accent: "from-emerald-500 to-teal-500",
    glow: "glow-emerald",
  },
];

export const SERVICES = [
  {
    title: "Web App Development",
    Icon: FaLaptopCode,
    desc: "Fast, modern web apps built with React & Next.js — from landing pages that convert to full product platforms.",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    title: "Dashboards & Analytics",
    Icon: FaChartLine,
    desc: "Turn your data into decisions with clean dashboards, reporting, and visualizations your team will actually use.",
    accent: "from-teal-400 to-cyan-500",
  },
  {
    title: "AI Integration",
    Icon: FaRobot,
    desc: "Add real AI value — chat, automation, LLM-powered features — wired into your product the right way.",
    accent: "from-green-400 to-emerald-500",
  },
  {
    title: "UI/UX Design to Code",
    Icon: FaPaintBrush,
    desc: "Pixel-accurate, responsive front-ends from your designs (Figma) — smooth, accessible, and on-brand.",
    accent: "from-cyan-400 to-blue-500",
  },
];

export const PROCESS = [
  { step: "01", title: "Discovery", desc: "We talk through your goals, users, and constraints — so we build the right thing, not just a thing." },
  { step: "02", title: "Design", desc: "Wireframes and a clear visual direction. You see and shape it before a line of code is written." },
  { step: "03", title: "Build", desc: "Iterative development with regular check-ins. Clean, fast, maintainable code at every step." },
  { step: "04", title: "Launch", desc: "Deploy, test, and hand off — with the support you need to grow after go-live." },
];

// TODO: Replace with real, attributable client quotes before launch.
// Slider handles 0, 1, or many entries gracefully.
export const TESTIMONIALS = [
  {
    quote: "Ajinkya understood our business goals first, then built exactly what we needed — clean, fast, and on time.",
    name: "Project Lead",
    role: "Godrej Properties engagement",
    placeholder: true,
  },
  {
    quote: "Reliable, communicative, and genuinely cares about the outcome. Our catalog site has never performed better.",
    name: "Client",
    role: "Max Extrusions engagement",
    placeholder: true,
  },
];
