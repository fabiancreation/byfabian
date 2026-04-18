export type Aspect = "portrait" | "landscape" | "square";

export type CampaignImage = {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspect: Aspect;
  feature?: boolean;
};

export type Product = {
  /** Stable identifier inside a campaign. */
  id: string;
  /** Public path to a packshot-style product photo on a clean background. */
  image: string;
  /** Display name. */
  name: string;
  /** Price as a number; rendered with `currency`. */
  price: number;
  /** Currency code (e.g. "EUR", "USD"). Default rendering uses Intl.NumberFormat. */
  currency: string;
  /** Optional outbound link to where the product can be bought. */
  url?: string;
  /** Optional badge above the tile (e.g. "BESTSELLER", "NEW"). */
  tag?: string;
};

export type Model = {
  slug: string;
  name: string;
  bio?: string;
};

export type Campaign = {
  slug: string;
  title: string;
  number: string;
  modelSlug: string;
  modelName: string;
  category: string;
  year: number;
  tagline: string;
  /** Optional short version of the tagline (~24 chars) for spec-strip cells. */
  shortTag?: string;
  description: string;
  tools: string[];
  cover: string;
  coverAspect: Aspect;
  heroFrame?: string;
  heroImage?: CampaignImage;
  draft?: boolean;
  images: CampaignImage[];
  /** Optional shoppable products featured in the campaign — rendered as a
   *  light-themed strip after the first body image. */
  products?: Product[];
};
