import { useEffect } from "react";
import { useLocation } from "wouter";
import { getSeo } from "@shared/seo";

export function RouteMetadata() {
  const [location] = useLocation();
  useEffect(() => {
    const seo = getSeo(location);
    document.title = seo.title;
    const meta = (key: string, value: string, property = false) => {
      const attribute = property ? "property" : "name";
      let element = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    meta("description", seo.description);
    meta("robots", seo.robots);
    meta("og:title", seo.title, true);
    meta("og:description", seo.description, true);
    meta("og:url", seo.canonical, true);
    meta("twitter:title", seo.title);
    meta("twitter:description", seo.description);
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = seo.canonical;
    let script = document.getElementById("structured-data");
    if (seo.schema) {
      if (!script) {
        script = document.createElement("script");
        script.id = "structured-data";
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(seo.schema);
    } else {
      script?.remove();
    }
    if (window.location.hash)
      document
        .getElementById(decodeURIComponent(window.location.hash.slice(1)))
        ?.scrollIntoView();
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}
