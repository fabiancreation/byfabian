"use client";
import Link from "next/link";
import { Frame } from "./Frame";
import type { Campaign } from "@/data/types";

type Props = { campaigns: Campaign[] };

export function IndexGrid({ campaigns }: Props) {
  return (
    <section>
      {/* Heading row */}
      <div
        style={{
          padding: "64px clamp(20px, 5vw, 48px) 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          background: "var(--bg)",
          color: "var(--ink)",
        }}
      >
        <h2
          style={{
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 44px)",
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          INDEX
        </h2>
        <span className="eye">{String(campaigns.length).padStart(2, "0")} CAMPAIGNS</span>
      </div>

      {/* Desktop / tablet — 2-up grid */}
      <div className="desktop-only" style={{ padding: "0 clamp(20px, 5vw, 48px) 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {campaigns.map((c) => (
            <CampaignTile key={c.slug} c={c} />
          ))}
        </div>
      </div>

      {/* Mobile — vertical full-width stack */}
      <div className="mobile-only" style={{ padding: "0 0 32px", display: "flex", flexDirection: "column", gap: 3 }}>
        {campaigns.map((c) => (
          <CampaignTile key={c.slug} c={c} mobile />
        ))}
      </div>
    </section>
  );
}

function CampaignTile({ c, mobile = false }: { c: Campaign; mobile?: boolean }) {
  return (
    <Link href={`/work/${c.slug}`} style={{ display: "block", position: "relative" }}>
      <Frame
        src={c.cover}
        alt={`${c.title} — cover`}
        label={`${c.title.toUpperCase()} · 01`}
        mode="cover"
        aspect="4/5"
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: mobile ? "14px 16px" : "20px 24px",
          background: "var(--gradient-card)",
          color: "var(--chalk)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          pointerEvents: "none",
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: mobile ? 9 : 10,
              letterSpacing: "0.22em",
              color: "var(--accent)",
            }}
          >
            ◉ {c.number}
          </span>
          <div
            style={{
              fontWeight: 800,
              fontSize: mobile ? 28 : 44,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginTop: 6,
            }}
          >
            {c.title.toUpperCase()}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em" }}>
            {c.category.toUpperCase()}
          </span>
          {!mobile && (
            <div style={{ marginTop: 4, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.22em" }}>
              {String(c.images.length).padStart(2, "0")}F →
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
