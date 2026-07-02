// Analytics for the /connect tap page.
// - Vercel Web Analytics (already enabled site-wide) auto-captures pageviews, device,
//   and geo — no key needed.
// - PostHog (optional) adds the rich per-tap event log, button-click events, and
//   time-on-page. It ONLY turns on when VITE_POSTHOG_KEY is set (add it in Vercel's
//   env vars). Without a key, everything below no-ops — the page never breaks.

import { track as vercelTrack } from "@vercel/analytics";

let ph = null;
let initStarted = false;
const KEY = import.meta.env.VITE_POSTHOG_KEY;
const HOST = import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com";

export async function initAnalytics() {
  if (!KEY || initStarted) return;
  initStarted = true;
  try {
    const { default: posthog } = await import("posthog-js");
    posthog.init(KEY, {
      api_host: HOST,
      capture_pageview: true, // each tap = one timestamped pageview event
      capture_pageleave: true, // gives time-on-page / dwell
      autocapture: true, // auto-tracks clicks too
      persistence: "localStorage+cookie", // new vs returning
    });
    ph = posthog;
  } catch {
    /* analytics must never break the page */
  }
}

// Fire a named event to whatever analytics are available.
export function track(event, props = {}) {
  try {
    vercelTrack(event, props);
  } catch {
    /* ignore */
  }
  try {
    ph?.capture(event, props);
  } catch {
    /* ignore */
  }
}
