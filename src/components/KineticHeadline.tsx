"use client";

import { motion, useReducedMotion } from "motion/react";

const lines = ["Your need.", "Engineered into", "a digital product."];

export default function KineticHeadline() {
  const reduceMotion = useReducedMotion();

  return (
    <h1 id="home-title" className="kinetic-headline" aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <span className="kinetic-headline__line" aria-hidden="true" key={line}>
          <motion.span
            initial={reduceMotion ? false : { y: "112%", rotate: 1.5 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.1 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
