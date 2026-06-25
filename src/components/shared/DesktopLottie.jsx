// Renders a (lazy) Lottie ONLY on desktop. On mobile it returns null, so phones
// never download lottie-react (~310KB) or the large Lottie JSON — the #1 cause of
// slow 4G loads. Decorative hero animations simply don't render on small screens.

import { Suspense } from "react";
import { useIsDesktop } from "../../lib/perf";

const DesktopLottie = ({ fallback = null, children }) => {
  if (!useIsDesktop()) return null;
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default DesktopLottie;
