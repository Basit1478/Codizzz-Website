"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ServiceRecord } from "@/types/content";
import ServiceMark from "./ServiceMark";

export default function ServicesRibbon({ services }: { services: ServiceRecord[] }) {
  const ribbonRef = useRef<HTMLElement>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const ribbon = ribbonRef.current;
    if (!ribbon) return;

    const updateVisibility = (isIntersecting: boolean) => {
      setIsRunning(isIntersecting && document.visibilityState === "visible");
    };

    let inView = false;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateVisibility(inView);
    }, { threshold: 0.08 });

    const handleVisibility = () => updateVisibility(inView);
    observer.observe(ribbon);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <section ref={ribbonRef} className={`services-ribbon${isRunning ? " is-running" : ""}`} aria-label="Codizzz services">
      <div className="services-ribbon__track">
        <div className="services-ribbon__group">
          {services.map((service) => (
            <Link href={`/services#${service.slug}`} key={service.id}>
              <ServiceMark service={service} />
              <span>{service.title}</span>
            </Link>
          ))}
        </div>
        <div className="services-ribbon__group services-ribbon__group--duplicate" aria-hidden="true">
          {services.map((service) => (
            <Link href={`/services#${service.slug}`} key={`duplicate-${service.id}`} tabIndex={-1}>
              <ServiceMark service={service} />
              <span>{service.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
