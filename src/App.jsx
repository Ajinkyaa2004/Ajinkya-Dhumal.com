// Layout wrapper: splash → route-accent shell (bg + parallax orbs + cursor) →
// navbar → lazy-loaded routed page → global footer. Each page is code-split.

import { lazy, Suspense, useState, useEffect, useLayoutEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import SplashScreen from "./components/shared/SplashScreen";
import CursorFollower from "./components/shared/CursorFollower";
import LoadingLottie from "./components/shared/LoadingLottie";
import LoadingOverlay from "./components/shared/LoadingOverlay";
import { gsap, ScrollTrigger, useGSAP } from "./lib/gsap";
import { detectLowPerf, prefersReducedMotion } from "./lib/perf";

const loadHome = () => import("./pages/HomePage");
const loadEngineer = () => import("./pages/EngineerPage");
const loadPM = () => import("./pages/PMPage");
const loadFreelance = () => import("./pages/FreelancePage");
const HomePage = lazy(loadHome);
const EngineerPage = lazy(loadEngineer);
const PMPage = lazy(loadPM);
const FreelancePage = lazy(loadFreelance);
const PRELOADERS = { home: loadHome, engineer: loadEngineer, pm: loadPM, freelance: loadFreelance };

const routeKeyFromPath = (pathname) => {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p.startsWith("/engineer")) return "engineer";
  if (p.startsWith("/pm")) return "pm";
  if (p.startsWith("/freelance")) return "freelance";
  return "home";
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageFallback = () => (
  <div className="min-h-[100dvh] flex items-center justify-center" role="status" aria-label="Loading">
    <LoadingLottie className="w-36 h-36" />
  </div>
);

export default function App() {
  const location = useLocation();
  const activeKey = routeKeyFromPath(location.pathname);
  const rootRef = useRef(null);
  const [showSplash, setShowSplash] = useState(true);
  const [navLoading, setNavLoading] = useState(false);
  const firstNav = useRef(true);

  // Splash plays on every full load / refresh. Meanwhile, preload the current
  // route's chunk so NO loading animation flashes once the splash finishes.
  useEffect(() => {
    PRELOADERS[activeKey]?.();
  }, [activeKey]);

  // Deliberate loading beat between route changes (skip first load + reduced motion).
  useEffect(() => {
    if (firstNav.current) {
      firstNav.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    setNavLoading(true);
    const t = setTimeout(() => setNavLoading(false), 1100);
    return () => clearTimeout(t);
  }, [location.pathname]);

  const finishSplash = () => setShowSplash(false);

  // Parallax drift on the ambient orbs (skipped on low-perf devices).
  useGSAP(
    () => {
      if (showSplash || detectLowPerf()) return;
      const orbs = gsap.utils.toArray("[data-orb]");
      const dist = [140, -120, 180];
      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          y: dist[i] ?? 120,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
        });
      });
    },
    { scope: rootRef, dependencies: [showSplash, activeKey] }
  );

  // Re-measure ScrollTriggers after route content + async media settle.
  useEffect(() => {
    if (showSplash) return;
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 350);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeKey, showSplash]);

  return (
    <div ref={rootRef} data-route={activeKey} className="font-sans min-h-screen relative overflow-hidden bg-[#050505] text-slate-200 selection:bg-indigo-500/30 selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 noise-texture" />

      {showSplash ? (
        <SplashScreen onFinish={finishSplash} />
      ) : (
        <>
          <Navbar />
          <CursorFollower />
          <LoadingOverlay show={navLoading} />
          <ScrollToTop />

          {/* Ambient accent orbs (outer = parallax target, inner = CSS drift + color) */}
          <div data-orb className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] pointer-events-none z-0">
            <div className="w-full h-full rounded-full blur-[80px] animate-pulse-slow" style={{ background: "rgba(var(--accent-rgb), 0.12)" }} />
          </div>
          <div data-orb className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] pointer-events-none z-0">
            <div className="w-full h-full rounded-full blur-[80px] animate-pulse-slow" style={{ background: "rgba(var(--accent-2-rgb), 0.08)", animationDelay: "2s" }} />
          </div>
          <div data-orb className="fixed top-[40%] left-[20%] w-[30vw] h-[30vw] pointer-events-none z-0">
            <div className="w-full h-full rounded-full blur-[80px] animate-blob" style={{ background: "rgba(var(--accent-rgb), 0.08)" }} />
          </div>

          <main role="main" className="relative z-10">
            <Suspense fallback={<PageFallback />}>
              <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
                <Routes location={location}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/engineer" element={<EngineerPage />} />
                  <Route path="/pm" element={<PMPage />} />
                  <Route path="/freelance" element={<FreelancePage />} />
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </motion.div>
            </Suspense>
          </main>

          <Footer />
        </>
      )}
    </div>
  );
}
