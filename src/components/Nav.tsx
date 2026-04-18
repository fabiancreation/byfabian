"use client";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

type NavProps = {
  /** Compact variant for inner pages — smaller padding, no eyebrow strip. */
  compact?: boolean;
};

export function Nav({ compact = false }: NavProps) {
  const [open, setOpen] = useState(false);
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--bg)",
        borderBottom: "1px solid var(--line)",
        transition: "background 400ms, border-color 400ms",
      }}
    >
      {/* Desktop */}
      <div
        className="desktop-only"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: compact ? "16px 32px" : "24px 48px",
        }}
      >
        <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
          <Link
            href="/"
            style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em", color: "var(--ink)" }}
          >
            BYFABIAN
          </Link>
          {!compact && <span className="eye">STUDIO 01 / ONLINE</span>}
          {!compact && <span className="accent-dot" />}
        </div>
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <Link href="/" className="eye eye-ink">WORK</Link>
          <Link href="/about" className="eye eye-ink">ABOUT</Link>
          <ThemeToggle />
          <Link href="/contact" className="eye eye-accent">BOOK →</Link>
        </nav>
      </div>

      {/* Mobile */}
      <div className="mobile-only">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
          }}
        >
          <Link
            href="/"
            style={{ fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em", color: "var(--ink)" }}
          >
            BYFABIAN
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.22em",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {open ? "CLOSE ✕" : "MENU ◉"}
          </button>
        </div>
        {open && (
          <div
            style={{
              padding: "20px 20px 28px",
              borderTop: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              gap: 18,
              background: "var(--bg2)",
            }}
          >
            <Link href="/" onClick={() => setOpen(false)} style={{ fontWeight: 800, fontSize: 32, letterSpacing: "-0.02em", color: "var(--ink)" }}>
              WORK<span style={{ color: "var(--accent)" }}>.</span>
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} style={{ fontWeight: 800, fontSize: 32, letterSpacing: "-0.02em", color: "var(--ink)" }}>
              ABOUT<span style={{ color: "var(--accent)" }}>.</span>
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} style={{ fontWeight: 800, fontSize: 32, letterSpacing: "-0.02em", color: "var(--ink)" }}>
              BOOK<span style={{ color: "var(--accent)" }}>.</span>
            </Link>
            <div style={{ marginTop: 8 }}>
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
