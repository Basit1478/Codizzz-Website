"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, ReactNode, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import BrandMark from "@/components/BrandMark";
import type { CareerRole, ServiceRecord, TeamMember } from "@/types/content";
import { deleteContent, saveCareerRole, saveService, saveTeamMember, signOutAdmin, type AdminActionResult } from "@/app/admin/actions";
import { ArrowIcon } from "@/components/StudioIcons";
import ServiceMark from "@/components/ServiceMark";

type Resource = "services" | "careers" | "team";
type Props = {
  services: ServiceRecord[];
  careers: CareerRole[];
  team: TeamMember[];
  userEmail: string;
  readOnly?: boolean;
};

const labels: Record<Resource, { singular: string; plural: string; add: string }> = {
  services: { singular: "service", plural: "Services", add: "Add service" },
  careers: { singular: "role", plural: "Careers", add: "Add role" },
  team: { singular: "member", plural: "Team", add: "Add member" },
};

function AdminIcon({ type }: { type: Resource | "overview" }) {
  if (type === "overview") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
  if (type === "services") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></svg>;
  if (type === "careers") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" /><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c.4-4.3 2.4-6.5 6-6.5s5.6 2.2 6 6.5M14 14.5c3.9-.5 6.1 1.3 6.5 5.5" /></svg>;
}

function Field({ label, children, wide = false }: { label: string; children: ReactNode; wide?: boolean }) {
  return <label className={wide ? "admin-field admin-field--wide" : "admin-field"}><span>{label}</span>{children}</label>;
}

