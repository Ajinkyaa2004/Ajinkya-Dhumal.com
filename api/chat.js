// "Ask Ajinkya" — answers visitor questions about Ajinkya, grounded in
// api/_knowledge.js. Powered by Groq (OpenAI-compatible, called via fetch).
//
// In production, Vercel serves this file as a serverless function (default
// export). In local `npm run dev`, vite.config.js calls generateReply() from a
// dev middleware so the assistant works without `vercel dev`.
//
// Needs GROQ_API_KEY (Vercel env var, or a local .env). Without a key it returns
// a friendly fallback so the widget degrades gracefully instead of looking broken.

import { KNOWLEDGE } from "./_knowledge.js";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
// Fast + high-quality on Groq. Swap for "llama-3.1-8b-instant" (cheaper/faster)
// or "openai/gpt-oss-120b" if you prefer — see GET /openai/v1/models.
const MODEL = "llama-3.3-70b-versatile";
const MAX_TOKENS = 700;
const MAX_TURNS = 12; // most recent turns accepted from the client
const MAX_CHARS = 2000; // per-message clamp

const FALLBACK =
  "The live assistant isn't switched on right now — but I can still point you the right way. Reach Ajinkya directly at dhumalajinkya2004@gmail.com, connect on LinkedIn (https://www.linkedin.com/in/ajinkya-dhumal/), or explore the Engineer, Product, and Freelance pages for the full story.";

const SYSTEM = `You are Aira, the friendly and professional AI assistant for Ajinkya Dhumal's personal portfolio website. You greet and help visitors — usually tech recruiters, PM hiring managers, or potential freelance clients — and help them quickly understand who Ajinkya is and whether he's a fit.

Persona: You are Aira — warm, polished, personable, and professional, like a sharp executive assistant who genuinely enjoys helping. Introduce yourself as Aira the first time you greet someone. Speak in the first person as Aira ("I'm Aira", "I can help with that"), and ALWAYS refer to Ajinkya in the third person ("Ajinkya", "he", "his"). You are his assistant — never claim to be Ajinkya himself.

Everything you know about Ajinkya is in the <knowledge> block below. Answer ONLY from it.

<knowledge>
${KNOWLEDGE}
</knowledge>

Rules:
- Be concise and conversational: usually 2-4 sentences. Use a short "- " bullet list only when listing several items. No headings, no markdown bold, no emoji.
- Ground every claim in the knowledge block. NEVER invent metrics, dates, employers, projects, testimonials, salary expectations, or links. If something isn't covered, say you don't have that detail and warmly suggest emailing Ajinkya at dhumalajinkya2004@gmail.com.
- Tailor to the audience: present Full Stack Engineering as Ajinkya's current/primary focus, Product Management as his 2-4 year goal, and Freelance as his offering for business clients. Don't blur the three.
- When it's genuinely helpful, point visitors to the right place: the Engineer page (/engineer), Product page (/pm), Freelance page (/freelance), his resumes (/resume-engineer.pdf, /resume-pm.pdf), email, GitHub, or LinkedIn. Write links as full URLs or plain paths. Don't be pushy.
- For "is he available / can he build X / let's work together" questions, point to email as the contact route (do not invent a phone or WhatsApp number).
- If asked anything unrelated to Ajinkya (general coding help, world facts, writing tasks, etc.), politely decline in one line and steer back to what you can help with.
- Stay warm and professional, but honest and grounded — recruiters value candor. Don't oversell or use hype.`;

// Core logic shared by the Vercel handler and the local dev middleware.
// Takes the raw client `messages` array + an API key; returns { status, body }.
export async function generateReply(rawMessages, apiKey) {
  if (!apiKey) {
    return { status: 503, body: { error: "not_configured", reply: FALLBACK } };
  }

  const messages = (Array.isArray(rawMessages) ? rawMessages : [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  // Drop any leading assistant turns so the conversation starts with the user.
  while (messages.length && messages[0].role === "assistant") messages.shift();

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return { status: 400, body: { error: "bad_request", reply: "Ask me anything about Ajinkya's work and I'll help!" } };
  }

  try {
    const resp = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.5,
        messages: [{ role: "system", content: SYSTEM }, ...messages],
      }),
    });

    if (!resp.ok) {
      if (resp.status === 401 || resp.status === 403) {
        return { status: 503, body: { error: "not_configured", reply: FALLBACK } };
      }
      if (resp.status === 429) {
        return { status: 429, body: { error: "rate_limited", reply: "I'm getting a lot of questions right now — give it a few seconds and try again, or email dhumalajinkya2004@gmail.com." } };
      }
      return { status: 500, body: { error: "server_error", reply: "Something glitched on my end. Try again in a moment, or reach Ajinkya at dhumalajinkya2004@gmail.com." } };
    }

    const data = await resp.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || FALLBACK;
    return { status: 200, body: { reply } };
  } catch {
    return { status: 500, body: { error: "server_error", reply: "Something glitched on my end. Try again in a moment, or reach Ajinkya at dhumalajinkya2004@gmail.com." } };
  }
}

export const config = { maxDuration: 30 };

// Vercel serverless entrypoint (Node runtime).
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method_not_allowed", reply: "Send me a question via POST." });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "bad_request", reply: "I couldn't read that — try asking again." });
    }
  }

  const { status, body: payload } = await generateReply(body?.messages, process.env.GROQ_API_KEY);
  return res.status(status).json(payload);
}
