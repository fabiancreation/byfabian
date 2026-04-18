import { campaigns } from "@/data/campaigns";
import { Nav } from "@/components/Nav";
import { Hero, HeroMobile, type HeroVariant } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { IndexGrid } from "@/components/Index";
import { Closing } from "@/components/Closing";

type SearchParams = { hero?: string };

const HERO_BY_QUERY: Record<string, HeroVariant> = { a: "a", b: "b", c: "c" };

export default async function Home(props: { searchParams: Promise<SearchParams> }) {
  const sp = await props.searchParams;
  const variant = HERO_BY_QUERY[sp.hero ?? "a"] ?? "a";

  // Bomber is the hero campaign in the design (campaign 02).
  const heroCampaign =
    campaigns.find((c) => c.slug === "yamada-bomber-jacket") || campaigns[0];

  return (
    <>
      <Nav />
      <div className="desktop-only">
        <Hero campaign={heroCampaign} variant={variant} />
      </div>
      <div className="mobile-only">
        <HeroMobile campaign={heroCampaign} />
      </div>
      <Ticker />
      <IndexGrid campaigns={campaigns} />
      <HeroVariantSwitcher current={variant} />
      <Closing />
    </>
  );
}

/**
 * Tiny floating dev switch so reviewers can hop between Hero variants without
 * editing URLs by hand. Stays out of the way (bottom-left, low contrast).
 */
function HeroVariantSwitcher({ current }: { current: HeroVariant }) {
  const opts: { v: HeroVariant; label: string }[] = [
    { v: "a", label: "A · scrim" },
    { v: "b", label: "B · corner" },
    { v: "c", label: "C · knockout" },
  ];
  return (
    <div
      className="desktop-only"
      style={{
        position: "fixed",
        left: 24,
        bottom: 24,
        zIndex: 60,
        display: "flex",
        gap: 4,
        padding: 6,
        borderRadius: 100,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)",
        border: "1px solid var(--line-strong)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--accent)",
          padding: "6px 10px 6px 12px",
          alignSelf: "center",
        }}
      >
        HERO
      </span>
      {opts.map((o) => (
        <a
          key={o.v}
          href={`/?hero=${o.v}`}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            padding: "6px 10px",
            borderRadius: 100,
            background: current === o.v ? "var(--accent)" : "transparent",
            color: current === o.v ? "var(--on-accent)" : "var(--chalk)",
          }}
        >
          {o.label}
        </a>
      ))}
    </div>
  );
}
