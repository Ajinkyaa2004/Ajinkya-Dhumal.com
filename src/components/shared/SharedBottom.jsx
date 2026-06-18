// The shared "personal brand" bottom half, identical across Engineer / PM /
// Freelance routes: About → Education → Achievements → Contact.
// (Footer is rendered globally in the App layout.)

import AboutSection from "./AboutSection";
import EducationTimeline from "./EducationTimeline";
import AchievementsGrid from "./AchievementsGrid";
import ContactSection from "./ContactSection";

const SharedBottom = () => (
  <>
    <AboutSection />
    <EducationTimeline />
    <AchievementsGrid />
    <ContactSection />
  </>
);

export default SharedBottom;
