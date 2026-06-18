// PM route data: the 16 case studies (the star section), PM skills, learning
// ticker, and "product thinking in practice" mini case studies from own work.

export const PM_HERO_STATS = [
  { value: "16", label: "Case Studies" },
  { value: "4", label: "Shipped Products" },
  { value: "IBM", label: "PM Certified" },
];

// 16 strategic case studies grouped into 3 themed categories.
// Tata Neu link is pending (CLAUDE.md: "add when available") → rendered as
// "coming soon" until the Notion page is published.
export const CASE_STUDY_CATEGORIES = [
  {
    key: "revenue",
    title: "Revenue Models & Pricing",
    blurb: "How should category leaders price, bundle, and monetize?",
    accentText: "text-blue-300",
    accentGrad: "from-blue-500 to-sky-500",
    hoverBorder: "hover:border-blue-500/50",
    glow: "glow-blue",
    chip: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    studies: [
      { company: "Netflix", monogram: "N", question: "Should Netflix double down on ad-supported plans or premium pricing?", link: "https://www.notion.so/Netflix-27e5b325b2ae80d989b1dd9d93874f3?source=copy_link" },
      { company: "Spotify", monogram: "S", question: "Is freemium sustainable, or should it shift to subscription-first?", link: "https://www.notion.so/Spotify-2825b325b2ae8062911ad243ebedfd28?source=copy_link" },
      { company: "Apple", monogram: "", question: "Pricing strategy for iPhone SE in emerging markets.", link: "https://www.notion.so/Apple-2845b325b2ae80e38d00fc3be08406b3?source=copy_link" },
      { company: "Amazon Prime", monogram: "aP", question: "Bundled pricing vs. standalone services.", link: "https://www.notion.so/Amazon-Prime-2a25b325b2ae80ae9080ced20733befc?source=copy_link" },
      { company: "Disney+ Hotstar", monogram: "D+", question: "How to balance sports-rights costs with subscription pricing.", link: "https://www.notion.so/Disney-Hotstar-2a25b325b2ae804fa19ade29d09cb0f9?source=copy_link" },
      { company: "Tesla", monogram: "T", question: "Pricing strategy for EVs in India (luxury vs. mass market).", link: "https://www.notion.so/Tesla-2a25b325b2ae8035b566f6f77bcb028b?source=copy_link" },
      { company: "Swiggy One", monogram: "S1", question: "Should it stay a loss leader or become profit-generating?", link: "https://www.notion.so/Swiggy-2a25b325b2ae801fbba7c071ef7cf4b1?source=copy_link" },
    ],
  },
  {
    key: "unit-economics",
    title: "Unit Economics & Profitability",
    blurb: "Can these models actually make money at scale?",
    accentText: "text-emerald-300",
    accentGrad: "from-emerald-500 to-green-500",
    hoverBorder: "hover:border-emerald-500/50",
    glow: "glow-emerald",
    chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    studies: [
      { company: "Uber", monogram: "U", question: "Can ride-hailing ever be profitable without heavy discounts?", link: "https://www.notion.so/Uber-2a35b325b2ae806990f2c7615e8bc1db?source=copy_link" },
      { company: "Zomato", monogram: "Z", question: "Balancing food-delivery commissions with restaurant partnerships.", link: "https://www.notion.so/Zomato-2a35b325b2ae80228333ca9ee2f05541?source=copy_link" },
      { company: "OYO", monogram: "O", question: "Asset-heavy vs. asset-light — which model is financially stronger?", link: "https://www.notion.so/OYO-2a45b325b2ae80fb8de3fe50ffa13ed7?source=copy_link" },
      { company: "BYJU'S", monogram: "B", question: "Growth via acquisitions vs. focusing on sustainable profitability.", link: "https://www.notion.so/BYJU-s-2a45b325b2ae800ca138e71497860478?source=copy_link" },
      { company: "Starbucks India", monogram: "SB", question: "Scaling in tier-2 cities while keeping margins.", link: "https://www.notion.so/Starbucks-India-2d25b325b2ae80f8b722ffec152c502f?source=copy_link" },
      { company: "Flipkart", monogram: "F", question: "Are heavy discounts during Big Billion Days financially viable?", link: "https://www.notion.so/Flipkart-2d25b325b2ae8047b0d8ee66bcd55b7d?source=copy_link" },
    ],
  },
  {
    key: "growth",
    title: "Growth & Expansion",
    blurb: "Where do platforms go next to build a durable moat?",
    accentText: "text-amber-300",
    accentGrad: "from-amber-500 to-orange-500",
    hoverBorder: "hover:border-amber-500/50",
    glow: "glow-amber",
    chip: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    studies: [
      { company: "Paytm", monogram: "P", question: "Should Paytm focus on payments, lending, or wealth management?", link: "https://www.notion.so/Paytm-2dd5b325b2ae80c1a48bde33d52352d5?source=copy_link" },
      { company: "Reliance Jio", monogram: "Jio", question: "How bundling telecom + OTT + e-commerce creates a moat.", link: "https://www.notion.so/Reliance-Jio-2dd5b325b2ae804e8204db49cd2c6c2c?source=copy_link" },
      { company: "Tata Neu", monogram: "TN", question: "Why is the super-app struggling, and what business pivot works?", link: null },
    ],
  },
];

