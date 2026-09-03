import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const output = ".impeccable/live";
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const cases = [
  { name: "home-light-desktop", theme: "light", width: 1440, height: 900 },
  { name: "home-dark-desktop", theme: "dark", width: 1440, height: 900 },
  { name: "home-light-mobile", theme: "light", width: 390, height: 844 },
];

const report = [];

for (const item of cases) {
  const page = await browser.newPage({ viewport: { width: item.width, height: item.height } });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript((theme) => localStorage.setItem("codizzz-theme", theme), item.theme);
  await page.goto("http://127.0.0.1:57514/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `${output}/${item.name}.png`, fullPage: true });
  const initialTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  await page.locator(".hero-node").first().focus();
  await page.waitForTimeout(300);
  const focusedReadoutOpacity = await page.locator(".hero-node").first().locator(".hero-node__readout").evaluate((element) => getComputedStyle(element).opacity);
  await page.evaluate(() => window.scrollTo(0, 240));
  await page.waitForTimeout(250);
  const headerScrolled = await page.locator(".site-header").evaluate((element) => element.classList.contains("is-scrolled"));
  await page.locator(".theme-button").click();
  const toggledTheme = await page.evaluate(() => document.documentElement.dataset.theme);
  report.push({
    name: item.name,
    title: await page.title(),
    viewport: item.width,
    documentWidth: await page.evaluate(() => document.documentElement.scrollWidth),
    theme: initialTheme,
    focusedReadoutOpacity,
    headerScrolled,
    toggledTheme,
    errors,
  });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(report, null, 2));
