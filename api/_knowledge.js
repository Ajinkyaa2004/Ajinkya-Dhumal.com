// Knowledge base for the "Ask Ajinkya" assistant (api/chat.js).
// Plain string — kept in sync by hand with src/data/*. The leading underscore
// tells Vercel this file is NOT a routable function; it's imported by chat.js.

export const KNOWLEDGE = `
# About Ajinkya Dhumal

Ajinkya Dhumal is a final-year B.Tech student in Computer Science (AI & ML) at Presidency University, Bangalore, graduating in 2026. He is based between Mumbai and Bangalore, India, and has roughly 8 months of production engineering experience.

He has two deliberate career tracks, plus freelance work:
- Full Stack Engineering — his primary, current focus.
- Product Management — his 2-4 year goal; he describes himself as a "product-minded engineer moving toward PM."
- Freelance web development — building digital products for businesses and startups.

Roles he is targeting: Associate Product Manager (APM), Product Analyst, Full Stack Engineer, Technical Program Manager (TPM), and Product Operations.

The portfolio has four pages: Home (/), Engineer (/engineer), Product Manager (/pm), and Freelance (/freelance).

# Current & Recent Roles

- Hudl — Elite Project Analyst, Instat Ice Hockey (May 2026 - present). This is a sports-analytics role, NOT an engineering role: he analyzes and tags professional ice-hockey matches, tracking 50+ performance metrics per game, delivering accurate event and performance data used by teams, coaches, and analysts. It built his data fluency and systems thinking.
- Insight Fusion Analytics (IFA) — Full Stack Developer. He won IFA's in-house hackathon, which earned him an internship (Oct 2025 - Jun 2026), then was promoted to a part-time role (Jun 2026 - present). He builds scalable web platforms serving 1K+ daily active users with React, Next.js, and Node.js; designed PostgreSQL incremental ETL pipelines processing 50K+ records/day and cut latency by 40%; integrated 12+ APIs; and contributes to AI-driven hiring systems in Agile sprints.
- Freelance — Product-focused full stack developer. Ships web products end to end for businesses and startups, owning product thinking, build, and deployment.

# Engineering Highlights

Headline metrics: 1K+ daily active users, 50K+ records/day ETL, 40% latency reduction. 20+ GitHub repositories, 10+ projects built. IFA Hackathon winner; Top-5 finalist at the Dizzy Hackers hackathon (among 60+ teams).

Skills:
- Frontend: React, Next.js, TypeScript, Tailwind CSS.
- Backend: Node.js, Spring Boot, FastAPI, REST APIs.
- Databases: PostgreSQL, MongoDB, Firebase, MySQL.
- AI & Analytics: LLM integration, sports analytics, data pipelines / ETL, data visualization.

Featured projects:
- NexPrep AI — AI mock-interview platform. He surveyed 20 users before writing code; features voice simulation, real-time feedback, and ATS resume scoring. Built with Next.js, React, Firebase, MongoDB. Demo: https://nexprep-ai.vercel.app/
- CopaScore AI — live football analytics combining the SportMonks API with a GROQ LLM for real-time match predictions. Demo: https://copascore-with-llm.onrender.com/
- Skillquest (IFA) — gamified hiring-evaluation platform that replaces resume screening with cognitive and problem-solving assessments to reduce hiring bias. Demo: https://ifa-hiring-platform.vercel.app
- Smart Algo Trade — algorithmic-trading platform for the Indian stock market via the Kite Connect API, with a backtesting engine and risk controls.

Client / engineering builds: Max Extrusions (B2B catalog site, https://www.maxextrusions.com/), Godrej Properties (real-estate lead-generation platform, https://www.godrejreserve.org.in/).

# Product Management

Ajinkya is IBM Certified in Product Management (via Coursera). His PM portfolio centers on 16 strategic case studies grouped into three themes (15 are published on Notion; Tata Neu is coming soon):
- Revenue Models & Pricing (7): Netflix, Spotify, Apple, Amazon Prime, Disney+ Hotstar, Tesla, Swiggy One.
- Unit Economics & Profitability (6): Uber, Zomato, OYO, BYJU'S, Starbucks India, Flipkart.
- Growth & Expansion (3): Paytm, Reliance Jio, Tata Neu.
Each case study tackles a real strategic question (for example, "Can ride-hailing ever be profitable without heavy discounts?"). They are all linked from the /pm page.

He also frames his own engineering work as product decisions — surveying 20 users before building NexPrep AI, turning raw match data into accessible insights with CopaScore AI, and rethinking the hiring funnel with Skillquest.

Why he's moving to PM: he came to product from building, not from a course; engineering gave him empathy for builders; tagging 50+ metrics per game at Hudl and designing ETL at IFA made him fluent in data; and the 16 case studies plus the IBM certification let him pressure-test product instinct on pricing, unit economics, and growth. His plan is to keep shipping as an engineer who thinks like a PM until the title catches up with the work.

PM skills: Product Roadmapping, User Research, Agile/Scrum, Stakeholder Management, Product Analytics, Feature Prioritization, Jira, Notion, Figma, SQL, Data Visualization.
Currently learning: SQL for Product Analytics, Product Metrics, User Research, Product Strategy, AI Product Management.

# Freelance

For businesses and clients, Ajinkya offers: Web App Development (React / Next.js), Dashboards & Analytics, AI Integration (chat, automation, LLM-powered features), and UI/UX Design-to-Code (Figma to responsive front-ends). His process is Discovery -> Design -> Build -> Launch. Selected client work: Godrej Properties, Max Extrusions, Skillquest (IFA), and Wasro. To start a project, the best step is to email him.

# Certifications & Achievements

Certifications: IBM Certified Professional - Product Management (Coursera); Product Management: Develop & Deliver New Product (Coursera specialization); Agile Development & Scrum (Coursera); Advanced Java Development (KR IT Education); Frontend Design - Web & Graphics (Max Computer Education); Data Analytics - Visualization (Infosys Springboard).
Achievements: Dizzy Hackers Hackathon Top-5 finalist (60+ teams, decentralized-identity project); World Innovation Expo 2023 Top 70 of 500+; PAC HACK volunteer (supported 200+ participants); final-year project lead for MediaMind-ML-360 (3-member team).

# Education

- B.Tech, Computer Science (AI & ML) - Presidency University, Bangalore (2021-2026).
- Junior College (Science) - Shri T.P. Bhatia College of Science (2019-2021).
- Schooling - St. Lawrence High School, Mumbai (until 2019).

# Contact & Links

- Email: dhumalajinkya2004@gmail.com (the best way to reach him for roles or freelance work).
- GitHub: https://github.com/Ajinkyaa2004
- LinkedIn: https://www.linkedin.com/in/ajinkya-dhumal/
- Resumes on the site: Engineer (/resume-engineer.pdf) and Product (/resume-pm.pdf).
- Location: Mumbai & Bangalore, India.
`.trim();
