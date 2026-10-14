import { createServer } from "vite";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getSeoTags } from "../shared/seo";

// Ship the same public content to every visitor, including crawlers without JS.
export async function prerender() {
  const output = path.resolve("dist/public");
  const template = await readFile(path.join(output, "index.html"), "utf8");
  const marker = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;
  if (!marker.test(template)) throw new Error("SEO template markers missing");
  const vite = await createServer({
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
    logLevel: "error",
  });
  try {
    const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
    for (const route of [
      "/",
      "/workshops",
      "/book",
      "/payment",
      "/atmospheric",
    ]) {
      const content =
        route === "/" || route === "/workshops" ? render(route) : "";
      const html = template
        .replace(marker, getSeoTags(route))
        .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
      const dir = route === "/" ? output : path.join(output, route.slice(1));
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, "index.html"), html);
      console.log(
        `Prerendered ${route}${content ? " with full content" : " with route metadata"}`,
      );
    }
    await writeFile(
      path.join(output, "404.html"),
      template.replace(marker, getSeoTags("/404")),
    );
  } finally {
    await vite.close();
  }
}
