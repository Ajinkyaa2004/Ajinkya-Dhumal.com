// /freelance — client-facing portfolio. Outcomes over jargon.
// Top half = client pitch; bottom half = shared personal brand.

import { motion } from "framer-motion";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";
import Seo from "../components/shared/Seo";
import FreelanceHero from "../components/freelance/FreelanceHero";
import ClientWork from "../components/freelance/ClientWork";
import ServicesGrid from "../components/freelance/ServicesGrid";
import ProcessStrip from "../components/freelance/ProcessStrip";
import TestimonialsSlider from "../components/freelance/TestimonialsSlider";
import SharedBottom from "../components/shared/SharedBottom";
import { MagneticLink } from "../components/shared/AnimationUtils";
import { CONTACT } from "../data/shared-data";

const FreelanceCTA = () => (
  <section aria-label="Get in touch" className="relative py-16 md:py-20 px-6 md:px-20 z-10 w-full max-w-6xl mx-auto">
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="glass-panel rounded-[2rem] p-8 md:p-14 border border-white/10 relative overflow-hidden text-center">
      <div className="absolute inset-0 noise-texture opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/15 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 text-transparent bg-clip-text">Together.</span>
        </h2>
        <p className="text-white/50 text-base md:text-lg mt-4 max-w-xl mx-auto">Got a project in mind? Tell me about it — quick quote, no pressure.</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <MagneticLink href={CONTACT.whatsapp} target="_blank" rel="noreferrer" aria-label="Message on WhatsApp" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3.5 rounded-full font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all inline-flex items-center gap-2">
            <FaWhatsapp className="text-lg" /> WhatsApp Me
          </MagneticLink>
          <MagneticLink href={`mailto:${CONTACT.email}`} aria-label="Email me" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3.5 rounded-full font-bold border border-white/20 text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2">
            <FaEnvelope className="text-base" /> Email Me
          </MagneticLink>
        </div>
      </div>
    </motion.div>
  </section>
);

const FREELANCE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Ajinkya Dhumal — Freelance Web Development",
  description: "Freelance web apps, dashboards, and AI integrations for growing businesses — from idea to launch.",
  url: "https://ajinkyadhumal.com/freelance",
  areaServed: "Worldwide",
  provider: { "@type": "Person", name: "Ajinkya Dhumal" },
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web App Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dashboards & Analytics" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Integration" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design to Code" } },
  ],
};

const FreelancePage = () => (
  <>
    <Seo
      title="Ajinkya Dhumal — Freelance Web Developer for Growing Businesses"
      description="Freelance web apps, dashboards, and AI integrations for growing businesses — from idea to launch. Trusted by Godrej Properties, Max Extrusions, and more."
      path="/freelance"
      jsonLd={FREELANCE_JSONLD}
    />
    <FreelanceHero />
    <ClientWork />
    <ServicesGrid />
    <ProcessStrip />
    <TestimonialsSlider />
    <FreelanceCTA />
    <SharedBottom />
  </>
);

export default FreelancePage;
