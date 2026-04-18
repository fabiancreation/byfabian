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

/** Pick image by id ("01","02"...) with safe fallback to first available. */
function pickImage(images: CampaignImage[], id: string): CampaignImage {
  return images.find((i) => i.id === id) || images[0];
}

export default async function CampaignPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const campaign = getCampaign(slug);
  if (!campaign) return notFound();

  const { next } = getAdjacentCampaigns(slug);
  const imgs = campaign.images;

  // B-rhythm placement: cinematic opener, 2-up portraits, divider, 3-up,
  // 16:9 beat, full-bleed closer. Fall back to whatever frames exist.
  const opener = pickImage(imgs, campaign.heroFrame || "01");
  const pair = [pickImage(imgs, "02"), pickImage(imgs, "03")];
  const triptych = [pickImage(imgs, "04"), pickImage(imgs, "05"), pickImage(imgs, "06")];
  const beat = pickImage(imgs, "07");
  const closer = pickImage(imgs, "08") || pickImage(imgs, "01");

  return (
    <>
      <Nav compact />

      {/* Breadcrumb / campaign label strip */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px clamp(20px, 5vw, 32px)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <Link href="/" className="eye">← INDEX</Link>
        <span className="eye eye-accent">CAMPAIGN {campaign.number} / {campaign.title.toUpperCase()}</span>
      </div>

      {/* Title block */}
      <header
        style={{
          padding: "48px clamp(20px, 5vw, 48px) 28px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 24,
          alignItems: "end",
        }}
        className="campaign-header"
      >
        <div>
          <span className="eye eye-accent">
            {campaign.category.toUpperCase()} · MMXXVI · {pad(imgs.length)} FRAMES
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
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>
              {campaign.title.charAt(0)}
            </span>
            {campaign.title.slice(1, -1).toUpperCase()}
            <span style={{ background: "var(--accent)", color: "var(--on-accent)", padding: "0 0.08em" }}>
              {campaign.title.slice(-1).toUpperCase()}
            </span>
          </h1>
        </div>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2vw, 22px)",
            color: "var(--dim)",
            lineHeight: 1.35,
            maxWidth: 460,
            paddingBottom: 18,
            margin: 0,
            justifySelf: "start",
          }}
          className="campaign-deck"
        >
          {campaign.tagline}{" "}
          {campaign.description.split(".").slice(0, 1).join(".")}.
        </p>
      </header>

      {/* Meta band — inverted strip */}
      <div
        style={{
          margin: "0 clamp(20px, 5vw, 48px)",
          padding: "18px 24px",
          background: "var(--ink)",
          color: "var(--chalk)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 24,
        }}
      >
        {[
          ["Model", campaign.modelName],
          ["Frames", `${pad(imgs.length)} / ${imgs.filter((i) => i.feature).length}★`],
          ["Tools", campaign.tools.slice(0, 3).join(" · ")],
          ["Year", String(campaign.year)],
          ["Category", campaign.category],
        ].map(([k, v]) => (
          <div key={k}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "var(--accent)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              {k}
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 17,
                marginTop: 4,
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
          label={`${campaign.title.toUpperCase()} · ${opener.id}`}
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
              label={`${campaign.title.toUpperCase()} · ${img.id}`}
              aspect="4/5"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>
      )}

      {/* Pull-quote divider */}
      <div style={{ padding: "0 clamp(20px, 5vw, 48px) 48px", textAlign: "center" }}>
        <blockquote
          style={{
            margin: "0 auto",
            maxWidth: 760,
            padding: "36px 0",
            borderTop: "1px solid var(--line-strong)",
            borderBottom: "1px solid var(--line-strong)",
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(24px, 4vw, 36px)",
            lineHeight: 1.2,
            color: "var(--ink)",
          }}
        >
          {campaign.tagline.replace(/\.$/, "")} <span style={{ color: "var(--accent)" }}>·</span>{" "}
          <em>without the location budget.</em>
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
              label={`${campaign.title.toUpperCase()} · ${img.id}`}
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
            label={`${campaign.title.toUpperCase()} · ${beat.id}`}
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
            label={`${campaign.title.toUpperCase()} · ${closer.id}`}
            aspect="21/9"
            sizes="100vw"
          />
        </div>
      )}

      {/* Next feature */}
      {next && next.slug !== campaign.slug && <CampaignClosing next={next} />}

      <style>{`
        @media (min-width: 769px) {
          .campaign-header { grid-template-columns: 1fr 1fr; gap: 40px; }
          .grid-2-up { grid-template-columns: 1fr 1fr !important; }
          .grid-3-up { grid-template-columns: 1fr 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
