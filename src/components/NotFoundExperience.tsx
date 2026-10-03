"use client";

import { PointerEvent, useCallback } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

export default function NotFoundExperience() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 24, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 24, mass: 0.7 });
  const mapX = useTransform(springX, [-1, 1], [-12, 12]);
  const mapY = useTransform(springY, [-1, 1], [-8, 8]);
  const codeX = useTransform(springX, [-1, 1], [16, -16]);
  const codeY = useTransform(springY, [-1, 1], [10, -10]);

  const trackPointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  }, [pointerX, pointerY, reduceMotion]);

  const resetPointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  return (
    <div
      className="not-found-map"
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      role="img"
      aria-label="A broken system route between a need and its outcome"
    >
      <motion.span className="not-found-map__code" style={reduceMotion ? undefined : { x: codeX, y: codeY }} aria-hidden="true">404</motion.span>
      <motion.div className="not-found-map__diagram" style={reduceMotion ? undefined : { x: mapX, y: mapY }} aria-hidden="true">
        <svg viewBox="0 0 720 520" focusable="false">
          <path className="not-found-map__guide" d="M102 304 C210 304 230 190 338 190" />
          <path className="not-found-map__guide" d="M386 190 C494 190 514 304 622 304" />
          <motion.path
            className="not-found-map__route"
            d="M102 304 C210 304 230 190 320 190"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.35 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.path
            className="not-found-map__route not-found-map__route--muted"
            d="M404 190 C494 190 514 304 622 304"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.55 }}
            transition={{ duration: 1.1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          />
          <rect className="not-found-map__node" x="72" y="274" width="60" height="60" />
          <rect className="not-found-map__node not-found-map__node--muted" x="592" y="274" width="60" height="60" />
          <path className="not-found-map__break" d="m344 168 24 22-24 22 24 22" />
        </svg>
        <span className="not-found-map__label not-found-map__label--need">Need</span>
        <span className="not-found-map__label not-found-map__label--missing">Route missing</span>
        <span className="not-found-map__label not-found-map__label--outcome">Outcome</span>
      </motion.div>
    </div>
  );
}
