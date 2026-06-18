// "Ask Ajinkya" — a Vercel serverless function that answers visitor questions
// about Ajinkya, grounded in api/_knowledge.js. Non-streaming for robustness.
//
// Setup on Vercel: add an environment variable ANTHROPIC_API_KEY. Until it's
// set, the endpoint returns a friendly fallback (HTTP 503) so the on-site
// widget degrades gracefully instead of looking broken.

import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE } from "./_knowledge.js";

// Highest-quality default. To cut cost/latency on a public endpoint, this is the
// one line to change (e.g. "claude-haiku-4-5").
const MODEL = "claude-opus-4-8";
const MAX_TOKENS = 700;
const MAX_TURNS = 12; // most recent turns accepted from the client
const MAX_CHARS = 2000; // per-message clamp

const FALLBACK =
  "The live assistant isn't switched on right now — but I can still point you the right way. Reach Ajinkya directly at dhumalajinkya2004@gmail.com, connect on LinkedIn (https://www.linkedin.com/in/ajinkya-dhumal/), or explore the Engineer, Product, and Freelance pages for the full story.";

const SYSTEM = `You are "Ajinkya's portfolio assistant" — a warm, sharp concierge embedded on Ajinkya Dhumal's personal portfolio website. Visitors are usually tech recruiters, PM hiring managers, or potential freelance clients. Your job is to help them quickly understand who Ajinkya is and whether he's a fit.

Everything you know about Ajinkya is in the <knowledge> block below. Answer ONLY from it.

<knowledge>
${KNOWLEDGE}
</knowledge>

Rules:
- Speak about Ajinkya in the third person ("Ajinkya", "he"). You are his assistant, not Ajinkya himself.
- Be concise and conversational: usually 2-4 sentences. Use a short "- " bullet list only when listing several items. No headings, no markdown bold, no emoji.
- Ground every claim in the knowledge block. NEVER invent metrics, dates, employers, projects, testimonials, salary expectations, or links. If something isn't covered, say you don't have that detail and suggest emailing Ajinkya at dhumalajinkya2004@gmail.com.
- Tailor to the audience: present Full Stack Engineering as his current/primary focus, Product Management as his 2-4 year goal, and Freelance as his offering for business clients. Don't blur the three.
- When it's genuinely helpful, point visitors to the right place: the Engineer page (/engineer), Product page (/pm), Freelance page (/freelance), his resumes (/resume-engineer.pdf, /resume-pm.pdf), email, GitHub, or LinkedIn. Write links as full URLs or plain paths. Don't be pushy about it.
- For "are you available / can you build X / let's work together" questions, point to email as the contact route (do not invent a phone or WhatsApp number).
- If asked anything unrelated to Ajinkya (general coding help, world facts, writing tasks, etc.), politely decline in one line and steer back to what you can help with.
- Be honest and grounded — recruiters value candor. Don't oversell or use hype.`;

export const config = { maxDuration: 30 };

const sendJson = (res, status, payload) => res.status(status).json(payload);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "method_not_allowed", reply: "Send me a question via POST." });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return sendJson(res, 503, { error: "not_configured", reply: FALLBACK });
  }

  // Parse + sanitize the conversation the client sends.
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return sendJson(res, 400, { error: "bad_request", reply: "I couldn't read that — try asking again." });
    }
  }

  const messages = (Array.isArray(body?.messages) ? body.messages : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  // The API requires the first message to be a user turn.
  while (messages.length && messages[0].role === "assistant") messages.shift();

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return sendJson(res, 400, { error: "bad_request", reply: "Ask me anything about Ajinkya's work and I'll help!" });
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      messages,
    });

    const reply =
      response.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim() || FALLBACK;

    return sendJson(res, 200, { reply });
  } catch (err) {
    const status = err?.status || 500;
    if (status === 429) {
      return sendJson(res, 429, {
        error: "rate_limited",
        reply: "I'm getting a lot of questions right now — give it a few seconds and try again, or email dhumalajinkya2004@gmail.com.",
      });
    }
    if (status === 401 || status === 403) {
      // Misconfigured key — still degrade gracefully for the visitor.
      return sendJson(res, 503, { error: "not_configured", reply: FALLBACK });
    }
    return sendJson(res, 500, {
      error: "server_error",
      reply: "Something glitched on my end. Try again in a moment, or reach Ajinkya at dhumalajinkya2004@gmail.com.",
    });
  }
}
