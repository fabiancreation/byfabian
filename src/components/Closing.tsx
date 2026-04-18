"use client";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

export function Closing() {
  const { theme } = useTheme();
  const studio = theme === "studio";
  return (
    <>
      <section
        style={{
          background: studio ? "var(--bg)" : "var(--accent)",
          color: studio ? "var(--ink)" : "var(--on-accent)",
          padding: "72px clamp(20px, 5vw, 48px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32,
          borderTop: studio ? "1px solid var(--line)" : "none",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 32,
          }}
          className="closing-grid"
        >
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            HAVE A CAMPAIGN
            <br />
            {studio ? (
              <span style={{ color: "var(--accent)" }}>IN MIND?</span>
            ) : (
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>
                in mind?
              </span>
            )}
          </h2>
          <div style={{ textAlign: "right" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                padding: "14px 24px",
                background: studio ? "var(--accent)" : "var(--chalk)",
                color: studio ? "var(--on-accent)" : "var(--ink)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                borderRadius: 100,
              }}
            >
              START_A_BRIEF →
            </Link>
            <div
              style={{
                marginTop: 20,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                opacity: 0.9,
                letterSpacing: "0.1em",
              }}
            >
              fabian.arndt.info@gmail.com
            </div>
          </div>
        </div>
      </section>
      <footer
        style={{
          padding: "14px clamp(20px, 5vw, 48px)",
          borderTop: "1px solid var(--line)",
          background: "var(--bg)",
          color: "var(--ink)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span className="eye">© 2026 BYFABIAN</span>
        <span className="eye">ALL IMAGERY AI-GENERATED</span>
      </footer>
      <style>{`
        @media (min-width: 769px) {
          .closing-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 48px !important;
            align-items: end !important;
          }
        }
      `}</style>
    </>
  );
}
