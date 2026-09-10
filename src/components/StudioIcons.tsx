type IconProps = { className?: string };

export function ArrowIcon({ className }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
}

export function SunIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></svg>;
}

export function MoonIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 8.5 8.5 0 1 0 20 15.5Z" /></svg>;
}

export function ServiceIcon({ type }: { type: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (type === "agent") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="M8 14a8 8 0 0 1 16 0v7H8Z" /><path d="M12 21v3h8v-3M11 14h.1M21 14h.1M13 18h6" /></svg>;
  if (type === "AI Automation") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><rect x="3" y="5" width="8" height="8" rx="1" /><rect x="21" y="19" width="8" height="8" rx="1" /><path d="M11 9h6a4 4 0 0 1 4 4v6M21 23h-6a4 4 0 0 1-4-4v-6" /></svg>;
  if (type === "fte") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><circle cx="16" cy="10" r="5" /><path d="M7 27c.7-6 3.7-9 9-9s8.3 3 9 9Z" /><path d="M23 6h5v5" /></svg>;
  if (type === "software") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><path d="m11 8-7 8 7 8M21 8l7 8-7 8M18 5l-4 22" /></svg>;
  if (type === "mobile") return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><rect x="9" y="3" width="14" height="26" rx="2" /><path d="M14 25h4" /></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true" {...common}><rect x="3" y="6" width="26" height="21" rx="1" /><path d="M3 12h26M8 9h.1M12 9h.1" /></svg>;
}
