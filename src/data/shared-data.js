// Shared data used across all routes (bottom-half sections + global chrome).
// Icons are stored as COMPONENT REFERENCES (not JSX) so this stays a valid .js
// module — components render them as <item.Icon className="..." />.

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaJava,
  FaPaintBrush,
  FaLaptopCode,
  FaLightbulb,
  FaHandsHelping,
  FaUsers,
} from "react-icons/fa";
import { SiCoursera, SiGoogleanalytics } from "react-icons/si";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiSpringboot,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiDocker,
  SiGit,
  SiGithub,
  SiPostman,
  SiFigma,
  SiJira,
  SiPython,
} from "react-icons/si";
import { DiJava } from "react-icons/di";

export const CONTACT = {
  email: "dhumalajinkya2004@gmail.com",
  location: "Mumbai & Bangalore, India",
  whatsapp: "https://wa.me/919004933771?text=Hi%20Ajinkya%2C%20I%27d%20like%20to%20discuss%20a%20project.", // real number + pre-filled message for lower friction
  formspree: "https://formspree.io/f/xgvlgavv",
  github: "https://github.com/Ajinkyaa2004",
  linkedin: "https://www.linkedin.com/in/ajinkya-dhumal/",
  resumeEngineer: "/resume-engineer.pdf",
  resumePM: "/resume-pm.pdf",
};

