import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir(".impeccable/live", { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});

await page.goto("http://127.0.0.1:57514/", { waitUntil: "networkidle" });
const ribbon = page.locator(".services-ribbon");
await ribbon.scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const track = page.locator(".services-ribbon__track");
const transformBefore = await track.evaluate((element) => getComputedStyle(element).transform);
await page.waitForTimeout(700);
const transformAfter = await track.evaluate((element) => getComputedStyle(element).transform);

await ribbon.hover();
await page.waitForTimeout(150);
const pausedState = await track.evaluate((element) => getComputedStyle(element).animationPlayState);
const pausedBefore = await track.evaluate((element) => getComputedStyle(element).transform);
await page.waitForTimeout(500);
const pausedAfter = await track.evaluate((element) => getComputedStyle(element).transform);
await ribbon.screenshot({ path: ".impeccable/live/services-marquee.png" });

const reducedPage = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
await reducedPage.goto("http://127.0.0.1:57514/", { waitUntil: "networkidle" });
const reducedAnimation = await reducedPage.locator(".services-ribbon__track").evaluate((element) => getComputedStyle(element).animationName);
const duplicateDisplay = await reducedPage.locator(".services-ribbon__group--duplicate").evaluate((element) => getComputedStyle(element).display);

console.log(JSON.stringify({
  movesWhenVisible: transformBefore !== transformAfter,
  pausedState,
  staysStillOnHover: pausedBefore === pausedAfter,
  reducedAnimation,
  duplicateDisplay,
  desktopOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
  mobileOverflow: await reducedPage.evaluate(() => document.documentElement.scrollWidth > innerWidth),
  errors,
}, null, 2));

await browser.close();
