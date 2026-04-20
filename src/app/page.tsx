import { campaigns } from "@/data/campaigns";
import { Nav } from "@/components/Nav";
import { HeroSwitcher } from "@/components/HeroSwitcher";
import { Ticker } from "@/components/Ticker";
import { IndexGrid } from "@/components/Index";
import { Closing } from "@/components/Closing";

export default function Home() {
  // Bomber is the default hero; ALO can be swapped in via the switcher.
  const heroCampaigns = [
    campaigns.find((c) => c.slug === "yamada-bomber-jacket"),
    campaigns.find((c) => c.slug === "yamada-alo"),
  ].filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <>
      <Nav />
      <div className="desktop-only">
        <HeroSwitcher campaigns={heroCampaigns} />
      </div>
      <div className="mobile-only">
        <HeroSwitcher campaigns={heroCampaigns} mobile />
      </div>
      <Ticker />
      <IndexGrid campaigns={campaigns} />
      <Closing />
    </>
  );
}
