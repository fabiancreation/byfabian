"use client";
import Link from "next/link";
import type { Campaign } from "@/data/types";
import { useTheme } from "@/components/ThemeProvider";

export function CampaignClosing({ next }: { next: Campaign }) {
  const { theme } = useTheme();
  const studio = theme === "studio";
  return (
    <section
      style={{
        background: studio ? "var(--bg2)" : "var(--accent)",
        color: studio ? "var(--ink)" : "var(--on-accent)",
        padding: "56px clamp(20px, 5vw, 48px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "end",
        gap: 24,
        flexWrap: "wrap",
        borderTop: studio ? "1px solid var(--line)" : "none",
      }}
    >
      <Link href={`/work/${next.slug}`} style={{ color: "inherit" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            color: studio ? "var(--accent)" : "rgba(245,239,226,0.85)",
          }}
        >
          NEXT FEATURE · {next.number}
        </span>
        <div
          style={{
            fontWeight: 800,
            fontSize: "clamp(56px, 10vw, 120px)",
            letterSpacing: "-0.04em",
            marginTop: 6,
            lineHeight: 0.9,
          }}
        >
          <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>
            {next.title}
          </span>{" "}
          →
        </div>
      </Link>
      <Link
        href="/contact"
        style={{
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
    </section>
  );
}
