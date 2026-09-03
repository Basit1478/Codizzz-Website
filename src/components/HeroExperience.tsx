"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";

const nodes = [
  { key: "need", label: "Need", readout: "Input signal", className: "hero-node--need" },
  { key: "workflow", label: "Workflow", readout: "System route", className: "hero-node--workflow" },
  { key: "outcome", label: "Outcome", readout: "Shipped state", className: "hero-node--outcome" },
];

export default function HeroExperience() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 95, damping: 22, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 95, damping: 22, mass: 0.7 });
  const imageX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const imageY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const hudX = useTransform(smoothX, [-1, 1], [7, -7]);
  const hudY = useTransform(smoothY, [-1, 1], [4, -4]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className="fabrication-frame"
      data-hero-media
      initial={reduceMotion ? false : { opacity: 0, scale: 1.025 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.15, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      <motion.div
        className="fabrication-frame__image"
        role="img"
        aria-label="A digital product engineer designing connected software workflows in a modern studio"
        style={reduceMotion ? undefined : { x: imageX, y: imageY }}
      />

      <motion.div className="hero-hud" style={reduceMotion ? undefined : { x: hudX, y: hudY }}>
        <div className="hero-hud__meta">
          <span>COD / SYSTEM MAP</span>
          <span>[ 24°51&apos;N 67°00&apos;E / KHI ]</span>
        </div>

        <svg className="cut-path" viewBox="0 0 800 430" aria-hidden="true">
          <path className="cut-path__base" d="M250 314h58l38-54h112l44-95h111l39 45h92" />
          <motion.path
            className="cut-path__pulse"
            d="M250 314h58l38-54h112l44-95h111l39 45h92"
            initial={{ strokeDashoffset: 44 }}
            animate={reduceMotion ? undefined : { strokeDashoffset: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {nodes.map((node, index) => (
          <motion.div
            className={`hero-node ${node.className}`}
            tabIndex={0}
            role="group"
            aria-label={`${node.label}: ${node.readout}`}
            key={node.key}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.65 + index * 0.13, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduceMotion ? undefined : { scale: 1.045 }}
          >
            <span className="hero-node__index">N.0{index + 1}</span>
            <strong>{node.label}</strong>
            <span className="hero-node__readout">{node.readout}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
