import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const projects = [
  ["acmeem", "https://acmeem.com/"],
  ["blazon360", "https://blazon360agency.com/"],
  ["veyra", "https://veyra-ecommerce-store.vercel.app/"],
  ["velora-restaurant", "https://velora-restaurent.vercel.app/"],
  ["morrow-dental", "https://morrow-dental.vercel.app/"],
  ["karachi-brasserie", "https://karachi-brasseriee.vercel.app/"],
  ["todoapp", "https://todo-app-cc.vercel.app/"],
  ["todo-ai-chatbot", "https://hackathon-ii-phase3.vercel.app/"],
  ["taskmaster-pro", "https://phase2todo.vercel.app/"],
  ["infology", "https://infology.vercel.app/"],
  ["avion", "https://avion-website.vercel.app/"],
];

await mkdir("public/brand/projects", { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = [];

for (const [slug, url] of projects) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    ignoreHTTPSErrors: true,
  });
  const page = await context.newPage();
  try {
    const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForTimeout(9000);
    await page.screenshot({
      path: `public/brand/projects/${slug}.jpg`,
      type: "jpeg",
      quality: 84,
      fullPage: false,
    });
    report.push({
      slug,
      status: response?.status() ?? null,
      title: await page.title(),
      description: await page.locator('meta[name="description"]').getAttribute("content"),
      heading: (await page.locator("h1").first().textContent().catch(() => null))?.trim() ?? null,
    });
  } catch (error) {
    report.push({ slug, error: error instanceof Error ? error.message : String(error) });
  } finally {
    await context.close();
  }
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
