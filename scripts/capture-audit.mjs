import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const baseUrl = process.env.AUDIT_URL ?? "http://127.0.0.1:3000";
const outputDir = process.argv[2] ?? ".impeccable/review/before";

const breakpoints = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const routes = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "projects", path: "/projects" },
  { name: "product", path: "/product" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
];

await mkdir(outputDir, { recursive: true });
const installedChromium = path.join(
  process.env.LOCALAPPDATA ?? "",
  "ms-playwright",
  "chromium-1234",
  "chrome-win64",
  "chrome.exe",
);
const browser = await chromium.launch(
  existsSync(installedChromium) ? { executablePath: installedChromium } : {},
);

try {
  for (const viewport of breakpoints) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce",
    });

    for (const route of routes) {
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: "networkidle" });
      const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < pageHeight; y += Math.round(viewport.height * 0.75)) {
        await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
        await page.waitForTimeout(80);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(120);
      await page.screenshot({
        path: path.join(outputDir, `${route.name}-${viewport.name}.png`),
        fullPage: true,
      });
    }

    await page.close();
  }
} finally {
  await browser.close();
}
