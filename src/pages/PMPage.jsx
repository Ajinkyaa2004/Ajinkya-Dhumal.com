// /pm — Product Management portfolio. The 16 case studies are the star.
// Top half = PM pitch; bottom half = shared personal brand.

import Seo from "../components/shared/Seo";
import PMHero from "../components/pm/PMHero";
import CaseStudyGrid from "../components/pm/CaseStudyGrid";
import ProductThinking from "../components/pm/ProductThinking";
import BeThePM from "../components/pm/BeThePM";
import WhyPM from "../components/pm/WhyPM";
import PMAnalyticsPanel from "../components/pm/PMAnalyticsPanel";
import SharedBottom from "../components/shared/SharedBottom";
import { CASE_STUDY_CATEGORIES } from "../data/pm-data";

const PM_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Product strategy case studies by Ajinkya Dhumal",
  itemListElement: CASE_STUDY_CATEGORIES.flatMap((c) => c.studies)
    .filter((s) => s.link)
    .map((s, i) => ({ "@type": "ListItem", position: i + 1, name: `${s.company} — product strategy case study`, url: s.link })),
};

const AnalyticsBand = () => (
  <section aria-label="Product instinct by the numbers" className="relative z-10 px-6 md:px-20 max-w-3xl mx-auto py-10 md:py-16 flex flex-col items-center">
    <p className="text-xs font-bold tracking-[0.3em] uppercase text-violet-300/70 mb-6 text-center">Product instinct, by the numbers</p>
    <div className="w-full max-w-md">
      <PMAnalyticsPanel />
    </div>
  </section>
);

const PMPage = () => (
  <>
    <Seo
      title="Ajinkya Dhumal — Product-Minded Engineer → PM | 16 Case Studies"
      description="IBM-certified product thinker: 16 strategic case studies across pricing, unit economics & growth, plus 4 shipped products. Engineering depth meets product instinct."
      path="/pm"
      jsonLd={PM_JSONLD}
    />
    <PMHero />
    <CaseStudyGrid />
    <AnalyticsBand />
    <ProductThinking />
    <BeThePM />
    <WhyPM />
    <SharedBottom />
  </>
);

export default PMPage;
