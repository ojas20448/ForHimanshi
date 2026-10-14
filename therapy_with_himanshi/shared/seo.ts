export const siteUrl = "https://manzartherapy.com";
const descriptions = {
  home: "Counselling with Himanshi Sahni. Trauma-informed, queer-affirmative therapy online and in East Delhi for adults aged 18–40. Sessions from ₹1,500.",
  workshops:
    "Explore mental wellbeing workshops with Himanshi Sahni at Manzar Therapy. Enquire about a conversation for your workplace, campus, or community.",
  book: "Book a counselling session with Himanshi Sahni. Explore online therapy from ₹1,500 and in-person sessions in East Delhi from ₹2,000.",
};
export function getSeo(pathname: string) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const pages: Record<
    string,
    { title: string; description: string; robots: string }
  > = {
    "/": {
      title: "Online & East Delhi Counselling | Manzar Therapy",
      description: descriptions.home,
      robots: "index, follow",
    },
    "/workshops": {
      title: "Mental Wellbeing Workshops | Manzar Therapy",
      description: descriptions.workshops,
      robots: "index, follow",
    },
    "/book": {
      title: "Book a Session with Himanshi Sahni | Manzar Therapy",
      description: descriptions.book,
      robots: "index, follow",
    },
    "/payment": {
      title: "Session Payment | Manzar Therapy",
      description: "Complete your session payment with Manzar Therapy.",
      robots: "noindex, follow",
    },
    "/atmospheric": {
      title: "Design Preview | Manzar Therapy",
      description: "Manzar Therapy design preview.",
      robots: "noindex, nofollow",
    },
  };
  const page = pages[path] || {
    title: "Page Not Found | Manzar Therapy",
    description: "Find your way back to Manzar Therapy.",
    robots: "noindex, follow",
  };
  const canonical = `${siteUrl}${path === "/" ? "/" : path}`;
  const schema = page.robots.startsWith("noindex")
    ? null
    : {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${siteUrl}/#practice`,
            name: "Manzar Therapy",
            url: `${siteUrl}/`,
            description: descriptions.home,
            email: "manzartherapy@gmail.com",
            telephone: "+919599529780",
            image: `${siteUrl}/images/himanshi-portrait-2542.webp`,
            sameAs: ["https://www.instagram.com/manzartherapy/"],
            areaServed: ["East Delhi"],
            founder: { "@id": `${siteUrl}/#himanshi` },
          },
          {
            "@type": "Person",
            "@id": `${siteUrl}/#himanshi`,
            name: "Himanshi Sahni",
            jobTitle: "Counselling Psychologist",
            description:
              "M.A. Applied Psychology with a clinical specialisation. A trauma-informed, queer-affirmative approach for adults aged 18–40.",
            image: `${siteUrl}/images/himanshi-portrait-2542.webp`,
            worksFor: { "@id": `${siteUrl}/#practice` },
            url: `${siteUrl}/#about`,
          },
          {
            "@type": "WebSite",
            "@id": `${siteUrl}/#website`,
            name: "Manzar Therapy",
            url: `${siteUrl}/`,
            publisher: { "@id": `${siteUrl}/#practice` },
            inLanguage: "en-IN",
          },
          {
            "@type": path === "/workshops" ? "CollectionPage" : "WebPage",
            "@id": `${canonical}#webpage`,
            name: page.title,
            description: page.description,
            url: canonical,
            isPartOf: { "@id": `${siteUrl}/#website` },
            about: { "@id": `${siteUrl}/#practice` },
            inLanguage: "en-IN",
          },
          ...(path !== "/"
            ? [
                {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Manzar Therapy",
                      item: `${siteUrl}/`,
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      name:
                        path === "/workshops" ? "Workshops" : "Book a session",
                      item: canonical,
                    },
                  ],
                },
              ]
            : []),
        ],
      };
  return { ...page, canonical, schema };
}
const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
export function getSeoTags(pathname: string) {
  const seo = getSeo(pathname);
  return `<title>${escape(seo.title)}</title>
<meta name="description" content="${escape(seo.description)}" />
<meta name="robots" content="${seo.robots}" />
<link rel="canonical" href="${escape(seo.canonical)}" />
<meta property="og:title" content="${escape(seo.title)}" />
<meta property="og:description" content="${escape(seo.description)}" />
<meta property="og:url" content="${escape(seo.canonical)}" />
<meta name="twitter:title" content="${escape(seo.title)}" />
<meta name="twitter:description" content="${escape(seo.description)}" />
${seo.schema ? `<script id="structured-data" type="application/ld+json">${JSON.stringify(seo.schema).replace(/</g, "\\u003c")}</script>` : ""}`;
}
