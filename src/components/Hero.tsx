"use client";
import { Frame } from "./Frame";
import Link from "next/link";
import type { Campaign } from "@/data/types";

export type HeroVariant = "a" | "b" | "c";

type Props = {
  campaign: Campaign;
  variant?: HeroVariant;
};

const heroSrc = (c: Campaign) => c.heroImage?.src || c.cover;
const heroAlt = (c: Campaign) => c.heroImage?.alt || `${c.modelName} — ${c.title}`;

/* ─────────── Variant A: scrim + bottom-left anchor ─────────── */
function HeroA({ campaign }: Props) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "min(820px, 88vh)",
        height: "min(820px, 88vh)",
        overflow: "hidden",
        background: "var(--bg2)",
      }}
    >
      <Frame
        src={heroSrc(campaign)}
        alt={heroAlt(campaign)}
        label={`${campaign.title.toUpperCase()} · 01`}
        mode="cover"
        fill
        priority
        sizes="100vw"
      />
      <div style={{ position: "absolute", inset: 0, background: "var(--scrim-top)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "var(--scrim)", pointerEvents: "none" }} />
      <div
        style={{
          position: "absolute",
          left: "clamp(20px, 5vw, 48px)",
          right: "clamp(20px, 5vw, 48px)",
          bottom: 40,
          color: "var(--hero-overlay-text)",
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 40,
          alignItems: "end",
        }}
      >
        <div>
          <span className="eye" style={{ color: "var(--accent)" }}>
            ◉ NOW SHOWING — CAMPAIGN {campaign.number}
          </span>
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(64px, 13vw, 160px)",
              lineHeight: 0.84,
              letterSpacing: "-0.05em",
              margin: "14px 0 0",
              color: "var(--hero-overlay-text)",
            }}
          >
            {campaign.title.toUpperCase()}
            <span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--hero-overlay-text)",
              opacity: 0.85,
              maxWidth: 520,
              marginTop: 18,
            }}
          >
            [ {campaign.category.toUpperCase()} / {campaign.year} / {String(campaign.images.length).padStart(2, "0")}F ] — {campaign.tagline}
          </p>
        </div>
        <Link
          href={`/work/${campaign.slug}`}
          className="desktop-only"
          style={{
            background: "var(--accent)",
            color: "var(--on-accent)",
            border: "none",
            padding: "16px 26px",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
            cursor: "pointer",
            borderRadius: 100,
            whiteSpace: "nowrap",
          }}
        >
          ENTER_CAMPAIGN →
        </Link>
      </div>
    </section>
  );
}

/* ─────────── Variant B: corner-type, no scrim ─────────── */
function HeroB({ campaign }: Props) {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "min(820px, 88vh)",
        height: "min(820px, 88vh)",
        overflow: "hidden",
        background: "var(--bg2)",
      }}
    >
      <Frame
        src={heroSrc(campaign)}
        alt={heroAlt(campaign)}
        label={`${campaign.title.toUpperCase()} · 01`}
        mode="cover"
        fill
        priority
        sizes="100vw"
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "70%",
          height: 280,
          background: "var(--top-radial)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "absolute", top: 44, left: "clamp(20px, 5vw, 48px)", color: "var(--hero-overlay-text)", maxWidth: "85%" }}>
        <span className="eye" style={{ color: "var(--accent)" }}>◉ Campaign {campaign.number} of 04</span>
        <h1
          style={{
            fontWeight: 800,
            fontSize: "clamp(64px, 16vw, 220px)",
            lineHeight: 0.82,
            letterSpacing: "-0.055em",
            margin: "10px 0 0",
            color: "var(--hero-overlay-text)",
          }}
        >
          {campaign.title.toUpperCase()}
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>
      </div>
      <div
        className="desktop-only"
        style={{
          position: "absolute",
          right: 40,
          top: 120,
          bottom: 120,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          color: "var(--hero-overlay-text)",
        }}
      >
        <div
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.3em",
            opacity: 0.78,
            textTransform: "uppercase",
          }}
        >
          {campaign.category} · EDITORIAL · {String(campaign.images.length).padStart(2, "0")} FRAMES · MMXXVI
        </div>
        <Link
          href={`/work/${campaign.slug}`}
          style={{
            background: "transparent",
            color: "var(--hero-overlay-text)",
            border: "1px solid currentColor",
            padding: "12px 20px",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
            cursor: "pointer",
            borderRadius: 100,
            backdropFilter: "blur(4px)",
          }}
        >
          ENTER →
        </Link>
      </div>
      <div
        style={{
          position: "absolute",
          left: "clamp(20px, 5vw, 48px)",
          bottom: 40,
          right: "clamp(20px, 5vw, 48px)",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--hero-overlay-text)",
          opacity: 0.85,
          maxWidth: 520,
          lineHeight: 1.55,
        }}
      >
        <span style={{ color: "var(--accent)" }}>▸</span> {campaign.tagline} {campaign.description.split(".")[0]}.
      </div>
    </section>
  );
}

