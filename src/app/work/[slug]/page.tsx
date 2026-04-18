import { notFound } from "next/navigation";
import Link from "next/link";
import { campaigns, getCampaign, getAdjacentCampaigns } from "@/data/campaigns";
import type { CampaignImage } from "@/data/types";
import { Nav } from "@/components/Nav";
import { Frame } from "@/components/Frame";
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

function pickImage(images: CampaignImage[], id: string): CampaignImage {
  return images.find((i) => i.id === id) || images[0];
}

/** Truncate to N chars on a word boundary (for the tagline spec cell). */
function shortTag(s: string, max = 28): string {
  const clean = s.replace(/\.$/, "").trim();
  if (clean.length <= max) return clean.toUpperCase();
  const cut = clean.slice(0, max);
  const sp = cut.lastIndexOf(" ");
  return (sp > 12 ? cut.slice(0, sp) : cut).toUpperCase();
}

export default async function CampaignPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const campaign = getCampaign(slug);
  if (!campaign) return notFound();

  const { next } = getAdjacentCampaigns(slug);
  const imgs = campaign.images;
  const featureCount = imgs.filter((i) => i.feature).length;

  // B-rhythm placement: cinematic opener, 2-up portraits, divider, 3-up, 16:9
  // beat, full-bleed closer. Falls back to whatever frames exist.
  const opener = pickImage(imgs, campaign.heroFrame || "01");
  const pair = [pickImage(imgs, "02"), pickImage(imgs, "03")];
  const triptych = [pickImage(imgs, "04"), pickImage(imgs, "05"), pickImage(imgs, "06")];
  const beat = pickImage(imgs, "07");
  const closer = pickImage(imgs, "08") || pickImage(imgs, "01");

  const titleUpper = campaign.title.toUpperCase();
  const cat = campaign.category.toUpperCase();
  // Pull-quote: split tagline into two lines and accent the second half.
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

      {/* Breadcrumb strip */}
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

      {/* Title block — U voice: mono eyebrow, big plain sans, accent dot */}
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

      {/* Spec strip — line-bordered cells, no inverted band */}
      <div className="spec-strip">
        {[
          ["TAGLINE", shortTag(campaign.tagline)],
          ["MODEL", campaign.modelName.toUpperCase()],
          ["FRAMES", `${pad(imgs.length)} / ${featureCount}★`],
          ["TOOLS", campaign.tools.slice(0, 3).join(" · ").toUpperCase()],
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

      {/* 1 — cinematic opener (21:9) */}
      <div style={{ padding: "40px clamp(20px, 5vw, 48px) 20px" }}>
        <Frame
          src={opener.src}
          alt={opener.alt}
          label={`${titleUpper} · ${opener.id}`}
          aspect="21/9"
          priority
          sizes="100vw"
        />
      </div>

      {/* 2-up portraits */}
      {pair[0] && pair[1] && (
        <div
          className="grid-2-up"
          style={{
            padding: "0 clamp(20px, 5vw, 48px) 40px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          {pair.map((img) => (
            <Frame
              key={img.id}
              src={img.src}
              alt={img.alt}
              label={`${titleUpper} · ${img.id}`}
              aspect="4/5"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>
      )}

      {/* Pullquote divider — U voice: tight sans, uppercase, accent word */}
      <div style={{ padding: "0 clamp(20px, 5vw, 48px) 48px", textAlign: "center" }}>
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

      {/* 3-up triptych */}
      {triptych.every(Boolean) && (
        <div
          className="grid-3-up"
          style={{
            padding: "0 clamp(20px, 5vw, 48px) 40px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
        >
          {triptych.map((img) => (
            <Frame
              key={img.id}
              src={img.src}
              alt={img.alt}
              label={`${titleUpper} · ${img.id}`}
              aspect="4/5"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ))}
        </div>
      )}

      {/* 16:9 beat */}
      {beat && (
        <div style={{ padding: "0 clamp(20px, 5vw, 48px) 40px" }}>
          <Frame
            src={beat.src}
            alt={beat.alt}
            label={`${titleUpper} · ${beat.id}`}
            aspect="16/9"
            sizes="100vw"
          />
        </div>
      )}

      {/* Full-bleed closer */}
      {closer && (
        <div>
          <Frame
            src={closer.src}
            alt={closer.alt}
            label={`${titleUpper} · ${closer.id}`}
            aspect="21/9"
            sizes="100vw"
          />
        </div>
      )}

      {next && next.slug !== campaign.slug && <CampaignClosing next={next} />}

      <style>{`
        .spec-strip {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
        }
        .spec-cell {
          padding: 16px 20px;
        }
        .spec-cell + .spec-cell { border-left: 1px solid var(--line); }
        .spec-cell:nth-child(2n+1) { border-left: none; }
        @media (min-width: 769px) {
          .spec-strip { grid-template-columns: repeat(5, 1fr) !important; }
          .spec-cell + .spec-cell { border-left: 1px solid var(--line); }
          .spec-cell:nth-child(2n+1) { border-left: 1px solid var(--line); }
          .spec-cell[data-first="1"] { border-left: none !important; }
          .grid-2-up { grid-template-columns: 1fr 1fr !important; }
          .grid-3-up { grid-template-columns: 1fr 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
