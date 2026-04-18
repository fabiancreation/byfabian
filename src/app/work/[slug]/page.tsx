import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { campaigns, getCampaign, getAdjacentCampaigns } from "@/data/campaigns";
import type { CampaignImage } from "@/data/types";
import { Nav } from "@/components/Nav";
import { Frame } from "@/components/Frame";
import { planLayout } from "@/lib/layout";
import { CampaignClosing } from "./CampaignClosing";

export async function generateStaticParams() {
  return campaigns.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const c = getCampaign(slug);
  if (!c) return {};
  return {
    title: `${c.title} — ByFabian`,
    description: c.tagline,
    openGraph: {
      title: `${c.title} — ByFabian`,
      description: c.tagline,
      images: [c.cover],
    },
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

function shortTag(s: string, max = 28): string {
  const clean = s.replace(/\.$/, "").trim();
  if (clean.length <= max) return clean.toUpperCase();
  const cut = clean.slice(0, max);
  const sp = cut.lastIndexOf(" ");
  return (sp > 12 ? cut.slice(0, sp) : cut).toUpperCase();
}

/**
 * Resolve the hero image: prefer dedicated `heroImage`, fall back to first
 * landscape body frame, then to first body frame. Logs a build-time warning
 * when falling back so we know which campaigns still need a dedicated hero.
 */
function resolveHero(slug: string, hero: CampaignImage | undefined, body: CampaignImage[]): CampaignImage | null {
  if (hero) return hero;
  const landscape = body.find((i) => i.aspect === "landscape");
  if (landscape) {
    console.warn(`[campaign:${slug}] no heroImage set — falling back to first landscape frame ${landscape.id}`);
    return landscape;
  }
  const first = body[0];
  if (first) {
    console.warn(`[campaign:${slug}] no heroImage set and no landscape frames — falling back to ${first.id}`);
    return first;
  }
  return null;
}

export default async function CampaignPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const campaign = getCampaign(slug);
  if (!campaign) return notFound();

  const { next } = getAdjacentCampaigns(slug);
  const imgs = campaign.images;
  const hero = resolveHero(slug, campaign.heroImage, imgs);

  // Body excludes the hero frame so it never appears twice.
  const heroIds = hero ? [hero.id] : [];
  const rows = planLayout(imgs, heroIds);

  const titleUpper = campaign.title.toUpperCase();
  const cat = campaign.category.toUpperCase();
  const taglineRaw = campaign.tagline.replace(/\.$/, "").toUpperCase();
  const taglineParts = taglineRaw.includes(",")
    ? [taglineRaw.split(",")[0], taglineRaw.split(",").slice(1).join(",").trim()]
    : taglineRaw.includes(" — ")
      ? taglineRaw.split(" — ")
      : (() => {
          const words = taglineRaw.split(" ");
          const half = Math.ceil(words.length / 2);
          return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
        })();

  return (
    <>
      <Nav />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "14px clamp(20px, 5vw, 48px)",
          borderBottom: "1px solid var(--line)",
          background: "var(--bg2)",
        }}
      >
        <Link href="/" className="eye">← INDEX / WORK</Link>
        <span className="eye eye-accent">CAMPAIGN {campaign.number} / {titleUpper}</span>
      </div>

      <header style={{ padding: "48px clamp(20px, 5vw, 48px) 28px" }}>
        <span className="eye eye-accent">
          {cat} · {campaign.year} · {pad(imgs.length)} FRAMES
        </span>
        <h1
          style={{
            fontWeight: 800,
            fontSize: "clamp(72px, 14vw, 220px)",
            lineHeight: 0.82,
            letterSpacing: "-0.05em",
            margin: "14px 0 0",
          }}
        >
          {titleUpper}
          <span style={{ color: "var(--accent)" }}>.</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            color: "var(--dim)",
            marginTop: 20,
            maxWidth: 620,
            lineHeight: 1.55,
          }}
        >
          {campaign.description}
        </p>
      </header>

      <div className="spec-strip">
        {[
          ["TAGLINE", (campaign.shortTag || shortTag(campaign.tagline)).toUpperCase()],
          ["MODEL", campaign.modelName.toUpperCase()],
          ["FRAMES", pad(imgs.length)],
          ["CATEGORY", campaign.category.toUpperCase()],
          ["YEAR", String(campaign.year)],
        ].map(([k, v], i) => (
          <div key={k} className="spec-cell" data-first={i === 0 ? "1" : "0"}>
            <span className="eye">{k}</span>
            <div
              style={{
                marginTop: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink)",
                wordBreak: "break-word",
              }}
            >
              {v}
            </div>
          </div>
        ))}
      </div>

      {/* Hero — natural aspect, height-capped, centered. Never crops. */}
      {hero && <HeroBlock hero={hero} title={titleUpper} />}

      {/* Body — planner-driven, every frame at its natural aspect */}
      {rows.map((row, idx) => {
        if (row.kind === "pullquote") {
          return (
            <div key={`pq-${idx}`} style={{ padding: "8px clamp(20px, 5vw, 48px) 48px", textAlign: "center" }}>
              <blockquote
                style={{
                  margin: "0 auto",
                  maxWidth: 820,
                  padding: "40px 0",
                  borderTop: "1px solid var(--line-strong)",
                  borderBottom: "1px solid var(--line-strong)",
                  fontWeight: 800,
                  fontSize: "clamp(28px, 4.2vw, 40px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  textTransform: "uppercase",
                }}
              >
                {taglineParts[0]}
                <br />
                {taglineParts[1] && (
                  <span style={{ color: "var(--accent)" }}>{taglineParts[1]}.</span>
                )}
              </blockquote>
            </div>
          );
        }

        if (row.kind === "wide") {
          const f = row.frames[0];
          return (
            <div key={`row-${idx}`} style={{ padding: "0 clamp(20px, 5vw, 48px) 24px" }}>
              <Frame
                src={f.src}
                alt={f.alt}
                label={`${titleUpper} · ${f.id}`}
                width={f.width}
                height={f.height}
                sizes="100vw"
              />
            </div>
          );
        }

        if (row.kind === "solo") {
          const f = row.frames[0];
          return (
            <div key={`row-${idx}`} style={{ padding: "0 clamp(20px, 5vw, 48px) 24px", display: "flex", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: 720 }}>
                <Frame
                  src={f.src}
                  alt={f.alt}
                  label={`${titleUpper} · ${f.id}`}
                  width={f.width}
                  height={f.height}
                  sizes="(max-width: 768px) 100vw, 720px"
                />
              </div>
            </div>
          );
        }

        // pair or trio
        const cols = row.kind === "trio" ? 3 : 2;
        return (
          <div
            key={`row-${idx}`}
            className={cols === 3 ? "row-trio" : "row-pair"}
            style={{
              padding: "0 clamp(20px, 5vw, 48px) 24px",
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 16,
            }}
          >
            {row.frames.map((f) => (
              <Frame
                key={f.id}
                src={f.src}
                alt={f.alt}
                label={`${titleUpper} · ${f.id}`}
                width={f.width}
                height={f.height}
                sizes={cols === 3 ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
              />
            ))}
          </div>
        );
      })}

      {next && next.slug !== campaign.slug && <CampaignClosing next={next} />}

      <style>{`
        .spec-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .spec-cell { padding: 16px 20px; }
        .spec-cell + .spec-cell { border-left: 1px solid var(--line); }
        .spec-cell:nth-child(2n+1) { border-left: none; }
        @media (min-width: 769px) {
          .spec-strip { grid-template-columns: repeat(5, 1fr) !important; }
          .spec-cell + .spec-cell { border-left: 1px solid var(--line); }
          .spec-cell:nth-child(2n+1) { border-left: 1px solid var(--line); }
          .spec-cell[data-first="1"] { border-left: none !important; }
          .row-pair { grid-template-columns: 1fr 1fr !important; }
          .row-trio { grid-template-columns: 1fr 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}

/**
 * Hero block — letterboxes the hero so portraits/landscapes/cinematic widths
 * all read intentionally. Image renders at natural ratio inside a centered
 * stage with `--bg2` letterbox bars.
 */
function HeroBlock({ hero, title }: { hero: CampaignImage; title: string }) {
  return (
    <div
      style={{
        margin: "40px 0 24px",
        padding: "0 clamp(20px, 5vw, 48px)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          background: "var(--bg2)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // Cap height so portraits don't blow out the page; landscapes still
          // run wide and cap softer.
          maxHeight: "min(88vh, 920px)",
          overflow: "hidden",
        }}
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          width={hero.width}
          height={hero.height}
          sizes="100vw"
          priority
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "min(88vh, 920px)",
            objectFit: "contain",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 14,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "var(--accent)",
            textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            opacity: 0.85,
            pointerEvents: "none",
          }}
        >
          ◉ {title} · {hero.id}
        </div>
      </div>
    </div>
  );
}
