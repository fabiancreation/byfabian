"use client";
import { useState } from "react";
import { Hero, HeroMobile } from "./Hero";
import type { Campaign } from "@/data/types";

type Props = {
  campaigns: Campaign[];
  mobile?: boolean;
};

export function HeroSwitcher({ campaigns, mobile = false }: Props) {
  const [idx, setIdx] = useState(0);
  const active = campaigns[idx];

  const pills = (
    <div
      style={{
        display: "flex",
        gap: 6,
        pointerEvents: "auto",
      }}
    >
      {campaigns.map((c, i) => {
        const on = i === idx;
        return (
          <button
            key={c.slug}
            onClick={() => setIdx(i)}
            aria-label={`Show ${c.title} campaign`}
            aria-pressed={on}
            style={{
              padding: "7px 14px",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              background: on ? "var(--accent)" : "rgba(0,0,0,0.28)",
              color: on ? "var(--on-accent)" : "var(--hero-overlay-text)",
              border: `1px solid ${on ? "var(--accent)" : "rgba(255,255,255,0.4)"}`,
              borderRadius: 100,
              cursor: "pointer",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              transition: "background 160ms, color 160ms, border-color 160ms",
            }}
          >
            {c.title}
          </button>
        );
      })}
    </div>
  );

  if (mobile) {
    return (
      <div style={{ background: "var(--bg)" }}>
        <div style={{ padding: "16px 20px 0", display: "flex", justifyContent: "flex-end" }}>
          {pills}
        </div>
        <HeroMobile campaign={active} />
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <Hero campaign={active} variant="a" />
      <div
        style={{
          position: "absolute",
          top: 72,
          left: "clamp(20px, 5vw, 48px)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      >
        {pills}
      </div>
    </div>
  );
}
