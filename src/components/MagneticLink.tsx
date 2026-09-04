"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { ArrowIcon } from "./StudioIcons";

type MagneticLinkProps = {
  href: string;
  label: string;
  className?: string;
  icon?: ReactNode;
};

export default function MagneticLink({ href, label, className = "", icon }: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 360, damping: 24, mass: 0.45 });
  const y = useSpring(rawY, { stiffness: 360, damping: 24, mass: 0.45 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rawX.set((event.clientX - bounds.left - bounds.width / 2) * 0.18);
    rawY.set((event.clientY - bounds.top - bounds.height / 2) * 0.18);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      className="magnetic-link"
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <Link className={`button ${className}`.trim()} href={href} aria-label={label}>
        <span className="button__label-window" aria-hidden="true">
          <span className="button__label-track" data-label={label}>
            <span>{label}</span>
          </span>
        </span>
        {icon ?? <ArrowIcon />}
      </Link>
    </motion.div>
  );
}
