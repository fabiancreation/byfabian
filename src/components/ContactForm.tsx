"use client";
import { useState } from "react";

type Status = "idle" | "submitting" | "ok" | "error";

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--line-strong)",
  padding: "14px 0",
  fontFamily: "var(--font-mono)",
  fontSize: 14,
  color: "var(--ink)",
  outline: "none",
};

const labelBase: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--accent)",
  display: "block",
  marginBottom: 6,
};

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "Could not send.");
      }
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 28 }}>
      <div>
        <label style={labelBase} htmlFor="name">NAME</label>
        <input style={inputBase} id="name" name="name" required autoComplete="name" />
      </div>
      <div>
        <label style={labelBase} htmlFor="email">EMAIL</label>
        <input style={inputBase} id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <label style={labelBase} htmlFor="company">COMPANY / BRAND</label>
        <input style={inputBase} id="company" name="company" autoComplete="organization" />
      </div>
      <div>
        <label style={labelBase} htmlFor="brief">THE BRIEF</label>
        <textarea
          style={{ ...inputBase, minHeight: 140, resize: "vertical", paddingTop: 14 }}
          id="brief"
          name="brief"
          required
          rows={6}
          placeholder="Who, what, when, what feeling. A paragraph is enough."
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <button
          type="submit"
          disabled={status === "submitting"}
          style={{
            padding: "16px 26px",
            background: "var(--accent)",
            color: "var(--on-accent)",
            border: "none",
            borderRadius: 100,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
            cursor: status === "submitting" ? "wait" : "pointer",
            opacity: status === "submitting" ? 0.6 : 1,
          }}
        >
          {status === "submitting" ? "SENDING…" : "SEND_BRIEF →"}
        </button>
        {status === "ok" && (
          <span className="eye eye-accent">◉ SENT — I&apos;LL BE IN TOUCH WITHIN 48H</span>
        )}
        {status === "error" && (
          <span className="eye" style={{ color: "#ff7a6c" }}>✕ {errorMsg}</span>
        )}
      </div>
    </form>
  );
}
