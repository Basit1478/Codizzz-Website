import Image from "next/image";
import type { TeamMember } from "@/types/content";
import { ArrowIcon } from "./StudioIcons";
import MagneticLink from "./MagneticLink";

export function StudioProcess() {
  const steps = [
    { title: "Understand the need", copy: "We map the friction, people, tools and decisions around the work before proposing a solution." },
    { title: "Shape the right system", copy: "We define the smallest useful product and choose the technology that fits the outcome." },
    { title: "Build in visible passes", copy: "You see working progress, give context and help steer the product while it is being made." },
    { title: "Deliver for real use", copy: "We launch with practical handover, clear operating knowledge and room for the product to evolve." },
  ];
  return (
    <section className="process section-shell" data-reveal>
      <div className="section-heading">
        <h2>From business need to working product.</h2>
        <p>A collaborative build process with no black box between your requirement and the delivered system.</p>
      </div>
      <ol className="process-list">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span>[{String(index + 1).padStart(2, "0")}]</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function FounderSection() {
  return (
    <section className="founder section-shell" data-reveal>
      <div className="founder__portrait">
        <Image src="/brand/founder-linkedin.jpg" alt="Basit Ali Baloch, CEO and Founder of Codizzz" width={400} height={400} sizes="(max-width: 760px) 100vw, 38vw" />
        <span>Verified public LinkedIn portrait</span>
      </div>
      <div className="founder__copy">
        <h2>Technology should feel clear, useful and worth caring about.</h2>
        <p>
          Basit Ali Baloch is the CEO and Founder of Codizzz. His work brings AI,
          software engineering and product design together around practical business needs.
        </p>
        <div className="action-row">
          <a className="text-link" href="https://www.linkedin.com/in/basit-ali-baloch-738285253/" target="_blank" rel="noreferrer">
            View Basit on LinkedIn <ArrowIcon />
          </a>
          <a className="text-link" href="https://x.com/basitali2405" target="_blank" rel="noreferrer">
            Follow Basit on X <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

export function TeamSection({ members }: { members: TeamMember[] }) {
  return (
    <section className="team section-shell" data-reveal>
      <div className="team__heading">
        <h2>The people shaping the work.</h2>
        <p>AI engineering, software development and product thinking brought together around each build.</p>
      </div>
      <div className="team__list">
        {members.map((member) => (
          <article className="team-member" key={member.id}>
            <div className="team-member__portrait">
              <Image
                src={member.image || "/brand/codizzz-mark-orange.png"}
                alt={`${member.name}, ${member.role} at Codizzz`}
                fill
                sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1100px) 160px, 14vw"
              />
            </div>
            <div className="team-member__identity">
              <h3>{member.name}</h3>
              <span>{member.role}</span>
            </div>
            <p>{member.summary}</p>
            <ul aria-label={`${member.name} skills`}>
              {member.skills.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
            <div className="team-member__links">
              {member.linkedinUrl && <a className="text-link" href={member.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a>}
              {member.xUrl && <a className="text-link" href={member.xUrl} target="_blank" rel="noreferrer">X <ArrowIcon /></a>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function StudioCta() {
  return (
    <section className="studio-cta section-shell" data-reveal>
      <h2>Bring us the need.<br />We will shape the build.</h2>
      <MagneticLink className="button--solid" href="/contact" label="Start a conversation" />
    </section>
  );
}

export function InteriorHero({ title, body }: { title: string; body: string }) {
  return (
    <section className="interior-hero">
      <h1>{title}</h1>
      <p>{body}</p>
      <div className="interior-hero__line" aria-hidden="true"><span /></div>
    </section>
  );
}
