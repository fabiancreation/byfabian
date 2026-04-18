import { Fragment } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { campaigns, getCampaign, getAdjacentCampaigns } from "@/data/campaigns";
import { Nav } from "@/components/Nav";
import { Frame } from "@/components/Frame";
import { ProductStrip } from "@/components/ProductStrip";
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

export default async function CampaignPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const campaign = getCampaign(slug);
  if (!campaign) return notFound();

  const { next } = getAdjacentCampaigns(slug);
  const imgs = campaign.images;
  // No separate hero — the work speaks first via the body opener.
  const rows = planLayout(imgs, []);

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

      {/* Body — planner-driven, every frame at its natural aspect */}
      <div style={{ paddingTop: 40 }} />
      {rows.map((row, idx) => {
        // Inject the optional product strip directly after the first body row.
        const trailing =
          idx === 0 && campaign.products && campaign.products.length > 0 ? (
            <ProductStrip products={campaign.products} />
          ) : null;

        if (row.kind === "pullquote") {
          return (
            <Fragment key={`pq-${idx}`}>
              <div style={{ padding: "8px clamp(20px, 5vw, 48px) 48px", textAlign: "center" }}>
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
              {trailing}
            </Fragment>
          );
        }

        const isFirstRow = idx === 0;

        if (row.kind === "wide") {
          const f = row.frames[0];
          return (
            <Fragment key={`row-${idx}`}>
              <div style={{ padding: "0 clamp(20px, 5vw, 48px) 24px" }}>
                <Frame
                  src={f.src}
                  alt={f.alt}
                  label={`${titleUpper} · ${f.id}`}
                  width={f.width}
                  height={f.height}
                  sizes="100vw"
                  priority={isFirstRow}
                />
              </div>
              {trailing}
            </Fragment>
          );
        }

        if (row.kind === "solo") {
          const f = row.frames[0];
          return (
            <Fragment key={`row-${idx}`}>
              <div style={{ padding: "0 clamp(20px, 5vw, 48px) 24px", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "100%", maxWidth: 720 }}>
                  <Frame
                    src={f.src}
                    alt={f.alt}
                    label={`${titleUpper} · ${f.id}`}
                    width={f.width}
                    height={f.height}
                    sizes="(max-width: 768px) 100vw, 720px"
                    priority={isFirstRow}
                  />
                </div>
              </div>
              {trailing}
            </Fragment>
          );
        }

        // pair or trio
        const cols = row.kind === "trio" ? 3 : 2;
        return (
          <Fragment key={`row-${idx}`}>
            <div
              className={cols === 3 ? "row-trio" : "row-pair"}
              style={{
                padding: "0 clamp(20px, 5vw, 48px) 24px",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 16,
              }}
            >
              {row.frames.map((f, fIdx) => (
                <Frame
                  key={f.id}
                  src={f.src}
                  alt={f.alt}
                  label={`${titleUpper} · ${f.id}`}
                  width={f.width}
                  height={f.height}
                  sizes={cols === 3 ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 50vw"}
                  priority={isFirstRow && fIdx === 0}
                />
              ))}
            </div>
            {trailing}
          </Fragment>
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

