// Deliberate route-transition "suspense" overlay — shows the loading Lottie
// briefly on navigation, even when the next page is already loaded. Adds a
// premium beat between routes.

import { AnimatePresence, motion } from "framer-motion";
import LoadingLottie from "./LoadingLottie";

const LoadingOverlay = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        key="route-loader"
        className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-[#050505]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 noise-texture opacity-20 pointer-events-none" />
        <div className="absolute w-[40vw] h-[40vw] rounded-full blur-[90px] pointer-events-none" style={{ background: "rgba(var(--accent-rgb), 0.14)" }} />
        <LoadingLottie className="w-36 h-36 md:w-44 md:h-44 relative z-10" />
        <p className="relative z-10 -mt-2 text-white/45 text-[11px] tracking-[0.35em] uppercase font-semibold">Loading</p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingOverlay;
