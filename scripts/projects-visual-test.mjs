import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir(".impeccable/live", { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = [];

for (const viewport of [{ name: "desktop", width: 1440, height: 900 }, { name: "mobile", width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("http://127.0.0.1:57514/work", { waitUntil: "networkidle" });
  const cards = page.locator(".work-card");
  for (let index = 0; index < await cards.count(); index += 1) {
    await cards.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `.impeccable/live/work-${viewport.name}.png`, fullPage: true });
  const images = page.locator(".work-card__media img");
  report.push({
    viewport: viewport.name,
    projectCount: await page.locator(".work-card").count(),
    imageCount: await images.count(),
    loadedImages: await images.evaluateAll((items) => items.filter((item) => item.complete && item.naturalWidth > 0).length),
    documentWidth: await page.evaluate(() => document.documentElement.scrollWidth),
    viewportWidth: viewport.width,
    errors,
  });
  await page.close();
}

const routes = await browser.newPage();
await routes.goto("http://127.0.0.1:57514/projects", { waitUntil: "networkidle" });
const projectsRedirect = new URL(routes.url()).pathname;
await routes.goto("http://127.0.0.1:57514/about", { waitUntil: "networkidle" });
const aboutRedirect = new URL(routes.url()).pathname;
await routes.goto("http://127.0.0.1:57514/", { waitUntil: "networkidle" });
const navLinks = await routes.locator(".site-nav a").evaluateAll((links) => links.map((link) => link.getAttribute("href")));
report.push({ projectsRedirect, aboutRedirect, navLinks });
await routes.close();

await browser.close();
console.log(JSON.stringify(report, null, 2));
