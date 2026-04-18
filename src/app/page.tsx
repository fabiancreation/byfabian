import { campaigns } from "@/data/campaigns";
import { Nav } from "@/components/Nav";
import { Hero, HeroMobile } from "@/components/Hero";
import { Ticker } from "@/components/Ticker";
import { IndexGrid } from "@/components/Index";
import { Closing } from "@/components/Closing";

export default function Home() {
  // Bomber is the hero campaign in the design (campaign 02).
  const heroCampaign =
    campaigns.find((c) => c.slug === "yamada-bomber-jacket") || campaigns[0];

  return (
    <>
      <Nav />
      <div className="desktop-only">
        <Hero campaign={heroCampaign} variant="a" />
      </div>
      <div className="mobile-only">
        <HeroMobile campaign={heroCampaign} />
      </div>
      <Ticker />
      <IndexGrid campaigns={campaigns} />
      <Closing />
    </>
  );
}
