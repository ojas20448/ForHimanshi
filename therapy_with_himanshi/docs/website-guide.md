# Manzar Therapy website

The site keeps Manzar's blush pink, forest green, and warm paper palette. Public pages use Cormorant Garamond for expressive headings, Lora for reading, and Poppins for controls. Motion is limited to the portrait arrival, selected section entrances, and interaction feedback. Reduced-motion preferences show a static, readable page.

## Add a workshop

Edit `client/src/content/workshops.ts`. Add an entry to the `workshops` array with a unique id, title, organisation, ISO date, audience, a short description, image URL, and descriptive imageAlt. Put web-sized photographs in `client/public/images/workshops/`. Example shape (replace every value with real details):

    {
      id: "unique-event-name",
      title: "Actual workshop title",
      organisation: "Actual organisation",
      date: "2026-10-15",
      audience: "Actual audience",
      description: "A short account of what the workshop explored.",
      image: "/images/workshops/event-name.webp",
      imageAlt: "Describe what is visible in the workshop photograph."
    }

The gallery currently shows the supplied IMG_3718 and IMG_3724 photographs with factual captions. Suggested conversation themes and WhatsApp / email enquiry links remain available. Add event names and dates only when confirmed. Use photographs that are approved for public display. Rebuild and publish after content changes. This is a source-managed gallery, without an admin upload screen.

## Build and verification

- `npm run check` checks TypeScript.
- `npm run build` builds the client, pre-renders the homepage and workshops, writes distinct HTML metadata for booking and payment, and builds the server.
- `npm run test:site` checks the built site on desktop and mobile, accessibility, route metadata, hydration, navigation, session selection, FAQ, testimonial controls, and mocked contact outcomes. It does not make payments or send real enquiries.

The initial HTML contains public page content for visitors and crawlers. `shared/seo.ts` owns route metadata and structured data. Payment and the old design preview are noindex. `client/public/sitemap.xml` lists only public canonical routes. Keep dates in the sitemap tied to actual content changes.

## Before publishing

Confirm the Calendly event duration matches the advertised 60-minute sessions, and test one real booking/payment and contact delivery in the configured environment. Local UI tests use simulated responses and do not verify payment-provider credentials, delivery notifications, availability, or settlement. Connect the live domain to Google Search Console, submit the sitemap, and inspect the home and workshops URLs after publishing. Rankings and conversions need measurement over time.

Reference: [Google Search Central: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics). The public routes are pre-rendered for all visitors; metadata and structured data match the visible content.

The test runner uses an installed Chrome or Edge on Windows, or Puppeteer's managed browser elsewhere. Set `PUPPETEER_EXECUTABLE_PATH` to use another browser installation. The calendar is simulated for success and failure checks, and no real appointment is created.
