"use client";
import { useTheme } from "./ThemeProvider";

/**
 * Statement-style toggle: "STUDIO ↔ DAYLIGHT".
 * Visible labels both sides, knob slides between them.
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isStudio = theme === "studio";
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: "transparent",
        border: "1px solid var(--line-strong)",
        borderRadius: 100,
        padding: "8px 14px",
        cursor: "pointer",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: "var(--ink)",
        transition: "border-color 360ms",
      }}
    >
      <span
        style={{
          fontWeight: isStudio ? 700 : 400,
          color: isStudio ? "var(--accent)" : "var(--dim)",
          transition: "color 360ms",
        }}
      >
        STUDIO
      </span>
      <span
        style={{
          position: "relative",
          width: 36,
          height: 14,
          borderRadius: 100,
          background: "var(--slider-track)",
          border: "1px solid var(--line)",
          transition: "background 360ms",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 1,
            left: isStudio ? 1 : 21,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "var(--accent-glow)",
            transition: "left 360ms cubic-bezier(.4,1.4,.4,1), background 360ms",
          }}
        />
      </span>
      <span
        style={{
          fontWeight: !isStudio ? 700 : 400,
          color: !isStudio ? "var(--accent)" : "var(--dim)",
          transition: "color 360ms",
        }}
      >
        DAYLIGHT
      </span>
    </button>
  );
}
