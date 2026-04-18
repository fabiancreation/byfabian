import { Nav } from "@/components/Nav";
import { Closing } from "@/components/Closing";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact — ByFabian",
  description: "Start a brief.",
};

export default function ContactPage() {
  return (
    <>
      <Nav compact />

      <section
        style={{
          padding: "80px clamp(20px, 5vw, 48px) 32px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 32,
        }}
        className="contact-hero"
      >
        <div>
          <span className="eye eye-accent">◉ START_A_BRIEF</span>
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(56px, 11vw, 160px)",
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
              margin: "14px 0 0",
            }}
          >
            HAVE A
            <br />
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 400 }}>
              campaign
            </span>
            <br />
            <span style={{ color: "var(--accent)" }}>IN MIND?</span>
          </h1>
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.4,
            color: "var(--dim)",
            paddingTop: 24,
            maxWidth: 480,
          }}
        >
          A short brief is enough to start a conversation. Tell me what you&apos;re shooting,
          who it&apos;s for, and when you need it. I&apos;ll come back with a treatment within
          two working days.
        </div>
      </section>

      <section
        style={{
          padding: "0 clamp(20px, 5vw, 48px) 80px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
        }}
        className="contact-grid"
      >
        <ContactForm />
        <aside
          style={{
            padding: "32px",
            border: "1px solid var(--line)",
            borderRadius: 4,
            background: "var(--bg2)",
            alignSelf: "start",
          }}
        >
          <span className="eye eye-accent">DIRECT</span>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--ink)",
              marginTop: 12,
              wordBreak: "break-word",
            }}
          >
            fabian.arndt.info@gmail.com
          </p>

          <hr style={{ margin: "28px 0", border: "none", borderTop: "1px solid var(--line)" }} />

          <span className="eye eye-accent">TURNAROUND</span>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.4,
              color: "var(--dim)",
              marginTop: 8,
            }}
          >
            Treatment in two days. First frames in seven. Final delivery within fourteen.
          </p>

          <hr style={{ margin: "28px 0", border: "none", borderTop: "1px solid var(--line)" }} />

          <span className="eye eye-accent">SCOPE</span>
          <ul
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              lineHeight: 1.8,
              color: "var(--ink)",
              listStyle: "none",
              padding: 0,
              marginTop: 8,
            }}
          >
            <li>◦ EDITORIAL CAMPAIGNS</li>
            <li>◦ E-COMMERCE EDITORIAL</li>
            <li>◦ LOOKBOOKS</li>
            <li>◦ BRAND IMAGERY</li>
          </ul>
        </aside>
      </section>

      <Closing />

      <style>{`
        @media (min-width: 769px) {
          .contact-hero { grid-template-columns: 1.4fr 1fr !important; gap: 48px !important; align-items: end; }
          .contact-grid { grid-template-columns: 1.4fr 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </>
  );
}
