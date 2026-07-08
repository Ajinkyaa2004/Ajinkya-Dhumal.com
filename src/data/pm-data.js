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
      { company: "Netflix", monogram: "N", question: "Should Netflix double down on ad-supported plans or premium pricing?", link: "https://www.notion.so/Netflix-27e5b325b2ae80d989b1dd9d938748f3?source=copy_link" },
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

// One-line POV per case study — shown on each grid card so the grid reads as
// answers, not just questions. DRAFTS grounded in public product strategy —
// review/edit to match your Notion analysis before sharing with recruiters.
export const STUDY_TAKES = {
  Netflix: "Hold premium as the brand anchor; scale the ad tier as an acquisition + emerging-markets engine, not a discount.",
  Spotify: "Freemium is the funnel, not the flaw — gate the features power users crave, keep free as the growth loop.",
  Apple: "Don't cut the sticker price; localize financing + trade-ins so the SE feels accessible without diluting the brand.",
  "Amazon Prime": "The bundle is the moat — price Prime as a whole; never let members price the parts.",
  "Disney+ Hotstar": "Sports buys reach, not margin — use it to acquire, then monetize with ads + tiered cricket access.",
  Tesla: "Win India on total cost + local assembly, not sticker price — a premium halo first, then a locally-made mass model.",
  "Swiggy One": "Keep it a loss leader only while it lifts frequency + basket size; once the habit forms, swap discounts for convenience.",
  Uber: "Profit comes from density + Eats/ads, not driver-pay cuts — protect supply, monetize the network.",
  Zomato: "Fix economics on the restaurant side (ads, supply tools), not just commissions — raise take-rate without partner churn.",
  OYO: "Go asset-light to scale, asset-heavy only in a few flagship markets where quality control is the real differentiator.",
  "BYJU'S": "Acquisitions bought reach but broke the model — fix retention + CAC payback before buying more growth.",
  "Starbucks India": "Defend margin with smaller-format stores + a localized menu in tier-2 — premium experience, lower rent.",
  Flipkart: "Big Billion Days buys GMV, not loyalty — move spend from blanket discounts to retention + private labels.",
  Paytm: "Pick a wedge — payments for reach, lending for margin; don't fund three super-apps at once.",
  "Reliance Jio": "The moat is the bundle + data — cross-sell telecom → OTT → commerce on one identity, and monetize attention.",
  "Tata Neu": "The super-app stumbled because the apps weren't stitched — lead with one daily habit, then earn the rest.",
};

// 5 featured teardowns (2 revenue · 2 unit-economics · 1 growth) shown with full
// depth ON the page, so a recruiter sees the thinking without leaving for Notion.
// The book auto-sizes to however many entries live here. DRAFTS — review/edit.
export const FEATURED_TEARDOWNS = [
  {
    company: "Netflix",
    theme: "Revenue & Pricing",
    accentText: "text-blue-300",
    accentGrad: "from-blue-500 to-sky-500",
    chip: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    question: "Should Netflix double down on ad-supported plans or premium pricing?",
    framework: "Tier laddering × LTV-by-segment",
    insights: [
      "Premium subscribers are the high-LTV brand core; the ad tier's job is reach and a cheaper door in — not matching premium ARPU.",
      "Ad-tier ARPU can rival premium once ad load and fill rates mature, but only at scale — so the early goal is volume, not margin.",
      "The password-sharing crackdown already converts free-riders; the ad tier catches the price-sensitive ones who'd otherwise churn.",
    ],
    recommendation: "The bet is ads as the growth engine, premium as the margin + brand anchor. Treat the ad tier as a second revenue stream — subscription + advertising on the same viewer — not a cheap discount. Never put ads on premium.",
    metric: "Blended ARPU × retention — not subscriber count alone.",
    link: "https://www.notion.so/Netflix-27e5b325b2ae80d989b1dd9d938748f3?source=copy_link",
  },
  {
    company: "Spotify",
    theme: "Revenue & Pricing",
    accentText: "text-blue-300",
    accentGrad: "from-blue-500 to-sky-500",
    chip: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    question: "Is freemium sustainable, or should it shift to subscription-first?",
    framework: "Freemium funnel × free→paid conversion",
    insights: [
      "The free tier is Spotify's cheapest acquisition channel — most Premium subscribers start as free users, so killing free would spike CAC, not fix margin.",
      "The margin problem isn't free listeners, it's label royalties (~70% of revenue) — profitability comes from higher-margin non-music (podcasts, audiobooks, ads), not from removing free.",
      "Ad-supported free monetizes the unconverted and seeds conversion over time; the real lever is gating what power users crave — offline, ad-free, higher bitrate.",
    ],
    recommendation: "Keep freemium — it's the cheapest acquisition channel in music, not the leak. The fix isn't cutting free; it's making the ad tier cover the non-converting tail and tightening the gate that converts the rest. Subscription-first just hands the free market to YouTube.",
    metric: "Free→Premium conversion rate × contribution margin per user.",
    link: "https://www.notion.so/Spotify-2825b325b2ae8062911ad243ebedfd28?source=copy_link",
  },
  {
    company: "Uber",
    theme: "Unit Economics",
    accentText: "text-emerald-300",
    accentGrad: "from-emerald-500 to-green-500",
    chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    question: "Can ride-hailing ever be profitable without heavy discounts?",
    framework: "Contribution margin per trip × network density",
    insights: [
      "Discounts buy GMV but train price-sensitive demand; the durable lever is density — shorter pickups mean higher driver utilization.",
      "Rides alone are thin. Eats, ads, and Uber One are where contribution margin actually compounds.",
      "Cutting driver pay looks good on a spreadsheet, but it erodes supply reliability — the cost resurfaces as churn and surge.",
    ],
    recommendation: "Yes — discounts were capital to buy liquidity, not the product. Past the liquidity threshold, profit comes from ads, Uber One, and driver utilization. Kill discounts as the growth engine; keep them only as a surgical reactivation tool.",
    metric: "Contribution margin per trip, trending positive as density rises.",
    link: "https://www.notion.so/Uber-2a35b325b2ae806990f2c7615e8bc1db?source=copy_link",
  },
  {
    company: "Zomato",
    theme: "Unit Economics",
    accentText: "text-emerald-300",
    accentGrad: "from-emerald-500 to-green-500",
    chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    question: "Balancing food-delivery commissions with restaurant partnerships.",
    framework: "Per-order contribution × take-rate vs. partner churn",
    insights: [
      "Raising commissions lifts take-rate today but drives restaurant churn and off-platform leakage (direct ordering, ONDC) — the partner base is the real supply moat.",
      "The higher-margin lever is restaurants paying for visibility (ads) and supply tools, not a bigger cut of every order.",
      "Delivery cost per order falls with batching and density, so profitability is as much a logistics + frequency problem as a commission one.",
    ],
    recommendation: "Freeze the commission — it's at its political ceiling, and every point higher pushes restaurants to ONDC. Move margin off the restaurant: ads, the consumer-paid platform fee + Gold, and cheaper delivery. Monetize the same order more, don't tax the supply that can defect.",
    metric: "Contribution margin per order, with restaurant retention holding flat.",
    link: "https://www.notion.so/Zomato-2a35b325b2ae80228333ca9ee2f05541?source=copy_link",
  },
  {
    company: "Reliance Jio",
    theme: "Growth & Expansion",
    accentText: "text-amber-300",
    accentGrad: "from-amber-500 to-orange-500",
    chip: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    question: "How bundling telecom + OTT + e-commerce creates a moat.",
    framework: "Platform bundling × cross-sell on one identity",
    insights: [
      "Cheap data is the acquisition wedge; the moat is what you cross-sell on top — JioCinema, JioMart, payments.",
      "One identity across services lowers CAC for every new vertical — the telecom base subsidizes commerce acquisition.",
      "Attention and transaction data become the real product; ads and commerce monetize what telecom alone can't.",
    ],
    recommendation: "Yes — but the moat isn't the bundle, it's the SIM: ~488M KYC-verified, monthly-billed users that OTT and commerce ride at near-zero cost while rivals buy each one. Bundle to lock, never to discount — win on products-per-SIM.",
    metric: "Products per SIM × revenue per identity — not sticker price.",
    link: "https://www.notion.so/Reliance-Jio-2dd5b325b2ae804e8204db49cd2c6c2c?source=copy_link",
  },
];

