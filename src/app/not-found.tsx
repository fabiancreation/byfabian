import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav compact />
      <section
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "0 clamp(20px, 5vw, 48px)",
          gap: 24,
        }}
      >
        <span className="eye eye-accent">◉ ERROR · 404</span>
        <h1
          style={{
            fontWeight: 800,
            fontSize: "clamp(72px, 14vw, 200px)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          NOTHING<span style={{ color: "var(--accent)" }}>.</span>
          <br />
          HERE.
        </h1>
        <Link
          href="/"
          style={{
            padding: "14px 24px",
            background: "var(--accent)",
            color: "var(--on-accent)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            borderRadius: 100,
          }}
        >
          ← BACK TO INDEX
        </Link>
      </section>
    </>
  );
}
