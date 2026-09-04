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
  const widget = page.locator(".whatsapp-widget");
  const widgetVisible = await widget.isVisible();
  const widgetHref = await widget.getAttribute("href");

  await page.goto("http://127.0.0.1:57514/contact", { waitUntil: "networkidle" });
  const deliveryText = await page.locator(".contact-form__delivery").innerText();
  const directWhatsAppVisible = await page.getByRole("link", { name: /WhatsApp/ }).first().isVisible();
  await page.screenshot({ path: `.impeccable/live/contact-${viewport.name}.png`, fullPage: true });

  report.push({
    viewport: viewport.name,
    startBuildCount,
    widgetVisible,
    widgetHref,
    deliveryText,
    directWhatsAppVisible,
    documentWidth: await page.evaluate(() => document.documentElement.scrollWidth),
    viewportWidth: viewport.width,
    errors,
  });
  await page.close();
}

const api = await fetch("http://127.0.0.1:57514/api/contact", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ name: "", email: "invalid", service: "Invalid", message: "" }),
});
report.push({ invalidSubmissionStatus: api.status, invalidSubmissionBody: await api.json() });

await browser.close();
console.log(JSON.stringify(report, null, 2));
