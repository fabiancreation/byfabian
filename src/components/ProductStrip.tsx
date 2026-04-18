import Image from "next/image";
import type { Product } from "@/data/types";

type Props = {
  products: Product[];
  /** Optional eyebrow above the strip. Default: "WORN IN THIS CAMPAIGN". */
  eyebrow?: string;
};

const formatPrice = (p: Product): string | null => {
  if (p.price == null || !p.currency) return null;
  try {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: p.currency,
      maximumFractionDigits: 0,
    }).format(p.price);
  } catch {
    return `${p.price} ${p.currency}`;
  }
};

/**
 * Light-themed product strip. Sits inside dark Studio or light Daylight body
 * as its own chalk panel so packshot photos read clean against any theme.
 */
export function ProductStrip({ products, eyebrow = "WORN IN THIS CAMPAIGN" }: Props) {
  if (!products || products.length === 0) return null;
  return (
    <section className="product-strip">
      <div className="product-strip__head">
        <span className="eye">◉ {eyebrow}</span>
        <span className="eye">
          {String(products.length).padStart(2, "0")} ITEMS
        </span>
      </div>

      <div className="product-strip__grid">
        {products.map((p) => (
          <ProductTile key={p.id} product={p} />
        ))}
      </div>

      <style>{`
        .product-strip {
          background: var(--bg2);
          color: var(--ink);
          padding: 28px clamp(20px, 5vw, 48px) 36px;
          margin: 16px 0;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          transition: background 400ms, border-color 400ms;
        }
        .product-strip__head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--line);
          margin-bottom: 24px;
        }
        .product-strip__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        @media (min-width: 769px) {
          .product-strip__grid { grid-template-columns: repeat(3, 1fr) !important; gap: 24px !important; }
        }
      `}</style>
    </section>
  );
}

function ProductTile({ product }: { product: Product }) {
  const inner = (
    <article
      style={{
        background: "#fff",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "3 / 4",
          background: "#fff",
        }}
      >
        <Image
          src={product.image}
          alt={product.name || `Product ${product.id}`}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          style={{ objectFit: "contain", padding: "12%" }}
        />
        {product.tag && (
          <span
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#1a1814",
              background: "rgba(255,255,255,0.92)",
              padding: "4px 8px",
            }}
          >
            {product.tag}
          </span>
        )}
      </div>
      <ProductCaption product={product} />
    </article>
  );

  if (product.url) {
    return (
      <a
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", color: "inherit", textDecoration: "none" }}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

function ProductCaption({ product }: { product: Product }) {
  const price = formatPrice(product);
  // When neither name nor price is supplied, drop the caption entirely so the
  // tile stays a clean packshot rather than showing an empty text row.
  if (!product.name && !price) return null;
  return (
    <div
      style={{
        padding: "14px 16px 18px",
        textAlign: "center",
        fontFamily: "var(--font-mono)",
      }}
    >
      {product.name && (
        <div style={{ fontSize: 11, color: "#5a5a52", lineHeight: 1.4 }}>
          {product.name}
        </div>
      )}
      {price && (
        <div
          style={{
            marginTop: product.name ? 6 : 0,
            fontSize: 12,
            color: "#1a1814",
            letterSpacing: "0.04em",
          }}
        >
          {price}
        </div>
      )}
    </div>
  );
}
