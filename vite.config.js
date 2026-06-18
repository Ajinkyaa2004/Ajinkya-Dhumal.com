import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2020",
    // Manual chunking keeps the homepage bundle lean and isolates the heavy
    // animation libs so route pages only pay for what they use.
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion-vendor": ["framer-motion"],
          "gsap-vendor": ["gsap", "split-type"],
        },
      },
    },
  },
});
