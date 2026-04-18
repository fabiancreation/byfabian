export function Ticker() {
  const items = [
    "EDITORIAL",
    "BEAUTY",
    "STREETWEAR",
    "ACTIVEWEAR",
    "LOOKBOOK",
    "LIFESTYLE",
    "E-COMMERCE",
  ];
  const line = items.join("  ◦  ");
  const repeated = `   ${line}   ◦   ${line}   ◦   `;
  return (
    <div
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        padding: "12px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        background: "var(--bg2)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.28em",
          color: "var(--dim)",
          display: "inline-block",
          animation: "ticker 40s linear infinite",
        }}
      >
        {repeated}
        {repeated}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
