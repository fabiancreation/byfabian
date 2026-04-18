"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "studio" | "daylight";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("studio");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("byfabian-theme")) as Theme | null;
    if (stored === "studio" || stored === "daylight") {
      setThemeState(stored);
      document.documentElement.dataset.theme = stored;
    } else {
      document.documentElement.dataset.theme = "studio";
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("byfabian-theme", t);
    } catch {}
  };

  const toggle = () => setTheme(theme === "studio" ? "daylight" : "studio");

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme(): Ctx {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
