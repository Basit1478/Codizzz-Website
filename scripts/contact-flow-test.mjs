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

  await page.goto("http://127.0.0.1:57514/", { waitUntil: "networkidle" });
  const startBuildCount = await page.getByText("Start a build", { exact: true }).count();
  const bookCallButton = page.getByRole("link", { name: "Book a call" });
  const bookCallVisible = await bookCallButton.isVisible();
  const bookCallHref = await bookCallButton.getAttribute("href");
  const widget = page.locator(".whatsapp-widget");
  const widgetVisible = await widget.isVisible();
  const widgetHref = await widget.getAttribute("href");

  await page.goto("http://127.0.0.1:57514/contact", { waitUntil: "networkidle" });
  const deliveryText = await page.locator(".contact-form__delivery").innerText();
  const directWhatsAppVisible = await page.getByRole("link", { name: /WhatsApp/ }).first().isVisible();
  const calFrame = page.locator('.booking-calendar iframe[title="Book a call"]');
  await calFrame.waitFor({ state: "attached", timeout: 30000 });
  const calInline = page.locator(".booking-calendar cal-inline");
  await calInline.waitFor({ state: "attached", timeout: 30000 });
  await page.waitForFunction(() => {
    const embed = document.querySelector(".booking-calendar cal-inline");
    return embed?.getAttribute("loading") === "done" || embed?.getAttribute("loading") === "failed";
  }, undefined, { timeout: 45000 });
  const calLoadingState = await calInline.getAttribute("loading");
  await page.waitForTimeout(5000);
  const calFrameSrc = await calFrame.getAttribute("src");
  const calContentFrame = page.frames().find((frame) => frame.url().includes("team-codizzz/30min"));
  const calFrameText = calContentFrame ? (await calContentFrame.locator("body").innerText()).replace(/\s+/g, " ").trim().slice(0, 240) : "";
  const calFrameMetrics = await calFrame.evaluate((frame) => {
    const style = getComputedStyle(frame);
    const rect = frame.getBoundingClientRect();
    return { width: Math.round(rect.width), height: Math.round(rect.height), visibility: style.visibility, opacity: style.opacity };
  });
  await calFrame.screenshot({ path: `.impeccable/live/cal-${viewport.name}.png` });
  await page.screenshot({ path: `.impeccable/live/contact-${viewport.name}.png`, fullPage: true });

  await page.route("**/api/contact", (route) => route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ success: true, retryAfter: 300 }),
  }));
  await page.getByLabel("Your name").fill("Test User");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("What kind of build?").selectOption("AI Agents");
  await page.getByLabel("What needs to change?").fill("We need a reliable workflow for incoming requests.");
  await page.getByRole("button", { name: /Send requirement/ }).click();
  const dialog = page.getByRole("dialog", { name: "Requirement received." });
  await dialog.waitFor({ state: "visible" });
  const successDialogVisible = await dialog.isVisible();
  const cooldownButtonDisabled = await page.locator(".contact-form > button").isDisabled();
  const cooldownButtonText = await page.locator(".contact-form > button").innerText();
  const storedCooldown = await page.evaluate(() => Number(localStorage.getItem("codizzz-contact-cooldown-until")) > Date.now());
  const focusedControl = await page.evaluate(() => document.activeElement?.textContent?.trim() ?? "");
  await page.screenshot({ path: `.impeccable/live/contact-success-${viewport.name}.png`, fullPage: true });
  await page.getByRole("button", { name: "Done" }).click();
  await page.reload({ waitUntil: "networkidle" });
  const persistedCooldown = await page.locator(".contact-form > button").isDisabled();

  report.push({
    viewport: viewport.name,
    startBuildCount,
    bookCallVisible,
    bookCallHref,
    widgetVisible,
    widgetHref,
    deliveryText,
    directWhatsAppVisible,
    calFrameAttached: await calFrame.count() === 1,
    calLoadingState,
    calFrameSrc,
    calFrameText,
    calFrameMetrics,
    successDialogVisible,
    cooldownButtonDisabled,
    cooldownButtonText,
    storedCooldown,
    focusedControl,
    persistedCooldown,
    documentWidth: await page.evaluate(() => document.documentElement.scrollWidth),
    viewportWidth: viewport.width,
    errors,
  });
  await page.close();
}

const darkPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await darkPage.addInitScript(() => localStorage.setItem("codizzz-theme", "dark"));
await darkPage.goto("http://127.0.0.1:57514/contact", { waitUntil: "networkidle" });
const darkCalFrame = darkPage.locator('.booking-calendar iframe[title="Book a call"]');
await darkCalFrame.waitFor({ state: "attached", timeout: 30000 });
report.push({ darkTheme: await darkPage.evaluate(() => document.documentElement.dataset.theme), darkCalFrameSrc: await darkCalFrame.getAttribute("src") });
await darkPage.close();

const compactPage = await browser.newPage({ viewport: { width: 320, height: 740 } });
await compactPage.goto("http://127.0.0.1:57514/", { waitUntil: "networkidle" });
const compactButton = compactPage.getByRole("link", { name: "Book a call" });
report.push({
  compactButtonVisible: await compactButton.isVisible(),
  compactButtonWidth: Math.round((await compactButton.boundingBox())?.width ?? 0),
  compactDocumentWidth: await compactPage.evaluate(() => document.documentElement.scrollWidth),
});
await compactPage.close();

const api = await fetch("http://127.0.0.1:57514/api/contact", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name: "", email: "invalid", service: "Invalid", message: "" }),
});
report.push({ invalidSubmissionStatus: api.status, invalidSubmissionBody: await api.json() });

const cooldownApi = await fetch("http://127.0.0.1:57514/api/contact", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    cookie: `codizzz_contact_cooldown=${Date.now() + 300000}`,
  },
  body: JSON.stringify({ name: "Test User", email: "test@example.com", service: "AI Agents", message: "Test requirement" }),
});
const cooldownText = await cooldownApi.text();
let cooldownBody;
try { cooldownBody = JSON.parse(cooldownText); } catch { cooldownBody = cooldownText.slice(0, 120); }
report.push({ cooldownStatus: cooldownApi.status, cooldownBody, retryAfter: cooldownApi.headers.get("retry-after") });

await browser.close();
console.log(JSON.stringify(report, null, 2));
