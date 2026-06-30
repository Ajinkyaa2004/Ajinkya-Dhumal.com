// Reusable loading animation (the "bored hand" Lottie the user added).
// Lazy-loads lottie-react + the JSON; shows a tiny CSS spinner until ready.

import { lazy, Suspense } from "react";
import { useIsDesktop } from "../../lib/perf";

const LottiePlayer = lazy(() =>
  Promise.all([import("lottie-react"), import("../../lottie/loading.json")]).then(([mod, data]) => ({
    default: ({ className }) => <mod.default animationData={data.default} loop className={className} />,
  }))
);

// Branded, zero-download loader for mobile (the real hand Lottie would pull in the
// ~310KB lottie-react lib that was slowing phones down). Uses the per-route accent.
const CssSpinner = ({ className }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <span className="relative inline-flex h-12 w-12">
      <span className="absolute inset-0 rounded-full border-[3px] border-white/10" />
      <span
        className="absolute inset-0 rounded-full border-[3px] border-transparent animate-spin"
        style={{ borderTopColor: "rgb(var(--accent-rgb))", borderRightColor: "rgba(var(--accent-2-rgb), 0.6)" }}
      />
      <span
        className="absolute inset-0 m-auto h-2 w-2 rounded-full animate-pulse"
        style={{ background: "rgb(var(--accent-rgb))", boxShadow: "0 0 12px 2px rgba(var(--accent-rgb), 0.7)" }}
      />
    </span>
  </div>
);

const LoadingLottie = ({ className = "w-28 h-28" }) => {
  // Mobile uses the tiny CSS spinner so phones never download lottie-react (~310KB).
  if (!useIsDesktop()) return <CssSpinner className={className} />;
  return (
    <Suspense fallback={<CssSpinner className={className} />}>
      <LottiePlayer className={className} />
    </Suspense>
  );
};

export default LoadingLottie;
