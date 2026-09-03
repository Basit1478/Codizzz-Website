import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ServiceIcon } from "./StudioIcons";

export const services = [
  { type: "agent", title: "AI Agents", short: "Agents that reason, coordinate tools and carry work forward with human oversight." },
  { type: "automation", title: "Automation", short: "Connected workflows that remove repetitive handoffs and manual operations." },
  { type: "fte", title: "Digital FTE", short: "Dedicated digital teammates shaped around a defined operational role." },
  { type: "software", title: "Custom Software", short: "Purpose-built systems designed around your process, data and business logic." },
  { type: "mobile", title: "Mobile App Development", short: "Mobile products designed for the people and context in which they are used." },
  { type: "web", title: "Custom Web Development", short: "Fast, responsive web platforms built around your audience and operation." },
];

export function ServicesRibbon() {
  return (
    <section className="services-ribbon" aria-label="Codizzz services">
      {services.map((service) => (
        <Link href={`/services#${service.type}`} key={service.title}>
          <ServiceIcon type={service.type} />
          <span>{service.title}</span>
        </Link>
      ))}
    </section>
  );
}

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
            <span>{String(index + 1).padStart(2, "0")}</span>
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
        <a className="text-link" href="https://www.linkedin.com/in/basit-ali-baloch-738285253/" target="_blank" rel="noreferrer">
          View Basit on LinkedIn <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

const teamMembers = [
  {
    name: "Umer Ali",
    role: "Co-founder & AI Engineer",
    image: "/brand/team-umer-ali.jpg",
    summary: "Builds agentic products and full-stack experiences with a focus on dependable, practical automation.",
    skills: ["Next.js", "React", "Python", "TypeScript", "AI Agents", "Claude Code"],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/umer-ali-a962252ba/" },
      { label: "X", href: "https://x.com/Umerali_4" },
    ],
  },
  {
    name: "Muhammad Anzal",
    role: "AI Developer",
    image: "/brand/team-muhammad-anzal.jpg",
    summary: "Develops AI systems grounded in Python, retrieval workflows and production-ready model integrations.",
    skills: ["Python", "Claude Code", "RAG"],
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-anzal-035705348/" },
    ],
  },
];

export function TeamSection() {
  return (
    <section className="team section-shell" data-reveal>
      <div className="team__heading">
        <h2>The people shaping the work.</h2>
        <p>AI engineering, software development and product thinking brought together around each build.</p>
      </div>
      <div className="team__list">
        {teamMembers.map((member) => (
          <article className="team-member" key={member.name}>
            <div className="team-member__portrait">
              <Image
                src={member.image}
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
              {member.links.map((link) => (
                <a className="text-link" href={link.href} key={link.label} target="_blank" rel="noreferrer">
                  {link.label} <ArrowIcon />
                </a>
              ))}
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
      <Link className="button button--solid" href="/contact">Start a conversation <ArrowIcon /></Link>
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
