"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { careerRoles, type CareerRoleSlug } from "@/data/careers";
import { ArrowIcon } from "./StudioIcons";

type Props = { initialRole: CareerRoleSlug };

export default function CareerApplicationForm({ initialRole }: Props) {
  const [selectedRole, setSelectedRole] = useState<CareerRoleSlug>(initialRole);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const [fileName, setFileName] = useState("No file selected");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedRoleTitle = careerRoles.find((role) => role.slug === selectedRole)?.title ?? "this role";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (successOpen && !dialog.open) dialog.showModal();
    if (!successOpen && dialog.open) dialog.close();
  }, [successOpen]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("loading");
    setErrorMessage("");
    try {
      const response = await fetch("/api/careers/apply", { method: "POST", body: new FormData(form) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof result.error === "string" ? result.error : "Application could not be sent.");
      form.reset();
      setFileName("No file selected");
      setState("idle");
      setSuccessOpen(true);
    } catch (error) {
      setState("error");
      setErrorMessage(error instanceof TypeError
        ? "Connection interrupted. Your application was not sent."
        : error instanceof Error ? error.message : "Application could not be sent.");
    }
  }

  return (
    <>
      <div className="career-apply__intro" data-reveal>
        <h2 id="apply-title">Apply for {selectedRoleTitle}.</h2>
        <p>Complete every field and attach your CV.</p>
        <Link className="text-link" href="/careers">Choose another role <ArrowIcon /></Link>
      </div>
      <form className="career-form contact-form" onSubmit={submit}>
        <fieldset disabled={state === "loading"}>
          <label>
            <span>Role</span>
            <select name="role" value={selectedRole} onChange={(event) => setSelectedRole(event.target.value as CareerRoleSlug)} required>
              {careerRoles.map((role) => <option key={role.slug} value={role.slug}>{role.title}</option>)}
            </select>
          </label>
          <div className="career-form__pair">
            <label><span>Full name</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Your full name" /></label>
            <label><span>Email address</span><input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" /></label>
          </div>
          <div className="career-form__pair">
            <label><span>Phone number</span><input name="phone" type="tel" autoComplete="tel" required maxLength={40} placeholder="+92 300 0000000" /></label>
            <label><span>City</span><input name="city" autoComplete="address-level2" required maxLength={100} placeholder="Your city" /></label>
          </div>
          <label><span>LinkedIn or portfolio</span><input name="profile" type="url" inputMode="url" required maxLength={500} placeholder="https://" /></label>
          <label><span>Why Codizzz?</span><textarea name="motivation" required maxLength={2500} rows={4} placeholder="Why does this three-month internship fit what you want to learn and contribute?" /></label>
          <label className="career-file">
            <span>CV <small>PDF, DOC or DOCX · max 3 MB</small></span>
            <input
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              required
              onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "No file selected")}
            />
            <span className="career-file__control"><b>Choose CV</b><em>{fileName}</em></span>
          </label>
        </fieldset>
        {state === "error" && <p className="form-error" role="alert">{errorMessage} Try again or email <a href="mailto:teamcodizzz@gmail.com">teamcodizzz@gmail.com</a>.</p>}
        <button className="button button--solid" disabled={state === "loading"}>
          {state === "loading" ? "Sending application…" : <>Submit application <ArrowIcon /></>}
        </button>
        <p className="contact-form__delivery">Your details and CV are sent to Codizzz only for recruitment review.</p>
      </form>

      <dialog ref={dialogRef} className="success-dialog" onClose={() => setSuccessOpen(false)} aria-labelledby="career-success-title">
        <div className="success-dialog__mark" aria-hidden="true"><svg viewBox="0 0 32 32"><path d="m8 16.5 5.2 5L24 10.8" /></svg></div>
        <h2 id="career-success-title">Application received.</h2>
        <p>Your application and CV have been sent to Codizzz. If you are shortlisted, the team will contact you by email.</p>
        <button className="button button--solid" type="button" onClick={() => setSuccessOpen(false)}>Done</button>
      </dialog>
    </>
  );
}
