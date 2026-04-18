"use client";
import Image from "next/image";
import { useState, ReactNode, CSSProperties } from "react";

type AspectKey = "21/9" | "16/9" | "4/5" | "1/1" | "3/4" | "auto";

const aspectMap: Record<AspectKey, string> = {
  "21/9": "21 / 9",
  "16/9": "16 / 9",
  "4/5": "4 / 5",
  "1/1": "1 / 1",
  "3/4": "3 / 4",
  auto: "auto",
};

type Props = {
  src: string;
  alt: string;
  label?: string;
  aspect?: AspectKey;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  style?: CSSProperties;
  children?: ReactNode;
  scrim?: boolean;
};

/**
 * Frame — image container with hover grain + corner tag, theme-aware.
 * Use `fill` for full-bleed parents (parent must be position: relative).
 * Use `aspect` for ratio-locked tiles inside grids.
 */
export function Frame({
  src,
  alt,
  label,
  aspect,
  fill = false,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  style,
  children,
  scrim = false,
}: Props) {
  const [hover, setHover] = useState(false);

  const wrapperStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, overflow: "hidden", cursor: "pointer", ...style }
    : {
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        aspectRatio: aspect && aspect !== "auto" ? aspectMap[aspect] : undefined,
        background: "var(--bg2)",
        ...style,
      };

  return (
    <div
      style={wrapperStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
      {/* tone-aware grain overlay (uses CSS vars for blend + opacity) */}
      <div
        className="frame-grain"
        data-hover={hover ? "1" : "0"}
      />
      {label && (
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
            opacity: hover ? 1 : 0.75,
            transition: "opacity 180ms",
            pointerEvents: "none",
          }}
        >
          ◉ {label}
        </div>
      )}
      {scrim && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--scrim)",
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </div>
  );
}
