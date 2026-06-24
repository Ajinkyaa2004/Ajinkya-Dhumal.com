// Aira — Ajinkya's sassy, pretty AI assistant avatar.
// Sparkly cat eyes, glossy lips, flowing hair, a cyber bow, headset, blush,
// jewelry, and a luxe tech gradient. Her eyes blink (.aira-eyes keyframe in index.css).

const AiraAvatar = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 100 100" className={className} role="img" aria-label="Aira, Ajinkya's assistant">
    <defs>
      <radialGradient id="aira-bg" cx="0.42" cy="0.25" r="0.9">
        <stop offset="0" stopColor="#f7fdff" />
        <stop offset="0.42" stopColor="#b9f2ff" />
        <stop offset="0.72" stopColor="#d2a0ff" />
        <stop offset="1" stopColor="#31206f" />
      </radialGradient>
      <radialGradient id="aira-skin" cx="0.5" cy="0.4" r="0.7">
        <stop offset="0" stopColor="#ffe9d8" />
        <stop offset="0.62" stopColor="#ffd1ad" />
        <stop offset="1" stopColor="#efad82" />
      </radialGradient>
      <linearGradient id="aira-hair" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#5b2f4f" />
        <stop offset="0.45" stopColor="#2e1b36" />
        <stop offset="1" stopColor="#160f22" />
      </linearGradient>
      <radialGradient id="aira-iris" cx="0.5" cy="0.32" r="0.75">
        <stop offset="0" stopColor="#f8cf77" />
        <stop offset="0.62" stopColor="#a86b32" />
        <stop offset="1" stopColor="#432111" />
      </radialGradient>
      <linearGradient id="aira-top" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f7feff" />
        <stop offset="0.48" stopColor="#94e9ff" />
        <stop offset="1" stopColor="#bf7cff" />
      </linearGradient>
      <linearGradient id="aira-bow" x1="-0.1" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#dfffff" />
        <stop offset="0.46" stopColor="#42dfff" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="aira-visor" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#4ffcff" stopOpacity="0.2" />
        <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="1" stopColor="#b57bff" stopOpacity="0.28" />
      </linearGradient>
      <clipPath id="aira-clip"><circle cx="50" cy="50" r="50" /></clipPath>
    </defs>

    <g clipPath="url(#aira-clip)">
      <rect width="100" height="100" fill="url(#aira-bg)" />
      <circle cx="28" cy="24" r="14" fill="#fff" opacity="0.12" />
      <circle cx="75" cy="70" r="18" fill="#1fdcff" opacity="0.13" />
      <path d="M8 37 H19 V31 H28" stroke="#7ff7ff" strokeWidth="1" fill="none" opacity="0.52" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M75 18 H86 V25 H93" stroke="#ffffff" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 72 H24 V78 H35" stroke="#d8b4fe" strokeWidth="1" fill="none" opacity="0.45" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="31" r="1.5" fill="#7ff7ff" opacity="0.86" />
      <circle cx="75" cy="18" r="1.3" fill="#fff" opacity="0.8" />
      <circle cx="35" cy="78" r="1.4" fill="#d8b4fe" opacity="0.75" />
      <path d="M18 25 l1.5 3.4 l3.4 1.5 l-3.4 1.5 L18 34.8 l-1.5 -3.4 l-3.4 -1.5 l3.4 -1.5 Z" fill="#fff" opacity="0.85" />
      <path d="M82 26 l1 2.3 l2.3 1 l-2.3 1 l-1 2.3 l-1 -2.3 l-2.3 -1 l2.3 -1 Z" fill="#fff" opacity="0.75" />
      <path d="M78 59 l1.2 2.8 l2.8 1.2 l-2.8 1.2 L78 68 l-1.2 -2.8 L74 64 l2.8 -1.2 Z" fill="#fff" opacity="0.7" />
      <circle cx="17" cy="58" r="1" fill="#fff" opacity="0.55" />

      {/* hair behind */}
      <path d="M17 58 C15 31 29 11 50 11 C71 11 85 31 83 58 C82 75 78 89 74 100 H60 C66 83 66 68 62 57 H38 C34 68 34 83 40 100 H26 C22 89 18 75 17 58 Z" fill="url(#aira-hair)" />
      <path d="M27 69 C23 55 25 30 39 18" stroke="#7b526b" strokeWidth="1.4" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M73 69 C77 55 75 30 61 18" stroke="#7b526b" strokeWidth="1.4" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M25 54 C20 35 30 17 49 14 C68 17 78 35 75 53" stroke="#80f7ff" strokeWidth="1.2" fill="none" opacity="0.42" strokeLinecap="round" />

      {/* off-shoulder top */}
      <path d="M50 76 C32 76 22 88 20 100 H80 C78 88 68 76 50 76 Z" fill="url(#aira-top)" />
      <path d="M31 84 Q50 93 69 84" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.7" strokeLinecap="round" />
      <path d="M50 79 C45 79 42 90 42 100 H58 C58 90 55 79 50 79 Z" fill="#ffffff" opacity="0.42" />
      <path d="M35 91 H45 M55 91 H65 M41 87 V96 M59 87 V96" stroke="#1b3760" strokeWidth="0.85" opacity="0.32" strokeLinecap="round" />
      <circle cx="50" cy="89" r="2.2" fill="#14213d" opacity="0.72" />
      <circle cx="50" cy="89" r="1.1" fill="#64f7ff" />

      {/* neck */}
      <path d="M44 63 H56 V73 C56 78 44 78 44 73 Z" fill="#f2bf91" />
      <path d="M43 72 Q50 76 57 72" stroke="#f7d5b8" strokeWidth="1.2" fill="none" opacity="0.75" strokeLinecap="round" />

      {/* face */}
      <path d="M30 45 C30 61 39 71 50 71 C61 71 70 61 70 45 C70 30 61 24 50 24 C39 24 30 30 30 45 Z" fill="url(#aira-skin)" />
      <circle cx="31" cy="49" r="3" fill="#f0bb8d" />
      <circle cx="69" cy="49" r="3" fill="#f0bb8d" />
      <circle cx="31" cy="53" r="1.2" fill="#ffd45e" />
      <circle cx="69" cy="53" r="1.2" fill="#ffd45e" />

      {/* holographic cheek interface */}
      <path d="M60.8 55.6 H67.2 M62.2 58.4 H66" stroke="#45ecff" strokeWidth="0.75" opacity="0.62" strokeLinecap="round" />
      <circle cx="59.2" cy="55.6" r="0.85" fill="#45ecff" opacity="0.62" />

      {/* blush */}
      <ellipse cx="37" cy="53.5" rx="4.6" ry="2.6" fill="#ff83a2" opacity="0.58" />
      <ellipse cx="63" cy="53.5" rx="4.6" ry="2.6" fill="#ff83a2" opacity="0.58" />
      <path d="M34.5 52.7 l-1.5 1.6 M38.5 52.4 l-1.5 1.8" stroke="#fff" strokeWidth="0.55" opacity="0.45" strokeLinecap="round" />
      <path d="M60.5 52.7 l-1.5 1.6 M64.5 52.4 l-1.5 1.8" stroke="#fff" strokeWidth="0.55" opacity="0.45" strokeLinecap="round" />

      {/* brows */}
      <path d="M36 38.4 Q42 36 47.6 38.1" stroke="#4d3342" strokeWidth="1.35" fill="none" strokeLinecap="round" />
      <path d="M52.8 37.7 Q58.8 34.8 64.2 37.6" stroke="#4d3342" strokeWidth="1.35" fill="none" strokeLinecap="round" />

      {/* eyes (blink) */}
      <g className="aira-eyes">
        <ellipse cx="41.4" cy="47" rx="5.3" ry="6.1" fill="#fff" />
        <ellipse cx="58.6" cy="47" rx="5.3" ry="6.1" fill="#fff" />
        <circle cx="41.8" cy="47.5" r="4.25" fill="url(#aira-iris)" />
        <circle cx="58.2" cy="47.5" r="4.25" fill="url(#aira-iris)" />
        <circle cx="42.1" cy="47.7" r="1.9" fill="#1f0d08" />
        <circle cx="58.5" cy="47.7" r="1.9" fill="#1f0d08" />
        <circle cx="43.7" cy="45.2" r="1.45" fill="#fff" />
        <circle cx="60.1" cy="45.2" r="1.45" fill="#fff" />
        <circle cx="40.1" cy="49.4" r="0.75" fill="#fff" opacity="0.85" />
        <circle cx="56.7" cy="49.4" r="0.75" fill="#fff" opacity="0.85" />
        {/* upper lash line */}
        <path d="M35.3 43.6 Q41.5 39.5 47.9 43.2" stroke="#21151f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M52.1 43.2 Q58.5 39.5 64.7 43.6" stroke="#21151f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M35.5 43.7 l-3.2 -2.1" stroke="#21151f" strokeWidth="1.55" strokeLinecap="round" />
        <path d="M36.8 42.3 l-1.7 -2.2" stroke="#21151f" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M64.5 43.7 l3.2 -2.1" stroke="#21151f" strokeWidth="1.55" strokeLinecap="round" />
      <path d="M63.2 42.3 l1.7 -2.2" stroke="#21151f" strokeWidth="1.25" strokeLinecap="round" />
      </g>

      {/* soft AR visor glow */}
      <path d="M33.8 43.1 C39 39.2 61 39.2 66.2 43.1" stroke="url(#aira-visor)" strokeWidth="3.1" fill="none" opacity="0.95" strokeLinecap="round" />
      <path d="M34.5 51.8 H47.5 M52.5 51.8 H65.5" stroke="#7ff7ff" strokeWidth="0.7" fill="none" opacity="0.45" strokeLinecap="round" />

      {/* nose + glossy lips */}
      <path d="M50 51 q-1.1 2 0.5 3.2" stroke="#dfa274" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M44.8 59.1 Q48.2 56.7 50 59 Q52 56.7 55.2 59.1 Q50 63.3 44.8 59.1 Z" fill="#d93f79" />
      <path d="M45.2 59.2 Q50 60.8 54.8 59.2" stroke="#9f275d" strokeWidth="0.85" fill="none" strokeLinecap="round" />
      <ellipse cx="48.2" cy="58.9" rx="1.75" ry="0.45" fill="#fff" opacity="0.52" />

      {/* fringe / bangs framing the face */}
      <path d="M28.5 46 C28.5 29 39 21 50 21 C61 21 71.5 29 71.5 46 C69 37 63 31 56.8 32.8 C54.5 27.8 45.5 27.8 43.2 32.8 C37 31 31 37 28.5 46 Z" fill="url(#aira-hair)" />
      <path d="M29 44 C25.5 56 27 69 32.4 79 C29 66 29 54 32.5 46 Z" fill="url(#aira-hair)" />
      <path d="M71 44 C74.5 56 73 69 67.6 79 C71 66 71 54 67.5 46 Z" fill="url(#aira-hair)" />
      <path d="M38.5 29 C41 24.5 47 22.5 53 25.5" stroke="#87617a" strokeWidth="1.45" fill="none" strokeLinecap="round" opacity="0.58" />
      <path d="M55 27 C61 29 65.5 34 68.5 42" stroke="#87617a" strokeWidth="1.05" fill="none" strokeLinecap="round" opacity="0.42" />

      {/* headset and mic */}
      <path d="M24.5 47 C22.5 34 31 20 43 16" stroke="#dfffff" strokeWidth="2.2" fill="none" opacity="0.82" strokeLinecap="round" />
      <rect x="22.2" y="45" width="5.3" height="12" rx="2.5" fill="#17243f" stroke="#7ff7ff" strokeWidth="0.9" />
      <path d="M27.2 55.2 C31.2 62.5 37.5 65.8 44.4 64.6" stroke="#17243f" strokeWidth="1.55" fill="none" strokeLinecap="round" />
      <path d="M27.2 55.2 C31.2 62.5 37.5 65.8 44.4 64.6" stroke="#7ff7ff" strokeWidth="0.65" fill="none" opacity="0.78" strokeLinecap="round" />
      <circle cx="44.7" cy="64.5" r="1.55" fill="#7ff7ff" />

      {/* jewelry */}
      <path d="M43.8 73.2 Q50 76.6 56.2 73.2" stroke="#7ff7ff" strokeWidth="1.1" fill="none" strokeLinecap="round" />
      <circle cx="50" cy="75.5" r="1.4" fill="#7ff7ff" />
      <circle cx="50" cy="75.5" r="2.7" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.45" />

      {/* bow in her hair */}
      <g transform="translate(67 28) rotate(12)">
        <path d="M0 0 C-4 -6 -11 -7 -12 -2 C-13 3 -7 6 0 1.2 Z" fill="url(#aira-bow)" />
        <path d="M0 0 C4 -6 11 -7 12 -2 C13 3 7 6 0 1.2 Z" fill="url(#aira-bow)" />
        <path d="M0 0 C-3.5 -5 -9.5 -6 -12 -2 C-9 -3.2 -5 -2.5 0 0 Z" fill="#ff92bd" opacity="0.6" />
        <path d="M0 0 C3.5 -5 9.5 -6 12 -2 C9 -3.2 5 -2.5 0 0 Z" fill="#ff92bd" opacity="0.6" />
        <path d="M-8 -2.2 H-4.5 M4.5 -2.2 H8 M-6 1.8 H-2.4 M2.4 1.8 H6" stroke="#0f1f3d" strokeWidth="0.7" opacity="0.55" strokeLinecap="round" />
        <circle cx="0" cy="-0.35" r="2.9" fill="#42dfff" />
        <circle cx="0" cy="-0.35" r="2.9" fill="none" stroke="#fff" strokeWidth="0.55" opacity="0.65" />
        <circle cx="7.5" cy="-3.3" r="0.75" fill="#fff" opacity="0.75" />
      </g>
    </g>

    <circle cx="50" cy="50" r="48.5" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.6" />
  </svg>
);

export default AiraAvatar;