/* ─────────── Variant C: knockout — title clips the image ─────────── */
function HeroC({ campaign }: Props) {
  const src = heroSrc(campaign);
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "min(820px, 88vh)",
        height: "min(820px, 88vh)",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${src}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
          filter: "grayscale(0.25) brightness(0.8)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "var(--gradient-knockout)" }} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "48px clamp(20px, 5vw, 48px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <span className="eye" style={{ color: "var(--accent)" }}>
          ◉ NOW SHOWING — CAMPAIGN {campaign.number}
        </span>

        <div style={{ position: "relative" }}>
          <h1
            style={{
              fontWeight: 900,
              fontSize: "clamp(96px, 24vw, 340px)",
              lineHeight: 0.82,
              letterSpacing: "-0.06em",
              margin: 0,
              backgroundImage: `url("${src}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 40px rgba(156,255,92,0.15)",
            }}
          >
            {campaign.title.toUpperCase()}
            <span
              style={{
                backgroundImage: "none",
                WebkitBackgroundClip: "initial",
                backgroundClip: "initial",
                color: "var(--accent)",
              }}
            >
              .
            </span>
          </h1>
          <div
            style={{
              marginTop: 16,
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 24,
              alignItems: "end",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink)",
                opacity: 0.75,
                maxWidth: 520,
                lineHeight: 1.55,
              }}
            >
              [ {campaign.category.toUpperCase()} · {campaign.year} · {String(campaign.images.length).padStart(2, "0")} FRAMES ]
              <br />
              {campaign.tagline}
            </div>
            <Link
              href={`/work/${campaign.slug}`}
              className="desktop-only"
              style={{
                background: "var(--accent)",
                color: "var(--on-accent)",
                border: "none",
                padding: "14px 24px",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: "pointer",
                borderRadius: 100,
                whiteSpace: "nowrap",
              }}
            >
              ENTER_CAMPAIGN →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Hero({ campaign, variant = "a" }: Props) {
  if (variant === "b") return <HeroB campaign={campaign} />;
  if (variant === "c") return <HeroC campaign={campaign} />;
  return <HeroA campaign={campaign} />;
}

/* ─────────── Mobile hero — single full-bleed image + heading below ─────────── */
export function HeroMobile({ campaign }: Props) {
  return (
    <section style={{ background: "var(--bg)" }}>
      <div style={{ padding: "24px 20px 16px" }}>
        <span className="eye" style={{ color: "var(--accent)" }}>
          ◉ SHOWING — {campaign.number}
        </span>
        <h1
          style={{
            fontWeight: 800,
            fontSize: 72,
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            margin: "10px 0 0",
            color: "var(--ink)",
          }}
        >
          {campaign.title.toUpperCase()}
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>
      </div>
      <div style={{ position: "relative", aspectRatio: "4 / 5", background: "var(--bg2)" }}>
        <Frame
          src={heroSrc(campaign)}
          alt={heroAlt(campaign)}
          label={`${campaign.title.toUpperCase()} · 01`}
          mode="cover"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <p
        style={{
          padding: "16px 20px 24px",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--dim)",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        [ {campaign.category.toUpperCase()} · {campaign.year} · {String(campaign.images.length).padStart(2, "0")}F ] — {campaign.tagline}
      </p>
      <div style={{ padding: "0 20px 16px" }}>
        <Link
          href={`/work/${campaign.slug}`}
          style={{
            display: "inline-block",
            background: "var(--accent)",
            color: "var(--on-accent)",
            padding: "12px 20px",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
            borderRadius: 100,
          }}
        >
          ENTER_CAMPAIGN →
        </Link>
      </div>
    </section>
  );
}