export default function AdminContentDesk({ services, careers, team, userEmail, readOnly = false }: Props) {
  const router = useRouter();
  const [active, setActive] = useState<Resource | "overview">("overview");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [message, setMessage] = useState<AdminActionResult | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pending, startTransition] = useTransition();

  const collections = { services, careers, team };
  const activeItems = active === "overview" ? [] : collections[active];
  const selected = active === "overview" || !selectedId || selectedId === "new"
    ? null
    : activeItems.find((item) => item.id === selectedId) ?? null;
  const recent = useMemo(() => [
    ...services.map((item) => ({ ...item, resource: "services" as const })),
    ...careers.map((item) => ({ ...item, resource: "careers" as const })),
    ...team.map((item) => ({ ...item, title: item.name, resource: "team" as const })),
  ].sort((a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? "")).slice(0, 8), [services, careers, team]);

  function openResource(resource: Resource, id: string | null = null) {
    setActive(resource);
    setSelectedId(id);
    setMessage(null);
    setConfirmDelete(false);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = active === "services" ? await saveService(form) : active === "careers" ? await saveCareerRole(form) : await saveTeamMember(form);
      setMessage(result);
      if (result.ok) {
        setConfirmDelete(false);
        router.refresh();
      }
    });
  }

  function removeSelected() {
    if (active === "overview" || !selected) return;
    startTransition(async () => {
      const result = await deleteContent(active, selected.id);
      setMessage(result);
      if (result.ok) {
        setSelectedId(null);
        setConfirmDelete(false);
        router.refresh();
      }
    });
  }

  return (
    <div className="admin-shell">
      <aside className="admin-rail">
        <div className="admin-brand"><BrandMark /><small>Admin</small></div>
        <nav aria-label="Admin resources">
          <button className={active === "overview" ? "is-active" : ""} aria-pressed={active === "overview"} onClick={() => { setActive("overview"); setSelectedId(null); }}><AdminIcon type="overview" />Overview</button>
          {(["services", "careers", "team"] as Resource[]).map((resource) => (
            <button className={active === resource ? "is-active" : ""} aria-pressed={active === resource} onClick={() => openResource(resource)} key={resource}><AdminIcon type={resource} />{labels[resource].plural}</button>
          ))}
        </nav>
        <div className="admin-rail__account">
          <span>Signed in as</span><strong>{userEmail}</strong>
          {!readOnly && <button onClick={() => startTransition(async () => { await signOutAdmin(); router.replace("/admin/login"); router.refresh(); })}>Sign out</button>}
        </div>
      </aside>

      <main className="admin-workspace">
        {message && !selectedId && <p className={`admin-form-message admin-form-message--global${message.ok ? " is-success" : " is-error"}`} role={message.ok ? "status" : "alert"}>{message.message}</p>}
        {readOnly && (
          <div className="admin-setup-banner" role="status">
            <strong>Supabase connection required</strong>
            <span>Add <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, run the included migration, and create the admin Auth user to enable editing.</span>
          </div>
        )}

        {active === "overview" ? (
          <>
            <header className="admin-heading">
              <div><h1>Content Control Desk</h1><p>Manage Services, Careers and Team content in one place.</p></div>
              <span className="admin-heading__note">Same ideas.<br />Bigger impact.</span>
            </header>
            <section className="admin-summaries" aria-label="Content summary">
              {(["services", "careers", "team"] as Resource[]).map((resource) => (
                <article key={resource}>
                  <div className="admin-summary__title"><AdminIcon type={resource} /><h2>{labels[resource].plural}</h2></div>
                  <div className="admin-summary__meta"><strong>{String(collections[resource].length).padStart(2, "0")}</strong><span>Total<br />{resource === "careers" ? "roles" : resource === "team" ? "members" : "services"}</span></div>
                  <button onClick={() => openResource(resource, "new")} disabled={readOnly}>{labels[resource].add}<ArrowIcon /></button>
                </article>
              ))}
            </section>
            <section className="admin-recent">
              <div className="admin-section-heading"><h2>Recent content</h2><span>{recent.length} records shown</span></div>
              <div className="admin-table-wrap">
                <table><thead><tr><th>Title</th><th>Type</th><th>Status</th><th>Updated</th><th aria-label="Action" /></tr></thead>
                  <tbody>{recent.map((item) => <tr key={`${item.resource}-${item.id}`}><td>{item.title}</td><td>{labels[item.resource].singular}</td><td><span className={`admin-status${item.published ? " is-live" : ""}`}>{item.published ? "Published" : "Draft"}</span></td><td>{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Seed content"}</td><td><button onClick={() => openResource(item.resource, item.id)}>Edit</button></td></tr>)}</tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <section className="admin-resource">
            <header className="admin-heading admin-heading--resource">
              <div><h1>{labels[active].plural}</h1><p>Add, edit, publish and remove {labels[active].plural.toLowerCase()}.</p></div>
              <button className="admin-primary-action" onClick={() => { setSelectedId("new"); setMessage(null); }} disabled={readOnly}>{labels[active].add}</button>
            </header>
            <div className="admin-resource-grid">
              <div className="admin-record-list">
                <div className="admin-record-list__head"><span>{activeItems.length} records</span><span>Position</span></div>
                {activeItems.length === 0 ? <p className="admin-empty">No records yet. Use “{labels[active].add}” to create the first one.</p> : activeItems.map((item) => {
                  const title = "name" in item ? item.name : item.title;
                  return <button className={selectedId === item.id ? "is-selected" : ""} onClick={() => { setSelectedId(item.id); setMessage(null); setConfirmDelete(false); }} key={item.id}><span><strong>{title}</strong><small>{item.published ? "Published" : "Draft"}</small></span><b>{String(item.position).padStart(2, "0")}</b></button>;
                })}
              </div>
              <div className="admin-editor">
                {!selectedId ? <div className="admin-editor-empty"><AdminIcon type={active} /><h2>Select a {labels[active].singular}</h2><p>Choose a record from the list or create a new one.</p></div> : (
                  <form key={`${active}-${selectedId}`} onSubmit={submit}>
                    <div className="admin-editor__head"><div><span>{selected ? `Edit ${labels[active].singular}` : `New ${labels[active].singular}`}</span><h2>{selected ? ("name" in selected ? selected.name : selected.title) : labels[active].add}</h2></div>{selected && <Link href={active === "services" ? `/services#${selected.slug}` : active === "careers" ? `/careers?role=${selected.slug}` : "/team"} target="_blank">Preview</Link>}</div>
                    <fieldset disabled={pending || readOnly}>
                      <input type="hidden" name="id" value={selected?.id ?? ""} />
                      {active === "services" && <ServiceFields record={selected as ServiceRecord | null} />}
                      {active === "careers" && <CareerFields record={selected as CareerRole | null} />}
                      {active === "team" && <TeamFields record={selected as TeamMember | null} />}
                    </fieldset>
                    {message && <p className={`admin-form-message${message.ok ? " is-success" : " is-error"}`} role={message.ok ? "status" : "alert"}>{message.message}</p>}
                    <div className="admin-editor__actions">
                      <button className="admin-primary-action" disabled={pending || readOnly}>{pending ? "Saving…" : "Save changes"}</button>
                      {selected && !confirmDelete && <button className="admin-delete-action" type="button" onClick={() => setConfirmDelete(true)} disabled={pending || readOnly}>Delete {labels[active].singular}</button>}
                      {selected && confirmDelete && <div className="admin-delete-confirm" role="alert"><span>This cannot be undone.</span><button type="button" onClick={removeSelected} disabled={pending}>Confirm delete</button><button type="button" onClick={() => setConfirmDelete(false)}>Cancel</button></div>}
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function CommonFields({ record }: { record: { slug: string; position: number; published: boolean } | null }) {
  return <><Field label="URL slug"><input name="slug" defaultValue={record?.slug ?? ""} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required placeholder="lowercase-with-hyphens" /></Field><Field label="Position"><input name="position" type="number" min="0" defaultValue={record?.position ?? 0} required /></Field><label className="admin-publish-toggle"><input name="published" type="checkbox" defaultChecked={record?.published ?? true} /><span>Published on the website</span></label></>;
}

function ServiceFields({ record }: { record: ServiceRecord | null }) {
  return <div className="admin-form-grid"><input type="hidden" name="oldIconPath" value={record?.iconPath ?? ""} />{record?.icon && <div className="admin-current-service-icon"><ServiceMark service={record} /><span>Current custom icon</span></div>}<Field label="Title" wide><input name="title" defaultValue={record?.title ?? ""} maxLength={100} required /></Field><CommonFields record={record} /><Field label="Short description" wide><textarea name="summary" defaultValue={record?.short ?? ""} rows={4} maxLength={500} required /></Field><Field label="Fallback icon"><select name="iconKey" defaultValue={record?.iconKey ?? "web"}><option value="agent">AI agent</option><option value="automation">Automation</option><option value="fte">Digital FTE</option><option value="software">Software</option><option value="mobile">Mobile app</option><option value="web">Web platform</option></select></Field><Field label="Upload custom icon"><input name="customIcon" type="file" accept="image/svg+xml,image/png,image/webp" /><small>SVG, PNG or WebP · maximum 1 MB</small></Field>{record?.icon && <label className="admin-remove-upload"><input name="removeCustomIcon" type="checkbox" /><span>Remove custom icon and use the fallback icon</span></label>}</div>;
}

function CareerFields({ record }: { record: CareerRole | null }) {
  return <div className="admin-form-grid"><Field label="Role title" wide><input name="title" defaultValue={record?.title ?? ""} maxLength={120} required /></Field><CommonFields record={record} /><Field label="Focus" wide><input name="focus" defaultValue={record?.focus ?? ""} maxLength={160} required placeholder="e.g. Python and FastAPI" /></Field><Field label="Role description" wide><textarea name="description" defaultValue={record?.description ?? ""} rows={5} maxLength={600} required /></Field></div>;
}

function TeamFields({ record }: { record: TeamMember | null }) {
  return <div className="admin-form-grid"><input type="hidden" name="oldImagePath" value={record?.imagePath ?? ""} />{record?.image && <div className="admin-current-image"><Image src={record.image} alt="Current team member portrait" width={96} height={96} /></div>}<Field label="Name" wide><input name="name" defaultValue={record?.name ?? ""} maxLength={120} required /></Field><CommonFields record={record} /><Field label="Role" wide><input name="role" defaultValue={record?.role ?? ""} maxLength={160} required /></Field><Field label="Bio" wide><textarea name="summary" defaultValue={record?.summary ?? ""} rows={5} maxLength={800} required /></Field><Field label="Skills, separated by commas" wide><input name="skills" defaultValue={record?.skills.join(", ") ?? ""} maxLength={500} /></Field><Field label="Profile photo"><input name="image" type="file" accept="image/jpeg,image/png,image/webp" /></Field><Field label="LinkedIn URL"><input name="linkedinUrl" type="url" defaultValue={record?.linkedinUrl ?? ""} placeholder="https://" /></Field><Field label="X URL"><input name="xUrl" type="url" defaultValue={record?.xUrl ?? ""} placeholder="https://x.com/" /></Field></div>;
}
