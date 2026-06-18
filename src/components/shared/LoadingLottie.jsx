// Reusable loading animation (the "bored hand" Lottie the user added).
// Lazy-loads lottie-react + the JSON; shows a tiny CSS spinner until ready.

import { lazy, Suspense } from "react";

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

const LoadingLottie = ({ className = "w-28 h-28" }) => (
  <Suspense fallback={<CssSpinner className={className} />}>
    <LottiePlayer className={className} />
  </Suspense>
);

export default LoadingLottie;
