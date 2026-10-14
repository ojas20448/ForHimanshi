import puppeteer from "puppeteer";
import axe from "axe-core";
import { createServer } from "node:http";
import { readFile, mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { existsSync } from "node:fs";

const root = path.resolve("dist/public");
const output =
  process.env.QA_OUTPUT_DIR || path.join(os.tmpdir(), "manzar-site-review");
await mkdir(output, { recursive: true });
const report = { checks: [], accessibility: [], errors: [], screenshots: [] };
const check = (name, passed, detail = "") =>
  report.checks.push({
    name,
    passed: Boolean(passed),
    ...(detail ? { detail } : {}),
  });
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".otf": "font/otf",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    let file = path.resolve(root, `.${pathname}`);
    if (
      path.relative(root, file).startsWith("..") ||
      path.isAbsolute(path.relative(root, file))
    ) {
      res.writeHead(403).end();
      return;
    }
    try {
      if ((await stat(file)).isDirectory())
        file = path.join(file, "index.html");
      await stat(file);
    } catch {
      file = path.join(root, "404.html");
      res.statusCode = 404;
    }
    res.setHeader(
      "Content-Type",
      types[path.extname(file)] || "application/octet-stream",
    );
    res.end(await readFile(file));
  } catch {
    res.writeHead(500).end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const installedBrowser =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ].find(existsSync);
