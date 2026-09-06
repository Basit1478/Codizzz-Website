import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

await mkdir(".impeccable/review", { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = [];

for (const viewport of [{ name: "desktop", width: 1440, height: 900 }, { name: "mobile", width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

  await page.goto("http://127.0.0.1:57514/careers", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.locator(".career-list").waitFor({ state: "visible" });
  const roleCount = await page.locator(".career-list article").count();
  const formInitiallyAbsent = await page.locator(".career-form").count() === 0;
  const hasInternshipTerms = await page.getByText("3 months", { exact: true }).isVisible()
    && await page.getByText("Unpaid", { exact: true }).isVisible();

  await page.locator("#backend-developer").getByRole("link", { name: "Apply" }).click();
  await page.waitForURL("**/careers?role=backend-developer#apply");
  await page.locator('select[name="role"]').selectOption("mobile-app-developer");
  const updatedApplyHeading = await page.getByRole("heading", { name: "Apply for Mobile App Developer." }).isVisible();
  await page.getByLabel("Full name").fill("Test Applicant");
  await page.getByLabel("Email address").fill("applicant@example.com");
  await page.getByLabel("Phone number").fill("+92 300 0000000");
  await page.getByLabel("City").fill("Karachi");
  const profileRequired = await page.getByLabel("LinkedIn or portfolio").evaluate((input) => input.required);
  await page.getByLabel("LinkedIn or portfolio").fill("https://linkedin.com/in/test-applicant");
  await page.getByLabel("Why Codizzz?").fill("I want to learn through real product delivery and contribute dependable backend work.");
  await page.getByLabel("CV").setInputFiles({ name: "test-cv.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4 test resume") });
  await page.screenshot({ path: `.impeccable/review/careers-${viewport.name}.png`, fullPage: true });

  let multipartSubmission = false;
  await page.route("**/api/careers/apply", async (route) => {
    multipartSubmission = route.request().headers()["content-type"]?.startsWith("multipart/form-data") ?? false;
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
  });
  await page.getByRole("button", { name: "Submit application" }).click();
  const dialog = page.getByRole("dialog", { name: "Application received." });
  await dialog.waitFor({ state: "visible" });
  await page.screenshot({ path: `.impeccable/review/careers-success-${viewport.name}.png`, fullPage: true });

  report.push({
    viewport: viewport.name,
    roleCount,
    formInitiallyAbsent,
    hasInternshipTerms,
    selectedRole: await page.locator('select[name="role"]').inputValue(),
    updatedApplyHeading,
    profileRequired,
    multipartSubmission,
    successDialogVisible: await dialog.isVisible(),
    lenisActive: await page.evaluate(() => document.documentElement.classList.contains("lenis")),
    documentWidth: await page.evaluate(() => document.documentElement.scrollWidth),
    viewportWidth: viewport.width,
    errors,
  });
  await page.close();
}

const invalidData = new FormData();
const invalidResponse = await fetch("http://127.0.0.1:57514/api/careers/apply", { method: "POST", body: invalidData });
report.push({ invalidStatus: invalidResponse.status, invalidBody: await invalidResponse.json() });

const missingProfileData = new FormData();
missingProfileData.set("role", "backend-developer");
missingProfileData.set("name", "Test Applicant");
missingProfileData.set("email", "applicant@example.com");
missingProfileData.set("phone", "+92 300 0000000");
missingProfileData.set("city", "Karachi");
missingProfileData.set("motivation", "Learning through delivery");
missingProfileData.set("cv", new File(["%PDF-1.4 test resume"], "resume.pdf", { type: "application/pdf" }));
const missingProfileResponse = await fetch("http://127.0.0.1:57514/api/careers/apply", { method: "POST", body: missingProfileData });
report.push({ missingProfileStatus: missingProfileResponse.status, missingProfileBody: await missingProfileResponse.json() });

const invalidFileData = new FormData();
invalidFileData.set("role", "backend-developer");
invalidFileData.set("name", "Test Applicant");
invalidFileData.set("email", "applicant@example.com");
invalidFileData.set("phone", "+92 300 0000000");
invalidFileData.set("city", "Karachi");
invalidFileData.set("profile", "https://linkedin.com/in/test-applicant");
invalidFileData.set("motivation", "Learning through delivery");
invalidFileData.set("cv", new File(["not a cv"], "resume.txt", { type: "text/plain" }));
const invalidFileResponse = await fetch("http://127.0.0.1:57514/api/careers/apply", { method: "POST", body: invalidFileData });
report.push({ invalidFileStatus: invalidFileResponse.status, invalidFileBody: await invalidFileResponse.json() });

await browser.close();
console.log(JSON.stringify(report, null, 2));
