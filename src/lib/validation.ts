import { z } from "zod";

export const MAX_CV_BYTES = 3 * 1024 * 1024;
export const allowedCvTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
export const allowedCvExtensions = new Set(["pdf", "doc", "docx"]);

const requiredText = (label: string, max: number) => z.string()
  .trim()
  .min(1, `${label} is required.`)
  .max(max, `${label} is too long.`);

export const contactFormSchema = z.object({
  name: requiredText("Name", 120).min(2, "Enter your full name."),
  email: requiredText("Email", 254).email("Enter a valid email address."),
  company: z.string().trim().max(160, "Company name is too long.").default(""),
  service: requiredText("Service", 100),
  message: requiredText("Message", 5000).min(10, "Tell us a little more about what you need."),
});

export const careerApplicationSchema = z.object({
  role: requiredText("Role", 120),
  name: requiredText("Full name", 120).min(2, "Enter your full name."),
  email: requiredText("Email", 254).email("Enter a valid email address."),
  phone: requiredText("Phone number", 40).min(7, "Enter a valid phone number."),
  city: requiredText("City", 100).min(2, "Enter your city."),
  profile: requiredText("LinkedIn or portfolio", 500).refine((value) => {
    try {
      return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
      return false;
    }
  }, "Enter a valid LinkedIn or portfolio URL."),
  motivation: requiredText("Why Codizzz", 2500).min(20, "Tell us briefly why this internship fits you."),
  cv: z.custom<File>((value) => value instanceof File && value.size > 0, "Attach your CV.")
    .refine((file) => allowedCvExtensions.has(file.name.split(".").pop()?.toLowerCase() ?? ""), "Upload your CV as a PDF, DOC or DOCX file.")
    .refine((file) => !file.type || allowedCvTypes.has(file.type), "Upload your CV as a PDF, DOC or DOCX file.")
    .refine((file) => file.size <= MAX_CV_BYTES, "Your CV must be smaller than 3 MB."),
});

export function firstValidationError(error: z.ZodError) {
  return error.issues[0]?.message ?? "Check the form and try again.";
}