// Total studies (incl. those pending a published link) — used for the "16
// case studies" headline claim. PUBLISHED is the subset with live Notion links.
export const CASE_STUDY_TOTAL = CASE_STUDY_CATEGORIES.reduce((n, c) => n + c.studies.length, 0);
export const PUBLISHED_CASE_STUDY_COUNT = CASE_STUDY_CATEGORIES.reduce(
  (n, c) => n + c.studies.filter((s) => s.link).length,
  0
);

// Mini case studies framing own engineering work as product decisions.
export const PRODUCT_THINKING = [
  {
    title: "NexPrep AI",
    angle: "Discovery before code",
    blurb: "Surveyed 20 users before writing a single line. Identified the real interview-prep pain points, then built AI-driven mock interviews around them.",
  },
  {
    title: "CopaScore AI",
    angle: "Data → insight",
    blurb: "Turned raw match data into readable, real-time insights — making pro-grade football analytics accessible to ordinary fans.",
  },
  {
    title: "Skillquest IFA",
    angle: "Rethinking the funnel",
    blurb: "Replaced résumé screening with cognitive assessments to reduce hiring bias and surface actual problem-solving talent.",
  },
];

export const PM_SKILLS = [
  "Product Roadmapping",
  "User Research",
  "Agile / Scrum",
  "Stakeholder Management",
  "Product Analytics",
  "Feature Prioritization",
  "Jira",
  "Notion",
  "Figma",
  "SQL",
  "Data Visualization",
];

export const CURRENTLY_LEARNING = [
  "SQL for Product Analytics",
  "Product Metrics",
  "User Research",
  "Product Strategy",
  "AI Product Management",
];

// "Why I'm moving to PM" — narrative paragraphs (rendered in WhyPM, Phase 3).
export const WHY_PM = [
  "I didn't arrive at product from a course — I arrived from building. Every platform I've shipped started with a user problem, not a ticket. Engineering taught me empathy for the people who actually build the thing, and that's a muscle most PMs spend years developing.",
  "Two years between Hudl and IFA made me fluent in data. Tagging 50+ metrics per hockey game and designing ETL pipelines that move 50K+ records a day forced me to think in terms of signal, accuracy, and what the numbers are really telling you.",
  "The 16 case studies and the IBM Product Management certification are where I pressure-tested product instinct against real business problems — pricing, unit economics, growth — the questions a PM lives inside every day.",
  "The 2–4 year plan is simple: keep shipping as an engineer who thinks like a PM, until the title just catches up with the work.",
];