const browser = await puppeteer.launch({
  headless: true,
  ...(installedBrowser ? { executablePath: installedBrowser } : {}),
});
const page = await browser.newPage();
page.on("pageerror", (error) => report.errors.push(error.message));
let contactMode = "success";
let calendarMode = "blocked";
await page.setRequestInterception(true);
page.on("request", (request) => {
  if (
    request.url() === "https://assets.calendly.com/assets/external/widget.js"
  ) {
    if (calendarMode === "blocked") return request.abort("blockedbyclient");
    return request.respond({
      status: 200,
      contentType: "application/javascript",
      body: 'window.Calendly = { initInlineWidget: function(config) { const frame = document.createElement("iframe"); frame.src = "https://calendly.com/manzartherapy/qa-ui-test"; config.parentElement.appendChild(frame); } };',
    });
  }
  if (request.url() === "https://calendly.com/manzartherapy/qa-ui-test")
    return request.respond({
      status: 200,
      contentType: "text/html",
      body: "<!doctype html><html lang='en'><head><title>Local calendar simulation</title></head><body>Simulated calendar. No appointment is created.</body></html>",
    });
  if (request.url() === `${origin}/api/health`)
    return request.respond({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        status: "ok",
        calendly: { link: "https://calendly.com/manzartherapy/30min" },
      }),
    });
  if (request.url() === `${origin}/api/contact`)
    return request.respond({
      status: contactMode === "success" ? 201 : 503,
      contentType: "application/json",
      body: JSON.stringify(
        contactMode === "success"
          ? { id: "ui-test-only" }
          : { error: "Simulated delivery failure" },
      ),
    });
  return request.continue();
});
const settle = async () => {
  await page.evaluate(() =>
    Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]),
  );
  await new Promise((resolve) => setTimeout(resolve, 750));
};
const capture = async (name, fullPage = true) => {
  const filename = path.join(output, `${name}.png`);
  await page.screenshot({ path: filename, fullPage });
  report.screenshots.push(filename);
};
const audit = async (name) => {
  await page.addScriptTag({ content: axe.source });
  const result = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
      },
    });
    return result.violations.map((item) => ({
      id: item.id,
      impact: item.impact,
      description: item.description,
      nodes: item.nodes
        .slice(0, 5)
        .map((node) => ({ target: node.target, summary: node.failureSummary })),
    }));
  });
  report.accessibility.push({ page: name, violations: result });
};
try {
  for (const route of ["/", "/workshops", "/book", "/payment"]) {
    const response = await fetch(`${origin}${route}`);
    const html = await response.text();
    check(
      `Static metadata ${route}`,
      response.ok &&
        html.includes(
          `rel="canonical" href="https://manzartherapy.com${route}"`,
        ),
    );
    if (route === "/" || route === "/workshops")
      check(
        `Content before JavaScript ${route}`,
        /<h1[\s>]/.test(html) && html.includes("Himanshi"),
      );
    if (route === "/payment")
      check(
        "Payment excluded from indexing",
        html.includes('content="noindex, follow"'),
      );
  }
  const missing = await fetch(`${origin}/missing-page-test`);
  check("Unknown route returns 404", missing.status === 404);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(origin, { waitUntil: "networkidle2" });
  await settle();
  check(
    "Single homepage H1",
    await page.$$eval("h1", (elements) => elements.length === 1),
  );
  check(
    "New portrait loaded",
    await page.$eval(
      ".profile-image",
      (img) =>
        img.complete &&
        img.naturalWidth > 0 &&
        img.currentSrc.includes("himanshi-portrait"),
    ),
  );
  check("No artificial entry delay", (await page.$(".preloader")) === null);
  await page.$$eval("img", async (images) => {
    images.forEach((image) => {
      image.loading = "eager";
    });
    await Promise.all(images.map((image) => image.decode().catch(() => {})));
  });
  await capture("home-desktop");
  await capture("home-desktop-first-screen", false);
  check(
    "All homepage images load",
    await page.$$eval("img", (images) =>
      images.every((image) => image.complete && image.naturalWidth > 0),
    ),
  );
  await audit("home-desktop");
  for (const [id, link] of [["about", "about"], ["services", "therapy"], ["contact", "contact"]]) {
    await page.$eval(`#${id}`, (element) => window.scrollTo({ top: element.getBoundingClientRect().top + scrollY - 120, behavior: "instant" }));
    await page.waitForFunction((name) => document.querySelector(`[data-testid="nav-${name}"]`)?.getAttribute("aria-current") === "location", {}, link);
    check(`Navigation follows ${id} section`, true);
  }
  const controlsTop = await page.$eval(".testimonial-controls", (el) => el.getBoundingClientRect().top + scrollY);
  await page.click('button[aria-label="Next client reflection"]');
  check(
    "Testimonial next works",
    await page.$eval(".testimonial-count", (element) =>
      element.textContent.includes("2 /"),
    ),
  );
  check("Reflection controls stay in place and retain focus", await page.$eval(".testimonial-controls", (el, top) =>
    Math.abs(el.getBoundingClientRect().top + scrollY - top) < 2 &&
    document.activeElement?.getAttribute("aria-label") === "Next client reflection", controlsTop));
  await page.click('button[aria-label="Previous client reflection"]');
  check(
    "Testimonial previous works",
    await page.$eval(".testimonial-count", (element) =>
      element.textContent.includes("1 /"),
    ),
  );
  await page.click(".faq-trigger");
  check(
    "FAQ opens",
    await page.$eval(
      ".faq-trigger",
      (element) => element.getAttribute("aria-expanded") === "true",
    ),
  );
  await page.click(".faq-trigger");
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    const overflow = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: innerWidth,
      elements: Array.from(document.querySelectorAll("main *"))
        .filter((el) => {
          if (!(el instanceof HTMLElement) || !el.getClientRects().length)
            return false;
          let right = el.getBoundingClientRect().right;
          for (
            let parent = el.parentElement;
            parent && parent.tagName !== "MAIN";
            parent = parent.parentElement
          ) {
            if (
              ["hidden", "clip", "auto", "scroll"].includes(
                getComputedStyle(parent).overflowX,
              )
            )
              right = Math.min(right, parent.getBoundingClientRect().right);
          }
          return right > innerWidth + 1;
        })
        .slice(0, 3)
        .map((el) => el.className),
    }));
    check(
      `Homepage fits ${width}px`,
      overflow.document <= width + 1 && overflow.elements.length === 0,
      JSON.stringify(overflow),
    );
  }
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  await page.evaluate(() => scrollTo(0, 0));
  await settle();
  await capture("home-mobile");
  await capture("home-mobile-first-screen", false);
  await audit("home-mobile");
  await page.click('button[data-testid="button-mobile-menu"]');
  check(
    "Mobile menu opens",
    await page.$eval(
      '[data-testid="button-mobile-menu"]',
      (el) => el.getAttribute("aria-expanded") === "true",
    ),
  );
  await page.setViewport({ width: 375, height: 360, deviceScaleFactor: 1 });
  check("Mobile menu fits short screens and can scroll", await page.$eval(".mobile-menu", (el) =>
    el.getBoundingClientRect().bottom <= innerHeight + 1 && getComputedStyle(el).overflowY === "auto"));
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  await page.keyboard.press("Escape");
  check(
    "Escape closes menu and restores focus",
    await page.$eval(
      '[data-testid="button-mobile-menu"]',
      (el) =>
        el.getAttribute("aria-expanded") === "false" &&
        document.activeElement === el,
    ),
  );
  const inPerson = await page.$$(".finder-option");
  await inPerson[1].click();
  check(
    "Session selector chooses in-person booking",
    await page.$eval(
      ".finder-result .action-button",
      (a) => a.getAttribute("href") === "/book?service=offline-therapy",
    ),
  );
  check(
    "Session selector updates fee",
    await page.$eval(".finder-result-bottom strong", (el) =>
      el.textContent.includes("2,000"),
    ),
  );
  await page.$eval(".contact-form form", (form) => form.requestSubmit());
  await page.waitForSelector('[aria-invalid="true"]');
  check(
    "Empty contact form shows validation",
    (await page.$$('[aria-invalid="true"]')).length === 4,
  );
  await page.type('input[name="name"]', "Website Test");
  await page.type('input[name="email"]', "test@example.com");
  await page.type('input[name="phone"]', "9999999999");
  await page.type(
    'textarea[name="message"]',
    "A simulated enquiry for interface verification only.",
  );
  contactMode = "error";
  await page.$eval(".contact-form form", (form) => form.requestSubmit());
  await page.waitForSelector(".form-error");
  check(
    "Failed enquiry keeps message",
    await page.$eval('textarea[name="message"]', (el) =>
      el.value.includes("simulated enquiry"),
    ),
  );
  contactMode = "success";
  await page.$eval(".contact-form form", (form) => form.requestSubmit());
  await page.waitForFunction(() =>
    document.querySelector(".form-result")?.textContent.includes("received"),
  );
  check(
    "Successful enquiry confirms receipt and resets",
    await page.$eval('textarea[name="message"]', (el) => el.value === ""),
  );
  await page.goto(`${origin}/workshops`, { waitUntil: "networkidle2" });
  await settle();
  check(
    "Workshop enquiry has correct context",
    await page.$eval(".workshop-hero-bottom a", (a) =>
      decodeURIComponent(a.href).includes("workshop"),
    ),
  );
  check(
    "Supplied workshop photographs load",
    await page.$$eval(".workshop-photo img", async (images) => {
      images.forEach((image) => {
        image.loading = "eager";
      });
      await Promise.all(images.map((image) => image.decode().catch(() => {})));
      return (
        images.length > 0 &&
        images.every((image) => image.complete && image.naturalWidth > 0)
      );
    }),
  );
  check(
    "Workshops fits mobile",
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await capture("workshops-mobile");
  check(
    "Workshops logo loads",
    await page.$eval(
      ".brand-link img",
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  await audit("workshops-mobile");
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await settle();
  await capture("workshops-desktop");
  await page.goto(`${origin}/book?service=offline-therapy`, {
    waitUntil: "domcontentloaded",
  });
  await page.waitForSelector(".booking-page");
  await settle();
  check(
    "Service links preserve selection in booking",
    await page.$eval('.booking-page button[aria-pressed="true"]', (el) =>
      el.textContent.includes("Offline"),
    ),
  );
  await page.evaluate(() =>
    window.postMessage(
      { event: "calendly.event_scheduled" },
      window.location.origin,
    ),
  );
  check(
    "Untrusted messages cannot advance booking",
    await page.evaluate(() =>
      document.body.textContent.includes("Step 1 of 2"),
    ),
  );
  await page.waitForSelector(".calendar-fallback");
  check(
    "Blocked calendar offers recovery",
    await page.$eval(".calendar-fallback a", (a) =>
      a.href.startsWith("https://wa.me/"),
    ),
  );
  await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 1 });
  await settle();
  check(
    "Booking fits mobile",
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await capture("booking-mobile");
  await audit("booking-mobile");
  calendarMode = "stub";
  await page.reload({ waitUntil: "networkidle2" });
  await page.waitForSelector(".calendar-frame.is-ready");
  check(
    "Calendar load replaces loading state",
    (await page.$(".calendar-status")) === null,
  );
  const calendarFrame = page
    .frames()
    .find((frame) => frame.url().includes("qa-ui-test"));
  await calendarFrame.evaluate(() =>
    parent.postMessage({ event: "calendly.event_scheduled" }, "*"),
  );
  await page.waitForFunction(() =>
    document.body.textContent.includes("Step 2 of 2"),
  );
  check(
    "Trusted calendar event opens payment details",
    await page.evaluate(() =>
      document.body.textContent.includes("Step 2 of 2"),
    ),
  );
  const noJs = await browser.newPage();
  await noJs.setJavaScriptEnabled(false);
  await noJs.goto(origin, { waitUntil: "networkidle2" });
  check(
    "Homepage remains readable without JavaScript",
    await noJs.$eval("h1", (h1) => h1.textContent.includes("home to")),
  );
  await noJs.close();
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto(origin, { waitUntil: "networkidle2" });
  await settle();
  check(
    "Reduced motion disables portrait animation",
    await page.$eval(
      ".profile-image",
      (el) => parseFloat(getComputedStyle(el).animationDuration) < 0.001,
    ),
  );
  check(
    "Reduced motion keeps content readable",
    await page.$eval("h1", (el) => getComputedStyle(el).opacity === "1"),
  );
  await page.$eval('.finder-option:nth-child(2)', (el) => el.click());
  await page.$eval('button[aria-label="Next client reflection"]', (el) => el.click());
  await page.waitForFunction(() => document.querySelector('.testimonial-count')?.textContent.includes('2 /'));
  check("Reduced motion disables selection and reflection movement", await page.evaluate(() =>
    ['.finder-result', '.testimonial-stage [aria-live]'].every((selector) => document.querySelector(selector).getAnimations().length === 0)));
  check(
    "No hydration or runtime errors",
    report.errors.length === 0,
    report.errors.join("; "),
  );
} catch (error) {
  report.errors.push(error.stack);
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
await writeFile(
  path.join(output, "report.json"),
  JSON.stringify(report, null, 2),
);
const failed = report.checks.filter((item) => !item.passed);
const violations = report.accessibility.flatMap((item) =>
  item.violations.map((violation) => ({ page: item.page, ...violation })),
);
console.log(
  JSON.stringify(
    {
      passed: report.checks.length - failed.length,
      total: report.checks.length,
      failed,
      accessibilityViolations: violations,
      errors: report.errors,
      output,
    },
    null,
    2,
  ),
);
if (failed.length || violations.length || report.errors.length)
  process.exitCode = 1;
