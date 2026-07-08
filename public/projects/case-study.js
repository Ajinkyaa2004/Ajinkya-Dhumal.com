/* ============================================================
   Premium case-study interactions — shared across /projects/*
   - Auto-derives accent from each page's .btn-primary gradient
   - Reading-progress bar, cursor blob, ambient orbs (desktop)
   - Section icons on <h2>
   - Scroll word-spotlight on prose + fade-up block reveals
   No dependencies. Guards for mobile + prefers-reduced-motion.
   ============================================================ */
(function () {
  "use strict";
  var docEl = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;
  var isMobile = window.matchMedia("(max-width: 767px)").matches;
  var notDesktop = window.matchMedia("(max-width: 1023px)").matches; // gate heavy blur orbs to >=1024

  docEl.classList.add("cs-js");
  /* Accent vars (--accent, --accent-2, --accent-rgb) are defined per-page in
     each page's inline <style> — parse-time authoritative, no JS needed. */

  /* ---- Reading-progress bar ---- */
  (function progress() {
    var bar = document.createElement("div");
    bar.id = "cs-progress";
    document.body.appendChild(bar);
    var ticking = false;
    function update() {
      var h = docEl.scrollHeight - docEl.clientHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0).toFixed(2) + "%";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  })();

  /* ---- 3. Section icons on <h2> ---- */
  (function icons() {
    var I = {
      layout: '<rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/>',
      target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
      sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
      branch: '<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
      layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
      code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
      shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
      trend: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
      server: '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><line x1="6" y1="7" x2="6.01" y2="7"/><line x1="6" y1="17" x2="6.01" y2="17"/>',
      compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.2 7.8 14.1 14.1 7.8 16.2 9.9 9.9 16.2 7.8"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>'
    };
    function pick(t) {
      t = t.toLowerCase();
      if (/overview/.test(t)) return "layout";
      if (/problem|discovery|challenge/.test(t)) return "target";
      if (/feature/.test(t)) return "sparkles";
      if (/decision|approach|strategy/.test(t)) return "branch";
      if (/architect|system|infrastructure/.test(t)) return "layers";
      if (/role|engineering|highlight/.test(t)) return "code";
      if (/harden|next|roadmap|improve|future/.test(t)) return "shield";
      if (/impact|outcome|result/.test(t)) return "trend";
      if (/tech|stack/.test(t)) return "server";
      if (/explore|related|project/.test(t)) return "compass";
      if (/user|client|audience|team/.test(t)) return "users";
      return "sparkles";
    }
    [].forEach.call(document.querySelectorAll(".container h2"), function (h) {
      var svg = '<svg class="cs-ico" viewBox="0 0 24 24" aria-hidden="true">' + I[pick(h.textContent)] + "</svg>";
      h.insertAdjacentHTML("afterbegin", svg);
    });
  })();

  /* ---- 4. Ambient orbs (desktop >=1024 only; blur is GPU-heavy) ---- */
  if (fine && !reduce && !notDesktop) {
    [
      { c: "var(--accent)", x: "6%", y: "14%", s: 360, a: "cs-float-a 15s ease-in-out infinite" },
      { c: "var(--accent-2)", x: "84%", y: "58%", s: 300, a: "cs-float-b 19s ease-in-out infinite" }
    ].forEach(function (o) {
      var el = document.createElement("div");
      el.className = "cs-orb";
      el.style.width = el.style.height = o.s + "px";
      el.style.left = o.x; el.style.top = o.y;
      el.style.background = o.c; el.style.animation = o.a;
      document.body.appendChild(el);
    });
  }

  /* ---- 5. Cursor blob (desktop only) ---- */
  if (fine && !reduce) {
    var cur = document.createElement("div");
    cur.id = "cs-cursor";
    document.body.appendChild(cur);
    var tx = innerWidth / 2, ty = innerHeight / 2, cx = tx, cy = ty, shown = false;
    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!shown) { shown = true; cur.classList.add("cs-on"); }
    }, { passive: true });
    document.addEventListener("mouseleave", function () { shown = false; cur.classList.remove("cs-on"); });
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest("a, button, .tech-pill")) cur.classList.add("cs-lg");
      else cur.classList.remove("cs-lg");
    });
    (function raf() {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cur.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px) translate(-50%,-50%)";
      requestAnimationFrame(raf);
    })();
  }

  /* ---- 6. Block reveal (fade-up on below-fold blocks) ---- */
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("cs-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -7% 0px" });
    [].forEach.call(
      document.querySelectorAll(".container h2, .container ul, .container .callout, .cta-buttons, .tech-list"),
      function (b) {
        if (b.getBoundingClientRect().top < innerHeight * 0.92) return; // in view on load → no anim
        b.classList.add("cs-hidden");
        io.observe(b);
      }
    );
  }

  /* ---- 7. Word-spotlight on prose (desktop/tablet) ---- */
  if (!reduce && !isMobile) {
    var words = [];
    function wrap(node) {
      [].slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          if (!ch.nodeValue.trim()) return;
          var frag = document.createDocumentFragment();
          ch.nodeValue.split(/(\s+)/).forEach(function (t) {
            if (t === "") return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
            var s = document.createElement("span");
            s.className = "cs-w"; s.textContent = t;
            frag.appendChild(s); words.push({ el: s, top: 0, last: -1 });
          });
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && ch.nodeName !== "BR") {
          wrap(ch); // preserve <em>/<strong>/<a>, wrap their inner words
        }
      });
    }
    [].forEach.call(
      document.querySelectorAll(".container p:not(.breadcrumb):not(.subtitle)"),
      function (p) { if (p.closest(".callout")) return; p.classList.add("reveal"); wrap(p); }
    );

    function measure() {
      var y = window.scrollY;
      words.forEach(function (w) { w.top = w.el.getBoundingClientRect().top + y; });
    }
    var ticking = false;
    function paint() {
      var y = window.scrollY, vh = innerHeight, start = vh * 0.9, end = vh * 0.42, span = start - end;
      for (var i = 0; i < words.length; i++) {
        var w = words[i], vt = w.top - y, op;
        if (vt >= start) op = 0.24; else if (vt <= end) op = 1; else op = 0.24 + 0.76 * (start - vt) / span;
        if (Math.abs(op - w.last) > 0.015) { w.el.style.opacity = op.toFixed(3); w.last = op; }
      }
      ticking = false;
    }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }
    measure(); paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    var rt;
    window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { measure(); paint(); }, 150); }, { passive: true });
    window.addEventListener("load", function () { measure(); paint(); });
  }
})();
