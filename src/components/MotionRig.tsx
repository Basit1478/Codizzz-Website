"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function MotionRig() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    lenis.on("scroll", ScrollTrigger.update);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(element, { y: 24, opacity: 0.86 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: element, start: "top 82%", once: true } });
      });
    });

    return () => {
      context.revert();
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);
  return null;
}
