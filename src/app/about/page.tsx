import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Frame } from "@/components/Frame";
import { Closing } from "@/components/Closing";
import { campaigns, models } from "@/data/campaigns";

export const metadata = {
  title: "About — ByFabian",
  description:
    "Fabian Arndt directs AI-generated editorial campaigns from one model and a model file.",
};

const yamada = models[0];
const featureFrames = campaigns
  .flatMap((c) => c.images.filter((i) => i.feature).map((i) => ({ c, i })))
  .slice(0, 6);

export default function AboutPage() {
  return (
    <>
      <Nav compact />

      <section
        style={{
          padding: "80px clamp(20px, 5vw, 48px) 56px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
        }}
        className="about-hero"
      >
        <div className="about-hero-text">
          <span className="eye eye-accent">◉ ABOUT THE STUDIO</span>
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(56px, 10vw, 140px)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              margin: "14px 0 0",
            }}
          >
            ONE MODEL.
            <br />
            ONE STUDIO.
            <br />
            <span style={{ color: "var(--accent)" }}>ZERO SHOOT DAYS.</span>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.4vw, 26px)",
              lineHeight: 1.4,
              color: "var(--dim)",
              marginTop: 32,
              maxWidth: 520,
            }}
          >
            ByFabian is a one-person studio for AI image direction. Every campaign on this site
            began with a model file, a mood board, and a brief — and ended without a single plane
            ticket, location scout, or call sheet.
          </p>
        </div>
        <div className="about-hero-image">
          <Frame
            src="/images/yamada/about/portrait.jpg"
            alt="Yamada — close portrait"
            label="MUSE · YAMADA"
            mode="cover"
            aspect="3/4"
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </section>

      {/* Studio strip */}
      <section
        style={{
          background: "var(--bg2)",
          padding: "56px clamp(20px, 5vw, 48px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
        }}
        className="about-discipline"
      >
        {[
          ["DIRECT", "Brief, board, casting, voice. The same first 20% of any shoot — but compressed."],
          ["DIFFUSE", "Models, sets, light, wardrobe rendered in Flux + Comfy with custom LoRAs and a tight reference library."],
          ["DELIVER", "Polish in Topaz, finish in Lightroom. Final frames graded for press, e-com, and OOH."],
        ].map(([k, v]) => (
          <div key={k}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.22em",
                color: "var(--accent)",
              }}
            >
              ◉ {k}
            </div>
            <h3
              style={{
                fontWeight: 800,
                fontSize: "clamp(28px, 3vw, 40px)",
                letterSpacing: "-0.02em",
                margin: "10px 0 12px",
              }}
            >
              {k}.
            </h3>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: 18,
                lineHeight: 1.45,
                color: "var(--dim)",
                margin: 0,
              }}
            >
              {v}
            </p>
          </div>
        ))}
      </section>

      {/* Yamada — the muse */}
      <section
        style={{
          padding: "72px clamp(20px, 5vw, 48px)",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
        }}
        className="about-yamada"
      >
        <div>
          <span className="eye eye-accent">MUSE · 01</span>
          <h2
            style={{
              fontWeight: 800,
              fontSize: "clamp(56px, 9vw, 120px)",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              margin: "10px 0 20px",
            }}
          >
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>
              {yamada.name}
            </span>
            <span style={{ color: "var(--accent)" }}>.</span>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 2vw, 22px)",
              lineHeight: 1.4,
              color: "var(--dim)",
              maxWidth: 520,
              margin: 0,
            }}
          >
            {yamada.bio}
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
          }}
        >
          {featureFrames.slice(0, 4).map(({ c, i }) => (
            <Link key={`${c.slug}-${i.id}`} href={`/work/${c.slug}`}>
              <Frame
                src={i.src}
                alt={i.alt}
                label={`${c.title.toUpperCase()} · ${i.id}`}
                mode="cover"
                aspect="4/5"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </Link>
          ))}
        </div>
      </section>

      <Closing />

      <style>{`
        @media (min-width: 769px) {
          .about-hero {
            grid-template-columns: 1.4fr 1fr !important;
            gap: 56px !important;
            align-items: stretch !important;
          }
          .about-hero-image { align-self: stretch; display: flex; }
          .about-hero-image > * { width: 100%; }
          .about-discipline { grid-template-columns: repeat(3, 1fr) !important; gap: 40px !important; }
          .about-yamada { grid-template-columns: 1fr 1fr !important; gap: 56px !important; align-items: start; }
        }
      `}</style>
    </>
  );
}