// A real PM deliverable — a one-page PRD for NexPrep AI (a product Ajinkya
// shipped). DRAFT grounded in real facts (20-user survey, Gemini voice
// transcription + scoring, ATS scoring); North Star + targets are illustrative,
// not live figures. Edit freely.
export const NEXPREP_PRD = {
  product: "NexPrep AI",
  tagline: "AI mock-interview platform",
  demo: "https://nexprepai.vercel.app/auth/sign-in",
  repo: "https://github.com/Ajinkyaa2004/NexPrep",
  oneLiner:
    "Realistic, voice-based interview practice with instant, structured feedback — so candidates walk into the real thing prepared, not anxious.",
  northStar: "Weekly completed mock interviews per active user",
  northStarWhy: "It rewards real practice, not sign-ups.",
  overview: [
    {
      label: "Problem",
      body: "Most candidates “practice” by reading questions, not by doing interviews out loud — so there's no low-stakes way to rehearse and learn what actually landed. I validated this by surveying 20 job-seekers before writing a line of code; the recurring pain was “I freeze and ramble, and I never know if my answer was any good.”",
    },
    {
      label: "Target user",
      body: "Early-career candidates and students prepping for technical + behavioral interviews who want realistic reps and honest feedback — not another static question bank.",
    },
    {
      label: "Goal & North Star",
      body: "Get candidates to do enough realistic reps that they genuinely feel ready. North Star metric: weekly completed mock interviews per active user — it rewards real practice, not sign-ups.",
    },
  ],
  features: [
    { p: "P0", title: "Voice mock interviews", body: "Answer out loud in real time — your audio is transcribed and scored by Google Gemini in one pass — the rep that actually transfers to a live interview." },
    { p: "P0", title: "Instant structured feedback", body: "After each answer: clarity, relevance, and structure — specific, not “good job.”" },
    { p: "P1", title: "ATS resume scoring", body: "See how a resume reads to an applicant-tracking system — a strong standalone hook for acquisition." },
    { p: "P1", title: "Role & topic targeting", body: "Pick the role so questions and feedback match the job you're actually chasing." },
  ],
  metrics: [
    "Activation — % of new users who complete their first mock in session one",
    "Engagement — completed mocks per active user per week (the North Star)",
    "Quality — feedback-helpfulness rating + self-reported “felt more prepared”",
    "Retention — return within 7 days for another session",
  ],
  risks: [
    { risk: "LLM feedback feels generic", fix: "Constrain with per-question rubrics + structured prompts; let users rate feedback to tune it." },
    { risk: "Voice friction (mic, latency)", fix: "Mic pre-flight check plus a text fallback so no one is blocked." },
    { risk: "Empty first session (cold start)", fix: "Guided first interview with a recommended role, so value lands in minute one." },
  ],
  note: "Drafted as a portfolio artifact — the North Star and targets show how I'd run the product, not live figures.",
};
