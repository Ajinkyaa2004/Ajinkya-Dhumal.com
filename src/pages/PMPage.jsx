// /pm — Product Management portfolio. The 16 case studies are the star.
// Top half = PM pitch; bottom half = shared personal brand.

import Seo from "../components/shared/Seo";
import PMHero from "../components/pm/PMHero";
import CaseStudyGrid from "../components/pm/CaseStudyGrid";
import TeardownBook from "../components/pm/TeardownBook";
import ProductThinking from "../components/pm/ProductThinking";
import ProductSpec from "../components/pm/ProductSpec";
import WhyPM from "../components/pm/WhyPM";
import PMStatBand from "../components/pm/PMStatBand";
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

const PMPage = () => (
  <>
    <Seo
      title="Ajinkya Dhumal — Product Manager Portfolio | 16 Case Studies"
      description="IBM-certified product thinker: 16 strategic case studies across pricing, unit economics & growth, plus 4 shipped products. Engineering depth meets product instinct."
      path="/pm"
      jsonLd={PM_JSONLD}
    />
    <PMHero />
    <CaseStudyGrid />
    <TeardownBook />
    <PMStatBand />
    <ProductThinking />
    <ProductSpec />
    <WhyPM />
    <SharedBottom />
  </>
);

export default PMPage;
