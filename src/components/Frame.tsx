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

type CommonProps = {
  src: string;
  alt: string;
  label?: string;
  priority?: boolean;
  sizes?: string;
  style?: CSSProperties;
  children?: ReactNode;
  scrim?: boolean;
};

type FitProps = CommonProps & {
  /** Render the image at its natural aspect (no crop). Default. */
  mode?: "fit";
  /** Intrinsic dimensions; required for fit-mode to compute aspect without CLS. */
  width: number;
  height: number;
};

type CoverProps = CommonProps & {
  /** Crop the image to fill the wrapper. Used for hero overlays. */
  mode: "cover";
  /** Aspect lock for the wrapper. */
  aspect?: AspectKey;
  /** Use absolute fill (parent provides height). */
  fill?: boolean;
  width?: number;
  height?: number;
};

type Props = FitProps | CoverProps;

/**
 * Frame — image container with hover grain + corner tag.
 *
 * - `mode="fit"` (default): renders the image at its natural aspect from
 *   the supplied `width` × `height`. Never crops. Right for editorial body work.
 * - `mode="cover"`: crops to fill the wrapper. Use with `aspect` for tile grids
 *   or with `fill` when the parent supplies the height (e.g. Home hero).
 */
export function Frame(props: Props) {
  const [hover, setHover] = useState(false);
  const { src, alt, label, priority = false, style, children, scrim = false } = props;
  const sizes = props.sizes || "(max-width: 768px) 100vw, 50vw";

  if (props.mode === "cover") {
    const wrapperStyle: CSSProperties = props.fill
      ? { position: "absolute", inset: 0, overflow: "hidden", cursor: "pointer", ...style }
      : {
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          aspectRatio: props.aspect && props.aspect !== "auto" ? aspectMap[props.aspect] : undefined,
          background: "var(--bg2)",
          ...style,
        };
    return (
      <Wrapper
        wrapperStyle={wrapperStyle}
        hover={hover}
        setHover={setHover}
        label={label}
        scrim={scrim}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
        {children}
      </Wrapper>
    );
  }

  // fit mode (default)
  const wrapperStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    background: "var(--bg2)",
    ...style,
  };
  return (
    <Wrapper
      wrapperStyle={wrapperStyle}
      hover={hover}
      setHover={setHover}
      label={label}
      scrim={scrim}
    >
      <Image
        src={src}
        alt={alt}
        width={props.width}
        height={props.height}
        sizes={sizes}
        priority={priority}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      {children}
    </Wrapper>
  );
}

function Wrapper({
  wrapperStyle,
  hover,
  setHover,
  label,
  scrim,
  children,
}: {
  wrapperStyle: CSSProperties;
  hover: boolean;
  setHover: (v: boolean) => void;
  label?: string;
  scrim?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      style={wrapperStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      <div className="frame-grain" data-hover={hover ? "1" : "0"} />
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
        <div style={{ position: "absolute", inset: 0, background: "var(--scrim)", pointerEvents: "none" }} />
      )}
    </div>
  );
}
