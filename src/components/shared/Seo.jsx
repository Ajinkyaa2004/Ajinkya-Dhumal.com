// Per-route SEO. Imperatively upserts the existing <head> tags (from index.html)
// so route changes update them in place — no duplicates, React-19-safe.

import { useEffect } from "react";

const SITE = "https://ajinkyadhumal.com";

const setNamed = (name, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setProp = (property, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const setJsonLd = (obj) => {
  const id = "route-jsonld";
  let el = document.getElementById(id);
  if (!obj) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(obj);
};

// Per-route share images (generated in public/). Falls back to the default.
const OG_BY_PATH = {
  "/": "og-home.png",
  "/engineer": "og-engineer.png",
  "/pm": "og-pm.png",
  "/freelance": "og-freelance.png",
};

const Seo = ({ title, description, path = "/", image, jsonLd }) => {
  useEffect(() => {
    const url = `${SITE}${path}`;
    const ogImage = image || `${SITE}/${OG_BY_PATH[path] || "og-image.png"}`;
    if (title) {
      document.title = title;
      setProp("og:title", title);
      setNamed("twitter:title", title);
    }
    if (description) {
      setNamed("description", description);
      setProp("og:description", description);
      setNamed("twitter:description", description);
    }
    setProp("og:url", url);
    setNamed("twitter:url", url);
    setProp("og:image", ogImage);
    setNamed("twitter:image", ogImage);
    setCanonical(url);
    setJsonLd(jsonLd);
    // path identifies the route; copy is route-bound, so this is the right key.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return null;
};

export default Seo;
