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
        <div className="absolute w-[50vw] h-[50vw] rounded-full blur-[90px] pointer-events-none" style={{ background: "rgba(var(--accent-rgb), 0.16)" }} />
        <LoadingLottie className="w-56 h-56 md:w-80 md:h-80 relative z-10" />
        <p className="relative z-10 -mt-4 md:-mt-6 text-white/60 text-base md:text-xl tracking-[0.45em] uppercase font-bold">Loading</p>
      </motion.div>
    )}
  </AnimatePresence>
);

export default LoadingOverlay;
