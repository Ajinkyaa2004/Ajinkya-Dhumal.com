// Reusable loading animation (the "bored hand" Lottie the user added).
// Lazy-loads lottie-react + the JSON; shows a tiny CSS spinner until ready.

import { lazy, Suspense } from "react";
import { useIsDesktop } from "../../lib/perf";

const LottiePlayer = lazy(() =>
  Promise.all([import("lottie-react"), import("../../lottie/loading.json")]).then(([mod, data]) => ({
    default: ({ className }) => <mod.default animationData={data.default} loop className={className} />,
  }))
);

const CssSpinner = ({ className }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="w-10 h-10 border-2 border-white/10 border-t-white/70 rounded-full animate-spin" />
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
