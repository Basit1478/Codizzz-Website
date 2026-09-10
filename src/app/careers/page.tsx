import type { Metadata } from "next";
import Link from "next/link";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowIcon } from "@/components/StudioIcons";
import { careerRoles, getCareerRole } from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: "Apply for a three-month internship in mobile app development, n8n AI Automation or Python and FastAPI backend development at Codizzz.",
};

export default function CareersPage({ searchParams }: { searchParams?: { role?: string } }) {
  const selectedRole = getCareerRole(searchParams?.role);

  return (
    <main>
      <Navbar />
      <section className="careers-hero" aria-labelledby="careers-title">
        <div>
          <h1 id="careers-title">Build the work that builds you.</h1>
          <p>Three-month unpaid internships for people ready to learn through real digital product work.</p>
        </div>
        <dl aria-label="Internship details">
          <div><dt>Format</dt><dd>Internship</dd></div>
          <div><dt>Duration</dt><dd>3 months</dd></div>
          <div><dt>Compensation</dt><dd>Unpaid</dd></div>
        </dl>
      </section>

      <section className="career-openings section-shell" aria-labelledby="open-roles-title" data-reveal>
        <h2 id="open-roles-title">Open roles.</h2>
        <div className="career-list">
          {careerRoles.map((role) => (
            <article key={role.slug} id={role.slug}>
              <div className="career-list__role">
                <h3>{role.title}</h3>
                <span>{role.focus}</span>
              </div>
              <p>{role.description}</p>
              <Link className="button button--compact" href={`/careers?role=${role.slug}#apply`}>
                Apply <ArrowIcon />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="career-note section-shell" data-reveal>
        <h2>What to expect.</h2>
        <div>
          <p>This is a learning-focused, three-month unpaid internship. Your CV should show what you have practised; the form asks why the role fits where you want to grow.</p>
          <p>Every application is reviewed by the Codizzz team. Shortlisted applicants are contacted directly at the email address they provide.</p>
        </div>
      </section>

      {selectedRole ? (
        <section className="career-apply section-shell" id="apply" aria-labelledby="apply-title">
          <CareerApplicationForm key={selectedRole.slug} initialRole={selectedRole.slug} />
        </section>
      ) : (
        <section className="career-prompt section-shell" id="apply" aria-labelledby="apply-prompt-title" data-reveal>
          <h2 id="apply-prompt-title">Choose a role to begin.</h2>
          <p>Select one of the open internships above. The application form will open here with your role already selected.</p>
        </section>
      )}
      <Footer />
    </main>
  );
}
