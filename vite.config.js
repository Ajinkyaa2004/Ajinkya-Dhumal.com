import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Dev-only: serve POST /api/chat locally so the "Ask Ajinkya" assistant works
// in `npm run dev` (Vercel serves api/chat.js as a serverless function in prod).
// Reads GROQ_API_KEY from your local .env; without a key it returns the
// graceful "not configured" reply, same as production.
function devApiChat(env) {
  return {
    name: "dev-api-chat",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if ((req.url || "").split("?")[0] !== "/api/chat") return next();
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "method_not_allowed", reply: "Send me a question via POST." }));
          return;
        }
        let raw = "";
        req.on("data", (c) => (raw += c));
        req.on("end", async () => {
          res.setHeader("Content-Type", "application/json");
          try {
            // Cache-bust so edits to api/chat.js are picked up without a restart (dev only).
            const modUrl = new URL("./api/chat.js", import.meta.url).href + "?t=" + Date.now();
            const { generateReply } = await import(modUrl);
            const parsed = raw ? JSON.parse(raw) : {};
            const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
            const { status, body } = await generateReply(parsed.messages, apiKey);
            res.statusCode = status;
            res.end(JSON.stringify(body));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "server_error", reply: "Local assistant error — check the dev terminal." }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), devApiChat(env)],
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
  };
});
