"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "light",
  toggle: () => undefined,
});

function automaticTheme(date = new Date()): Theme {
  const hour = date.getHours();
  return hour >= 6 && hour < 18 ? "light" : "dark";
}

function nextBoundary(date = new Date()) {
  const boundary = new Date(date);
  if (date.getHours() < 6) boundary.setHours(6, 0, 0, 0);
  else if (date.getHours() < 18) boundary.setHours(18, 0, 0, 0);
  else {
    boundary.setDate(boundary.getDate() + 1);
    boundary.setHours(6, 0, 0, 0);
  }
  return boundary.getTime();
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const manualUntil = useRef(0);

  useEffect(() => {
    window.localStorage.removeItem("codizzz-theme");
    const applyAutomaticTheme = () => {
      if (Date.now() < manualUntil.current) return;
      const next = automaticTheme();
      setTheme(next);
      document.documentElement.dataset.theme = next;
    };
    applyAutomaticTheme();

    let boundaryTimer = 0;
    const scheduleBoundary = () => {
      window.clearTimeout(boundaryTimer);
      const delay = Math.max(1000, nextBoundary() - Date.now() + 100);
      boundaryTimer = window.setTimeout(() => {
        manualUntil.current = 0;
        applyAutomaticTheme();
        scheduleBoundary();
      }, delay);
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") applyAutomaticTheme();
    };
    scheduleBoundary();
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.clearTimeout(boundaryTimer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    manualUntil.current = nextBoundary();
    setTheme(next);
    document.documentElement.dataset.theme = next;
  };

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