export const SOCIALS = [
  { Icon: FaGithub, href: CONTACT.github, label: "GitHub Profile", hover: "hover:border-white/40 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]" },
  { Icon: FaLinkedin, href: CONTACT.linkedin, label: "LinkedIn Profile", hover: "hover:border-blue-400/40 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
  { Icon: FaEnvelope, href: `mailto:${CONTACT.email}`, label: "Send Email", hover: "hover:border-sky-400/40 hover:text-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.2)]" },
];

// Per-route accent system. `data-route` on each page wrapper switches the CSS
// variables (see index.css); these class strings drive Tailwind gradients.
export const ROUTE_ACCENTS = {
  home: {
    key: "home",
    path: "/",
    label: "Home",
    short: "Home",
    grad: "from-indigo-400 via-blue-400 to-cyan-400",
    text: "from-indigo-400 to-blue-400",
    solidGrad: "from-indigo-500 to-blue-500",
    iconText: "text-indigo-400",
    rgb: "99, 102, 241",
  },
  engineer: {
    key: "engineer",
    path: "/engineer",
    label: "Engineer",
    short: "Eng",
    grad: "from-cyan-400 via-blue-400 to-sky-400",
    text: "from-cyan-400 to-blue-400",
    solidGrad: "from-cyan-500 to-blue-500",
    iconText: "text-cyan-400",
    rgb: "34, 211, 238",
  },
  pm: {
    key: "pm",
    path: "/pm",
    label: "Product",
    short: "PM",
    grad: "from-violet-400 via-purple-400 to-fuchsia-400",
    text: "from-violet-400 to-purple-400",
    solidGrad: "from-violet-500 to-purple-500",
    iconText: "text-violet-400",
    rgb: "168, 85, 247",
  },
  freelance: {
    key: "freelance",
    path: "/freelance",
    label: "Freelance",
    short: "Hire",
    grad: "from-emerald-400 via-teal-400 to-green-400",
    text: "from-emerald-400 to-teal-400",
    solidGrad: "from-emerald-500 to-teal-500",
    iconText: "text-emerald-400",
    rgb: "16, 185, 129",
  },
};

// Order used by the navbar role switcher pills.
export const ROUTE_ORDER = ["engineer", "pm", "freelance"];

export const CERTIFICATIONS = [
  { title: "IBM Certified Professional – Product Management", provider: "Coursera", link: "https://drive.google.com/file/d/1U78P3fxtrH02S1PxM8HPSEYcpXzDNk2j/view?usp=sharing", detail: "Credential from IBM covering product lifecycle, strategy, and stakeholder management.", Icon: SiCoursera, iconColor: "text-blue-500" },
  { title: "Product Management Develop & Deliver New Product", provider: "Coursera", link: "https://drive.google.com/file/d/1lEzOWerwrLap2uGc234PWLgLQ_vEisx-/view?usp=sharing", detail: "5-course specialization on product foundations, collaboration, and delivery.", Icon: SiCoursera, iconColor: "text-blue-500" },
  { title: "Agile Development Scrum", provider: "Coursera", link: "https://drive.google.com/file/d/1T5fF2U1U4i_LdXPWI6bK6Dv9EW52UZHI/view?usp=sharing", detail: "Introduction to Agile Development and Scrum methodologies.", Icon: SiCoursera, iconColor: "text-blue-500" },
  { title: "Advanced Java Development", provider: "KR IT Education", link: "https://drive.google.com/file/d/11EMlyfIUH_Wc629dzXJ62CO4ZgPlCs7i/view?usp=sharing", detail: "Covers OOP, HTML, CSS, JS, Java fundamentals, and advanced Java with Spring Boot & Hibernate.", Icon: FaJava, iconColor: "text-orange-500" },
  { title: "Frontend Design (Web & Graphics)", provider: "Max Computer Education", link: "https://drive.google.com/file/d/1jbBIoY49OooMGb7Icz9TbGn58oZaYWiH/view?usp=sharing", detail: "Web design, Adobe Illustrator, and InDesign certification.", Icon: FaPaintBrush, iconColor: "text-red-400" },
  { title: "Data Analytics – Visualization", provider: "Infosys Springboard", link: "https://drive.google.com/file/d/1pL3v0s58DW3GXRuRMithG-VreLmOLCuB/view?usp=sharing", detail: "Data visualization and analytics foundations.", Icon: SiGoogleanalytics, iconColor: "text-yellow-500" },
];

export const ACHIEVEMENTS = [
  { title: "Dizzy Hackers Hackathon", detail: "Led JUJUTSU CODERS to Top 5 among 60+ teams with a Decentralized Identity project.", badge: "Top 5 Finalist", Icon: FaLaptopCode, link: "https://github.com/Ajinkyaa2004/ZenID-JUJUTSU-CODERS" },
  { title: "World Innovation Expo 2023", detail: "Vehicle Maintenance Index project ranked in Top 70 of 500+ entries.", badge: "Top 70 / 500", Icon: FaLightbulb, link: "https://drive.google.com/file/d/1aLjq3xezLE919ivxbxycRqn4CCuJr4zi/view?usp=sharing" },
  { title: "PAC HACK Volunteer", detail: "Coordinated and supported 200+ participants at national-level hackathon.", badge: "Volunteer", Icon: FaHandsHelping, link: "#" },
  { title: "Final Year Project Lead", detail: "MediaMind-ML-360 Platform – leading a 3-member engineering team.", badge: "Team Lead", Icon: FaUsers, link: "https://github.com/Ajinkyaa2004/MediaMind-ML-360" },
];

// Experience + education timeline (newest first). isWork toggles icon + accent.
export const EDUCATION = [
  { isWork: true, year: "May 2026 – Present", title: "Elite Project Analyst — Instat Ice Hockey", place: "Hudl · Sports Analytics", desc: "Analyze and tag professional ice hockey matches, tracking 50+ performance metrics per game. Deliver accurate event and performance data used by teams, coaches, and analysts for strategic decisions — developing the systems thinking and data fluency that drives product management." },
  { isWork: true, year: "Jun 2026 – Present", title: "Full Stack Developer (Part-Time)", place: "Insight Fusion Analytics · Remote", desc: "Build scalable apps serving 1K+ DAU with React.js, Next.js, and Node.js. Design PostgreSQL incremental ETL pipelines processing 50K+ records/day (40% latency reduction). Integrate 12+ APIs and contribute to AI-driven hiring systems within Agile sprints." },
  { isWork: true, year: "Oct 2025 – Jun 2026", title: "Full Stack Developer Intern", place: "Insight Fusion Analytics · Remote", desc: "Earned the internship by winning the in-house IFA hackathon, then shipped features across the product with React.js, Next.js, and Node.js before being promoted to a part-time role." },
  { isWork: true, year: "Ongoing", title: "Product-Focused Full Stack Developer", place: "Freelance · Client Work", desc: "Design and ship web products end to end for businesses and startups — from product thinking and UI to deployment — translating real business goals into clean, conversion-focused interfaces." },
  { isWork: false, year: "2021 – 2026", title: "B.Tech in CSE (AI & ML)", place: "Presidency University, Bangalore", desc: "Pursuing Engineering with specialization in AI and Machine Learning." },
  { isWork: false, year: "2019 – 2021", title: "Junior College (Science)", place: "Shri T.P Bhatia College of Science", desc: "Focused on core science subjects laying foundation for engineering." },
  { isWork: false, year: "2008 – 2019", title: "Schooling", place: "St. Lawrence High School, Mumbai", desc: "Active in academics and various regional extracurricular activities." },
];

// Core-stack icon marquee used in the shared About bento.
export const TECH_MARQUEE = [
  { Icon: SiReact, color: "text-cyan-400" },
  { Icon: SiNextdotjs, color: "text-white" },
  { Icon: SiTypescript, color: "text-blue-500" },
  { Icon: SiJavascript, color: "text-yellow-400" },
  { Icon: SiTailwindcss, color: "text-sky-400" },
  { Icon: SiShadcnui, color: "text-white" },
  { Icon: SiNodedotjs, color: "text-green-500" },
  { Icon: SiExpress, color: "text-gray-400" },
  { Icon: SiFastapi, color: "text-green-400" },
  { Icon: SiSpringboot, color: "text-green-600" },
  { Icon: SiPostgresql, color: "text-blue-400" },
  { Icon: SiMongodb, color: "text-green-500" },
  { Icon: SiMysql, color: "text-blue-600" },
  { Icon: SiFirebase, color: "text-yellow-500" },
  { Icon: SiDocker, color: "text-blue-500" },
  { Icon: SiGit, color: "text-orange-500" },
  { Icon: SiGithub, color: "text-white" },
  { Icon: SiPostman, color: "text-orange-400" },
  { Icon: SiFigma, color: "text-pink-500" },
  { Icon: SiJira, color: "text-blue-500" },
  { Icon: SiPython, color: "text-yellow-300" },
  { Icon: DiJava, color: "text-red-500" },
];
